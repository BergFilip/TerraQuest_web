import express, { Request, Response, Router } from 'express';
import { supabase } from '../utils/supabase';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router: Router = express.Router();


router.post("/register", async (req: Request, res: Response, next) => {
    const  { email, password } = req.body;

    const { data, error: err} = await supabase
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

    const { error: insertError } = await supabase.from("users_terraQuest").insert({
        email,
        pass: hashedPass
    })
    if (insertError) next(insertError);

    res.status(200).json({message: 'Registered successful'});
})


router.post('/login', async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ message: 'Missing email or password' });
    }

    const { data, error } = await supabase
        .from('users_terraQuest')
        .select('*')
        .eq('email', email)
        .single();

    if (error || !data) {
        res.status(401).json({ message: 'Invalid credentials' });
    }

    const passwordMatches = await bcrypt.compare(password, data.pass);

    if (!passwordMatches) {
        res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: data.id, email: data.email }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });

    res.status(200).json({
        message: 'Login successful',
        token,
    });
});

export default router;