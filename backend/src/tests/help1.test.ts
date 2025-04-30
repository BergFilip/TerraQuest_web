import request from 'supertest';
import express from 'express';
import helpRouter from '../routes/help1';
import { supabase } from '../supabaseClient';

jest.mock('../supabaseClient', () => ({
    supabase: {
        from: jest.fn()
    }
}));

const app = express();
app.use(express.json());
app.use('/api/help1', helpRouter);

describe('Help1 Router', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return FAQs if data is found', async () => {
        (supabase.from as jest.Mock).mockReturnValueOnce({
            select: jest.fn().mockResolvedValueOnce({
                data: [
                    { title: 'FAQ 1', content: 'Content 1', colorB: '#fff', colorT: '#000' },
                    { title: 'FAQ 2', content: 'Content 2', colorB: '#eee', colorT: '#111' }
                ],
                error: null
            })
        });

        const response = await request(app).get('/api/help1/faq');

        expect(response.status).toBe(200);
        expect(response.body).toEqual([
            { title: 'FAQ 1', content: 'Content 1', colorB: '#fff', colorT: '#000' },
            { title: 'FAQ 2', content: 'Content 2', colorB: '#eee', colorT: '#111' }
        ]);
    });

    it('should return 404 if no data or error occurs', async () => {
        (supabase.from as jest.Mock).mockReturnValueOnce({
            select: jest.fn().mockResolvedValueOnce({
                data: [],
                error: null
            })
        });

        const response = await request(app).get('/api/help1/faq');

        expect(response.status).toBe(404);
        expect(response.body.error).toBe('Brak danych FAQ w bazie');
    });

    it('should return 500 on server error', async () => {
        (supabase.from as jest.Mock).mockImplementationOnce(() => {
            throw new Error('Unexpected error');
        });

        const response = await request(app).get('/api/help1/faq');

        expect(response.status).toBe(500);
        expect(response.body.error).toBe('Błąd serwera');
    });
});
