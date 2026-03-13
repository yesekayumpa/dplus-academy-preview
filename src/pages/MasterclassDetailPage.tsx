import { useState, useMemo, useEffect } from "react";
import { 
  Calendar, Clock, Users, BookOpen, ArrowRight, 
  Award, X, ChevronRight, Sparkles,
  Briefcase, LineChart, Globe, Zap, Shield,
  CheckCircle2, Target, Download, Heart, Share2,
  Database, BarChart, Brain, Code, FileText, 
  UserCircle, ArrowLeft, MapPin, Clock3,
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
  location?: string;
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
      image: "/assets/Formateur Afrique.jpg",
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
  },
  {
    id: 2,
    title: "Data Science Présentiel - Medina",
    subtitle: "Formation en présentiel au cœur de Medina",
    tagline: "Apprentissage pratique - En présentiel à Medina",
    description: "Formation pratique en présentiel dans notre centre de Medina. Apprenez les fondamentaux de la data science avec des exercices pratiques et du mentorat direct. Une expérience immersive pour maîtriser rapidement les compétences essentielles.",
    instructor: {
      name: "Dr. Marie Sène",
      title: "Data Science Consultant",
      image: "/assets/Formateur Afrique.jpg",
      bio: "Expert en data science avec plus de 10 ans d'expérience en formation et consulting. Spécialisée dans l'apprentissage pratique et l'accompagnement personnalisé pour garantir la réussite des participants.",
      expertise: ["Python", "Machine Learning", "Statistiques", "Visualisation"],
      social: {
        linkedin: "#",
        twitter: "#"
      }
    },
    date: "2024-04-15",
    time: "09:00",
    duration: "6h",
    status: "upcoming",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    participants: 25,
    category: "Data",
    level: "Intermédiaire",
    rating: 4.8,
    highlights: ["Python", "Pandas", "Machine Learning", "Projets pratiques"],
    color: "green",
    price: 799,
    format: "Présentiel",
    languages: ["Français"],
    prerequisites: ["Base en programmation", "Mathématiques de base"],
    certificate: true,
    location: "Medina"
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

  const handleDownloadBrochure = async () => {
    // Import dynamique de jsPDF
    const { default: jsPDF } = await import('jspdf');
    
    // Créer un PDF
    const doc = new jsPDF();
    
    // Configuration des polices
    doc.setFont('helvetica');
    
    // Titre
    doc.setFontSize(20);
    doc.setTextColor(70, 24, 30); // Couleur bordeaux
    doc.text('PLAQUETTE DE FORMATION', 105, 20, { align: 'center' });
    
    // Ligne de séparation
    doc.setDrawColor(70, 24, 30);
    doc.setLineWidth(0.5);
    doc.line(20, 25, 190, 25);
    
    // Titre de la formation
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    const splitTitle = doc.splitTextToSize(masterclass.title, 170);
    doc.text(splitTitle, 105, 35, { align: 'center' });
    
    // Sous-titre
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text(masterclass.subtitle, 105, 50, { align: 'center' });
    
    let yPosition = 65;
    
    // Section Description
    doc.setFontSize(14);
    doc.setTextColor(70, 24, 30);
    doc.text('DESCRIPTION', 20, yPosition);
    yPosition += 8;
    
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    const splitDescription = doc.splitTextToSize(masterclass.description, 170);
    doc.text(splitDescription, 20, yPosition);
    yPosition += splitDescription.length * 5 + 10;
    
    // Section Formateur
    doc.setFontSize(14);
    doc.setTextColor(70, 24, 30);
    doc.text('FORMATEUR', 20, yPosition);
    yPosition += 8;
    
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    doc.text(`${masterclass.instructor.name}`, 20, yPosition);
    yPosition += 6;
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(masterclass.instructor.title, 20, yPosition);
    yPosition += 6;
    
    const splitBio = doc.splitTextToSize(masterclass.instructor.bio, 170);
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text(splitBio, 20, yPosition);
    yPosition += splitBio.length * 5 + 10;
    
    // Section Détails
    doc.setFontSize(14);
    doc.setTextColor(70, 24, 30);
    doc.text('DÉTAILS DE LA FORMATION', 20, yPosition);
    yPosition += 8;
    
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    doc.text(`Durée: ${masterclass.duration}`, 20, yPosition);
    yPosition += 6;
    doc.text(`Niveau: ${masterclass.level}`, 20, yPosition);
    yPosition += 6;
    doc.text(`Prix: ${masterclass.price * 655} FCFA`, 20, yPosition);
    yPosition += 6;
    doc.text(`Format: ${masterclass.format}`, 20, yPosition);
    yPosition += 6;
    doc.text(`Date: ${masterclass.date}`, 20, yPosition);
    yPosition += 10;
    
    // Section Programme
    doc.setFontSize(14);
    doc.setTextColor(70, 24, 30);
    doc.text('PROGRAMME', 20, yPosition);
    yPosition += 8;
    
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    masterclass.highlights.forEach((highlight, index) => {
      if (yPosition > 270) {
        doc.addPage();
        yPosition = 20;
      }
      const splitHighlight = doc.splitTextToSize(`• ${highlight}`, 170);
      doc.text(splitHighlight, 20, yPosition);
      yPosition += splitHighlight.length * 5 + 3;
    });
    yPosition += 5;
    
    // Section Prérequis
    if (masterclass.prerequisites && masterclass.prerequisites.length > 0) {
      if (yPosition > 250) {
        doc.addPage();
        yPosition = 20;
      }
      doc.setFontSize(14);
      doc.setTextColor(70, 24, 30);
      doc.text('PRÉREQUIS', 20, yPosition);
      yPosition += 8;
      
      doc.setFontSize(11);
      doc.setTextColor(0, 0, 0);
      masterclass.prerequisites.forEach((prereq, index) => {
        const splitPrereq = doc.splitTextToSize(`• ${prereq}`, 170);
        doc.text(splitPrereq, 20, yPosition);
        yPosition += splitPrereq.length * 5 + 3;
      });
      yPosition += 5;
    }
    
    // Section Contact
    if (yPosition > 230) {
      doc.addPage();
      yPosition = 20;
    }
    doc.setFontSize(14);
    doc.setTextColor(70, 24, 30);
    doc.text('CONTACT', 20, yPosition);
    yPosition += 8;
    
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    doc.text('Email: info@dmplus-academy.com', 20, yPosition);
    yPosition += 6;
    doc.text('Téléphone: +221 XX XX XX XX', 20, yPosition);
    yPosition += 6;
    doc.text('Site web: www.dmplus-academy.com', 20, yPosition);
    
    // Pied de page
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text('© 2024 DM+ Academy - Tous droits réservés', 105, 285, { align: 'center' });
    
    // Téléchargement du PDF
    doc.save(`plaquette-${masterclass.title.replace(/\s+/g, '-')}.pdf`);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Navigation professionnelle - Responsive */}
        <div className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-3 sm:gap-6">
                <button 
                  onClick={() => navigate("/masterclasses")}
                  className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all duration-200 group"
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                  <span className="text-sm font-medium hidden sm:inline">Retour</span>
                </button>
                <div className="hidden sm:block h-6 w-px bg-gray-200" />
                <nav className="hidden sm:flex items-center gap-2">
                  <span className="text-sm text-gray-500">Formations</span>
                  <ChevronRight className="w-3 h-3 text-gray-400" />
                  <span className="text-sm font-medium text-gray-900">{masterclass.category}</span>
                </nav>
              </div>
              <div className="flex items-center gap-2 sm:gap-4">
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-full">
                  <Sparkles className="w-3 h-3 text-amber-600" />
                  <span className="text-xs font-medium text-amber-700">Populaire</span>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500 hidden sm:block">Note</div>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-bold text-gray-900">{masterclass.rating}</span>
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className={`w-3 h-3 ${i < Math.floor(masterclass.rating) ? 'fill-current' : 'fill-gray-300'}`} viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contenu principal avec espacement amélioré - Responsive */}
        <div className="container mx-auto px-4 max-w-7xl py-4 sm:py-8">
          {/* Layout en 2 colonnes avec meilleur espacement - Mobile first */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10">
            {/* Colonne principale - 2/3 */}
            <div className="lg:col-span-2 space-y-6">
              {/* Carte principale de la formation - Design amélioré */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                {/* Image avec overlay amélioré - Responsive */}
                <div className="relative h-56 sm:h-64 md:h-80 lg:h-96 group">
                  <img
                    src={masterclass.thumbnail}
                    alt={masterclass.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  
                  {/* Badges premium - Responsive */}
                  <div className="absolute top-3 sm:top-4 left-3 sm:left-4 flex flex-wrap gap-1.5 sm:gap-2">
                    <span className={`px-2 py-1 sm:px-3 sm:py-1.5 text-xs font-semibold rounded-full ${categoryStyle.bg} ${categoryStyle.text} border ${categoryStyle.border} backdrop-blur-sm`}>
                      {masterclass.category}
                    </span>
                    <span className={`px-2 py-1 sm:px-3 sm:py-1.5 text-xs font-semibold rounded-full ${levelStyle.bg} ${levelStyle.text} border ${levelStyle.border} backdrop-blur-sm`}>
                      {masterclass.level}
                    </span>
                    {masterclass.certificate && (
                      <span className="px-2 py-1 sm:px-3 sm:py-1.5 text-xs font-semibold rounded-full bg-amber-500/90 text-white border border-amber-400 backdrop-blur-sm flex items-center gap-1">
                        <Award className="w-3 h-3" />
                        <span className="hidden sm:inline">Certifiante</span>
                        <span className="sm:hidden">Cert.</span>
                      </span>
                    )}
                  </div>
                  
                  {/* Badge de statut - Responsive */}
                  {isUpcoming && (
                    <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
                      <div className="px-2 py-1 sm:px-3 sm:py-1.5 bg-green-500 text-white text-xs font-semibold rounded-full flex items-center gap-1 backdrop-blur-sm">
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full animate-pulse" />
                        <span className="hidden sm:inline">À venir</span>
                        <span className="sm:hidden">New</span>
                      </div>
                    </div>
                  )}
                  
                  {/* Informations sur l'image - Responsive */}
                  <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 text-white">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span className="text-xs sm:text-sm font-medium">{masterclass.participants} participants</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span className="text-xs sm:text-sm font-medium">{masterclass.duration}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 self-start sm:self-auto">
                        <span className="text-xs sm:text-sm font-medium">{masterclass.rating}</span>
                        <div className="flex text-amber-400">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className={`w-2.5 h-2.5 sm:w-3 sm:h-3 ${i < Math.floor(masterclass.rating) ? 'fill-current' : 'fill-gray-400'}`} viewBox="0 0 20 20">
                              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                            </svg>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contenu de la carte avec design amélioré - Responsive */}
                <div className="p-4 sm:p-6 lg:p-8">
                  <div className="mb-4 sm:mb-6">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-3">
                      <div className="flex-1">
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-3 leading-tight">
                          {masterclass.title}
                        </h1>
                        <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
                          {masterclass.subtitle}
                        </p>
                      </div>
                    </div>
                    
                    {/* Tagline - Responsive */}
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-[hsl(var(--academy-primary))/10] to-[hsl(var(--academy-primary))/5] border border-[hsl(var(--academy-primary))/20] rounded-full mb-3 sm:mb-4">
                      <Target className="w-3 h-3 sm:w-4 sm:h-4 text-[hsl(var(--academy-primary))]" />
                      <span className="text-xs sm:text-sm font-medium text-[hsl(var(--academy-primary))]">{masterclass.tagline}</span>
                    </div>
                  </div>

                  {/* Description avec mise en forme - Responsive */}
                  <div className="prose prose-gray max-w-none mb-6">
                    <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                      {masterclass.description}
                    </p>
                  </div>
                  
                  {/* Méta-informations en bas - Responsive */}
                  <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-100">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span className="text-xs sm:text-sm">{new Date(masterclass.date).toLocaleDateString('fr-FR', { 
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Video className="w-4 h-4" />
                          <span className="text-xs sm:text-sm">{masterclass.format}</span>
                        </div>
                      </div>
                      <button 
                        onClick={handleRegister}
                        className="w-full sm:w-auto px-4 py-2 sm:px-6 sm:py-3 bg-[hsl(var(--academy-primary))] text-white font-semibold rounded-lg hover:bg-[hsl(var(--academy-primary))]/90 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-[hsl(var(--academy-primary))/20%] hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                      >
                        {isUpcoming ? "S'inscrire maintenant" : "Accéder au replay"}
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Section formateur - Design compact */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-white rounded-xl border border-gray-100 p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 sm:gap-4">
                    {/* Photo compacte */}
                    <div className="relative group cursor-pointer" onClick={() => setShowInstructorPopup(true)}>
                      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--academy-primary))] to-[hsl(var(--academy-primary))/60%] rounded-full blur-lg opacity-20 group-hover:opacity-30 transition-opacity" />
                      <img 
                        src={masterclass.instructor.image} 
                        alt={masterclass.instructor.name}
                        className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-white shadow-lg group-hover:scale-105 transition-transform duration-300 relative"
                      />
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-green-500 border-2 border-white rounded-full flex items-center justify-center">
                        <svg className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    
                    {/* Infos compactes */}
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-base sm:text-lg font-bold text-gray-900">{masterclass.instructor.name}</h3>
                        <div className="px-1.5 py-0.5 bg-green-100 text-green-700 text-xs font-semibold rounded-full flex items-center gap-1">
                          <svg className="w-2 h-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                      <p className="text-xs sm:text-sm text-[hsl(var(--academy-primary))] font-medium">{masterclass.instructor.title}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs text-gray-500">8+ ans d'exp</span>
                        <span className="text-xs text-gray-500">4.9 ⭐</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Bouton pour voir le profil complet */}
                  <button 
                    onClick={() => setShowInstructorPopup(true)}
                    className="px-3 py-2 text-xs sm:text-sm font-medium text-[hsl(var(--academy-primary))] hover:bg-[hsl(var(--academy-primary))]/5 rounded-lg transition-colors flex items-center gap-2 border border-[hsl(var(--academy-primary))]/20"
                  >
                    <Info className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">Voir le profil</span>
                    <span className="sm:hidden">Profil</span>
                  </button>
                </div>
              </motion.div>

              {/* Points clés de la formation - Design moderne */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {/* En-tête de section - Responsive */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-4 sm:px-6 lg:px-8 py-4 sm:py-6 border-b border-green-100">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                      <Target className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-lg sm:text-xl font-bold text-gray-900">Ce que vous allez apprendre</h2>
                      <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">Les compétences clés que vous maîtriserez</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 sm:p-6 lg:p-8">
                  {/* TEXTE CORRIGÉ AVEC ANIMATION */}
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 + ("Transformez votre avenir".length + " avenir numérique".length) * 0.05 + 0.3 }}
                    className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6 max-w-lg"
                  >
                    Transformez votre <span className="whitespace-nowrap">avenir numérique</span>
                  </motion.p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {masterclass.highlights.map((item, index) => (
                      <motion.div 
                        key={index} 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
                        className="group flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-gradient-to-br from-gray-50 to-white border border-gray-100 rounded-xl hover:border-green-200 hover:shadow-md transition-all duration-300 cursor-pointer"
                      >
                        <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                          <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" />
                        </div>
                        <div className="flex-1">
                          <span className="text-gray-800 font-medium leading-relaxed text-sm sm:text-base">{item}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* Footer de section - Responsive */}
                  <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-100">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
                        <Award className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>Certification incluse à la fin de la formation</span>
                      </div>
                      <button 
                        onClick={handleRegister}
                        className="text-xs sm:text-sm font-medium text-green-600 hover:text-green-700 transition-colors flex items-center gap-1"
                      >
                        <span className="hidden sm:inline">Voir le programme détaillé</span>
                        <span className="sm:hidden">Programme</span>
                        <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Colonne latérale - Design premium & Responsive */}
            <div className="lg:col-span-1 space-y-4 sm:space-y-6">
              {/* Carte d'inscription - Design premium */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {/* En-tête avec badge promo amélioré - Responsive */}
                <div className="bg-gradient-to-r from-[hsl(var(--academy-primary))] to-[hsl(var(--academy-primary))/80%] px-4 py-3 sm:px-6 sm:py-4 relative overflow-hidden">
                  <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />
                  <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between text-white gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white/20 rounded-lg flex items-center justify-center">
                        <Tag className="w-3 h-3 sm:w-4 sm:h-4" />
                      </div>
                      <div>
                        <span className="text-xs sm:text-sm font-semibold">Offre spéciale</span>
                        <div className="text-xs opacity-90 hidden sm:block">Limitée dans le temps</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg sm:text-2xl font-bold">-15%</div>
                      <div className="text-xs opacity-90 hidden sm:block">Économisez</div>
                    </div>
                  </div>
                </div>

                {/* Informations détaillées - Responsive */}
                <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                  <div className="text-center">
                    <h3 className="font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center justify-center gap-2">
                      <Info className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                      <span className="text-sm sm:text-base">Détails de la formation</span>
                    </h3>
                  </div>
                  
                  <div className="grid grid-cols-3 sm:grid-cols-2 gap-2 sm:gap-3">
                    <div className="group p-2 sm:p-3 bg-gradient-to-br from-gray-50 to-white border border-gray-100 rounded-lg hover:border-[hsl(var(--academy-primary))]/30 hover:shadow-md transition-all duration-300">
                      <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                        <div className="w-4 h-4 sm:w-6 sm:h-6 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Calendar className="w-2 h-2 sm:w-3 sm:h-3 text-blue-600" />
                        </div>
                        <span className="text-xs font-medium text-gray-500">Date</span>
                      </div>
                      <div className="font-semibold text-xs sm:text-sm text-gray-900">
                        {masterclass.date === "Sur demande" ? "Sur demande" : new Date(masterclass.date).toLocaleDateString('fr-FR', { 
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </div>
                    </div>

                    <div className="group p-2 sm:p-3 bg-gradient-to-br from-gray-50 to-white border border-gray-100 rounded-lg hover:border-[hsl(var(--academy-primary))]/30 hover:shadow-md transition-all duration-300">
                      <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                        <div className="w-4 h-4 sm:w-6 sm:h-6 bg-green-100 rounded-lg flex items-center justify-center">
                          <Clock className="w-2 h-2 sm:w-3 sm:h-3 text-green-600" />
                        </div>
                        <span className="text-xs font-medium text-gray-500">Horaire</span>
                      </div>
                      <div className="font-semibold text-xs sm:text-sm text-gray-900">{masterclass.time}</div>
                    </div>

                    <div className="group p-2 sm:p-3 bg-gradient-to-br from-gray-50 to-white border border-gray-100 rounded-lg hover:border-[hsl(var(--academy-primary))]/30 hover:shadow-md transition-all duration-300">
                      <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                        <div className="w-4 h-4 sm:w-6 sm:h-6 bg-purple-100 rounded-lg flex items-center justify-center">
                          <MapPin className="w-2 h-2 sm:w-3 sm:h-3 text-purple-600" />
                        </div>
                        <span className="text-xs font-medium text-gray-500">Lieu</span>
                      </div>
                      <div className="font-semibold text-xs sm:text-sm text-gray-900">{masterclass.location || "En ligne"}</div>
                    </div>

                    <div className="group p-2 sm:p-3 bg-gradient-to-br from-gray-50 to-white border border-gray-100 rounded-lg hover:border-[hsl(var(--academy-primary))]/30 hover:shadow-md transition-all duration-300">
                      <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                        <div className="w-4 h-4 sm:w-6 sm:h-6 bg-orange-100 rounded-lg flex items-center justify-center">
                          <Clock className="w-2 h-2 sm:w-3 sm:h-3 text-orange-600" />
                        </div>
                        <span className="text-xs font-medium text-gray-500">Durée</span>
                      </div>
                      <div className="font-semibold text-xs sm:text-sm text-gray-900">{masterclass.duration}</div>
                    </div>

                    <div className="group p-2 sm:p-3 bg-gradient-to-br from-gray-50 to-white border border-gray-100 rounded-lg hover:border-[hsl(var(--academy-primary))]/30 hover:shadow-md transition-all duration-300">
                      <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                        <div className="w-4 h-4 sm:w-6 sm:h-6 bg-red-100 rounded-lg flex items-center justify-center">
                          <Video className="w-2 h-2 sm:w-3 sm:h-3 text-red-600" />
                        </div>
                        <span className="text-xs font-medium text-gray-500">Format</span>
                      </div>
                      <div className="font-semibold text-xs sm:text-sm text-gray-900">{masterclass.format}</div>
                    </div>

                    <div className="group p-2 sm:p-3 bg-gradient-to-br from-gray-50 to-white border border-gray-100 rounded-lg hover:border-[hsl(var(--academy-primary))]/30 hover:shadow-md transition-all duration-300">
                      <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                        <div className="w-4 h-4 sm:w-6 sm:h-6 bg-indigo-100 rounded-lg flex items-center justify-center">
                          <Languages className="w-2 h-2 sm:w-3 sm:h-3 text-indigo-600" />
                        </div>
                        <span className="text-xs font-medium text-gray-500">Langue</span>
                      </div>
                      <div className="font-semibold text-xs sm:text-sm text-gray-900">{masterclass.languages[0]}</div>
                    </div>

                    <div className="group p-2 sm:p-3 bg-gradient-to-br from-gray-50 to-white border border-gray-100 rounded-lg hover:border-[hsl(var(--academy-primary))]/30 hover:shadow-md transition-all duration-300">
                      <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                        <div className="w-4 h-4 sm:w-6 sm:h-6 bg-amber-100 rounded-lg flex items-center justify-center">
                          <GraduationCap className="w-2 h-2 sm:w-3 sm:h-3 text-amber-600" />
                        </div>
                        <span className="text-xs font-medium text-gray-500">Niveau</span>
                      </div>
                      <div className="font-semibold text-xs sm:text-sm text-gray-900">{masterclass.level}</div>
                    </div>
                  </div>
                </div>
                
                {/* Prix et actions - Design premium & Responsive */}
                <div className="border-t border-gray-100">
                  <div className="p-4 sm:p-6 bg-gradient-to-br from-gray-50 to-white">
                    {/* Prix avec animation - Responsive */}
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.5 }}
                      className="text-center mb-4 sm:mb-6"
                    >
                      <div className="flex items-baseline justify-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                        <span className="text-2xl sm:text-3xl font-bold text-[hsl(var(--academy-primary))]">
                          {masterclass.price * 655} FCFA
                        </span>
                        <span className="text-gray-400 line-through text-sm sm:text-lg">
                          {Math.round(masterclass.price * 655 * 1.15)} FCFA
                        </span>
                      </div>
                      <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 bg-green-100 text-green-700 text-xs sm:text-sm font-medium rounded-full">
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse" />
                        <span className="hidden sm:inline">TTC - Formation certifiante</span>
                        <span className="sm:hidden">Certifiante</span>
                      </div>
                    </motion.div>
                    
                    {/* Boutons d'action avec effets - Responsive */}
                    <div className="space-y-2 sm:space-y-3">
                      <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleRegister}
                        className="w-full px-4 py-3 sm:px-6 sm:py-4 bg-gradient-to-r from-[hsl(var(--academy-primary))] to-[hsl(var(--academy-primary))/90%] text-white font-bold rounded-xl hover:from-[hsl(var(--academy-primary))/90%] hover:to-[hsl(var(--academy-primary))/80%] transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 shadow-lg shadow-[hsl(var(--academy-primary))/25%] hover:shadow-xl group"
                      >
                        <span className="text-sm sm:text-base">{isUpcoming ? "S'inscrire maintenant" : "Accéder au replay"}</span>
                        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                      </motion.button>
                      
                      <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleDownloadBrochure}
                        className="w-full px-4 py-3 sm:px-6 sm:py-4 bg-white text-[hsl(var(--academy-primary))] font-bold rounded-xl border-2 border-[hsl(var(--academy-primary))] hover:bg-[hsl(var(--academy-primary))]/5 transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 group"
                      >
                        <Download className="w-4 h-4 sm:w-5 sm:h-5 group-hover:animate-bounce" />
                        <span className="text-sm sm:text-base">Télécharger la plaquette</span>
                      </motion.button>
                    </div>
                    
                    {/* Garanties - Responsive */}
                    <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200">
                      <div className="grid grid-cols-3 gap-2 sm:gap-3 text-center">
                        <div className="flex flex-col items-center gap-1">
                          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-100 rounded-lg flex items-center justify-center">
                            <ShieldCheck className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                          </div>
                          <span className="text-xs text-gray-600 hidden sm:block">Satisfait ou remboursé</span>
                          <span className="text-xs text-gray-600 sm:hidden">Remboursé</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Award className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                          </div>
                          <span className="text-xs text-gray-600">Certification</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                            <Users className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600" />
                          </div>
                          <span className="text-xs text-gray-600 hidden sm:block">Support illimité</span>
                          <span className="text-xs text-gray-600 sm:hidden">Support</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Tags et catégories - Design moderne & Responsive */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <h3 className="font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
                    <Tag className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                  </div>
                  <span className="text-sm sm:text-base">Catégories et labels</span>
                </h3>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  <span className="px-2 py-1 sm:px-3 sm:py-1.5 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 text-xs sm:text-sm font-medium rounded-lg border border-blue-200">
                    {masterclass.category}
                  </span>
                  <span className="px-2 py-1 sm:px-3 sm:py-1.5 bg-gradient-to-r from-green-50 to-green-100 text-green-700 text-xs sm:text-sm font-medium rounded-lg border border-green-200">
                    {masterclass.level}
                  </span>
                  {masterclass.languages.map((lang, index) => (
                    <span key={index} className="px-2 py-1 sm:px-3 sm:py-1.5 bg-gradient-to-r from-purple-50 to-purple-100 text-purple-700 text-xs sm:text-sm font-medium rounded-lg border border-purple-200">
                      {lang}
                    </span>
                  ))}
                  {masterclass.certificate && (
                    <span className="px-2 py-1 sm:px-3 sm:py-1.5 bg-gradient-to-r from-amber-50 to-amber-100 text-amber-700 text-xs sm:text-sm font-medium rounded-lg border border-amber-200 flex items-center gap-1">
                      <Award className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                      <span className="hidden sm:inline">Certifiante</span>
                      <span className="sm:hidden">Cert.</span>
                    </span>
                  )}
                </div>
              </motion.div>
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

        {/* Popup formateur - TAILLE RÉDUITE ET POLICE PLUS PETITE */}
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

// Popup formateur - TAILLE RÉDUITE ET POLICE PLUS PETITE
const InstructorPopup = ({ instructor, onClose }: { instructor: any; onClose: () => void }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-2 sm:p-4 overscroll-none"
    style={{ touchAction: 'none' }}
    onClick={onClose}
  >
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      className="bg-white rounded-xl w-full max-w-2xl max-h-[80vh] overflow-y-auto overscroll-contain mx-auto shadow-xl"
      style={{ touchAction: 'pan-y' }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* En-tête avec bouton de fermeture - Plus compact */}
      <div className="relative bg-gradient-to-r from-gray-50 to-white px-3 sm:px-4 py-3 border-b border-gray-100">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1.5 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <X className="w-4 h-4 text-gray-600" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gradient-to-br from-[hsl(var(--academy-primary))] to-[hsl(var(--academy-primary))/80%] rounded-lg flex items-center justify-center">
            <UserCircle className="w-3.5 h-3.5 text-white" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-gray-900">Formateur</h2>
            <p className="text-xs text-gray-500">Expert du domaine</p>
          </div>
        </div>
      </div>
      
      {/* Contenu principal - Plus compact */}
      <div className="p-4">
        <div className="flex flex-col sm:flex-row sm:items-start gap-4">
          {/* Image plus petite */}
          <div className="relative group flex-shrink-0 mx-auto sm:mx-0">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--academy-primary))] to-[hsl(var(--academy-primary))/60%] rounded-full blur-md opacity-20" />
              <img 
                src={instructor.image} 
                alt={instructor.name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-white shadow-md"
              />
              {/* Badge de vérification - Plus petit */}
              <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full flex items-center justify-center">
                <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>

          {/* Infos formateur - Police réduite */}
          <div className="flex-1 min-w-0 text-center sm:text-left">
            <div className="mb-3">
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
                <h3 className="text-base font-semibold text-gray-900">{instructor.name}</h3>
                <span className="px-1.5 py-0.5 bg-green-100 text-green-700 text-xs rounded-full inline-flex items-center gap-0.5 w-fit mx-auto sm:mx-0">
                  <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Vérifié</span>
                </span>
              </div>
              <p className="text-sm text-[hsl(var(--academy-primary))] font-medium mb-2">{instructor.title}</p>
              
              {/* Bio courte */}
              <p className="text-xs text-gray-600 leading-relaxed mb-3">{instructor.bio}</p>
              
              {/* Statistiques - Plus compactes */}
              <div className="grid grid-cols-3 gap-2 mb-3">
                <div className="text-center p-1.5 bg-gray-50 rounded-lg">
                  <div className="text-sm font-bold text-gray-900">8+</div>
                  <div className="text-xs text-gray-500">ans</div>
                </div>
                <div className="text-center p-1.5 bg-gray-50 rounded-lg">
                  <div className="text-sm font-bold text-gray-900">500+</div>
                  <div className="text-xs text-gray-500">étudiants</div>
                </div>
                <div className="text-center p-1.5 bg-gray-50 rounded-lg">
                  <div className="text-sm font-bold text-gray-900">4.9</div>
                  <div className="text-xs text-gray-500">note</div>
                </div>
              </div>
            </div>
            
            {/* Expertise tags - Plus petits */}
            <div>
              <h4 className="text-xs font-medium text-gray-700 mb-2">Expertise</h4>
              <div className="flex flex-wrap gap-1">
                {instructor.expertise.map((item: string, index: number) => (
                  <span key={index} className="px-2 py-0.5 bg-gradient-to-r from-[hsl(var(--academy-primary))/10] to-[hsl(var(--academy-primary))/5] border border-[hsl(var(--academy-primary))/20] text-[hsl(var(--academy-primary))] text-xs rounded-md">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  </motion.div>
);

// RegistrationModal - RESPONSIVE ET CORRIGÉ AVEC SCROLL
const RegistrationModal = ({ masterclass, onClose }: any) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-2 sm:p-4 overscroll-none"
    style={{ touchAction: 'none' }}
    onClick={onClose}
  >
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.95, opacity: 0 }}
      className="bg-white rounded-xl w-full max-w-2xl max-h-[95vh] sm:max-h-[90vh] flex flex-col overflow-hidden overscroll-contain mx-auto"
      style={{ touchAction: 'pan-y' }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header responsive - fixe */}
      <div className="p-4 sm:p-6 border-b border-gray-200 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 truncate">Inscription à la formation</h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1 truncate">{masterclass.title}</p>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0 ml-2"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Formulaire - scrollable responsive */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        <MasterclassRegistrationForm />
      </div>
    </motion.div>
  </motion.div>
);

export default MasterclassDetailPage;