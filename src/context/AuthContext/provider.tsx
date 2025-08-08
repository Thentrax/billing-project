"use client";

import { User } from "@/types/User";
import { useState } from "react"
import { AuthContext } from "./context";

const mockUser: User = {
  id: 1,
  username: "Thiago Cardoso",
  balance: 1000,
}

export const AuthProvider = ({ children }: { children: React.ReactNode}) => {
  const [user, setUser] = useState<User | null>(mockUser);
  const updateBalance = (amount: number) => {
    if (user) {
      setUser({ ...user, balance: user.balance + amount });
    }
  }

  const providerValue = {
    user,
    setUser,
    updateBalance,
  }

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  )
}