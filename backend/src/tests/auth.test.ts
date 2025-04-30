import request from 'supertest';
import express from 'express';
import authRouter, { validateEmail, validatePassword } from '../other/auth';
import { supabase } from '../utils/supabase';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


jest.mock('../utils/supabase', () => {
    const mockSingle = jest.fn();
    return {
        supabase: {
            from: jest.fn(() => ({
                select: jest.fn(() => ({
                    eq: jest.fn(() => ({
                        single: mockSingle
                    }))
                })),
                insert: jest.fn(() => ({
                    select: jest.fn(() => ({
                        single: mockSingle
                    }))
                })),
                upsert: jest.fn()
            })),
        },
        mockSingle
    };
});

jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(authRouter);

describe('validateEmail', () => {
    it('should validate correct email', () => {
        expect(validateEmail('test@example.com')).toBe(true);
    });

    it('should invalidate incorrect email', () => {
        expect(validateEmail('invalid-email')).toBe(false);
    });
});

describe('validatePassword', () => {
    it('should validate correct password', () => {
        expect(validatePassword('StrongP@ss1')).toBe(true);
    });

    it('should invalidate short password', () => {
        expect(validatePassword('S@1a')).toBe(false);
    });

    it('should invalidate password without special character', () => {
        expect(validatePassword('Password1')).toBe(false);
    });
});

describe('POST /register', () => {
    it('should register a new user', async () => {
        const { mockSingle } = require('../utils/supabase');
        mockSingle.mockResolvedValueOnce({ data: null, error: null });
        mockSingle.mockResolvedValueOnce({ data: { id: '1', email: 'test@example.com' }, error: null });

        (bcrypt.genSalt as jest.Mock).mockResolvedValue('salt');
        (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');
        (jwt.sign as jest.Mock).mockReturnValue('fakeToken');

        const response = await request(app).post('/register').send({
            email: 'test@example.com',
            password: 'StrongP@ss1'
        });

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            message: 'Pomyślnie zalogowano',
            user: { email: 'test@example.com' }
        });
    });

    it('should not register with invalid email', async () => {
        const response = await request(app).post('/register').send({
            email: 'bademail',
            password: 'StrongP@ss1'
        });

        expect(response.status).toBe(400);
    });

    it('should not register if user already exists', async () => {
        const { mockSingle } = require('../utils/supabase');
        mockSingle.mockResolvedValueOnce({ data: { email: 'test@example.com' }, error: null });

        const response = await request(app).post('/register').send({
            email: 'test@example.com',
            password: 'StrongP@ss1'
        });

        expect(response.status).toBe(400);
    });
});

describe('POST /login', () => {
    it('should login a user', async () => {
        const { mockSingle } = require('../utils/supabase');
        mockSingle.mockResolvedValueOnce({ data: { id: '1', email: 'test@example.com', pass: 'hashedPassword' }, error: null });

        (bcrypt.compare as jest.Mock).mockResolvedValue(true);
        (jwt.sign as jest.Mock).mockReturnValue('fakeToken');

        const response = await request(app).post('/login').send({
            email: 'test@example.com',
            password: 'StrongP@ss1'
        });

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            message: 'Pomyślnie zalogowano',
            user: { email: 'test@example.com' }
        });
    });

    it('should not login with wrong password', async () => {
        const { mockSingle } = require('../utils/supabase');
        mockSingle.mockResolvedValueOnce({ data: { pass: 'hashedPassword' }, error: null });

        (bcrypt.compare as jest.Mock).mockResolvedValue(false);

        const response = await request(app).post('/login').send({
            email: 'test@example.com',
            password: 'WrongPassword'
        });

        expect(response.status).toBe(401);
    });
});

describe('GET /user', () => {
    it('should get user profile', async () => {
        const { mockSingle } = require('../utils/supabase');
        mockSingle.mockResolvedValueOnce({
            data: {
                email: 'test@example.com',
                users_info: { Name: 'John', Surname: 'Doe' }
            },
            error: null
        });

        (jwt.verify as jest.Mock).mockReturnValue({ id: '1', email: 'test@example.com' });

        const agent = request.agent(app);
        const response = await agent
            .get('/user')
            .set('Cookie', ['token=fakeToken']);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            email: 'test@example.com',
            firstName: 'John',
            lastName: 'Doe'
        });
    });
});

describe('POST /logout', () => {
    it('should clear the token cookie', async () => {
        const response = await request(app).post('/logout');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'Pomyślnie wylogowano' });
    });
});

describe('PUT /updateProfile', () => {
    it('should update user profile', async () => {
        (jwt.verify as jest.Mock).mockReturnValue({ id: '1', email: 'test@example.com' });
        (supabase.from().upsert as jest.Mock).mockResolvedValueOnce({ error: null });

        const agent = request.agent(app);
        const response = await agent
            .put('/updateProfile')
            .set('Cookie', ['token=fakeToken'])
            .send({ firstName: 'John', lastName: 'Doe' });

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'Dane zostały zaktualizowane pomyślnie' });
    });
});