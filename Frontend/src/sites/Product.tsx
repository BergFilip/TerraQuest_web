import "../styles/sites/Product.scss";
import HSection from "../components/h-section.tsx";
import ReviewCard from "../components/ReviewCard.tsx";
import { useEffect, useState } from "react";
import axios from "axios";


type Review = {
    title: string;
    description: string;
    reviewer: string;
    date: string;
    rating: number;
    image: string;
};


function Product() {
    const images = [
        "/src/assets/miesiace.webp",
        "/src/assets/kontakt.webp",
        "/src/assets/logowanie.webp",
        "/src/assets/rejestracja.webp",
        "/src/assets/kompas.webp",
    ];

    const [reviews, setReviews] = useState<Review[]>([]);

    useEffect(() => {
        const fetchReview = async () => {
            try {
                const res = await axios.get("/api/reviews");
                if (Array.isArray(res.data)) setReviews(res.data);
            } catch (error) {
                console.error("❌ Błąd ładowania recenzji:", error);
            }
        };

        fetchReview();
    }, []);


    const [mainImage, setMainImage] = useState(images[0]);


    return (
        <section className="product_site">
            <div className="product_container">
                <div className="product_box">
                    <div className="product_header">
                        <div className="product_main-image">
                            <img src={mainImage} alt="Wybrane zdjęcie"/>
                        </div>
                        <div className="product_info">
                            <h2>Madryt <span>(Hiszpania)</span></h2>
                            <p className="product_duration">za 3 noce</p>
                            <p className="product_price">zł 350</p>
                            <button className="product_button">Zarezerwuj</button>
                            <p className="product_note">Przepiękna willa na obrzeżach miasta z własnym basenem.</p>
                        </div>
                    </div>

                    <div className="product_gallery">
                        {images.map((img, idx) => (
                            <img
                                key={idx}
                                src={img}
                                alt={`Zdjęcie ${idx + 1}`}
                                onClick={() => setMainImage(img)}
                                className={mainImage === img ? "active" : ""}
                            />
                        ))}
                    </div>

                    <div className="product_amenities">
                        <h3>Najlepsze udogodnienia</h3>
                        <ul>
                            <li><i className="fa-solid fa-wifi"></i>Wi-Fi w lobby</li>
                            <li><i className="fa-solid fa-wifi"></i>Wi-Fi w pokojach</li>
                            <li><i className="fa-solid fa-utensils"></i>Restauracja</li>
                            <li><i className="fa-solid fa-mug-hot"></i>Bar hotelowy</li>
                            <li><i className="fa-solid fa-heart"></i>Fitness</li>
                        </ul>
                    </div>

                    <div className="product_details">
                        <h3>Apartamenty Collegia — informacje</h3>
                        <p>Willa z basenem. 5 sypialni, kuchnia i kort tenisowy.</p>
                    </div>
                </div>
                <div className="sectaion5">
                    <HSection text1="Oceny klientów" text2="Statystyki mówią same za siebie"/>
                    <div className="card_review_section">
                        {reviews.length > 0 ? (
                            <ReviewCard reviews={reviews.slice(9, 17)}/>
                        ) : (
                            <p>Ładowanie recenzji...</p>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Product;
