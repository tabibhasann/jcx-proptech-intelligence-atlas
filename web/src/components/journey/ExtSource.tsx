/** External source link rendered as a marginal annotation. */
export function ExtSource({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="u-link ml-1 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.08em] text-data on-dark:text-[#8fb8dd]"
      title={`Source: ${href}`}
    >
      {label} ↗
    </a>
  );
}
