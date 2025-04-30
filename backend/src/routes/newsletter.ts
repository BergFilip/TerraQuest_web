import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/api/newsletter', async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        const token = req.cookies.token;

        // Sprawdź czy użytkownik jest zalogowany
        if (!token) {
            return res.status(401).json({
                error: 'Musisz być zalogowany, aby zapisać się do newslettera'
            });
        }

        // Zweryfikuj token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as any;

        // Tutaj dodaj logikę zapisu do bazy danych
        // np. zapis do Supabase
        console.log(`Zapisano użytkownika ${decoded.email} do newslettera`);

        res.status(200).json({
            success: true,
            message: 'Zapisano do newslettera'
        });
    } catch (error) {
        console.error('Błąd zapisu do newslettera:', error);
        res.status(500).json({ error: 'Wewnętrzny błąd serwera' });
    }
});

export default router;