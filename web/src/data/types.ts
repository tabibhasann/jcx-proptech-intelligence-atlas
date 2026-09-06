/** Typed views over the generated public data bundle. */

export interface SiteManifest {
  generatedAt: string;
  researchCutoff: string;
  counts: {
    qualifiedEntities: number;
    organizations: number;
    programs: number;
    products: number;
    projects: number;
    discoveryIdentities: number;
    discoveryOnly: number;
    ycProfiles: number;
    ecosystemPairs: number;
    ecosystemLinkedIdentities: number;
    claims: number;
    fieldAssertions: number;
    relationships: number;
    cases: number;
    standards: number;
    sources: number;
    observedSourceVariants: number;
    lifecycleDomains: number;
    launchProfiles: number;
  };
  claimGradeCounts: Record<string, number>;
  reviewQueue: {
    entities_with_tier_conflicts: number;
    entities_without_verified_canonical_domain: number;
    entities_requiring_editorial_review: number;
    claims_requiring_claim_level_review: number;
    discovery_identities_requiring_resolution: number;
  };
  statusCounts: Record<string, number>;
  topHqCountries: Record<string, number>;
  caseGradeDist: Record<string, number>;
  statusDist: Record<string, number>;
  tierDist: Record<string, number>;
  recordTypeDist: Record<string, number>;
  matrixCounts: Record<string, number>;
  importantNote: string;
}

export type RecordType = "organization" | "product_offering" | "program_ecosystem" | "project";

export interface Entity {
  id: string;
  name: string;
  aliases: string[];
  recordType: RecordType;
  recordTypeBasis: string | null;
  canonicalUrl: string | null;
  canonicalUrlStatus: string | null;
  discoveryProfileUrls: string[];
  status: string;
  operatingStatusLegacy: string | null;
  statusConflict: boolean;
  statusEvidenceDate: string | null;
  statusObservedAt: string | null;
  statusDateNote: string | null;
  lastVerified: string | null;
  hqCountry: string | null;
  hqCountryConflict: boolean;
  operatingRegions: string[];
  foundingYear: string | null;
  foundingYearNote: string | null;
  businessModels: string[];
  ecosystemMemberships: string[];
  lifecycleCodes: string[];
  lifecycleMappingMethods: string[];
  lifecycleUnmappedLabels: string[];
  categoryLabels: string[];
  description: string | null;
  descriptionBasis: "category" | "launch" | "lifecycle" | "none";
  maturityBand: string | null;
  mrl: string | null;
  mrlNote: string | null;
  tier: string | null;
  tierConflict: boolean;
  jcxRelevanceNotes: string[];
  jcxNotesWithheld: number;
  sourceGradesProvisional: string[];
  sourceCount: number;
  sourceUrls: string[];
  sourceDatasets: string[];
  mergedRecordCount: number;
  publicationReadiness: string | null;
  reviewFlags: string[];
}

export interface EntitySlim {
  id: string;
  name: string;
  recordType: RecordType;
  status: string;
  statusConflict: boolean;
  tier: string | null;
  tierConflict: boolean;
  lifecycleCodes: string[];
  hqCountry: string | null;
  operatingRegions: string[];
  sourceCount: number;
  publicationReadiness: string | null;
  reviewFlags: string[];
  lastVerified: string | null;
  canonicalUrl: string | null;
  maturityBand: string | null;
  mrl: string | null;
  description: string | null;
  descriptionBasis?: "category" | "launch" | "lifecycle" | "none" | null;
  category: string | null;
  launch?: string | null;
  launchOrder?: number | null;
}

export interface PublicClaim {
  id: string;
  field: string;
  text: string;
  grade: string;
  gradeBasis: string | null;
  caveat: string | null;
  sourceUrls: string[];
  sourceGrades: string[];
  retrievedAt: string | null;
}

export interface EntityClaims {
  claims: PublicClaim[];
  pendingReview: number;
  contextOnly: number;
}

export interface LaunchProfile {
  order: number;
  entityId: string;
  name: string;
  group: string;
  groupTitle: string;
  context: string;
  why: string;
  boundary: string;
}

export interface CaseRecord {
  id: string;
  organization: string;
  vendor: string;
  geography: string | null;
  lifecycle: string | null;
  category: string | null;
  baselineProblem: string | null;
  intervention: string | null;
  measuredOutcome: string | null;
  periodSampleDenominator: string | null;
  sourceType: string | null;
  grade: string | null;
  causalCaveat: string | null;
  transferability: string | null;
  sourceUrl: string | null;
  verificationDate: string | null;
}

export interface Standard {
  id: string;
  name: string;
  domain: string;
  statusOrVersion: string | null;
  solves: string | null;
  adoption: string | null;
  license: string | null;
  url: string | null;
  jcxImplication: string | null;
  caveat: string | null;
  asOf: string | null;
}

export interface TaxonomyTerm {
  code: string;
  label: string;
  version: string;
  note: string;
}

export interface Relationship {
  id: string;
  type: string;
  objectName: string | null;
  objectEntityId: string | null;
  status: string;
  sourceUrls: string[];
  retrievedAt: string | null;
  note: string | null;
}

export interface DiscoveryRecord {
  id: string;
  name: string;
  nameVariants: string[];
  recordTypeSignals: string[];
  qualifiedEntityIds: string[];
  stage: "qualified_core" | "discovery_only";
  discoveryOnly: boolean;
  sourceLayers: string[];
  domains: string[];
  candidateUrl: string | null;
  profileUrl: string | null;
  ycBatches: string[];
  ycStatuses: string[];
  ecosystems: string[];
  ecosystemStatusSignals: string[];
  categorySignals: string[];
  lifecycleSignals: string[];
  tierSignals: string[];
  regionSignals: string[];
  countrySignals: string[];
  locationSignals: string[];
  descriptionSignals: string[];
  sourceUrlCount: number;
  needsIdentityReview: boolean;
  identityNotes: string[];
  snapshotDate: string | null;
  publicationNote: string | null;
}

export interface YcProfile {
  slug: string;
  name: string;
  url: string;
  batch: string | null;
  status: string | null;
  employeesShown: string | null;
  location: string | null;
  countryCode: string | null;
  oneLiner: string | null;
  description: string | null;
  tags: string | null;
  inferredLifecycle: string | null;
  inferredCategory: string | null;
  screeningTier: string | null;
  screeningBasis: string | null;
  inPropTechDirectory: boolean;
  inRealEstateDirectory: boolean;
  snapshotDate: string | null;
  caveat: string | null;
}

export interface EcosystemRollup {
  name: string;
  type: string;
  pairs: number;
  regions: string[];
  captureDate: string;
}

export interface SourceSlim {
  id: string;
  url: string;
  domain: string;
  sourceClass: string | null;
  grade: string | null;
  gradeStatus: string | null;
  usedByNames: string | null;
  usedByDocuments: string | null;
  lastVerified: string | null;
}

export interface StoryClaimRef {
  type: "claim";
  withheld: boolean;
  grade?: string;
  entityName?: string;
  note?: string | null;
  claim?: {
    id: string;
    entityId: string;
    entityName: string;
    text: string;
    grade: string;
    caveat: string | null;
    sourceUrls: string[];
    sourceGrades: string[];
    retrievedAt: string | null;
  };
}

export type StoryRef =
  | { type: "entity"; entity: EntitySlim; note: string | null }
  | { type: "case"; case: CaseRecord; note: string | null }
  | { type: "standard"; standard: Standard; note: string | null }
  | { type: "document"; id: string; locator: string | null }
  | { type: "document"; withheld: true }
  | { type: string; id?: string; locator?: string | null }
  | StoryClaimRef;

export interface StoryBeat {
  order: number;
  id: string;
  title: string;
  references: StoryRef[];
  claimReferences: StoryClaimRef[];
  caseReferences: StoryRef[];
  caveats: string[];
  openQuestions: string[];
}

export interface StoryChapter {
  order: number;
  id: string;
  title: string;
  purpose: string;
  caveats: string[];
  openQuestions: string[];
  beats: StoryBeat[];
}

export interface Story {
  id: string;
  version: string;
  researchCutoff: string;
  thesis: string;
  supportingArguments: string[];
  thesisCaveats: string[];
  chapters: StoryChapter[];
}
