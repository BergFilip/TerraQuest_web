import request from 'supertest';
import app from '../main';

describe('Main App', () => {
    it('should respond with backend status on root route', async () => {
        const response = await request(app).get('/');

        expect(response.status).toBe(200);
        expect(response.text).toContain('✅ Backend działa 🚀');
    });

    it('should handle 404 for unknown routes', async () => {
        const response = await request(app).get('/non-existent-route');
        expect(response.status).toBe(404);
    });

});
