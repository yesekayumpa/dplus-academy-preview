import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
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
  X,
  Plus,
  User,
  MapPin,
  Phone,
  Mail,
  MessageSquare,
  Grid3X3,
  List,
  Timer,
  FileText,
  Send,
  Star,
  Briefcase,
  Code,
  Palette,
  BarChart3,
  Globe,
  Lock,
  Gift,
  Headphones,
  Laptop,
  Coffee,
  Wifi,
  Award as AwardIcon,
  Trash2,
  Edit,
  Check,
  Clock3,
  CalendarDays,
  CalendarClock,
  CalendarRange,
  CalendarCheck,
  Repeat,
  PlusCircle,
  MinusCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { popularCourses, type Course } from "@/data/courses";
import Layout from "@/components/layout/Layout";
import surMesureBg from "@/assets/woman-sitting-library-with-her-laptop.jpg";
import MasterclassRegistrationForm from "@/components/MasterclassRegistrationForm";

// Interface pour un créneau individuel
interface TimeSlot {
  day: string;
  timeSlot: string;
}

// Interface pour un cours sélectionné avec ses créneaux multiples
interface SelectedCourseWithSchedule {
  course: Course;
  schedule: {
    days: TimeSlot[]; // Tableau de créneaux (plusieurs jours possibles)
    startDate: string;
    customNote?: string;
    frequency: "hebdomadaire" | "mensuelle"; // Fréquence des cours
  };
}

// Liste des jours disponibles
const daysOfWeek = [
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
  "Dimanche",
];

// Créneaux horaires disponibles
const timeSlots = [
  "08:00 - 10:00",
  "10:00 - 12:00",
  "14:00 - 16:00",
  "16:00 - 18:00",
  "18:00 - 20:00",
  "20:00 - 22:00",
];

const SurMesurePage = () => {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Scroller en haut au chargement de la page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [availabilityFilter, setAvailabilityFilter] = useState<string>("all");
  const [showAvailabilityForm, setShowAvailabilityForm] = useState(false);
  const [selectedCoursesWithSchedule, setSelectedCoursesWithSchedule] = useState<
    SelectedCourseWithSchedule[]
  >([]);
  const [currentSchedule, setCurrentSchedule] = useState({
    days: [] as TimeSlot[],
    startDate: "",
    customNote: "",
    frequency: "hebdomadaire" as "hebdomadaire" | "mensuelle",
  });
  const [currentDay, setCurrentDay] = useState("");
  const [currentTimeSlot, setCurrentTimeSlot] = useState("");
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [otherFormationData, setOtherFormationData] = useState({
    title: "",
    description: "",
    objectives: "",
    duration: "",
    level: "débutant",
  });
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  // Gérer le scroll de la page principale quand le formulaire est ouvert
  useEffect(() => {
    if (showRegistrationForm) {
      // Sauvegarder la position de scroll actuelle
      const scrollY = window.scrollY;
      
      // Appliquer les styles pour bloquer le scroll
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      
      // Compenser la disparition de la scrollbar pour éviter le décalage
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      // Récupérer la position de scroll sauvegardée
      const scrollY = document.body.style.top;
      
      // Restaurer les styles
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      
      // Restaurer la position de scroll
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
      }
    }

    return () => {
      // Nettoyage : s'assurer que tout est remis à zéro
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [showRegistrationForm]);

  // Vérifier si un créneau est disponible (pas de conflit avec d'autres cours)
  const isTimeSlotAvailable = (
    course: Course,
    day: string,
    timeSlot: string,
    startDate: string,
    excludeIndex?: number
  ): boolean => {
    return !selectedCoursesWithSchedule.some((item, index) => {
      if (excludeIndex !== undefined && index === excludeIndex) return false;
      
      // Vérifier si le jour et le créneau sont déjà pris
      return item.schedule.days.some(
        (d) => d.day === day && d.timeSlot === timeSlot && item.schedule.startDate === startDate
      );
    });
  };

  // Ajouter un créneau à la liste temporaire
  const handleAddTimeSlot = () => {
    if (!selectedCourse) return;
    
    if (!currentDay || !currentTimeSlot) {
      alert("Veuillez sélectionner un jour et un créneau horaire");
      return;
    }

    // Vérifier si le créneau est déjà ajouté
    if (currentSchedule.days.some(d => d.day === currentDay && d.timeSlot === currentTimeSlot)) {
      alert("Ce créneau est déjà ajouté");
      return;
    }

    // Vérifier si le créneau est disponible
    if (!isTimeSlotAvailable(selectedCourse, currentDay, currentTimeSlot, currentSchedule.startDate, editingIndex ?? undefined)) {
      alert("Ce créneau est déjà pris par une autre formation. Veuillez choisir un autre créneau.");
      return;
    }

    setCurrentSchedule({
      ...currentSchedule,
      days: [...currentSchedule.days, { day: currentDay, timeSlot: currentTimeSlot }],
    });

    // Réinitialiser les sélections
    setCurrentDay("");
    setCurrentTimeSlot("");
  };

  // Supprimer un créneau de la liste temporaire
  const handleRemoveTimeSlot = (index: number) => {
    setCurrentSchedule({
      ...currentSchedule,
      days: currentSchedule.days.filter((_, i) => i !== index),
    });
  };

  const handleCourseClick = (course: Course) => {
    setSelectedCourse(course);
    setShowRegistrationForm(true);
  };

  const handleAddToSelection = () => {
    if (!selectedCourse) return;

    if (currentSchedule.days.length === 0) {
      alert("Veuillez ajouter au moins un créneau horaire");
      return;
    }

    if (!currentSchedule.startDate) {
      alert("Veuillez sélectionner une date de début");
      return;
    }

    if (editingIndex !== null) {
      // Mode édition
      const updated = [...selectedCoursesWithSchedule];
      updated[editingIndex] = {
        course: selectedCourse,
        schedule: currentSchedule,
      };
      setSelectedCoursesWithSchedule(updated);
    } else {
      // Mode ajout
      setSelectedCoursesWithSchedule([
        ...selectedCoursesWithSchedule,
        {
          course: selectedCourse,
          schedule: currentSchedule,
        },
      ]);
    }

    // Fermer le modal
    setShowAvailabilityForm(false);
    setSelectedCourse(null);
    setCurrentSchedule({
      days: [],
      startDate: "",
      customNote: "",
      frequency: "hebdomadaire",
    });
    setCurrentDay("");
    setCurrentTimeSlot("");
    setEditingIndex(null);
  };

  const handleRemoveFromSelection = (index: number) => {
    setSelectedCoursesWithSchedule(
      selectedCoursesWithSchedule.filter((_, i) => i !== index)
    );
  };

  const handleEditSchedule = (index: number) => {
    const item = selectedCoursesWithSchedule[index];
    setSelectedCourse(item.course);
    setCurrentSchedule(item.schedule);
    setEditingIndex(index);
    setShowAvailabilityForm(true);
  };

  const handleAvailabilitySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleAddToSelection();
  };

  const handleOtherFormationSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const confirmMessage =
      `Êtes-vous sûr de vouloir proposer cette formation ?\n\n` +
      `Récapitulatif de votre proposition:\n` +
      `• Titre: ${otherFormationData.title}\n` +
      `• Description: ${otherFormationData.description.substring(0, 100)}${otherFormationData.description.length > 100 ? "..." : ""}\n` +
      `• Objectifs: ${otherFormationData.objectives}\n` +
      `• Durée: ${otherFormationData.duration}\n` +
      `• Niveau: ${otherFormationData.level}\n\n` +
      `Notre équipe étudiera votre demande et vous contactera sous 48h.\n\n` +
      `Cliquez sur OK pour envoyer votre proposition.`;

    if (window.confirm(confirmMessage)) {
      console.log("Autre formation:", otherFormationData);
      alert(
        "Votre proposition de formation a été envoyée avec succès! Notre équipe vous contactera sous 48h."
      );
      setShowOtherForm(false);
      setOtherFormationData({
        title: "",
        description: "",
        objectives: "",
        duration: "",
        level: "débutant",
      });
    }
  };

  const handleConfirmPlanning = () => {
    // Ici vous pouvez envoyer les données au backend
    console.log("Planning confirmé:", selectedCoursesWithSchedule);
    
    // Message récapitulatif
    let summary = "Récapitulatif de votre planning :\n\n";
    selectedCoursesWithSchedule.forEach((item, index) => {
      summary += `${index + 1}. ${item.course.title}\n`;
      summary += `   • Formateur: ${item.course.instructor}\n`;
      summary += `   • Fréquence: ${item.schedule.frequency === "hebdomadaire" ? "Hebdomadaire" : "Mensuelle"}\n`;
      summary += `   • Créneaux (${item.schedule.days.length}):\n`;
      item.schedule.days.forEach((day, i) => {
        summary += `      - ${day.day} à ${day.timeSlot}\n`;
      });
      summary += `   • Date de début: ${new Date(item.schedule.startDate).toLocaleDateString("fr-FR")}\n`;
      if (item.schedule.customNote) {
        summary += `   • Note: ${item.schedule.customNote}\n`;
      }
      summary += "\n";
    });

    alert(
      "Votre planning a été enregistré avec succès! Vous allez recevoir un email de confirmation avec tous les détails.\n\n" +
      summary
    );
    
    setShowPlanningModal(false);
  };

  // Formater les créneaux pour l'affichage
  const formatDaysForDisplay = (days: TimeSlot[]) => {
    if (days.length === 0) return "Aucun créneau";
    if (days.length === 1) return `${days[0].day} à ${days[0].timeSlot}`;
    
    // Grouper par jour
    const groupedByDay = days.reduce((acc, curr) => {
      if (!acc[curr.day]) {
        acc[curr.day] = [];
      }
      acc[curr.day].push(curr.timeSlot);
      return acc;
    }, {} as Record<string, string[]>);

    return Object.entries(groupedByDay)
      .map(([day, slots]) => `${day} (${slots.join(", ")})`)
      .join(" • ");
  };

  const getActionButton = (course: Course) => {
    if (course.status === "disponible") {
      return (
        <Button
          className="w-full bg-gradient-to-r from-[hsl(346,100%,25%)] to-[hsl(346,100%,35%)] hover:from-[hsl(346,100%,35%)] hover:to-[hsl(346,100%,45%)] text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg h-9 text-sm"
          onClick={() => handleCourseClick(course)}
        >
          <CalendarClock className="w-4 h-4 mr-2" />
          Choisir ce cours
        </Button>
      );
    } else if (course.status === "réservation") {
      return (
        <Button
          className="w-full bg-gradient-to-r from-[hsl(346,100%,25%)] to-[hsl(346,100%,35%)] hover:from-[hsl(346,100%,35%)] hover:to-[hsl(346,100%,45%)] text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg h-9 text-sm"
          onClick={() => handleCourseClick(course)}
        >
          <CalendarRange className="w-4 h-4 mr-2" />
          Choisir ce cours
        </Button>
      );
    } else if (course.status === "coach") {
      return (
        <Button
          className="w-full bg-gradient-to-r from-[hsl(346,100%,25%)] to-[hsl(346,100%,35%)] hover:from-[hsl(346,100%,35%)] hover:to-[hsl(346,100%,45%)] text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg h-9 text-sm"
          onClick={() => handleCourseClick(course)}
        >
          <UserCheck className="w-4 h-4 mr-2" />
          Choisir ce cours
        </Button>
      );
    } else if (course.status === "bientôt_disponible") {
      return (
        <Button
          disabled
          className="w-full bg-gradient-to-r from-[hsl(346,100%,20%)] to-[hsl(346,100%,25%)] text-white font-semibold shadow-lg cursor-not-allowed opacity-75 rounded-lg h-9 text-sm"
        >
          <Timer className="w-4 h-4 mr-2" />
          Bientôt disponible
        </Button>
      );
    } else {
      return (
        <Button
          disabled
          className="w-full bg-gray-300 text-gray-500 font-semibold shadow-lg cursor-not-allowed rounded-lg h-9 text-sm"
        >
          <Lock className="w-4 h-4 mr-2" />
          Non disponible
        </Button>
      );
    }
  };

  // Filtrer les cours
  const filteredCourses = popularCourses.filter((course) => {
    const matchesSearch =
      searchTerm === "" ||
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" ||
      course.category.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "développement":
        return <Code className="w-3 h-3" />;
      case "design":
        return <Palette className="w-3 h-3" />;
      case "marketing":
        return <TrendingUp className="w-3 h-3" />;
      case "business":
        return <Briefcase className="w-3 h-3" />;
      case "data science":
        return <BarChart3 className="w-3 h-3" />;
      default:
        return <BookOpen className="w-3 h-3" />;
    }
  };

  return (
    <Layout>
      <div className="min-h-screen">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${surMesureBg})` }}
          />

          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-[hsl(346_100%_25%)]/80 via-[hsl(346_100%_30%)]/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.15)_0%,_transparent_70%)]" />
          </div>

          <div className="relative container mx-auto px-4 py-16 md:py-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center max-w-4xl mx-auto"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full mb-6 shadow-xl"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-4 h-4 text-yellow-300" />
                </motion.div>
                <span className="text-sm font-medium text-white tracking-wide">
                  Formations Premium Sur Mesure
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white leading-tight"
              >
                <span className="block mb-2">Planifiez vos cours</span>
                <span className="bg-gradient-to-r from-yellow-200 via-white to-yellow-200 bg-clip-text text-transparent drop-shadow-2xl">
                  selon vos disponibilités
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="text-base md:text-lg text-white/90 mb-8 leading-relaxed max-w-2xl mx-auto"
              >
                Choisissez vos formations et <span className="font-semibold text-white">programmez les jours qui vous arrangent</span>{" "}
                avec les créneaux horaires de votre choix
              </motion.p>
            </motion.div>
          </div>

          <div className="absolute bottom-0 left-0 right-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1440 80"
              className="w-full h-auto"
            >
              <path
                fill="white"
                fillOpacity="1"
                d="M0,32L1440,16L1440,320L0,320Z"
              />
            </svg>
          </div>
        </div>

        {/* Section de recherche et filtres */}
        <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-lg">
          <div className="container mx-auto px-3 py-3 max-w-7xl">
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex-1 min-w-[280px]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Rechercher une formation..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 focus:border-[hsl(346,100%,35%)] focus:ring-1 focus:ring-[hsl(346,100%,20%)] focus:bg-white transition-all text-gray-900 text-sm placeholder-gray-400 rounded-lg"
                  />
                </div>
              </div>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 bg-gray-50 border border-gray-200 focus:border-[hsl(346,100%,35%)] focus:ring-1 focus:ring-[hsl(346,100%,20%)] text-gray-900 text-sm rounded-lg appearance-none cursor-pointer min-w-[160px]"
              >
                <option value="all">Toutes catégories</option>
                <option value="Développement">Développement</option>
                <option value="Design">Design</option>
                <option value="Marketing">Marketing</option>
                <option value="Business">Business</option>
                <option value="Data Science">Data Science</option>
              </select>
            </div>
          </div>
        </div>

        {/* Liste des formations disponibles */}
        <div className="container mx-auto px-3 py-12 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-gray-900">
              Choisissez vos{" "}
              <span className="bg-gradient-to-r from-[hsl(346,100%,25%)] to-[hsl(346,100%,35%)] bg-clip-text text-transparent">
                formations
              </span>
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Sélectionnez les cours qui vous intéressent et programmez-les selon vos jours disponibles
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.6 }}
                whileHover={{ y: -4 }}
                className="group h-full"
              >
                <Card className="h-full border-0 shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden bg-white rounded-xl flex flex-col">
                  <div className="relative h-36 overflow-hidden">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />

                    {course.isUpdated && (
                      <div className="absolute top-2 right-2 z-10">
                        <Badge className="bg-green-500 text-white border-0 shadow-lg px-2 py-0.5 text-[10px]">
                          <Sparkles className="w-2.5 h-2.5 mr-1" />
                          Nouveau
                        </Badge>
                      </div>
                    )}

                    <div className="absolute top-2 left-2 z-10">
                      <Badge className="bg-white/20 backdrop-blur-md text-white border-white/30 px-2 py-0.5 shadow-lg text-[10px] flex items-center gap-1">
                        {getCategoryIcon(course.category)}
                        {course.category}
                      </Badge>
                    </div>

                    <div className="absolute bottom-2 left-2 right-2 z-10">
                      <h3 className="text-sm font-bold text-white line-clamp-1 drop-shadow-lg">
                        {course.title}
                      </h3>
                    </div>
                  </div>

                  <CardContent className="p-3 flex-1 flex flex-col">
                    <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                      {course.description}
                    </p>

                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1.5">
                        <div className="w-5 h-5 bg-gradient-to-br from-[hsl(346,100%,25%)] to-[hsl(346,100%,35%)] rounded-full flex items-center justify-center text-white text-[10px] font-bold shadow-sm">
                          {course.instructor
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <span className="text-xs font-medium text-gray-700 truncate max-w-[80px]">
                          {course.instructor.split(" ")[0]}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <div className="flex items-center gap-0.5">
                          <Users className="w-3 h-3" />
                          <span>{course.students}</span>
                        </div>
                        <div className="flex items-center gap-0.5">
                          <Clock className="w-3 h-3" />
                          <span>{course.duration}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 mb-2">
                      <div className="flex items-center">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        <span className="text-xs font-semibold text-gray-900 ml-1">
                          {course.rating}
                        </span>
                      </div>
                      <span className="text-xs text-gray-400">
                        ({course.reviews})
                      </span>
                    </div>

                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-baseline gap-1">
                        <span className="text-base font-bold text-gray-900">
                          {course.price.toLocaleString("fr-FR")}
                        </span>
                        <span className="text-[10px] text-gray-500">
                          FCFA
                        </span>
                      </div>
                      <Badge
                        variant="outline"
                        className="capitalize px-1.5 py-0.5 border-[hsl(346,100%,30%)] text-[hsl(346,100%,35%)] font-medium text-[10px]"
                      >
                        {course.level}
                      </Badge>
                    </div>

                    <div className="mt-auto pt-2">
                      {getActionButton(course)}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Panier récapitulatif des formations sélectionnées */}
        {selectedCoursesWithSchedule.length > 0 && (
          <div className="sticky bottom-0 z-40 bg-white/95 backdrop-blur-xl border-t border-gray-200 shadow-lg">
            <div className="container mx-auto px-3 py-3 max-w-7xl">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-[hsl(346,100%,25%)] to-[hsl(346,100%,35%)] rounded-lg flex items-center justify-center">
                    <CalendarCheck className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-900">
                      Mon planning ({selectedCoursesWithSchedule.length} formation
                      {selectedCoursesWithSchedule.length > 1 ? "s" : ""})
                    </h3>
                    <p className="text-xs text-gray-500">
                      {selectedCoursesWithSchedule.reduce(
                        (total, item) => total + item.course.price,
                        0
                      ).toLocaleString("fr-FR")}{" "}
                      FCFA
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={() => setShowRegistrationForm(true)}
                    className="bg-gradient-to-r from-[hsl(346,100%,25%)] to-[hsl(346,100%,35%)] hover:from-[hsl(346,100%,35%)] hover:to-[hsl(346,100%,45%)] text-white h-8 text-xs"
                  >
                    <Check className="w-3 h-3 mr-1" />
                    S'inscrire maintenant
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Section Autres formations */}
        <div className="container mx-auto px-3 py-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-center mb-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-[hsl(346,100%,25%)]/10 to-[hsl(346,100%,35%)]/10 border border-[hsl(346,100%,30%)] rounded-full mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[hsl(346,100%,35%)]" />
              <span className="text-xs font-semibold text-gray-800">
                Formation personnalisée
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold mb-2 text-gray-900">
              Vous ne trouvez pas votre{" "}
              <span className="bg-gradient-to-r from-[hsl(346,100%,25%)] to-[hsl(346,100%,35%)] bg-clip-text text-transparent">
                formation idéale
              </span>
              ?
            </h2>
            <p className="text-sm text-gray-600 max-w-2xl mx-auto leading-relaxed mb-4">
              Décrivez-nous la formation que vous souhaitez et nous la créerons
              pour vous.
            </p>
            <Button
              onClick={() => setShowRegistrationForm(true)}
              className="bg-gradient-to-r from-[hsl(346,100%,25%)] to-[hsl(346,100%,35%)] hover:from-[hsl(346,100%,35%)] hover:to-[hsl(346,100%,45%)] text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 h-9 text-sm"
            >
              <Plus className="w-3.5 h-3.5 mr-1.5" />
              S'inscrire à une formation
            </Button>
          </motion.div>
        </div>

        {/* Formulaire d'inscription */}
        <AnimatePresence>
          {showRegistrationForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowRegistrationForm(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="bg-white rounded-3xl max-w-6xl w-full max-h-[95vh] overflow-hidden shadow-2xl flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowRegistrationForm(false)}
                    className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-gray-700 hover:bg-white/30 transition-all duration-300 shadow-lg"
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                  <div className="h-full overflow-y-auto">
                    <MasterclassRegistrationForm />
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