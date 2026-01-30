
import React from 'react';

interface Props {
  selectedMonth: number;
  selectedYear: number;
  onChange: (month: number, year: number) => void;
}

const MonthPicker: React.FC<Props> = ({ selectedMonth, selectedYear, onChange }) => {
  const months = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const handlePrev = () => {
    if (selectedMonth === 0) {
      onChange(11, selectedYear - 1);
    } else {
      onChange(selectedMonth - 1, selectedYear);
    }
  };

  const handleNext = () => {
    if (selectedMonth === 11) {
      onChange(0, selectedYear + 1);
    } else {
      onChange(selectedMonth + 1, selectedYear);
    }
  };

  return (
    <div className="flex items-center justify-between bg-white px-4 py-2 rounded-2xl shadow-sm border border-slate-100 mb-4 transition-colors">
      <button onClick={handlePrev} className="p-2 hover:bg-slate-50 rounded-full transition-colors">
        <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
      </button>
      <div className="text-center">
        <span className="text-sm font-bold text-slate-700">{months[selectedMonth]} {selectedYear}</span>
      </div>
      <button onClick={handleNext} className="p-2 hover:bg-slate-50 rounded-full transition-colors">
        <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
      </button>
    </div>
  );
};

export default MonthPicker;
