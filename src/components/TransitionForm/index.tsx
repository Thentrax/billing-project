'use client';

import { useContext, useEffect, useState } from 'react';
import GridDecoration from '../GridDecoration';
import api from '@/services/api';
import { TransitionContext } from '@/context/TransitionContext/context';
import { Refresh } from '@mui/icons-material';
import { AuthContext } from '@/context/AuthContext/context';
import { transitionOptions } from '@/types/Transiton';

type TransitionPayload = {
  type: string;
  value: number;
  processDate: string;
};

export default function TransitionForm() {
  const [type, setType] = useState('');
  const [value, setValue] = useState('');
  const { selectedTransition, updateSelectedTransition, fetchTransitions } = useContext(TransitionContext);
  const { updateBalance } = useContext(AuthContext);

  useEffect(() => {
    if (selectedTransition) {
      setType(selectedTransition.type);
      setValue(Math.abs(selectedTransition.value).toString());
    } else {
      setType('');
      setValue('');
    }
  }, [selectedTransition]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const numericValue = parseFloat(value.replace(',', '.'));
    if (!type || isNaN(numericValue)) return alert('Preencha todos os campos corretamente.');
    const finalValue = type === 'deposit' ? numericValue : -numericValue
    const payload: TransitionPayload = {
      type,
      value: finalValue,
      processDate: new Date().toISOString(),
    };

    try {
      if (selectedTransition) {
        await api.put(`/transitions/${selectedTransition._id}`, payload);
        updateBalance(finalValue - selectedTransition.value);
      } else {
        await api.post('/transitions', payload);
        updateBalance(finalValue);
        setType('');
        setValue('');
      }
      updateSelectedTransition(null);
      fetchTransitions();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      className="bg-background-secondary w-full h-full px-4 sm:px-16 py-6 rounded-md relative text-text-light"
    >
      <form
        onSubmit={handleSubmit}
      >
        <div className="absolute top-0 right-0">
          <GridDecoration 
            pattern={[
              [0, 1, 0, 1],
              [0, 0, 1, 1],
              [0, 1, 0, 0],
              [1, 1, 0, 0],
            ]}
            cellSize={32}
          />
        </div>
        <div className="absolute bottom-0 left-0">
          <GridDecoration 
            pattern={[
              [1, 1, 0, 0],
              [0, 1, 0, 0],
              [0, 0, 1, 1],
              [0, 1, 0, 1],
            ]}
            cellSize={32}
          />
        </div>

        <h2 className="text-xl font-semibold mb-4">Nova transação</h2>

        <div className="mb-4 relative z-10">
          <label className="block text-sm mb-1">
            Selecione o tipo de transação
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full sm:w-1/2 p-2 rounded-md border border-primary bg-white text-text-dark relative z-10"
          >
            <option value="" style={{ display: 'none' }}>Selecione o tipo de transação</option>
            {transitionOptions.map(({ value, label }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>

        <div className="mb-4 relative z-10">
          <label className="block text-sm mb-1">Valor</label>
          <input
            type="number"
            inputMode="decimal"
            min={1}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="00,00"
            className="w-full sm:w-1/3 p-2 rounded-md border border-primary bg-white text-text-dark"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="submit"
            className="bg-primary text-white font-semibold py-2 px-4 rounded-md hover:bg-primary-dark z-10"
          >
            {selectedTransition ? 'Atualizar transação' : 'Concluir transação'}
          </button>

          {selectedTransition && (
            <button
              type="button"
              className="text-primary py-2 px-2"
              onClick={() => updateSelectedTransition(null)}
            >
              <Refresh />
            </button>
          )}
        </div>
      </form>
    </div>
  );
}