"use client"
import jsPDF from "jspdf"

export default function FactureButton({ commande, lignes }) {
  const generatePDF = () => {
    const doc = new jsPDF()

    // En-tête
    doc.setFontSize(18)
    doc.text("FACTURE", 105, 15, { align: "center" })

    doc.setFontSize(12)
    doc.text(`Facture #${commande.id}`, 20, 30)
    doc.text(`Client : ${commande.client}`, 20, 40)
    doc.text(`Date : ${commande.date_commande}`, 20, 50)
    doc.text(`Livraison : ${commande.livraison}`, 20, 60)

    // Tableau produits
    let y = 80
    doc.setFontSize(12)
    doc.text("Désignation", 20, y)
    doc.text("Quantité", 90, y)
    doc.text("Prix U (€)", 130, y)
    doc.text("Total (€)", 170, y)

    y += 10
    let totalGeneral = 0

    lignes.forEach(l => {
      doc.text(l.designation || "", 20, y)
      doc.text(String(l.quantite || ""), 95, y)
      doc.text(String(l.prix_unitaire || ""), 135, y)
      doc.text(String(l.prix_total || ""), 175, y)
      totalGeneral += l.prix_total || 0
      y += 10
    })

    // Total général
    y += 10
    doc.setFontSize(14)
    doc.text(`TOTAL : ${totalGeneral.toFixed(2)} €`, 150, y)

    // Sauvegarde du fichier
    doc.save(`facture_${commande.id}.pdf`)
  }

  return (
    <button
      onClick={generatePDF}
      className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded mt-4"
    >
      🧾 Générer Facture
    </button>
  )
}
