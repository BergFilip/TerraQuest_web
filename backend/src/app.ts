import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import hotelsRouter from './routes/explore';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Rejestracja routera hoteli
app.use('/api/hotels', hotelsRouter);

app.listen(PORT, () => {
    console.log(`✅ Serwer działa na http://localhost:${PORT}`);
});
