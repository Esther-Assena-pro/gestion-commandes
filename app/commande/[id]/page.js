import { supabase } from "../../../lib/supabaseClient"
import FactureButton from "../../../components/FactureButton"

export default async function CommandeDetail({ params }) {
  const id = params.id

  // Récupérer la commande
  const { data: commande } = await supabase
    .from("commandes")
    .select("*")
    .eq("id", id)
    .single()

  // Récupérer ses lignes (produits)
  const { data: lignes } = await supabase
    .from("commandes_lignes")
    .select("*")
    .eq("commande_id", id)

  return (
    <main className="p-6 bg-gray-50 min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h1 className="text-2xl font-bold mb-4">
          🧾 Commande #{commande?.id}
        </h1>
        <p><strong>Client :</strong> {commande?.client}</p>
        <p><strong>Date :</strong> {commande?.date_commande}</p>
        <p><strong>Type gâteau :</strong> {commande?.type_gateau}</p>
        <p><strong>Parts :</strong> {commande?.nb_parts}</p>
        <p><strong>Livraison :</strong> {commande?.livraison}</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">📋 Produits</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border">
            <thead>
              <tr className="bg-pink-100">
                <th className="border px-3 py-2 text-left">Désignation</th>
                <th className="border px-3 py-2">Unité</th>
                <th className="border px-3 py-2">Prix U (€)</th>
                <th className="border px-3 py-2">Quantité</th>
                <th className="border px-3 py-2">Total (€)</th>
              </tr>
            </thead>
            <tbody>
              {lignes?.map(l => (
                <tr key={l.id} className="hover:bg-gray-50">
                  <td className="border px-3 py-2">{l.designation}</td>
                  <td className="border px-3 py-2">{l.unite}</td>
                  <td className="border px-3 py-2">{l.prix_unitaire}</td>
                  <td className="border px-3 py-2">{l.quantite}</td>
                  <td className="border px-3 py-2">{l.prix_total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6">
          <FactureButton commande={commande} lignes={lignes} />
        </div>
      </div>
    </main>
  )
}
