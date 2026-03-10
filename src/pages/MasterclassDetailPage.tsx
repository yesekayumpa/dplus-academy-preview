import { useState, useMemo } from "react";
import { 
  Calendar, Clock, Users, BookOpen, ArrowRight, 
  Award, X, ChevronRight, Sparkles,
  Briefcase, LineChart, Globe, Zap, Shield,
  CheckCircle2, Target, Download, Heart, Share2,
  Database, BarChart, Brain, Code, FileText, 
  UserCircle, ArrowLeft, MapPin, Clock3, Star,
  Mail, Phone, Linkedin, Twitter, Info,
  CreditCard, Tag, Percent, Gift, ShieldCheck,
  Clock4, Video, Languages, GraduationCap
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "@/components/layout/Layout";
import MasterclassRegistrationForm from "@/components/MasterclassRegistrationForm";
import { useParams, useNavigate } from "react-router-dom";

// Types
interface Masterclass {
  id: number;
  title: string;
  subtitle: string;
  tagline: string;
  description: string;
  instructor: {
    name: string;
    title: string;
    image: string;
    bio: string;
    expertise: string[];
    social: {
      linkedin?: string;
      twitter?: string;
    };
  };
  date: string;
  time: string;
  duration: string;
  status: "upcoming" | "past";
  thumbnail: string;
  participants: number;
  category: string;
  level: string;
  rating: number;
  highlights: string[];
  color: string;
  price: number;
  format: string;
  languages: string[];
  prerequisites: string[];
  certificate: boolean;
}

// Données enrichies
const masterclassData: Masterclass[] = [
  {
    id: 1,
    title: "Big Data avec Apache Spark",
    subtitle: "Maîtrisez l'outil incontournable du Big Data",
    tagline: "Formation intensive - Devenez Data Engineer",
    description: "Cette formation vous plonge au cœur des technologies Big Data avec Apache Spark, l'outil leader utilisé par les géants de la tech. En 4 heures, vous apprendrez à manipuler des données massives, optimiser les performances et déployer des solutions évolutives. Une approche 100% pratique avec des cas concrets d'entreprise.",
    instructor: {
      name: "Antoine Bernard",
      title: "Data Engineer, Datadog",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      bio: "Ancien Data Engineer chez Google, Antoine a plus de 8 ans d'expérience dans le traitement de données à grande échelle. Il a formé plus de 500 professionnels aux technologies Big Data. Passionné par la transmission, il a développé une pédagogie unique qui rend accessibles les concepts complexes du Big Data.",
      expertise: ["Spark", "Hadoop", "Python", "Cloud"],
      social: {
        linkedin: "#",
        twitter: "#"
      }
    },
    date: "2024-04-12",
    time: "10:00",
    duration: "4h",
    status: "upcoming",
    thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    participants: 156,
    category: "Data",
    level: "Avancé",
    rating: 4.7,
    highlights: ["Spark", "Big Data", "Scala", "Performance"],
    color: "blue",
    price: 599,
    format: "Live interactif",
    languages: ["Français"],
    prerequisites: ["Connaissances de base en Python", "Notions de SQL"],
    certificate: true
  }
];

// Configuration des couleurs
const categoryConfig = {
  "Finance": { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200", icon: <LineChart className="w-4 h-4" /> },
  "Outils Digitaux": { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200", icon: <Zap className="w-4 h-4" /> },
  "Data": { bg: "bg-orange-50", text: "text-orange-700", border: "border-orange-200", icon: <Database className="w-4 h-4" /> },
  "Entrepreneuriat": { bg: "bg-green-50", text: "text-green-700", border: "border-green-200", icon: <Briefcase className="w-4 h-4" /> },
  "Soft Skills": { bg: "bg-pink-50", text: "text-pink-700", border: "border-pink-200", icon: <Users className="w-4 h-4" /> }
};

const levelConfig = {
  "Débutant": { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
  "Intermédiaire": { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
  "Avancé": { bg: "bg-rose-50", text: "text-rose-700", border: "border-rose-200" },
  "Tous niveaux": { bg: "bg-indigo-50", text: "text-indigo-700", border: "border-indigo-200" }
};

const MasterclassDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [showInstructorPopup, setShowInstructorPopup] = useState(false);
  
  const masterclass = useMemo(() => {
    return masterclassData.find(mc => mc.id === parseInt(id || "0"));
  }, [id]);

  if (!masterclass) {
    return <NotFoundState onBack={() => navigate("/masterclasses")} />;
  }

  const categoryStyle = categoryConfig[masterclass.category as keyof typeof categoryConfig] || categoryConfig["Data"];
  const levelStyle = levelConfig[masterclass.level as keyof typeof levelConfig] || levelConfig["Intermédiaire"];
  const isUpcoming = masterclass.status === "upcoming";

  const handleRegister = () => setShowRegistrationForm(true);

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Navigation simplifiée */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex items-center justify-between h-14">
              <button 
                onClick={() => navigate("/masterclasses")}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm font-medium">Toutes les formations</span>
              </button>
              <span className="text-sm text-gray-500 truncate max-w-xs">{masterclass.title}</span>
            </div>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="container mx-auto px-4 max-w-6xl py-8">
          {/* Fil d'Ariane */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <span>Accueil</span>
            <ChevronRight className="w-3 h-3" />
            <span>Formations</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-900 font-medium">{masterclass.category}</span>
          </div>

          {/* Layout en 2 colonnes */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Colonne principale - 2/3 */}
            <div className="lg:col-span-2 space-y-6">
              {/* Carte principale de la formation */}
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                {/* Image */}
                <div className="relative h-64 md:h-80">
                  <img
                    src={masterclass.thumbnail}
                    alt={masterclass.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    <span className={`px-3 py-1.5 text-xs font-medium rounded-full ${categoryStyle.bg} ${categoryStyle.text} border ${categoryStyle.border}`}>
                      {masterclass.category}
                    </span>
                    <span className={`px-3 py-1.5 text-xs font-medium rounded-full ${levelStyle.bg} ${levelStyle.text} border ${levelStyle.border}`}>
                      {masterclass.level}
                    </span>
                    {masterclass.certificate && (
                      <span className="px-3 py-1.5 text-xs font-medium rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                        Certifiante
                      </span>
                    )}
                  </div>
                </div>

                {/* Contenu de la carte */}
                <div className="p-6">
                  <div className="mb-4">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                      {masterclass.title}
                    </h1>
                    <p className="text-lg text-gray-600">
                      {masterclass.subtitle}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span className="font-medium text-gray-900">{masterclass.rating}</span>
                      <span className="text-gray-500">({masterclass.participants} avis)</span>
                    </div>
                    <div className="w-px h-4 bg-gray-300" />
                    <div className="flex items-center gap-1 text-gray-600">
                      <Users className="w-4 h-4" />
                      <span>{masterclass.participants} participants</span>
                    </div>
                  </div>

                  <p className="text-gray-700 leading-relaxed">
                    {masterclass.description}
                  </p>
                </div>
              </div>

              {/* Section formateur - EN PREMIER POSITION APRÈS LA DESCRIPTION */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Votre formateur</h2>
                
                <div className="flex items-center gap-6">
                  {/* Image cliquable */}
                  <button 
                    onClick={() => setShowInstructorPopup(true)}
                    className="relative group flex-shrink-0"
                  >
                    <div className="relative">
                      <img 
                        src={masterclass.instructor.image} 
                        alt={masterclass.instructor.name}
                        className="w-24 h-24 rounded-full object-cover border-3 border-[hsl(var(--academy-primary))] group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Info className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </button>

                  {/* Infos formateur */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-xl font-bold text-gray-900">{masterclass.instructor.name}</h3>
                      <button 
                        onClick={() => setShowInstructorPopup(true)}
                        className="p-1.5 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                        title="Voir la bio complète"
                      >
                        <Info className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                    <p className="text-[hsl(var(--academy-primary))] font-medium mb-2">{masterclass.instructor.title}</p>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-3">{masterclass.instructor.bio}</p>
                    
                    {/* Expertise tags */}
                    <div className="flex flex-wrap gap-2">
                      {masterclass.instructor.expertise.map((item, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Points clés de la formation */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Ce que vous allez apprendre</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {masterclass.highlights.map((item, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-3 h-3 text-green-600" />
                      </div>
                      <span className="text-sm text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Prérequis */}
              {masterclass.prerequisites && masterclass.prerequisites.length > 0 && (
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Prérequis</h2>
                  <ul className="space-y-2">
                    {masterclass.prerequisites.map((item, index) => (
                      <li key={index} className="flex items-center gap-2 text-gray-600">
                        <div className="w-1.5 h-1.5 bg-[hsl(var(--academy-primary))] rounded-full" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Colonne latérale - 1/3 */}
            <div className="lg:col-span-1 space-y-6">
              {/* Carte d'inscription - PRIX AMÉLIORÉ */}
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden sticky top-20">
                {/* En-tête avec badge promo */}
                <div className="bg-gradient-to-r from-[hsl(var(--academy-primary))] to-[hsl(var(--academy-primary))/80%] px-6 py-4">
                  <div className="flex items-center justify-between text-white">
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4" />
                      <span className="text-sm font-medium">Offre spéciale</span>
                    </div>
                    <span className="text-xs bg-white/20 px-2 py-1 rounded-full">-15%</span>
                  </div>
                </div>

                {/* Prix */}
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-baseline justify-center gap-2 mb-2">
                    <span className="text-xl font-bold text-[hsl(var(--academy-primary))]">
                      {masterclass.price * 655} FCFA
                    </span>
                    <span className="text-gray-400 line-through text-lg">
                      {Math.round(masterclass.price * 655 * 1.15)} FCFA
                    </span>
                  </div>
                  <div className="text-center mb-4">
                    <span className="text-sm text-gray-500">TTC - Formation certifiante</span>
                  </div>

                  {/* Boutons d'action */}
                  <div className="space-y-3">
                    <button 
                      onClick={handleRegister}
                      className="w-full px-4 py-3 bg-[hsl(var(--academy-primary))] text-white font-semibold rounded-lg hover:bg-[hsl(var(--academy-primary))]/90 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-[hsl(var(--academy-primary))/20%]"
                    >
                      {isUpcoming ? "S'inscrire maintenant" : "Accéder au replay"}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Informations détaillées */}
                <div className="p-6 space-y-4">
                  <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                    <Info className="w-4 h-4 text-gray-400" />
                    Détails de la formation
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <Calendar className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-500">Date</span>
                      </div>
                      <div className="font-medium text-sm">
                        {new Date(masterclass.date).toLocaleDateString('fr-FR', { 
                          day: 'numeric',
                          month: 'short'
                        })}
                      </div>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <Clock className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-500">Horaire</span>
                      </div>
                      <div className="font-medium text-sm">{masterclass.time}</div>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <Clock4 className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-500">Durée</span>
                      </div>
                      <div className="font-medium text-sm">{masterclass.duration}</div>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <Video className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-500">Format</span>
                      </div>
                      <div className="font-medium text-sm">{masterclass.format}</div>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <Languages className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-500">Langue</span>
                      </div>
                      <div className="font-medium text-sm">{masterclass.languages[0]}</div>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <GraduationCap className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-500">Niveau</span>
                      </div>
                      <div className="font-medium text-sm">{masterclass.level}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tags et catégories */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-3">Catégories</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1.5 bg-gray-100 text-gray-600 text-sm rounded-lg">
                    {masterclass.category}
                  </span>
                  <span className="px-3 py-1.5 bg-gray-100 text-gray-600 text-sm rounded-lg">
                    {masterclass.level}
                  </span>
                  {masterclass.languages.map((lang, index) => (
                    <span key={index} className="px-3 py-1.5 bg-gray-100 text-gray-600 text-sm rounded-lg">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal d'inscription - CORRIGÉ AVEC SCROLL ET SANS LA PARTIE BLEUE */}
        <AnimatePresence>
          {showRegistrationForm && (
            <RegistrationModal
              masterclass={masterclass}
              onClose={() => setShowRegistrationForm(false)}
            />
          )}
        </AnimatePresence>

        {/* Popup formateur - TAILLE RÉDUITE */}
        <AnimatePresence>
          {showInstructorPopup && (
            <InstructorPopup
              instructor={masterclass.instructor}
              onClose={() => setShowInstructorPopup(false)}
            />
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
};

// Composants
const NotFoundState = ({ onBack }: { onBack: () => void }) => (
  <Layout>
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center max-w-md mx-auto p-8">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <BookOpen className="w-8 h-8 text-red-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Formation non trouvée</h2>
        <p className="text-gray-600 mb-6">La formation que vous recherchez n'existe pas ou a été supprimée.</p>
        <button 
          onClick={onBack}
          className="px-6 py-3 bg-[hsl(var(--academy-primary))] text-white font-semibold rounded-lg hover:bg-[hsl(var(--academy-primary))]/90 transition-colors"
        >
          Voir toutes les formations
        </button>
      </div>
    </div>
  </Layout>
);

// Popup formateur - TAILLE RÉDUITE
const InstructorPopup = ({ instructor, onClose }: { instructor: any; onClose: () => void }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
    onClick={onClose}
  >
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      className="bg-white rounded-xl max-w-md w-full max-h-[80vh] overflow-hidden"
      onClick={(e) => e.stopPropagation()}
    >
      {/* En-tête plus compact */}
      <div className="relative h-20 bg-gradient-to-r from-[hsl(var(--academy-primary))] to-[hsl(var(--academy-primary))/80%]">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1.5 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
        >
          <X className="w-4 h-4 text-white" />
        </button>
      </div>

      {/* Contenu plus compact */}
      <div className="relative px-5 pb-5">
        {/* Avatar plus petit */}
        <div className="absolute -top-10 left-5">
          <div className="relative">
            <img 
              src={instructor.image} 
              alt={instructor.name}
              className="w-16 h-16 rounded-full object-cover border-3 border-white shadow-md"
            />
          </div>
        </div>

        {/* Contenu avec espacement réduit */}
        <div className="pt-10">
          <h3 className="text-lg font-bold text-gray-900 mb-0.5">{instructor.name}</h3>
          <p className="text-sm text-[hsl(var(--academy-primary))] font-medium mb-3">{instructor.title}</p>
          
          {/* Bio avec texte plus petit */}
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-900 mb-1.5">À propos</h4>
            <p className="text-xs text-gray-600 leading-relaxed">{instructor.bio}</p>
          </div>

          {/* Expertise avec espacement réduit */}
          <div className="mb-3">
            <h4 className="text-sm font-semibold text-gray-900 mb-1.5">Expertise</h4>
            <div className="flex flex-wrap gap-1.5">
              {instructor.expertise.map((item: string, index: number) => (
                <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Réseaux sociaux plus compacts */}
          {instructor.social && (
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-1.5">Réseaux</h4>
              <div className="flex items-center gap-1.5">
                {instructor.social.linkedin && (
                  <a href="#" className="p-1.5 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                    <Linkedin className="w-4 h-4 text-gray-600" />
                  </a>
                )}
                {instructor.social.twitter && (
                  <a href="#" className="p-1.5 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                    <Twitter className="w-4 h-4 text-gray-600" />
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  </motion.div>
);

// RegistrationModal - CORRIGÉ AVEC SCROLL ET SANS LA PARTIE BLEUE
const RegistrationModal = ({ masterclass, onClose }: any) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
    onClick={onClose}
  >
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.95, opacity: 0 }}
      className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header - fixe */}
      <div className="p-6 border-b border-gray-200 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Inscription à la formation</h2>
            <p className="text-sm text-gray-500 mt-1">{masterclass.title}</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Formulaire - scrollable */}
      <div className="flex-1 overflow-y-auto p-6">
        <MasterclassRegistrationForm />
      </div>
    </motion.div>
  </motion.div>
);

export default MasterclassDetailPage;