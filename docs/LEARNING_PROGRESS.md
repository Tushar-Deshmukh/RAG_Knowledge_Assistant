# Learning progress

Last updated: 2026-11-18.

## Current phase and mode

Development milestone 2: Repository and Project Foundation is complete. The learner explicitly approved closure and phase-end commit/push on 2026-11-18 after final verification and understanding review. Next milestone is PDF Upload and Text Extraction; implementation has not started and advancement approval is still needed. Guided Implementation Mode remains active: the learner writes code unless explicitly asking otherwise. Do not restart the curriculum or assume future milestone completion from generated artifacts.

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
- Phase 1 documentation and scratch cleanup were committed as `d8979ad` and pushed to `origin/main`; the remote commit was verified.
- Learner created the root `package.json` with `private: true` and `workspaces: ["client", "server"]`, a root `.gitignore`, and private ESM package manifests named `@rag/client` and `@rag/server`. npm recognized both workspaces. Ignore patterns were checked for environment files, `.env.example`, dependencies, builds, and coverage.
- Learner explained that `.env.example` documents required variables while `.env` holds actual values, and that the root workspace array registers the application package directories.
- Learner created the strict NodeNext TypeScript configuration and `server/src/index.ts` with a typed string and console output. Learner reported successful compilation and execution printing `Backend foundation ready`; source and generated output were inspected, and Git was confirmed to ignore `server/dist/index.js`. The type annotation is absent from emitted JavaScript. The learner identified that incoming HTTP JSON needs runtime validation; TypeScript type erasure was explained.
- Learner added server `build`, `typecheck`, and `start` scripts and correctly explained that `start` runs the previous build until recompilation. All three commands were independently run successfully during review; start printed `Backend foundation ready`.
- Learner installed Express 5.3.0 as a runtime dependency and its 5.0.6 types as a development dependency; both were verified. Learner implemented a default-exported `createApp()` in `app.ts` and a separate listener in `index.ts`. Source was reviewed; an independent live request to `/health` confirmed HTTP 200, JSON content type, and `{"status":"ok"}`. The listener temporarily uses port 3000. The old console exercise lines remain in `index.ts` and should be removed by the learner.
- Learner removed the console exercise lines, installed Zod 4.6.7 as a runtime dependency, and implemented `envSchema` / exported `parseEnv(env)` in `server/src/config/env.ts`. An initial empty-object schema passed typechecking but failed runtime checks; the learner corrected it by attaching the numeric schema to `PORT`.
- Learner connected `parseEnv(process.env)` before app creation in `index.ts`, uses the parsed numeric port for listening, and includes it in the startup log. Typecheck and build independently passed on 2026-11-18; eight parser checks verified missing-port default, a valid custom port, and rejection of malformed, blank, fractional, zero, and oversized values. Earlier schema checks also verified bounds 1 and 65535. Configuration loading from a local environment file is not implemented yet.
- Learner added safe `server/.env.example` with `PORT=3000`, a local `.env`, and optional Node environment-file loading in the server start script. Learner reported startup on port 4000; an independent HTTP request confirmed status 200, JSON content type, and the expected health body. Ignore rules exclude `.env` and allow `.env.example`. Node's native loader avoids an additional dependency; loading remains separate from schema validation.

## Repository state

Vitest 5.1.1 is installed as a development dependency; server test scripts and the `.vitest/` ignore rule were reviewed. Three learner-written configuration tests in `server/src/config/env.spec.ts` independently passed along with typechecking: missing default, numeric-string conversion, and invalid-string rejection. The learner corrected a premature function invocation in the error assertion by passing a callback to `toThrow`; understanding of that execution-order distinction should still be checked. The 2026-11-18 audit reports five high-severity entries propagated from one unpatched picomatch issue (GHSA-fc5q-39xc-vjpf) in the development dependency tree. The production-only audit reports zero findings. No automatic fix/downgrade was applied. Continue local tests with project-controlled patterns and revisit when a patch is available.

The working tree contains the documentation, PDF, master prompt, README, root workspace manifest and lockfile, `.gitignore`, and client/server package manifests, plus preserved `.git/`. These manifests were written from scratch by the learner. The learner installed `typescript@7.0.2` and `@types/node@24.19.2` as server development dependencies; installation was verified with `npm ls`. Their environment reports Node `v24.21.0` and npm `11.19.0`. Backups are recovery artifacts only; do not consult previous code as reference.

An Express app factory and health route are implemented, with a separate listener entry point. No React app, PDF ingestion, Atlas persistence/search, or grounded generation is implemented. Vitest runs 11 configuration tests; automated health tests remain. The 11 tests and typechecking independently passed on 2026-11-18. Coverage includes defaulting, numeric conversion, inclusive boundaries, and invalid input rejection. Two boundary test names still repeat the conversion test's name and should be made descriptive. The learner correctly explained that direct invocation occurs before the throwing matcher can run; passing a callback was reinforced. No paid API calls have been made during this work.

## Remaining work

- Resolve open design choices progressively; see `DECISIONS.md` and `ARCHITECTURE.md`.
- Check understanding of environment-file precedence and loading versus validation, then proceed to focused automated configuration/health tests and error handling through guided tasks.
- Complete the frontend/backend foundation through small guided tasks, then proceed through ingestion, embeddings, retrieval, generation, UI, and evaluation.
- Obtain explicit approval before advancing beyond milestone 2; do not treat current approval as permission to implement whole phases at once.

## Known blockers and cautions

No external blocker is currently established. Current Gemini model availability, SDK APIs, quotas, Atlas access, and selected library APIs have not been verified. Verify them when needed without making unnecessary paid requests. Never copy credentials from backups into documentation.

## Next approved task

The learner corrected the boundary test names, installed Supertest 7.3.2 and its 7.2.1 types as development dependencies, and wrote `server/src/app.spec.ts`. The health test creates the real app and awaits a GET request, asserting status, JSON content type, and body contents. The learner understood that removing the actual route should fail the test; the test must not register a replacement route.

The learner added a JSON 404 fallback after the routes and corrected an initial hardcoded-path registration to pathless `app.use`. The unknown-route test now requests a different URL. Learner implemented `common/middleware/error-handler.ts` with four typed parameters, an `unknown` error, a `headersSent` delegation/return guard, and a safe generic JSON 500 response. It is registered last in `app.ts`. Learner added focused middleware tests for generic 500 JSON and headers-sent delegation, using test-only Express harnesses with the real handler. An initial harness used `createApp()` and registered a failure route after the 404 fallback; the learner corrected it to a minimal Express app. A later route typo and length assertion were corrected. All 15 tests across three files and typechecking independently passed on 2026-11-18. Logging is still pending. The learner understood that `next(error)` does not stop the current function and that unsent responses can receive safe JSON; valid JSON health checks do not establish database/AI health or production listener availability.

Learner correctly explained that excluding tests from the only TypeScript configuration would lose their typechecking, then created `server/tsconfig.build.json` extending the base configuration with test exclusions. The build script now uses it while typecheck still uses the base configuration. Typecheck, all 15 tests, and build independently passed. Compiler configuration and emitted-file inspection confirmed only four application JavaScript files are emitted; no stale compiled tests exist in `dist/` at this checkpoint.

Learner installed Pino 10.4.0, created a shared info-level logger, replaced startup console output with structured safe fields, and added error logs before the headers-sent guard. Middleware tests spy on `logger.error`, suppress output, assert exactly one call with safe fields in each branch, and restore the original method with one `afterEach` hook. The duplicate hook was removed and inspected. The learner correctly excluded credentials/document text from logs; shared-state cleanup and restoration of real logger behavior were explained. Fifteen tests and typechecking passed during review of the logging assertions; startup logging build/typecheck also passed. Production-only audit remained clear; five existing development dependency findings remained unchanged.

Learner installed exact-version Prettier 3.10.1 at the root, created an empty `.prettierrc.json` and `.prettierignore`, and added root `format` / `format:check` scripts. Initial warnings included CRLF versus LF differences and a missing final newline. Learner applied formatting and reported passing format check, all 15 tests, typecheck, and build. Environment files, PDFs, generated output, dependencies, and the lockfile are excluded from formatting.

Learner identified unused imports as a lint concern. Compatibility checks found typescript-eslint 8.73.0 supports TypeScript below 6.1, not the initially selected 7.0.2. Learner switched server TypeScript to `~6.0.3` and reported passing typecheck, 15 tests, and build. Root lint tooling also declares the same TypeScript range. Learner installed ESLint 10 / typescript-eslint 8, created `eslint.config.mjs` scoped to server source/tests with Node globals and underscore-prefixed unused-argument allowance, and added root `lint`. Lint and formatting were independently run successfully. The audit now reports 11 development dependency entries tracing to the same picomatch issue through both Vitest and typescript-eslint; the production-only audit remains clear. No force fix was applied.

Frontend foundation: learner installed React/React DOM 19.3.1, Vite 8.3.8, React plugin 6.3.0, TypeScript 6.0.3, and React 19 types. Learner created browser-focused strict `client/tsconfig.json`, `vite.config.ts`, `index.html`, `src/App.tsx`, and `src/main.tsx` with a missing-root guard and StrictMode. Client scripts provide dev, typecheck, build, and preview; build runs typechecking before Vite via `&&`. The difference between Vite transformation and TypeScript checking was explained. Client typecheck and production build independently passed; emitted HTML and bundled assets were observed. Learner confirmed browser rendering.

Learner added `client/tsconfig.node.json` and Node 24 types to check Vite configuration separately from browser code; the client typecheck script checks both, and the build gates on that script. Learner installed Tailwind CSS / Vite plugin 4.3.5, connected the plugin and CSS import, added static utility classes, and confirmed the dark styled page. Build output includes a CSS asset. Learner installed React Hooks plugin 7.1.1 and Refresh plugin 0.5.8 and added scoped React/browser and Vite/Node blocks to root ESLint. The root lint command now includes backend, frontend source, and Vite configuration. Learner reports lint passing. Whole-repository audit at plugin installation showed 12 development dependency entries tracing to the same recorded picomatch issue, with zero production-only findings.

Final foundation verification on 2026-11-18 independently passed: root formatting and lint, 15 backend tests, backend typecheck/build, and client browser/Node typechecking plus Vite build. Git ignore checks confirmed local `.env` and both build directories are excluded while `.env.example` is allowed. README, decisions, plan, and progress were synchronized. No commit or push was made.

Final understanding review: learner correctly identified browser configuration for DOM APIs, TypeScript checks as the gate before Vite via `&&`, and startup rejection of invalid ports before listening. Milestone 2 was explicitly approved for closure/publication on 2026-11-18. Frontend remains a minimal static foundation; no API integration or frontend tests exist.

Current approved action: commit and push Phase 2 to `origin/main`. The user also explicitly requested removal of the master prompt and roadmap PDF from GitHub's current branch contents, with local copies preserved and ignored. Both were confirmed present on `origin/main` before removal from tracking. Earlier history remains intact; this is not a history purge. Do not restore or re-add these local reference files. Fresh clones will not include them; the project docs preserve scope and learning continuity.

After publication, report the commit and verified remote state, then wait for explicit approval before starting milestone 3 implementation. Preserve Guided Implementation Mode and the phase-end publication preference.
