import "../styles/sites/Search.scss";

function Search() {
    return (
        <main className="search_site">
            <section className="search_header">
                <h2 className="search_heading">Oto wyniki twojego wyszukiwania dla:</h2>
                <div className="search_bar">
                    <div className="search_field">
                        <span className="icon">🏨</span>
                        <input type="text" placeholder="Miejsce docelowe" />
                    </div>
                    <div className="search_field">
                        <span className="icon">📅</span>
                        <input type="text" placeholder="Data wyjazdu i powrotu" />
                    </div>
                    <div className="search_field">
                        <span className="icon">👥</span>
                        <input type="text" placeholder="Ilość uczestników" />
                    </div>
                    <button className="search_button">Search</button>
                </div>
            </section>

            <section className="search_content">
                <aside className="filters">
                    <div className="filter_section">
                        <h4>Keywords</h4>
                        <div className="tags">
                            <span>Spring ✕</span>
                            <span>Smart ✕</span>
                            <span>Modern ✕</span>
                        </div>
                    </div>
                    <div className="filter_section">
                        <h4>Cena</h4>
                        <input type="range" min="0" max="100" />
                        <p>$0–100</p>
                    </div>
                    <div className="filter_section">
                        <h4>Kraj</h4>
                        <label><input type="checkbox" /> Label</label>
                        <label><input type="checkbox" /> Label</label>
                        <label><input type="checkbox" /> Label</label>
                    </div>
                    <div className="filter_section">
                        <h4>Miasto</h4>
                        <label><input type="checkbox" /> Label</label>
                        <label><input type="checkbox" /> Label</label>
                        <label><input type="checkbox" /> Label</label>
                    </div>
                </aside>

                <main className="results">
                    <div className="sorting">
                        <input className="results_search" type="text" placeholder="Szukaj"/>
                        <button className="results_button">New</button>
                        <button className="results_button">Price ascending</button>
                        <button className="results_button">Price descending</button>
                        <button className="results_button">Rating</button>
                    </div>

                    <div className="hotel_card">
                        <img src="/src/assets/kompas.webp" alt="Hotel 1"/>
                        <div className="hotel_info">
                            <h3>Super Hiper Hugo Hotel – gdańsk</h3>
                            <p className="stars">★★★★★</p>
                            <p>Polska, Gdańsk</p>
                            <p className="price">
                                <span className="nights">2 noce</span> <span className="old_price">1432zł</span> <span
                                className="new_price">785zł</span>
                            </p>
                            <button>Zobacz ofertę</button>
                        </div>
                    </div>

                    <div className="hotel_card">
                        <img src="/src/assets/kompas.webp" alt="Hotel 2"/>
                        <div className="hotel_info">
                            <h3>Ibis Poznań Centrum</h3>
                            <p className="stars">★★★★★</p>
                            <p>Polska, Poznań</p>
                            <p className="price">
                                <span className="nights">2 noce</span> <span className="old_price">1432zł</span> <span
                                className="new_price">785zł</span>
                            </p>
                            <button>Zobacz ofertę</button>
                        </div>
                    </div>
                    <div className="hotel_card">
                        <img src="/src/assets/kompas.webp" alt="Hotel 2"/>
                        <div className="hotel_info">
                            <h3>Ibis Poznań Centrum</h3>
                            <p className="stars">★★★★★</p>
                            <p>Polska, Poznań</p>
                            <p className="price">
                                <span className="nights">2 noce</span> <span className="old_price">1432zł</span> <span
                                className="new_price">785zł</span>
                            </p>
                            <button>Zobacz ofertę</button>
                        </div>
                    </div>
                    <div className="hotel_card">
                        <img src="/src/assets/kompas.webp" alt="Hotel 2"/>
                        <div className="hotel_info">
                            <h3>Ibis Poznań Centrum</h3>
                            <p className="stars">★★★★★</p>
                            <p>Polska, Poznań</p>
                            <p className="price">
                                <span className="nights">2 noce</span> <span className="old_price">1432zł</span> <span
                                className="new_price">785zł</span>
                            </p>
                            <button>Zobacz ofertę</button>
                        </div>
                    </div>


                </main>
            </section>
        </main>
    );
}

export default Search;
