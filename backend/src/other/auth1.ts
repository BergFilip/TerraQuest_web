import express, { Request, Response, Router, NextFunction } from 'express';
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

router.post("/register", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {email, password} = req.body;

        if (!validateEmail(email)) {
            res.status(400).json({
                message: "Invalid email format",
            });
            return;
        }

        if (!validatePassword(password)) {
            res.status(400).json({
                message: "Password must be at least 8 characters long and include an uppercase letter, a number, and a special character.",
            });
            return;
        }

        const {data, error: err} = await supabase
            .from('users_terraQuest')
            .select('*')
            .eq('email', email)
            .single();

        if (data) {
            res.status(400).json({
                message: "User with this email already exists",
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

        const {data: insertedUser, error: insertError} = await supabase.from("users_terraQuest").insert({
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
            {id: insertedUser.id, email: insertedUser.email},
            process.env.JWT_SECRET || 'secret',
            {expiresIn: '1h'}
        );

        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            maxAge: 3600 * 1000,
        });

        res.status(200).json({
            message: 'Login successful',
            user: {email: insertedUser.email}
        });
    }
    catch (err){
        console.error('REGISTER ERROR:', err);
        res.status(500).json({ message: 'An error occurred during registration' });
        return
    }
})


router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ message: 'Missing email or password' });
        return
    }

    const { data, error } = await supabase
        .from('users_terraQuest')
        .select('*')
        .eq('email', email)
        .single();

    if (error || !data) {
        res.status(401).json({ message: 'Invalid credentials' });
        return
    }

    const passwordMatches = await bcrypt.compare(password, data.pass);

    if (!passwordMatches) {
        res.status(401).json({ message: 'Invalid credentials' });
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
        message: 'Login successful',
        user: { email: data.email }
    });
});

router.get('/user', async (req: Request, res: Response, next: NextFunction) => {

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
                email,
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

        const usersInfo = data.users_info as unknown as { Name: string; Surname: string } || {};
        const firstName = usersInfo.Name || '';
        const lastName = usersInfo.Surname || '';

        res.status(200).json({
            email: data.email,
            firstName: firstName,
            lastName: lastName
        });
    } catch (err) {
        res.status(401).json({ message: 'Token jest nieprawidłowy' });
    }
});


router.post('/logout', (req: Request, res: Response, next: NextFunction) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout successful' });
});

router.put('/updateProfile', async (req: Request, res: Response, next: NextFunction) => {
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

export default router;