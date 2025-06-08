import axios from 'axios';
import { useRouter } from 'next/router';
import {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode
} from 'react';

interface AuthContextProps {
    user: string | null;
    token: string | null;
    login: (email: string, password: string) => void;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const stored = localStorage.getItem('auth');
        if (stored) {
            setToken(stored) 
            const decoded = jwtDecode(stored);
            setUser(decoded)
        };
    }, []);

    const login = async (email: string, password: string) => {
        const response = await axios.post('/auth/login', { email, password });
        const receivedToken = response.data.token;
        localStorage.setItem('auth', receivedToken);
        setToken(receivedToken);
        const decoded = jwtDecode(receivedToken);
        setUser(decoded);
        router.push('/');
    };

    const logout = () => {
        localStorage.removeItem('auth');
        setToken(null);
        setUser(null);
        router.push('/auth/login');
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated: !!token }}>
            {children}
        </AuthContext.Provider>
    )
};
export const useAuth = () => useContext(AuthContext);


    