export type Transition = {
  _id: string;
  type: TransitionType;
  value: number;
  processDate: string;
}

export const transitionMap = {
  deposit: 'Depósito',
  withdraw: 'Saque',
  transfer: 'DOC/TED',
} as const;

export type TransitionType = keyof typeof transitionMap;

export const transitionOptions = Object.entries(transitionMap).map(([value, label]) => ({
  value,
  label,
}));