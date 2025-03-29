import { useState } from "react";
import "../styles/components/header.scss";
import Button from "./Button.tsx";
import Logo from "./logo.tsx";

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header>
            <Logo />
            <nav className={menuOpen ? "open" : ""}>
                <Button text="Dom"/>
                <Button text="Odkrywaj" />
                <Button text="Pogoda" />
                <Button text="O nas" />
                <Button text="Kontakt" />
                <div className="login desktop">
                    <Button text="Zaloguj się" />
                    <Button text="Zarejestruj" />
                </div>
            </nav>
            <div className="login mobile">
                <Button text="Zaloguj się" />
                <Button text="Zarejestruj" />
            </div>
            <div className="icons">
                <i className="fa-solid fa-user user-icon"></i>
                <i className="fa-solid fa-bars menu-icon" onClick={() => setMenuOpen(!menuOpen)}></i>
            </div>
        </header>
    );
};

export default Header;
