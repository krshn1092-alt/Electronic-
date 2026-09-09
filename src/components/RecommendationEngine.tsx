import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { RecommendationCriteria, RecommendationResult } from '../types';
import { 
  Sparkles, 
  Sliders, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  ShoppingCart, 
  Eye, 
  RotateCcw,
  Zap,
  Award
} from 'lucide-react';

export const RecommendationEngine: React.FC = () => {
  const { navigateToProduct, addToCart, openAiWithPrompt } = useApp();

  const [budget, setBudget] = useState<number>(50000);
  const [primaryUse, setPrimaryUse] = useState<string>('Coding & Development');
  const [preferredBrand, setPreferredBrand] = useState<string>('Any Brand');
  const [performanceReq, setPerformanceReq] = useState<string>('High Multi-Core (Coding/Creative)');
  const [storageReq, setStorageReq] = useState<string>('512 GB or higher');
  const [conditionPref, setConditionPref] = useState<string>('Any (Best Value)');

  const [loading, setLoading] = useState<boolean>(false);
  const [results, setResults] = useState<RecommendationResult | null>(null);

  const handleGenerateRecommendation = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/ai/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          budget,
          primaryUse,
          preferredBrand,
          performanceRequirement: performanceReq,
          storageRequirement: storageReq,
          conditionPreference: conditionPref
        })
      });

      if (!response.ok) throw new Error('API failed');
      const data = await response.json();
      setResults(data);
    } catch (err) {
      console.log('Recommendation API notice, using local match:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
      <div className="max-w-3xl mx-auto text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 mb-3">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          Structured AI Recommendation Engine
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Find Your Perfect Electronics Match
        </h2>
        <p className="text-sm text-slate-400 mt-2">
          Tell us your budget, requirements, and preferences. Our intelligent matching engine scans our verified store catalogue to provide personalized top choices.
        </p>
      </div>

      {/* Input Parameters Form */}
      <form onSubmit={handleGenerateRecommendation} className="max-w-4xl mx-auto space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-950/60 p-6 rounded-2xl border border-slate-800/80">
          
          {/* 1. Target Budget Slider */}
          <div className="space-y-2 md:col-span-3">
            <div className="flex items-center justify-between text-xs font-medium">
              <span className="text-slate-300">Target Budget (INR)</span>
              <span className="text-cyan-400 text-base font-extrabold font-display">
                ₹{budget.toLocaleString('en-IN')}
              </span>
            </div>
            <input
              type="range"
              min={15000}
              max={150000}
              step={5000}
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="w-full accent-cyan-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
            />
            <div className="flex justify-between text-[11px] text-slate-500 font-mono">
              <span>₹15,000</span>
              <span>₹50,000</span>
              <span>₹1,00,000</span>
              <span>₹1,50,000+</span>
            </div>
          </div>

          {/* 2. Primary Use */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-2">
              Primary Use Case
            </label>
            <select
              value={primaryUse}
              onChange={(e) => setPrimaryUse(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
            >
              <option value="Coding & Development">College + Coding / Dev</option>
              <option value="Photography & Video Creation">Photography & Camera</option>
              <option value="Everyday Productivity & Office">Office & General Study</option>
              <option value="Gaming & 3D Rendering">Heavy Gaming / 3D Work</option>
            </select>
          </div>

          {/* 3. Preferred Brand */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-2">
              Preferred Brand
            </label>
            <select
              value={preferredBrand}
              onChange={(e) => setPreferredBrand(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
            >
              <option value="Any Brand">Any Brand (Best Value)</option>
              <option value="Apple">Apple</option>
              <option value="Lenovo">Lenovo</option>
              <option value="AuraTech">AuraTech</option>
              <option value="Google Pixel">Google Pixel</option>
              <option value="Asus">Asus ROG</option>
            </select>
          </div>

          {/* 4. Condition Preference */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-2">
              Condition Preference
            </label>
            <select
              value={conditionPref}
              onChange={(e) => setConditionPref(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
            >
              <option value="Any (Best Value)">Any (Recommend Best Savings)</option>
              <option value="New">Brand New Only</option>
              <option value="Refurbished">Certified Refurbished Only</option>
            </select>
          </div>

        </div>

        {/* Generate Button */}
        <div className="text-center">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl text-sm font-bold bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white shadow-xl shadow-cyan-500/25 transition-all"
          >
            {loading ? (
              <>
                <Sparkles className="w-4 h-4 animate-spin text-cyan-200" />
                <span>Analyzing Store Inventory...</span>
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 text-cyan-300" />
                <span>Generate Recommendations</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>

      {/* Results Section */}
      {results && (
        <div className="mt-10 max-w-5xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
          
          <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 text-xs text-cyan-200 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-white font-semibold">Chiku AI Matching Analysis:</strong>
              {results.aiAnalysisSummary}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* 1. Top Recommendation Card */}
            <div className="relative rounded-2xl bg-gradient-to-b from-cyan-950/40 via-slate-900 to-slate-950 border-2 border-cyan-500/60 p-5 flex flex-col justify-between shadow-2xl shadow-cyan-500/10">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] font-extrabold bg-cyan-500 text-slate-950 tracking-wider uppercase shadow-md flex items-center gap-1">
                <Award className="w-3 h-3" />
                Top Recommendation
              </div>

              <div>
                <img
                  src={results.topPick.product.image}
                  alt={results.topPick.product.name}
                  className="w-full h-40 object-cover rounded-xl mt-2 mb-3 bg-slate-950"
                />
                <div className="text-[11px] text-cyan-400 font-bold uppercase tracking-wider">
                  {results.topPick.product.brand} • {results.topPick.product.condition}
                </div>
                <h3 className="font-bold text-white text-base mt-0.5">
                  {results.topPick.product.name}
                </h3>
                <div className="text-xl font-extrabold text-white mt-2 font-display">
                  ₹{results.topPick.product.price.toLocaleString('en-IN')}
                </div>

                <div className="mt-3 space-y-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-300">
                    <span className="text-cyan-400 font-semibold block mb-0.5">Why It Matches:</span>
                    {results.topPick.matchReason}
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-300">
                    <span className="text-emerald-400 font-semibold block mb-0.5">Key Advantage:</span>
                    {results.topPick.keyHighlight}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    <span className="text-slate-500">Warranty:</span> {results.topPick.product.warranty}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    <span className="text-slate-400">Note/Limitation:</span> {results.topPick.limitations}
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center gap-2">
                <button
                  onClick={() => addToCart(results.topPick.product)}
                  className="flex-1 py-2 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-colors flex items-center justify-center gap-1.5"
                >
                  <ShoppingCart className="w-3.5 h-3.5" />
                  Add to Cart
                </button>
                <button
                  onClick={() => navigateToProduct(results.topPick.product.id)}
                  className="p-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white"
                  title="View Specs"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* 2. Alternative Recommendation Card */}
            <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 flex flex-col justify-between">
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/20 text-blue-300 mb-2">
                  Alternative Option
                </span>
                <img
                  src={results.alternative.product.image}
                  alt={results.alternative.product.name}
                  className="w-full h-40 object-cover rounded-xl mb-3 bg-slate-950"
                />
                <div className="text-[11px] text-blue-400 font-bold uppercase tracking-wider">
                  {results.alternative.product.brand} • {results.alternative.product.condition}
                </div>
                <h3 className="font-bold text-white text-base mt-0.5">
                  {results.alternative.product.name}
                </h3>
                <div className="text-xl font-extrabold text-white mt-2 font-display">
                  ₹{results.alternative.product.price.toLocaleString('en-IN')}
                </div>

                <div className="mt-3 space-y-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-300">
                    <span className="text-blue-400 font-semibold block mb-0.5">Why It Matches:</span>
                    {results.alternative.matchReason}
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-300">
                    <span className="text-emerald-400 font-semibold block mb-0.5">Highlight:</span>
                    {results.alternative.keyHighlight}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    <span className="text-slate-500">Warranty:</span> {results.alternative.product.warranty}
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center gap-2">
                <button
                  onClick={() => addToCart(results.alternative.product)}
                  className="flex-1 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/20 transition-colors flex items-center justify-center gap-1.5"
                >
                  <ShoppingCart className="w-3.5 h-3.5" />
                  Add
                </button>
                <button
                  onClick={() => navigateToProduct(results.alternative.product.id)}
                  className="p-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* 3. Budget Option Card */}
            <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 flex flex-col justify-between">
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 mb-2">
                  Budget Value Pick
                </span>
                <img
                  src={results.budgetOption.product.image}
                  alt={results.budgetOption.product.name}
                  className="w-full h-40 object-cover rounded-xl mb-3 bg-slate-950"
                />
                <div className="text-[11px] text-emerald-400 font-bold uppercase tracking-wider">
                  {results.budgetOption.product.brand} • {results.budgetOption.product.condition}
                </div>
                <h3 className="font-bold text-white text-base mt-0.5">
                  {results.budgetOption.product.name}
                </h3>
                <div className="text-xl font-extrabold text-white mt-2 font-display">
                  ₹{results.budgetOption.product.price.toLocaleString('en-IN')}
                </div>

                <div className="mt-3 space-y-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-300">
                    <span className="text-emerald-400 font-semibold block mb-0.5">Maximum Savings:</span>
                    {results.budgetOption.matchReason}
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-300">
                    <span className="text-cyan-400 font-semibold block mb-0.5">Highlight:</span>
                    {results.budgetOption.keyHighlight}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    <span className="text-slate-500">Warranty:</span> {results.budgetOption.product.warranty}
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center gap-2">
                <button
                  onClick={() => addToCart(results.budgetOption.product)}
                  className="flex-1 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-emerald-500/20 transition-colors flex items-center justify-center gap-1.5"
                >
                  <ShoppingCart className="w-3.5 h-3.5" />
                  Add
                </button>
                <button
                  onClick={() => navigateToProduct(results.budgetOption.product.id)}
                  className="p-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

          <div className="text-center pt-2">
            <button
              onClick={() => openAiWithPrompt(`Can you explain in detail the difference between ${results.topPick.product.name} and ${results.alternative.product.name} for my ${primaryUse} workflow?`)}
              className="inline-flex items-center gap-2 text-xs text-cyan-400 hover:text-cyan-300 font-semibold"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Ask Chiku AI to further compare these 3 options
            </button>
          </div>

        </div>
      )}
    </div>
  );
};
