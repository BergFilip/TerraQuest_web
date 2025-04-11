import "../styles/components/footer.scss";
import { Link } from "react-router-dom";
import { useState } from "react";

const Footer = () => {
    const [activeSection, setActiveSection] = useState<string | null>(null);

    const toggleSection = (section: string) => {
        setActiveSection(activeSection === section ? null : section);
    };

    return (
        <footer className="footer">
            <div className="footer_up">
                <div className="f_up_1">
                    <div className="f_up_logo_section">
                        <a href="/">
                            <img src="src/assets/terraquest.webp" alt="logo" />
                            <div className="f_up_text_logo">TerraQuest</div>
                        </a>
                    </div>
                    <div className="f_up_icon_section">
                        {/* Ikony */}
                    </div>
                </div>

                <div
                    className={`footer_section ${activeSection === "odkryj" ? "active" : ""}`}
                    onClick={() => toggleSection("odkryj")}
                >
                    <p className="footer_p">Odkryj</p>
                    <ul>
                        <li><a href="#">Planer podróży</a></li>
                        <li><Link to="/pogoda">Pogoda</Link></li>
                        <li><Link to="/newsletter">Newsletter</Link></li>
                        <li><a href="#">Specjalne oferty</a></li>
                    </ul>
                </div>

                <div
                    className={`footer_section ${activeSection === "produkty" ? "active" : ""}`}
                    onClick={() => toggleSection("produkty")}
                >
                    <p className="footer_p">Nasze produkty</p>
                    <ul>
                        <li><a href="#">Website App</a></li>
                        <li><a href="#">Mobile App</a></li>
                        <li><a href="#">Desktop App</a></li>
                        <li><a href="#">Project</a></li>
                    </ul>
                </div>

                <div
                    className={`footer_section ${activeSection === "informacje" ? "active" : ""}`}
                    onClick={() => toggleSection("informacje")}
                >
                    <p className="footer_p">Informacje ogólne</p>
                    <ul>
                        <li><a href="/about">O TerraQuest</a></li>
                        <li><a href="/help">Pomoc</a></li>
                        <li><a href="/privacypolicies">Polityka Prywatności</a></li>
                        <li><a href="/user">Moje konto</a></li>
                    </ul>
                </div>
            </div>

            <div className="footer_mid">
                Copyright © 2025 TerraQuest. Wszystkie prawa zastrzeżone.
            </div>
            <div className="footer_down">
                Created by Wiktor Tatarynowicz, Filip Berg, Jacek Prokop
            </div>
        </footer>
    );
};

export default Footer;
