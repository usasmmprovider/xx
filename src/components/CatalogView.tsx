import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Zap, 
  Star, 
  Send, 
  Phone, 
  CheckCircle2, 
  SlidersHorizontal, 
  TrendingUp, 
  Sparkles,
  ArrowRight,
  Search
} from 'lucide-react';
import { ServiceItem, ServiceCategory } from '../types/index.ts';
import { CATEGORIES } from '../data/categories.ts';
import { ALL_SERVICES } from '../data/services.ts';
import { SITE_CONFIG } from '../data/constants.ts';
import { ServiceCard } from './ServiceCard.tsx';
import { DynamicIcon } from './DynamicIcon.tsx';
import { SEOHead } from './SEOHead.tsx';

interface CatalogViewProps {
  onSelectService: (service: ServiceItem) => void;
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string | null) => void;
  onOpenContactModal: () => void;
}

export const CatalogView: React.FC<CatalogViewProps> = ({
  onSelectService,
  selectedCategory,
  onSelectCategory,
  onOpenContactModal,
}) => {
  const [filterSearch, setFilterSearch] = useState('');
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc' | 'rating'>('popular');

  // Filter services
  const filteredServices = ALL_SERVICES.filter((service) => {
    const matchesCat = selectedCategory ? service.category === selectedCategory : true;
    const matchesQuery = filterSearch.trim()
      ? service.name.toLowerCase().includes(filterSearch.toLowerCase()) ||
        service.shortDescription.toLowerCase().includes(filterSearch.toLowerCase()) ||
        service.seoKeywords.some((k) => k.toLowerCase().includes(filterSearch.toLowerCase()))
      : true;
    return matchesCat && matchesQuery;
  }).sort((a, b) => {
    if (sortBy === 'price-asc') return a.basePrice - b.basePrice;
    if (sortBy === 'price-desc') return b.basePrice - a.basePrice;
    if (sortBy === 'rating') return b.rating - a.rating;
    return b.reviewsCount - a.reviewsCount;
  });

  const activeCategoryMeta = CATEGORIES.find((c) => c.id === selectedCategory);

  return (
    <div className="space-y-12 pb-16">
      <SEOHead
        categoryName={activeCategoryMeta?.name}
        categoryId={selectedCategory || undefined}
        title={activeCategoryMeta ? `${activeCategoryMeta.name} Services - Verified & Aged Assets` : 'All Services Catalog - Verified Reviews & High Trust Accounts'}
        description={activeCategoryMeta ? `Browse all verified ${activeCategoryMeta.name} services. Instant delivery, 100% non-drop warranty, and residential IP authenticity.` : 'Browse our full catalog of 33+ verified reviews, bank accounts, PVA emails, VoIP numbers, and aged social profiles.'}
      />
      
      {/* HERO BANNER */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border-b border-slate-800/80 pt-12 pb-16 px-4 sm:px-6">
        {/* Glow ambient effects */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -right-24 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
          
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold shadow-lg shadow-emerald-950/40">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>24/7 Live SMM & Account Provider • Domain: {SITE_CONFIG.domain}</span>
          </div>

          {/* H1 Heading */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            Boost Rankings & Trust with <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400">
              Verified Reviews & Accounts
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Instant delivery of 5-star Google & TrustPilot reviews, verified PayPal & Cash App accounts, USA PVA Gmails, aged social profiles, and permanent negative review removal with non-drop warranty.
          </p>

          {/* Quick CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href={SITE_CONFIG.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 shadow-xl shadow-sky-950/50 transition-all transform active:scale-95"
            >
              <Send className="w-4 h-4" />
              <span>Telegram Support ({SITE_CONFIG.telegram})</span>
            </a>

            <a
              href={SITE_CONFIG.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-emerald-500/40 text-emerald-300 font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp: {SITE_CONFIG.whatsapp}</span>
            </a>
          </div>

          {/* Testing Notice Highlight Card */}
          <div className="max-w-xl mx-auto p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 flex items-center justify-center gap-2.5 shadow-md">
            <Zap className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="font-semibold">{SITE_CONFIG.testingNotice}</span>
          </div>

          {/* Trust Metric Counters */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 max-w-3xl mx-auto text-left">
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="text-xl font-black text-white">50,000+</div>
              <div className="text-[11px] text-slate-400">Orders Delivered</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="text-xl font-black text-emerald-400">1-Time Free</div>
              <div className="text-[11px] text-slate-400">Replacement Policy</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="text-xl font-black text-amber-400">4.95 / 5.0</div>
              <div className="text-[11px] text-slate-400">Customer Rating</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="text-xl font-black text-sky-400">USDT & BTC</div>
              <div className="text-[11px] text-slate-400">Instant Crypto Pay</div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORY SELECTOR CARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-black text-white">Browse by Category</h2>
            <p className="text-xs text-slate-400">Explore specialized services tailored to your scaling goals</p>
          </div>
          {selectedCategory && (
            <button
              onClick={() => onSelectCategory(null)}
              className="text-xs font-bold text-emerald-400 hover:underline"
            >
              Clear Category Filter
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            const count = ALL_SERVICES.filter((s) => s.category === cat.id).length;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(isSelected ? null : cat.id)}
                className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between group ${
                  isSelected
                    ? 'bg-emerald-950/50 border-emerald-500 text-white shadow-lg shadow-emerald-950/40'
                    : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                <div className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-emerald-400 mb-3 group-hover:scale-105 transition-transform">
                  <DynamicIcon name={cat.iconName} className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">
                    {cat.shortTitle}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    {count} {count === 1 ? 'Service' : 'Services'}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* FILTER & SERVICES CATALOG */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Controls Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800 mb-6">
          <div className="flex items-center gap-2 w-full md:w-auto">
            <span className="text-sm font-extrabold text-white">
              {activeCategoryMeta ? activeCategoryMeta.name : 'All Services Catalog'}
            </span>
            <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 text-xs font-semibold">
              {filteredServices.length} items
            </span>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            {/* Search within catalog */}
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                value={filterSearch}
                onChange={(e) => setFilterSearch(e.target.value)}
                placeholder="Filter services..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-emerald-500"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Services Grid */}
        {filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onSelectService={onSelectService}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-slate-900/40 rounded-3xl border border-slate-800 space-y-3">
            <p className="text-sm text-slate-400">
              No services found matching your search. Contact us directly on Telegram for custom orders!
            </p>
            <button
              onClick={() => {
                setFilterSearch('');
                onSelectCategory(null);
              }}
              className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>

      {/* REPLACEMENT WARRANTY & PROCESS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-indigo-950/40 border border-emerald-500/30">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/40">
              <ShieldCheck className="w-3.5 h-3.5" /> Ironclad Warranty & Fast Delivery
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Strict One-Time Replacement Warranty on All Review & Account Drops
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              We stand 100% behind the quality and persistence of our deliverables. If any review drops during its warranty duration (7, 15, or 30 days) or any account encounters login issues on first delivery, we will replace it immediately upon verification.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={onOpenContactModal}
                className="px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs uppercase tracking-wide flex items-center gap-2"
              >
                <span>Talk with 24/7 Specialist</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
