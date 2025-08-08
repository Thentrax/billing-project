"use client";

import { User } from "@/types/User";
import { createContext } from "react";

export type AuthContextType = {
  user: User | null;
  setUser: (user: User  | null) => void;
  updateBalance: (amount: number) => void;
}

const defaultAuthContextValue: AuthContextType = {
  user: null,
  setUser: () => {},
  updateBalance: () => {}
};

export const AuthContext = createContext<AuthContextType>(defaultAuthContextValue);
