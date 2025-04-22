import "../styles/components/card.scss";
import Btn_LR from "./regis_log_btn.tsx";

type CardProps = {
    text1: string;
    text2: string;
    text3: string;
    colorB: string;
    colorT: string;
    route_to: string;
};

const Card = ({ text1, text2, text3, colorB,colorT ,route_to}: CardProps) => {
    return <div className="card">
        <h3>{text1}</h3>
        <h6>{text2}</h6>
        <Btn_LR text={text3} colorB={colorB} colorT={colorT} route={route_to}></Btn_LR>
    </div>
};
export default Card;

