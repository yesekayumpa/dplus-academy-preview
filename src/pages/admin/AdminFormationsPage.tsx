import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Plus, Edit, Trash2, MoreHorizontal, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formationsService } from "@/services/formations.service";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";

// Fonction utilitaire pour le style des statuts
const getStatusBadge = (statut: string) => {
  switch (statut) {
    case 'EN_COURS':
      return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 border border-emerald-200">En cours</span>;
    case 'A_VENIR':
      return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">À venir</span>;
    case 'TERMINE':
      return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">Terminé</span>;
    case 'REPLAY':
      return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">Replay</span>;
    default:
      return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">{statut}</span>;
  }
};

const AdminFormationsPage = () => {
  const { data: formations, isLoading, isError } = useQuery({
    queryKey: ['admin-formations'],
    queryFn: formationsService.getFormations,
  });

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 font-montserrat">
            Formations
          </h1>
          <p className="text-slate-500 mt-1.5 text-sm">
            Gérez votre catalogue de formations, planifiez des sessions et suivez les inscriptions.
          </p>
        </div>
        <Link 
          to="/admin/formations/create" 
          className="btn-primary-gradient shadow-md flex items-center gap-2 group whitespace-nowrap"
        >
          <Plus className="w-4 h-4 transition-transform group-hover:rotate-90" />
          Nouvelle Formation
        </Link>
      </div>

      {/* Filters and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white p-2 rounded-2xl border border-slate-200 shadow-sm">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input 
            placeholder="Rechercher une formation..." 
            className="pl-9 border-none bg-slate-50/50 hover:bg-slate-50 focus-visible:ring-1 focus-visible:ring-primary/30 rounded-xl transition-all"
          />
        </div>
        <Button variant="ghost" className="text-slate-500 rounded-xl px-4 hidden sm:flex">
          <Filter className="w-4 h-4 mr-2" />
          Filtres
        </Button>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50/80 hover:bg-slate-50/80 border-b-slate-200">
                <TableHead className="font-semibold text-slate-500 uppercase tracking-wider text-xs py-4 pl-6">Titre de la formation</TableHead>
                <TableHead className="font-semibold text-slate-500 uppercase tracking-wider text-xs py-4">Catégorie</TableHead>
                <TableHead className="font-semibold text-slate-500 uppercase tracking-wider text-xs py-4">Format</TableHead>
                <TableHead className="font-semibold text-slate-500 uppercase tracking-wider text-xs py-4">Niveau</TableHead>
                <TableHead className="font-semibold text-slate-500 uppercase tracking-wider text-xs py-4">Statut</TableHead>
                <TableHead className="font-semibold text-slate-500 uppercase tracking-wider text-xs py-4 text-right pr-6">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i} className="border-b-slate-100">
                    <TableCell className="pl-6 py-4"><Skeleton className="h-5 w-[250px] rounded-md bg-slate-100" /></TableCell>
                    <TableCell className="py-4"><Skeleton className="h-4 w-[120px] rounded-md bg-slate-100" /></TableCell>
                    <TableCell className="py-4"><Skeleton className="h-4 w-[100px] rounded-md bg-slate-100" /></TableCell>
                    <TableCell className="py-4"><Skeleton className="h-6 w-[80px] rounded-full bg-slate-100" /></TableCell>
                    <TableCell className="py-4"><Skeleton className="h-6 w-[80px] rounded-full bg-slate-100" /></TableCell>
                    <TableCell className="pr-6 py-4"><Skeleton className="h-8 w-8 rounded-full ml-auto bg-slate-100" /></TableCell>
                  </TableRow>
                ))
              ) : isError ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-red-500 py-12">
                    <div className="flex flex-col items-center justify-center">
                      <span className="text-sm font-medium">Oups, une erreur s'est produite lors du chargement.</span>
                    </div>
                  </TableCell>
                </TableRow>
              ) : formations?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-16">
                    <div className="flex flex-col items-center justify-center text-slate-500">
                      <BookOpen className="w-12 h-12 text-slate-200 mb-3" />
                      <span className="text-lg font-medium text-slate-700">Aucune formation trouvée</span>
                      <span className="text-sm mt-1">Commencez par créer votre première formation.</span>
                      <Link 
                        to="/admin/formations/create" 
                        className="mt-6 text-primary hover:text-primary-light font-medium text-sm flex items-center gap-1"
                      >
                        Créer une formation <Plus className="w-3 h-3" />
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                formations?.map((formation) => (
                  <TableRow key={formation.id} className="border-b-slate-100 hover:bg-slate-50/50 transition-colors group">
                    <TableCell className="pl-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200 overflow-hidden">
                          {formation.imageUrl ? (
                            <img src={formation.imageUrl} alt={formation.titre} className="w-full h-full object-cover" />
                          ) : (
                            <BookOpen className="w-4 h-4 text-slate-400" />
                          )}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900 group-hover:text-primary transition-colors line-clamp-1">{formation.titre}</div>
                          <div className="text-xs text-slate-500 mt-0.5 line-clamp-1">{formation.sousTitre}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-4 text-sm text-slate-600">{formation.categorie.libelle}</TableCell>
                    <TableCell className="py-4 text-sm text-slate-600">{formation.format.titre}</TableCell>
                    <TableCell className="py-4">
                      <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2 py-1 rounded-md border border-slate-200">
                        {formation.niveau === 'DEBUTANT' ? 'Débutant' : formation.niveau === 'INTERMEDIAIRE' ? 'Intermédiaire' : 'Avancé'}
                      </span>
                    </TableCell>
                    <TableCell className="py-4">
                      {getStatusBadge(formation.statut)}
                    </TableCell>
                    <TableCell className="pr-6 py-4 text-right">
                      <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-slate-500 hover:text-primary hover:bg-primary/10">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-slate-500 hover:text-red-600 hover:bg-red-50">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-slate-500">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        
        {/* Pagination placeholder (optional) */}
        <div className="border-t border-slate-100 bg-slate-50/50 p-4 px-6 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Affichage de <span className="font-medium text-slate-900">{formations?.length || 0}</span> formations
          </span>
          {/* Pagination controls would go here */}
        </div>
      </div>
    </div>
  );
};

export default AdminFormationsPage;
