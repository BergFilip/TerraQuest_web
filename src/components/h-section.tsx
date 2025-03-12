import "../styles/components/h-section.scss"

type HSectionProps = {
    text1: string;
    text2: string;
};

const HSection = ({ text1, text2 }: HSectionProps) => {
    return <div className="h-section">
        <h3>{text1}</h3>
        <h6>{text2}</h6>
    </div>
};
export default HSection;

