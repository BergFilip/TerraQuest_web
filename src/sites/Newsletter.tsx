import "../styles/sites/Newsletter.scss"
import React, { useState } from "react";

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
            <p>nie pozwól, aby ominęły cię promocje i nowe atrakcje</p>
                <form>
                    <input type="email" placeholder={"jan.kowalski@wp.pl"}/>
                    <input type="submit" value="Zapisz się" onClick={handleClick} className="alert-button"/>
                    {showAlert && (
                        <div className="alert-box">
                            <div className="alert-header">
                                <span>Zgłoszono pomyślnie</span>
                                <button className="alert-close" onClick={() => setShowAlert(false)}>×</button>
                            </div>
                            <div className="alert-body">
                                Dziękujemy za zapisanie się do naszego Newslettera. Sprawdź wiadomość e-mail.
                            </div>
                            <button className="alert-button-ok" onClick={() => setShowAlert(false)}>Ok</button>
                        </div>
                    )}
                </form>
        </main>
    )
};

export default Newsletter
