import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Send, 
  Phone, 
  Mail, 
  Copy, 
  Check, 
  QrCode, 
  Lock, 
  Zap, 
  Star, 
  ArrowUp,
  Globe
} from 'lucide-react';
import { SITE_CONFIG } from '../data/constants.ts';
import { CATEGORIES } from '../data/categories.ts';
import { ALL_SERVICES } from '../data/services.ts';
import { ServiceItem } from '../types/index.ts';

interface FooterProps {
  onSelectService: (service: ServiceItem) => void;
  onSelectCategory: (categoryId: string | null) => void;
  onOpenContactModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectService,
  onSelectCategory,
  onOpenContactModal,
}) => {
  const [copiedCrypto, setCopiedCrypto] = useState<string | null>(null);

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCrypto(type);
    setTimeout(() => setCopiedCrypto(null), 2500);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-800/90 text-slate-300 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        
        {/* Top Feature Highlights Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 rounded-3xl bg-slate-900/60 border border-slate-800">
          {SITE_CONFIG.guarantees.map((item, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">{item.title}</h4>
                <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Middle Navigation & Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          
          {/* Column 1: Brand & Contact Info (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-sky-500 flex items-center justify-center text-slate-950 font-black">
                <ShieldCheck className="w-5 h-5 stroke-[2.5]" />
              </div>
              <span className="text-xl font-black text-white tracking-tight">
                USA<span className="text-emerald-400">SMM</span>PROVIDER
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Leading verified provider of 5-star Google Reviews, TrustPilot feedback, verified bank accounts (PayPal, Cash App, Chase, Relay), aged social media profiles, and negative review removal with instant delivery and non-drop warranty.
            </p>

            <div className="space-y-2 pt-2">
              <a
                href={SITE_CONFIG.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-xs text-sky-400 hover:text-sky-300 font-semibold transition-colors"
              >
                <Send className="w-4 h-4" /> Telegram: {SITE_CONFIG.telegram}
              </a>
              <a
                href={SITE_CONFIG.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-xs text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
              >
                <Phone className="w-4 h-4" /> WhatsApp: {SITE_CONFIG.whatsapp}
              </a>
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="flex items-center gap-2.5 text-xs text-amber-400 hover:text-amber-300 font-semibold transition-colors"
              >
                <Mail className="w-4 h-4" /> Email: {SITE_CONFIG.email}
              </a>
            </div>

            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-200">
              {SITE_CONFIG.testingNotice}
            </div>
          </div>

          {/* Column 2: Categories (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-white">
              Service Categories
            </h4>
            <ul className="space-y-2 text-xs">
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => {
                      onSelectCategory(cat.id);
                      scrollToTop();
                    }}
                    className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                  >
                    <span>›</span>
                    <span>{cat.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Top Services (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-white">
              Popular Services
            </h4>
            <ul className="space-y-2 text-xs">
              {ALL_SERVICES.slice(0, 6).map((srv) => (
                <li key={srv.id}>
                  <button
                    onClick={() => {
                      onSelectService(srv);
                      scrollToTop();
                    }}
                    className="text-slate-400 hover:text-emerald-400 transition-colors truncate block max-w-full text-left"
                  >
                    {srv.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Official Crypto Addresses (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-black uppercase tracking-wider text-white">
              Official Payment Addresses
            </h4>

            {/* TRC20 USDT */}
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
              <div className="flex items-center justify-between text-[11px] font-bold text-emerald-400">
                <span>USDT (TRC20 Network)</span>
                <span className="text-slate-400 font-normal text-[10px]">Tron</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-950 px-2.5 py-1.5 rounded-lg border border-slate-800">
                <span className="font-mono text-[11px] text-slate-300 truncate flex-1">
                  {SITE_CONFIG.crypto.usdtTrc20}
                </span>
                <button
                  onClick={() => copyToClipboard(SITE_CONFIG.crypto.usdtTrc20, 'usdt')}
                  className="text-slate-400 hover:text-white p-1"
                  title="Copy USDT Address"
                >
                  {copiedCrypto === 'usdt' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* BTC */}
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
              <div className="flex items-center justify-between text-[11px] font-bold text-amber-400">
                <span>BTC (Bitcoin Network)</span>
                <span className="text-slate-400 font-normal text-[10px]">Mainnet</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-950 px-2.5 py-1.5 rounded-lg border border-slate-800">
                <span className="font-mono text-[11px] text-slate-300 truncate flex-1">
                  {SITE_CONFIG.crypto.btc}
                </span>
                <button
                  onClick={() => copyToClipboard(SITE_CONFIG.crypto.btc, 'btc')}
                  className="text-slate-400 hover:text-white p-1"
                  title="Copy BTC Address"
                >
                  {copiedCrypto === 'btc' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div className="pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} <strong className="text-slate-200">USASMMProvider</strong> ({SITE_CONFIG.domain}). All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <button onClick={onOpenContactModal} className="hover:text-white">
              Contact 24/7 Support
            </button>
            <span>•</span>
            <button onClick={scrollToTop} className="flex items-center gap-1 hover:text-emerald-400">
              Back to top <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
