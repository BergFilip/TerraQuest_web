import express, { Request, Response, Router } from 'express';
import { supabase } from '../utils/supabase';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router: Router = express.Router();

const validateEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
};


const validatePassword = (password: string): boolean => {
    const minLength = 8;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return password.length >= minLength && passwordRegex.test(password);
};

router.post("/register", async (req: Request, res: Response) => {
    const  { email, password } = req.body;

    if (!validateEmail(email)) {
        res.status(400).json({
            message: "Nieprawidłowy format wiadomości e-mail",
        });
        return;
    }

    if (!validatePassword(password)) {
        res.status(400).json({
            message: "Hasło musi mieć co najmniej 8 znaków i zawierać wielką literę, cyfrę i znak specjalny.",
        });
        return;
    }

    const { data, error: err} = await supabase
        .from('users_terraQuest')
        .select('*')
        .eq('email', email)
        .single();

    if (data) {
        res.status(400).json({
            message: "Użytkownik z tym adresem e-mail już istnieje",
        })
        return
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt)

    type User = {
        id: string;
        email: string;
        pass: string;
    };

    const { data: insertedUser , error: insertError } = await supabase.from("users_terraQuest").insert({
        email,
        pass: hashedPass
    }).select("*").single();

    if (insertError || !insertedUser) {
        res.status(500).json({
            message: 'Błąd przy rejestracji użytkownika',
            error: insertError?.message || 'Brak danych użytkownika po rejestracji',
        });
        return
    }

    const token = jwt.sign(
        { id: insertedUser.id, email: insertedUser.email },
        process.env.JWT_SECRET || 'secret',
        { expiresIn: '1h' }
    );

    res.cookie('token', token, {
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
        maxAge: 3600 * 1000,
    });

    res.status(200).json({
        message: 'Pomyślnie zalogowano',
        user: { email: insertedUser.email }
    });
})

router.post('/login', async (req: Request, res: Response) => {

    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ message: 'Brak adresu e-mail lub hasła' });
        return
    }

    try{

        const response = await supabase
            .from('users_terraQuest')
            .select('*')
            .eq('email', email)
            .single();

        if (response.error) {
            res.status(401).json({ message: 'Nieprawidłowe dane logowania' });
            return
        }

        if (!response.data) {
            res.status(401).json({ message: 'Nieprawidłowe dane logowania' });
            return
        }

        const { data } = response;

        const passwordMatches = await bcrypt.compare(password, data.pass);

        if (!passwordMatches) {
            res.status(401).json({ message: 'Nieprawidłowe dane logowania' });
            return
        }

        const token = jwt.sign(
            { id: data.id, email: data.email },
            process.env.JWT_SECRET || 'secret',
            { expiresIn: '1h' }
        );

        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            maxAge: 3600 * 1000,
        });

        res.status(200).json({
            message: 'Pomyślnie zalogowano',
            user: { email: data.email }
        });
    }
    catch (err: unknown) {
        console.error('Login error:', err);
        res.status(500).json({ error: 'Wewnętrzny błąd serwera' });
        return
    }
});

router.get('/user', async (req: Request, res: Response) => {

    const token = req.cookies.token;

    if (!token) {
        res.status(401).json({ message: 'Brak tokenu' });
        return;
    }

    try {
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'secret');
        const userId = decoded.id;

        const { data, error } = await supabase
            .from('users_terraQuest')
            .select(`
                id,
                email,
                newsletter,
                users_info:users_info (
                    Name,
                    Surname
                )
            `)
            .eq('id', userId)
            .single();

        if (error || !data) {
            res.status(404).json({ message: 'Użytkownik nie znaleziony' });
            return;
        }


        const { data: userInfoData, error: userInfoError } = await supabase
            .from('users_info')
            .select('Name, Surname')
            .eq('id', userId)
            .single();

        const firstName = userInfoData?.Name || '';
        const lastName = userInfoData?.Surname || '';


        res.status(200).json({
            id: data.id, // KLUCZOWE - frontend tego oczekuje
            email: data.email,
            newsletter: data.newsletter,
            firstName, // Dodajemy imię
            lastName
        });
    } catch (err) {
        res.status(401).json({ message: 'Token jest nieprawidłowy' });
    }
});


router.post('/logout', (req: Request, res: Response) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Pomyślnie wylogowano' });
});

router.put('/updateProfile', async (req: Request, res: Response) => {
    const token = req.cookies.token;

    if (!token) {
        res.status(401).json({ message: 'Brak tokenu' });
        return;
    }

    let userId: string;

    try {
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'secret');
        userId = decoded.id;
    } catch (err) {
        res.status(401).json({ message: 'Nieprawidłowy token' });
        return;
    }

    const { firstName, lastName } = req.body;

    if (!firstName || !lastName) {
        res.status(400).json({ message: 'Brakuje imienia lub nazwiska' });
        return;
    }

    const { error } = await supabase
        .from('users_info')
        .upsert({
            id: userId,
            Name: firstName,
            Surname: lastName,
        }, { onConflict: 'id' });

    if (error) {
        console.error("Błąd z Supabase:", error);
        res.status(500).json({ message: 'Błąd przy aktualizacji danych osobowych', error: error.message });
        return;
    }

    res.status(200).json({ message: 'Dane zostały zaktualizowane pomyślnie' });
});

export { validateEmail, validatePassword };
export default router;