import { describe, it, expect } from '@jest/globals';

import { validateEmail, validatePassword } from '../other/auth';

describe('validateEmail', () => {
    it('should return true for valid email', () => {
        expect(validateEmail('test@example.com')).toBe(true);
    });

    it('should return false for invalid email', () => {
        expect(validateEmail('invalid-email')).toBe(false);
        expect(validateEmail('test@.com')).toBe(false);
        expect(validateEmail('test@com')).toBe(false);
        expect(validateEmail('test@domain.')).toBe(false);
    });
});

describe('validatePassword', () => {
    it('should return true for a strong password', () => {
        expect(validatePassword('Str0ng!Pass')).toBe(true);
    });

    it('should return false for password shorter than 8 characters', () => {
        expect(validatePassword('S1!a')).toBe(false);
    });

    it('should return false for password without uppercase', () => {
        expect(validatePassword('weakpass1!')).toBe(false);
    });

    it('should return false for password without number', () => {
        expect(validatePassword('NoNumbers!')).toBe(false);
    });

    it('should return false for password without special character', () => {
        expect(validatePassword('NoSpecial1')).toBe(false);
    });
});

//----------------------- REGISTER -----------------------

import request from 'supertest';
import app from '../main';
import { supabase } from '../utils/supabase';

jest.mock('../utils/supabase', () => {
    const mockSelect = jest.fn().mockReturnThis();
    const mockEq = jest.fn().mockReturnThis();
    const mockSingle = jest.fn();
    const mockInsert = jest.fn().mockReturnThis();

    return {
        supabase: {
            from: jest.fn(() => ({
                select: mockSelect,
                eq: mockEq,
                single: mockSingle,
                insert: mockInsert,
            })) as any, // <-- ważne
        },
    };
});

const mockSingle = (supabase.from('') as any).single as jest.Mock;
const mockInsert = (supabase.from('') as any).insert as jest.Mock;

describe('POST /api/auth/register', () => {
    it('should return 400 for invalid email', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({ email: 'invalid-email', password: 'Valid123!' });

        expect(res.status).toBe(400);
        expect(res.body.message).toBe('Invalid email format');
    });

    it('should return 400 for weak password', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({ email: 'test@example.com', password: 'weak' });

        expect(res.status).toBe(400);
        expect(res.body.message).toContain('Password must be');
    });

    it('should return 400 if user already exists', async () => {
        mockSingle.mockResolvedValueOnce({ data: { email: 'test@example.com' }, error: null });

        const res = await request(app)
            .post('/api/auth/register')
            .send({ email: 'test@example.com', password: 'Valid123!' });

        expect(res.status).toBe(400);
        expect(res.body.message).toBe('User with this email already exists');
    });

    it('should return 500 if insertion fails', async () => {
        mockSingle.mockResolvedValueOnce({ data: null, error: null });
        mockInsert.mockReturnValueOnce({
            select: () => ({
                single: () => Promise.resolve({ data: null, error: { message: 'Insert error' } }),
            }),
        });

        const res = await request(app)
            .post('/api/auth/register')
            .send({ email: 'test@example.com', password: 'Valid123!' });

        expect(res.status).toBe(500);
        expect(res.body.message).toBe('Błąd przy rejestracji użytkownika');
    });

    it('should register user and return 200 with cookie', async () => {
        mockSingle.mockResolvedValueOnce({ data: null, error: null });
        mockInsert.mockReturnValueOnce({
            select: () => ({
                single: () =>
                    Promise.resolve({
                        data: { id: '123', email: 'test@example.com' },
                        error: null,
                    }),
            }),
        });

        const res = await request(app)
            .post('/api/auth/register')
            .send({ email: 'test@example.com', password: 'Valid123!' });

        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Login successful');
        expect(res.body.user.email).toBe('test@example.com');
        expect(res.headers['set-cookie']).toBeDefined();
    });
});

//----------------------- LOGIN -----------------------

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

jest.mock('../../supabaseClient');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('POST /api/auth/login', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return 400 if email or password is missing', async () => {
        const res = await request(app).post('/api/auth/login')
            .send({ email: '', password: '' });
        expect(res.status).toBe(400);
        expect(res.body.message).toBe('Missing email or password');
    });

    it('should return 401 if credentials are invalid', async () => {
        (supabase.from().select().eq().single as jest.Mock).mockResolvedValue({
            error: { message: 'User not found' },
            data: null
        });

        const res = await request(app)
            .post('/api/auth/login')
            .send({ email: 'nonexistent@example.com', password: 'wrongPassword' });

        expect(res.status).toBe(401);
        expect(res.body.message).toBe('Invalid credentials');
    });

    it('should return 401 if password is incorrect', async () => {
        (supabase.from().select().eq().single as jest.Mock).mockResolvedValue({
            error: null,
            data: { id: 1, email: 'test@example.com', pass: 'hashedPassword' }
        });
        (bcrypt.compare as jest.Mock).mockResolvedValue(false);

        const res = await request(app)
            .post('/api/auth/login')
            .send({ email: 'test@example.com', password: 'wrongPassword' });

        expect(res.status).toBe(401);
        expect(res.body.message).toBe('Invalid credentials');
    });

    it('should return 200 and user info if credentials are correct', async () => {
        (supabase.from().select().eq().single as jest.Mock).mockResolvedValue({
            error: null,
            data: { id: 1, email: 'test@example.com', pass: 'hashedPassword' }
        });
        (bcrypt.compare as jest.Mock).mockResolvedValue(true);
        (jwt.sign as jest.Mock).mockReturnValue('mockToken');

        const res = await request(app)
            .post('/api/auth/login')
            .send({ email: 'test@example.com', password: 'ValidPassword123!' });

        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Login successful');
        expect(res.body.user.email).toBe('test@example.com');
        expect(res.headers['set-cookie']).toBeDefined();
    });
});