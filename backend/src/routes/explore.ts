import express from "express";
import axios from "axios";

const router = express.Router();

const client_id = "b3vViQVSstu5rlbuKAEbyAfGD7n2Qoki";
const client_secret = "Q3LNGbuSqTkgceEF";

const getAmadeusToken = async (): Promise<string> => {
    const response = await axios.post(
        "https://test.api.amadeus.com/v1/security/oauth2/token",
        new URLSearchParams({
            grant_type: "client_credentials",
            client_id,
            client_secret
        }),
        {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }
    );

    return response.data.access_token;
};

router.get("/", async (req, res) => {
    const cityCode = req.query.cityCode as string;

    if (!cityCode) {
        return res.status(400).json({ error: "Brak parametru cityCode" });
    }

    try {
        const token = await getAmadeusToken();

        const hotelsRes = await axios.get(
            `https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city?cityCode=${cityCode}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        res.json(hotelsRes.data);
    } catch (err: any) {
        console.error("❌ Błąd pobierania danych z Amadeus API:", err.response?.data || err.message);
        res.status(500).json({ error: "Błąd podczas pobierania danych z Amadeus API" });
    }
});

export default router;
