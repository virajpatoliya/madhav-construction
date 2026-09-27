import React, { createContext, useState, useContext, useEffect } from "react";
import { checkSession } from '../service/auth';

type AuthContextType = {
    isLoggedIn: boolean;
    setIsLoggedIn: (loggedIn: boolean) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        // On first load, check if user is already logged in (from cookie)
        const verify = async () => {
            const result = await checkSession();
            setIsLoggedIn(result);
        };
        verify();
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
};
