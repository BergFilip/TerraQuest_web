import "../styles/sites/Newsletter.scss";
import { useState, useEffect } from "react";
import Alert from "../components/Alert";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Newsletter() {
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertData, setAlertData] = useState({
        title: "",
        message: ""
    });

    const { isLoggedIn, checkAuth, userEmail } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (userEmail) {
            setEmail(userEmail);
        }
    }, [userEmail]);

    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsSubmitting(true);
        setEmailError("");

        if (!email.trim()) {
            setEmailError("Email jest wymagany");
            setIsSubmitting(false);
            return;
        }

        if (!validateEmail(email)) {
            setEmailError("Proszę podać poprawny adres email");
            setIsSubmitting(false);
            return;
        }

        try {
            const isAuthenticated = await checkAuth();

            if (!isAuthenticated) {
                setAlertData({
                    title: "Wymagane logowanie",
                    message: "Musisz być zalogowany, aby zapisać się do newslettera"
                });
                setShowAlert(true);
                setIsSubmitting(false);
                return;
            }

            const response = await fetch('http://localhost:5000/api/newsletter', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ email }),
                credentials: 'include'
            });

            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                const text = await response.text();
                throw new Error(`Nieprawidłowa odpowiedź serwera: ${text.slice(0, 100)}...`);
            }

            const data = await response.json();

            if (data.message === 'Już jesteś zapisany do newslettera') {
                setAlertData({
                    title: "Uwaga",
                    message: data.message
                });
                return;
            }

            if (!response.ok || !data.success) {
                throw new Error(data.error || 'Błąd podczas zapisywania do newslettera');
            }


            setAlertData({
                title: "Sukces!",
                message: data.message || "Twój status newslettera został zaktualizowany"
            });

        } catch (error) {
            console.error('Błąd zapisu do newslettera:', error);
            setAlertData({
                title: "Błąd!",
                message: error instanceof Error ? error.message : "Wystąpił nieoczekiwany błąd"
            });
        } finally {
            setIsSubmitting(false);
            setShowAlert(true);
        }
    };

    return (
        <main className={"Main_Newsletter"}>
            <h1>Zapisz się do Newslettera</h1>
            <p className={"p_main"}>nie pozwól, aby ominęły cię promocje i nowe atrakcje</p>

            <form onSubmit={handleSubmit} data-testid="newsletter-form" aria-label="Newsletter subscription form">
                <div className="input-wrapper" data-testid="input-wrapper">
                    <input
                        type="email"
                        placeholder={"jan.kowalski@wp.pl"}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={emailError ? "error_N" : ""}
                        disabled={isSubmitting}
                    />
                    {emailError && <span className="error-message_N" data-testid="error-container">{emailError}</span>}
                </div>

                <input
                    type="submit"
                    value={isSubmitting ? "Wysyłanie..." : "Zapisz się"}
                    className="alert-button"
                    disabled={isSubmitting}
                />
            </form>

            {showAlert && (
                <Alert
                    title={alertData.title}
                    message={alertData.message}
                    onClose={() => {
                        setShowAlert(false);
                        if (alertData.title === "Wymagane logowanie") {
                            navigate('/login');
                        }
                    }}
                />
            )}
        </main>
    );
}

export default Newsletter;