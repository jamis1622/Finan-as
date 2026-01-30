
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Transaction } from '../types';
import { getCategoryColor, INITIAL_USERS } from '../constants';
import MonthPicker from './MonthPicker';

interface Props {
  transactions: Transaction[];
  selectedMonth: number;
  selectedYear: number;
  onMonthChange: (month: number, year: number) => void;
}

const Charts: React.FC<Props> = ({ transactions, selectedMonth, selectedYear, onMonthChange }) => {
  const filtered = transactions.filter(t => {
    const d = new Date(t.date);
    return d.getMonth() === selectedMonth && d.getFullYear() === selectedYear;
  });

  const expenses = filtered.filter(t => t.type === 'despesa');
  
  const categoryData = expenses.reduce((acc: any[], curr) => {
    const existing = acc.find(a => a.name === curr.category);
    if (existing) {
      existing.value += curr.amount;
    } else {
      acc.push({ name: curr.category, value: curr.amount });
    }
    return acc;
  }, []).sort((a, b) => b.value - a.value);

  const userData = [
    { name: INITIAL_USERS[0].name, despesa: expenses.filter(t => t.userId === 'user1').reduce((sum, t) => sum + t.amount, 0) },
    { name: INITIAL_USERS[1].name, despesa: expenses.filter(t => t.userId === 'user2').reduce((sum, t) => sum + t.amount, 0) },
  ];

  const tooltipStyle = {
    backgroundColor: '#fff',
    borderRadius: '16px',
    border: 'none',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    color: '#1e293b'
  };

  const axisStyle = {
    fontSize: 10,
    fontWeight: 'bold',
    fill: '#94a3b8'
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-bold text-slate-800 px-2">Insights Gráficos</h2>
        <MonthPicker selectedMonth={selectedMonth} selectedYear={selectedYear} onChange={onMonthChange} />
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-24 bg-white rounded-3xl border border-slate-100 transition-colors">
          <p className="text-slate-400 text-sm">Sem dados para exibir neste mês.</p>
        </div>
      ) : (
        <>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-50 transition-colors">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Gastos por Categoria</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={8}
                    dataKey="value"
                  >
                    {categoryData.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={getCategoryColor(entry.name)} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={tooltipStyle}
                    itemStyle={{ color: '#1e293b' }}
                    formatter={(value: number) => `R$ ${value.toFixed(2)}`} 
                  />
                  <Legend 
                    iconType="circle" 
                    wrapperStyle={{ paddingTop: '20px', fontSize: '10px', textTransform: 'uppercase', fontWeight: 'bold' }} 
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-50 transition-colors">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Divisão entre o Casal</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={userData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={axisStyle} 
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tickFormatter={(v) => `R$${v}`} 
                    tick={axisStyle} 
                  />
                  <Tooltip 
                    cursor={{fill: '#f8fafc'}} 
                    contentStyle={tooltipStyle}
                    itemStyle={{ color: '#1e293b' }}
                    formatter={(value: number) => `R$ ${value.toFixed(2)}`} 
                  />
                  <Bar dataKey="despesa" radius={[10, 10, 0, 0]} barSize={40}>
                    {userData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index === 0 ? '#6366f1' : '#ec4899'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Charts;
