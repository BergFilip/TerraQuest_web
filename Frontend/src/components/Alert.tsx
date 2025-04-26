import "../styles/components/Alert.scss";
import { X } from "lucide-react";
import { useEffect } from "react";

interface AlertProps {
    title: string;
    message: string;
    onClose: () => void;
    onOk?: () => void;
}

const Alert: React.FC<AlertProps> = ({ title, message, onClose, onOk }) => {
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);
    return (
        <div className="alert-overlay">
            <div className="alert-container">
                <div className="alert-box">
                    <div className="info">

                    </div>
                    <div className="alert-box-content">
                        <div className="alert-header">
                            <span>{title}</span>
                            <button onClick={onClose} className="alert-close">
                                <X />
                            </button>
                        </div>
                        <div className="alert-body">
                            <p>{message}</p>
                        </div>
                        <button onClick={onOk ? onOk : onClose} className="alert-button-ok" >
                            Okej
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Alert;