import request from 'supertest';
import express from 'express';
import newsletterRouter from '../routes/newsletter';
import { supabase } from '../utils/supabase';

jest.mock('../utils/supabase', () => ({
    supabase: {
        from: jest.fn(),
    },
}));

const mockedFrom = supabase.from as jest.Mock;

const app = express();
app.use(express.json());
app.use('/', newsletterRouter);

describe('POST / - zapis do newslettera', () => {
    const validEmail = 'user@example.com';

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('zwraca 400 przy braku pola email', async () => {
        const res = await request(app).post('/').send({});
        expect(res.status).toBe(400);
        expect(res.body.error).toMatch(/Email jest wymagany/);
    });

    it('zwraca 400 przy pustym emailu', async () => {
        const res = await request(app).post('/').send({ email: '' });
        expect(res.status).toBe(400);
    });

    it('zwraca 404 jeśli użytkownik nie istnieje', async () => {
        mockedFrom.mockReturnValue({
            select: () => ({
                eq: () => ({
                    single: () => Promise.resolve({ data: null, error: { message: 'Not found' } }),
                }),
            }),
        });

        const res = await request(app).post('/').send({ email: validEmail });
        expect(res.status).toBe(404);
        expect(res.body.error).toMatch(/Użytkownik nie istnieje/);
    });

    it('zwraca komunikat gdy użytkownik już zapisany', async () => {
        mockedFrom.mockReturnValue({
            select: () => ({
                eq: () => ({
                    single: () => Promise.resolve({ data: { id: 123, newsletter: true }, error: null }),
                }),
            }),
        });

        const res = await request(app).post('/').send({ email: validEmail });
        expect(res.status).toBe(200);
        expect(res.body.message).toMatch(/Już jesteś zapisany/);
    });

    it('zapisuje użytkownika jeśli nie był zapisany', async () => {
        mockedFrom
            .mockReturnValueOnce({
                select: () => ({
                    eq: () => ({
                        single: () => Promise.resolve({ data: { id: 1, newsletter: false }, error: null }),
                    }),
                }),
            })
            .mockReturnValueOnce({
                update: () => ({
                    eq: () => ({
                        select: () => ({
                            single: () =>
                                Promise.resolve({
                                    data: { email: validEmail, newsletter: true },
                                    error: null,
                                }),
                        }),
                    }),
                }),
            });

        const res = await request(app).post('/').send({ email: validEmail });
        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.message).toMatch(/Zapisano/);
        expect(res.body.data).toMatchObject({
            email: validEmail,
            newsletter: true,
        });
    });

    it('zwraca 500 gdy update nie powiedzie się', async () => {
        mockedFrom
            .mockReturnValueOnce({
                select: () => ({
                    eq: () => ({
                        single: () =>
                            Promise.resolve({ data: { id: 1, newsletter: false }, error: null }),
                    }),
                }),
            })
            .mockReturnValueOnce({
                update: () => ({
                    eq: () => ({
                        select: () => ({
                            single: () => Promise.resolve({ data: null, error: { message: 'DB fail' } }),
                        }),
                    }),
                }),
            });

        const res = await request(app).post('/').send({ email: validEmail });
        expect(res.status).toBe(500);
        expect(res.body.error).toMatch(/Błąd bazy danych/);
        expect(res.body.details).toBe('DB fail');
    });

    it('zwraca 500 gdy rzuci wyjątek', async () => {
        mockedFrom.mockImplementation(() => {
            throw new Error('unexpected');
        });

        const res = await request(app).post('/').send({ email: validEmail });
        expect(res.status).toBe(500);
        expect(res.body.error).toMatch(/Wewnętrzny błąd/);
    });

    it('obsługuje email z wielkimi literami', async () => {
        const email = 'User@Example.COM';

        mockedFrom
            .mockReturnValueOnce({
                select: () => ({
                    eq: () => ({
                        single: () => Promise.resolve({ data: { id: 2, newsletter: false }, error: null }),
                    }),
                }),
            })
            .mockReturnValueOnce({
                update: () => ({
                    eq: () => ({
                        select: () => ({
                            single: () =>
                                Promise.resolve({ data: { email, newsletter: true }, error: null }),
                        }),
                    }),
                }),
            });

        const res = await request(app).post('/').send({ email });
        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.data.email).toBe(email);
    });

    it('obsługuje email z polskimi znakami (RFC-kompatybilne adresy)', async () => {
        const email = 'żółć@example.com';

        mockedFrom
            .mockReturnValueOnce({
                select: () => ({
                    eq: () => ({
                        single: () => Promise.resolve({ data: { id: 3, newsletter: false }, error: null }),
                    }),
                }),
            })
            .mockReturnValueOnce({
                update: () => ({
                    eq: () => ({
                        select: () => ({
                            single: () =>
                                Promise.resolve({ data: { email, newsletter: true }, error: null }),
                        }),
                    }),
                }),
            });

        const res = await request(app).post('/').send({ email });
        expect(res.status).toBe(200);
    });

    it('ignoruje dodatkowe pola w request body', async () => {
        mockedFrom
            .mockReturnValueOnce({
                select: () => ({
                    eq: () => ({
                        single: () => Promise.resolve({ data: { id: 99, newsletter: false }, error: null }),
                    }),
                }),
            })
            .mockReturnValueOnce({
                update: () => ({
                    eq: () => ({
                        select: () => ({
                            single: () =>
                                Promise.resolve({ data: { email: validEmail, newsletter: true }, error: null }),
                        }),
                    }),
                }),
            });

        const res = await request(app).post('/').send({ email: validEmail, foo: 'bar' });
        expect(res.status).toBe(200);
        expect(res.body.data.email).toBe(validEmail);
    });
});
