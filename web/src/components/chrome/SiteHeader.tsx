import Link from "next/link";
import { manifest } from "@/data";

const NAV = [
  { href: "/", label: "The Journey" },
  { href: "/atlas", label: "Atlas" },
  { href: "/frontier", label: "Frontier" },
  { href: "/evidence", label: "Evidence" },
  { href: "/standards", label: "Standards" },
  { href: "/methodology", label: "Method" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/90 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-10">
        <Link href="/" className="group flex items-baseline gap-2" aria-label="PropTech Intelligence Atlas: home">
          <span className="font-display text-lg font-semibold tracking-tight">Atlas</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft group-hover:text-mark-deep">
            JCX Research · {manifest.researchCutoff}
          </span>
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="rounded-sm px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-2 transition-colors hover:bg-paper-deep hover:text-mark-deep"
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <details className="relative md:hidden">
          <summary
            className="list-none rounded-sm border border-line-strong px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-2 marker:hidden cursor-pointer"
            aria-label="Open navigation menu"
          >
            Menu
          </summary>
          <nav
            aria-label="Mobile"
            className="absolute right-0 top-11 flex w-48 flex-col border border-line bg-paper-raised shadow-lg"
          >
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="border-b border-line px-4 py-3 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-2 last:border-0 hover:bg-paper-deep hover:text-mark-deep"
              >
                {n.label}
              </Link>
            ))}
          </nav>
        </details>
      </div>
    </header>
  );
}
