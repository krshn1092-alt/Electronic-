import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';
import { RecommendationEngine } from '../components/RecommendationEngine';
import { STORE_INFO } from '../data/mockData';
import { 
  Sparkles, 
  ArrowRight, 
  RotateCcw, 
  ShieldCheck, 
  Smartphone, 
  Laptop, 
  Monitor, 
  Headphones, 
  Star, 
  MapPin, 
  Phone, 
  Cpu, 
  Bot, 
  BarChart3, 
  SlidersHorizontal,
  CheckCircle2,
  Zap,
  Tag
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { products, setActivePage, setIsAiModalOpen, openAiWithPrompt, homepageConfig } = useApp();
  const [selectedFilter, setSelectedFilter] = useState<'All' | 'New' | 'Refurbished' | 'Laptops' | 'Smartphones'>('All');

  // Customer view only shows visible products
  const visibleProducts = products.filter(p => p.visible !== false);

  const filteredProducts = visibleProducts.filter(p => {
    if (selectedFilter === 'All') return true;
    if (selectedFilter === 'New') return p.condition === 'New';
    if (selectedFilter === 'Refurbished') return p.condition === 'Refurbished' || p.condition === 'Second-Hand';
    if (selectedFilter === 'Laptops') return p.category.toLowerCase() === 'laptops';
    if (selectedFilter === 'Smartphones') return p.category.toLowerCase() === 'smartphones';
    return true;
  });

  const refurbishedPicks = visibleProducts.filter(p => p.condition === 'Refurbished' || p.condition === 'Second-Hand').slice(0, 3);

  return (
    <div className="space-y-16 pb-16">
      
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-12 sm:pt-14 sm:pb-20 border-b border-slate-800/80 bg-radial-[at_top_right] from-cyan-950/30 via-slate-950 to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Next-Gen Electronics Retail with AI Assistant</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] font-display">
                {homepageConfig.heroHeadline ? (
                  <span>{homepageConfig.heroHeadline}</span>
                ) : (
                  <>
                    Smart Technology. <br />
                    <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500 bg-clip-text text-transparent">
                      Better Value.
                    </span>
                  </>
                )}
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
                {homepageConfig.heroSubheadline || "Explore brand-new flagships, custom high-performance workstations, and certified refurbished electronics with 48-point diagnostics. Guided by Chiku AI, your personal hardware advisor."}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => setActivePage('products')}
                  className="px-6 py-3.5 rounded-xl text-sm font-bold bg-gradient-to-r from-cyan-600 via-cyan-500 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-slate-950 shadow-lg shadow-cyan-500/25 transition-all flex items-center gap-2"
                >
                  <span>Explore Catalogue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setIsAiModalOpen(true)}
                  className="px-5 py-3.5 rounded-xl text-sm font-semibold bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-cyan-500/30 hover:border-cyan-500/60 transition-all flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span>Ask Chiku AI</span>
                </button>

                <button
                  onClick={() => setActivePage('refurbished')}
                  className="px-5 py-3.5 rounded-xl text-sm font-semibold bg-emerald-950/40 hover:bg-emerald-950/60 text-emerald-300 border border-emerald-500/30 transition-all flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4 text-emerald-400" />
                  <span>Refurbished (Save 40%+)</span>
                </button>
              </div>

              {/* Quick Prompt Chips */}
              <div className="pt-3">
                <span className="text-xs text-slate-400 block mb-2 font-medium">Try asking our AI Assistant:</span>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Suggest a laptop under ₹50,000',
                    'I need a phone for photography',
                    'Show refurbished laptops'
                  ].map((chip, idx) => (
                    <button
                      key={idx}
                      onClick={() => openAiWithPrompt(chip)}
                      className="text-xs px-3 py-1.5 rounded-lg bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 border border-slate-800 hover:border-cyan-500/40 transition-colors flex items-center gap-1.5"
                    >
                      <Sparkles className="w-3 h-3 text-cyan-400" />
                      {chip}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mini Trust Stats */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-800/80 max-w-lg">
                <div>
                  <div className="text-xl font-extrabold text-white font-display">48-Point</div>
                  <div className="text-xs text-slate-400">Quality Diagnostic</div>
                </div>
                <div>
                  <div className="text-xl font-extrabold text-cyan-400 font-display">12 Mo.</div>
                  <div className="text-xs text-slate-400">Store Warranty</div>
                </div>
                <div>
                  <div className="text-xl font-extrabold text-emerald-400 font-display">₹40K+</div>
                  <div className="text-xs text-slate-400">Avg. Device Savings</div>
                </div>
              </div>

            </div>

            {/* Right Hero Visual Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 p-6 shadow-2xl">
                
                {/* Floating AI Notification */}
                <div className="absolute -top-4 -left-4 bg-slate-900/95 border border-cyan-500/40 rounded-2xl p-3 shadow-xl backdrop-blur-md flex items-center gap-2.5 z-10 max-w-xs animate-in fade-in slide-in-from-top-2 duration-500">
                  <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="text-xs">
                    <span className="font-semibold text-white block">Chiku AI Recommendation</span>
                    <span className="text-[11px] text-cyan-300">Lenovo ThinkPad P14s (Refurbished)</span>
                  </div>
                </div>

                {/* Hero Featured Image */}
                <div className="aspect-4/3 w-full rounded-2xl overflow-hidden bg-slate-950 mb-5 relative border border-slate-800/80">
                  <img
                    src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80"
                    alt="Electronics Showcase"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    Tested & Certified (Grade A+)
                  </div>
                </div>

                {/* Spec Summary Details */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-cyan-400 font-bold uppercase tracking-wider">
                      Flagship Refurbished
                    </span>
                    <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded">
                      Save ₹42,000
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white">Apple iPhone 14 Pro Max 256GB</h3>
                  <div className="text-xs text-slate-400">
                    A16 Bionic • 92% Battery Health • 6-Month Chiku Store Warranty
                  </div>
                  <div className="flex items-baseline justify-between pt-2 border-t border-slate-800">
                    <div>
                      <span className="text-2xl font-extrabold text-white font-display">₹74,999</span>
                      <span className="text-xs text-slate-500 line-through ml-2">₹1,16,999</span>
                    </div>
                    <button
                      onClick={() => setActivePage('refurbished')}
                      className="text-xs text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1"
                    >
                      View Deals <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Featured Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Explore Our Product Categories
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Curated hardware with guaranteed store warranty and express Kanpur/Unnao delivery
            </p>
          </div>
          <button
            onClick={() => setActivePage('products')}
            className="text-xs text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1"
          >
            All Products <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Smartphones */}
          <div 
            onClick={() => setActivePage('smartphones')}
            className="group p-5 rounded-2xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/40 transition-all cursor-pointer shadow-lg flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Smartphone className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                Smartphones
              </h3>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                Flagship cameras, high-refresh 5G phones, and pristine second-hand devices.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-cyan-400 font-semibold">
              <span>From ₹14,999</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Laptops */}
          <div 
            onClick={() => setActivePage('laptops')}
            className="group p-5 rounded-2xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/40 transition-all cursor-pointer shadow-lg flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Laptop className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                Laptops
              </h3>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                Coding notebooks, student ultrabooks, and dedicated RTX gaming powerhouses.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-blue-400 font-semibold">
              <span>From ₹38,999</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Computers */}
          <div 
            onClick={() => setActivePage('computers')}
            className="group p-5 rounded-2xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/40 transition-all cursor-pointer shadow-lg flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Monitor className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                Computers & Displays
              </h3>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                Custom creator workstations, enterprise mini-PCs, and 4K calibrated color monitors.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-purple-400 font-semibold">
              <span>Custom Builds</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Accessories */}
          <div 
            onClick={() => setActivePage('accessories')}
            className="group p-5 rounded-2xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/40 transition-all cursor-pointer shadow-lg flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Headphones className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                Accessories & Audio
              </h3>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                100W GaN fast chargers, mechanical keyboards, active noise cancelling headphones.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-amber-400 font-semibold">
              <span>From ₹3,499</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Certified Refurbished Section */}
      {homepageConfig.showRefurbishedSection !== false && (
        <section className="bg-gradient-to-r from-emerald-950/30 via-slate-900 to-slate-950 border-y border-emerald-500/20 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto space-y-8">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 mb-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  48-Point Diagnostic Certified
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Certified Refurbished & Pre-Owned Electronics
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
                  Get premium flagship devices for up to 50% less. Every pre-owned product undergoes rigorous hardware diagnostics, battery health verification, and comes with a direct 6 to 12-month store warranty.
                </p>
              </div>
              <button
                onClick={() => setActivePage('refurbished')}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 transition-colors self-start md:self-auto shrink-0 shadow-lg shadow-emerald-500/20"
              >
                <span>View All Refurbished</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {refurbishedPicks.map(prod => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>

            {/* Refurbished Benefits Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800">
              <div className="flex items-center gap-3 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Full component inspection (Screen, Ports, Thermals)</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Minimum 85%+ verified OEM battery capacity</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>7-Day risk-free return & replacement policy</span>
              </div>
            </div>

          </div>
        </section>
      )}

      {/* Custom Sections Created by Admin / AI */}
      {homepageConfig.customSections && homepageConfig.customSections.filter(s => s.visible !== false).map(section => {
        const matchingProds = visibleProducts.filter(p => {
          if (section.productFilter?.category && p.category.toLowerCase() !== section.productFilter.category.toLowerCase()) return false;
          if (section.productFilter?.maxPrice && p.price > section.productFilter.maxPrice) return false;
          return true;
        }).slice(0, 4);

        if (matchingProds.length === 0) return null;

        return (
          <section key={section.id} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {section.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  {section.subtitle}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {matchingProds.map(prod => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          </section>
        );
      })}

      {/* 4. Products Catalogue Preview with Quick Filter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Featured Electronics Inventory
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Filter between brand-new flagships, certified refurbished bargains, and productivity powerhouses
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800 overflow-x-auto">
            {(['All', 'New', 'Refurbished', 'Laptops', 'Smartphones'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setSelectedFilter(tab)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
                  selectedFilter === tab
                    ? 'bg-cyan-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.slice(0, 8).map(prod => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => setActivePage('products')}
            className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-400 font-bold text-xs border border-cyan-500/30 hover:border-cyan-500/60 transition-all inline-flex items-center gap-2"
          >
            <span>View All {products.length} Products in Catalogue</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* 5. AI Recommendation Engine Module */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RecommendationEngine />
      </section>

      {/* 6. Agency Showcase: "More Than a Website" Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-tr from-slate-900 via-slate-900 to-cyan-950/50 border border-slate-800 p-8 sm:p-12 shadow-2xl">
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              AI Agency Demonstration Showcase
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              More Than a Website: Intelligent Retail Architecture
            </h2>
            <p className="text-sm text-slate-300 mt-3 leading-relaxed">
              CHIKU ELECTRONICS illustrates how modern AI capabilities transform standard e-commerce into an interactive, high-converting retail platform. Built specifically for high-ticket tech products where customers need technical guidance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base">Conversational Shopping</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Powered by Gemini 3.8 Flash, grounded in real inventory, pricing, condition grades, and technical specifications.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base">Recommendation Engine</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Matches customer budget and specific workloads (coding, photography, office) to top, alternative, and budget options.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <SlidersHorizontal className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base">Automated Enquiries</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Direct lead capture for bulk purchase, custom PC quotes, and refurbished alerts routed directly to the admin desk.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base">Business Intelligence</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Integrated Admin Dashboard showing real-time inventory management, enquiry pipeline, and AI customer conversation history.
              </p>
            </div>

          </div>

          <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs text-slate-400">
              Explore the store counter system & customer analytics:
            </span>
            <button
              onClick={() => setActivePage('admin')}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition-colors flex items-center gap-1.5"
            >
              <span>Open Admin Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
            </button>
          </div>
        </div>
      </section>

      {/* 7. Physical Store & Location Info Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-cyan-400 text-xs font-bold">
              <MapPin className="w-4 h-4" />
              <span>VISIT OUR PHYSICAL STORE</span>
            </div>
            <h3 className="text-xl font-bold text-white">Experience Tech Hands-On in Kanpur</h3>
            <p className="text-xs text-slate-400 max-w-lg">
              {STORE_INFO.address}, {STORE_INFO.city}, {STORE_INFO.region}. Open {STORE_INFO.openDays} from {STORE_INFO.hours}. Test refurbished laptops, cameras, and phone screens before buying.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActivePage('location')}
              className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition-colors"
            >
              Store Location & Map
            </button>
            <button
              onClick={() => setActivePage('contact')}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
            >
              Contact Retail Desk
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
