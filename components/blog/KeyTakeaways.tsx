interface KeyTakeawaysProps {
  items: string[];
}

export default function KeyTakeaways({ items }: KeyTakeawaysProps) {
  if (!items || items.length === 0) return null;

  return (
    <div className="border-l-4 border-emerald-400 rounded-r-lg bg-sky-900/40 border border-sky-500/20 p-6 my-8">
      <h3 className="text-lg font-bold text-white mb-4">Principais pontos</h3>
      <ul className="space-y-2 list-none">
        {items.map((item, i) => (
          <li key={i} className="flex gap-2 text-sky-100/90">
            <span className="text-emerald-400 font-bold shrink-0">•</span>
            <span>{typeof item === "string" ? item : String(item)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
