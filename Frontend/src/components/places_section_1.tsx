import "../styles/components/places_section.scss"
import {useNavigate} from "react-router-dom";

type PlacesSection = {
    text1: string;
    text2: string;
    backgroundImage: string;
    link_to: string;
};

const Places_1 = ({ text1, text2, backgroundImage, link_to  }: PlacesSection) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(link_to);
    };

    return <div className="Places_1"
                style={{
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }} onClick={handleClick}>
        <h3>{text1}</h3>
        <i>{text2}</i>
    </div>
};
export default Places_1;

