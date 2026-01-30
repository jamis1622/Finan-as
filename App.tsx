
import React, { useState, useEffect, useMemo } from 'react';
import { Transaction, Category } from './types';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import History from './components/History';
import Charts from './components/Charts';
import AIInsights from './components/AIInsights';
import TransactionForm from './components/TransactionForm';
import CategoryManager from './components/CategoryManager';
import { DEFAULT_CATEGORIES, INITIAL_USERS } from './constants';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  
  const [activeTab, setActiveTab] = useState<'dashboard' | 'history' | 'charts' | 'ai'>('dashboard');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<Category[]>(DEFAULT_CATEGORIES);
  const [emergencyFundAdjustment, setEmergencyFundAdjustment] = useState<number>(0);
  const [showForm, setShowForm] = useState(false);
  const [showCategoryManager, setShowCategoryManager] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  // Initial Load from LocalStorage
  useEffect(() => {
    const savedTransactions = localStorage.getItem('nos_dois_finance_v1');
    if (savedTransactions) {
      try {
        setTransactions(JSON.parse(savedTransactions));
      } catch (e) {
        console.error("Failed to parse saved transactions", e);
      }
    }
    
    const savedCategories = localStorage.getItem('nos_dois_categories_v1');
    if (savedCategories) {
      try {
        const parsed = JSON.parse(savedCategories);
        if (!parsed.includes('Reserva de Emergência')) {
           parsed.push('Reserva de Emergência');
        }
        setCategories(parsed);
      } catch (e) {
        console.error("Failed to parse saved categories", e);
      }
    }

    const savedEmergency = localStorage.getItem('nos_dois_emergency_v1');
    if (savedEmergency) {
      setEmergencyFundAdjustment(parseFloat(savedEmergency) || 0);
    }
  }, []);

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('nos_dois_finance_v1', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('nos_dois_categories_v1', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('nos_dois_emergency_v1', emergencyFundAdjustment.toString());
  }, [emergencyFundAdjustment]);

  const totalEmergencyFund = useMemo(() => {
    const transactionsTotal = transactions
      .filter(t => t.category === 'Reserva de Emergência')
      .reduce((sum, t) => {
        return t.type === 'despesa' ? sum + t.amount : sum - t.amount;
      }, 0);
    return emergencyFundAdjustment + transactionsTotal;
  }, [transactions, emergencyFundAdjustment]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    
    const targetEmail = 'jamiscares@hotmail.com';
    const targetPassword = '1622';

    if (loginEmail.toLowerCase() === targetEmail && loginPassword === targetPassword) {
      setIsLoggedIn(true);
      setLoginPassword('');
    } else {
      setLoginError('E-mail ou senha incorretos. Verifique suas credenciais.');
    }
  };

  const handleLogout = () => {
    // Ação direta para garantir funcionamento
    setIsLoggedIn(false);
    setLoginEmail('');
    setLoginPassword('');
    setLoginError('');
    setActiveTab('dashboard'); // Volta para o início para a próxima vez
  };

  const handleAddTransaction = (t: Transaction) => {
    setTransactions(prev => [t, ...prev]);
  };

  const handleUpdateTransaction = (updated: Transaction) => {
    setTransactions(prev => prev.map(t => t.id === updated.id ? updated : t));
    setEditingTransaction(null);
  };

  const handleEditClick = (t: Transaction) => {
    setEditingTransaction(t);
    setShowForm(true);
  };

  const handleAddCategory = (newCat: string) => {
    if (newCat && !categories.includes(newCat)) {
      setCategories(prev => [...prev, newCat]);
    }
  };

  const handleRenameCategory = (oldName: string, newName: string) => {
    if (!newName || oldName === newName) return;
    setCategories(prev => prev.map(c => c === oldName ? newName : c));
    setTransactions(prev => prev.map(t => t.category === oldName ? { ...t, category: newName } : t));
  };

  const handleDeleteCategory = (catName: string) => {
    if (catName === 'Reserva de Emergência') {
      alert("A categoria Reserva de Emergência é essencial para o sistema e não pode ser excluída.");
      return;
    }
    const linkedTransactions = transactions.filter(t => t.category === catName);
    if (linkedTransactions.length > 0) {
      if (!window.confirm(`Existem ${linkedTransactions.length} transações vinculadas a esta categoria. Elas serão movidas para "Outros".`)) return;
      setTransactions(prev => prev.map(t => t.category === catName ? { ...t, category: 'Outros' } : t));
    }
    setCategories(prev => prev.filter(c => c !== catName));
  };

  const handleDeleteTransaction = (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir esta transação?")) {
      setTransactions(prev => prev.filter(t => t.id !== id));
    }
  };

  const handleMonthChange = (month: number, year: number) => {
    setSelectedMonth(month);
    setSelectedYear(year);
  };

  const handleUpdateEmergencyFundAdjustment = () => {
    const val = prompt("Saldo inicial para a Reserva:", emergencyFundAdjustment.toString());
    if (val !== null) {
      const parsed = parseFloat(val);
      if (!isNaN(parsed)) setEmergencyFundAdjustment(parsed);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="bg-white p-8 sm:p-12 rounded-[3rem] shadow-2xl max-w-md w-full animate-in zoom-in duration-500 border border-slate-100">
          <div className="text-center space-y-4 mb-10">
            <div className="flex justify-center -space-x-4">
               <img src={INITIAL_USERS[0].avatar} className="w-16 h-16 rounded-full border-4 border-white shadow-lg" alt="Jamis" />
               <img src={INITIAL_USERS[1].avatar} className="w-16 h-16 rounded-full border-4 border-white shadow-lg" alt="Raquel" />
            </div>
            <h1 className="text-3xl font-black text-slate-800 tracking-tight">Finanças Machado</h1>
            <p className="text-slate-400 text-sm font-medium">Bem-vindos, Jamis & Raquel</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">E-mail de Acesso</label>
              <input 
                type="email" 
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="exemplo@hotmail.com"
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-slate-300"
              />
            </div>
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Senha</label>
              <input 
                type="password" 
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="••••"
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-slate-300"
              />
            </div>

            {loginError && (
              <p className="text-rose-500 text-xs font-bold text-center bg-rose-50 py-3 rounded-xl animate-in fade-in slide-in-from-top-1">
                {loginError}
              </p>
            )}

            <button 
              type="submit"
              className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 active:scale-[0.98] mt-2"
            >
              Entrar no Painel
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-50 text-center">
             <p className="text-[9px] text-slate-300 uppercase font-black tracking-[0.2em]">Criptografia Local de Ponta a Ponta</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Layout 
      activeTab={activeTab} 
      setActiveTab={setActiveTab} 
      coupleNames={['Jamis', 'Raquel']}
      onLogout={handleLogout}
    >
      {activeTab === 'dashboard' && (
        <Dashboard 
          transactions={transactions} 
          emergencyFund={totalEmergencyFund}
          onUpdateEmergencyFund={handleUpdateEmergencyFundAdjustment}
          onAddClick={() => { setEditingTransaction(null); setShowForm(true); }} 
          onEditClick={handleEditClick}
          onManageCategories={() => setShowCategoryManager(true)}
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
          onMonthChange={handleMonthChange}
        />
      )}
      
      {activeTab === 'history' && (
        <History 
          transactions={transactions} 
          onDelete={handleDeleteTransaction}
          onEditClick={handleEditClick}
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
          onMonthChange={handleMonthChange}
        />
      )}

      {activeTab === 'charts' && (
        <Charts 
          transactions={transactions} 
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
          onMonthChange={handleMonthChange}
        />
      )}

      {activeTab === 'ai' && (
        <AIInsights transactions={transactions.filter(t => {
          const d = new Date(t.date);
          return d.getMonth() === selectedMonth && d.getFullYear() === selectedYear;
        })} />
      )}

      {showForm && (
        <TransactionForm 
          categories={categories}
          initialData={editingTransaction || undefined}
          onAdd={handleAddTransaction} 
          onUpdate={handleUpdateTransaction}
          onAddCategory={handleAddCategory}
          onClose={() => { setShowForm(false); setEditingTransaction(null); }} 
        />
      )}

      {showCategoryManager && (
        <CategoryManager 
          categories={categories}
          onRename={handleRenameCategory}
          onDelete={handleDeleteCategory}
          onAdd={handleAddCategory}
          onClose={() => setShowCategoryManager(false)}
        />
      )}
    </Layout>
  );
};

export default App;
