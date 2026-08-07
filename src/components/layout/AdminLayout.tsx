import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { BookOpen, LayoutDashboard, Settings, Users, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import logo2 from "@/assets/LOGOTYPE [Récupéré]-18.png";

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Formations", href: "/admin/formations", icon: BookOpen },
    { name: "Formateurs", href: "/admin/formateurs", icon: Users },
    { name: "Paramètres", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-inter selection:bg-primary/10">
      {/* 
        Sidebar with Glassmorphism 
        Very subtle border, ultra white with slight transparency and blur.
      */}
      <aside className="w-full md:w-72 bg-white/70 backdrop-blur-2xl border-r border-slate-200/60 shadow-[4px_0_24px_-12px_rgba(0,0,0,0.05)] z-10 flex flex-col transition-all duration-300">
        <div className="p-8">
          <Link to="/" className="flex flex-col items-start gap-1 group">
            <img 
              src={logo2} 
              alt="DM+ Academy" 
              className="h-10 object-contain transition-transform group-hover:scale-105"
            />
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">Admin Space</p>
          </Link>
        </div>
        
        <nav className="mt-8 flex-1 px-4">
          <div className="text-xs font-semibold text-slate-400 mb-4 px-4 uppercase tracking-wider">
            Menu Principal
          </div>
          <ul className="space-y-1.5">
            {navItems.map((item) => {
              const isActive = location.pathname.startsWith(item.href) && 
                (item.href === "/admin" ? location.pathname === "/admin" : true);
              const Icon = item.icon;
              return (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className={`group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ease-out relative overflow-hidden ${
                      isActive 
                        ? "bg-primary/5 text-primary font-semibold shadow-sm" 
                        : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900"
                    }`}
                  >
                    {isActive && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full" />
                    )}
                    <Icon className={`w-5 h-5 transition-transform duration-300 ${isActive ? "scale-110" : "group-hover:scale-110"}`} />
                    <span className="relative z-10">{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        
        {/* Footer of Sidebar */}
        <div className="p-5 mt-auto">
          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-3">
            <div className="flex items-center gap-3">
              {/* Gradient Avatar */}
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-sm font-bold text-white shadow-md shadow-primary/20 shrink-0">
                A
              </div>
              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-800 truncate">Administrateur</p>
                <p className="text-xs text-slate-400 truncate">admin@dmplus.com</p>
              </div>
              {/* Logout button */}
              <button
                onClick={() => {
                  logout();
                  navigate('/admin/login');
                }}
                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all shrink-0"
                title="Se déconnecter"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto relative">
        {/* Subtle background decoration */}
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-slate-100 to-transparent pointer-events-none opacity-50" />
        
        <div className="p-8 md:p-12 max-w-7xl mx-auto relative z-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
