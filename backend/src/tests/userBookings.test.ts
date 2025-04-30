import request from 'supertest';
import express from 'express';
import userBookingsRouter from '../other/userBookings';
import { supabase } from '../utils/supabase';
import jwt from 'jsonwebtoken';

jest.mock('jsonwebtoken', () => ({
    verify: jest.fn()
}));

jest.mock('../utils/supabase', () => ({
    supabase: {
        from: jest.fn(() => ({
            select: jest.fn().mockReturnThis(),
            eq: jest.fn().mockReturnThis(),
            delete: jest.fn().mockReturnThis()
        }))
    }
}));

const app = express();
app.use(express.json());
app.use((req, res, next) => {
    req.cookies = {};
    next();
});
app.use('/', userBookingsRouter);

describe('User Bookings Routes', () => {

    describe('GET /', () => {
        it('should return bookings for a user', async () => {
            (supabase.from as jest.Mock).mockReturnValueOnce({
                select: jest.fn().mockReturnThis(),
                eq: jest.fn().mockResolvedValueOnce({
                    data: [{ PropertyName: 'Hotel Testowy' }],
                    error: null
                })
            });

            const response = await request(app)
                .get('/')
                .query({ userId: 'user-id' });

            expect(response.status).toBe(200);
            expect(response.body).toEqual([{ PropertyName: 'Hotel Testowy' }]);
        });

        it('should return 400 if userId is missing', async () => {
            const response = await request(app)
                .get('/');

            expect(response.status).toBe(400);
            expect(response.body.error).toBe('User ID is required');
        });

        it('should return 500 if database error occurs', async () => {
            (supabase.from as jest.Mock).mockReturnValueOnce({
                select: jest.fn().mockReturnThis(),
                eq: jest.fn().mockResolvedValueOnce({
                    data: null,
                    error: { message: 'DB Error' }
                })
            });

            const response = await request(app)
                .get('/')
                .query({ userId: 'user-id' });

            expect(response.status).toBe(500);
            expect(response.body.error).toBe('Database error');
        });

        it('should return 500 if unexpected server error occurs', async () => {
            (supabase.from as jest.Mock).mockImplementationOnce(() => {
                throw new Error('Unexpected server error');
            });

            const response = await request(app)
                .get('/')
                .query({ userId: 'user-id' });

            expect(response.status).toBe(500);
            expect(response.body.error).toBe('Internal server error');
        });
    });

    describe('DELETE /:propertyId', () => {

        beforeEach(() => {
            (jwt.verify as jest.Mock).mockReset();
        });

        it('should return 401 if no token provided', async () => {
            const response = await request(app)
                .delete('/property123');

            expect(response.status).toBe(401);
            expect(response.body.message).toBe('Brak tokenu');
        });
    });
});
