import type {
  CaseRecord,
  DiscoveryRecord,
  EcosystemRollup,
  Entity,
  EntityClaims,
  EntitySlim,
  LaunchProfile,
  Relationship,
  SiteManifest,
  SourceSlim,
  Standard,
  Story,
  TaxonomyTerm,
  YcProfile,
} from "./types";

import manifestJson from "./generated/manifest.json";
import entitiesJson from "./generated/entities.json";
import entitiesSlimJson from "./generated/entities.slim.json";
import launchJson from "./generated/launch.json";
import claimsJson from "./generated/claims.public.json";
import casesJson from "./generated/cases.json";
import caseLinksJson from "./generated/case-links.json";
import standardsJson from "./generated/standards.json";
import taxonomyJson from "./generated/taxonomy.json";
import relationshipsJson from "./generated/relationships.public.json";
import ycJson from "./generated/yc.json";
import ecosystemsJson from "./generated/ecosystems.json";
import storyJson from "./generated/story.json";

export const manifest = manifestJson as unknown as SiteManifest;
export const entities = entitiesJson as unknown as Entity[];
export const entitiesSlim = entitiesSlimJson as unknown as EntitySlim[];
export const launchGroups = (launchJson as { groups: { n: number; id: string; title: string }[] }).groups;
export const launchProfiles = (launchJson as unknown as { profiles: LaunchProfile[] }).profiles;
export const claimsByEntity = claimsJson as unknown as Record<string, EntityClaims>;
export const cases = casesJson as unknown as (CaseRecord & { entityIds?: string[] })[];
export const caseIdsByEntity = caseLinksJson as unknown as Record<string, string[]>;
export const getCasesForEntity = (id: string) =>
  (caseIdsByEntity[id] ?? []).map((cid) => cases.find((c) => c.id === cid)!).filter(Boolean);
export const standards = standardsJson as unknown as Standard[];
export const taxonomy = taxonomyJson as unknown as TaxonomyTerm[];
export const relationshipsBySubject = relationshipsJson as unknown as Record<string, Relationship[]>;
export const ycProfiles = ycJson as unknown as YcProfile[];
export const ecosystems = ecosystemsJson as unknown as EcosystemRollup[];
export const story = storyJson as unknown as Story;

/* Heavy explorer datasets (discovery universe, source register) are served
   from /data/*.json and lazy-fetched by client surfaces with explicit
   loading/error/empty states. See useDataset hook. */
export type { DiscoveryRecord, SourceSlim };

const entityMap = new Map(entities.map((e) => [e.id, e]));
export const getEntity = (id: string) => entityMap.get(id);
export const getClaims = (id: string): EntityClaims =>
  claimsByEntity[id] ?? { claims: [], pendingReview: 0, contextOnly: 0 };
export const getRelationships = (id: string): Relationship[] => relationshipsBySubject[id] ?? [];
export const getLaunchProfile = (id: string) => launchProfiles.find((l) => l.entityId === id);

export const taxonomyLabel = (code: string) => taxonomy.find((t) => t.code === code)?.label ?? code;

/** ISO date to prose, e.g. "2026-08-30" to "30 August 2026". */
export const longDate = (iso: string | null | undefined) => {
  if (!iso) return null;
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!m) return iso;
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  return `${Number(m[3])} ${months[Number(m[2]) - 1]} ${m[1]}`;
};

/** Technology layer taxonomy T1–T7 (atlas methodology §3.2, editorial labels). */
export const TECH_LAYERS = [
  { code: "T1", label: "Systems of record", short: "Record" },
  { code: "T2", label: "Applications & bounded workflow", short: "Workflow" },
  { code: "T3", label: "Data & intelligence", short: "Intelligence" },
  { code: "T4", label: "Physical & connected assets", short: "Physical" },
  { code: "T5", label: "Immersive & spatial visualization", short: "Spatial" },
  { code: "T6", label: "Market & financial rails", short: "Rails" },
  { code: "T7", label: "Enabling infrastructure & governance", short: "Governance" },
] as const;
