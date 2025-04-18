import express, { Request, Response } from 'express';
import axios from 'axios';
import { supabase } from "../supabaseClient";

const router = express.Router();

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
                try {
                    const userRes = await axios.get('https://randomuser.me/api/');
                    const image = userRes.data.results[0].picture.medium;
                    return { ...review, image };
                } catch (err) {
                    console.error('❌ Błąd podczas pobierania zdjęcia:', err);
                    return { ...review, image: null };
                }
            })
        );

        res.json(reviewsWithImages);

    } catch (err) {
        console.error('❌ Błąd:', err);
        res.status(500).json({ error: 'Błąd serwera' });
    }
});

export default router;
