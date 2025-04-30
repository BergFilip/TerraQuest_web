import { Link } from "react-router-dom";
type CardProps = {
    text: string;
    colorB: string;
    colorT: string;
    route?: string;
};

const Btn_LR = ({ text, colorB,colorT, route }: CardProps) => {
    return route ?(
        <Link to={route}>
            <button style={{"backgroundColor": colorB, "color": colorT}}
            >{text}</button>

        </Link >

    ) : (
        <button style={{"backgroundColor": colorB, "color": colorT}}
        >{text}</button>
    );


};
export default Btn_LR;

