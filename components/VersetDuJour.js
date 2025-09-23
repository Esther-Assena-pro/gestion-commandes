"use client";
import { useEffect, useState } from "react";

export default function VersetDuJour() {
  const versets = [
    { ref: "Jean 3:16", texte: "Car Dieu a tant aimé le monde, qu’il a donné son Fils unique." },
    { ref: "Psaume 23:1", texte: "L'Éternel est mon berger: je ne manquerai de rien." },
    { ref: "Philippiens 4:13", texte: "Je puis tout par celui qui me fortifie." },
    { ref: "Ésaïe 41:10", texte: "Ne crains rien, car je suis avec toi." }
  ];

  const [verset, setVerset] = useState(null);

  useEffect(() => {
    const index = new Date().getDate() % versets.length;
    setVerset(versets[index]);
  }, []);

  if (!verset) return null;

  return (
    <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 my-6 rounded">
      <p className="italic">📖 {verset.texte}</p>
      <p className="text-right font-bold">— {verset.ref}</p>
    </div>
  );
}
