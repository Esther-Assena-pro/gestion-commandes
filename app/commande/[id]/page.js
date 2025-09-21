"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { generateFactureDocx } from "../../utils/generateDocx";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_KEY
);

export default function CommandePage() {
  const params = useParams();
  const id = params.id;
  const [commande, setCommande] = useState(null);

  useEffect(() => {
    async function fetchCommande() {
      const { data, error } = await supabase
        .from("commandes")
        .select("*")
        .eq("id", id)
        .single();
      if (!error) setCommande(data);
    }
    if (id) fetchCommande();
  }, [id]);

  if (!commande) return <div>Chargement...</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Facture Proforma #{commande.id}</h2>
      <p><strong>Client :</strong> {commande.client}</p>
      <p><strong>Date :</strong> {commande.date_commande}</p>
      <p><strong>Type gâteau :</strong> {commande.type_gateau}</p>
      <p><strong>Parts :</strong> {commande.nb_parts}</p>
      <p><strong>Livraison :</strong> {commande.livraison}</p>

      <div className="mt-6">
        <button
          onClick={() => generateFactureDocx(commande)}
          className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700"
        >
          Télécharger Facture Word
        </button>
      </div>
    </div>
  );
}
