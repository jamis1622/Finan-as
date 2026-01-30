
import React, { useState } from 'react';
import { getFinancialInsights } from '../services/geminiService';
import { Transaction } from '../types';

interface Props {
  transactions: Transaction[];
}

const AIInsights: React.FC<Props> = ({ transactions }) => {
  const [loading, setLoading] = useState(false);
  const [insight, setInsight] = useState<string | null>(null);

  const generate = async () => {
    setLoading(true);
    const text = await getFinancialInsights(transactions);
    setInsight(text);
    setLoading(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-indigo-600 p-8 rounded-3xl text-white shadow-xl relative overflow-hidden transition-all">
        <h2 className="text-2xl font-bold mb-2">Consultor IA</h2>
        <p className="text-indigo-100 text-sm mb-6 leading-relaxed">
          Receba dicas personalizadas baseadas nos seus gastos e aprenda como o casal pode economizar mais.
        </p>
        <button
          onClick={generate}
          disabled={loading || transactions.length === 0}
          className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-bold hover:bg-indigo-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              Analisando...
            </>
          ) : (
            'Gerar Insights do Mês'
          )}
        </button>
      </div>

      {insight && (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 animate-in slide-in-from-top duration-300 transition-colors">
          <div className="flex items-center gap-2 mb-4 text-indigo-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            <h3 className="font-bold">Análise do Consultor</h3>
          </div>
          <div className="prose prose-sm text-slate-600 whitespace-pre-line leading-relaxed">
            {insight}
          </div>
        </div>
      )}

      {transactions.length === 0 && !insight && (
        <p className="text-center py-10 text-slate-400 italic">Adicione transações para receber conselhos.</p>
      )}
    </div>
  );
};

export default AIInsights;
