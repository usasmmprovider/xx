import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Copy, 
  Check, 
  Send, 
  Phone, 
  Mail, 
  CheckCircle2, 
  ExternalLink,
  QrCode,
  Zap,
  Lock,
  ArrowRight,
  Printer
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../context/CartContext.tsx';
import { SITE_CONFIG } from '../data/constants.ts';
import { OrderDetails } from '../types/index.ts';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    quickBuyItem,
    items,
    totalPrice,
    submitOrder,
    setQuickBuyItem,
  } = useCart();

  const checkoutItems = quickBuyItem ? [quickBuyItem] : items;

  const [paymentMethod, setPaymentMethod] = useState<'USDT_TRC20' | 'BTC'>('USDT_TRC20');
  const [contactMethod, setContactMethod] = useState<'telegram' | 'whatsapp' | 'email'>('telegram');
  const [contactValue, setContactValue] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerNote, setCustomerNote] = useState('');
  const [txHash, setTxHash] = useState('');
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [completedOrder, setCompletedOrder] = useState<OrderDetails | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCheckoutOpen) return null;

  const activeWalletAddress =
    paymentMethod === 'USDT_TRC20'
      ? SITE_CONFIG.crypto.usdtTrc20
      : SITE_CONFIG.crypto.btc;

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactValue.trim() || !customerEmail.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const order = submitOrder({
        paymentMethod,
        cryptoAddress: activeWalletAddress,
        transactionHash: txHash.trim(),
        contactMethod,
        contactValue: contactValue.trim(),
        customerEmail: customerEmail.trim(),
        customerNote: customerNote.trim(),
      });

      setCompletedOrder(order);
      setIsSubmitting(false);

      // Trigger Confetti Celebration
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (err) {
        console.log(err);
      }
    }, 600);
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setCompletedOrder(null);
    setQuickBuyItem(null);
  };

  // Generate Telegram forward URL
  const generateTelegramForwardUrl = (order: OrderDetails) => {
    const summaryItems = order.items
      .map((i) => `• ${i.quantity}x ${i.serviceName} (${i.tierName}) - $${i.unitPrice * i.quantity}`)
      .join('\n');
    
    const text = encodeURIComponent(
      `🔔 *NEW ORDER: #${order.orderId}*\n\n` +
      `👤 *Client Contact:* ${order.contactValue} (${order.contactMethod})\n` +
      `📧 *Email:* ${order.customerEmail}\n\n` +
      `📦 *Items:*\n${summaryItems}\n\n` +
      `💰 *Total Amount:* $${order.totalAmount} USD\n` +
      `💳 *Payment Method:* ${order.paymentMethod}\n` +
      (order.transactionHash ? `🔗 *TxID / Hash:* ${order.transactionHash}\n` : '') +
      (order.customerNote ? `📝 *Notes/URL:* ${order.customerNote}\n` : '') +
      `\nPlease confirm and initiate delivery!`
    );
    return `https://t.me/usasmmprovider?text=${text}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto text-white shadow-2xl relative">
        
        {/* Modal Close */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {completedOrder ? (
          /* SUCCESS SCREEN */
          <div className="p-6 sm:p-10 space-y-6 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500/20">
                Order Registered Successfully
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
                Order #{completedOrder.orderId}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto mt-1">
                Your order is currently processing. Forward your order ID to our 24/7 Telegram support for prioritized instant delivery.
              </p>
            </div>

            {/* Order Summary Box */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 text-left space-y-3">
              <div className="flex justify-between items-center pb-2 border-b border-slate-800 text-xs">
                <span className="text-slate-400">Total Payable:</span>
                <span className="text-lg font-black text-emerald-400">${completedOrder.totalAmount} USD</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Payment Network:</span>
                <span className="font-semibold text-slate-200">{completedOrder.paymentMethod}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Contact Handle:</span>
                <span className="font-semibold text-slate-200">{completedOrder.contactValue}</span>
              </div>

              <div className="pt-2 border-t border-slate-800">
                <div className="text-[11px] font-bold text-slate-400 uppercase mb-1.5">Order Items:</div>
                <div className="space-y-1">
                  {completedOrder.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-xs text-slate-300">
                      <span>{item.quantity}x {item.serviceName} ({item.tierName})</span>
                      <span className="font-mono text-emerald-400">${item.unitPrice * item.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Fast Action Buttons */}
            <div className="space-y-3 pt-2">
              <a
                href={generateTelegramForwardUrl(completedOrder)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-extrabold text-sm uppercase tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-sky-950/50 transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Send Order Confirmation to Telegram (@usasmmprovider)</span>
              </a>

              <a
                href={SITE_CONFIG.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-6 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/60 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>Notify via WhatsApp {SITE_CONFIG.whatsapp}</span>
              </a>
            </div>

            <button
              onClick={handleClose}
              className="text-xs text-slate-400 hover:text-white"
            >
              Close & Return to Catalog
            </button>
          </div>
        ) : (
          /* CHECKOUT FORM */
          <form onSubmit={handleCompleteOrder} className="p-6 sm:p-8 space-y-6">
            
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">
                <Lock className="w-3.5 h-3.5" /> Secure Crypto Checkout
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                Complete Your Order (${totalPrice} USD)
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Transfer crypto to the official USASMMProvider address and provide your contact handle.
              </p>
            </div>

            {/* 1. PAYMENT METHOD SELECTOR */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                1. Select Payment Currency:
              </label>
              
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('USDT_TRC20')}
                  className={`p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all ${
                    paymentMethod === 'USDT_TRC20'
                      ? 'bg-emerald-950/50 border-emerald-500 text-white shadow-md'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="font-extrabold text-xs sm:text-sm text-emerald-400">USDT (TRC20)</div>
                    <div className="text-[10px] text-slate-400">Tron Network • Lowest Fees</div>
                  </div>
                  {paymentMethod === 'USDT_TRC20' && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('BTC')}
                  className={`p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all ${
                    paymentMethod === 'BTC'
                      ? 'bg-amber-950/50 border-amber-500 text-white shadow-md'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="font-extrabold text-xs sm:text-sm text-amber-400">BTC (Bitcoin)</div>
                    <div className="text-[10px] text-slate-400">Bitcoin Mainnet</div>
                  </div>
                  {paymentMethod === 'BTC' && (
                    <CheckCircle2 className="w-4 h-4 text-amber-400" />
                  )}
                </button>
              </div>
            </div>

            {/* 2. CRYPTO ADDRESS & COPY BOX */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <QrCode className="w-4 h-4 text-emerald-400" />
                  Send exactly <strong className="text-emerald-400">${totalPrice} USD</strong> to this address:
                </span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                  {paymentMethod === 'USDT_TRC20' ? 'TRC20 Network' : 'BTC Network'}
                </span>
              </div>

              {/* Wallet String & Copy Button */}
              <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-xl p-2.5">
                <input
                  type="text"
                  readOnly
                  value={activeWalletAddress}
                  className="bg-transparent font-mono text-xs sm:text-sm text-slate-200 flex-1 outline-none truncate selection:bg-emerald-500"
                />
                <button
                  type="button"
                  onClick={() => copyToClipboard(activeWalletAddress, 'address')}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1 transition-colors shrink-0"
                >
                  {copiedField === 'address' ? (
                    <>
                      <Check className="w-3.5 h-3.5" /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" /> Copy
                    </>
                  )}
                </button>
              </div>

              <p className="text-[11px] text-slate-400 leading-relaxed">
                Ensure you send via <strong className="text-slate-200">{paymentMethod === 'USDT_TRC20' ? 'TRON (TRC20)' : 'Bitcoin'}</strong> network. Do not send on BSC/ERC20 to avoid delays.
              </p>
            </div>

            {/* 3. CUSTOMER CONTACT & ORDER INFO */}
            <div className="space-y-4">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                2. Your Delivery Contact Information:
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                    Preferred Contact Channel:
                  </label>
                  <select
                    value={contactMethod}
                    onChange={(e) => setContactMethod(e.target.value as 'telegram' | 'whatsapp' | 'email')}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="telegram">Telegram (@username)</option>
                    <option value="whatsapp">WhatsApp (+Phone Number)</option>
                    <option value="email">Email Address</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                    Your {contactMethod === 'telegram' ? 'Telegram Handle' : contactMethod === 'whatsapp' ? 'WhatsApp Number' : 'Contact Handle'}:
                  </label>
                  <input
                    type="text"
                    required
                    value={contactValue}
                    onChange={(e) => setContactValue(e.target.value)}
                    placeholder={
                      contactMethod === 'telegram'
                        ? '@yourtelegram'
                        : contactMethod === 'whatsapp'
                        ? '+1 234 567 8900'
                        : 'yourname@example.com'
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 placeholder-slate-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                  Your Primary Email (for invoice & backup credentials):
                </label>
                <input
                  type="email"
                  required
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="client@gmail.com"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 placeholder-slate-600"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                  Target URL / Business Link / Review Content / Custom Guidelines:
                </label>
                <textarea
                  rows={2}
                  value={customerNote}
                  onChange={(e) => setCustomerNote(e.target.value)}
                  placeholder="e.g., Google Maps Profile Link, preferred review text, specific state or notes..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 placeholder-slate-600"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                  Transaction Hash / TxID (Optional, or send via Telegram):
                </label>
                <input
                  type="text"
                  value={txHash}
                  onChange={(e) => setTxHash(e.target.value)}
                  placeholder="e.g. 7f8a9b2c3d4e5f6... or leave blank to confirm on chat"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-emerald-500 placeholder-slate-600"
                />
              </div>
            </div>

            {/* 4. SUBMIT BUTTON */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-emerald-950/60 transition-all transform active:scale-98 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Processing Order...</span>
                ) : (
                  <>
                    <Zap className="w-4 h-4 fill-slate-950" />
                    <span>I Have Paid — Submit Order (${totalPrice})</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <p className="text-[11px] text-slate-400 text-center mt-2.5">
                Instant order handover • 24/7 Live dispatch team on Telegram & WhatsApp
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
