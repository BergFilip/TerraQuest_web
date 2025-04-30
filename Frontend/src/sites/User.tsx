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
        { id: 4, date: "07.02.2025", route: "Łódź - Szczecin", price: "350zł" },
        { id: 4, date: "07.02.2025", route: "Łódź - Szczecin", price: "350zł" },
        { id: 4, date: "07.02.2025", route: "Łódź - Szczecin", price: "350zł" },
        { id: 4, date: "07.02.2025", route: "Łódź - Szczecin", price: "350zł" },
    ]);

    const [currentTime, setCurrentTime] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const { isLoggedIn, userEmail, userFirstName, userLastName, checkAuth, logout } = useAuth();
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

    const handleLogout = () => {
        logout();
        navigate("/login");
    };
    const onRedirect = () => {
        navigate("/Newsletter");
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
                    <img src="src/assets/user_no.webp" alt="Obraz profilu" className="user-avatar"/>
                    <h2>{(userFirstName && userLastName) ? ` ${userFirstName} ${userLastName}` : "Brak nazwy użytkownika"}</h2>
                    <p className="email">({userEmail})</p>
                    <h6>Aby zmienić lub ustawić nazwę użytkownika kliknij w <b>Aktualizacja profilu</b></h6>
                    <hr></hr>

                    <div className="settings">
                        <div className="setting-item">
                            <i className="fa-solid fa-clock"></i>
                            <p><strong>Czas i godzina </strong> {currentTime}</p>
                        </div>

                        <div className="setting-item" onClick={handleProfileUpdate}>
                            <i className="fa-solid fa-square-check"></i>
                            <p><strong>Aktywny Newsletter</strong></p>
                        </div>

                        <div className="setting-item" onClick={onRedirect}>
                            <i className="fa-solid fa-download"></i>
                            <p><strong>Zapisz się do Newslettera</strong></p>
                        </div>

                        <div className="setting-item" onClick={handleProfileUpdate}>
                            <i className="fa-solid fa-pen"></i>
                            <p><strong>Aktualizacja profilu</strong></p>
                        </div>

                        <div className="setting-item" onClick={handleLogout}>
                            <i className="fa-solid fa-right-from-bracket"></i>
                            <p><strong>Wyloguj</strong></p>
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
                                    <div className="booking_all" key={booking.id}
                                         onClick={() => toggleExpand(booking.id)}>
                                        <div className="booking-item">
                                            <div className="main_booking_item">
                                                <h3 className="booking-header">
                                                    Hotel Trianon Rive Gauche
                                                    <span
                                                        className="booking-desc"> (3, Rue de Vaugirard, Paris, FR)</span>
                                                </h3>
                                                <p className="info_sec_booking">
                                                <span className="booking_price"><del>793.26 PLN</del><span
                                                    className="new_price_booking">261.78 PLN</span></span>
                                                </p>
                                            </div>
                                            <div className="icons_booking">
                                                <i className="fa-solid fa-trash" onClick={(e) => {
                                                    e.stopPropagation();
                                                    setBookings(bookings.filter(b => b.id !== booking.id));
                                                }}></i>
                                            </div>
                                        </div>
                                        <div
                                            className={`booking-details ${expanded === booking.id ? "visible" : ""}`}>
                                            <p>Hotel Trianon Rive Gauche to 3, Rue de Vaugirard, Paris, FR. Posiada
                                                4 Stars gwiazdek i oferuje wyjątkowe udogodnienia, takie jak basen,
                                                restauracja i wiele innych. Idealne miejsce na odpoczynek.</p>
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