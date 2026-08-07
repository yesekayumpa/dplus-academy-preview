import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, UserPlus, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import logo2 from "@/assets/LOGOTYPE [Récupéré]-18.png";

const navItems = [
  { label: "Masterclass", href: "/masterclasses" },
  { label: "E-learning", href: "/e-learning" },
  { label: "Mentored Courses", href: "/sur-mesure" },
  { label: "Corporate", href: "/corporate-programs" },
  { label: "Nos formateurs", href: "/nos-formateurs" },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const isActive = (href: string) => location.pathname === href;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-100 py-2"
          : "bg-white/90 backdrop-blur-xl shadow-md py-3"
      )}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <nav className="flex items-center justify-between gap-4">
          {/* Logo */}
          <a href="/" className="flex-shrink-0">
            <img
              src={logo2}
              alt="DM+ Academy"
              className={cn("w-auto transition-all duration-300", isScrolled ? "h-14" : "h-16")}
            />
          </a>

          {/* Desktop Navigation — tous les liens à plat */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 whitespace-nowrap",
                  isActive(item.href)
                    ? "bg-[#b23a4a]/10 text-[#b23a4a]"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/nous-contacter"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-gray-700 border border-gray-200 hover:border-[#b23a4a] hover:text-[#b23a4a] transition-all duration-200 whitespace-nowrap"
            >
              <Phone className="w-4 h-4" />
              Nous contacter
            </Link>
            <Link
              to="/devenir-formateur"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-[#b23a4a] to-[#8e2e3b] text-white shadow-xl hover:shadow-lg hover:from-[#8e2e3b] hover:to-[#b23a4a] transition-all duration-200 whitespace-nowrap"
            >
              <UserPlus className="w-4 h-4" />
              Devenir formateur
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 text-gray-800" />
            ) : (
              <Menu className="w-5 h-5 text-gray-800" />
            )}
          </button>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden mt-3 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
            >
              <div className="p-3 space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={cn(
                      "block px-4 py-3 rounded-xl text-sm font-semibold transition-colors",
                      isActive(item.href)
                        ? "bg-[#b23a4a]/10 text-[#b23a4a]"
                        : "text-gray-700 hover:bg-gray-50"
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}

                {/* Mobile CTAs */}
                <div className="pt-3 border-t border-gray-100 space-y-2">
                  <Link
                    to="/nous-contacter"
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-700 font-semibold text-sm hover:border-[#b23a4a] hover:text-[#b23a4a] transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Phone className="w-4 h-4" />
                    Nous contacter
                  </Link>
                  <Link
                    to="/devenir-formateur"
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-gradient-to-r from-[#b23a4a] to-[#8e2e3b] text-white font-semibold text-sm shadow-xl"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <UserPlus className="w-4 h-4" />
                    Devenir formateur
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
