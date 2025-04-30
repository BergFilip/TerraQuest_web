import "../styles/sites/Help.scss";
import FaqSection from "../components/help_section.tsx";
import Button from "../components/Button.tsx";
import Alert from "../components/Alert.tsx";
import { useState } from "react";

function Help() {
    const [showAlert, setShowAlert] = useState(false);
    const [inputValue, setInputValue] = useState("");

    const handleSearchClick = (e: React.FormEvent) => {
        e.preventDefault();

        if (inputValue.trim() !== "") {
            setShowAlert(true);
            setInputValue("");
        }
    };

    return (
        <section className="help_site" data-testid="search-form">
            <div className="section9">
                <article>
                    <h1>Cześć, jak możemy ci pomóc?</h1>
                    <div className="form-row-wrapper">
                        <form onSubmit={handleSearchClick}>
                            <i className="fa-solid fa-magnifying-glass"></i>
                            <input
                                type="text"
                                name="question"
                                id="question"
                                placeholder="Zadaj nam pytanie?"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)} // Ustawiamy wartość inputa
                            />
                            <Button text={"Szukaj"} type="submit" />
                        </form>
                    </div>
                </article>
                <div className="places_section_8">
                    <FaqSection />
                </div>
            </div>

            {showAlert && (
                <Alert
                    title="Dziękujemy!"
                    message="Twoja wiadomość została wysłana."
                    onClose={() => setShowAlert(false)}
                />
            )}
        </section>
    );
}

export default Help;
