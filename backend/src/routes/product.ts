import express, { Request, Response } from 'express';
import axios from 'axios';

const router = express.Router();

router.get("/search", async (req: Request, res: Response) => {
    const { city } = req.query;

    if (!city) {
        res.status(400).json({ error: "Brakuje parametru 'city'" });
        return
    }

    try {
        const response = await axios.get("https://api.travsrv.com/Content.aspx", {
            params: {
                type: "searchhotels",
                city: city,
            }
        });

        const hotels = response.data;

        if (!hotels || hotels.length === 0) {
            res.status(404).json({ error: `Brak hoteli w mieście ${city}` });
            return
        }

        res.json(hotels);
    } catch (error: any) {
        console.error("❌ Błąd podczas wyszukiwania hoteli:", error?.response?.data || error.message);
        res.status(500).json({ error: "Wystąpił błąd podczas wyszukiwania hoteli" });
    }
});


router.get("/:hotelId", async (req: Request, res: Response) => {
    const { hotelId } = req.params;

    if (!hotelId) {
        res.status(400).json({ error: "Brakuje hotelId" });
        return
    }

    try {

        const response = await axios.get("https://api.travsrv.com/Content.aspx", {
            params: {
                type: "gethotelinfo",
                propertyid: hotelId,
            }
        });

        const hotelData = response.data;

        if (!hotelData || Object.keys(hotelData).length === 0) {
            res.status(404).json({ error: "Nie znaleziono danych dla podanego hotelu" });
            return
        }

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
