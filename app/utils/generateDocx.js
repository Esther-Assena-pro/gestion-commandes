import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  AlignmentType,
  WidthType,
  ImageRun,
  HeadingLevel,
  PageBreak,
} from "docx";
import { saveAs } from "file-saver";

export async function generateFactureDocx(commande) {
  const total = commande.nb_parts * 5.5;

  // Charger logo + signature
  const logo = await fetch("/logo.png").then((res) => res.arrayBuffer());
  const signature = await fetch("/signature.png").then((res) => res.arrayBuffer());

  // Tableau des articles
  const table = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        children: [
          new TableCell({ children: [new Paragraph("Ligne")] }),
          new TableCell({ children: [new Paragraph("Désignation")] }),
          new TableCell({ children: [new Paragraph("Unité")] }),
          new TableCell({ children: [new Paragraph("Prix U (€)")] }),
          new TableCell({ children: [new Paragraph("Quantité")] }),
          new TableCell({ children: [new Paragraph("Total (€)")] }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({ children: [new Paragraph("1")] }),
          new TableCell({ children: [new Paragraph(commande.type_gateau)] }),
          new TableCell({ children: [new Paragraph("Part")] }),
          new TableCell({ children: [new Paragraph("5.5")] }),
          new TableCell({ children: [new Paragraph(String(commande.nb_parts))] }),
          new TableCell({ children: [new Paragraph(total.toFixed(2))] }),
        ],
      }),
    ],
  });

  // Texte CGV complet
  const cgvContent = [
    "Les présentes Conditions Générales de Vente (CGV) régissent les relations contractuelles entre NewBornes Cakes et toute personne (ci-après 'le Client') souhaitant commander un produit ou une prestation de pâtisserie sur mesure (gâteaux, cupcakes, biscuits personnalisés, etc.).",
    "",
    "1. Produits et prestations",
    "Les produits proposés sont des créations artisanales réalisées à la commande, selon les spécifications du client. Chaque commande étant personnalisée, des variations de présentation peuvent exister. Les allergènes présents peuvent inclure : gluten, œufs, lait, fruits à coque, soja, etc. Une liste détaillée est fournie sur demande.",
    "",
    "2. Commandes",
    "Modalités : Les commandes sont effectuées par devis signé, email ou formulaire de commande en ligne. Toute commande est ferme après confirmation écrite du cake designer et versement d’un acompte.",
    "Délai : Un délai de 03 jours minimum avant la date de livraison souhaitée est requis. Les commandes de dernière minute peuvent être acceptées sous réserve de faisabilité.",
    "",
    "3. Tarifs et modalités de paiement",
    "Prix : Les prix sont exprimés en euros.",
    "Acompte : Un acompte de 50% est exigé à la commande. Il confirme l'engagement du client et n’est pas remboursable en cas d’annulation.",
    "Paiement : Le solde est à régler au plus tard le jour de la livraison ou du retrait, par virement, carte bancaire ou espèces. Aucun produit ne sera remis sans paiement intégral.",
    "",
    "4. Droit de rétractation",
    "Conformément à l’article L221-28 du Code de la consommation, le droit de rétractation ne s’applique pas aux produits personnalisés ou rapidement périssables. Toute commande validée est donc ferme et définitive.",
    "",
    "5. Modification ou annulation",
    "Par le client : Jusqu’à 7 jours avant la livraison : possibilité de modifier la commande dans la limite du raisonnable. Moins de 7 jours : aucune modification possible. En cas d’annulation, l’acompte est conservé à titre d’indemnité.",
    "Par le cake designer : En cas d’impossibilité (maladie, force majeure), l’acompte est remboursé intégralement. Aucune autre indemnité ne pourra être réclamée.",
    "",
    "6. Livraison / Retrait",
    "Livraison : Récupération sur place - 10 rue des Maltotiers, 45000 Orléans.",
    "Retrait : Le retrait est effectué à l’adresse indiquée. Le client s’engage à respecter l’horaire convenu. Tout retard supérieur à 30 minutes peut entraîner des pénalités ou une annulation sans remboursement.",
    "",
    "7. Responsabilité",
    "Le client est responsable du transport du produit après retrait. Aucun remboursement ou remplacement ne pourra être exigé en cas de détérioration après remise. En cas d’allergies, le client doit expressément informer le cake designer en amont.",
    "",
    "8. Propriété intellectuelle",
    "Les créations (designs, recettes, visuels) restent la propriété exclusive du cake designer. Toute reproduction, diffusion ou utilisation commerciale est interdite sans autorisation préalable.",
    "",
    "9. Règlement des litiges",
    "En cas de litige, une solution amiable sera recherchée en priorité. À défaut, le litige sera porté devant les juridictions compétentes du ressort du domicile professionnel du cake designer, sauf disposition contraire impérative. Le client consommateur peut recourir à un médiateur de la consommation conformément aux articles L611-1 et suivants du Code de la consommation.",
  ];

  const doc = new Document({
    sections: [
      {
        children: [
          // Logo
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [new ImageRun({ data: logo, transformation: { width: 120, height: 60 } })],
          }),

          // Titre
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({ text: "PROFORMA PATISSERIE NEWBORNES", bold: true, size: 32, color: "FF1493" }),
            ],
          }),

          // Infos client
          new Paragraph({ text: `Client : ${commande.client}` }),
          new Paragraph({ text: `Date de l’événement : ${commande.date_commande}` }),
          new Paragraph({ text: `Type de commande : ${commande.type_gateau}` }),
          new Paragraph({ text: `Saveurs souhaitées : ${commande.saveur || "-"}` }),
          new Paragraph({ text: `Nombre de parts : ${commande.nb_parts}` }),
          new Paragraph({ text: `Livraison : ${commande.livraison}` }),
          new Paragraph({ text: `Adresse : ${commande.adresse || "-"}`, spacing: { after: 300 } }),

          // Tableau
          table,

          // Total
          new Paragraph({
            alignment: AlignmentType.RIGHT,
            children: [new TextRun({ text: `TOTAL : ${total.toFixed(2)} €`, bold: true, color: "0000FF", size: 26 })],
          }),

          // Mode de paiement
          new Paragraph({ text: `Mode de paiement : ${commande.payment || "Virement bancaire"}`, spacing: { before: 200 } }),

          // Message
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({ text: "💝 NewBornes And Cakes vous souhaite une merveilleuse fête ! 🎉", color: "FF1493", bold: true }),
            ],
          }),

          // Signature
          new Paragraph({ text: "Signature :", spacing: { before: 300 } }),
          new Paragraph({
            children: [new ImageRun({ data: signature, transformation: { width: 100, height: 50 } })],
          }),
          new Paragraph({ text: "ASSENA Cécile", alignment: AlignmentType.RIGHT }),

          // Voir CGV
          new Paragraph({ text: "Voir CGV en annexe", bold: true, spacing: { before: 400 } }),

          // Saut de page
          new Paragraph({ children: [new PageBreak()] }),
        ],
      },

      // Page 2 - CGV complètes
      {
        children: [
          new Paragraph({
            text: "CONDITIONS GÉNÉRALES DE VENTE (CGV)",
            heading: HeadingLevel.HEADING_1,
            alignment: AlignmentType.CENTER,
          }),
          ...cgvContent.map((line) =>
            new Paragraph({
              text: line,
              spacing: { after: 200 },
            })
          ),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, `facture_${commande.id}.docx`);
}
