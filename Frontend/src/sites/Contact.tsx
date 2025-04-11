import "../styles/sites/Contact.scss"
import ContactForm from "../components/ContactForm";

function Contact() {
    return(
        <section className="contact_site">
            <div className="background"></div>
            <ContactForm></ContactForm>
        </section>
    )
}

export default Contact