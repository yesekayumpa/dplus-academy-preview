import { useNavigate, useLocation } from "react-router-dom";
import { ChevronLeft, ChevronRight, TrendingUp, Wrench, BarChart3, Rocket, Users } from "lucide-react";

const FormationPagination = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Définition des piliers de formation dans l'ordre
  const formations = [
    { 
      name: "Finance & Investissement", 
      route: "/finance-investment",
      icon: TrendingUp
    },
    { 
      name: "Outils digitaux & Automatisation", 
      route: "/digital-tools-automation",
      icon: Wrench
    },
    { 
      name: "Data & Analytics", 
      route: "/data-analytics",
      icon: BarChart3
    },
    { 
      name: "Entrepreneuriat", 
      route: "/entrepreneurship",
      icon: Rocket
    },
    { 
      name: "Soft skills & Leadership", 
      route: "/soft-skills-leadership",
      icon: Users
    }
  ];

  // Trouver l'index de la page actuelle
  const currentIndex = formations.findIndex(f => f.route === location.pathname);

  // Fonctions de navigation
  const goToPrevious = () => {
    if (currentIndex > 0) {
      navigate(formations[currentIndex - 1].route);
      window.scrollTo(0, 0);
    }
  };

  const goToNext = () => {
    if (currentIndex < formations.length - 1) {
      navigate(formations[currentIndex + 1].route);
      window.scrollTo(0, 0);
    }
  };

  const goToFormation = (index: number) => {
    navigate(formations[index].route);
    window.scrollTo(0, 0);
  };

  // Si on n'est pas sur une page de pilier, ne pas afficher la pagination
  if (currentIndex === -1) {
    return null;
  }

  return (
    <section className="relative bg-gradient-to-br from-amber-50 via-red-900/20 to-rose-900/10 border-t border-red-900/20 backdrop-blur-sm py-6 overflow-hidden">
      {/* Fond décoratif */}
      <div className="absolute inset-0 opacity-3">
        <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-red-600/20 to-transparent rounded-full blur-2xl"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-amber-600/20 to-transparent rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 left-1/4 w-48 h-48 bg-gradient-to-tr from-rose-600/15 to-transparent rounded-full blur-xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto">
          {/* Header compact */}
          <div className="text-center mb-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/80 backdrop-blur-md rounded-full border border-white/20 shadow-lg">
              <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-red-600 to-rose-700 animate-pulse"></div>
              <span className="text-xs font-medium text-gray-700">Parcours de Formation</span>
              <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-amber-600 to-orange-700 animate-pulse"></div>
            </div>
          </div>

          {/* Navigation compacte */}
          <div className="flex items-center justify-center gap-4 mb-4">
            {/* Bouton précédent */}
            <button
              onClick={goToPrevious}
              disabled={currentIndex === 0}
              className={`group relative p-2.5 rounded-xl transition-all duration-300 transform-gpu ${
                currentIndex === 0 
                  ? 'opacity-40 cursor-not-allowed scale-95' 
                  : 'opacity-100 hover:scale-110 hover:shadow-xl hover:shadow-red-600/25'
              }`}
              title="Formation précédente"
            >
              <div className={`absolute inset-0 rounded-xl transition-all duration-300 ${
                currentIndex === 0 
                  ? 'bg-red-900/20' 
                  : 'bg-gradient-to-br from-red-100 to-rose-50 group-hover:from-red-700 group-hover:to-red-600'
              }`}></div>
              <ChevronLeft className={`relative z-10 w-4 h-4 transition-all duration-300 ${
                currentIndex === 0 ? 'text-red-300' : 'text-red-700 group-hover:text-white group-hover:scale-125'
              }`} />
            </button>

            {/* Indicateurs de page */}
            <div className="flex items-center gap-2">
              {formations.map((formation, index) => {
                const isActive = index === currentIndex;
                const isPast = index < currentIndex;
                const isFuture = index > currentIndex;
                
                return (
                  <button
                    key={formation.route}
                    onClick={() => goToFormation(index)}
                    className={`group relative transition-all duration-500 transform-gpu ${
                      isActive 
                        ? 'scale-125 z-20' 
                        : 'hover:scale-115 hover:z-30'
                    }`}
                    title={formation.name}
                  >
                    <div className={`relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 overflow-hidden ${
                      isActive 
                        ? 'bg-gradient-to-br from-red-700 via-rose-600 to-orange-600 shadow-xl shadow-red-500/50 ring-4 ring-white/50 ring-offset-1 ring-offset-red-600/20' 
                        : isPast
                        ? 'bg-gradient-to-br from-amber-600 to-orange-500 shadow-lg opacity-80'
                        : isFuture
                        ? 'bg-gradient-to-br from-red-300 to-rose-400 shadow-lg opacity-60'
                        : 'bg-gradient-to-br from-red-100 to-rose-200 shadow-md hover:from-red-700 hover:to-red-600 hover:shadow-lg'
                    }`}>
                      
                      {/* Icône */}
                      <formation.icon className={`relative z-10 w-4 h-4 transition-all duration-300 ${
                        isActive 
                          ? 'text-white drop-shadow-lg' 
                          : isPast
                          ? 'text-white drop-shadow-amber'
                          : isFuture
                          ? 'text-gray-400'
                          : 'text-red-700 group-hover:text-white group-hover:drop-shadow-red'
                      }`} />
                      
                      {/* Effet de brillance pour l'élément actif */}
                      {isActive && (
                        <>
                          <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent rounded-xl"></div>
                          <div className="absolute -inset-0.5 bg-gradient-to-br from-red-600/30 via-rose-600/20 to-orange-600/30 rounded-xl animate-pulse"></div>
                        </>
                      )}
                    </div>
                    
                    {/* Tooltip compact */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-50">
                      <div className="bg-red-900/95 backdrop-blur-xl text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap shadow-xl border border-white/10">
                        <div className="flex items-center gap-1.5 mb-1">
                          <div className={`w-1.5 h-1.5 rounded-full ${
                            isActive ? 'bg-orange-400' : isPast ? 'bg-amber-400' : 'bg-gray-400'
                          }`}></div>
                          <span className="font-medium text-xs">{formation.name}</span>
                        </div>
                        <div className="text-xs opacity-80">Explorer</div>
                      </div>
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-6 border-r-6 border-t-6 border-transparent border-t-red-900/80"></div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Bouton suivant */}
            <button
              onClick={goToNext}
              disabled={currentIndex === formations.length - 1}
              className={`group relative p-2.5 rounded-xl transition-all duration-300 transform-gpu ${
                currentIndex === formations.length - 1 
                  ? 'opacity-40 cursor-not-allowed scale-95' 
                  : 'opacity-100 hover:scale-110 hover:shadow-xl hover:shadow-red-600/25'
              }`}
              title="Formation suivante"
            >
              <div className={`absolute inset-0 rounded-xl transition-all duration-300 ${
                currentIndex === formations.length - 1 
                  ? 'bg-red-900/20' 
                  : 'bg-gradient-to-br from-red-100 to-rose-50 group-hover:from-red-700 group-hover:to-red-600'
              }`}></div>
              <ChevronRight className={`relative z-10 w-4 h-4 transition-all duration-300 ${
                currentIndex === formations.length - 1 ? 'text-red-300' : 'text-red-700 group-hover:text-white group-hover:scale-125'
              }`} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FormationPagination;
