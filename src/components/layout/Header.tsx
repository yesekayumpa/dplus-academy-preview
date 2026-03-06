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
    label: "Sur mesure",
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
    { label: "Masterclass", href: "/masterclasses" },
    { label: "E-learning", href: "/e-learning" },
    { label: "Sur mesure", href: "/sur-mesure" },
    { label: "Nos formateurs", href: "/nos-formateurs" },
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
                    onMouseEnter={() => {
                      if (item.label === "Nos formations") {
                        setIsSubsidiariesOpen(true);
                      } else if (item.label === "Nos formats pédagogiques") {
                        setIsFormatsOpen(true);
                      }
                    }}
                    onMouseLeave={() => {
                      if (item.label === "Nos formations") {
                        setIsSubsidiariesOpen(false);
                      } else if (item.label === "Nos formats pédagogiques") {
                        setIsFormatsOpen(false);
                      }
                    }}
                  >
                    <button
                      className="flex items-center gap-1 px-4 py-2 rounded-lg font-medium 
                      transition-all duration-300 text-foreground hover:bg-muted"
                    >
                      {item.label}
                      <ChevronDown
                        className={cn(
                          "w-4 h-4 transition-transform duration-300",
                          (item.label === "Nos formations" &&
                            isSubsidiariesOpen) ||
                            (item.label === "Nos formats pédagogiques" &&
                              isFormatsOpen)
                            ? "rotate-180"
                            : "",
                        )}
                      />
                    </button>

                    <AnimatePresence>
                      {((item.label === "Nos formations" &&
                        isSubsidiariesOpen) ||
                        (item.label === "Nos formats pédagogiques" &&
                          isFormatsOpen)) && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className={`absolute top-full left-0 mt-2 w-80 ${isScrolled ? "bg-white" : "bg-white/5"} backdrop-blur-md 
                          rounded-xl shadow-2xl overflow-hidden transition-all duration-200`}
                        >
                          <div className="px-2 py-3">
                            {item.label === "Nos formations"
                              ? subsidiaries.map((sub) => {
                                  const Icon = sub.icon;
                                  return (
                                    <Link
                                      key={sub.id}
                                      to={`/filiale/${sub.slug}`}
                                      className={`flex items-center gap-3 p-1 rounded-xl 
                                    hover:bg-white/5 transition-all duration-200 ${isScrolled ? "text-black" : "text-white"}`}
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
                                })
                              : formats.map((format) => (
                                  <Link
                                    key={format.id}
                                    to={format.href}
                                    className={`group flex items-center gap-3 p-3 rounded-xl 
                                  transition-all duration-300 transform hover:scale-105 hover:shadow-lg
                                  ${isScrolled ? "text-black hover:bg-primary/10" : "text-white hover:bg-white/10"}`}
                                  >
                                    <div
                                      className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300
                                    ${isScrolled ? "bg-primary/10 group-hover:bg-primary/20" : "bg-white/10 group-hover:bg-white/20"}`}
                                    >
                                      <div className="w-5 h-5 bg-primary rounded transition-all duration-300 group-hover:scale-110"></div>
                                    </div>
                                    <div className="flex-1">
                                      <div className="font-medium transition-colors group-hover:text-primary">
                                        {format.label}
                                      </div>
                                      <div
                                        className={`text-xs line-clamp-1 transition-opacity duration-300
                                      ${isScrolled ? "text-gray-600" : "text-white/70"}`}
                                      >
                                        {format.description}
                                      </div>
                                    </div>
                                    <div
                                      className={`w-2 h-2 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100
                                    ${isScrolled ? "bg-primary" : "bg-white"}`}
                                    ></div>
                                  </Link>
                                ))}
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
                className={cn(
                  "w-6 h-6",
                  isScrolled ? "text-foreground" : "text-white",
                )}
              />
            ) : (
              <Menu
                className={cn(
                  "w-6 h-6",
                  isScrolled ? "text-foreground" : "text-white",
                )}
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
                    {item.hasDropdown ? (
                      <div className="space-y-2">
                        <button
                          onClick={() => {
                            if (item.label === "Nos formations") {
                              setIsSubsidiariesOpen(!isSubsidiariesOpen);
                            } else if (
                              item.label === "Nos formats pédagogiques"
                            ) {
                              setIsFormatsOpen(!isFormatsOpen);
                            }
                          }}
                          className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-foreground hover:bg-muted transition-colors"
                        >
                          {item.label}
                          <ChevronDown
                            className={cn(
                              "w-4 h-4 transition-transform duration-300",
                              (item.label === "Nos formations" &&
                                isSubsidiariesOpen) ||
                                (item.label === "Nos formats pédagogiques" &&
                                  isFormatsOpen)
                                ? "rotate-180"
                                : "",
                            )}
                          />
                        </button>
                        <AnimatePresence>
                          {((item.label === "Nos formations" &&
                            isSubsidiariesOpen) ||
                            (item.label === "Nos formats pédagogiques" &&
                              isFormatsOpen)) && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="pl-4 space-y-1"
                            >
                              {item.label === "Nos formations"
                                ? subsidiaries.map((sub) => {
                                    const Icon = sub.icon;
                                    return (
                                      <Link
                                        key={sub.id}
                                        to={`/filiale/${sub.slug}`}
                                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-colors"
                                      >
                                        <div
                                          className={cn(
                                            "w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br",
                                            sub.gradientClass,
                                          )}
                                        >
                                          <Icon className="w-4 h-4 text-white" />
                                        </div>
                                        <span className="text-sm font-medium">
                                          {sub.shortName}
                                        </span>
                                      </Link>
                                    );
                                  })
                                : formats.map((format) => (
                                    <Link
                                      key={format.id}
                                      to={format.href}
                                      className="group flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-all duration-300 transform hover:scale-105 hover:shadow-md"
                                    >
                                      <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-primary/10 group-hover:bg-primary/20 transition-all duration-300">
                                        <div className="w-4 h-4 bg-primary rounded transition-all duration-300 group-hover:scale-110"></div>
                                      </div>
                                      <div className="flex-1">
                                        <span className="text-sm font-medium group-hover:text-primary transition-colors">
                                          {format.label}
                                        </span>
                                        <div className="text-xs text-muted-foreground group-hover:text-primary/70 transition-colors">
                                          {format.description}
                                        </div>
                                      </div>
                                      <div className="w-2 h-2 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                                    </Link>
                                  ))}
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
                  to="/nous-contacter"
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
