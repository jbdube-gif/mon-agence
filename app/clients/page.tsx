import type { Metadata } from "next";
import PageClients from "./PageClients";

export const metadata: Metadata = {
  title: "Clients - Volteface",
  description: "Les organisations qui font confiance à Volteface.",
};

export default function Page() {
  return <PageClients />;
}
