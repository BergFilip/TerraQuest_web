import "../styles/components/card.scss"

type CardProps = {
    text1: string;
    text2: string;
    text3: string;
    colorB: string;
    colorT: string;
};

const Card = ({ text1, text2, text3, colorB,colorT }: CardProps) => {
    return <div className="card">
        <h3>{text1}</h3>
        <h6>{text2}</h6>
        <button style={{"backgroundColor": colorB, "color": colorT}}
            >{text3}</button>
    </div>
};
export default Card;

