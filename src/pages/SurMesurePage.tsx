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

// Couleurs de la charte graphique
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
      case 'disponible': return 'Disponible';
      case 'réservation': return 'Réservation';
      case 'achat': return 'Achat direct';
      case 'coach': return 'Avec coach';
      default: return 'Contact';
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
    const baseClass = `w-full bg-[${colors.primary[500]}] hover:bg-[${colors.primary[600]}] text-white`;
    
    switch (course.status) {
      case 'disponible':
        return (
          <Button 
            className={baseClass}
            onClick={() => setSelectedCourse(course)}
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Voir le cours
          </Button>
        );
      case 'réservation':
        return (
          <Button 
            className={baseClass}
            onClick={() => setSelectedCourse(course)}
          >
            <Calendar className="w-4 h-4 mr-2" />
            Voir le cours
          </Button>
        );
      case 'achat':
        return (
          <Button 
            className={baseClass}
            onClick={() => setSelectedCourse(course)}
          >
            <CreditCard className="w-4 h-4 mr-2" />
            Voir le cours
          </Button>
        );
      case 'coach':
        return (
          <Button 
            className={baseClass}
            onClick={() => setSelectedCourse(course)}
          >
            <UserCheck className="w-4 h-4 mr-2" />
            Voir le cours
          </Button>
        );
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="min-h-screen">
        {/* Hero Section avec couleurs de la charte */}
        <div className="relative overflow-hidden bg-gradient-to-br from-[#46181e] via-[#6a232d] to-[#8e2e3b]">
          {/* Image de fond avec overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
            style={{ backgroundImage: `url(${surMesureBg})` }}
          />
          
          <div className="relative container mx-auto px-4 py-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-center max-w-5xl mx-auto"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full mb-8"
              >
                <Sparkles className="w-4 h-4 text-yellow-300" />
                <span className="text-sm font-medium text-white">Formations Sur Mesure</span>
              </motion.div>
              
              {/* Titre */}
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-5xl md:text-7xl font-bold mb-6 text-white"
              >
                Formation
                <span className="block text-yellow-300">Sur Mesure</span>
              </motion.h1>
              
              {/* Description */}
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-xl text-white/90 mb-10 max-w-3xl mx-auto"
              >
                Des formations personnalisées pour transformer votre carrière
              </motion.p>
            </motion.div>
          </div>
        </div>

        {/* Section de recherche */}
        <div className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
          <div className="container mx-auto px-4 py-3">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher une formation..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b23a4a] focus:border-transparent"
                />
              </div>
              
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b23a4a]"
              >
                <option value="all">Toutes</option>
                <option value="Développement">Développement</option>
                <option value="Design">Design</option>
                <option value="Marketing">Marketing</option>
              </select>
            </div>
          </div>
        </div>

        {/* Liste des cours simplifiée */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  {/* Header simplifié avec couleur bordeaux */}
                  <div className="h-32 bg-gradient-to-r from-[#46181e] to-[#8e2e3b] p-4 rounded-t-lg">
                    <div className="flex justify-between items-start">
                      <Badge className="bg-white/20 text-white border-0">
                        {course.category}
                      </Badge>
                      {course.isUpdated && (
                        <Badge className="bg-green-500 text-white border-0 text-xs">
                          Nouveau
                        </Badge>
                      )}
                    </div>
                    <h3 className="text-white font-bold mt-2 line-clamp-2">
                      {course.title}
                    </h3>
                  </div>

                  <CardContent className="p-4">
                    {/* Métriques simplifiées */}
                    <div className="flex items-center justify-between mb-3 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < Math.floor(course.rating)
                                  ? 'text-yellow-400 fill-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="font-medium">{course.rating}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-500">
                        <Users className="w-3 h-3" />
                        <span>{course.students}</span>
                      </div>
                    </div>

                    {/* Tags simplifiés */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {course.tags.slice(0, 2).map((tag, i) => (
                        <Badge key={i} variant="outline" className="text-xs border-gray-200">
                          {tag}
                        </Badge>
                      ))}
                      {course.tags.length > 2 && (
                        <Badge variant="outline" className="text-xs border-gray-200">
                          +{course.tags.length - 2}
                        </Badge>
                      )}
                    </div>

                    {/* Statut et durée */}
                    <div className="flex items-center justify-between text-sm mb-3">
                      <div className="flex items-center gap-1 text-gray-500">
                        <Clock className="w-3 h-3" />
                        <span>{course.duration}</span>
                      </div>
                      <Badge className={`${getStatusColor(course.status)} text-xs`}>
                        {getStatusIcon(course.status)}
                        <span className="ml-1">{getStatusText(course.status)}</span>
                      </Badge>
                    </div>

                    {/* Bouton uniforme */}
                    <Button 
                      className="w-full bg-[#b23a4a] hover:bg-[#8e2e3b] text-white"
                      onClick={() => setSelectedCourse(course)}
                    >
                      Voir le détail
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Modal de détails du cours */}
        <AnimatePresence>
          {selectedCourse && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedCourse(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header avec couleur bordeaux */}
                <div className="bg-gradient-to-r from-[#46181e] to-[#8e2e3b] p-6 relative">
                  <button
                    onClick={() => setSelectedCourse(null)}
                    className="absolute top-4 right-4 text-white/80 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  
                  <Badge className="bg-white/20 text-white border-0 mb-3">
                    {selectedCourse.category}
                  </Badge>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    {selectedCourse.title}
                  </h2>
                  <p className="text-white/90 text-sm">
                    {selectedCourse.description}
                  </p>
                </div>

                <div className="p-6">
                  {/* Métriques */}
                  <div className="flex items-center gap-4 mb-4 pb-4 border-b">
                    <div className="flex items-center gap-1">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(selectedCourse.rating)
                                ? 'text-yellow-400 fill-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="font-medium ml-1">{selectedCourse.rating}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600">
                      <Users className="w-4 h-4" />
                      <span>{selectedCourse.students}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>{selectedCourse.duration}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mb-4">
                    <h3 className="font-semibold mb-2">Description</h3>
                    <p className="text-gray-600 text-sm">
                      {selectedCourse.longDescription || "Formation complète pour maîtriser tous les aspects."}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="mb-4">
                    <h3 className="font-semibold mb-2">Compétences</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedCourse.tags.map((tag, i) => (
                        <Badge key={i} className="bg-[#b23a4a] text-white border-0">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Prix et inscription */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <span className="text-sm text-gray-500">Prix</span>
                        <div className="text-2xl font-bold text-[#46181e]">
                          {selectedCourse.price.toLocaleString()} FCFA
                        </div>
                      </div>
                      <Badge className={getStatusColor(selectedCourse.status)}>
                        {getStatusIcon(selectedCourse.status)}
                        <span className="ml-1">{getStatusText(selectedCourse.status)}</span>
                      </Badge>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        onClick={() => setSelectedCourse(null)}
                        className="flex-1"
                      >
                        Retour
                      </Button>
                      <Button 
                        className="flex-1 bg-[#b23a4a] hover:bg-[#8e2e3b] text-white"
                      >
                        S'inscrire
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
};

export default SurMesurePage;