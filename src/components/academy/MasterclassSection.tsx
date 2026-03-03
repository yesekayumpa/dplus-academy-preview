import { MasterclassCarousel } from "./CoursesCarousel"
import { MasterclassCardData } from "./MasterclassCards"
import course from "@/assets/woman-sitting-library-with-her-laptop.jpg"

const MasterclassSection = () => {
    const masterclassData: MasterclassCardData[] = [
    {
        id: "1",
        title: "Maitriser n8n pour creer des Agents IA & Automatisations",
        instructor: "Armel Ngando",
        image: course,
        rating: 4.6,
        reviewCount: 22,
        currentPrice: "6 500 FCFA",
        originalPrice: "12 000 FCFA",
        isBestseller: true,
        isCertified: true,
        isPrensential: true,
    },
    {
        id: "2",
        title: "Formation n8n Complete en Francais — POUR DEBUTANTS",
        instructor: "Digital Innovation | Les Experts",
        image: course,
        rating: 4.5,
        reviewCount: 12,
        currentPrice: "6 500 FCFA",
        originalPrice: "12 000 FCFA",
        isBestseller: false,
        isPrensential: false,
    },
    {
        id: "3",
        title: "n8n : Creer des videos IA Veo3 et auto-post TikTok, Insta...",
        instructor: "Digital Innovation | Les Experts",
        image: course,
        rating: 4.4,
        reviewCount: 21,
        currentPrice: "6 500 FCFA",
        originalPrice: "12 000 FCFA",
        isBestseller: false,
        isPrensential: false,
    },
    {
        id: "4",
        title: "Cours n8n : Automatisez WhatsApp et SMS avec une IA (24/7)",
        instructor: "Digital Innovation | Les Experts",
        image: course,
        rating: 4.8,
        reviewCount: 14,
        currentPrice: "6 500 FCFA",
        originalPrice: "12 000 FCFA",
        isBestseller: true,
        isPrensential: false,
        isFollowed: true,
    },
    {
        id: "5",
        title: "Automatisation avancee avec n8n et OpenAI",
        instructor: "Armel Ngando",
        image: course,
        rating: 4.7,
        reviewCount: 8,
        currentPrice: "6 500 FCFA",
        originalPrice: "12 000 FCFA",
        isBestseller: false,
        isPrensential: false,
    },
    {
        id: "6",
        title: "Decouvrir les workflows n8n pour le marketing digital",
        instructor: "Digital Innovation | Les Experts",
        image: course,
        rating: 4.3,
        reviewCount: 19,
        currentPrice: "6 500 FCFA",
        originalPrice: "12 000 FCFA",
        isBestseller: false,
        isPrensential: true,
    },]

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="mb-6 text-2xl font-bold text-foreground">
        Cours populaires
      </h2>
      <MasterclassCarousel data={masterclassData} />
    </div>
  )
}

export default MasterclassSection