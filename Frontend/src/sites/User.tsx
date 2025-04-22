import "../styles/sites/User.scss";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Update_Alert from "../components/Update_Alert";

function User() {
    const [expanded, setExpandedIndex] = useState<number | null>(null);
    const [bookings, setBookings] = useState([
        { id: 1, date: "04.02.2025", route: "Poznań - Warszawa", price: "345zł" },
        { id: 2, date: "05.02.2025", route: "Wrocław - Kraków", price: "290zł" },
        { id: 3, date: "06.02.2025", route: "Gdańsk - Katowice", price: "410zł" },
        { id: 4, date: "07.02.2025", route: "Łódź - Szczecin", price: "350zł" },
    ]);

    const [currentTime, setCurrentTime] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const { isLoggedIn, userEmail, userFirstName, userLastName, checkAuth } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const verifyAuth = async () => {
            const isAuthenticated = await checkAuth();
            if (!isAuthenticated) {
                navigate('/login');
            } else {
                setLoading(false);
            }
        };
        verifyAuth();

        const interval = setInterval(() => {
            const now = new Date();
            setCurrentTime(now.toLocaleTimeString());
        }, 1000);

        return () => clearInterval(interval);
    }, [checkAuth, navigate]);

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

    const handleProfileUpdate = () => {
        setShowAlert(true);
    };

    if (loading || !isLoggedIn) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Weryfikacja sesji...</p>
            </div>
        );
    }

    return (
        <main className="user">
            <div className="container">
                <div className="user-card">
                    <img src="src/assets/terraquest.webp" alt="Obraz profilu" className="user-avatar"/>
                    <h2>{(userFirstName && userLastName) ? ` ${userFirstName} ${userLastName}` : "Zaktualizuj profil"}</h2>
                    <p className="email">({userEmail})</p>
                    <hr></hr>

                    <div className="settings">

                        <div className="setting-item">
                            <i className="fa-solid fa-clock"></i>
                            <p><strong>Czas i godzina </strong> {currentTime}</p>
                        </div>

                        <div className="setting-item" onClick={handleProfileUpdate}>
                            <i className="fa-solid fa-download"></i>
                            <p><strong>Aktualizacja profilu</strong></p>
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
            {showAlert && (
                <Update_Alert
                    title="Aktualizacja profilu"
                    onClose={() => setShowAlert(false)}
                    onOk={() => setShowAlert(false)}
                />
            )}
        </main>
    );
}

export default User;
