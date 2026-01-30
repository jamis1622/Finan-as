
import React from 'react';
import { Transaction } from '../types';
import MonthPicker from './MonthPicker';

interface Props {
  transactions: Transaction[];
  emergencyFund: number;
  onUpdateEmergencyFund: () => void;
  onAddClick: () => void;
  onEditClick: (transaction: Transaction) => void;
  onManageCategories: () => void;
  selectedMonth: number;
  selectedYear: number;
  onMonthChange: (month: number, year: number) => void;
}

const Dashboard: React.FC<Props> = ({ 
  transactions, 
  emergencyFund, 
  onUpdateEmergencyFund, 
  onAddClick, 
  onEditClick, 
  onManageCategories,
  selectedMonth, 
  selectedYear, 
  onMonthChange 
}) => {
  const filtered = transactions.filter(t => {
    const d = new Date(t.date);
    return d.getMonth() === selectedMonth && d.getFullYear() === selectedYear;
  });

  const totalReceita = filtered.filter(t => t.type === 'receita').reduce((sum, t) => sum + t.amount, 0);
  const totalDespesa = filtered.filter(t => t.type === 'despesa').reduce((sum, t) => sum + t.amount, 0);
  const balance = totalReceita - totalDespesa;

  const recentTransactions = [...filtered].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <MonthPicker selectedMonth={selectedMonth} selectedYear={selectedYear} onChange={onMonthChange} />

      {/* Main Balance Card */}
      <div className="bg-gradient-to-br from-indigo-600 to-violet-700 p-8 rounded-3xl text-white shadow-xl relative overflow-hidden transition-all">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.82v-1.91c-2.31-.41-4.06-1.89-4.14-4.22h2.24c.08 1.15.89 2.06 2.09 2.06 1.34 0 2.03-.84 2.03-1.63 0-1.22-.92-1.78-2.61-2.43-1.85-.71-3.69-1.55-3.69-3.95 0-2.07 1.6-3.48 3.73-3.87V4h2.82v1.9c2 0 3.63 1.3 3.67 3.34h-2.22c-.04-1.1-.73-1.68-1.63-1.68-1.07 0-1.82.52-1.82 1.48 0 1.05.74 1.54 2.39 2.15 1.94.73 3.91 1.66 3.91 4.29.01 2.31-1.61 3.76-3.89 4.16z"/></svg>
        </div>
        <p className="text-indigo-100 text-sm font-medium mb-1">Saldo do Mês</p>
        <h2 className="text-4xl font-black mb-6 tracking-tight">
          R$ {balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </h2>
        <div className="grid grid-cols-2 gap-4 border-t border-white/20 pt-6">
          <div>
            <p className="text-indigo-100 text-[10px] uppercase font-bold tracking-wider mb-1">Entradas</p>
            <p className="text-lg font-bold">R$ {totalReceita.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
          </div>
          <div className="text-right">
            <p className="text-indigo-100 text-[10px] uppercase font-bold tracking-wider mb-1">Saídas</p>
            <p className="text-lg font-bold text-rose-200">R$ {totalDespesa.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
          </div>
        </div>
      </div>

      {/* Emergency Fund Card */}
      <div className="bg-gradient-to-br from-teal-500 to-emerald-600 p-6 rounded-3xl text-white shadow-lg relative overflow-hidden transition-all group">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/></svg>
        </div>
        <div className="flex justify-between items-start">
          <div>
            <p className="text-teal-100 text-[10px] uppercase font-bold tracking-widest mb-1">Reserva de Emergência</p>
            <h3 className="text-2xl font-black tracking-tight">
              R$ {emergencyFund.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </h3>
          </div>
          <button 
            onClick={onUpdateEmergencyFund}
            className="p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-colors backdrop-blur-md"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
          </button>
        </div>
        <div className="mt-4 bg-black/10 rounded-full h-1.5 w-full overflow-hidden">
           <div className="bg-white h-full transition-all duration-1000" style={{ width: '100%' }}></div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button 
          onClick={onAddClick}
          className="bg-indigo-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
          Novo Registro
        </button>
        <button 
          onClick={onManageCategories}
          className="bg-white border border-slate-200 text-slate-700 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors shadow-sm"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
          Categorias
        </button>
      </div>

      {/* Recent Activity */}
      <div>
        <div className="flex justify-between items-center mb-4 px-2">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Resumo do Mês</h3>
        </div>
        <div className="space-y-3">
          {recentTransactions.map(t => (
            <div key={t.id} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-50 flex items-center justify-between group hover:border-indigo-100 transition-colors">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${t.type === 'receita' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                  {t.type === 'receita' ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 11l5-5m0 0l5 5m-5-5v12" /></svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 13l-5 5m0 0l-5-5m5 5V6" /></svg>
                  )}
                </div>
                <div>
                  <p className="font-semibold text-slate-800 text-sm line-clamp-1">{t.description}</p>
                  <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tight">{t.category}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <p className={`font-bold text-sm whitespace-nowrap ${t.type === 'receita' ? 'text-emerald-600' : 'text-slate-700'}`}>
                  {t.type === 'receita' ? '+' : '-'} R$ {t.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
                <button 
                  onClick={() => onEditClick(t)}
                  className="p-1.5 text-slate-300 hover:text-indigo-600 opacity-0 group-hover:opacity-100 transition-all hover:bg-indigo-50 rounded-lg"
                  title="Editar"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                </button>
              </div>
            </div>
          ))}
          {recentTransactions.length === 0 && (
             <div className="text-center py-10 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
               <p className="text-slate-400 text-xs">Nenhuma transação neste período.</p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
