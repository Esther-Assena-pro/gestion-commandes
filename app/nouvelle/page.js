"use client";
import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useRouter } from "next/navigation";
import { parseCommandeMessage } from "../utils/parser";

export default function NouvelleCommande() {
  const [formData, setFormData] = useState({
    client: "",
    date_commande: "",
    type_gateau: "",
    nb_parts: "",
    saveur: "",
    details: "",
    livraison: "Sur place",
    adresse: "",
    payment: "",
    telephone: "",
    email: "",
  });

  const [rawMessage, setRawMessage] = useState("");
  const router = useRouter();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImport = () => {
    if (!rawMessage.trim()) {
      alert("❌ Veuillez coller un message !");
      return;
    }
    const parsed = parseCommandeMessage(rawMessage);
    setFormData((prev) => ({ ...prev, ...parsed }));
    alert("✅ Message importé !");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase.from("commandes").insert([formData]);
      if (error) throw error;
      alert("✅ Commande enregistrée !");
      router.push("/");
    } catch (err) {
      console.error(err);
      alert("❌ Erreur lors de l’enregistrement");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-200 to-blue-200 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-gray-200">
        <h1 className="text-4xl font-extrabold mb-6 text-center bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
          🍰 Nouvelle Commande
        </h1>

        {/* Import depuis message brut */}
        <div className="mb-6">
          <label className="block text-gray-800 font-semibold mb-2">
            Coller un message brut
          </label>
          <textarea
            value={rawMessage}
            onChange={(e) => setRawMessage(e.target.value)}
            rows={5}
            placeholder="Collez ici le message reçu..."
            className="w-full border border-gray-300 rounded-lg p-4 focus:ring-2 focus:ring-pink-400 focus:outline-none bg-white/80"
          />
          <button
            type="button"
            onClick={handleImport}
            className="mt-4 w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:scale-105 transition-transform"
          >
            📥 Importer depuis message
          </button>
        </div>

        {/* Formulaire */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Client */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Client
            </label>
            <input
              name="client"
              value={formData.client}
              onChange={handleChange}
              placeholder="Nom et prénom"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-pink-400 bg-white/80"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Date
            </label>
            <input
              type="date"
              name="date_commande"
              value={formData.date_commande}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-pink-400 bg-white/80"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Type de gâteau
            </label>
            <input
              name="type_gateau"
              value={formData.type_gateau}
              onChange={handleChange}
              placeholder="Ex: Anniversaire"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-pink-400 bg-white/80"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Nombre de parts
            </label>
            <input
              type="number"
              name="nb_parts"
              value={formData.nb_parts}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-pink-400 bg-white/80"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-gray-700 font-semibold mb-1">
              Saveurs souhaitées
            </label>
            <input
              name="saveur"
              value={formData.saveur}
              onChange={handleChange}
              placeholder="Ex: Chocolat praliné"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-pink-400 bg-white/80"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-gray-700 font-semibold mb-1">
              Détails personnalisés
            </label>
            <textarea
              name="details"
              value={formData.details}
              onChange={handleChange}
              rows={3}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-pink-400 bg-white/80"
              placeholder="Ex: Inscription sur le gâteau..."
            />
          </div>

          {/* Livraison */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Mode de livraison
            </label>
            <select
              name="livraison"
              value={formData.livraison}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-pink-400 bg-white/80"
            >
              <option>Sur place</option>
              <option>Livraison</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Adresse de livraison
            </label>
            <input
              name="adresse"
              value={formData.adresse}
              onChange={handleChange}
              placeholder="Ex: 10 rue des Maltotiers"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-pink-400 bg-white/80"
            />
          </div>

          {/* Contact */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Téléphone
            </label>
            <input
              name="telephone"
              value={formData.telephone}
              onChange={handleChange}
              placeholder="06 95 64 41 22"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-pink-400 bg-white/80"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="email@example.com"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-pink-400 bg-white/80"
            />
          </div>

          {/* Paiement */}
          <div className="md:col-span-2">
            <label className="block text-gray-700 font-semibold mb-1">
              Mode de paiement
            </label>
            <select
              name="payment"
              value={formData.payment}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-pink-400 bg-white/80"
            >
              <option value="">-- Sélectionner --</option>
              <option>Virement bancaire</option>
              <option>Espèces</option>
              <option>Carte bancaire</option>
            </select>
          </div>

          {/* Bouton */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-bold py-3 px-4 rounded-xl shadow-xl transition-transform hover:scale-105"
            >
              ✅ Enregistrer la commande
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
