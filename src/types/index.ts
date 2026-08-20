export type ServiceCategory = 'reviews' | 'bank-wallet' | 'email-number' | 'accounts';

export interface ServiceTier {
  id: string;
  name: string;
  price: number;
  unitLabel?: string;
  originalPrice?: number;
  badge?: string;
  warrantyDays?: number;
  features?: string[];
  limit?: string;
  isPopular?: boolean;
}

export interface ServiceReview {
  id: string;
  author: string;
  avatar?: string;
  rating: number;
  date: string;
  verified: boolean;
  country: string;
  title: string;
  content: string;
}

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface ServiceItem {
  id: string;
  slug: string;
  name: string;
  category: ServiceCategory;
  categoryName: string;
  shortDescription: string;
  basePrice: number;
  tiers: ServiceTier[];
  features: string[];
  mainDescription: string; // Rich semantic markdown SEO guide
  faqs: ServiceFAQ[]; // 7-10 realistic FAQs
  reviews: ServiceReview[];
  warranty: string;
  deliveryTime: string;
  rating: number;
  reviewsCount: number;
  seoKeywords: string[];
  primaryKeyword?: string;
  secondaryKeywords?: string[];
  seoTitle?: string;
  metaDescription?: string;
  h1Title?: string;
  iconName: string;
  badge?: string;
  relatedServiceIds: string[];
}

export interface CartItem {
  serviceId: string;
  serviceName: string;
  tierId: string;
  tierName: string;
  unitPrice: number;
  quantity: number;
  warranty: string;
  category: string;
  iconName: string;
}

export interface OrderDetails {
  orderId: string;
  items: CartItem[];
  totalAmount: number;
  paymentMethod: 'USDT_TRC20' | 'BTC';
  cryptoAddress: string;
  transactionHash?: string;
  contactMethod: 'telegram' | 'whatsapp' | 'email';
  contactValue: string;
  customerEmail: string;
  customerNote?: string;
  orderStatus: 'pending_payment' | 'processing' | 'completed';
  createdAt: string;
}
