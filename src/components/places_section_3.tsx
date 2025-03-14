import "../styles/components/places_section.scss"

type PlacesSection = {
    link: string;
    text2: string;
};

const Places_3 = ({ link, text2 }: PlacesSection) => {
    return <div className="Places_3">
        <img src={link}/>
        <h4>{text2}</h4>
    </div>
};
export default Places_3;

