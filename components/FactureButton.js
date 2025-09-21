"use client";
import jsPDF from "jspdf";

export default function FactureButton({ commande, lignes }) {
  const generatePDF = () => {
    const doc = new jsPDF();

    // --- En-tête ---
    doc.setFontSize(18);
    doc.text("FACTURE", 105, 15, { align: "center" });

    // Coordonnées de l'entreprise
    doc.setFontSize(11);
    doc.text("Faith Gâteaux", 20, 30);
    doc.text("Adresse : 123 Rue Exemple, Paris", 20, 36);
    doc.text("Tel : 06 00 00 00 00", 20, 42);
    doc.text("Email : contact@faithgateaux.com", 20, 48);

    // Infos client
    doc.setFontSize(12);
    doc.text(`Client : ${commande.client}`, 20, 65);
    doc.text(`Date : ${commande.date_commande}`, 20, 72);
    doc.text(`Type gâteau : ${commande.type_gateau}`, 20, 79);
    doc.text(`Livraison : ${commande.livraison}`, 20, 86);

    // --- Tableau produits ---
    let y = 100;
    doc.setFontSize(12);
    doc.text("Désignation", 20, y);
    doc.text("Quantité", 90, y);
    doc.text("Prix U (€)", 130, y);
    doc.text("Total (€)", 170, y);

    y += 10;
    let totalGeneral = 0;

    lignes.forEach((l) => {
      doc.text(l.designation || "", 20, y);
      doc.text(String(l.quantite || ""), 95, y);
      doc.text(String(l.prix_unitaire || ""), 135, y);
      doc.text(String(l.prix_total || ""), 175, y);
      totalGeneral += l.prix_total || 0;
      y += 10;
    });

    // Total général
    y += 10;
    doc.setFontSize(14);
    doc.text(`TOTAL : ${totalGeneral.toFixed(2)} €`, 150, y);

    // --- CGV ---
    y += 20;
    doc.setFontSize(10);
    doc.text("Conditions Générales de Vente :", 20, y);
    y += 6;
    doc.text(
      "Toute commande est ferme et définitive. Aucun remboursement ne pourra être exigé.",
      20,
      y
    );
    y += 6;
    doc.text(
      "Les produits doivent être retirés à la date convenue. La conservation est sous la responsabilité du client.",
      20,
      y
    );

    // Télécharger
    doc.save(`facture_${commande.id}.pdf`);
  };

  return (
    <button
      onClick={generatePDF}
      className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700"
    >
      Générer la facture PDF
    </button>
  );
}
