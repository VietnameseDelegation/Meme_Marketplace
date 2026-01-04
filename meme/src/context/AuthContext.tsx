import React, { createContext, useContext, useEffect, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

interface User {
    username: string;
    loggedIn: boolean;
}

interface AuthContextType {
    user: User | null;
    login: (username: string) => void;
    logout: () => void;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [storedUser, setStoredUser] = useLocalStorage<User | null>('user', null);
    const [user, setUser] = useState<User | null>(storedUser);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setUser(storedUser);
        setLoading(false);
    }, [storedUser]);

    const login = (username: string) => {
        const newUser = { username, loggedIn: true };
        setStoredUser(newUser);
        setUser(newUser);
    };

    const logout = () => {
        setStoredUser(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
