import React, { useState } from 'react';
import { Users, Search, Phone, Mail, Clock, ShoppingBag, CheckCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AdminCustomersTab: React.FC = () => {
  const { enquiries } = useApp();
  const [search, setSearch] = useState('');

  // Extract customers from customer enquiries and demo base
  const demoCustomers = [
    {
      id: 'cust-1',
      name: 'Rohan Sharma',
      phone: '+91 98765 43210',
      email: 'rohan.sharma@example.com',
      city: 'Kanpur, UP',
      primaryInterest: 'Gaming Laptops',
      totalEnquiries: 2,
      lastActive: 'Today, 11:20 AM',
      status: 'High Intent'
    },
    {
      id: 'cust-2',
      name: 'Priya Patel',
      phone: '+91 98234 56789',
      email: 'priya.patel@example.com',
      city: 'Unnao, UP',
      primaryInterest: 'Refurbished iPhones',
      totalEnquiries: 1,
      lastActive: 'Yesterday',
      status: 'Negotiating'
    },
    {
      id: 'cust-3',
      name: 'Amitabh Verma',
      phone: '+91 97112 34567',
      email: 'amitabh.verma@example.com',
      city: 'Lucknow Highway, Kanpur',
      primaryInterest: 'MacBook Air M2',
      totalEnquiries: 3,
      lastActive: '2 days ago',
      status: 'Converted'
    },
    {
      id: 'cust-4',
      name: 'Sneha Gupta',
      phone: '+91 94550 12345',
      email: 'sneha.gupta@example.com',
      city: 'Swaroop Nagar, Kanpur',
      primaryInterest: 'Student Workstation PC',
      totalEnquiries: 1,
      lastActive: '3 days ago',
      status: 'New Inquiry'
    }
  ];

  const filtered = demoCustomers.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.phone.includes(search) || 
    c.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/90 border border-slate-800 p-5 rounded-2xl">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight font-display">
            Customer Directory
          </h1>
          <p className="text-xs text-slate-400">
            Track customer relationship profiles, purchase intent and enquiry history.
          </p>
        </div>

        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search customers..."
            className="w-full sm:w-64 bg-slate-950 text-white placeholder-slate-500 text-xs pl-8 pr-3 py-2 rounded-xl border border-slate-800 focus:outline-none focus:ring-1 focus:ring-cyan-500"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/60 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="p-3.5">Customer Name</th>
                <th className="p-3.5">Contact Details</th>
                <th className="p-3.5">Location</th>
                <th className="p-3.5">Interest Category</th>
                <th className="p-3.5 text-center">Enquiries</th>
                <th className="p-3.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs">
              {filtered.map((cust) => (
                <tr key={cust.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-3.5 font-bold text-white">
                    {cust.name}
                  </td>

                  <td className="p-3.5">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5 text-slate-300">
                        <Phone className="w-3 h-3 text-cyan-400" />
                        <span>{cust.phone}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                        <Mail className="w-3 h-3" />
                        <span>{cust.email}</span>
                      </div>
                    </div>
                  </td>

                  <td className="p-3.5 text-slate-300">
                    {cust.city}
                  </td>

                  <td className="p-3.5 text-cyan-400 font-medium">
                    {cust.primaryInterest}
                  </td>

                  <td className="p-3.5 text-center font-bold text-white">
                    {cust.totalEnquiries}
                  </td>

                  <td className="p-3.5">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      cust.status === 'High Intent'
                        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        : cust.status === 'Converted'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                    }`}>
                      {cust.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
