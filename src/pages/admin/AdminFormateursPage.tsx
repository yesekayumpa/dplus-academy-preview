import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Plus, Edit, Trash2, MoreHorizontal, Search, Filter, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formateursService } from "@/services/formateurs.service";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";

const AdminFormateursPage = () => {
  const { data: formateurs, isLoading, isError } = useQuery({
    queryKey: ['admin-formateurs'],
    queryFn: () => formateursService.getFormateurs(),
  });

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 font-montserrat">
            Formateurs
          </h1>
          <p className="text-slate-500 mt-1.5 text-sm">
            Gérez votre équipe de formateurs et leurs domaines d'expertise.
          </p>
        </div>
        <Button className="btn-primary-gradient shadow-md flex items-center gap-2 group whitespace-nowrap">
          <Plus className="w-4 h-4 transition-transform group-hover:rotate-90" />
          Nouveau Formateur
        </Button>
      </div>

      {/* Filters and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white p-2 rounded-2xl border border-slate-200 shadow-sm">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input 
            placeholder="Rechercher un formateur..." 
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
                <TableHead className="font-semibold text-slate-500 uppercase tracking-wider text-xs py-4 pl-6">Formateur</TableHead>
                <TableHead className="font-semibold text-slate-500 uppercase tracking-wider text-xs py-4">Titre / Rôle</TableHead>
                <TableHead className="font-semibold text-slate-500 uppercase tracking-wider text-xs py-4">Compétences</TableHead>
                <TableHead className="font-semibold text-slate-500 uppercase tracking-wider text-xs py-4">Statut</TableHead>
                <TableHead className="font-semibold text-slate-500 uppercase tracking-wider text-xs py-4 text-right pr-6">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <TableRow key={i} className="border-b-slate-100">
                    <TableCell className="pl-6 py-4">
                      <div className="flex items-center gap-3">
                        <Skeleton className="w-10 h-10 rounded-full bg-slate-100" />
                        <Skeleton className="h-5 w-[150px] rounded-md bg-slate-100" />
                      </div>
                    </TableCell>
                    <TableCell className="py-4"><Skeleton className="h-4 w-[120px] rounded-md bg-slate-100" /></TableCell>
                    <TableCell className="py-4"><Skeleton className="h-4 w-[200px] rounded-md bg-slate-100" /></TableCell>
                    <TableCell className="py-4"><Skeleton className="h-6 w-[80px] rounded-full bg-slate-100" /></TableCell>
                    <TableCell className="pr-6 py-4"><Skeleton className="h-8 w-8 rounded-full ml-auto bg-slate-100" /></TableCell>
                  </TableRow>
                ))
              ) : isError ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-red-500 py-12">
                    <div className="flex flex-col items-center justify-center">
                      <span className="text-sm font-medium">Oups, une erreur s'est produite lors du chargement.</span>
                    </div>
                  </TableCell>
                </TableRow>
              ) : formateurs?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-16">
                    <div className="flex flex-col items-center justify-center text-slate-500">
                      <UserRound className="w-12 h-12 text-slate-200 mb-3" />
                      <span className="text-lg font-medium text-slate-700">Aucun formateur trouvé</span>
                      <span className="text-sm mt-1">Commencez par ajouter des membres à votre équipe.</span>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                formateurs?.map((formateur) => (
                  <TableRow key={formateur.id} className="border-b-slate-100 hover:bg-slate-50/50 transition-colors group">
                    <TableCell className="pl-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200 overflow-hidden">
                          {formateur.imageUrl ? (
                            <img src={formateur.imageUrl} alt={formateur.nomComplet} className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-slate-400 font-medium text-sm">
                              {formateur.nomComplet.charAt(0).toUpperCase()}
                            </span>
                          )}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900 group-hover:text-primary transition-colors">{formateur.nomComplet}</div>
                          {formateur.numero && <div className="text-xs text-slate-500 mt-0.5">{formateur.numero}</div>}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-4 text-sm text-slate-600">{formateur.titre}</TableCell>
                    <TableCell className="py-4">
                      <div className="flex flex-wrap gap-1">
                        {formateur.competences?.slice(0, 3).map(comp => (
                          <span key={comp.id} className="text-[10px] font-medium text-slate-600 bg-slate-100 px-2 py-1 rounded-md border border-slate-200">
                            {comp.titre}
                          </span>
                        ))}
                        {formateur.competences && formateur.competences.length > 3 && (
                          <span className="text-[10px] font-medium text-slate-500 bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
                            +{formateur.competences.length - 3}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      {formateur.isActive ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 border border-emerald-200">Actif</span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">Inactif</span>
                      )}
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
      </div>
    </div>
  );
};

export default AdminFormateursPage;
