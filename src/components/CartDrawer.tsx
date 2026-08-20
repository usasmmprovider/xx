import React, { useState } from 'react';
import { 
  X, 
  ShoppingCart, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  ShieldCheck, 
  Tag, 
  Zap,
  Check
} from 'lucide-react';
import { useCart } from '../context/CartContext.tsx';
import { DynamicIcon } from './DynamicIcon.tsx';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    discount,
    totalPrice,
    promoCode,
    applyPromoCode,
    removePromoCode,
    setIsCheckoutOpen,
    clearCart,
  } = useCart();

  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');

  if (!isCartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    if (!promoInput.trim()) return;
    const success = applyPromoCode(promoInput);
    if (success) {
      setPromoInput('');
    } else {
      setPromoError('Invalid coupon code. Try "USA5" for 5% off or "VIP10" for 10% off.');
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-slate-950 border-l border-slate-800 text-white flex flex-col shadow-2xl">
          
          {/* Cart Header */}
          <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                <ShoppingCart className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-white">Your Shopping Cart</h3>
                <p className="text-[11px] text-slate-400">
                  {items.length} {items.length === 1 ? 'service item' : 'service items'}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-600">
                  <ShoppingCart className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-300">Your Cart is Empty</h4>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto mt-1">
                    Select Google reviews, verified bank accounts, or social packages to add to your order.
                  </p>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all"
                >
                  Explore Services Catalog
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={`${item.serviceId}-${item.tierId}`}
                  className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800/90 space-y-3 relative group"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                        <DynamicIcon name={item.iconName} className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white line-clamp-1">
                          {item.serviceName}
                        </h4>
                        <div className="text-[11px] text-emerald-400 font-medium">
                          Tier: {item.tierName}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {item.warranty}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.serviceId, item.tierId)}
                      className="text-slate-500 hover:text-rose-400 p-1 transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.serviceId, item.tierId, -1)}
                        className="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center text-xs"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-extrabold text-white w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.serviceId, item.tierId, 1)}
                        className="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center text-xs"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="text-sm font-black text-emerald-400">
                        ${item.unitPrice * item.quantity}
                      </span>
                      <span className="text-[10px] text-slate-500 block">
                        (${item.unitPrice} each)
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Cart Footer */}
          {items.length > 0 && (
            <div className="p-5 border-t border-slate-800 bg-slate-900/90 space-y-4">
              
              {/* Promo code form */}
              {promoCode ? (
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-xs">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold">
                    <Tag className="w-3.5 h-3.5" />
                    <span>Promo &apos;{promoCode}&apos; applied (-${discount})</span>
                  </div>
                  <button
                    onClick={removePromoCode}
                    className="text-[11px] text-slate-400 hover:text-white"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="space-y-1">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder="Promo code (e.g. USA5, VIP10)"
                      className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white uppercase placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                    <button
                      type="submit"
                      className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  {promoError && (
                    <p className="text-[10px] text-rose-400 mt-1">{promoError}</p>
                  )}
                </form>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">Subtotal:</span>
                  <span className="font-semibold">${subtotal}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount:</span>
                    <span className="font-bold">-${discount}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-black text-white pt-2 border-t border-slate-800">
                  <span>Total Amount:</span>
                  <span className="text-emerald-400 text-lg">${totalPrice}</span>
                </div>
              </div>

              {/* Proceed to Checkout Button */}
              <button
                onClick={handleProceedToCheckout}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/50 transition-all transform active:scale-98"
              >
                <Zap className="w-4 h-4 fill-slate-950" />
                <span>Proceed to Checkout (${totalPrice})</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-4 text-[10px] text-slate-400 pt-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" /> 1-Time Replacement
                </span>
                <span>•</span>
                <span>USDT TRC20 / BTC Instant</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
