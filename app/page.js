import { supabase } from "../lib/supabaseClient"
import Link from "next/link"

export default async function Home() {
  const { data: commandes } = await supabase.from("commandes").select("*")

  return (
    <main className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        📦 Commandes
      </h1>

      {commandes?.length === 0 && (
        <p className="text-gray-500">Aucune commande pour l’instant.</p>
      )}

      <div className="grid gap-4">
        {commandes?.map(c => (
          <div
            key={c.id}
            className="bg-white border rounded-lg shadow-md p-4 flex justify-between items-center"
          >
            <div>
              <h2 className="font-semibold text-lg">{c.client}</h2>
              <p className="text-gray-600">
                {c.type_gateau} ({c.nb_parts} parts)
              </p>
              <p className="text-sm text-gray-400">
                📅 {c.date_commande} • {c.livraison}
              </p>
            </div>
            <Link
              href={`/commande/${c.id}`}
              className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-md"
            >
              Voir →
            </Link>
          </div>
        ))}
      </div>
    </main>
  )
}
