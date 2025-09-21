import { parseCommandeMessage } from "../utils/parser";

describe("parseCommandeMessage", () => {
  test("extrait correctement toutes les infos", () => {
    const message = `
      🍰 NOUVELLE COMMANDE 🍰
      Nom et prénom: Emna Souissi
      Type de gâteau: birthday
      Nombre de parts: 10
      Saveurs souhaitées: praline-chocolat
      Date souhaitée: 21/09/2025
      Détails personnalisés: Joyeux anniversaire Samy
      Option de livraison: Livraison
      Adresse de livraison: 10 rue des maltotiers
      Mode de paiement: Virement bancaire
      Téléphone: 0695644122
      Email: emna-gharbi@hotmail.fr
    `;

    const parsed = parseCommandeMessage(message);

    expect(parsed.client).toBe("Emna Souissi");
    expect(parsed.type_gateau).toBe("birthday");
    expect(parsed.nb_parts).toBe("10");
    expect(parsed.saveur).toBe("praline-chocolat");
    // on garde la date telle qu’extraite (texte brut), tu pourras la normaliser après
    expect(parsed.date_commande).toBe("21/09/2025"); 
    expect(parsed.livraison).toBe("Livraison");
    expect(parsed.payment).toBe("Virement bancaire");
  });

  test("retourne vide si une info est manquante", () => {
    const message = `Nom et prénom: Test User`;
    const parsed = parseCommandeMessage(message);

    expect(parsed.client).toBe("Test User");
    expect(parsed.email).toBe(""); // pas d’email => vide
  });

  test("ignore scripts malveillants (sécurité)", () => {
    const message = `
      Nom et prénom: <script>alert("hack")</script>
      Email: test@test.com
    `;
    const parsed = parseCommandeMessage(message);

    expect(parsed.client).not.toContain("<script>");
  });
});
