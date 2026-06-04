export default function Home() {
  return (
    <main className="bg-white min-h-screen font-[family-name:var(--font-sans)]">

      {/* NAV */}
      <nav className="flex justify-between items-center px-12 pt-10">
        <img
          src="/logo.webp"
          alt="Volte Face"
          className="h-32 w-auto"
        />
        <a href="https://www.linkedin.com/in/jean-benoit-dub%C3%A9-51b15892/" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-[#1e1e1e]">à propos (pendant la construction du site)</a>
      </nav>

      {/* HERO */}
      <section className="grid grid-cols-2 gap-0 mt-8 px-12">

        {/* Gauche */}
        <div className="flex flex-col justify-between pr-8 py-8">
          <div></div>
          <p className="text-[#1e1e1e] text-4xl leading-tight">
            <span className="font-[family-name:var(--font-serif)] font-normal">Agence marketing </span>
            <span className="font-bold tracking-tight">fractionnelle</span>
          </p>
          <div className="flex items-center gap-8 text-[#1e1e1e]">
            <span className="font-[family-name:var(--font-serif)] italic text-xl">STRATÉGIE</span>
            <span className="w-12 h-px bg-black inline-block"></span>
            <span className="font-[family-name:var(--font-serif)] italic text-xl">CRÉATION</span>
            <span className="w-12 h-px bg-black inline-block"></span>
            <span className="font-[family-name:var(--font-serif)] italic text-xl">FORMATION</span>
          </div>
        </div>

        {/* Droite — carte image */}
        <div className="relative overflow-hidden" style={{ minHeight: "750px" }}>
          <img
            src="/header.webp"
            alt=""
            aria-hidden
            className="absolute inset-0 w-full h-full object-cover"

          />
          <div
            className="absolute bg-[#4159d2] p-8"
            style={{ bottom: 0, left: "20%", right: 0 }}
          >
            <p className="font-[family-name:var(--font-serif)] text-white text-3xl leading-tight mb-3">
              De la stratégie à l&apos;exécution direct.
            </p>
            <p className="text-white text-sm leading-relaxed mb-2">
              Un directeur marketing d&apos;expérience s&apos;intègre à votre équipe pour donner un alignement stratégique clair, structurer les canaux et piloter la croissance tant et aussi longtemps que vous en avez besoin.
            </p>
            <p className="text-white text-sm font-semibold">
              Oui, c&apos;est un hack pas pire pour avoir des résultats, sans le coût d&apos;une agence ni le poids d&apos;une embauche.
            </p>
            <a href="https://www.linkedin.com/in/jean-benoit-dub%C3%A9-51b15892/" className="block text-white text-sm font-medium mt-4 text-right">Voir plus →</a>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="px-12 py-24">
        <div className="w-fit mx-auto">
          <p className="font-[family-name:var(--font-serif)] text-[#1e1e1e] text-3xl mb-4">
            Contact
          </p>
          <h2 className="font-[family-name:var(--font-serif)] text-7xl text-black leading-tight">
            {`Comment on peut `}
            <span className="relative inline-block px-6 py-1">
              <span
                className="text-[#f57a59] font-[family-name:var(--font-sans)] font-bold"
                style={{ letterSpacing: "-4.9px" }}
              >
                vous
              </span>
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 50" preserveAspectRatio="none">
                <ellipse cx="50" cy="25" rx="48" ry="22" fill="none" stroke="#1e1e1e" strokeWidth="0.5"/>
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
      <footer className="border-t border-gray-200 px-12 py-8 flex justify-between items-center text-sm text-[#1e1e1e]">
        <span>Confidentialité</span>
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