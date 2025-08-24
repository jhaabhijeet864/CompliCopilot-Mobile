import sharp from 'sharp';
import Tesseract from 'tesseract.js';
import fs from 'fs/promises';

export type OcrResult = {
	text: string;
	confidence?: number;
};

export const runOcr = async (filePath: string): Promise<OcrResult> => {
	const preprocessedPath = `${filePath}.pre.png`;
	await sharp(filePath)
		.resize({ width: 2000, withoutEnlargement: true })
		.grayscale()
		.normalise()
		.toFormat('png')
		.toFile(preprocessedPath);

	const { data } = await Tesseract.recognize(preprocessedPath, 'eng', {
		logger: () => {}
	});

	// cleanup silently
	fs.unlink(preprocessedPath).catch(() => {});

	return { text: data.text || '', confidence: data.confidence };
};