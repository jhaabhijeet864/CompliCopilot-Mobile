import 'dotenv/config';
import express from 'express';
import path from 'path';
import cors from 'cors';
import morgan from 'morgan';
import { json, urlencoded } from 'express';
import apiRouter from './routes/index.js';
const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;
const uploadDir = process.env.UPLOAD_DIR || path.join(process.cwd(), 'storage');
app.use(cors());
app.use(morgan('dev'));
app.use(json({ limit: '10mb' }));
app.use(urlencoded({ extended: true }));
app.use('/static', express.static(uploadDir));
app.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
});
app.use('/api', apiRouter);
app.use((err, _req, res, _next) => {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
});
app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map