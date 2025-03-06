import "../styles/components/footer.scss"

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer_up">
                <div className="f_up_1">
                    <div className="f_up_logo_section">
                        <a href="/">
                            <img src="src/assets/terraquest.webp" alt="logo"/>
                            <div className="f_up_text_logo">TerraQuest</div>
                        </a>

                    </div>
                    <div className="f_up_icon_section">

                    </div>
                </div>
                <div className="f_up_2">
                    <p className="footer_p">Odkryj</p>
                    <ul>
                        <li><a href="#">Planer podróży</a></li>
                        <li><a href="#">Pogoda</a></li>
                        <li><a href="#">Newsletter</a></li>
                        <li><a href="#">Specjalne oferty</a></li>
                    </ul>
                </div>
                <div className="f_up_3">
                    <p className="footer_p">Nasze produkty</p>
                    <ul>
                        <li><a href="#">Website App</a></li>
                        <li><a href="#">Mobile App</a></li>
                        <li><a href="#">Desktop App</a></li>
                        <li><a href="#">Project</a></li>
                    </ul>
                </div>
                <div className="f_up_4">
                    <p className="footer_p">Informacje ogólne</p>
                    <ul>
                        <li><a href="#">O TerraQuest</a></li>
                        <li><a href="#">Pomoc</a></li>
                        <li><a href="#">Polityka Prywatności</a></li>
                        <li><a href="#">Moje konto</a></li>
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

