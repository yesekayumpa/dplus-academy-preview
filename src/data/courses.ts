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
  status: "disponible" | "réservation" | "achat" | "coach" | "bientôt_disponible";
  icon: typeof BookOpen;
  features: string[];
  schedule?: string;
  nextSession?: string;
  availableDate?: string; // Nouveau champ pour la date de disponibilité
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
    price: 787152, // 1200 FCFA * 655,96
    rating: 4.8,
    reviews: 127,
    students: 450,
    instructor: "Dr. Marie Dubois",
    instructorTitle: "Data Scientist Senior",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop&crop=center",
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
    price: 983940, // 1500 FCFA * 655,96
    rating: 4.9,
    reviews: 203,
    students: 680,
    instructor: "Jean-Marc Martin",
    instructorTitle: "ML Engineer",
    image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=300&fit=crop&crop=center",
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
    price: 524768, // 800 FCFA * 655,96
    rating: 4.7,
    reviews: 89,
    students: 320,
    instructor: "Sophie Laurent",
    instructorTitle: "Expert Excel",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop&crop=center",
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
    price: 852748, // 1300 FCFA * 655,96
    rating: 4.8,
    reviews: 156,
    students: 410,
    instructor: "Thomas Bernard",
    instructorTitle: "Full Stack Developer",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop&crop=center",
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
    price: 721556, // 1100 FCFA * 655,96
    rating: 4.6,
    reviews: 94,
    students: 280,
    instructor: "Claire Petit",
    instructorTitle: "BI Consultant",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop&crop=center",
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
    price: 590364, // 900 FCFA * 655,96
    rating: 4.7,
    reviews: 112,
    students: 390,
    instructor: "Marc Rousseau",
    instructorTitle: "Security Analyst",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop&crop=center",
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
  },
  {
    id: "blockchain-development",
    title: "Développement Blockchain & Web3",
    description: "Maîtrisez la création d'applications décentralisées et smart contracts",
    longDescription: "Formation complète sur l'écosystème blockchain. Apprenez à développer des DApps, créer des smart contracts et comprendre les fondements de la Web3.",
    category: "Technologies Émergentes",
    level: "avancé",
    duration: "60 heures",
    price: 1319920, // 2000 FCFA * 655,96
    rating: 4.9,
    reviews: 45,
    students: 120,
    instructor: "Dr. Alexandre Kofi",
    instructorTitle: "Blockchain Architect",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=300&fit=crop&crop=center",
    tags: ["Blockchain", "Ethereum", "Smart Contracts", "Web3"],
    objectives: [
      "Développer des smart contracts",
      "Créer des DApps complètes",
      "Comprendre les mécanismes de consensus",
      "Déployer sur différentes blockchains"
    ],
    prerequisites: ["JavaScript avancé", "Concepts de programmation distribuée"],
    isUpdated: false,
    lastUpdateDate: "2024-03-01",
    status: "bientôt_disponible",
    icon: Shield,
    features: [
      "Projets blockchain réels",
      "Accès aux testnets",
      "Certification Blockchain",
      "Support expert"
    ],
    schedule: "3x par semaine",
    nextSession: "2024-05-15",
    availableDate: "2024-05-15"
  },
  {
    id: "ai-machine-learning",
    title: "Intelligence Artificielle & Machine Learning",
    description: "Devenez expert en IA et développez des modèles de machine learning",
    longDescription: "Formation intensive sur l'intelligence artificielle moderne. Couvre le deep learning, les réseaux de neurones, NLP et les applications pratiques de l'IA.",
    category: "Intelligence Artificielle",
    level: "avancé",
    duration: "80 heures",
    price: 1649900, // 2500 FCFA * 655,96
    rating: 4.8,
    reviews: 89,
    students: 280,
    instructor: "Dr. Marie Claire",
    instructorTitle: "AI Research Scientist",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&h=300&fit=crop&crop=center",
    tags: ["Machine Learning", "Deep Learning", "Neural Networks", "NLP"],
    objectives: [
      "Maîtriser les algorithmes de ML",
      "Développer des réseaux de neurones",
      "Appliquer le NLP",
      "Déployer des modèles IA"
    ],
    prerequisites: ["Python avancé", "Mathématiques", "Statistiques"],
    isUpdated: false,
    lastUpdateDate: "2024-03-05",
    status: "bientôt_disponible",
    icon: Cpu,
    features: [
      "GPU Cloud access",
      "Projets IA réels",
      "Certification ML Engineer",
      "Mentorat par experts"
    ],
    schedule: "2x par semaine",
    nextSession: "2024-06-01",
    availableDate: "2024-06-01"
  },
  {
    id: "cybersecurity-advanced",
    title: "Cybersécurité Avancée & Ethical Hacking",
    description: "Devenez expert en sécurité informatique et tests d'intrusion",
    longDescription: "Formation spécialisée en cybersécurité avancée. Apprenez les techniques de pentesting, l'analyse de vulnérabilités et la protection des systèmes critiques.",
    category: "Cybersécurité",
    level: "avancé",
    duration: "70 heures",
    price: 1319920, // 2000 FCFA * 655,96
    rating: 4.9,
    reviews: 67,
    students: 195,
    instructor: "Jean-Pierre Ndiaye",
    instructorTitle: "Cybersecurity Expert",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop&crop=center",
    tags: ["Pentesting", "Sécurité Réseau", "Cryptographie", "Forensics"],
    objectives: [
      "Effectuer des tests d'intrusion",
      "Analyser les vulnérabilités",
      "Mettre en place des défenses",
      "Gérer les incidents de sécurité"
    ],
    prerequisites: ["Réseaux", "Linux", "Scripting"],
    isUpdated: false,
    lastUpdateDate: "2024-03-10",
    status: "bientôt_disponible",
    icon: Shield,
    features: [
      "Lab virtuels sécurisés",
      "Scénarios d'attaque réels",
      "Certification CEH",
      "Accès outils professionnels"
    ],
    schedule: "Flexible",
    nextSession: "2024-05-20",
    availableDate: "2024-05-20"
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
