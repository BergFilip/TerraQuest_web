import {createContext, useContext, useEffect, useState, ReactNode,} from "react";

interface User {
    email: string;
    id: string;
    firstName: string;
    lastName: string;
}

interface AuthContextType {
    isLoggedIn: boolean;
    userEmail: string | null;
    userFirstName: string;
    userId: string;
    userLastName: string;
    checkAuth: () => Promise<boolean>;
    setUserEmail: (email: string) => void;
    setUserFirstName: (firstName: string) => void;
    setUserLastName: (lastName: string) => void;
    login: (email: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const [userFirstName, setUserFirstName] = useState<string>('');
    const [userLastName, setUserLastName] = useState<string>('');
    const [userId, setUserId] = useState<string>('');

    const checkAuth = async (): Promise<boolean> => {
        try {
            const response = await fetch('http://localhost:5000/api/auth/user', {
                method: 'GET',
                credentials: 'include',
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Dane z checkAuth:', data);
                setIsLoggedIn(true);
                setUserEmail(data.email);
                setUserFirstName(data.firstName);
                setUserLastName(data.lastName);
                setUserId(data.id);
                return true;
            }
            setIsLoggedIn(false);
            return false;
        } catch (error) {
            setIsLoggedIn(false);
            return false;
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    const login = async (email: string) => {
        setIsLoggedIn(true);
        setUserEmail(email);
    };

    const logout = async () => {
        try {
            await fetch('http://localhost:5000/api/auth/logout', {
                method: 'POST',
                credentials: 'include'
            });
        } finally {
            setIsLoggedIn(false);
            setUserEmail(null);
            setUserFirstName('');
            setUserLastName('');
        }
    };

    return (
        <AuthContext.Provider value={{
            isLoggedIn,
            userEmail,
            userFirstName,
            userLastName,
            userId,
            login,
            logout,
            checkAuth,
            setUserEmail,
            setUserFirstName,
            setUserLastName
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context)
        throw new Error("useAuth must be used within an AuthProvider");
    return context;
};
