import { Router } from 'express';
import documents from './documents.js';
import reports from './reports.js';
const router = Router();
router.get('/', (_req, res) => {
    res.json({ message: 'OCR Compliance API' });
});
router.use('/documents', documents);
router.use('/reports', reports);
export default router;
//# sourceMappingURL=index.js.map