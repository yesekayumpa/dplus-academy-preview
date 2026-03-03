import { useState, useMemo } from "react";
import { Search, Filter, Calendar, Clock, Users, Play, FileText } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MasterclassRegistrationForm from "@/components/MasterclassRegistrationForm";

// Données des masterclass (exemple)
const masterclassData = [
  {
    id: 1,
    title: "Introduction à l'Investissement ESG",
    instructor: "Dr. Marie Dubois",
    date: "2024-03-15",
    time: "14:00",
    duration: "2h",
    status: "upcoming",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    videoId: "dQw4w9WgXcQ",
    description: "Découvrez les principes de l'investissement durable et son impact sur la finance moderne.",
    participants: 245,
    category: "Finance"
  },
  {
    id: 2,
    title: "Automatisation des Tâches avec Python",
    instructor: "Thomas Martin",
    date: "2024-03-20",
    time: "10:00",
    duration: "3h",
    status: "upcoming",
    thumbnail: "https://img.youtube.com/vi/8DvywoYvHgw/maxresdefault.jpg",
    videoId: "8DvywoYvHgw",
    description: "Apprenez à automatiser vos tâches quotidiennes avec des scripts Python efficaces.",
    participants: 189,
    category: "Outils Digitaux"
  },
  {
    id: 3,
    title: "Data Visualization avec Tableau",
    instructor: "Sophie Laurent",
    date: "2024-02-28",
    time: "15:00",
    duration: "2h30",
    status: "past",
    thumbnail: "https://img.youtube.com/vi/hHW1oY26k3I/maxresdefault.jpg",
    videoId: "hHW1oY26k3I",
    description: "Créez des dashboards interactifs et des visualisations de données percutantes.",
    participants: 312,
    category: "Data"
  },
  {
    id: 4,
    title: "Business Plan pour Startups",
    instructor: "Jean-Pierre Rousseau",
    date: "2024-02-15",
    time: "09:00",
    duration: "4h",
    status: "past",
    thumbnail: "https://img.youtube.com/vi/n7zHqO62E2s/maxresdefault.jpg",
    videoId: "n7zHqO62E2s",
    description: "Élaborez un business plan convaincant pour financer votre projet entrepreneurial.",
    participants: 156,
    category: "Entrepreneuriat"
  },
  {
    id: 5,
    title: "Leadership et Intelligence Émotionnelle",
    instructor: "Dr. Marie Dubois",
    date: "2024-03-25",
    time: "14:00",
    duration: "2h",
    status: "upcoming",
    thumbnail: "https://img.youtube.com/vi/7NqwuwjgJXc/maxresdefault.jpg",
    videoId: "7NqwuwjgJXc",
    description: "Développez votre leadership grâce à une meilleure compréhension des émotions.",
    participants: 98,
    category: "Soft Skills"
  },
  {
    id: 6,
    title: "Machine Learning pour Débutants",
    instructor: "Sophie Laurent",
    date: "2024-03-10",
    time: "11:00",
    duration: "3h",
    status: "upcoming",
    thumbnail: "https://img.youtube.com/vi/i_HQfBhjbIc/maxresdefault.jpg",
    videoId: "i_HQfBhjbIc",
    description: "Une introduction complète au machine learning et à ses applications pratiques.",
    participants: 423,
    category: "Data"
  }
];

const MasterclassPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "upcoming" | "past">("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Extraire les catégories uniques
  const categories = useMemo(() => {
    const cats = [...new Set(masterclassData.map(mc => mc.category))];
    return ["all", ...cats];
  }, []);

  // Filtrer les masterclass
  const filteredMasterclass = useMemo(() => {
    return masterclassData.filter(mc => {
      const matchesSearch = mc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           mc.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           mc.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = filterStatus === "all" || mc.status === filterStatus;
      const matchesCategory = selectedCategory === "all" || mc.category === selectedCategory;
      
      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [searchTerm, filterStatus, selectedCategory]);

  // Formater la date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-academy to-academy-light text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Master Class R & Shiny pour Actuaire
          </h1>
          <p className="text-xl text-white/80 max-w-2xl">
            2ème Édition - Rejoignez notre formation intensive sur R et Shiny dédiée aux actuaires
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Aperçu des Masterclass
            </TabsTrigger>
            <TabsTrigger value="registration" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Inscription
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            {/* Filtres et recherche */}
            <div className="flex flex-col lg:flex-row gap-4 mb-8">
              {/* Barre de recherche */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <input
                  type="text"
                  placeholder="Rechercher une masterclass..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-academy focus:border-transparent"
                />
              </div>

              {/* Filtre de statut */}
              <div className="flex gap-2">
                <button
                  onClick={() => setFilterStatus("all")}
                  className={`px-4 py-3 rounded-lg font-medium transition-colors ${
                    filterStatus === "all" 
                      ? "bg-academy text-white" 
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  Toutes
                </button>
                <button
                  onClick={() => setFilterStatus("upcoming")}
                  className={`px-4 py-3 rounded-lg font-medium transition-colors ${
                    filterStatus === "upcoming" 
                      ? "bg-academy text-white" 
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  À venir
                </button>
                <button
                  onClick={() => setFilterStatus("past")}
                  className={`px-4 py-3 rounded-lg font-medium transition-colors ${
                    filterStatus === "past" 
                      ? "bg-academy text-white" 
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  Passées
                </button>
              </div>

              {/* Filtre de catégorie */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-academy focus:border-transparent bg-background"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat === "all" ? "Toutes les catégories" : cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Résultats */}
            <div className="mb-4">
              <p className="text-muted-foreground">
                {filteredMasterclass.length} masterclass{filteredMasterclass.length > 1 ? 's' : ''} trouvé{filteredMasterclass.length > 1 ? 's' : ''}
              </p>
            </div>

            {/* Grid des masterclass */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMasterclass.map((masterclass) => (
                <motion.div
                  key={masterclass.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="group cursor-pointer"
                >
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                    {/* Thumbnail YouTube */}
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={masterclass.thumbnail}
                        alt={masterclass.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      
                      {/* Bouton play */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <Play className="w-6 h-6 text-white ml-1" />
                        </div>
                      </div>

                      {/* Badge de statut */}
                      <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${
                        masterclass.status === "upcoming" 
                          ? "bg-green-500 text-white" 
                          : "bg-gray-500 text-white"
                      }`}>
                        {masterclass.status === "upcoming" ? "À venir" : "Passée"}
                      </div>
                    </div>

                    {/* Contenu */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                        {masterclass.title}
                      </h3>
                      
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                        {masterclass.description}
                      </p>

                      {/* Infos */}
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(masterclass.date)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{masterclass.time} • {masterclass.duration}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          <span>{masterclass.participants} participants</span>
                        </div>
                      </div>

                      {/* Instructeur et catégorie */}
                      <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{masterclass.instructor}</p>
                          <p className="text-xs text-muted-foreground">{masterclass.category}</p>
                        </div>
                        <button className="px-4 py-2 bg-academy text-white rounded-lg text-sm font-medium hover:bg-academy/90 transition-colors">
                          {masterclass.status === "upcoming" ? "S'inscrire" : "Voir la replay"}
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Message si aucun résultat */}
            {filteredMasterclass.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  Aucune masterclass trouvée pour votre recherche.
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="registration">
            <MasterclassRegistrationForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MasterclassPage;
