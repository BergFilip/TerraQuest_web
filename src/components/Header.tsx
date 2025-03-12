import "../styles/components/header.scss"
import Button from "./Button.tsx";
import Logo from "./logo.tsx";

const Header  = () => {
    return (
        <header>
            <Logo></Logo>
            <nav>
                <Button text={"Dom"}></Button>
                <Button text={"Odkrywaj"}></Button>
                <Button text={"Pogoda"}></Button>
                <Button text={"O nas"}></Button>
                <Button text={"Kontakt"}></Button>
            </nav>
            <div className="login">
                <Button text={"Zaloguj się"}></Button>
                <Button text={"Zarejestruj"}></Button>
            </div>
        </header>
    );
};

export default Header;