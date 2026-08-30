import Link from "next/link";
import { manifest } from "@/data";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-paper-deep/60">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-4 py-14 sm:px-6 md:grid-cols-3 lg:px-10">
        <div>
          <p className="font-display text-xl font-semibold">PropTech Intelligence Atlas</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-soft">
            A dated, curated global intelligence corpus: complete snapshots of named directories and
            specialist ecosystems, plus an evidence-qualified set of decision-relevant operators,
            platforms and startups. Comprehensive for its stated analytical scope; not a claim to
            enumerate every PropTech company in existence.
          </p>
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft">
            Research cut-off · {manifest.researchCutoff}
          </p>
        </div>
        <div className="text-sm">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft">Explore</p>
          <ul className="mt-4 space-y-2.5">
            {[
              ["/", "The Journey"],
              ["/atlas", "Qualified-core atlas"],
              ["/frontier", "Discovery frontier"],
              ["/evidence", "Outcome & failure evidence"],
              ["/standards", "Standards & governance"],
              ["/methodology", "Methodology & corrections"],
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
            Informational research only: not investment, procurement, legal, tax, engineering,
            safety or cybersecurity advice. A listing is not an endorsement. Vendor- and
            customer-reported outcomes are labeled and may not be independently verified or
            transferable.
          </p>
          <p className="mt-3 leading-relaxed text-ink-soft">
            JCX-specific observations, pilot designs and vendor strategy live in a permissioned
            private chapter and are not part of this public experience.
          </p>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-soft">
            Curated corpus · not a total market census · unknown is a meaningful state
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
