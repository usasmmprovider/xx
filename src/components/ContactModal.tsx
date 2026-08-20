import React, { useState } from 'react';
import { 
  X, 
  Send, 
  Phone, 
  Mail, 
  CheckCircle2, 
  Copy, 
  Check, 
  ExternalLink,
  MessageSquare,
  ShieldCheck,
  Zap,
  Globe
} from 'lucide-react';
import { SITE_CONFIG } from '../data/constants.ts';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [copiedType, setCopiedType] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 text-white shadow-2xl relative space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
            <MessageSquare className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-extrabold text-white">Contact USASMMProvider</h3>
          <p className="text-xs text-slate-400">
            24/7 dedicated customer service for testing, custom bulk packages, and instant replacements.
          </p>
        </div>

        {/* Testing Notice Highlight */}
        <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 flex items-start gap-2.5">
          <Zap className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <span>{SITE_CONFIG.testingNotice}</span>
        </div>

        {/* Contact Channels List */}
        <div className="space-y-3">
          
          {/* Telegram */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/90 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center border border-sky-500/30">
                <Send className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-400 uppercase">Telegram Support</div>
                <div className="text-sm font-black text-sky-400">{SITE_CONFIG.telegram}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => copyToClipboard(SITE_CONFIG.telegram, 'telegram')}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                title="Copy handle"
              >
                {copiedType === 'telegram' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
              <a
                href={SITE_CONFIG.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition-colors flex items-center gap-1"
              >
                Chat <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* WhatsApp */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/90 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-400 uppercase">WhatsApp Official</div>
                <div className="text-sm font-black text-emerald-400">{SITE_CONFIG.whatsapp}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => copyToClipboard(SITE_CONFIG.whatsapp, 'whatsapp')}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                title="Copy number"
              >
                {copiedType === 'whatsapp' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
              <a
                href={SITE_CONFIG.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors flex items-center gap-1"
              >
                Chat <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Email */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/90 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-400 uppercase">Email Support</div>
                <div className="text-xs font-bold text-slate-200">{SITE_CONFIG.email}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => copyToClipboard(SITE_CONFIG.email, 'email')}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                title="Copy email"
              >
                {copiedType === 'email' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-colors"
              >
                Email
              </a>
            </div>
          </div>
        </div>

        <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
          <span className="flex items-center gap-1">
            <Globe className="w-3.5 h-3.5 text-emerald-400" /> Domain: {SITE_CONFIG.domain}
          </span>
          <span className="flex items-center gap-1 text-emerald-400">
            <CheckCircle2 className="w-3.5 h-3.5" /> 100% Non-Drop Warranty
          </span>
        </div>
      </div>
    </div>
  );
};
