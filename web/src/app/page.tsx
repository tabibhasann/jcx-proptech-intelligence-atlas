import { Hero } from "@/components/journey/Hero";
import { SectionRail, SectionProgress } from "@/components/journey/SectionRail";
import { Chapter01 } from "@/components/journey/chapters/Chapter01";
import { Chapter02 } from "@/components/journey/chapters/Chapter02";
import { Chapter03 } from "@/components/journey/chapters/Chapter03";
import { Chapter04 } from "@/components/journey/chapters/Chapter04";
import { Chapter05 } from "@/components/journey/chapters/Chapter05";
import { Chapter06 } from "@/components/journey/chapters/Chapter06";
import { Chapter07 } from "@/components/journey/chapters/Chapter07";
import { Chapter08 } from "@/components/journey/chapters/Chapter08";
import { Chapter09 } from "@/components/journey/chapters/Chapter09";
import { Chapter10 } from "@/components/journey/chapters/Chapter10";
import { Chapter11 } from "@/components/journey/chapters/Chapter11";
import { Reveal } from "@/components/motion/Reveal";

const RAIL: { id: string; order: number; railCodes: string[] }[] = [
  { id: "chapter-01-orientation", order: 1, railCodes: ["L1", "L2", "L3", "L4", "L5", "L6", "L7", "L8", "L9", "L10", "L11", "L12"] },
  { id: "chapter-02-lifecycle-map", order: 2, railCodes: ["L1", "L2", "L3", "L4", "L5", "L6", "L7", "L8", "L9", "L10", "L11", "L12"] },
  { id: "chapter-03-operating-archetypes", order: 3, railCodes: ["L1", "L3", "L6", "L7", "L8", "L9", "L10"] },
  { id: "chapter-04-workflow-frontier", order: 4, railCodes: ["L1", "L2", "L4", "L5", "L6", "L8", "L10"] },
  { id: "chapter-05-outcomes", order: 5, railCodes: ["L1", "L4", "L5", "L6", "L7", "L8", "L10"] },
  { id: "chapter-06-regional-transfer", order: 6, railCodes: ["L1", "L3", "L5", "L6", "L12"] },
  { id: "chapter-07-venture-client", order: 7, railCodes: ["L3", "L12"] },
  { id: "chapter-08-failure-and-risk", order: 8, railCodes: ["L3", "L5", "L7", "L9"] },
  { id: "chapter-09-standards-and-trust", order: 9, railCodes: ["L12"] },
  { id: "chapter-10-opportunity", order: 10, railCodes: ["L1", "L3", "L5", "L6", "L8", "L10", "L12"] },
  { id: "chapter-11-methodology-and-corrections", order: 11, railCodes: ["L12"] },
];

const INDEX: [string, string, string][] = [
  ["01", "The operating system beneath the apps", "chapter-01-orientation"],
  ["02", "The map: lifecycle × technology layer", "chapter-02-lifecycle-map"],
  ["03", "The operators", "chapter-03-operating-archetypes"],
  ["04", "The workflow frontier", "chapter-04-workflow-frontier"],
  ["05", "What has actually been measured", "chapter-05-outcomes"],
  ["06", "Transferability changes by place", "chapter-06-regional-transfer"],
  ["07", "The access layer", "chapter-07-venture-client"],
  ["08", "The reckoning", "chapter-08-failure-and-risk"],
  ["09", "The durable layer", "chapter-09-standards-and-trust"],
  ["10", "The opportunity", "chapter-10-opportunity"],
  ["11", "The trust close", "chapter-11-methodology-and-corrections"],
];

export default function JourneyPage() {
  return (
    <>
      <SectionRail chapters={RAIL} />
      <SectionProgress />
      <Hero />

      {/* Journey index */}
      <nav
        aria-label="Journey index"
        className="border-b border-line bg-paper-raised/60"
      >
        <div className="mx-auto max-w-[1440px] px-4 py-10 sm:px-6 lg:px-10 lg:pl-[calc(var(--spacing-rail)+2.5rem)]">
          <Reveal>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-soft">
              The descent · eleven chapters
            </p>
            <ol className="mt-5 grid gap-x-10 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
              {INDEX.map(([n, label, id]) => (
                <li key={n}>
                  <a
                    href={`#${id}`}
                    className="group flex items-baseline gap-3 py-1.5 text-sm text-ink-2 transition-colors hover:text-mark-deep"
                  >
                    <span className="data text-xs text-mark-deep">{n}</span>
                    <span className="border-b border-transparent group-hover:border-mark/50">{label}</span>
                  </a>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </nav>

      <Chapter01 />
      <div aria-hidden="true" className="h-px bg-line" />
      <Chapter02 />
      <div aria-hidden="true" className="h-px bg-line" />
      <Chapter03 />
      <div aria-hidden="true" className="h-px bg-line" />
      <Chapter04 />
      <div aria-hidden="true" className="h-px bg-line" />
      <Chapter05 />
      <div aria-hidden="true" className="h-px bg-line" />
      <Chapter06 />
      <div aria-hidden="true" className="h-px bg-line" />
      <Chapter07 />
      <Chapter08 />
      <Chapter09 />
      <div aria-hidden="true" className="h-px bg-line" />
      <Chapter10 />
      <div aria-hidden="true" className="h-px bg-line" />
      <Chapter11 />
    </>
  );
}
