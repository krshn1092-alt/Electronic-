import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2, 
  FileText 
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const { 
    cart, 
    isCartDrawerOpen, 
    setIsCartDrawerOpen, 
    removeFromCart, 
    updateCartQuantity, 
    clearCart, 
    cartSubtotal,
    setActivePage,
    navigateToProduct
  } = useApp();

  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<'form' | 'success'>('form');
  const [customerName, setCustomerName] = useState('Ananya Sharma');
  const [phone, setPhone] = useState('+91 98765 12345');
  const [address, setAddress] = useState('Civil Lines, Kanpur, Uttar Pradesh 208001');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'upi_demo'>('cod');
  const [demoOrderNumber, setDemoOrderNumber] = useState('');

  if (!isCartDrawerOpen) return null;

  const estimatedDelivery = cartSubtotal > 1000 ? 0 : 99;
  const estimatedTax = Math.round(cartSubtotal * 0.18); // 18% GST estimate (Demo)
  const totalAmount = cartSubtotal + estimatedDelivery;

  const handleStartCheckout = () => {
    setDemoOrderNumber(`CHK-DEMO-${Math.floor(100000 + Math.random() * 900000)}`);
    setCheckoutStep('form');
    setIsCheckoutModalOpen(true);
  };

  const handleCompleteDemoOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutStep('success');
    // Keep cart cleared after successful demo order
  };

  const handleFinish = () => {
    clearCart();
    setIsCheckoutModalOpen(false);
    setIsCartDrawerOpen(false);
    setActivePage('home');
  };

  return (
    <>
      {/* Slide-over Backdrop */}
      <div 
        onClick={() => setIsCartDrawerOpen(false)}
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs z-50 transition-opacity"
      />

      {/* Slide-over Panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10 z-50">
        <div className="w-screen max-w-md bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col justify-between">
          
          {/* Drawer Header */}
          <div className="px-6 py-5 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-cyan-400" />
              <h2 className="text-base font-bold text-white">Your Shopping Cart</h2>
              <span className="text-xs bg-cyan-500/20 text-cyan-300 font-bold px-2 py-0.5 rounded-full">
                {cart.length} items
              </span>
            </div>
            <button
              onClick={() => setIsCartDrawerOpen(false)}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-center text-slate-400 mb-4">
                  <ShoppingBag className="w-8 h-8 text-slate-500" />
                </div>
                <h3 className="text-base font-semibold text-white mb-1">Your cart is currently empty</h3>
                <p className="text-xs text-slate-400 max-w-xs mb-6">
                  Explore our smartphones, laptops, computers, and certified refurbished catalogue.
                </p>
                <button
                  onClick={() => {
                    setIsCartDrawerOpen(false);
                    setActivePage('products');
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-cyan-600 hover:bg-cyan-500 text-white transition-colors"
                >
                  Explore Products
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div 
                  key={item.product.id}
                  className="flex gap-3.5 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition-colors"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-18 h-18 rounded-lg object-cover bg-slate-900 shrink-0 border border-slate-800"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 
                          onClick={() => {
                            setIsCartDrawerOpen(false);
                            navigateToProduct(item.product.id);
                          }}
                          className="font-medium text-xs text-white line-clamp-1 hover:text-cyan-400 cursor-pointer"
                        >
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-slate-500 hover:text-rose-400 p-0.5 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-[11px] text-cyan-400 mt-0.5">
                        Condition: <span className="font-semibold text-slate-200">{item.product.condition}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-slate-800 rounded-lg bg-slate-900">
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 text-slate-400 hover:text-white"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-semibold px-2 text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 text-slate-400 hover:text-white"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right">
                        <div className="text-xs font-bold text-white">
                          ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                        </div>
                        {item.quantity > 1 && (
                          <div className="text-[10px] text-slate-500">
                            ₹{item.product.price.toLocaleString('en-IN')} each
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer Summary */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-slate-800 bg-slate-950/80 space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal</span>
                  <span className="text-white font-medium">₹{cartSubtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Delivery (Kanpur-Unnao Corridor)</span>
                  <span className="text-emerald-400 font-medium">
                    {estimatedDelivery === 0 ? 'FREE' : `₹${estimatedDelivery}`}
                  </span>
                </div>
                <div className="flex justify-between text-xs font-bold text-white pt-2 border-t border-slate-800">
                  <span>Estimated Total</span>
                  <span className="text-cyan-400 text-sm">₹{totalAmount.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="text-[11px] text-slate-500 flex items-center gap-1.5 bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>All items covered by Chiku Store Warranty and 7-day inspection policy.</span>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={clearCart}
                  className="px-3 py-2.5 rounded-xl border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-rose-400 text-xs font-semibold transition-colors"
                >
                  Clear
                </button>
                <button
                  onClick={handleStartCheckout}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/25 transition-all"
                >
                  <span>Proceed to Demo Checkout</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Demo Checkout Modal */}
      {isCheckoutModalOpen && (
        <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-sm z-60 flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-cyan-400" />
                <div>
                  <h3 className="font-bold text-white text-base">Chiku Electronics — Demo Checkout</h3>
                  <div className="text-[10px] text-cyan-400 font-semibold tracking-wide">
                    DEMO SIMULATION • NO ACTUAL CHARGES
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsCheckoutModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            {checkoutStep === 'form' ? (
              <form onSubmit={handleCompleteDemoOrder} className="p-6 space-y-4">
                <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-amber-300 font-semibold">Demonstration Mode Notice</strong>
                    This is a demonstration checkout. No real payment will be processed. Do NOT enter real debit/credit cards or sensitive financial details.
                  </div>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Customer Full Name (Demo)</label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-300 font-medium mb-1">Phone Number (Demo)</label>
                      <input
                        type="text"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-medium mb-1">Demo Payment Method</label>
                      <select
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value as any)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                      >
                        <option value="cod">Cash on Store Pickup (Demo)</option>
                        <option value="upi_demo">Simulated UPI / QR (Demo)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Delivery Address (Demo)</label>
                    <textarea
                      rows={2}
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                {/* Order Summary Pill */}
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs flex justify-between items-center">
                  <span className="text-slate-400">{cart.length} item(s)</span>
                  <span className="text-white font-bold text-sm">Total: ₹{totalAmount.toLocaleString('en-IN')}</span>
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsCheckoutModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white border border-slate-800"
                  >
                    Back to Cart
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-500/20"
                  >
                    Place Demo Order
                  </button>
                </div>
              </form>
            ) : (
              <div className="p-6 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white">Demo Order Simulated Successfully!</h4>
                  <p className="text-xs text-cyan-400 font-mono mt-1">
                    Order ID: {demoOrderNumber}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-left text-xs space-y-2 text-slate-300">
                  <div className="flex justify-between border-b border-slate-900 pb-2">
                    <span className="text-slate-500">Demo Customer:</span>
                    <span className="font-medium text-white">{customerName}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-900 pb-2">
                    <span className="text-slate-500">Destination:</span>
                    <span className="font-medium text-white">{address}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Amount Simulated:</span>
                    <span className="font-bold text-emerald-400">₹{totalAmount.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-400">
                  *This demo transaction has been logged in the Admin Dashboard under Demo Orders.
                </p>

                <button
                  onClick={handleFinish}
                  className="w-full py-2.5 rounded-xl text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white"
                >
                  Return to Store Home
                </button>
              </div>
            )}

          </div>
        </div>
      )}
    </>
  );
};
