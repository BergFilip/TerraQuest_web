import "../styles/sites/Weather.scss"
import Button from  "../components/Button.tsx"

const Weather = () => {
    return (
        <section className="weather">
            <div className="back">
                <h1>
                    Przepraszamy strona jeszcze niedostępna
                </h1>
                <p>
                    Wróć do strony głównej
                </p>
                <Button text={"Powrót"} route={"/"}></Button>
            </div>
        </section>
    );

};
export default Weather;

