// Liste des clients affichés sur /clients, dans l'ordre d'affichage.
// - service : le service acheté (colonne du centre, desktop seulement)
// - descripteur : 7 lettres ou moins, affiché à droite (ex. VETS)
// - url : site du client. Sans url, la tuile n'a pas de bouton « Visiter ».
// - photo : chemin dans /public (temporaire pour l'instant)
// - logo : chemin dans /public/clients/logos. Sans logo (null), la tuile montre seulement la photo.

export type Client = {
  nom: string;
  service: string | null;
  descripteur: string | null;
  url: string | null;
  photo: string;
  logo: string | null;
};

const PHOTO_TEMP = "/clients/photo-temporaire.webp";
const L = "/clients/logos/";

export const CLIENTS: Client[] = [
  { nom: "Infopresse", service: "Formation IA en entreprise", descripteur: "I.A.", url: "https://www.infopresse.com", photo: PHOTO_TEMP, logo: L + "infopresse.svg" },
  { nom: "Novavet", service: "Stratégie de commercialisation", descripteur: "VETS", url: "https://novavet.com", photo: PHOTO_TEMP, logo: L + "novavet.png" },
  { nom: "FSA Ulaval", service: "Enseignement marketing et IA", descripteur: "UNI", url: "https://www.fsa.ulaval.ca", photo: PHOTO_TEMP, logo: null },
  { nom: "Livesnap", service: "Go-to-market et veille concurrentielle", descripteur: "TECH", url: "https://www.livesnap.com", photo: PHOTO_TEMP, logo: L + "livesnap.svg" },
  { nom: "Bonneau d'érable", service: "Nouveau positionnement de marque", descripteur: "FOOD", url: null, photo: PHOTO_TEMP, logo: L + "bonneau.png" },
  { nom: "GoRH / Humanify", service: "Marketing et croissance fractionnels", descripteur: "RH", url: "https://gorh.co", photo: PHOTO_TEMP, logo: L + "gorh.svg" },
  { nom: "Leonard", service: "Accompagnement IA et hackathon", descripteur: "WEB", url: "https://leonardagenceweb.com", photo: PHOTO_TEMP, logo: L + "leonard.svg" },
  { nom: "Depatie Beauchemin Consultants", service: "Stratégie web et analytique", descripteur: "ING", url: "https://www.depatiebeauchemin.com", photo: PHOTO_TEMP, logo: L + "dbc.svg" },
  { nom: "Pigeons", service: "Application web et acquisition", descripteur: "TECH", url: "https://nouspigeons.ca", photo: PHOTO_TEMP, logo: L + "pigeons.svg" },
  { nom: "FSG Ulaval", service: "Placement média", descripteur: "UNI", url: "https://www.fsg.ulaval.ca", photo: PHOTO_TEMP, logo: null },
  { nom: "Clinique Pelvia", service: "Engin de contenu et direction artistique", descripteur: "SANTÉ", url: "https://www.cliniquepelvia.com", photo: PHOTO_TEMP, logo: L + "pelvia.png" },
];
