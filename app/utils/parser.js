// Supprime balises HTML pour éviter injections
function sanitize(input) {
  if (!input) return "";
  return input.replace(/<[^>]*>?/gm, ""); 
}

export function parseCommandeMessage(message) {
  const parsed = {
    client: sanitize(/Nom et prénom:\s*(.*)/i.exec(message)?.[1]),
    type_gateau: sanitize(/Type de gâteau:\s*(.*)/i.exec(message)?.[1]),
    nb_parts: sanitize(/Nombre de parts:\s*(.*)/i.exec(message)?.[1]),
    saveur: sanitize(/Saveurs souhaitées:\s*(.*)/i.exec(message)?.[1]),
    date_commande: sanitize(/Date souhaitée:\s*(.*)/i.exec(message)?.[1]),
    details: sanitize(
      /Détails personnalisés:\s*([\s\S]*?)(?=Option|Adresse|Mode|Téléphone|Email|$)/i.exec(message)?.[1]
    ),
    livraison: sanitize(/Option de livraison:\s*(.*)/i.exec(message)?.[1]),
    adresse: sanitize(
      /Adresse de livraison:\s*([\s\S]*?)(?=Mode|Téléphone|Email|$)/i.exec(message)?.[1]
    ),
    payment: sanitize(/Mode de paiement:\s*(.*)/i.exec(message)?.[1]),
    telephone: sanitize(/Téléphone:\s*(.*)/i.exec(message)?.[1]),
    email: sanitize(/Email:\s*(.*)/i.exec(message)?.[1]),
  };
  return parsed;
}
