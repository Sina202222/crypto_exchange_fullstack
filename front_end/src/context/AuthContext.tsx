import { createContext, ReactNode,
     useState, useEffect } from 'react';
import { User as UserType } from '../types'; // استفاده از نوع User از فایل types
import api from '../services/api';

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: UserType | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const { data } = await api.getCurrentUser();
          setUser(data);
        }
      } catch (error) {
        console.error('Authentication check failed', error);
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (username: string, password: string) => {
    try {
        const { data } = await api.login(username, password);
        localStorage.setItem('token', data.token);

        const userResponse = await api.getCurrentUser();
        const userData : User = {

        id: userResponse.data.id,
        username: userResponse.data.username,
        email: userResponse.data.email,
        role: userResponse.data.role || 'user' // مقدار پیش‌فرض اگر role وجود نداشت
        };
        setUser(userData);

        } catch (error) {
        console.error('Login failed:', error);
        throw error; // یا مدیریت خطا به روش مناسب
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        login,
        logout,
        loading
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;