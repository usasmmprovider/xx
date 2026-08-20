import React, { useState } from 'react';
import { 
  Star, 
  ShieldCheck, 
  Clock, 
  ArrowRight, 
  ShoppingCart, 
  Zap, 
  Check,
  Award
} from 'lucide-react';
import { ServiceItem } from '../types/index.ts';
import { useCart } from '../context/CartContext.tsx';
import { DynamicIcon } from './DynamicIcon.tsx';

interface ServiceCardProps {
  service: ServiceItem;
  onSelectService: (service: ServiceItem) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, onSelectService }) => {
  const { addToCart, setQuickBuyItem, setIsCheckoutOpen } = useCart();
  const [selectedTierIndex, setSelectedTierIndex] = useState(0);

  const currentTier = service.tiers[selectedTierIndex] || service.tiers[0];

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({
      serviceId: service.id,
      serviceName: service.name,
      tierId: currentTier.id,
      tierName: currentTier.name,
      unitPrice: currentTier.price,
      quantity: 1,
      warranty: service.warranty,
      category: service.categoryName,
      iconName: service.iconName,
    });
  };

  const handleQuickBuy = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuickBuyItem({
      serviceId: service.id,
      serviceName: service.name,
      tierId: currentTier.id,
      tierName: currentTier.name,
      unitPrice: currentTier.price,
      quantity: 1,
      warranty: service.warranty,
      category: service.categoryName,
      iconName: service.iconName,
    });
    setIsCheckoutOpen(true);
  };

  return (
    <div
      onClick={() => onSelectService(service)}
      className="group bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-2xl p-5 sm:p-6 transition-all duration-200 hover:-translate-y-1 shadow-lg hover:shadow-emerald-950/20 flex flex-col justify-between cursor-pointer relative"
    >
      {/* Top Meta Bar */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-emerald-400 group-hover:scale-105 group-hover:border-emerald-500/40 transition-all">
            <DynamicIcon name={service.iconName} className="w-5 h-5" />
          </div>

          <div className="flex flex-wrap items-center gap-1.5 justify-end">
            {service.badge && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-400/15 text-amber-300 border border-amber-400/30">
                {service.badge}
              </span>
            )}
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
              {service.categoryName}
            </span>
          </div>
        </div>

        {/* Product Name */}
        <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-emerald-400 transition-colors line-clamp-2 leading-snug">
          {service.name}
        </h3>

        {/* Rating & Trust Stars */}
        <div className="flex items-center gap-2 mt-1.5 mb-2.5">
          <div className="flex text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <span className="text-xs font-bold text-slate-200">{service.rating}</span>
          <span className="text-slate-600 text-xs">•</span>
          <span className="text-[11px] text-slate-400">({service.reviewsCount} reviews)</span>
        </div>

        {/* Short Description */}
        <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-4">
          {service.shortDescription}
        </p>

        {/* Key Features Bullet Snippet */}
        <div className="space-y-1.5 mb-4">
          {service.features.slice(0, 2).map((feat, idx) => (
            <div key={idx} className="flex items-center gap-1.5 text-[11px] text-slate-400 truncate">
              <Check className="w-3 h-3 text-emerald-400 shrink-0" />
              <span className="truncate">{feat}</span>
            </div>
          ))}
        </div>

        {/* Multi-tier pill selectors if more than 1 tier */}
        {service.tiers.length > 1 && (
          <div className="mb-4 pt-3 border-t border-slate-800/80">
            <div className="text-[10px] uppercase font-bold text-slate-400 mb-1.5">
              Available Tiers:
            </div>
            <div className="flex flex-wrap gap-1.5" onClick={(e) => e.stopPropagation()}>
              {service.tiers.map((tier, idx) => (
                <button
                  key={tier.id}
                  onClick={() => setSelectedTierIndex(idx)}
                  className={`text-[11px] px-2.5 py-1 rounded-lg font-medium transition-all ${
                    selectedTierIndex === idx
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold'
                      : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {tier.name.replace(/Review|Account/gi, '').trim()}: <strong className="text-emerald-400">${tier.price}</strong>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Price & Action Footer */}
      <div className="pt-4 border-t border-slate-800 mt-2">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div>
            <span className="text-[10px] text-slate-400 block font-medium">
              {currentTier.unitLabel || 'Package Price'}
            </span>
            <div className="text-xl font-black text-emerald-400">
              ${currentTier.price} <span className="text-[11px] text-slate-400 font-normal">USD</span>
            </div>
          </div>

          <div className="text-right text-[11px] text-slate-400">
            <span className="flex items-center gap-1 text-sky-400">
              <Clock className="w-3 h-3" /> {service.deliveryTime.split('(')[0]}
            </span>
            <span className="text-slate-500 text-[10px]">{service.warranty}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={handleQuickBuy}
            className="py-2.5 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs uppercase tracking-wide flex items-center justify-center gap-1.5 transition-colors shadow-md shadow-emerald-950/30"
          >
            <Zap className="w-3.5 h-3.5 fill-slate-950" />
            <span>Buy Now</span>
          </button>

          <button
            onClick={handleQuickAdd}
            className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs uppercase tracking-wide border border-slate-700 flex items-center justify-center gap-1.5 transition-colors"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};
