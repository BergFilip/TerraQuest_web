import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/sites/Explore.scss";
import HSection from "../components/h-section.tsx";
import Places_5 from "../components/places_section_5.tsx";
import ReviewCard from "../components/ReviewCard.tsx";

const reviewsData = [
    { title: "Great Product", description: "I really loved this product.", reviewer: "John", date: "2025-04-10", rating: 5 },
    { title: "Good, but could be better", description: "It's okay, but has some issues.", reviewer: "Jane", date: "2025-04-09", rating: 3 },
    { title: "Not worth the price", description: "The product didn't meet my expectations.", reviewer: "Mike", date: "2025-04-08", rating: 2 },
    { title: "Excellent!", description: "Totally worth the money.", reviewer: "Anna", date: "2025-04-07", rating: 5 },
    { title: "Very good", description: "I'm happy with the purchase.", reviewer: "Chris", date: "2025-04-06", rating: 4 },
    { title: "Not bad", description: "It works fine, but nothing special.", reviewer: "Sam", date: "2025-04-05", rating: 3 },
];

type Hotel = {
    PropertyId: number;
    PropertyName: string;
    ReferencePrice: number;
    MaxDiscountPercent: number;
    PropertyAddress: string;
    PropertyImageUrl: string;
};

function Explore() {
    const [hotels, setHotels] = useState<Hotel[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const res = await axios.get("/api/hotels?city=paris");
                if (!res.data || !Array.isArray(res.data)) {
                    console.error("❌ Nieprawidłowa odpowiedź:", res.data);
                    return;
                }

                setHotels(res.data);
            } catch (error) {
                console.error("❌ Błąd ładowania hoteli:", error);
            }
        };

        fetchHotels();
    }, []);

    const currentHotels = hotels.slice(currentIndex, currentIndex + 4);

    return (
        <section className="explore_site">
            <div className="section1">
                <h1>Zaoszczędzisz do 40% na następnym pobycie w hotelu</h1>
                <p className="s1_baner">Porównujemy ceny pokoi hotelowych na ponad 100 stronach</p>
                <form>
                    <input type="text" placeholder="Miejsce docelowe" />
                    <input type="date" placeholder="Data wyjazdu i powrotu" />
                    <input type="number" placeholder="Ilość uczestników" />
                    <input type="submit" value="Wyszukaj" className="alert-button" />
                </form>
            </div>

            <div className="explore_home_section">
                <div className="section4"></div>

                <div className="section3">
                    <HSection
                        text1="Często wyszukiwane "
                        text2="Zaoszczędź na pobytach w okresie 31 stycznia - 2 lutego"
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
                        <ReviewCard reviews={reviewsData} />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Explore;
