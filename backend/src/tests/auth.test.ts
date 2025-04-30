import request from 'supertest';
import express from 'express';
import authRouter, { validateEmail, validatePassword } from '../other/auth'
import { supabase } from '../utils/supabase';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

jest.mock('../utils/supabase', () => ({
    supabase: {
        from: jest.fn(() => ({
            select: jest.fn().mockReturnThis(),
            eq: jest.fn().mockReturnThis(),
            single: jest.fn(),
            insert: jest.fn().mockReturnThis(),
            upsert: jest.fn()
        }))
    }
}));

jest.mock('bcryptjs', () => ({
    genSalt: jest.fn(() => Promise.resolve('salt')),
    hash: jest.fn(() => Promise.resolve('hashedPassword')),
    compare: jest.fn(() => Promise.resolve(true))
}));

jest.mock('jsonwebtoken', () => ({
    sign: jest.fn(() => 'mockedToken'),
    verify: jest.fn(() => ({ id: '123', email: 'test@example.com' }))
}));

const app = express();
app.use(express.json());
app.use(authRouter);

describe('Auth Routes', () => {

    describe('validateEmail', () => {
        it('should validate correct email', () => {
            expect(validateEmail('test@example.com')).toBe(true);
        });

        it('should invalidate incorrect email', () => {
            expect(validateEmail('bademail')).toBe(false);
        });
    });

    describe('validatePassword', () => {
        it('should validate correct password', () => {
            expect(validatePassword('StrongPass1!')).toBe(true);
        });

        it('should invalidate incorrect password', () => {
            expect(validatePassword('weak')).toBe(false);
        });
    });

    describe('POST /register', () => {
        it('should register a user successfully', async () => {
            (supabase.from as jest.Mock).mockReturnValueOnce({
                select: jest.fn().mockReturnThis(),
                eq: jest.fn().mockReturnThis(),
                single: jest.fn().mockResolvedValueOnce({ data: null })
            }).mockReturnValueOnce({
                insert: jest.fn().mockReturnThis(),
                select: jest.fn().mockReturnThis(),
                single: jest.fn().mockResolvedValueOnce({ data: { id: '123', email: 'test@example.com' } })
            });

            const response = await request(app)
                .post('/register')
                .send({ email: 'test@example.com', password: 'StrongPass1!' });

            expect(response.status).toBe(200);
            expect(response.body.message).toBe('Pomyślnie zalogowano');
            expect(response.body.user.email).toBe('test@example.com');
        });

        it('should reject weak password', async () => {
            const response = await request(app)
                .post('/register')
                .send({ email: 'test@example.com', password: 'weak' });

            expect(response.status).toBe(400);
            expect(response.body.message).toContain('Hasło musi mieć');
        });
    });

    describe('POST /login', () => {
        it('should login successfully', async () => {
            (supabase.from as jest.Mock).mockReturnValueOnce({
                select: jest.fn().mockReturnThis(),
                eq: jest.fn().mockReturnThis(),
                single: jest.fn().mockResolvedValueOnce({ data: { id: '123', email: 'test@example.com', pass: 'hashedPassword' } })
            });

            const response = await request(app)
                .post('/login')
                .send({ email: 'test@example.com', password: 'StrongPass1!' });

            expect(response.status).toBe(200);
            expect(response.body.message).toBe('Pomyślnie zalogowano');
            expect(response.body.user.email).toBe('test@example.com');
        });
    });

    describe('POST /logout', () => {
        it('should logout successfully', async () => {
            const response = await request(app)
                .post('/logout');

            expect(response.status).toBe(200);
            expect(response.body.message).toBe('Pomyślnie wylogowano');
        });
    });

});
