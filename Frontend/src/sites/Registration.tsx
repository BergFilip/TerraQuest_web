import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import '../styles/sites/Register.scss';
import Alert from "../components/Alert.tsx";
import { useAuth } from "../context/AuthContext";

function Register() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [autoLogin, setAutoLogin] = useState<boolean>(false);
    const [showAlert, setShowAlert] = useState(false);
    const [error, setError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const res = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({email, password}),
            });

            const data = await res.json();

            if (res.ok) {
                if (autoLogin) {
                    const loginRes = await fetch('http://localhost:5000/api/auth/login', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        credentials: 'include',
                        body: JSON.stringify({email, password}),
                    });

                    if (loginRes.ok) {
                        await login(email);
                        navigate('/user');
                    } else {
                        setError(true);
                        setErrorMessage('Rejestracja się udała, ale automatyczne logowanie nie powiodło się.');
                    }
                }
                else {
                    setShowAlert(true);
                }
            }
            else {
                const errorMessage = data.message || 'User with this email already exists';
                setErrorMessage(errorMessage);
                setError(true);
            }
        }
        catch(err){
            console.error(err);
            setError(true)
            setErrorMessage('Coś poszło nie tak. Spróbuj ponownie.');
        }
    };

    return (
        <div className="register-section">
            <div className="auth-form">
                <h2>Zarejestruj się</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Uzupełnij"
                        className="input_from_register"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <label htmlFor="password">Hasło</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Uzupełnij"
                        className="input_from_register"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <div className="checkbox-container">
                        <input type="checkbox" id="stay-logged" checked={autoLogin} onChange={(e) => setAutoLogin(e.target.checked)}/>
                        <label htmlFor="stay-logged">
                            <p>Zaloguj automatycznie</p>
                        </label>
                    </div>

                    <button type="submit" className="create">Stwórz konto</button>

                    {showAlert && (
                        <Alert
                            title="Dziękujemy za założenie konta"
                            message="Kliknij przycisk, aby przejść do logowania i zaloguj się na swoje konto."
                            onClose={() => setShowAlert(false)}
                            onOk={() => navigate("/login")}
                        />
                    )}

                    {errorMessage && <p className="error_alert">{errorMessage}</p>}

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
