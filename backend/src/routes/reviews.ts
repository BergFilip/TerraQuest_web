import express, { Request, Response } from 'express';
import axios from 'axios';
import { supabase } from "../supabaseClient";

const router = express.Router();


const getImageWithRetry = async (maxRetries: number = 3): Promise<string | null> => {
    let retries = 0;
    while (retries < maxRetries) {
        try {
            const userRes = await axios.get('https://randomuser.me/api/');
            return userRes.data.results[0].picture.medium;
        } catch (err) {
            console.error('❌ Błąd podczas pobierania zdjęcia:', err);
            retries++;
            if (retries >= maxRetries) {
                console.error('❌ Przekroczono maksymalną liczbę prób');

                return '../img/user_no.jpg';
            }
        }
    }
    return '../img/user_no.jpg';
};

router.get('/', async (req: Request, res: Response) => {
    try {
        const { data: reviews, error } = await supabase
            .from('reviews_terraQuest')
            .select('title, description, reviewer, date, rating');

        if (error || !reviews || reviews.length === 0) {
            return res.status(404).json({ error: 'Brak recenzji w bazie' });
        }

        const reviewsWithImages = await Promise.all(
            reviews.map(async (review: any) => {
                const image = await getImageWithRetry();
                return { ...review, image };
            })
        );

        res.json(reviewsWithImages);

    } catch (err) {
        console.error('❌ Błąd:', err);
        res.status(500).json({ error: 'Błąd serwera' });
    }
});

export default router;
