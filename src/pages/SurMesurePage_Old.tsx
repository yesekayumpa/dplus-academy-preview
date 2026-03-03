import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BookOpen, 
  Star, 
  Users, 
  Clock, 
  Award, 
  CheckCircle, 
  Calendar,
  CreditCard,
  UserCheck,
  AlertCircle,
  TrendingUp,
  Sparkles,
  Heart,
  ArrowRight,
  Zap,
  Shield,
  Target,
  Eye,
  Play,
  ChevronRight,
  Filter,
  Search,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { popularCourses, type Course } from "@/data/courses";
import Layout from "@/components/layout/Layout";
import surMesureBg from "@/assets/woman-sitting-library-with-her-laptop.jpg";

const SurMesurePage = () => {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const getStatusIcon = (status: Course['status']) => {
    switch (status) {
      case 'disponible': return <CheckCircle className="w-4 h-4" />;
      case 'réservation': return <Calendar className="w-4 h-4" />;
      case 'achat': return <CreditCard className="w-4 h-4" />;
      case 'coach': return <UserCheck className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getStatusText = (status: Course['status']) => {
    switch (status) {
      case 'disponible': return 'Disponible immédiatement';
      case 'réservation': return 'Réservation requise';
      case 'achat': return 'Achat direct';
      case 'coach': return 'Avec coach';
      default: return 'Contactez-nous';
    }
  };

  const getStatusColor = (status: Course['status']) => {
    switch (status) {
      case 'disponible': return 'bg-green-100 text-green-700 border-green-200';
      case 'réservation': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'achat': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'coach': return 'bg-orange-100 text-orange-700 border-orange-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getActionButton = (course: Course) => {
    switch (course.status) {
      case 'disponible':
        return (
          <Button 
            className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white"
            onClick={() => setSelectedCourse(course)}
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Commencer maintenant
          </Button>
        );
      case 'réservation':
        return (
          <Button 
            className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white"
            onClick={() => setSelectedCourse(course)}
          >
            <Calendar className="w-4 h-4 mr-2" />
            Réserver ma place
          </Button>
        );
      case 'achat':
        return (
          <Button 
            className="w-full bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white"
            onClick={() => setSelectedCourse(course)}
          >
            <CreditCard className="w-4 h-4 mr-2" />
            Acheter le cours
          </Button>
        );
      case 'coach':
        return (
          <Button 
            className="w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white"
            onClick={() => setSelectedCourse(course)}
          >
            <UserCheck className="w-4 h-4 mr-2" />
            Suivre avec un coach
          </Button>
        );
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="min-h-screen">
        {/* Hero Section ultra-élégante */}
        <div className="relative overflow-hidden">
          {/* Image de fond avec effet parallax */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-110"
            style={{ backgroundImage: `url(${surMesureBg})` }}
          />
          
          {/* Overlay multi-couches pour profondeur */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-[hsl(346_100%_25%)]/70 via-[hsl(346_100%_30%)]/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.1)_0%,_transparent_70%)]" />
          </div>
          
          {/* Particules flottantes */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white/30 rounded-full"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${30 + (i % 3) * 20}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.3, 0.8, 0.3],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 3 + i * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
          
          <div className="relative container mx-auto px-4 py-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-center max-w-5xl mx-auto"
            >
              {/* Badge premium animé */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/15 backdrop-blur-md border border-white/25 rounded-full mb-8 shadow-2xl"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-4 h-4 text-yellow-300" />
                </motion.div>
                <span className="text-sm font-medium text-white tracking-wide">Formations Premium Sur Mesure</span>
              </motion.div>
              
              {/* Titre principal avec effet de typographie */}
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-5xl md:text-7xl font-bold mb-6 text-white leading-tight"
              >
                <span className="block mb-2">Formation</span>
                <span className="block bg-gradient-to-r from-yellow-200 via-white to-yellow-200 bg-clip-text text-transparent drop-shadow-2xl">
                  Sur Mesure
                </span>
              </motion.h1>
              
              {/* Description avec effet de fade-in */}
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="text-xl md:text-2xl text-white/95 mb-10 leading-relaxed max-w-3xl mx-auto font-light drop-shadow-lg"
              >
                Des formations <span className="font-semibold text-white">100% personnalisées</span> conçues pour 
                <span className="text-yellow-200 font-medium"> transformer votre carrière</span>
              </motion.p>

              {/* Cartes de statistiques animées */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 max-w-4xl mx-auto"
              >
                {[
                  { 
                    icon: <Target className="w-5 h-5" />, 
                    value: "100%", 
                    label: "Personnalisable",
                    color: "from-blue-400 to-cyan-400"
                  },
                  { 
                    icon: <Users className="w-5 h-5" />, 
                    value: "2500+", 
                    label: "Étudiants satisfaits",
                    color: "from-purple-400 to-pink-400"
                  },
                  { 
                    icon: <Award className="w-5 h-5" />, 
                    value: "Expert", 
                    label: "Certification",
                    color: "from-yellow-400 to-orange-400"
                  }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                    whileHover={{ y: -5, scale: 1.05 }}
                    className="group bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300"
                  >
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} bg-opacity-20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                      <div className="text-white">{stat.icon}</div>
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-sm text-white/80 font-medium">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Boutons d'action élégants */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(0,0,0,0.3)" }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 font-bold rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center gap-3"
                >
                  <Zap className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                  <span className="relative z-10">Commencer ma formation</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-orange-300 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative z-10">Commencer ma formation</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 bg-white/10 backdrop-blur-md border-2 border-white/30 text-white font-medium rounded-full hover:bg-white/20 transition-all duration-300 flex items-center gap-3"
                >
                  <Eye className="w-5 h-5" />
                  <span>Voir les cours</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </motion.button>
              </motion.div>
            </motion.div>
          </div>

          {/* Vague décorative en bas */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
              <path 
                fill="white" 
                fillOpacity="0.95" 
                d="M0,64L1440,32L1440,320L0,320Z"
                className="animate-pulse"
              />
            </svg>
          </div>
        </div>

        {/* Section de recherche et filtres */}
        <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-lg">
          <div className="container mx-auto px-4 py-4 max-w-7xl">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex-1 min-w-[300px]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Rechercher une formation..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 focus:border-[hsl(346,100%,35%)] focus:ring-2 focus:ring-[hsl(346,100%,20%)] focus:bg-white transition-all text-gray-900 text-sm placeholder-gray-400 rounded-xl"
                  />
                </div>
              </div>
              
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2.5 bg-gray-50 border border-gray-200 focus:border-[hsl(346,100%,35%)] focus:ring-2 focus:ring-[hsl(346,100%,20%)] text-gray-900 text-sm rounded-xl appearance-none cursor-pointer min-w-[180px]"
              >
                <option value="all">Toutes catégories</option>
                <option value="Développement">Développement</option>
                <option value="Design">Design</option>
                <option value="Marketing">Marketing</option>
                <option value="Business">Business</option>
              </select>
            </div>
          </div>
        </div>

        {/* Cours Populaires Section avec design amélioré */}
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[hsl(346,100%,25%)]/10 to-[hsl(346,100%,35%)]/10 border border-[hsl(346,100%,20%)] rounded-full mb-4">
              <Sparkles className="w-4 h-4 text-[hsl(346,100%,35%)]" />
              <span className="text-sm font-semibold text-gray-800">Cours les plus populaires</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Explorez nos <span className="bg-gradient-to-r from-[hsl(346,100%,25%)] to-[hsl(346,100%,35%)] bg-clip-text text-transparent">formations premium</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Découvrez nos cours les plus demandés, mis à jour régulièrement avec les dernières tendances et technologies du marché.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.6 }}
                whileHover={{ y: -8 }}
                className="group"
              >
                <Card className="h-full border-0 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden bg-white rounded-2xl">
                  {/* Header avec gradient et image */}
                  <div className="relative h-56 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-[hsl(346,100%,25%)] via-[hsl(346,100%,30%)] to-[hsl(346,100%,35%)] opacity-90" />
                    
                    {/* Badge de statut */}
                    <div className="absolute top-4 right-4 z-10">
                      {course.isUpdated && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                        >
                          <Badge className="bg-green-500 text-white border-0 shadow-lg px-3 py-1">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Nouveau
                          </Badge>
                        </motion.div>
                      )}
                    </div>
                    
                    {/* Badge de catégorie */}
                    <div className="absolute top-4 left-4 z-10">
                      <Badge className="bg-white/20 backdrop-blur-md text-white border-white/30 px-3 py-1 shadow-lg">
                        {course.category}
                      </Badge>
                    </div>
                    
                    {/* Contenu du header */}
                    <div className="absolute inset-0 flex items-end p-6 z-5">
                      <div className="text-white">
                        <h3 className="text-xl font-bold mb-2 line-clamp-2 drop-shadow-lg">
                          {course.title}
                        </h3>
                        <p className="text-white/90 text-sm line-clamp-2 drop-shadow-md">
                          {course.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    {/* Métriques améliorées */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(course.rating)
                                  ? 'text-yellow-400 fill-yellow-400'
                                  : i < course.rating
                                  ? 'text-yellow-200 fill-yellow-200'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="font-bold text-gray-800 text-lg">{course.rating}</span>
                        <span className="text-gray-500 text-sm">({course.reviews})</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-500">
                        <Users className="w-4 h-4" />
                        <span className="text-sm font-medium">{course.students}</span>
                      </div>
                    </div>

                    {/* Niveau et durée avec design moderne */}
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="outline" className="capitalize px-3 py-1 border-[hsl(346,100%,30%)] text-[hsl(346,100%,35%)] font-medium">
                        {course.level}
                      </Badge>
                      <div className="flex items-center gap-1 text-sm text-gray-600 bg-gray-50 px-3 py-1 rounded-full">
                        <Clock className="w-3 h-3" />
                        <span>{course.duration}</span>
                      </div>
                    </div>

                    {/* Tags améliorés */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {course.tags.slice(0, 3).map((tag, tagIndex) => (
                        <motion.div
                          key={tagIndex}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.4 + tagIndex * 0.1 }}
                        >
                          <Badge 
                            variant="secondary" 
                            className="text-xs bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 border-gray-200 px-2.5 py-1 font-medium"
                          >
                            {tag}
                          </Badge>
                        </motion.div>
                      ))}
                      {course.tags.length > 3 && (
                        <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1">
                          +{course.tags.length - 3}
                        </Badge>
                      )}
                    </div>

                    <Separator className="my-4 bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

                    {/* Prix et statut */}
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="text-2xl font-bold text-gray-900 mb-1">
                          {course.price.toLocaleString('fr-FR')} 
                          <span className="text-sm font-normal text-gray-500">FCFA</span>
                        </div>
                        {course.status === 'réservation' && (
                          <div className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full inline-block">
                            Session: {course.nextSession}
                          </div>
                        )}
                      </div>
                      
                      <div className={`px-3 py-1.5 rounded-full text-xs font-bold border shadow-md ${
                        course.status === 'disponible' ? 'bg-green-100 text-green-700 border-green-200' :
                        course.status === 'réservation' ? 'bg-blue-100 text-blue-700 border-blue-200' :
                        course.status === 'achat' ? 'bg-purple-100 text-purple-700 border-purple-200' :
                        course.status === 'coach' ? 'bg-orange-100 text-orange-700 border-orange-200' :
                        'bg-gray-100 text-gray-700 border-gray-200'
                      }`}>
                        {getStatusIcon(course.status)}
                        <span className="ml-1">{getStatusText(course.status)}</span>
                      </div>
                    </div>

                    {/* Date de mise à jour */}
                    {course.isUpdated && (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                        className="flex items-center gap-2 mb-4 text-xs text-green-600 bg-green-50 p-3 rounded-xl border border-green-200"
                      >
                        <CheckCircle className="w-3 h-3" />
                        <span>Mis à jour le {new Date(course.lastUpdateDate).toLocaleDateString('fr-FR')}</span>
                      </motion.div>
                    )}

                    {/* Bouton d'action amélioré */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {getActionButton(course)}
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Modal de détails du cours */}
        {selectedCourse && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedCourse(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <div className="h-64 bg-gradient-to-br from-[hsl(346_100%_25%)] to-[hsl(346_100%_35%)] p-8">
                  <button
                    onClick={() => setSelectedCourse(null)}
                    className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                  >
                    ×
                  </button>
                  
                  <div className="text-white">
                    <Badge className="bg-white/20 text-white border-white/30 mb-4">
                      {selectedCourse.category}
                    </Badge>
                    <h2 className="text-3xl font-bold mb-3">{selectedCourse.title}</h2>
                    <p className="text-white/90 text-lg">{selectedCourse.longDescription}</p>
                  </div>
                </div>

                <div className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-bold mb-4 text-gray-800">Objectifs d'apprentissage</h3>
                      <ul className="space-y-2">
                        {selectedCourse.objectives.map((objective, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{objective}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold mb-4 text-gray-800">Prérequis</h3>
                      <ul className="space-y-2">
                        {selectedCourse.prerequisites.map((prereq, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <ArrowRight className="w-5 h-5 text-[hsl(346_100%_30%)] mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{prereq}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <Separator className="my-8" />

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-3xl font-bold text-gray-800">{selectedCourse.price.toLocaleString('fr-FR')} FCFA</div>
                      <div className="text-gray-500 mt-1">
                        {selectedCourse.duration} • {selectedCourse.level}
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        onClick={() => setSelectedCourse(null)}
                        className="border-[hsl(346_100%_30%)] text-[hsl(346_100%_30%)] hover:bg-[hsl(346_100%_5%)]"
                      >
                        Retour
                      </Button>
                      {getActionButton(selectedCourse)}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </Layout>
  );
};

export default SurMesurePage;
