import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRouter from "./other/auth";

// Załaduj zmienne środowiskowe z .env
dotenv.config();

// Utwórz aplikację Express
const app = express();

// Środkowe warstwy (middleware)
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRouter);
// Przykładowa trasa testowa
app.get('/', (req: Request, res: Response) => {
    res.send('Backend działa 🚀');
});

// Obsługa błędów
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Coś poszło nie tak!' });
});

// Port z .env lub domyślny
const PORT = process.env.PORT || 4000;

// Uruchom serwer
app.listen(PORT, () => {
    console.log(`Serwer działa  http://localhost:${PORT}`);
});
