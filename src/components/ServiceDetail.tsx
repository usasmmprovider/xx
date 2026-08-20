import React, { useState } from 'react';
import { 
  Star, 
  Check, 
  ShieldCheck, 
  Clock, 
  ShoppingCart, 
  Send, 
  Phone, 
  Mail, 
  ChevronRight, 
  HelpCircle, 
  ChevronDown, 
  Sparkles, 
  Lock, 
  Zap, 
  ArrowRight,
  ThumbsUp,
  Award,
  CheckCircle2,
  AlertCircle,
  Copy,
  Plus,
  Minus,
  FileText,
  Layers,
  Shield,
  Truck,
  MessageCircle,
  ExternalLink,
  Search
} from 'lucide-react';
import { ServiceItem, ServiceTier, ServiceReview } from '../types/index.ts';
import { useCart } from '../context/CartContext.tsx';
import { SITE_CONFIG } from '../data/constants.ts';
import { getRelatedServices } from '../data/services.ts';
import { DynamicIcon } from './DynamicIcon.tsx';
import { SEOHead } from './SEOHead.tsx';
import { MarkdownRenderer } from './MarkdownRenderer.tsx';

interface ServiceDetailProps {
  service: ServiceItem;
  onSelectService: (service: ServiceItem) => void;
  onBackToCategory: (categoryId: string) => void;
  onOpenContactModal: () => void;
}

export const ServiceDetail: React.FC<ServiceDetailProps> = ({
  service,
  onSelectService,
  onBackToCategory,
  onOpenContactModal,
}) => {
  const { addToCart, setQuickBuyItem, setIsCheckoutOpen, setIsCartOpen } = useCart();
  
  // Selected Tier
  const [selectedTier, setSelectedTier] = useState<ServiceTier>(
    service.tiers.find((t) => t.isPopular) || service.tiers[0]
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [activeContentTab, setActiveContentTab] = useState<'guide' | 'specs' | 'warranty' | 'roadmap'>('guide');
  
  // FAQ accordion state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [faqSearchQuery, setFaqSearchQuery] = useState('');

  // Reviews filtering and form state
  const [selectedRatingFilter, setSelectedRatingFilter] = useState<number | 'all'>('all');
  const [isReviewFormOpen, setIsReviewFormOpen] = useState<boolean>(false);
  const [userReviews, setUserReviews] = useState<ServiceReview[]>(service.reviews);
  const [helpfulVotes, setHelpfulVotes] = useState<{ [id: string]: number }>({});
  const [votedReviews, setVotedReviews] = useState<{ [id: string]: boolean }>({});
  
  // Form fields
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewTitle, setNewReviewTitle] = useState('');
  const [newReviewContent, setNewReviewContent] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewCountry, setNewReviewCountry] = useState('USA');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const relatedServices = getRelatedServices(service);

  const unitPrice = selectedTier.price;
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    addToCart({
      serviceId: service.id,
      serviceName: service.name,
      tierId: selectedTier.id,
      tierName: selectedTier.name,
      unitPrice: selectedTier.price,
      quantity: quantity,
      warranty: service.warranty,
      category: service.categoryName,
      iconName: service.iconName,
    });
    setIsCartOpen(true);
  };

  const handleDirectBuy = () => {
    setQuickBuyItem({
      serviceId: service.id,
      serviceName: service.name,
      tierId: selectedTier.id,
      tierName: selectedTier.name,
      unitPrice: selectedTier.price,
      quantity: quantity,
      warranty: service.warranty,
      category: service.categoryName,
      iconName: service.iconName,
    });
    setIsCheckoutOpen(true);
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewContent.trim()) return;

    const newRev: ServiceReview = {
      id: 'rev-user-' + Date.now(),
      author: newReviewAuthor,
      title: newReviewTitle || 'High Quality & Fast Fulfillment',
      content: newReviewContent,
      rating: newReviewRating,
      date: new Date().toISOString().split('T')[0],
      verified: true,
      country: newReviewCountry || 'USA',
    };

    setUserReviews([newRev, ...userReviews]);
    setReviewSubmitted(true);
    setTimeout(() => {
      setIsReviewFormOpen(false);
      setReviewSubmitted(false);
      setNewReviewAuthor('');
      setNewReviewTitle('');
      setNewReviewContent('');
    }, 1800);
  };

  const toggleHelpfulVote = (reviewId: string) => {
    if (votedReviews[reviewId]) return;
    setHelpfulVotes((prev) => ({
      ...prev,
      [reviewId]: (prev[reviewId] || 0) + 1,
    }));
    setVotedReviews((prev) => ({
      ...prev,
      [reviewId]: true,
    }));
  };

  // Filter FAQs
  const filteredFaqs = service.faqs.filter(
    (f) =>
      f.question.toLowerCase().includes(faqSearchQuery.toLowerCase()) ||
      f.answer.toLowerCase().includes(faqSearchQuery.toLowerCase())
  );

  // Filter Reviews
  const filteredReviews = userReviews.filter((r) => {
    if (selectedRatingFilter === 'all') return true;
    return r.rating === selectedRatingFilter;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-24">
      <SEOHead service={service} />

      {/* 1. BREADCRUMB NAVIGATION */}
      <div className="border-b border-slate-800/80 bg-slate-900/50 backdrop-blur-md sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <nav className="flex items-center gap-2 text-xs text-slate-400 overflow-x-auto whitespace-nowrap scrollbar-none">
            <button
              onClick={() => onBackToCategory('')}
              className="hover:text-emerald-400 font-medium transition-colors flex items-center gap-1.5"
            >
              <span>Home</span>
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
            <button
              onClick={() => onBackToCategory(service.category)}
              className="hover:text-emerald-400 font-medium transition-colors"
            >
              {service.categoryName}
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
            <span className="text-emerald-400 font-semibold truncate">{service.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8">
        
        {/* 2. TOP PRODUCT CARD HERO CONTAINER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* LEFT COLUMN: Header, Badges, Short Summary, Key Features, Warranty Highlights */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Badges Bar */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <DynamicIcon name={service.iconName} className="w-4 h-4" />
              </div>

              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                {service.categoryName}
              </span>

              {service.badge && (
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  {service.badge}
                </span>
              )}

              <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-800/80 text-slate-300 border border-slate-700/80 flex items-center gap-1">
                <Clock className="w-3 h-3 text-sky-400" />
                {service.deliveryTime}
              </span>

              <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-800/80 text-slate-300 border border-slate-700/80 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                {service.warranty}
              </span>
            </div>

            {/* PRODUCT TITLE (H1) */}
            <div>
              <h1 className="text-2xl sm:text-4xl lg:text-4.5xl font-black text-white tracking-tight leading-tight">
                {service.h1Title || service.name}
              </h1>
              <p className="text-xs text-slate-400 mt-2 font-mono">
                SKU / ID: <span className="text-emerald-400">{service.id}</span> • Delivery Protocol: <span className="text-slate-300">Natural Drip & Direct Handover</span>
              </p>
            </div>

            {/* Rating Stars & Customer Metrics */}
            <div className="flex flex-wrap items-center gap-3 py-3 border-y border-slate-800/80">
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-sm font-extrabold text-white">{service.rating} / 5.0</span>
              <span className="text-slate-600 text-xs">•</span>
              <span className="text-xs text-slate-300 font-medium">
                {service.reviewsCount} Verified Customer Orders
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-950/50 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                <CheckCircle2 className="w-3 h-3" /> 100% Non-Drop Guaranteed
              </span>
            </div>

            {/* EXECUTIVE SUMMARY CARD */}
            <div className="bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-slate-950 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 fill-emerald-400" /> Service Summary & Strategic Value
                </span>
                <span className="text-[11px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                  Instant Activation
                </span>
              </div>

              <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
                {service.shortDescription}
              </p>
            </div>

            {/* KEY FEATURES & DELIVERABLES */}
            <div className="bg-slate-900/50 border border-slate-800/80 rounded-2xl p-5 sm:p-6">
              <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-white mb-4 flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400" /> What Is Included With This Service:
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {service.features.map((feature, idx) => (
                  <div 
                    key={idx} 
                    className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/60 text-xs sm:text-[13px] text-slate-200 hover:border-slate-700 transition-colors"
                  >
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-500/40">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                    <span className="leading-tight">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* WARRANTY & REPLACEMENT GUARANTEE CALLOUT */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-indigo-950/40 border border-emerald-500/30 flex items-start gap-3.5 shadow-lg">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/40">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <div className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                  <span>100% Replacement Warranty & Retention Protection</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 uppercase font-extrabold">Active Guarantee</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  We guarantee full fulfillment and non-drop longevity. In the rare event of a drop during your warranty period ({service.warranty}), our support team provides a <strong>one-time free replacement</strong> upon request via Telegram or WhatsApp.
                </p>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Interactive Tier Selection, Quantity, Price, Buy & Contact */}
          <div className="lg:col-span-5 sticky top-24">
            <div className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 shadow-2xl shadow-emerald-950/20 space-y-6">
              
              {/* Box Title */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                    <ShoppingCart className="w-4 h-4 text-emerald-400" />
                    Configure Order
                  </h3>
                  <span className="text-[11px] text-slate-400">Select package tier and quantity</span>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  Instant Crypto Dispatch
                </span>
              </div>

              {/* Tier Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2.5 flex items-center justify-between">
                  <span>1. Choose Warranty & Service Tier:</span>
                  <span className="text-[10px] font-normal text-emerald-400">
                    {service.tiers.length} Options Available
                  </span>
                </label>
                
                <div className="space-y-2.5">
                  {service.tiers.map((tier) => {
                    const isSelected = selectedTier.id === tier.id;
                    return (
                      <button
                        key={tier.id}
                        onClick={() => setSelectedTier(tier)}
                        className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                          isSelected
                            ? 'bg-emerald-950/40 border-emerald-500 text-white shadow-lg shadow-emerald-950/50 ring-1 ring-emerald-500/40'
                            : 'bg-slate-950/80 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                              isSelected
                                ? 'border-emerald-400 bg-emerald-500'
                                : 'border-slate-600 bg-slate-800'
                            }`}
                          >
                            {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-slate-950" />}
                          </div>
                          <div>
                            <div className="text-xs sm:text-sm font-bold flex items-center gap-2">
                              <span>{tier.name}</span>
                              {tier.badge && (
                                <span className="text-[9px] font-black uppercase px-1.5 py-0.2 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30">
                                  {tier.badge}
                                </span>
                              )}
                            </div>
                            {tier.limit && (
                              <div className="text-[11px] text-emerald-400 font-medium mt-0.5">
                                Limit: {tier.limit}
                              </div>
                            )}
                            {tier.warrantyDays && (
                              <div className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-1">
                                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                                {tier.warrantyDays}-Days Warranty Period
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <div className="text-lg font-black text-emerald-400">
                            ${tier.price}
                          </div>
                          <div className="text-[10px] text-slate-400">
                            {tier.unitLabel || 'per unit'}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center justify-between bg-slate-950/80 border border-slate-800 rounded-2xl p-3.5">
                <div>
                  <span className="text-xs font-bold text-slate-200 uppercase tracking-wide block">
                    2. Order Quantity:
                  </span>
                  <span className="text-[10px] text-slate-400">
                    (${unitPrice} × {quantity} units)
                  </span>
                </div>
                
                <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 rounded-xl p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-center font-bold transition-colors disabled:opacity-30"
                    disabled={quantity <= 1}
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-8 text-center text-sm font-extrabold text-white">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-center font-bold transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* PRICE CALCULATION SUMMARY */}
              <div className="pt-3 border-t border-slate-800">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-slate-400 uppercase font-semibold">Total Order Amount:</span>
                  <div className="text-right">
                    <span className="text-3xl font-black text-emerald-400 tracking-tight">
                      ${totalPrice}
                    </span>
                    <span className="text-xs text-slate-400 ml-1.5 font-bold">USD</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1">
                  <span>Accepted Currencies:</span>
                  <span className="text-emerald-300 font-mono">USDT (TRC20) • BTC • ETH</span>
                </div>
              </div>

              {/* ACTION BUTTONS: BUY NOW & ADD TO CART */}
              <div className="space-y-3 pt-1">
                {/* Buy Now / Instant Checkout */}
                <button
                  onClick={handleDirectBuy}
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-sm uppercase tracking-wider shadow-xl shadow-emerald-500/25 transition-all transform active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Zap className="w-4 h-4 fill-slate-950" />
                  <span>Instant Checkout (${totalPrice})</span>
                </button>

                {/* Add to Shopping Cart */}
                <button
                  onClick={handleAddToCart}
                  className="w-full py-3 px-6 rounded-2xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 font-bold text-xs uppercase tracking-wider border border-slate-700 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Add to Shopping Cart</span>
                </button>
              </div>

              {/* DIRECT CONTACT CHANNELS */}
              <div className="pt-4 border-t border-slate-800/80 space-y-2.5">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider text-center flex items-center justify-center gap-1.5">
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Need Custom Requirements or Test Samples?</span>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={SITE_CONFIG.telegramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-sky-950/50 border border-sky-500/40 text-sky-300 hover:bg-sky-900/60 transition-colors text-xs font-bold shadow-md shadow-sky-950/30"
                  >
                    <Send className="w-3.5 h-3.5 text-sky-400" />
                    <span>Telegram Live</span>
                  </a>

                  <a
                    href={SITE_CONFIG.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-emerald-950/50 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/60 transition-colors text-xs font-bold shadow-md shadow-emerald-950/30"
                  >
                    <Phone className="w-3.5 h-3.5 text-emerald-400" />
                    <span>WhatsApp Direct</span>
                  </a>
                </div>

                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200 transition-colors text-[11px]"
                >
                  <Mail className="w-3 h-3 text-amber-400" />
                  <span>Email: {SITE_CONFIG.email}</span>
                </a>
              </div>

              {/* Testing Notice Highlight Card */}
              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-2.5 text-xs text-amber-200">
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span className="leading-snug">{SITE_CONFIG.testingNotice}</span>
              </div>

            </div>
          </div>
        </div>

        {/* 3. COMPREHENSIVE MAIN CONTENT SECTION WITH STRUCTURED TABS & BEAUTIFUL MARKDOWN */}
        <section className="mb-16 bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          
          {/* Section Heading */}
          <div className="max-w-4xl mb-8">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-extrabold uppercase tracking-widest mb-2">
              <Sparkles className="w-4 h-4" /> In-Depth Documentation & Technical Specifications
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-3.5xl font-black text-white">
              Complete Guide & Service Overview: {service.name}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Detailed breakdown of delivery protocols, safety criteria, non-drop algorithms, and warranty conditions.
            </p>
          </div>

          {/* Interactive Navigation Tabs */}
          <div className="flex items-center gap-2 border-b border-slate-800 pb-4 mb-8 overflow-x-auto whitespace-nowrap scrollbar-none">
            <button
              onClick={() => setActiveContentTab('guide')}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
                activeContentTab === 'guide'
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Full Service Guide</span>
            </button>

            <button
              onClick={() => setActiveContentTab('specs')}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
                activeContentTab === 'specs'
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Technical Deliverables</span>
            </button>

            <button
              onClick={() => setActiveContentTab('warranty')}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
                activeContentTab === 'warranty'
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <Shield className="w-4 h-4" />
              <span>Replacement Warranty Terms</span>
            </button>

            <button
              onClick={() => setActiveContentTab('roadmap')}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
                activeContentTab === 'roadmap'
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <Truck className="w-4 h-4" />
              <span>Delivery Workflow</span>
            </button>
          </div>

          {/* TAB 1: FULL MARKDOWN SERVICE GUIDE */}
          {activeContentTab === 'guide' && (
            <div className="max-w-4xl">
              <MarkdownRenderer content={service.mainDescription} />
            </div>
          )}

          {/* TAB 2: TECHNICAL SPECIFICATIONS & DELIVERABLES */}
          {activeContentTab === 'specs' && (
            <div className="max-w-4xl space-y-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-emerald-400" />
                Package Deliverables & Infrastructure Architecture
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="text-emerald-400 font-bold text-sm flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" /> Credentials & Master File Handover
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Full root access provided including primary verified email, master passwords, 2FA backup codes, security question answers, and associated phone access.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="text-emerald-400 font-bold text-sm flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" /> Anti-Detect Profile & JSON Cookies
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Exported authenticated browser cookies (.json / .netscape) compatible with Dolphin Anty, AdsPower, Multilogin, and GoLogin for 1-click seamless session injection.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="text-emerald-400 font-bold text-sm flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" /> Real Geo-Targeted Residential IPs
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Accounts and reviews are nurtured through genuine residential and 4G mobile proxy subnets to ensure high trust score and zero algorithmic fraud flagging.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="text-emerald-400 font-bold text-sm flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" /> Complete KYC & Identity Dossier
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    For bank and wallet accounts, high-resolution scans of original identity documents (SSN/ITIN proof, ID/Passport, Utility proof) are supplied upon request.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: WARRANTY & REPLACEMENT POLICY */}
          {activeContentTab === 'warranty' && (
            <div className="max-w-4xl space-y-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Shield className="w-5 h-5 text-emerald-400" />
                Replacement Warranty & Non-Drop Security Policy
              </h3>

              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-base">
                  <ShieldCheck className="w-5 h-5" /> 100% One-Time Free Replacement Guarantee
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  We stand 100% behind the durability and quality of our services. Under our standard warranty terms:
                </p>

                <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                  <li className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                      ✓
                    </div>
                    <span><strong>Duration:</strong> Covered under your active package period ({service.warranty}).</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                      ✓
                    </div>
                    <span><strong>Coverage:</strong> If any review drops or an account fails during standard setup with compliant proxies, we issue a one-time free replacement within 24–48 hours.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                      ✓
                    </div>
                    <span><strong>How to Claim:</strong> Contact our live operators on Telegram <code>@usasmmprovider</code> or WhatsApp <code>+1 (863) 450-9215</code> with your Order ID and listing link.</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* TAB 4: DELIVERY WORKFLOW ROADMAP */}
          {activeContentTab === 'roadmap' && (
            <div className="max-w-4xl space-y-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Truck className="w-5 h-5 text-emerald-400" />
                4-Step Order Fulfillment Roadmap
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 relative">
                  <span className="w-7 h-7 rounded-full bg-emerald-500 text-slate-950 font-black text-xs flex items-center justify-center">1</span>
                  <h4 className="text-sm font-bold text-white">Order & Details</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Submit your target link, custom keywords, or specifications during checkout.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 relative">
                  <span className="w-7 h-7 rounded-full bg-emerald-500 text-slate-950 font-black text-xs flex items-center justify-center">2</span>
                  <h4 className="text-sm font-bold text-white">Automated Queue</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Our system assigns aged residential profiles and pre-warms the session.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 relative">
                  <span className="w-7 h-7 rounded-full bg-emerald-500 text-slate-950 font-black text-xs flex items-center justify-center">3</span>
                  <h4 className="text-sm font-bold text-white">Gradual Drip-Feed</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Delivered naturally over organic intervals to ensure 100% filter safety.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 relative">
                  <span className="w-7 h-7 rounded-full bg-emerald-500 text-slate-950 font-black text-xs flex items-center justify-center">4</span>
                  <h4 className="text-sm font-bold text-white">Live Verification</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Full verification report and tracking link sent via Telegram or email.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 3 Pillars Footer Inside Guide */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-8 mt-8 border-t border-slate-800">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80">
              <div className="text-emerald-400 font-bold text-xs uppercase tracking-wide mb-1 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" /> 100% Safe Delivery Pacing
              </div>
              <p className="text-xs text-slate-400">
                Natural interval drip-feed algorithms prevent automated trigger spikes and ensure lifelong retention.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80">
              <div className="text-sky-400 font-bold text-xs uppercase tracking-wide mb-1 flex items-center gap-1.5">
                <Zap className="w-4 h-4" /> Rapid Handover & Dispatch
              </div>
              <p className="text-xs text-slate-400">
                Orders are queued instantly after crypto confirmation with dedicated SMM specialist oversight.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80">
              <div className="text-amber-400 font-bold text-xs uppercase tracking-wide mb-1 flex items-center gap-1.5">
                <Award className="w-4 h-4" /> One-Time Replacement
              </div>
              <p className="text-xs text-slate-400">
                Full protection policy guarantees prompt replacement if any drops occur during active warranty.
              </p>
            </div>
          </div>
        </section>

        {/* 4. FREQUENTLY ASKED QUESTIONS SECTION */}
        <section className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20 mb-2">
              <HelpCircle className="w-3.5 h-3.5" /> Frequently Asked Questions
            </div>
            <h2 className="text-2xl sm:text-3.5xl font-black text-white">
              Questions About {service.name}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Everything you need to know about delivery speed, safety policies, warranty terms, and account specifications.
            </p>
          </div>

          {/* FAQ Search Bar if 4+ questions */}
          {service.faqs.length > 3 && (
            <div className="max-w-xl mx-auto mb-6">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={faqSearchQuery}
                  onChange={(e) => setFaqSearchQuery(e.target.value)}
                  placeholder="Search FAQ questions..."
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          )}

          <div className="max-w-4xl mx-auto space-y-3">
            {filteredFaqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden transition-colors hover:border-slate-700"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span className="text-sm sm:text-base font-bold text-slate-100 flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-emerald-500/15 text-emerald-400 text-xs font-black flex items-center justify-center shrink-0">
                        {index + 1}
                      </span>
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-emerald-400 transition-transform duration-200 shrink-0 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 bg-slate-950/40">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Quick Help Card */}
          <div className="max-w-2xl mx-auto mt-8 p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-center space-y-2">
            <p className="text-xs text-slate-300">
              Have a question not listed here? Talk to our 24/7 support specialist.
            </p>
            <div className="flex items-center justify-center gap-3">
              <a
                href={SITE_CONFIG.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-sky-400 hover:underline flex items-center gap-1"
              >
                <Send className="w-3 h-3" /> Telegram @{SITE_CONFIG.telegram}
              </a>
              <span className="text-slate-600">•</span>
              <a
                href={SITE_CONFIG.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-emerald-400 hover:underline flex items-center gap-1"
              >
                <Phone className="w-3 h-3" /> WhatsApp {SITE_CONFIG.whatsapp}
              </a>
            </div>
          </div>
        </section>

        {/* 5. CUSTOMER REVIEWS & RATINGS SECTION */}
        <section className="mb-16 bg-slate-900/40 border border-slate-800 rounded-3xl p-6 sm:p-10">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl sm:text-3.5xl font-black text-white">
                  Verified Customer Reviews
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold">
                  {userReviews.length} Reviews
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Real feedback from verified purchasers who scaled their business with {service.name}.
              </p>
            </div>

            <button
              onClick={() => setIsReviewFormOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/20 cursor-pointer"
            >
              <ThumbsUp className="w-3.5 h-3.5" />
              <span>Write a Review</span>
            </button>
          </div>

          {/* Rating Summary Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-6 rounded-2xl bg-slate-950 border border-slate-800 mb-8 items-center">
            <div className="text-center sm:border-r border-slate-800">
              <div className="text-4xl font-black text-white">{service.rating}</div>
              <div className="flex justify-center text-amber-400 my-1.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <div className="text-xs text-slate-400">Based on {service.reviewsCount} verified orders</div>
            </div>

            <div className="sm:col-span-2 space-y-1.5 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-12 text-slate-300 font-semibold">5 Stars</span>
                <div className="flex-1 h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div className="h-full bg-emerald-400 rounded-full w-[94%]" />
                </div>
                <span className="w-8 text-right font-mono">94%</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-12 text-slate-300 font-semibold">4 Stars</span>
                <div className="flex-1 h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full w-[5%]" />
                </div>
                <span className="w-8 text-right font-mono">5%</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-12 text-slate-300 font-semibold">3 Stars</span>
                <div className="flex-1 h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full w-[1%]" />
                </div>
                <span className="w-8 text-right font-mono">1%</span>
              </div>
            </div>
          </div>

          {/* Rating Filter Tabs */}
          <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => setSelectedRatingFilter('all')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                selectedRatingFilter === 'all'
                  ? 'bg-slate-700 text-white'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200'
              }`}
            >
              All ({userReviews.length})
            </button>
            <button
              onClick={() => setSelectedRatingFilter(5)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors flex items-center gap-1 ${
                selectedRatingFilter === 5
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>5 Stars</span>
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            </button>
            <button
              onClick={() => setSelectedRatingFilter(4)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors flex items-center gap-1 ${
                selectedRatingFilter === 4
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>4 Stars</span>
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            </button>
          </div>

          {/* Reviews List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredReviews.map((review) => (
              <div
                key={review.id}
                className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-xs font-black text-slate-950 uppercase">
                        {review.author.charAt(0)}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white flex items-center gap-1.5">
                          <span>{review.author}</span>
                          {review.verified && (
                            <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-0.5 bg-emerald-950/60 px-1.5 py-0.2 rounded border border-emerald-500/20">
                              <CheckCircle2 className="w-2.5 h-2.5" /> Verified Order
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] text-slate-400">{review.country} • {review.date}</div>
                      </div>
                    </div>

                    <div className="flex text-amber-400">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-100 mb-1">
                      {review.title}
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      &quot;{review.content}&quot;
                    </p>
                  </div>
                </div>

                {/* Helpful button */}
                <div className="pt-2 border-t border-slate-900 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Verified Purchase</span>
                  <button
                    onClick={() => toggleHelpfulVote(review.id)}
                    className={`flex items-center gap-1 text-[11px] px-2 py-0.5 rounded transition-colors ${
                      votedReviews[review.id]
                        ? 'text-emerald-400 bg-emerald-950/40'
                        : 'hover:text-slate-200'
                    }`}
                  >
                    <ThumbsUp className="w-3 h-3" />
                    <span>Helpful ({helpfulVotes[review.id] || 0})</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Write Review Modal */}
          {isReviewFormOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
              <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-7 space-y-4 shadow-2xl">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white">Write a Verified Customer Review</h3>
                  <button
                    onClick={() => setIsReviewFormOpen(false)}
                    className="text-slate-400 hover:text-white p-1"
                  >
                    ✕
                  </button>
                </div>

                {reviewSubmitted ? (
                  <div className="py-8 text-center space-y-2">
                    <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
                    <h4 className="text-base font-bold text-white">Thank You for Your Feedback!</h4>
                    <p className="text-xs text-slate-400">Your review has been verified and posted.</p>
                  </div>
                ) : (
                  <form onSubmit={handleAddReview} className="space-y-3.5">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Your Name / Business</label>
                      <input
                        type="text"
                        required
                        value={newReviewAuthor}
                        onChange={(e) => setNewReviewAuthor(e.target.value)}
                        placeholder="e.g., Brandon M. or TechAgency LLC"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Country / Region</label>
                        <input
                          type="text"
                          value={newReviewCountry}
                          onChange={(e) => setNewReviewCountry(e.target.value)}
                          placeholder="e.g. USA, UK, Canada"
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Rating</label>
                        <div className="flex items-center gap-1 text-amber-400 pt-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              type="button"
                              key={star}
                              onClick={() => setNewReviewRating(star)}
                              className="p-0.5 focus:outline-none cursor-pointer"
                            >
                              <Star
                                className={`w-5 h-5 ${
                                  star <= newReviewRating
                                    ? 'fill-amber-400 text-amber-400'
                                    : 'text-slate-700'
                                }`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Review Headline</label>
                      <input
                        type="text"
                        value={newReviewTitle}
                        onChange={(e) => setNewReviewTitle(e.target.value)}
                        placeholder="e.g., Fast delivery & immediate ranking boost"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Detailed Review Content</label>
                      <textarea
                        required
                        rows={3}
                        value={newReviewContent}
                        onChange={(e) => setNewReviewContent(e.target.value)}
                        placeholder="Share your experience with delivery speed, warranty support, and quality..."
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black uppercase tracking-wider cursor-pointer transition-colors"
                    >
                      Post Verified Review
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}
        </section>

        {/* 6. RELATED SERVICES SHOWCASE */}
        {relatedServices.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  Related Services You Might Need
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Frequently bundled with {service.name} for maximum growth.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedServices.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => {
                    onSelectService(rel);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="group bg-slate-900/60 border border-slate-800 hover:border-emerald-500/50 rounded-2xl p-5 cursor-pointer transition-all hover:-translate-y-1 shadow-lg hover:shadow-emerald-950/30 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-emerald-400 group-hover:border-emerald-500/40">
                        <DynamicIcon name={rel.iconName} className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                        {rel.categoryName}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors line-clamp-2">
                      {rel.name}
                    </h3>
                    
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {rel.shortDescription}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400">Starting from</span>
                      <div className="text-base font-extrabold text-emerald-400">
                        ${rel.basePrice}
                      </div>
                    </div>

                    <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      View Service <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

      </div>

      {/* 7. MOBILE FLOATING ACTION BAR */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 p-3 px-4 shadow-2xl flex items-center justify-between gap-3">
        <div>
          <span className="text-[10px] text-slate-400 block uppercase font-semibold">Total Price:</span>
          <span className="text-xl font-black text-emerald-400">${totalPrice}</span>
          <span className="text-[10px] text-slate-400 ml-1 font-mono">USD</span>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={SITE_CONFIG.telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-sky-950 border border-sky-500/40 text-sky-400 flex items-center justify-center"
            title="Chat on Telegram"
          >
            <Send className="w-4 h-4" />
          </a>

          <button
            onClick={handleDirectBuy}
            className="py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase tracking-wide flex items-center gap-1.5 shadow-lg shadow-emerald-500/20"
          >
            <Zap className="w-3.5 h-3.5 fill-slate-950" />
            <span>Buy Now</span>
          </button>
        </div>
      </div>

    </div>
  );
};
