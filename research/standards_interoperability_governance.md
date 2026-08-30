# Standards, Interoperability & Governance for a JCX PropTech Platform

**Research date:** 30 August 2026  
**Scope:** standards and governance that should sit beneath a real-estate developer's website, project systems, automation layer, digital-twin program, sustainability reporting, and future PropTech ecosystem.

## Executive conclusion

The strategic mistake in a digital-transformation program is to treat interoperability as a later integration task. For a developer, the durable product is the information spine: a stable identity for each project, site, building, floor, space, system, asset, sensor, document, work order, person/party, contract, and carbon/financial measure. Applications can change; the information spine must survive them.

JCX should use a deliberately layered standards strategy:

1. **ISO 19650 + openBIM** for project information management and design/construction exchange.
2. **IFC 4.3 / ISO 16739-1:2024, IDS, BCF, bSDD and openCDE** for model exchange, requirements, issue coordination, vocabulary, and common-data-environment APIs.
3. **ISO 23386:2020 + ISO 23387:2025** for governed, machine-readable property and product data templates.
4. **OSCRE IDM** for enterprise real-estate and investment/occupier data, with a JCX extension rather than a competing dictionary.
5. **Brick, Project Haystack and/or RealEstateCore** for semantic building operations. Select one canonical internal representation and maintain explicit crosswalks; never let each vendor's tags become the master vocabulary.
6. **OGC APIs, SensorThings API and CityGML** for land, site, geospatial, city-scale and sensor data.
7. **BACnet/SC and Modbus adapters** at the building-automation edge, with an integration gateway separating unsafe/legacy protocols from the internet and the canonical platform.
8. **GHG Protocol, RICS WLCA, CRREM and GRESB** for operational/embodied carbon, transition risk, and investor-facing sustainability evidence.
9. **ISO 55000/55001/55013, ISO 41001, ISO/IEC 27001, NIST CSF 2.0 and ISO/IEC 42001/NIST AI RMF** for asset management, facility management, cyber risk and responsible AI.

No one standard covers the entire lifecycle. IFC is not an ERP; BACnet is not a data dictionary; a digital-twin runtime is not a neutral model; GRESB is an assessment, not a building data schema; and a website API is not an information-management process. JCX's advantage would be the mappings and governance between these standards.

## 1. What “interoperable” must mean

Use four separate tests instead of the vague claim “the software integrates.”

| Test | Question | JCX acceptance evidence |
|---|---|---|
| Syntactic | Can another system parse the file/API? | Valid IFC/BCF/IDS/JSON/OpenAPI/OGC response; schema-validation report |
| Semantic | Does a “floor area,” “chiller,” “handover date,” or “Scope 2” mean the same thing? | URI, definition, unit, classification, allowed values and crosswalk |
| Process | Can a party complete a workflow across system boundaries? | Round-trip test: requirement → exchange → issue → approval → handover |
| Operational | Does the connection remain secure, observable and supportable? | Identity, authorization, audit log, rate limits, retries, offline behavior, incident runbook |

An open file format alone does not deliver interoperability. A supplier can export syntactically valid IFC while omitting the properties required for operation. An API can be “open” while retaining undocumented vendor semantics. Every JCX RFP should therefore specify an information requirement, exchange format, validation rule, ownership, and acceptance test.

## 2. Built-environment information standards

### 2.1 buildingSMART openBIM stack

**IFC (Industry Foundation Classes).** IFC is the open international BIM data standard for exchanging information among construction and facility-management applications. ISO 16739-1:2024 is the current published ISO edition and adds infrastructure coverage including bridges, roads, railways, waterways and ports. The official IFC 4.3 documentation describes lifecycle coverage, schema, property/quantity sets and exchange mechanisms. Sources: [ISO 16739-1:2024](https://www.iso.org/standard/84123.html), [IFC 4.3 scope](https://standards.buildingsmart.org/IFC/RELEASE/IFC4_3/HTML/content/scope.htm).

**What it solves:** exchange of spatial, physical, system, process, actor, cost and context information across authoring, coordination, construction and operations tools.  
**Maturity:** high as an open exchange standard; implementation quality varies by software, discipline, model view and export settings. IFC should be treated as an exchange/archival contract, not necessarily the transactional database.  
**JCX rule:** require IFC 4.3 where supported, publish the exact model view/exchange requirement, and validate both schema and business properties. Retain the native source only as a controlled deliverable, not as the only usable record.  
**Risk:** “IFC compatible” may mean geometry-only export, stale versions, broken relationships, missing GUID stability, or loss of quantities/classification. Test round-trips with the actual consultants and contractors.

**IDS (Information Delivery Specification).** IDS v1.0 reached final standard status in June 2024. It lets owners express machine-readable information requirements and validate whether an IFC dataset contains the required classes, properties, values and constraints. Source: [buildingSMART IDS v1.0 announcement](https://www.buildingsmart.org/information-delivery-specification-ids-v1-0-is-approved-as-a-final-standard/).

**What it solves:** replacing PDF/spreadsheet requirements that are difficult to validate with explicit, automatable delivery checks.  
**Maturity:** final standard, with growing tool support; IDS is narrower and more practical than trying to encode every contract in a model.  
**JCX rule:** every project information requirement should have an IDS file and a versioned validation report at design, procurement, construction and handover gates. IDS should reference bSDD/URI terms where possible.  
**Risk:** IDS validates declared model content, not truth in the physical asset; poor requirements produce perfectly valid but useless models.

**BCF (BIM Collaboration Format).** BCF is an openBIM issue-coordination standard available as file exchange or web service/API. It identifies model-based issues, viewpoints, snapshots, comments, status and responsibility without requiring proprietary model files. Sources: [BCF overview](https://www.buildingsmart.org/standards/bsi-standards/bim-collaboration-format/), [technical BCF page](https://technical.buildingsmart.org/standards/bcf/).

**What it solves:** interoperable clash/defect/design-review communication.  
**Maturity:** high and implemented by many BIM tools; file and API capabilities should be tested separately.  
**JCX rule:** make BCF issue ID, IFC GUID, responsible party, due date, status, evidence and resolution a first-class project record; never bury all coordination history in email or a vendor database.  
**Risk:** BCF is an issue layer, not a full document-control or change-control system; coordinate permissions, attachments and retention in the CDE.

**bSDD (buildingSMART Data Dictionary).** bSDD is a service of interconnected dictionaries containing classes, properties, allowed values, translations, relations and identifiers. Its API is the primary integration surface, and dictionaries may be published by independent organizations. Sources: [bSDD overview](https://www.buildingsmart.org/users/services/buildingsmart-data-dictionary/), [API guidance](https://technical.buildingsmart.org/services/bsdd/using-the-bsdd-api/), [data structure](https://technical.buildingsmart.org/services/bsdd/data-structure/).

**What it solves:** stable, multilingual, machine-readable meaning for objects and properties; mapping between IFC, national/product/company dictionaries.  
**Maturity:** live service and API; content coverage and governance differ by dictionary.  
**JCX rule:** use bSDD/IFC URIs for international terms and create a governed JCX dictionary for Bangladesh-specific terms, Bengali labels, local approval stages, plot identifiers, utility tariffs and company-specific fields. Version every term; do not copy an unversioned API response into production.  
**Risk:** bSDD is a service and may change content/version; the official guidance warns against using identifier URLs for system-to-system communication and recommends versioned API use. Cache terms with source/version metadata.

**openCDE APIs.** buildingSMART's openCDE family includes APIs for documents, BCF, bSDD and foundation/common functions. The goal is to connect online common-data environments using open APIs. Source: [buildingSMART services](https://services.buildingsmart.org/), [terminology/openCDE description](https://user.buildingsmart.org/knowledge-base/terminology/).

**JCX rule:** request API export/import, webhook/event support, bulk export and deletion/retention controls in addition to a user interface. Treat any vendor CDE as replaceable by making the authoritative deliverables portable.

### 2.2 ISO information-management series

**ISO 19650.** The series sets information-management concepts and processes across the lifecycle when BIM is used. Part 4 covers information exchange; Part 5 covers security-minded information management; Part 6 (2025) covers health and safety information. ISO's 2026 BIM overview lists the family alongside IFC, data templates and information-delivery standards. Sources: [ISO BIM standards overview](https://www.iso.org/sectors/building-construction/building-information-modelling), [ISO 19650-1 overview](https://www.iso.org/obp/ui?_escaped_fragment_=iso%3Astd%3Aiso%3A19650%3A-1%3Adis%3Aed-2%3Av1%3Aen), [ISO 19650-5](https://www.iso.org/standard/74206.html).

**What it solves:** who needs what information, when, why, in what level of information need, with what approval/status/security process.  
**Maturity:** high process standard in BIM-led markets; actual adoption is organizational and contractual, not automatic.  
**JCX rule:** create an organizational information requirements (OIR), asset information requirements (AIR), project information requirements (PIR), exchange information requirements (EIR), BIM execution plan, common-data-environment status codes and responsibility matrix. Use ISO 19650-5 sensitivity triage before publishing security plans, access-control drawings, tenant data or critical-system information.  
**Risk:** certification language can create paperwork without outcomes. Link every requirement to a decision, workflow and acceptance test.

**ISO 23386:2020 and ISO 23387:2025.** ISO 23386 defines how properties are described, authored and maintained in interconnected data dictionaries, including roles, expert review and mapping governance. It was confirmed current in 2025. ISO 23387:2025 is the current second edition for machine-interpretable data templates for objects across the asset lifecycle; it adds harmonization with ISO 12006-3 and an XSD representation. Sources: [ISO 23386:2020](https://www.iso.org/standard/75401.html), [ISO 23387:2025](https://www.iso.org/standard/85391.html).

**What it solves:** the “same field, different definition/unit” problem for products, equipment, spaces and asset objects.  
**JCX rule:** create templates for project, parcel, building, apartment/unit, equipment, meter, work order and environmental measure. Each property needs a definition, data type, unit, allowed values, source, responsible owner, status, version and mapping.  
**Risk:** standards define the method, not the actual content; JCX still needs a dictionary commission and change-control process.

**ISO 55000 series and ISO 41001.** ISO 55000:2024 establishes asset-management vocabulary, principles, outcomes and maturity; ISO 55001:2024 provides requirements; ISO 55013:2024 addresses data assets; ISO 41001:2018+A1:2024 addresses facility-management management systems. Sources: [ISO 55000 series](https://committee.iso.org/sites/tc251/home/projects/published/iso-55000.html), [ISO 55001:2024](https://www.iso.org/standard/83054.html), [ISO management-system list](https://www.iso.org/management-system-standards-list.html).

**JCX implication:** an asset record should connect physical condition, risk, service level, lifecycle cost, energy/carbon, work history and financial objective. A digital twin that cannot support maintenance priorities or investment decisions is a visualization, not asset management.

### 2.3 Enterprise real-estate data: OSCRE

OSCRE's Industry Data Model (IDM) is an open-standard, integrated real-estate model covering the asset lifecycle. OSCRE states that the model contains definitions used in 130+ use cases on its introducing page (the current home page references 150+), exposes downloadable JSON/XML technical schemas, and maintains a dictionary of more than 5,000 real-estate terms. Sources: [OSCRE IDM](https://www.oscre.org/Industry-Data-Model/Introducing-the-Data-Model), [OSCRE FAQ](https://www.oscre.org/Resources/FAQs), [OSCRE home](https://www.oscre.org/).

**What it solves:** portfolio, investment, occupier, lease, transaction, valuation and enterprise data fragmentation—especially across owners, occupiers, software suppliers, M&A and joint ventures.  
**Maturity:** industry-led and broad; access to the full IDM requires registration/license acceptance, while public explanations and samples are available.  
**JCX rule:** use OSCRE concepts for enterprise real estate, leasing, occupancy, parties, units and investment data; map them to the project/BIM and operations layers instead of inventing parallel definitions. Extend only where Bangladesh or JCX-specific processes require it.  
**Risk:** OSCRE and IFC solve different layers. Do not force the OSCRE enterprise model into a BIM geometry model or use IFC as the CRM/lease ledger.

## 3. Building semantics and digital twins

### 3.1 Brick Schema

Brick is an open-source semantic schema for physical, logical and virtual building assets and their relationships, including HVAC, lighting, fire, security and other subsystems. It uses Semantic Web/RDF concepts and is designed for machine-readable building metadata. Sources: [Brick documentation](https://docs.brickschema.org/), [design principles](https://docs.brickschema.org/brick/overview.html), [open-source repository](https://github.com/BrickSchema/Brick).

**Best fit:** canonical operational graph for equipment, points, zones, locations, feeds, controls and analytics across buildings.  
**Maturity:** open-source and actively documented; strongest in research, smart-building analytics and technically sophisticated owners.  
**JCX rule:** use Brick when cross-building analytics and BMS normalization are strategic. Require point-to-equipment, equipment-to-space and space-to-floor/site relationships, not only sensor names.  
**Risk:** modeling effort is significant; Brick alone does not provide the entire enterprise, project or lease model. Maintain mappings to Haystack, RealEstateCore and bSDD.

### 3.2 Project Haystack

Project Haystack is an open-source suite for modeling IoT data: data types, file formats, HTTP API, ontology and extensible definitions. Its focus is semantic tagging of buildings, equipment and sensors for automation, HVAC, lighting and energy. Sources: [Project Haystack](https://project-haystack.org/), [Haystack introduction](https://www.project-haystack.org/doc/docHaystack/Intro).

**Best fit:** pragmatic tagging and API exchange at the controls/BMS edge, especially when integrating existing equipment.  
**Maturity:** widely encountered in building automation; flexibility is a strength and ambiguity a risk. Recent research continues to identify inconsistent tag use and limited automated validation, so JCX should validate profiles.  
**JCX rule:** accept Haystack imports, but normalize them into the JCX canonical graph with mapping confidence and source tags. Define a minimum local profile for `site`, `building`, `floor`, `space`, `equip`, `point`, units and time series.

### 3.3 RealEstateCore (REC)

RealEstateCore is a modular, open ontology for property-owner data covering building structures, ownership, inhabitants, technical systems, sensors and events. The public repository includes DTDL material and a `rec-5` branch updated in 2026. Sources: [REC ontology repository](https://github.com/RealEstateCore/rec), [REC consortium](https://github.com/RealEstateCore).

**Best fit:** bridge between property/ownership concepts and building operational data; useful for digital-twin graph design.  
**Maturity:** open community ontology, not an ISO standard or universal market contract; assess version stability and active implementations before making it the sole canonical model.  
**JCX rule:** use REC as a candidate crosswalk/reference ontology and evaluate it against Brick and OSCRE in a pilot. Do not silently mix REC versions.

### 3.4 DTDL and cloud digital-twin runtimes

Microsoft's Digital Twins Definition Language is JSON-LD based; Azure Digital Twins supports DTDL v2 and v3. DTDL models define interfaces, properties, components and relationships with Digital Twin Model Identifiers. Sources: [Microsoft DTDL models](https://learn.microsoft.com/en-us/azure/digital-twins/concepts-models), [Azure Digital Twins documentation](https://learn.microsoft.com/en-us/azure/digital-twins/).

**Best fit:** deployable cloud runtime and twin graph with APIs, query and data ingress/egress.  
**Maturity:** mature product/runtime, but DTDL is tied to Microsoft's model/runtime semantics more than IFC/OSCRE are.  
**JCX rule:** if using a cloud twin, keep a neutral export in JSON-LD/JSON Schema/RDF/CSV plus original IFC and source events. Use DTDL as a projection/adapter, not the only system of record. Pin DTDL version and model IDs; test migration.

### 3.5 Selection decision

Do not hold a philosophical ontology debate before a use case. Run the same 3–5 use cases—HVAC fault, energy baseline, work order, unit handover, asset replacement—through Brick, Haystack and REC mappings. Select the canonical operational graph based on query quality, onboarding effort, bilingual/local extension, tool support, and exportability. It is acceptable to ingest all three and expose one normalized JCX API.

## 4. Automation protocols and edge interoperability

### BACnet and BACnet/SC

BACnet is the global building-automation and control-network protocol maintained by ASHRAE; it is ISO/EN ISO 16484-5 and supports HVAC, lighting, access, elevators, security and fire-detection applications. BACnet International maintains a product certification/BTL listing. ANSI/ASHRAE 135-2024 was published in December 2024; addendum material includes authentication/authorization and BACnet/SC changes. Sources: [BACnet overview](https://bacnet.org/about-bacnet-standard/), [BACnet 2024 updates](https://bacnet.org/), [addenda/security updates](https://bacnet.org/addenda/).

**JCX:** require BACnet/IP or BACnet/SC gateway access where available; prefer BACnet/SC for new secure deployments; require BTL-listed devices where practical; document read/write objects, engineering units, alarms, trends and command authority. Never expose a controller directly to the public internet.

### Modbus

Modbus is a simple, pervasive application-layer request/reply protocol. The Modbus Organization publishes the application protocol V1.1b3, TCP/serial implementation guidance and a Modbus Security protocol that wraps Modbus in TLS with X.509 client/server authentication on port 802. The serial specification is identified as legacy for new implementations. Source: [Modbus specifications](https://www.modbus.org/modbus-specifications).

**JCX:** treat Modbus as an edge ingestion/control protocol, not semantic truth. Store register map, scaling, signedness, unit, polling interval, quality and source timestamp. Use a gateway, network segmentation and allow-listed commands; default to read-only.

### Matter

Matter is an IPv6-based interoperable application layer for smart-home devices from the Connectivity Standards Alliance. It is relevant to residential unit-level devices and consumer ecosystems, but is not a replacement for commercial BMS protocols. Source: [Matter specification](https://csa-iot.org/wp-content/uploads/2024/05/matter-1-3-core-specification.pdf).

**JCX:** use Matter selectively for apartments and resident experience; define commissioning, tenant ownership, device lifecycle and offboarding. Do not promise that Matter makes commercial HVAC, fire, elevator or access systems interoperable.

### Edge design rules

- Use a local gateway that buffers telemetry during internet/power outages and forwards with original timestamps.
- Separate operational technology from IT and cloud; use VLAN/firewall/identity controls and explicit command authorization.
- Store source protocol, device ID, point/register, unit, quality, calibration and transformation lineage.
- Treat safety-critical systems as read-only integrations unless a qualified controls engineer approves command paths and fail-safe behavior.
- Require a replacement plan: export point metadata, schedules, alarms, trends and configuration before any gateway or vendor contract ends.

## 5. GIS, city models and sensor APIs

**OGC API – Features.** A modern REST/OpenAPI family for fine-grained create/modify/query access to real-world geospatial features, including coordinate reference systems and filtering. Part 1 is also ISO 19168-1:2020. Source: [OGC API – Features](https://www.ogc.org/standards/ogcapi-features/).

**OGC SensorThings API 1.1.** An open, geospatially enabled API connecting IoT devices, observations, metadata and tasking. Source: [OGC SensorThings](https://www.ogc.org/standards/sensorthings/).

**CityGML 3.0 / CityJSON.** OGC CityGML defines a conceptual model and exchange format for virtual 3D city models. CityGML 3.0 improves integration with BIM, indoor spaces, sensors/simulation data and application-domain extensions; CityJSON is a related JSON encoding. Source: [OGC CityGML](https://www.ogc.org/standards/citygml/).

**JCX use:**

- Use OGC API – Features for parcels, roads, buildings, permits, amenities, hazards and project sites.
- Use SensorThings for observations where an OGC-compatible sensor API is valuable; keep high-volume time series in a purpose-built store behind the same identity layer.
- Use CityGML/CityJSON for district/urban context and IFC for building/project asset detail; link them by stable IDs and geometry references.
- Use WGS 84/EPSG:4326 as a web interchange default only when appropriate; preserve the source CRS and expose CRS by reference. Never discard survey/project CRS precision.

## 6. Carbon, energy, climate and investor reporting

### GHG Protocol

The GHG Protocol Corporate Value Chain (Scope 3) Standard helps organizations assess their entire value chain and identify reduction opportunities. Use it with the Corporate Standard and Product Standard, not as a property geometry schema. Source: [GHG Protocol Scope 3](https://ghgprotocol.org/corporate-value-chain-scope-3-standard).

**JCX data requirement:** each emission record needs organizational boundary, operational-control/ownership basis, scope/category, activity data, unit, emission factor, factor source/version, location, period, evidence, estimation flag and assurance status. Keep landlord, tenant and whole-building views separate; do not double count.

### RICS Whole Life Carbon Assessment

The RICS WLCA 2nd edition is a global professional standard in full effect from 1 July 2024. It covers embodied, operational and user carbon and requires deviations from the standard to be recorded. Source: [RICS WLCA](https://www.rics.org/profession-standards/rics-standards-and-guidance/sector-standards/construction-standards/whole-life-carbon-assessment).

**JCX:** connect design quantities/EPDs, construction procurement, operational energy, maintenance/replacement and end-of-life scenarios. Store life-cycle module, boundary, scenario, data quality and deviation fields. Do not compare two projects without aligning area basis, system boundary and factor vintage.

### CRREM

CRREM provides science-based real-estate energy/carbon pathways and a “misalignment year” for transition-risk analysis. The 2026 library publishes pathways, factors and lookups; current material describes 44+ countries and major property types. Its June 2026 methodology and July 2026 updates are governed by a Technical Council and Foundation Board, with an EUI methodology review and future revisions in progress. Sources: [CRREM methodology](https://crrem.org/pathways/methodology/), [CRREM 2026 library](https://crrem.org/learn/), [CRREM change protocol](https://crrem.org/pathways/updates/).

**JCX:** store CRREM version, country/region, property type, floor-area basis, energy/carbon intensity, factors, occupancy assumption, pathway scenario and misalignment result. Recalculate when the pathway version changes; never present a misalignment year without the version and assumptions. CRREM is primarily operational/in-use; pair with RICS WLCA for embodied carbon.

### GRESB

GRESB is an investor-driven sustainability benchmark and reporting framework for real-estate managers, funds, developers and investors. Its 2026 updates include embodied-carbon recognition, net-zero format changes, GHG-scope reclassification and clearer estimation guidance. GRESB says its data is self-reported and subject to multi-layer validation; 2026 methodology changes are not a stable forever-schema. Sources: [GRESB assessment](https://www.gresb.com/real-estate-assessment/), [2026 updates](https://www.gresb.com/insights/2026-gresb-real-estate-standard-updates/), [2026 GHG indicator](https://guides.gresb.com/completingassessments/2026-real-estate-assessment/re/perf/ghg/gh1-scope-1-3-emissions).

**JCX:** implement GRESB as a reporting projection with evidence links, not as the canonical database. Preserve year/methodology/indicator and source records because weights, scope classifications and requirements change. Do not imply that a GRESB score proves technical performance.

### WiredScore and SmartScore

WiredScore certification assesses digital connectivity of buildings; SmartScore assesses smart-building capability and user/operational outcomes. Source: [WiredScore certifications](https://wiredscore.com/).

**JCX:** use these as external certification/benchmark records—certificate, scheme/version, assessment date, evidence, scope and expiry—not as a substitute for network topology, device inventory, data-quality or cyber controls. Confirm current scheme requirements before contractually promising a score.

## 7. Security, privacy, safety and AI governance

### Security baseline

- **ISO/IEC 27001:2022:** information-security management system for confidentiality, integrity and availability; use it for organization-wide controls, risk treatment, supplier assurance and audit evidence. Source: [ISO/IEC 27001](https://www.iso.org/standard/27001.html).
- **NIST CSF 2.0:** practical governance and risk framework with profiles and mappings; use it to establish current/target profiles for corporate IT, project CDE and building OT. Source: [NIST CSF](https://www.nist.gov/cyberframework).
- **ISO 19650-5:** security-minded BIM information management; use sensitivity triage before sharing drawings, access plans, security systems, critical infrastructure and personal/tenant information. Source: [ISO 19650-5](https://www.iso.org/standard/74206.html).
- **IEC 62443:** use for industrial/operational-technology zones, system security requirements and supplier responsibilities where BMS/PLC integration becomes consequential. Source: [ISA/IEC 62443 overview](https://www.isa.org/standards-and-publications/isa-standards/isa-62443-series-of-standards).

Minimum JCX controls: SSO/MFA; least-privilege RBAC/ABAC; tenant/project/asset-level row security; network segmentation; secrets management; encryption in transit/at rest; immutable audit events; backups and restore tests; vulnerability/patch policy; supplier SBOM and incident-notification terms; camera/biometric restrictions; retention/deletion; disaster recovery with RTO/RPO; and an emergency manual fallback for building operations.

### Privacy and Bangladesh legal watch

Bangladesh's National Cyber Security Agency publishes the Personal Data Protection Ordinance 2025, Cyber Security Ordinance 2025 and related acts/rules on its official acts page. Bangladesh's National Data Governance Ordinance 2025 is published in the official laws portal. Bangladesh National Digital Architecture (BNDA) publishes standards that include Unicode support, data-classification controls and open GIS GML/Catalogue/KML guidance. Sources: [NCSA acts and rules](https://ncsa.gov.bd/site/page/50cf7d8c-954c-413f-8f23-eee744a1cd8d/Acts-%26-Rules), [Bangladesh laws portal—National Data Governance Ordinance](https://bdlaws.minlaw.gov.bd/act-print-1573.html), [BNDA standards](https://nda.bcc.gov.bd/standards/standard-single.jsp?standard=Mw%3D%3D), [BNDA framework](https://bnda.gov.bd/standards).

This is a legal watchlist, not legal advice. Before collecting NID/passport scans, tenant applications, employee data, visitor logs, CCTV/biometrics, payment data or precise occupancy traces, JCX should obtain Bangladesh counsel's current interpretation of lawful basis, controller/processor roles, cross-border transfer, localization, breach reporting, data-subject rights and retention. Design to the stronger principle now: purpose limitation, minimization, explicit access, separation of identity from analytics, and deletion/retention controls.

### AI governance

- **NIST AI RMF 1.0:** voluntary, rights-preserving, use-case-agnostic framework for managing AI risk; NIST states it is being revised and has a 2026 critical-infrastructure profile concept. Source: [NIST AI RMF](https://www.nist.gov/itl/ai-risk-management-framework).
- **ISO/IEC 42001:2023:** published AI management-system standard; applies to organizations that develop, provide or use AI and covers policies, accountability, risk, transparency and continual improvement. Source: [ISO/IEC 42001](https://www.iso.org/standard/42001).
- **ISO/IEC 42005:2025:** AI system impact assessment standard; use it for tenant screening, credit/affordability scoring, predictive maintenance with safety effects, worker monitoring, camera analytics and generative decision support. Source: [ISO AI standards overview](https://www.iso.org/ics/35.020/x/).
- **EU AI Act (Regulation 2024/1689):** binding EU regulation with risk-based obligations; relevant to vendors serving EU customers or processing EU-person data, and useful as a high bar even if JCX operates in Bangladesh. Source: [EUR-Lex AI Act](https://eur-lex.europa.eu/eli/reg/2024/1689/oj?locale=en).

**JCX AI release gate:** define purpose and affected people; classify risk; record training/ground-truth data; test bias and accuracy by relevant groups; document human oversight and appeal; log model/prompt/version/output; prohibit autonomous safety/credit/tenant decisions without approved controls; provide data deletion and vendor no-training terms; monitor drift; and maintain a kill switch/manual process.

## 8. Recommended canonical JCX property/project data architecture

### 8.1 System-of-record principle

Use a **federated canonical model**, not a giant replacement system:

```text
Sources / edge
  BIM & GIS | ERP/CRM | CDE | BMS/IoT | finance/leases | surveys/documents
      ↓ adapters (IFC/IDS/BCF/openCDE/OGC/STA/BACnet/Modbus/CSV/API)
Ingestion + validation + identity resolution + provenance
      ↓
JCX canonical information spine
  relational + PostGIS entities | document/object store | time-series | optional graph
      ↓ projections
  website/search | dashboards | project controls | FM/work orders | ESG/CRREM/GRESB
  partner APIs | exports | analytics/AI | audit/evidence portal
```

### 8.2 Canonical entities and identifiers

Use globally unique, immutable IDs with human-readable aliases. Suggested namespaces:

`organization`, `party`, `project`, `site`, `parcel`, `building`, `building_part`, `floor`, `zone`, `space`, `unit`, `system`, `equipment`, `component`, `sensor`, `point`, `document`, `model`, `issue`, `requirement`, `contract`, `procurement_package`, `supplier`, `lease`, `occupancy_event`, `work_order`, `inspection`, `permit`, `cost_record`, `energy_observation`, `emission_record`, `carbon_assessment`, `risk`, `decision`, `certificate`, `source`, `claim`, `workflow_event`.

Each record should include: `id`, `type`, `name`, `status`, `valid_from`, `valid_to`, `source_system`, `source_record_id`, `created_at`, `updated_at`, `owner`, `classification_uri`, `geometry/parent`, `provenance`, `confidence`, `security_class`, `retention_class` and `version`.

IDs must survive vendor migration. Store mappings such as `ifc_guid`, `revit_id`, `haystack_ref`, `brick_uri`, `bacnet_device_instance`, `modbus_register`, `erp_code`, `lease_unit_code`, local plot/holding number and external API IDs as aliases—not as the JCX primary ID.

### 8.3 Layered data model

| Layer | Canonical content | Preferred standards/format |
|---|---|---|
| Identity/party | organizations, people, suppliers, roles, consent | ISO/OSCRE concepts; UUID/URI; OIDC/OAuth2 |
| Spatial/property | parcel/site/building/floor/space/unit/geometries | OGC API Features, CityGML/CityJSON, PostGIS; IFC links |
| Project/BIM | models, objects, requirements, issues, approvals | IFC 4.3, IDS, BCF, openCDE, ISO 19650 |
| Asset/operations | equipment, systems, points, meters, alarms, work orders | Brick/Haystack/REC crosswalk; BACnet/Modbus edge; ISO 55000/41001 |
| Enterprise | lease, sale, CRM, procurement, cost, cashflow, portfolio | OSCRE IDM; controlled JSON/CSV/ERP adapters |
| Sustainability | energy, water, waste, EPD, LCA, emissions, pathways, certificates | GHG Protocol, RICS WLCA, ISO 23387/22057, CRREM, GRESB |
| Evidence/provenance | source, claim, document hash, agent, activity, time | W3C PROV-O/PROV-DM; immutable event log |
| Governance/security | policy, role, classification, consent, retention, incident | ISO 27001, NIST CSF, ISO 19650-5, PDPO controls |

### 8.4 APIs and exports that should be non-negotiable

1. Versioned REST APIs described by OpenAPI, with stable IDs, pagination, filtering, idempotency, rate limits and deprecation policy.
2. OAuth2/OIDC SSO; scoped tokens per organization/project/site; service accounts for integrations; webhooks/events with replay or polling fallback.
3. OGC API – Features for spatial objects; SensorThings where sensor observations are exposed through the OGC model.
4. IFC 4.3 exports and IDS requirements/validation reports; BCF API/file export; documents and metadata through openCDE-compatible patterns.
5. JSON/JSON-LD and JSON Schema exports of the canonical entities, plus CSV/Excel for business adoption and bulk migration. Every export includes schema/version, IDs, units, CRS, timestamp and provenance.
6. Time-series export with UTC timestamps plus original local timezone, quality/status flags, gap/estimate indicators, unit and aggregation method.
7. Full evidence bundle: source document, hash, claim, extraction method, reviewer, date, confidence and supersession link.
8. Delete/export API that honors privacy retention while preserving legally required audit references and anonymized metrics.
9. No contract should prohibit bulk export, API access, independent backups, read-only archive or migration assistance.

### 8.5 Validation and acceptance gates

- **Before design kickoff:** OIR/AIR/PIR/EIR, classification, coordinate system, unit system, naming and security classification approved.
- **Before procurement:** sample IFC/IDS/BCF and API payloads validated; required properties and handover schema in tender.
- **At design gates:** IDS pass rate, GUID stability, geometry/space containment, required classification and issue closure.
- **At construction/handover:** as-built IFC, asset/equipment register, manuals, warranties, serials, commissioning results, meter points, BCF closure and openCDE export accepted.
- **During operations:** point-to-asset/space mapping, telemetry quality, work-order linkage, energy/carbon reconciliation and access review.
- **Before AI/automation:** data-quality threshold, documented baseline, human override, safety/security review, bias/impact assessment and rollback test.

## 9. Bangladesh-specific implementation implications

1. **Bilingual by design:** Unicode is mandatory in BNDA's published data standards; model Bengali and English labels separately from stable language-neutral IDs. Search, PDF OCR and document workflows must handle Bangla numerals/text without changing canonical identifiers.
2. **Metric and BDT:** store SI units and BDT as the local display/reporting currency; preserve source currency, exchange rate, rate date and tax basis for imported equipment and investment records.
3. **Dhaka time and outage tolerance:** use UTC internally with `Asia/Dhaka` display; edge gateways must buffer during connectivity/power interruptions and reconcile late data.
4. **Geospatial evidence:** preserve original survey CRS/precision and expose modern OGC APIs; BNDA explicitly references open GIS GML, catalogue and KML standards. Validate land/parcel identifiers against authoritative records before treating them as legal title.
5. **Local workflow dictionary:** encode RAJUK/authority submission stages, permits, utility connections, local tax/VAT, contractor packages, approvals, handover conventions and Bengali terminology as versioned JCX extensions mapped to bSDD/OSCRE/IFC where possible.
6. **Data minimization:** separate marketing leads, buyers, tenants, employees, visitors, CCTV and access-control identities. Exact occupancy and security-system data should not appear in a public project website.
7. **Skills and supplier reality:** design for mixed maturity—paper/PDF/Excel/WhatsApp, local contractors, legacy BMS and modern cloud APIs. Provide CSV/Excel/offline mobile import, but validate and progressively upgrade; interoperability cannot depend on every subcontractor owning expensive BIM software.
8. **Procurement leverage:** put export rights, data ownership, API access, standards versions, security obligations and handover validation in the RFP and contract. A beautiful website that cannot obtain clean project and asset data will remain a brochure.

## 10. Lock-in risk register

| Risk | Typical symptom | Countermeasure |
|---|---|---|
| Native BIM lock-in | only one authoring file opens correctly | IFC 4.3 + IDS + native archive + round-trip test |
| CDE lock-in | issues/documents trapped in portal | BCF/openCDE/API export, immutable IDs, scheduled archive |
| Ontology lock-in | vendor tags become the only meaning | canonical graph + bSDD/Brick/Haystack/REC crosswalk |
| Cloud-twin lock-in | model only runs in one runtime | neutral JSON-LD/JSON Schema/RDF/CSV export and model registry |
| BMS lock-in | gateway controls points but no metadata/history | export point map, units, trends, alarms, config and security certs |
| ESG lock-in | score cannot be reproduced after methodology change | store raw activity data, factors, versions, boundaries, evidence |
| AI lock-in | opaque vendor score drives high-stakes decision | model cards, logs, human review, no-training clause, exit dataset |
| Identity drift | same apartment/equipment has multiple IDs | JCX immutable IDs + alias mapping + reconciliation queue |
| Legal/consent risk | marketing and operational data mixed | purpose-specific consent/access/retention and counsel review |

## 11. Recommended JCX standards policy

**Required now:** ISO 19650 information requirements; IFC 4.3/ISO 16739-1 exchange; IDS; BCF; bSDD/ISO 23386/23387 property governance; OGC API Features; JSON/OpenAPI; OAuth2/OIDC; ISO 27001/NIST CSF controls; GHG Protocol boundary/provenance; Bangladesh Unicode and data-classification requirements.

**Required where the use case exists:** OSCRE IDM for enterprise/lease/investment; Brick or Haystack/REC for BMS semantics; SensorThings for open sensor exchange; BACnet/SC/Modbus gateway requirements; CityGML for district-scale models; ISO 55001/41001 for asset/FM management; RICS WLCA and CRREM for decarbonization; GRESB projection for investor reporting.

**Watch/evaluate:** ISO 22057 for machine-readable EPD data (currently an ISO approved work item), Matter for residential devices, digital-twin runtime choices, W3C PROV implementation depth, and future revisions to CRREM/GRESB/ISO 19650/AI governance. Label these as versions and pilot decisions, not permanent architecture truths.

## 12. How the future analysis website should show this layer

The public-facing atlas should make standards understandable without flattening them into logos. For each standard show:

- problem solved and lifecycle position;
- standard owner and legal/license status;
- current version and status as-of date;
- sample artifact/API/schema;
- vendors and companies that implement or reference it;
- maturity/adoption evidence and caveat;
- JCX relevance score and Bangladesh fit;
- mappings to adjacent standards;
- lock-in/security/privacy risks;
- last review and change log.

Useful interactive views: a lifecycle × standard matrix; “data journey” from parcel to handover to work order and carbon report; an interoperability constellation showing mappings; a standards maturity timeline; a vendor export/compatibility table; and an evidence drawer for every claim. Never present certification, marketing claims or research prototypes as equivalent evidence.

## Primary source register (selected)

- [buildingSMART IFC 4.3 documentation](https://standards.buildingsmart.org/IFC/RELEASE/IFC4_3/HTML/content/introduction.htm)
- [ISO 16739-1:2024](https://www.iso.org/standard/84123.html)
- [IDS v1.0 final](https://www.buildingsmart.org/information-delivery-specification-ids-v1-0-is-approved-as-a-final-standard/)
- [BCF technical standard](https://technical.buildingsmart.org/standards/bcf/)
- [bSDD](https://www.buildingsmart.org/users/services/buildingsmart-data-dictionary/)
- [ISO BIM standards](https://www.iso.org/sectors/building-construction/building-information-modelling)
- [ISO 23386:2020](https://www.iso.org/standard/75401.html)
- [ISO 23387:2025](https://www.iso.org/standard/85391.html)
- [OSCRE IDM](https://www.oscre.org/Industry-Data-Model/Introducing-the-Data-Model)
- [Brick](https://docs.brickschema.org/)
- [Project Haystack](https://project-haystack.org/)
- [RealEstateCore](https://github.com/RealEstateCore/rec)
- [Microsoft DTDL](https://learn.microsoft.com/en-us/azure/digital-twins/concepts-models)
- [BACnet](https://bacnet.org/about-bacnet-standard/)
- [Modbus specifications](https://www.modbus.org/modbus-specifications)
- [Matter specification](https://csa-iot.org/wp-content/uploads/2024/05/matter-1-3-core-specification.pdf)
- [OGC API Features](https://www.ogc.org/standards/ogcapi-features/)
- [OGC SensorThings](https://www.ogc.org/standards/sensorthings/)
- [OGC CityGML](https://www.ogc.org/standards/citygml/)
- [GHG Protocol Scope 3](https://ghgprotocol.org/corporate-value-chain-scope-3-standard)
- [RICS WLCA](https://www.rics.org/profession-standards/rics-standards-and-guidance/sector-standards/construction-standards/whole-life-carbon-assessment)
- [CRREM methodology/library](https://crrem.org/learn/)
- [GRESB assessment and 2026 updates](https://www.gresb.com/real-estate-assessment/)
- [ISO 55000/55001](https://committee.iso.org/sites/tc251/home/projects/published/iso-55000.html)
- [ISO/IEC 27001](https://www.iso.org/standard/27001.html)
- [NIST CSF 2.0](https://www.nist.gov/cyberframework)
- [NIST AI RMF](https://www.nist.gov/itl/ai-risk-management-framework)
- [ISO/IEC 42001](https://www.iso.org/standard/42001)
- [EU AI Act](https://eur-lex.europa.eu/eli/reg/2024/1689/oj?locale=en)
- [Bangladesh NCSA acts/rules](https://ncsa.gov.bd/site/page/50cf7d8c-954c-413f-8f23-eee744a1cd8d/Acts-%26-Rules)
- [Bangladesh National Data Governance Ordinance](https://bdlaws.minlaw.gov.bd/act-print-1573.html)
- [Bangladesh National Digital Architecture standards](https://nda.bcc.gov.bd/standards/standard-single.jsp?standard=Mw%3D%3D)

**Interpretation note:** “maturity” in this document means standard status and practical ecosystem evidence, not a guarantee that every vendor implements the full standard. “Adoption” claims are attributed to the issuing body or vendor where stated and should be independently validated in procurement.
