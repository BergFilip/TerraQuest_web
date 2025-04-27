import express, { Request, Response } from 'express';
import axios from 'axios';

const router = express.Router();

// Endpoint do pobierania danych hotelu na podstawie hotelId
router.get('/:hotelId', async (req: Request, res: Response) => {
    const { hotelId } = req.params;

    if (!hotelId) {
        return res.status(400).json({ error: 'Brakuje hotelId' });
    }

    try {
        // Zapytanie do zewnętrznego API (Travsrv) na podstawie hotelId
        const response = await axios.get('https://api.travsrv.com/Content.aspx', {
            params: {
                type: 'gethotelinfo',
                propertyid: hotelId,
            },
        });

        const hotelData = response.data;

        if (!hotelData) {
            return res.status(404).json({ error: 'Nie znaleziono danych dla podanego hotelu' });
        }

        // Zwrócenie danych hotelu w odpowiedzi
        res.json(hotelData);
    } catch (error) {
        console.error('Błąd podczas pobierania danych hotelu:', error);
        res.status(500).json({ error: 'Wystąpił błąd podczas pobierania danych hotelu' });
    }
});

export default router;
