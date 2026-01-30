
import React from 'react';
import { INITIAL_USERS } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: 'dashboard' | 'history' | 'charts' | 'ai';
  setActiveTab: (tab: 'dashboard' | 'history' | 'charts' | 'ai') => void;
  coupleNames: string[];
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  activeTab, 
  setActiveTab, 
  coupleNames, 
  onLogout
}) => {
  return (
    <div className="min-h-screen flex flex-col max-w-2xl mx-auto bg-slate-50 shadow-xl relative">
      {/* Header */}
      <header className="bg-indigo-600 text-white p-6 rounded-b-3xl shadow-lg relative overflow-hidden">
        <div className="flex justify-between items-center relative z-10">
          <div>
            <h1 className="text-2xl font-bold">Finanças Machado</h1>
            <p className="text-indigo-100 text-sm">Finanças de {coupleNames[0]} & {coupleNames[1]}</p>
          </div>
          <div className="flex items-center gap-2">
            <button 
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onLogout();
              }}
              className="p-3 bg-white/20 hover:bg-rose-500 text-white rounded-full transition-all flex items-center justify-center shadow-sm"
              title="Sair do aplicativo"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
            <div className="flex -space-x-2 ml-2">
              <img src={INITIAL_USERS[0].avatar} className="w-10 h-10 rounded-full border-2 border-white shadow-sm" alt={INITIAL_USERS[0].name} />
              <img src={INITIAL_USERS[1].avatar} className="w-10 h-10 rounded-full border-2 border-white shadow-sm" alt={INITIAL_USERS[1].name} />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 pb-24 overflow-y-auto">
        {children}
      </main>

      {/* Sticky Bottom Nav */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-2xl bg-white border-t border-slate-100 flex justify-around p-3 z-50 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        <button 
          type="button"
          onClick={() => setActiveTab('dashboard')}
          className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'dashboard' ? 'text-indigo-600' : 'text-slate-400'}`}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
          <span className="text-[10px] font-medium uppercase tracking-wider">Início</span>
        </button>
        <button 
          type="button"
          onClick={() => setActiveTab('history')}
          className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'history' ? 'text-indigo-600' : 'text-slate-400'}`}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span className="text-[10px] font-medium uppercase tracking-wider">Histórico</span>
        </button>
        <button 
          type="button"
          onClick={() => setActiveTab('charts')}
          className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'charts' ? 'text-indigo-600' : 'text-slate-400'}`}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" /></svg>
          <span className="text-[10px] font-medium uppercase tracking-wider">Gráficos</span>
        </button>
        <button 
          type="button"
          onClick={() => setActiveTab('ai')}
          className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'ai' ? 'text-indigo-600' : 'text-slate-400'}`}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
          <span className="text-[10px] font-medium uppercase tracking-wider">IA Insights</span>
        </button>
      </nav>
    </div>
  );
};

export default Layout;
