import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";  // Importujemy useNavigate do przekierowania
import axios from "axios";
import "../styles/sites/Explore.scss";
import HSection from "../components/h-section.tsx";
import Places_5 from "../components/places_section_5.tsx";
import ReviewCard from "../components/ReviewCard.tsx";


type Hotel = {
    PropertyId: number;
    PropertyName: string;
    ReferencePrice: number;
    MaxDiscountPercent: number;
    PropertyAddress: string;
    PropertyImageUrl: string;
};

type Review = {
    title: string;
    description: string;
    reviewer: string;
    date: string;
    rating: number;
    image: string;
};

function Explore() {
    const [hotels, setHotels] = useState<Hotel[]>([]);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Nowe stany dla formularza
    const [destination, setDestination] = useState('');
    const [startDate, setStartDate] = useState('');
    const [numUsers, setNumUsers] = useState(1);

    const navigate = useNavigate();  // Hook do przekierowania

    // Funkcja do obsługi wysłania formularza
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Zapisujemy dane w localStorage
        localStorage.setItem('destination', destination);
        localStorage.setItem('startDate', startDate);
        localStorage.setItem('numUsers', numUsers.toString());

        // Przekierowanie na stronę wyników
        navigate('/results');
    };

    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const res = await axios.get("/api/hotels?city=paris");
                if (Array.isArray(res.data)) setHotels(res.data);
            } catch (error) {
                console.error("❌ Błąd ładowania hoteli:", error);
            }
        };

        const fetchReview = async () => {
            try {
                const res = await axios.get("/api/reviews");
                if (Array.isArray(res.data)) setReviews(res.data);
            } catch (error) {
                console.error("❌ Błąd ładowania recenzji:", error);
            }
        };

        fetchHotels();
        fetchReview();
    }, []);

    const currentHotels = hotels.slice(currentIndex, currentIndex + 4);

    return (
        <section className="explore_site">
            <div className="section1">
                <h1>Zaoszczędzisz do 40% na następnym pobycie w hotelu</h1>
                <p className="s1_baner">Porównujemy ceny pokoi hotelowych na ponad 100 stronach</p>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Miejsce docelowe"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                    />
                    <input
                        type="date"
                        placeholder="Data wyjazdu"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Ilość uczestników"
                        value={numUsers}
                        onChange={(e) => setNumUsers(Number(e.target.value))}
                    />
                    <input type="submit" value="Wyszukaj" className="alert-button" />
                </form>
            </div>

            <div className="explore_home_section">
                <div className="section4"></div>

                <div className="section3">
                    <HSection
                        text1="Często wyszukiwane "
                        text2={`Zaoszczędź na pobytach w okresie 31 stycznia - 2 lutego`}
                    />

                    <div className="places_section_5">
                        {currentHotels.length > 0 ? (
                            currentHotels.map((hotel) => {
                                const originalPrice = hotel.ReferencePrice;
                                const discountedPrice = (originalPrice * (100 - hotel.MaxDiscountPercent)) / 100;

                                return (
                                    <Places_5
                                        key={hotel.PropertyId}
                                        link={`https:${hotel.PropertyImageUrl}`}
                                        text1={hotel.PropertyName}
                                        text2={hotel.PropertyAddress}
                                        text3={"1 noc"}
                                        text4={`${originalPrice.toFixed(2)} zł`}
                                        text5={`${discountedPrice.toFixed(2)} zł`}
                                    />
                                );
                            })
                        ) : (
                            <p>Ładowanie danych o hotelach...</p>
                        )}
                    </div>

                    <div className="pagination-controls">
                        <button
                            onClick={() => setCurrentIndex((prev) => Math.max(prev - 4, 0))}
                            disabled={currentIndex === 0}
                        >
                            Wstecz <i className="fa-solid fa-arrow-left"></i>
                        </button>
                        <button
                            onClick={() => setCurrentIndex((prev) =>
                                prev + 4 < hotels.length ? prev + 4 : prev
                            )}
                            disabled={currentIndex + 4 >= hotels.length}
                        >
                            Dalej <i className="fa-solid fa-arrow-right"></i>
                        </button>
                    </div>
                </div>

                <div className="section4">
                    <HSection text1="Pobierz aplikację TerraQuest" text2="Zyskaj wyjątkowe zniżki" />
                    <div className="explore_baner">
                        <img src="/src/assets/terraquest_baner_promocja.webp" alt="Promocja TerraQuest" />
                    </div>
                </div>

                <div className="sectaion5">
                    <HSection text1="Oceny klientów" text2="Statystyki mówią same za siebie" />
                    <div className="card_review_section">
                        {reviews.length > 0 ? (
                            <ReviewCard reviews={reviews} />
                        ) : (
                            <p>Ładowanie recenzji...</p>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Explore;
