import { useState, useMemo, useEffect } from "react";
import { Search, Filter, Calendar, Clock, Users, Play, FileText, MapPin, TrendingUp, Award, Sparkles, ArrowRight } from "lucide-react";
import { motion, useInView, useAnimation, AnimatePresence } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MasterclassRegistrationForm from "@/components/MasterclassRegistrationForm";

// Animated Stat Card Component
const StatCard = ({ icon, value, label, suffix, color, isDecimal = false }: any) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      controls.start({ opacity: 1, y: 0 });
      const duration = 2000;
      const steps = 60;
      const increment = (value - displayValue) / steps;
      let current = displayValue;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setDisplayValue(value);
          clearInterval(timer);
        } else {
          setDisplayValue(current);
        }
      }, duration / steps);
      
      return () => clearInterval(timer);
    }
  }, [isInView, value, displayValue, controls]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
      className="text-center"
    >
      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4 ${color}`}>
        {icon}
      </div>
      <motion.div 
        className={`text-3xl md:text-4xl font-bold ${color} mb-2`}
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring" }}
      >
        {isDecimal ? displayValue.toFixed(1) : Math.floor(displayValue)}
        {suffix}
      </motion.div>
      <p className="text-gray-600 font-medium">{label}</p>
    </motion.div>
  );
};

// Données des masterclass (exemple)
const masterclassData = [
  {
    id: 1,
    title: "Introduction à l'Investissement ESG",
    instructor: "Dr. Marie Dubois",
    date: "2024-03-15",
    time: "14:00",
    duration: "2h",
    status: "upcoming",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    videoId: "dQw4w9WgXcQ",
    description: "Découvrez les principes de l'investissement durable et son impact sur la finance moderne.",
    participants: 245,
    category: "Finance"
  },
  {
    id: 2,
    title: "Automatisation des Tâches avec Python",
    instructor: "Thomas Martin",
    date: "2024-03-20",
    time: "10:00",
    duration: "3h",
    status: "upcoming",
    thumbnail: "https://img.youtube.com/vi/8DvywoYvHgw/maxresdefault.jpg",
    videoId: "8DvywoYvHgw",
    description: "Apprenez à automatiser vos tâches quotidiennes avec des scripts Python efficaces.",
    participants: 189,
    category: "Outils Digitaux"
  },
  {
    id: 3,
    title: "Data Visualization avec Tableau",
    instructor: "Sophie Laurent",
    date: "2024-02-28",
    time: "15:00",
    duration: "2h30",
    status: "past",
    thumbnail: "https://img.youtube.com/vi/hHW1oY26k3I/maxresdefault.jpg",
    videoId: "hHW1oY26k3I",
    description: "Créez des dashboards interactifs et des visualisations de données percutantes.",
    participants: 312,
    category: "Data"
  },
  {
    id: 4,
    title: "Business Plan pour Startups",
    instructor: "Jean-Pierre Rousseau",
    date: "2024-02-15",
    time: "09:00",
    duration: "4h",
    status: "past",
    thumbnail: "https://img.youtube.com/vi/n7zHqO62E2s/maxresdefault.jpg",
    videoId: "n7zHqO62E2s",
    description: "Élaborez un business plan convaincant pour financer votre projet entrepreneurial.",
    participants: 156,
    category: "Entrepreneuriat"
  },
  {
    id: 5,
    title: "Leadership et Intelligence Émotionnelle",
    instructor: "Dr. Marie Dubois",
    date: "2024-03-25",
    time: "14:00",
    duration: "2h",
    status: "upcoming",
    thumbnail: "https://img.youtube.com/vi/7NqwuwjgJXc/maxresdefault.jpg",
    videoId: "7NqwuwjgJXc",
    description: "Développez votre leadership grâce à une meilleure compréhension des émotions.",
    participants: 98,
    category: "Soft Skills"
  },
  {
    id: 6,
    title: "Machine Learning pour Débutants",
    instructor: "Sophie Laurent",
    date: "2024-03-10",
    time: "11:00",
    duration: "3h",
    status: "upcoming",
    thumbnail: "https://img.youtube.com/vi/i_HQfBhjbIc/maxresdefault.jpg",
    videoId: "i_HQfBhjbIc",
    description: "Une introduction complète au machine learning et à ses applications pratiques.",
    participants: 423,
    category: "Data"
  }
];

const MasterclassPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "upcoming" | "past">("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Extraire les catégories uniques
  const categories = useMemo(() => {
    const cats = [...new Set(masterclassData.map(mc => mc.category))];
    return ["all", ...cats];
  }, []);

  // Filtrer les masterclass
  const filteredMasterclass = useMemo(() => {
    return masterclassData.filter(mc => {
      const matchesSearch = mc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           mc.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           mc.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = filterStatus === "all" || mc.status === filterStatus;
      const matchesCategory = selectedCategory === "all" || mc.category === selectedCategory;
      
      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [searchTerm, filterStatus, selectedCategory]);

  // Formater la date
  const formatDate = (dateString: string) => {
    if (dateString === "Sur demande") {
      return dateString;
    }
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Animated Header */}
      <div className="relative bg-gradient-to-br from-academy via-academy-light to-purple-600 text-white py-20 overflow-hidden">
        {/* Animated background elements */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-10 left-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ 
            y: [0, -20, 0],
            opacity: [0.4, 0.7, 0.4]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/4 w-32 h-32 bg-white/10 rounded-full blur-2xl"
        />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">2ème Édition</span>
            </motion.div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                Master Class R & Shiny
              </motion.span>
              <br />
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-400"
              >
                pour Actuaire
              </motion.span>
            </h1>
            
            <motion.p 
              className="text-xl text-white/90 max-w-2xl mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              Rejoignez notre formation intensive sur R et Shiny dédiée aux actuaires
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <Button 
                size="lg" 
                className="bg-white text-academy hover:bg-white/90 font-semibold px-8"
                onClick={() => document.querySelector('[value="registration"]')?.click()}
              >
                S'inscrire maintenant
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white/10 px-8"
                onClick={() => {
                  window.scrollTo(0, 0);
                  window.location.href = '/masterclasses';
                }}
              >
                En savoir plus
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Animated Statistics Section */}
      <div className="bg-white py-12 border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatCard 
              icon={<Users className="w-8 h-8" />}
              value={masterclassData.reduce((acc, m) => acc + m.participants, 0)}
              label="Participants"
              suffix="+"
              color="text-blue-600"
            />
            <StatCard 
              icon={<Award className="w-8 h-8" />}
              value={masterclassData.length}
              label="Masterclass"
              suffix=""
              color="text-purple-600"
            />
            <StatCard 
              icon={<TrendingUp className="w-8 h-8" />}
              value={4.8}
              label="Note moyenne"
              suffix="/5"
              color="text-green-600"
              isDecimal
            />
            <StatCard 
              icon={<Calendar className="w-8 h-8" />}
              value={masterclassData.filter(m => m.status === "upcoming").length}
              label="À venir"
              suffix=""
              color="text-orange-600"
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Aperçu des Masterclass
            </TabsTrigger>
            <TabsTrigger value="registration" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Inscription
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            {/* Filtres et recherche */}
            <motion.div 
              className="flex flex-col lg:flex-row gap-4 mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Barre de recherche */}
              <motion.div 
                className="flex-1 relative"
                whileFocus={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <input
                  type="text"
                  placeholder="Rechercher une masterclass..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-academy focus:border-transparent transition-all duration-300"
                />
              </motion.div>

              {/* Filtre de statut */}
              <div className="flex gap-2">
                {["all", "upcoming", "past"].map((status) => (
                  <motion.button
                    key={status}
                    onClick={() => setFilterStatus(status as any)}
                    className={`px-4 py-3 rounded-lg font-medium transition-colors ${
                      filterStatus === status 
                        ? "bg-academy text-white" 
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {status === "all" ? "Toutes" : status === "upcoming" ? "À venir" : "Passées"}
                  </motion.button>
                ))}
              </div>

              {/* Filtre de catégorie */}
              <motion.select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-academy focus:border-transparent bg-background transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileFocus={{ scale: 1.02 }}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat === "all" ? "Toutes les catégories" : cat}
                  </option>
                ))}
              </motion.select>
            </motion.div>

            {/* Résultats */}
            <div className="mb-4">
              <p className="text-muted-foreground">
                {filteredMasterclass.length} masterclass{filteredMasterclass.length > 1 ? 's' : ''} trouvé{filteredMasterclass.length > 1 ? 's' : ''}
              </p>
            </div>

            {/* Grid des masterclass */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              layout
            >
              <AnimatePresence>
                {filteredMasterclass.map((masterclass, index) => (
                  <motion.div
                    key={masterclass.id}
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ 
                      duration: 0.4, 
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 100
                    }}
                    whileHover={{ 
                      y: -8,
                      scale: 1.02,
                      transition: { duration: 0.2 }
                    }}
                    className="group cursor-pointer"
                  >
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100">
                      {/* Thumbnail YouTube */}
                      <div className="relative aspect-video overflow-hidden">
                        <motion.img
                          src={masterclass.thumbnail}
                          alt={masterclass.title}
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.4 }}
                        />
                        
                        {/* Overlay gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        {/* Bouton play */}
                        <motion.div 
                          className="absolute inset-0 flex items-center justify-center"
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                        >
                          <motion.div 
                            className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-lg"
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ type: "spring", stiffness: 400 }}
                          >
                            <Play className="w-6 h-6 text-white ml-1" />
                          </motion.div>
                        </motion.div>

                        {/* Badge de statut */}
                        <motion.div 
                          className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${
                            masterclass.status === "upcoming" 
                              ? "bg-green-500/90 text-white" 
                              : "bg-gray-500/90 text-white"
                          }`}
                          whileHover={{ scale: 1.1 }}
                        >
                          {masterclass.status === "upcoming" ? "À venir" : "Passée"}
                        </motion.div>

                        {/* Category badge */}
                        <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold bg-white/90 text-gray-800 backdrop-blur-sm">
                          {masterclass.category}
                        </div>
                      </div>

                      {/* Contenu */}
                      <div className="p-6">
                        <motion.h3 
                          className="text-xl font-bold text-gray-900 mb-2 line-clamp-2"
                          whileHover={{ color: "#0f172a" }}
                        >
                          {masterclass.title}
                        </motion.h3>
                        
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                          {masterclass.description}
                        </p>

                        {/* Infos */}
                        <div className="space-y-2 text-sm text-muted-foreground">
                          <motion.div 
                            className="flex items-center gap-2"
                            whileHover={{ x: 5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <Calendar className="w-4 h-4 text-academy" />
                            <span>{formatDate(masterclass.date)}</span>
                          </motion.div>
                          <motion.div 
                            className="flex items-center gap-2"
                            whileHover={{ x: 5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <MapPin className="w-4 h-4 text-academy" />
                            <span>{masterclass.location}</span>
                          </motion.div>
                          <motion.div 
                            className="flex items-center gap-2"
                            whileHover={{ x: 5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <Clock className="w-4 h-4 text-academy" />
                            <span>{masterclass.time} • {masterclass.duration}</span>
                          </motion.div>
                          <motion.div 
                            className="flex items-center gap-2"
                            whileHover={{ x: 5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <Users className="w-4 h-4 text-academy" />
                            <span>{masterclass.participants} participants</span>
                          </motion.div>
                        </div>

                        {/* Instructeur et catégorie */}
                        <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                          <motion.div 
                            whileHover={{ x: 5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <p className="text-sm font-medium text-gray-900">{masterclass.instructor}</p>
                            <p className="text-xs text-muted-foreground">{masterclass.category}</p>
                          </motion.div>
                          <motion.button 
                            className="px-4 py-2 bg-academy text-white rounded-lg text-sm font-medium hover:bg-academy/90 transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {masterclass.status === "upcoming" ? "S'inscrire" : "Voir la replay"}
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Message si aucun résultat */}
            {filteredMasterclass.length === 0 && (
              <motion.div 
                className="text-center py-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <p className="text-muted-foreground text-lg">
                  Aucune masterclass trouvée pour votre recherche.
                </p>
              </motion.div>
            )}

            {/* Testimonials Section */}
            <motion.div 
              className="mt-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-center mb-8">
                Ce que disent nos participants
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    name: "Marie Dupont",
                    role: "Data Analyst",
                    content: "Formation exceptionnelle ! J'ai pu appliquer directement les concepts de R et Shiny dans mon travail quotidien.",
                    rating: 5
                  },
                  {
                    name: "Jean Martin",
                    role: "Actuaire",
                    content: "Une approche pédagogique très pertinente pour notre métier. Les cas pratiques étaient particulièrement utiles.",
                    rating: 5
                  },
                  {
                    name: "Sophie Laurent",
                    role: "Risk Manager",
                    content: "Excellent investissement. Les formateurs sont experts et disponibles. Je recommande vivement cette masterclass.",
                    rating: 5
                  }
                ].map((testimonial, index) => (
                  <motion.div
                    key={index}
                    className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl shadow-lg border border-gray-100"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2, duration: 0.5 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                  >
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <motion.span
                          key={i}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: index * 0.2 + i * 0.1 }}
                        >
                          ⭐
                        </motion.span>
                      ))}
                    </div>
                    <p className="text-gray-700 mb-4 italic">"{testimonial.content}"</p>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-academy to-academy-light rounded-full flex items-center justify-center text-white font-bold">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{testimonial.name}</p>
                        <p className="text-sm text-gray-600">{testimonial.role}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="registration">
            <MasterclassRegistrationForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MasterclassPage;
