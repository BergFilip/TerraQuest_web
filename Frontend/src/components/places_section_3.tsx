import "../styles/components/places_section.scss"
import {useNavigate} from "react-router-dom";

type PlacesSection = {
    link: string;
    text2: string;
    link_to: string;
};

const Places_3 = ({ link, text2, link_to}: PlacesSection) => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(link_to);
        window.scrollTo(0, 0);
    };

    return <div className="Places_3" onClick={handleClick}>
        <img src={link}/>
        <h4>{text2}</h4>
    </div>
};
export default Places_3;

