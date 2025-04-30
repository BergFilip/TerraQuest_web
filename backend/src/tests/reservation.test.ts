import request from 'supertest';
import express from 'express';
import reservationRouter from '../other/reservation';
import { supabase } from '../utils/supabase';

jest.mock('../utils/supabase', () => ({
    supabase: {
        from: jest.fn(() => ({
            select: jest.fn().mockReturnThis(),
            eq: jest.fn().mockReturnThis(),
            single: jest.fn(),
            insert: jest.fn()
        }))
    }
}));

const app = express();
app.use(express.json());
app.use('/', reservationRouter);

describe('Reservation Routes', () => {

    describe('POST /', () => {

        it('should add a reservation successfully', async () => {
            (supabase.from as jest.Mock).mockReturnValueOnce({
                select: jest.fn().mockReturnThis(),
                eq: jest.fn().mockReturnThis(),
                single: jest.fn().mockResolvedValueOnce({ data: { id: 'user-id' }, error: null })
            }).mockReturnValueOnce({
                insert: jest.fn().mockResolvedValueOnce({ data: { id: 'reservation-id' }, error: null })
            });

            const hotelData = {
                PropertyId: 'prop123',
                PropertyName: 'Test Hotel',
                ReferencePrice: 100,
                MaxDiscountPercent: 15,
                PropertyAddress: 'Test Address',
                PropertyImageUrl: 'http://image.url',
                PropertyRating: 4.5,
                TripAdvisorRating: 4,
                ReferencePriceCurrency: 'USD',
                DealsFound: 3,
                DealWeight: 0.8,
                AvgDiscountPercent: 10,
                LocationId: 'loc123',
                PropertyLatitude: 50.06143,
                PropertyLongitude: 19.93658,
                PropertyImageUrlHighRes: 'http://image-highres.url',
                RatingImageUrl: 'http://rating.url',
            };

            const response = await request(app)
                .post('/')
                .send({
                    userEmail: 'test@example.com',
                    hotel: hotelData,
                    checkIn: '2025-06-01',
                    checkOut: '2025-06-10'
                });

            expect(response.status).toBe(200);
            expect(response.body.message).toBe('Rezerwacja pomyślnie dodana!');
            expect(response.body.data).toBeDefined();
        });

        it('should return 400 if required fields are missing', async () => {
            const response = await request(app)
                .post('/')
                .send({
                    userEmail: '',
                    hotel: null
                });

            expect(response.status).toBe(400);
            expect(response.body.message).toBe('Brak wymaganych danych');
        });

        it('should return 404 if user not found', async () => {
            (supabase.from as jest.Mock).mockReturnValueOnce({
                select: jest.fn().mockReturnThis(),
                eq: jest.fn().mockReturnThis(),
                single: jest.fn().mockResolvedValueOnce({ data: null, error: null })
            });

            const response = await request(app)
                .post('/')
                .send({
                    userEmail: 'notfound@example.com',
                    hotel: { PropertyId: 'prop123' }
                });

            expect(response.status).toBe(404);
            expect(response.body.message).toBe('Użytkownik nie znaleziony');
        });

        it('should return 500 if error occurs while inserting reservation', async () => {
            (supabase.from as jest.Mock).mockReturnValueOnce({
                select: jest.fn().mockReturnThis(),
                eq: jest.fn().mockReturnThis(),
                single: jest.fn().mockResolvedValueOnce({ data: { id: 'user-id' }, error: null })
            }).mockReturnValueOnce({
                insert: jest.fn().mockResolvedValueOnce({ data: null, error: { message: 'Insert error' } })
            });

            const response = await request(app)
                .post('/')
                .send({
                    userEmail: 'test@example.com',
                    hotel: { PropertyId: 'prop123' }
                });

            expect(response.status).toBe(500);
            expect(response.body.message).toBe('Błąd przy dodawaniu rezerwacji');
        });

        it('should handle unexpected server errors', async () => {
            (supabase.from as jest.Mock).mockImplementationOnce(() => {
                throw new Error('Unexpected error');
            });

            const response = await request(app)
                .post('/')
                .send({
                    userEmail: 'test@example.com',
                    hotel: { PropertyId: 'prop123' }
                });

            expect(response.status).toBe(500);
            expect(response.body.message).toBe('Wystąpił błąd podczas rezerwacji');
        });

    });

});
