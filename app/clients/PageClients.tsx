"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { Instrument_Sans, Instrument_Serif } from "next/font/google";
import { CLIENTS } from "./clients";
import styles from "./clients.module.css";

// Réglages du mouvement
const ZOOM_PHOTO_DEPART = 1.5; // la photo arrive zoomée, puis revient à 1
const ZOOM_LOGO_DEPART = 1.15; // le logo arrive légèrement plus gros, puis revient à 1
const TITRE_REDUIT = 0.85; // « Clients. » rapetisse de 15 % une fois collé
const RAMPE_TITRE = 240; // px de scroll pendant lesquels le titre rapetisse

// Même déclaration que la page à propos : les variables de police s'appliquent sur <main>.
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

const borne = (v: number) => Math.min(1, Math.max(0, v));

export default function PageClients() {
  const [menuOuvert, setMenuOuvert] = useState(false);
  const pageRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const titreRef = useRef<HTMLHeadingElement>(null);
  const titreTexteRef = useRef<HTMLSpanElement>(null);
  const sousTitreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const page = pageRef.current;
    const nav = navRef.current;
    const titre = titreRef.current;
    const titreTexte = titreTexteRef.current;
    const sousTitre = sousTitreRef.current;
    if (!page || !nav || !titre || !titreTexte || !sousTitre) return;

    const mouvementReduit = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let navH = 0;
    let titreH = 0;
    const mesurer = () => {
      navH = nav.offsetHeight;
      titreH = titre.offsetHeight;
      page.style.setProperty("--nav-h", `${navH}px`);
      page.style.setProperty("--titre-h", `${titreH}px`);
      page.style.setProperty("--sous-titre-h", `${sousTitre.offsetHeight}px`);
    };
    mesurer();
    const observateur = new ResizeObserver(mesurer);
    observateur.observe(nav);
    observateur.observe(titre);
    observateur.observe(sousTitre);

    const tuiles = Array.from(page.querySelectorAll<HTMLElement>("[data-tuile]")).map((el) => ({
      el,
      photo: el.querySelector<HTMLElement>("[data-photo]"),
      logo: el.querySelector<HTMLElement>("[data-logo]"),
    }));

    const lenis = mouvementReduit ? null : new Lenis({ autoRaf: false, lerp: 0.1 });

    let raf = 0;
    const image = (temps: number) => {
      lenis?.raf(temps);

      // Titre : rapetisse de 15 % en arrivant sous la nav
      const hautTitre = titre.getBoundingClientRect().top;
      const pTitre = mouvementReduit
        ? hautTitre <= navH + 1 ? 1 : 0
        : borne(1 - (hautTitre - navH) / RAMPE_TITRE);
      titreTexte.style.transform = `scale(${1 - (1 - TITRE_REDUIT) * pTitre})`;

      // Tuiles : la photo dézoome et le logo rapetisse pendant que la tuile monte vers sa place
      if (!mouvementReduit) {
        const vh = window.innerHeight;
        const haut = navH + titreH * TITRE_REDUIT;
        for (const t of tuiles) {
          const p = borne((vh - t.el.getBoundingClientRect().top) / Math.max(1, vh - haut));
          if (t.photo) t.photo.style.transform = `scale(${ZOOM_PHOTO_DEPART - (ZOOM_PHOTO_DEPART - 1) * p})`;
          if (t.logo) t.logo.style.transform = `translate(-50%, -50%) scale(${ZOOM_LOGO_DEPART - (ZOOM_LOGO_DEPART - 1) * p})`;
        }
      }

      raf = requestAnimationFrame(image);
    };
    raf = requestAnimationFrame(image);

    return () => {
      cancelAnimationFrame(raf);
      observateur.disconnect();
      lenis?.destroy();
    };
  }, []);

  return (
    <main className={`${instrumentSans.variable} ${instrumentSerif.variable} bg-white min-h-screen font-[family-name:var(--font-sans)] text-[#1e1e1e]`}>

      {/* NAV */}
      <nav ref={navRef} className="flex justify-between items-center px-5 md:px-12 pt-5 pb-4 sticky top-0 bg-white z-50">
        <Link href="/" className="cursor-pointer">
          <img src="/logo.webp" alt="Volteface" className="h-15 w-auto" />
        </Link>
        <div className="hidden md:flex flex-row items-center gap-8 text-sm font-semibold text-[#1e1e1e]">
          <Link href="/#expertise" className="hover:opacity-60 transition-opacity">expertise</Link>
          <Link href="/#approche" className="hover:opacity-60 transition-opacity">approche</Link>
          <Link href="/a-propos" className="hover:opacity-60 transition-opacity">à propos</Link>
          <Link href="/clients" aria-current="page" className="underline underline-offset-4">clients ❤︎</Link>
          <Link href="/#contact" className="hover:opacity-60 transition-opacity">contact</Link>
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
            <Link href="/#expertise" onClick={() => setMenuOuvert(false)} className="hover:opacity-60 transition-opacity">Expertise</Link>
            <Link href="/#approche" onClick={() => setMenuOuvert(false)} className="hover:opacity-60 transition-opacity">Approche</Link>
            <Link href="/a-propos" className="hover:opacity-60 transition-opacity">À propos</Link>
            <Link href="/clients" aria-current="page" className="underline underline-offset-4">Clients ❤︎</Link>
            <Link href="/#contact" onClick={() => setMenuOuvert(false)} className="hover:opacity-60 transition-opacity">Contact</Link>
          </div>
        )}
      </nav>

      <div ref={pageRef} className={styles.page}>

        {/* ARRIVÉE */}
        <div className={`${styles.intro} px-5 md:px-12 flex flex-col justify-end`}>
          <p className="font-[family-name:var(--font-serif)] italic text-[#4159d2] text-lg md:text-2xl mb-1 md:mb-2">[Surtitre]</p>
        </div>

        <h1 ref={titreRef} className={`${styles.titre} px-5 md:px-12 font-[family-name:var(--font-serif)] font-normal`}>
          <span
            ref={titreTexteRef}
            className={`${styles.titreTexte} -ml-1 md:-ml-2.5 text-[min(30vw,300px)] leading-[0.82] tracking-[-0.02em]`}
          >
            Clients.
          </span>
        </h1>

        <div ref={sousTitreRef} className="px-5 md:px-12 pt-3 pb-7 md:pt-5 md:pb-10">
          <p className="font-[family-name:var(--font-serif)] italic text-[#4159d2] text-lg md:text-2xl">[Sous-titre à venir]</p>
        </div>

        {/* TUILES */}
        {CLIENTS.map((client, i) => (
          <article key={client.nom} data-tuile className={`${styles.tuile} group flex flex-col bg-white`}>
            <div className="relative z-10 flex-none h-10 md:h-12 border-t border-[#1e1e1e] bg-white px-5 md:px-12 flex md:grid md:grid-cols-[repeat(3,minmax(0,1fr))_140px] md:gap-x-6 items-center justify-between gap-3">
              <div className="flex items-baseline gap-2 md:gap-2.5 min-w-0">
                <span className="text-[11px] md:text-xs font-semibold">{String(i + 1).padStart(2, "0")}</span>
                <h2 className="text-[17px] md:text-xl font-medium truncate">{client.nom}</h2>
              </div>
              <p className={`hidden md:block text-base truncate ${client.service ? "" : "text-[#5e5e5e]"}`}>
                {client.service ?? "[Service à compléter]"}
              </p>
              <p className={`text-[13px] md:text-[15px] font-semibold tracking-[0.06em] ${client.descripteur ? "" : "text-[#5e5e5e]"}`}>
                {client.descripteur ?? "[DESC.]"}
              </p>
              {client.url ? (
                <a
                  href={client.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden md:flex justify-self-end items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-[#4159d2] text-white text-sm font-semibold opacity-0 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 focus-visible:opacity-100 focus-visible:translate-y-0"
                >
                  Visiter
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M3 9L9 3M4 3h5v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
                  </svg>
                </a>
              ) : (
                <span className="hidden md:block" />
              )}
            </div>

            <div className="relative flex-1 min-h-0 overflow-hidden">
              <img
                data-photo
                src={client.photo}
                alt=""
                className={`${styles.photo} absolute inset-0 w-full h-full object-cover`}
              />
              <img
                data-logo
                src={client.logo}
                alt={client.nom}
                className={`${styles.logo} absolute left-1/2 top-1/2 w-[48vw] md:w-[min(26vw,380px)]`}
                style={{ transform: "translate(-50%, -50%)" }}
              />
            </div>

            {/* Sur mobile, toute la tuile mène au site du client */}
            {client.url && (
              <a
                href={client.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visiter le site de ${client.nom}`}
                className="md:hidden absolute inset-0 z-20"
              />
            )}
          </article>
        ))}
      </div>

      {/* FOOTER */}
      <footer className="relative z-30 bg-white border-t border-gray-200 px-5 md:px-12 py-8 flex justify-between items-center text-sm text-[#1e1e1e]">
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
