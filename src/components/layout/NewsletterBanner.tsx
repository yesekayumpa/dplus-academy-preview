import { useState, useEffect } from "react";
import { X, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NewsletterBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  // Vérifier si l'utilisateur a déjà fermé le bandeau
  useEffect(() => {
    const isClosed = localStorage.getItem('newsletter-banner-closed');
    if (isClosed) {
      setIsVisible(false);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('newsletter-banner-closed', 'true');
  };

  const handleSubscribe = () => {
    // Ouvrir un modal ou rediriger vers une page d'inscription
    window.open('https://academy.dmplus-group.com/newsletter', '_blank');
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -100 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="relative z-50 bg-gradient-to-r from-academy to-academy-light text-white"
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 flex-shrink-0" />
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <span className="font-semibold text-sm">
                  Restez informé de nos dernières masterclass
                </span>
                <span className="text-white/80 text-sm hidden sm:inline">
                  - Recevez nos actualités et offres exclusives directement dans votre boîte mail
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={handleSubscribe}
                className="px-4 py-2 bg-white text-academy font-semibold rounded-lg text-sm hover:bg-white/90 transition-colors shadow-md hover:shadow-lg transform hover:scale-105 duration-200"
              >
                S'abonner
              </button>
              
              <button
                onClick={handleClose}
                className="p-1.5 text-white/80 hover:text-white transition-colors rounded-lg hover:bg-white/10"
                aria-label="Fermer le bandeau"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default NewsletterBanner;
