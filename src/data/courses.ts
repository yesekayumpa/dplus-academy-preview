import { 
  BookOpen, 
  Code, 
  BarChart3, 
  Cpu, 
  TrendingUp, 
  Database,
  Palette,
  Shield,
  Users,
  Clock,
  Star,
  Award,
  CheckCircle
} from "lucide-react";

export interface Course {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  category: string;
  level: "débutant" | "intermédiaire" | "avancé";
  duration: string;
  price: number;
  rating: number;
  reviews: number;
  students: number;
  instructor: string;
  instructorTitle: string;
  image: string;
  tags: string[];
  objectives: string[];
  prerequisites: string[];
  isUpdated: boolean;
  lastUpdateDate: string;
  status: "disponible" | "réservation" | "achat" | "coach";
  icon: typeof BookOpen;
  features: string[];
  schedule?: string;
  nextSession?: string;
}

export const popularCourses: Course[] = [
  {
    id: "r-shiny-masterclass",
    title: "R & Shiny Masterclass",
    description: "Devenez expert en applications web interactives avec R et Shiny",
    longDescription: "Formation complète pour maîtriser le développement d'applications web interactives avec R et Shiny. Apprenez à créer des dashboards professionnels et des outils d'analyse de données.",
    category: "Data Science",
    level: "intermédiaire",
    duration: "40 heures",
    price: 787152, // 1200€ * 655,96
    rating: 4.8,
    reviews: 127,
    students: 450,
    instructor: "Dr. Marie Dubois",
    instructorTitle: "Data Scientist Senior",
    image: "/assets/r-shiny-course.jpg",
    tags: ["R", "Shiny", "Data Visualization", "Web Apps"],
    objectives: [
      "Créer des applications web interactives",
      "Développer des dashboards professionnels",
      "Maîtriser les reactive expressions",
      "Déployer des applications Shiny"
    ],
    prerequisites: ["Base en R", "Notions de programmation"],
    isUpdated: true,
    lastUpdateDate: "2024-03-15",
    status: "disponible",
    icon: BarChart3,
    features: [
      "Accès lifetime",
      "Projets pratiques",
      "Certification",
      "Support communautaire"
    ],
    schedule: "Lundi & Mercredi 18h-20h",
    nextSession: "2024-04-01"
  },
  {
    id: "python-data-science",
    title: "Python pour Data Science",
    description: "Maîtrisez Python pour l'analyse de données et le machine learning",
    longDescription: "Formation intensive sur l'écosystème Python pour la data science. Couvre pandas, numpy, matplotlib, scikit-learn et les meilleures pratiques.",
    category: "Data Science",
    level: "débutant",
    duration: "60 heures",
    price: 983940, // 1500€ * 655,96
    rating: 4.9,
    reviews: 203,
    students: 680,
    instructor: "Jean-Marc Martin",
    instructorTitle: "ML Engineer",
    image: "/assets/python-data-science.jpg",
    tags: ["Python", "Pandas", "Machine Learning", "NumPy"],
    objectives: [
      "Manipuler des données avec pandas",
      "Créer des visualisations avec matplotlib",
      "Appliquer les algorithmes de ML",
      "Réaliser des projets de data science"
    ],
    prerequisites: ["Logique de programmation", "Mathématiques de base"],
    isUpdated: true,
    lastUpdateDate: "2024-03-10",
    status: "réservation",
    icon: Code,
    features: [
      "12 projets pratiques",
      "Mentorat individuel",
      "Certification professionnelle",
      "Accès aux ressources"
    ],
    schedule: "Flexible",
    nextSession: "2024-04-15"
  },
  {
    id: "excel-avancé",
    title: "Excel Avancé & VBA",
    description: "Optimisez votre productivité avec les fonctions avancées d'Excel et VBA",
    longDescription: "Formation complète pour maîtriser Excel à un niveau expert. Apprenez les fonctions complexes, Power Query, Power Pivot et la programmation VBA.",
    category: "Bureautique",
    level: "intermédiaire",
    duration: "30 heures",
    price: 524768, // 800€ * 655,96
    rating: 4.7,
    reviews: 89,
    students: 320,
    instructor: "Sophie Laurent",
    instructorTitle: "Expert Excel",
    image: "/assets/excel-avance.jpg",
    tags: ["Excel", "VBA", "Power Query", "Automatisation"],
    objectives: [
      "Maîtriser les fonctions complexes",
      "Automatiser avec VBA",
      "Utiliser Power Query et Power Pivot",
      "Créer des tableaux de bord dynamiques"
    ],
    prerequisites: ["Excel intermédiaire"],
    isUpdated: false,
    lastUpdateDate: "2023-11-20",
    status: "achat",
    icon: Database,
    features: [
      "Exercices pratiques",
      "Templates inclus",
      "Support par email",
      "Certificat de completion"
    ]
  },
  {
    id: "web-design-react",
    title: "Web Design avec React",
    description: "Créez des interfaces web modernes et réactives avec React",
    longDescription: "Formation complète sur React et son écosystème. Apprenez à créer des applications web modernes avec hooks, routing et gestion d'état.",
    category: "Développement Web",
    level: "intermédiaire",
    duration: "50 heures",
    price: 852748, // 1300€ * 655,96
    rating: 4.8,
    reviews: 156,
    students: 410,
    instructor: "Thomas Bernard",
    instructorTitle: "Full Stack Developer",
    image: "/assets/react-web-design.jpg",
    tags: ["React", "JavaScript", "CSS", "Web Design"],
    objectives: [
      "Maîtriser React et ses hooks",
      "Créer des composants réutilisables",
      "Gérer l'état et le routing",
      "Déployer des applications React"
    ],
    prerequisites: ["HTML/CSS", "JavaScript de base"],
    isUpdated: true,
    lastUpdateDate: "2024-03-01",
    status: "coach",
    icon: Palette,
    features: [
      "Accompagnement personnalisé",
      "Projets réels",
      "Code review",
      "Sessions de coaching"
    ],
    schedule: "2x par semaine",
    nextSession: "2024-04-08"
  },
  {
    id: "business-intelligence",
    title: "Business Intelligence & Tableaux de Bord",
    description: "Transformez les données en décisions stratégiques avec Power BI et Tableau",
    longDescription: "Formation spécialisée en Business Intelligence. Apprenez à créer des tableaux de bord interactifs et des rapports analytiques.",
    category: "Business Intelligence",
    level: "avancé",
    duration: "45 heures",
    price: 721556, // 1100€ * 655,96
    rating: 4.6,
    reviews: 94,
    students: 280,
    instructor: "Claire Petit",
    instructorTitle: "BI Consultant",
    image: "/assets/bi-dashboard.jpg",
    tags: ["Power BI", "Tableau", "Data Analysis", "KPIs"],
    objectives: [
      "Maîtriser Power BI et Tableau",
      "Créer des dashboards interactifs",
      "Analyser les données métier",
      "Présenter des insights stratégiques"
    ],
    prerequisites: ["Excel avancé", "Notions de données"],
    isUpdated: true,
    lastUpdateDate: "2024-02-28",
    status: "disponible",
    icon: TrendingUp,
    features: [
      "Cas d'usage réels",
      "Certification Power BI",
      "Support continu",
      "Ressources téléchargeables"
    ]
  },
  {
    id: "cybersecurity-fundamentals",
    title: "Cybersécurité Fondamentale",
    description: "Protégez les systèmes et les données contre les menaces numériques",
    longDescription: "Introduction complète à la cybersécurité. Couvre les menaces, les vulnérabilités, les meilleures pratiques et les outils de protection.",
    category: "Cybersécurité",
    level: "débutant",
    duration: "35 heures",
    price: 590364, // 900€ * 655,96
    rating: 4.7,
    reviews: 112,
    students: 390,
    instructor: "Marc Rousseau",
    instructorTitle: "Security Analyst",
    image: "/assets/cybersecurity.jpg",
    tags: ["Sécurité", "Réseaux", "Cryptographie", "Best Practices"],
    objectives: [
      "Comprendre les menaces cybersécurité",
      "Mettre en place des protections",
      "Analyser les vulnérabilités",
      "Appliquer les meilleures pratiques"
    ],
    prerequisites: ["Base en informatique"],
    isUpdated: false,
    lastUpdateDate: "2023-12-15",
    status: "réservation",
    icon: Shield,
    features: [
      "Labs pratiques",
      "Scénarios réels",
      "Certification incluse",
      "Mises à jour régulières"
    ],
    schedule: "Flexible",
    nextSession: "2024-04-20"
  }
];

export const getCourseById = (id: string): Course | undefined => {
  return popularCourses.find(course => course.id === id);
};

export const getCoursesByCategory = (category: string): Course[] => {
  return popularCourses.filter(course => course.category === category);
};

export const getCoursesByStatus = (status: Course['status']): Course[] => {
  return popularCourses.filter(course => course.status === status);
};

export const getUpdatedCourses = (): Course[] => {
  return popularCourses.filter(course => course.isUpdated);
};
