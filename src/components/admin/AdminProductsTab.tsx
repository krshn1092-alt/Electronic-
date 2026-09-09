import React, { useState } from 'react';
import { 
  Package, 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  EyeOff, 
  Edit3, 
  Trash2, 
  Check, 
  X, 
  SlidersHorizontal,
  DollarSign
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Product, ProductCategory, ProductCondition, PendingConfirmation } from '../../types';

interface AdminProductsTabProps {
  onRequestConfirmation: (pending: PendingConfirmation) => void;
}

export const AdminProductsTab: React.FC<AdminProductsTabProps> = ({
  onRequestConfirmation
}) => {
  const { 
    products, 
    addProduct, 
    updateProduct, 
    updateProductPrice, 
    updateProductStock, 
    toggleProductVisibility, 
    categories 
  } = useApp();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStock, setSelectedStock] = useState<string>('all');
  const [selectedVisibility, setSelectedVisibility] = useState<string>('all');

  // Quick edit price state
  const [editingPriceId, setEditingPriceId] = useState<string | null>(null);
  const [editingPriceVal, setEditingPriceVal] = useState<number>(0);

  // Add Product Modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newProdName, setNewProdName] = useState('');
  const [newProdBrand, setNewProdBrand] = useState('');
  const [newProdCategory, setNewProdCategory] = useState<ProductCategory>('smartphones');
  const [newProdCondition, setNewProdCondition] = useState<ProductCondition>('New');
  const [newProdPrice, setNewProdPrice] = useState<number>(30000);
  const [newProdOriginalPrice, setNewProdOriginalPrice] = useState<number>(35000);
  const [newProdStock, setNewProdStock] = useState<Product['stockStatus']>('In Stock');
  const [newProdRam, setNewProdRam] = useState('8GB');
  const [newProdStorage, setNewProdStorage] = useState('128GB');
  const [newProdWarranty, setNewProdWarranty] = useState('1 Year Warranty');

  const filtered = products.filter(p => {
    if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.brand.toLowerCase().includes(search.toLowerCase())) return false;
    if (selectedCategory !== 'all' && p.category.toLowerCase() !== selectedCategory.toLowerCase()) return false;
    if (selectedStock !== 'all' && p.stockStatus !== selectedStock) return false;
    if (selectedVisibility === 'visible' && p.visible === false) return false;
    if (selectedVisibility === 'hidden' && p.visible !== false) return false;
    return true;
  });

  const handleSavePrice = (productId: string) => {
    if (editingPriceVal > 0) {
      updateProductPrice(productId, editingPriceVal);
    }
    setEditingPriceId(null);
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addProduct({
      name: newProdName,
      brand: newProdBrand || 'General',
      category: newProdCategory,
      condition: newProdCondition,
      price: newProdPrice,
      originalPrice: newProdOriginalPrice,
      discount: Math.round(((newProdOriginalPrice - newProdPrice) / newProdOriginalPrice) * 100),
      image: newProdCategory === 'laptops' 
        ? 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80'
        : 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80'
      ],
      rating: 4.8,
      reviewCount: 1,
      stockStatus: newProdStock,
      stockCount: newProdStock === 'Out of Stock' ? 0 : 5,
      warranty: newProdWarranty,
      visible: true,
      keySpecs: {
        ram: newProdRam,
        storage: newProdStorage,
        warranty: newProdWarranty
      },
      description: `Premium ${newProdName} verified by Chiku Electronics technicians.`
    });

    setIsAddModalOpen(false);
    setNewProdName('');
    setNewProdBrand('');
  };

  const handleDeleteClick = (prod: Product) => {
    onRequestConfirmation({
      action: 'deleteProduct',
      targetId: prod.id,
      targetName: prod.name,
      message: `You are about to permanently delete "${prod.name}" from store inventory.`
    });
  };

  return (
    <div className="space-y-6">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/90 border border-slate-800 p-5 rounded-2xl">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight font-display">
            Products Management
          </h1>
          <p className="text-xs text-slate-400">
            Manage inventory, adjust prices, change visibility and track stock levels.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="self-start sm:self-center px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Add Product</span>
        </button>
      </div>

      {/* Filters Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 bg-slate-900 border border-slate-800 p-4 rounded-2xl">
        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, brand..."
            className="w-full bg-slate-950 text-white placeholder-slate-500 text-xs pl-8 pr-3 py-2 rounded-xl border border-slate-800 focus:outline-none focus:ring-1 focus:ring-cyan-500"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="bg-slate-950 text-slate-300 text-xs px-3 py-2 rounded-xl border border-slate-800 focus:outline-none focus:ring-1 focus:ring-cyan-500"
        >
          <option value="all">All Categories</option>
          <option value="smartphones">Smartphones</option>
          <option value="laptops">Laptops</option>
          <option value="computers">Computers</option>
          <option value="accessories">Accessories</option>
          <option value="refurbished">Refurbished</option>
        </select>

        <select
          value={selectedStock}
          onChange={(e) => setSelectedStock(e.target.value)}
          className="bg-slate-950 text-slate-300 text-xs px-3 py-2 rounded-xl border border-slate-800 focus:outline-none focus:ring-1 focus:ring-cyan-500"
        >
          <option value="all">All Stock Statuses</option>
          <option value="In Stock">In Stock</option>
          <option value="Low Stock">Low Stock</option>
          <option value="Out of Stock">Out of Stock</option>
        </select>

        <select
          value={selectedVisibility}
          onChange={(e) => setSelectedVisibility(e.target.value)}
          className="bg-slate-950 text-slate-300 text-xs px-3 py-2 rounded-xl border border-slate-800 focus:outline-none focus:ring-1 focus:ring-cyan-500"
        >
          <option value="all">All Visibility</option>
          <option value="visible">Visible on Storefront</option>
          <option value="hidden">Hidden from Storefront</option>
        </select>
      </div>

      {/* Products Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/60 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="p-3.5">Product</th>
                <th className="p-3.5">Category</th>
                <th className="p-3.5">Condition</th>
                <th className="p-3.5">Price</th>
                <th className="p-3.5">Stock Status</th>
                <th className="p-3.5 text-center">Storefront</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs">
              {filtered.map((prod) => {
                const isVisible = prod.visible !== false;
                const isEditingThisPrice = editingPriceId === prod.id;

                return (
                  <tr key={prod.id} className="hover:bg-slate-800/30 transition-colors">
                    
                    {/* Product Name & Image */}
                    <td className="p-3.5">
                      <div className="flex items-center gap-3">
                        <img
                          src={prod.image}
                          alt={prod.name}
                          className="w-10 h-10 rounded-lg object-cover bg-slate-950 shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div className="min-w-0 max-w-[200px] sm:max-w-[260px]">
                          <div className="font-bold text-white truncate">{prod.name}</div>
                          <div className="text-[10px] text-slate-400">{prod.brand}</div>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="p-3.5 text-slate-300 capitalize">
                      {prod.category}
                    </td>

                    {/* Condition */}
                    <td className="p-3.5">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        prod.condition === 'New' 
                          ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                          : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      }`}>
                        {prod.condition}
                      </span>
                    </td>

                    {/* Price with quick inline edit */}
                    <td className="p-3.5">
                      {isEditingThisPrice ? (
                        <div className="flex items-center gap-1">
                          <input
                            type="number"
                            value={editingPriceVal}
                            onChange={(e) => setEditingPriceVal(Number(e.target.value))}
                            className="w-20 bg-slate-950 text-white px-2 py-1 rounded border border-cyan-500 text-xs focus:outline-none"
                            autoFocus
                          />
                          <button
                            onClick={() => handleSavePrice(prod.id)}
                            className="p-1 text-emerald-400 hover:bg-emerald-500/20 rounded"
                            title="Save"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setEditingPriceId(null)}
                            className="p-1 text-slate-400 hover:bg-slate-800 rounded"
                            title="Cancel"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 group">
                          <span className="font-bold text-white">
                            ₹{prod.price.toLocaleString('en-IN')}
                          </span>
                          <button
                            onClick={() => {
                              setEditingPriceId(prod.id);
                              setEditingPriceVal(prod.price);
                            }}
                            className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-cyan-400 p-0.5 rounded transition-opacity"
                            title="Quick Edit Price"
                          >
                            <Edit3 className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </td>

                    {/* Stock Status Switcher */}
                    <td className="p-3.5">
                      <select
                        value={prod.stockStatus}
                        onChange={(e) => updateProductStock(prod.id, e.target.value as any)}
                        className={`text-[11px] font-semibold px-2 py-1 rounded-lg border bg-slate-950 focus:outline-none ${
                          prod.stockStatus === 'In Stock'
                            ? 'text-emerald-400 border-emerald-500/30'
                            : prod.stockStatus === 'Low Stock'
                            ? 'text-amber-400 border-amber-500/30'
                            : 'text-rose-400 border-rose-500/30'
                        }`}
                      >
                        <option value="In Stock">In Stock</option>
                        <option value="Low Stock">Low Stock</option>
                        <option value="Out of Stock">Out of Stock</option>
                      </select>
                    </td>

                    {/* Storefront Visibility Toggle */}
                    <td className="p-3.5 text-center">
                      <button
                        onClick={() => toggleProductVisibility(prod.id)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold transition-colors ${
                          isVisible
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20'
                            : 'bg-slate-800 text-slate-400 border border-slate-700 hover:bg-slate-700'
                        }`}
                        title={isVisible ? 'Click to hide from store' : 'Click to show on store'}
                      >
                        {isVisible ? (
                          <>
                            <Eye className="w-3 h-3" />
                            <span>Visible</span>
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-3 h-3" />
                            <span>Hidden</span>
                          </>
                        )}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => handleDeleteClick(prod)}
                        className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                        title="Delete Product"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="p-3.5 border-t border-slate-800 bg-slate-950/40 text-[11px] text-slate-400 flex items-center justify-between">
          <span>Showing {filtered.length} of {products.length} products</span>
          <span className="text-cyan-400">💡 Tip: You can also update prices or stock using the AI Command Center</span>
        </div>
      </div>

      {/* Add Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">Add New Product</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Product Name</label>
                <input
                  type="text"
                  value={newProdName}
                  onChange={(e) => setNewProdName(e.target.value)}
                  placeholder="e.g., iPhone 15 Plus 128GB"
                  className="w-full bg-slate-950 text-white text-xs p-2.5 rounded-xl border border-slate-800 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Brand</label>
                  <input
                    type="text"
                    value={newProdBrand}
                    onChange={(e) => setNewProdBrand(e.target.value)}
                    placeholder="e.g., Apple, Dell, Lenovo"
                    className="w-full bg-slate-950 text-white text-xs p-2.5 rounded-xl border border-slate-800 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
                  <select
                    value={newProdCategory}
                    onChange={(e) => setNewProdCategory(e.target.value as any)}
                    className="w-full bg-slate-950 text-white text-xs p-2.5 rounded-xl border border-slate-800 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                  >
                    <option value="smartphones">Smartphones</option>
                    <option value="laptops">Laptops</option>
                    <option value="computers">Computers</option>
                    <option value="accessories">Accessories</option>
                    <option value="refurbished">Refurbished</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Selling Price (₹)</label>
                  <input
                    type="number"
                    value={newProdPrice}
                    onChange={(e) => setNewProdPrice(Number(e.target.value))}
                    className="w-full bg-slate-950 text-white text-xs p-2.5 rounded-xl border border-slate-800 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Original Price (₹)</label>
                  <input
                    type="number"
                    value={newProdOriginalPrice}
                    onChange={(e) => setNewProdOriginalPrice(Number(e.target.value))}
                    className="w-full bg-slate-950 text-white text-xs p-2.5 rounded-xl border border-slate-800 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Condition</label>
                  <select
                    value={newProdCondition}
                    onChange={(e) => setNewProdCondition(e.target.value as any)}
                    className="w-full bg-slate-950 text-white text-xs p-2.5 rounded-xl border border-slate-800 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                  >
                    <option value="New">Brand New</option>
                    <option value="Refurbished">Refurbished (A-Grade)</option>
                    <option value="Second-Hand">Verified Second-Hand</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Stock Status</label>
                  <select
                    value={newProdStock}
                    onChange={(e) => setNewProdStock(e.target.value as any)}
                    className="w-full bg-slate-950 text-white text-xs p-2.5 rounded-xl border border-slate-800 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                  >
                    <option value="In Stock">In Stock</option>
                    <option value="Low Stock">Low Stock</option>
                    <option value="Out of Stock">Out of Stock</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl shadow transition-all"
                >
                  Add to Catalogue
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
