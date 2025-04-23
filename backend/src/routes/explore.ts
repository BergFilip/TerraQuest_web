import express from "express";
import axios from "axios";

const router = express.Router();

router.get("/", async (req, res) => {
    const { city } = req.query;

    if (!city) {
        res.status(400).json({ error: "Brakuje parametrów: city" });
        return
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
            res.status(404).json({ error: "Nie znaleziono locationId dla podanego miasta" });
            return
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
