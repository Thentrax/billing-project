"use client";

import { useEffect, useState } from "react"
import { Transition } from "@/types/Transiton";
import { TransitionContext } from "./context";
import api from "@/services/api";

export const TransitionProvider = ({ children }: { children: React.ReactNode}) => {
  const [transitions, setTransitions] = useState<Transition[]>([]);
  const [selectedTransition, setSelectedTransition] = useState<Transition | null>(null);

  useEffect(() => {
    fetchTransitions();
  }, []);

  const fetchTransitions = async () => {
    try {
      const response: Transition[] = await api.get('/transitions')
      setTransitions(response)
      if (selectedTransition) {
        const foundTransition = response.find(t => t._id === selectedTransition._id);
        setSelectedTransition(foundTransition || null);
      }
    } catch (err) {
      console.error('Erro ao buscar transições:', err)
    }
  }

  const updateSelectedTransition = (transition: Transition | null) => {
    setSelectedTransition(transition);
  };
  

  const providerValue = {
    transitions,
    fetchTransitions,
    selectedTransition,
    updateSelectedTransition,
  }

  return (
    <TransitionContext.Provider value={providerValue}>
      {children}
    </TransitionContext.Provider>
  )
}