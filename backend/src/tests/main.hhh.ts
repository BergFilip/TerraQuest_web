import request from 'supertest';
import app from '../main';

describe('Testy integracyjne API', () => {
    it('GET / powinien zwrócić status 200 i wiadomość', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toBe(200);
        expect(res.text).toMatch(/Backend działa/);
    });

    it('GET /api/nierozpoznana powinien zwrócić 404', async () => {
        const res = await request(app).get('/api/nierozpoznana');
        expect(res.statusCode).toBe(404);
    });

    it('GET /api/hotels (placeholder)', async () => {
        const res = await request(app).get('/api/hotels');
        expect([200, 401, 403, 500]).toContain(res.statusCode); // zależnie od zabezpieczeń
    });
});
