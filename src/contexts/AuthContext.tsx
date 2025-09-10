import React, { createContext, useContext, useState, useEffect } from "react";
import { User, AuthContextType } from "@/features/forum/types";

const STORAGE_KEYS = {
  USERS: "forum_users",
  CURRENT_USER: "forum_current_user",
};

// såkallade "Helpers"
function safeRead<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}
function safeWrite<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setUser(safeRead<User | null>(STORAGE_KEYS.CURRENT_USER, null));
    setIsLoading(false);
  }, []);

  const login = async (userName: string, password: string): Promise<boolean> => {
    const users = safeRead<User[]>(STORAGE_KEYS.USERS, []);
    const uname = userName.trim().toLowerCase();
    const found = users.find(u => u.userName.trim().toLowerCase() === uname && u.password === password);
    if (!found) return false;
    setUser(found);
    safeWrite(STORAGE_KEYS.CURRENT_USER, found);
    return true;
  };

  const register = async (userName: string, password: string): Promise<boolean> => {
    const users = safeRead<User[]>(STORAGE_KEYS.USERS, []);
    const uname = userName.trim().toLowerCase();
    if (users.some(u => u.userName.trim().toLowerCase() === uname)) return false;

    const newUser: User = {
      id: Date.now(),
      userName: userName.trim(),
      password, 
      isModerator: false,
      joinDate: new Date().toISOString(),
    };

    users.push(newUser);
    safeWrite(STORAGE_KEYS.USERS, users);
    setUser(newUser);
    safeWrite(STORAGE_KEYS.CURRENT_USER, newUser);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
