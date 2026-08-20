import React, { useState, useEffect } from 'react';
import { CartProvider } from './context/CartContext.tsx';
import { Header } from './components/Header.tsx';
import { HomeView } from './components/HomeView.tsx';
import { CatalogView } from './components/CatalogView.tsx';
import { ServiceDetail } from './components/ServiceDetail.tsx';
import { CartDrawer } from './components/CartDrawer.tsx';
import { CheckoutModal } from './components/CheckoutModal.tsx';
import { ContactModal } from './components/ContactModal.tsx';
import { Footer } from './components/Footer.tsx';
import { ALL_SERVICES, getServiceById } from './data/services.ts';
import { ServiceItem } from './types/index.ts';
import { SITE_CONFIG } from './data/constants.ts';
import { Send, Phone, MessageSquare, ArrowUp } from 'lucide-react';
import { SEOHead } from './components/SEOHead.tsx';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'catalog' | 'service'>('home');
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Parse URL pathname, search query, and fallback hash for clean SEO routing
  const parseCurrentRoute = () => {
    const pathname = window.location.pathname.replace(/\/+$/, '') || '/';
    const hash = window.location.hash.replace(/^#\/?/, '');

    // Check service routes: /service/:slug or /services/:slug or /#service/:slug
    if (pathname.startsWith('/service/')) {
      const slug = pathname.replace('/service/', '').split('/')[0];
      const found = getServiceById(slug);
      if (found) {
        setSelectedService(found);
        setSelectedCategory(null);
        setCurrentView('service');
        return;
      }
    } else if (pathname.startsWith('/services/')) {
      const slug = pathname.replace('/services/', '').split('/')[0];
      const found = getServiceById(slug);
      if (found) {
        setSelectedService(found);
        setSelectedCategory(null);
        setCurrentView('service');
        // Clean URL to canonical /service/:slug
        window.history.replaceState(null, '', `/service/${found.slug}`);
        return;
      }
    } else if (pathname.startsWith('/category/')) {
      const cat = pathname.replace('/category/', '').split('/')[0];
      setSelectedCategory(cat);
      setSelectedService(null);
      setCurrentView('catalog');
      return;
    } else if (pathname === '/catalog' || pathname === '/categories') {
      setSelectedCategory(null);
      setSelectedService(null);
      setCurrentView('catalog');
      return;
    }

    // Check legacy hash routes (e.g. /#service/buy-restore-paypal-accounts) and convert to clean URL
    if (hash.startsWith('service/')) {
      const slug = hash.replace('service/', '').split('/')[0];
      const found = getServiceById(slug);
      if (found) {
        setSelectedService(found);
        setSelectedCategory(null);
        setCurrentView('service');
        window.history.replaceState(null, '', `/service/${found.slug}`);
        return;
      }
    } else if (hash.startsWith('category/')) {
      const cat = hash.replace('category/', '').split('/')[0];
      setSelectedCategory(cat);
      setSelectedService(null);
      setCurrentView('catalog');
      window.history.replaceState(null, '', `/category/${cat}`);
      return;
    } else if (hash === 'catalog') {
      setSelectedCategory(null);
      setSelectedService(null);
      setCurrentView('catalog');
      window.history.replaceState(null, '', '/catalog');
      return;
    }

    // Direct Home
    setSelectedService(null);
    setSelectedCategory(null);
    setCurrentView('home');
  };

  useEffect(() => {
    parseCurrentRoute();

    const handlePopState = () => {
      parseCurrentRoute();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleGoHome = () => {
    setSelectedService(null);
    setSelectedCategory(null);
    setCurrentView('home');
    window.history.pushState(null, '', '/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectService = (service: ServiceItem) => {
    setSelectedService(service);
    setCurrentView('service');
    window.history.pushState(null, '', `/service/${service.slug}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCategory = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
    setSelectedService(null);
    setCurrentView('catalog');
    const path = categoryId ? `/category/${categoryId}` : '/catalog';
    window.history.pushState(null, '', path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewAllCatalog = () => {
    setSelectedCategory(null);
    setSelectedService(null);
    setCurrentView('catalog');
    window.history.pushState(null, '', '/catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans antialiased selection:bg-emerald-500 selection:text-slate-950">
        
        {/* Dynamic SEO Header */}
        <SEOHead service={selectedService || undefined} />

        {/* Global Header with category sub-menus & official logos */}
        <Header
          onGoHome={handleGoHome}
          onSelectService={handleSelectService}
          onSelectCategory={handleSelectCategory}
          selectedCategory={currentView === 'catalog' ? selectedCategory : null}
          onOpenContactModal={() => setIsContactModalOpen(true)}
        />

        {/* Main Content View Switcher */}
        <main className="flex-1">
          {currentView === 'service' && selectedService ? (
            <ServiceDetail
              service={selectedService}
              onSelectService={handleSelectService}
              onBackToCategory={(catId) => handleSelectCategory(catId || null)}
              onOpenContactModal={() => setIsContactModalOpen(true)}
            />
          ) : currentView === 'catalog' ? (
            <CatalogView
              onSelectService={handleSelectService}
              selectedCategory={selectedCategory}
              onSelectCategory={handleSelectCategory}
              onOpenContactModal={() => setIsContactModalOpen(true)}
            />
          ) : (
            <HomeView
              onSelectService={handleSelectService}
              onSelectCategory={handleSelectCategory}
              onViewAllCatalog={handleViewAllCatalog}
              onOpenContactModal={() => setIsContactModalOpen(true)}
            />
          )}
        </main>

        {/* Global Footer */}
        <Footer
          onSelectService={handleSelectService}
          onSelectCategory={handleSelectCategory}
          onOpenContactModal={() => setIsContactModalOpen(true)}
        />

        {/* Interactive Drawers and Modals */}
        <CartDrawer />
        <CheckoutModal />
        <ContactModal
          isOpen={isContactModalOpen}
          onClose={() => setIsContactModalOpen(false)}
        />

        {/* Floating Contact & Support Fast-Action Widget */}
        <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2.5">
          {showBackToTop && (
            <button
              onClick={scrollToTop}
              className="p-3 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-white shadow-xl hover:bg-slate-800 transition-all"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          )}

          {/* Quick Telegram Floating Button */}
          <a
            href={SITE_CONFIG.telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs shadow-2xl shadow-sky-500/40 transition-all transform hover:scale-105"
            title="Chat with Support on Telegram"
          >
            <Send className="w-4 h-4 fill-slate-950" />
            <span className="hidden sm:inline">Telegram Support</span>
          </a>

          {/* Quick WhatsApp Floating Button */}
          <a
            href={SITE_CONFIG.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-2xl shadow-emerald-500/40 transition-all transform hover:scale-105"
            title="Chat with Support on WhatsApp"
          >
            <Phone className="w-4 h-4 fill-slate-950" />
            <span className="hidden sm:inline">WhatsApp Live</span>
          </a>
        </div>
      </div>
    </CartProvider>
  );
}
