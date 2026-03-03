import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CheckCircle2, ArrowRight, Star, Zap, Shield, TrendingUp, 
  Users, Clock, Award, BookOpen, Target, Sparkles, Gift,
  Crown, Gem, Lock, Key, Heart, AlertCircle, ChevronRight, ArrowLeft
} from "lucide-react";

// Types pour les tunnels de vente
interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  features: string[];
  isUpdated?: boolean;
  updateVersion?: string;
  updateDate?: string;
  badge?: string;
  level: "débutant" | "intermédiaire" | "avancé";
  duration: string;
  students: number;
  rating: number;
}

interface FunnelStep {
  id: string;
  title: string;
  description: string;
  cta: string;
  discount?: number;
  urgency?: string;
  bonus?: string[];
}

// Données des produits pour les tunnels
const products: Product[] = [
  {
    id: "python-bootcamp",
    name: "Python Bootcamp Complet",
    price: 299,
    originalPrice: 599,
    description: "Devenez expert en Python avec ce bootcamp intensif",
    features: ["50+ heures de vidéo", "Projets pratiques", "Certificat", "Accès à vie"],
    isUpdated: true,
    updateVersion: "v3.2",
    updateDate: "2024-03-01",
    badge: "Nouveau contenu",
    level: "débutant",
    duration: "40h",
    students: 15420,
    rating: 4.8
  },
  {
    id: "data-science",
    name: "Data Science Pro",
    price: 499,
    originalPrice: 899,
    description: "Maîtrisez la science des données avec R et Python",
    features: ["Machine Learning", "Deep Learning", "Projets réels", "Mentorat"],
    isUpdated: true,
    updateVersion: "v2.5",
    updateDate: "2024-02-15",
    badge: "Mise à jour IA",
    level: "avancé",
    duration: "60h",
    students: 8750,
    rating: 4.9
  },
  {
    id: "web-dev",
    name: "Développeur Web Full-Stack",
    price: 399,
    originalPrice: 799,
    description: "Apprenez à créer des applications web modernes",
    features: ["React, Node.js", "MongoDB", "Projets client", "Portfolio"],
    isUpdated: false,
    level: "intermédiaire",
    duration: "45h",
    students: 12300,
    rating: 4.7
  },
  {
    id: "marketing-digital",
    name: "Marketing Digital 360°",
    price: 199,
    originalPrice: 399,
    description: "Stratégies marketing qui convertissent",
    features: ["SEO/SEA", "Social Media", "Emailing", "Analytics"],
    isUpdated: true,
    updateVersion: "v4.0",
    updateDate: "2024-03-10",
    badge: "Nouveaux outils 2024",
    level: "débutant",
    duration: "25h",
    students: 9800,
    rating: 4.6
  },
  {
    id: "blockchain",
    name: "Blockchain & Crypto",
    price: 599,
    originalPrice: 999,
    description: "Comprendre et construire des applications blockchain",
    features: ["Solidity", "Smart Contracts", "DeFi", "Web3"],
    isUpdated: false,
    level: "avancé",
    duration: "50h",
    students: 3200,
    rating: 4.8
  }
];

// Tunnel 1: Classique avec scarcity
const classicFunnel: FunnelStep[] = [
  {
    id: "step1",
    title: "Offre Spéciale Limitée",
    description: "Rejoignez des milliers d'étudiants et transformez votre carrière",
    cta: "Profiter de l'offre -50%",
    urgency: "Plus que 12 places disponibles",
    discount: 50,
    bonus: ["Guide PDF exclusif", "Webinaire mensuel", "Communauté privée"]
  },
  {
    id: "step2",
    title: "Dernière Chance",
    description: "L'offre expire dans 2 heures",
    cta: "S'inscrire maintenant",
    urgency: "⏰ Temps restant: 1h58min",
    bonus: ["Bonus supplémentaire: Templates premium"]
  }
];

// Tunnel 2: Premium avec valeur ajoutée
const premiumFunnel: FunnelStep[] = [
  {
    id: "step1",
    title: "Formation Premium",
    description: "Accès VIP avec mentorat personnalisé",
    cta: "Devenir membre VIP",
    bonus: ["Mentorat 1-to-1", "Sessions Q&A", "Projets personnalisés", "Certificat premium"]
  },
  {
    id: "step2",
    title: "Upgrade Exclusif",
    description: "Passez au niveau supérieur avec notre offre tout-inclus",
    cta: "Accéder à tout",
    urgency: "Places limitées pour le mentorat"
  }
];

// Tunnel 3: Gratuité puis montée en gamme
const freemiumFunnel: FunnelStep[] = [
  {
    id: "step1",
    title: "Commencez Gratuitement",
    description: "Accédez aux premiers modules sans engagement",
    cta: "Commencer gratuitement",
    bonus: ["5 leçons gratuites", "Quiz d'évaluation", "Certificat de base"]
  },
  {
    id: "step2",
    title: "Débloquez le Potentiel Complet",
    description: "Accédez à tous les modules et fonctionnalités avancées",
    cta: "Passer à la version complète",
    discount: 30,
    urgency: "Offre de lancement"
  }
];

// Tunnel 4: Urgence et social proof
const urgencyFunnel: FunnelStep[] = [
  {
    id: "step1",
    title: "Flash Sale 24H",
    description: "Prix le plus bas de l'année - jamais ne sera répété",
    cta: "Acheter maintenant",
    urgency: "⚡ Se termine dans 23h45min",
    discount: 75,
    bonus: ["Pack de ressources", "Mise à jour gratuite à vie"]
  },
  {
    id: "step2",
    title: "Derniers Instants",
    description: "Plus que quelques places à ce prix",
    cta: "Sécuriser ma place",
    urgency: "🔥 Plus que 5 places !"
  }
];

// Tunnel 5: Communauté et transformation
const communityFunnel: FunnelStep[] = [
  {
    id: "step1",
    title: "Rejoignez Notre Communauté",
    description: "Apprenez avec des experts et des passionnés",
    cta: "Rejoindre la communauté",
    bonus: ["Accès communauté", "Live sessions", "Projets collaboratifs"]
  },
  {
    id: "step2",
    title: "Devenez un Expert",
    description: "Le chemin complet vers la maîtrise",
    cta: "Commencer ma transformation",
    urgency: "Prochaine session: Lundi"
  }
];

const funnels = [
  { id: "classic", name: "Classique Scarcity", steps: classicFunnel, color: "blue" },
  { id: "premium", name: "Premium VIP", steps: premiumFunnel, color: "purple" },
  { id: "freemium", name: "Freemium", steps: freemiumFunnel, color: "green" },
  { id: "urgency", name: "Flash Sale", steps: urgencyFunnel, color: "red" },
  { id: "community", name: "Communauté", steps: communityFunnel, color: "orange" }
];

interface SalesFunnelExamplesProps {
  onBack?: () => void;
}

const SalesFunnelExamples = ({ onBack }: SalesFunnelExamplesProps) => {
  const navigate = useNavigate();
  const [selectedFunnel, setSelectedFunnel] = useState(funnels[0]);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(products[0]);

  const getThemeColors = (color: string) => {
    const themes = {
      blue: {
        primary: "bg-blue-600",
        primaryLight: "bg-blue-50",
        text: "text-blue-600",
        border: "border-blue-200",
        gradient: "from-blue-600 to-blue-500"
      },
      purple: {
        primary: "bg-purple-600",
        primaryLight: "bg-purple-50",
        text: "text-purple-600",
        border: "border-purple-200",
        gradient: "from-purple-600 to-purple-500"
      },
      green: {
        primary: "bg-green-600",
        primaryLight: "bg-green-50",
        text: "text-green-600",
        border: "border-green-200",
        gradient: "from-green-600 to-green-500"
      },
      red: {
        primary: "bg-[hsl(345_70%_35%)]",
        primaryLight: "bg-[hsl(345_75%_95%)]",
        text: "text-[hsl(345_70%_35%)]",
        border: "border-[hsl(345_70%_35%)]",
        gradient: "from-[hsl(345_70%_35%)] to-[hsl(345_75%_50%)]"
      },
      orange: {
        primary: "bg-orange-600",
        primaryLight: "bg-orange-50",
        text: "text-orange-600",
        border: "border-orange-200",
        gradient: "from-orange-600 to-orange-500"
      }
    };
    return themes[color as keyof typeof themes] || themes.blue;
  };

  const theme = getThemeColors(selectedFunnel.color);

  const ProductCard = ({ product }: { product: Product }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow"
    >
      {/* Badge de mise à jour */}
      {product.isUpdated && (
        <div className="flex items-center gap-2 mb-4">
          <div className={`px-3 py-1 ${theme.primaryLight} ${theme.text} rounded-full text-xs font-medium flex items-center gap-1`}>
            <Sparkles className="w-3 h-3" />
            Produit à jour - {product.updateVersion}
          </div>
          <div className="text-xs text-gray-500">
            Mis à jour le {new Date(product.updateDate!).toLocaleDateString('fr-FR')}
          </div>
        </div>
      )}

      <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
      <p className="text-gray-600 mb-4">{product.description}</p>

      {/* Prix */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-3xl font-bold text-gray-900">{product.price} FCFA</span>
        {product.originalPrice && (
          <span className="text-lg text-gray-400 line-through">{product.originalPrice} FCFA</span>
        )}
        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
          -{Math.round((1 - product.price / product.originalPrice!) * 100)}%
        </span>
      </div>

      {/* Métriques */}
      <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <Users className="w-4 h-4" />
          <span>{product.students.toLocaleString()} étudiants</span>
        </div>
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 text-yellow-500" />
          <span>{product.rating}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          <span>{product.duration}</span>
        </div>
      </div>

      {/* Features */}
      <div className="space-y-2 mb-4">
        {product.features.map((feature, index) => (
          <div key={index} className="flex items-center gap-2 text-sm text-gray-700">
            <CheckCircle2 className="w-4 h-4 text-green-500" />
            <span>{feature}</span>
          </div>
        ))}
      </div>

      {/* Badge niveau */}
      <div className="flex items-center justify-between">
        <span className={`px-3 py-1 ${theme.primaryLight} ${theme.text} rounded-full text-xs font-medium`}>
          Niveau {product.level}
        </span>
        <button
          onClick={() => setSelectedProduct(product)}
          className={`px-4 py-2 ${theme.primary} text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity`}
        >
          Voir le tunnel
        </button>
      </div>
    </motion.div>
  );

  const FunnelStep = ({ step, isLast }: { step: FunnelStep; isLast: boolean }) => (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white rounded-xl border-2 border-gray-200 p-6 shadow-lg max-w-2xl mx-auto"
    >
      {/* Header compact */}
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{step.title}</h2>
        <p className="text-gray-600">{step.description}</p>
      </div>

      {/* Contenu principal en grille compacte */}
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        {/* Produit sélectionné - carte compacte */}
        <div className={`p-4 ${theme.primaryLight} rounded-lg`}>
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-gray-900 text-sm">{selectedProduct.name}</h3>
            <span className={`px-2 py-1 ${theme.primary} text-white rounded text-xs font-medium`}>
              -{Math.round((1 - selectedProduct.price / selectedProduct.originalPrice!) * 100)}%
            </span>
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-xl font-bold text-gray-900">{selectedProduct.price} FCFA</span>
            <span className="text-sm text-gray-400 line-through">{selectedProduct.originalPrice} FCFA</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-gray-600">
            <div className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              <span>{(selectedProduct.students / 1000).toFixed(1)}k</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 text-yellow-500" />
              <span>{selectedProduct.rating}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{selectedProduct.duration}</span>
            </div>
          </div>
        </div>

        {/* Bonus et Urgence combinés */}
        <div className="space-y-3">
          {/* Bonus compact */}
          {step.bonus && (
            <div className="p-3 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2 text-sm">
                <Gift className="w-4 h-4 text-yellow-500" />
                Bonus inclus
              </h4>
              <div className="space-y-1">
                {step.bonus.map((bonus, index) => (
                  <div key={index} className="flex items-center gap-2 text-xs text-gray-700">
                    <CheckCircle2 className="w-3 h-3 text-green-500 flex-shrink-0" />
                    <span className="truncate">{bonus}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Urgence compacte */}
          {step.urgency && (
            <div className={`p-3 ${theme.primaryLight} rounded-lg flex items-center gap-2`}>
              <AlertCircle className={`w-4 h-4 ${theme.text} flex-shrink-0`} />
              <span className={`text-sm font-medium ${theme.text}`}>{step.urgency}</span>
            </div>
          )}
        </div>
      </div>

      {/* CTA compact */}
      <button
        className={`w-full py-3 bg-gradient-to-r ${theme.gradient} text-white rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2`}
        onClick={() => !isLast && setCurrentStep(currentStep + 1)}
      >
        {step.cta}
        <ArrowRight className="w-4 h-4" />
      </button>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-7xl">
              </div>
    </div>
  );
};

export default SalesFunnelExamples;
