import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import hotelsRouter from './routes/explore';
import reviewsRouter from './routes/reviews'; // <–– nowy import

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/hotels', hotelsRouter);
app.use('/api/reviews', reviewsRouter);

app.listen(PORT, () => {
    console.log(`✅ Serwer działa na http://localhost:${PORT}`);
});
