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

export default function Home() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // progress : 0 au top, 1 quand on a scrollé 800px
  const progress = Math.min(scrollY / 800, 1);
  return (
    <main className="bg-white min-h-screen font-[family-name:var(--font-sans)]">

      {/* NAV */}
      <nav className="flex justify-between items-center px-5 md:px-12 pt-5 pb-4 sticky top-0 bg-white z-50">
        <img
          src="/logo.webp"
          alt="Volte Face"
          className="h-15 w-auto"
        />
        <a href="https://www.linkedin.com/in/jean-benoit-dub%C3%A9-51b15892/" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-[#1e1e1e]">à propos</a>
      </nav>

      {/* HERO */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-0 px-5 md:px-12 md:h-[calc(100vh-80px)]">

        {/* Gauche */}
        <div className="flex flex-col justify-between pr-0 md:pr-8 py-8">
          <div></div>
          <p className="text-[#1e1e1e] text-4xl leading-tight">
            <span className="font-[family-name:var(--font-serif)] ">Services marketing </span>
            <span className="font-bold tracking-tight">fractionnels</span>
          </p>
<div className="hidden md:flex flex-row items-center gap-8 text-[#1e1e1e]">            <span className="font-[family-name:var(--font-serif)] italic text-xl">STRATÉGIE</span>
            <span className="w-12 h-px bg-black hidden md:inline-block"></span>
            <span className="font-[family-name:var(--font-serif)] italic text-xl">CRÉATION</span>
            <span className="w-12 h-px bg-black hidden md:inline-block"></span>
            <span className="font-[family-name:var(--font-serif)] italic text-xl">FORMATION</span>
          </div>
        </div>

        {/* Droite — carte image */}
        <div className="relative overflow-hidden h-[50vh] md:h-full">
          <img
            src="/header.webp"
            alt="Prismatic light"
            className="absolute inset-0 w-full h-full object-cover"
          />
           <div
           className="absolute p-4 md:p-8 md:bg-[#4159d2]"
          style={{ bottom: 0, left: "20%", right: 0 }}
          >
            <p className="font-[family-name:var(--font-serif)] text-xl md:text-3xl leading-tight mb-3">
              De la stratégie à l&apos;exécution direct.
            </p>
            <p className="text-white text-sm leading-relaxed mb-2">
              Un directeur marketing d&apos;expérience s&apos;intègre à votre équipe pour donner un alignement
              stratégique clair, structurer les canaux et piloter la croissance tant et aussi longtemps que vous en avez besoin.
            </p>
            <p className="text-white text-sm font-semibold">
              Oui, c&apos;est un hack pas pire pour avoir des résultats, sans le coût d&apos;une agence ni le poids d&apos;une embauche.
            </p>
            <a href="#" className="block text-white text-sm font-medium mt-4 text-right">Voir plus →</a>
          </div>
        </div>

        {/* STRATÉGIE mobile — visible seulement sous l'image */}
        <div className="md:hidden flex flex-row items-center gap-4 text-[#1e1e1e] py-6">
          <span className="font-[family-name:var(--font-serif)] italic text-xl">STRATÉGIE</span>
          <span className="w-12 h-px bg-black inline-block"></span>
          <span className="font-[family-name:var(--font-serif)] italic text-xl">CRÉATION</span>
          <span className="w-12 h-px bg-black inline-block"></span>
          <span className="font-[family-name:var(--font-serif)] italic text-xl">FORMATION</span>
        </div>
      </section>
{/* EXPERTISE */}
<section className="px-5 md:px-12 py-16">
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

  
{/* Chacun son approche */}
<section className="px-5 md:px-12 py-16">
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
            background: "radial-gradient(circle 120px at var(--mx) var(--my), rgba(69, 0, 219, 0.05), transparent 70%)",
          }}
        />
<p className="font-[family-name:var(--font-sans)] font-bold text-[#1e1e1e] text-md">{item.titre}</p>        <p className="text-[#1e1e1e] text-sm leading-tight">{item.texte}</p>
      </div>
    ))}
  </div>
</section>


      {/* CONTACT */}
      <section className="px-5 md:px-12 py-24">
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
              Écris-nous
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
