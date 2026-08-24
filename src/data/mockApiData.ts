import { Formation, Formateur, FormatPedagogique, Categorie, Tag, Competence } from '@/types/api';

export const formatLive: FormatPedagogique = {
  id: 1, titre: 'Formation Live', description: 'Formation en direct avec formateur',
  imageUrl: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=400', slug: 'formation-live', active: true,
};

export const formatElearning: FormatPedagogique = {
  id: 2, titre: 'E-learning', description: 'Apprentissage en ligne à votre rythme',
  imageUrl: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=400', slug: 'e-learning', active: true,
};

export const formatMentored: FormatPedagogique = {
  id: 3, titre: 'Mentored Courses', description: 'Cours avec mentorat personnalisé',
  imageUrl: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=400', slug: 'mentored-courses', active: true,
};

export const formatCorporate: FormatPedagogique = {
  id: 4, titre: 'Corporate', description: 'Formation pour entreprises',
  imageUrl: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=400', slug: 'corporate-programs', active: true,
};

export const mockFormats: FormatPedagogique[] = [formatLive, formatElearning, formatMentored, formatCorporate];

export const mockCategorie: Categorie = {
  id: 1,
  libelle: 'Développement Web',
  active: true,
};

export const mockCategories: Categorie[] = [mockCategorie];

export const mockTags: Tag[] = [
  { id: 1, titre: 'React', description: 'React JS', active: true },
  { id: 2, titre: 'TypeScript', description: 'TypeScript', active: true },
];

export const mockCompetences: Competence[] = [
  { id: 1, code: 'WEB-001', titre: 'Frontend Development', description: 'Dev frontend', active: true },
];

export const mockFormateurs: Formateur[] = [
  {
    id: 1, nomComplet: 'Jean Dupont', titre: 'Expert React', numero: '+33600000000',
    imageUrl: 'https://randomuser.me/api/portraits/men/32.jpg', competences: mockCompetences, isActive: true,
  },
  {
    id: 2, nomComplet: 'Marie Martin', titre: 'Senior Backend Developer', numero: '+33600000001',
    imageUrl: 'https://randomuser.me/api/portraits/women/44.jpg', competences: mockCompetences, isActive: true,
  }
];

const baseFormation: Partial<Formation> = {
  imageUrl: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=400',
  niveau: 'INTERMEDIAIRE',
  statut: 'EN_COURS',
  categorie: mockCategorie,
  tags: mockTags,
  competences: mockCompetences,
  cout: 50000,
  capacite: 20,
  dureeJours: 30,
  isActive: true,
};

export const mockFormations: Formation[] = [
  // E-learning (4)
  { ...baseFormation, id: 1, titre: 'E-learning Node.js', sousTitre: 'Apprendre à son rythme', format: formatElearning, formateur: mockFormateurs[1] } as Formation,
  { ...baseFormation, id: 2, titre: 'E-learning React Adv', sousTitre: 'Avancé', format: formatElearning, formateur: mockFormateurs[0] } as Formation,
  { ...baseFormation, id: 3, titre: 'E-learning Python', sousTitre: 'Bases de la Data Science', format: formatElearning, formateur: mockFormateurs[1] } as Formation,
  { ...baseFormation, id: 4, titre: 'E-learning UX/UI', sousTitre: 'Design d\'interfaces', format: formatElearning, formateur: mockFormateurs[0] } as Formation,

  // Mentored Courses (4)
  { ...baseFormation, id: 5, titre: 'Mentorat Fullstack', sousTitre: 'Avec mentor dédié', format: formatMentored, formateur: mockFormateurs[0] } as Formation,
  { ...baseFormation, id: 6, titre: 'Mentorat Data Science', sousTitre: 'Expertise Machine Learning', format: formatMentored, formateur: mockFormateurs[1] } as Formation,
  { ...baseFormation, id: 7, titre: 'Mentorat DevOps', sousTitre: 'CI/CD et Cloud', format: formatMentored, formateur: mockFormateurs[0] } as Formation,
  { ...baseFormation, id: 8, titre: 'Mentorat Sécurité', sousTitre: 'Cybersécurité avancée', format: formatMentored, formateur: mockFormateurs[1] } as Formation,

  // Corporate (4)
  { ...baseFormation, id: 9, titre: 'B2B Corporate Angular', sousTitre: 'Pour les équipes', format: formatCorporate, formateur: mockFormateurs[1] } as Formation,
  { ...baseFormation, id: 10, titre: 'Agile & Scrum B2B', sousTitre: 'Gestion de projet', format: formatCorporate, formateur: mockFormateurs[0] } as Formation,
  { ...baseFormation, id: 11, titre: 'Cloud Architecture B2B', sousTitre: 'AWS & Azure', format: formatCorporate, formateur: mockFormateurs[1] } as Formation,
  { ...baseFormation, id: 12, titre: 'Management IT B2B', sousTitre: 'Leadership technique', format: formatCorporate, formateur: mockFormateurs[0] } as Formation,

  // Live / Masterclass (4)
  { ...baseFormation, id: 13, titre: 'Masterclass React', sousTitre: 'React Live', format: formatLive, formateur: mockFormateurs[0] } as Formation,
  { ...baseFormation, id: 14, titre: 'Live Vue.js', sousTitre: 'Les fondamentaux', format: formatLive, formateur: mockFormateurs[1] } as Formation,
  { ...baseFormation, id: 15, titre: 'Live Docker', sousTitre: 'Conteneurisation', format: formatLive, formateur: mockFormateurs[0] } as Formation,
  { ...baseFormation, id: 16, titre: 'Masterclass SEO', sousTitre: 'Marketing Digital', format: formatLive, formateur: mockFormateurs[1] } as Formation,
];
