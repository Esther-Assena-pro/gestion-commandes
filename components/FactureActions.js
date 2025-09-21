"use client"; // ✅ obligatoire pour activer onClick

export default function FactureActions() {
  const handlePrint = () => {
    window.print(); // pour l'instant impression PDF
  };

  return (
    <button
      onClick={handlePrint}
      className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700"
    >
      Générer Facture PDF
    </button>
  );
}
// Note: Ce composant gère les actions liées à la facture, comme la génération d'un PDF.