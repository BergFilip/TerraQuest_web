import "../styles/sites/User.scss";

function User() {
    return (
        <main className="user">
            <div className="container">
                {/* Panel użytkownika */}
                <div className="user-card">
                    {/* Wstawic foto */}
                    <img
                        src=""
                        alt="Jan Kowalski"
                        className="user-avatar"
                    />
                    <h2>Jan Kowalski</h2>
                    <p className="email">(jankowalski@gmail.com)</p>
                    <div className="settings">
                        <div className="setting-item">
                            <i className="fa-solid fa-eye-slash"></i> Pokaż hasło
                        </div>
                        <div className="setting-item">
                            <i className="fa-solid fa-clock"></i> Czas i godzina (PM)
                        </div>
                        <div className="setting-item">
                            <i className="fa-solid fa-language"></i> Język (Polski)
                        </div>
                        <div className="setting-item">
                            <i className="fa-solid fa-moon"></i> Motyw (ciemny)
                        </div>
                        <div className="setting-item">
                            <i className="fa-solid fa-down-to-bracket"></i> Aktualizacja
                        </div>
                    </div>
                </div>

                {/* Panel rezerwacji */}
                <div className="booking-history">
                    <h2>Historia rezerwacji i planowania</h2>
                    <p className="subtitle">Sprawdź swoją historię podróży</p>
                    <div className="booking-list">
                        {[1, 2, 3, 4].map((_, i) => (
                            <div key={i} className="booking-item">
                                <div className="date">
                                    <strong>04.02.2025</strong>
                                    {i === 0 && <p>Tu jakiś tekst</p>}
                                </div>
                                <div className="route">Poznań - Warszawa</div>
                                <div className="price">345zł</div>
                                <button className="expand-btn">⌄</button>
                            </div>
                        ))}
                    </div>
                    <div className="empty-state">
                        <p>Wygląda że masz tu pusto</p>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default User;
