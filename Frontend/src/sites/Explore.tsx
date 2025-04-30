import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
    ReferencePriceCurrency: string;
};

type Review = {
    title: string;
    description: string;
    reviewer: string;
    date: string;
    rating: number;
    image: string;
};

const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { day: "numeric", month: "long" };
    return new Intl.DateTimeFormat("pl-PL", options).format(date);
};

const getDateRange = () => {
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + 7);
    return { startDate, endDate };
};

const { startDate: globalStartDate, endDate: globalEndDate } = getDateRange();
const formattedStartDate = formatDate(globalStartDate);
const formattedEndDate = formatDate(globalEndDate);

function Explore() {
    const [hotels, setHotels] = useState<Hotel[]>([]);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const [destination, setDestination] = useState('');
    const [startDate, setStartDate] = useState('');
    const [numUsers, setNumUsers] = useState(1);

    const navigate = useNavigate();

    const exchangeRates = {
        USD: 4.3,
        EUR: 4.5,
    };

    const convertPriceToPLN = (price: number, currency: string): number => {
        if (currency === "USD") {
            return price * exchangeRates.USD;
        } else if (currency === "EUR") {
            return price * exchangeRates.EUR;
        }
        return price;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();



        localStorage.setItem('destination', destination);
        localStorage.setItem('startDate', startDate);
        localStorage.setItem('numUsers', numUsers.toString());

        navigate('/search');
        window.scrollTo(0, 0);
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


    const handleHotelClick = (hotel: Hotel) => {
        localStorage.setItem('selectedHotel', JSON.stringify(hotel));
        navigate(`/product/${hotel.PropertyId}`);
    };

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
                        text2={`Zaoszczędź na pobytach w okresie ${formattedStartDate} - ${formattedEndDate}`}
                    />

                    <div className="places_section_5">
                        {currentHotels.length > 0 ? (
                            currentHotels.map((hotel) => {
                                const originalPricePLN = convertPriceToPLN(hotel.ReferencePrice, hotel.ReferencePriceCurrency);
                                const discountedPricePLN = (originalPricePLN * (100 - hotel.MaxDiscountPercent)) / 100;

                                return (
                                    <Places_5
                                        key={hotel.PropertyId}
                                        link={`https:${hotel.PropertyImageUrl}`}
                                        text1={hotel.PropertyName}
                                        text2={hotel.PropertyAddress}
                                        text3={"1 noc"}
                                        text4={`${originalPricePLN.toFixed(2)} zł`}
                                        text5={`${discountedPricePLN.toFixed(2)} zł`}
                                        link_to="#"
                                        onClick={() => handleHotelClick(hotel)}
                                    />
                                );
                            })
                        ) : (
                            <p>Ładowanie danych o hotelach...</p>
                        )}
                    </div>

                    <div className="pagination-controls">
                        <button
                            onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
                            disabled={currentIndex === 0}
                        >
                            Wstecz <i className="fa-solid fa-arrow-left"></i>
                        </button>
                        <button
                            onClick={() => setCurrentIndex((prev) => Math.min(prev + 1, hotels.length - 4))}
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
                            <ReviewCard reviews={reviews.slice(0, 9)} />
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
