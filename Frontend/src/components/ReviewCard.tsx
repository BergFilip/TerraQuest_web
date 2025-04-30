import React, { useState } from "react";
import "../styles/components/ReviewCard.scss";

type ReviewCardProps = {
    title: string;
    description: string;
    reviewer: string;
    date: string;
    rating: number;
    image: string;
};

type ReviewCardComponentProps = {
    reviews: ReviewCardProps[];
};

const ReviewCard = ({ reviews }: ReviewCardComponentProps) => {
    const [currentPage, setCurrentPage] = useState(0);
    const reviewsPerPage = 3;
    const totalPages = Math.ceil(reviews.length / reviewsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const currentReviews = reviews.slice(currentPage * reviewsPerPage, (currentPage + 1) * reviewsPerPage);

    return (
        <div className="review-list">
            <div className="cards">
                {currentReviews.map((review, index) => (
                    <div key={index} className="review-card">
                        <div className="stars">
                            {Array.from({ length: 5 }, (_, i) => (
                                <span key={i}>{i < review.rating ? "★" : "☆"}</span>
                            ))}
                        </div>
                        <h3>{review.title}</h3>
                        <p className="description">{review.description}</p>
                        <div className="reviewer">
                            <img src={review.image} alt="example" />
                            <div>
                                <p>{review.reviewer}</p>
                                <span>{review.date}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="pagination">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageChange(index)}
                        className={currentPage === index ? "active" : ""}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ReviewCard;
