import Layout from "@/components/layout/Layout";
import { useFormatsPedagogiques } from "@/hooks/useFormatsPedagogiques";

const FormatsPage = () => {
  const { data: formats, isLoading, isError } = useFormatsPedagogiques();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8">Nos Formats Pédagogiques</h1>
        <p className="text-lg text-muted-foreground mb-12">
          Nous proposons différents formats d'apprentissage adaptés à vos besoins et votre emploi du temps.
        </p>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-academy"></div>
          </div>
        ) : isError ? (
          <div className="text-center py-8 text-red-500">
            Une erreur est survenue lors du chargement des formats pédagogiques.
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {formats?.map((format) => (
              <div key={format.id} className="bg-card p-4 rounded-xl flex flex-col">
                {/* Fallback temporaire en cas d'absence d'image valide, ou utilisation de l'image de l'API */}
                {format.imageUrl && (
                  <div className="mb-4 h-48 rounded-lg overflow-hidden flex items-center justify-center bg-gray-100">
                    <img 
                      src={format.imageUrl} 
                      alt={format.titre} 
                      className="max-h-full object-cover"
                      onError={(e) => {
                        // Image de secours si l'URL ne fonctionne pas
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop&crop=center";
                      }}
                    />
                  </div>
                )}
                <h2 className="text-xl font-semibold mb-3">{format.titre}</h2>
                <p className="text-sm text-muted-foreground mb-3 flex-grow">
                  {format.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default FormatsPage;
