import "../styles/components/header.scss"
import Button from "./Button.tsx";

const Header  = () => {
    return (
        <header>
            <div className="logo">
                <img src="src/assets/terraquest.webp" alt="Logo TerraQuest"/>
                <div className="f_up_text_logo">TerraQuest</div>
            </div>
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