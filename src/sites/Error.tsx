import "../styles/sites/Error.scss"
import Button from  "../components/Button.tsx"

const Error = () => {
    return (
        <section>
            <div className="back">
                <h1>
                    Nieznaleziono strony
                </h1>
                <p>
                    Wróć do strony głównej
                </p>
                <Button text={"Powrót"}></Button>
            </div>
        </section>
    );

};
export default Error;

