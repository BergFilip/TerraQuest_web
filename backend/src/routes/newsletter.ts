import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { supabase } from '../utils/supabase';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                error: 'Musisz być zalogowany, aby zapisać się do newslettera'
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as any;

        // Update user's newsletter status instead of creating new subscription
        const { data: user, error: updateError } = await supabase
            .from('users')
            .update({ newsletter: true })
            .eq('id', decoded.id)
            .select()
            .single();

        if (updateError) throw updateError;

        res.status(200).json({
            success: true,
            message: 'Zaktualizowano status newslettera'
        });

    } catch (error) {
        console.error('Błąd aktualizacji newslettera:', error);
        res.status(500).json({
            error: error instanceof Error ? error.message : 'Wewnętrzny błąd serwera'
        });
    }
});

export default router;