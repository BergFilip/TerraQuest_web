import "../styles/sites/Help.scss";
import FaqSection from "../components/help_section.tsx";
import Button from "../components/Button.tsx";
import Alert from "../components/Alert.tsx";
import { useState } from "react";

function Help() {
    const [showAlert, setShowAlert] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();

        if (!searchTerm.trim()) {
            setShowAlert(true);
        }
    };

    return (
        <section className="help_site">
            <div className="section9">
                <article>
                    <h1>Cześć, jak możemy ci pomóc?</h1>
                    <div className="form-row-wrapper">
                        <form onSubmit={handleSearch}>
                            <i className="fa-solid fa-magnifying-glass"></i>
                            <input
                                type="text"
                                placeholder="Wpisz szukaną frazę..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <Button text="Szukaj" type="submit" />
                        </form>
                    </div>
                </article>
                <div className="places_section_8">
                    <FaqSection searchTerm={searchTerm} />
                </div>
            </div>

            {showAlert && (
                <Alert
                    title="Uwaga"
                    message="Proszę wpisać frazę do wyszukania"
                    onClose={() => setShowAlert(false)}
                />
            )}
        </section>
    );
}

export default Help;