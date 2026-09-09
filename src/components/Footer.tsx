import React from 'react';
import { useApp } from '../context/AppContext';
import { STORE_INFO } from '../data/mockData';
import { Cpu, MapPin, Phone, Mail, Clock, ShieldCheck, Sparkles, Navigation, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActivePage } = useApp();

  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-sm">
      {/* Trust & Refurbished highlights */}
      <div className="border-b border-slate-900 bg-slate-900/40 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-white font-semibold text-sm">AI Shopping Assistant</div>
              <div className="text-xs text-slate-400">Personalized product discovery & specs analysis</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-white font-semibold text-sm">48-Point Certified Diagnostics</div>
              <div className="text-xs text-slate-400">Strict inspection on all refurbished devices</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-white font-semibold text-sm">7-Day Testing Guarantee</div>
              <div className="text-xs text-slate-400">Zero-risk return policy on all demo units</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <div className="text-white font-semibold text-sm">Physical Store Experience</div>
              <div className="text-xs text-slate-400">Hands-on demos in Kanpur / Unnao</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-600 p-0.5 shadow-lg shadow-cyan-500/20">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Cpu className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <div>
                <span className="font-extrabold text-base tracking-wider text-white font-display">
                  CHIKU ELECTRONICS
                </span>
                <p className="text-[11px] text-cyan-400 font-medium">
                  {STORE_INFO.tagline}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed pr-6">
              Empowering consumers and enterprises with premium new smartphones, laptops, custom workstations, and certified refurbished electronics backed by intelligent AI recommendation engines.
            </p>

            <div className="space-y-1.5 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{STORE_INFO.address}, {STORE_INFO.city}, {STORE_INFO.region}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{STORE_INFO.phone} (Demo Hotline)</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{STORE_INFO.email}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{STORE_INFO.hours} ({STORE_INFO.openDays})</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setActivePage('location')}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-cyan-500/50 text-cyan-400 text-xs font-medium transition-colors"
              >
                <Navigation className="w-3.5 h-3.5" />
                Get Directions to Kanpur Store
              </button>
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Product Catalogue</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setActivePage('smartphones')} className="hover:text-cyan-400 transition-colors">
                  New Smartphones
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('laptops')} className="hover:text-cyan-400 transition-colors">
                  Coding & Gaming Laptops
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('computers')} className="hover:text-cyan-400 transition-colors">
                  Workstations & 4K Displays
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('accessories')} className="hover:text-cyan-400 transition-colors">
                  GaN Chargers & ANC Audio
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('refurbished')} className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors">
                  Certified Refurbished Devices
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('products')} className="hover:text-cyan-400 transition-colors">
                  Full Catalog Index
                </button>
              </li>
            </ul>
          </div>

          {/* AI Features & Services */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">AI & Shopping Tools</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setActivePage('ai-assistant')} className="text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Chiku AI Assistant
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('comparison')} className="hover:text-cyan-400 transition-colors">
                  Product Comparison Tool
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('refurbished')} className="hover:text-cyan-400 transition-colors">
                  Refurbished Savings Calculator
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('enquiry')} className="hover:text-cyan-400 transition-colors">
                  Send Customer Enquiry
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('admin')} className="text-slate-300 hover:text-white font-medium flex items-center gap-1 transition-colors">
                  Admin Panel <ArrowRight className="w-3 h-3 text-cyan-400" />
                </button>
              </li>
            </ul>
          </div>

          {/* Company & Support */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Store & Support</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setActivePage('about')} className="hover:text-cyan-400 transition-colors">
                  About Chiku Electronics
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('location')} className="hover:text-cyan-400 transition-colors">
                  Store Location & Hours
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('contact')} className="hover:text-cyan-400 transition-colors">
                  Contact Support & FAQs
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('contact')} className="hover:text-cyan-400 transition-colors">
                  Warranty & Returns Policy
                </button>
              </li>
              <li>
                <span className="inline-block mt-2 px-2 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] text-cyan-400 font-semibold">
                  Kanpur Mall Road Hub
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Agency Demo Disclaimer Notice */}
        <div className="mt-10 pt-6 border-t border-slate-900">
          <div className="rounded-xl bg-slate-900/60 border border-slate-800/80 p-4 text-xs text-slate-400 space-y-1.5">
            <div className="flex items-center gap-2 text-cyan-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              DEMONSTRATION WEBSITE NOTICE
            </div>
            <p>
              This is a professional demonstration website built for an <strong>AI Agency showcase</strong>. All products, prices, warranties, reviews, customer enquiries, AI conversation histories, and orders are realistic fictional demo data designed to illustrate AI-powered retail solutions. No real monetary transactions or deliveries will take place.
            </p>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <div>
              © {new Date().getFullYear()} CHIKU ELECTRONICS Demo. All demo rights reserved.
            </div>
            <div className="flex items-center gap-4 text-[11px]">
              <span>Designed with Gemini 3.8 Flash AI Integration</span>
              <span>•</span>
              <span>Full-Stack Express + React Architecture</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
