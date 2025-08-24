import { Router } from 'express';
import { getPrisma } from '../services/prisma.js';
import { stringify } from 'csv-stringify/sync';
const router = Router();
router.get('/summary', async (_req, res, next) => {
    try {
        const prisma = getPrisma();
        const [totalDocs, billsMissingGst, totalIssues] = await Promise.all([
            prisma.document.count(),
            prisma.document.count({ where: { type: 'BILL', issues: { some: { code: 'GST_MISSING' } } } }),
            prisma.complianceIssue.count()
        ]);
        res.json({ totalDocs, billsMissingGst, totalIssues });
    }
    catch (err) {
        next(err);
    }
});
router.get('/export.csv', async (_req, res, next) => {
    try {
        const prisma = getPrisma();
        const docs = await prisma.document.findMany({
            orderBy: { createdAt: 'desc' },
            include: { fields: true, issues: true }
        });
        const records = docs.map(d => ({
            id: d.id,
            filename: d.filename,
            type: d.type,
            createdAt: d.createdAt.toISOString(),
            gstin: d.fields.find(f => f.name === 'GSTIN')?.value || '',
            amount: d.fields.find(f => f.name === 'AMOUNT')?.value || '',
            issues: d.issues.length
        }));
        const csv = stringify(records, { header: true });
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename="export.csv"');
        res.send(csv);
    }
    catch (err) {
        next(err);
    }
});
export default router;
//# sourceMappingURL=reports.js.map