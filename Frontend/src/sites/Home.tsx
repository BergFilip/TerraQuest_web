import "../styles/sites/Home.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import HSection from "../components/h-section.tsx";
import Card from "../components/card.tsx";
import Places_1 from "../components/places_section_1.tsx";
import Places_2 from "../components/places_section_2.tsx";
import Places_3 from "../components/places_section_3.tsx";
import Places_4 from "../components/places_section_4.tsx";
import Places_5 from "../components/places_section_5.tsx";
import Places_6 from "../components/places_section_6.tsx";
import Places_7 from "../components/places_section_7.tsx";
import FaqSection from "../components/help_section.tsx";
import { useNavigate } from "react-router-dom";

type Hotel = {
    PropertyId: number;
    PropertyName: string;
    ReferencePrice: number;
    MaxDiscountPercent: number;
    PropertyAddress: string;
    PropertyImageUrl: string;
    ReferencePriceCurrency: "USD" | "EUR";
};

const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { day: "numeric", month: "long" };
    return new Intl.DateTimeFormat("pl-PL", options).format(date);
};

const getRandomPlacesNumber = () => {
    return `${Math.floor(Math.random() * (1500 - 200 + 1)) + 200} obiektów`;
};

const getDateRange = () => {
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + 7);
    return { startDate, endDate };
};

const convertToPLN = (price: number, currency: "USD" | "EUR"): number => {
    const exchangeRates = {
        USD: 4.3,
        EUR: 4.5,
    };
    return price * exchangeRates[currency];
};

const { startDate, endDate } = getDateRange();
const formattedStartDate = formatDate(startDate);
const formattedEndDate = formatDate(endDate);

function Home() {
    const [hotels, setHotels] = useState<Hotel[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const [destination, setDestination] = useState('');
    const [startDateInput, setStartDateInput] = useState('');
    const [numUsers, setNumUsers] = useState(1);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const res = await axios.get("/api/hotels?city=tokio");
                if (Array.isArray(res.data)) {
                    const hotelsWithCurrency = res.data.map(hotel => ({
                        ...hotel,
                        ReferencePriceCurrency: hotel.ReferencePriceCurrency || "USD"
                    }));
                    setHotels(hotelsWithCurrency);
                }
            } catch (error) {
                console.error("❌ Błąd ładowania hoteli:", error);
            }
        };

        fetchHotels();
    }, []);

    const currentHotels = hotels.slice(currentIndex, currentIndex + 4);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const dateToSave = startDateInput || new Date().toISOString().split('T')[0];

        localStorage.setItem('destination', destination);
        localStorage.setItem('startDate', dateToSave);
        localStorage.setItem('numUsers', numUsers.toString());

        navigate('/search');
        window.scrollTo(0, 0);
    };

    const handleCityClick = (cityName: string) => {
        const defaultDate = new Date().toISOString().split('T')[0];

        localStorage.setItem('destination', cityName);
        localStorage.setItem('startDate', defaultDate);
        localStorage.setItem('numUsers', '1');
        navigate('/search');
        window.scrollTo(0, 0);
    };

    const handleHotelClick = (hotel: Hotel) => {

        localStorage.setItem('selectedHotel', JSON.stringify(hotel));
        navigate(`/product/${hotel.PropertyId}`);
        window.scrollTo(0, 0);
    };

    return (
        <div className="home">
            <div className="section1">
                <h1>Odkryj następną przygodę</h1>
                <p className={"s1_baner"}>planuj, rezerwuj i podróżuj z łatwością</p>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder={"Miejsce docelowe"}
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                    />
                    <input
                        type="date"
                        placeholder={"Data wyjazdu i powrotu"}
                        value={startDateInput}
                        onChange={(e) => setStartDateInput(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder={"Ilość uczestników"}
                        value={numUsers}
                        onChange={(e) => setNumUsers(Number(e.target.value))}
                    />
                    <input type="submit" value="Wyszukaj" className="alert-button" />
                </form>
            </div>
            <div className="main_home_section">
                <div className="section2">
                    <HSection text1={"Oferty specjalnie dla Ciebie"}
                              text2={"Promocje i oferty specjalne dla Ciebie"}></HSection>
                    <div className="cards_section">
                        <Card text1={"Zaoszczędź na podróżach międzynarodowych"}
                              text2={"Urlop za granicą taniej niż nad Polskim morzem lub w górach? Tylko u nas specjalne oferty zagraniczne."}
                              text3={"Dowiedz się więcej"}
                              colorB={"#e1e1e1"}
                              colorT={"black"}
                              route_to={"/explore"} />

                        <Card text1={"Deszcz, śnieg, mgły - to nie znami !"}
                              text2={"Wyjeżdżasz na wakacje, a tam tylko deszcz i musisz zostać w hotelu? Gwarantujemy udaną pogodę albo częściowy zwrot kosztów."}
                              text3={"Dowiedz się więcej"}
                              colorB={"#FFAD00"}
                              colorT={"white"}
                              route_to={"/weather"} />
                    </div>
                </div>
                <div className="section3">
                    <HSection text1={"Popularne cele podróży"}
                              text2={"Najpopularniejsze cele podróży wśród gości z Polski"}></HSection>
                    <div className="places_section_1">
                        <Places_1
                            text1={"Warszawa"}
                            text2={""}
                            backgroundImage={'/src/assets/cities/warsaw.webp'}
                            link_to="/explore"
                            onClick={() => handleCityClick("Warszawa")}
                        />
                        <Places_1
                            text1={"Kraków"}
                            text2={""}
                            backgroundImage={'/src/assets/cities/krakow.webp'}
                            link_to="/explore"
                            onClick={() => handleCityClick("Kraków")}
                        />
                    </div>
                    <div className="places_section_2">
                        <Places_2
                            text1={"Poznań"}
                            text2={""}
                            backgroundImage={'/src/assets/cities/poznan.webp'}
                            link_to="/explore"
                            onClick={() => handleCityClick("Poznań")}
                        />
                        <Places_2
                            text1={"Gdańsk"}
                            text2={""}
                            backgroundImage={'/src/assets/cities/gdansk.webp'}
                            link_to="/explore"
                            onClick={() => handleCityClick("Gdańsk")}
                        />
                        <Places_2
                            text1={"Karpacz"}
                            text2={""}
                            backgroundImage={'/src/assets/cities/karpacz.webp'}
                            link_to="/explore"
                            onClick={() => handleCityClick("Karpacz")}
                        />
                    </div>
                </div>
                <div className="section4">
                    <HSection text1={"Szukaj według rodzaju obiektu"}
                              text2={""}></HSection>
                    <div className="places_section_3">
                        <Places_3
                            link={"/src/assets/home_section/hotels.webp"}
                            text2={"Hotele"}
                            link_to="/explore"
                        />
                        <Places_3
                            link={"/src/assets/home_section/resort.webp"}
                            text2={"Ośrodki wypoczynkowe"}
                            link_to="/explore"
                        />
                        <Places_3
                            link={"/src/assets/home_section/apartament.webp"}
                            text2={"Apartamenty"}
                            link_to="/explore"
                        />
                        <Places_3
                            link={"/src/assets/home_section/willa.webp"}
                            text2={"Wille"}
                            link_to="/explore"
                        />
                    </div>
                </div>
                <div className="section5">
                    <HSection text1={"Polska - zobacz ! "}
                              text2={"Te popularne miejsca mają wiele do zaoferowania"}></HSection>
                    <div className="places_section_4">
                        <Places_4
                            link={"/src/assets/cities/gdansk2.webp"}
                            text1={"Gdańsk"}
                            text2={getRandomPlacesNumber()}
                            link_to="/explore"
                            onClick={() => handleCityClick("Gdańsk")} />
                        <Places_4
                            link={"/src/assets/cities/warsaw2.webp"}
                            text1={"Warszawa"}
                            text2={getRandomPlacesNumber()}
                            link_to="/explore"
                            onClick={() => handleCityClick("Warszawa")} />
                        <Places_4
                            link={"/src/assets/cities/poznan2.webp"}
                            text1={"Poznań"}
                            text2={getRandomPlacesNumber()}
                            link_to="/explore"
                            onClick={() => handleCityClick("Poznań")} />
                        <Places_4
                            link={"/src/assets/cities/kolobrzeg2.webp"}
                            text1={"Kołobrzeg"}
                            text2={getRandomPlacesNumber()}
                            link_to="/explore"
                            onClick={() => handleCityClick("Kołobrzeg")} />
                        <Places_4
                            link={"/src/assets/cities/krakow2.webp"}
                            text1={"Kraków"}
                            text2={getRandomPlacesNumber()}
                            link_to="/explore"
                            onClick={() => handleCityClick("Kraków")} />
                        <Places_4
                            link={"/src/assets/cities/karpacz2.webp"}
                            text1={"Karpacz"}
                            text2={getRandomPlacesNumber()}
                            link_to="/explore"
                            onClick={() => handleCityClick("Karpacz")} />
                        <Places_4
                            link={"/src/assets/cities/wroclaw2.webp"}
                            text1={"Wrocław"}
                            text2={getRandomPlacesNumber()}
                            link_to="/explore"
                            onClick={() => handleCityClick("Wrocław")} />
                    </div>
                </div>
                <div className="section6">
                    <HSection
                        text1="Często wyszukiwane "
                        text2={`Zaoszczędź na pobytach w okresie ${formattedStartDate} - ${formattedEndDate}`}
                    />

                    <div className="places_section_5">
                        {currentHotels.length > 0 ? (
                            currentHotels.map((hotel) => {
                                const originalPricePLN = convertToPLN(hotel.ReferencePrice, hotel.ReferencePriceCurrency);
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
                <div className="section7">
                    <HSection text1={"Poszukaj inspiracji na kolejną podróż"}
                              text2={"Z nami nie ominą Cię żadne atrakcje"}></HSection>

                    <div className="places_section_6">
                        <div className="inspiration_big">
                            <img
                                src="/src/assets/home_section/austria.webp" />
                            <h4>{"6 niepowtarzalnych domów wakacyjnych w Austrii"}</h4>
                            <h4 className="descr_h4">{"Wakacje z wiekszą ekipą? Trafiłeś idealnie!"}</h4>
                        </div>
                        <div className="other_palce">
                            <Places_6
                                link={"/src/assets/home_section/spain.webp"}
                                text1={"Nudzisz się w jednym miejscu? To może podróż przez Hiszpanie?"}
                                text2={"6 dni, 4 hotele i brak nudy. Idealne dla wszystkich poszukiwaczy przygód."}
                                link_to="/explore" />
                            <Places_6
                                link={"/src/assets/home_section/treehouses.webp"}
                                text1={"Najlepsze domki na drzewie na świecie"}
                                text2={"Zwykłe hotele są dla ciebie już nudne? To może noc w łonie natury."}
                                link_to="/explore" />
                        </div>
                    </div>
                </div>

                <div className="section8">
                    <HSection text1={"Podróżuj więcej, płać mniej "}
                              text2={""}></HSection>

                    <div className="places_section_7">
                        <Places_7
                            link={"fa-solid fa-circle-info"}
                            text1={"Zaloguj się i oszczędzaj"}
                            text2={"Promocje? Last minute? I wiele więce? Zaloguj się, by nie przegabić żadnych z nich."}
                            text3={"Zaloguj się "}
                            text4={"Zarejestruj się "}
                            colorB2={"#FFAD00"}
                            colorT2={"white"}
                            colorB={"#e1e1e1"}
                            colorT={"black"}
                            link_to1={"/login"}
                            link_to2={"/register"} />
                    </div>
                </div>

                <div className="section9">
                    <HSection text1={"Najczęściej zadawane pytania"}
                              text2={"Sekcja odpowiedzi"}></HSection>

                    <div className="places_section_8">
                        <FaqSection></FaqSection>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;