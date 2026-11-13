"use client";

import {
  createContext,
  useContext,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { LocalStore } from "@/lib/local-store";

export interface User {
  name: string;
  phone: string;
}

interface AuthContextValue {
  user: User | null;
  hydrated: boolean;
  login: (user: User) => void;
  logout: () => void;
}

const STORAGE_KEY = "stylekart-user";

const AuthContext = createContext<AuthContextValue | null>(null);

function validateUser(parsed: unknown): User | null {
  if (typeof parsed !== "object" || parsed === null) return null;
  const candidate = parsed as Record<string, unknown>;
  if (
    typeof candidate.name === "string" &&
    typeof candidate.phone === "string" &&
    candidate.name.length > 0
  ) {
    return { name: candidate.name, phone: candidate.phone };
  }
  return null;
}

const authStore = new LocalStore<User | null>(STORAGE_KEY, null, validateUser);

export function AuthProvider({ children }: { children: ReactNode }) {
  const user = useSyncExternalStore(
    authStore.subscribe,
    authStore.getSnapshot,
    authStore.getServerSnapshot,
  );
  const hydrated = useSyncExternalStore(
    authStore.subscribe,
    () => true,
    () => false,
  );

  const login = (nextUser: User) => authStore.set(nextUser);
  const logout = () => authStore.set(null);

  return (
    <AuthContext.Provider value={{ user, hydrated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
