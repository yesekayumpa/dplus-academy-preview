import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  User, Mail, MapPin, Phone, Briefcase, Code, BarChart3, 
  GraduationCap, Award, BookOpen, Target, ArrowRight, Info,
  CheckCircle2, Shield, Clock, Users, Star, Zap, ChevronRight,
  Palette, Rocket, TrendingUp, Database, Cpu, PieChart, Sparkles,
  Gem, Crown, Diamond, Award as AwardIcon, BadgeCheck, Heart,
  Compass, Feather, Wind, Sun, Moon, Globe, Lock, Key, Brush,
  GraduationCap as LearningIcon, LayoutGrid, Layers, Sliders, Gauge
} from "lucide-react";

// Schéma de validation Zod mis à jour
const formSchema = z.object({
  nomPrenom: z.string().min(2, "Le nom et prénom doivent contenir au moins 2 caractères"),
  email: z.string().email("Veuillez entrer une adresse email valide"),
  adresse: z.string().min(5, "L'adresse doit contenir au moins 5 caractères"),
  telephone: z.string().regex(/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/, "Veuillez entrer un numéro de téléphone valide"),
  profession: z.string().min(2, "La profession doit contenir au moins 2 caractères"),
  statut: z.enum(["etudiant", "professionnel"], { required_error: "Veuillez choisir votre statut" }),
  outils: z.array(z.string()).min(1, "Veuillez cocher au moins un outil"),
  autreOutil: z.string().optional(),
  autreOutilApprendre: z.string().optional(),
  niveauProgrammation: z.enum(["debutant", "intermediaire1", "intermediaire2", "avance"], { 
    required_error: "Veuillez choisir votre niveau" 
  }),
  niveauExcel: z.enum(["basique", "intermediaire", "avance"], { 
    required_error: "Veuillez choisir votre niveau Excel" 
  }),
  niveauR: z.enum(["debutant", "intermediaire1", "intermediaire2", "avance"]).optional(),
  connaitShiny: z.enum(["OUI", "NON"]).optional(),
  experienceProvisionnement: z.enum(["OUI", "NON"]).optional(),
  attentes: z.string().optional(),
  participeEdition2: z.enum(["OUI", "NON"], { required_error: "Veuillez choisir votre réponse" }),
});

type FormData = z.infer<typeof formSchema>;

// Thèmes de couleurs basés sur votre gradient marketing
const themes = {
  marketing: {
    name: "Marketing",
    primary: "hsl(345, 70%, 35%)",
    primaryLight: "hsl(345, 75%, 50%)",
    primaryDark: "hsl(345, 70%, 25%)",
    primaryBg: "hsl(345, 70%, 95%)",
    primaryBgLight: "hsl(345, 75%, 97%)",
    gradient: "from-[hsl(345,70%,35%)] to-[hsl(345,75%,50%)]",
    gradientDark: "from-[hsl(345,70%,25%)] to-[hsl(345,70%,35%)]",
    gradientLight: "from-[hsl(345,75%,50%)] to-[hsl(345,80%,60%)]",
    border: "border-[hsl(345,70%,35%)]/30",
    borderHover: "hover:border-[hsl(345,75%,50%)]/50",
    text: "text-[hsl(345,70%,35%)]",
    textHover: "hover:text-[hsl(345,70%,25%)]",
    bg: "bg-[hsl(345,70%,35%)]",
    bgHover: "hover:bg-[hsl(345,70%,25%)]",
    bgLight: "bg-[hsl(345,70%,95%)]",
    bgVeryLight: "bg-[hsl(345,75%,97%)]",
    ring: "ring-[hsl(345,70%,35%)]/20",
    from: "from-[hsl(345,70%,35%)]",
    to: "to-[hsl(345,75%,50%)]",
    via: "via-[hsl(345,75%,50%)]",
    badge: "bg-[hsl(345,70%,95%)] text-[hsl(345,70%,35%)] border-[hsl(345,70%,35%)]/30",
  },
  blue: {
    name: "Bleu",
    primary: "#2563eb",
    primaryLight: "#3b82f6",
    primaryDark: "#1d4ed8",
    primaryBg: "#dbeafe",
    primaryBgLight: "#eff6ff",
    gradient: "from-blue-600 to-blue-500",
    gradientDark: "from-blue-700 to-blue-600",
    gradientLight: "from-blue-500 to-blue-400",
    border: "border-blue-200",
    borderHover: "hover:border-blue-300",
    text: "text-blue-600",
    textHover: "hover:text-blue-700",
    bg: "bg-blue-600",
    bgHover: "hover:bg-blue-700",
    bgLight: "bg-blue-50",
    bgVeryLight: "bg-blue-50/30",
    ring: "ring-blue-600/20",
    from: "from-blue-600",
    to: "to-blue-500",
    via: "via-blue-500",
    badge: "bg-blue-100 text-blue-700 border-blue-200",
  },
  green: {
    name: "Vert",
    primary: "#16a34a",
    primaryLight: "#22c55e",
    primaryDark: "#15803d",
    primaryBg: "#dcfce7",
    primaryBgLight: "#f0fdf4",
    gradient: "from-green-600 to-green-500",
    gradientDark: "from-green-700 to-green-600",
    gradientLight: "from-green-500 to-green-400",
    border: "border-green-200",
    borderHover: "hover:border-green-300",
    text: "text-green-600",
    textHover: "hover:text-green-700",
    bg: "bg-green-600",
    bgHover: "hover:bg-green-700",
    bgLight: "bg-green-50",
    bgVeryLight: "bg-green-50/30",
    ring: "ring-green-600/20",
    from: "from-green-600",
    to: "to-green-500",
    via: "via-green-500",
    badge: "bg-green-100 text-green-700 border-green-200",
  },
  purple: {
    name: "Violet",
    primary: "#9333ea",
    primaryLight: "#a855f7",
    primaryDark: "#7e22ce",
    primaryBg: "#f3e8ff",
    primaryBgLight: "#faf5ff",
    gradient: "from-purple-600 to-purple-500",
    gradientDark: "from-purple-700 to-purple-600",
    gradientLight: "from-purple-500 to-purple-400",
    border: "border-purple-200",
    borderHover: "hover:border-purple-300",
    text: "text-purple-600",
    textHover: "hover:text-purple-700",
    bg: "bg-purple-600",
    bgHover: "hover:bg-purple-700",
    bgLight: "bg-purple-50",
    bgVeryLight: "bg-purple-50/30",
    ring: "ring-purple-600/20",
    from: "from-purple-600",
    to: "to-purple-500",
    via: "via-purple-500",
    badge: "bg-purple-100 text-purple-700 border-purple-200",
  },
  orange: {
    name: "Orange",
    primary: "#ea580c",
    primaryLight: "#f97316",
    primaryDark: "#c2410c",
    primaryBg: "#ffedd5",
    primaryBgLight: "#fff7ed",
    gradient: "from-orange-600 to-orange-500",
    gradientDark: "from-orange-700 to-orange-600",
    gradientLight: "from-orange-500 to-orange-400",
    border: "border-orange-200",
    borderHover: "hover:border-orange-300",
    text: "text-orange-600",
    textHover: "hover:text-orange-700",
    bg: "bg-orange-600",
    bgHover: "hover:bg-orange-700",
    bgLight: "bg-orange-50",
    bgVeryLight: "bg-orange-50/30",
    ring: "ring-orange-600/20",
    from: "from-orange-600",
    to: "to-orange-500",
    via: "via-orange-500",
    badge: "bg-orange-100 text-orange-700 border-orange-200",
  },
};

// Type pour le thème
type ThemeKey = keyof typeof themes;

// Composant pour les champs élégants avec thème dynamique (sans shadow)
const ElegantField = ({ icon: Icon, name, label, placeholder, type = "text", form, className = "", isRequired = true, theme }) => {
  const [isFocused, setIsFocused] = useState(false);
  const fieldValue = form.watch(name);
  
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={`relative group ${className}`}>
          <div className="relative">
            <FormLabel className={`
              absolute -top-2 left-3 px-2 text-xs font-medium transition-all z-10
              ${isFocused || field.value ? theme.text : 'text-gray-500'}
              bg-white
            `}>
              <span className="flex items-center gap-1">
                <Icon className={`w-3 h-3 ${isFocused || field.value ? theme.text : 'text-gray-400'}`} />
                {label}
                {isRequired && <span className={theme.text}>*</span>}
              </span>
            </FormLabel>
            <FormControl>
              <div className="relative">
                <Input
                  placeholder={isFocused ? placeholder : ""}
                  type={type}
                  className={`
                    h-12 pt-2 text-sm border-2 transition-all duration-300
                    ${form.formState.errors[name]
                      ? 'border-red-300 focus:border-red-500' 
                      : isFocused || field.value
                        ? `${theme.border} focus:${theme.border}`
                        : 'border-gray-200'
                    }
                    focus:ring-2 focus:${theme.ring} focus:${theme.border}
                    bg-white/80 backdrop-blur-sm
                  `}
                  {...field}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                />
                {field.value && !form.formState.errors[name] && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    <BadgeCheck className="w-5 h-5 text-green-500" />
                  </motion.div>
                )}
              </div>
            </FormControl>
          </div>
          <FormMessage className="text-xs mt-1 ml-1" />
        </FormItem>
      )}
    />
  );
};

// Composant simple pour les options radio (SANS AUCUN EFFET)
const SimpleRadioOption = ({ value, id, label, description, icon: Icon, selected, theme }) => (
  <div className={`
    flex items-start gap-4 p-4 rounded-xl border-2 transition-all cursor-pointer
    bg-white
    ${selected === id 
      ? `${theme.border} ${theme.bgLight}` 
      : 'border-gray-200'
    }
  `}>
    <RadioGroupItem value={id} id={id} className={`mt-1 ${theme.text}`} />
    <div className="flex-1">
      <Label htmlFor={id} className="text-base font-semibold text-gray-800 cursor-pointer flex items-center gap-2">
        {Icon && (
          <div className={`
            p-1.5 rounded-lg
            ${selected === id ? theme.bgLight : 'bg-gray-100'}
          `}>
            <Icon className={`
              w-4 h-4
              ${selected === id ? theme.text : 'text-gray-500'}
            `} />
          </div>
        )}
        {label}
      </Label>
      {description && (
        <p className="text-xs text-gray-500 mt-1">{description}</p>
      )}
    </div>
    {selected === id && (
      <div className={`w-6 h-6 ${theme.bg} rounded-full flex items-center justify-center`}>
        <CheckCircle2 className="w-4 h-4 text-white" />
      </div>
    )}
  </div>
);

// Nouveau composant pour les badges de compétences simples (SANS AUCUN EFFET)
const SimpleSkillBadge = ({ label, selected, onClick, icon: Icon }) => (
  <button
    type="button"
    onClick={onClick}
    className={`
      px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
      flex items-center gap-2 min-w-[100px] justify-center
      border-2
      ${selected 
        ? 'bg-[hsl(345,70%,35%)] text-white border-[hsl(345,70%,35%)]' 
        : 'bg-white text-gray-700 border-gray-200 hover:border-[hsl(345,70%,35%)]/30'
      }
    `}
  >
    {Icon && <Icon className={`w-4 h-4 ${selected ? 'text-white' : 'text-gray-500'}`} />}
    <span>{label}</span>
  </button>
);

// Composant pour l'en-tête de section simplifié
const SimpleSectionHeader = ({ icon: Icon, title, subtitle, theme }) => {
  return (
    <div className="relative mb-6">
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 ${theme.bg} rounded-xl flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-800">{title}</h3>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
      </div>
      <Separator className="mt-4 bg-gray-200" />
    </div>
  );
};

// Composant pour les cartes de niveau
const LevelCard = ({ title, icon: Icon, description, value, onChange, options, theme }) => {
  return (
    <div className="bg-white rounded-xl border-2 border-gray-100 overflow-hidden">
      <div className={`p-4 border-b-2 border-gray-100 bg-gray-50/50`}>
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 ${theme.bgLight} rounded-lg flex items-center justify-center`}>
            <Icon className={`w-5 h-5 ${theme.text}`} />
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">{title}</h4>
            <p className="text-xs text-gray-500">{description}</p>
          </div>
        </div>
      </div>
      <div className="p-4">
        <RadioGroup
          onValueChange={onChange}
          value={value}
          className="grid grid-cols-2 gap-3"
        >
          {options.map((option) => (
            <div
              key={option.value}
              className={`
                relative flex items-center gap-3 p-3 rounded-lg border-2 transition-all cursor-pointer
                ${value === option.value 
                  ? `${theme.border} ${theme.bgLight}` 
                  : 'border-gray-200 hover:border-gray-300'}
              `}
            >
              <RadioGroupItem value={option.value} id={`${title}-${option.value}`} className={theme.text} />
              <Label htmlFor={`${title}-${option.value}`} className="text-sm font-medium cursor-pointer flex-1">
                {option.label}
              </Label>
              {value === option.value && (
                <CheckCircle2 className={`w-4 h-4 ${theme.text}`} />
              )}
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
};

// Composant pour la grille de niveaux
const LevelsGrid = ({ form, theme }) => {
  const programmationLevels = [
    { value: "debutant", label: "Débutant" },
    { value: "intermediaire1", label: "Intermédiaire 1" },
    { value: "intermediaire2", label: "Intermédiaire 2" },
    { value: "avance", label: "Avancé" },
  ];

  const excelLevels = [
    { value: "basique", label: "Basique" },
    { value: "intermediaire", label: "Intermédiaire" },
    { value: "avance", label: "Avancé" },
  ];

  const rLevels = [
    { value: "debutant", label: "Débutant" },
    { value: "intermediaire1", label: "Int 1" },
    { value: "intermediaire2", label: "Int 2" },
    { value: "avance", label: "Avancé" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <LevelCard
        title="Programmation"
        icon={Code}
        description="Votre niveau en programmation"
        value={form.watch("niveauProgrammation")}
        onChange={(value) => form.setValue("niveauProgrammation", value)}
        options={programmationLevels}
        theme={theme}
      />
      
      <LevelCard
        title="Excel"
        icon={PieChart}
        description="Maîtrise d'Excel"
        value={form.watch("niveauExcel")}
        onChange={(value) => form.setValue("niveauExcel", value)}
        options={excelLevels}
        theme={theme}
      />
      
      <LevelCard
        title="R (optionnel)"
        icon={TrendingUp}
        description="Programmation R"
        value={form.watch("niveauR")}
        onChange={(value) => form.setValue("niveauR", value)}
        options={rLevels}
        theme={theme}
        className="md:col-span-2"
      />
    </div>
  );
};

const MasterclassRegistrationForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState("infos");
  const [progress, setProgress] = useState(0);
  const [hoveredTab, setHoveredTab] = useState(null);
  const [currentTheme, setCurrentTheme] = useState<ThemeKey>("marketing");
  const [showThemePicker, setShowThemePicker] = useState(false);

  const theme = themes[currentTheme];

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nomPrenom: "",
      email: "",
      adresse: "",
      telephone: "",
      profession: "",
      statut: undefined,
      outils: [],
      autreOutil: "",
      autreOutilApprendre: "",
      niveauProgrammation: undefined,
      niveauExcel: undefined,
      niveauR: undefined,
      connaitShiny: undefined,
      experienceProvisionnement: undefined,
      attentes: "",
      participeEdition2: undefined,
    },
  });

  const outilsOptions = [
    { id: "vba", label: "VBA", icon: Database },
    { id: "langage_c", label: "C", icon: Cpu },
    { id: "r", label: "R", icon: PieChart },
    { id: "python", label: "Python", icon: Code },
    { id: "autre", label: "Autre", icon: Zap },
  ];

  const watchedOutils = form.watch("outils");
  const showAutreOutil = watchedOutils?.includes("autre");

  const calculateProgress = (data: Partial<FormData>) => {
    const requiredFields = [
      'nomPrenom', 'email', 'adresse', 'telephone', 'profession',
      'statut', 'outils', 'niveauProgrammation', 'niveauExcel', 'participeEdition2'
    ];
    
    let filled = 0;
    requiredFields.forEach(field => {
      if (field === 'outils') {
        if (data.outils && data.outils.length > 0) filled++;
      } else if (data[field as keyof FormData]) filled++;
    });
    
    return Math.min((filled / requiredFields.length) * 100, 100);
  };

  useEffect(() => {
    const subscription = form.watch((value) => {
      setProgress(calculateProgress(value));
    });
    return () => subscription.unsubscribe();
  }, [form.watch]);

  const onSubmit = (data: FormData) => {
    console.log("Données du formulaire:", data);
    setIsSubmitted(true);
  };

  const tabs = [
    { value: "infos", label: "Informations", icon: User, description: "Coordonnées personnelles" },
    { value: "competences", label: "Compétences", icon: Code, description: "Outils et technologies" },
    { value: "niveaux", label: "Expertise", icon: BarChart3, description: "Niveaux de maîtrise" },
    { value: "attentes", label: "Finalisation", icon: Target, description: "Projet et confirmation" },
  ];

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`min-h-screen bg-gradient-to-br ${theme.bgVeryLight} flex items-center justify-center p-4`}
      >
        {/* Particules de célébration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{ 
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                scale: 0 
              }}
              animate={{ 
                y: [null, -100],
                scale: [0, 1, 0],
                rotate: [0, 180, 360]
              }}
              transition={{ 
                duration: 2,
                delay: i * 0.1,
                repeat: Infinity,
                ease: "easeOut"
              }}
            >
              {i % 2 === 0 ? (
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              ) : (
                <Gem className={`w-4 h-4 ${theme.text}`} />
              )}
            </motion.div>
          ))}
        </div>

        <Card className="max-w-md w-full border-0 overflow-hidden relative">
          {/* Bande décorative */}
          <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${theme.from} ${theme.via} ${theme.to}`} />
          
          {/* Motif de fond */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, ${theme.primary} 1px, transparent 0)`,
              backgroundSize: '30px 30px'
            }} />
          </div>

          <CardContent className="relative p-8 text-center space-y-6">
            {/* Icône de succès */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className={`mx-auto w-20 h-20 bg-gradient-to-br ${theme.from} ${theme.to} rounded-2xl flex items-center justify-center`}
            >
              <Crown className="w-10 h-10 text-white" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className={`text-3xl font-bold bg-gradient-to-r ${theme.from} ${theme.to} bg-clip-text text-transparent`}>
                Félicitations !
              </h2>
              <p className="text-sm text-gray-600 mt-2">
                Votre candidature a été reçue avec succès
              </p>
            </motion.div>

            {/* Badge de confirmation */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: "spring" }}
              className={`inline-flex items-center gap-2 px-4 py-2 ${theme.bgLight} rounded-full border ${theme.border}`}
            >
              <BadgeCheck className={`w-4 h-4 ${theme.text}`} />
              <span className={`text-xs font-medium ${theme.text}`}>Inscription #MC2024-{Math.floor(Math.random() * 1000)}</span>
            </motion.div>

            {/* Timeline des prochaines étapes */}
            <div className={`bg-gradient-to-br from-gray-50 ${theme.bgVeryLight} rounded-xl p-5 space-y-3`}>
              <h3 className="text-xs font-semibold text-gray-700 flex items-center gap-2">
                <Rocket className={`w-4 h-4 ${theme.text}`} />
                Votre parcours en 3 étapes
              </h3>
              {[
                { time: "J+1", text: "Email de confirmation", icon: Mail, done: true },
                { time: "J+2", text: "Appel de validation", icon: Phone, done: false },
                { time: "J+3", text: "Programme personnalisé", icon: BookOpen, done: false },
              ].map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center
                    ${step.done ? 'bg-green-100' : 'bg-gray-100'}
                  `}>
                    <step.icon className={`w-4 h-4 ${step.done ? 'text-green-600' : 'text-gray-500'}`} />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-xs font-medium text-gray-900">{step.text}</p>
                    <p className="text-[10px] text-gray-500">{step.time}</p>
                  </div>
                  {step.done && (
                    <BadgeCheck className="w-4 h-4 text-green-500" />
                  )}
                </motion.div>
              ))}
            </div>

            {/* Boutons d'action */}
            <div className="flex gap-3 pt-2">
              <Button
                onClick={() => {
                  setIsSubmitted(false);
                  form.reset();
                  setActiveTab("infos");
                }}
                variant="outline"
                className={`flex-1 border-2 ${theme.border} ${theme.text} ${theme.bgHover} transition-all`}
              >
                <Users className="w-4 h-4 mr-2" />
                Nouveau
              </Button>
              <Button
                className={`flex-1 bg-gradient-to-r ${theme.from} ${theme.to} hover:${theme.from} hover:${theme.to} text-white transition-all`}
              >
                <Heart className="w-4 h-4 mr-2" />
                Suivre
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-500 relative overflow-hidden ${
      theme.bgVeryLight
    }`}>
      {/* Éléments de fond élégants */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Cercles flous */}
        <div className={`absolute top-0 -left-48 w-96 h-96 ${theme.bg} rounded-full blur-3xl opacity-5`} />
        <div className={`absolute bottom-0 -right-48 w-96 h-96 ${theme.bg} rounded-full blur-3xl opacity-5`} />
        
        {/* Motif de points */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, ${theme.primary} 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }} />
        
        {/* Lignes de force */}
        <svg className="absolute top-0 left-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={theme.primary} stopOpacity="0.1" />
              <stop offset="100%" stopColor={theme.primary} stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0,100 Q400,50 800,100 T1600,100" stroke="url(#grad1)" strokeWidth="2" fill="none" />
          <path d="M0,200 Q400,150 800,200 T1600,200" stroke="url(#grad1)" strokeWidth="2" fill="none" />
        </svg>
      </div>

      {/* Header premium */}
      <div className={`sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b ${theme.border}`}>
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo et titre */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4"
            >
              <div className="relative">
                <div className={`absolute inset-0 bg-gradient-to-r ${theme.from} ${theme.to} rounded-xl blur-lg opacity-50`} />
                <div className={`relative w-10 h-10 bg-gradient-to-br ${theme.from} ${theme.to} rounded-xl flex items-center justify-center`}>
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
              </div>
              <div>
                <h1 className={`text-lg font-bold bg-gradient-to-r ${theme.from} ${theme.to} bg-clip-text text-transparent`}>
                  Master Class R & Shiny
                </h1>
                <p className="text-xs text-gray-500 flex items-center gap-1">
                  <Gem className={`w-3 h-3 ${theme.text}`} />
                  2ème édition • Formation d'excellence
                </p>
              </div>
            </motion.div>

            {/* Indicateurs de progression premium */}
            <div className="flex items-center gap-6">
              {/* Progression circulaire */}
              <div className="relative w-10 h-10">
                <svg className="w-10 h-10 transform -rotate-90">
                  <circle
                    cx="20"
                    cy="20"
                    r="16"
                    stroke="#e5e7eb"
                    strokeWidth="3"
                    fill="none"
                  />
                  <circle
                    cx="20"
                    cy="20"
                    r="16"
                    stroke={theme.primary}
                    strokeWidth="3"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 16}`}
                    strokeDashoffset={`${2 * Math.PI * 16 * (1 - progress / 100)}`}
                    className="transition-all duration-500"
                  />
                </svg>
                <span className={`absolute inset-0 flex items-center justify-center text-xs font-bold ${theme.text}`}>
                  {Math.round(progress)}%
                </span>
              </div>

              {/* Badges de sections */}
              <div className="flex gap-2">
                {tabs.map((tab, i) => (
                  <motion.div
                    key={tab.value}
                    whileHover={{ y: -2 }}
                    onHoverStart={() => setHoveredTab(i)}
                    onHoverEnd={() => setHoveredTab(null)}
                    className={`
                      w-8 h-8 rounded-lg flex items-center justify-center transition-all cursor-pointer
                      ${activeTab === tab.value 
                        ? `bg-gradient-to-br ${theme.from} ${theme.to} text-white` 
                        : 'bg-gray-100 text-gray-500'
                      }
                    `}
                    onClick={() => setActiveTab(tab.value)}
                  >
                    <tab.icon className="w-4 h-4" />
                  </motion.div>
                ))}
              </div>

              {/* Sélecteur de thème */}
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowThemePicker(!showThemePicker)}
                  className={`p-2 rounded-lg ${theme.bgLight} ${theme.text} transition-all`}
                >
                  <Brush className="w-4 h-4" />
                </motion.button>

                <AnimatePresence>
                  {showThemePicker && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-2 p-2 bg-white rounded-xl border border-gray-100 z-50 grid grid-cols-5 gap-1 min-w-[200px]"
                    >
                      {(Object.keys(themes) as ThemeKey[]).map((key) => (
                        <motion.button
                          key={key}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => {
                            setCurrentTheme(key);
                            setShowThemePicker(false);
                          }}
                          className={`w-8 h-8 rounded-lg ${themes[key].bg} ${
                            currentTheme === key ? 'ring-2 ring-offset-2 ring-gray-400' : ''
                          }`}
                          title={themes[key].name}
                        />
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Tabs premium */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList className={`grid grid-cols-4 p-1 bg-white/80 backdrop-blur-sm border ${theme.border} rounded-2xl`}>
              {tabs.map((tab, index) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className={`
                    relative overflow-hidden text-sm py-3 transition-all duration-300
                    data-[state=active]:bg-gradient-to-r data-[state=active]:${theme.from} data-[state=active]:${theme.to}
                    data-[state=active]:text-white
                  `}
                >
                  {activeTab === tab.value && (
                    <motion.div
                      layoutId="activeTab"
                      className={`absolute inset-0 bg-gradient-to-r ${theme.from} ${theme.to}`}
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="relative flex items-center justify-center gap-2">
                    <tab.icon className="w-4 h-4" />
                    <span className="hidden md:inline">{tab.label}</span>
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>

            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="mt-4 border-0 bg-white/90 backdrop-blur-xl overflow-hidden">
                {/* Bande décorative supérieure */}
                <div className={`h-1 bg-gradient-to-r ${theme.from} ${theme.via} ${theme.to}`} />
                
                <CardContent className="p-8">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                      {/* Tab 1: Informations personnelles */}
                      <TabsContent value="infos" className="mt-0 space-y-6">
                        <SimpleSectionHeader
                          icon={User}
                          title="Informations personnelles"
                          subtitle="Vos coordonnées pour vous contacter"
                          theme={theme}
                        />

                        <div className="grid grid-cols-2 gap-6">
                          <ElegantField
                            form={form}
                            name="nomPrenom"
                            label="Nom et prénom"
                            placeholder="Jean Dupont"
                            icon={User}
                            theme={theme}
                          />
                          <ElegantField
                            form={form}
                            name="email"
                            label="Email professionnel"
                            type="email"
                            placeholder="jean.dupont@entreprise.com"
                            icon={Mail}
                            theme={theme}
                          />
                          <ElegantField
                            form={form}
                            name="telephone"
                            label="Téléphone"
                            placeholder="06 12 34 56 78"
                            icon={Phone}
                            theme={theme}
                          />
                          <ElegantField
                            form={form}
                            name="profession"
                            label="Profession"
                            placeholder="Actuaire, Data Scientist..."
                            icon={Briefcase}
                            theme={theme}
                          />
                          <ElegantField
                            form={form}
                            name="adresse"
                            label="Adresse"
                            placeholder="75001 Paris"
                            icon={MapPin}
                            className="col-span-2"
                            theme={theme}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="statut"
                          render={({ field }) => (
                            <FormItem className="mt-4">
                              <FormLabel className={`text-sm font-semibold text-gray-700 flex items-center gap-2`}>
                                <GraduationCap className={`w-4 h-4 ${theme.text}`} />
                                Statut actuel
                              </FormLabel>
                              <FormControl>
                                <RadioGroup
                                  onValueChange={field.onChange}
                                  value={field.value}
                                  className="grid grid-cols-2 gap-4 mt-2"
                                >
                                  <SimpleRadioOption
                                    value={field.value}
                                    id="etudiant"
                                    label="Étudiant"
                                    description="En formation initiale"
                                    icon={GraduationCap}
                                    selected={field.value}
                                    theme={theme}
                                  />
                                  <SimpleRadioOption
                                    value={field.value}
                                    id="professionnel"
                                    label="Professionnel"
                                    description="En activité"
                                    icon={Briefcase}
                                    selected={field.value}
                                    theme={theme}
                                  />
                                </RadioGroup>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </TabsContent>

                      {/* Tab 2: Compétences techniques */}
                      <TabsContent value="competences" className="mt-0 space-y-6">
                        <SimpleSectionHeader
                          icon={Code}
                          title="Compétences techniques"
                          subtitle="Votre stack technologique"
                          theme={theme}
                        />

                        <FormField
                          control={form.control}
                          name="outils"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-semibold text-gray-700 mb-3 block">
                                Outils et langages maîtrisés
                              </FormLabel>
                              <FormDescription className="text-xs mb-4">
                                Sélectionnez tous les outils que vous connaissez
                              </FormDescription>
                              <div className="grid grid-cols-3 gap-3">
                                {outilsOptions.map((outil, index) => (
                                  <SimpleSkillBadge
                                    key={outil.id}
                                    label={outil.label}
                                    icon={outil.icon}
                                    selected={field.value?.includes(outil.id)}
                                    onClick={() => {
                                      const newValue = field.value?.includes(outil.id)
                                        ? field.value.filter(v => v !== outil.id)
                                        : [...(field.value || []), outil.id];
                                      field.onChange(newValue);
                                    }}
                                  />
                                ))}
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <AnimatePresence>
                          {showAutreOutil && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="space-y-4 overflow-hidden mt-4"
                            >
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                    <Zap className="w-4 h-4 text-[hsl(345,70%,35%)]" />
                                    Outil que vous connaissez
                                  </Label>
                                  <Input
                                    placeholder="Ex: JavaScript, Java, etc."
                                    className="h-12 text-sm border-2 border-gray-200 focus:border-[hsl(345,70%,35%)] focus:ring-[hsl(345,70%,35%)]/20 transition-all bg-white"
                                    {...form.register("autreOutil")}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                    <LearningIcon className="w-4 h-4 text-[hsl(345,70%,35%)]" />
                                    Outil à apprendre
                                  </Label>
                                  <Input
                                    placeholder="Ex: Rust, Go, etc."
                                    className="h-12 text-sm border-2 border-gray-200 focus:border-[hsl(345,70%,35%)] focus:ring-[hsl(345,70%,35%)]/20 transition-all bg-white"
                                    {...form.register("autreOutilApprendre")}
                                  />
                                </div>
                              </div>
                              <p className="text-xs text-gray-500 italic flex items-center gap-1">
                                <Sparkles className="w-3 h-3 text-[hsl(345,70%,35%)]" />
                                Dites-nous ce que vous voulez apprendre pour personnaliser votre parcours
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </TabsContent>

                      {/* Tab 3: Niveaux d'expertise - NOUVELLE STRUCTURE */}
                      <TabsContent value="niveaux" className="mt-0 space-y-6">
                        <SimpleSectionHeader
                          icon={BarChart3}
                          title="Niveaux d'expertise"
                          subtitle="Évaluez votre maîtrise"
                          theme={theme}
                        />

                        <LevelsGrid form={form} theme={theme} />
                      </TabsContent>

                      {/* Tab 4: Attentes et finalisation */}
                      <TabsContent value="attentes" className="mt-0 space-y-6">
                        <SimpleSectionHeader
                          icon={Target}
                          title="Projet et confirmation"
                          subtitle="Finalisez votre inscription"
                          theme={theme}
                        />

                        <div className="space-y-6">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <h4 className="text-sm font-semibold text-gray-700 mb-2">Connaissance de Shiny</h4>
                              <FormField
                                control={form.control}
                                name="connaitShiny"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl>
                                      <RadioGroup
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        className="flex gap-4"
                                      >
                                        <div className="flex items-center gap-2">
                                          <RadioGroupItem value="OUI" id="shiny-oui" className={theme.text} />
                                          <Label htmlFor="shiny-oui" className="text-sm cursor-pointer">Oui</Label>
                                        </div>
                                        <div className="flex items-center gap-2">
                                          <RadioGroupItem value="NON" id="shiny-non" className={theme.text} />
                                          <Label htmlFor="shiny-non" className="text-sm cursor-pointer">Non</Label>
                                        </div>
                                      </RadioGroup>
                                    </FormControl>
                                  </FormItem>
                                )}
                              />
                            </div>

                            <div>
                              <h4 className="text-sm font-semibold text-gray-700 mb-2">Expérience provisionnement</h4>
                              <FormField
                                control={form.control}
                                name="experienceProvisionnement"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl>
                                      <RadioGroup
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        className="flex gap-4"
                                      >
                                        <div className="flex items-center gap-2">
                                          <RadioGroupItem value="OUI" id="prov-oui" className={theme.text} />
                                          <Label htmlFor="prov-oui" className="text-sm cursor-pointer">Oui</Label>
                                        </div>
                                        <div className="flex items-center gap-2">
                                          <RadioGroupItem value="NON" id="prov-non" className={theme.text} />
                                          <Label htmlFor="prov-non" className="text-sm cursor-pointer">Non</Label>
                                        </div>
                                      </RadioGroup>
                                    </FormControl>
                                  </FormItem>
                                )}
                              />
                            </div>
                          </div>

                          <div>
                            <h4 className="text-sm font-semibold text-gray-700 mb-2">Vos attentes</h4>
                            <FormField
                              control={form.control}
                              name="attentes"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Textarea
                                      placeholder="Décrivez ce que vous souhaitez apprendre ou accomplir..."
                                      className="min-h-[100px] text-sm border-2 border-gray-200 focus:border-[hsl(345,70%,35%)] focus:ring-[hsl(345,70%,35%)]/20 transition-all resize-none p-4 rounded-xl"
                                      {...field}
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </div>

                          <div>
                            <h4 className="text-sm font-semibold text-gray-700 mb-2">Participation à la 2ème édition *</h4>
                            <FormField
                              control={form.control}
                              name="participeEdition2"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <RadioGroup
                                      onValueChange={field.onChange}
                                      value={field.value}
                                      className="grid grid-cols-2 gap-4"
                                    >
                                      <SimpleRadioOption
                                        value={field.value}
                                        id="participe-oui"
                                        label="Oui, je participe !"
                                        description="Je réserve ma place"
                                        icon={Rocket}
                                        selected={field.value}
                                        theme={theme}
                                      />
                                      <SimpleRadioOption
                                        value={field.value}
                                        id="participe-non"
                                        label="Non, pas cette fois"
                                        description="Peut-être plus tard"
                                        icon={Clock}
                                        selected={field.value}
                                        theme={theme}
                                      />
                                    </RadioGroup>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      </TabsContent>

                      {/* Navigation et soumission */}
                      <div className="mt-8 pt-6 border-t border-gray-100">
                        <div className="flex items-center justify-between">
                          <div className="flex gap-3">
                            {activeTab !== "infos" && (
                              <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                  const currentIndex = tabs.findIndex(t => t.value === activeTab);
                                  setActiveTab(tabs[currentIndex - 1].value);
                                }}
                                className={`border-2 border-gray-200 ${theme.borderHover} ${theme.bgHover} transition-all`}
                              >
                                <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
                                Précédent
                              </Button>
                            )}
                            
                            {activeTab !== "attentes" && (
                              <Button
                                type="button"
                                onClick={() => {
                                  const currentIndex = tabs.findIndex(t => t.value === activeTab);
                                  setActiveTab(tabs[currentIndex + 1].value);
                                }}
                                className={`bg-gradient-to-r ${theme.from} ${theme.to} hover:${theme.from} hover:${theme.to} text-white transition-all`}
                              >
                                Suivant
                                <ArrowRight className="w-4 h-4 ml-2" />
                              </Button>
                            )}
                          </div>

                          {activeTab === "attentes" && (
                            <Button
                              type="submit"
                              disabled={progress < 80}
                              className={`
                                px-8 py-6 text-base font-semibold transition-all
                                ${progress >= 80
                                  ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white'
                                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                }
                              `}
                            >
                              {progress >= 80 ? (
                                <>
                                  <Crown className="w-5 h-5 mr-2" />
                                  Confirmer mon inscription
                                  <Sparkles className="w-4 h-4 ml-2" />
                                </>
                              ) : (
                                <>
                                  <Lock className="w-4 h-4 mr-2" />
                                  {Math.round(progress)}% - Complétez le formulaire
                                </>
                              )}
                            </Button>
                          )}
                        </div>

                        {/* Message de confidentialité élégant */}
                        <div className="mt-4 flex items-center justify-between text-[10px] text-gray-500">
                          <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                              <Shield className={`w-3 h-3 ${theme.text}`} />
                              Données confidentielles
                            </span>
                            <span className="flex items-center gap-1">
                              <Globe className={`w-3 h-3 ${theme.text}`} />
                              Chiffrement SSL
                            </span>
                            <span className="flex items-center gap-1">
                              <Lock className={`w-3 h-3 ${theme.text}`} />
                              RGPD
                            </span>
                          </div>
                          <span className={theme.text}>* Champs obligatoires</span>
                        </div>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </motion.div>
          </Tabs>

          {/* Récapitulatif élégant */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className={`mt-6 bg-white/80 backdrop-blur-sm rounded-2xl border ${theme.border} p-4`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 ${theme.bg} rounded-full animate-pulse`} />
                  <span className="text-xs font-medium text-gray-700">Récapitulatif</span>
                </div>
                
                <Separator orientation="vertical" className={`h-4 ${theme.bgLight}`} />
                
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1 text-xs">
                    <User className={`w-3.5 h-3.5 ${theme.text}`} />
                    {form.watch("nomPrenom") || "Non renseigné"}
                  </span>
                  <span className="flex items-center gap-1 text-xs">
                    <Code className={`w-3.5 h-3.5 ${theme.text}`} />
                    {form.watch("outils")?.length || 0} outils
                  </span>
                  <span className="flex items-center gap-1 text-xs">
                    <BarChart3 className={`w-3.5 h-3.5 ${theme.text}`} />
                    {form.watch("niveauProgrammation") ? "Niveau défini" : "À définir"}
                  </span>
                </div>
              </div>
              
              <Badge className={theme.badge}>
                {tabs.findIndex(t => t.value === activeTab) + 1}/4 étapes
              </Badge>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MasterclassRegistrationForm;