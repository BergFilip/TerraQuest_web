import { Link } from "react-router-dom";
import  '../styles/sites/Register.scss';

function Register(){
    return (
        <div className="register-section">
            <div className="auth-image"/>
            <div className="auth-form">
                <h2>Register</h2>
                <form>
                    <label>Email</label>
                    <input type="email" placeholder="Uzupełnij" />

                    <label>Hasło</label>
                    <input type="password" placeholder="Uzupełnij" />

                    <div className="checkbox-container">
                        <input type="checkbox" id="stay-logged" />
                        <label htmlFor="stay-logged">
                            <strong>Nie wylogowuj</strong>
                            <br />
                            Opis
                        </label>
                    </div>

                    <button type="submit">Register</button>

                    <div className="auth-footer">
                        <div className="separator"><span>or</span></div>
                        <Link to="/login">Sign In</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
