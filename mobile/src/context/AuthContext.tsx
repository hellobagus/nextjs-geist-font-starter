import React, { createContext, useState, useContext } from 'react';

type UserRole = 'member' | 'admin_pusat' | 'admin_cabang';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  branch?: string;
  memberSince: string;
  profileImage: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  userRole: UserRole | null;
  currentUser: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const dummyUsers: Record<string, User> = {
  'member@nu.or.id': {
    id: 'M001',
    name: 'Ahmad Santoso',
    email: 'member@nu.or.id',
    role: 'member' as UserRole,
    memberSince: '2023-01-15',
    profileImage: 'https://example.com/profile1.jpg',
  },
  'admin.pusat@nu.or.id': {
    id: 'AP001',
    name: 'Haji Muhammad',
    email: 'admin.pusat@nu.or.id',
    role: 'admin_pusat' as UserRole,
    memberSince: '2022-06-01',
    profileImage: 'https://example.com/profile2.jpg',
  },
  'admin.cabang@nu.or.id': {
    id: 'AC001',
    name: 'Siti Aisyah',
    email: 'admin.cabang@nu.or.id',
    role: 'admin_cabang' as UserRole,
    branch: 'Surabaya',
    memberSince: '2022-08-15',
    profileImage: 'https://example.com/profile3.jpg',
  },
};

const dummyPasswords: Record<string, string> = {
  'member@nu.or.id': 'member123',
  'admin.pusat@nu.or.id': 'adminpusat123',
  'admin.cabang@nu.or.id': 'admincabang123',
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check credentials
    if (dummyUsers[email] && dummyPasswords[email] === password) {
      setCurrentUser(dummyUsers[email]);
      setIsAuthenticated(true);
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userRole: currentUser?.role || null,
        currentUser,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
