import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { 
  Users, 
  GraduationCap, 
  Briefcase, 
  Star, 
  Award, 
  ArrowRight, 
  CheckCircle2,
  Heart,
  Zap,
  Building2,
  Target,
  ChevronRight,
  Sparkles,
  Globe,
  TrendingUp,
  Calendar,
  MessageCircle,
  FileText,
  User,
  Shield
} from "lucide-react";
import Layout from "@/components/layout/Layout";

const BecomeTrainerPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    expertise: "",
    otherExpertise: "",
    experience: "",
    motivation: "",
    linkedin: "",
    cv: null as File | null
  });

  // Scroll automatique en haut au chargement de la page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, cv: e.target.files![0] }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const benefits = [
    {
      icon: <GraduationCap className="w-5 h-5" />,
      title: "Excellence pédagogique",
      description: "Rejoignez une équipe reconnue pour la qualité de ses formations"
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: "Impact réel",
      description: "Formez des milliers de professionnels"
    },
    {
      icon: <Award className="w-5 h-5" />,
      title: "Reconnaissance",
      description: "Bénéficiez de notre notoriété et réseau"
    },
    {
      icon: <Building2 className="w-5 h-5" />,
      title: "Flexibilité",
      description: "Organisez vos formations selon vos disponibilités"
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Innovation",
      description: "Accédez aux dernières technologies"
    },
    {
      icon: <Heart className="w-5 h-5" />,
      title: "Communauté",
      description: "Intégrez un réseau de formateurs passionnés"
    }
  ];

  const stats = [
    { value: "50+", label: "Formateurs experts", icon: <Users className="w-4 h-4" /> },
    { value: "1000+", label: "Apprenants formés", icon: <GraduationCap className="w-4 h-4" /> },
    { value: "95%", label: "Satisfaction", icon: <Star className="w-4 h-4" /> },
    { value: "20+", label: "Programmes", icon: <FileText className="w-4 h-4" /> }
  ];

  const testimonials = [
    {
      name: "Marie Lambert",
      role: "Formatrice Data Science",
      quote: "Une expérience enrichissante qui m'a permis de partager ma passion tout en continuant à apprendre."
    },
    {
      name: "Thomas Dubois",
      role: "Formateur Finance",
      quote: "L'accompagnement et la communauté sont exceptionnels. Je me sens soutenu à chaque étape."
    }
  ];

  const requirements = [
    "Minimum 5 ans d'expérience professionnelle dans votre domaine",
    "Expérience en formation ou en pédagogie appréciée",
    "Capacité à créer du contenu pédagogique de qualité",
    "Excellentes compétences en communication",
    "Maîtrise des outils digitaux et plateformes en ligne",
    "Engagement pour la réussite des apprenants"
  ];

  return (
    <Layout>
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll {
          animation: scroll 15s linear infinite;
          width: fit-content;
        }
        
        /* Pause l'animation au survol */
        .animate-scroll:hover {
          animation-play-state: paused;
        }
        
        /* Responsive : animation seulement sur mobile */
        @media (min-width: 768px) {
          .animate-scroll {
            animation: none;
          }
        }
      `}</style>
      <div className="min-h-screen bg-white">
        {/* Hero Section avec image de fond */}
        <section className="relative bg-[#800020] min-h-[500px] flex items-center overflow-hidden">
          {/* Image de fond avec overlay */}
          <div className="absolute inset-0">
            <img 
              src="/dmplus-tech.jpg" 
              alt="DM+ Tech" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-[#5f4349] mix-blend-multiply opacity-90" />
          </div>
          
          {/* Contenu hero réduit */}
          <div className="relative container mx-auto px-4 py-8 md:py-16 lg:py-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl pt-8 md:pt-0"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-full mb-4 border border-white/20">
                <Sparkles className="w-4 h-4 text-white" />
                <span className="text-xs font-medium text-white">Rejoignez notre équipe d'experts</span>
              </div>
              
              <h1 className="text-3xl md:text-5xl font-bold mb-4 text-white leading-tight">
                Devenir Formateur
                <span className="block text-2xl md:text-4xl mt-1 text-white/80">
                  Partagez votre expertise
                </span>
              </h1>
              
              <p className="text-base md:text-lg text-white/90 max-w-2xl mb-6 leading-relaxed">
                Transformez votre expertise en opportunités de formation. 
                Formez les talents de demain et développez votre impact professionnel.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <motion.a
                  href="#form"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-[#800020] font-semibold rounded-lg text-sm hover:bg-gray-50 transition-all duration-300 border-2 border-transparent"
                >
                  Postuler maintenant
                  <ArrowRight className="w-4 h-4" />
                </motion.a>
                <motion.a
                  href="#benefits"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-transparent text-white font-semibold rounded-lg text-sm hover:bg-white/10 transition-all duration-300 border-2 border-white/30"
                >
                  Découvrir les avantages
                  <ChevronRight className="w-4 h-4" />
                </motion.a>
              </div>

              {/* Mini stats - défilement automatique sur mobile */}
              <div className="relative mt-6 overflow-hidden">
                <div className="flex gap-3 animate-scroll">
                  {/* Double les stats pour un défilement infini */}
                  {[...stats, ...stats].map((stat, index) => (
                    <div key={index} className="flex items-center gap-1.5 flex-shrink-0">
                      <div className="text-white/80">{stat.icon}</div>
                      <div>
                        <div className="text-white font-bold text-xs">{stat.value}</div>
                        <div className="text-white text-xs leading-tight">{stat.label}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Benefits Section - Plus compact */}
        <section id="benefits" className="py-12 lg:py-16 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <span className="text-xs font-semibold text-[#800020] uppercase tracking-wider">Pourquoi nous rejoindre</span>
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mt-2 mb-3">
                Des avantages exceptionnels
              </h2>
              <p className="text-sm text-gray-600 max-w-2xl mx-auto">
                Découvrez tous les bénéfices à devenir formateur chez DM+ Academy
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="group bg-gray-50 p-5 rounded-xl border border-gray-200 hover:border-[#800020] transition-all duration-300"
                >
                  <div className="w-10 h-10 bg-[#800020] rounded-lg flex items-center justify-center text-white mb-3 group-hover:scale-110 transition-transform duration-300">
                    {benefit.icon}
                  </div>
                  <h3 className="text-base font-bold text-gray-900 mb-1">{benefit.title}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Requirements Section - Plus compact */}
        <section className="py-8 lg:py-12 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
            >
              <div>
                <span className="text-xs font-semibold text-[#800020] uppercase tracking-wider">Nos exigences</span>
                <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
                  Critères de sélection
                </h2>
                <p className="text-sm text-gray-600 mb-5">
                  Nous recherchons des experts passionnés avec une solide expérience.
                </p>
                
                <div className="space-y-2.5">
                  {requirements.map((req, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#800020] flex-shrink-0 mt-0.5" />
                      <span className="text-xs text-gray-700 leading-relaxed">{req}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="bg-[#800020] rounded-xl p-6 text-white border-2 border-[#800020]">
                  <div className="flex items-center gap-2 mb-3">
                    <Target className="w-5 h-5" />
                    <h3 className="text-lg font-bold">Prêt à nous rejoindre ?</h3>
                  </div>
                  <p className="text-white/90 text-xs mb-4 leading-relaxed">
                    Si vous correspondez à ces critères, nous serions ravis de recevoir votre candidature.
                  </p>
                  <motion.a
                    href="#form"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-white text-[#800020] font-semibold rounded-lg text-xs hover:bg-gray-50 transition-all duration-300"
                  >
                    Postuler maintenant
                    <ArrowRight className="w-3 h-3" />
                  </motion.a>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Application Form Section - Version Moderne & Attractif */}
        <section id="form" className="py-12 lg:py-16 bg-gradient-to-br from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto"
            >
              {/* Header attractif avec icônes */}
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#800020] to-[#600018] rounded-2xl mb-4 shadow-lg"
                >
                  <Target className="w-8 h-8 text-white" />
                </motion.div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  Rejoignez l'aventure
                </h2>
                <p className="text-sm text-gray-600 max-w-lg mx-auto">
                  Votre expertise mérite d'être partagée. Devenez formateur et inspirez la prochaine génération.
                </p>
              </div>

              {/* Carte moderne avec dégradé et ombres */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Effet de fond décoratif */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#800020]/5 to-transparent rounded-2xl" />
                
                <div className="relative bg-white rounded-2xl border border-gray-100 shadow-xl overflow-hidden">
                  {/* Barre supérieure décorative */}
                  <div className="h-1 bg-gradient-to-r from-[#800020] via-[#800020] to-[#600018]" />
                  
                  <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {/* Section infos personnelles avec icônes */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-5 h-5 bg-[#800020]/10 rounded-lg flex items-center justify-center">
                          <User className="w-3 h-3 text-[#800020]" />
                        </div>
                        <span className="text-sm font-semibold text-gray-700">Informations personnelles</span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="relative">
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:border-[#800020] focus:bg-white focus:outline-none transition-all duration-300 peer"
                            placeholder=" "
                          />
                          <label className="absolute left-3 -top-2 text-xs text-[#800020] bg-white px-1 transition-all duration-300 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-xs peer-placeholder-shown:top-2.5 peer-placeholder-shown:bg-transparent">
                            Nom complet *
                          </label>
                        </div>
                        <div className="relative">
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:border-[#800020] focus:bg-white focus:outline-none transition-all duration-300 peer"
                            placeholder=" "
                          />
                          <label className="absolute left-3 -top-2 text-xs text-[#800020] bg-white px-1 transition-all duration-300 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-xs peer-placeholder-shown:top-2.5 peer-placeholder-shown:bg-transparent">
                            Email *
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Section profession avec icônes */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-5 h-5 bg-[#800020]/10 rounded-lg flex items-center justify-center">
                          <Briefcase className="w-3 h-3 text-[#800020]" />
                        </div>
                        <span className="text-sm font-semibold text-gray-700">Parcours professionnel</span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="relative">
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:border-[#800020] focus:bg-white focus:outline-none transition-all duration-300 peer"
                            placeholder=" "
                          />
                          <label className="absolute left-3 -top-2 text-xs text-[#800020] bg-white px-1 transition-all duration-300 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-xs peer-placeholder-shown:top-2.5 peer-placeholder-shown:bg-transparent">
                            Téléphone *
                          </label>
                        </div>
                        <div className="relative">
                          <select
                            name="expertise"
                            value={formData.expertise}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:border-[#800020] focus:bg-white focus:outline-none transition-all duration-300 appearance-none cursor-pointer"
                          >
                            <option value="">Domaine d'expertise *</option>
                            <option value="data">Data Science</option>
                            <option value="finance">Finance</option>
                            <option value="digital">Digital</option>
                            <option value="entrepreneurship">Entrepreneuriat</option>
                            <option value="softskills">Soft Skills</option>
                            <option value="other">Autre</option>
                          </select>
                          <ChevronRight className="absolute right-3 top-3 w-4 h-4 text-gray-400 pointer-events-none rotate-90" />
                        </div>
                      </div>
                      
                      {/* Champ "Autre" qui apparaît conditionnellement */}
                      {formData.expertise === "other" && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="relative"
                        >
                          <input
                            type="text"
                            name="otherExpertise"
                            value={formData.otherExpertise}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:border-[#800020] focus:bg-white focus:outline-none transition-all duration-300 peer"
                            placeholder=" "
                          />
                          <label className="absolute left-3 -top-2 text-xs text-[#800020] bg-white px-1 transition-all duration-300 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-xs peer-placeholder-shown:top-2.5 peer-placeholder-shown:bg-transparent">
                            Précisez votre domaine *
                          </label>
                        </motion.div>
                      )}
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="relative">
                          <input
                            type="number"
                            name="experience"
                            value={formData.experience}
                            onChange={handleInputChange}
                            required
                            min="1"
                            className="w-full px-3 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:border-[#800020] focus:bg-white focus:outline-none transition-all duration-300 peer"
                            placeholder=" "
                          />
                          <label className="absolute left-3 -top-2 text-xs text-[#800020] bg-white px-1 transition-all duration-300 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-xs peer-placeholder-shown:top-2.5 peer-placeholder-shown:bg-transparent">
                            Expérience (ans) *
                          </label>
                        </div>
                        <div className="relative">
                          <input
                            type="url"
                            name="linkedin"
                            value={formData.linkedin}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:border-[#800020] focus:bg-white focus:outline-none transition-all duration-300 peer"
                            placeholder=" "
                          />
                          <label className="absolute left-3 -top-2 text-xs text-[#800020] bg-white px-1 transition-all duration-300 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-xs peer-placeholder-shown:top-2.5 peer-placeholder-shown:bg-transparent">
                            LinkedIn
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Section motivation avec design spécial */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-5 h-5 bg-[#800020]/10 rounded-lg flex items-center justify-center">
                          <Heart className="w-3 h-3 text-[#800020]" />
                        </div>
                        <span className="text-sm font-semibold text-gray-700">Votre motivation</span>
                      </div>
                      
                      <div className="relative">
                        <textarea
                          name="motivation"
                          value={formData.motivation}
                          onChange={handleInputChange}
                          required
                          rows={3}
                          className="w-full px-3 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:border-[#800020] focus:bg-white focus:outline-none transition-all duration-300 resize-none peer"
                          placeholder=" "
                        />
                        <label className="absolute left-3 -top-2 text-xs text-[#800020] bg-white px-1 transition-all duration-300 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-xs peer-placeholder-shown:top-2.5 peer-placeholder-shown:bg-transparent">
                          Pourquoi voulez-vous devenir formateur ? *
                        </label>
                      </div>
                    </div>

                    {/* Section CV avec bouton stylé */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-5 h-5 bg-[#800020]/10 rounded-lg flex items-center justify-center">
                          <FileText className="w-3 h-3 text-[#800020]" />
                        </div>
                        <span className="text-sm font-semibold text-gray-700">Documents</span>
                      </div>
                      
                      <div className="relative">
                        <input
                          type="file"
                          name="cv"
                          onChange={handleFileChange}
                          accept=".pdf,.doc,.docx"
                          className="w-full px-3 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:border-[#800020] focus:bg-white focus:outline-none transition-all duration-300 file:mr-3 file:py-1 file:px-2 file:text-xs file:font-medium file:bg-[#800020] file:text-white file:rounded-lg file:border-0"
                        />
                      </div>
                    </div>

                    {/* Bouton d'envoi attractif */}
                    <div className="pt-4">
                      <motion.button
                        whileHover={{ scale: 1.02, boxShadow: "0 10px 25px rgba(128, 0, 32, 0.3)" }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="w-full group relative px-6 py-3 bg-gradient-to-r from-[#800020] to-[#600018] text-white font-semibold rounded-xl transition-all duration-300 overflow-hidden shadow-lg"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-[#600018] to-[#800020] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="relative flex items-center justify-center gap-2">
                          <span className="text-sm">Envoyer ma candidature</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </div>
                      </motion.button>
                      
                      <p className="text-xs text-gray-500 text-center mt-3">
                        <Shield className="w-3 h-3 inline mr-1" />
                        Vos informations sont sécurisées et confidentielles
                      </p>
                    </div>
                  </form>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Footer mini stats */}
        <section className="py-8 bg-white border-t border-gray-200">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-6">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#800020]" />
                <span className="text-xs text-gray-600">Présent dans 15 pays</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#800020]" />
                <span className="text-xs text-gray-600">+40% de croissance annuelle</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#800020]" />
                <span className="text-xs text-gray-600">Formations flexibles</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default BecomeTrainerPage;