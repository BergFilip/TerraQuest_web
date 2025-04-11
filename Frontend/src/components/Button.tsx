import { Link } from "react-router-dom";
import "../styles/components/button.scss";

type ButtonProps = {
    text: string;
    route?: string;
};

const Button = ({ text, route }: ButtonProps) => {
    return route ? (
        <Link to={route}>
            <button>{text}</button>
        </Link>
    ) : (
        <button>{text}</button>
    );
};

export default Button;