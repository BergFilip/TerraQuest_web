type CardProps = {
    text: string;
    colorB: string;
    colorT: string;
};

const Btn_LR = ({ text, colorB,colorT }: CardProps) => {
    return <button style={{"backgroundColor": colorB, "color": colorT}}
            >{text}</button>
};
export default Btn_LR;

