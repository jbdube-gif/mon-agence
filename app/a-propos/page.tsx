"use client";
import { useEffect, useRef, useState } from "react";
import { Instrument_Sans, Instrument_Serif } from "next/font/google";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
});

const PARCOURS = [
  {
    annee: "2014",
    titre: "Université Laval",
    texte: "Baccalauréat en communication publique, spécialisation marketing.",
  },
  {
    annee: "2016",
    titre: "Brad : Premiers mandats",
    texte: "Début de carrière en agences de pub québécoises. Premières campagnes, premières victoires.",
  },
   {
    annee: "2017",
    titre: "Mirego : Stratégie numérique",
    texte: "UX, feuilles de route numériques, SEO, SEM, publicité programmatique, analytics, recherche utilisateur, organisation et facilitation d'ateliers.",
  },
    {
    annee: "2020",
    titre: "Mirego : Direction stratégie numérique",
    texte: "Développer des talents, créer des offres de services et développer les stratégies numériques des clients. Mon rôle est de développer l'expertise stratégique et d'assurer la qualité du produit créatif de Mirego.",
  },
      {
    annee: "2023",
  titre: "Premières conférences et formations",
    texte: "Pivot vers le rôle de conférencier-formateur : Sommet I.A. en marketing (Formations Infopresse), Web à Québec, Interface, Salon Connexion, TM26, TM28 et PTSummit par Premier Tech, HOP! Le Sommet, Mirego Sessions et DX3 (Toronto).",
  },
    {
    annee: "2024",
  titre: "Université Laval : Chargé de cours",
    texte: "Chargé des cours Mandat Publicitaire I et II, une série de cours ateliers conçus pour permettre aux étudiants de réaliser de véritables campagnes de communication.",
  },
  {
    annee: "2025",
  titre: "Mirego : Direction stratégie et création I.A.",
    texte: "Je définis l'orientation stratégique de nos produits numériques et façonne comment l'IA devient un levier créatif dans nos expériences.",
  },
    {
    annee: "2025",
  titre: "Brigade I.A. : Membre de la cohorte fondatrice",
    texte: "Implication dans la Brigade I.A.",
  },
  {
    annee: "2026",
    titre: "Bilco Marketing : Consultant stratégique",
    texte: "Renfort stratégique et technologique à l'agence marketing Bilco.",
  },
  {
    annee: "2026",
    titre: "Création de Volteface",
    texte: "Fondation de Volteface pour offrir des services marketing fractionnels de haut niveau aux organisations qui veulent aller loin.",
  },
];

const REALISATIONS = [
  {
    chiffre: "200+",
    label: "Leaders formés",
    detail: "Ateliers d'accélération numérique pour cadres et gestionnaires.",
    couleur: "#4159d2",
  },
  {
    chiffre: "15+",
    label: "Marques bâties",
    detail: "De la stratégie à l'identité visuelle, du nom au go-to-market.",
    couleur: "#f57a59",
  },
  {
    chiffre: "50",
    label: "Produits numériques",
    detail: "Apps et sites web : Santé, tech, éducation, culture, tourisme, alimentation et plus.",
    couleur: "#D543AA",
  },
  {
    chiffre: "∞",
    label: "Curiosité",
    detail: "L'ingrédient secret de tout ce qu'on fait.",
    couleur: "#4159d2",
  },
];

function TimelineItem({
  annee,
  titre,
  texte,
  index,
}: {
  annee: string;
  titre: string;
  texte: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const isRight = index % 2 === 0;

  const content = (
    <>
      <p className="font-[family-name:var(--font-serif)] italic text-[#4159d2] text-sm mb-1">{annee}</p>
      <p className="font-[family-name:var(--font-serif)] text-[#1e1e1e] text-xl mb-1">{titre}</p>
      <p className="text-[#1e1e1e] text-sm leading-relaxed opacity-70">{texte}</p>
    </>
  );

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* Mobile : simple liste */}
      <div className="md:hidden pl-6 border-l-2 border-[#4159d2]/20">
        {content}
      </div>

      {/* Desktop : grille 3 colonnes, point centré sur la ligne */}
      <div
        className="hidden md:grid items-start"
        style={{ gridTemplateColumns: "1fr 32px 1fr" }}
      >
        <div className={isRight ? "pr-10 text-right" : ""}>
          {isRight ? content : null}
        </div>
        <div className="flex justify-center pt-1">
          <div
            className={`w-3 h-3 rounded-full bg-[#4159d2] transition-transform duration-500 ${visible ? "scale-100" : "scale-0"}`}
            style={{ transitionDelay: `${index * 80 + 200}ms` }}
          />
        </div>
        <div className={!isRight ? "pl-10" : ""}>
          {!isRight ? content : null}
        </div>
      </div>
    </div>
  );
}

export default function APropos() {
  const [menuOuvert, setMenuOuvert] = useState(false);

  return (
    <main className={`${instrumentSans.variable} ${instrumentSerif.variable} bg-white min-h-screen font-[family-name:var(--font-sans)]`}>

      {/* NAV */}
      <nav className="flex justify-between items-center px-5 md:px-12 pt-5 pb-4 sticky top-0 bg-white z-50 border-b border-gray-100">
        <a href="/" className="cursor-pointer">
          <img src="/logo.webp" alt="Volteface" className="h-15 w-auto" />
        </a>
        <div className="hidden md:flex flex-row items-center gap-8 text-sm font-semibold text-[#1e1e1e]">
          <a href="/#expertise" className="hover:opacity-60 transition-opacity">expertise</a>
          <a href="/#approche" className="hover:opacity-60 transition-opacity">approche</a>
          <a href="/a-propos" className="underline underline-offset-4">à propos</a>
          <a href="/#contact" className="hover:opacity-60 transition-opacity">contact</a>
        </div>
        <button
          onClick={() => setMenuOuvert(!menuOuvert)}
          className="md:hidden flex flex-col gap-1.5 cursor-pointer"
          aria-label="Menu"
        >
          <span className={`w-6 h-0.5 bg-[#1e1e1e] transition-transform ${menuOuvert ? "rotate-45 translate-y-2" : ""}`}></span>
          <span className={`w-6 h-0.5 bg-[#1e1e1e] transition-opacity ${menuOuvert ? "opacity-0" : ""}`}></span>
          <span className={`w-6 h-0.5 bg-[#1e1e1e] transition-transform ${menuOuvert ? "-rotate-45 -translate-y-2" : ""}`}></span>
        </button>
        {menuOuvert && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-200 flex flex-col px-5 py-4 gap-4 text-sm font-semibold text-[#1e1e1e]">
            <a href="/#expertise" onClick={() => setMenuOuvert(false)} className="hover:opacity-60 transition-opacity">Expertise</a>
            <a href="/#approche" onClick={() => setMenuOuvert(false)} className="hover:opacity-60 transition-opacity">Approche</a>
            <a href="/a-propos" className="underline underline-offset-4">À propos</a>
            <a href="/#contact" onClick={() => setMenuOuvert(false)} className="hover:opacity-60 transition-opacity">Contact</a>
          </div>
        )}
      </nav>

      {/* HERO PRÉSENTATION */}
      <section className="px-5 md:px-12 py-16 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Texte */}
        <div>
          <p className="font-[family-name:var(--font-serif)] italic text-[#4159d2] text-sm mb-4 tracking-wide">HELLO !</p>
<h1 className="font-[family-name:var(--font-serif)] text-5xl md:text-7xl text-[#1e1e1e] leading-tight mb-6">
  À propos de nous
  <span className="block italic text-[#95A1E6] text-lg md:text-lg leading-none mt-1">... ben, à propos de moi, en faits.</span>
</h1>
          <p className="text-[#1e1e1e] text-xs md:text-sm leading-relaxed opacity-70 max-w-md mb-8">
            Salut, je m'appelle Jean Benoit, mais tout le monde m'appelle JB (enchanté!). Puis Volteface, bien c'est ma micro-agence de une personne.<br />
            <br />

            Avec plus d’une décennie d’expérience à l’intersection du marketing, du numérique et de l’intelligence artificielle, j'ai accompagné des marques nationales comme SAQ, Familiprix, Beneva, la Ruche et Télé-Québec dans l’optimisation de leurs produits et stratégies numériques. Mon parcours atypique, du marketing traditionnel vers le numérique, puis vers l’IA, me permet de comprendre autant les enjeux d’affaires que les réalités opérationnelles. <br />
             <br />
             Mon approche pédagogique est ancrée dans le concret, pas de théorie pour la théorie. 
             <br />
             <br />
Membre fondateur de la Brigade IA, formateur chez Formations Infopresse, bénévole Interface, chargé de cours à l’Université Laval, je suis activement engagé dans l’écosystème numériquo-marketing québécois.
          </p>
          {/* Liens sociaux */}
          <div className="flex gap-6 items-center">
            <a
              href="https://www.linkedin.com/in/jean-benoit-dub%C3%A9-51b15892/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-sm text-[#1e1e1e] hover:text-[#4159d2] transition-colors underline underline-offset-4"
            >
              LinkedIn
            </a>
            <a
              href="mailto:jbdube@volteface.ca"
              className="font-semibold text-sm text-[#1e1e1e] hover:text-[#4159d2] transition-colors underline underline-offset-4"
            >
              jbdube@volteface.ca
            </a>
            <a
              href="tel:4183186774"
              className="font-semibold text-sm text-[#1e1e1e] hover:text-[#4159d2] transition-colors underline underline-offset-4"
            >
              418.318.6774
            </a>
          </div>
        </div>

{/* Photo */}
        <div className="group relative overflow-hidden h-[60vh] md:h-full">
          <img
            src="/jeanbenoitdube.jpg"
            alt="Jean Benoit Dubé"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div
            className="absolute p-4 md:p-8"
            style={{ bottom: 0, left: "20%", right: 0, top: "auto" }}
          >
            <div className="absolute inset-0 backdrop-blur-[1.5px] transform-gpu shadow-[0_8px_32px_rgba(0,0,0,0.1)] transition-all duration-500 group-hover:backdrop-blur-none group-hover:shadow-none pointer-events-none" />
            <div
              className="absolute inset-0 opacity-20 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none"
              style={{ backgroundColor: "#4159d2" }}
            />
            <div className="relative">
              <p className="font-[family-name:var(--font-serif)] italic text-white text-sm md:text-base mb-4 tracking-wide">FONDATEUR</p>
              <p className="font-[family-name:var(--font-serif)] text-white text-3xl md:text-5xl leading-none mb-3">
                Jean Benoit Dubé
                <span className="font-[family-name:var(--font-sans)] text-xs md:text-sm align-baseline ml-2">volteface</span>
              </p>
              <p className="text-white text-sm leading-relaxed mb-2">Marketing fractionnel · IA · Stratégie</p>
            </div>
          </div>
        </div>

      </section> {/* ← ferme le HERO PRÉSENTATION */}

      {/* PARCOURS — ligne du temps */}
      <section className="px-5 md:px-12 py-16 bg-gray-50">
        <h2 className="font-[family-name:var(--font-serif)] text-3xl text-[#1e1e1e] mb-16 text-center">
          Le parcours.
        </h2>

        <div className="relative max-w-3xl mx-auto">
          {/* Ligne verticale centrale */}
          <div className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-px bg-[#4159d2]/20 hidden md:block" />

          <div className="flex flex-col gap-12">
            {PARCOURS.map((item, i) => (
              <TimelineItem key={i} index={i} {...item} />
            ))}
          </div>
        </div>
      </section>

      {/* RÉALISATIONS */}
      <section className="px-5 md:px-12 py-16">
        <h2 className="font-[family-name:var(--font-serif)] text-3xl text-[#1e1e1e] mb-10">
          Réalisations.
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {REALISATIONS.map((item, i) => (
            <div
              key={i}
              onMouseMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
                e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
              }}
              className="group relative bg-gray-100/40 rounded-xl p-6 flex flex-col justify-between min-h-48 overflow-hidden shadow-sm"
            >
              <div
                className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(circle 200px at var(--mx) var(--my), ${item.couleur}22, transparent 60%)`,
                }}
              />
              <p
                className="font-[family-name:var(--font-serif)] text-5xl leading-none mb-2"
                style={{ color: item.couleur }}
              >
                {item.chiffre}
              </p>
              <div>
                <p className="font-semibold text-[#1e1e1e] text-sm mb-1">{item.label}</p>
                <p className="text-[#1e1e1e] text-xs leading-relaxed opacity-60">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-[#000000] px-5 md:px-12 py-24">
        <img
          src="/light-black.png"
          alt=""
          aria-hidden
          className="pointer-events-none absolute inset-0 w-full h-full object-cover opacity-90"
        />
        <div className="relative z-10 max-w-2xl">
          <p className="font-[family-name:var(--font-serif)] italic text-white/60 text-sm mb-4">ON TRAVAILLE ENSEMBLE?</p>
          <h2 className="font-[family-name:var(--font-serif)] text-white text-4xl md:text-6xl leading-tight mb-8">
            Parlons de<br />votre projet.
          </h2>
          <a
            href="mailto:jbdube@volteface.ca"
            className="font-[family-name:var(--font-serif)] text-xl text-white hover:opacity-70 transition-opacity"
          >
            Écrivez-nous →
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gray-200 px-5 md:px-12 py-8 flex justify-between items-center text-sm text-[#1e1e1e]">
        <a href="https://www.linkedin.com/in/jean-benoit-dub%C3%A9-51b15892/" className="hover:underline">LinkedIn</a>
        <span>t.  418.318.6774</span>
        <span>
          <span className="font-[family-name:var(--font-serif)]">e.</span>
          {"  "}
          <a href="mailto:jbdube@volteface.ca" className="font-medium">jbdube@volteface.ca</a>
        </span>
      </footer>

    </main>
  );
}
