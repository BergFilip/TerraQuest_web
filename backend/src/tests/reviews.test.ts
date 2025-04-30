import request from 'supertest';
import express from 'express';
import reviewRouter from '../routes/reviews';
import { supabase } from '../supabaseClient';

jest.mock('../supabaseClient', () => {
    const mockSelect = jest.fn();
    const mockFrom = jest.fn(() => ({ select: mockSelect }));
    return {
        supabase: {
            from: mockFrom
        }
    };
});

const app = express();
app.use('/', reviewRouter);

describe('GET /reviews', () => {
    afterEach(() => {
        jest.clearAllMocks();
        jest.restoreAllMocks();
    });

    it('should return reviews with correct images by gender', async () => {
        const { supabase } = require('../supabaseClient');
        supabase.from().select.mockResolvedValueOnce({
            data: [
                { title: 'T1', description: 'D1', reviewer: 'Anna', date: '2023-01-01', rating: 5 },
                { title: 'T2', description: 'D2', reviewer: 'Piotr', date: '2023-01-02', rating: 4 },
            ],
            error: null
        });

        const response = await request(app).get('/');
        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(2);

        const [anna, piotr] = response.body;

        expect(anna.reviewer).toBe('Anna');
        expect(anna.image).toMatch(/k\.webp$/);

        expect(piotr.reviewer).toBe('Piotr');
        expect(piotr.image).toMatch(/m\.webp$/);
    });

    it('should handle reviewers with no name', async () => {
        const { supabase } = require('../supabaseClient');
        supabase.from().select.mockResolvedValueOnce({
            data: [{ title: 'T3', description: 'D3', reviewer: '', date: '2023-01-03', rating: 3 }],
            error: null
        });

        const response = await request(app).get('/');
        expect(response.status).toBe(200);
        expect(response.body[0].image).toMatch(/m\.webp$|k\.webp$/);
    });

    it('should assign image even with undefined reviewer', async () => {
        const { supabase } = require('../supabaseClient');
        supabase.from().select.mockResolvedValueOnce({
            data: [{ title: 'T4', description: 'D4', reviewer: undefined, date: '2023-01-04', rating: 3 }],
            error: null
        });

        const response = await request(app).get('/');
        expect(response.status).toBe(200);
        expect(response.body[0].image).toMatch(/m\.webp$|k\.webp$/);
    });

    it('should return 404 if no reviews are found', async () => {
        const { supabase } = require('../supabaseClient');
        supabase.from().select.mockResolvedValueOnce({
            data: [],
            error: null
        });

        const response = await request(app).get('/');
        expect(response.status).toBe(404);
        expect(response.body).toEqual({ error: 'Brak recenzji w bazie' });
    });

    it('should return 500 on unexpected error', async () => {
        const { supabase } = require('../supabaseClient');
        supabase.from().select.mockRejectedValueOnce(new Error('Database error'));

        const response = await request(app).get('/');
        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: 'Błąd serwera' });
    });
});
