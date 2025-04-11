import "../styles/sites/Search.scss";
import { useState } from "react";

function Search() {
    const [activeSorts, setActiveSorts] = useState<string[]>([]);
    const [rangeValue, setRangeValue] = useState(100);


    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [availableTags, setAvailableTags] = useState<string[]>(["Luxury", "Family", "Budget", "Nature", "Spring", "Smart", "Modern"]);

    const handleSortClick = (label: string) => {
        if (activeSorts.includes(label)) {
            setActiveSorts(activeSorts.filter((sort) => sort !== label));
        } else {
            setActiveSorts([...activeSorts, label]);
        }
    };

    const handleAddTag = (tag: string) => {
        setSelectedTags([...selectedTags, tag]);
        setAvailableTags(availableTags.filter((t) => t !== tag));
    };

    const handleRemoveTag = (tag: string) => {
        setSelectedTags(selectedTags.filter((t) => t !== tag));
        setAvailableTags([...availableTags, tag]);
    };

    return (
        <main className="search_site">
            <div className="section1">
                <h1>Oto wyniki twojego wyszukiwana</h1>

                <form>
                    <input type="text" placeholder={"Miejsce docelowe"}/>
                    <input type="date" placeholder={"Data wyjazdu i powrotu"}/>
                    <input type="number" placeholder={"Ilość uczestników"}/>
                    <input type="submit" value="Wyszukaj" className="alert-button"/>
                </form>
            </div>

            <section className="search_content">
                <aside className="filters">
                    <div className="filter_section">
                        <h4>Słowa kluczowe</h4>
                        <div className="tags">
                            {selectedTags.map((tag) => (
                                <span key={tag} onClick={() => handleRemoveTag(tag)}>
                                    {tag} ✕
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="filter_section">
                        <h4>Cena</h4>
                        <input
                            className="range"
                            type="range"
                            min="0"
                            max="100"
                            value={rangeValue}
                            onChange={(e) => setRangeValue(Number(e.target.value))}
                        />
                        <p>{`$${rangeValue}`}</p>
                    </div>

                    <div className="filter_section">
                        <h4>Kraj</h4>
                        <label className="custom_checkbox"><input type="checkbox" /> Polska</label>
                        <label className="custom_checkbox"><input type="checkbox" /> Niemcy</label>
                        <label className="custom_checkbox"><input type="checkbox" /> Francja</label>
                    </div>

                    <div className="filter_section">
                        <h4>Miasto</h4>
                        <label className="custom_checkbox"><input type="checkbox" /> Warszawa</label>
                        <label className="custom_checkbox"><input type="checkbox" /> Berlin</label>
                        <label className="custom_checkbox"><input type="checkbox" /> Paryż</label>
                    </div>

                    <div className="filter_section">
                        <h4>Dostępne słowa kluczowe</h4>
                        <div className="tags">
                            {availableTags.map((tag) => (
                                <span key={tag} onClick={() => handleAddTag(tag)} className="clickable">
                                    {tag} +
                                </span>
                            ))}
                        </div>
                    </div>
                </aside>

                <main className="results">
                    <div className="sorting">
                        <input className="results_search" type="text" placeholder="Szukaj" />
                        <div className="buttons">
                            {["New", "Price ascending", "Price descending", "Rating"].map((label) => (
                                <button
                                    key={label}
                                    className={`results_button ${activeSorts.includes(label) ? "active" : ""}`}
                                    onClick={() => handleSortClick(label)}
                                >
                                    {label} {activeSorts.includes(label) && "✔"}
                                </button>
                            ))}
                        </div>
                    </div>

                    {[1, 2, 3, 4].map((_, idx) => (
                        <div className="hotel_card" key={idx}>
                            <img src="/src/assets/kompas.webp" alt={`Hotel ${idx + 1}`} />
                            <div className="hotel_info">
                                <h3>Super Hiper Hugo Hotel – gdańsk</h3>
                                <p className="stars">★★★★★</p>
                                <p>Polska, Gdańsk</p>
                                <p className="price">
                                    <span className="nights">2 noce</span>
                                    <span className="old_price">1432zł</span>
                                    <span className="new_price">785zł</span>
                                </p>
                                <button>Zobacz ofertę</button>
                            </div>
                        </div>
                    ))}
                </main>
            </section>
        </main>
    );
}

export default Search;
