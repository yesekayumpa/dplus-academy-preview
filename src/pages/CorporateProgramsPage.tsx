import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  Users,
  Target,
  Award,
  Briefcase,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  Zap,
  Shield,
  Sparkles,
  GraduationCap,
  BarChart3,
  Globe,
  Clock,
  Star,
  Calendar,
  Search,
  Filter,
  X,
  ChevronRight,
  Heart,
  Share2,
  Bookmark,
  Menu,
  Sun,
  Moon,
  Phone,
  Mail,
  Send,
  MessageCircle,
} from "lucide-react";
import Layout from "@/components/layout/Layout";

// Couleurs de la charte graphique rouge-bordeaux
const colors = {
  primary: {
    50: '#fdf2f4',
    100: '#fbe7ea',
    200: '#f5cbd1',
    300: '#efa7b1',
    400: '#e77a8a',
    500: '#d44c5e', // Rouge bordeaux principal
    600: '#b23a4a',
    700: '#8e2e3b',
    800: '#6a232d',
    900: '#46181e',
  }
};

// Données des programmes corporate
const corporatePrograms = [
  {
    id: 1,
    title: "Transformation Digitale",
    subtitle: "Programme Complet de Transformation Numérique",
    description: "Accompagnez votre entreprise dans sa transition digitale avec des formations sur mesure adaptées à votre secteur et vos objectifs stratégiques.",
    duration: "3-6 mois",
    format: "Sur site ou en ligne",
    participants: "10-25 personnes",
    level: "Sur mesure",
    category: "Digital",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    price: "Sur devis",
    highlights: ["Cloud", "IA", "Automatisation", "Data"],
    
    modules: [
      "Stratégie digitale et alignement business",
      "Gestion du changement et adoption",
      "Outils collaboratifs et plateformes cloud",
      "Cybersécurité et conformité",
      "Mesure du ROI et KPIs"
    ],
    
    targetAudience: [
      "Directions générales",
      "Équipes de direction",
      "Responsables transformation",
      "Équipes techniques et opérationnelles"
    ],
    
    benefits: [
      "Augmentation de la productivité de 35%",
      "Réduction des coûts opérationnels",
      "Amélioration de l'expérience client",
      "Agilité organisationnelle accrue"
    ]
  },
  {
    id: 2,
    title: "Leadership et Management",
    subtitle: "Développez les Compétences Managériales de Vos Équipes",
    description: "Formation intensive pour renforcer les capacités de leadership et développer une culture d'excellence au sein de votre organisation.",
    duration: "2-4 mois",
    format: "Présentiel et blended learning",
    participants: "8-20 personnes",
    level: "Intermédiaire à Avancé",
    category: "Management",
    thumbnail: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    price: "Sur devis",
    highlights: ["Leadership", "Communication", "Coaching", "Intelligence émotionnelle"],
    
    modules: [
      "Fondamentaux du leadership moderne",
      "Communication efficace et influence",
      "Gestion des conflits et médiation",
      "Coaching d'équipe et développement des talents",
      "Prise de décision stratégique"
    ],
    
    targetAudience: [
      "Managers et responsables d'équipes",
      "Leaders intermédiaires",
      "Futurs managers",
      "Direction des ressources humaines"
    ],
    
    benefits: [
      "Amélioration de l'engagement des équipes",
      "Réduction du turnover",
      "Meilleure performance collective",
      "Culture d'entreprise renforcée"
    ]
  },
  {
    id: 3,
    title: "Data Analytics et Business Intelligence",
    subtitle: "Maîtrisez la Donnée pour Piloter Votre Business",
    description: "Programme complet pour transformer vos équipes en experts de la data, capables de prendre des décisions basées sur l'analyse et les insights.",
    duration: "4-6 mois",
    format: "Sur site avec projets pratiques",
    participants: "12-30 personnes",
    level: "Débutant à Avancé",
    category: "Data",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    price: "Sur devis",
    highlights: ["Data Science", "BI", "Machine Learning", "Visualisation"],
    
    modules: [
      "Fondamentaux de l'analyse de données",
      "Outils de Business Intelligence (Power BI, Tableau)",
      "Statistiques appliquées au business",
      "Introduction au Machine Learning",
      "Storytelling avec les données"
    ],
    
    targetAudience: [
      "Équipes marketing et commercial",
      "Responsables opérationnels",
      "Analystes business",
      "Direction générale"
    ],
    
    benefits: [
      "Décisions plus éclairées et rapides",
      "Identification de nouvelles opportunités",
      "Optimisation des processus",
      "Avantage concurrentiel accru"
    ]
  }
];

const CorporateProgramsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProgram, setSelectedProgram] = useState<typeof corporatePrograms[0] | null>(null);
  const [showContactModal, setShowContactModal] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
    program: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const filteredPrograms = corporatePrograms.filter(program => {
    const matchesSearch = program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         program.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || program.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const categories = ["all", "Digital", "Management", "Data"];

  const handleContactExpert = (programName = "") => {
    setContactForm({...contactForm, program: programName});
    setShowContactModal(true);
  };

  const handleScheduleCall = () => {
    // Ouvrir Calendly ou lien de planification
    window.open('https://calendly.com/votre-entreprise/appel-conseil', '_blank');
  };

  const handleSubmitContact = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulation d'envoi - À remplacer par votre logique d'envoi réelle
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setTimeout(() => {
        setShowContactModal(false);
        setSubmitSuccess(false);
        setContactForm({ name: "", email: "", phone: "", company: "", message: "", program: "" });
      }, 2000);
    }, 1500);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        {/* Hero Section avec image de fond Corporate.jpg */}
        <section className="relative overflow-hidden py-20 px-4">
          {/* Image de fond */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ 
              backgroundImage: `url(/assets/E-learning2.jpg)`,
            }}
          />
          
          {/* Overlay bordeaux avec dégradé */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#46181e]/90 via-[#6a232d]/85 to-[#8e2e3b]/80" />
          
          {/* Overlay supplémentaire pour meilleure lisibilité */}
          <div className="absolute inset-0 bg-black/20" />
          
          <div className="relative container mx-auto max-w-6xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex justify-center mb-6 md:mb-8">
                <div className="p-3 md:p-4 bg-white/15 backdrop-blur-lg rounded-2xl border border-white/30 shadow-2xl">
                  <Building2 className="w-12 h-12 md:w-16 md:h-16 text-white drop-shadow-lg" />
                </div>
              </div>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 text-white leading-tight">
                Programmes
                <span className="block text-yellow-300 drop-shadow-md">Corporate</span>
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl text-white/95 mb-6 md:mb-8 max-w-3xl mx-auto leading-relaxed">
                Des programmes de formation conçus spécifiquement pour les entreprises, 
                <br className="hidden sm:block" />
                adaptés à leurs objectifs, leur secteur et leurs équipes.
              </p>
              <div className="flex justify-center gap-2 sm:gap-4 px-2 sm:px-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 sm:px-6 sm:py-3 bg-yellow-400 text-gray-900 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all text-xs sm:text-sm"
                  onClick={() => handleContactExpert()}
                >
                  Demander un devis
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 sm:px-6 sm:py-3 bg-white/10 backdrop-blur-md border-2 border-white/30 text-white rounded-xl font-semibold shadow-lg hover:bg-white/20 transition-all text-xs sm:text-sm"
                  onClick={() => window.open('/catalogue-corporate.pdf', '_blank')}
                >
                  Télécharger le catalogue
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section avec couleurs bordeaux */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <div className="md:flex items-center justify-between gap-4 hidden md:flex md:overflow-visible">
              {[
                { number: "500+", label: "Entreprises formées", icon: Building2 },
                { number: "15K+", label: "Employés formés", icon: Users },
                { number: "98%", label: "Satisfaction", icon: Star },
                { number: "35%", label: "ROI moyen", icon: TrendingUp }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center gap-3 group"
                >
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#b23a4a] to-[#8e2e3b] rounded-lg flex items-center justify-center shadow-md">
                      <stat.icon className="w-5 h-5 text-white" />
                    </div>
                    {index < 3 && (
                      <div className="absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-[#b23a4a]/30 to-transparent" />
                    )}
                  </div>
                  <div>
                    <div className="text-lg md:text-xl font-bold text-[#46181e] group-hover:text-[#b23a4a] transition-colors">{stat.number}</div>
                    <div className="text-xs text-gray-600">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Version mobile avec défilement */}
            <div className="flex items-center justify-between gap-2 overflow-x-auto md:hidden">
              <div className="flex animate-scroll">
                {[
                  { number: "500+", label: "Entreprises formées", icon: Building2 },
                  { number: "15K+", label: "Employés formés", icon: Users },
                  { number: "98%", label: "Satisfaction", icon: Star },
                  { number: "35%", label: "ROI moyen", icon: TrendingUp }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center gap-2 group flex-shrink-0 px-2"
                  >
                    <div className="relative">
                      <div className="w-8 h-8 bg-gradient-to-br from-[#b23a4a] to-[#8e2e3b] rounded-lg flex items-center justify-center shadow-md">
                        <stat.icon className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[#46181e]">{stat.number}</div>
                      <div className="text-xs text-gray-600">{stat.label}</div>
                    </div>
                  </motion.div>
                ))}
                {/* Duplication pour défilement infini sur mobile */}
                {[
                  { number: "500+", label: "Entreprises formées", icon: Building2 },
                  { number: "15K+", label: "Employés formés", icon: Users },
                  { number: "98%", label: "Satisfaction", icon: Star },
                  { number: "35%", label: "ROI moyen", icon: TrendingUp }
                ].map((stat, index) => (
                  <motion.div
                    key={`duplicate-${index}`}
                    className="flex items-center gap-2 group flex-shrink-0 px-2"
                  >
                    <div className="relative">
                      <div className="w-8 h-8 bg-gradient-to-br from-[#b23a4a] to-[#8e2e3b] rounded-lg flex items-center justify-center shadow-md">
                        <stat.icon className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[#46181e]">{stat.number}</div>
                      <div className="text-xs text-gray-600">{stat.label}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          </div>
        </section>

        {/* Search and Filter */}
        <section className="py-8 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Rechercher un programme..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#b23a4a] focus:border-transparent"
                />
              </div>
              <div className="flex gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      selectedCategory === category
                        ? "bg-gradient-to-r from-[#b23a4a] to-[#8e2e3b] text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {category === "all" ? "Tous" : category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Programs Grid */}
        <section className="py-12 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPrograms.map((program, index) => (
                <motion.div
                  key={program.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer border border-gray-100 hover:border-[#b23a4a]/30"
                  onClick={() => setSelectedProgram(program)}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={program.thumbnail}
                      alt={program.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-white/95 backdrop-blur-sm rounded-full text-sm font-medium text-[#b23a4a] shadow-lg border border-white/20">
                        {program.category}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <div className="flex items-center gap-1 text-white">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium">{program.rating}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-[#46181e]">{program.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{program.description}</p>
                    
                    <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{program.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{program.participants}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {program.highlights.slice(0, 3).map((highlight, idx) => (
                        <span key={idx} className="px-3 py-1.5 bg-gradient-to-r from-[#fbe7ea] to-[#f5cbd1] text-[#b23a4a] rounded-lg text-xs font-medium shadow-sm border border-[#b23a4a]/10">
                          {highlight}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-lg font-bold text-[#46181e]">{program.price}</span>
                        <span className="text-xs text-gray-500">par employé</span>
                      </div>
                      <button className="px-4 py-2 bg-gradient-to-r from-[#b23a4a] to-[#8e2e3b] text-white rounded-lg font-medium shadow-md hover:shadow-lg hover:from-[#8e2e3b] hover:to-[#b23a4a] transition-all duration-300 text-sm flex items-center gap-1 group">
                        En savoir plus
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Program Detail Modal */}
        <AnimatePresence>
          {selectedProgram && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedProgram(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={selectedProgram.thumbnail}
                    alt={selectedProgram.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <button
                    onClick={() => setSelectedProgram(null)}
                    className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <div className="absolute bottom-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-[#b23a4a]">
                      {selectedProgram.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-8">
                  <h2 className="text-3xl font-bold mb-2 text-[#46181e]">{selectedProgram.title}</h2>
                  <p className="text-xl text-[#b23a4a] mb-6">{selectedProgram.subtitle}</p>
                  <p className="text-gray-700 mb-8">{selectedProgram.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div>
                      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-[#46181e]">
                        <GraduationCap className="w-5 h-5 text-[#b23a4a]" />
                        Modules de formation
                      </h3>
                      <ul className="space-y-2">
                        {selectedProgram.modules.map((module, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{module}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-[#46181e]">
                        <Users className="w-5 h-5 text-[#b23a4a]" />
                        Public cible
                      </h3>
                      <ul className="space-y-2">
                        {selectedProgram.targetAudience.map((audience, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <Target className="w-5 h-5 text-[#b23a4a] mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{audience}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-[#46181e]">
                      <TrendingUp className="w-5 h-5 text-[#b23a4a]" />
                      Bénéfices attendus
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedProgram.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-start gap-2 p-3 bg-[#fbe7ea] rounded-lg">
                          <Zap className="w-5 h-5 text-[#b23a4a] mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={() => {
                        setSelectedProgram(null);
                        handleContactExpert(selectedProgram.title);
                      }}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-[#b23a4a] to-[#8e2e3b] text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                    >
                      Demander un devis personnalisé
                    </button>
                    <button
                      onClick={() => handleScheduleCall()}
                      className="flex-1 px-6 py-3 bg-yellow-400 text-gray-900 rounded-xl font-semibold hover:shadow-lg transition-all"
                    >
                      Planifier un appel
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Contact Modal */}
        <AnimatePresence>
          {showContactModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowContactModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-8">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-[#46181e]">Contacter un expert</h2>
                    <button
                      onClick={() => setShowContactModal(false)}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {submitSuccess ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 className="w-8 h-8 text-green-500" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Message envoyé !</h3>
                      <p className="text-gray-600">Un expert vous contactera dans les 24h.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmitContact} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet *</label>
                        <input
                          type="text"
                          required
                          value={contactForm.name}
                          onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b23a4a] focus:border-transparent"
                          placeholder="Jean Dupont"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email professionnel *</label>
                        <input
                          type="email"
                          required
                          value={contactForm.email}
                          onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b23a4a] focus:border-transparent"
                          placeholder="jean.dupont@entreprise.com"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                        <input
                          type="tel"
                          value={contactForm.phone}
                          onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b23a4a] focus:border-transparent"
                          placeholder="+33 6 12 34 56 78"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Entreprise *</label>
                        <input
                          type="text"
                          required
                          value={contactForm.company}
                          onChange={(e) => setContactForm({...contactForm, company: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b23a4a] focus:border-transparent"
                          placeholder="Nom de votre entreprise"
                        />
                      </div>

                      {contactForm.program && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Programme d'intérêt</label>
                          <input
                            type="text"
                            value={contactForm.program}
                            disabled
                            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700"
                          />
                        </div>
                      )}

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                        <textarea
                          required
                          value={contactForm.message}
                          onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                          rows={4}
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b23a4a] focus:border-transparent"
                          placeholder="Décrivez vos besoins de formation..."
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 bg-gradient-to-r from-[#b23a4a] to-[#8e2e3b] text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Envoi en cours...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            Envoyer la demande
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-[#46181e] to-[#8e2e3b]">
          <div className="container mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6 text-white">
                Prêt à transformer votre entreprise ?
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Contactez-nous pour un audit gratuit et une proposition sur mesure
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-yellow-400 text-gray-900 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2 justify-center"
                  onClick={() => handleContactExpert()}
                >
                  <MessageCircle className="w-5 h-5" />
                  Contacter un expert
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white/10 backdrop-blur-md border-2 border-white/30 text-white rounded-xl font-semibold shadow-lg hover:bg-white/20 transition-all flex items-center gap-2 justify-center"
                  onClick={handleScheduleCall}
                >
                  <Phone className="w-5 h-5" />
                  Planifier un appel
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default CorporateProgramsPage;