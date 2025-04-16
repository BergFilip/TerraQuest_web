import { useEffect, useState } from "react";
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
    name: string;
    hotelId: string;
    cityCode: string;
    address?: {
        lines: string[];
        postalCode?: string;
        cityName?: string;
        countryCode?: string;
    };
};

function Explore() {
    const [hotels, setHotels] = useState<Hotel[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const hotelsPerPage = 4;

    useEffect(() => {
        fetch("http://localhost:5000/api/hotels?cityCode=LON")
            .then((res) => res.json())
            .then((data) => {
                if (data && data.data) {
                    setHotels(data.data);
                }
            })
            .catch((err) => console.error("Błąd ładowania hoteli:", err));
    }, []);

    const nextPage = () => {
        if ((currentPage + 1) * hotelsPerPage < hotels.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const displayedHotels = hotels.slice(
        currentPage * hotelsPerPage,
        (currentPage + 1) * hotelsPerPage
    );

    return (
        <section className="explore_site">
            <div className="section1">
                <h1>Zaoszczędzisz do 40% na następnym pobycie w hotelu</h1>
                <p className={"s1_baner"}>Porównujemy ceny pokoi hotelowych na ponad 100 stronach</p>
                <form>
                    <input type="text" placeholder={"Miejsce docelowe"} />
                    <input type="date" placeholder={"Data wyjazdu i powrotu"} />
                    <input type="number" placeholder={"Ilość uczestników"} />
                    <input type="submit" value="Wyszukaj" className="alert-button" />
                </form>
            </div>

            <div className="explore_home_section">
                <div className="section4"></div>

                <div className="section3">
                    <HSection
                        text1={"Często wyszukiwane "}
                        text2={"Zaoszczędz na pobytach w okresie 31 stycznia - 2 lutego"}
                    />

                    <div className="places_section_5">
                        {displayedHotels.map((hotel) => (
                            <Places_5
                                key={hotel.hotelId}
                                link={"https://cf.bstatic.com/static/img/theme-index/bg_luxury/869918c9da63b2c5685fce05965700da5b0e6617.jpg"} // placeholder image
                                text1={hotel.name}
                                text2={`${hotel.address?.cityName || "Nieznane miasto"}, ${hotel.address?.countryCode || ""}`}
                                text3={"2 noce"} // przykładowa liczba nocy
                                text4={"1432zł"} // przykładowa cena
                                text5={"785zł"} // przykładowa zniżka
                            />
                        ))}
                    </div>


                    <div className="pagination-controls">
                        <button onClick={prevPage} disabled={currentPage === 0}>
                            {"<"} Wstecz
                        </button>
                        <button
                            onClick={nextPage}
                            disabled={(currentPage + 1) * hotelsPerPage >= hotels.length}
                        >
                            Dalej {">"}
                        </button>
                    </div>
                </div>

                <div className="section4">
                    <HSection text1={"Pobierz aplikację TerraQuest"} text2={"Zyskaj wyjątkowe zniżki"} />

                    <div className="explore_baner">
                        <img src="/src/assets/terraquest_baner_promocja.webp" />
                    </div>
                </div>

                <div className="sectaion5">
                    <HSection text1={"Oceny klientów"} text2={"Statystyki mówią same za siebie"} />

                    <div className="card_review_section">
                        <ReviewCard reviews={reviewsData} />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Explore;
