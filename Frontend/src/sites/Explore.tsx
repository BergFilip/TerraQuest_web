import "../styles/sites/Explore.scss";
import HSection from "../components/h-section.tsx";
import Places_5 from "../components/places_section_5.tsx";
import ReviewCard from "../components/ReviewCard.tsx";

const reviewsData = [
    { title: "Great Product", description: "I really loved this product.", reviewer: "John", date: "2025-04-10", rating: 5 },
    { title: "Good, but could be better", description: "It's okay, but has some issues.", reviewer: "Jane", date: "2025-04-09", rating: 3 },
    { title: "Not worth the price", description: "The product didn't meet my expectations.", reviewer: "Mike", date: "2025-04-08", rating: 2 },
    { title: "Excellent!", description: "Totally worth the money.", reviewer: "Anna", date: "2025-04-07", rating: 5 },
    { title: "Very good", description: "I'm happy with the purchase.", reviewer: "Chris", date: "2025-04-06", rating: 4 },
    { title: "Not bad", description: "It works fine, but nothing special.", reviewer: "Sam", date: "2025-04-05", rating: 3 },{ title: "Not worth the price", description: "The product didn't meet my expectations.", reviewer: "Mike", date: "2025-04-08", rating: 2 },
    { title: "Excellent!", description: "Totally worth the money.", reviewer: "Anna", date: "2025-04-07", rating: 5 },
    { title: "Very good", description: "I'm happy with the purchase.", reviewer: "Chris", date: "2025-04-06", rating: 4 },
    { title: "Not bad", description: "It works fine, but nothing special.", reviewer: "Sam", date: "2025-04-05", rating: 3 },
];

function Explore() {
    return (
        <section className="explore_site">
            <div className="section1">
                <h1>Zaoszczędzisz do 40% na następnym pobycie w hotelu</h1>
                <p className={"s1_baner"}>Porównujemy ceny pokoi hotelowych na ponad 100 stronach</p>
                <form>
                    <input type="text" placeholder={"Miejsce docelowe"} />
                    <input type="date" placeholder={"Data wyjazdu i powrotu"} />
                    <input type="number" placeholder={"Ilość uczestników"} />
                    <input type="submit" value="Wyszukaj" className="alert-button" />
                </form>
            </div>

            <div className="explore_home_section">
                <div className="section4"></div>

                <div className="section3">
                    <HSection text1={"Często wyszukiwane "} text2={"Zaoszczędz na pobytach w okresie 31 stycznia - 2 lutego"} />

                    <div className="places_section_5">
                        <Places_5 link={"https://cf.bstatic.com/static/img/theme-index/bg_luxury/869918c9da63b2c5685fce05965700da5b0e6617.jpg"} text1={"Hotel Super Star"} text2={"Polska, Warszawa"} text3={"2 noce"} text4={"1432zł"} text5={"785zł"} />
                        <Places_5 link={"https://cf.bstatic.com/static/img/theme-index/bg_luxury/869918c9da63b2c5685fce05965700da5b0e6617.jpg"} text1={"Hotel Super Star"} text2={"Polska, Warszawa"} text3={"2 noce"} text4={"1432zł"} text5={"785zł"} />
                        <Places_5 link={"https://cf.bstatic.com/static/img/theme-index/bg_luxury/869918c9da63b2c5685fce05965700da5b0e6617.jpg"} text1={"Hotel Super Star"} text2={"Polska, Warszawa"} text3={"2 noce"} text4={"1432zł"} text5={"785zł"} />
                        <Places_5 link={"https://cf.bstatic.com/static/img/theme-index/bg_luxury/869918c9da63b2c5685fce05965700da5b0e6617.jpg"} text1={"Hotel Super Star"} text2={"Polska, Warszawa"} text3={"2 noce"} text4={"1432zł"} text5={"785zł"} />
                    </div>
                </div>

                <div className="section4">
                    <HSection text1={"Pobierz aplikację TerraQuest"} text2={"Zyskaj wyjątkowe zniżki"} />

                    <div className="explore_baner">
                        <img src="/src/assets/terraquest_baner_promocja.webp" />
                    </div>
                </div>

                <div className="sectaion5">
                    <HSection text1={"Oceny klientów"} text2={"Statystyki mówią same za siebie"} />

                    <div className="card_review_section">
                        <ReviewCard reviews={reviewsData} />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Explore;
