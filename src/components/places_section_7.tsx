import "../styles/components/places_section.scss"
import Btn_LR from "./regis_log_btn.tsx";

type PlacesSection = {
    link: string;
    text1: string;
    text2: string;
    text3: string;
    text4: string;
    colorB: string;
    colorT: string;
    colorB2: string;
    colorT2: string;
};

const Places_7 = ({ link, text1, text2,text3, text4, colorB, colorT,colorT2, colorB2}: PlacesSection) => {
    return <div className="Places_7">
        <div className="icon">
            <i className={link}></i>
        </div>
        <div className="content">
            <p className="title"> {text1}</p>
            <p className="desc"> {text2}</p>
            <div className="buttons">
                <Btn_LR text={text3} colorB={colorB} colorT={colorT}></Btn_LR>
                <Btn_LR text={text4} colorB={colorB2} colorT={colorT2}></Btn_LR>
            </div>
        </div>
    </div>
};
export default Places_7;

