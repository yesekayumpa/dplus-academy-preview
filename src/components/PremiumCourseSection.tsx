import React, { useState, useEffect } from 'react';
import { Sparkles, Star, MessageCircle, Lightbulb, X } from 'lucide-react';

interface PremiumCourseSectionProps {
  course?: {
    title?: string;
    description?: string;
    image?: string;
    price?: number;
    originalPrice?: number;
    duration?: string;
    modules?: number;
    instructor?: string;
    level?: string;
    category?: string;
  };
}

const PremiumCourseSection = ({ course }: PremiumCourseSectionProps) => {
  const [showChariowModal, setShowChariowModal] = useState(false);

  const openChariowModal = () => {
    setShowChariowModal(true);
    // Bloquer le scroll de la page
    document.body.style.overflow = 'hidden';
    // Load Chariow widget script and CSS when modal opens
    const script = document.createElement('script');
    script.src = 'https://js.chariowcdn.com/v1/widget.min.js';
    script.async = true;
    document.head.appendChild(script);

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://js.chariowcdn.com/v1/widget.min.css';
    document.head.appendChild(link);
  };

  const closeChariowModal = () => {
    setShowChariowModal(false);
    // Réactiver le scroll de la page
    document.body.style.overflow = 'unset';
  };

  // Nettoyer le style overflow quand le composant est démonté
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);
  return (
    <section className="py-3 bg-white" id="formations" data-courses-section="true">
      <div className="relative bg-white text-gray-900 py-4 px-3 sm:px-4 lg:px-6 pt-8 sm:pt-12 lg:pt-16">
        <div className="relative z-10 max-w-4xl mx-auto text-center pt-6 sm:pt-8 lg:pt-12 pb-3">
          <div className="inline-flex items-center px-3 py-1.5 mb-4 rounded-full bg-gradient-to-r from-red-500/10 to-red-600/10 border border-red-200 text-red-600 text-sm font-medium backdrop-blur-sm">
            <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
            Formation Premium
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight mb-4">
            <span className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 bg-clip-text text-transparent">
              {course?.title || "Deviens un Designer"}
            </span>
            <span className="block text-2xl sm:text-3xl lg:text-4xl mt-2 bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
              {course?.category === "Design" ? "Graphique Professionnel" : "Expert dans votre domaine"}
            </span>
          </h1>
          <p className="text-base sm:text-lg text-gray-600 mb-6 max-w-3xl mx-auto leading-relaxed">
            {course?.description || "Apprends à utiliser Photoshop, Illustrator et InDesign comme un pro, avec en BONUS des formations en Montage Vidéo (Premiere Pro) et Marketing Digital."}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <button 
              onClick={openChariowModal}
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3 px-4 sm:px-6 rounded-xl text-sm transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl max-w-xs sm:max-w-none inline-flex items-center justify-center"
            >
              <span className="flex items-center gap-2">Acheter la formation</span>
            </button>
          </div>
        </div>
      </div>
      
      <div className="max-w-5xl mx-auto px-3 sm:px-4 lg:px-6 bg-white">
        <section className="py-3 mb-3">
          <div className="max-w-5xl mx-auto px-3 sm:px-4 lg:px-6">
            <div className="rounded-3xl overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-6 lg:gap-8 items-center">
                <div className="p-2 md:p-4 lg:p-6">
                  <div className="mb-6">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 leading-tight">
                      Maîtrisez les outils professionnels
                      <span className="block text-red-600">du design graphique</span>
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                      Formation complète sur Photoshop, Illustrator et les logiciels standards de l'industrie.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                    <div className="group relative p-3 rounded-2xl cursor-pointer transition-all duration-300">
                      <div className="relative flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                          <Sparkles className="w-5 h-5 text-red-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900 mb-1 text-sm leading-tight whitespace-normal">
                            Formation complète
                          </h4>
                          <p className="text-gray-600 text-xs leading-relaxed whitespace-normal">
                            Photoshop, Illustrator et outils professionnels
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="group relative p-3 rounded-2xl cursor-pointer transition-all duration-300">
                      <div className="relative flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                          <Star className="w-5 h-5 text-amber-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900 mb-1 text-sm leading-tight whitespace-normal">
                            Accompagnement personnalisé
                          </h4>
                          <p className="text-gray-600 text-xs leading-relaxed whitespace-normal">
                            Suivi par des experts du secteur
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="group relative p-3 rounded-2xl cursor-pointer transition-all duration-300">
                      <div className="relative flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                          <MessageCircle className="w-5 h-5 text-red-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900 mb-1 text-sm leading-tight whitespace-normal">
                            Certification professionnelle
                          </h4>
                          <p className="text-gray-600 text-xs leading-relaxed whitespace-normal">
                            Reconnue par les entreprises
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="group relative p-3 rounded-2xl cursor-pointer transition-all duration-300">
                      <div className="relative flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                          <Lightbulb className="w-5 h-5 text-emerald-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900 mb-1 text-sm leading-tight whitespace-normal">
                            Évolution de carrière
                          </h4>
                          <p className="text-gray-600 text-xs leading-relaxed whitespace-normal">
                            Développez votre potentiel professionnel
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="relative h-48 lg:h-full min-h-[250px] flex items-center justify-center p-2 md:p-4">
                  <div className="relative">
                    <img 
                      src={course?.image || "/pack-design-graphique-removebg-preview.png"} 
                      alt={course?.title || "Pack Design Graphique"} 
                      className="relative w-full h-full object-contain rounded-2xl max-w-md mx-auto transform hover:scale-105 transition-transform duration-300" 
                      loading="eager"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/pack-design-graphique-removebg-preview.png";
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Chariow Modal */}
      {showChariowModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-auto relative">
            <button
              onClick={closeChariowModal}
              className="absolute top-4 right-4 z-10 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
            
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Rejoindre la formation</h2>
              
              {/* Chariow Widget */}
              <div id="chariow-widget" 
                   data-product-id="prd_6lpbgj"
                   data-store-domain="academydmplus-group.mychariow.shop"
                   data-style="frame"
                   data-border-style="rounded"
                   data-cta-width="xs"
                   data-cta-animation="none"
                   data-locale="en"
                   data-primary-color="#ff0000"
                   data-background-color="#FFFFFF"
                   data-custom-cta-text="Rejoindre la formation">
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default PremiumCourseSection;
