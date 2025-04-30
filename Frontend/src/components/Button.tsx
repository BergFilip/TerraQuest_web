import { Link } from "react-router-dom";
import "../styles/components/button.scss";
import { useNavigate } from "react-router-dom";
import React from "react";

type ButtonProps = {
    text: string | React.ReactNode;
    route?: string;
    onClick?: () => void;
    type?: "button" | "submit";
};

const Button = ({ text, route, onClick }: ButtonProps) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (onClick) {
            onClick();
        } else {
            navigate(route);
        }
        window.scrollTo(0, 0);
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