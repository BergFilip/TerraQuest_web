import "../styles/sites/About.scss"

function App() {
    return(
        <section>
            <div className="photo_conteiner">
                <img src="src/assets/about.webp" alt=""/>
            </div>
            <div className="our_mission">
                <div>
                    <h6>Nasza misja</h6>
                    <p>Kiedy podróżni szukają hotelu, chcemy, aby oczywistym wyborem było TerraQuest. Pomagamy im znaleźć najlepsze miejsce na pobyt, najlepszy czas na wyjazd i najlepsze oferty rezerwacji.</p>
                </div>
            </div>
            <div className="about_terraquest">
                <div>

                </div>
                <div>

                </div>
            </div>
            <div className="info">
                <div>
                    <span>
                        <h4>
                            5 mil
                        </h4>
                        <p>
                            hotele <br/> i podobne noclegi
                        </p>
                    </span>
                    <span>
                        <h4>
                            190
                        </h4>
                        <p>
                            kraje
                        </p>
                    </span>
                    <span>
                        <h4>
                            53
                        </h4>
                        <p>
                            strony internetowe <br/> i aplikacje
                        </p>
                    </span>
                    <span>
                        <h4>
                            31
                        </h4>
                        <p>
                            języki
                        </p>
                    </span>
                </div>
            </div>
            <div className="history">
                <h1>Nasza Historia</h1>
                <div className="timeline">
                    <div className="event" data-year="2020">
                        Narodziny pomysłu TerraQuest
                    </div><br/>
                    <div className="event" data-year="2021">
                        TerraQuest zostaje założony i uruchomiony w Niemczech
                    </div>
                    <div className="event">
                        Pierwsza runda finansowania
                    </div>
                    <div className="event">
                        Narodziny porównywarki cen
                    </div>
                    <div className="event" data-year="2022">
                        TerraQuest zostaje uruchomiony we Włoszech, Hiszpanii i Francji
                    </div><br/>
                    <div className="event" data-year="2023">
                        TerraQuest zostaje uruchomiony w Azji
                    </div>
                    <div className="event">
                        Druga runda finansowania
                    </div><br/>
                    <div className="event" data-year="2024">
                        Przejęcie weekend.com
                    </div>
                    <div className="event">
                        Rozpoczęcie współpracy z Chelsea FC
                    </div><br/>
                    <div className="event" data-year="2025">
                        Uruchomienie pierwszej w swoim rodzaju kampanii reklamowej opartej na sztucznej inteligencji w ramach innowacyjnego odświeżenia marki
                    </div>
                </div>
            </div>
        </section>
    )
}

export default App