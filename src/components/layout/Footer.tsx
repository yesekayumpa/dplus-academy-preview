import { Link } from "react-router-dom";
import { 
  Linkedin, 
  Twitter, 
  Instagram, 
  Mail, 
  Phone, 
  MapPin,
  ArrowUpRight
} from "lucide-react";
import { subsidiaries } from "@/data/subsidiaries";
import logo from "@/assets/academy-white.png";
import patternWavyDark from '@/assets/big-wavy-pattern-dark.png';

const academyItems = [
  { id: 1, name: "Accueil", slug: "home" },
  { id: 2, name: "Nos formations", slug: "about" },
  { id: 3, name: "Voir les masterclass", slug: "trainings" },
  { id: 4, name: "Nos formateurs", slug: "blog" },
  { id: 5, name: "Devenir formateur", slug: "contact" },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative p-10 text-white overflow-hidden">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${patternWavyDark})` }}
      />
            {/* Color overlay */}
      <div className="absolute inset-0 bg-slate-900 opacity-80" />

      {/* Main Footer */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="space-y-6 text-sm">
            <div className="flex items-center gap-3">
               <a href="/">
                    <img src={logo} alt="DM+ Group" className="h-10 w-auto" />
                </a>
            </div>
            <p className="text-white/70 leading-relaxed">
              L'Excellence Multi-Domaine. Un groupe innovant fédérant 8 entités 
              spécialisées pour des solutions complètes et intégrées.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Linkedin, href: "#" },
                { icon: Twitter, href: "#" },
                { icon: Instagram, href: "#" },
              ].map(({ icon: Icon, href }, idx) => (
                <a
                  key={idx}
                  href={href}
                  className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors duration-300"
                >
                  <Icon className="w-5 h-5 text-white" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-montserrat font-semibold text-white text-lg mb-6">
              DM+ Academy
            </h4>
            <ul className="space-y-3 text-sm">
              {academyItems.map((sub) => (
                <li key={sub.id}>
                  <Link
                    to={`#${sub.slug}`}
                    className="text-white/70 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                  >
                    {sub.name}
                    <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>


          {/* Nos Filiales */}
          <div>
            <h4 className="font-montserrat font-semibold text-white text-lg mb-6">
              Nos Entités
            </h4>
            <ul className="space-y-3 text-sm">
              {subsidiaries.map((sub) => (
                <li key={sub.id}>
                  <Link
                    to={`/filiale/${sub.slug}`}
                    className="text-white/70 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                  >
                    {sub.name}
                    <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-montserrat font-semibold text-white text-lg mb-6">
              Contact
            </h4>
            <ul className="space-y-4 text-sm">
              <li>
                <a
                  href="mailto:contact@dmplus-group.com"
                  className="flex items-center gap-3 text-white/70 hover:text-white transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  contact@dmplus-group.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+33123456789"
                  className="flex items-center gap-3 text-white/70 hover:text-white transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  +33 1 23 45 67 89
                </a>
              </li>
              <li className="flex items-start gap-3 text-white/70">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>
                  123 Avenue de l'Innovation<br />
                  75008 Paris, France
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/60 text-sm">
              © {currentYear} DM+ Group. Tous droits réservés.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <Link to="/mentions-legales" className="text-white/60 hover:text-white transition-colors">
                Mentions légales
              </Link>
              <Link to="/confidentialite" className="text-white/60 hover:text-white transition-colors">
                Politique de confidentialité
              </Link>
              <Link to="/cookies" className="text-white/60 hover:text-white transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
