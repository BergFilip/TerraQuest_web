import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import '../styles/sites/Register.scss';
import Alert from "../components/Alert.tsx";

function Register() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showAlert, setShowAlert] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const res = await fetch('http://localhost:4000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (res.ok) {
                setShowAlert(true);
                setTimeout(() => {
                    navigate('/login');
                }, 2000); // zmniejsz z 20s 😄
            } else {
                setError(data.message || 'Wystąpił błąd');
            }
        } catch (err) {
            console.error(err);
            setError('Coś poszło nie tak');
        }
    };

    return (
        <div className="register-section">
            <div className="auth-form">
                <h2>Zarejestruj się</h2>
                <form onSubmit={handleSubmit}>
                    <label>Email</label>
                    <input
                        type="email"
                        placeholder="Uzupełnij"
                        className="input_from_register"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <label>Hasło</label>
                    <input
                        type="password"
                        placeholder="Uzupełnij"
                        className="input_from_register"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <div className="checkbox-container">
                        <input type="checkbox" id="stay-logged" />
                        <label htmlFor="stay-logged">
                            <p>Nie wylogowuj</p>
                        </label>
                    </div>

                    <button type="submit" className="create">Stwórz konto</button>

                    {showAlert && (
                        <Alert
                            title="Dziękujemy za założenie konta"
                            message="Kliknij przycisk, aby przejść do logowania i zaloguj się na swoje konto."
                            onClose={() => setShowAlert(false)}
                        />
                    )}

                    {error && <p className="error_alert">{error}</p>}

                    <div className="auth-footer">
                        <div className="separator"><span>lub</span></div>
                        <Link to="/login">Zaloguj</Link>
                    </div>
                </form>
            </div>
            <div className="auth-image" />
        </div>
    );
}

export default Register;
