'use client';

import { AuthContext } from "@/context/AuthContext/context";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useContext, useState } from "react";


export default function InfoCard() {
  const { user } = useContext(AuthContext);
  const [showBalance, setShowBalance] = useState(true);
  
  const username = user?.username || 'Usuário';
  const balance = user?.balance ?? 0;
  
  const formatCurrency = (value: number) =>
    value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  
  const formatDate = (date: Date) =>
    date.toLocaleDateString("pt-BR", {
      weekday: "long",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

  const getFirstName = (name: string) => {
    const firstName = name.split(" ")[0];
    return firstName;
  }

  return (
    <div className="w-full h-full bg-primary text-white rounded-md p-6 px-8 flex justify-between items-start shadow-md relative">
    
      <div className="flex flex-col gap-1 z-10">
        <h2 className="text-lg font-semibold">Olá, {getFirstName(username)}! :)</h2>
        <span className="text-sm text-white/80">{formatDate(new Date())}</span>
      </div>

      <div className="text-right z-10">
        <div className="flex items-center justify-end gap-1 text-sm font-semibold text-white">
          <span>Saldo</span>
          <button onClick={() => setShowBalance(!showBalance)}>
            {showBalance ? (<Visibility/>) : (<VisibilityOff/>)}
          </button>
        </div>
        <div className="w-full border-t border-secondary my-1" />
        <span className="text-sm">Conta Corrente</span>
        <div className="text-xl font-bold">
          {showBalance ? formatCurrency(balance) : '•••••••••'}
        </div>
      </div>
    </div>
  );
}
