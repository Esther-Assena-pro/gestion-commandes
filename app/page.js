import { supabase } from "../lib/supabaseClient";
import Link from "next/link";
import VersetDuJour from "../components/VersetDuJour";
import { Calendar, User, Cake } from "lucide-react"; // icônes modernes

export default async function Home() {
  const { data: commandes } = await supabase.from("commandes").select("*");

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-10 p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-pink-600 flex items-center gap-2">
          📦 Gestion des Commandes
        </h1>
        <Link
          href="/nouvelle/page"
          className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg shadow-md transition"
        >
          ➕ Nouvelle commande
        </Link>
      </header>

      {/* Contenu principal */}
      <section className="p-6 space-y-8">
        {/* Verset du jour */}
        <div className="bg-gradient-to-r from-pink-200 to-purple-200 p-6 rounded-xl shadow-md text-center">
          <VersetDuJour />
        </div>

        {/* Commandes */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            📋 Liste des commandes
          </h2>

          {commandes?.length === 0 && (
            <p className="text-gray-500 text-center py-6">
              Aucune commande pour l’instant.
            </p>
          )}

          <div className="grid gap-6 sm:grid-cols-2">
            {commandes?.map((c) => (
              <div
                key={c.id}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-pink-600 flex items-center gap-2">
                    <User size={18} /> {c.client}
                  </h3>
                  <p className="text-gray-600 flex items-center gap-2">
                    <Cake size={16} /> {c.type_gateau} ({c.nb_parts} parts)
                  </p>
                  <p className="text-sm text-gray-500 flex items-center gap-2">
                    <Calendar size={16} /> {c.date_commande} • {c.livraison}
                  </p>
                </div>

                <Link
                  href={`/commande/${c.id}`}
                  className="mt-4 text-center bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded-lg hover:opacity-90 transition"
                >
                  Voir les détails →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
