# Learning progress

Last updated: 2026-11-17.

## Current phase and mode

Development milestone 2: Repository and Project Foundation, within the reference roadmap's Phase 2. The learner explicitly closed development milestone 1 and approved starting milestone 2 on 2026-11-17. Guided Implementation Mode remains active: the learner writes code unless explicitly asking otherwise. Do not restart the curriculum or assume future milestone completion from generated artifacts.

## Completed discussions and demonstrated understanding

- Retrieval locates evidence; generation uses original text to answer. Storing text is necessary for evidence, in addition to debugging.
- Top-k can return irrelevant matches for unsupported questions. Passage content, rather than document category alone, determines support.
- Document and question embeddings must use compatible models/settings; equal dimensions do not make unrelated vector spaces compatible.
- Unchanged chunks normally need embedding once; repeated embedding adds work and does not inherently corrupt stored vectors.
- Documents and chunks have separate responsibilities. Chunk order is distinct from page location; chunks can share or span pages.
- Required chunk page ranges enable verifiable citations, not faster vector retrieval.
- The ingestion service coordinates failed processing; incomplete ingestion must not be marked ready or exposed to retrieval.
- Controllers handle HTTP concerns; reusable services coordinate the business pipeline.
- Unknown generated citation references must not be invented or silently reassigned. Removing an invalid reference does not make its claim grounded; the learner agreed the unverified sentence should not be returned.

The learner correctly drafted `DocumentStatus`, `DocumentRecord`, and `ChunkRecord` in conversation. No application schemas have been implemented. Create domain models within the document feature during the relevant guided task.

## Completed project actions

- Read `MASTER_PROMPT.md`, inspected repository/Git state, and read available `MERN_to_AI_Roadmap.pdf` with emphasis on Phase 2, pages 8-9.
- Distinguished PDF requirements from the master prompt's additional engineering requirements.
- User approved preservation-first cleanup and the proposed architecture.
- Created an external backup with 123 copied files verified by SHA-256, including Git history, local changes, PDF, prompt, and `.env`; excluded only `server/node_modules`. See `DEVELOPMENT_PLAN.md` for its path.
- User authorized the four project documents on 2026-11-17; architecture, plan, decisions, and this progress record were created.
- Learner read the architecture and requested a complete scratch repository, with no reuse of or reference to previous application code.
- Created a fresh external backup with 134 files verified by SHA-256 before the requested cleanup. Moved `server/` and `.gitignore` into an external archive, preserved `.git/` and the PDF, added `README.md`, corrected the PDF filename in `MASTER_PROMPT.md`, and synchronized all four documents. Archive details are in `DEVELOPMENT_PLAN.md`.
- User explicitly closed milestone 1, authorized committing and pushing the documentation/cleanup, and approved starting milestone 2 on 2026-11-17. Phase 1 deliverables and demonstrated concepts are documented; application tests are not applicable to this documentation-only milestone.

## Repository state

The working tree contains `docs/`, `MERN_to_AI_Roadmap.pdf`, `README.md`, and `MASTER_PROMPT.md`, plus preserved `.git/`. The application will be implemented entirely from scratch. Backups are recovery artifacts only; do not consult previous code as reference.

No React app, Express API, PDF ingestion, Atlas persistence/search, or grounded generation is implemented. No application test runner exists yet. No paid API calls have been made during this work.

## Remaining work

- Resolve open design choices progressively; see `DECISIONS.md` and `ARCHITECTURE.md`.
- Begin the approved milestone 2 with the repository-tooling lesson and a conceptual check before implementation.
- Complete the frontend/backend foundation through small guided tasks, then proceed through ingestion, embeddings, retrieval, generation, UI, and evaluation.
- Obtain explicit approval before advancing beyond milestone 2; do not treat current approval as permission to implement whole phases at once.

## Known blockers and cautions

No external blocker is currently established. Current Gemini model availability, SDK APIs, quotas, Atlas access, and selected library APIs have not been verified. Verify them when needed without making unnecessary paid requests. Never copy credentials from backups into documentation.

## Next approved task

Commit and push the current documentation and scratch cleanup, then start milestone 2 in Guided Mode. First lesson: root versus client/server package responsibilities and a proposed npm-workspaces setup. Ask a short conceptual question and wait for the learner before application/tooling implementation. No workspace files or new application code have been generated yet.
