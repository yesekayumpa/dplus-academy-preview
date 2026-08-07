import { Link } from "react-router-dom";
import { 
  Linkedin, 
  Twitter, 
  Instagram, 
  Facebook,
  Mail, 
  Phone, 
  MapPin,
  ArrowUpRight
} from "lucide-react";
import { subsidiaries } from "@/data/subsidiaries";
import logo from "@/assets/academy-white.png";
import patternWavyDark from '@/assets/big-wavy-pattern-dark.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative p-4 md:p-1 text-white overflow-hidden">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${patternWavyDark})` }}
      />
      
      {/* Color overlay bordeaux */}
      <div className="absolute inset-0 bg-red-900 opacity-80" />
      
      {/* Main Footer */}
      <div className="relative z-10 container mx-auto px-2 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Colonne marque */}
          <div className="space-y-6 text-sm">
            <div className="flex">
              <a href="/">
                <img src={logo} alt="DM+ Academy" className="w-[200px] h-auto mt-2 object-cover" />
              </a>
            </div>
            <p className="text-white/70 leading-relaxed">
              DM+ Academy — La plateforme de formation professionnelle du groupe DM+.
              Des programmes sur mesure pour accélérer vos compétences et votre carrière.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Linkedin, href: "https://www.linkedin.com/company/digital-mind-plus-group/?viewAsMember=true" },
                { icon: Facebook, href: "https://www.facebook.com/profile.php?id=61575339630057" },
              ].map(({ icon: Icon, href }, idx) => (
                <a
                  key={idx}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-2xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors duration-300"
                >
                  <Icon className="w-5 h-5 text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Nos Entités */}
          <div>
            <h4 className="font-semibold text-white text-lg mb-6">
              Nos Entités
            </h4>
            {/* Mobile : icônes seulement */}
            <div className="flex gap-4 flex-wrap lg:hidden">
              {subsidiaries.map((sub) => (
                <a key={sub.id} href={sub.lien ? sub.lien : "/maintenance"}>
                  <div className="w-12 h-12 rounded-2xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300">
                    <sub.icon className="w-6 h-6 text-white" />
                  </div>
                </a>
              ))}
            </div>
            {/* Desktop : liste texte */}
            <ul className="space-y-3 text-sm hidden lg:block">
              {subsidiaries.map((sub) => (
                <li key={sub.id}>
                  <Link
                    to={sub.lien || `/maintenance`}
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
            <h4 className="font-semibold text-white text-lg mb-6">
              Contact
            </h4>
            <ul className="space-y-4 text-sm">
              <li>
                <a
                  href="mailto:academy@dmplus-group.com"
                  className="flex items-center gap-3 text-white/70 hover:text-white transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  academy@dmplus-group.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+22133829587"
                  className="flex items-center gap-3 text-white/70 hover:text-white transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  +221 33 829 58 79
                </a>
              </li>
              <li>
                <a
                  href="tel:+221766638219"
                  className="flex items-center gap-3 text-white/70 hover:text-white transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  +221 76 663 82 19
                </a>
              </li>
              <li className="flex items-start gap-3 text-white/70">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>
                  Medina Rue 37x24,<br />
                  Dakar, Sénégal
                </span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-10 border-t border-white/10">
        <div className="container mx-auto px-4 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/60 text-xs md:text-sm leading-relaxed">
              © {currentYear} DM+ Academy. Tous droits réservés.
            </p>
            <div className="flex items-center gap-6 text-xs md:text-sm">
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
