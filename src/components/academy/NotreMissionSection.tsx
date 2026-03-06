const NotreMissionSection = () => {
  return (
   <section className="py-2 md:py-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/5" />
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Notre mission
          </h2>
          {/* Image + Card wrapper */}
          <div className="relative flex flex-col lg:flex-row items-center">
            {/* Image */}
            <div className="relative w-auto h-[400px] rounded-2xl overflow-hidden">
              <img
                src="/assets/dmplus-tech.webp"
                alt="DM+ Tech - Innovation technologique"
                className="h-full w-auto rounded-2xl object-cover scale-x-100"
              />
            </div>

            {/* Card */}
            <div
              className="relative lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 
                      max-w-xl bg-background/90 backdrop-blur-sm 
                      rounded-2xl p-8 md:p-10 shadow-lg border border-border/30
                      mt-8 lg:mt-0"
            >
              <h3 className="text-xl md:text-2xl font-bold mb-4">
                Renforcer les capacités par la technologie
              </h3>

              <span className="text-primary text-6xl leading-none">“</span>

              <p className="text-muted-foreground leading-relaxed mt-2">
                Renforcer les capacités individuelles et collectives à travers
                des formations pratiques et des parcours d'apprentissage sur
                mesure, conçus pour répondre aux besoins réels du marché.
              </p>
            </div>
          </div>
        </div>
    </section>
  )
}

export default NotreMissionSection