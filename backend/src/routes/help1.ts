import express, { Request, Response } from 'express';
import { supabase } from "../supabaseClient";

const router = express.Router();

router.get('/faq', async (req: Request, res: Response) => {
    try {
        const { data: faqs, error } = await supabase
            .from('help')
            .select('title, content, colorB, colorT');

        if (error || !faqs || faqs.length === 0) {
            console.error('Błąd pobierania z Supabase:', error);
            res.status(404).json({ error: 'Brak danych FAQ w bazie' });
            return;
        }

        res.json(faqs);
    } catch (err) {
        console.error('Błąd serwera:', err);
        res.status(500).json({ error: 'Błąd serwera' });
    }
});

export default router;
