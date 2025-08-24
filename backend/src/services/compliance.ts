import { DocumentType, Severity } from '@prisma/client';
import type { ExtractedField } from './extraction.js';

export type ComplianceIssueInput = {
	code: string;
	description: string;
	severity: Severity;
};

export const runComplianceChecks = (
	text: string,
	fields: ExtractedField[],
	docType: DocumentType
): ComplianceIssueInput[] => {
	const issues: ComplianceIssueInput[] = [];

	const get = (name: string) => fields.find(f => f.name === name)?.value;

	// GST for Bills
	if (docType === 'BILL') {
		const gst = get('GSTIN');
		if (!gst) {
			issues.push({
				code: 'GST_MISSING',
				description: 'No GSTIN found on bill text',
				severity: 'ERROR'
			});
		}
	}

	// Amount presence
	if (!get('AMOUNT')) {
		issues.push({ code: 'AMOUNT_MISSING', description: 'Amount not detected', severity: 'WARNING' });
	}

	// Date presence
	if (!get('DATE')) {
		issues.push({ code: 'DATE_MISSING', description: 'Date not detected', severity: 'WARNING' });
	}

	// Anomaly detection (very naive)
	const maxAmount = Number(get('AMOUNT'));
	if (!Number.isNaN(maxAmount) && maxAmount > 1000000) {
		issues.push({ code: 'AMOUNT_OUTLIER', description: 'Unusually large amount detected', severity: 'WARNING' });
	}

	if (docType === 'CHECK') {
		if (!text.toLowerCase().includes('pay')) {
			issues.push({ code: 'PAYEE_MISSING', description: 'Possible missing payee line', severity: 'WARNING' });
		}
	}

	return issues;
};