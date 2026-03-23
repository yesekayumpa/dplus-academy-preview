import SalesFunnelHeader from "@/components/SalesFunnelHeader";
import PremiumCourseSection from "@/components/PremiumCourseSection";
import { useState, useEffect } from "react";

const SalesFunnelPage = () => {
  const [openModule, setOpenModule] = useState<number | null>(null);
  const [showDescription, setShowDescription] = useState<boolean>(false);

  // Scroll en haut au chargement de la page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleModule = (moduleNumber: number) => {
    setOpenModule(openModule === moduleNumber ? null : moduleNumber);
  };

  const toggleDescription = () => {
    setShowDescription(!showDescription);
  };
  
  return (
    <div className="min-h-screen bg-white">
      <SalesFunnelHeader />
      <div className="pb-6 px-4">
        <div className="max-w-4xl mx-auto">
        </div>
      </div>
      
      <PremiumCourseSection />
      
      <div className="max-w-xl sm:max-w-6xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
        <div className="text-center mb-2 sm:mb-3 md:mb-4 lg:mb-6">
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-1 sm:mb-2 md:mb-3">Ce que vous allez apprendre</h2>
          <div className="w-12 h-0.5 bg-red-500 mx-auto rounded-full mb-1 sm:mb-2 md:mb-4"></div>
          <p className="text-xs sm:text-sm md:text-base text-gray-600 max-w-2xl mx-auto">Maîtrisez les compétences essentielles du design graphique professionnel</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4 max-w-sm sm:max-w-5xl mx-auto">
          <div className="bg-white rounded-lg sm:rounded-xl p-2 sm:p-3 lg:p-4 shadow-sm transition-all duration-200">
            <div>
              <h3 className="font-semibold text-gray-900 mb-0.5 sm:mb-1 text-xs sm:text-sm md:text-base">Maîtriser les outils essentiels</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-tight sm:leading-relaxed md:leading-relaxed">Photoshop, Illustrator et InDesign pour concrétiser vos idées créatives</p>
            </div>
          </div>
          <div className="bg-white rounded-lg sm:rounded-xl p-2 sm:p-3 lg:p-4 shadow-sm transition-all duration-200">
            <div>
              <h3 className="font-semibold text-gray-900 mb-0.5 sm:mb-1 text-xs sm:text-sm md:text-base">Créer des visuels percutants</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-tight sm:leading-relaxed md:leading-relaxed">Logos, affiches, flyers et supports de communication qui captent l'attention</p>
            </div>
          </div>
          <div className="bg-white rounded-lg sm:rounded-xl p-2 sm:p-3 lg:p-4 shadow-sm transition-all duration-200">
            <div>
              <h3 className="font-semibold text-gray-900 mb-0.5 sm:mb-1 text-xs sm:text-sm md:text-base">Optimiser votre workflow</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-tight sm:leading-relaxed md:leading-relaxed">Raccourcis, automatisations et bonnes pratiques des professionnels</p>
            </div>
          </div>
          <div className="bg-white rounded-lg sm:rounded-xl p-2 sm:p-3 lg:p-4 shadow-sm transition-all duration-200">
            <div>
              <h3 className="font-semibold text-gray-900 mb-0.5 sm:mb-1 text-xs sm:text-sm md:text-base">Adapter vos créations</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-tight sm:leading-relaxed md:leading-relaxed">Designs adaptés à tous supports (print, web, réseaux sociaux)</p>
            </div>
          </div>
          <div className="bg-white rounded-lg sm:rounded-xl p-2 sm:p-3 lg:p-4 shadow-sm transition-all duration-200">
            <div>
              <h3 className="font-semibold text-gray-900 mb-0.5 sm:mb-1 text-xs sm:text-sm md:text-base">Développer votre identité visuelle</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-tight sm:leading-relaxed md:leading-relaxed">Fondamentaux du graphisme (couleurs, typographies, composition)</p>
            </div>
          </div>
          <div className="bg-red-50 rounded-xl p-2 md:p-3 lg:p-4 shadow-sm hover:bg-red-100 transition-all duration-200">
            <div>
              <h3 className="font-semibold text-gray-900 mb-0.5 sm:mb-1 text-xs sm:text-sm md:text-base">Ressources exclusives</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-tight sm:leading-relaxed md:leading-relaxed">Templates, modèles et guides professionnels inclus</p>
              <span className="inline-block mt-1 sm:mt-2 px-2 py-1 bg-red-600 text-white rounded text-xs sm:text-sm font-medium">Bonus</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="text-center mb-6 sm:mb-8 md:mb-12">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-3 md:mb-4">Programme de la Formation</h2>
          <div className="w-16 h-0.5 sm:w-20 bg-red-500 mx-auto rounded-full mb-4 sm:mb-6"></div>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl sm:max-w-3xl mx-auto">6 modules complets pour devenir un designer graphique professionnel</p>
        </div>
        <div className="mt-8 sm:mt-12 md:mt-16">
          <div className="text-center mb-4 sm:mb-6 md:mb-8">
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-1 sm:mb-2 md:mb-3">
              <span className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 bg-clip-text text-transparent">Découvrir la formation</span>
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm md:text-base max-w-lg sm:max-w-xl mx-auto">Une présentation immersive de mes créations</p>
          </div>
          <div className="relative max-w-xs sm:max-w-2xl md:max-w-3xl mx-auto">
            <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded sm:rounded-lg md:rounded-xl lg:rounded-2xl p-0.5 sm:p-1 shadow-xl group">
              <div className="absolute inset-0 bg-gradient-to-tr from-red-500/20 via-transparent to-red-500/20 rounded sm:rounded-lg md:rounded-xl lg:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-white/10 to-transparent rounded sm:rounded-lg md:rounded-xl lg:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
              <div className="relative bg-black rounded sm:rounded-lg md:rounded-xl overflow-hidden aspect-video">
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <div className="w-8 h-8 sm:w-10 sm:h-12 md:w-16 md:h-16 bg-red-600/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl hover:scale-110 hover:bg-red-500 transition-all duration-500 cursor-pointer group">
                    <svg className="w-3 h-3 sm:w-4 sm:h-5 md:w-6 md:h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"></path>
                    </svg>
                    <div className="absolute inset-0 bg-red-600/30 rounded-full animate-ping"></div>
                  </div>
                </div>
                <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-16 md:w-20 md:h-24 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-1 sm:mb-2 md:mb-3">
                      <svg className="w-5 h-5 sm:w-6 sm:h-8 md:w-10 md:h-10 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"></path>
                      </svg>
                    </div>
                    <p className="text-gray-400 text-xs sm:text-sm">Cliquez pour lire la vidéo</p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>
            <div className="mt-3 sm:mt-4 md:mt-6 text-center">
              <p className="text-gray-500 text-xs">
                <span className="inline-flex items-center gap-1">
                  <svg className="w-2 h-2 sm:w-3 sm:h-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"></path>
                  </svg>3 minutes
                </span>
                <span className="mx-1">•</span>
                <span className="inline-flex items-center gap-1">
                  <svg className="w-2 h-2 sm:w-3 sm:h-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>Présentation
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="p-2 sm:p-3 mt-4 sm:mt-6 max-w-xs sm:max-w-sm lg:max-w-lg relative overflow-hidden mx-auto">
          <div className="absolute top-0 right-0 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-red-400/5 to-red-500/5 rounded-full filter blur-lg animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-tr from-blue-400/5 to-blue-500/5 rounded-full filter blur-lg animate-pulse" style={{animationDelay: "1s"}}></div>
          <div className="relative z-10 rounded-lg bg-gradient-to-r from-gray-50/80 to-white/80 backdrop-blur-sm border border-gray-100/50 shadow-sm">
            <div className="flex flex-nowrap justify-between items-center text-left px-1 sm:px-2">
              <div className="group relative flex items-center space-x-0.5 sm:space-x-1 bg-gradient-to-br from-white to-gray-50/50 rounded-lg p-1 sm:p-2 transition-all duration-300 flex-shrink-0 border border-gray-100/30 shadow-sm">
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-red-500 relative z-10">
                  <path d="M12 7v14"></path>
                  <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"></path>
                </svg>
                <div className="text-[8px] sm:text-xs md:text-sm font-bold text-gray-900 leading-tight relative z-10">6 Modules</div>
              </div>
              <div className="group relative flex items-center space-x-0.5 sm:space-x-1 bg-gradient-to-br from-white to-gray-50/50 rounded-lg p-1 sm:p-2 transition-all duration-300 flex-shrink-0 border border-gray-100/30 shadow-sm">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-blue-500 relative z-10">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <div className="text-[8px] sm:text-xs md:text-sm font-bold text-gray-900 leading-tight relative z-10">157 min</div>
              </div>
              <div className="group relative flex items-center space-x-0.5 sm:space-x-1 bg-gradient-to-br from-white to-gray-50/50 rounded-lg p-1 sm:p-2 transition-all duration-300 flex-shrink-0 border border-gray-100/30 shadow-sm">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-green-500 relative z-10">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="m21 21-5.197-5.197m0 0A7.97 7.97 0 0 0 16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                  <circle cx="17" cy="17" r="4"></circle>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
                <div className="text-[9px] sm:text-sm font-bold text-gray-900 leading-tight relative z-10">Illimité Accès</div>
              </div>
              <div className="group relative flex items-center space-x-0.5 bg-gradient-to-br from-white to-gray-50/50 rounded-lg p-1 sm:p-2 transition-all duration-300 flex-shrink-0 border border-gray-100/30 shadow-sm">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-2.5 h-2.5 sm:w-5 sm:h-5 text-amber-500 relative z-10">
                  <path d="M21.801 10A10 10 0 1 1 17 3.335"></path>
                  <path d="m9 11 3 3L22 4"></path>
                </svg>
                <div className="text-xs sm:text-base font-bold text-gray-900 leading-tight relative z-10">Certificat</div>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-xl sm:max-w-3xl md:max-w-4xl mx-auto space-y-3 sm:space-y-4">
          {/* Module 1 */}
          <div className="bg-white border border-gray-200 rounded-lg sm:rounded-xl overflow-hidden">
            <button 
              onClick={() => toggleModule(1)}
              className="w-full flex items-center justify-between p-3 sm:p-4 md:p-6 text-left hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="flex items-center gap-2 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-red-600 font-bold text-sm sm:text-lg">01</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900">Introduction</h3>
                  <p className="text-xs sm:text-sm text-gray-600 mt-0.5 sm:mt-1">Présentation de la formation complète</p>
                </div>
              </div>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-red-600 transition-transform duration-300 flex-shrink-0 ${openModule === 1 ? 'rotate-180' : ''}`}
              >
                <path d="m6 9 6 6 6-6"></path>
              </svg>
            </button>
            <div className={`border-t border-gray-200 transition-all duration-300 ${openModule === 1 ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
              <div className="p-6 space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-red-600">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polygon points="10 8 16 12 10 16 10 8"></polygon>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Présentation de la formation complète</h4>
                      <span className="text-xs text-gray-500">Leçon 1</span>
                    </div>
                  </div>
                  <ul className="space-y-2 ml-11">
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5 flex-shrink-0"></div>
                      <span>Logiciels incontournables du design graphique</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5 flex-shrink-0"></div>
                      <span>Pack bonus montage vidéo et marketing digital</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5 flex-shrink-0"></div>
                      <span>Cadre sécurisé et accessible</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/* Module 2 */}
          <div className="bg-white border border-gray-200 rounded-lg sm:rounded-xl overflow-hidden">
            <button 
              onClick={() => toggleModule(2)}
              className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="flex items-center gap-2 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-red-600 font-bold text-sm sm:text-lg">02</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900">Les outils essentiels</h3>
                  <p className="text-xs sm:text-sm text-gray-600 mt-0.5 sm:mt-1">Maîtrise Photoshop, Illustrator, InDesign</p>
                </div>
              </div>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className={`w-6 h-6 text-red-600 transition-transform duration-300 flex-shrink-0 ${openModule === 2 ? 'rotate-180' : ''}`}
              >
                <path d="m6 9 6 6 6-6"></path>
              </svg>
            </button>
            <div className={`border-t border-gray-200 transition-all duration-300 ${openModule === 2 ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
              <div className="p-6 space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-red-600">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polygon points="10 8 16 12 10 16 10 8"></polygon>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Maîtrise Photoshop, Illustrator, InDesign</h4>
                      <span className="text-xs text-gray-500">Leçon 1</span>
                    </div>
                  </div>
                  <ul className="space-y-2 ml-11">
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5 flex-shrink-0"></div>
                      <span>Adobe Photoshop, Illustrator, InDesign</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5 flex-shrink-0"></div>
                      <span>Alternatives gratuites puissantes</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5 flex-shrink-0"></div>
                      <span>Choisir selon ses objectifs</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/* Module 3 */}
          <div className="bg-white border border-gray-200 rounded-lg sm:rounded-xl overflow-hidden">
            <button 
              onClick={() => toggleModule(3)}
              className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="flex items-center gap-2 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-red-600 font-bold text-sm sm:text-lg">03</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900">Projets pratiques</h3>
                  <p className="text-xs sm:text-sm text-gray-600 mt-0.5 sm:mt-1">Créez des projets réels</p>
                </div>
              </div>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className={`w-6 h-6 text-red-600 transition-transform duration-300 flex-shrink-0 ${openModule === 3 ? 'rotate-180' : ''}`}
              >
                <path d="m6 9 6 6 6-6"></path>
              </svg>
            </button>
            <div className={`border-t border-gray-200 transition-all duration-300 ${openModule === 3 ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
              <div className="p-6 space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-red-600">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polygon points="10 8 16 12 10 16 10 8"></polygon>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Créez des projets réels</h4>
                      <span className="text-xs text-gray-500">Leçon 1</span>
                    </div>
                  </div>
                  <ul className="space-y-2 ml-11">
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5 flex-shrink-0"></div>
                      <span>Analyse d'un brief client</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5 flex-shrink-0"></div>
                      <span>Recherche d'inspiration</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5 flex-shrink-0"></div>
                      <span>Création pas à pas d'une affiche</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5 flex-shrink-0"></div>
                      <span>Export aux bons formats</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/* Module 4 */}
          <div className="bg-white border border-gray-200 rounded-lg sm:rounded-xl overflow-hidden">
            <button 
              onClick={() => toggleModule(4)}
              className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="flex items-center gap-2 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-red-600 font-bold text-sm sm:text-lg">04</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900">Maîtrise du design</h3>
                  <p className="text-xs sm:text-sm text-gray-600 mt-0.5 sm:mt-1">Théorie et pratique avancées</p>
                </div>
              </div>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className={`w-6 h-6 text-red-600 transition-transform duration-300 flex-shrink-0 ${openModule === 4 ? 'rotate-180' : ''}`}
              >
                <path d="m6 9 6 6 6-6"></path>
              </svg>
            </button>
            <div className={`border-t border-gray-200 transition-all duration-300 ${openModule === 4 ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
              <div className="p-6 space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-red-600">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polygon points="10 8 16 12 10 16 10 8"></polygon>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Théorie et pratique avancées</h4>
                      <span className="text-xs text-gray-500">Leçon 1</span>
                    </div>
                  </div>
                  <ul className="space-y-2 ml-11">
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5 flex-shrink-0"></div>
                      <span>Les 7 principes fondamentaux du design</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5 flex-shrink-0"></div>
                      <span>Composition et hiérarchie visuelle</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5 flex-shrink-0"></div>
                      <span>Grilles et alignement</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5 flex-shrink-0"></div>
                      <span>Analyse et amélioration de visuels</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/* Module 5 */}
          <div className="bg-white border border-gray-200 rounded-lg sm:rounded-xl overflow-hidden">
            <button 
              onClick={() => toggleModule(5)}
              className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="flex items-center gap-2 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-red-600 font-bold text-sm sm:text-lg">05</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900">Identité visuelle</h3>
                  <p className="text-xs sm:text-sm text-gray-600 mt-0.5 sm:mt-1">Charte graphique complet</p>
                </div>
              </div>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className={`w-6 h-6 text-red-600 transition-transform duration-300 flex-shrink-0 ${openModule === 5 ? 'rotate-180' : ''}`}
              >
                <path d="m6 9 6 6 6-6"></path>
              </svg>
            </button>
            <div className={`border-t border-gray-200 transition-all duration-300 ${openModule === 5 ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
              <div className="p-6 space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-red-600">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polygon points="10 8 16 12 10 16 10 8"></polygon>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Charte graphique complet</h4>
                      <span className="text-xs text-gray-500">Leçon 1</span>
                    </div>
                  </div>
                  <ul className="space-y-2 ml-11">
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5 flex-shrink-0"></div>
                      <span>Recherche et création d'un moodboard</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5 flex-shrink-0"></div>
                      <span>Création du logo et direction artistique</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5 flex-shrink-0"></div>
                      <span>Déclinaison sur différents supports</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5 flex-shrink-0"></div>
                      <span>Constitution du dossier client</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/* Module 6 */}
          <div className="bg-white border border-gray-200 rounded-lg sm:rounded-xl overflow-hidden">
            <button 
              onClick={() => toggleModule(6)}
              className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="flex items-center gap-2 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-red-600 font-bold text-sm sm:text-lg">06</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900">Lancement professionnel</h3>
                  <p className="text-xs sm:text-sm text-gray-600 mt-0.5 sm:mt-1">Stratégies de carrière</p>
                </div>
              </div>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className={`w-6 h-6 text-red-600 transition-transform duration-300 flex-shrink-0 ${openModule === 6 ? 'rotate-180' : ''}`}
              >
                <path d="m6 9 6 6 6-6"></path>
              </svg>
            </button>
            <div className={`border-t border-gray-200 transition-all duration-300 ${openModule === 6 ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
              <div className="p-6 space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-red-600">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polygon points="10 8 16 12 10 16 10 8"></polygon>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Portfolio et premiers clients</h4>
                      <span className="text-xs text-gray-500">Leçon 1</span>
                    </div>
                  </div>
                  <ul className="space-y-2 ml-11">
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5 flex-shrink-0"></div>
                      <span>Créer un portfolio professionnel</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5 flex-shrink-0"></div>
                      <span>Plateformes d'exposition (Behance, Instagram)</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5 flex-shrink-0"></div>
                      <span>Fixer ses tarifs et propositions</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5 flex-shrink-0"></div>
                      <span>Stratégies pour trouver ses premiers clients</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 mb-4">
        <div className="text-center mb-4 sm:mb-6 md:mb-8">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 md:mb-3">Choisissez Votre Parcours</h2>
          <div className="w-16 h-0.5 bg-red-600 mx-auto rounded-full mb-2 md:mb-4"></div>
          <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">Des formations adaptées à tous les niveaux, conçues par des experts pour vous aider à maîtriser la finance personnelle et l'investissement.</p>
        </div>
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="group relative bg-gradient-to-br from-white to-gray-50 rounded-xl transition-all duration-500 border-2 border-gray-100 overflow-hidden hover:border-red-200 hover:scale-[1.02]">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-red-50 to-transparent rounded-full blur-2xl opacity-50"></div>
              <div className="p-4 relative z-10">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-white">
                      <path d="M12 7v14"></path>
                      <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-xs md:text-sm">Standard</h3>
                    <p className="text-xs text-gray-600 font-medium">Formation complète</p>
                  </div>
                </div>
                <div className="mb-5">
                  <div className="flex items-baseline justify-center bg-gradient-to-r from-red-50 to-red-50 rounded-xl py-2 px-3 border border-red-100">
                    <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">297</span>
                    <span className="text-sm font-semibold text-red-600 ml-1">FCFA</span>
                  </div>
                  <p className="text-center text-xs text-gray-500 mt-1 md:mt-2 font-medium">Prix unique • Accès immédiat</p>
                </div>
                <p className="text-gray-600 mb-3 md:mb-4 text-xs leading-tight md:leading-relaxed">Formations complètes pour apprendre à votre rythme avec nos ressources en ligne.</p>
                <ul className="space-y-1.5 md:space-y-2 mb-3 md:mb-5">
                  <li className="flex items-center bg-gray-50 rounded-lg p-1.5 md:p-2 transition-all duration-300 hover:bg-red-50">
                    <div className="w-4 h-4 md:w-5 md:h-5 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center mr-1.5 md:mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-2 h-2 md:w-2.5 md:h-2.5 text-white">
                        <path d="M21.801 10A10 10 0 1 1 17 3.335"></path>
                        <path d="m9 11 3 3L22 4"></path>
                      </svg>
                    </div>
                    <span className="text-xs font-medium text-gray-700">Accès illimité aux cours</span>
                  </li>
                  <li className="flex items-center bg-gray-50 rounded-lg p-1.5 md:p-2 transition-all duration-300 hover:bg-red-50">
                    <div className="w-4 h-4 md:w-5 md:h-5 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center mr-1.5 md:mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-2 h-2 md:w-2.5 md:h-2.5 text-white">
                        <path d="M21.801 10A10 10 0 1 1 17 3.335"></path>
                        <path d="m9 11 3 3L22 4"></path>
                      </svg>
                    </div>
                    <span className="text-xs font-medium text-gray-700">Ressources téléchargeables</span>
                  </li>
                  <li className="flex items-center bg-gray-50 rounded-lg p-1.5 md:p-2 transition-all duration-300 hover:bg-red-50">
                    <div className="w-4 h-4 md:w-5 md:h-5 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center mr-1.5 md:mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-2 h-2 md:w-2.5 md:h-2.5 text-white">
                        <path d="M21.801 10A10 10 0 1 1 17 3.335"></path>
                        <path d="m9 11 3 3L22 4"></path>
                      </svg>
                    </div>
                    <span className="text-xs font-medium text-gray-700">Communauté active</span>
                  </li>
                  <li className="flex items-center bg-gray-50 rounded-lg p-1.5 md:p-2 transition-all duration-300 hover:bg-red-50">
                    <div className="w-4 h-4 md:w-5 md:h-5 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center mr-1.5 md:mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-2 h-2 md:w-2.5 md:h-2.5 text-white">
                        <path d="M18 6 6 18"></path>
                        <path d="m6 6 12 12"></path>
                      </svg>
                    </div>
                    <span className="text-xs font-medium text-gray-700">Suivi régulier du formateur</span>
                  </li>
                </ul>
                <button className="w-full py-2.5 px-3 bg-gradient-to-r from-black to-gray-800 text-white font-semibold rounded-full transition-all duration-500 text-xs hover:from-gray-800 hover:to-black transform hover:scale-[1.02] border border-gray-200">Accéder au cours</button>
              </div>
            </div>
            <div className="group relative bg-gradient-to-br from-white to-gray-50 rounded-xl transition-all duration-500 border-2 border-gray-100 overflow-hidden hover:border-red-200 hover:scale-[1.02]">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-red-50 to-transparent rounded-full blur-2xl opacity-50"></div>
              <div className="p-4 relative z-10">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-white">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-xs md:text-sm">Premium</h3>
                    <p className="text-xs text-red-600 font-medium">Accompagnement personnalisé</p>
                  </div>
                </div>
                <div className="mb-5">
                  <div className="flex items-baseline justify-center bg-gradient-to-r from-red-50 to-red-50 rounded-xl py-2 px-3 border border-red-100">
                    <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">597</span>
                    <span className="text-sm font-semibold text-red-600 ml-1">FCFA</span>
                  </div>
                  <p className="text-center text-xs text-gray-500 mt-1 md:mt-2 font-medium">Prix unique • Accès immédiat</p>
                </div>
                <p className="text-gray-600 mb-3 md:mb-4 text-xs leading-tight md:leading-relaxed">Coaching individuel avec suivi personnalisé pour atteindre vos objectifs rapidement.</p>
                <ul className="space-y-1.5 md:space-y-2 mb-3 md:mb-5">
                  <li className="flex items-center bg-gray-50 rounded-lg p-1.5 md:p-2 transition-all duration-300 hover:bg-red-50">
                    <div className="w-4 h-4 md:w-5 md:h-5 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center mr-1.5 md:mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-2 h-2 md:w-2.5 md:h-2.5 text-white">
                        <path d="M21.801 10A10 10 0 1 1 17 3.335"></path>
                        <path d="m9 11 3 3L22 4"></path>
                      </svg>
                    </div>
                    <span className="text-xs font-medium text-gray-700">Accès illimité aux cours</span>
                  </li>
                  <li className="flex items-center bg-gray-50 rounded-lg p-1.5 md:p-2 transition-all duration-300 hover:bg-red-50">
                    <div className="w-4 h-4 md:w-5 md:h-5 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center mr-1.5 md:mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-2 h-2 md:w-2.5 md:h-2.5 text-white">
                        <path d="M21.801 10A10 10 0 1 1 17 3.335"></path>
                        <path d="m9 11 3 3L22 4"></path>
                      </svg>
                    </div>
                    <span className="text-xs font-medium text-gray-700">Ressources téléchargeables</span>
                  </li>
                  <li className="flex items-center bg-gray-50 rounded-lg p-1.5 md:p-2 transition-all duration-300 hover:bg-red-50">
                    <div className="w-4 h-4 md:w-5 md:h-5 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center mr-1.5 md:mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-2 h-2 md:w-2.5 md:h-2.5 text-white">
                        <path d="M21.801 10A10 10 0 1 1 17 3.335"></path>
                        <path d="m9 11 3 3L22 4"></path>
                      </svg>
                    </div>
                    <span className="text-xs font-medium text-gray-700">Communauté active</span>
                  </li>
                  <li className="flex items-center bg-gray-50 rounded-lg p-1.5 md:p-2 transition-all duration-300 hover:bg-red-50">
                    <div className="w-4 h-4 md:w-5 md:h-5 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center mr-1.5 md:mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-2 h-2 md:w-2.5 md:h-2.5 text-white">
                        <path d="M21.801 10A10 10 0 1 1 17 3.335"></path>
                        <path d="m9 11 3 3L22 4"></path>
                      </svg>
                    </div>
                    <span className="text-xs font-medium text-gray-700">Suivi régulier du formateur</span>
                  </li>
                </ul>
                <button className="w-full py-2.5 px-3 bg-gradient-to-r from-black to-gray-800 text-white font-semibold rounded-full transition-all duration-500 text-xs hover:from-gray-800 hover:to-black transform hover:scale-[1.02] border border-gray-200">Accéder au cours</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Section Formateur - CORRIGÉE */}
      <div className="stats-section-container w-full max-w-xl sm:max-w-4xl md:max-w-5xl mx-auto bg-white p-2 sm:p-4 pb-6 sm:pb-8 md:pb-12 font-sans relative overflow-hidden">
        <div className="relative text-center mb-4 sm:mb-6 md:mb-8 animate-fade-in-up">
          <div className="absolute inset-0 flex items-center justify-center opacity-5">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-red-400 to-red-600 rounded-full filter blur-2xl animate-pulse"></div>
          </div>
          <div className="relative z-10 inline-block">
            <h1 className="relative text-lg sm:text-2xl md:text-3xl lg:text-4xl font-black mb-1 sm:mb-2 md:mb-3 leading-tight">
              <span className="relative inline-block">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-200 via-transparent to-red-200 opacity-0 hover:opacity-100 transition-opacity duration-700 rounded-lg transform skew-x-12"></div>
                <span className="relative bg-gradient-to-r from-red-600 via-red-700 to-red-800 bg-clip-text text-transparent drop-shadow-lg hover:drop-shadow-xl transition-all duration-300 cursor-default inline-block transform hover:scale-105">Formateur</span>
              </span>
            </h1>
            <div className="absolute top-1/2 -left-3 w-1 h-1 bg-red-300 rounded-full animate-pulse"></div>
            <div className="absolute top-1/3 -right-3 w-1 h-1 bg-red-400 rounded-full animate-pulse" style={{animationDelay: "0.5s"}}></div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 relative z-10 items-stretch text-center lg:text-left">
          <div className="flex-1 flex flex-col justify-between">
            <h1 className="text-xl sm:text-2xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-3 leading-tight animate-fade-in-up">
              <span className="inline-block hover:scale-105 transition-transform duration-300 cursor-default">Blaise KAYUMPA Yese</span>
              <span className="block text-lg sm:text-xl md:text-3xl mt-1 sm:mt-2 bg-gradient-to-r from-red-600 via-red-700 to-red-800 bg-clip-text text-transparent font-semibold animate-gradient-shift">Designer Graphique Senior</span>
            </h1>
            <button 
              onClick={toggleDescription}
              className="group flex items-center gap-1 sm:gap-2 text-red-600 hover:text-red-700 font-medium mb-2 sm:mb-3 transition-all duration-300 transform hover:scale-105 hover:shadow-lg px-2 sm:px-3 py-1.5 sm:py-2 rounded-full border border-red-200/30 hover:border-red-300/50 animate-fade-in-up mx-auto lg:mx-0 text-xs sm:text-sm" 
              style={{animationDelay: "200ms"}}
            >
              <span className="text-xs sm:text-sm font-medium">Voir la description</span>
              <svg 
                className={`w-3 h-3 sm:w-4 sm:h-4 text-red-600 transition-all duration-500 group-hover:scale-110 ${showDescription ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                strokeLinecap="round" 
                strokeLinejoin="round" 
              >
                <path d="m6 9 6 6 6 6-6"></path>
              </svg>
            </button>
            <div className={`overflow-hidden transition-all duration-700 ease-in-out ${showDescription ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="relative">
                <div className="bg-gradient-to-br from-white via-gray-50/90 to-red-50/20 border border-gray-200/50 rounded-2xl sm:rounded-3xl p-3 sm:p-4 md:p-6 shadow-xl sm:shadow-2xl hover:shadow-2xl sm:hover:shadow-3xl transition-all duration-700 relative overflow-hidden group animate-fade-in-up" style={{animationDelay: "300ms"}}>
                  <div className="absolute top-0 right-0 w-24 sm:w-32 md:w-40 h-24 sm:h-32 md:h-40 bg-gradient-to-br from-red-400/20 to-red-500/20 rounded-full filter blur-2xl sm:blur-3xl animate-pulse"></div>
                  <div className="absolute bottom-0 left-0 w-20 sm:w-24 md:w-32 h-20 sm:h-24 md:h-32 bg-gradient-to-br from-gray-400/15 to-gray-500/15 rounded-full filter blur-xl sm:blur-2xl animate-pulse" style={{animationDelay: "1s"}}></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 sm:w-40 md:w-48 h-32 sm:h-40 md:h-48 bg-gradient-to-br from-red-300/10 to-red-400/10 rounded-full filter blur-2xl sm:blur-3xl animate-spin-slow"></div>
                  <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-200 to-transparent animate-slide-right"></div>
                  <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent animate-slide-left" style={{animationDelay: "1s"}}></div>
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl transform -skew-x-12"></div>
                  <div className="relative z-20">
                    <div className="flex items-center gap-1 sm:gap-2 mb-3 sm:mb-4 animate-fade-in-up" style={{animationDelay: "400ms"}}>
                      <div className="group">
                        <h3 className="text-base sm:text-xl font-bold bg-gradient-to-r from-red-600 via-red-700 to-red-800 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">Profil Professionnel</h3>
                        <p className="text-xs sm:text-sm text-gray-500 group-hover:text-gray-600 transition-colors duration-300">Designer Graphique Senior</p>
                      </div>
                    </div>
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 mb-3 sm:mb-4 border border-gray-100/50 shadow-inner hover:shadow-lg transition-all duration-500 group animate-fade-in-up" style={{animationDelay: "500ms"}}>
                      <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed font-medium group-hover:text-gray-800 transition-colors duration-300">Blaise KAYUMPA Yese est un <span className="font-bold text-red-600 hover:text-red-700 transition-colors duration-300 cursor-default">Designer Graphique Senior</span> avec plus de <span className="font-bold text-gray-700 hover:text-gray-800 transition-colors duration-300 cursor-default">8 ans d'expérience</span> dans la création visuelle et la communication digitale.</p>
                      <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed mt-2 sm:mt-3 group-hover:text-gray-700 transition-colors duration-300">Passionné par l'innovation et l'esthétique, il maîtrise parfaitement les outils de conception graphique et les tendances actuelles du design.</p>
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                    </div>
                    <div className="bg-gradient-to-r from-red-50/50 via-gray-50/50 to-red-50/50 rounded-xl sm:rounded-2xl p-2 sm:p-3 pb-6 sm:pb-8 border border-red-100/30 hover:border-red-200/50 transition-all duration-500 group animate-fade-in-up" style={{animationDelay: "600ms"}}>
                      <div className="flex items-center gap-1 mb-2 sm:mb-3">
                        <h4 className="text-sm sm:text-lg font-bold text-gray-800 group-hover:text-gray-900 transition-colors duration-300">Domaines d'Expertise</h4>
                        <div className="flex-1 h-px bg-gradient-to-r from-red-200 to-transparent"></div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 text-left">
                        <div className="group flex items-start gap-1 p-1.5 sm:p-2 bg-white/90 backdrop-blur-sm rounded-lg border border-gray-100/50 hover:shadow-xl hover:scale-105 transition-all duration-500 cursor-pointer hover:bg-white">
                          <div className="flex-1">
                            <h5 className="font-bold text-gray-800 text-xs sm:text-base mb-1 group-hover:text-gray-900 transition-colors duration-300">Formation complète</h5>
                            <p className="text-xs sm:text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">Photoshop, Illustrator et outils professionnels</p>
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
                        </div>
                        <div className="group flex items-start gap-1 p-1.5 sm:p-2 bg-white/90 backdrop-blur-sm rounded-lg border border-gray-100/50 hover:shadow-xl hover:scale-105 transition-all duration-500 cursor-pointer hover:bg-white">
                          <div className="flex-1">
                            <h5 className="font-bold text-gray-800 text-xs sm:text-base mb-1 group-hover:text-gray-900 transition-colors duration-300">Accompagnement personnalisé</h5>
                            <p className="text-xs sm:text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">Suivi par des experts du secteur</p>
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
                        </div>
                        <div className="group flex items-start gap-1 p-1.5 sm:p-2 bg-white/90 backdrop-blur-sm rounded-lg border border-gray-100/50 hover:shadow-xl hover:scale-105 transition-all duration-500 cursor-pointer hover:bg-white">
                          <div className="flex-1">
                            <h5 className="font-bold text-gray-800 text-xs sm:text-base mb-1 group-hover:text-gray-900 transition-colors duration-300">Certification professionnelle</h5>
                            <p className="text-xs sm:text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">Reconnue par les entreprises</p>
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
                        </div>
                        <div className="group flex items-start gap-1 p-1.5 sm:p-2 bg-white/90 backdrop-blur-sm rounded-lg border border-gray-100/50 hover:shadow-xl hover:scale-105 transition-all duration-500 cursor-pointer hover:bg-white">
                          <div className="flex-1">
                            <h5 className="font-bold text-gray-800 text-xs sm:text-base mb-1 group-hover:text-gray-900 transition-colors duration-300">Évolution de carrière</h5>
                            <p className="text-xs sm:text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">Développez votre potentiel professionnel</p>
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-shrink-0 lg:w-[400px] flex items-center justify-center animate-fade-in-up" style={{animationDelay: "900ms"}}>
            <div className="relative group">
              <div className="relative bg-white p-3 rounded-2xl shadow-2xl transform transition-all duration-700 hover:shadow-3xl z-10">
                <div className="absolute inset-0 bg-gradient-to-br from-red-50/50 to-red-100/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <img className="w-full h-auto object-cover rounded-xl relative z-10 transition-all duration-700 group-hover:brightness-110" src="/Prof.png" alt="Blaise KAYUMPA Yese - Designer Graphique Senior" />
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 rounded-xl transform -skew-x-12"></div>
              </div>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-16 w-12 h-12 flex items-center justify-center cursor-pointer z-50 animate-fade-in-up" style={{animation: "4s ease-in-out infinite float, 0.8s ease-out 1000ms both fade-in-up"}}>
                <img className="w-8 h-8 object-contain animate-spin-slow" src="/photoshop.png" alt="Adobe photoshop" />
              </div>
              <div className="absolute top-1/4 right-0 translate-x-16 -translate-y-1/2 w-12 h-12 flex items-center justify-center cursor-pointer z-50 animate-fade-in-up" style={{animation: "4s ease-in-out infinite float, 0.8s ease-out 1100ms both fade-in-up"}}>
                <img className="w-8 h-8 object-contain animate-spin-slow" src="/adobe-illustrator.png" alt="Adobe adobe-illustrator" />
              </div>
              <div className="absolute bottom-0 right-1/4 translate-x-8 translate-y-16 w-12 h-12 flex items-center justify-center cursor-pointer z-50 animate-fade-in-up" style={{animation: "4s ease-in-out infinite float, 0.8s ease-out 1200ms both fade-in-up"}}>
                <img className="w-8 h-8 object-contain animate-spin-slow" src="/xd.png" alt="Adobe xd" />
              </div>
              <div className="absolute top-1/4 left-0 -translate-x-16 -translate-y-1/2 w-12 h-12 flex items-center justify-center cursor-pointer z-50 animate-fade-in-up" style={{animation: "4s ease-in-out infinite float, 0.8s ease-out 1300ms both fade-in-up"}}>
                <img className="w-8 h-8 object-contain animate-spin-slow" src="/indesign.png" alt="Adobe indesign" />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-xl sm:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block text-red-500 text-sm font-semibold tracking-wider uppercase mb-3">Témoignages</span>
          <h2 className="text-4xl md:text-4xl font-bold text-gray-900 mb-4">Ce que disent nos étudiants</h2>
          <div className="w-24 h-1 bg-red-500 mx-auto mt-4"></div>
        </div>
        <div className="relative">
          <div className="grid grid-cols-1 lg:hidden gap-4">
            <div className="bg-white border border-gray-200 rounded-xl p-3 sm:p-4 hover:shadow-lg transition-all duration-500 hover:-translate-y-1">
              <div className="flex items-center mb-3">
                <img className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-red-500/50" src="https://randomuser.me/api/portraits/women/44.jpg" alt="Aïcha K." />
                <div className="ml-2 sm:ml-3">
                  <h4 className="text-xs sm:text-sm font-bold text-gray-900">Aïcha K.</h4>
                  <p className="text-xs text-gray-600">Designer Graphique</p>
                </div>
                <div className="ml-auto flex items-center space-x-1">
                  <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                </div>
              </div>
              <p className="text-gray-700 italic text-xs sm:text-sm">"Grâce à cette formation, j'ai pu lancer mon activité de freelance en design graphique. Les cours sont clairs et les projets concrets m'ont permis de me constituer un portfolio solide."</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-3 sm:p-4 hover:shadow-lg transition-all duration-500 hover:-translate-y-1">
              <div className="flex items-center mb-3">
                <img className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-red-500/50" src="https://randomuser.me/api/portraits/men/32.jpg" alt="Mohamed D." />
                <div className="ml-2 sm:ml-3">
                  <h4 className="text-xs sm:text-sm font-bold text-gray-900">Mohamed D.</h4>
                  <p className="text-xs text-gray-600">Développeur Web</p>
                </div>
                <div className="ml-auto flex items-center space-x-1">
                  <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                </div>
              </div>
              <p className="text-gray-700 italic text-xs sm:text-sm">"La qualité des formations est exceptionnelle. J'ai particulièrement apprécié les études de cas réels qui m'ont permis de comprendre les enjeux concrets du métier."</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-3 sm:p-4 hover:shadow-lg transition-all duration-500 hover:-translate-y-1">
              <div className="flex items-center mb-3">
                <img className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-red-500/50" src="https://randomuser.me/api/portraits/women/68.jpg" alt="Fatou N." />
                <div className="ml-2 sm:ml-3">
                  <h4 className="text-xs sm:text-sm font-bold text-gray-900">Fatou N.</h4>
                  <p className="text-xs text-gray-600">Entrepreneuse</p>
                </div>
                <div className="ml-auto flex items-center space-x-1">
                  <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <svg className="w-3 h-3 text-gray-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                </div>
              </div>
              <p className="text-gray-700 italic text-xs sm:text-sm">"En tant que débutante, j'ai trouvé les explications très accessibles. Le suivi personnalisé m'a permis de progresser rapidement et d'acquérir des compétences solides."</p>
            </div>
          </div>
          <div className="relative w-full py-4 hidden lg:block" role="region" aria-roledescription="carousel">
            <div className="overflow-hidden">
              <div className="flex -ml-4" style={{transform: "translate3d(0px, 0px, 0px)"}}>
                <div role="group" aria-roledescription="slide" className="min-w-0 shrink-0 grow-0 basis-full pl-4 lg:basis-1/3">
                  <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 h-full">
                    <div className="flex items-center mb-6">
                      <img className="w-14 h-14 rounded-full object-cover border-2 border-red-500/50" src="https://randomuser.me/api/portraits/women/44.jpg" alt="Aïcha K." />
                      <div className="ml-4">
                        <h4 className="text-lg font-bold text-gray-900">Aïcha K.</h4>
                        <p className="text-sm text-gray-600">Designer Graphique</p>
                      </div>
                      <div className="ml-auto flex items-center space-x-1">
                        <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                      </div>
                    </div>
                    <p className="text-gray-700 italic">"Grâce à cette formation, j'ai pu lancer mon activité de freelance en design graphique. Les cours sont clairs et les projets concrets m'ont permis de me constituer un portfolio solide."</p>
                  </div>
                </div>
                <div role="group" aria-roledescription="slide" className="min-w-0 shrink-0 grow-0 basis-full pl-4 lg:basis-1/3">
                  <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 h-full">
                    <div className="flex items-center mb-6">
                      <img className="w-14 h-14 rounded-full object-cover border-2 border-red-500/50" src="https://randomuser.me/api/portraits/men/32.jpg" alt="Mohamed D." />
                      <div className="ml-4">
                        <h4 className="text-lg font-bold text-gray-900">Mohamed D.</h4>
                        <p className="text-sm text-gray-600">Développeur Web</p>
                      </div>
                      <div className="ml-auto flex items-center space-x-1">
                        <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                      </div>
                    </div>
                    <p className="text-gray-700 italic">"La qualité des formations est exceptionnelle. J'ai particulièrement apprécié les études de cas réels qui m'ont permis de comprendre les enjeux concrets du métier."</p>
                  </div>
                </div>
                <div role="group" aria-roledescription="slide" className="min-w-0 shrink-0 grow-0 basis-full pl-4 lg:basis-1/3">
                  <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 h-full">
                    <div className="flex items-center mb-6">
                      <img className="w-14 h-14 rounded-full object-cover border-2 border-red-500/50" src="https://randomuser.me/api/portraits/women/68.jpg" alt="Fatou N." />
                      <div className="ml-4">
                        <h4 className="text-lg font-bold text-gray-900">Fatou N.</h4>
                        <p className="text-sm text-gray-600">Entrepreneuse</p>
                      </div>
                      <div className="ml-auto flex items-center space-x-1">
                        <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <svg className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                      </div>
                    </div>
                    <p className="text-gray-700 italic">"En tant que débutante, j'ai trouvé les explications très accessibles. Le suivi personnalisé m'a permis de progresser rapidement et d'acquérir des compétences solides."</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-8">
          </div>
        </div>
      </div>
      
      <footer className="bg-white text-gray-900 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {/* Brand */}
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start mb-4">
                <img className="h-10 w-auto mr-3" src="/Copie de LOGOTYPE [Récupéré]-18.png" alt="DMPLUS ACADEMY" />
                <h3 className="text-xl font-bold text-gray-900">DM + Academy</h3>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed max-w-xs mx-auto md:mx-0">
                Excellence dans la formation professionnelle depuis 2020. Plus de 10,000 étudiants formés.
              </p>
              <div className="flex justify-center md:justify-start space-x-3">
                <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-red-600 transition-all duration-300 group hover:scale-110">
                  <svg className="w-5 h-5 text-gray-600 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-red-600 transition-all duration-300 group hover:scale-110">
                  <svg className="w-5 h-5 text-gray-600 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-red-600 transition-all duration-300 group hover:scale-110">
                  <svg className="w-5 h-5 text-gray-600 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.259-.014-3.667-.072-4.948-.196-4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Contact */}
            <div className="text-center md:text-left">
              <h4 className="text-lg font-semibold mb-6 text-gray-900">Contact</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-center md:justify-start group">
                  <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center mr-3 group-hover:bg-red-100 transition-colors">
                    <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Email</p>
                    <a href="mailto:academy@dmplus-group.com" className="text-gray-900 hover:text-red-600 transition-colors font-medium">academy@dmplus-group.com</a>
                  </div>
                </div>
                <div className="flex items-center justify-center md:justify-start group">
                  <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center mr-3 group-hover:bg-red-100 transition-colors">
                    <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Téléphone</p>
                    <a href="tel:+221338295879" className="text-gray-900 hover:text-red-600 transition-colors font-medium">+221 33 829 58 79</a>
                  </div>
                </div>
                <div className="flex items-center justify-center md:justify-start group">
                  <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center mr-3 group-hover:bg-green-100 transition-colors">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.496.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 9.89-5.335 9.89-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">WhatsApp</p>
                    <a href="https://wa.me/221766638219" target="_blank" rel="noopener noreferrer" className="text-gray-900 hover:text-green-600 transition-colors font-medium">+221 76 663 82 19</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Informations */}
            <div className="text-center md:text-left">
              <h4 className="text-lg font-semibold mb-6 text-gray-900">À Propos</h4>
              <div className="space-y-3">
                <p className="text-gray-600 text-sm leading-relaxed">
                  <span className="font-semibold">10,000+</span> étudiants formés
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  <span className="font-semibold">5+</span> années d'expérience
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  <span className="font-semibold">95%</span> de satisfaction
                </p>
                <div className="pt-3">
                  <p className="text-gray-500 text-xs mb-2">Suivez-nous</p>
                  <div className="flex justify-center md:justify-start space-x-2">
                    <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">Certifié</span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">Qualité</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-200 mt-8 pt-6">
            <div className="flex flex-col md:flex-row justify-between items-center text-center">
              <div className="mb-4 md:mb-0">
                <p className="text-gray-500 text-sm"> 2025 DIGITAL MIND PLUS ACADEMY. Tous droits réservés.</p>
                <p className="text-gray-400 text-xs mt-1">Ce site ne fait pas partie du site web Facebook ou de Facebook, Inc. ni de Google Inc.</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SalesFunnelPage;