import express, { Request, Response } from 'express';
import { supabase } from '../utils/supabase';
import jwt from "jsonwebtoken";

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
// routes/bookings.ts
router.delete('/:propertyId', async (req: Request, res: Response) => {
    const token = req.cookies.token;

    if (!token) {
        res.status(401).json({ message: 'Brak tokenu' });
        return
    }

    try {
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'secret');
        const userId = decoded.id;
        const propertyId = req.params.propertyId;

        // 1. Znajdź i usuń rezerwację dla danego użytkownika i hotelu
        const { error } = await supabase
            .from('Reservation')
            .delete()
            .eq('PropertyId', propertyId)
            .eq('id', userId); // UWAGA: lepiej zmień kolumnę na 'user_id'

        if (error) {
            throw error;
        }

        res.status(200).json({ message: 'Rezerwacja usunięta pomyślnie' });
    } catch (err) {
        console.error('Błąd usuwania rezerwacji:', err);
        res.status(500).json({ message: 'Błąd serwera' });
    }
});

export default router;