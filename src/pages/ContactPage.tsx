import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Clock, Globe } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

const offices = [
  {
    city: "Paris",
    country: "France",
    address: "123 Avenue de l'Innovation",
    zip: "75008",
    phone: "+33 1 23 45 67 89",
    email: "paris@dmplus-group.com"
  },
  {
    city: "Londres",
    country: "Royaume-Uni",
    address: "45 Innovation Street",
    zip: "EC1A 1BB",
    phone: "+44 20 1234 5678",
    email: "london@dmplus-group.com"
  },
  {
    city: "New York",
    country: "États-Unis",
    address: "789 Tech Avenue",
    zip: "NY 10001",
    phone: "+1 212 555 0123",
    email: "nyc@dmplus-group.com"
  }
];

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast({
      title: "Message envoyé !",
      description: "Nous vous répondrons dans les plus brefs délais.",
    });

    setFormData({
      name: "",
      email: "",
      company: "",
      subject: "",
      message: ""
    });
    setIsSubmitting(false);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-primary to-secondary overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }}
          />
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="font-montserrat font-bold text-5xl md:text-6xl text-white mb-6">
              Devenir Formateur
            </h1>
            <p className="text-xl text-white/80">
              Vous êtes un expert dans votre domaine ? Rejoignez notre équipe de formateurs et partagez votre expertise.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-montserrat font-bold text-3xl text-foreground mb-8">
                Postulez pour devenir formateur
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Nom complet *
                    </label>
                    <Input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Votre nom"
                      className="h-12"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Email *
                    </label>
                    <Input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="votre@email.com"
                      className="h-12"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Entreprise
                    </label>
                    <Input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Votre entreprise"
                      className="h-12"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Domaine d'expertise *
                    </label>
                    <Input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Ex: Data Science, Finance, Assurance..."
                      className="h-12"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Votre parcours et motivations *
                  </label>
                  <Textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Décrivez votre expérience, vos spécialités et pourquoi vous souhaitez devenir formateur..."
                    className="min-h-[160px] resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-primary to-primary-light hover:opacity-90 transition-opacity"
                >
                  {isSubmitting ? (
                    "Envoi en cours..."
                  ) : (
                    <>
                      Envoyer ma candidature
                      <Send className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>
              </form>
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-montserrat font-bold text-3xl text-foreground mb-8">
                Pourquoi nous rejoindre ?
              </h2>

              <div className="space-y-6 mb-12">
                <div className="flex items-start gap-4 p-6 rounded-2xl bg-muted/50 border border-border">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Flexibilité</h3>
                    <p className="text-muted-foreground">
                      Choisissez vos horaires et formez des professionnels passionnés
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 rounded-2xl bg-muted/50 border border-border">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Rémunération attractive</h3>
                    <p className="text-muted-foreground">
                      Une rémunération compétitive et des primes de performance
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 rounded-2xl bg-muted/50 border border-border">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Développement continu</h3>
                    <p className="text-muted-foreground">
                      Accès à des formations et à une communauté d'experts
                    </p>
                  </div>
                </div>
              </div>

              {/* World Map Placeholder */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20">
                <div className="flex items-center gap-2 mb-4">
                  <Globe className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-foreground">Impact international</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Rejoignez une communauté de formateurs intervenant dans plus de 15 pays.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Offices */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
              Nos Bureaux
            </span>
            <h2 className="font-montserrat font-bold text-4xl md:text-5xl text-foreground">
              Nos implantations
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {offices.map((office, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="bg-card p-8 rounded-2xl border border-border hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-montserrat font-bold text-xl text-foreground">
                      {office.city}
                    </h3>
                    <p className="text-sm text-muted-foreground">{office.country}</p>
                  </div>
                </div>

                <div className="space-y-3 text-sm">
                  <p className="text-muted-foreground">
                    {office.address}<br />
                    {office.zip}
                  </p>
                  <a href={`tel:${office.phone}`} className="block text-foreground hover:text-primary transition-colors">
                    {office.phone}
                  </a>
                  <a href={`mailto:${office.email}`} className="block text-primary hover:underline">
                    {office.email}
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ContactPage;
