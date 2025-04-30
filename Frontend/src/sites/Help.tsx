import "../styles/sites/Help.scss";
import FaqSection from "../components/help_section.tsx";
import { useState } from "react";

function Help() {
    const [inputValue, setInputValue] = useState("");


    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
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
                                name="question"
                                id="question"
                                placeholder="Wyszukaj pytanie?"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                            />
                        </form>
                    </div>
                </article>
                <div className="places_section_8">

                    <FaqSection searchTerm={inputValue} />
                </div>
            </div>
        </section>
    );
}

export default Help;