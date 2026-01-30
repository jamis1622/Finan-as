
import React, { useState } from 'react';
import { Transaction, Category } from '../types';
import { INITIAL_USERS } from '../constants';

interface Props {
  categories: Category[];
  initialData?: Transaction;
  onAdd: (transaction: Transaction) => void;
  onUpdate: (transaction: Transaction) => void;
  onAddCategory: (category: string) => void;
  onClose: () => void;
}

const TransactionForm: React.FC<Props> = ({ categories, initialData, onAdd, onUpdate, onAddCategory, onClose }) => {
  const [description, setDescription] = useState(initialData?.description || '');
  const [amount, setAmount] = useState(initialData?.amount.toString() || '');
  const [type, setType] = useState<'receita' | 'despesa'>(initialData?.type || 'despesa');
  const [category, setCategory] = useState<Category>(initialData?.category || categories[0] || 'Outros');
  const [userId, setUserId] = useState(initialData?.userId || INITIAL_USERS[0].id);
  const [date, setDate] = useState(initialData?.date || new Date().toISOString().split('T')[0]);
  
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !amount) return;

    const transactionData: Transaction = {
      id: initialData?.id || crypto.randomUUID(),
      description,
      amount: parseFloat(amount),
      type,
      category,
      userId,
      date,
    };

    if (initialData) {
      onUpdate(transactionData);
    } else {
      onAdd(transactionData);
    }
    onClose();
  };

  const handleAddNewCategory = () => {
    if (newCategoryName.trim()) {
      onAddCategory(newCategoryName.trim());
      setCategory(newCategoryName.trim());
      setNewCategoryName('');
      setIsAddingCategory(false);
    }
  };

  const sortedCategories = [...categories].sort((a, b) => a.localeCompare(b, 'pt-BR'));

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-end sm:items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl animate-in slide-in-from-bottom duration-300 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-slate-800">
            {initialData ? 'Editar Transação' : 'Nova Transação'}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full text-slate-400">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex p-1 bg-slate-100 rounded-xl">
            <button
              type="button"
              onClick={() => setType('despesa')}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${type === 'despesa' ? 'bg-white text-rose-600 shadow-sm' : 'text-slate-500'}`}
            >
              Despesa
            </button>
            <button
              type="button"
              onClick={() => setType('receita')}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${type === 'receita' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500'}`}
            >
              Receita
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Descrição</label>
            <input
              type="text"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ex: Aluguel, Mercado..."
              className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-colors"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Valor (R$)</label>
              <input
                type="number"
                step="0.01"
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0,00"
                className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Data</label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-sm font-medium text-slate-700">Categoria</label>
              <button 
                type="button"
                onClick={() => setIsAddingCategory(!isAddingCategory)}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800"
              >
                {isAddingCategory ? 'Cancelar' : '+ Nova Categoria'}
              </button>
            </div>
            
            {!isAddingCategory ? (
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none appearance-none bg-no-repeat bg-[right_1rem_center] bg-[length:1em_1em] transition-colors"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7' /%3E%3C/svg%3E")` }}
              >
                {sortedCategories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            ) : (
              <div className="flex gap-2 animate-in slide-in-from-left-2">
                <input
                  type="text"
                  autoFocus
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="Nome da categoria"
                  className="flex-1 px-4 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddNewCategory();
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={handleAddNewCategory}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-xl font-bold"
                >
                  Ok
                </button>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Quem pagou?</label>
            <div className="flex gap-4">
              {INITIAL_USERS.map(user => (
                <button
                  key={user.id}
                  type="button"
                  onClick={() => setUserId(user.id)}
                  className={`flex-1 flex items-center justify-center gap-2 p-3 border rounded-xl transition-all ${userId === user.id ? 'border-indigo-600 bg-indigo-50 text-indigo-700 ring-1 ring-indigo-600' : 'border-slate-200 text-slate-600'}`}
                >
                  <img src={user.avatar} className="w-6 h-6 rounded-full" />
                  <span className="text-sm font-medium">{user.name}</span>
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 mt-2"
          >
            {initialData ? 'Atualizar Transação' : 'Salvar Transação'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TransactionForm;
