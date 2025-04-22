import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// Routers
import authRouter from './other/auth';
import hotelsRouter from './routes/explore';
import reviewsRouter from './routes/reviews';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173', // frontend origin
    credentials: true,
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRouter);
app.use('/api/hotels', hotelsRouter);
app.use('/api/reviews', reviewsRouter);

// Base route
app.get('/', (req: Request, res: Response) => {
    res.send('✅ Backend działa 🚀');
});

// Global error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Coś poszło nie tak!' });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Serwer działa na http://localhost:${PORT}`);
});
