// newsletterRouter.ts
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

        const { data: subscription, error: dbError } = await supabase
            .from('newsletter_subscriptions')
            .insert({
                user_id: decoded.id,
                email: email,
                subscribed_at: new Date().toISOString()
            })
            .select()
            .single();

        if (dbError) throw dbError;

        res.status(201).json({
            success: true,
            message: `Zapisano do newslettera. Wysłano potwierdzenie na: ${email}`
        });

    } catch (error) {
        console.error('Błąd zapisu do newslettera:', error);
        res.status(500).json({
            error: error instanceof Error ? error.message : 'Wewnętrzny błąd serwera'
        });
    }
});

export default router;