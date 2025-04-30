import express, { Request, Response, Router } from 'express';
import { supabase } from '../utils/supabase';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
    const { userEmail, hotel, checkIn, checkOut } = req.body;

    if (!userEmail || !hotel) {
        res.status(400).json({ message: 'Brak wymaganych danych' });
        return
    }

    try {
        const { data: userData, error: userError } = await supabase
            .from('users_terraQuest')
            .select('id')
            .eq('email', userEmail)
            .single();

        console.log(userData?.id);

        if (userError || !userData) {
            res.status(404).json({ message: 'Użytkownik nie znaleziony' });
            return
        }

        const { data, error } = await supabase
            .from('Reservation')
            .insert([
                {
                    id: userData.id,
                    PropertyId: hotel.PropertyId,
                    PropertyName: hotel.PropertyName,
                    ReferencePrice: hotel.ReferencePrice,
                    MaxDiscountPercent: hotel.MaxDiscountPercent,
                    PropertyAddress: hotel.PropertyAddress,
                    PropertyImageUrl: hotel.PropertyImageUrl,
                    PropertyRating: hotel.PropertyRating,
                    TripAdvisorRating: hotel.TripAdvisorRating,
                    ReferencePriceCurrency: hotel.ReferencePriceCurrency,
                    DealsFound: hotel.DealsFound,
                    DealWeight: hotel.DealWeight,
                    AvgDiscountPercent: hotel.AvgDiscountPercent,
                    LocationId: hotel.LocationId,
                    PropertyLatitude: hotel.PropertyLatitude,
                    PropertyLongitude: hotel.PropertyLongitude,
                    PropertyImageUrlHighRes: hotel.PropertyImageUrlHighRes,
                    RatingImageUrl: hotel.RatingImageUrl,
                    CheckIn: checkIn || null,
                    CheckOut: checkOut || null
                }
            ]);

        if (error) {
            console.error('Błąd przy dodawaniu rezerwacji:', error);
            res.status(500).json({ message: 'Błąd przy dodawaniu rezerwacji' });
            return
        }

        res.status(200).json({ message: 'Rezerwacja pomyślnie dodana!', data });
        return
    } catch (err) {
        console.error('Błąd:', err);
        res.status(500).json({ message: 'Wystąpił błąd podczas rezerwacji' });
        return
    }
});

export default router;