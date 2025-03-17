import "../styles/components/places_section.scss"

type PlacesSection = {
    link: string;
    text1: string;
    text2: string;
};

const Places_6 = ({ link, text1, text2}: PlacesSection) => {
    return <div className="Places_6">
        <img src={link}/>
        <h4>{text1}</h4>
        <h4 className="descr_h4">{text2}</h4>
    </div>
};
export default Places_6;

