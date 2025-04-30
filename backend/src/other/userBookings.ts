import express, { Request, Response } from 'express';
import { supabase } from '../utils/supabase';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const userId = req.query.userId as string;
        console.log(`Pobieram rezerwacje dla: ${userId}`); // Debug

        if (!userId) {
            res.status(400).json({ error: 'User ID is required' });
            return
        }

        // Debug: Sprawdź wartość userId
        console.log(`Pobieram rezerwacje dla userId: ${userId}`);

        const { data, error } = await supabase
            .from('Reservation')
            .select('*')
            .eq('id', userId)

        if (error) {
            console.error('Błąd Supabase:', error);
            res.status(500).json({ error: 'Database error' });
            return
        }

        console.log('Znalezione rezerwacje:', data); // Debug
        res.json(data || []);
    } catch (err) {
        console.error('Błąd serwera:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;