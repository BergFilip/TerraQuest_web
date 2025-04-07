import { Link } from "react-router-dom";
import  '../styles/sites/Login.scss';

function Login(){
    return (
        <div className="login-section">
            <div className="auth-image"/>
            <div className="auth-form">
                <h2>Login</h2>
                <form>
                    <label>Email</label>
                    <input type="email" placeholder="Uzupełnij" />

                    <label>Hasło</label>
                    <input type="password" placeholder="Uzupełnij" />

                    <button type="submit">Sign In</button>

                    <div className="auth-footer">
                        <Link to="#" className="forgot_pass">Forgot password?</Link>
                        <div className="separator"><span>or</span></div>
                        <Link to="/register" className="register">Register</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
