import React, { useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import Timer from "@/components/ui/timer-clocking";
import { cn } from '@/lib/utils';

const SalesFunnelHeader = () => {
  const location = useLocation();
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  
  // N'afficher que sur la page du tunnel de vente
  if (location.pathname !== '/tunnel-vente' && location.pathname !== '/sales-funnel') {
    return null;
  }

  // Gestion du défilement pour cacher/afficher la navbar
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;
    const SCROLL_THRESHOLD = 5;
    const HEADER_HEIGHT = 80;
    
    const updateScrollDir = () => {
      const scrollY = Math.max(window.scrollY, 0);
      
      // Toujours afficher en haut de la page
      if (scrollY <= 20) {
        setIsVisible(true);
        ticking = false;
        lastScrollY = scrollY;
        return;
      }

      // Ignorer les très petits défilements
      if (Math.abs(scrollY - lastScrollY) < SCROLL_THRESHOLD) {
        ticking = false;
        return;
      }

      // Logique de défilement
      if (scrollY > lastScrollY && scrollY > HEADER_HEIGHT) {
        // Défilement vers le bas
        setIsVisible(false);
      } else if (scrollY < lastScrollY - SCROLL_THRESHOLD) {
        // Défilement vers le haut
        setIsVisible(true);
      }

      lastScrollY = scrollY;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDir);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <header 
      className={`fixed top-0 w-full z-50 bg-white/98 backdrop-blur-md border-b border-gray-200/60 shadow-lg py-1 ${
        isVisible 
          ? 'translate-y-0 opacity-100 scale-y-100' 
          : '-translate-y-full opacity-0 scale-y-95 pointer-events-none'
      }`}
      style={{
        willChange: 'transform, opacity, backdrop-filter, box-shadow',
        transition: 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), backdrop-filter 0.4s ease-out, box-shadow 0.3s ease-out, scale 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        backdropFilter: 'saturate(200%) blur(16px) brightness(1.02)',
        WebkitBackdropFilter: 'saturate(200%) blur(16px) brightness(1.02)',
        transformOrigin: 'top center'
      }}
    >
      <div className="container mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
              <div className="flex items-center">
                <div className="ml-2 -mt-1 -mb-1">
                  <Link to="/e-learning" className="hover:opacity-80 transition-opacity duration-200">
                    <img 
                      src="/Copie de LOGOTYPE [Récupéré]-18.png" 
                      alt="DM+ ACADEMY" 
                      className="h-16 md:h-20 w-auto cursor-pointer object-cover"
                    />
                  </Link>
                </div>
              </div>
            </div>

          <nav className="flex items-center justify-center">
            <div className="flex flex-row items-center justify-center space-x-1 md:space-x-3">
              <h1 className="text-center md:text-left text-xs md:text-sm lg:text-xl font-medium">
                <span className="text-red-600 font-bold">Offre spéciale</span> se termine
              </h1>
              <div className="w-full md:w-auto text-center">
                <Timer endTime={new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString()} className="text-gray-900 text-sm" />
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default SalesFunnelHeader;
