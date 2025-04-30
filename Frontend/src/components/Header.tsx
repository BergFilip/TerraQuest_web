import { useState } from "react";
import "../styles/components/header.scss";
import Button from "./Button.tsx";
import Logo from "./logo.tsx";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.tsx";

const Header = () => {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const { isLoggedIn, logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <header>
            <Logo/>
            <nav className={menuOpen ? "open" : ""}>
                <Button text="Dom" route={"/"}/>
                <Button text="Odkrywaj" route={"/explore"}/>
                <Button text="Pogoda" route={"/weather"}/>
                <Button text="O nas" route={"/about"}/>
                <Button text="Kontakt" route={"/contact"}/>

                <div className="login desktop">
                    {isLoggedIn ? (
                        <>
                            <Button text="Wyloguj" route="/" onClick={handleLogout}/>
                            <Button text={<i className='fa-solid fa-user'></i>} route="/user"/>
                        </>
                    ) : (
                        <>
                            <Button text="Zaloguj się" route="/login"/>
                            <Button text="Zarejestruj" route="/register"/>
                        </>
                    )}
                </div>
            </nav>
            <div className="icons">
                {isLoggedIn ? (
                    <>
                        <Button text={""} route={"/user"} children={<i className="fa-solid fa-user user-icon"></i>}/>
                        <i className="fa-solid fa-bars menu-icon" onClick={() => setMenuOpen(!menuOpen)}></i>
                    </>
                ) : (
                    <>
                    <Button text={""} route={"/register"} children={<i className="fa-solid fa-user user-icon"></i>}/>
                        <i className="fa-solid fa-bars menu-icon" onClick={() => setMenuOpen(!menuOpen)}></i>
                    </>
                )}
            </div>
        </header>
    );
};

export default Header;
