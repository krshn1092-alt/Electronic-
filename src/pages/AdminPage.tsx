import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AdminLogin } from '../components/admin/AdminLogin';
import { AdminSidebar, AdminTab } from '../components/admin/AdminSidebar';
import { AdminDashboardTab } from '../components/admin/AdminDashboardTab';
import { AdminAiCommandCenter } from '../components/admin/AdminAiCommandCenter';
import { AdminProductsTab } from '../components/admin/AdminProductsTab';
import { AdminCategoriesTab } from '../components/admin/AdminCategoriesTab';
import { AdminHomepageTab } from '../components/admin/AdminHomepageTab';
import { AdminCustomersTab } from '../components/admin/AdminCustomersTab';
import { AdminEnquiriesTab } from '../components/admin/AdminEnquiriesTab';
import { AdminActivityTab } from '../components/admin/AdminActivityTab';
import { AdminSettingsTab } from '../components/admin/AdminSettingsTab';
import { ConfirmationModal } from '../components/admin/ConfirmationModal';
import { PendingConfirmation } from '../types';
import { 
  Bot, 
  Sparkles, 
  ExternalLink, 
  LogOut, 
  ShieldCheck, 
  LayoutDashboard, 
  Menu, 
  X 
} from 'lucide-react';

export const AdminPage: React.FC = () => {
  const { 
    isAdminLoggedIn, 
    logoutAdmin, 
    setActivePage, 
    confirmPendingAction, 
    products, 
    enquiries 
  } = useApp();

  const [currentTab, setCurrentTab] = useState<AdminTab>('dashboard');
  const [aiPrompt, setAiPrompt] = useState<string>('');
  const [pendingConfirmation, setPendingConfirmation] = useState<PendingConfirmation | null>(null);
  const [isConfirming, setIsConfirming] = useState<boolean>(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);

  // If user is not logged into admin, display the professional login screen
  if (!isAdminLoggedIn) {
    return <AdminLogin />;
  }

  const handleConfirmAction = async () => {
    if (!pendingConfirmation) return;
    setIsConfirming(true);
    try {
      await confirmPendingAction(pendingConfirmation);
      setPendingConfirmation(null);
    } finally {
      setIsConfirming(false);
    }
  };

  const handleLaunchAiPrompt = (prompt: string) => {
    setAiPrompt(prompt);
    setCurrentTab('ai-command');
  };

  const getTabTitle = (tab: AdminTab) => {
    switch (tab) {
      case 'dashboard': return 'Dashboard Overview';
      case 'ai-command': return 'AI Command Center';
      case 'products': return 'Products & Inventory';
      case 'categories': return 'Taxonomy & Categories';
      case 'homepage': return 'Storefront Homepage Layout';
      case 'customers': return 'Customer Directory';
      case 'enquiries': return 'Customer Leads & Enquiries';
      case 'activity': return 'AI Operation Logs & Audit';
      case 'settings': return 'Business Settings & FAQs';
      default: return 'Admin Panel';
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col lg:flex-row">
      
      {/* Mobile Top Header for Admin */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-slate-900 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center text-slate-950 font-black">
            <Bot className="w-4 h-4 text-slate-950" />
          </div>
          <span className="font-bold text-white text-sm">Admin Panel</span>
        </div>
        <button
          onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          className="p-2 text-slate-400 hover:text-white rounded-lg bg-slate-800"
        >
          {isMobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Sidebar overlay */}
      {isMobileSidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex">
          <div className="w-72 bg-slate-900 h-full flex flex-col shadow-2xl">
            <div className="p-4 flex items-center justify-between border-b border-slate-800">
              <span className="font-bold text-white text-sm">Navigation Menu</span>
              <button
                onClick={() => setIsMobileSidebarOpen(false)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <AdminSidebar 
                currentTab={currentTab} 
                onSelectTab={(tab) => {
                  setCurrentTab(tab);
                  setIsMobileSidebarOpen(false);
                }} 
              />
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden lg:block shrink-0">
        <div className="sticky top-0 h-screen">
          <AdminSidebar 
            currentTab={currentTab} 
            onSelectTab={setCurrentTab} 
          />
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        
        {/* Desktop Admin Header Bar */}
        <header className="bg-slate-900/80 border-b border-slate-800 px-6 py-4 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span>Admin Panel</span>
              <span>/</span>
              <span className="text-white font-semibold">{getTabTitle(currentTab)}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>AI Engine Active</span>
            </div>

            <button
              onClick={() => setActivePage('home')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors border border-slate-700"
            >
              <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
              <span>Customer Store</span>
            </button>

            <button
              onClick={logoutAdmin}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 text-xs font-semibold transition-colors border border-rose-500/20"
              title="Sign out of Admin Panel"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Logout</span>
            </button>
          </div>
        </header>

        {/* Tab Body */}
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6 flex-1">
          {currentTab === 'dashboard' && (
            <AdminDashboardTab 
              onNavigate={setCurrentTab} 
              onSelectPrompt={handleLaunchAiPrompt}
            />
          )}

          {currentTab === 'ai-command' && (
            <AdminAiCommandCenter 
              initialCommand={aiPrompt}
              onRequestConfirmation={setPendingConfirmation}
            />
          )}

          {currentTab === 'products' && (
            <AdminProductsTab 
              onRequestConfirmation={setPendingConfirmation}
            />
          )}

          {currentTab === 'categories' && (
            <AdminCategoriesTab 
              onRequestConfirmation={setPendingConfirmation}
            />
          )}

          {currentTab === 'homepage' && (
            <AdminHomepageTab 
              onRequestConfirmation={setPendingConfirmation}
            />
          )}

          {currentTab === 'customers' && (
            <AdminCustomersTab />
          )}

          {currentTab === 'enquiries' && (
            <AdminEnquiriesTab />
          )}

          {currentTab === 'activity' && (
            <AdminActivityTab />
          )}

          {currentTab === 'settings' && (
            <AdminSettingsTab />
          )}
        </div>

        {/* Global Action Confirmation Modal */}
        <ConfirmationModal
          pending={pendingConfirmation}
          onConfirm={handleConfirmAction}
          onCancel={() => setPendingConfirmation(null)}
          isLoading={isConfirming}
        />

      </main>
    </div>
  );
};
