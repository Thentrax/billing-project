"use client";

import { Transition } from "@/types/Transiton";
import { createContext } from "react";

export type TransitionContextType = {
  transitions: Transition[];
  fetchTransitions: () => void;
  selectedTransition: Transition | null;
  updateSelectedTransition: (transition: Transition | null) => void;
}

const defaultAuthContextValue: TransitionContextType = {
  transitions: [],
  fetchTransitions: () => {},
  selectedTransition: null,
  updateSelectedTransition: () => {}
};

export const TransitionContext = createContext<TransitionContextType>(defaultAuthContextValue);
