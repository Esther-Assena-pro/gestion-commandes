"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import { useParams } from "next/navigation";

// Composant verset du jour
function VersetDuJour() {
  const [verset, setVerset] = useState("Chargement du verset...");

  useEffect(() => {
    fetch("https://labs.bible.org/api/?passage=random&type=json")
      .then((res) => res.json())
      .then((data) => {
        const v = data[0];
        setVerset(`${v.bookname} ${v.chapter}:${v.verse} — "${v.text}"`);
      })
      .catch(() =>
        setVerset("⚠️ Impossible de charger le verset, réessayez plus tard.")
      );
  }, []);

  return (
    <div className="bg-purple-100 border border-purple-300 p-3 rounded-lg mb-6 shadow-md text-purple-800 text-sm text-center">
      📖 <span className="italic">{verset}</span>
    </div>
  );
}

export default function CommandeDetail() {
  const params = useParams();
  const [commande, setCommande] = useState(null);

  useEffect(() => {
    const fetchCommande = async () => {
      const { data, error } = await supabase
        .from("commandes")
        .select("*")
        .eq("id", params.id)
        .single();

      if (!error) setCommande(data);
    };
    fetchCommande();
  }, [params.id]);

  if (!commande) {
    return (
      <main className="p-6 min-h-screen bg-gray-50">
        <p className="text-gray-500">Chargement...</p>
      </main>
    );
  }

  return (
    <main className="p-6 bg-gray-50 min-h-screen font-mono">
      <h1 className="text-3xl font-extrabold text-purple-600 mb-4">
        📑 Détails de la Commande #{commande.id}
      </h1>

      <VersetDuJour />

      <div className="bg-white border-4 border-purple-500 rounded-lg shadow-lg p-6 max-w-2xl mx-auto space-y-3">
        <p>
          <span className="font-bold text-gray-700">👤 Client :</span>{" "}
          {commande.client}
        </p>
        <p>
          <span className="font-bold text-gray-700">📅 Date :</span>{" "}
          {commande.date_commande}
        </p>
        <p>
          <span className="font-bold text-gray-700">🎂 Gâteau :</span>{" "}
          {commande.type_gateau} ({commande.nb_parts} parts)
        </p>
        <p>
          <span className="font-bold text-gray-700">🍫 Saveur :</span>{" "}
          {commande.saveur || "Non précisé"}
        </p>
        <p>
          <span className="font-bold text-gray-700">🚚 Livraison :</span>{" "}
          {commande.livraison || "Non précisé"}
        </p>
        <p>
          <span className="font-bold text-gray-700">📍 Adresse :</span>{" "}
          {commande.adresse || "Non précisée"}
        </p>
        <p>
          <span className="font-bold text-gray-700">📞 Téléphone :</span>{" "}
          {commande.telephone || "Non précisé"}
        </p>
        <p>
          <span className="font-bold text-gray-700">✉️ Email :</span>{" "}
          {commande.email || "Non précisé"}
        </p>
      </div>
    </main>
  );
}
