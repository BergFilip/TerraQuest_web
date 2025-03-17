import "../styles/components/places_section.scss"

type PlacesSection = {
    link: string;
    text1: string;
    text2: string;
    text3: string;
    text4: string;
    text5: string;
};

const Places_5 = ({ link, text1, text2, text3, text4, text5 }: PlacesSection) => {
    return <div className="Places_5">
        <img src={link}/>
        <h4>{text1}</h4>
        <h4 className="descr_h4">{text2}</h4>
        <p><span className="span1">{text3}</span> <span className="span2">{text4}</span> <span className="span1">{text5}</span> </p>
    </div>
};
export default Places_5;

