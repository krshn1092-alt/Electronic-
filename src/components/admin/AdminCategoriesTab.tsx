import React, { useState } from 'react';
import { Layers, Plus, Trash2, Check, Sparkles, FolderPlus } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PendingConfirmation } from '../../types';

interface AdminCategoriesTabProps {
  onRequestConfirmation: (pending: PendingConfirmation) => void;
}

export const AdminCategoriesTab: React.FC<AdminCategoriesTabProps> = ({
  onRequestConfirmation
}) => {
  const { categories, addCategory, products } = useApp();
  const [newCatName, setNewCatName] = useState('');
  const [newCatDesc, setNewCatDesc] = useState('');

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;

    addCategory({
      name: newCatName.trim(),
      slug: newCatName.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      description: newCatDesc.trim() || `Curated collection of ${newCatName.trim()}`,
      icon: 'Layers',
      visible: true
    });

    setNewCatName('');
    setNewCatDesc('');
  };

  const handleDeleteCategory = (catName: string, catId: string) => {
    onRequestConfirmation({
      action: 'deleteCategory',
      targetId: catId,
      targetName: catName,
      message: `You are about to delete category "${catName}". This will remove the category grouping from the storefront.`
    });
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl">
        <h1 className="text-xl font-bold text-white tracking-tight font-display">
          Store Categories
        </h1>
        <p className="text-xs text-slate-400">
          Organize product taxonomy and navigation menus across the storefront.
        </p>
      </div>

      {/* Add Category Form */}
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-lg space-y-3">
        <div className="flex items-center gap-2">
          <FolderPlus className="w-4 h-4 text-cyan-400" />
          <h2 className="text-xs font-bold text-white uppercase tracking-wider">
            Create New Category
          </h2>
        </div>

        <form onSubmit={handleAddCategory} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={newCatName}
            onChange={(e) => setNewCatName(e.target.value)}
            placeholder="Category name (e.g. Gaming Laptops)"
            className="flex-1 bg-slate-950 text-white placeholder-slate-500 text-xs px-3.5 py-2.5 rounded-xl border border-slate-800 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            required
          />
          <input
            type="text"
            value={newCatDesc}
            onChange={(e) => setNewCatDesc(e.target.value)}
            placeholder="Short description (optional)"
            className="flex-1 bg-slate-950 text-white placeholder-slate-500 text-xs px-3.5 py-2.5 rounded-xl border border-slate-800 focus:outline-none focus:ring-1 focus:ring-cyan-500"
          />
          <button
            type="submit"
            className="px-4 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl shadow transition-all flex items-center justify-center gap-1.5 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Add Category</span>
          </button>
        </form>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => {
          const matchingCount = products.filter(p => p.category.toLowerCase() === cat.name.toLowerCase() || p.category.toLowerCase() === cat.slug.toLowerCase()).length;

          return (
            <div
              key={cat.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-md flex items-start justify-between gap-3 hover:border-slate-700 transition-colors"
            >
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0">
                    <Layers className="w-3.5 h-3.5" />
                  </div>
                  <h3 className="text-sm font-bold text-white truncate">
                    {cat.name}
                  </h3>
                </div>
                <p className="text-xs text-slate-400 line-clamp-2">
                  {cat.description}
                </p>
                <div className="pt-2 text-[11px] text-cyan-400 font-semibold">
                  {matchingCount} products currently assigned
                </div>
              </div>

              <button
                onClick={() => handleDeleteCategory(cat.name, cat.id)}
                className="text-slate-400 hover:text-rose-400 p-1 rounded hover:bg-rose-500/10 transition-colors shrink-0"
                title="Delete Category"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>

    </div>
  );
};
