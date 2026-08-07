import { useState } from "react";
import { toast } from "sonner";
import { Settings, Lock, Bell, Palette, Shield, Save, Eye, EyeOff, Mail, Globe, Moon, Sun, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

// Identifiant unique du mot de passe admin stocké localement
const ADMIN_PASSWORD_KEY = "dmplus_admin_password";

const AdminSettingsPage = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  // --- Section Sécurité ---
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);

  // --- Section Notifications ---
  const [notifNewInscription, setNotifNewInscription] = useState(true);
  const [notifFormationCreate, setNotifFormationCreate] = useState(true);
  const [notifWeeklyReport, setNotifWeeklyReport] = useState(false);

  // --- Section Apparence ---
  const [theme, setTheme] = useState<"light" | "dark" | "system">("light");

  // --- Section Général ---
  const [siteEmail, setSiteEmail] = useState("contact@dmplus.com");
  const [siteName, setSiteName] = useState("DM PLUS Academy");

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    const savedPassword = localStorage.getItem(ADMIN_PASSWORD_KEY) || "admin123";
    if (currentPassword !== savedPassword) {
      toast.error("Mot de passe actuel incorrect.");
      return;
    }
    if (newPassword.length < 6) {
      toast.error("Le nouveau mot de passe doit faire au moins 6 caractères.");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Les deux mots de passe ne correspondent pas.");
      return;
    }
    localStorage.setItem(ADMIN_PASSWORD_KEY, newPassword);
    toast.success("Mot de passe mis à jour avec succès !", {
      description: "Reconnectez-vous avec votre nouveau mot de passe."
    });
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    // Déconnexion pour forcer une nouvelle connexion avec le nouveau mot de passe
    setTimeout(() => {
      logout();
      navigate("/admin/login");
    }, 1500);
  };

  const handleGeneralSave = () => {
    localStorage.setItem("dmplus_site_name", siteName);
    localStorage.setItem("dmplus_site_email", siteEmail);
    toast.success("Paramètres généraux enregistrés.");
  };

  const handleNotifSave = () => {
    toast.success("Préférences de notifications sauvegardées.");
  };

  // Sous-composant pour les sections
  const Section = ({ title, icon: Icon, children }: { title: string; icon: React.ElementType; children: React.ReactNode }) => (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="border-b border-slate-100 bg-slate-50/50 px-6 py-4 flex items-center gap-3">
        <div className="p-2 bg-white rounded-lg shadow-sm border border-slate-100">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <h3 className="font-semibold text-slate-800 text-lg font-montserrat">{title}</h3>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );

  const ToggleRow = ({ label, description, checked, onChange }: { label: string; description: string; checked: boolean; onChange: (v: boolean) => void; }) => (
    <div className="flex items-center justify-between py-4 border-b border-slate-100 last:border-none">
      <div>
        <p className="text-sm font-semibold text-slate-700">{label}</p>
        <p className="text-xs text-slate-500 mt-0.5">{description}</p>
      </div>
      <Switch checked={checked} onCheckedChange={onChange} className="data-[state=checked]:bg-primary" />
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fade-in pb-12">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 font-montserrat">Paramètres</h1>
        <p className="text-slate-500 mt-1.5 text-sm">Gérez vos préférences et la configuration de votre espace.</p>
      </div>

      {/* Section Général */}
      <Section title="Informations Générales" icon={Globe}>
        <div className="space-y-5">
          <div className="space-y-2">
            <Label className="text-slate-700">Nom du site</Label>
            <Input
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
              className="h-11 rounded-xl bg-slate-50/50 border-slate-200 focus-visible:ring-primary/20"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-slate-700">Email de contact</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                type="email"
                value={siteEmail}
                onChange={(e) => setSiteEmail(e.target.value)}
                className="h-11 pl-9 rounded-xl bg-slate-50/50 border-slate-200 focus-visible:ring-primary/20"
              />
            </div>
          </div>
          <div className="flex justify-end pt-2">
            <Button className="btn-primary-gradient rounded-xl gap-2" onClick={handleGeneralSave}>
              <Save className="w-4 h-4" /> Enregistrer
            </Button>
          </div>
        </div>
      </Section>

      {/* Section Sécurité / Changer mot de passe */}
      <Section title="Sécurité" icon={Lock}>
        <form onSubmit={handlePasswordChange} className="space-y-5">
          <div className="space-y-2">
            <Label className="text-slate-700">Mot de passe actuel</Label>
            <div className="relative">
              <Input
                type={showCurrent ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="h-11 rounded-xl bg-slate-50/50 border-slate-200 pr-10 focus-visible:ring-primary/20"
                placeholder="••••••••"
                required
              />
              <button type="button" onClick={() => setShowCurrent(!showCurrent)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-slate-700">Nouveau mot de passe</Label>
            <div className="relative">
              <Input
                type={showNew ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="h-11 rounded-xl bg-slate-50/50 border-slate-200 pr-10 focus-visible:ring-primary/20"
                placeholder="Minimum 6 caractères"
                required
              />
              <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-slate-700">Confirmer le nouveau mot de passe</Label>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="h-11 rounded-xl bg-slate-50/50 border-slate-200 focus-visible:ring-primary/20"
              placeholder="••••••••"
              required
            />
          </div>
          <div className="flex justify-end pt-2">
            <Button type="submit" className="btn-primary-gradient rounded-xl gap-2">
              <Shield className="w-4 h-4" /> Mettre à jour le mot de passe
            </Button>
          </div>
        </form>
      </Section>

      {/* Section Notifications */}
      <Section title="Notifications" icon={Bell}>
        <div>
          <ToggleRow
            label="Nouvelle inscription"
            description="Être notifié quand un participant s'inscrit à une formation."
            checked={notifNewInscription}
            onChange={setNotifNewInscription}
          />
          <ToggleRow
            label="Création de formation"
            description="Recevoir une confirmation à chaque ajout d'une nouvelle formation."
            checked={notifFormationCreate}
            onChange={setNotifFormationCreate}
          />
          <ToggleRow
            label="Rapport hebdomadaire"
            description="Recevoir un résumé des activités chaque lundi matin."
            checked={notifWeeklyReport}
            onChange={setNotifWeeklyReport}
          />
        </div>
        <div className="flex justify-end pt-4">
          <Button variant="outline" className="rounded-xl gap-2" onClick={handleNotifSave}>
            <Save className="w-4 h-4" /> Sauvegarder
          </Button>
        </div>
      </Section>

      {/* Section Apparence */}
      <Section title="Apparence" icon={Palette}>
        <div className="grid grid-cols-3 gap-3">
          {([
            { value: "light", label: "Clair", icon: Sun },
            { value: "dark", label: "Sombre", icon: Moon },
            { value: "system", label: "Système", icon: Monitor },
          ] as const).map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              onClick={() => { setTheme(value); toast.info(`Thème "${label}" sélectionné.`); }}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                theme === value
                  ? "border-primary bg-primary/5 text-primary shadow-sm"
                  : "border-slate-200 bg-slate-50/50 text-slate-500 hover:border-slate-300"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-semibold">{label}</span>
            </button>
          ))}
        </div>
      </Section>
    </div>
  );
};

export default AdminSettingsPage;
