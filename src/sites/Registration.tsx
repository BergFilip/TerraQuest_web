import { Link } from "react-router-dom";
import  '../styles/sites/Register.scss';

function Register(){
    return (
        <div className="register-section">
            <div className="auth-form">
                <h2>Zarejestruj się</h2>
                <form>
                    <label>Email</label>
                    <input type="email" placeholder="Uzupełnij" className="input_from_register"/>

                    <label>Hasło</label>
                    <input type="password" placeholder="Uzupełnij" className="input_from_register"/>

                    <div className="checkbox-container">
                        <input type="checkbox" id="stay-logged"/>
                        <label htmlFor="stay-logged">
                            <p>Nie wylogowuj</p>
                        </label>
                    </div>

                    <button type="submit">Stwórz konto</button>

                    <div className="auth-footer">
                        <div className="separator"><span>lub</span></div>
                        <Link to="/login">Zaloguj</Link>
                    </div>
                </form>
            </div>
            <div className="auth-image"/>
        </div>
    );
};

export default Register;
