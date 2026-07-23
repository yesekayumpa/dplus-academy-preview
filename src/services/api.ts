/**
 * URL de base de l'API backend.
 * Utilise la variable d'environnement VITE_API_URL ou l'URL de production par défaut.
 * Nettoie le slash final s'il existe.
 */
const apiUrl = import.meta.env.VITE_API_URL || 'https://dmplus-academy-back.onrender.com/';
export const baseUrl = apiUrl.endsWith('/') ? apiUrl.slice(0, -1) : apiUrl;
