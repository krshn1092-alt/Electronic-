import React, { useState } from 'react';
import { MessageSquare, Phone, Mail, CheckCircle2, Clock, Filter, Search } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AdminEnquiriesTab: React.FC = () => {
  const { enquiries, updateEnquiryStatus } = useApp();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filtered = enquiries.filter(enq => {
    if (search && !enq.customerName.toLowerCase().includes(search.toLowerCase()) && !enq.phone.includes(search) && !(enq.productName || '').toLowerCase().includes(search.toLowerCase())) return false;
    if (statusFilter !== 'all' && enq.status !== statusFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/90 border border-slate-800 p-5 rounded-2xl">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight font-display">
            Inbound Customer Enquiries
          </h1>
          <p className="text-xs text-slate-400">
            Leads captured through customer enquiry modals, product inquiry popups, and store chat.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search enquiries..."
              className="w-full sm:w-56 bg-slate-950 text-white placeholder-slate-500 text-xs pl-8 pr-3 py-2 rounded-xl border border-slate-800 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-950 text-slate-300 text-xs px-3 py-2 rounded-xl border border-slate-800 focus:outline-none focus:ring-1 focus:ring-cyan-500"
          >
            <option value="all">All Statuses</option>
            <option value="New">New</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>
      </div>

      {/* Enquiries Cards */}
      <div className="space-y-3">
        {filtered.map((enq) => (
          <div key={enq.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 shadow-md hover:border-slate-700 transition-colors">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
              <div>
                <div className="font-bold text-white text-sm">{enq.customerName}</div>
                <div className="flex items-center gap-4 text-xs text-slate-400 mt-1">
                  <span className="flex items-center gap-1"><Phone className="w-3 h-3 text-cyan-400" /> {enq.phone}</span>
                  {enq.email && <span className="flex items-center gap-1"><Mail className="w-3 h-3 text-cyan-400" /> {enq.email}</span>}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-500">{enq.createdAt}</span>
                <select
                  value={enq.status}
                  onChange={(e) => updateEnquiryStatus(enq.id, e.target.value as any)}
                  className={`border rounded-lg px-2.5 py-1 text-xs font-semibold focus:outline-none ${
                    enq.status === 'New' 
                      ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' 
                      : enq.status === 'In Progress'
                      ? 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                      : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                  }`}
                >
                  <option value="New">Status: New</option>
                  <option value="In Progress">Status: In Progress</option>
                  <option value="Resolved">Status: Resolved</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80">
                <span className="text-slate-500 block text-[10px]">Product / Requirement</span>
                <span className="font-semibold text-cyan-300">{enq.productName || 'General Enquiry'}</span>
                <div className="text-slate-400 text-[11px] mt-0.5">{enq.requirementType}</div>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80">
                <span className="text-slate-500 block text-[10px]">Customer Budget</span>
                <span className="font-semibold text-emerald-400">{enq.budget || 'Open / Flexible'}</span>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80">
                <span className="text-slate-500 block text-[10px]">Contact Actions</span>
                <div className="flex gap-2 mt-1">
                  <a 
                    href={`tel:${enq.phone}`}
                    className="px-2.5 py-1 rounded-lg bg-cyan-600/20 text-cyan-300 hover:bg-cyan-600/30 text-[11px] font-semibold transition-colors"
                  >
                    Call Customer
                  </a>
                  <button 
                    onClick={() => updateEnquiryStatus(enq.id, 'Resolved')}
                    className="px-2.5 py-1 rounded-lg bg-emerald-600/20 text-emerald-300 hover:bg-emerald-600/30 text-[11px] font-semibold transition-colors"
                  >
                    Mark Done
                  </button>
                </div>
              </div>
            </div>

            <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/60 text-xs text-slate-300">
              <span className="text-slate-500 font-semibold block mb-0.5 text-[10px]">Message / Customer Notes:</span>
              {enq.message}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
