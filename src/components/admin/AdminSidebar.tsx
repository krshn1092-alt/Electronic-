import React from 'react';
import { 
  LayoutDashboard, 
  Bot, 
  Package, 
  Layers, 
  LayoutTemplate, 
  Users, 
  MessageSquare, 
  History, 
  Settings, 
  LogOut,
  ExternalLink,
  ShieldAlert
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export type AdminTab = 
  | 'dashboard'
  | 'ai-command'
  | 'products'
  | 'categories'
  | 'homepage'
  | 'customers'
  | 'enquiries'
  | 'activity'
  | 'settings';

interface AdminSidebarProps {
  currentTab: AdminTab;
  onSelectTab: (tab: AdminTab) => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  currentTab,
  onSelectTab
}) => {
  const { logoutAdmin, setActivePage, enquiries, products, aiActivities } = useApp();

  const newEnquiriesCount = enquiries.filter(e => e.status === 'New').length;
  const recentActivitiesCount = aiActivities.length;

  const navItems: { id: AdminTab; label: string; icon: React.FC<{ className?: string }>; badge?: number | string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'ai-command', label: 'AI Command Center', icon: Bot, badge: 'AI' },
    { id: 'products', label: 'Products', icon: Package, badge: products.length },
    { id: 'categories', label: 'Categories', icon: Layers },
    { id: 'homepage', label: 'Homepage', icon: LayoutTemplate },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'enquiries', label: 'Enquiries', icon: MessageSquare, badge: newEnquiriesCount > 0 ? newEnquiriesCount : undefined },
    { id: 'activity', label: 'AI Activity', icon: History, badge: recentActivitiesCount },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-full lg:w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between shrink-0">
      <div className="p-4 sm:p-5">
        
        {/* Brand/Header */}
        <div className="flex items-center justify-between pb-5 mb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-600 p-0.5 shadow-md shadow-cyan-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center text-cyan-400">
                <Bot className="w-4 h-4" />
              </div>
            </div>
            <div>
              <h2 className="font-bold text-white text-sm tracking-tight font-display">
                Admin Panel
              </h2>
              <p className="text-[10px] text-cyan-400 font-medium">
                AI Management Engine
              </p>
            </div>
          </div>
        </div>

        {/* Navigation List */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/10 text-cyan-300 border border-cyan-500/30 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      item.id === 'ai-command'
                        ? 'bg-cyan-500 text-slate-950 shadow-sm'
                        : item.id === 'enquiries' && newEnquiriesCount > 0
                        ? 'bg-amber-500 text-slate-950'
                        : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom controls */}
      <div className="p-4 border-t border-slate-800 space-y-2 bg-slate-950/40">
        <button
          onClick={() => setActivePage('home')}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold text-slate-300 hover:text-cyan-400 hover:bg-slate-800/80 rounded-xl transition-all border border-slate-800"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>View Customer Storefront</span>
        </button>

        <button
          onClick={logoutAdmin}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-xl transition-all border border-rose-500/20"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};
