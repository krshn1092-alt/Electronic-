import React, { useState } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  RotateCcw, 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle, 
  Package, 
  Tag, 
  Eye, 
  Clock, 
  Trash2,
  SlidersHorizontal,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AdminCommandResult, PendingConfirmation, Product } from '../../types';

interface AdminAiCommandCenterProps {
  initialCommand?: string;
  onRequestConfirmation: (pending: PendingConfirmation) => void;
}

export const AdminAiCommandCenter: React.FC<AdminAiCommandCenterProps> = ({
  initialCommand = '',
  onRequestConfirmation
}) => {
  const { runAdminAiCommand, undoAiActivity, showToast } = useApp();
  const [command, setCommand] = useState(initialCommand);
  const [loading, setLoading] = useState(false);
  const [lastResult, setLastResult] = useState<AdminCommandResult | null>(null);

  const suggestedCommands = [
    { label: 'Add iPhone 15 for ₹45,000', cat: 'Inventory' },
    { label: 'Change iPhone 15 price to ₹42,999', cat: 'Pricing' },
    { label: 'Find all laptops under ₹50,000', cat: 'Search' },
    { label: 'Create a category called Gaming Laptops', cat: 'Category' },
    { label: 'Hide all out-of-stock products', cat: 'Visibility' },
    { label: 'Create a homepage section called Best Laptops Under ₹50,000', cat: 'Homepage' },
    { label: 'Update store timings to 10:00 AM – 9:00 PM', cat: 'Settings' },
    { label: 'Hide the refurbished section', cat: 'Homepage' },
    { label: 'Show the refurbished section', cat: 'Homepage' },
    { label: 'Delete iPhone 15', cat: 'Destructive' },
  ];

  const handleExecute = async (cmdText?: string) => {
    const textToRun = cmdText || command;
    if (!textToRun.trim()) return;

    setLoading(true);
    setLastResult(null);

    try {
      const res = await runAdminAiCommand(textToRun);
      
      if (res.requiresConfirmation && res.confirmationDetails) {
        onRequestConfirmation(res.confirmationDetails);
        setLastResult(res);
      } else {
        setLastResult(res);
      }
    } catch (e: any) {
      setLastResult({
        action: 'searchProducts',
        success: false,
        message: 'Could not complete AI command. Please check system connection.'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUndo = (activityId: string) => {
    const ok = undoAiActivity(activityId);
    if (ok && lastResult) {
      setLastResult({
        ...lastResult,
        canUndo: false,
        message: `${lastResult.message} [Reversed successfully]`
      });
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-600 p-0.5 shadow-lg shadow-cyan-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center text-cyan-400">
              <Bot className="w-5 h-5" />
            </div>
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight font-display">
              AI Website Manager
            </h1>
            <p className="text-xs text-slate-400">
              Manage your website using natural-language commands.
            </p>
          </div>
        </div>
      </div>

      {/* Main Input Box */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            handleExecute();
          }} 
          className="space-y-3"
        >
          <div className="relative">
            <textarea
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              placeholder="Tell AI what you want to change... (e.g., 'Change iPhone 15 price to ₹42,999' or 'Hide all out-of-stock products')"
              rows={3}
              className="w-full bg-slate-950 text-white placeholder-slate-500 text-sm p-4 rounded-xl border border-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/60 resize-none transition-all shadow-inner"
            />
            <div className="absolute right-3 bottom-3 flex items-center gap-2">
              <button
                type="submit"
                disabled={loading || !command.trim()}
                className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs rounded-lg shadow-md shadow-cyan-500/20 transition-all flex items-center gap-1.5 disabled:opacity-40"
              >
                {loading ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span>Execute Command</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </div>
        </form>

        {/* Suggested Prompts Grid */}
        <div className="space-y-2 pt-2 border-t border-slate-800/80">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold uppercase tracking-wider text-[10px] text-cyan-400">
              Preset Quick Commands
            </span>
            <span className="text-[11px]">Click to load & execute</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {suggestedCommands.map((item, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  setCommand(item.label);
                  handleExecute(item.label);
                }}
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 hover:bg-cyan-950/30 border border-slate-800/80 hover:border-cyan-500/40 text-left transition-all group"
              >
                <span className="text-xs text-slate-300 group-hover:text-cyan-300 truncate mr-2">
                  "{item.label}"
                </span>
                <span className="text-[10px] font-semibold text-slate-400 group-hover:text-cyan-400 shrink-0">
                  Run →
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Result Display Card */}
      {lastResult && (
        <div className={`p-5 rounded-2xl border shadow-xl animate-fade-in ${
          lastResult.success 
            ? 'bg-slate-900/90 border-cyan-500/40' 
            : lastResult.requiresConfirmation
            ? 'bg-slate-900/90 border-amber-500/40'
            : 'bg-slate-900/90 border-rose-500/40'
        }`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                lastResult.success 
                  ? 'bg-emerald-500/10 text-emerald-400' 
                  : lastResult.requiresConfirmation
                  ? 'bg-amber-500/10 text-amber-400'
                  : 'bg-rose-500/10 text-rose-400'
              }`}>
                {lastResult.success ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : lastResult.requiresConfirmation ? (
                  <AlertCircle className="w-5 h-5" />
                ) : (
                  <AlertCircle className="w-5 h-5" />
                )}
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">
                  {lastResult.success ? 'Action Executed' : lastResult.requiresConfirmation ? 'Confirmation Requested' : 'Command Failed'}
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  {lastResult.message}
                </p>
              </div>
            </div>

            {/* Undo button if reversible */}
            {lastResult.canUndo && lastResult.activityId && (
              <button
                type="button"
                onClick={() => handleUndo(lastResult.activityId!)}
                className="self-start sm:self-center flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-950/40 hover:bg-cyan-900/60 text-cyan-300 border border-cyan-500/30 text-xs font-bold transition-all shrink-0"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Undo This Action</span>
              </button>
            )}
          </div>

          {/* If search results returned */}
          {lastResult.searchResults && lastResult.searchResults.length > 0 && (
            <div className="mt-4 pt-4 border-t border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  Matching Products ({lastResult.searchResults.length})
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {lastResult.searchResults.map((prod: Product) => (
                  <div 
                    key={prod.id} 
                    className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center gap-3"
                  >
                    <img 
                      src={prod.image} 
                      alt={prod.name} 
                      className="w-12 h-12 rounded-lg object-cover bg-slate-900 shrink-0" 
                      referrerPolicy="no-referrer"
                    />
                    <div className="min-w-0 flex-1">
                      <h4 className="text-xs font-bold text-white truncate">{prod.name}</h4>
                      <p className="text-xs font-extrabold text-cyan-400">₹{prod.price.toLocaleString('en-IN')}</p>
                      <div className="flex items-center gap-1 text-[10px] text-slate-400">
                        <span>{prod.condition}</span>
                        <span>•</span>
                        <span className={prod.stockStatus === 'In Stock' ? 'text-emerald-400' : 'text-amber-400'}>
                          {prod.stockStatus}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Safety & Action Engine Information Note */}
      <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs text-slate-400 space-y-1">
        <div className="font-semibold text-slate-300 flex items-center gap-1.5">
          <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
          <span>About Safe AI Action Execution</span>
        </div>
        <p className="text-[11px] leading-relaxed">
          The AI command engine translates natural language into structured, safe system actions. Destructive operations (such as permanently deleting a product or category) require explicit admin confirmation. Reversible actions (like price adjustments or visibility changes) can be immediately reversed with 1-click Undo.
        </p>
      </div>

    </div>
  );
};
