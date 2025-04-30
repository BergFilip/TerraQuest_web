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

    // Pre-fill email if user is logged in
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

        // Email validation
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
            // Check if user is logged in
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

            // Send request to update newsletter status
            const response = await fetch('/api/newsletter', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
                credentials: 'include'
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Błąd podczas zapisywania');
            }

            setAlertData({
                title: "Zapisano pomyślnie!",
                message: "Twój status newslettera został zaktualizowany"
            });
            setShowAlert(true);

        } catch (error) {
            setAlertData({
                title: "Błąd!",
                message: error instanceof Error ? error.message : "Wystąpił błąd podczas zapisywania. Spróbuj ponownie."
            });
            setShowAlert(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className={"Main_Newsletter"}>
            <h1>Zapisz się do Newslettera</h1>
            <p className={"p_main"}>nie pozwól, aby ominęły cię promocje i nowe atrakcje</p>

            <form onSubmit={handleSubmit}>
                <div className="input-wrapper">
                    <input
                        type="email"
                        placeholder={"jan.kowalski@wp.pl"}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={emailError ? "error_N" : ""}
                        disabled={isSubmitting}
                    />
                    {emailError && <span className="error-message_N">{emailError}</span>}
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