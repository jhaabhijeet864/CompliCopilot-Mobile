export type OcrResult = {
    text: string;
    confidence?: number;
};
export declare const runOcr: (filePath: string) => Promise<OcrResult>;
//# sourceMappingURL=ocr.d.ts.map