import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Plus, Edit, Trash2, MoreHorizontal, Search, Filter, UserRound, Loader2, Save, UploadCloud } from "lucide-react";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { ImageCropperModal } from "@/components/ImageCropperModal";

const formateurSchema = z.object({
  nomComplet: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  titre: z.string().min(2, "Le titre est requis"),
  numero: z.string().optional(),
  imageUrl: z.string().optional(),
});

const AdminFormateursPage = () => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingFormateur, setEditingFormateur] = useState<any>(null);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [formateurToDelete, setFormateurToDelete] = useState<number | string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | "ACTIVE" | "INACTIVE">("ALL");
  const [cropDialogOpen, setCropDialogOpen] = useState(false);
  const [cropImageSrc, setCropImageSrc] = useState("");
  const [cropCallback, setCropCallback] = useState<((url: string) => void) | null>(null);
  const queryClient = useQueryClient();

  const { data: formateurs, isLoading, isError } = useQuery({
    queryKey: ['admin-formateurs'],
    queryFn: () => formateursService.getFormateurs(),
  });

  const filteredFormateurs = formateurs?.filter(formateur => {
    const matchesSearch = formateur.nomComplet.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          formateur.titre.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (statusFilter === "ACTIVE") return matchesSearch && formateur.isActive;
    if (statusFilter === "INACTIVE") return matchesSearch && !formateur.isActive;
    return matchesSearch;
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

  const editForm = useForm<z.infer<typeof formateurSchema>>({
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
    const payload: any = {
      nomComplet: values.nomComplet,
      titre: values.titre,
      numero: values.numero || undefined,
      imageUrl: values.imageUrl || undefined,
      isActive: true,
    };
    createMutation.mutate(payload);
  };

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string | number; data: any }) => formateursService.updateFormateur(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-formateurs'] });
      toast.success("Formateur mis à jour avec succès");
      setIsEditOpen(false);
      setEditingFormateur(null);
    },
    onError: () => {
      toast.error("Erreur lors de la mise à jour");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: formateursService.deleteFormateur,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-formateurs'] });
      toast.success("Formateur supprimé avec succès");
      setIsDeleteAlertOpen(false);
      setFormateurToDelete(null);
    },
    onError: () => {
      toast.error("Erreur lors de la suppression");
    },
  });

  const handleEditClick = (formateur: any) => {
    setEditingFormateur(formateur);
    editForm.reset({
      nomComplet: formateur.nomComplet,
      titre: formateur.titre,
      numero: formateur.numero || "",
      imageUrl: formateur.imageUrl || "",
    });
    setIsEditOpen(true);
  };

  const onEditSubmit = (values: z.infer<typeof formateurSchema>) => {
    if (editingFormateur) {
      const competenceIds = editingFormateur.competences?.map((c: any) => c.id) || [];
      updateMutation.mutate({
        id: editingFormateur.id,
        data: {
          nomComplet: values.nomComplet,
          titre: values.titre,
          numero: values.numero || undefined,
          imageUrl: values.imageUrl || undefined,
          competenceIds,
          isActive: editingFormateur.isActive,
        },
      });
    }
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
        setCropImageSrc(reader.result as string);
        setCropCallback(() => (url: string) => {
          form.setValue("imageUrl", url);
        });
        setCropDialogOpen(true);
      };
      reader.readAsDataURL(file);
    }
    e.target.value = "";
  };

  const handleEditImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("L'image ne doit pas dépasser 2Mo");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setCropImageSrc(reader.result as string);
        setCropCallback(() => (url: string) => {
          editForm.setValue("imageUrl", url);
        });
        setCropDialogOpen(true);
      };
      reader.readAsDataURL(file);
    }
    e.target.value = "";
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
          <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden bg-white/95 backdrop-blur-xl border-slate-200/60 shadow-2xl">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
              <DialogTitle className="text-xl font-bold font-montserrat flex items-center gap-2">
                <UserRound className="w-5 h-5 text-primary" />
                Ajouter un formateur
              </DialogTitle>
            </div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
                <div className="p-6 space-y-6 max-h-[calc(100vh-12rem)] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="nomComplet"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-700 font-semibold">Nom complet <span className="text-red-500">*</span></FormLabel>
                          <FormControl>
                            <Input placeholder="Jean Dupont" className="h-11 bg-slate-50/50 border-slate-200 focus-visible:ring-primary/20" {...field} />
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
                          <FormLabel className="text-slate-700 font-semibold">Numéro de téléphone</FormLabel>
                          <FormControl>
                            <Input placeholder="+33 6 12 34 56 78" className="h-11 bg-slate-50/50 border-slate-200 focus-visible:ring-primary/20" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="titre"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700 font-semibold">Titre / Rôle <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input placeholder="Expert React & Node.js" className="h-11 bg-slate-50/50 border-slate-200 focus-visible:ring-primary/20" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="space-y-3 p-5 rounded-2xl border border-slate-100 bg-slate-50/50">
                    <FormLabel className="text-slate-700 font-semibold">Photo de profil <span className="text-slate-400 font-normal">(Optionnelle)</span></FormLabel>
                    <div className="flex items-center gap-6">
                      {form.watch("imageUrl") ? (
                        <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-md shrink-0">
                          <img src={form.watch("imageUrl")} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div className="w-20 h-20 rounded-full bg-white shadow-sm flex items-center justify-center border-2 border-dashed border-slate-300 shrink-0">
                          <UserRound className="w-8 h-8 text-slate-300" />
                        </div>
                      )}
                      <div className="flex-1 space-y-2">
                        <Input 
                          type="file" 
                          accept="image/*" 
                          onChange={handleImageUpload}
                          className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 text-sm cursor-pointer h-12 pt-2.5 bg-white border-slate-200"
                        />
                        <p className="text-xs text-slate-500">Formats acceptés : PNG, JPG. Taille max : 2MB.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-3">
                  <Button type="button" variant="outline" onClick={() => setIsCreateOpen(false)} className="rounded-xl">
                    Annuler
                  </Button>
                  <Button type="submit" disabled={createMutation.isPending} className="btn-primary-gradient rounded-xl shadow-md">
                    {createMutation.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                    Enregistrer
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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 border-none bg-slate-50/50 hover:bg-slate-50 focus-visible:ring-1 focus-visible:ring-primary/30 rounded-xl transition-all"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="text-slate-500 rounded-xl px-4 hidden sm:flex">
              <Filter className="w-4 h-4 mr-2" />
              {statusFilter === "ALL" ? "Filtres" : statusFilter === "ACTIVE" ? "Actifs" : "Inactifs"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setStatusFilter("ALL")}>Tous les statuts</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("ACTIVE")}>Actifs</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("INACTIVE")}>Inactifs</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
              ) : filteredFormateurs?.length === 0 ? (
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
                filteredFormateurs?.map((formateur) => (
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
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-slate-500 hover:text-primary hover:bg-primary/10" onClick={() => handleEditClick(formateur)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-slate-500 hover:text-red-600 hover:bg-red-50" onClick={() => { setFormateurToDelete(formateur.id); setIsDeleteAlertOpen(true); }}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-slate-500">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => {
                              const competenceIds = formateur.competences?.map((c: any) => c.id) || [];
                              updateMutation.mutate({ 
                                id: formateur.id, 
                                data: { 
                                  nomComplet: formateur.nomComplet,
                                  titre: formateur.titre,
                                  numero: formateur.numero,
                                  imageUrl: formateur.imageUrl,
                                  competenceIds,
                                  isActive: !formateur.isActive 
                                } 
                              });
                            }}>
                              {formateur.isActive ? 'Désactiver' : 'Activer'}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden bg-white/95 backdrop-blur-xl border-slate-200/60 shadow-2xl">
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
            <DialogTitle className="text-xl font-bold font-montserrat flex items-center gap-2">
              <UserRound className="w-5 h-5 text-primary" />
              Modifier le formateur
            </DialogTitle>
          </div>
          <Form {...editForm}>
            <form onSubmit={editForm.handleSubmit(onEditSubmit)} className="flex flex-col">
              <div className="p-6 space-y-6 max-h-[calc(100vh-12rem)] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <FormField
                    control={editForm.control}
                    name="nomComplet"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700 font-semibold">Nom complet <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input placeholder="Jean Dupont" className="h-11 bg-slate-50/50 border-slate-200 focus-visible:ring-primary/20" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={editForm.control}
                    name="numero"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700 font-semibold">Numéro de téléphone</FormLabel>
                        <FormControl>
                          <Input placeholder="+33 6 12 34 56 78" className="h-11 bg-slate-50/50 border-slate-200 focus-visible:ring-primary/20" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={editForm.control}
                  name="titre"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700 font-semibold">Titre / Rôle <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Input placeholder="Expert React & Node.js" className="h-11 bg-slate-50/50 border-slate-200 focus-visible:ring-primary/20" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="space-y-3 p-5 rounded-2xl border border-slate-100 bg-slate-50/50">
                  <FormLabel className="text-slate-700 font-semibold">Photo de profil <span className="text-slate-400 font-normal">(Optionnelle)</span></FormLabel>
                  <div className="flex items-center gap-6">
                    {editForm.watch("imageUrl") ? (
                      <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-md shrink-0">
                        <img src={editForm.watch("imageUrl")} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="w-20 h-20 rounded-full bg-white shadow-sm flex items-center justify-center border-2 border-dashed border-slate-300 shrink-0">
                        <UserRound className="w-8 h-8 text-slate-300" />
                      </div>
                    )}
                    <div className="flex-1 space-y-2">
                      <Input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleEditImageUpload}
                        className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 text-sm cursor-pointer h-12 pt-2.5 bg-white border-slate-200"
                      />
                      <p className="text-xs text-slate-500">Formats acceptés : PNG, JPG. Taille max : 2MB.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={() => setIsEditOpen(false)} className="rounded-xl">
                  Annuler
                </Button>
                <Button type="submit" disabled={updateMutation.isPending} className="btn-primary-gradient rounded-xl shadow-md">
                  {updateMutation.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                  Mettre à jour
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Delete Alert Dialog */}
      <AlertDialog open={isDeleteAlertOpen} onOpenChange={setIsDeleteAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Êtes-vous absolument sûr ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action est irréversible. Cela supprimera définitivement le formateur et toutes ses données associées.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction 
              onClick={() => {
                if (formateurToDelete) {
                  deleteMutation.mutate(formateurToDelete);
                }
              }}
              className="bg-red-600 hover:bg-red-700"
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <ImageCropperModal
        open={cropDialogOpen}
        onOpenChange={setCropDialogOpen}
        imageSrc={cropImageSrc}
        onCropComplete={(url) => {
          if (cropCallback) cropCallback(url);
        }}
      />
    </div>
  );
};

export default AdminFormateursPage;
