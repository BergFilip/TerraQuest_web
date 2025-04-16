import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../styles/sites/Login.scss';

function Login() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError(null);
        setLoading(true);

        try {
            // Wysyłamy dane logowania do backendu
            const res = await fetch('http://localhost:4000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (res.ok) {
                // Zapisz token w localStorage
                localStorage.setItem('token', data.token);

                // Przekierowanie na stronę użytkownika po pomyślnym logowaniu
                navigate('/user');
            } else {
                setError(data.message || 'Wystąpił błąd. Spróbuj ponownie.');
            }
        } catch (err) {
            console.error("Błąd podczas logowania:", err);
            setError("Wystąpił błąd. Spróbuj ponownie.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-section">
            <div className="auth-image" />
            <div className="auth-form">
                <h2>Zaloguj</h2>
                <form onSubmit={handleSubmit}>
                    <label>Email</label>
                    <input
                        type="email"
                        placeholder="Uzupełnij"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <label>Hasło</label>
                    <input
                        type="password"
                        placeholder="Uzupełnij"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button type="submit" disabled={loading}>
                        {loading ? 'Logowanie...' : 'Zaloguj się'}
                    </button>

                    {error && <p className="error_alert">{error}</p>}

                    <div className="auth-footer">
                        <div className="separator"><span>lub</span></div>
                        <Link to="/register" className="register">Stwórz konto</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
