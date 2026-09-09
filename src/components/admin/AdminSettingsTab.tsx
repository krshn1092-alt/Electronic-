import React, { useState } from 'react';
import { Settings, Clock, MapPin, Phone, Mail, HelpCircle, Plus, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AdminSettingsTab: React.FC = () => {
  const { businessInfo, updateBusinessInfo, faqs, addFAQ, updateFAQ } = useApp();

  const [hours, setHours] = useState(businessInfo.hours);
  const [days, setDays] = useState(businessInfo.days);
  const [phone, setPhone] = useState(businessInfo.phone);
  const [whatsapp, setWhatsapp] = useState(businessInfo.whatsapp);
  const [email, setEmail] = useState(businessInfo.email);
  const [address, setAddress] = useState(businessInfo.address);
  const [city, setCity] = useState(businessInfo.city);

  // New FAQ form
  const [newQ, setNewQ] = useState('');
  const [newA, setNewA] = useState('');

  const handleSaveBusinessInfo = (e: React.FormEvent) => {
    e.preventDefault();
    updateBusinessInfo({
      hours,
      days,
      phone,
      whatsapp,
      email,
      address,
      city
    });
  };

  const handleAddFaqSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQ.trim() || !newA.trim()) return;
    addFAQ(newQ.trim(), newA.trim());
    setNewQ('');
    setNewA('');
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl">
        <h1 className="text-xl font-bold text-white tracking-tight font-display">
          Business & Store Settings
        </h1>
        <p className="text-xs text-slate-400">
          Manage operational hours, store physical locations, support contact numbers and customer FAQs.
        </p>
      </div>

      {/* Business Hours & Information Form */}
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-lg space-y-4">
        <h2 className="text-xs font-bold text-white uppercase tracking-wider">
          Store Information & Operational Timings
        </h2>

        <form onSubmit={handleSaveBusinessInfo} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Store Hours
              </label>
              <input
                type="text"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                placeholder="e.g. 10:00 AM – 8:30 PM"
                className="w-full bg-slate-950 text-white text-xs p-2.5 rounded-xl border border-slate-800 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Days of Operation
              </label>
              <input
                type="text"
                value={days}
                onChange={(e) => setDays(e.target.value)}
                placeholder="e.g. Monday – Sunday (Open 7 Days)"
                className="w-full bg-slate-950 text-white text-xs p-2.5 rounded-xl border border-slate-800 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Store Phone
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-slate-950 text-white text-xs p-2.5 rounded-xl border border-slate-800 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                WhatsApp Hotline
              </label>
              <input
                type="text"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                className="w-full bg-slate-950 text-white text-xs p-2.5 rounded-xl border border-slate-800 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Official Support Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-950 text-white text-xs p-2.5 rounded-xl border border-slate-800 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Store Street Address
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-slate-950 text-white text-xs p-2.5 rounded-xl border border-slate-800 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Region / City
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full bg-slate-950 text-white text-xs p-2.5 rounded-xl border border-slate-800 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl shadow transition-all"
            >
              Save Business Details
            </button>
          </div>
        </form>
      </div>

      {/* FAQ Manager */}
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-lg space-y-4">
        <h2 className="text-xs font-bold text-white uppercase tracking-wider">
          Customer Frequently Asked Questions ({faqs.length})
        </h2>

        {/* Add FAQ form */}
        <form onSubmit={handleAddFaqSubmit} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
          <input
            type="text"
            value={newQ}
            onChange={(e) => setNewQ(e.target.value)}
            placeholder="Question (e.g. Do refurbished laptops include battery warranty?)"
            className="w-full bg-slate-900 text-white text-xs p-2.5 rounded-lg border border-slate-800 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            required
          />
          <textarea
            value={newA}
            onChange={(e) => setNewA(e.target.value)}
            placeholder="Answer (e.g. Yes, all refurbished machines come with a minimum 6-month battery warranty.)"
            rows={2}
            className="w-full bg-slate-900 text-white text-xs p-2.5 rounded-lg border border-slate-800 focus:outline-none focus:ring-1 focus:ring-cyan-500 resize-none"
            required
          />
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-3.5 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-lg shadow transition-all flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add FAQ</span>
            </button>
          </div>
        </form>

        {/* FAQs List */}
        <div className="space-y-3">
          {faqs.map((faq) => (
            <div key={faq.id} className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <h4 className="text-xs font-bold text-white">Q: {faq.q}</h4>
              <p className="text-[11px] text-slate-300 leading-relaxed">A: {faq.a}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
