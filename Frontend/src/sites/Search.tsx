import "../styles/sites/Search.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type Hotel = {
    PropertyId: number;
    PropertyName: string;
    ReferencePrice: number;
    MaxDiscountPercent: number;
    PropertyAddress: string;
    PropertyImageUrl: string;
    PropertyRating: string;
    TripAdvisorRating: number;
    ReferencePriceCurrency: string;
    DealsFound: number;
    DealWeight: number;
    AvgDiscountPercent: number;
    LocationId: number;
    PropertyLatitude: number;
    PropertyLongitude: number;
    PropertyImageUrlHighRes: string;
    RatingImageUrl: string;
    CheckIn: string | null;
    CheckOut: string | null;
};

function Search() {
    const navigate = useNavigate();

    const [activeSort, setActiveSort] = useState<string>('');
    const [rangeValue, setRangeValue] = useState(1000);
    const [selectedDiscounts, setSelectedDiscounts] = useState<string[]>([]);
    const [selectedStars, setSelectedStars] = useState<number[]>([]);
    const [destination, setDestination] = useState('');
    const [startDate, setStartDate] = useState('');
    const [numUsers, setNumUsers] = useState(1);
    const [hotels, setHotels] = useState<Hotel[]>([]);
    const [filteredHotels, setFilteredHotels] = useState<Hotel[]>([]);
    const [loading, setLoading] = useState(false);

    const [currencyRates] = useState({
        USD: 4.3,
        EUR: 4.5,
    });
    const [showFilters, setShowFilters] = useState(false);
    const availableDiscountRanges = ["0-10%", "11-20%", "21-50%", "51-75%", "76-100%"];

    const fetchHotels = async (city: string) => {
        try {
            setLoading(true);
            const res = await axios.get(`/api/hotels?city=${city}`);
            if (Array.isArray(res.data)) {
                setHotels(res.data);
                setFilteredHotels(res.data);
            } else {
                console.error("Dane z API nie są tablicą:", res.data);
            }
        } catch (error) {
            console.error("❌ Błąd pobierania hoteli:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const savedDestination = localStorage.getItem('destination') || '';
        const savedStartDate = localStorage.getItem('startDate') || '';
        const savedNumUsers = parseInt(localStorage.getItem('numUsers') || '1', 10);

        setDestination(savedDestination);
        setStartDate(savedStartDate);
        setNumUsers(savedNumUsers);

        if (savedDestination) {
            fetchHotels(savedDestination);
        }
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        localStorage.setItem('destination', destination);
        localStorage.setItem('startDate', startDate);
        localStorage.setItem('numUsers', numUsers.toString());

        if (destination) {
            fetchHotels(destination);
        }
    };

    const handleFilterStars = (checked: boolean, starCount: number) => {
        setSelectedStars(prev =>
            checked ? [...prev, starCount] : prev.filter((star) => star !== starCount)
        );
    };

    const handleFilterDiscounts = (discountRange: string) => {
        setSelectedDiscounts(prev =>
            prev.includes(discountRange)
                ? prev.filter(d => d !== discountRange)
                : [...prev, discountRange]
        );
    };

    useEffect(() => {
        let filtered = [...hotels];

        if (selectedStars.length > 0) {
            filtered = filtered.filter((hotel) =>
                selectedStars.includes(parseInt(hotel.PropertyRating[0], 10))
            );
        }

        filtered = filtered.filter((hotel) => {
            const discountedPrice = convertToPLN(hotel.ReferencePrice * (1 - hotel.MaxDiscountPercent / 100), hotel.ReferencePriceCurrency);
            return discountedPrice <= rangeValue;
        });

        if (selectedDiscounts.length > 0) {
            filtered = filtered.filter((hotel) =>
                selectedDiscounts.some((range) => {
                    const [min, max] = range.split('-').map((value) => parseInt(value.replace('%', ''), 10));
                    return hotel.MaxDiscountPercent >= min && hotel.MaxDiscountPercent <= max;
                })
            );
        }

        setFilteredHotels(filtered);
    }, [selectedStars, rangeValue, selectedDiscounts, hotels]);

    const sortHotels = (label: string) => {
        const sortedHotels = [...filteredHotels];

        if (label === "Cena rosnąco") {
            sortedHotels.sort((a, b) => {
                const aPrice = convertToPLN(a.ReferencePrice * (1 - a.MaxDiscountPercent / 100), a.ReferencePriceCurrency);
                const bPrice = convertToPLN(b.ReferencePrice * (1 - b.MaxDiscountPercent / 100), b.ReferencePriceCurrency);
                return aPrice - bPrice;
            });
        } else if (label === "Cena malejąco") {
            sortedHotels.sort((a, b) => {
                const aPrice = convertToPLN(a.ReferencePrice * (1 - a.MaxDiscountPercent / 100), a.ReferencePriceCurrency);
                const bPrice = convertToPLN(b.ReferencePrice * (1 - b.MaxDiscountPercent / 100), b.ReferencePriceCurrency);
                return bPrice - aPrice;
            });
        } else if (label === "Najlepsze") {
            sortedHotels.sort((a, b) => b.TripAdvisorRating - a.TripAdvisorRating);
        } else if (label === "Nowe") {
            sortedHotels.sort((a, b) => b.PropertyId - a.PropertyId);
        }

        setFilteredHotels(sortedHotels);
        setActiveSort(label);
    };

    const convertToPLN = (price: number, currency: string) => {
        if (currency === "USD") {
            return price * currencyRates.USD;
        } else if (currency === "EUR") {
            return price * currencyRates.EUR;
        }
        return price;
    };

    const getStarRating = (rating: string) => {
        const match = rating.match(/(\d+)/);
        return match ? parseInt(match[0], 10) : 0;
    };

    const handleSeeOffer = (hotelId: number) => {
        const selectedHotel = hotels.find(hotel => hotel.PropertyId === hotelId);
        if (selectedHotel) {
            localStorage.setItem('selectedHotel', JSON.stringify(selectedHotel));
            navigate(`/product/${hotelId}`);
        }
    };

    return (
        <main className="search_site">
            <div className="section1">
                <h1>Oto wyniki twojego wyszukiwania</h1>

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Miejsce docelowe"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                    />
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                    <input
                        type="number"
                        min="1"
                        value={numUsers}
                        onChange={(e) => setNumUsers(Number(e.target.value))}
                    />
                    <input type="submit" value="Wyszukaj" className="alert-button" />
                </form>
            </div>

            <section className="search_content">
                <button
                    className="toggle-filters_search"
                    onClick={() => setShowFilters(!showFilters)}
                >
                    {showFilters ? 'Ukryj filtry' : 'Pokaż filtry'}
                </button>

                <aside className={`filters ${showFilters ? 'visible' : ''}`}>
                    <div className="filter_section">
                        <h4>Skala rabatu</h4>
                        <div className="tags">
                            {availableDiscountRanges.map((range) => (
                                <span
                                    key={range}
                                    onClick={() => handleFilterDiscounts(range)}
                                    className={`clickable ${selectedDiscounts.includes(range) ? "active" : ""}`}
                                >{range}
                                 </span>
                                ))}
                        </div>
                    </div>

                    <div className="filter_section">
                        <h4>Cena (promocyjna)</h4>
                        <input
                            className="range"
                            type="range"
                            min="0"
                            max="10000"
                            value={rangeValue}
                            onChange={(e) => setRangeValue(Number(e.target.value))}
                        />
                        <p>{`${rangeValue} zł`}</p>
                    </div>

                    <div className="filter_section">
                        <h4>Gwiazdki</h4>
                        {[1, 2, 3, 4, 5].map((stars) => (
                            <label key={stars} className="custom_checkbox">
                                <input
                                    type="checkbox"
                                    checked={selectedStars.includes(stars)}
                                    onChange={(e) => handleFilterStars(e.target.checked, stars)}
                                />
                                {stars} {stars === 1 ? "gwiazdka" : "gwiazdek"}
                            </label>
                        ))}
                    </div>
                </aside>


                    <main className="results">
                        <div className="sorting">
                            <h3>Sortuj po:</h3>
                            <div className="buttons">
                                {["Nowe", "Cena rosnąco", "Cena malejąco", "Najlepsze"].map((label) => (
                                    <button
                                        key={label}
                                        className={`results_button ${activeSort === label ? "active" : ""}`}
                                        onClick={() => sortHotels(label)}
                                    >
                                        {label} {activeSort === label && "✔"}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {loading ? (
                            <p>Ładowanie hoteli...</p>
                        ) : filteredHotels.length > 0 ? (
                            filteredHotels.map((hotel) => {
                                const discountedPricePLN = convertToPLN(hotel.ReferencePrice * (1 - hotel.MaxDiscountPercent / 100), hotel.ReferencePriceCurrency);

                                return (
                                    <div className="hotel_card" key={hotel.PropertyId}>
                                        <img src={`https:${hotel.PropertyImageUrl}`} alt={hotel.PropertyName}/>
                                        <div className="hotel_info">
                                            <h3>{hotel.PropertyName}</h3>
                                            <p className="stars">
                                                {"★".repeat(getStarRating(hotel.PropertyRating))}
                                            </p>
                                            <p className="adres_location">{hotel.PropertyAddress}</p>
                                            <p className="price">
                                                <span className="nights">1 noc</span>
                                                <span className="old_price">
                                                {convertToPLN(hotel.ReferencePrice, hotel.ReferencePriceCurrency).toFixed(2)} zł
                                            </span>
                                                <span className="new_price">{discountedPricePLN.toFixed(2)} zł</span>
                                            </p>
                                            <button onClick={() => handleSeeOffer(hotel.PropertyId)}>Zobacz ofertę
                                            </button>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <p>Brak wyników dla: {destination}</p>
                        )}
                    </main>
                </section>
        </main>
);
}

export default Search;
