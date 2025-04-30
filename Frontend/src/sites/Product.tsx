import "../styles/sites/Product.scss";
import HSection from "../components/h-section.tsx";
import ReviewCard from "../components/ReviewCard.tsx";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

// Typ dla recenzji
type Review = {
    title: string;
    description: string;
    reviewer: string;
    date: string;
    rating: number;
    image: string;
};

// Typ dla hotelu
type Hotel = {
    PropertyName: string;
    PropertyAddress: string;
    PropertyRating: number;
    PropertyImageUrlHighRes: string;
    ReferencePrice: number;
    ReferencePriceCurrency: string;
    MaxDiscountPercent: number;
};

function Product() {
    const { isLoggedIn, userEmail } = useAuth();
    const [reviews, setReviews] = useState<Review[]>([]);
    const [hotel, setHotel] = useState<Hotel | null>(null); // Poprawione tutaj

    // Przykładowe kursy walut
    const [currencyRates] = useState({
        USD: 4.3,
        EUR: 4.5,
    });

    const handleReservation = async () => {
        if (!isLoggedIn || !userEmail) {
            alert("❌ Musisz być zalogowany, aby zarezerwować hotel.");
            return;
        }

        try {
            const reservationData = {
                userEmail,
                hotel,
            };

            await axios.post("http://localhost:5000/api/reservations", reservationData, { withCredentials: true });
            alert("✅ Rezerwacja dodana!");
        } catch (error) {
            console.error("❌ Błąd przy rezerwacji:", error);
            alert("❌ Coś poszło nie tak przy rezerwacji.");
        }
    };

    // Pobieranie recenzji
    useEffect(() => {
        const fetchReview = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/reviews");
                if (Array.isArray(res.data)) setReviews(res.data);
            } catch (error) {
                console.error("❌ Błąd ładowania recenzji:", error);
            }
        };

        fetchReview();
    }, []);

    // Pobieranie danych hotelu z localStorage
    useEffect(() => {
        const savedHotel = localStorage.getItem("selectedHotel");
        if (savedHotel) {
            setHotel(JSON.parse(savedHotel)); // Ustawienie hotelu w stanie
        }
    }, []);

    // Funkcja do konwersji walut na PLN
    const convertToPLN = (price: number, currency: string): number => {
        if (currency === "USD") {
            return price * currencyRates.USD;
        } else if (currency === "EUR") {
            return price * currencyRates.EUR;
        }
        return price; // Jeśli cena jest już w PLN
    };

    // Obliczenie ceny po zniżce
    const calculateDiscountedPrice = (price: number, discountPercent: number): number => {
        return price * (1 - discountPercent / 100);
    };

    if (!hotel) {
        return <p>Ładowanie danych hotelu...</p>;
    }

    const discountedPrice = calculateDiscountedPrice(hotel.ReferencePrice, hotel.MaxDiscountPercent);

    return (
        <section className="product_site">
            <div className="product_container">
                <div className="product_box">
                    <div className="product_header">
                        <div className="product_main-image">
                            <img src={hotel.PropertyImageUrlHighRes} alt="Wybrane zdjęcie" />
                        </div>
                        <div className="product_info">
                            <h2>{hotel.PropertyName}</h2>
                            <span>({hotel.PropertyAddress})</span>
                            <p className="product_duration">za 1 noc</p>
                            <p className="product_price">
                                <span className="old_price">
                                    {convertToPLN(hotel.ReferencePrice, hotel.ReferencePriceCurrency).toFixed(2)} PLN
                                </span>
                                <span className="new_price">
                                    {convertToPLN(discountedPrice, hotel.ReferencePriceCurrency).toFixed(2)} PLN
                                </span>
                            </p>
                            <button className="product_button" onClick={handleReservation}>Zarezerwuj</button>
                            <p className="product_note">{hotel.PropertyAddress}</p>
                        </div>
                    </div>

                    <div className="product_amenities">
                        <h3>Najlepsze udogodnienia</h3>
                        <ul>
                            <li><i className="fa-solid fa-wifi"></i>Wi-Fi w lobby</li>
                            <li><i className="fa-solid fa-wifi"></i>Wi-Fi w pokojach</li>
                            <li><i className="fa-solid fa-utensils"></i>Restauracja</li>
                            <li><i className="fa-solid fa-mug-hot"></i>Bar hotelowy</li>
                            <li><i className="fa-solid fa-heart"></i>Fitness</li>
                        </ul>
                    </div>

                    <div className="product_details">
                        <h3>Opis hotelu</h3>
                        <p>{hotel.PropertyName} to {hotel.PropertyAddress}. Posiada {hotel.PropertyRating} gwiazdek i oferuje wyjątkowe udogodnienia, takie jak basen, restauracja i wiele innych. Idealne miejsce na odpoczynek.</p>
                    </div>
                </div>

                <div className="sectaion5">
                    <HSection text1="Oceny klientów" text2="Statystyki mówią same za siebie"/>
                    <div className="card_review_section">
                        {reviews.length > 0 ? (
                            <ReviewCard reviews={reviews.slice(9, 17)} />
                        ) : (
                            <p>Ładowanie recenzji...</p>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Product;
