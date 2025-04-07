import { useState } from "react";
import "../styles/sites/Product.scss";

function Product() {
    const images = [
        "/src/assets/miesiace.webp",
        "/src/assets/kontakt.webp",
        "/src/assets/logowanie.webp",
        "/src/assets/rejestracja.webp",
        "/src/assets/kompas.webp",
    ];

    const [mainImage, setMainImage] = useState(images[0]);

    const allReviews = Array.from({ length: 17 }, (_, i) => ({
        id: i,
        title: `Tytuł opinii #${i + 1}`,
        body: `To jest przykładowa treść opinii numer ${i + 1}.`,
        reviewer: `Użytkownik ${i + 1}`,
        date: `2024-0${(i % 12) + 1}-01`,
    }));

    const reviewsPerPage = 3;
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(allReviews.length / reviewsPerPage);

    const [ratings, setRatings] = useState(Array(allReviews.length).fill(0));

    const handleStarClick = (reviewIndex, starIndex) => {
        const newRatings = [...ratings];
        newRatings[reviewIndex] = starIndex + 1;
        setRatings(newRatings);
    };

    const paginatedReviews = allReviews.slice(
        (currentPage - 1) * reviewsPerPage,
        currentPage * reviewsPerPage
    );

    const renderPagination = () => {
        const pages = [];

        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                pages.push(1, 2, 3, "...", totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
            } else {
                pages.push(1, "...", currentPage, "...", totalPages);
            }
        }

        return (
            <>
                <span onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>←</span>
                {pages.map((page, idx) =>
                    page === "..." ? (
                        <span key={idx}>...</span>
                    ) : (
                        <span
                            key={idx}
                            onClick={() => setCurrentPage(page)}
                            className={currentPage === page ? "active-page" : ""}
                        >
                            {page}
                        </span>
                    )
                )}
                <span onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}>→</span>
            </>
        );
    };

    return (
        <section className="product_site">
            <div className="product_container">
                <div className="product_box">
                    <div className="product_header">
                        <div className="product_main-image">
                            <img src={mainImage} alt="Wybrane zdjęcie" />
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

                <div className="product_reviews">
                    <h3>Opinie klientów</h3>
                    <div className="reviews_list">
                        {paginatedReviews.map((review) => (
                            <div className="review_card" key={review.id}>
                                <div className="review_stars">
                                    {[1, 2, 3, 4, 5].map((starIndex) => (
                                        <span
                                            key={starIndex}
                                            className={`star ${starIndex < ratings[review.id] ? "filled" : ""}`}
                                            onClick={() => handleStarClick(review.id, starIndex)}
                                        >
                                            ★
                                        </span>
                                    ))}
                                </div>
                                <h4>{review.title}</h4>
                                <p>{review.body}</p>
                                <div className="review_user">
                                    <div className="avatar" />
                                    <div>
                                        <p>{review.reviewer}</p>
                                        <p>{review.date}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="pagination">{renderPagination()}</div>
                </div>
            </div>
        </section>
    );
}

export default Product;
