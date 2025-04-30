// newsletterRouter.ts
import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { supabase } from '../utils/supabase';
import { sendNewsletterConfirmation } from '../other/mailer';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        const token = req.cookies.token;

        // Sprawdź czy użytkownik jest zalogowany
        if (!token) {
            return res.status(401).json({
                error: 'Musisz być zalogowany, aby zapisać się do newslettera'
            });
        }

        // Zweryfikuj token (tylko sprawdzenie czy sesja jest aktywna)
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as any;

        // Zapisz do bazy danych (z powiązaniem z użytkownikiem)
        const { data: subscription, error: dbError } = await supabase
            .from('newsletter_subscriptions')
            .insert({
                user_id: decoded.id, // powiązanie z kontem
                email: email, // dowolny email podany w formularzu
                subscribed_at: new Date().toISOString()
            })
            .select()
            .single();

        if (dbError) throw dbError;

        // Wyślij email potwierdzający na podany adres (może być inny niż w koncie)
        await sendNewsletterConfirmation(email);

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