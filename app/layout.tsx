import { Instrument_Sans, Instrument_Serif } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal"],
  variable: "--font-sans",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
});

export const metadata = {
  title: "Volteface — Services marketing fractionnels",
  description: "De la stratégie à l'exécution. Direct.",
  openGraph: {
    title: "Volteface — Services marketing fractionnels",
    description: "De la stratégie à l'exécution. Direct.",
    url: "https://www.volteface.ca",
    siteName: "Volteface",
    images: [
      {
        url: "https://www.volteface.ca/og.jpg",
        width: 1200,
        height: 630,
        alt: "Volteface — Services marketing fractionnels",
      },
    ],
    locale: "fr_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Volteface — Services marketing fractionnels",
    description: "De la stratégie à l'exécution. Direct.",
    images: ["https://www.volteface.ca/og.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${instrumentSans.variable} ${instrumentSerif.variable}`}>
  <head>
    <Script
      id="gtm-script"
      strategy="afterInteractive"
      src="https://www.googletagmanager.com/gtag/js?id=GTM-WHKFW629"
    />
  </head>
  <body>
    <noscript>
      <iframe
        src="https://www.googletagmanager.com/ns.html?id=GTM-WHKFW629"
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
      />
    </noscript>
    {children}
  </body>
</html>
  );
}