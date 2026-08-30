import { story } from "@/data";
import type { CaseRecord, EntitySlim, Standard, StoryBeat, StoryChapter, StoryClaimRef } from "@/data/types";

export const chapter = (id: string): StoryChapter => {
  const c = story.chapters.find((x) => x.id === id);
  if (!c) throw new Error(`story chapter missing: ${id}`);
  return c;
};

export const beat = (chapterId: string, beatId: string): StoryBeat => {
  const b = chapter(chapterId).beats.find((x) => x.id === beatId);
  if (!b) throw new Error(`story beat missing: ${beatId}`);
  return b;
};

export const entitiesOf = (b: StoryBeat): EntitySlim[] =>
  b.references.flatMap((r) => (r.type === "entity" && "entity" in r ? [r.entity] : []));

export const casesOf = (b: StoryBeat): CaseRecord[] => [
  ...b.references.flatMap((r) => (r.type === "case" && "case" in r ? [r.case] : [])),
  ...b.caseReferences.flatMap((r) => (r.type === "case" && "case" in r ? [r.case] : [])),
];

export const standardsOf = (b: StoryBeat): Standard[] =>
  b.references.flatMap((r) => (r.type === "standard" && "standard" in r ? [r.standard] : []));

export const claimsOf = (b: StoryBeat): StoryClaimRef[] => b.claimReferences;

/** Find a public (non-withheld) claim by ID across the story. */
export const storyClaim = (id: string): StoryClaimRef | undefined => {
  for (const c of story.chapters)
    for (const b of c.beats)
      for (const r of b.claimReferences) if (!r.withheld && r.claim?.id === id) return r;
  return undefined;
};
