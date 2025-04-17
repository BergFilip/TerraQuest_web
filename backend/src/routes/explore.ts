import express from "express";
import axios from "axios";

const router = express.Router();

router.get("/", async (req, res) => {
    const { city } = req.query;

    if (!city) {
        return res.status(400).json({ error: "Brakuje parametrów: city" });
    }

    try {
        const locationResponse = await axios.get("https://api.travsrv.com/widgetapi.aspx", {
            params: {
                type: "cities",
                name: city,
                count: 1
            }
        });

        const locationId = locationResponse.data?.[0]?.LocationId;

        if (!locationId) {
            return res.status(404).json({ error: "Nie znaleziono locationId dla podanego miasta" });
        }

        const hotelsResponse = await axios.get("https://api.travsrv.com/Content.aspx", {
            params: {
                type: "findfeaturedhoteldeals",
                locationid: locationId,
            }
        });

        res.json(hotelsResponse.data);
    } catch (error: any) {
        console.error("❌ Błąd:", error.message || error);
        res.status(500).json({ error: "Wystąpił błąd podczas pobierania danych" });
    }
});

export default router;
