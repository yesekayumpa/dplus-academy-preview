import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import logo2 from "@/assets/LOGOTYPE [Récupéré]-18.png";
import { Eye, EyeOff, Lock, Mail, ArrowRight } from 'lucide-react';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      const savedPassword = localStorage.getItem('dmplus_admin_password') || 'admin123';
      if (email === 'admin@dmplus.com' && password === savedPassword) {
        login();
        toast.success("Bienvenue dans votre espace admin !");
        navigate('/admin/formations');
      } else {
        toast.error("Identifiants incorrects");
      }
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen flex font-inter overflow-hidden bg-slate-50">

      {/* ── Panneau gauche (branding) ── */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 relative p-12 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        {/* Glow blobs */}
        <div className="absolute top-[-5%] left-[-5%] w-72 h-72 rounded-full bg-primary/20 blur-[80px]" />
        <div className="absolute bottom-[10%] right-[-5%] w-64 h-64 rounded-full bg-blue-500/15 blur-[80px]" />

        {/* Logo top */}
        <div>
          <img src={logo2} alt="DM+ Academy" className="h-12 object-contain brightness-0 invert" />
        </div>

        {/* Center content */}
        <div className="space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 text-white/70 text-xs font-medium px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            Espace Administration Sécurisé
          </div>
          <h2 className="text-4xl font-bold text-white font-montserrat leading-tight">
            Gérez votre académie <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-light to-blue-400">
              avec puissance.
            </span>
          </h2>
          <p className="text-slate-400 text-base leading-relaxed max-w-sm">
            Créez des formations, gérez vos formateurs et suivez vos inscriptions depuis un seul tableau de bord.
          </p>
        </div>

        {/* Bottom stats */}
        <div className="flex gap-8 relative z-10">
          {[
            { value: "100%", label: "Sécurisé" },
            { value: "24/7", label: "Disponible" },
            { value: "∞", label: "Formations" },
          ].map(({ value, label }) => (
            <div key={label}>
              <p className="text-2xl font-bold text-white font-montserrat">{value}</p>
              <p className="text-xs text-slate-500 mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Panneau droit (formulaire) ── */}
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 p-8 sm:p-12 relative">
        {/* Mobile glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] lg:hidden" />

        <div className="w-full max-w-sm relative z-10">

          {/* Mobile logo */}
          <div className="mb-10 lg:hidden">
            <img src={logo2} alt="DM+ Academy" className="h-12 object-contain" />
          </div>

          {/* Header */}
          <div className="mb-10">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Back-office</p>
            <h1 className="text-3xl font-bold font-montserrat text-slate-900 leading-tight">
              Connexion
            </h1>
            <p className="text-slate-500 text-sm mt-2">
              Entrez vos identifiants pour accéder à votre tableau de bord.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email field */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-semibold text-slate-700">Email</label>
              <div className="relative group">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@dmplus.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 pl-10 bg-white border-slate-200 rounded-xl focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary/60 transition-all text-slate-800 placeholder:text-slate-400"
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password field */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-semibold text-slate-700">Mot de passe</label>
              <div className="relative group">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 pl-10 pr-11 bg-white border-slate-200 rounded-xl focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary/60 transition-all text-slate-800"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit button */}
            <Button
              type="submit"
              className="w-full h-12 btn-primary-gradient rounded-xl text-sm font-semibold mt-2 group flex items-center justify-center gap-2 shadow-md shadow-primary/20"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Connexion en cours...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Se connecter
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              )}
            </Button>
          </form>

          {/* Footer */}
          <p className="mt-10 text-center text-xs text-slate-400">
            © {new Date().getFullYear()} DM PLUS Academy — Tous droits réservés
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
