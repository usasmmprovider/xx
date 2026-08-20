import React, { useState, useRef, useEffect } from 'react';
import { 
  ShoppingCart, 
  Send, 
  Phone, 
  Mail, 
  ShieldCheck, 
  Zap, 
  Menu, 
  X, 
  ChevronDown, 
  Star, 
  ChevronRight,
  Layers,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { useCart } from '../context/CartContext.tsx';
import { SITE_CONFIG } from '../data/constants.ts';
import { CATEGORIES } from '../data/categories.ts';
import { ALL_SERVICES } from '../data/services.ts';
import { ServiceItem } from '../types/index.ts';
import { DynamicIcon } from './DynamicIcon.tsx';

interface HeaderProps {
  onGoHome: () => void;
  onSelectService: (service: ServiceItem) => void;
  onSelectCategory: (categoryId: string | null) => void;
  selectedCategory: string | null;
  onOpenContactModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onGoHome,
  onSelectService,
  onSelectCategory,
  selectedCategory,
  onOpenContactModal,
}) => {
  const { totalItems, subtotal, setIsCartOpen } = useCart();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileExpandedCat, setMobileExpandedCat] = useState<string | null>(null);

  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getServicesForCategory = (catId: string) => {
    return ALL_SERVICES.filter((s) => s.category === catId);
  };

  const handleMobileSelectService = (service: ServiceItem) => {
    onSelectService(service);
    setIsMobileMenuOpen(false);
  };

  const handleMobileSelectCategory = (categoryId: string | null) => {
    onSelectCategory(categoryId);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 text-white">
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-indigo-950 border-b border-emerald-500/20 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-semibold text-[11px] border border-emerald-500/30">
              <Zap className="w-3 h-3 animate-pulse" /> 24/7 Live Support
            </span>
            <span className="text-slate-300 hidden sm:inline">{SITE_CONFIG.testingNotice}</span>
          </div>
          
          <div className="flex items-center gap-4 text-slate-300">
            <a
              href={SITE_CONFIG.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-sky-400 transition-colors"
              title="Telegram Support"
            >
              <Send className="w-3.5 h-3.5 text-sky-400" />
              <span className="font-medium">{SITE_CONFIG.telegram}</span>
            </a>
            <a
              href={SITE_CONFIG.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-emerald-400 transition-colors"
              title="WhatsApp Support"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-medium hidden md:inline">{SITE_CONFIG.whatsapp}</span>
            </a>
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="hidden lg:flex items-center gap-1 hover:text-amber-400 transition-colors"
              title="Email Us"
            >
              <Mail className="w-3.5 h-3.5 text-amber-400" />
              <span>{SITE_CONFIG.email}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Single Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between gap-4">
          
          {/* Left: Brand Logo & Immediately Followed by Services Menu */}
          <div className="flex items-center gap-4 lg:gap-6">
            
            {/* Brand Logo */}
            <button
              onClick={onGoHome}
              className="flex items-center gap-2 sm:gap-2.5 text-left group focus:outline-none shrink-0"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform shrink-0">
                <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-slate-950 stroke-[2.5]" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-base sm:text-xl font-black tracking-tight text-white group-hover:text-emerald-400 transition-colors truncate">
                    USA<span className="text-emerald-400">SMM</span>PROVIDER
                  </span>
                  <span className="bg-emerald-500/10 text-emerald-400 text-[9px] sm:text-[10px] font-bold px-1 sm:px-1.5 py-0.5 rounded border border-emerald-500/30 hidden md:inline-block">
                    VERIFIED
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 tracking-wide hidden md:block font-medium">
                  Official SMM & Bank Accounts Provider
                </p>
              </div>
            </button>

            {/* Desktop Navigation Menu (Right after Logo) */}
            <nav ref={navRef} className="hidden lg:flex items-center gap-1 text-xs">
              
              {/* Home */}
              <button
                onClick={onGoHome}
                className="px-3 py-2 rounded-xl font-bold text-slate-300 hover:text-white hover:bg-slate-900 transition-colors"
              >
                Home
              </button>

              {/* 4 Dedicated Category Dropdown Menus */}
              {CATEGORIES.map((cat) => {
                const catServices = getServicesForCategory(cat.id);
                const isOpen = activeDropdown === cat.id;
                const isSelected = selectedCategory === cat.id;

                return (
                  <div
                    key={cat.id}
                    className="relative"
                    onMouseEnter={() => setActiveDropdown(cat.id)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button
                      onClick={() => {
                        onSelectCategory(cat.id);
                        setActiveDropdown(null);
                      }}
                      className={`px-3 py-2 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
                        isSelected || isOpen
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'text-slate-300 hover:text-white hover:bg-slate-900'
                      }`}
                    >
                      <DynamicIcon name={cat.iconName} className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{cat.shortTitle}</span>
                      <ChevronDown className={`w-3 h-3 opacity-70 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Category Specific Dropdown */}
                    {isOpen && (
                      <div className="absolute left-0 top-full mt-1.5 w-80 bg-slate-950/98 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                        <div className="flex items-center justify-between px-2.5 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800/80 mb-2">
                          <span className="text-white">{cat.name}</span>
                          <span className="text-emerald-400">{catServices.length} Services</span>
                        </div>

                        <div className="max-h-80 overflow-y-auto space-y-1 pr-1 scrollbar-thin">
                          {catServices.map((service) => (
                            <button
                              key={service.id}
                              onClick={() => {
                                onSelectService(service);
                                setActiveDropdown(null);
                              }}
                              className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-slate-800/80 text-left transition-colors group"
                            >
                              <div className="flex items-center gap-2.5 min-w-0 pr-2">
                                <div className="w-7 h-7 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 group-hover:border-emerald-500/40">
                                  <DynamicIcon name={service.iconName} className="w-4 h-4" />
                                </div>
                                <div className="truncate">
                                  <div className="text-xs font-semibold text-slate-200 group-hover:text-emerald-300 truncate">
                                    {service.name}
                                  </div>
                                  <div className="text-[10px] text-slate-400 truncate">
                                    {service.warranty}
                                  </div>
                                </div>
                              </div>
                              <span className="text-xs font-bold text-emerald-400 shrink-0">
                                ${service.basePrice}
                              </span>
                            </button>
                          ))}
                        </div>

                        <div className="pt-2 mt-2 border-t border-slate-800/80 text-center">
                          <button
                            onClick={() => {
                              onSelectCategory(cat.id);
                              setActiveDropdown(null);
                            }}
                            className="text-[11px] font-bold text-emerald-400 hover:underline flex items-center justify-center gap-1 w-full py-1"
                          >
                            <span>Browse All in {cat.name}</span>
                            <ChevronRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            {/* Quick Contact Modal Button - Desktop only to keep mobile header clean */}
            <button
              onClick={onOpenContactModal}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-sky-400 bg-sky-950/40 border border-sky-500/30 hover:bg-sky-900/40 hover:border-sky-400 transition-colors shadow-sm"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Contact Support</span>
            </button>

            {/* Cart Drawer Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-black shadow-lg shadow-emerald-950/40 transition-all transform active:scale-95"
              aria-label="Open Shopping Cart"
            >
              <div className="relative">
                <ShoppingCart className="w-4 h-4" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-amber-400 text-slate-950 text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-md animate-bounce">
                    {totalItems}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline">Cart</span>
              {subtotal > 0 && (
                <span className="border-l border-emerald-400/40 pl-2 text-emerald-100 font-extrabold">
                  ${subtotal}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 lg:hidden hover:text-white"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Accordion */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-slate-950 p-4 space-y-4 max-h-[85vh] overflow-y-auto">
          {/* Quick Primary Actions */}
          <div>
            <button
              onClick={() => {
                onGoHome();
                setIsMobileMenuOpen(false);
              }}
              className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-200 text-center hover:text-emerald-400 hover:border-emerald-500/40 transition-colors"
            >
              Homepage
            </button>
          </div>

          {/* 4 Categories Accordion */}
          <div className="space-y-2">
            <div className="text-[11px] font-bold text-slate-400 uppercase px-2 tracking-wider">
              Services by Category
            </div>

            {CATEGORIES.map((cat) => {
              const catServices = getServicesForCategory(cat.id);
              const isExpanded = mobileExpandedCat === cat.id;

              return (
                <div key={cat.id} className="rounded-xl bg-slate-900/80 border border-slate-800 overflow-hidden">
                  <button
                    onClick={() => setMobileExpandedCat(isExpanded ? null : cat.id)}
                    className="w-full flex items-center justify-between p-3 text-left font-bold text-xs text-slate-200 hover:bg-slate-850"
                  >
                    <div className="flex items-center gap-2.5">
                      <DynamicIcon name={cat.iconName} className="w-4 h-4 text-emerald-400" />
                      <span>{cat.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 font-semibold">
                        {catServices.length} items
                      </span>
                      <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isExpanded ? 'rotate-180 text-emerald-400' : ''}`} />
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="px-3 pb-3 pt-1 space-y-1 border-t border-slate-800/60 bg-slate-950/60">
                      {catServices.map((service) => (
                        <button
                          key={service.id}
                          onClick={() => handleMobileSelectService(service)}
                          className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-slate-800 text-left text-xs transition-colors group"
                        >
                          <div className="flex items-center gap-2 truncate pr-2">
                            <DynamicIcon name={service.iconName} className="w-3.5 h-3.5 shrink-0 text-slate-400 group-hover:text-emerald-400" />
                            <span className="text-slate-300 group-hover:text-white truncate">{service.name}</span>
                          </div>
                          <span className="text-emerald-400 font-bold shrink-0">
                            ${service.basePrice}
                          </span>
                        </button>
                      ))}

                      <div className="pt-2 text-center">
                        <button
                          onClick={() => handleMobileSelectCategory(cat.id)}
                          className="text-[11px] font-bold text-emerald-400 hover:underline flex items-center justify-center gap-1 w-full py-1"
                        >
                          <span>View all in {cat.name}</span>
                          <ChevronRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Contact Support in Mobile Menu */}
          <div className="pt-3 border-t border-slate-800 space-y-2">
            <div className="text-[11px] font-bold text-slate-400 uppercase px-2">
              24/7 Human Live Support
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <a
                href={SITE_CONFIG.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-sky-950/60 border border-sky-500/40 text-sky-400 text-xs font-bold hover:bg-sky-900/60 transition-colors"
              >
                <Send className="w-4 h-4" /> Telegram: {SITE_CONFIG.telegram}
              </a>
              <a
                href={SITE_CONFIG.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-xs font-bold hover:bg-emerald-900/60 transition-colors"
              >
                <Phone className="w-4 h-4" /> WhatsApp: {SITE_CONFIG.whatsapp}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
