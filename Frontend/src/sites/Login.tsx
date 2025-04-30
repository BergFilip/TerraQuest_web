import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../styles/sites/Login.scss';
import { useAuth } from "../context/AuthContext.tsx";

function Login() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const res = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (res.ok) {
                await login(email);
                navigate('/user');
            } else {
                setError(data.message || 'Błędne logowanie');
            }
        } catch (err) {
            setError('Błędne logowanie');
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
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Uzupełnij"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <label htmlFor="password">Hasło</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Uzupełnij"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            backgroundColor: loading ? 'gray' : '',
                            color: 'white',
                            transition: 'background-color 0.3s ease',
                        }}
                    >
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
