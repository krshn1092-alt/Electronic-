import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Product } from '../types';
import { 
  X, 
  SlidersHorizontal, 
  Sparkles, 
  Trash2, 
  Check, 
  ShoppingCart, 
  ShieldCheck, 
  Star,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export const ComparisonDrawer: React.FC = () => {
  const { 
    comparisonIds, 
    products, 
    removeFromComparison, 
    clearComparison, 
    addToCart, 
    navigateToProduct,
    openAiWithPrompt
  } = useApp();

  const [isModalOpen, setIsModalOpen] = useState(false);

  if (comparisonIds.length === 0) return null;

  const comparedProducts = products.filter(p => comparisonIds.includes(p.id));

  const handleAskAiToCompare = () => {
    const names = comparedProducts.map(p => `${p.name} (₹${p.price.toLocaleString('en-IN')})`).join(' vs ');
    openAiWithPrompt(`Please provide a comprehensive side-by-side comparison between: ${names}. Which one offers the best value for coding, photography, battery life, and durability?`);
    setIsModalOpen(false);
  };

  return (
    <>
      {/* Floating Bottom Bar */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-2xl bg-slate-900/95 border border-cyan-500/40 rounded-2xl shadow-2xl p-3 backdrop-blur-md flex items-center justify-between gap-3 animate-in slide-in-from-bottom-5 duration-300">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="hidden sm:flex items-center justify-center w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-400 shrink-0">
            <SlidersHorizontal className="w-4 h-4" />
          </div>
          
          <div className="flex items-center gap-2 overflow-x-auto py-1">
            {comparedProducts.map(prod => (
              <div 
                key={prod.id} 
                className="flex items-center gap-1.5 bg-slate-950 px-2 py-1 rounded-lg border border-slate-800 text-xs shrink-0"
              >
                <img src={prod.image} alt={prod.name} className="w-6 h-6 rounded object-cover" />
                <span className="text-white truncate max-w-[90px] sm:max-w-[120px] font-medium">{prod.name}</span>
                <button
                  onClick={() => removeFromComparison(prod.id)}
                  className="text-slate-500 hover:text-rose-400 p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
            {comparedProducts.length < 3 && (
              <span className="text-[11px] text-slate-400 italic hidden md:inline">
                + Select up to {3 - comparedProducts.length} more
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={clearComparison}
            className="text-xs text-slate-400 hover:text-white px-2 py-1 rounded"
          >
            Clear
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors shadow-md shadow-cyan-500/20"
          >
            <span>Compare ({comparedProducts.length})</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Comparison Full Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-sm">
          <div className="w-full max-w-5xl max-h-[90vh] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
              <div className="flex items-center gap-2.5">
                <SlidersHorizontal className="w-5 h-5 text-cyan-400" />
                <div>
                  <h3 className="font-bold text-white text-base">Product Specification Comparison</h3>
                  <p className="text-xs text-slate-400">
                    Side-by-side technical evaluation across {comparedProducts.length} items
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleAskAiToCompare}
                  className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-cyan-500/20"
                >
                  <Sparkles className="w-3.5 h-3.5 text-cyan-200" />
                  <span>Ask Chiku AI to Compare</span>
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Comparison Table */}
            <div className="flex-1 overflow-x-auto overflow-y-auto p-6">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-800">
                    <th className="p-3 text-slate-400 font-semibold w-36 sm:w-44">Attribute</th>
                    {comparedProducts.map(prod => (
                      <th key={prod.id} className="p-3 text-left w-64 min-w-[200px]">
                        <div className="relative group">
                          <img
                            src={prod.image}
                            alt={prod.name}
                            className="w-full h-32 object-cover rounded-xl mb-2 bg-slate-950 border border-slate-800"
                          />
                          <button
                            onClick={() => removeFromComparison(prod.id)}
                            className="absolute top-1 right-1 p-1 rounded-full bg-slate-950/80 text-slate-400 hover:text-rose-400"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                          <div className="font-bold text-white text-sm line-clamp-1">{prod.name}</div>
                          <div className="text-cyan-400 font-bold text-sm mt-1">₹{prod.price.toLocaleString('en-IN')}</div>
                          <div className="flex items-center gap-2 mt-2">
                            <button
                              onClick={() => {
                                addToCart(prod);
                              }}
                              className="px-2.5 py-1 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-semibold flex items-center gap-1"
                            >
                              <ShoppingCart className="w-3 h-3" /> Add
                            </button>
                            <button
                              onClick={() => {
                                setIsModalOpen(false);
                                navigateToProduct(prod.id);
                              }}
                              className="px-2 py-1 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
                            >
                              View
                            </button>
                          </div>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  <tr>
                    <td className="p-3 font-semibold text-slate-400 bg-slate-950/40">Condition</td>
                    {comparedProducts.map(p => (
                      <td key={p.id} className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                          p.condition === 'Refurbished' ? 'bg-emerald-500/20 text-emerald-300' :
                          p.condition === 'Second-Hand' ? 'bg-amber-500/20 text-amber-300' : 'bg-cyan-500/20 text-cyan-300'
                        }`}>
                          {p.condition}
                        </span>
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="p-3 font-semibold text-slate-400 bg-slate-950/40">Processor (CPU)</td>
                    {comparedProducts.map(p => (
                      <td key={p.id} className="p-3 font-medium">{p.keySpecs.processor || 'N/A'}</td>
                    ))}
                  </tr>

                  <tr>
                    <td className="p-3 font-semibold text-slate-400 bg-slate-950/40">RAM</td>
                    {comparedProducts.map(p => (
                      <td key={p.id} className="p-3 font-medium">{p.keySpecs.ram || 'N/A'}</td>
                    ))}
                  </tr>

                  <tr>
                    <td className="p-3 font-semibold text-slate-400 bg-slate-950/40">Storage</td>
                    {comparedProducts.map(p => (
                      <td key={p.id} className="p-3 font-medium">{p.keySpecs.storage || 'N/A'}</td>
                    ))}
                  </tr>

                  <tr>
                    <td className="p-3 font-semibold text-slate-400 bg-slate-950/40">Display</td>
                    {comparedProducts.map(p => (
                      <td key={p.id} className="p-3">{p.keySpecs.display || 'N/A'}</td>
                    ))}
                  </tr>

                  <tr>
                    <td className="p-3 font-semibold text-slate-400 bg-slate-950/40">Battery</td>
                    {comparedProducts.map(p => (
                      <td key={p.id} className="p-3">
                        <div>{p.keySpecs.battery || 'N/A'}</div>
                        {p.refurbishedDetails?.batteryHealth && (
                          <div className="text-[10px] text-emerald-400 font-bold mt-0.5">
                            Battery Health: {p.refurbishedDetails.batteryHealth}%
                          </div>
                        )}
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="p-3 font-semibold text-slate-400 bg-slate-950/40">Warranty</td>
                    {comparedProducts.map(p => (
                      <td key={p.id} className="p-3 text-cyan-400 font-medium">{p.warranty}</td>
                    ))}
                  </tr>

                  <tr>
                    <td className="p-3 font-semibold text-slate-400 bg-slate-950/40">Rating & Reviews</td>
                    {comparedProducts.map(p => (
                      <td key={p.id} className="p-3">
                        <div className="flex items-center gap-1 text-amber-400 font-bold">
                          <Star className="w-3.5 h-3.5 fill-amber-400" />
                          <span>{p.rating} / 5.0</span>
                          <span className="text-slate-500 font-normal">({p.reviewCount})</span>
                        </div>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">
                Want deeper benchmark insights or battery comparisons?
              </span>
              <button
                onClick={handleAskAiToCompare}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-md"
              >
                <Sparkles className="w-3.5 h-3.5 text-cyan-200" />
                Ask Chiku AI to Compare
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
