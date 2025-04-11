import "../styles/sites/User.scss";
import { useState } from "react";

function User() {
    const [expanded, setExpandedIndex] = useState<number | null>(null);
    const [bookings, setBookings] = useState([
        { id: 1, date: "04.02.2025", route: "Poznań - Warszawa", price: "345zł" },
        { id: 2, date: "05.02.2025", route: "Wrocław - Kraków", price: "290zł" },
        { id: 3, date: "06.02.2025", route: "Gdańsk - Katowice", price: "410zł" },
        { id: 4, date: "07.02.2025", route: "Łódź - Szczecin", price: "350zł" },
    ]);

    const toggleExpand = (index: number) => {
        setExpandedIndex(expanded === index ? null : index);
    };

    const clearBookings = () => {
        setBookings([]);
    };

    const addBooking = () => {
        const newBooking = {
            id: bookings.length + 1,
            date: "08.02.2025",
            route: "Nowa trasa - Miasto",
            price: "400zł",
        };
        setBookings([...bookings, newBooking]);
    };

    return (
        <main className="user">
            <div className="container">
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
                            <i className="fa-solid fa-eye-slash"></i> <p><strong>Pokaż hasło</strong></p>
                        </div>

                        <div className="setting-item">
                            <i className="fa-solid fa-clock"></i> <p><strong>Czas i godzina </strong> (PM)</p>
                        </div>

                        <div className="setting-item">
                            <i className="fa-solid fa-globe"></i> <p><strong>Język </strong> (Polski)</p>
                        </div>

                        <div className="setting-item">
                            <i className="fa-solid fa-moon"></i> <p><strong>Motyw </strong> (ciemny)</p>
                        </div>

                        <div className="setting-item">
                            <i className="fa-solid fa-download"></i> <p><strong>Aktualizacja</strong></p>
                        </div>
                    </div>
                </div>

                <div className="booking-history">
                    <h2>Historia rezerwacji i planowania</h2>
                    <p className="subtitle">Sprawdź swoją historię podróży</p>

                    {bookings.length > 0 ? (
                        <div className="booking-list-container">
                            <div className="booking-list">
                                {bookings.map((booking) => (
                                    <div
                                        key={booking.id}
                                        className={`booking-item ${expanded === booking.id ? "expanded" : ""}`}
                                        onClick={() => toggleExpand(booking.id)}
                                    >
                                        <div className="booking-header">
                                            <div className="date"><strong>{booking.date}</strong></div>
                                            <div className="route">{booking.route}</div>
                                            <div className="price">{booking.price}</div>
                                            <button className="expand-btn">
                                                {expanded === booking.id ? "▲" : "▼"}
                                            </button>
                                        </div>
                                        <div className={`booking-details ${expanded === booking.id ? "visible" : ""}`}>
                                            <p>Szczegóły podróży...</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="empty-state">
                            <p><strong>Wygląda, że masz tu pusto</strong></p>
                        </div>
                    )}

                    <div className="test-buttons">
                        <button onClick={clearBookings}>Wyczyść historię</button>
                        <button onClick={addBooking}>Dodaj rezerwację</button>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default User;
