import "../styles/sites/User.scss";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Update_Alert from "../components/Update_Alert";
import axios from "axios";

interface Booking {
    id: number;
    PropertyName: string;
    PropertyAddress: string;
    CheckIn: string;
    CheckOut: string;
    ReferencePrice: number;
    ReferencePriceCurrency: string;
    MaxDiscountPercent: number;
    created_at: string;
}

function User() {
    const [expanded, setExpandedIndex] = useState<number | null>(null);
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [currentTime, setCurrentTime] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const { isLoggedIn, userEmail, userFirstName, userLastName, checkAuth, logout, userId } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const verifyAuth = async () => {
            const isAuthenticated = await checkAuth();
            if (!isAuthenticated) {
                navigate("/login");
            } else {
                fetchUserBookings();
                setLoading(false);
            }
        };

        verifyAuth();

        const interval = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString());
        }, 1000);

        return () => clearInterval(interval);
    }, [checkAuth, navigate, userId]);

    useEffect(() => {
        if (userId) {
            console.log(`UserId zmieniło się na: ${userId}`);
            fetchUserBookings();
        }
    }, [userId]);

    const fetchUserBookings = async () => {
        if (!userId) {
            console.log("Brak userId - nie można pobrać rezerwacji");
            return;
        }

        try {
            console.log(`Pobieram rezerwacje dla userId: ${userId}`); // Debug
            const response = await axios.get(`http://localhost:5000/api/bookings?userId=${userId}`, {
                withCredentials: true,
            });
            console.log("Otrzymane rezerwacje:", response.data); // Debug
            setBookings(response.data);
        } catch (error) {
            console.error("Błąd pobierania rezerwacji:", error);
            if (axios.isAxiosError(error)) {
                console.error("Szczegóły błędu:", error.response?.data);
            }
        }
    };

    const toggleExpand = (index: number) => {
        setExpandedIndex(expanded === index ? null : index);
    };

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const handleProfileUpdate = () => {
        setShowAlert(true);
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return "Brak daty";
        const date = new Date(dateString);
        return date.toLocaleDateString("pl-PL");
    };

    const calculatePrice = (price: number, currency: string, discount: number) => {
        const discountedPrice = price * (1 - discount / 100);
        return `${discountedPrice.toFixed(2)} ${currency}`;
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
                    <img
                        src="src/assets/terraquest.webp"
                        alt="Obraz profilu"
                        className="user-avatar"
                    />
                    <h2>
                        {userFirstName && userLastName
                            ? `${userFirstName} ${userLastName}`
                            : "Zaktualizuj profil"}
                    </h2>
                    <p className="email">({userEmail})</p>
                    <hr></hr>

                    <div className="settings">
                        <div className="setting-item">
                            <i className="fa-solid fa-clock"></i>
                            <p>
                                <strong>Czas i godzina </strong> {currentTime}
                            </p>
                        </div>

                        <div className="setting-item" onClick={handleProfileUpdate}>
                            <i className="fa-solid fa-download"></i>
                            <p>
                                <strong>Aktualizacja profilu</strong>
                            </p>
                        </div>

                        <div className="setting-item" onClick={handleLogout}>
                            <i className="fa-solid fa-right-from-bracket"></i>
                            <p>
                                <strong>Wyloguj</strong>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="booking-history">
                    <h2>Historia rezerwacji</h2>
                    <p className="subtitle">Twoje aktualne i przeszłe rezerwacje</p>

                    {bookings.length > 0 ? (
                        <div className="booking-list-container">
                            <div className="booking-list">
                                {bookings.map((booking) => (
                                    <div
                                        key={booking.id}
                                        className={`booking-item ${
                                            expanded === booking.id ? "expanded" : ""
                                        }`}
                                        onClick={() => toggleExpand(booking.id)}
                                    >
                                        <div className="booking-header">
                                            <div className="date">
                                                <strong>
                                                    {formatDate(booking.CheckIn)} -{" "}
                                                    {formatDate(booking.CheckOut)}
                                                </strong>
                                            </div>
                                            <div className="route">{booking.PropertyName}</div>
                                            <div className="price">
                                                {calculatePrice(
                                                    booking.ReferencePrice,
                                                    booking.ReferencePriceCurrency,
                                                    booking.MaxDiscountPercent
                                                )}
                                            </div>
                                            <button className="expand-btn">
                                                {expanded === booking.id ? "▲" : "▼"}
                                            </button>
                                        </div>
                                        <div
                                            className={`booking-details ${
                                                expanded === booking.id ? "visible" : ""
                                            }`}
                                        >
                                            <p>
                                                <strong>Adres:</strong> {booking.PropertyAddress}
                                            </p>
                                            <p>
                                                <strong>Cena podstawowa:</strong>{" "}
                                                {booking.ReferencePrice} {booking.ReferencePriceCurrency}
                                            </p>
                                            <p>
                                                <strong>Zniżka:</strong> {booking.MaxDiscountPercent}%
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="empty-state">
                            <p>
                                <strong>Nie masz jeszcze żadnych rezerwacji</strong>
                            </p>
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