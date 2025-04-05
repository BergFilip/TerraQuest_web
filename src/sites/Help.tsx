import "../styles/sites/Help.scss"
import FaqSection from "../components/help_section.tsx";
import Button from "../components/Button.tsx";



function Help() {
    return(
        <section className="help_site">
            <div className="section9">
                <article>
                    <h1>Cześć, jak możemy ci pomóc?</h1>
                    <div>
                        <form action="">
                            <i className="fa-solid fa-magnifying-glass"></i>
                            <input type="text" name="question" id="question" placeholder="Zadaj nam pytanie?"/>
                        </form>
                        <Button text={"Szukaj"}></Button>
                    </div>
                </article>
                <div className="places_section_8">
                    <FaqSection></FaqSection>
                </div>


            </div>

        </section>
    )
}

export default Help