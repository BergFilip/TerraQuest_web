import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
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
            // Szukamy użytkownika o podanym email
            const { data: userData, error: fetchError } = await supabase
                .from('users_terraQuest')
                .select('email, pass')
                .eq('email', email)
                .single(); // zakładamy że email jest unikalny

            if (fetchError) {
                setError("Nie znaleziono użytkownika lub wystąpił błąd.");
                setLoading(false);
                return;
            }

            if (!userData || userData.pass !== password) {
                setError("Nieprawidłowy email lub hasło.");
                setLoading(false);
                return;
            }


            navigate('/user');

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
