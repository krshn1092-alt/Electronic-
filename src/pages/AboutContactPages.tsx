import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { STORE_INFO } from '../data/mockData';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ShieldCheck, 
  Sparkles, 
  Navigation, 
  Cpu, 
  CheckCircle2, 
  ChevronDown, 
  HelpCircle,
  MessageSquare,
  ArrowRight
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { setActivePage, setIsAiModalOpen } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Hero */}
      <div className="max-w-3xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
          <Cpu className="w-3.5 h-3.5 text-cyan-400" />
          Our Heritage & Mission
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display">
          Empowering Kanpur with Smart Tech & Guaranteed Value
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          At <strong>CHIKU ELECTRONICS</strong>, we bridge the gap between high-priced new flagships and affordable computing. Founded in Kanpur, we bring transparency, certified diagnostics, and AI-assisted shopping to modern electronics retail.
        </p>
      </div>

      {/* 3 Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">AI-Powered Transparency</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            No sales pressure, no confusing jargon. Our AI assistant analyzes exact performance metrics, battery degradation, and benchmark data so customers choose the right device with complete confidence.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">48-Point Diagnostic Lab</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Every certified refurbished unit undergoes stringent electrical, thermal, and mechanical tests. From motherboard voltage stability to port connectivity and display color accuracy.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
            <MapPin className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">Local Kanpur Store Hub</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Located conveniently on Mall Road, Civil Lines, Kanpur. Experience laptops and smartphones hands-on with immediate on-counter support, warranty service, and same-day delivery across the Unnao corridor.
          </p>
        </div>
      </div>

      {/* 48-Point Diagnostic Protocol Detail */}
      <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-8 space-y-6">
        <div className="max-w-2xl">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block mb-1">
            Our Quality Standard
          </span>
          <h2 className="text-2xl font-bold text-white">The Chiku Certified Refurbished Difference</h2>
          <p className="text-xs text-slate-400 mt-2">
            Unlike informal second-hand markets, every device in our refurbished inventory includes:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          {[
            'Minimum 85%+ OEM Battery Health Guarantee',
            'Full logic-board & motherboard stress test',
            'Display pixel uniformity & 120Hz touch test',
            'Keyboard key-switch actuation & backlight check',
            'Type-C, Thunderbolt, audio jack & HDMI verification',
            'Thermal paste re-application & fan cleaning',
            '6 to 12 Months comprehensive store warranty',
            '7-Day risk-free testing & return policy',
            'Certified clean IMEI & serial number history'
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Agency Demonstration Note */}
      <div className="p-6 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="font-bold text-white text-sm">Experience the Digital Retail Architecture</h4>
          <p className="text-xs text-cyan-200">
            This demo demonstrates how AI integration drives higher customer satisfaction and reduces retail inquiry latency.
          </p>
        </div>
        <button
          onClick={() => setActivePage('products')}
          className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shrink-0"
        >
          Explore Catalogue
        </button>
      </div>

    </div>
  );
};

export const ContactLocationPage: React.FC = () => {
  const { openEnquiryForProduct } = useApp();

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What warranty is provided on certified refurbished devices?',
      a: 'All certified refurbished electronics from Chiku Electronics come with a standard 6-month to 12-month direct store warranty covering logic board, display, and hardware failure, along with our 7-day risk-free inspection guarantee.'
    },
    {
      q: 'Can I inspect devices in person before purchasing?',
      a: 'Yes! Our flagship store is located on Mall Road, Civil Lines, Kanpur. You can inspect screens, keyboards, battery health, and benchmark scores in our demonstration zone before taking the unit home.'
    },
    {
      q: 'Do you offer same-day delivery in Kanpur and Unnao?',
      a: 'Yes, orders placed before 3:00 PM are eligible for express same-day courier dispatch across Kanpur city and the Unnao corridor with free delivery for orders over ₹1,000.'
    },
    {
      q: 'Can I request a custom PC or bulk office configuration?',
      a: 'Absolutely. We configure custom enterprise workstations, coding rigs, and render boxes. Submit an enquiry through our form or speak with our retail desk.'
    },
    {
      q: 'How do I know my battery health in a pre-owned laptop or phone?',
      a: 'We document exact battery health percentages directly on the product card and in our diagnostic reports. We never sell units with degraded batteries under 85% capacity.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Page Header */}
      <div className="max-w-3xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
          <MapPin className="w-3.5 h-3.5 text-cyan-400" />
          Store Location & Support Desk
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display">
          Visit Our Store or Get in Touch
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Experience hands-on tech demos, get custom workstation quotes, or enquire about incoming refurbished inventory at our Kanpur flagship location.
        </p>
      </div>

      {/* Store Location & Hours Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Store Details Cards */}
        <div className="lg:col-span-6 space-y-6">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <MapPin className="w-5 h-5 text-cyan-400" />
              Kanpur Flagship Store
            </h3>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800/80">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white font-semibold">Store Address:</strong>
                  {STORE_INFO.address}, {STORE_INFO.city}, {STORE_INFO.region} (Postal Code 208001)
                  <span className="text-[11px] text-slate-500 block mt-0.5">Landmark: Opposite City Square, Mall Road</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800/80">
                <Clock className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white font-semibold">Operating Hours:</strong>
                  Monday – Saturday: 10:00 AM – 8:00 PM <br />
                  Sunday: 11:00 AM – 5:00 PM (Showroom Demo Hours)
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800/80">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white font-semibold">Demo Phone / WhatsApp:</strong>
                  {STORE_INFO.phone} (Retail & Refurbished Desk)
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800/80">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white font-semibold">Electronic Support Desk:</strong>
                  {STORE_INFO.email}
                </div>
              </div>
            </div>

            <div className="pt-2 flex gap-3">
              <button
                onClick={() => openEnquiryForProduct()}
                className="flex-1 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Submit Lead Enquiry</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right: Simulated Interactive Store Map Visual */}
        <div className="lg:col-span-6">
          <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-2xl">
            <div className="p-4 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between text-xs">
              <span className="font-semibold text-white flex items-center gap-1.5">
                <Navigation className="w-3.5 h-3.5 text-cyan-400" />
                Kanpur – Unnao Retail Corridor
              </span>
              <span className="text-[10px] text-cyan-400 bg-cyan-500/20 px-2 py-0.5 rounded-full font-bold">
                Store Open Today
              </span>
            </div>

            <div className="relative aspect-16/10 w-full bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
              {/* Stylized vector map background representation */}
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#06b6d4_1px,transparent_1px)] [background-size:16px_16px]" />
              
              <div className="relative z-10 space-y-3">
                <div className="w-14 h-14 rounded-full bg-cyan-500/20 border-2 border-cyan-400 flex items-center justify-center text-cyan-400 mx-auto shadow-lg shadow-cyan-500/30 animate-bounce">
                  <MapPin className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="font-extrabold text-white text-base">CHIKU ELECTRONICS STORE</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Civil Lines, Mall Road, Kanpur, UP
                  </p>
                </div>
                <div className="inline-block px-3 py-1 rounded-full bg-slate-900/90 border border-slate-800 text-[11px] text-slate-300">
                  Latitude 26.471° N, Longitude 80.352° E
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-950/90 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400">Easy parking & metro connectivity</span>
              <a
                href="https://maps.google.com/?q=Mall+Road+Civil+Lines+Kanpur"
                target="_blank"
                rel="noreferrer"
                className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
              >
                Open in Maps <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* Frequently Asked Questions */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 space-y-6">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
            <HelpCircle className="w-4 h-4" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-2xl font-bold text-white">Frequently Asked Questions</h2>
          <p className="text-xs text-slate-400 mt-1">Everything you need to know about our warranties, testing, and store services</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-xl border border-slate-800/80 bg-slate-950/60 overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full px-5 py-4 text-left font-semibold text-white text-xs sm:text-sm flex items-center justify-between gap-4 hover:text-cyan-300 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
                    openFaq === index ? 'rotate-180 text-cyan-400' : ''
                  }`}
                />
              </button>
              {openFaq === index && (
                <div className="px-5 pb-4 text-xs text-slate-300 leading-relaxed border-t border-slate-900 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
