import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';
import { ProductCategory, ProductCondition } from '../types';
import { 
  Search, 
  Filter, 
  SlidersHorizontal, 
  X, 
  RotateCcw, 
  Sparkles, 
  Star,
  CheckCircle2
} from 'lucide-react';

interface CataloguePageProps {
  initialCategory?: ProductCategory | 'Refurbished' | null;
}

export const CataloguePage: React.FC<CataloguePageProps> = ({ initialCategory = null }) => {
  const { products, openAiWithPrompt } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(
    initialCategory === 'Refurbished' ? 'All' : (initialCategory || 'All')
  );
  const [selectedCondition, setSelectedCondition] = useState<string>(
    initialCategory === 'Refurbished' ? 'Refurbished' : 'All'
  );
  const [selectedBrand, setSelectedBrand] = useState<string>('All');
  const [priceMax, setPriceMax] = useState<number>(180000);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'discount'>('featured');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Available brands in the catalogue
  const availableBrands = useMemo(() => {
    const brands = Array.from(new Set(products.map(p => p.brand)));
    return ['All', ...brands];
  }, [products]);

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      // Visibility filter (exclude items hidden by Admin/AI)
      if (p.visible === false) return false;

      // Category filter
      if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;

      // Condition filter
      if (selectedCondition !== 'All') {
        if (selectedCondition === 'Refurbished') {
          if (p.condition !== 'Refurbished' && p.condition !== 'Second-Hand') return false;
        } else if (p.condition !== selectedCondition) {
          return false;
        }
      }

      // Brand filter
      if (selectedBrand !== 'All' && p.brand !== selectedBrand) return false;

      // Price filter
      if (p.price > priceMax) return false;

      // In stock
      if (inStockOnly && p.stockStatus === 'Out of Stock') return false;

      // Rating
      if (minRating > 0 && p.rating < minRating) return false;

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesBrand = p.brand.toLowerCase().includes(q);
        const matchesDesc = p.description.toLowerCase().includes(q);
        const matchesCpu = (p.keySpecs.processor || '').toLowerCase().includes(q);
        const matchesCategory = p.category.toLowerCase().includes(q);
        if (!matchesName && !matchesBrand && !matchesDesc && !matchesCpu && !matchesCategory) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'discount') return b.discount - a.discount;
      return 0; // featured default
    });
  }, [products, selectedCategory, selectedCondition, selectedBrand, priceMax, inStockOnly, minRating, searchQuery, sortBy]);

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSelectedCondition('All');
    setSelectedBrand('All');
    setPriceMax(180000);
    setInStockOnly(false);
    setMinRating(0);
    setSearchQuery('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {initialCategory === 'Refurbished' ? 'Certified Refurbished & Pre-Owned' : 'Electronics Product Catalogue'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Showing <strong className="text-white font-bold">{filteredProducts.length}</strong> verified devices in stock
          </p>
        </div>

        {/* Search Bar & Sort Dropdown */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 sm:w-64">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products, specs, brands..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-8 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
            <Search className="w-4 h-4 text-cyan-400 absolute left-3 top-2.5" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2.5 text-slate-500 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Customer Rated</option>
              <option value="discount">Biggest Discount</option>
            </select>

            <button
              onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
              className="lg:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300"
              title="Toggle filters"
            >
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        
        {/* Desktop Sidebar Filters */}
        <div className={`space-y-6 ${isMobileFilterOpen ? 'block' : 'hidden lg:block'} bg-slate-900/80 border border-slate-800 p-5 rounded-2xl`}>
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5 text-cyan-400" />
              Filters
            </span>
            <button
              onClick={handleResetFilters}
              className="text-xs text-cyan-400 hover:text-cyan-300"
            >
              Reset All
            </button>
          </div>

          {/* Category Filter */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 block">Category</label>
            <div className="space-y-1 text-xs">
              {[
                { label: 'All Categories', value: 'All' },
                { label: 'Smartphones', value: 'Smartphones' },
                { label: 'Laptops', value: 'Laptops' },
                { label: 'Computers & Monitors', value: 'Computers' },
                { label: 'Accessories', value: 'Accessories' }
              ].map(cat => (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors flex items-center justify-between ${
                    selectedCategory === cat.value
                      ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Condition Filter */}
          <div className="space-y-2 pt-3 border-t border-slate-800">
            <label className="text-xs font-semibold text-slate-300 block">Condition</label>
            <div className="space-y-1 text-xs">
              {[
                { label: 'All Conditions', value: 'All' },
                { label: 'Brand New Only', value: 'New' },
                { label: 'Certified Refurbished & Pre-Owned', value: 'Refurbished' },
                { label: 'Pre-Owned (Second-Hand)', value: 'Second-Hand' }
              ].map(cond => (
                <button
                  key={cond.value}
                  onClick={() => setSelectedCondition(cond.value)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors flex items-center justify-between ${
                    selectedCondition === cond.value
                      ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <span>{cond.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="space-y-2 pt-3 border-t border-slate-800">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-300">Max Price</span>
              <span className="font-bold text-cyan-400">₹{priceMax.toLocaleString('en-IN')}</span>
            </div>
            <input
              type="range"
              min={5000}
              max={180000}
              step={5000}
              value={priceMax}
              onChange={(e) => setPriceMax(Number(e.target.value))}
              className="w-full accent-cyan-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>₹5,000</span>
              <span>₹1,80,000</span>
            </div>
          </div>

          {/* Brand Filter */}
          <div className="space-y-2 pt-3 border-t border-slate-800">
            <label className="text-xs font-semibold text-slate-300 block">Brand</label>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500"
            >
              {availableBrands.map(b => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>

          {/* Minimum Rating */}
          <div className="space-y-2 pt-3 border-t border-slate-800">
            <label className="text-xs font-semibold text-slate-300 block">Minimum Rating</label>
            <div className="flex items-center gap-2">
              {[0, 4, 4.5].map(r => (
                <button
                  key={r}
                  onClick={() => setMinRating(r)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium ${
                    minRating === r
                      ? 'bg-cyan-500 text-slate-950 font-bold'
                      : 'bg-slate-950 text-slate-400 border border-slate-800'
                  }`}
                >
                  {r === 0 ? 'Any' : `${r}★ & up`}
                </button>
              ))}
            </div>
          </div>

          {/* Stock Filter Checkbox */}
          <div className="pt-3 border-t border-slate-800">
            <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="rounded accent-cyan-500"
              />
              <span>In Stock items only</span>
            </label>
          </div>

        </div>

        {/* Product Cards Grid */}
        <div className="lg:col-span-3 space-y-6">
          {filteredProducts.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center text-slate-500 mx-auto">
                <Search className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">No products match your current filters</h3>
                <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                  Try clearing your search query or adjusting your price and condition filters.
                </p>
              </div>
              <div className="flex justify-center gap-3">
                <button
                  onClick={handleResetFilters}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-white hover:bg-slate-700"
                >
                  Reset Filters
                </button>
                <button
                  onClick={() => openAiWithPrompt(`Can you recommend a product in the catalogue under ₹${priceMax}?`)}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Ask Chiku AI for Suggestions
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map(prod => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
