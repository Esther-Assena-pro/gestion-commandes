export default function CommandeList({ commandes }) {
  return (
    <ul className="space-y-2">
      {commandes.map(c => (
        <li key={c.id} className="border rounded p-2">
          {c.client} – {c.type_gateau} ({c.nb_parts} parts)
        </li>
      ))}
    </ul>
  )
}
