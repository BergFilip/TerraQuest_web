import "../styles/sites/Newsletter.scss"
import Alert from "../components/Alert"
import { useState } from "react";


function Newsletter() {
    return(
        <Main></Main>
    )
}

const Main = () => {
    const [showAlert, setShowAlert] = useState(false);

    const handleClick = (event) => {
        event.preventDefault();
        setShowAlert(true);
    };
    return (
        <main className={"Main_Newsletter"}>
            <h1>Zapisz się do Newslettera</h1>
            <p className={"p_main"}>nie pozwól, aby ominęły cię promocje i nowe atrakcje</p>
                <form>
                    <input type="email" placeholder={"jan.kowalski@wp.pl"}/>
                    <input type="submit" value="Zapisz się" onClick={handleClick} className="alert-button"/>
                    {showAlert && (
                        <Alert
                            title="Zgłoszono pomyślnie"
                            message="Dziękujemy za zapisanie się do naszego Newslettera. Sprawdź wiadomość e-mail."
                            onClose={() => setShowAlert(false)}
                        />
                    )}
                </form>
        </main>
    )
};

export default Newsletter
