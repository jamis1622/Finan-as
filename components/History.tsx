
import React from 'react';
import { Transaction } from '../types';
import { INITIAL_USERS } from '../constants';
import MonthPicker from './MonthPicker';

interface Props {
  transactions: Transaction[];
  onDelete: (id: string) => void;
  onEditClick: (transaction: Transaction) => void;
  selectedMonth: number;
  selectedYear: number;
  onMonthChange: (month: number, year: number) => void;
}

const History: React.FC<Props> = ({ transactions, onDelete, onEditClick, selectedMonth, selectedYear, onMonthChange }) => {
  const filtered = transactions.filter(t => {
    const d = new Date(t.date);
    return d.getMonth() === selectedMonth && d.getFullYear() === selectedYear;
  });

  const sorted = [...filtered].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const groups = sorted.reduce<Record<string, Transaction[]>>((acc, curr) => {
    if (!acc[curr.date]) acc[curr.date] = [];
    acc[curr.date].push(curr);
    return acc;
  }, {});

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-bold text-slate-800 px-2">Histórico</h2>
        <MonthPicker selectedMonth={selectedMonth} selectedYear={selectedYear} onChange={onMonthChange} />
      </div>
      
      {Object.entries(groups).length === 0 ? (
        <div className="text-center py-24 bg-white rounded-3xl border border-slate-100 transition-colors">
          <svg className="w-16 h-16 mx-auto mb-4 text-slate-100" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
          <p className="text-slate-400 text-sm">Nenhum registro encontrado para este mês.</p>
        </div>
      ) : (
        Object.entries(groups).map(([date, items]) => (
          <div key={date}>
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 pl-3">
              {new Date(date).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long' })}
            </h3>
            <div className="space-y-2">
              {items.map(item => (
                <div key={item.id} className="group relative bg-white p-4 rounded-2xl shadow-sm border border-slate-50 flex items-center justify-between hover:border-indigo-100 transition-all hover:shadow-md">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${item.type === 'receita' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                      {item.type === 'receita' ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 11l5-5m0 0l5 5m-5-5v12" /></svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 13l-5 5m0 0l-5-5m5 5V6" /></svg>
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800 text-sm">{item.description}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">
                        {item.category} • {item.userId === 'user1' ? INITIAL_USERS[0].name : INITIAL_USERS[1].name}
                      </p>
                    </div>
                  </div>
                  <div className="text-right flex items-center gap-2">
                    <p className={`font-bold text-sm ${item.type === 'receita' ? 'text-emerald-600' : 'text-slate-800'}`}>
                      {item.type === 'receita' ? '+' : '-'} R$ {item.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => onEditClick(item)}
                        className="text-slate-400 hover:text-indigo-600 transition-colors p-1.5 hover:bg-indigo-50 rounded-lg"
                        title="Editar"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-5" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                      </button>
                      <button 
                        onClick={() => onDelete(item.id)}
                        className="text-slate-400 hover:text-rose-600 transition-colors p-1.5 hover:bg-rose-50 rounded-lg"
                        title="Excluir"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default History;
