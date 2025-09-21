import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link"; // ✅ Import obligatoire
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Gestion Commandes",
  description: "Application pour gérer les commandes et factures",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100 text-gray-900`}
      >
        <div className="min-h-screen flex flex-col">
          {/* HEADER */}
          <header className="bg-pink-600 text-white shadow-md">
            <div className="container mx-auto p-4 flex justify-between items-center">
              <h1 className="text-xl font-bold">🍰 Gestion Commandes</h1>
              <nav className="space-x-4">
                <Link href="/" className="hover:underline">Commandes</Link>
                <Link href="/nouvelle" className="hover:underline">Nouvelle commande</Link>
              </nav>
            </div>
          </header>

          {/* CONTENU */}
          <main className="flex-1 container mx-auto p-6">
            {children}
          </main>

          {/* FOOTER */}
          <footer className="bg-gray-200 text-center text-sm py-4">
            © {new Date().getFullYear()} Faith Gâteaux – Tous droits réservés
          </footer>
        </div>
      </body>
    </html>
  );
}
