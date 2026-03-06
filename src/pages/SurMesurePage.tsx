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
  const [showPlanningModal, setShowPlanningModal] = useState(false);
  const [showOtherForm, setShowOtherForm] = useState(false);
  const [otherFormationData, setOtherFormationData] = useState({
    title: "",
    description: "",
    objectives: "",
    duration: "",
    level: "débutant",
  });
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  // Gérer le scroll de la page principale quand les modals sont ouverts
  useEffect(() => {
    const isAnyModalOpen =
      showAvailabilityForm || showPlanningModal || showOtherForm;

    if (isAnyModalOpen) {
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
  }, [showAvailabilityForm, showPlanningModal, showOtherForm]);

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
    // Réinitialiser le formulaire de planning
    setCurrentSchedule({
      days: [],
      startDate: "",
      customNote: "",
      frequency: "hebdomadaire",
    });
    setCurrentDay("");
    setCurrentTimeSlot("");
    setEditingIndex(null);
    setShowAvailabilityForm(true);
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
          className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg h-9 text-sm"
          onClick={() => handleCourseClick(course)}
        >
          <CalendarClock className="w-4 h-4 mr-2" />
          Choisir ce cours
        </Button>
      );
    } else if (course.status === "réservation") {
      return (
        <Button
          className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg h-9 text-sm"
          onClick={() => handleCourseClick(course)}
        >
          <CalendarRange className="w-4 h-4 mr-2" />
          Choisir ce cours
        </Button>
      );
    } else if (course.status === "coach") {
      return (
        <Button
          className="w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg h-9 text-sm"
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
          className="w-full bg-gradient-to-r from-orange-400 to-orange-300 text-white font-semibold shadow-lg cursor-not-allowed opacity-75 rounded-lg h-9 text-sm"
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
                    variant="outline"
                    size="sm"
                    onClick={() => setShowPlanningModal(true)}
                    className="border-[hsl(346,100%,30%)] text-[hsl(346,100%,35%)] hover:bg-[hsl(346,100%,5%)] h-8 text-xs"
                  >
                    <Calendar className="w-3 h-3 mr-1" />
                    Voir mon planning
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleConfirmPlanning}
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white h-8 text-xs"
                  >
                    <Check className="w-3 h-3 mr-1" />
                    Confirmer le planning
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
              onClick={() => setShowOtherForm(true)}
              className="bg-gradient-to-r from-[hsl(346,100%,25%)] to-[hsl(346,100%,35%)] hover:from-[hsl(346,100%,35%)] hover:to-[hsl(346,100%,45%)] text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 h-9 text-sm"
            >
              <Plus className="w-3.5 h-3.5 mr-1.5" />
              Proposer une autre formation
            </Button>
          </motion.div>
        </div>

        {/* Modal de planification avec créneaux multiples */}
        <AnimatePresence>
          {showAvailabilityForm && selectedCourse && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowAvailabilityForm(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="relative h-32 bg-gradient-to-br from-[hsl(346,100%,25%)] via-[hsl(346,100%,30%)] to-[hsl(346,100%,35%)] p-5 flex-shrink-0">
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowAvailabilityForm(false)}
                    className="absolute top-3 right-3 w-8 h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300"
                  >
                    <X className="w-4 h-4" />
                  </motion.button>
                  <div className="text-white">
                    <h2 className="text-xl font-bold mb-1">
                      {editingIndex !== null ? "Modifier" : "Planifier"} : {selectedCourse.title}
                    </h2>
                    <p className="text-white/90 text-sm">
                      Choisissez vos créneaux (plusieurs jours possibles)
                    </p>

                    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-lg p-2 border border-white/20 mt-2">
                      <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                        {selectedCourse.instructor
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-semibold text-xs">
                          {selectedCourse.instructor}
                        </p>
                        <p className="text-white/80 text-[10px]">
                          {selectedCourse.instructorTitle}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <form
                  onSubmit={handleAvailabilitySubmit}
                  className="flex-1 overflow-y-auto p-5 space-y-4"
                >
                  {/* Fréquence */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-2">
                      <Repeat className="w-3 h-3 inline mr-1" />
                      Fréquence des cours
                    </label>
                    <div className="flex gap-3">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="frequency"
                          value="hebdomadaire"
                          checked={currentSchedule.frequency === "hebdomadaire"}
                          onChange={(e) =>
                            setCurrentSchedule({
                              ...currentSchedule,
                              frequency: e.target.value as "hebdomadaire" | "mensuelle",
                            })
                          }
                          className="text-[hsl(346,100%,35%)]"
                        />
                        <span className="text-sm">Hebdomadaire</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="frequency"
                          value="mensuelle"
                          checked={currentSchedule.frequency === "mensuelle"}
                          onChange={(e) =>
                            setCurrentSchedule({
                              ...currentSchedule,
                              frequency: e.target.value as "hebdomadaire" | "mensuelle",
                            })
                          }
                          className="text-[hsl(346,100%,35%)]"
                        />
                        <span className="text-sm">Mensuelle</span>
                      </label>
                    </div>
                  </div>

                  {/* Sélection des créneaux */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-2">
                      <PlusCircle className="w-3 h-3 inline mr-1" />
                      Ajouter un créneau
                    </label>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                      <select
                        value={currentDay}
                        onChange={(e) => setCurrentDay(e.target.value)}
                        className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[hsl(346,100%,30%)] focus:border-[hsl(346,100%,35%)]"
                      >
                        <option value="">Choisir un jour</option>
                        {daysOfWeek.map((day) => (
                          <option key={day} value={day}>
                            {day}
                          </option>
                        ))}
                      </select>

                      <select
                        value={currentTimeSlot}
                        onChange={(e) => setCurrentTimeSlot(e.target.value)}
                        className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[hsl(346,100%,30%)] focus:border-[hsl(346,100%,35%)]"
                      >
                        <option value="">Choisir un horaire</option>
                        {timeSlots.map((slot) => (
                          <option key={slot} value={slot}>
                            {slot}
                          </option>
                        ))}
                      </select>
                    </div>

                    <Button
                      type="button"
                      onClick={handleAddTimeSlot}
                      className="w-full bg-[hsl(346,100%,35%)] hover:bg-[hsl(346,100%,45%)] text-white text-sm h-9"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Ajouter ce créneau
                    </Button>
                  </div>

                  {/* Liste des créneaux ajoutés */}
                  {currentSchedule.days.length > 0 && (
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-2">
                        Créneaux sélectionnés ({currentSchedule.days.length})
                      </label>
                      <div className="space-y-2">
                        {currentSchedule.days.map((slot, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between bg-gray-50 p-2 rounded-lg border border-gray-200"
                          >
                            <div className="flex items-center gap-2">
                              <CalendarDays className="w-4 h-4 text-[hsl(346,100%,35%)]" />
                              <span className="text-sm">
                                {slot.day} à {slot.timeSlot}
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleRemoveTimeSlot(index)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <MinusCircle className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Date de début */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      <Calendar className="w-3 h-3 inline mr-1" />
                      Date de début souhaitée
                    </label>
                    <input
                      type="date"
                      required
                      value={currentSchedule.startDate}
                      onChange={(e) =>
                        setCurrentSchedule({
                          ...currentSchedule,
                          startDate: e.target.value,
                        })
                      }
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[hsl(346,100%,30%)] focus:border-transparent"
                    />
                  </div>

                  {/* Note personnalisée */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      <MessageSquare className="w-3 h-3 inline mr-1" />
                      Note personnalisée (optionnel)
                    </label>
                    <textarea
                      value={currentSchedule.customNote}
                      onChange={(e) =>
                        setCurrentSchedule({
                          ...currentSchedule,
                          customNote: e.target.value,
                        })
                      }
                      rows={2}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[hsl(346,100%,30%)] focus:border-transparent"
                      placeholder="Précisions sur vos attentes..."
                    />
                  </div>

                  {/* Boutons d'action */}
                  <div className="flex gap-3 pt-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowAvailabilityForm(false)}
                      className="flex-1 border-[hsl(346,100%,30%)] text-[hsl(346,100%,35%)] hover:bg-[hsl(346,100%,5%)] h-9 text-sm"
                    >
                      Annuler
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-[hsl(346,100%,25%)] to-[hsl(346,100%,35%)] hover:from-[hsl(346,100%,35%)] hover:to-[hsl(346,100%,45%)] text-white h-9 text-sm"
                    >
                      {editingIndex !== null ? "Modifier" : "Ajouter au planning"}
                    </Button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Modal de visualisation du planning avec créneaux multiples */}
        <AnimatePresence>
          {showPlanningModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowPlanningModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="relative h-24 bg-gradient-to-br from-[hsl(346,100%,25%)] via-[hsl(346,100%,30%)] to-[hsl(346,100%,35%)] p-5 flex-shrink-0">
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowPlanningModal(false)}
                    className="absolute top-3 right-3 w-8 h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300"
                  >
                    <X className="w-4 h-4" />
                  </motion.button>
                  <div className="text-white">
                    <h2 className="text-xl font-bold mb-1">
                      Mon planning personnalisé
                    </h2>
                    <p className="text-white/90 text-sm">
                      {selectedCoursesWithSchedule.length} formation
                      {selectedCoursesWithSchedule.length > 1 ? "s" : ""} planifiée
                      {selectedCoursesWithSchedule.length > 1 ? "s" : ""}
                    </p>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-5">
                  <div className="space-y-4">
                    {selectedCoursesWithSchedule.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start gap-4">
                          {/* Image miniature */}
                          <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                            <img
                              src={item.course.image}
                              alt={item.course.title}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="text-sm font-bold text-gray-900">
                                  {item.course.title}
                                </h3>
                                <p className="text-xs text-gray-600 mt-1">
                                  {item.course.description}
                                </p>
                              </div>
                              <div className="flex gap-1">
                                <button
                                  onClick={() => handleEditSchedule(index)}
                                  className="p-1.5 text-gray-500 hover:text-[hsl(346,100%,35%)] hover:bg-[hsl(346,100%,5%)] rounded-lg transition-colors"
                                >
                                  <Edit className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => handleRemoveFromSelection(index)}
                                  className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>

                            <div className="mt-3">
                              <div className="flex items-center gap-2 text-xs text-gray-600 mb-2">
                                <User className="w-3.5 h-3.5 text-[hsl(346,100%,35%)]" />
                                <span className="font-medium">{item.course.instructor}</span>
                                <span className="text-gray-300">|</span>
                                <Repeat className="w-3.5 h-3.5 text-[hsl(346,100%,35%)]" />
                                <span className="capitalize">{item.schedule.frequency}</span>
                              </div>
                              
                              <div className="space-y-1">
                                {item.schedule.days.map((day, i) => (
                                  <div key={i} className="flex items-center gap-2 text-xs text-gray-600 bg-gray-50 p-1.5 rounded">
                                    <CalendarDays className="w-3 h-3 text-[hsl(346,100%,35%)]" />
                                    <span className="font-medium">{day.day}</span>
                                    <Clock3 className="w-3 h-3 text-[hsl(346,100%,35%)] ml-2" />
                                    <span>{day.timeSlot}</span>
                                  </div>
                                ))}
                              </div>

                              <div className="flex items-center gap-2 text-xs text-gray-600 mt-2">
                                <Calendar className="w-3.5 h-3.5 text-[hsl(346,100%,35%)]" />
                                <span>
                                  Début le {new Date(item.schedule.startDate).toLocaleDateString("fr-FR")}
                                </span>
                              </div>
                            </div>

                            {item.schedule.customNote && (
                              <div className="mt-2 p-2 bg-gray-50 rounded-lg text-xs text-gray-600">
                                <span className="font-medium">Note :</span>{" "}
                                {item.schedule.customNote}
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Récapitulatif des prix */}
                  <div className="mt-6 p-4 bg-gradient-to-r from-[hsl(346,100%,25%)]/5 to-[hsl(346,100%,35%)]/5 rounded-xl border border-[hsl(346,100%,30%)]/20">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">
                        Total des formations
                      </span>
                      <span className="text-lg font-bold text-[hsl(346,100%,35%)]">
                        {selectedCoursesWithSchedule
                          .reduce((total, item) => total + item.course.price, 0)
                          .toLocaleString("fr-FR")}{" "}
                        <span className="text-xs text-gray-500">FCFA</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Boutons d'action */}
                <div className="flex-shrink-0 border-t border-gray-200 p-4 bg-white">
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      onClick={() => setShowPlanningModal(false)}
                      className="flex-1 border-[hsl(346,100%,30%)] text-[hsl(346,100%,35%)] hover:bg-[hsl(346,100%,5%)] h-9 text-sm"
                    >
                      Continuer mes choix
                    </Button>
                    <Button
                      onClick={handleConfirmPlanning}
                      className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white h-9 text-sm"
                    >
                      <Check className="w-4 h-4 mr-2" />
                      Confirmer le planning
                    </Button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Modal Autre formation */}
        <AnimatePresence>
          {showOtherForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowOtherForm(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="bg-white rounded-3xl max-w-xl w-full max-h-[80vh] overflow-hidden shadow-2xl flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="relative h-24 bg-gradient-to-br from-[hsl(346,100%,25%)] via-[hsl(346,100%,30%)] to-[hsl(346,100%,35%)] p-5 flex-shrink-0 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse" />

                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowOtherForm(false)}
                    className="absolute top-3 right-3 w-8 h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 shadow-lg"
                  >
                    <X className="w-4 h-4" />
                  </motion.button>

                  <div className="relative z-10 text-white">
                    <motion.h2
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-xl font-bold mb-1 drop-shadow-lg"
                    >
                      Proposer une formation
                    </motion.h2>
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-white/90 text-sm drop-shadow-md"
                    >
                      Décrivez la formation que vous souhaitez
                    </motion.p>
                  </div>

                  <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-white/5 rounded-full blur-2xl" />
                  <div className="absolute -top-2 -left-2 w-12 h-12 bg-white/5 rounded-full blur-xl" />
                </div>

                <form
                  onSubmit={handleOtherFormationSubmit}
                  className="flex-1 overflow-y-auto p-4 space-y-3"
                >
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <label className="block text-xs font-medium text-gray-700 mb-1 flex items-center gap-1">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="w-4 h-4 bg-gradient-to-br from-[hsl(346,100%,25%)] to-[hsl(346,100%,35%)] rounded-full flex items-center justify-center shadow-md"
                      >
                        <BookOpen className="w-2 h-2 text-white" />
                      </motion.div>
                      <span className="text-gray-700">Titre de la formation</span>
                    </label>
                    <motion.input
                      whileFocus={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      type="text"
                      required
                      value={otherFormationData.title}
                      onChange={(e) =>
                        setOtherFormationData({
                          ...otherFormationData,
                          title: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[hsl(346,100%,30%)] focus:border-[hsl(346,100%,35%)] transition-all duration-300 shadow-sm hover:shadow-md bg-white"
                      placeholder="Ex: Marketing Digital Avancé"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <label className="block text-xs font-medium text-gray-700 mb-1 flex items-center gap-1">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="w-4 h-4 bg-gradient-to-br from-[hsl(346,100%,25%)] to-[hsl(346,100%,35%)] rounded-full flex items-center justify-center shadow-md"
                      >
                        <FileText className="w-2 h-2 text-white" />
                      </motion.div>
                      <span className="text-gray-700">Description</span>
                    </label>
                    <motion.textarea
                      whileFocus={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      required
                      rows={3}
                      value={otherFormationData.description}
                      onChange={(e) =>
                        setOtherFormationData({
                          ...otherFormationData,
                          description: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[hsl(346,100%,30%)] focus:border-[hsl(346,100%,35%)] transition-all duration-300 shadow-sm hover:shadow-md resize-none bg-white"
                      placeholder="Décrivez le contenu et les objectifs de la formation..."
                    />
                  </motion.div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1 flex items-center gap-1">
                      <div className="w-4 h-4 bg-gradient-to-br from-[hsl(346,100%,25%)] to-[hsl(346,100%,35%)] rounded-full flex items-center justify-center">
                        <Target className="w-2 h-2 text-white" />
                      </div>
                      Objectifs d'apprentissage
                    </label>
                    <textarea
                      required
                      rows={2}
                      value={otherFormationData.objectives}
                      onChange={(e) =>
                        setOtherFormationData({
                          ...otherFormationData,
                          objectives: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[hsl(346,100%,30%)] focus:border-[hsl(346,100%,35%)] transition-all duration-300 shadow-sm hover:shadow-md resize-none"
                      placeholder="Qu'allez-vous apprendre ? (séparez par des virgules)"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1 flex items-center gap-1">
                        <div className="w-4 h-4 bg-gradient-to-br from-[hsl(346,100%,25%)] to-[hsl(346,100%,35%)] rounded-full flex items-center justify-center">
                          <Clock className="w-2 h-2 text-white" />
                        </div>
                        Durée estimée
                      </label>
                      <input
                        type="text"
                        required
                        value={otherFormationData.duration}
                        onChange={(e) =>
                          setOtherFormationData({
                            ...otherFormationData,
                            duration: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[hsl(346,100%,30%)] focus:border-[hsl(346,100%,35%)] transition-all duration-300 shadow-sm hover:shadow-md"
                        placeholder="Ex: 40 heures"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1 flex items-center gap-1">
                        <div className="w-4 h-4 bg-gradient-to-br from-[hsl(346,100%,25%)] to-[hsl(346,100%,35%)] rounded-full flex items-center justify-center">
                          <Award className="w-2 h-2 text-white" />
                        </div>
                        Niveau requis
                      </label>
                      <select
                        value={otherFormationData.level}
                        onChange={(e) =>
                          setOtherFormationData({
                            ...otherFormationData,
                            level: e.target.value as any,
                          })
                        }
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[hsl(346,100%,30%)] focus:border-[hsl(346,100%,35%)] transition-all duration-300 shadow-sm hover:shadow-md"
                      >
                        <option value="débutant">Débutant</option>
                        <option value="intermédiaire">Intermédiaire</option>
                        <option value="avancé">Avancé</option>
                      </select>
                    </div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="bg-gradient-to-r from-[hsl(346,100%,25%)]/10 via-[hsl(346,100%,30%)]/10 to-[hsl(346,100%,35%)]/10 rounded-xl p-4 border border-[hsl(346,100%,20%)]/30 shadow-lg backdrop-blur-sm"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-6 h-6 bg-gradient-to-br from-[hsl(346,100%,25%)] to-[hsl(346,100%,35%)] rounded-full flex items-center justify-center shadow-lg"
                      >
                        <CheckCircle className="w-3 h-3 text-white" />
                      </motion.div>
                      <h3 className="text-sm font-bold text-gray-900">
                        Prêt à soumettre votre proposition ?
                      </h3>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Une fois soumise, notre équipe étudiera votre demande et
                      vous contactera sous 48h pour discuter des détails.
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                    className="flex gap-3 pt-3"
                  >
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1"
                    >
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowOtherForm(false)}
                        className="w-full border-[hsl(346,100%,30%)] text-[hsl(346,100%,35%)] hover:bg-[hsl(346,100%,5%)] transition-all duration-300 h-9 rounded-lg text-sm"
                      >
                        <X className="w-3.5 h-3.5 mr-1" />
                        Annuler
                      </Button>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1"
                    >
                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-[hsl(346,100%,25%)] via-[hsl(346,100%,30%)] to-[hsl(346,100%,35%)] hover:from-[hsl(346,100%,35%)] hover:via-[hsl(346,100%,40%)] hover:to-[hsl(346,100%,45%)] text-white transition-all duration-300 h-9 rounded-lg text-sm"
                      >
                        <Send className="w-3.5 h-3.5 mr-1" />
                        Envoyer
                      </Button>
                    </motion.div>
                  </motion.div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
};

export default SurMesurePage;