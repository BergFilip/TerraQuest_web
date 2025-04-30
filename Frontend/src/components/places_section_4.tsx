import "../styles/components/places_section.scss";
import { useNavigate } from "react-router-dom";

type PlacesSection = {
    link: string;
    text1: string;
    text2: string;
    link_to: string;
    onClick?: () => void;
};

const Places_4 = ({ link, text1, text2, link_to, onClick }: PlacesSection) => {
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
        <div className="Places_4" onClick={handleClick}>
            <img src={link} alt={text1} />
            <h4>{text1}</h4>
            <h4 className="descr_h4">{text2}</h4>
        </div>
    );
};

export default Places_4;