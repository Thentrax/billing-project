'use client';

import { useContext, useState } from 'react'
import clsx from 'clsx'
import api from '@/services/api'
import { Transition, transitionMap } from '@/types/Transiton'
import { Delete, Edit } from '@mui/icons-material'
import { TransitionContext } from '@/context/TransitionContext/context';
import { AuthContext } from '@/context/AuthContext/context';

export default function TransitionList() {
  const { transitions, fetchTransitions, updateSelectedTransition } = useContext(TransitionContext);
  const [selectedTransition, setSelectedTransition] = useState<Transition | null>(null);
  const { updateBalance } = useContext(AuthContext);

  const handleEdit = () => {
    if (selectedTransition) {
      updateSelectedTransition(selectedTransition);
    }
  };

  const handleDelete = async () => {
    if (!selectedTransition) return;
    const confirmDelete = window.confirm('Tem certeza que deseja excluir esta transação?');
    if (!confirmDelete) return;

    try {
      await api.delete(`/transitions/${selectedTransition._id}`);
      updateBalance(-selectedTransition.value);
      await fetchTransitions();
      setSelectedTransition(null);
    } catch (error) {
      console.error('Erro ao deletar transição:', error);
    }
  };

  const groupedTransitions = transitions.reduce((acc, transition) => {
    const date = new Date(transition.processDate);
    const month = date.toLocaleString('pt-BR', { month: 'long' });
    const year = date.getFullYear();
    const key = `${month} ${year}`;

    if (!acc[key]) acc[key] = []
    acc[key].push(transition)

    return acc
  }, {} as Record<string, Transition[]>)

  return (
    <div className="rounded-lg bg-white p-4 w-full h-full shadow-md">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-bold text-primary">Extrato</h2>
        <div className="flex gap-2">
          <button
            className="text-white bg-primary rounded-xl p-1.5 cursor-pointer disabled:opacity-50"
            onClick={handleEdit}
            disabled={!selectedTransition}
            title="Editar"
          >
            <Edit />
          </button>
          <button
            className="text-white bg-primary rounded-xl p-1.5 cursor-pointer disabled:opacity-50"
            onClick={handleDelete}
            disabled={!selectedTransition}
            title="Deletar"
          >
            <Delete />
          </button>
        </div>
      </div>
      <div className='flex flex-col gap-2 max-h-full overflow-y-auto'>
        {Object.entries(groupedTransitions).map(([monthYear, group]) => (
          <div key={monthYear} className="mb-4">
            <h3 className="text-sm text-primary font-bold mb-2">
              {monthYear.charAt(0).toUpperCase() + monthYear.slice(1)}
            </h3>
            {group.map((transition) => {
              const isNegative = transition.type.toLowerCase() === 'transferência';
              const transitionValue = isNegative ? -transition.value : transition.value;
              const formattedValue = transitionValue.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
                minimumFractionDigits: 2
              });
              const date = new Date(transition.processDate);
              const formattedDate = date.toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: '2-digit'
              });

              const isSelected = selectedTransition?._id === transition._id;

              return (
                <div
                  key={transition._id}
                  className={clsx(
                    'cursor-pointer text-sm py-1 border-b border-gray-200 px-2 rounded-md',
                    isSelected && 'bg-blue-100'
                  )}
                  onClick={() => selectedTransition?._id !== transition._id ? setSelectedTransition(transition) : setSelectedTransition(null)}
                >
                  <p className="text-primary">{transitionMap[transition.type]}</p>
                  <p className="text-secondary">
                    {formattedValue}
                  </p>
                  <span className="text-xs text-text-dark">{formattedDate}</span>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
