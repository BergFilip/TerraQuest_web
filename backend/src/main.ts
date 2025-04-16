import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRouter from "./other/auth";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRouter);


app.get('/', (req: Request, res: Response) => {
    res.send('Backend działa 🚀');
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Coś poszło nie tak!' });
});

app.listen(PORT, () => {
    console.log(`Serwer działa  http://localhost:${PORT}`);
});
