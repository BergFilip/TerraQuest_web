import "../styles/sites/Error.scss"
import Button from  "../components/Button.tsx"

const Error = () => {
    return (
        <section>
            <h1>
                Nieznaleziono strony
            </h1>
            <p>
                Wróć do strony głównej
            </p>
            <Button text={"Powrót"}></Button>
        </section>
    );

};
export default Error;

