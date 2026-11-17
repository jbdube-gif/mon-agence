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
  { nom: "Infopresse", service: null, descripteur: null, url: "https://www.infopresse.com", photo: PHOTO_TEMP, logo: LOGO_TEMP },
  { nom: "Novavet", service: "Stratégie de commercialisation", descripteur: "VETS", url: null, photo: PHOTO_TEMP, logo: LOGO_TEMP },
  { nom: "FSA Ulaval", service: null, descripteur: null, url: "https://www.fsa.ulaval.ca", photo: PHOTO_TEMP, logo: LOGO_TEMP },
  { nom: "Livesnap", service: null, descripteur: null, url: null, photo: PHOTO_TEMP, logo: LOGO_TEMP },
  { nom: "Bonneau d'érable", service: null, descripteur: null, url: null, photo: PHOTO_TEMP, logo: LOGO_TEMP },
  { nom: "GoRH / Humanify", service: null, descripteur: null, url: null, photo: PHOTO_TEMP, logo: LOGO_TEMP },
  { nom: "Leonard", service: null, descripteur: null, url: null, photo: PHOTO_TEMP, logo: LOGO_TEMP },
  { nom: "Depatie Beauchemin Consultants", service: null, descripteur: null, url: null, photo: PHOTO_TEMP, logo: LOGO_TEMP },
  { nom: "Pigeons", service: null, descripteur: null, url: "https://nouspigeons.ca", photo: PHOTO_TEMP, logo: LOGO_TEMP },
  { nom: "FSG Ulaval", service: null, descripteur: null, url: "https://www.fsg.ulaval.ca", photo: PHOTO_TEMP, logo: LOGO_TEMP },
  { nom: "Clinique Pelvia", service: null, descripteur: null, url: null, photo: PHOTO_TEMP, logo: LOGO_TEMP },
];
