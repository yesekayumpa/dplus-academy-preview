import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { subsidiaries } from "@/data/subsidiaries";
import { cn } from "@/lib/utils";
import logo from "@/assets/academy-white.png";
import logo2 from "@/assets/LOGOTYPE [Récupéré]-18.png";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSubsidiariesOpen, setIsSubsidiariesOpen] = useState(false);
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
  }, [location]);

  const navItems = [
    { label: "Accueil", href: "/#groupe" },
    { label: "Nos formations", href: "/#filiales", hasDropdown: true },
    { label: "Nos formateurs", href: "/#formateurs" },
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
                {item.hasDropdown ? (
                  <div
                    className="relative"
                    onMouseEnter={() => setIsSubsidiariesOpen(true)}
                    onMouseLeave={() => setIsSubsidiariesOpen(false)}
                  >
                    <button
                      className="flex items-center gap-1 px-4 py-2 rounded-lg font-medium 
                      transition-all duration-300 text-foreground hover:bg-muted"
                    >
                      {item.label}
                      <ChevronDown className={cn(
                        "w-4 h-4 transition-transform duration-300",
                        isSubsidiariesOpen && "rotate-180"
                      )} />
                    </button>

                    <AnimatePresence>
                      {isSubsidiariesOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className={`absolute top-full left-0 mt-2 w-80 ${isScrolled ? 'bg-white' : 'bg-white/5'} backdrop-blur-md 
                          rounded-xl shadow-2xl overflow-hidden transition-all duration-200`}
                        >
                          <div className="px-2 py-3">
                            {subsidiaries.map((sub) => {
                              const Icon = sub.icon;
                              return (
                                <Link
                                  key={sub.id}
                                  to={`/filiale/${sub.slug}`}
                                  className={`flex items-center gap-3 p-1 rounded-xl 
                                  hover:bg-white/5 transition-all duration-200 ${isScrolled ? 'text-black' : 'text-white'}`}
                                >
                                  <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                                    <Icon className="w-5 h-5 8" />
                                  </div>
                                  <div>
                                    <div className="font-medium transition-colors">
                                      {sub.shortName}
                                    </div>
                                    <div className="text-xs line-clamp-1">
                                      {sub.services[0]}
                                    </div>
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    to={item.href}
                    className="px-4 py-2 rounded-lg font-medium transition-all duration-300 
                    text-foreground hover:bg-muted"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Link
              to="/contact"
              className=
                "px-6 py-3 rounded-3xl transition-all duration-300 bg-gradient-to-tr from-primary to-primary-light text-white"
                  
            >
              Devenir formateur
            </Link>
            <Link
              to="/contact"
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
              <X className={cn("w-6 h-6", isScrolled ? "text-foreground" : "text-white")} />
            ) : (
              <Menu className={cn("w-6 h-6", isScrolled ? "text-foreground" : "text-white")} />
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
                    {item.hasDropdown ? (
                      <div className="space-y-2">
                        <button
                          onClick={() => setIsSubsidiariesOpen(!isSubsidiariesOpen)}
                          className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-foreground hover:bg-muted transition-colors"
                        >
                          {item.label}
                          <ChevronDown className={cn(
                            "w-4 h-4 transition-transform duration-300",
                            isSubsidiariesOpen && "rotate-180"
                          )} />
                        </button>
                        <AnimatePresence>
                          {isSubsidiariesOpen && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="pl-4 space-y-1"
                            >
                              {subsidiaries.map((sub) => {
                                const Icon = sub.icon;
                                return (
                                  <Link
                                    key={sub.id}
                                    to={`/filiale/${sub.slug}`}
                                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-colors"
                                  >
                                    <div className={cn(
                                      "w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br",
                                      sub.gradientClass
                                    )}>
                                      <Icon className="w-4 h-4 text-white" />
                                    </div>
                                    <span className="text-sm font-medium">{sub.shortName}</span>
                                  </Link>
                                );
                              })}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        to={item.href}
                        className="block px-4 py-3 rounded-xl text-foreground hover:bg-muted transition-colors"
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                ))}
                <Link
                  to="/contact"
                  className="block w-full px-4 py-3 rounded-xl bg-primary text-primary-foreground text-center font-semibold mt-4"
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
