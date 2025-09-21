"use client";
import { useState, useEffect } from "react";

const verses = [
  "Psaume 37:4 – Fais de l’Éternel tes délices, et il te donnera ce que ton cœur désire.",
  "Philippiens 4:13 – Je puis tout par celui qui me fortifie.",
  "Ésaïe 41:10 – Ne crains rien, car je suis avec toi.",
  "Jérémie 29:11 – Car je connais les projets que j’ai formés sur vous, dit l’Éternel."
];

export default function Dashboard() {
  const [verse, setVerse] = useState("");

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * verses.length);
    setVerse(verses[randomIndex]);
  }, []);

  return (
    <div className="bg-pink-100 p-6 rounded-lg shadow-lg text-center">
      <h2 className="text-2xl font-bold text-pink-800">📖 Verset du jour</h2>
      <p className="mt-2 text-lg italic text-pink-600">{verse}</p>
    </div>
  );
}
