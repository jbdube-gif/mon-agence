"use client";
import { useEffect, useState } from "react";


// Plages de rotation uniques par index [startDeg, endDeg]
const ROTATIONS: [number, number][] = [
  [-15,   5],
  [  0,  20],
  [ -8,  15],
  [ 18, -10],
  [-20,   8],
  [  5, -18],
  [-12,  16],
  [ 10,  -6],
  [ -5,  22],
];

// Multiplicateurs de parallaxe uniques par index (px déplacés sur 800px de scroll)
const PARALLAX: number[] = [-60, 40, -80, 70, -50, 90, -70, 55, -45];

// Titre du hero selon le service. {parts} : la 2e partie est en gras.
const TITRE_SERVICE: Record<string, { normal: string; bold: string }> = {
  STRATÉGIE: { normal: "Stratégies ", bold: "essentielles" },
  CRÉATION: { normal: "Créations ", bold: "intemporelles" },
  FORMATION: { normal: "Formations ", bold: "substantielles" },
};

const TITRE_DEFAUT = { normal: "Services marketing ", bold: " fractionnels" };

// Cartes par catégorie. Ajoute autant de cartes que tu veux dans chaque tableau.
const CARTES: Record<string, {
  intro: string;
  titre: string;
  suffixe: string;
  texte: string;
  image: string;
  bg: string;
  lien: string;
}[]> = {
  STRATÉGIE: [
    {
    intro: "CAS – TROUVE TA RESSOURCE",
    titre: "Beluga",
    suffixe: "app",
    texte: "Accompagnement I.A. et stratégie de rétention pour aider les ados à se sentir bien.",
    image: "/cas/beluga2.png",
    bg: "#8b95e8",
    lien: "https://trouvetaressource.com/en/beluga",
  },

  ],
  CRÉATION: [
    {
    intro: "CAS – CLINIQUE PELVIA",
    titre: "engin de contenu",
    suffixe: "Engin I.A.",
    texte: "Une direction artistique qui rend la santé pelvienne plus réconfortante.",
    image: "/cas/pelvia.png",
    bg: "#F57A59",
    lien: "https://www.cliniquepelvia.com/",
  },    {
    intro: "CAS – DJ TORNADE",
    titre: "Nol’an Greatest Hits",
    suffixe: "album I.A.",
    texte: "Production musicale, composition, image de marque et promotion pour célébrer l’entre-fêtes.",
    image: "/cas/nol'an.png",
    bg: "#D543AA",
    lien: "https://open.spotify.com/intl-fr/album/1bitpcHppdiliuMzI9YO6R?si=DjLdheeVQGyPuujVCXkFlA",
  },    {
    intro: "CAS – LMH",
    titre: "On est braves",
    suffixe: "production vidéo",
    texte: "Création d'une vidéo pour enrôler plus de braves à la ligue matinale.",
    image: "/cas/lmh.png",
    bg: "#4159D2",
    lien: "https://www.linkedin.com/posts/la-lmh_mon-bon-ami-jean-benoit-dub%C3%A9-a-%C3%A9t%C3%A9-bien-inspir%C3%A9-activity-7417742447088324609-ve5F?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAABOZeecB4PFDwrA5g7lRbZAwxhJTJvZW1DE",
  },
  ],
  FORMATION: [
    {
    intro: "INFOPRESSE",
    titre: "I.A. et marketing ",
    suffixe: "formation",
    texte: "Prochaines formations offertes : Assistants IA: créez vos assistants personnalisés et automatisez vos tâches répétitives.",
    image: "/cas/infopresse.png",
    bg: "#4159D2",
    lien: "https://www.infopresse.com/formation/assistants-ia-creez-vos-assistants-personnalises-et-automatisez-vos-taches-repetitives/",
  },   
   {
    intro: "CAS - PREMIER TECH",
    titre: "Atelier d'accélération numérique",
    suffixe: "atelier",
    texte: "200 leaders, 4 heures, 1 objetif : maîtriser l'I.A. pour augmenter l'impact.",
    image: "/cas/premiertech.png",
    bg: "#8b95e8",
    lien: "https://www.google.com/search?sca_esv=17317455c5eb4af0&rlz=1C5CHFA_enCA741CA741&sxsrf=ANbL-n6dSDF2ITHcbY_L3J2_Sy9Cgy7_iQ:1780953669091&udm=7&fbs=ADc_l-bpk8W4E-qsVlOvbGJcDwpnlSr7xQUI8WetOB3ophaMjXwzVj6gWfL0AaSz4mZLK3msMFR2tce-tm0jGmR81nT5vhrCPvuSjp1UcG7tjEK6mShoqxHtwzksJ72KCKcqbt0y2xS8SDxLYKRq1DCrN9oCWSvsAH-YZExIewoPiU8gKXcOkHcXP_VGCWOgjDXVEPAfB0LZ_MZC_1VFdti5yJqai-6eAGU8K_iS-cZEH_M5l0OF3o0&q=premier+tech+tm&sa=X&ved=2ahUKEwji1rq2yfiUAxWHLFkFHWQuAyQQtKgLegQIDxAB&biw=1248&bih=797&dpr=1#fpstate=ive&vld=cid:a560a403,vid:S5yJYzvAWN0,st:0",
  },
  ],
};

// Carte affichée par défaut au chargement (avant tout clic)
const CARTE_DEFAUT = {
  intro: "",
  titre: "Que des projets d'impact.",
  suffixe: "",
  texte: "De la création de la marque à sa diffusion. De la stratégie d'affaires à l'optimisation de KPI.",
  image: "/hero.webp",
  bg: "#4159d2",
  lien: "#",
};

// Couleur du cercle par catégorie
const COULEUR_CERCLE: Record<string, string> = {
  "STRATÉGIE": "#4159d2",
  "CRÉATION": "#f57a59",
  "FORMATION": "#D543AA",
};

export default function Home() {
const [scrollY, setScrollY] = useState(0);
const [menuOuvert, setMenuOuvert] = useState(false);
const [carteActive, setCarteActive] = useState(CARTE_DEFAUT);
const [indexCarte, setIndexCarte] = useState(0); // index dans la catégorie active;
const [visible, setVisible] = useState(true);
const [motActif, setMotActif] = useState<string | null>(null);

// Clic sur un mot : bascule la carte + le cercle
const choisirCarte = (categorie: string) => {
  if (motActif === categorie) {
    setMotActif(null);
    setVisible(false);
    setTimeout(() => {
      setCarteActive(CARTE_DEFAUT);
      setVisible(true);
    }, 200);
    return;
  }

  const cartes = CARTES[categorie];
  if (!cartes || cartes.length === 0) return;
  const idx = Math.floor(Math.random() * cartes.length);

  setMotActif(categorie);
  setIndexCarte(idx);
  setVisible(false);
  setTimeout(() => {
    setCarteActive(cartes[idx]);
    setVisible(true);
  }, 200);
};

// "Autre projet" : passe à la carte suivante du service en cours
const carteSuivante = () => {
  if (!motActif) return;
  const cartes = CARTES[motActif];
  if (!cartes || cartes.length <= 1) return;
  const idx = (indexCarte + 1) % cartes.length; // boucle au début après la dernière

  setIndexCarte(idx);
  setVisible(false);
  setTimeout(() => {
    setCarteActive(cartes[idx]);
    setVisible(true);
  }, 200);
};

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // progress : 0 au top, 1 quand on a scrollé 800px
  const progress = Math.min(scrollY / 800, 1);
  const MotCercle = ({ mot, grand }: { mot: string; grand?: boolean }) => {
    const actif = motActif === mot;
    const couleur = COULEUR_CERCLE[mot] ?? "#1e1e1e";
    return (
<button
  onClick={() => choisirCarte(mot)}
  className="group relative inline-block py-1 cursor-pointer shrink-0"
  style={{ paddingLeft: "clamp(0.1rem, 0.8vw, 1rem)", paddingRight: "clamp(0.1rem, 0.8vw, 1rem)" }}
>
        <span
          className="font-[family-name:var(--font-serif)] italic relative z-10 whitespace-nowrap"
          style={{ fontSize: grand ? "1.5rem" : "clamp(0.875rem, 1.5vw, 1.25rem)" }}
        >
          {mot}
        </span>
        <svg
          className={`absolute inset-0 w-full h-full transition-opacity duration-300 ${
            actif ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          }`}
          viewBox="0 0 100 50"
          preserveAspectRatio="none"
        >
<ellipse
  cx="50" cy="25" rx="48" ry="22"
  fill="none"
  stroke={couleur}
  strokeWidth="1"
  className={`cercle-trace ${actif ? "cercle-actif" : ""}`}
/>
      </svg>
      
      </button>
    );
  };
  return (
<main id="top" className="bg-white min-h-screen font-[family-name:var(--font-sans)]">

{/* NAV */}
<nav className="flex justify-between items-center px-5 md:px-12 pt-5 pb-4 sticky top-0 bg-white z-50">
  <a href="#top" className="cursor-pointer">
    <img src="/logo.webp" alt="Volte Face" className="h-15 w-auto" />
  </a>

  {/* Liens desktop */}
  <div className="hidden md:flex flex-row items-center gap-8 text-sm font-semibold text-[#1e1e1e]">
    <a href="#expertise" className="hover:opacity-60 transition-opacity">expertise</a>
    <a href="#approche" className="hover:opacity-60 transition-opacity">approche</a>
    <a href="#contact" className="hover:opacity-60 transition-opacity">contact</a>
  </div>

  {/* Bouton burger mobile */}
  <button
    onClick={() => setMenuOuvert(!menuOuvert)}
    className="md:hidden flex flex-col gap-1.5 cursor-pointer"
    aria-label="Menu"
  >
    <span className={`w-6 h-0.5 bg-[#1e1e1e] transition-transform ${menuOuvert ? "rotate-45 translate-y-2" : ""}`}></span>
    <span className={`w-6 h-0.5 bg-[#1e1e1e] transition-opacity ${menuOuvert ? "opacity-0" : ""}`}></span>
    <span className={`w-6 h-0.5 bg-[#1e1e1e] transition-transform ${menuOuvert ? "-rotate-45 -translate-y-2" : ""}`}></span>
  </button>

  {/* Menu déroulant mobile */}
  {menuOuvert && (
    <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-200 flex flex-col px-5 py-4 gap-4 text-sm font-semibold text-[#1e1e1e]">
      <a href="#expertise" onClick={() => setMenuOuvert(false)} className="hover:opacity-60 transition-opacity">Expertise</a>
      <a href="#approche" onClick={() => setMenuOuvert(false)} className="hover:opacity-60 transition-opacity">Approche</a>
      <a href="#contact" onClick={() => setMenuOuvert(false)} className="hover:opacity-60 transition-opacity">Contact</a>
    </div>
  )}
</nav>

      {/* HERO */}
<section className="grid grid-cols-1 md:grid-cols-2 gap-0 px-5 md:px-12 md:h-[calc(100vh-120px)]">


{/* Gauche */}
<div className="flex flex-col justify-between pr-0 md:pr-8 pt-8 pb-0 min-w-0">
  <div></div>

  {/* Groupe titre + bouton (compte comme UN seul bloc) */}
  <div>
  <p className="text-[#1e1e1e] text-4xl leading-tight">
  <span
    key={`normal-${motActif ?? "default"}`}
    className="font-[family-name:var(--font-serif)] titre-normal-anim"
  >
    {(motActif && TITRE_SERVICE[motActif]?.normal) || TITRE_DEFAUT.normal}
  </span>
  {" "}
  <span
    key={`bold-${motActif ?? "default"}`}
    className="font-bold tracking-tight titre-bold-anim"
  >
    {(motActif && TITRE_SERVICE[motActif]?.bold) || TITRE_DEFAUT.bold}
  </span>
</p>

    {/* Espace réservé en permanence pour ne rien décaler */}
    <div className="h-6 mt-2">
      {motActif && CARTES[motActif] && CARTES[motActif].length > 1 && (
        <button
          onClick={carteSuivante}
          className="text-black text-sm font-medium cursor-pointer hover:opacity-60 transition-opacity"
        >
          autre projet →
        </button>
      )}
    </div>
  </div>

  {/* Rangée de mots */}
  <div
    className="hidden md:flex flex-row items-center min-w-0 overflow-hidden text-[#1e1e1e]"
    style={{ gap: "clamp(0.125rem, 1vw, 3.5rem)" }}
  >
    <MotCercle mot="STRATÉGIE" />
    <span className="shrink-0 h-px bg-black" style={{ width: "clamp(0.5rem, 2vw, 5rem)" }} />
    <MotCercle mot="CRÉATION" />
    <span className="shrink-0 h-px bg-black" style={{ width: "clamp(0.5rem, 2vw, 5rem)" }} />
    <MotCercle mot="FORMATION" />
  </div>
</div>

<div className="group relative overflow-hidden h-[50vh] md:h-full">
 
 
 
 
  {/* Image nette */}
  <img
    src={carteActive.image}
    alt="Prismatic light"
    className="absolute inset-0 w-full h-full object-cover"
  />

  {/* Zone basse : verre + couleur, TOUJOURS montée (ne clignote pas) */}
  <div
    className="absolute p-4 md:p-8"
    style={{ bottom: 0, left: "20%", right: 0, top: "auto" }}
  >
    {/* Verre : flou + profondeur, fixe, disparaît seulement au survol */}
    <div
      className="absolute inset-0 backdrop-blur-xs transform-gpu shadow-[0_8px_32px_rgba(0,0,0,0.1)] transition-all duration-500 group-hover:backdrop-blur-none group-hover:shadow-none pointer-events-none"
    />
    {/* Couleur : fixe aussi */}
    <div
      className="absolute inset-0 opacity-20 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none"
      style={{ backgroundColor: carteActive.bg }}
    />

    {/* Contenu : LUI seul fait le fondu au changement de carte */}
<div key={carteActive.titre} className="relative carte-entree">
        <p className="font-[family-name:var(--font-serif)] italic text-white text-sm md:text-base mb-4 tracking-wide">
        {carteActive.intro}
      </p>
      <p className="font-[family-name:var(--font-serif)] text-white text-3xl md:text-5xl leading-none mb-3">
        {carteActive.titre}
        <span className="font-[family-name:var(--font-sans)] text-xs md:text-sm align-baseline ml-2">
          {carteActive.suffixe}
        </span>
      </p>
      <p className="text-white text-sm leading-relaxed mb-2">
        {carteActive.texte}
      </p>
      <a href={carteActive.lien} className="block text-white text-sm font-medium mt-4 text-right">Voir plus →</a>
    </div>
  </div>
</div>

        {/* STRATÉGIE mobile — visible seulement sous l'image */}
        <div className="md:hidden flex flex-row items-center gap-4 text-[#1e1e1e] py-6">
  <MotCercle mot="STRATÉGIE" grand />
  <span className="w-8 h-px bg-black inline-block"></span>
  <MotCercle mot="CRÉATION" grand />
  <span className="w-8 h-px bg-black inline-block"></span>
  <MotCercle mot="FORMATION" grand />
</div>
      </section>


{/* Présentation */}
<section className="relative overflow-hidden bg-[#00000] px-12 md:px-12 py-16 md:py-12">
  {/* Contenu */}
  <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start min-h-[300px] md:min-h-[420px]">
    {/* Titre */}
    <h2 className="font-[family-name:var(--font-serif)] text-black text-2xl md:text-2xl mt-[40px]">
    De la stratégie à l&apos;exécution. Direct.
    </h2>

    {/* Citation + attribution */}
    <div className="text-black md:pt-34 font-regular text-md ">
      <p className="text-md md:text-[14px] leading-relaxed tracking-tight">
        Un directeur marketing d’expérience s’intègre à votre équipe pour donner un alignement stratégique clair, structurer les canaux et piloter la croissance tant et aussi longtemps que vous en avez besoin. 
      </p>
      <p className="font-[family-name:var(--font-sans)] font-semibold text-md sm:text-[14px] mt-8 tracking-tight">
        Oui, c’est un hack pas pire pour avoir des résultats, 
        ans le coût d’une agence ni le poids d’une embauche. 
      </p>
    </div>
  </div>
</section>

{/* EXPERTISE */}
<section id="expertise" className="px-5 md:px-12 py-16 scroll-mt-24">
  <h2 className="font-[family-name:var(--font-serif)] text-2xl md:text-2xl text-black mb-10">
    Grosse expertise.
  </h2>
  <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 lg:grid lg:grid-cols-3 lg:overflow-visible">
    {[
      {
        titre: "Stratégie de croissance",
        texte: "Comprendre l'organisation et le marché, puis le bâtir un plan d'action concret. Une série d'ateliers et d'activités pour connecter la stratégie d'affaires à l'exécution terrain.",
        icon: "/icons/rocket.webp"
      },
      {
        titre: "Images de marques",
        texte: "Le 0 to 1, c'est passer d'une idée à une histoire. Mettre les rêves du monde au monde, ça mallure.",
        icon: "/icons/palette.webp"
      },
      {
        titre: "Web et performance",
        texte: "Vitrine, landing page, eComm, applicatif et SEO. Tout ce que ça prend pour que le web soit un vecteur de croissance, par une source de maux de tête.",
        icon: "/icons/mouse.webp"
      },
      {
        titre: "Distribution et go-to-market",
        texte: "Google Ads, Meta Ads, Tiktok Ads, imprimé, Infolettre, contenu, SEO, placement média et toutes autres stratégies pour être vu et considéré.",
        icon: "/icons/instagram.webp"
      },
      {
        titre: "Formations",
        texte: "Quels modèles utiliser quand et comment? Prompt engineering 101, création d'agents et automatisation des tâches répétitives.",
        icon: "/icons/diplome.webp"
      },
      {
        titre: "Contenus I.A.",
        texte: "Permettre la créativité à l’échelle en créant un monde unique autour de votre produit et en dénichant une position unique.",
        icon: "/icons/ia.webp"
      },
      {
        titre: "Création de contenus",
        texte: "Image, vidéo, audio et toutes sortes d’autres manières de faire rayonner votre produit.",
        icon: "/icons/micro.webp"
      },
      {
        titre: "Fidélisation",
        texte: "Fidéliser sa clientèle est un art obscure pour beaucoup, mais pas pour nous. ",
        icon: "/icons/magnet.webp"
      },
      {
        titre: "Stratégie produit et UX",
        texte: "De la recherche de marché à la priorisation de backlog, concevoir des apps, des sites et des assistants, c’est notre core.",
        icon: "/icons/phone.webp"
      }
      
      
    ].map((item, i) => {
      const [startRot, endRot] = ROTATIONS[i] ?? [-10, 10];
      const rot = startRot + (endRot - startRot) * progress;
      const translateY = (PARALLAX[i] ?? -40) * progress;
      return (
        <div
  key={i}
  onMouseMove={(e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  }}
className="w-[min(80vw,320px)] shrink-0 snap-center lg:w-auto group relative bg-gray-100/40 backdrop-blur-md rounded-xl p-6 flex flex-col justify-between min-h-64 overflow-hidden shadow-sm"
>
          <div
            className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background: "radial-gradient(circle 250px at var(--mx) var(--my), rgba(255, 146, 177, 0.18), transparent 50%)",
            }}
          />
          <p className="font-[family-name:var(--font-serif)] text-[#1e1e1e] text-2xl">{item.titre}</p>
          <div className="flex justify-between items-end">
            <p className="text-[#1e1e1e] text-sm leading-tight max-w-[55%]">{item.texte}</p>
            <div className="transition-transform duration-300 ease-out group-hover:scale-110 group-hover:-rotate-6 self-center">
  <img
    src={item.icon}
    alt={item.titre}
    className="w-20 h-20 md:w-28 md:h-28 lg:w-38 lg:h-38 object-contain transition-transform duration-75 ease-out"
    style={{ transform: `translateY(${translateY * 0.3}px)` }}
  />
</div>
          </div>
        </div>
      );
    })}
  </div>
</section>

{/* TÉMOIGNAGE */}
<section className="relative overflow-hidden bg-[#000000] px-12 md:px-12 py-16 md:py-24">
  {/* Image de fond */}
  <img
    src="/header.webp"
    alt=""
    aria-hidden
    className="pointer-events-none absolute inset-0 w-full h-full object-cover opacity-90"
  />

  {/* Contenu */}
  <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start min-h-[300px] md:min-h-[420px]">
    {/* Titre */}
    <h2 className="font-[family-name:var(--font-serif)] text-white text-4xl md:text-4xl">
      Témoignage.
    </h2>

    {/* Citation + attribution */}
    <div className="text-white md:pt-34 font-regular text-md ">
      <p className="text-md md:text-[14px] leading-relaxed tracking-tight">
        J’adore travailler avec Volteface. Ils prennent le temps d’écouter, 
        puis de comprendre. Puis après, ils ne perdent pas de temps.
      </p>
      <p className="font-[family-name:var(--font-sans)] font-semibold text-md sm:text-[14px] mt-8 tracking-tight">
        Julien Gobeil Simard, Hoodi.ai
      </p>
    </div>
  </div>
</section>
  
{/* Chacun son approche */}
<section id="approche" className="px-5 md:px-12 py-16 scroll-mt-24">
  <h2 className="font-[family-name:var(--font-serif)] text-2xl md:text-2xl text-black mb-10">
    À chacun son approche.
  </h2>
  <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 lg:grid lg:grid-cols-3 lg:overflow-visible">
    {[
      {
        titre: "Consultation et planif stratégique",
        texte: "Comprendre l’organisation et le marché, puis le transformer en plan d’action concret. Une série d’ateliers et d’activités pour connecter la stratégie d’affaires à l’exécution terrain.",
      },
      {
        titre: "Banque d’heures",
        texte: "L'approche marketing fractionnelle par excellence. Un nombre d’heures défini à l’avance, à utiliser selon vos besoins, pour faire avancer ce qui compte et combler les lacunes.",
      },
      {
        titre: "Par mandat",
        texte: "Le go-to-market d’un nouveau produit, la refonte d’un site web, la création d’une campagne de pub ou une série de contenus pour alimenter vos canaux. On s’entend sur le mandat, on s’entend sur le prix, et on livre. Simple comme bonjour.",
      },
    ].map((item, i) => (
      <div
        key={i}
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
          e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
        }}
        className="w-[min(80vw,320px)] shrink-0 snap-center lg:w-auto group relative bg-gray-100/40 backdrop-blur-md border border-[#4159d2] rounded-xl p-6 flex flex-col justify-between min-h-64 overflow-hidden shadow-sm"
      >
        <div
          className="pointer-events-none absolute -inset-px opacity-20 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: "radial-gradient(circle 120px at var(--mx) var(--my), rgba(69, 0, 219, 0.21), transparent 70%)",
          }}
        />
<p className="font-[family-name:var(--font-sans)] font-bold text-[#1e1e1e] text-md">{item.titre}</p>        <p className="text-[#1e1e1e] text-sm leading-tight">{item.texte}</p>
      </div>
    ))}
  </div>
</section>

{/* CONTACT */}
<section id="contact" className="px-5 md:px-12 py-24 scroll-mt-24">
        <div className="w-fit mx-auto">
          <p className="font-[family-name:var(--font-serif)] text-[#1e1e1e] text-3xl mb-4">
            Contact
          </p>
          <h2 className="font-[family-name:var(--font-serif)] text-4xl md:text-7xl text-black leading-tight">
            {`Comment on peut `}
            <span className="vous-wrapper relative inline-block px-6 py-1">
              <span
                className="text-[#f57a59] font-[family-name:var(--font-sans)] font-bold"
                style={{ letterSpacing: "-4.9px" }}
              >
                vous
              </span>
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 50" preserveAspectRatio="none">
                <ellipse cx="50" cy="25" rx="48" ry="22" fill="none" stroke="#1e1e1e" strokeWidth="0.5" className="ellipse-draw"/>
              </svg>
            </span>
            {` aider?`}
          </h2>
          <div className="flex justify-end mt-4">
            <a
              href="mailto:jbdube@volteface.ca"
              className="font-[family-name:var(--font-serif)] underline text-xl text-black"
            >
              Écrivez-nous
            </a>
          </div>
        </div>
      </section>    

      {/* FOOTER */}
      <footer className="border-t border-gray-200 px-5 md:px-12 py-8 flex justify-between items-center text-sm text-[#1e1e1e]">
        <a href="https://www.linkedin.com/in/jean-benoit-dub%C3%A9-51b15892/" className="hover:underline">LinkedIn</a>
        <span>t.  418.318.6774</span>
        <span>
          <span className="font-[family-name:var(--font-serif)] ">e.</span>
          {"  "}
          <a href="mailto:jbdube@volteface.ca" className="font-medium">jbdube@volteface.ca</a>
        </span>
      </footer>

    </main>
  );
}
