import styles from '../styles/components/ContactForm.module.scss';

const ContactForm = () => {
    return (
        <div className={styles.contactContainer}>
            <div className={styles.left}>
                <h2>Kontakt</h2>
                <p>Jesteśmy tu by ci pomóc</p>

                <div className={styles.contactItem}>
                    <i className="fa-solid fa-phone-volume"></i>
                    <div className="icons_contact">
                        <strong>Telefon</strong>
                        +48 849 583 521
                    </div>
                </div>

                <div className={styles.contactItem}>
                    <i className="fa-solid fa-envelope"></i>
                    <div className="icons_contact">
                        <strong>EMAIL</strong>
                        jan.kowalski@gmail.com
                    </div>
                </div>

                <div className={styles.contactItem}>
                    <i className="fa-solid fa-map"></i>
                    <div className="icons_contact">
                        <strong>Lokalizacja</strong>
                        Warszawa ul. Powstańców 21A
                    </div>
                </div>
            </div>

            <div className={styles.right}>
                <h2>Masz pytanie?</h2>
                <p>Odpowiemy Ci na wszystko</p>

                <form>
                    <input type="text" placeholder="Imię" />
                    <input type="text" placeholder="Nazwisko" />
                    <input type="email" placeholder="Email" />
                    <textarea placeholder="Wiadomość" />
                    <button type="submit">Wyślij</button>
                </form>
            </div>
        </div>
    );
};

export default ContactForm;
