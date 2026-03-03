import { 
  Megaphone, 
  TrendingUp, 
  Cpu, 
  GraduationCap, 
  Building2, 
  Truck, 
  BarChart3, 
  Briefcase 
} from "lucide-react";

import bgImage from "@/assets/dmplus-tech.webp";
import ImgCom from "@/assets/dmplus-com.png";

export interface Subsidiary {
  id: string;
  name: string;
  shortName: string;
  slug: string;
  description: string;
  longDescription: string;
  services: string[];
  icon: typeof Megaphone;
  bgImage?: string;
  theme: string;
  colorClass: string;
  gradientClass: string;
  slogan: string;
}

export const subsidiaries: Subsidiary[] = [
  {
    id: "marketing",
    name: "DM+ Marketing & Communication",
    shortName: "Marketing",
    slug: "marketing",
    description: "Stratégies digitales et créatives pour amplifier votre marque",
    longDescription: "Notre expertise en marketing digital et stratégique vous accompagne dans la construction d'une identité de marque forte et mémorable. De la conception créative à l'exécution multicanale, nous transformons votre vision en impact mesurable.",
    services: [
      "Marketing digital & stratégique",
      "Branding & identité visuelle",
      "Publicité & relations publiques"
    ],
    icon: Megaphone,
    bgImage: ImgCom,
    theme: "theme-marketing",
    colorClass: "text-marketing",
    gradientClass: "from-marketing to-marketing-light",
    slogan: "Rendre visible, crédible et mémorable."
  },
  {
    id: "investment",
    name: "DM+ Investment",
    shortName: "Investment",
    slug: "investment",
    description: "Solutions financières stratégiques pour maximiser vos rendements",
    longDescription: "DM+ Investment combine expertise financière et vision stratégique pour optimiser la performance de vos actifs. Notre approche data-driven garantit des décisions d'investissement éclairées et des rendements durables.",
    services: [
      "Gestion de portefeuille",
      "Investissements stratégiques",
      "Conseil en fusion-acquisition"
    ],
    icon: TrendingUp,
    bgImage: bgImage,
    theme: "theme-investment",
    colorClass: "text-investment",
    gradientClass: "from-investment to-investment-light",
    slogan: "Investir avec stratégie, clarté et impact."
  },
  {
    id: "technologies",
    name: "DM+ Technologies",
    shortName: "Technologies",
    slug: "technologies",
    description: "Innovation technologique et transformation digitale sur mesure",
    longDescription: "À la pointe de l'innovation, DM+ Technologies développe des solutions logicielles sur mesure et intègre les dernières avancées en IA. Nous accompagnons votre transformation digitale de la conception au déploiement.",
    services: [
      "Développement logiciel sur mesure",
      "Solutions IA & Intégration",
      "Transformation digitale"
    ],
    icon: Cpu,
    bgImage: bgImage,
    theme: "theme-tech",
    colorClass: "text-tech",
    gradientClass: "from-tech to-tech-light",
    slogan: "Digitaliser pour mieux performer."
  },
  {
    id: "academy",
    name: "DM+ Academy",
    shortName: "Academy",
    slug: "academy",
    description: "Formation d'excellence pour développer les talents de demain",
    longDescription: "DM+ Academy propose des parcours de formation innovants, alliant expertise technique et développement des soft skills. Nos programmes certifiants préparent les professionnels aux défis du monde moderne.",
    services: [
      "Formations professionnelles",
      "Certifications spécialisées",
      "E-learning & workshops"
    ],
    icon: GraduationCap,
    bgImage: bgImage,
    theme: "theme-academy",
    colorClass: "text-academy",
    gradientClass: "from-academy to-academy-light",
    slogan: "Former pour transformer durablement"
  },
  {
    id: "Services",
    name: "DM+ Services",
    shortName: "Services",
    slug: "services",
    description: "Espaces d'innovation et d'incubation pour entrepreneurs visionnaires",
    longDescription: "DM+ Hubs crée des écosystèmes d'innovation où startups et entreprises établies collaborent. Nos espaces premium et notre accompagnement sur mesure catalysent la croissance et l'innovation.",
    services: [
      "Espaces de coworking premium",
      "Incubateurs de startups",
      "Centres d'innovation"
    ],
    icon: Building2,
    bgImage: bgImage,
    theme: "theme-hubs",
    colorClass: "text-hubs",
    gradientClass: "from-hubs to-hubs-light",
    slogan: "Externaliser l’essentiel pour accélérer la croissance."
  },
  {
    id: "distribution",
    name: "DM+ Distribution",
    shortName: "Distribution",
    slug: "distribution",
    description: "Solutions logistiques optimisées pour une supply chain performante",
    longDescription: "DM+ Distribution optimise vos flux logistiques à l'échelle mondiale. Notre expertise en supply chain management et nos partenariats stratégiques garantissent efficacité et fiabilité.",
    services: [
      "Supply chain optimisée",
      "Logistique internationale",
      "Gestion de réseaux de distribution"
    ],
    icon: Truck,
    bgImage: bgImage,
    theme: "theme-distribution",
    colorClass: "text-distribution",
    gradientClass: "from-distribution to-distribution-light",
    slogan: "Connecter les producteurs, fournisseurs et marchés."
  },
  {
    id: "analytics",
    name: "DM+ Analytics & Data",
    shortName: "Analytics",
    slug: "analytics",
    description: "Intelligence décisionnelle et exploitation avancée des données",
    longDescription: "DM+ Analytics & Data transforme vos données en insights stratégiques. Notre expertise en business intelligence et data science vous donne un avantage compétitif décisif.",
    services: [
      "Business intelligence",
      "Big data & data science",
      "Tableaux de bord personnalisés"
    ],
    icon: BarChart3,
    bgImage: bgImage,
    theme: "theme-analytics",
    colorClass: "text-analytics",
    gradientClass: "from-analytics to-analytics-light",
    slogan: "Décider mieux grâce à la donnée."
  }
];

export const getSubsidiaryBySlug = (slug: string): Subsidiary | undefined => {
  return subsidiaries.find(sub => sub.slug === slug);
};
