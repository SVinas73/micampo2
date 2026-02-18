import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  farmName?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string, farmName?: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Cargar usuario del localStorage al iniciar
  useEffect(() => {
    const savedUser = localStorage.getItem('micampo_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulación de login - En producción esto sería una llamada a tu backend
    const users = JSON.parse(localStorage.getItem('micampo_users') || '[]');
    const foundUser = users.find((u: any) => u.email === email && u.password === password);
    
    if (foundUser) {
      const { password, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      setIsAuthenticated(true);
      localStorage.setItem('micampo_user', JSON.stringify(userWithoutPassword));
      return true;
    }
    
    // Demo: permitir login con cualquier email/password para pruebas
    if (email && password) {
      const demoUser = {
        id: '1',
        email,
        name: email.split('@')[0],
        farmName: 'Mi Estancia',
      };
      setUser(demoUser);
      setIsAuthenticated(true);
      localStorage.setItem('micampo_user', JSON.stringify(demoUser));
      return true;
    }
    
    return false;
  };

  const register = async (
    name: string, 
    email: string, 
    password: string, 
    farmName?: string
  ): Promise<boolean> => {
    // Simulación de registro
    const users = JSON.parse(localStorage.getItem('micampo_users') || '[]');
    
    if (users.find((u: any) => u.email === email)) {
      return false; // Usuario ya existe
    }
    
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password, // En producción: hashear
      farmName: farmName || 'Mi Campo',
    };
    
    users.push(newUser);
    localStorage.setItem('micampo_users', JSON.stringify(users));
    
    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    setIsAuthenticated(true);
    localStorage.setItem('micampo_user', JSON.stringify(userWithoutPassword));
    
    return true;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('micampo_user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
}
