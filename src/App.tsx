import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { AiAssistantModal } from './components/AiAssistantModal';
import { EnquiryModal } from './components/EnquiryModal';
import { ComparisonDrawer } from './components/ComparisonDrawer';
import { HomePage } from './pages/HomePage';
import { CataloguePage } from './pages/CataloguePage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { AdminPage } from './pages/AdminPage';
import { AboutPage, ContactLocationPage } from './pages/AboutContactPages';
import { Sparkles, CheckCircle2, AlertCircle, Info, MessageSquare } from 'lucide-react';

const MainAppContent: React.FC = () => {
  const { 
    activePage, 
    setActivePage, 
    setIsAiModalOpen, 
    openEnquiryForProduct,
    toasts 
  } = useApp();

  // Route rendering logic
  const renderCurrentPage = () => {
    switch (activePage) {
      case 'home':
        return <HomePage />;
      case 'products':
        return <CataloguePage />;
      case 'smartphones':
        return <CataloguePage initialCategory="Smartphones" />;
      case 'laptops':
        return <CataloguePage initialCategory="Laptops" />;
      case 'computers':
        return <CataloguePage initialCategory="Computers" />;
      case 'accessories':
        return <CataloguePage initialCategory="Accessories" />;
      case 'refurbished':
        return <CataloguePage initialCategory="Refurbished" />;
      case 'product-detail':
        return <ProductDetailPage />;
      case 'admin':
        return <AdminPage />;
      case 'about':
        return <AboutPage />;
      case 'contact':
      case 'location':
        return <ContactLocationPage />;
      case 'ai-assistant':
        // Show home and pop AI modal
        setTimeout(() => setIsAiModalOpen(true), 100);
        return <HomePage />;
      case 'enquiry':
        setTimeout(() => openEnquiryForProduct(), 100);
        return <HomePage />;
      default:
        if (activePage.startsWith('product/')) {
          return <ProductDetailPage />;
        }
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950">
      
      {/* Header */}
      <Header />

      {/* Main Page Area */}
      <main className="flex-1">
        {renderCurrentPage()}
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals and Drawers */}
      <CartDrawer />
      <AiAssistantModal />
      <EnquiryModal />
      <ComparisonDrawer />

      {/* Floating Action Button: Quick Launch Chiku AI */}
      <div className="fixed bottom-6 right-6 z-30 flex flex-col items-end gap-2">
        <button
          onClick={() => setIsAiModalOpen(true)}
          className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-xs shadow-xl shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-105 active:scale-95 transition-all duration-200"
          aria-label="Open Chiku AI Shopping Assistant"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-200 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
          </span>
          <Sparkles className="w-4 h-4 text-cyan-200 group-hover:rotate-12 transition-transform" />
          <span className="hidden sm:inline">Ask</span>
          <span>Chiku AI</span>
        </button>
      </div>

      {/* Toast Notification Container */}
      <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`pointer-events-auto px-4 py-3 rounded-xl shadow-2xl border text-xs font-medium flex items-center gap-2.5 animate-in slide-in-from-left-5 duration-200 ${
              toast.type === 'success'
                ? 'bg-slate-900 border-emerald-500/40 text-emerald-300'
                : toast.type === 'error'
                ? 'bg-slate-900 border-rose-500/40 text-rose-300'
                : 'bg-slate-900 border-cyan-500/40 text-cyan-300'
            }`}
          >
            {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
            {toast.type === 'error' && <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />}
            {toast.type === 'info' && <Info className="w-4 h-4 text-cyan-400 shrink-0" />}
            <span>{toast.text}</span>
          </div>
        ))}
      </div>

    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
