import React from 'react';
import * as LucideIcons from 'lucide-react';
import { BrandIcon } from './BrandIcon.tsx';

interface DynamicIconProps {
  name: string;
  className?: string;
  size?: number;
}

export const DynamicIcon: React.FC<DynamicIconProps> = ({ name, className = 'w-5 h-5', size = 20 }) => {
  // If the icon corresponds to a brand or platform name, render official vector logo
  const brandKeywords = [
    'google', 'play', 'chrome', 'trustpilot', 'paypal', 'cashapp', 'cash', 
    'chase', 'relay', 'kraken', 'redotpay', 'redot', 'gmail', 'pva', 'email', 
    'outlook', 'hotmail', 'edu', 'voice', 'voip', 'facebook', 'fb', 
    'instagram', 'ig', 'twitter', 'x', 'linkedin', 'github', 'bbb', 
    'reviewsio', 'negative', 'removal', 'usdt', 'btc', 'bitcoin', 'tether'
  ];

  const lower = name.toLowerCase();
  const isBrand = brandKeywords.some(keyword => lower.includes(keyword));

  if (isBrand) {
    return <BrandIcon name={name} className={className} size={size} />;
  }

  const IconComponent = (LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string; size?: number }>>)[name];
  if (!IconComponent) {
    const Fallback = LucideIcons.Sparkles;
    return <Fallback className={className} size={size} />;
  }
  return <IconComponent className={className} size={size} />;
};
