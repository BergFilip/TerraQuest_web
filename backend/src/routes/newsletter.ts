import express, { Request, Response } from 'express';
import { supabase } from '../utils/supabase';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
    const { email } = req.body;

    if (!email) {
         res.status(400).json({
            success: false,
            error: 'Email jest wymagany'
        });
        return
    }

    try {
        const { data: userData, error: userError } = await supabase
            .from('users_terraQuest')
            .select('id, newsletter')
            .eq('email', email)
            .single();

        if (userError || !userData) {
            res.status(404).json({
                success: false,
                error: 'Użytkownik nie istnieje'
            });
            return
        }

        if (userData.newsletter === true) {
            res.status(200).json({
                success: false,
                message: 'Już jesteś zapisany do newslettera'
            });
            return
        }

        const { error: updateError, data: updatedData } = await supabase
            .from('users_terraQuest')
            .update({
                newsletter: true,
            })
            .eq('id', userData.id)
            .select('email, newsletter')
            .single();

        if (updateError) {
             res.status(500).json({
                success: false,
                error: 'Błąd bazy danych',
                details: updateError.message
            });
            return
        }

         res.status(200).json({
            success: true,
            message: 'Zapisano do newslettera',
            data: updatedData
        });
        return

    } catch (err) {
        res.status(500).json({
            success: false,
            error: 'Wewnętrzny błąd serwera'
        });
        return
    }
});

export default router;
