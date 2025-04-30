import "../styles/components/places_section.scss";
import { useNavigate } from "react-router-dom";

type PlacesSection = {
    link: string;
    text1: string;
    text2: string;
    text3: string;
    text4: string;
    text5: string;
    link_to: string;
    onClick?: () => void;
};

const Places_5 = ({ link, text1, text2, text3, text4, text5, link_to, onClick }: PlacesSection) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (onClick) {
            onClick();
        } else {
            navigate(link_to);
        }
        window.scrollTo(0, 0);
    };

    return (
        <div className="Places_5" onClick={handleClick} style={{ cursor: "pointer" }}>
            <img src={link} alt={text1} />
            <h4>{text1}</h4>
            <h4 className="descr_h4">{text2}</h4>
            <p>
                <span className="span1">{text3}</span>
                <span className="span2">{text4}</span>
                <span className="span3">{text5}</span>
            </p>
        </div>
    );
};

export default Places_5;
