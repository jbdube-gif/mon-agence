// Liste des clients affichés sur /clients, dans l'ordre d'affichage.
// - service : le service acheté (colonne du centre, desktop seulement)
// - descripteur : 7 lettres ou moins, affiché à droite (ex. VETS)
// - url : site du client. Sans url, la tuile n'a pas de bouton « Visiter ».
// - photo / logo : chemins dans /public. Temporaires pour l'instant.

export type Client = {
  nom: string;
  service: string | null;
  descripteur: string | null;
  url: string | null;
  photo: string;
  logo: string;
};

const PHOTO_TEMP = "/clients/photo-temporaire.webp";
const LOGO_TEMP = "/clients/logo-temporaire.webp";

export const CLIENTS: Client[] = [
  { nom: "Infopresse", service: "Formation IA en entreprise", descripteur: "I.A.", url: "https://www.infopresse.com", photo: PHOTO_TEMP, logo: LOGO_TEMP },
  { nom: "Novavet", service: "Stratégie de commercialisation", descripteur: "VETS", url: "https://novavet.com", photo: PHOTO_TEMP, logo: LOGO_TEMP },
  { nom: "FSA Ulaval", service: "Enseignement marketing et IA", descripteur: "UNI", url: "https://www.fsa.ulaval.ca", photo: PHOTO_TEMP, logo: LOGO_TEMP },
  { nom: "Livesnap", service: "Go-to-market et veille concurrentielle", descripteur: "TECH", url: "https://www.livesnap.com", photo: PHOTO_TEMP, logo: LOGO_TEMP },
  { nom: "Bonneau d'érable", service: "Nouveau positionnement de marque", descripteur: "FOOD", url: null, photo: PHOTO_TEMP, logo: LOGO_TEMP },
  { nom: "GoRH / Humanify", service: "Marketing et croissance fractionnels", descripteur: "RH", url: "https://gorh.co", photo: PHOTO_TEMP, logo: LOGO_TEMP },
  { nom: "Leonard", service: "Accompagnement IA et hackathon", descripteur: "WEB", url: "https://leonardagenceweb.com", photo: PHOTO_TEMP, logo: LOGO_TEMP },
  { nom: "Depatie Beauchemin Consultants", service: "Stratégie web et analytique", descripteur: "ING", url: "https://www.depatiebeauchemin.com", photo: PHOTO_TEMP, logo: LOGO_TEMP },
  { nom: "Pigeons", service: "Application web et acquisition", descripteur: "TECH", url: "https://nouspigeons.ca", photo: PHOTO_TEMP, logo: LOGO_TEMP },
  { nom: "FSG Ulaval", service: "Placement média", descripteur: "UNI", url: "https://www.fsg.ulaval.ca", photo: PHOTO_TEMP, logo: LOGO_TEMP },
  { nom: "Clinique Pelvia", service: "Engin de contenu et direction artistique", descripteur: "SANTÉ", url: "https://www.cliniquepelvia.com", photo: PHOTO_TEMP, logo: LOGO_TEMP },
];
