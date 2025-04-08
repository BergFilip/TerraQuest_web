import "../styles/sites/Search.scss";

function Search() {
    return (
        <section className="search-site">
            {/* Lewy panel z filtrami */}
            <aside className="sidebar">
                <div className="filter-section">
                    <h4 className="filter-title">Keywords</h4>
                    <div className="tags">
                        {["Spring", "Smart", "Modern"].map((tag, i) => (
                            <span key={i} className="tag">
          {tag}
                                <button className="remove-tag">×</button>
        </span>
                        ))}
                    </div>

                    <div className="checkbox-group">
                        {[1, 2, 3].map((_, i) => (
                            <label key={i} className="checkbox-label">
                                <input type="checkbox" defaultChecked/>
                                <div>
                                    <span className="label-title">Label</span>
                                    <span className="label-description">Description</span>
                                </div>
                            </label>
                        ))}
                    </div>

                    <div className="price-filter">
                        <label>Cena</label>
                        <div className="price-range">
                            <input type="range" min="0" max="100"/>
                            <span>$0-100</span>
                        </div>
                    </div>

                    <div className="checkbox-section">
                        <p>Kraj</p>
                        {[1, 2, 3].map((_, i) => (
                            <label key={i} className="checkbox-line">
                                <input type="checkbox" defaultChecked/>
                                <span>Label</span>
                            </label>
                        ))}
                    </div>

                    <div className="checkbox-section">
                        <p>Miasto</p>
                        {[1, 2, 3].map((_, i) => (
                            <label key={i} className="checkbox-line">
                                <input type="checkbox" defaultChecked/>
                                <span>Label</span>
                            </label>
                        ))}
                    </div>
                </div>
            </aside>


            {/* Prawy panel z wynikami */}
            <main className="main-content">
                <div className="search-header">
                    <input
                        type="text"
                        placeholder="Szukaj hoteli..."
                        className="search-input"
                    />
                    <button className="btn new-btn">Nowe</button>
                    <div className="sort-options">
                        <button className="btn sort-btn">Cena rosnąco</button>
                        <button className="btn sort-btn">Cena malejąco</button>
                        <button className="btn sort-btn">Ocena</button>
                    </div>
                </div>

                <div className="results">
                    {[...Array(7)].map((_, index) => (
                        <div key={index} className="hotel-card">
                            <div className="hotel-image">
                                <img
                                    src={`images/hotel${index + 1}.jpg`}
                                    alt={`Hotel ${index + 1}`}
                                />
                            </div>
                            <div className="hotel-info">
                                <h4 className="hotel-name">Hotel {index + 1}</h4>
                                <div className="hotel-rating">★★★★★</div>
                                <div className="hotel-location">Miasto, Kraj</div>
                                <div className="hotel-bottom">
                                    <button className="btn offer-btn">Zobacz ofertę</button>
                                    <span className="nights">2 noce</span>
                                    <span className="price">
                    1450 zł <small>/ 785 zł</small>
                  </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="pagination">
                    <button className="btn page-btn">&lt;</button>
                    <button className="btn page-btn active">1</button>
                    <button className="btn page-btn">2</button>
                    <span className="dots">...</span>
                    <button className="btn page-btn">6</button>
                    <button className="btn page-btn">&gt;</button>
                </div>
            </main>
        </section>
    );
}

export default Search;
