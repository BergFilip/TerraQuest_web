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
                    </div>
                </div>

                <div
                    className={`footer_section ${activeSection === "odkryj" ? "active" : ""}`}
                    onClick={() => toggleSection("odkryj")}
                >
                    <p className="footer_p">Odkryj</p>
                    <ul>
                        <li><a href="/explore">Planer podróży</a></li>
                        <li><Link to="/weather">Pogoda</Link></li>
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
                        <li><a href="https://github.com/BergFilip/TerraQuest_web" target="_blank">Website App</a></li>
                        <li><a href="https://github.com/KolegaTatar/TerraQuest_mobile" target="_blank">Mobile App</a></li>
                        <li><a href="https://github.com/KolegaTatar/SkyVision_desktop" target="_blank">Desktop App</a></li>
                        <li><a href="https://www.figma.com/proto/VAEeMmg1rGRkZhTuEwuFnK/Platforma-do-Planowania-Podr%C3%B3%C5%BCy-i-Rezerwacji-TerraQuest?node-id=0-1&p=f&t=tY3MevuZcr4uMUzy-0&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=354%3A3719&show-proto-sidebar=1" target="_blank">Project</a></li>
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
