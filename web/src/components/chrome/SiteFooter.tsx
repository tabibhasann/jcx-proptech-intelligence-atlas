import Link from "next/link";
import { longDate, manifest } from "@/data";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-paper-deep/60">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-4 py-14 sm:px-6 md:grid-cols-3 lg:px-10">
        <div>
          <p className="font-display text-xl font-semibold">Built Environment Intelligence</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-soft">
            A research briefing on property technology for a developer in Bangladesh: what was
            studied, what held up, which examples carry the argument, and what to check next.
            Deep records stay one click away, with every source and limit attached.
          </p>
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft">
            Research cut-off · {longDate(manifest.researchCutoff)}
          </p>
        </div>
        <div className="text-sm">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft">Explore</p>
          <ul className="mt-4 space-y-2.5">
            {[
              ["/", "The one minute brief"],
              ["/brief", "The five minute findings"],
              ["/story", "The full story"],
              ["/atlas", "Company records"],
              ["/discovery", "Wider search"],
              ["/evidence", "Measured cases"],
              ["/standards", "Rules that outlast products"],
              ["/methodology", "Method and corrections"],
            ].map(([href, label]) => (
              <li key={href}>
                <Link href={href} className="u-link text-ink-2">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="text-sm">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft">Trust boundary</p>
          <p className="mt-4 leading-relaxed text-ink-soft">
            Research, not advice: company reported figures are labeled, filing records are
            separate from vendor stories, and a listing is never a recommendation to buy.
          </p>
          <p className="mt-3 leading-relaxed text-ink-soft">
            Private meeting material lives outside this site by design.
          </p>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-soft">
            Unknown is a real answer · research cut-off Aug 2026
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-soft">
            {manifest.counts.qualifiedEntities} qualified · {manifest.counts.discoveryIdentities} frontier ·{" "}
            {manifest.counts.cases} cases · {manifest.counts.standards} standards
          </p>
        </div>
      </div>
    </footer>
  );
}
