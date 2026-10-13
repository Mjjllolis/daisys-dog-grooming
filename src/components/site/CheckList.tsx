export default function CheckList({ items, light = false }: { items: string[]; light?: boolean }) {
  return (
    <ul className="space-y-3.5">
      {items.map((item) => (
        <li key={item} className={`flex items-center gap-3.5 ${light ? "text-white/90" : "text-foreground/85"}`}>
          <span className="grid h-5 w-5 flex-none place-items-center rounded-full bg-accent text-[10px] text-white">✓</span>
          {item}
        </li>
      ))}
    </ul>
  );
}
