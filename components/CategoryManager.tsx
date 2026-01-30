
import React, { useState } from 'react';
import { Category } from '../types';
import { getCategoryColor } from '../constants';

interface Props {
  categories: Category[];
  onRename: (oldName: string, newName: string) => void;
  onDelete: (name: string) => void;
  onAdd: (name: string) => void;
  onClose: () => void;
}

const CategoryManager: React.FC<Props> = ({ categories, onRename, onDelete, onAdd, onClose }) => {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState('');
  const [newValue, setNewValue] = useState('');

  const startEdit = (index: number, name: string) => {
    setEditingIndex(index);
    setEditValue(name);
  };

  const handleSaveEdit = (oldName: string) => {
    if (editValue.trim() && editValue !== oldName) {
      onRename(oldName, editValue.trim());
    }
    setEditingIndex(null);
  };

  const handleAdd = () => {
    if (newValue.trim()) {
      onAdd(newValue.trim());
      setNewValue('');
    }
  };

  const sortedCategories = [...categories].sort((a, b) => a.localeCompare(b, 'pt-BR'));

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[110] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl animate-in zoom-in duration-300 max-h-[80vh] flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-slate-800">Gerenciar Categorias</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full text-slate-400">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="mb-6">
          <div className="flex gap-2">
            <input 
              type="text" 
              placeholder="Nova categoria..." 
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              className="flex-1 px-4 py-2 bg-slate-100 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
              onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
            />
            <button 
              onClick={handleAdd}
              className="bg-indigo-600 text-white px-4 py-2 rounded-xl font-bold hover:bg-indigo-700 transition-colors"
            >
              Adicionar
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto space-y-2 pr-2">
          {sortedCategories.map((cat, idx) => (
            <div key={cat} className="group bg-slate-50 p-3 rounded-2xl flex items-center justify-between border border-transparent hover:border-slate-200 transition-all">
              <div className="flex items-center gap-3 flex-1 mr-2">
                <div 
                  className="w-3 h-3 rounded-full shrink-0" 
                  style={{ backgroundColor: getCategoryColor(cat) }}
                />
                {editingIndex === idx ? (
                  <input 
                    autoFocus
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onBlur={() => handleSaveEdit(cat)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSaveEdit(cat)}
                    className="flex-1 bg-white px-2 py-1 rounded-lg border border-indigo-500 outline-none text-sm"
                  />
                ) : (
                  <span className="text-sm font-medium text-slate-700 truncate">
                    {cat}
                  </span>
                )}
              </div>
              
              <div className="flex items-center gap-1 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                {editingIndex === idx ? (
                  <button 
                    onClick={() => handleSaveEdit(cat)}
                    className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                  </button>
                ) : (
                  <>
                    <button 
                      onClick={() => startEdit(idx, cat)}
                      className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                    </button>
                    <button 
                      onClick={() => onDelete(cat)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <p className="text-[10px] text-slate-400 mt-4 italic text-center uppercase tracking-widest font-bold">
          Dica: Renomear uma categoria atualiza todo o histórico.
        </p>
      </div>
    </div>
  );
};

export default CategoryManager;
