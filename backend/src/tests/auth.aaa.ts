import request from 'supertest';
import express from 'express';
import authRoutes from '../other/auth1';
import cookieParser from 'cookie-parser';

jest.mock('@supabase/supabase-js', () => ({
    ...jest.requireActual('@supabase/supabase-js'), // zachowaj oryginalny kod
    createClient: jest.fn().mockReturnValue({
        from: jest.fn().mockReturnValue({
            insert: jest.fn().mockReturnValue({
                select: jest.fn().mockResolvedValue({
                    data: [{ id: '1', email: 'test@example.com' }],
                    error: null
                })
            })
        })
    })
}));

describe('Auth Routes', () => {
    it('should register a new user', async () => {
        const res = await request(app).post('/api/auth/register').send({
            email: 'test@example.com',
            password: 'Password123!'
        });

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('message', 'Login successful');
        expect(res.body.user).toHaveProperty('email', 'test@example.com');
    });
});

jest.mock('bcryptjs', () => ({
    genSalt: jest.fn().mockResolvedValue('salt'),
    hash: jest.fn().mockResolvedValue('hashed_password'),
    compare: jest.fn().mockResolvedValue(true),
}));

jest.mock('jsonwebtoken', () => ({
    sign: jest.fn(() => 'mock_token'),
    verify: jest.fn(() => ({ id: 'user_id', email: 'test@example.com' })),
}));

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use('/', authRoutes);

const { supabase } = require('../utils/supabase');

describe('Auth Routes', () => {

    describe('POST /register', () => {
        it('should register a new user', async () => {
            supabase.single.mockResolvedValueOnce({ data: null });
            supabase.insert.mockResolvedValueOnce({ data: { id: '123', email: 'test@example.com' }, error: null });

            const res = await request(app)
                .post('/register')
                .send({
                    email: 'test@example.com',
                    password: 'StrongP@ssw0rd!',
                });

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('message', 'Login successful');
            expect(res.body.user).toHaveProperty('email', 'test@example.com');
        });
    });

    describe('POST /login', () => {
        it('should login successfully', async () => {
            supabase.single.mockResolvedValueOnce({
                data: { id: 'user123', email: 'test@example.com', pass: 'hashed_password' },
                error: null,
            });

            const res = await request(app)
                .post('/login')
                .send({ email: 'test@example.com', password: 'StrongP@ssw0rd!' });

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('message', 'Login successful');
            expect(res.body.user.email).toBe('test@example.com');
        });
    });

    describe('GET /user', () => {
        it('should return user profile if token valid', async () => {
            supabase.single.mockResolvedValueOnce({
                data: {
                    email: 'test@example.com',
                    users_info: { Name: 'Jan', Surname: 'Kowalski' },
                },
                error: null,
            });

            const res = await request(app)
                .get('/user')
                .set('Cookie', ['token=mock_token']);

            expect(res.status).toBe(200);
            expect(res.body).toMatchObject({
                email: 'test@example.com',
                firstName: 'Jan',
                lastName: 'Kowalski',
            });
        });
    });

    describe('PUT /updateProfile', () => {
        it('should update user profile', async () => {
            supabase.upsert.mockResolvedValueOnce({ error: null });

            const res = await request(app)
                .put('/updateProfile')
                .send({ firstName: 'Anna', lastName: 'Nowak' })
                .set('Cookie', ['token=mock_token']);

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('message', 'Dane zostały zaktualizowane pomyślnie');
        });
    });

    describe('POST /logout', () => {
        it('should clear token cookie and logout', async () => {
            const res = await request(app)
                .post('/logout');

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('message', 'Logout successful');
        });
    });

});
