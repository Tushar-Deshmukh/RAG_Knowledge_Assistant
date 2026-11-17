# Decisions

Last updated: 2026-11-17. Distinguish the approved target from implementation details still under discussion.

## Approved direction

### Scope and learning workflow

Use Phase 2 of the available `MERN_to_AI_Roadmap.pdf` as the primary project scope and `MASTER_PROMPT.md` as the project's additional requirements and teaching instructions. Multiple-document support is included by the master prompt even though it is a PDF stretch goal. Do not expand into agent frameworks or later roadmap phases.

Default to Guided Implementation Mode. The learner writes application code unless explicitly requesting implementation. Concept checks and explicit milestone advancement are required. On 2026-11-17 the user authorized the project documents, reviewed the architecture, requested scratch-repository corrections, then explicitly closed milestone 1, authorized committing/pushing the documentation and cleanup, and approved beginning milestone 2. This does not authorize generating the entire foundation without guided interaction or authorize future unrelated commits/pushes.

### Preserve before rebuilding

The user approved the preservation-first strategy and frontend/backend architecture, then explicitly requested a complete scratch repository on 2026-11-17. A fresh external backup was verified before moving `server/` and `.gitignore` out of the working tree into a separate external archive. Git history, the PDF, the master prompt, and the documentation are preserved. See `DEVELOPMENT_PLAN.md` for backup and archive details.

Build every application component from scratch without reusing or consulting the previous implementation as reference. Backups are recovery artifacts only. The working tree contains `docs/`, `MERN_to_AI_Roadmap.pdf`, `README.md`, and `MASTER_PROMPT.md`, plus the hidden `.git/` directory. Reintroduce application directories and tooling progressively through guided tasks.

### One repository, separate client and server

Use a React/Vite frontend and an Express backend with strict TypeScript. Keep features grouped under documents, retrieval, and chat. Controllers own HTTP, services coordinate business logic, repositories own persistence, and Gemini integration remains isolated. This supports testing and reuse without imposing unnecessary layers.

### Gemini and MongoDB Atlas

Use Gemini as the only AI provider through `@google/genai`, and MongoDB Atlas Vector Search with cosine similarity. Create the integration from scratch; no previous provider adapter or configuration will be reused.

Verify current supported models and SDK configuration before implementation. Prefer 768-dimensional vectors where supported. Use compatible document/query embedding settings; equal dimensionality alone does not establish compatibility. Re-embedding unchanged text is unnecessary work, not inherently corrupting; model/configuration changes may require re-embedding and index changes.

## Initial design established through lessons

### Separate documents and chunks

A document owns file-level metadata and processing state. A chunk owns searchable text, its vector, sequence position, document relationship, and page range. Store text for generation and metadata for citations; vectors cannot reliably reconstruct original text. Keep model/dimension metadata as well, with its placement still open.

Use one-based physical PDF page ranges for citations and zero-based chunk order. These are different coordinate systems. The learner's draft interfaces were reviewed in conversation, not added as application schemas.

### Gate retrieval on completed ingestion

The ingestion service coordinates `processing`, `ready`, and `failed` states. Failed or partially ingested documents must not participate in retrieval. Exact consistency, cleanup, and retry mechanics remain open. Metadata alone will not enforce this rule; the implementation must enforce eligibility.

### Resolve citations from retrieved metadata

Assign source labels server-side and resolve returned labels against the actual retrieved sources. Reject an answer containing an unknown reference; merely removing the label leaves an unverified claim. This was proposed in the lesson and the learner confirmed the reasoning. Valid labels still require claim-support checks; their detailed design is open. A bounded regeneration attempt is optional future work.

### Separate missing evidence from operational errors

Top-k results do not guarantee supporting evidence. Return an explicit insufficient-evidence response when justified by the evidence. Provider/database failures or invalid generated references are operational errors, not proof that a PDF lacks the answer.

## Open proposals and choices

- Request-time ingestion was proposed for an initial implementation but has not been finalized; assess timeout implications versus background processing.
- Decide MongoDB driver versus Mongoose, identifier types, maintained PDF and multipart libraries, upload storage/retention, and HTTP client as relevant.
- Finalize runtime validation, response contracts, model/dimension metadata placement, Atlas indexes, chunk sizes/overlap, batching, retries, and timeouts.
- Design supporting-evidence checks and evaluation before claiming groundedness guarantees.
- Handle image-only PDFs clearly; OCR requires a separate scope decision.
- Introduce authentication/access isolation when user accounts are in scope, not as an unapproved expansion now.
