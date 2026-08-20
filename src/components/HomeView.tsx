import React from 'react';
import { 
  ShieldCheck, 
  Zap, 
  Star, 
  ArrowRight, 
  Send, 
  Phone, 
  Mail, 
  CheckCircle2, 
  Lock, 
  Clock, 
  Sparkles, 
  TrendingUp, 
  Award,
  Users,
  Check,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { CATEGORIES } from '../data/categories.ts';
import { ALL_SERVICES } from '../data/services.ts';
import { SITE_CONFIG } from '../data/constants.ts';
import { ServiceItem } from '../types/index.ts';
import { DynamicIcon } from './DynamicIcon.tsx';
import { useCart } from '../context/CartContext.tsx';

interface HomeViewProps {
  onSelectService: (service: ServiceItem) => void;
  onSelectCategory: (categoryId: string) => void;
  onViewAllCatalog: () => void;
  onOpenContactModal: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onSelectService,
  onSelectCategory,
  onViewAllCatalog,
  onOpenContactModal,
}) => {
  const { addToCart, setIsCartOpen } = useCart();

  // Curate 6 high-demand featured services for homepage
  const featuredServices = [
    ALL_SERVICES.find((s) => s.id === 'buy-google-reviews'),
    ALL_SERVICES.find((s) => s.id === 'google-negative-reviews-removal'),
    ALL_SERVICES.find((s) => s.id === 'buy-verified-paypal-account'),
    ALL_SERVICES.find((s) => s.id === 'buy-verified-cash-app-accounts'),
    ALL_SERVICES.find((s) => s.id === 'buy-google-local-guide-reviews'),
    ALL_SERVICES.find((s) => s.id === 'buy-github-accounts'),
  ].filter((s): s is ServiceItem => Boolean(s));

  const handleQuickBuy = (service: ServiceItem, e: React.MouseEvent) => {
    e.stopPropagation();
    const defaultTier = service.tiers.find((t) => t.isPopular) || service.tiers[0];
    addToCart({
      serviceId: service.id,
      serviceName: service.name,
      tierId: defaultTier.id,
      tierName: defaultTier.name,
      unitPrice: defaultTier.price,
      quantity: 1,
      warranty: service.warranty,
      category: service.categoryName,
      iconName: service.iconName,
    });
    setIsCartOpen(true);
  };

  return (
    <div className="space-y-16 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-12 sm:pt-14 sm:pb-20 border-b border-slate-800/60 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        {/* Subtle decorative glow circles */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/10 blur-[130px] pointer-events-none rounded-full" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-sky-500/10 blur-[120px] pointer-events-none rounded-full" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            
            {/* Left Content */}
            <div className="flex-1 text-center lg:text-left space-y-6">
              {/* Live Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-emerald-500/30 text-emerald-400 text-xs font-semibold shadow-lg shadow-emerald-950/40">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>#1 Trusted Provider for Reviews, Bank & SMM Accounts</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.15]">
                Dominate Local Search &{' '}
                <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400 bg-clip-text text-transparent">
                  Scale Online Business
                </span>{' '}
                with Verified Assets
              </h1>

              {/* Sub-headline */}
              <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Authentic 5-star Google & Trustpilot Reviews, negative review elimination, document-verified PayPal & Cash App accounts, USA PVA Gmails, and aged developer profiles with ironclad replacement warranties.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
                <button
                  onClick={onViewAllCatalog}
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-sm shadow-xl shadow-emerald-500/20 flex items-center gap-2 transition-all transform active:scale-95"
                >
                  <span>Explore All Services</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </button>

                <a
                  href={SITE_CONFIG.telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-sky-400 font-bold text-sm flex items-center gap-2 transition-all shadow-md"
                >
                  <Send className="w-4 h-4" />
                  <span>Chat on Telegram</span>
                </a>

                <a
                  href={SITE_CONFIG.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-emerald-400 font-bold text-sm flex items-center gap-2 transition-all shadow-md"
                >
                  <Phone className="w-4 h-4" />
                  <span>WhatsApp Live</span>
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-slate-300">
                <div className="flex items-center gap-2 bg-slate-900/60 border border-slate-800/80 rounded-lg p-2.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>1-Time Replacement Warranty</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-900/60 border border-slate-800/80 rounded-lg p-2.5">
                  <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Organic Drip-Feed System</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-900/60 border border-slate-800/80 rounded-lg p-2.5 col-span-2 sm:col-span-1">
                  <Lock className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>USDT TRC20 & BTC Direct</span>
                </div>
              </div>
            </div>

            {/* Right Card Showcase */}
            <div className="w-full lg:w-[440px] shrink-0">
              <div className="relative rounded-2xl bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 p-6 shadow-2xl space-y-5">
                
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-white text-sm">USASMMProvider Platform</div>
                      <div className="text-[11px] text-emerald-400 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Automated Queue Active
                      </div>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                    24/7 Online
                  </span>
                </div>

                {/* Live Stats Box */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-3 text-center">
                    <div className="text-2xl font-black text-white">50,000+</div>
                    <div className="text-[11px] text-slate-400 font-medium">Orders Delivered</div>
                  </div>
                  <div className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-3 text-center">
                    <div className="text-2xl font-black text-emerald-400">99.8%</div>
                    <div className="text-[11px] text-slate-400 font-medium">Retention Score</div>
                  </div>
                </div>

                {/* Quick Service Ticker Preview */}
                <div className="space-y-2.5">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Popular In-Demand Solutions
                  </div>

                  <button
                    onClick={() => {
                      const service = ALL_SERVICES.find((s) => s.id === 'buy-google-reviews');
                      if (service) onSelectService(service);
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl bg-slate-950/50 hover:bg-slate-800/60 border border-slate-800 text-left transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <DynamicIcon name="Google" className="w-6 h-6 shrink-0" />
                      <div>
                        <div className="text-xs font-bold text-slate-200 group-hover:text-emerald-300">
                          Google 5-Star Reviews
                        </div>
                        <div className="text-[10px] text-slate-400">30-Day Non-Drop Warranty</div>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-emerald-400">From $15</span>
                  </button>

                  <button
                    onClick={() => {
                      const service = ALL_SERVICES.find((s) => s.id === 'buy-verified-paypal-account');
                      if (service) onSelectService(service);
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl bg-slate-950/50 hover:bg-slate-800/60 border border-slate-800 text-left transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <DynamicIcon name="PayPal" className="w-6 h-6 shrink-0" />
                      <div>
                        <div className="text-xs font-bold text-slate-200 group-hover:text-emerald-300">
                          Verified PayPal Accounts
                        </div>
                        <div className="text-[10px] text-slate-400">SSN & Bank KYC Verified</div>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-emerald-400">From $80</span>
                  </button>

                  <button
                    onClick={() => {
                      const service = ALL_SERVICES.find((s) => s.id === 'google-negative-reviews-removal');
                      if (service) onSelectService(service);
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl bg-slate-950/50 hover:bg-slate-800/60 border border-slate-800 text-left transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <DynamicIcon name="Negative" className="w-6 h-6 shrink-0" />
                      <div>
                        <div className="text-xs font-bold text-slate-200 group-hover:text-rose-300">
                          Negative Review Removal
                        </div>
                        <div className="text-[10px] text-slate-400">100% Guaranteed Erasure</div>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-rose-400">$50/rev</span>
                  </button>
                </div>

                {/* Direct Consultation Box */}
                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Need custom volume?</span>
                  <button
                    onClick={onOpenContactModal}
                    className="text-emerald-400 font-bold hover:underline flex items-center gap-1"
                  >
                    Talk with Specialist <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Service Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-bold text-emerald-400 tracking-wider uppercase mb-1">
              Browse Categories
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Official SMM & Asset Categories
            </h2>
          </div>
          <button
            onClick={onViewAllCatalog}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-300 hover:text-emerald-400 transition-colors"
          >
            <span>View All ({ALL_SERVICES.length}) Services</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CATEGORIES.map((cat) => {
            const count = ALL_SERVICES.filter((s) => s.category === cat.id).length;
            return (
              <div
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className="group relative rounded-2xl bg-slate-900/70 hover:bg-slate-900 border border-slate-800 hover:border-emerald-500/40 p-5 transition-all cursor-pointer shadow-lg hover:shadow-emerald-950/30 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                      <DynamicIcon name={cat.iconName} className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                      {count} Services
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors mb-1.5">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {cat.tagline}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-emerald-400 group-hover:translate-x-1 transition-transform">
                  <span>Explore Category</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured & Best-Selling Services Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-bold text-amber-400 tracking-wider uppercase mb-1">
              Hand-Picked Solutions
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Featured & Best-Selling Packages
            </h2>
          </div>
          <p className="text-xs text-slate-400 max-w-md">
            Top rated by digital marketing agencies, local contractors, and online entrepreneurs worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredServices.map((service) => (
            <div
              key={service.id}
              onClick={() => onSelectService(service)}
              className="rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500/40 p-6 flex flex-col justify-between transition-all hover:shadow-xl hover:shadow-emerald-950/20 cursor-pointer group"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <DynamicIcon name={service.iconName} className="w-7 h-7" />
                  </div>
                  {service.badge && (
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      {service.badge}
                    </span>
                  )}
                </div>

                <div className="text-xs text-slate-400 font-medium mb-1">
                  {service.categoryName}
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors mb-2.5">
                  {service.name}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed line-clamp-3 mb-4">
                  {service.shortDescription}
                </p>

                {/* Rating & Warranty */}
                <div className="flex items-center gap-3 text-xs text-slate-300 mb-4 pb-4 border-b border-slate-800/80">
                  <div className="flex items-center text-amber-400 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400 mr-1" />
                    {service.rating}
                    <span className="text-slate-500 text-[10px] ml-1">({service.reviewsCount})</span>
                  </div>
                  <span className="text-slate-700">•</span>
                  <div className="flex items-center gap-1 text-emerald-400 font-medium text-[11px]">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{service.warranty}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Price & Actions */}
              <div className="flex items-center justify-between pt-2">
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Starting At</div>
                  <div className="text-xl font-black text-white">
                    ${service.basePrice}{' '}
                    <span className="text-xs font-normal text-slate-400">
                      /{service.tiers[0]?.unitLabel.replace('per ', '') || 'unit'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => handleQuickBuy(service, e)}
                    className="px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md transition-all active:scale-95"
                  >
                    Quick Order
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={onViewAllCatalog}
            className="px-8 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-white font-bold text-xs transition-all shadow-md inline-flex items-center gap-2"
          >
            <span>View Full Service Catalog</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* Why Choose USASMMProvider Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 p-8 sm:p-12 shadow-2xl">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
              Unrivaled Quality Standards
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white">
              Why 50,000+ Clients Choose USASMMProvider
            </h2>
            <p className="text-sm text-slate-400">
              We operate with strict enterprise standards, residential proxies, aged account reserves, and 24/7 dedicated human support.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="rounded-2xl bg-slate-950/60 border border-slate-800 p-6 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white">100% Replacement Warranty</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                If any review drops or any account has login difficulties during your warranty period, we provide an immediate one-time free replacement.
              </p>
            </div>

            <div className="rounded-2xl bg-slate-950/60 border border-slate-800 p-6 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white">Safe Drip-Feed Delivery</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Reviews and assets are delivered via natural interval scheduling to blend seamlessly with organic traffic and avoid automated filters.
              </p>
            </div>

            <div className="rounded-2xl bg-slate-950/60 border border-slate-800 p-6 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white">Instant Crypto Privacy</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Seamless TRC20 USDT and BTC cryptocurrency transactions ensure zero banking delays, maximum buyer privacy, and instant order dispatch.
              </p>
            </div>

            <div className="rounded-2xl bg-slate-950/60 border border-slate-800 p-6 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white">24/7 Human Live Support</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Live Telegram and WhatsApp agents are active round the clock to consult on custom guidelines, large orders, and technical handovers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - 4 Step Process */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold text-sky-400 uppercase tracking-widest">
            Fulfillment Workflow
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            How It Works in 4 Simple Steps
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="relative rounded-2xl bg-slate-900/60 border border-slate-800 p-6 space-y-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500 text-slate-950 font-black text-sm flex items-center justify-center">
              1
            </div>
            <h3 className="text-base font-bold text-white">Select Service & Tier</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Pick your desired service, warranty duration tier, and quantity. Input your target URL or custom requirements.
            </p>
          </div>

          <div className="relative rounded-2xl bg-slate-900/60 border border-slate-800 p-6 space-y-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500 text-slate-950 font-black text-sm flex items-center justify-center">
              2
            </div>
            <h3 className="text-base font-bold text-white">Instant Crypto Payment</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Pay securely via USDT (TRC20) or Bitcoin (BTC) address. Provide your TXID for automated or instant manual verification.
            </p>
          </div>

          <div className="relative rounded-2xl bg-slate-900/60 border border-slate-800 p-6 space-y-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500 text-slate-950 font-black text-sm flex items-center justify-center">
              3
            </div>
            <h3 className="text-base font-bold text-white">Immediate Dispatch</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Accounts and credentials are delivered instantly to your contact channel. Reviews are scheduled for organic drip-feed posting.
            </p>
          </div>

          <div className="relative rounded-2xl bg-slate-900/60 border border-slate-800 p-6 space-y-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500 text-slate-950 font-black text-sm flex items-center justify-center">
              4
            </div>
            <h3 className="text-base font-bold text-white">Warranty & Growth</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Enjoy rank increases and business growth backed by our replacement guarantee. Message Telegram for ongoing support.
            </p>
          </div>
        </div>
      </section>

      {/* Customer Reviews & Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
            Verified Feedback
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Client Success Testimonials
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-6 space-y-4">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <h3 className="text-sm font-bold text-white">
              &quot;Plumbing business ranked #1 on Google Maps&quot;
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              &quot;Ordered 20 Google Reviews with the 30-day warranty tier. Every single review stuck, and we received 35+ new customer calls in the first month. Excellent communication on Telegram.&quot;
            </p>
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold text-slate-200">Marcus Vance</span>
              <span>Dallas, USA</span>
            </div>
          </div>

          <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-6 space-y-4">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <h3 className="text-sm font-bold text-white">
              &quot;Shopify store TrustScore increased to 4.8&quot;
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              &quot;TrustPilot reviews were delivered with natural drip-feed spacing. Our cart abandonment dropped from 72% down to 54%. Delivered exactly as promised.&quot;
            </p>
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold text-slate-200">Julian Moreau</span>
              <span>Paris, France</span>
            </div>
          </div>

          <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-6 space-y-4">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <h3 className="text-sm font-bold text-white">
              &quot;Verified PayPal & Cash App worked flawlessly&quot;
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              &quot;Received all document scans, email passwords, and anti-detect cookie files. Logged in and transferred funds without triggering any security holds.&quot;
            </p>
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold text-slate-200">Trevor Bailey</span>
              <span>Miami, USA</span>
            </div>
          </div>
        </div>
      </section>

      {/* Prominent Direct 24/7 Specialist Contact Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-indigo-950 border border-emerald-500/30 p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
                <Zap className="w-3.5 h-3.5" /> Direct Human Consultation
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                Need Custom Bulk Packages or Test Orders?
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
                Our support team is online 24/7. Connect with us instantly on Telegram or WhatsApp for test samples, custom invoicing, and custom requirements.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href={SITE_CONFIG.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-black text-xs shadow-lg flex items-center gap-2 transition-all transform active:scale-95"
              >
                <Send className="w-4 h-4 stroke-[2.5]" />
                <span>Telegram: {SITE_CONFIG.telegram}</span>
              </a>

              <a
                href={SITE_CONFIG.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs shadow-lg flex items-center gap-2 transition-all transform active:scale-95"
              >
                <Phone className="w-4 h-4 stroke-[2.5]" />
                <span>WhatsApp: {SITE_CONFIG.whatsapp}</span>
              </a>

              <button
                onClick={onOpenContactModal}
                className="px-5 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-bold text-xs transition-all"
              >
                View All Contacts
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
