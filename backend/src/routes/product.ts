import express, { Request, Response } from 'express';
import axios from 'axios';

const router = express.Router();

// Endpoint do wyszukiwania hoteli w danym mieście
router.get("/search", async (req: Request, res: Response) => {
    const { city } = req.query;  // Oczekujemy parametru 'city' w zapytaniu

    if (!city) {
        return res.status(400).json({ error: "Brakuje parametru 'city'" });
    }

    try {
        // Wyszukiwanie hoteli w danym mieście
        const response = await axios.get("https://api.travsrv.com/Content.aspx", {
            params: {
                type: "searchhotels",  // Typ zapytania do API Travsrv
                city: city,            // Parametr miasto
            }
        });

        // Zakładamy, że odpowiedź zawiera listę hoteli
        const hotels = response.data;

        if (!hotels || hotels.length === 0) {
            return res.status(404).json({ error: `Brak hoteli w mieście ${city}` });
        }

        res.json(hotels);  // Zwracamy listę hoteli
    } catch (error: any) {
        console.error("❌ Błąd podczas wyszukiwania hoteli:", error?.response?.data || error.message);
        res.status(500).json({ error: "Wystąpił błąd podczas wyszukiwania hoteli" });
    }
});

// Endpoint do pobierania szczegółowych informacji o hotelu na podstawie hotelId
router.get("/:hotelId", async (req: Request, res: Response) => {
    const { hotelId } = req.params;

    if (!hotelId) {
        return res.status(400).json({ error: "Brakuje hotelId" });
    }

    try {
        // Zapytanie do API Travsrv o szczegóły hotelu
        const response = await axios.get("https://api.travsrv.com/Content.aspx", {
            params: {
                type: "gethotelinfo",  // Typ zapytania do API Travsrv
                propertyid: hotelId,   // ID hotelu
            }
        });

        const hotelData = response.data;

        // Jeśli dane hotelu są puste lub błędne
        if (!hotelData || Object.keys(hotelData).length === 0) {
            return res.status(404).json({ error: "Nie znaleziono danych dla podanego hotelu" });
        }

        // Zwracamy najważniejsze dane o hotelu
        res.json({
            PropertyName: hotelData.PropertyName,
            PropertyAddress: hotelData.PropertyAddress,
            ReferencePrice: hotelData.ReferencePrice,
            PropertyImageUrlHighRes: hotelData.PropertyImageUrlHighRes,
            PropertyRating: hotelData.PropertyRating,
            TripAdvisorRating: hotelData.TripAdvisorRating,
            TripAdvisorReviewCount: hotelData.TripAdvisorReviewCount,
        });

    } catch (error: any) {
        console.error("❌ Błąd podczas pobierania danych hotelu:", error?.response?.data || error.message);
        res.status(500).json({ error: "Wystąpił błąd podczas pobierania danych hotelu" });
    }
});

export default router;
