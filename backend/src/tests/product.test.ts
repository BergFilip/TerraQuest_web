import request from 'supertest';
import express from 'express';
import hotelsRouter from '../routes/product';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const app = express();
app.use(express.json());
app.use('/hotels', hotelsRouter);

describe('GET /hotels/search', () => {
    it('powinno zwrócić listę hoteli dla poprawnego miasta', async () => {
        mockedAxios.get.mockResolvedValueOnce({
            data: [
                { name: 'Hotel ABC', id: 1 },
                { name: 'Hotel XYZ', id: 2 }
            ]
        });

        const res = await request(app).get('/hotels/search?city=Gdańsk');

        expect(res.status).toBe(200);
        expect(res.body).toHaveLength(2);
    });

    it('powinno zwrócić 400 gdy nie podano miasta', async () => {
        const res = await request(app).get('/hotels/search');

        expect(res.status).toBe(400);
        expect(res.body).toEqual({ error: "Brakuje parametru 'city'" });
    });

    it('powinno zwrócić 404 gdy API nie zwróci hoteli', async () => {
        mockedAxios.get.mockResolvedValueOnce({ data: [] });

        const res = await request(app).get('/hotels/search?city=Atlantis');

        expect(res.status).toBe(404);
        expect(res.body.error).toContain('Brak hoteli');
    });

    it('powinno zwrócić 500 gdy axios rzuca wyjątkiem (np. timeout)', async () => {
        mockedAxios.get.mockRejectedValueOnce(new Error('timeout'));

        const res = await request(app).get('/hotels/search?city=Krakow');

        expect(res.status).toBe(500);
        expect(res.body.error).toContain('Wystąpił błąd');
    });

    it('powinno obsłużyć odpowiedź bez danych (undefined)', async () => {
        mockedAxios.get.mockResolvedValueOnce({ data: undefined });

        const res = await request(app).get('/hotels/search?city=Lodz');

        expect(res.status).toBe(404);
        expect(res.body).toHaveProperty('error');
    });

    it('powinno odfiltrować dane niebędące tablicą', async () => {
        mockedAxios.get.mockResolvedValueOnce({ data: null });

        const res = await request(app).get('/hotels/search?city=Poznań');

        expect(res.status).toBe(404);
    });
});

describe('GET /hotels/:hotelId', () => {
    const mockHotel = {
        PropertyName: "Hotel Warszawa",
        PropertyAddress: "ul. Przykładowa 123",
        ReferencePrice: 400,
        PropertyImageUrlHighRes: "http://example.com/hotel.jpg",
        PropertyRating: 4,
        TripAdvisorRating: 4.5,
        TripAdvisorReviewCount: 128
    };

    it('powinno zwrócić dane hotelu', async () => {
        mockedAxios.get.mockResolvedValueOnce({ data: mockHotel });

        const res = await request(app).get('/hotels/12345');

        expect(res.status).toBe(200);
        expect(res.body.PropertyName).toBe('Hotel Warszawa');
    });

    it('powinno zwrócić 404 dla pustych danych', async () => {
        mockedAxios.get.mockResolvedValueOnce({ data: {} });

        const res = await request(app).get('/hotels/99999');

        expect(res.status).toBe(404);
        expect(res.body).toHaveProperty('error');
    });

    it('powinno zwrócić 500 gdy axios rzuca wyjątek', async () => {
        mockedAxios.get.mockRejectedValueOnce(new Error('API niedostępne'));

        const res = await request(app).get('/hotels/456');

        expect(res.status).toBe(500);
        expect(res.body).toHaveProperty('error');
    });

    it('powinno poradzić sobie z odpowiedzią null', async () => {
        mockedAxios.get.mockResolvedValueOnce({ data: null });

        const res = await request(app).get('/hotels/123');

        expect(res.status).toBe(404);
    });

    it('powinno obsłużyć hotelId zawierający znaki specjalne', async () => {
        mockedAxios.get.mockResolvedValueOnce({ data: mockHotel });

        const res = await request(app).get('/hotels/abc123!@#');

        expect(res.status).toBe(200);
    });

    it('powinno zwrócić dane jeśli hotelId jest liczbą', async () => {
        mockedAxios.get.mockResolvedValueOnce({ data: mockHotel });

        const res = await request(app).get('/hotels/789');

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('TripAdvisorRating');
    });
});
