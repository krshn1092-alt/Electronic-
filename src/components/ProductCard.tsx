import React from 'react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';
import { 
  Star, 
  ShoppingCart, 
  Heart, 
  Sparkles, 
  Check, 
  SlidersHorizontal, 
  Eye, 
  BatteryMedium,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

interface ProductCardProps {
  product: Product;
  compact?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, compact = false }) => {
  const { 
    addToCart, 
    navigateToProduct, 
    toggleWishlist, 
    isWishlisted, 
    comparisonIds, 
    addToComparison, 
    removeFromComparison,
    openAiWithProduct
  } = useApp();

  const wishlisted = isWishlisted(product.id);
  const isCompared = comparisonIds.includes(product.id);

  const handleCompareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isCompared) {
      removeFromComparison(product.id);
    } else {
      addToComparison(product.id);
    }
  };

  const getConditionBadge = () => {
    if (product.condition === 'Refurbished') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
          <ShieldCheck className="w-3 h-3 text-emerald-400" />
          Certified Refurbished
          {product.refurbishedDetails?.batteryHealth && (
            <span className="ml-1 text-[9px] bg-emerald-950/80 px-1 rounded text-emerald-200">
              {product.refurbishedDetails.batteryHealth}% Batt
            </span>
          )}
        </span>
      );
    }
    if (product.condition === 'Second-Hand') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
          Pre-Owned (Tested)
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
        Brand New
      </span>
    );
  };

  return (
    <div 
      onClick={() => navigateToProduct(product.id)}
      className="group relative bg-slate-900/80 hover:bg-slate-900 border border-slate-800/80 hover:border-cyan-500/40 rounded-2xl p-4 transition-all duration-300 flex flex-col justify-between cursor-pointer hover:shadow-xl hover:shadow-cyan-500/5"
    >
      {/* Top Badges & Wishlist Action */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex flex-wrap items-center gap-1.5">
            {getConditionBadge()}
            {product.discount > 0 && (
              <span className="px-1.5 py-0.5 rounded text-[10px] font-extrabold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                {product.discount}% OFF
              </span>
            )}
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handleCompareClick}
              title={isCompared ? 'Remove from comparison' : 'Compare product'}
              className={`p-1.5 rounded-lg text-xs transition-colors ${
                isCompared 
                  ? 'bg-cyan-500 text-slate-950 font-bold' 
                  : 'text-slate-400 hover:text-cyan-400 hover:bg-slate-800'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleWishlist(product.id);
              }}
              title={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
              className={`p-1.5 rounded-lg transition-colors ${
                wishlisted 
                  ? 'text-rose-400 bg-rose-500/10' 
                  : 'text-slate-400 hover:text-rose-400 hover:bg-slate-800'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${wishlisted ? 'fill-rose-400 text-rose-400' : ''}`} />
            </button>
          </div>
        </div>

        {/* Product Image */}
        <div className="relative aspect-4/3 w-full rounded-xl overflow-hidden bg-slate-950/60 mb-3.5 flex items-center justify-center border border-slate-800/50">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
          {product.stockStatus === 'Low Stock' && (
            <span className="absolute bottom-2 left-2 text-[10px] font-medium bg-amber-500/90 text-slate-950 px-2 py-0.5 rounded-md backdrop-blur-xs font-semibold">
              Only {product.stockCount} Left
            </span>
          )}
          {product.stockStatus === 'In Stock' && (
            <span className="absolute bottom-2 left-2 text-[10px] font-medium bg-slate-900/90 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-md backdrop-blur-xs flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              In Stock
            </span>
          )}
        </div>

        {/* Brand & Title */}
        <div className="text-[11px] font-semibold tracking-wider text-cyan-400 uppercase mb-1">
          {product.brand}
        </div>
        <h3 className="font-semibold text-white text-sm line-clamp-1 group-hover:text-cyan-300 transition-colors">
          {product.name}
        </h3>

        {/* Short Specs Snippet */}
        <div className="mt-2 text-xs text-slate-400 space-y-1">
          {product.keySpecs.processor && (
            <p className="line-clamp-1 text-[11px] text-slate-300">
              <span className="text-slate-500">CPU:</span> {product.keySpecs.processor}
            </p>
          )}
          {product.keySpecs.ram && product.keySpecs.storage && (
            <p className="text-[11px] text-slate-300">
              <span className="text-slate-500">Config:</span> {product.keySpecs.ram} • {product.keySpecs.storage}
            </p>
          )}
          {product.keySpecs.display && (
            <p className="line-clamp-1 text-[11px] text-slate-300">
              <span className="text-slate-500">Screen:</span> {product.keySpecs.display}
            </p>
          )}
        </div>

        {/* Star Rating & Review Count */}
        <div className="flex items-center gap-1.5 mt-2.5">
          <div className="flex items-center text-amber-400">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span className="text-xs font-bold ml-1 text-slate-200">{product.rating}</span>
          </div>
          <span className="text-[11px] text-slate-500">({product.reviewCount} demo reviews)</span>
        </div>
      </div>

      {/* Pricing & Footer Actions */}
      <div className="mt-4 pt-3 border-t border-slate-800/80">
        <div className="flex items-baseline justify-between mb-3">
          <div>
            <div className="text-base font-extrabold text-white tracking-tight">
              ₹{product.price.toLocaleString('en-IN')}
            </div>
            {product.originalPrice > product.price && (
              <div className="text-xs text-slate-500 line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </div>
            )}
          </div>

          {/* Refurbished savings note */}
          {product.refurbishedDetails && (
            <div className="text-right">
              <div className="text-[10px] text-emerald-400 font-bold">
                Save ₹{product.refurbishedDetails.savingsAmount.toLocaleString('en-IN')}
              </div>
              <div className="text-[9px] text-slate-500">vs New MRP</div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
            className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-cyan-600 hover:bg-cyan-500 text-white transition-colors shadow-md shadow-cyan-500/20"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            Add
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              openAiWithProduct(product);
            }}
            className="flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/20 hover:border-cyan-500/40 transition-colors"
            title="Ask Chiku AI about this device"
          >
            <Sparkles className="w-3 h-3 text-cyan-400" />
            Ask AI
          </button>
        </div>
      </div>
    </div>
  );
};
