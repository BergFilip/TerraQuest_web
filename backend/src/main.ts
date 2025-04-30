import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// Routers
import authRouter from './other/auth';
import hotelsRouter from './routes/explore';
import reviewsRouter from './routes/reviews';
import productsRouter from './routes/product';
import reservation from "./other/reservation";
import bookingsRouter from "./other/userBookings"
import newsletterRouter from './routes/newsletter';

import helpRouter from './routes/help1';
import path from "path";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

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
app.use('/api/products', productsRouter);
app.use('/api/reviews', reviewsRouter);
app.use('/api/help1', helpRouter);
app.use('/api/reservations', reservation);
app.use('/api/bookings', bookingsRouter);
app.use('/api/newsletter', newsletterRouter);


app.use('/img', express.static(path.resolve(__dirname, 'img')));

app.get('/', (req: Request, res: Response) => {
    res.send('✅ Backend działa 🚀');
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Coś poszło nie tak!' });
});

app.listen(PORT, () => {
    console.log(`🚀 Serwer działa na http://localhost:${PORT}`);
});

export default app;
