import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../styles/components/help_section.scss";

type FaqProps = {
    title: string;
    content: string;
    colorB: string;
    colorT: string;
};

type FaqSectionProps = {
    searchTerm?: string;
};

const FaqItem = ({ title, content, colorB, colorT }: FaqProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={`faq-item ${isOpen ? "open" : ""}`} style={{ backgroundColor: colorB, color: colorT }}>
            <button className="faq-title" onClick={() => setIsOpen(!isOpen)}>
                {title}
                <span className={`arrow ${isOpen ? "rotated" : ""}`}>&#9660;</span>
            </button>
            <div className="faq-content" style={{ maxHeight: isOpen ? "200px" : "0" }}>
                <p>{content}</p>
            </div>
        </div>
    );
};

const FaqSection = ({ searchTerm = "" }: FaqSectionProps) => {
    const location = useLocation();
    const [faqs, setFaqs] = useState<FaqProps[]>([]);
    const [allFaqs, setAllFaqs] = useState<FaqProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showAll, setShowAll] = useState(false);

    const shuffleArray = (array: FaqProps[]) => {
        return array
            .map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value);
    };

    useEffect(() => {
        const fetchFaqs = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/help1/faq');

                if (!response.ok) {
                    throw new Error(`Błąd serwera: ${response.status}`);
                }

                const data = await response.json();
                const shuffledFaqs = shuffleArray(data);

                setAllFaqs(shuffledFaqs);
                setFaqs(shuffledFaqs.slice(0, 4));
            } catch (err) {
                console.error("Błąd podczas pobierania FAQ:", err);
                setError("Nie udało się załadować FAQ.");
            } finally {
                setLoading(false);
            }
        };

        fetchFaqs();
    }, []);

    const filterFaqs = (term: string): FaqProps[] => {
        if (!term.trim()) {
            return showAll ? allFaqs : faqs;
        }

        const lowerTerm = term.toLowerCase();

        let filtered = allFaqs.filter(faq =>
            faq.title.toLowerCase().includes(lowerTerm)
        );

        if (filtered.length === 0) {
            filtered = allFaqs.filter(faq =>
                faq.content.toLowerCase().includes(lowerTerm)
            );
        }

        return filtered;
    };

    const visibleFaqs = filterFaqs(searchTerm);
    const isHelpPage = location.pathname === '/help';

    if (loading) return <div>Ładowanie...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="faq-section">
            {visibleFaqs.length === 0 ? (
                <p className="no-results">Nie znaleziono wyników</p>
            ) : (
                <>
                    {visibleFaqs.map((faq, index) => (
                        <FaqItem key={index} {...faq} />
                    ))}
                    <p className="end">
                        {isHelpPage ? (
                            <button
                                className="faq-more"
                                onClick={showAll ? () => setShowAll(false) : () => setShowAll(true)}
                            >
                                {showAll ? "Mniej" : "Więcej"}
                            </button>
                        ) : (
                            <a className="faq-more" href="/help">
                                Więcej
                            </a>
                        )}
                    </p>
                </>
            )}
        </div>
    );
};

export default FaqSection;
