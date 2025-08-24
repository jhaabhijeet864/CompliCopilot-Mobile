import { DocumentType, Severity } from '@prisma/client';
import type { ExtractedField } from './extraction.js';
export type ComplianceIssueInput = {
    code: string;
    description: string;
    severity: Severity;
};
export declare const runComplianceChecks: (text: string, fields: ExtractedField[], docType: DocumentType) => ComplianceIssueInput[];
//# sourceMappingURL=compliance.d.ts.map