// utils/parser.js

export function parseCommandeMessage(message) {
  const fields = {
    client: /Nom et prénom:\s*(.*)/i,
    type_gateau: /Type de gâteau:\s*(.*)/i,
    nb_parts: /Nombre de parts:\s*(\d+)/i,
    saveur: /Saveurs? (?:souhaitées|):\s*(.*)/i,
    date_commande: /Date (?:souhaitée|commande):\s*([\d/]+)/i,
    details: /Détails personnalisés:\s*([\s\S]*?)(?=Option de livraison:|Adresse|Mode de paiement|Téléphone|Email|$)/i,
    livraison: /Option de livraison:\s*(.*)/i,
    adresse: /Adresse de livraison:\s*([\s\S]*?)(?=Mode de paiement:|Téléphone|Email|$)/i,
    payment: /Mode de paiement:\s*(.*)/i,
    telephone: /Téléphone:\s*(.*)/i,
    email: /Email:\s*(.*)/i,
  };

  const result = {};
  for (let key in fields) {
    const match = message.match(fields[key]);
    result[key] = match ? match[1].trim() : "";
  }

  // ✅ transformer la date au format ISO (2025-09-21)
  if (result.date_commande) {
    const parts = result.date_commande.split("/");
    if (parts.length === 3) {
      const [day, month, year] = parts;
      result.date_commande = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    }
  }

  return result;
}
