import "../styles/components/Alert.scss";
import { X } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

interface AlertProps {
    title: string;
    onClose: () => void;
    onOk: () => void;
}

const Alert: React.FC<AlertProps> = ({ title, onClose, onOk }) => {
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const { userEmail, checkAuth } = useAuth();

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);


    const handleSubmit = async () => {
        const userData = {
            firstName,
            lastName,
            email: userEmail,
        };

        try {
            const response = await fetch("http://localhost:5000/api/auth/updateProfile", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                await checkAuth();
                onOk();
            } else {
                alert("Wystąpił problem z aktualizacją profilu.");
            }
        } catch (error) {
            alert("Błąd połączenia z serwerem.");
        }
    };

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
                            <form onSubmit={(e) => e.preventDefault()}>
                                <label htmlFor="Name">Imię</label>
                                <input type="text" placeholder="Imię" value={firstName} onChange={(e) => setFirstName(e.target.value)} required/><br/>
                                <label htmlFor="Surname">Nazwisko</label>
                                <input type="text" placeholder="Nazwisko" value={lastName} onChange={(e) => setLastName(e.target.value)} required/>
                            </form>
                        </div>
                        <button onClick={handleSubmit} className="alert-button-ok" >
                            Okej
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Alert;