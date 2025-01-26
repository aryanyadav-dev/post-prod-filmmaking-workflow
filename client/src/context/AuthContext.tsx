import React, {
    createContext,
    useState,
    useContext,
    ReactNode
} from 'react';
import { authService } from '../services/authService';

interface AuthContextType {
    isAuthenticated: boolean;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
    register: (username: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(authService.isAuthenticated());

    const login = async (username: string, password: string) => {
        try {
            await authService.login({ username, password });
            setIsAuthenticated(true);
            authService.setupAxiosInterceptors();
        } catch (error) {
            setIsAuthenticated(false);
            throw error;
        }
    };

    const logout = () => {
        authService.logout();
        setIsAuthenticated(false);
    };

    const register = async (username: string, password: string) => {
        try {
            await authService.register({ username, password });
            // Optionally, auto-login after registration
            await login(username, password);
        } catch (error) {
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            login,
            logout,
            register
        }}>
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