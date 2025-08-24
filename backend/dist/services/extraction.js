const GSTIN_REGEX = /\b\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Zz]{1}[A-Z\d]{1}\b/;
const AMOUNT_REGEX = /(?:INR|Rs\.?|₹)?\s*([0-9]{1,3}(?:,[0-9]{3})*(?:\.[0-9]{1,2})|[0-9]+(?:\.[0-9]{1,2})?)/g;
const DATE_REGEX = /\b(\d{1,2}[\/-]\d{1,2}[\/-]\d{2,4}|\d{4}-\d{2}-\d{2})\b/;
export const extractFields = (text) => {
    const fields = [];
    const gstMatch = text.match(GSTIN_REGEX);
    if (gstMatch && gstMatch[0]) {
        fields.push({ name: 'GSTIN', value: gstMatch[0] });
    }
    let amountMatch;
    let maxAmount = null;
    let maxAmountRaw = null;
    const amountRegex = new RegExp(AMOUNT_REGEX);
    while ((amountMatch = amountRegex.exec(text)) !== null) {
        const rawCandidate = amountMatch[1];
        if (!rawCandidate)
            continue;
        const normalized = Number(rawCandidate.replace(/,/g, ''));
        if (!Number.isNaN(normalized) && (maxAmount === null || normalized > maxAmount)) {
            maxAmount = normalized;
            maxAmountRaw = rawCandidate;
        }
    }
    if (maxAmount !== null) {
        fields.push({ name: 'AMOUNT', value: String(maxAmount) });
        fields.push({ name: 'AMOUNT_RAW', value: maxAmountRaw ?? '' });
    }
    const dateMatch = text.match(DATE_REGEX);
    if (dateMatch && dateMatch[0]) {
        fields.push({ name: 'DATE', value: dateMatch[0] });
    }
    // Simple bill/check type heuristic
    const lowered = text.toLowerCase();
    if (lowered.includes('cheque') || lowered.includes('check no') || lowered.includes('micr')) {
        fields.push({ name: 'DOC_TYPE_HINT', value: 'CHECK' });
    }
    else {
        fields.push({ name: 'DOC_TYPE_HINT', value: 'BILL' });
    }
    return fields;
};
//# sourceMappingURL=extraction.js.map