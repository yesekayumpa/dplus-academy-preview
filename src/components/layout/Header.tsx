import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { subsidiaries } from "@/data/subsidiaries";
import { cn } from "@/lib/utils";
import logo from "@/assets/academy-white.png";
import logo2 from "@/assets/LOGOTYPE [Récupéré]-18.png";

const formats = [
  {
    id: 1,
    label: "Masterclass",
    href: "/masterclasses",
    description: "Sessions intensives avec des experts",
  },
  {
    id: 2,
    label: "E-learning",
    href: "/e-learning",
    description: "Apprentissage flexible en ligne",
  },
  {
    id: 3,
    label: "Mentored Courses",
    href: "/sur-mesure",
    description: "Formations personnalisées",
  },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSubsidiariesOpen, setIsSubsidiariesOpen] = useState(false);
  const [isFormatsOpen, setIsFormatsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSubsidiariesOpen(false);
    setIsFormatsOpen(false);
  }, [location]);

  const navItems = [
    { label: "Masterclass", href: "/masterclasses", hasDropdown: false },
    { label: "E-learning", href: "/e-learning", hasDropdown: false },
    { label: "Mentored Courses", href: "/sur-mesure", hasDropdown: false },
    { label: "Corporate", href: "/corporate-programs", hasDropdown: false },
    { label: "Nos formateurs", href: "/nos-formateurs", hasDropdown: false },
  ];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 
      bg-white/90 backdrop-blur-xl shadow-sm py-3"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <a href="/">
            <img src={logo2} alt="DM+ Group" className="h-10 w-auto" />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div key={item.label} className="relative">
                <Link
                  to={item.href}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 
                  ${location.pathname === item.href 
                    ? 'bg-academy/20 text-academy shadow-sm' 
                    : 'text-foreground hover:bg-gray-100'
                  }`}
                >
                  {item.label}
                </Link>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Link
              to="/devenir-formateur"
              className="px-6 py-3 rounded-3xl transition-all duration-300 bg-gradient-to-tr from-primary to-primary-light text-white"
            >
              Devenir formateur
            </Link>
            <Link
              to="/nous-contacter"
              className="mx-2 px-6 py-3 rounded-3xl transition-all duration-300 
                bg-white text-primary border border-primary"
            >
              Nous contacter
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X
                className="w-6 h-6 text-black"
              />
            ) : (
              <Menu
                className="w-6 h-6 text-black"
              />
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
              transition={{ duration: 0.3 }}
              className="lg:hidden mt-4 bg-white rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="p-4 space-y-2">
                {navItems.map((item) => (
                  <div key={item.label}>
                    <Link
                      to={item.href}
                      className={`block px-4 py-3 rounded-xl transition-colors
                        ${location.pathname === item.href 
                          ? 'bg-academy/10 text-academy' 
                          : 'text-black hover:bg-gray-100'
                        }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </div>
                ))}
                <Link
                  to="/devenir-formateur"
                  className="block w-full px-4 py-3 rounded-xl bg-gradient-to-tr from-primary to-primary-light text-white text-center font-semibold mt-4"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Devenir formateur
                </Link>
                <Link
                  to="/nous-contacter"
                  className="block w-full px-4 py-3 rounded-xl bg-white text-primary border border-primary text-center font-semibold mt-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Nous contacter
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
