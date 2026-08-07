import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save, LayoutGrid, Tag as TagIcon, Settings2, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";

import { categoriesService } from "@/services/categories.service";
import { formatsService } from "@/services/formats.service";
import { formateursService } from "@/services/formateurs.service";
import { tagsService } from "@/services/tags.service";
import { competencesService } from "@/services/competences.service";
import { formationsService } from "@/services/formations.service";

const formSchema = z.object({
  titre: z.string().min(2, { message: "Le titre doit faire au moins 2 caractères." }),
  sousTitre: z.string().min(2, { message: "Le sous-titre est requis." }),
  imageUrl: z.string().optional(),
  niveau: z.enum(['DEBUTANT', 'INTERMEDIAIRE', 'AVANCE'], { required_error: "Le niveau est requis." }),
  statut: z.enum(['A_VENIR', 'EN_COURS', 'REPLAY', 'TERMINE'], { required_error: "Le statut est requis." }),
  categorieId: z.coerce.number().min(1, { message: "La catégorie est requise." }),
  formatId: z.coerce.number().min(1, { message: "Le format est requis." }),
  formateurId: z.coerce.number().min(1, { message: "Le formateur est requis." }),
  tagIds: z.array(z.number()).default([]),
  competenceIds: z.array(z.number()).default([]),
  cout: z.coerce.number().min(0, { message: "Le coût ne peut pas être négatif." }),
  capacite: z.coerce.number().min(1, { message: "La capacité doit être d'au moins 1." }),
  dureeJours: z.coerce.number().min(1, { message: "La durée doit être d'au moins 1 jour." }),
  isActive: z.boolean().default(true),
});

type FormValues = z.infer<typeof formSchema>;

const AdminFormationCreatePage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Fetch relations
  const { data: categories } = useQuery({ queryKey: ['categories'], queryFn: categoriesService.getCategories });
  const { data: formats } = useQuery({ queryKey: ['formats'], queryFn: formatsService.getFormatsPedagogiques });
  const { data: formateurs } = useQuery({ queryKey: ['formateurs'], queryFn: () => formateursService.getFormateurs() });
  const { data: tags } = useQuery({ queryKey: ['tags'], queryFn: tagsService.getTags });
  const { data: competences } = useQuery({ queryKey: ['competences'], queryFn: competencesService.getCompetences });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      titre: "",
      sousTitre: "",
      imageUrl: "",
      tagIds: [],
      competenceIds: [],
      cout: 0,
      capacite: 10,
      dureeJours: 1,
      isActive: true,
    },
  });

  const mutation = useMutation({
    mutationFn: formationsService.createFormation,
    onSuccess: () => {
      toast.success("Formation créée avec succès !", {
        description: "Elle est désormais disponible dans le catalogue."
      });
      queryClient.invalidateQueries({ queryKey: ['admin-formations'] });
      navigate('/admin/formations');
    },
    onError: (error) => {
      toast.error("Erreur lors de la création", {
        description: "Veuillez vérifier les champs et réessayer."
      });
      console.error(error);
    }
  });

  function onSubmit(values: FormValues) {
    mutation.mutate(values as unknown as Parameters<typeof formationsService.createFormation>[0]);
  }

  // Composant utilitaire pour les cartes du formulaire
  const FormSection = ({ title, icon: Icon, children }: { title: string, icon: React.ElementType, children: React.ReactNode }) => (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden animate-fade-in-up">
      <div className="border-b border-slate-100 bg-slate-50/50 px-6 py-4 flex items-center gap-3">
        <div className="p-2 bg-white rounded-lg shadow-sm border border-slate-100">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <h3 className="font-semibold text-slate-800 text-lg font-montserrat">{title}</h3>
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in pb-12">
      {/* Header Sticky */}
      <div className="sticky top-0 z-20 bg-slate-50/80 backdrop-blur-xl border-b border-slate-200 -mx-8 px-8 py-4 mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)]">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="rounded-full hover:bg-slate-200/50" asChild>
            <Link to="/admin/formations">
              <ArrowLeft className="h-5 w-5 text-slate-600" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 font-montserrat">
              Nouvelle Formation
            </h1>
            <p className="text-sm text-slate-500">
              Remplissez les informations ci-dessous
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl hidden sm:flex" asChild>
             <Link to="/admin/formations">Annuler</Link>
          </Button>
          <Button 
            className="btn-primary-gradient shadow-md rounded-xl" 
            onClick={form.handleSubmit(onSubmit)}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? (
              <span className="flex items-center gap-2">Sauvegarde...</span>
            ) : (
              <span className="flex items-center gap-2"><Save className="w-4 h-4" /> Enregistrer</span>
            )}
          </Button>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Colonne de Gauche (Principale) */}
          <div className="lg:col-span-2 space-y-8">
            
            <FormSection title="Informations Principales" icon={LayoutGrid}>
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="titre"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700 font-medium">Titre de la formation <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Ex: Bootcamp React Avancé 2024" 
                          className="h-11 rounded-xl bg-slate-50/50 border-slate-200 focus-visible:ring-primary/20 focus-visible:border-primary transition-all text-slate-800" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="sousTitre"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700 font-medium">Sous-titre accrocheur <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Maîtrisez les hooks, le state management et l'architecture" 
                          className="h-11 rounded-xl bg-slate-50/50 border-slate-200 focus-visible:ring-primary/20 focus-visible:border-primary transition-all text-slate-800"
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription className="text-xs">Sera affiché juste en dessous du titre principal dans les cartes.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </FormSection>

            <FormSection title="Classification & Détails" icon={Settings2}>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="categorieId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700">Catégorie <span className="text-red-500">*</span></FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value?.toString()}>
                        <FormControl>
                          <SelectTrigger className="h-11 rounded-xl bg-slate-50/50 border-slate-200">
                            <SelectValue placeholder="Sélectionnez..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="rounded-xl">
                          {categories?.map((cat) => (
                            <SelectItem key={cat.id} value={cat.id.toString()} className="rounded-lg">{cat.libelle}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="formatId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700">Format <span className="text-red-500">*</span></FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value?.toString()}>
                        <FormControl>
                          <SelectTrigger className="h-11 rounded-xl bg-slate-50/50 border-slate-200">
                            <SelectValue placeholder="Sélectionnez..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="rounded-xl">
                          {formats?.map((format) => (
                            <SelectItem key={format.id} value={format.id.toString()} className="rounded-lg">{format.titre}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="niveau"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700">Niveau <span className="text-red-500">*</span></FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-11 rounded-xl bg-slate-50/50 border-slate-200">
                            <SelectValue placeholder="Sélectionnez..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="rounded-xl">
                          <SelectItem value="DEBUTANT" className="rounded-lg">Débutant</SelectItem>
                          <SelectItem value="INTERMEDIAIRE" className="rounded-lg">Intermédiaire</SelectItem>
                          <SelectItem value="AVANCE" className="rounded-lg">Avancé</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="formateurId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700">Formateur <span className="text-red-500">*</span></FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value?.toString()}>
                        <FormControl>
                          <SelectTrigger className="h-11 rounded-xl bg-slate-50/50 border-slate-200">
                            <SelectValue placeholder="Sélectionnez..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="rounded-xl">
                          {formateurs?.map((formateur) => (
                            <SelectItem key={formateur.id} value={formateur.id.toString()} className="rounded-lg">
                              <span className="flex items-center gap-2">
                                <div className="w-5 h-5 rounded-full bg-slate-200 overflow-hidden shrink-0">
                                  {formateur.imageUrl && <img src={formateur.imageUrl} alt="" className="w-full h-full object-cover" />}
                                </div>
                                {formateur.nomComplet}
                              </span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
               </div>
            </FormSection>

            <FormSection title="Mots-clés & Compétences" icon={TagIcon}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormField
                  control={form.control}
                  name="tagIds"
                  render={() => (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel className="text-slate-700 font-semibold">Tags associés</FormLabel>
                        <FormDescription className="text-xs">Améliore la recherche.</FormDescription>
                      </div>
                      <div className="space-y-3 p-4 bg-slate-50/50 rounded-xl border border-slate-100 h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200">
                        {tags?.map((item) => (
                          <FormField
                            key={item.id}
                            control={form.control}
                            name="tagIds"
                            render={({ field }) => {
                              return (
                                <FormItem key={item.id} className="flex flex-row items-center space-x-3 space-y-0 group">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(item.id)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...field.value, item.id])
                                          : field.onChange(field.value?.filter((val) => val !== item.id))
                                      }}
                                      className="border-slate-300 data-[state=checked]:bg-primary data-[state=checked]:border-primary transition-all"
                                    />
                                  </FormControl>
                                  <FormLabel className="font-medium text-slate-600 group-hover:text-slate-900 cursor-pointer transition-colors text-sm">
                                    {item.titre}
                                  </FormLabel>
                                </FormItem>
                              )
                            }}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="competenceIds"
                  render={() => (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel className="text-slate-700 font-semibold">Compétences acquises</FormLabel>
                        <FormDescription className="text-xs">Objectifs pédagogiques.</FormDescription>
                      </div>
                      <div className="space-y-3 p-4 bg-slate-50/50 rounded-xl border border-slate-100 h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200">
                        {competences?.map((item) => (
                          <FormField
                            key={item.id}
                            control={form.control}
                            name="competenceIds"
                            render={({ field }) => {
                              return (
                                <FormItem key={item.id} className="flex flex-row items-center space-x-3 space-y-0 group">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(item.id)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...field.value, item.id])
                                          : field.onChange(field.value?.filter((val) => val !== item.id))
                                      }}
                                      className="border-slate-300 data-[state=checked]:bg-primary data-[state=checked]:border-primary transition-all"
                                    />
                                  </FormControl>
                                  <FormLabel className="font-medium text-slate-600 group-hover:text-slate-900 cursor-pointer transition-colors text-sm">
                                    {item.titre}
                                  </FormLabel>
                                </FormItem>
                              )
                            }}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </FormSection>

          </div>

          {/* Colonne de Droite (Paramètres annexes) */}
          <div className="space-y-8">
            
            {/* Status Card */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6 animate-fade-in-up">
              <h3 className="font-semibold text-slate-800 font-montserrat flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                Disponibilité
              </h3>
              
              <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-xl border border-slate-100 bg-slate-50/50 p-4 transition-all hover:bg-slate-50">
                    <div className="space-y-0.5">
                      <FormLabel className="text-sm font-semibold text-slate-700">Visible en ligne</FormLabel>
                      <FormDescription className="text-xs">Publier la formation</FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} className="data-[state=checked]:bg-primary" />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="statut"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700 text-sm">Statut de la session</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-11 rounded-xl bg-slate-50/50">
                          <SelectValue placeholder="Sélectionnez..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="A_VENIR" className="rounded-lg">À venir (Inscriptions ouvertes)</SelectItem>
                        <SelectItem value="EN_COURS" className="rounded-lg">En cours</SelectItem>
                        <SelectItem value="REPLAY" className="rounded-lg">Replay disponible</SelectItem>
                        <SelectItem value="TERMINE" className="rounded-lg">Clôturé / Terminé</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Image Card */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4 animate-fade-in-up animation-delay-200">
              <h3 className="font-semibold text-slate-800 font-montserrat flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-slate-500" />
                Média
              </h3>
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700 text-sm">URL de l'image de couverture</FormLabel>
                    <FormControl>
                      <Input placeholder="https://..." className="h-10 rounded-lg text-sm bg-slate-50/50" {...field} />
                    </FormControl>
                    <FormMessage />
                    {field.value && (
                       <div className="mt-3 rounded-lg overflow-hidden border border-slate-200 aspect-video bg-slate-100 relative group">
                         <img src={field.value} alt="Aperçu" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" onError={(e) => {
                           (e.target as HTMLImageElement).style.display = 'none';
                         }} />
                       </div>
                    )}
                  </FormItem>
                )}
              />
            </div>

            {/* Pricing & Planning Card */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-5 animate-fade-in-up animation-delay-400">
              <h3 className="font-semibold text-slate-800 font-montserrat">
                Tarification & Planification
              </h3>
              
              <FormField
                control={form.control}
                name="cout"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700 text-sm">Coût d'inscription (FCFA)</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">XOF</span>
                        <Input type="number" min="0" className="h-11 rounded-xl pl-12 bg-slate-50/50 font-medium" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="capacite"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700 text-sm">Capacité max</FormLabel>
                      <FormControl>
                        <Input type="number" min="1" className="h-11 rounded-xl bg-slate-50/50 text-center font-medium" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dureeJours"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700 text-sm">Durée (jours)</FormLabel>
                      <FormControl>
                        <Input type="number" min="1" className="h-11 rounded-xl bg-slate-50/50 text-center font-medium" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

          </div>
        </form>
      </Form>
    </div>
  );
};

export default AdminFormationCreatePage;
