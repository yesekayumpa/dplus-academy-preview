import Layout from "@/components/layout/Layout";

const FormatsPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8">Nos Formats Pédagogiques</h1>
        <p className="text-lg text-muted-foreground mb-12">
          Nous proposons différents formats d'apprentissage adaptés à vos besoins et votre emploi du temps.
        </p>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-card p-4 rounded-xl">
            <h2 className="text-xl font-semibold mb-3">Masterclass</h2>
            <p className="text-sm text-muted-foreground mb-3">
              Des sessions intensives avec des experts pour maîtriser rapidement des compétences spécifiques.
            </p>
            <ul className="space-y-1 text-xs text-muted-foreground">
              <li>• Sessions de 3-4 heures</li>
              <li>• Experts de l'industrie</li>
              <li>• Pratique intensive</li>
              <li>• Certification incluse</li>
            </ul>
          </div>
          
          <div className="bg-card p-4 rounded-xl">
            <h2 className="text-xl font-semibold mb-3">E-learning</h2>
            <p className="text-sm text-muted-foreground mb-3">
              Apprenez à votre rythme avec nos cours en ligne interactifs et flexibles.
            </p>
            <ul className="space-y-1 text-xs text-muted-foreground">
              <li>• Accès 24/7</li>
              <li>• Progression autonome</li>
              <li>• Vidéos et exercices</li>
              <li>• Support en ligne</li>
            </ul>
          </div>
          
          <div className="bg-card p-4 rounded-xl">
            <h2 className="text-xl font-semibold mb-3">Sur mesure</h2>
            <p className="text-sm text-muted-foreground mb-3">
              Des formations personnalisées conçues spécifiquement pour vos besoins professionnels.
            </p>
            <ul className="space-y-1 text-xs text-muted-foreground">
              <li>• Contenu adapté</li>
              <li>• En entreprise ou distanciel</li>
              <li>• Planning flexible</li>
              <li>• Suivi personnalisé</li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FormatsPage;
