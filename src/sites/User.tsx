import "../styles/sites/User.scss";
import { useState } from "react";

function User() {
    const [expanded, setExpandedIndex] = useState<number | null>(null);

    const toggleExpand = (index: number) => {
        setExpandedIndex(expanded === index ? null : index);
    };

    return (
        <main className="user">
            <div className="container">
                {/* Panel użytkownika */}
                <div className="user-card">
                    <img
                        src="src/assets/terraquest.webp"
                        alt="Jan Kowalski"
                        className="user-avatar"
                    />
                    <h2>Jan Kowalski</h2>
                    <p className="email">(jankowalski@gmail.com)</p>
                    <hr></hr>

                    <div className="settings">
                        <div className="setting-item">
                            <i className="fa-solid fa-eye-slash"></i> <strong>Pokaż hasło</strong>
                        </div>
                        <hr></hr>
                        <div className="setting-item">
                            <i className="fa-solid fa-clock"></i> <strong>Czas i godzina </strong> (PM)
                        </div>
                        <hr></hr>
                        <div className="setting-item">
                            <i className="fa-solid fa-globe"></i> <strong>Język </strong> (Polski)
                        </div>
                        <hr></hr>
                        <div className="setting-item">
                            <i className="fa-solid fa-moon"></i> <strong>Motyw </strong> (ciemny)
                        </div>
                        <hr></hr>
                        <div className="setting-item">
                            <i className="fa-solid fa-download"></i> <strong>Aktualizacja</strong>
                        </div>
                        <hr></hr>
                    </div>
                </div>

                {/* Historia rezerwacji */}
                <div className="booking-history">

                        <h2>Historia rezerwacji i planowania</h2>
                        <p className="subtitle">Sprawdź swoją historię podróży</p>

                    <div className="booking-list">
                        {/* Rezerwacja 1 */}
                        <div className={`booking-item ${expanded === 1 ? "expanded" : ""}`} onClick={() => toggleExpand(1)}>
                            <div className="booking-header">
                                <div className="date"><strong>04.02.2025</strong></div>
                                <div className="route">Poznań - Warszawa</div>
                                <div className="price">345zł</div>
                                <button className="expand-btn">{expanded === 1 ? "▲" : "▼"}</button>
                            </div>
                            <div className={`booking-details ${expanded === 1 ? "visible" : ""}`}>
                                <p>Tu jakiś tekst</p>
                            </div>
                        </div>

                        {/* Rezerwacja 2 */}
                        <div className={`booking-item ${expanded === 2 ? "expanded" : ""}`} onClick={() => toggleExpand(2)}>
                            <div className="booking-header">
                                <div className="date"><strong>05.02.2025</strong></div>
                                <div className="route">Wrocław - Kraków</div>
                                <div className="price">290zł</div>
                                <button className="expand-btn">{expanded === 2 ? "▲" : "▼"}</button>
                            </div>
                            <div className={`booking-details ${expanded === 2 ? "visible" : ""}`}>
                                <p>Tu jakiś tekst</p>
                            </div>
                        </div>

                        {/* Rezerwacja 3 */}
                        <div className={`booking-item ${expanded === 3 ? "expanded" : ""}`} onClick={() => toggleExpand(3)}>
                            <div className="booking-header">
                                <div className="date"><strong>06.02.2025</strong></div>
                                <div className="route">Gdańsk - Katowice</div>
                                <div className="price">410zł</div>
                                <button className="expand-btn">{expanded === 3 ? "▲" : "▼"}</button>
                            </div>
                            <div className={`booking-details ${expanded === 3 ? "visible" : ""}`}>
                                <p>Tu jakiś tekst</p>
                            </div>
                        </div>

                        {/* Rezerwacja 4 */}
                        <div className={`booking-item ${expanded === 4 ? "expanded" : ""}`} onClick={() => toggleExpand(4)}>
                            <div className="booking-header">
                                <div className="date"><strong>07.02.2025</strong></div>
                                <div className="route">Łódź - Szczecin</div>
                                <div className="price">350zł</div>
                                <button className="expand-btn">{expanded === 4 ? "▲" : "▼"}</button>
                            </div>
                            <div className={`booking-details ${expanded === 4 ? "visible" : ""}`}>
                                <p>Tu jakiś tekst</p>
                            </div>
                        </div>
                    </div>

                    <div className="empty-state">
                        <p><strong>Wygląda, że masz tu pusto</strong></p>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default User;
