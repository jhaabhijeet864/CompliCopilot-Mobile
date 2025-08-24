import { Router } from 'express';
import { upload } from '../middleware/upload.js';
import { runOcr } from '../services/ocr.js';
import { extractFields } from '../services/extraction.js';
import { runComplianceChecks } from '../services/compliance.js';
import { getPrisma } from '../services/prisma.js';
import path from 'path';
import { z } from 'zod';
import { DocumentType } from '@prisma/client';

const router = Router();

router.post('/upload', upload.single('file'), async (req, res, next) => {
	try {
		if (!req.file) {
			return res.status(400).json({ error: 'No file uploaded' });
		}
		const prisma = getPrisma();
		const storagePath = req.file.path;
		const ocr = await runOcr(storagePath);
		const fields = extractFields(ocr.text);
		const docTypeHint = fields.find(f => f.name === 'DOC_TYPE_HINT')?.value as keyof typeof DocumentType | undefined;
		const docType = (docTypeHint && (DocumentType as any)[docTypeHint]) ? (docTypeHint as DocumentType) : 'BILL';

		const created = await prisma.document.create({
			data: {
				filename: req.file.originalname,
				mimeType: req.file.mimetype,
				sizeBytes: req.file.size,
				storagePath: storagePath,
				text: ocr.text,
				type: docType,
			}
		});

		if (fields.length > 0) {
			await prisma.extractedField.createMany({
				data: fields.map(f => ({
					documentId: created.id,
					name: f.name,
					value: f.value,
					confidence: f.confidence ?? null
				}))
			});
		}

		const issues = runComplianceChecks(ocr.text, fields, docType);
		if (issues.length > 0) {
			await prisma.complianceIssue.createMany({
				data: issues.map(i => ({
					documentId: created.id,
					code: i.code,
					description: i.description,
					severity: i.severity
				}))
			});
		}

		return res.status(201).json({ id: created.id, issuesCount: issues.length, type: docType });
	} catch (err) {
		next(err);
	}
});

const listQuery = z.object({
	page: z.coerce.number().int().min(1).default(1),
	limit: z.coerce.number().int().min(1).max(100).default(20),
	missingGst: z.coerce.boolean().optional(),
	type: z.nativeEnum(DocumentType).optional()
});

router.get('/', async (req, res, next) => {
	try {
		const q = listQuery.parse(req.query);
		const prisma = getPrisma();
		const skip = (q.page - 1) * q.limit;
		const where: any = {};
		if (q.type) where.type = q.type;
		if (q.missingGst) {
			where.issues = { some: { code: 'GST_MISSING' } };
		}
		const [items, total] = await Promise.all([
			prisma.document.findMany({
				skip,
				take: q.limit,
				orderBy: { createdAt: 'desc' },
				select: { id: true, filename: true, type: true, createdAt: true, issues: { select: { id: true } } }
			}),
			prisma.document.count({ where })
		]);
		res.json({ items, total, page: q.page, limit: q.limit });
	} catch (err) {
		next(err);
	}
});

router.get('/:id', async (req, res, next) => {
	try {
		const prisma = getPrisma();
		const doc = await prisma.document.findUnique({
			where: { id: req.params.id },
			include: { fields: true, issues: true }
		});
		if (!doc) return res.status(404).json({ error: 'Not found' });
		const fileUrlBase = process.env.BASE_URL || '';
		res.json({ ...doc, fileUrl: path.join(fileUrlBase, 'static', path.basename(doc.storagePath)) });
	} catch (err) {
		next(err);
	}
});

export default router;