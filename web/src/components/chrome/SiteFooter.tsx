import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-paper-deep/60">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-4 py-14 sm:px-6 md:grid-cols-3 lg:px-10">
        <div>
          <p className="font-display text-xl font-semibold">Propty / Research & strategy</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-soft">
            Global company evidence. Local questions. A proposed path for property technology in Bangladesh.
          </p>
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft">
            Edition review · 12 September 2026<br />
            Base corpus · 30 August 2026<br />
            Selected source checks · 12 September 2026
          </p>
        </div>
        <div className="text-sm">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft">Explore</p>
          <ul className="mt-4 space-y-2.5">
            {[
              ["/", "The executive overview"],
              ["/plan", "Product options and roadmap"],
              ["/companies", "Company summary table"],
              ["/capabilities", "The capability matrix"],
              ["/guide", "Start here: the basics"],
              ["/research", "All research sections"],
              ["/startups", "YC startup shortlist"],
              ["/comparison", "Company and country comparisons"],
              ["/evidence", "Measured cases"],
              ["/atlas", "Research archive"],
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
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft">Reading the evidence</p>
          <p className="mt-4 leading-relaxed text-ink-soft">
            Research, not advice: company-reported figures are labeled, filing records are separate from vendor stories, and a listing is never a recommendation to buy.
          </p>
          <p className="mt-3 leading-relaxed text-ink-soft">
            Private forecasts, budgets and internal criticism live outside this site by design.
          </p>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-soft">
            Unknown is a real answer · public-safe edition
          </p>
        </div>
      </div>
    </footer>
  );
}
