import os

directories = [os.path.normpath(d) for d in ["src/pages", "src/components/academy", "src/components"]]

for root, _, files in os.walk("."):
    # Normalize root path to check prefix correctly
    norm_root = os.path.normpath(root)
    if not any(norm_root.startswith(d) or norm_root.startswith(os.path.join(".", d)) for d in directories):
        continue
    for file in files:
        if not file.endswith(".tsx"): continue
        path = os.path.join(root, file)
        with open(path, "r", encoding="utf-8") as f:
            content = f.read()

        new_content = content
        # Fix min-min-h
        new_content = new_content.replace("min-min-h-", "min-h-")

        # SurMesurePage.tsx
        new_content = new_content.replace(
            '<div className="relative overflow-hidden bg-gradient-to-br from-[#46181e] via-[#6a232d] to-[#8e2e3b]">',
            '<div className="relative overflow-hidden bg-gradient-to-br from-[#46181e] via-[#6a232d] to-[#8e2e3b] pt-32 pb-20">'
        )
        
        # SurMesurePage_Old.tsx
        new_content = new_content.replace(
            '<div className="relative overflow-hidden">',
            '<div className="relative overflow-hidden pt-32 pb-20">'
        )
        
        # TrainersPage.tsx (already has pt-32 pb-24 px-4 bg-[#46181e], change to pb-20 for consistency?)
        new_content = new_content.replace(
            'pt-32 pb-24 px-4 bg-[#46181e]',
            'pt-32 pb-20 px-4 bg-[#46181e]'
        )

        # ContactPage.tsx
        new_content = new_content.replace(
            '<section className="relative min-h-[400px] flex items-center justify-center overflow-hidden">',
            '<section className="relative min-h-[400px] flex items-center justify-center overflow-hidden pt-32 pb-20">'
        )

        # SurmesureDetailPage.tsx
        new_content = new_content.replace(
            '<div className="relative min-h-56 sm:min-h-64 overflow-hidden">',
            '<div className="relative min-h-56 sm:min-h-64 overflow-hidden pt-32 pb-20">'
        )

        # src/components/academy/HeroSection.tsx (bg-background pt-12 -> pt-32 pb-20)
        new_content = new_content.replace(
            '<section ref={ref} className="relative overflow-hidden bg-background pt-12 pb-20">',
            '<section ref={ref} className="relative overflow-hidden bg-background pt-32 pb-20">'
        )
        new_content = new_content.replace(
            '<section ref={ref} className="relative overflow-hidden bg-background pt-12">',
            '<section ref={ref} className="relative overflow-hidden bg-background pt-32 pb-20">'
        )
        
        new_content = new_content.replace(
            'pt-32 pb-20 pb-20',
            'pt-32 pb-20'
        )
        
        new_content = new_content.replace(
            'pt-32 pb-20 sm:pt-32 sm:pb-20 md:pt-32 md:pb-20 pb-20',
            'pt-32 pb-20 sm:pt-32 sm:pb-20 md:pt-32 md:pb-20'
        )
        
        if content != new_content:
            with open(path, "w", encoding="utf-8") as f:
                f.write(new_content)
            print(f"Fixed {path}")

