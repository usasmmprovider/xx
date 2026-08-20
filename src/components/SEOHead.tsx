import React, { useEffect } from 'react';
import { ServiceItem } from '../types/index.ts';
import { SITE_CONFIG } from '../data/constants.ts';

interface SEOHeadProps {
  title?: string;
  description?: string;
  service?: ServiceItem;
  categoryName?: string;
  categoryId?: string;
  canonicalUrl?: string;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  service,
  categoryName,
  categoryId,
  canonicalUrl,
}) => {
  // Determine Page Title
  let pageTitle = `${SITE_CONFIG.name} - Buy Verified Google Reviews, Bank Accounts & SMM Services`;
  if (service) {
    pageTitle = service.seoTitle || `${service.name} - Verified & Non-Drop | ${SITE_CONFIG.name}`;
  } else if (categoryName) {
    pageTitle = `${categoryName} Services - Buy Verified Accounts & Assets | ${SITE_CONFIG.name}`;
  } else if (title) {
    pageTitle = `${title} | ${SITE_CONFIG.name}`;
  }

  // Determine Meta Description
  let metaDesc = 'Buy authentic 5-star Google Reviews, Trustpilot ratings, verified PayPal & Cash App accounts, USA PVA Gmails, and developer accounts. Instant delivery with 100% replacement warranty.';
  if (service) {
    metaDesc = service.metaDescription || service.shortDescription;
  } else if (categoryName) {
    metaDesc = `Explore our full catalog of ${categoryName} services. Instant delivery, verified residential IP origin, and 100% replacement warranty at USASMMProvider.`;
  } else if (description) {
    metaDesc = description;
  }

  // Determine Canonical URL
  let effectiveCanonical = canonicalUrl || `${SITE_CONFIG.siteUrl}/`;
  if (service) {
    effectiveCanonical = `${SITE_CONFIG.siteUrl}/service/${service.slug}`;
  } else if (categoryId) {
    effectiveCanonical = `${SITE_CONFIG.siteUrl}/category/${categoryId}`;
  }

  useEffect(() => {
    // 1. Update Document Title
    document.title = pageTitle;

    // 2. Update Meta Description
    let metaTag = document.querySelector('meta[name="description"]');
    if (!metaTag) {
      metaTag = document.createElement('meta');
      metaTag.setAttribute('name', 'description');
      document.head.appendChild(metaTag);
    }
    metaTag.setAttribute('content', metaDesc);

    // 3. Update Canonical Tag
    let linkCanonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', effectiveCanonical);

    // 4. Update OpenGraph Tags
    const updateOg = (property: string, content: string) => {
      let el = document.querySelector(`meta[property="${property}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('property', property);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    updateOg('og:title', pageTitle);
    updateOg('og:description', metaDesc);
    updateOg('og:url', effectiveCanonical);
    updateOg('og:site_name', SITE_CONFIG.name);
    updateOg('og:type', service ? 'product' : 'website');

    // 5. Update Twitter Card Tags
    const updateTwitter = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('name', name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    updateTwitter('twitter:title', pageTitle);
    updateTwitter('twitter:description', metaDesc);
    updateTwitter('twitter:url', effectiveCanonical);

    // 6. Add JSON-LD Structured Data
    const existingScript = document.getElementById('json-ld-schema');
    if (existingScript) existingScript.remove();

    const schemas: object[] = [
      // Organization Schema
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        '@id': `${SITE_CONFIG.siteUrl}/#organization`,
        name: SITE_CONFIG.name,
        url: SITE_CONFIG.siteUrl,
        logo: `${SITE_CONFIG.siteUrl}/favicon.ico`,
        email: SITE_CONFIG.email,
        telephone: SITE_CONFIG.whatsapp,
        sameAs: [SITE_CONFIG.telegramUrl, SITE_CONFIG.whatsappUrl],
        contactPoint: [
          {
            '@type': 'ContactPoint',
            telephone: SITE_CONFIG.whatsapp,
            contactType: 'customer service',
            availableLanguage: ['English', 'Spanish', 'Bengali'],
            contactOption: 'TollFree',
            hoursAvailable: {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
              opens: '00:00',
              closes: '23:59',
            },
          },
        ],
      },
      // WebSite Schema
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': `${SITE_CONFIG.siteUrl}/#website`,
        url: SITE_CONFIG.siteUrl,
        name: SITE_CONFIG.name,
        description: 'Verified Reviews, Bank Accounts, Social Profiles and SMM Services Provider',
        publisher: {
          '@id': `${SITE_CONFIG.siteUrl}/#organization`,
        },
      },
    ];

    if (service) {
      // Product Schema
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'Product',
        '@id': `${SITE_CONFIG.siteUrl}/#service-${service.slug}`,
        name: service.name,
        description: service.shortDescription,
        category: service.categoryName,
        sku: `USASMM-${service.id.toUpperCase()}`,
        brand: {
          '@type': 'Brand',
          name: SITE_CONFIG.name,
        },
        offers: {
          '@type': 'AggregateOffer',
          priceCurrency: 'USD',
          lowPrice: Math.min(...service.tiers.map((t) => t.price)),
          highPrice: Math.max(...service.tiers.map((t) => t.price)),
          offerCount: service.tiers.length,
          availability: 'https://schema.org/InStock',
          url: `${SITE_CONFIG.siteUrl}/service/${service.slug}`,
          priceValidUntil: '2028-12-31',
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: service.rating.toString(),
          reviewCount: service.reviewsCount.toString(),
          bestRating: '5',
          worstRating: '1',
        },
      });

      // FAQ Schema (if FAQs exist)
      if (service.faqs && service.faqs.length > 0) {
        schemas.push({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          '@id': `${SITE_CONFIG.siteUrl}/#faq-${service.slug}`,
          mainEntity: service.faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer,
            },
          })),
        });
      }

      // BreadcrumbList Schema
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        '@id': `${SITE_CONFIG.siteUrl}/#breadcrumb-${service.slug}`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: `${SITE_CONFIG.siteUrl}/`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: service.categoryName,
            item: `${SITE_CONFIG.siteUrl}/category/${service.category}`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: service.name,
            item: `${SITE_CONFIG.siteUrl}/service/${service.slug}`,
          },
        ],
      });
    }

    const script = document.createElement('script');
    script.id = 'json-ld-schema';
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schemas);
    document.head.appendChild(script);

    return () => {
      const el = document.getElementById('json-ld-schema');
      if (el) el.remove();
    };
  }, [pageTitle, metaDesc, effectiveCanonical, service]);

  return null;
};
