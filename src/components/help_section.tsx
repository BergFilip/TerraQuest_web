import React, { useState } from "react";
import "../styles/components/help_section.scss";

type FaqProps = {
    title: string;
    content: string;
    colorB: string;
    colorT: string;
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

const FaqSection = () => {
    const faqs = [
        {
            title: "Tytuł",
            content:
                "Odpowiedz na często zadawane pytanie w prostym zdaniu, dłuższym akapicie lub nawet w formie listy.",
            colorB: "#f5f5f5",
            colorT: "#000",
        },
        { title: "Tytuł", content: "Treść dla drugiego pytania.", colorB: "#fff", colorT: "#333" },
        { title: "Tytuł", content: "Treść dla trzeciego pytania.", colorB: "#eee", colorT: "#111" },
        { title: "Tytuł", content: "Treść dla czwartego pytania.", colorB: "#ddd", colorT: "#222" },
    ];

    return (
        <div className="faq-section">
            {faqs.map((faq, index) => (
                <FaqItem key={index} {...faq} />
            ))}
            <p className="end"><a className="faq-more" href="">Więcej</a></p>
        </div>
    );
};

export default FaqSection;