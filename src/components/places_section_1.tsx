import "../styles/components/places_section_1.scss"

type PlacesSection = {
    text1: string;
    text2: string;
};

const Places_1 = ({ text1, text2 }: PlacesSection) => {
    return <div className="Places_1">
        <h3>{text1}</h3>
        <i>{text2}</i>
    </div>
};
export default Places_1;

