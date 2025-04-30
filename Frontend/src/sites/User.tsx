import "../styles/sites/User.scss";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Update_Alert from "../components/Update_Alert";
import axios from "axios";
import Alert from "../components/Alert.tsx";

interface Booking {
    id: number;
    bookingId: number;
    PropertyName: string;
    PropertyAddress: string;
    CheckIn: string;
    CheckOut: string;
    ReferencePrice: number;
    ReferencePriceCurrency: string;
    MaxDiscountPercent: number;
    created_at: string;
    PropertyId: number;
}

function User() {
    const [expanded, setExpanded] = useState<number | null>(null);
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [currentTime, setCurrentTime] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [newsletter, setNewsletter] = useState<boolean>(false);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertTitle, setAlertTitle] = useState('');
    const [showConfirmAlert, setShowConfirmAlert] = useState(false);
    const [currentBookingToDelete, setCurrentBookingToDelete] = useState<number | null>(null);

    const {
        isLoggedIn,
        userEmail,
        userFirstName,
        userLastName,
        checkAuth,
        logout,
        userId,
        setUserFirstName,
        setUserLastName
    } = useAuth();
    const navigate = useNavigate();

    const [currencyRates] = useState({
        USD: 4.3,
        EUR: 4.5,
    });
    useEffect(() => {
        let isMounted = true;

        const verifyAuthAndFetchData = async () => {
            setLoading(true);

            try {
                const isAuthenticated = await checkAuth();

                if (!isAuthenticated) {
                    navigate("/login");
                    return;
                }

                if (!userId) {
                    console.log("Oczekiwanie na userId...");
                    return;
                }

                if (isMounted) {
                    await Promise.all([
                        fetchUserBookings(),
                        fetchUserData()
                    ]);
                }
            } catch (error) {
                console.error("Błąd inicjalizacji:", error);
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        verifyAuthAndFetchData();

        const interval = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString());
        }, 1000);

        return () => {
            isMounted = false;
            clearInterval(interval);
        };
    }, [checkAuth, navigate, userId]);

    useEffect(() => {
        if (userId) {
            fetchUserBookings();
        }
    }, [userId]);

    const fetchUserData = async () => {
        try {
            const response = await axios.get('/api/auth/user', {
                withCredentials: true
            });

            setNewsletter(response.data.newsletter || false);

            if (response.data.firstName) {
                setUserFirstName(response.data.firstName);
            }
            if (response.data.lastName) {
                setUserLastName(response.data.lastName);
            }

        } catch (error) {
            console.error('Błąd przy pobieraniu danych użytkownika', error);
        }
    };

    const fetchUserBookings = async () => {
        if (!userId) {
            console.log("Brak userId - nie można pobrać rezerwacji");
            setLoading(false);
            return;
        }

        try {
            const response = await axios.get(`http://localhost:5000/api/bookings?userId=${userId}`, {
                withCredentials: true,
            });
            setBookings(response.data);
        } catch (error) {
            console.error("Błąd pobierania rezerwacji:", error);
            if (axios.isAxiosError(error)) {
                console.error("Szczegóły błędu:", error.response?.data);
            }
        } finally {
            setLoading(false);
        }
    };

    const toggleExpand = (bookingId: number) => {
        setExpanded(expanded === bookingId ? null : bookingId);
    };

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const onRedirect = () => {
        navigate("/Newsletter");
    };

    const handleProfileUpdate = () => {
        setShowAlert(true);
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return "Brak daty";
        const date = new Date(dateString);
        return date.toLocaleDateString("pl-PL");
    };

    const convertToPLN = (price: number, currency: string): number => {
        if (currency === "USD") {
            return price * currencyRates.USD;
        } else if (currency === "EUR") {
            return price * currencyRates.EUR;
        }
        return price;
    };

    const calculatePrice = (price: number, currency: string, discount: number) => {
        const discountedPrice = price * (1 - discount / 100);
        const priceInPLN = convertToPLN(discountedPrice, currency);
        return `${priceInPLN.toFixed(2)} PLN`;
    };

    const handleDeleteClick = (propertyId: number, e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentBookingToDelete(propertyId);
        setAlertTitle('Potwierdź usunięcie');
        setAlertMessage('Czy na pewno chcesz usunąć tę rezerwację?');
        setShowConfirmAlert(true);
    };

    const confirmDelete = async () => {
        if (!currentBookingToDelete) return;
        setShowConfirmAlert(false);

        try {
            setShowConfirmAlert(false);
            await axios.delete(`http://localhost:5000/api/bookings/${currentBookingToDelete}`, {
                withCredentials: true
            });
            setShowConfirmAlert(false);
            setBookings(prev => prev.filter(b => b.PropertyId !== currentBookingToDelete));
            setAlertTitle('Sukces!');
            setAlertMessage('Rezerwacja usunięta pomyślnie');
            setShowAlert(false);
        } catch (error) {
            setShowConfirmAlert(false);
            console.error('Błąd usuwania:', error);
            setAlertTitle('Błąd');
            setAlertMessage('Nie udało się usunąć rezerwacji');
            setShowAlert(true);
        } finally {
            setShowConfirmAlert(false);
            setCurrentBookingToDelete(null);
        }
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
                    <hr/>

                    <div className="settings">
                        <div className="setting-item">
                            <i className="fa-solid fa-clock"></i>
                            <p><strong>Czas i godzina </strong> {currentTime}</p>
                        </div>

                        <div className="setting-item">
                            <i className="fa-solid fa-square-check"></i>
                            <p><strong>Aktywny Newsletter</strong> {newsletter ? "Tak" : "Nie"}</p>
                        </div>

                        <div className="setting-item" onClick={onRedirect}>
                            <i className="fa-solid fa-download"></i>
                            <p><strong>Zapisz się do Newslettera</strong></p>
                        </div>

                        <div className="setting-item" onClick={handleProfileUpdate} data-testid="profile-update-button">
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
                    <h2>Historia rezerwacji</h2>
                    <p className="subtitle">Twoje aktualne i przeszłe rezerwacje</p>

                    {bookings.length > 0 ? (
                        <div className="booking-list-container">
                            <div className="booking-list">
                                {bookings.map((booking, index) => (
                                    <div className="booking_all" key={index} onClick={() => toggleExpand(index)}>
                                        <div className="booking-item">
                                            <div className="main_booking_item">
                                                <h3 className="booking-header">
                                                    {booking.PropertyName}
                                                </h3>
                                                <p className="booking-desc"> ({booking.PropertyAddress})</p>
                                                <p className="info_sec_booking">
                                <span className="booking_price">
                                    <del>{calculatePrice(booking.ReferencePrice, booking.ReferencePriceCurrency, 0)}</del>
                                    <span className="new_price_booking">
                                        {calculatePrice(booking.ReferencePrice, booking.ReferencePriceCurrency, booking.MaxDiscountPercent)}
                                    </span>
                                </span>
                                                </p>
                                            </div>
                                            <div className="icons_booking">
                                                <i
                                                    className="fa-solid fa-trash"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleDeleteClick(booking.PropertyId, e);
                                                    }}
                                                ></i>
                                            </div>
                                        </div>
                                        <div className={`booking-details ${expanded === index ? "visible" : ""}`}>
                                            <p>{booking.PropertyName} to {booking.PropertyAddress}. Posiada wyjątkowe
                                                udogodnienia, takie jak basen, restauracja i wiele innych. Idealne
                                                miejsce na odpoczynek.</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="empty-state">
                            <p><strong>Nie masz jeszcze żadnych rezerwacji</strong></p>
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
            {/* Alert potwierdzający usunięcie */}
            {showConfirmAlert && (
                <Alert
                    title={alertTitle}
                    message={alertMessage}
                    onClose={() => {
                        setShowConfirmAlert(false);
                        setCurrentBookingToDelete(null);
                    }}
                    onOk={confirmDelete}
                />
            )}
        </main>
    );
}

export default User;