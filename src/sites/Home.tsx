import "../styles/sites/Home.scss"


function Home() {
    return(
        <div className="home">
            <div className="section1">
                <main className={"Main_Newsletter"}>
                    <h1>Odkryj następną przygodę</h1>
                    <p className={"s1_baner"}>planuj, rezerwuj i podróżuj z łatwością</p>
                    <form>
                        <input type="text" placeholder={"Miejsce docelowe"}/>
                        <input type="date" placeholder={"Data wyjazdu i powrotu"}/>
                        <input type="number" placeholder={"Ilość uczestników"}/>
                        <input type="submit" value="Wyszukaj" className="alert-button"/>
                    </form>
                </main>
            </div>
        </div>
    );
}


export default Home;