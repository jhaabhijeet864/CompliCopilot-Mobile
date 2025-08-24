import multer from 'multer';
import path from 'path';
import fs from 'fs';
const uploadDir = process.env.UPLOAD_DIR || path.join(process.cwd(), 'storage');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}
const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, uploadDir);
    },
    filename: (_req, file, cb) => {
        const safeName = file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_');
        const timestamp = Date.now();
        cb(null, `${timestamp}-${safeName}`);
    }
});
export const upload = multer({ storage });
//# sourceMappingURL=upload.js.map