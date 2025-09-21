"use client";
import { useState } from "react";
import { parseCommandeMessage } from "../app/utils/parser";
import { supabase } from "../lib/supabaseClient";

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

  const [rawMessage, setRawMessage] = useState("");
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImport = () => {
    if (!rawMessage.trim()) {
      alert("Veuillez coller un message !");
      return;
    }
    try {
      const parsed = parseCommandeMessage(rawMessage);

      const required = ["client", "date_commande", "type_gateau", "nb_parts"];
      const missing = required.filter((f) => !parsed[f]);

      if (missing.length > 0) {
        alert("❌ Il manque : " + missing.join(", "));
        return;
      }

      setForm(parsed);
      alert("✅ Message importé avec succès !");
    } catch (err) {
      alert("❌ Erreur parsing : " + err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!form.client) newErrors.client = "Nom obligatoire";
    if (!form.date_commande) newErrors.date_commande = "Date obligatoire";
    if (!form.type_gateau) newErrors.type_gateau = "Type obligatoire";
    if (!form.nb_parts) newErrors.nb_parts = "Nombre obligatoire";

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
      <h2 className="text-2xl font-bold text-pink-600">🍰 Nouvelle commande</h2>

      {/* Zone message brut */}
      <label htmlFor="rawMessage" className="font-semibold">
        Message brut reçu
      </label>
      <textarea
        id="rawMessage"
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

      {/* Champs avec labels */}
      <label htmlFor="client">Nom et prénom</label>
      <input
        id="client"
        name="client"
        placeholder="Nom et prénom"
        value={form.client}
        onChange={handleChange}
        className="border p-2 w-full rounded"
      />

      <label htmlFor="date_commande">Date de commande</label>
      <input
        id="date_commande"
        name="date_commande"
        type="date"
        value={form.date_commande}
        onChange={handleChange}
        className="border p-2 w-full rounded"
      />

      <label htmlFor="type_gateau">Type de gâteau</label>
      <input
        id="type_gateau"
        name="type_gateau"
        placeholder="Type de gâteau"
        value={form.type_gateau}
        onChange={handleChange}
        className="border p-2 w-full rounded"
      />

      <label htmlFor="nb_parts">Nombre de parts</label>
      <input
        id="nb_parts"
        name="nb_parts"
        type="number"
        placeholder="Nombre de parts"
        value={form.nb_parts}
        onChange={handleChange}
        className="border p-2 w-full rounded"
      />

      <label htmlFor="saveur">Saveurs</label>
      <input
        id="saveur"
        name="saveur"
        placeholder="Saveurs"
        value={form.saveur}
        onChange={handleChange}
        className="border p-2 w-full rounded"
      />

      <label htmlFor="details">Détails personnalisés</label>
      <textarea
        id="details"
        name="details"
        placeholder="Détails personnalisés"
        value={form.details}
        onChange={handleChange}
        className="border p-2 w-full rounded"
      />

      <label htmlFor="livraison">Livraison</label>
      <input
        id="livraison"
        name="livraison"
        placeholder="Livraison"
        value={form.livraison}
        onChange={handleChange}
        className="border p-2 w-full rounded"
      />

      <label htmlFor="adresse">Adresse de livraison</label>
      <input
        id="adresse"
        name="adresse"
        placeholder="Adresse de livraison"
        value={form.adresse}
        onChange={handleChange}
        className="border p-2 w-full rounded"
      />

      <label htmlFor="payment">Mode de paiement</label>
      <input
        id="payment"
        name="payment"
        placeholder="Mode de paiement"
        value={form.payment}
        onChange={handleChange}
        className="border p-2 w-full rounded"
      />

      <label htmlFor="telephone">Téléphone</label>
      <input
        id="telephone"
        name="telephone"
        placeholder="Téléphone"
        value={form.telephone}
        onChange={handleChange}
        className="border p-2 w-full rounded"
      />

      <label htmlFor="email">Email</label>
      <input
        id="email"
        name="email"
        placeholder="Email"
        type="email"
        value={form.email}
        onChange={handleChange}
        className="border p-2 w-full rounded"
      />

      <button
        type="submit"
        className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition"
      >
        Enregistrer
      </button>
    </form>
  );
}
