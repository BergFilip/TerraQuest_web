import "../styles/components/places_section.scss"

type PlacesSection = {
    text1: string;
    text2: string;
};

const Places_3 = ({ text1, text2 }: PlacesSection) => {
    return <div className="Places_3">
        <img src={text1}/>
        <h4>{text2}</h4>
    </div>
};
export default Places_3;

