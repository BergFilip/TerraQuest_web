import styles from '../styles/components/ContactForm.module.scss';
import { useState } from 'react';
import Alert from './Alert'

const ContactForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        message: ''
    });

    const [errors, setErrors] = useState({
        firstName: false,
        lastName: false,
        email: false,
        message: false
    });

    const [showAlert, setShowAlert] = useState(false); // Stan dla alertu

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: false }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newErrors = {
            firstName: !formData.firstName.trim(),
            lastName: !formData.lastName.trim(),
            email: !formData.email.trim(),
            message: !formData.message.trim()
        };

        setErrors(newErrors);

        const hasErrors = Object.values(newErrors).some(Boolean);
        if (!hasErrors) {
            console.log('Formularz wysłany:', formData);
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                message: ''
            });
            setShowAlert(true);
        }
    };

    return (
        <div className={styles.contactContainer}>
            <div className={styles.left}>
                <h2>Kontakt</h2>
                <p>Jesteśmy tu by ci pomóc</p>

                <div className={styles.contactItem}>
                    <i className="fa-solid fa-phone-volume"></i>
                    <div className="icons_contact">
                        <strong>Telefon</strong>
                        +48 123 456 789
                    </div>
                </div>

                <div className={styles.contactItem}>
                    <i className="fa-solid fa-envelope"></i>
                    <div className="icons_contact">
                        <strong>EMAIL</strong>
                        kontakt@travelquest.pl
                    </div>
                </div>

                <div className={styles.contactItem}>
                    <i className="fa-solid fa-map"></i>
                    <div className="icons_contact">
                        <strong>Lokalizacja</strong>
                        Warszawa ul. Światowa 12
                    </div>
                </div>
            </div>

            <div className={styles.right}>
                <h2>Masz pytanie?</h2>
                <p>Odpowiemy Ci na wszystko</p>

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="firstName"
                        placeholder="Imię"
                        value={formData.firstName}
                        onChange={handleChange}
                        className={errors.firstName ? styles.errorInput : ''}
                    />
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Nazwisko"
                        value={formData.lastName}
                        onChange={handleChange}
                        className={errors.lastName ? styles.errorInput : ''}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className={errors.email ? styles.errorInput : ''}
                    />
                    <textarea
                        name="message"
                        placeholder="Wiadomość"
                        value={formData.message}
                        onChange={handleChange}
                        className={errors.message ? styles.errorInput : ''}
                    />
                    <button type="submit">Wyślij</button>
                </form>
            </div>
            {showAlert && (
                <Alert
                    title="Sukces!"
                    message="Wiadomość została wysłana"
                    onClose={() => setShowAlert(false)}
                    onOk={() => setShowAlert(false)}
                />
            )}
        </div>
    );
};

export default ContactForm;
