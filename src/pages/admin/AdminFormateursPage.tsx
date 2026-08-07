import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Plus, Edit, Trash2, MoreHorizontal, Search, Filter, UserRound, Loader2, UploadCloud } from "lucide-react";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

const formateurSchema = z.object({
  nomComplet: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  titre: z.string().min(2, "Le titre est requis"),
  numero: z.string().optional(),
  imageUrl: z.string().optional(),
});

const AdminFormateursPage = () => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: formateurs, isLoading, isError } = useQuery({
    queryKey: ['admin-formateurs'],
    queryFn: () => formateursService.getFormateurs(),
  });

  const form = useForm<z.infer<typeof formateurSchema>>({
    resolver: zodResolver(formateurSchema),
    defaultValues: {
      nomComplet: "",
      titre: "",
      numero: "",
      imageUrl: "",
    },
  });

  const createMutation = useMutation({
    mutationFn: formateursService.createFormateur,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-formateurs'] });
      toast.success("Formateur ajouté avec succès");
      setIsCreateOpen(false);
      form.reset();
    },
    onError: () => {
      toast.error("Erreur lors de l'ajout du formateur");
    },
  });

  const onSubmit = (values: z.infer<typeof formateurSchema>) => {
    createMutation.mutate({
      ...values,
      isActive: true,
      competenceIds: [],
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("L'image ne doit pas dépasser 2Mo");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        form.setValue("imageUrl", reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

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
        
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="btn-primary-gradient shadow-md flex items-center gap-2 group whitespace-nowrap">
              <Plus className="w-4 h-4 transition-transform group-hover:rotate-90" />
              Nouveau Formateur
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold font-montserrat">Ajouter un formateur</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
                <FormField
                  control={form.control}
                  name="nomComplet"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom complet *</FormLabel>
                      <FormControl>
                        <Input placeholder="Jean Dupont" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="titre"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Titre / Rôle *</FormLabel>
                      <FormControl>
                        <Input placeholder="Expert React & Node.js" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="numero"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Numéro de téléphone</FormLabel>
                      <FormControl>
                        <Input placeholder="+33 6 12 34 56 78" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="space-y-2">
                  <FormLabel>Photo de profil (Optionnel)</FormLabel>
                  <div className="flex items-center gap-4">
                    {form.watch("imageUrl") ? (
                      <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-slate-200 shrink-0">
                        <img src={form.watch("imageUrl")} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center border-2 border-dashed border-slate-300 shrink-0">
                        <UserRound className="w-6 h-6 text-slate-400" />
                      </div>
                    )}
                    <div className="flex-1">
                      <Input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageUpload}
                        className="file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 text-sm cursor-pointer"
                      />
                      <p className="text-xs text-slate-500 mt-1">PNG, JPG jusqu'à 2MB</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-end gap-3">
                  <Button type="button" variant="outline" onClick={() => setIsCreateOpen(false)}>
                    Annuler
                  </Button>
                  <Button type="submit" disabled={createMutation.isPending} className="btn-primary-gradient">
                    {createMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Créer le formateur
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
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
