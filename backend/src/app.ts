import express, { Request, Response } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = 3000;

let jwtToken: string | null = null;
let tokenExpiry: number | null = null; // Timestamp (ms)

const getJWTToken = async (): Promise<string | null> => {
    const username = process.env.MAKCORPS_USERNAME;
    const password = process.env.MAKCORPS_PASSWORD;

    try {
        const response = await axios.post('https://api.makcorps.com/auth', {
            username,
            password
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        jwtToken = response.data.token;
        tokenExpiry = Date.now() + 60 * 60 * 1000; // Zakładamy, że token ważny przez 1h
        console.log('✅ Token JWT uzyskany');
        return jwtToken;
    } catch (error) {
        console.error('❌ Błąd logowania:', error.response?.data || error.message);
        return null;
    }
};

app.get('/hotels/:city', async (req: Request, res: Response): Promise<void> => {
    const city = req.params.city;

    try {
        // Odśwież token jeśli wygasł lub nie istnieje
        if (!jwtToken || (tokenExpiry && Date.now() > tokenExpiry)) {
            const newToken = await getJWTToken();
            if (!newToken) {
                res.status(500).json({ error: 'Nie udało się uzyskać tokena JWT' });
            }
        }

        const response = await axios.get(`https://api.makcorps.com/free/${city}`, {
            headers: {
                Authorization: `JWT ${jwtToken}`
            }
        });

        res.json(response.data);

    } catch (error: any) {
        console.error('❌ Błąd API:', error.response?.data || error.message);

        // Spróbuj jeszcze raz po uzyskaniu nowego tokena (np. token wygasł)
        if (error.response?.status === 401) {
            const newToken = await getJWTToken();
            if (!newToken) {
                res.status(500).json({ error: 'Token wygasł i nie udało się go odnowić' });
            }

            try {
                const retryResponse = await axios.get(`https://api.makcorps.com/free/${city}`, {
                    headers: {
                        Authorization: `JWT ${newToken}`
                    }
                });

                res.json(retryResponse.data);
            } catch (retryError: any) {
                console.error('❌ Błąd przy ponownym pobieraniu danych:', retryError.message);
                res.status(500).json({ error: 'Błąd przy ponownym pobieraniu danych' });
            }
        }

        // Fallback – tylko JEDNA odpowiedź
        if (!res.headersSent) {
            res.status(500).json({ error: 'Wystąpił błąd przy pobieraniu danych hotelowych' });
        }
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Serwer działa: http://localhost:${PORT}`);
});
