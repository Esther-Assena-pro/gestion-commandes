"use client";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { parseCommandeMessage } from "../app/utils/parser";

// ✅ Connexion Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_KEY
);

export default function CommandeForm() {
  const [form, setForm] = useState({
    client: "",
    date_commande: "",
    type_gateau: "",
    nb_parts: "",
    saveur: "",
    details: "",
    livraison: "",
    adresse: "",
    payment: "",
    telephone: "",
    email: "",
  });

  const [rawMessage, setRawMessage] = useState(""); // message brut collé
  const [errors, setErrors] = useState({}); // gestion des erreurs

  // ✅ maj des champs manuels
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ importer depuis message brut
  const handleImport = () => {
    try {
      if (!rawMessage.trim()) {
        alert("⚠️ Veuillez coller un message !");
        return;
      }

      const parsed = parseCommandeMessage(rawMessage);

      // Vérifie les champs obligatoires
      const requiredFields = ["client", "date_commande", "type_gateau", "nb_parts"];
      const missing = requiredFields.filter((field) => !parsed[field]);

      if (missing.length > 0) {
        alert("❌ Il manque : " + missing.join(", "));
        return;
      }

      setForm(parsed);
      alert("✅ Message importé avec succès !");
    } catch (err) {
      alert("❌ Erreur de parsing : " + err.message);
    }
  };

  // ✅ valider et enregistrer
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!form.client) newErrors.client = "Nom du client obligatoire";
    if (!form.date_commande) newErrors.date_commande = "Date obligatoire";
    if (!form.type_gateau) newErrors.type_gateau = "Type de gâteau obligatoire";
    if (!form.nb_parts) newErrors.nb_parts = "Nombre de parts obligatoire";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    try {
      const { error } = await supabase.from("commandes").insert([form]);
      if (error) throw error;
      alert("✅ Commande enregistrée !");
    } catch (err) {
      alert("❌ Erreur : " + err.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-lg space-y-4 max-w-2xl mx-auto"
    >
      <h2 className="text-2xl font-bold text-pink-600 flex items-center gap-2">
        🍰 Nouvelle commande
      </h2>

      {/* Zone coller message */}
      <textarea
        placeholder="Collez ici le message reçu..."
        value={rawMessage}
        onChange={(e) => setRawMessage(e.target.value)}
        className="border-2 border-pink-400 rounded-lg p-3 w-full focus:ring-2 focus:ring-pink-500"
        rows={6}
      />
      <button
        type="button"
        onClick={handleImport}
        className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded-lg hover:opacity-90 transition"
      >
        📥 Importer depuis message
      </button>

      {/* Champs */}
      <div>
        <input
          name="client"
          placeholder="Nom et prénom"
          value={form.client}
          onChange={handleChange}
          className={`border p-2 w-full rounded ${errors.client ? "border-red-500" : "border-gray-300"}`}
        />
        {errors.client && <p className="text-red-500 text-sm">{errors.client}</p>}
      </div>

      <div>
        <input
          name="date_commande"
          type="date"
          value={form.date_commande}
          onChange={handleChange}
          className={`border p-2 w-full rounded ${errors.date_commande ? "border-red-500" : "border-gray-300"}`}
        />
        {errors.date_commande && <p className="text-red-500 text-sm">{errors.date_commande}</p>}
      </div>

      <div>
        <input
          name="type_gateau"
          placeholder="Type de gâteau"
          value={form.type_gateau}
          onChange={handleChange}
          className={`border p-2 w-full rounded ${errors.type_gateau ? "border-red-500" : "border-gray-300"}`}
        />
        {errors.type_gateau && <p className="text-red-500 text-sm">{errors.type_gateau}</p>}
      </div>

      <div>
        <input
          name="nb_parts"
          type="number"
          placeholder="Nombre de parts"
          value={form.nb_parts}
          onChange={handleChange}
          className={`border p-2 w-full rounded ${errors.nb_parts ? "border-red-500" : "border-gray-300"}`}
        />
        {errors.nb_parts && <p className="text-red-500 text-sm">{errors.nb_parts}</p>}
      </div>

      <input name="saveur" placeholder="Saveurs" value={form.saveur} onChange={handleChange} className="border p-2 w-full rounded" />
      <textarea name="details" placeholder="Détails personnalisés" value={form.details} onChange={handleChange} className="border p-2 w-full rounded" />
      <input name="livraison" placeholder="Livraison" value={form.livraison} onChange={handleChange} className="border p-2 w-full rounded" />
      <input name="adresse" placeholder="Adresse de livraison" value={form.adresse} onChange={handleChange} className="border p-2 w-full rounded" />
      <input name="payment" placeholder="Mode de paiement" value={form.payment} onChange={handleChange} className="border p-2 w-full rounded" />
      <input name="telephone" placeholder="Téléphone" value={form.telephone} onChange={handleChange} className="border p-2 w-full rounded" />
      <input name="email" placeholder="Email" type="email" value={form.email} onChange={handleChange} className="border p-2 w-full rounded" />

      {/* Bouton */}
      <button
        type="submit"
        className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition"
      >
        ✅ Enregistrer
      </button>
    </form>
  );
}
