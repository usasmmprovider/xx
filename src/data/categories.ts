import { ServiceCategory } from '../types/index.ts';

export interface CategoryMeta {
  id: ServiceCategory;
  name: string;
  shortTitle: string;
  tagline: string;
  iconName: string;
  accentColor: string;
}

export const CATEGORIES: CategoryMeta[] = [
  {
    id: 'reviews',
    name: 'Reviews',
    shortTitle: 'Reviews',
    tagline: 'Google, TrustPilot, Facebook, BBB, Play Store, Chrome Reviews & Negative Review Removal',
    iconName: 'Star',
    accentColor: 'from-amber-500 to-orange-500',
  },
  {
    id: 'bank-wallet',
    name: 'Bank & Wallet',
    shortTitle: 'Bank & Wallet',
    tagline: 'Verified PayPal, Cash App, Chase, Relay Bank, Kraken & RedotPay Accounts',
    iconName: 'CreditCard',
    accentColor: 'from-emerald-500 to-teal-600',
  },
  {
    id: 'email-number',
    name: 'Email and Number',
    shortTitle: 'Email and Number',
    tagline: 'USA PVA Gmails, Aged Accounts, Edu Mails, Outlook, Google Voice, TextNow, Talkatone & WhatsApp Numbers',
    iconName: 'Mail',
    accentColor: 'from-blue-500 to-cyan-600',
  },
  {
    id: 'accounts',
    name: 'Accounts',
    shortTitle: 'Accounts',
    tagline: 'Facebook, Instagram 2k, Twitter/X, NFC LinkedIn & Aged GitHub Developer Accounts',
    iconName: 'Users',
    accentColor: 'from-purple-500 to-indigo-600',
  },
];
