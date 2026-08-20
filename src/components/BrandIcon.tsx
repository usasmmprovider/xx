import React from 'react';

export interface BrandIconProps {
  name: string;
  className?: string;
  size?: number;
}

export const BrandIcon: React.FC<BrandIconProps> = ({ name, className = 'w-5 h-5', size = 20 }) => {
  const normalized = name.toLowerCase().replace(/[^a-z0-9]/g, '');

  // 1. Google (Multicolor Google 'G' Logo)
  if (normalized.includes('google') && !normalized.includes('voice') && !normalized.includes('play') && !normalized.includes('chrome')) {
    return (
      <svg className={className} viewBox="0 0 24 24" width={size} height={size}>
        <path
          fill="#4285F4"
          d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
        />
        <path
          fill="#34A853"
          d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
        />
        <path
          fill="#FBBC05"
          d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
        />
        <path
          fill="#EA4335"
          d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.93 6.72-4.93z"
        />
      </svg>
    );
  }

  // 2. Google Play
  if (normalized.includes('play')) {
    return (
      <svg className={className} viewBox="0 0 24 24" width={size} height={size}>
        <path fill="#4285F4" d="M3.6 1.8c-.3.3-.5.8-.5 1.5v17.4c0 .7.2 1.2.5 1.5l.1.1 9.8-9.8v-.2L3.7 1.7l-.1.1z" />
        <path fill="#FBBC04" d="M16.8 15.5l-3.3-3.3v-.4l3.3-3.3.1.1 3.9 2.2c1.1.6 1.1 1.6 0 2.2l-4 2.2z" />
        <path fill="#EA4335" d="M13.5 12.2L3.6 22.1c.4.4 1 .5 1.7.1l11.6-6.6-3.4-3.4z" />
        <path fill="#34A853" d="M13.5 11.8L5.3 3.6c-.7-.4-1.3-.3-1.7.1l9.9 9.9 3.4-3.4-3.4 1.6z" />
      </svg>
    );
  }

  // 3. Google Chrome
  if (normalized.includes('chrome')) {
    return (
      <svg className={className} viewBox="0 0 24 24" width={size} height={size}>
        <circle cx="12" cy="12" r="5" fill="#FFF" />
        <circle cx="12" cy="12" r="3.8" fill="#1A73E8" />
        <path fill="#EA4335" d="M12 2C6.48 2 2 6.48 2 12c0 .34.02.67.05 1h9.95v-1l4.5-7.79A9.956 9.956 0 0 0 12 2z" />
        <path fill="#FBBC04" d="M22 12c0-2.37-.83-4.55-2.22-6.28l-4.5 7.79 3.5 6.06C20.65 17.85 22 15.1 22 12z" />
        <path fill="#34A853" d="M12 22c3.73 0 7-2.04 8.78-5.08L17.28 11H7.31L3.81 17.06C5.59 20.07 8.87 22 12 22z" />
      </svg>
    );
  }

  // 4. Trustpilot (Official Green Star Logo)
  if (normalized.includes('trustpilot')) {
    return (
      <svg className={className} viewBox="0 0 24 24" width={size} height={size}>
        <rect width="24" height="24" rx="5" fill="#00B67A" />
        <path
          fill="#FFFFFF"
          d="M12 4.5l2.3 7.1h7.5l-6.1 4.4 2.3 7.1-6-4.4-6 4.4 2.3-7.1-6.1-4.4h7.5z"
        />
        <path fill="#005128" d="M15.5 15.5l-3.5-2.5v6.5l3.5-4z" opacity="0.3" />
      </svg>
    );
  }

  // 5. PayPal (Official Double 'P' Logo)
  if (normalized.includes('paypal')) {
    return (
      <svg className={className} viewBox="0 0 24 24" width={size} height={size}>
        <rect width="24" height="24" rx="6" fill="#003087" />
        <path
          fill="#0079C1"
          d="M8.5 6h5.2c2.6 0 4.3 1.3 3.9 3.8-.4 2.5-2.3 3.7-4.5 3.7h-1.8l-.9 5.5H7.5l2-13h-1z"
        />
        <path
          fill="#00457C"
          d="M10.2 9h4.8c2.2 0 3.8 1.1 3.4 3.4-.4 2.4-2.2 3.6-4.2 3.6h-1.7l-.9 5.5H9.2L11.2 9h-1z"
          opacity="0.8"
        />
        <path
          fill="#0079C1"
          d="M10.5 9.5h4.3c2 0 3.3 1 3 3.1-.3 2.1-1.9 3.2-3.7 3.2h-1.5l-.8 4.7H9.7l1.8-11h-1z"
        />
      </svg>
    );
  }

  // 6. Cash App (Official Signature Green & Dollar Logo)
  if (normalized.includes('cashapp') || normalized.includes('cash')) {
    return (
      <svg className={className} viewBox="0 0 24 24" width={size} height={size}>
        <rect width="24" height="24" rx="6" fill="#00D632" />
        <path
          fill="#FFFFFF"
          d="M14.5 9.2c-.4-.5-1.1-.8-2-.9v-2h-1v2c-1.4.1-2.4 1-2.4 2.2 0 1.4 1.1 1.9 2.4 2.2 1.2.3 1.8.6 1.8 1.2 0 .6-.6 1-1.6 1-.9 0-1.7-.4-2.1-1l-.9.8c.5.8 1.5 1.3 2.6 1.4v2h1v-2c1.5-.1 2.6-.9 2.6-2.3 0-1.3-.9-1.9-2.3-2.3-1.1-.3-1.9-.6-1.9-1.1 0-.5.5-.9 1.4-.9.8 0 1.4.3 1.7.7l.7-.9z"
        />
      </svg>
    );
  }

  // 7. Chase Bank (Official Octagonal Blue Symbol)
  if (normalized.includes('chase')) {
    return (
      <svg className={className} viewBox="0 0 24 24" width={size} height={size}>
        <rect width="24" height="24" rx="6" fill="#117ACA" />
        <path
          fill="#FFFFFF"
          d="M6 6h12v3H9v6h9v3H6V6zm5 3h5v2h-5V9zm0 4h5v2h-5v-2z"
          opacity="0.15"
        />
        <path
          fill="#FFFFFF"
          d="M12 4L4 12l8 8 8-8-8-8zm0 3.2l5.6 5.6L12 18.4 6.4 12.8 12 7.2z"
        />
      </svg>
    );
  }

  // 8. Relay Financial
  if (normalized.includes('relay')) {
    return (
      <svg className={className} viewBox="0 0 24 24" width={size} height={size}>
        <rect width="24" height="24" rx="6" fill="#3B28CC" />
        <path
          fill="#FFFFFF"
          d="M7 6h5c3.3 0 5 1.8 5 4.5 0 2.1-1.1 3.5-2.8 4.1L18 20h-3.4l-3.3-4.8H9.5V20H7V6zm2.5 7h2.3c1.8 0 2.8-.9 2.8-2.5s-1-2.5-2.8-2.5H9.5V13z"
        />
      </svg>
    );
  }

  // 9. Kraken (Official Crypto Logo)
  if (normalized.includes('kraken')) {
    return (
      <svg className={className} viewBox="0 0 24 24" width={size} height={size}>
        <rect width="24" height="24" rx="6" fill="#5741D9" />
        <path
          fill="#FFFFFF"
          d="M12 4.5C8.4 4.5 5.5 7.4 5.5 11c0 3.1 2.2 5.7 5.1 6.3V19c-1 0-1.8.8-1.8 1.8h6.4c0-1-.8-1.8-1.8-1.8v-1.7c2.9-.6 5.1-3.2 5.1-6.3 0-3.6-2.9-6.5-6.5-6.5zm-2.5 8c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5 1.5.7 1.5 1.5-.7 1.5-1.5 1.5zm5 0c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5 1.5.7 1.5 1.5-.7 1.5-1.5 1.5z"
        />
      </svg>
    );
  }

  // 10. RedotPay
  if (normalized.includes('redotpay') || normalized.includes('redot')) {
    return (
      <svg className={className} viewBox="0 0 24 24" width={size} height={size}>
        <rect width="24" height="24" rx="6" fill="#E50914" />
        <path
          fill="#FFFFFF"
          d="M6 7h7c2.8 0 4.5 1.6 4.5 4s-1.7 4-4.5 4H9.5V19H6V7zm3.5 5.5H12c1.2 0 2-.6 2-1.5s-.8-1.5-2-1.5H9.5v3z"
        />
      </svg>
    );
  }

  // 11. Gmail / PVA Email (Official Envelope)
  if (normalized.includes('gmail') || normalized.includes('pva') || normalized.includes('email')) {
    return (
      <svg className={className} viewBox="0 0 24 24" width={size} height={size}>
        <rect width="24" height="24" rx="6" fill="#1E293B" />
        <path
          fill="#4285F4"
          d="M5 18h2V9.5L12 13l5-3.5V18h2V7.5c0-.9-.8-1.5-1.6-1.1L12 10.2 6.6 6.4C5.8 6 5 6.6 5 7.5V18z"
        />
        <path fill="#34A853" d="M5 18V8.5L12 13.5v5.5H5z" opacity="0.3" />
        <path fill="#EA4335" d="M19 18V8.5L12 13.5v5.5h7z" opacity="0.3" />
      </svg>
    );
  }

  // 12. Outlook / Hotmail
  if (normalized.includes('outlook') || normalized.includes('hotmail')) {
    return (
      <svg className={className} viewBox="0 0 24 24" width={size} height={size}>
        <rect width="24" height="24" rx="6" fill="#0078D4" />
        <path
          fill="#FFFFFF"
          d="M6 7h8v10H6V7zm10 2h3l-3 4.5V9zm3 6h-3v-1.5l3 1.5zM7.5 12c0 1.4 1 2.5 2.5 2.5s2.5-1.1 2.5-2.5-1-2.5-2.5-2.5-2.5 1.1-2.5 2.5zm1.5 0c0-.6.4-1 1-1s1 .4 1 1-.4 1-1 1-1-.4-1-1z"
        />
      </svg>
    );
  }

  // 13. EDU Email
  if (normalized.includes('edu')) {
    return (
      <svg className={className} viewBox="0 0 24 24" width={size} height={size}>
        <rect width="24" height="24" rx="6" fill="#0284C7" />
        <path
          fill="#FFFFFF"
          d="M12 4L3 9l9 5 7-3.9V16h2V9L12 4zm0 8.5L5.5 9 12 5.5 18.5 9 12 12.5zM6 13v4.5C6 19.5 8.7 21 12 21s6-1.5 6-3.5V13l-6 3.3L6 13z"
        />
      </svg>
    );
  }

  // 14. Google Voice
  if (normalized.includes('voice') || normalized.includes('voip')) {
    return (
      <svg className={className} viewBox="0 0 24 24" width={size} height={size}>
        <rect width="24" height="24" rx="6" fill="#00897B" />
        <path
          fill="#FFFFFF"
          d="M16.5 13.5c-.8 0-1.5-.2-2.1-.5l-.8.8c.8.6 1.8 1 2.9 1.2v2c-2-.3-3.8-1.2-5.2-2.6-1.4-1.4-2.3-3.2-2.6-5.2h2c.2 1.1.6 2.1 1.2 2.9l.8-.8c-.3-.6-.5-1.3-.5-2.1v-2h4.3v6.3z"
        />
      </svg>
    );
  }

  // 15. Facebook (Official Blue Logo)
  if (normalized.includes('facebook') || normalized.includes('fb')) {
    return (
      <svg className={className} viewBox="0 0 24 24" width={size} height={size}>
        <rect width="24" height="24" rx="6" fill="#1877F2" />
        <path
          fill="#FFFFFF"
          d="M13.5 20v-7h2.3l.4-2.8h-2.7V8.5c0-.8.2-1.3 1.4-1.3h1.5V4.7c-.3 0-1.1-.1-2.1-.1-2.1 0-3.6 1.3-3.6 3.7v1.9H8v2.8h2.7v7h2.8z"
        />
      </svg>
    );
  }

  // 16. Instagram (Official Gradient Logo)
  if (normalized.includes('instagram') || normalized.includes('ig')) {
    return (
      <svg className={className} viewBox="0 0 24 24" width={size} height={size}>
        <defs>
          <linearGradient id="igGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f09433" />
            <stop offset="25%" stopColor="#e6683c" />
            <stop offset="50%" stopColor="#dc2743" />
            <stop offset="75%" stopColor="#cc2366" />
            <stop offset="100%" stopColor="#bc1888" />
          </linearGradient>
        </defs>
        <rect width="24" height="24" rx="6" fill="url(#igGrad)" />
        <rect x="5.5" y="5.5" width="13" height="13" rx="4" fill="none" stroke="#FFF" strokeWidth="1.8" />
        <circle cx="12" cy="12" r="3.2" fill="none" stroke="#FFF" strokeWidth="1.8" />
        <circle cx="15.8" cy="8.2" r="0.9" fill="#FFF" />
      </svg>
    );
  }

  // 17. Twitter / X
  if (normalized.includes('twitter') || normalized === 'x') {
    return (
      <svg className={className} viewBox="0 0 24 24" width={size} height={size}>
        <rect width="24" height="24" rx="6" fill="#000000" />
        <path
          fill="#FFFFFF"
          d="M14.7 5h2.4l-5.3 6.1L18 19h-4.9l-3.8-5-4.4 5H2.5l5.7-6.5L2 5h5l3.5 4.6L14.7 5zm-.8 12.6h1.3L6.3 6.3H4.9l9 11.3z"
        />
      </svg>
    );
  }

  // 18. LinkedIn (Official Blue 'in' Logo)
  if (normalized.includes('linkedin')) {
    return (
      <svg className={className} viewBox="0 0 24 24" width={size} height={size}>
        <rect width="24" height="24" rx="6" fill="#0A66C2" />
        <path
          fill="#FFFFFF"
          d="M6.5 9h2.3v8H6.5V9zm1.2-4.2c.8 0 1.4.6 1.4 1.4s-.6 1.4-1.4 1.4-1.4-.6-1.4-1.4.6-1.4 1.4-1.4zm3.8 4.2h2.2v1.1h.1c.3-.6 1.2-1.3 2.4-1.3 2.5 0 3 1.7 3 3.8V17h-2.3v-3.7c0-.9 0-2-1.2-2-1.2 0-1.4 1-1.4 2V17h-2.3V9z"
        />
      </svg>
    );
  }

  // 19. GitHub (Official Octocat Mark)
  if (normalized.includes('github')) {
    return (
      <svg className={className} viewBox="0 0 24 24" width={size} height={size}>
        <rect width="24" height="24" rx="6" fill="#181717" />
        <path
          fill="#FFFFFF"
          d="M12 4.5C7.9 4.5 4.5 7.9 4.5 12c0 3.3 2.1 6.1 5.1 7.1.4.1.5-.2.5-.4v-1.4c-2.1.5-2.5-1-2.5-1-.3-.9-.8-1.1-.8-1.1-.7-.5.1-.5.1-.5.8.1 1.2.8 1.2.8.7 1.2 1.8.8 2.2.6.1-.5.3-.8.5-1-1.7-.2-3.4-.8-3.4-3.7 0-.8.3-1.5.8-2-.1-.2-.4-1 .1-2 0 0 .6-.2 2.1.8.6-.2 1.3-.3 1.9-.3.7 0 1.3.1 1.9.3 1.5-1 2.1-.8 2.1-.8.4 1 .2 1.8.1 2 .5.5.8 1.2.8 2 0 2.9-1.8 3.5-3.5 3.7.3.3.6.8.6 1.6v2.4c0 .2.1.5.6.4 3-1 5.1-3.8 5.1-7.1 0-4.1-3.4-7.5-7.5-7.5z"
        />
      </svg>
    );
  }

  // 20. BBB (Better Business Bureau)
  if (normalized.includes('bbb')) {
    return (
      <svg className={className} viewBox="0 0 24 24" width={size} height={size}>
        <rect width="24" height="24" rx="6" fill="#005A9C" />
        <path
          fill="#FFFFFF"
          d="M6 7h3.5c1.4 0 2.2.7 2.2 1.8 0 .8-.5 1.4-1.2 1.6 1 .2 1.6.9 1.6 1.8 0 1.2-.9 2-2.4 2H6V7zm2 2.2v1.4h1.2c.5 0 .8-.3.8-.7s-.3-.7-.8-.7H8zm0 2.6v1.6h1.4c.5 0 .9-.3.9-.8s-.4-.8-.9-.8H8z"
        />
        <circle cx="17.5" cy="12" r="2.5" fill="#F4B400" />
      </svg>
    );
  }

  // 21. Reviews.io
  if (normalized.includes('reviewsio')) {
    return (
      <svg className={className} viewBox="0 0 24 24" width={size} height={size}>
        <rect width="24" height="24" rx="6" fill="#14B8A6" />
        <path
          fill="#FFFFFF"
          d="M12 5.5l1.8 4.2 4.6.4-3.5 3.1 1 4.5L12 15.4 8.1 17.7l1-4.5-3.5-3.1 4.6-.4L12 5.5z"
        />
      </svg>
    );
  }

  // 22. Negative Review Removal (Shield Alert / Eraser)
  if (normalized.includes('negative') || normalized.includes('removal')) {
    return (
      <svg className={className} viewBox="0 0 24 24" width={size} height={size}>
        <rect width="24" height="24" rx="6" fill="#DC2626" />
        <path
          fill="#FFFFFF"
          d="M12 4.5L5 7.5v5.5c0 4.5 3 8.7 7 9.8 4-1.1 7-5.3 7-9.8V7.5l-7-3zm-1 5h2v5h-2V9.5zm0 6.5h2v2h-2v-2z"
        />
      </svg>
    );
  }

  // 23. Tether USDT Crypto
  if (normalized.includes('usdt') || normalized.includes('tether')) {
    return (
      <svg className={className} viewBox="0 0 24 24" width={size} height={size}>
        <circle cx="12" cy="12" r="10" fill="#26A17B" />
        <path
          fill="#FFFFFF"
          d="M13.2 8.2v-2h4.5V4.5H6.3v1.7h4.5v2C7.3 8.5 4.8 9.3 4.8 10.3c0 1 2.5 1.8 6 2v6.2h2.4v-6.2c3.5-.2 6-1 6-2 0-1-2.5-1.8-6-2.1zm0 3.3c-2.4 0-4.4-.5-4.4-1.2s2-1.2 4.4-1.2 4.4.5 4.4 1.2-2 1.2-4.4 1.2z"
        />
      </svg>
    );
  }

  // 24. Bitcoin BTC Crypto
  if (normalized.includes('btc') || normalized.includes('bitcoin')) {
    return (
      <svg className={className} viewBox="0 0 24 24" width={size} height={size}>
        <circle cx="12" cy="12" r="10" fill="#F7931A" />
        <path
          fill="#FFFFFF"
          d="M15.4 10.8c.4-.7.4-1.7-.2-2.3-.7-.8-2-1-3.6-1.1V5.5h-1.5v1.8H9V5.5H7.5v1.8H5.5V9h1.3c.3 0 .5.2.5.5v5c0 .3-.2.5-.5.5H5.5v1.8H7.5v1.8H9v-1.8h1.1v1.8h1.5v-1.8c2.2-.1 3.8-.8 4.2-2.4.3-1.1 0-2.1-.9-2.7zm-4.7-2.3h1.8c1 0 1.8.3 1.8 1.1s-.8 1.1-1.8 1.1h-1.8V8.5zm2.3 5.7h-2.3v-2.3h2.3c1.2 0 2 .4 2 1.1s-.8 1.2-2 1.2z"
        />
      </svg>
    );
  }

  // Fallback badge
  return (
    <div className={`rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold text-xs ${className}`}>
      ★
    </div>
  );
};
