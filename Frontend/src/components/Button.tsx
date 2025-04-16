import { Link } from "react-router-dom";
import "../styles/components/button.scss";

import { useNavigate } from "react-router-dom";

type ButtonProps = {
    text: string;
    route: string;
    onClick?: () => void;
};

const Button = ({ text, route, onClick }: ButtonProps) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (onClick) {
            onClick();
        } else {
            navigate(route);
        }
    };
    return route ? (
        <Link to={route}>
            <button onClick={handleClick}>{text}</button>
        </Link>
    ) : (
        <button>{text}</button>
    );
};

export default Button;