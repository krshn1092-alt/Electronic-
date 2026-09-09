import React from 'react';
import { 
  Package, 
  Eye, 
  AlertCircle, 
  MessageSquare, 
  Bot, 
  TrendingUp, 
  Plus, 
  RotateCcw, 
  ArrowRight, 
  Sparkles,
  Layers,
  LayoutTemplate,
  History
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AdminTab } from './AdminSidebar';

interface AdminDashboardTabProps {
  onNavigate: (tab: AdminTab) => void;
  onSelectPrompt: (prompt: string) => void;
}

export const AdminDashboardTab: React.FC<AdminDashboardTabProps> = ({
  onNavigate,
  onSelectPrompt
}) => {
  const { products, enquiries, aiActivities, undoAiActivity, categories } = useApp();

  const totalProducts = products.length;
  const visibleProducts = products.filter(p => p.visible !== false).length;
  const outOfStockProducts = products.filter(p => p.stockStatus === 'Out of Stock').length;
  const newEnquiries = enquiries.filter(e => e.status === 'New').length;
  const totalAiActions = aiActivities.length;

  const quickPrompts = [
    'Change iPhone 15 price to ₹42,999',
    'Find all laptops under ₹50,000',
    'Hide all out-of-stock products',
    'Add iPhone 15 for ₹45,000',
    'Create a category called Gaming Laptops',
    'Update store timings to 10:00 AM – 9:00 PM'
  ];

  return (
    <div className="space-y-6">
      
      {/* Top Banner / AI Greeting */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-950/70 via-slate-900 to-blue-950/70 border border-cyan-500/30 p-6 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-semibold border border-cyan-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Command Center Active</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight font-display">
              Welcome to CHIKU ELECTRONICS Admin Panel
            </h1>
            <p className="text-xs text-slate-300 max-w-2xl">
              Control your product catalogue, pricing, categories, and customer enquiries directly or using natural-language AI commands.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigate('ai-command')}
              className="px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-2"
            >
              <Bot className="w-4 h-4" />
              <span>Open AI Command Center</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Products */}
        <div 
          onClick={() => onNavigate('products')}
          className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-md hover:border-cyan-500/40 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-slate-400">Total Products</span>
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-white tracking-tight">{totalProducts}</div>
          <div className="mt-1 flex items-center justify-between text-[11px] text-slate-400">
            <span>{visibleProducts} visible on store</span>
            <span className="text-cyan-400 group-hover:translate-x-0.5 transition-transform">Manage →</span>
          </div>
        </div>

        {/* Stock Alert */}
        <div 
          onClick={() => onNavigate('products')}
          className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-md hover:border-amber-500/40 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-slate-400">Out of Stock</span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <AlertCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-white tracking-tight">{outOfStockProducts}</div>
          <div className="mt-1 flex items-center justify-between text-[11px] text-slate-400">
            <span>Requires restocking</span>
            <span className="text-amber-400 group-hover:translate-x-0.5 transition-transform">Filter →</span>
          </div>
        </div>

        {/* Enquiries */}
        <div 
          onClick={() => onNavigate('enquiries')}
          className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-md hover:border-emerald-500/40 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-slate-400">Customer Leads</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <MessageSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-white tracking-tight">{enquiries.length}</div>
          <div className="mt-1 flex items-center justify-between text-[11px] text-slate-400">
            <span className="text-emerald-400 font-semibold">{newEnquiries} new pending</span>
            <span className="text-emerald-400 group-hover:translate-x-0.5 transition-transform">View →</span>
          </div>
        </div>

        {/* AI Actions Logged */}
        <div 
          onClick={() => onNavigate('activity')}
          className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-md hover:border-purple-500/40 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-slate-400">AI Actions Executed</span>
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center">
              <Bot className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-white tracking-tight">{totalAiActions}</div>
          <div className="mt-1 flex items-center justify-between text-[11px] text-slate-400">
            <span>Audit trail preserved</span>
            <span className="text-purple-400 group-hover:translate-x-0.5 transition-transform">History →</span>
          </div>
        </div>
      </div>

      {/* Suggested Quick AI Prompts */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bot className="w-4 h-4 text-cyan-400" />
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Quick AI Command Shortcuts
            </h3>
          </div>
          <span className="text-[11px] text-slate-400">Click any command to test</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => onSelectPrompt(prompt)}
              className="text-xs text-slate-300 bg-slate-950 hover:bg-cyan-950/40 hover:text-cyan-300 border border-slate-800 hover:border-cyan-500/40 px-3 py-1.5 rounded-lg transition-all text-left flex items-center gap-1.5"
            >
              <Sparkles className="w-3 h-3 text-cyan-400 shrink-0" />
              <span>"{prompt}"</span>
            </button>
          ))}
        </div>
      </div>

      {/* Grid: Recent AI Activity & Quick Shortcuts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent AI Activities */}
        <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <History className="w-4 h-4 text-cyan-400" />
              <h3 className="text-sm font-bold text-white">Recent AI Operations</h3>
            </div>
            <button
              onClick={() => onNavigate('activity')}
              className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold"
            >
              View All History →
            </button>
          </div>

          <div className="space-y-2.5">
            {aiActivities.slice(0, 5).map((act) => (
              <div 
                key={act.id} 
                className="flex items-start justify-between gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition-colors"
              >
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-slate-200 truncate">
                      "{act.command}"
                    </span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      act.status === 'Success' 
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                        : act.status === 'Undone'
                        ? 'bg-slate-800 text-slate-400'
                        : 'bg-amber-500/10 text-amber-400'
                    }`}>
                      {act.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    {act.result}
                  </p>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {act.timestamp}
                  </span>
                </div>

                {act.reversible && act.status === 'Success' && (
                  <button
                    onClick={() => undoAiActivity(act.id)}
                    className="shrink-0 flex items-center gap-1 text-[11px] font-semibold text-cyan-400 hover:text-cyan-300 bg-cyan-950/30 hover:bg-cyan-900/50 border border-cyan-500/30 px-2.5 py-1 rounded-lg transition-all"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Undo</span>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions Panel */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
          <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-3">
            Quick Actions
          </h3>

          <div className="space-y-2">
            <button
              onClick={() => onNavigate('products')}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800 text-left transition-all group"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
                  <Plus className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Add New Product</div>
                  <div className="text-[10px] text-slate-400">Expand store inventory</div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all" />
            </button>

            <button
              onClick={() => onNavigate('categories')}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800 text-left transition-all group"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Manage Categories</div>
                  <div className="text-[10px] text-slate-400">{categories.length} store categories</div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all" />
            </button>

            <button
              onClick={() => onNavigate('homepage')}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800 text-left transition-all group"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                  <LayoutTemplate className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Customize Homepage</div>
                  <div className="text-[10px] text-slate-400">Headlines, banners & sections</div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
