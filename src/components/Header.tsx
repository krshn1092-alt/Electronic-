import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sparkles, 
  ShoppingCart, 
  Heart, 
  Search, 
  Menu, 
  X, 
  Cpu, 
  ChevronDown, 
  SlidersHorizontal,
  LayoutDashboard,
  MapPin,
  HelpCircle,
  Laptop,
  Smartphone,
  Monitor,
  Headphones,
  RotateCcw,
  CheckCircle2
} from 'lucide-react';

export const Header: React.FC = () => {
  const { 
    activePage, 
    setActivePage, 
    cartCount, 
    setIsCartDrawerOpen, 
    setIsAiModalOpen,
    wishlist,
    comparisonIds
  } = useApp();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  const handleNav = (page: string) => {
    setActivePage(page);
    setIsMobileMenuOpen(false);
    setIsCategoryDropdownOpen(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setActivePage(`products?q=${encodeURIComponent(searchInput.trim())}`);
      setSearchOpen(false);
      setSearchInput('');
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md">
      {/* Top Demo Notification Bar */}
      <div className="bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 border-b border-cyan-500/20 px-4 py-1.5 text-xs text-slate-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              AI Agency Demo
            </span>
            <span className="hidden sm:inline text-slate-400">
              Chiku Electronics Demo Store • Certified Refurbished & AI Shopping Assistant
            </span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span className="flex items-center gap-1 text-slate-300">
              <MapPin className="w-3 h-3 text-cyan-400" /> Kanpur / Unnao Store: 10AM – 8PM
            </span>
            <button 
              onClick={() => handleNav('admin')} 
              className="text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1.5 transition-colors bg-cyan-950/40 hover:bg-cyan-900/50 px-2.5 py-1 rounded-md border border-cyan-500/30 text-xs shadow-sm"
            >
              <LayoutDashboard className="w-3 h-3" /> Admin Panel
            </button>
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-6">
            <button 
              onClick={() => handleNav('home')} 
              className="flex items-center gap-3 text-left group focus:outline-none"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 via-cyan-500 to-blue-600 p-0.5 shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-shadow">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Cpu className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-lg tracking-wider text-white font-display">
                    CHIKU
                  </span>
                  <span className="font-medium text-xs tracking-widest text-cyan-400 bg-cyan-950/60 px-1.5 py-0.5 rounded border border-cyan-500/30">
                    ELECTRONICS
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 font-medium tracking-wide">
                  Smart Technology. Better Value.
                </p>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 text-sm font-medium">
              <button
                onClick={() => handleNav('home')}
                className={`px-3 py-2 rounded-lg transition-colors ${
                  activePage === 'home' 
                    ? 'text-cyan-400 bg-slate-900/90 font-semibold' 
                    : 'text-slate-300 hover:text-white hover:bg-slate-900/50'
                }`}
              >
                Home
              </button>

              <button
                onClick={() => handleNav('products')}
                className={`px-3 py-2 rounded-lg transition-colors ${
                  activePage === 'products' 
                    ? 'text-cyan-400 bg-slate-900/90 font-semibold' 
                    : 'text-slate-300 hover:text-white hover:bg-slate-900/50'
                }`}
              >
                All Products
              </button>

              {/* Categories Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                  onBlur={() => setTimeout(() => setIsCategoryDropdownOpen(false), 200)}
                  className="flex items-center gap-1 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-900/50 transition-colors"
                >
                  <span>Categories</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${isCategoryDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {isCategoryDropdownOpen && (
                  <div className="absolute left-0 mt-2 w-56 rounded-xl bg-slate-900/95 border border-slate-800 shadow-2xl p-2 z-50 backdrop-blur-xl">
                    <button
                      onClick={() => handleNav('smartphones')}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-slate-200 hover:bg-slate-800/80 hover:text-cyan-400 rounded-lg transition-colors text-left"
                    >
                      <Smartphone className="w-4 h-4 text-cyan-400" />
                      <div>
                        <div className="font-medium">Smartphones</div>
                        <div className="text-[11px] text-slate-400">Flagships & budget 5G</div>
                      </div>
                    </button>
                    <button
                      onClick={() => handleNav('laptops')}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-slate-200 hover:bg-slate-800/80 hover:text-cyan-400 rounded-lg transition-colors text-left"
                    >
                      <Laptop className="w-4 h-4 text-cyan-400" />
                      <div>
                        <div className="font-medium">Laptops</div>
                        <div className="text-[11px] text-slate-400">Coding, thin & light, gaming</div>
                      </div>
                    </button>
                    <button
                      onClick={() => handleNav('computers')}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-slate-200 hover:bg-slate-800/80 hover:text-cyan-400 rounded-lg transition-colors text-left"
                    >
                      <Monitor className="w-4 h-4 text-cyan-400" />
                      <div>
                        <div className="font-medium">Computers & Monitors</div>
                        <div className="text-[11px] text-slate-400">Workstations & 4K displays</div>
                      </div>
                    </button>
                    <button
                      onClick={() => handleNav('accessories')}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-slate-200 hover:bg-slate-800/80 hover:text-cyan-400 rounded-lg transition-colors text-left"
                    >
                      <Headphones className="w-4 h-4 text-cyan-400" />
                      <div>
                        <div className="font-medium">Accessories</div>
                        <div className="text-[11px] text-slate-400">GaN hubs, ANC audio, keyboards</div>
                      </div>
                    </button>
                  </div>
                )}
              </div>

              <button
                onClick={() => handleNav('refurbished')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors ${
                  activePage === 'refurbished' 
                    ? 'text-emerald-400 bg-emerald-950/30 border border-emerald-500/30 font-semibold' 
                    : 'text-emerald-400/90 hover:text-emerald-300 hover:bg-emerald-950/20'
                }`}
              >
                <RotateCcw className="w-3.5 h-3.5 text-emerald-400" />
                <span>Refurbished</span>
                <span className="text-[10px] uppercase tracking-wider bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded font-bold">
                  Save 40%+
                </span>
              </button>

              <button
                onClick={() => handleNav('about')}
                className={`px-3 py-2 rounded-lg transition-colors ${
                  activePage === 'about' ? 'text-cyan-400 bg-slate-900/90 font-semibold' : 'text-slate-300 hover:text-white hover:bg-slate-900/50'
                }`}
              >
                About
              </button>

              <button
                onClick={() => handleNav('contact')}
                className={`px-3 py-2 rounded-lg transition-colors ${
                  activePage === 'contact' ? 'text-cyan-400 bg-slate-900/90 font-semibold' : 'text-slate-300 hover:text-white hover:bg-slate-900/50'
                }`}
              >
                Contact
              </button>
            </nav>
          </div>

          {/* Right Action Icons & AI Button */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* AI Assistant Quick Trigger Button */}
            <button
              onClick={() => setIsAiModalOpen(true)}
              className="relative group inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 shadow-md shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-200"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-200 animate-pulse" />
              <span className="hidden sm:inline">Ask</span>
              <span>Chiku AI</span>
            </button>

            {/* Search Toggle */}
            <div className="relative">
              {searchOpen ? (
                <form onSubmit={handleSearchSubmit} className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center z-50">
                  <div className="relative flex items-center">
                    <input
                      type="text"
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      placeholder="Search phones, laptops..."
                      autoFocus
                      className="w-56 sm:w-72 bg-slate-900 text-slate-100 placeholder-slate-400 text-xs px-3 py-2 pl-8 rounded-xl border border-cyan-500/40 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 shadow-xl"
                    />
                    <Search className="w-4 h-4 text-cyan-400 absolute left-2.5" />
                    <button
                      type="button"
                      onClick={() => setSearchOpen(false)}
                      className="absolute right-2 text-slate-400 hover:text-white"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </form>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="p-2 text-slate-400 hover:text-white hover:bg-slate-900 rounded-lg transition-colors"
                  aria-label="Search products"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Comparison Shortcut */}
            {comparisonIds.length > 0 && (
              <button
                onClick={() => handleNav('comparison')}
                className="relative p-2 text-cyan-400 hover:text-cyan-300 hover:bg-slate-900 rounded-lg transition-colors"
                title="View Product Comparison"
              >
                <SlidersHorizontal className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-cyan-500 text-slate-950 font-bold text-[10px] rounded-full flex items-center justify-center">
                  {comparisonIds.length}
                </span>
              </button>
            )}

            {/* Wishlist Button */}
            <button
              onClick={() => handleNav('products')}
              className="relative p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-900 rounded-lg transition-colors"
              aria-label="Wishlist"
              title={`Wishlist (${wishlist.length})`}
            >
              <Heart className={`w-5 h-5 ${wishlist.length > 0 ? 'text-rose-400 fill-rose-400/20' : ''}`} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white font-bold text-[10px] rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartDrawerOpen(true)}
              className="relative p-2 text-slate-300 hover:text-white hover:bg-slate-900 rounded-lg transition-colors"
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-cyan-500 text-slate-950 font-bold text-[11px] rounded-full flex items-center justify-center shadow-md">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-slate-400 hover:text-white lg:hidden hover:bg-slate-900 rounded-lg transition-colors"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-slate-950/98 px-4 pt-3 pb-6 space-y-2 backdrop-blur-xl">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-800">
            <button
              onClick={() => handleNav('home')}
              className={`p-2.5 rounded-lg text-sm text-left ${activePage === 'home' ? 'bg-cyan-500/10 text-cyan-400 font-semibold' : 'text-slate-300'}`}
            >
              Home
            </button>
            <button
              onClick={() => handleNav('products')}
              className={`p-2.5 rounded-lg text-sm text-left ${activePage === 'products' ? 'bg-cyan-500/10 text-cyan-400 font-semibold' : 'text-slate-300'}`}
            >
              All Products
            </button>
            <button
              onClick={() => handleNav('smartphones')}
              className={`p-2.5 rounded-lg text-sm text-left ${activePage === 'smartphones' ? 'bg-cyan-500/10 text-cyan-400 font-semibold' : 'text-slate-300'}`}
            >
              Smartphones
            </button>
            <button
              onClick={() => handleNav('laptops')}
              className={`p-2.5 rounded-lg text-sm text-left ${activePage === 'laptops' ? 'bg-cyan-500/10 text-cyan-400 font-semibold' : 'text-slate-300'}`}
            >
              Laptops
            </button>
            <button
              onClick={() => handleNav('computers')}
              className={`p-2.5 rounded-lg text-sm text-left ${activePage === 'computers' ? 'bg-cyan-500/10 text-cyan-400 font-semibold' : 'text-slate-300'}`}
            >
              Computers
            </button>
            <button
              onClick={() => handleNav('accessories')}
              className={`p-2.5 rounded-lg text-sm text-left ${activePage === 'accessories' ? 'bg-cyan-500/10 text-cyan-400 font-semibold' : 'text-slate-300'}`}
            >
              Accessories
            </button>
          </div>

          <div className="space-y-1.5 pt-2">
            <button
              onClick={() => handleNav('refurbished')}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 font-medium text-sm text-left"
            >
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-emerald-400" />
                <span>Certified Refurbished & Pre-Owned</span>
              </div>
              <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-bold">
                Save 40%+
              </span>
            </button>

            <button
              onClick={() => handleNav('ai-assistant')}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-cyan-950/60 to-blue-950/60 border border-cyan-500/30 text-cyan-300 font-medium text-sm text-left"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Chiku AI Shopping Assistant</span>
              </div>
              <span className="text-[11px] bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded">
                Smart Agent
              </span>
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-800 text-xs">
            <button
              onClick={() => handleNav('about')}
              className="p-2 text-center text-slate-400 hover:text-white rounded"
            >
              About
            </button>
            <button
              onClick={() => handleNav('contact')}
              className="p-2 text-center text-slate-400 hover:text-white rounded"
            >
              Contact
            </button>
            <button
              onClick={() => handleNav('admin')}
              className="p-2 text-center text-cyan-400 font-semibold rounded hover:bg-slate-900"
            >
              Admin Panel
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
