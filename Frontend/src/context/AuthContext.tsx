import {createContext, useContext, useEffect, useState, ReactNode,} from "react";
import { jwtDecode } from 'jwt-decode';

interface AuthContextType {
    isLoggedIn: boolean;
    userEmail: string | null;
    login: (email: string) => Promise<void>;
    logout: () => Promise<void>;
    checkAuth: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [userEmail, setUserEmail] = useState<string | null>(null);

    const checkAuth = async (): Promise<boolean> => {
        try {
            const response = await fetch('http://localhost:4000/api/auth/user', {
                credentials: 'include'
            });

            if (response.ok) {
                const data = await response.json();
                setIsLoggedIn(true);
                setUserEmail(data.email);
                return true;
            }
            return false;
        } catch (error) {
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
            await fetch('http://localhost:4000/api/auth/logout', {
                method: 'POST',
                credentials: 'include'
            });
        } finally {
            setIsLoggedIn(false);
            setUserEmail(null);
        }
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, userEmail, login, logout, checkAuth }}>
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
