import "../styles/sites/Home.scss"
import HSection from "../components/h-section.tsx";
import Card from "../components/card.tsx";
import Places_1 from "../components/places_section_1.tsx";
import Places_2 from "../components/places_section_2.tsx";


function Home() {
    return(
        <div className="home">
            <div className="section1">
                <h1>Odkryj następną przygodę</h1>
                <p className={"s1_baner"}>planuj, rezerwuj i podróżuj z łatwością</p>
                <form>
                    <input type="text" placeholder={"Miejsce docelowe"}/>
                    <input type="date" placeholder={"Data wyjazdu i powrotu"}/>
                    <input type="number" placeholder={"Ilość uczestników"}/>
                    <input type="submit" value="Wyszukaj" className="alert-button"/>
                </form>
            </div>
            <div className="main_home_section">
                <div className="section2">
                    <HSection text1={"Oferty specjalnie dla Ciebie"}
                              text2={"Promocje i oferty specjalne dla Ciebie"}></HSection>
                    <div className="cards_section">
                        <Card text1={"Zaoszczędź na podróżach międzynarodowych"}
                              text2={"Urlop za granicą taniej niż nad Polskim morzem lub w górach? Tylko u nas specjalne oferty zagraniczne."}
                              text3={"Dowiedz się więcej"}
                              colorB={"#e1e1e1"}
                              colorT={"black"}>

                        </Card>

                        <Card text1={"Deszcz, śnieg, mgły - to nie znami !"}
                              text2={"Wyjeżdżasz na wakacje, a  tam tylko deszcz i musisz zostać w hotelu? Gwarantujemy udaną pogodę albo częściowy zwrot kosztów."}
                              text3={"Dowiedz się więcej"}
                              colorB={"#FFAD00"}
                              colorT={"white"}>

                        </Card>
                    </div>
                </div>
                <div className="section3">
                    <HSection text1={"Popularne cele podróży"}
                              text2={"Najpopularniejsze cele podróży wśród gości z Polski"}></HSection>
                    <div className="places_section_1">
                        <Places_1 text1={"Warszawa"} text2={"PL"}></Places_1>
                        <Places_1 text1={"Warszawa"} text2={"PL"}></Places_1>
                    </div>
                    <div className="places_section_2">
                        <Places_2 text1={"Poznań"} text2={"PL"}></Places_2>
                        <Places_2 text1={"Kraków"} text2={"PL"}></Places_2>
                        <Places_2 text1={"Karpacz"} text2={"PL"}></Places_2>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Home;