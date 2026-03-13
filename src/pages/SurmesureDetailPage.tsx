import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { 
  Star, 
  Users, 
  Clock, 
  CheckCircle, 
  Calendar,
  CreditCard,
  UserCheck,
  AlertCircle,
  ArrowLeft,
  BookOpen,
  Award,
  Target,
  Zap,
  Shield,
  Sparkles,
  TrendingUp,
  ChevronRight,
  CircleCheck,
  GraduationCap,
  BadgeCheck,
  Medal,
  Rocket,
  Brain,
  Lightbulb,
  BarChart,
  Layers
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { RegistrationForm } from '@/components/ui/RegistrationForm';
import { popularCourses, type Course } from "@/data/courses";

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
  },
  accent: {
    gold: '#f4e4c1',
    goldDark: '#d4a574',
    cream: '#faf8f3',
    lightGray: '#f8f9fa'
  }
};

const SurmesureDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Charger le cours depuis les données
    const foundCourse = popularCourses.find(c => c.id === id);
    setCourse(foundCourse || null);
    setLoading(false);
  }, [id]);

  const getStatusIcon = (status: Course['status']) => {
    switch (status) {
      case 'disponible': return <CheckCircle className="w-3.5 h-3.5" />;
      case 'réservation': return <Calendar className="w-3.5 h-3.5" />;
      case 'achat': return <CreditCard className="w-3.5 h-3.5" />;
      case 'coach': return <UserCheck className="w-3.5 h-3.5" />;
      default: return <AlertCircle className="w-3.5 h-3.5" />;
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

  useEffect(() => {
    if (showRegistrationForm) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showRegistrationForm]);

  const getStatusColor = (status: Course['status']) => {
    switch (status) {
      case 'disponible': return 'bg-green-100 text-green-700 border-green-200';
      case 'réservation': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'achat': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'coach': return 'bg-orange-100 text-orange-700 border-orange-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#46181e] via-[#6a232d] to-[#8e2e3b]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-3 border-[#f4e4c1] border-t-transparent mx-auto mb-4"></div>
            <p className="text-white text-sm font-medium">Chargement...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!course) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#46181e] via-[#6a232d] to-[#8e2e3b]">
          <div className="text-center bg-white/10 backdrop-blur-md p-8 rounded-xl border border-white/20 max-w-md mx-4">
            <AlertCircle className="w-12 h-12 text-[#f4e4c1] mx-auto mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">Formation non trouvée</h2>
            <p className="text-white/80 mb-6 text-sm">La formation que vous recherchez n'existe pas.</p>
            <Button 
              onClick={() => navigate('/sur-mesure')}
              className="bg-[#d44c5e] hover:bg-[#b23a4a] text-white px-6 py-2 text-sm font-semibold"
            >
              Retour aux formations
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-[#fdf2f4] via-white to-[#fbe7ea] pt-16">
        {/* Hero Section */}
        <div className="relative h-56 sm:h-64 overflow-hidden">
          <img 
            src={course.image} 
            alt={course.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#46181e] via-[#46181e]/70 to-transparent" />
          
          {/* Bouton retour */}
          <div className="absolute top-4 left-4 z-10">
            <Button
              variant="outline"
              onClick={() => navigate('/sur-mesure')}
              className="bg-white/20 backdrop-blur-md border-white/40 text-white hover:bg-white/30 px-4 py-2 h-auto text-sm"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Retour
            </Button>
          </div>

          {/* Contenu du hero */}
          <div className="absolute bottom-4 left-4 right-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="bg-white/20 backdrop-blur-md text-white border-0 mb-2 px-3 py-1 text-xs">
                {course.category}
              </Badge>
              <h1 className="text-xl sm:text-3xl font-bold text-white mb-1 line-clamp-2">
                {course.title}
              </h1>
              <p className="text-sm text-white/90 line-clamp-2">
                {course.description}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Colonne principale */}
            <div className="lg:col-span-2 space-y-5">
              {/* Métriques */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                <Card className="border border-gray-200 shadow-md bg-white">
                  <CardContent className="p-4">
                    <div className="grid grid-cols-4 gap-1.5 px-1">
                      <div className="text-center">
                        <div className="bg-gradient-to-br from-[#d44c5e] to-[#b23a4a] rounded-lg p-1.5 mb-1.5 mx-auto w-7">
                          <div className="flex justify-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-1.5 h-1.5 ${
                                  i < Math.floor(course.rating)
                                    ? 'text-white fill-white'
                                    : 'text-white/30'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <div className="text-xs font-bold text-[#46181e]">{course.rating}</div>
                        <div class="text-[9px] text-gray-500">Note</div>
                      </div>
                      <div className="text-center">
                        <div className="bg-gradient-to-br from-[#d44c5e] to-[#b23a4a] rounded-lg p-1.5 mb-1.5 mx-auto w-7">
                          <Users className="w-2.5 h-2.5 text-white mx-auto" />
                        </div>
                        <div className="text-xs font-bold text-[#46181e]">{course.students}</div>
                        <div class="text-[9px] text-gray-500">Étudiants</div>
                      </div>
                      <div className="text-center">
                        <div className="bg-gradient-to-br from-[#d44c5e] to-[#b23a4a] rounded-lg p-1.5 mb-1.5 mx-auto w-7">
                          <Clock className="w-2.5 h-2.5 text-white mx-auto" />
                        </div>
                        <div className="text-xs font-bold text-[#46181e]">{course.duration}</div>
                        <div class="text-[9px] text-gray-500">Durée</div>
                      </div>
                      <div className="text-center">
                        <div className="bg-gradient-to-br from-[#d44c5e] to-[#b23a4a] rounded-lg p-1.5 mb-1.5 mx-auto w-7">
                          <BookOpen className="w-2.5 h-2.5 text-white mx-auto" />
                        </div>
                        <div className="text-xs font-bold text-[#46181e]">{course.level}</div>
                        <div class="text-[9px] text-gray-500">Niveau</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="border border-gray-200 shadow-md bg-white">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="bg-gradient-to-br from-[#d44c5e] to-[#b23a4a] rounded-md p-1.5">
                        <BookOpen className="w-4 h-4 text-white" />
                      </div>
                      <h2 className="text-base font-bold text-[#46181e]">Description</h2>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-sm">
                      {course.longDescription || "Formation complète pour maîtriser tous les aspects de ce domaine. Cette formation sur mesure est conçue pour vous fournir les compétences pratiques et théoriques nécessaires pour exceller dans votre carrière professionnelle."}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Compétences */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                <Card className="border border-gray-200 shadow-md bg-white">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="bg-gradient-to-br from-[#d44c5e] to-[#b23a4a] rounded-md p-1.5">
                        <Target className="w-4 h-4 text-white" />
                      </div>
                      <h2 className="text-base font-bold text-[#46181e]">Compétences</h2>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {course.tags.map((tag, i) => (
                        <span key={i} className="inline-flex items-center gap-1.5 bg-gradient-to-r from-[#fdf2f4] to-[#fbe7ea] px-3 py-1.5 rounded-md border border-[#e77a8a]/20 text-xs font-medium text-gray-800">
                          <CircleCheck className="w-3.5 h-3.5 text-[#d44c5e]" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Points forts */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="border border-gray-200 shadow-md bg-white">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="bg-gradient-to-br from-[#d44c5e] to-[#b23a4a] rounded-md p-1.5">
                        <TrendingUp className="w-4 h-4 text-white" />
                      </div>
                      <h2 className="text-base font-bold text-[#46181e]">Points forts</h2>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center gap-2 p-2 bg-gradient-to-r from-[#fdf2f4] to-[#fbe7ea] rounded-md border border-[#e77a8a]/20">
                        <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 rounded p-1.5">
                          <Zap className="w-3.5 h-3.5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-[#46181e] text-xs">Intensive</h3>
                          <p className="text-[10px] text-gray-600">Apprentissage rapide</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 p-2 bg-gradient-to-r from-[#fdf2f4] to-[#fbe7ea] rounded-md border border-[#e77a8a]/20">
                        <div className="bg-gradient-to-br from-blue-400 to-blue-500 rounded p-1.5">
                          <Shield className="w-3.5 h-3.5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-[#46181e] text-xs">Certifiante</h3>
                          <p className="text-[10px] text-gray-600">Reconnue</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 p-2 bg-gradient-to-r from-[#fdf2f4] to-[#fbe7ea] rounded-md border border-[#e77a8a]/20">
                        <div className="bg-gradient-to-br from-green-400 to-green-500 rounded p-1.5">
                          <Users className="w-3.5 h-3.5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-[#46181e] text-xs">Accompagnement</h3>
                          <p className="text-[10px] text-gray-600">Personnalisé</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 p-2 bg-gradient-to-r from-[#fdf2f4] to-[#fbe7ea] rounded-md border border-[#e77a8a]/20">
                        <div className="bg-gradient-to-br from-purple-400 to-purple-500 rounded p-1.5">
                          <Award className="w-3.5 h-3.5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-[#46181e] text-xs">Pratique</h3>
                          <p className="text-[10px] text-gray-600">Projets concrets</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Colonne latérale - Carte d'inscription figée */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-4">
                {/* Carte d'inscription */}
                <div className="rounded-lg border border-gray-200 shadow-lg bg-white overflow-hidden">
                  {/* Header avec prix */}
                  <div className="bg-gradient-to-r from-[#46181e] via-[#6a232d] to-[#8e2e3b] p-4 text-center">
                    <div className="text-2xl font-bold text-white mb-1">
                      {course.price.toLocaleString()} FCFA
                    </div>
                    <div className="text-xs text-white/80">
                      Prix formation complète
                    </div>
                  </div>
                  
                  {/* Corps de la carte */}
                  <div className="p-4">
                    {/* Badge de statut */}
                    <div className="text-center mb-4">
                      <div className={`rounded-full ${getStatusColor(course.status)} px-3 py-1 text-xs font-medium inline-flex items-center gap-1.5`}>
                        {getStatusIcon(course.status)}
                        <span>{getStatusText(course.status)}</span>
                      </div>
                    </div>
                    
                    {/* Liste des avantages */}
                    <div className="space-y-2.5 mb-5">
                      <div className="flex items-center gap-2 p-2 bg-gradient-to-r from-[#fdf2f4] to-[#fbe7ea] rounded-md">
                        <div className="bg-gradient-to-br from-[#d44c5e] to-[#b23a4a] rounded p-1">
                          <CheckCircle className="w-3.5 h-3.5 text-white" />
                        </div>
                        <span className="text-gray-800 text-xs font-medium">Accès illimité</span>
                      </div>
                      
                      <div className="flex items-center gap-2 p-2 bg-gradient-to-r from-[#fdf2f4] to-[#fbe7ea] rounded-md">
                        <div className="bg-gradient-to-br from-[#d44c5e] to-[#b23a4a] rounded p-1">
                          <CheckCircle className="w-3.5 h-3.5 text-white" />
                        </div>
                        <span className="text-gray-800 text-xs font-medium">Certification finale</span>
                      </div>
                      
                      <div className="flex items-center gap-2 p-2 bg-gradient-to-r from-[#fdf2f4] to-[#fbe7ea] rounded-md">
                        <div className="bg-gradient-to-br from-[#d44c5e] to-[#b23a4a] rounded p-1">
                          <CheckCircle className="w-3.5 h-3.5 text-white" />
                        </div>
                        <span className="text-gray-800 text-xs font-medium">Support 7j/7</span>
                      </div>
                      
                      <div className="flex items-center gap-2 p-2 bg-gradient-to-r from-[#fdf2f4] to-[#fbe7ea] rounded-md">
                        <div className="bg-gradient-to-br from-[#d44c5e] to-[#b23a4a] rounded p-1">
                          <CheckCircle className="w-3.5 h-3.5 text-white" />
                        </div>
                        <span className="text-gray-800 text-xs font-medium">Mises à jour gratuites</span>
                      </div>
                    </div>
                    
                    {/* Bouton d'inscription */}
                    <button 
                      onClick={() => setShowRegistrationForm(true)}
                      className="w-full bg-gradient-to-r from-[#d44c5e] to-[#b23a4a] hover:from-[#b23a4a] hover:to-[#8e2e3b] text-white font-semibold py-3 px-4 rounded-md text-sm shadow-md transition-all duration-200 hover:shadow-lg"
                    >
                      S'inscrire maintenant
                    </button>
                    
                    {/* Garantie */}
                    <div className="mt-3 text-center">
                      <p className="text-xs text-gray-600">
                        <span className="text-[#d44c5e] font-semibold">100% satisfait</span> ou remboursé
                      </p>
                    </div>
                  </div>
                </div>

                {/* Carte de confiance */}
                <div className="rounded-lg border border-gray-200 shadow-md bg-gradient-to-br from-[#f4e4c1] to-[#faf8f3] p-4 text-center">
                  <div className="flex justify-center mb-2">
                    <Shield className="w-6 h-6 text-[#46181e]" />
                  </div>
                  <h3 className="text-sm font-bold text-[#46181e] mb-1">Garantie de qualité</h3>
                  <p className="text-gray-700 text-xs">
                    Formation certifiée par des experts métier
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Formulaire d'inscription complet */}
        {showRegistrationForm && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-2xl"
            >
              <RegistrationForm
                trainingTitle={course.title}
                onClose={() => setShowRegistrationForm(false)}
                onSuccess={() => setShowRegistrationForm(false)}
              />
            </motion.div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SurmesureDetailPage;