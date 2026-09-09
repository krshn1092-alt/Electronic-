import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';
import { 
  Star, 
  ShoppingCart, 
  Heart, 
  Sparkles, 
  SlidersHorizontal, 
  ShieldCheck, 
  MessageSquare, 
  ArrowLeft, 
  CheckCircle2, 
  BatteryMedium, 
  Truck, 
  RotateCcw, 
  Zap, 
  Award,
  ChevronRight,
  Info
} from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const { 
    selectedProductId, 
    products, 
    addToCart, 
    setIsCartDrawerOpen, 
    toggleWishlist, 
    isWishlisted, 
    addToComparison, 
    comparisonIds, 
    removeFromComparison,
    openAiWithProduct, 
    openEnquiryForProduct,
    setActivePage 
  } = useApp();

  const product = products.find(p => p.id === selectedProductId) || products[0];

  const [selectedImage, setSelectedImage] = useState(product?.image || '');
  const [activeTab, setActiveTab] = useState<'specs' | 'refurbished' | 'reviews'>('specs');
  const [buyQuantity, setBuyQuantity] = useState(1);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center text-slate-400">
        Product not found. <button onClick={() => setActivePage('products')} className="text-cyan-400">Back to Catalogue</button>
      </div>
    );
  }

  const wishlisted = isWishlisted(product.id);
  const isCompared = comparisonIds.includes(product.id);

  const images = product.gallery && product.gallery.length > 0 
    ? [product.image, ...product.gallery] 
    : [product.image];

  const currentDisplayImage = selectedImage || product.image;

  const handleBuyNow = () => {
    addToCart(product, buyQuantity);
    setIsCartDrawerOpen(true);
  };

  const relatedProducts = products
    .filter(p => p.id !== product.id && (p.category === product.category || p.condition === product.condition))
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <button onClick={() => setActivePage('home')} className="hover:text-white">Home</button>
        <ChevronRight className="w-3.5 h-3.5" />
        <button onClick={() => setActivePage('products')} className="hover:text-white">Products</button>
        <ChevronRight className="w-3.5 h-3.5" />
        <button onClick={() => setActivePage(product.category.toLowerCase())} className="hover:text-white">{product.category}</button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-200 font-medium truncate max-w-xs">{product.name}</span>
      </div>

      {/* Main Product Presentation Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-6 space-y-4">
          <div className="aspect-4/3 w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 relative flex items-center justify-center">
            <img
              src={currentDisplayImage}
              alt={product.name}
              className="w-full h-full object-cover transition-all duration-300"
              referrerPolicy="no-referrer"
            />
            {product.discount > 0 && (
              <span className="absolute top-4 left-4 px-2.5 py-1 rounded-lg text-xs font-extrabold bg-rose-500/90 text-white shadow-md">
                {product.discount}% OFF
              </span>
            )}
            {product.condition === 'Refurbished' && (
              <span className="absolute top-4 right-4 px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-500/90 text-slate-950 shadow-md flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Certified Refurbished
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto py-1">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-20 rounded-xl overflow-hidden bg-slate-950 border-2 transition-colors shrink-0 ${
                    currentDisplayImage === img ? 'border-cyan-500' : 'border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <img src={img} alt={`${product.name} ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Quick Assurance Strip */}
          <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-center text-xs">
            <div>
              <Truck className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
              <span className="text-slate-300 font-medium block">Local Express</span>
              <span className="text-[10px] text-slate-500">Kanpur/Unnao Hub</span>
            </div>
            <div>
              <ShieldCheck className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
              <span className="text-slate-300 font-medium block">{product.warranty}</span>
              <span className="text-[10px] text-slate-500">Store Warranty</span>
            </div>
            <div>
              <RotateCcw className="w-4 h-4 text-blue-400 mx-auto mb-1" />
              <span className="text-slate-300 font-medium block">7 Days Return</span>
              <span className="text-[10px] text-slate-500">Testing Guarantee</span>
            </div>
          </div>
        </div>

        {/* Right Column: Specs & Purchasing Actions */}
        <div className="lg:col-span-6 space-y-6">
          
          <div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-bold text-cyan-400 tracking-wider uppercase">
                {product.brand} • {product.category}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => isCompared ? removeFromComparison(product.id) : addToComparison(product.id)}
                  className={`text-xs px-2.5 py-1 rounded-lg border transition-colors flex items-center gap-1 ${
                    isCompared 
                      ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-500' 
                      : 'border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  {isCompared ? 'In Compare' : 'Compare'}
                </button>
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-1.5 rounded-lg border transition-colors ${
                    wishlisted 
                      ? 'border-rose-500/40 text-rose-400 bg-rose-500/10' 
                      : 'border-slate-800 text-slate-400 hover:text-rose-400'
                  }`}
                  title="Wishlist"
                >
                  <Heart className={`w-4 h-4 ${wishlisted ? 'fill-rose-400 text-rose-400' : ''}`} />
                </button>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1.5 leading-tight">
              {product.name}
            </h1>

            {/* Ratings & Condition Bar */}
            <div className="flex flex-wrap items-center gap-3 mt-3">
              <div className="flex items-center gap-1 text-amber-400">
                <Star className="w-4 h-4 fill-amber-400" />
                <span className="text-sm font-bold text-white">{product.rating}</span>
                <span className="text-xs text-slate-400">({product.reviewCount} customer reviews)</span>
              </div>
              <span className="text-slate-600">•</span>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                product.condition === 'Refurbished' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                product.condition === 'Second-Hand' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
              }`}>
                {product.condition} Device
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                {product.stockStatus} ({product.stockCount} units)
              </span>
            </div>
          </div>

          {/* Pricing Box */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-wrap items-baseline justify-between gap-3">
            <div>
              <div className="text-3xl font-extrabold text-white tracking-tight font-display">
                ₹{product.price.toLocaleString('en-IN')}
              </div>
              {product.originalPrice > product.price && (
                <div className="text-xs text-slate-400 mt-0.5">
                  Original Price: <span className="line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                  <span className="text-emerald-400 font-bold ml-2">
                    Save ₹{(product.originalPrice - product.price).toLocaleString('en-IN')}
                  </span>
                </div>
              )}
            </div>

            {product.refurbishedDetails && (
              <div className="text-right">
                <span className="text-xs text-emerald-400 font-bold bg-emerald-950/80 px-2.5 py-1 rounded-lg border border-emerald-500/30 inline-block">
                  Grade {product.refurbishedDetails.grade} Certified
                </span>
                <div className="text-[11px] text-slate-400 mt-1">
                  Battery Health: {product.refurbishedDetails.batteryHealth}%
                </div>
              </div>
            )}
          </div>

          {/* Key Hardware Specs Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
            {product.keySpecs.processor && (
              <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">Processor</span>
                <span className="font-semibold text-white truncate block">{product.keySpecs.processor}</span>
              </div>
            )}
            {product.keySpecs.ram && (
              <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">Memory (RAM)</span>
                <span className="font-semibold text-white truncate block">{product.keySpecs.ram}</span>
              </div>
            )}
            {product.keySpecs.storage && (
              <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">Storage</span>
                <span className="font-semibold text-white truncate block">{product.keySpecs.storage}</span>
              </div>
            )}
            {product.keySpecs.display && (
              <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">Display</span>
                <span className="font-semibold text-white truncate block">{product.keySpecs.display}</span>
              </div>
            )}
            {product.keySpecs.battery && (
              <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">Battery Capacity</span>
                <span className="font-semibold text-white truncate block">{product.keySpecs.battery}</span>
              </div>
            )}
            {product.keySpecs.warranty && (
              <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">Store Warranty</span>
                <span className="font-semibold text-cyan-400 truncate block">{product.keySpecs.warranty}</span>
              </div>
            )}
          </div>

          {/* Action Buttons: Add to Cart, Buy Now, Ask AI, Enquire */}
          <div className="space-y-3 pt-2">
            <div className="flex gap-3">
              <button
                onClick={() => addToCart(product, buyQuantity)}
                className="flex-1 py-3.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 transition-all"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>

              <button
                onClick={handleBuyNow}
                className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 transition-all"
              >
                <Zap className="w-4 h-4" />
                <span>Buy Now (Demo)</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => openAiWithProduct(product)}
                className="py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-cyan-500/30 hover:border-cyan-500/60 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Ask Chiku AI</span>
              </button>

              <button
                onClick={() => openEnquiryForProduct(product)}
                className="py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-slate-700 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                <span>Enquire / Bulk Quote</span>
              </button>
            </div>
          </div>

          {/* Product Narrative Description */}
          <div className="pt-4 border-t border-slate-800">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2">
              Product Overview
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              {product.description}
            </p>
          </div>

        </div>

      </div>

      {/* Tabs: Detailed Technical Specs & Refurbished Certification Details */}
      <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-6 sm:p-8 space-y-6">
        <div className="flex border-b border-slate-800 gap-4 text-xs font-bold">
          <button
            onClick={() => setActiveTab('specs')}
            className={`pb-3 border-b-2 transition-colors ${
              activeTab === 'specs' 
                ? 'border-cyan-400 text-cyan-400' 
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Technical Specifications
          </button>

          {product.refurbishedDetails && (
            <button
              onClick={() => setActiveTab('refurbished')}
              className={`pb-3 border-b-2 transition-colors flex items-center gap-1.5 ${
                activeTab === 'refurbished' 
                  ? 'border-emerald-400 text-emerald-400' 
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Refurbished Inspection Report
            </button>
          )}

          <button
            onClick={() => setActiveTab('reviews')}
            className={`pb-3 border-b-2 transition-colors ${
              activeTab === 'reviews' 
                ? 'border-cyan-400 text-cyan-400' 
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Demo Customer Reviews ({product.reviewCount})
          </button>
        </div>

        {/* Tab 1: Detailed Specifications Table */}
        {activeTab === 'specs' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {Object.entries(product.keySpecs).map(([key, val]) => (
              <div key={key} className="flex justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                <span className="text-slate-400 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                <span className="font-semibold text-white text-right max-w-[65%]">{val}</span>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Refurbished Diagnostics Report */}
        {activeTab === 'refurbished' && product.refurbishedDetails && (
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-500 block">Condition Grade</span>
                <span className="text-lg font-bold text-emerald-400">Grade {product.refurbishedDetails.grade}</span>
                <p className="text-[11px] text-slate-400 mt-1">Minor cosmetic blemishes if any; pristine screen & keyboard</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-500 block">Battery Diagnostics</span>
                <span className="text-lg font-bold text-emerald-400">{product.refurbishedDetails.batteryHealth}% OEM Capacity</span>
                <p className="text-[11px] text-slate-400 mt-1">Guaranteed minimum 85%+ capacity for full-day endurance</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-500 block">Price Advantage</span>
                <span className="text-lg font-bold text-emerald-400">₹{product.refurbishedDetails.savingsAmount.toLocaleString('en-IN')} Saved</span>
                <p className="text-[11px] text-slate-400 mt-1">Substantial cost reduction compared to original retail price</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-slate-300 space-y-2">
              <strong className="text-emerald-300 font-semibold block">Chiku 48-Point Physical & Electrical Inspection:</strong>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-300">
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Motherboard voltages & thermals verified</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Storage drive SMART health 100% clean</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> All ports (Type-C, Thunderbolt, HDMI) tested</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Original OEM charger & power adapter provided</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Reviews */}
        {activeTab === 'reviews' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-extrabold text-white">{product.rating}</span>
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <span className="text-xs text-slate-400">Based on {product.reviewCount} customer reviews</span>
              </div>
              <span className="text-[11px] text-slate-500 italic">Demo reviews for demonstration display</span>
            </div>

            <div className="space-y-3">
              {[
                { name: 'Kavita Singh (Kanpur)', rating: 5, date: '2 weeks ago', comment: 'Device was in immaculate condition. Battery life easily lasts my entire college day. The AI assistant recommended this model over another laptop and was completely accurate!' },
                { name: 'Rohan Saxena (Unnao)', rating: 4.8, date: '1 month ago', comment: 'Super fast pickup from the store counter. Saved over ₹20,000 compared to brand new retail. Highly recommend Chiku Electronics.' }
              ].map((rev, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-white">{rev.name}</span>
                    <span className="text-[11px] text-slate-500">{rev.date}</span>
                  </div>
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-300">{rev.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Related / Alternative Products */}
      {relatedProducts.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-white">Similar & Alternative Products</h3>
            <button
              onClick={() => setActivePage('products')}
              className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold"
            >
              Browse Catalogue
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
