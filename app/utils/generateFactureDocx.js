import {
  Document,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextRun,
  AlignmentType,
  HeadingLevel,
  ImageRun,
} from "docx";
import { saveAs } from "file-saver";

// ⚡ Génération Word sans template
export async function generateFactureDocx(commande) {
  // Charger logo depuis /public/logo.png
  let logoImage;
  try {
    const response = await fetch("/logo.png");
    const buffer = await response.arrayBuffer();
    logoImage = new ImageRun({ data: buffer, transformation: { width: 120, height: 120 } });
  } catch {
    logoImage = null;
  }

  // Table produits
  const tableRows = [
    new TableRow({
      children: [
        new TableCell({ children: [new Paragraph("Désignation")] }),
        new TableCell({ children: [new Paragraph("Quantité")] }),
        new TableCell({ children: [new Paragraph("Prix U (€)")] }),
        new TableCell({ children: [new Paragraph("Total (€)")] }),
      ],
    }),
    new TableRow({
      children: [
        new TableCell({ children: [new Paragraph(commande.type_gateau)] }),
        new TableCell({ children: [new Paragraph(String(commande.nb_parts))] }),
        new TableCell({ children: [new Paragraph("5.5")] }),
        new TableCell({ children: [new Paragraph(String(commande.nb_parts * 5.5))] }),
      ],
    }),
  ];

  const doc = new Document({
    sections: [
      {
        children: [
          // Logo + titre
          new Paragraph({
            children: [
              ...(logoImage ? [logoImage] : []),
              new TextRun({ text: "FACTURE PROFORMA", bold: true, size: 32 }),
            ],
            alignment: AlignmentType.CENTER,
          }),

          new Paragraph({
            text: "Newbornes And Cakes - Chaque gâteau raconte une histoire… la vôtre",
            heading: HeadingLevel.HEADING3,
            alignment: AlignmentType.CENTER,
          }),

          new Paragraph(" "),

          // Infos client
          new Paragraph(`Client : ${commande.client}`),
          new Paragraph(`Date : ${commande.date_commande}`),
          new Paragraph(`Type de gâteau : ${commande.type_gateau}`),
          new Paragraph(`Parts : ${commande.nb_parts}`),
          new Paragraph(`Livraison : ${commande.livraison}`),
          new Paragraph(" "),

          // Tableau produits
          new Table({ rows: tableRows }),

          new Paragraph(" "),

          // Total
          new Paragraph({
            children: [
              new TextRun({
                text: `TOTAL : ${commande.nb_parts * 5.5} €`,
                bold: true,
              }),
            ],
            alignment: AlignmentType.RIGHT,
          }),

          new Paragraph(" "),

          // Signature
          new Paragraph({
            text: "Signature : ASSENA Cécile",
            alignment: AlignmentType.RIGHT,
          }),

          new Paragraph(" "),

          // CGV
          new Paragraph({
            text:
              "Conditions Générales de Vente : Les commandes doivent être confirmées 48h à l'avance. Aucun remboursement après confirmation.",
            alignment: AlignmentType.JUSTIFIED,
          }),

          new Paragraph(" "),

          // Coordonnées entreprise
          new Paragraph({
            text: "📍 Abidjan - Côte d’Ivoire | 📞 07 07 07 07 07 | ✉️ newbornesandcakes@gmail.com",
            alignment: AlignmentType.CENTER,
          }),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, `facture_${commande.id}.docx`);
}
