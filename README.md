# RAG Knowledge Assistant

A PDF-based knowledge assistant being built from scratch through guided implementation. The planned application will upload PDFs, retrieve relevant passages, and generate grounded answers with document and page citations.

## Project status

Development milestones 1 (fundamentals and architecture) and 2 (repository and project foundation) are complete. The backend has health/404 responses, validated port configuration, safe error handling, structured logging, and 15 tests. The React/Vite frontend renders a minimal Tailwind CSS v4 page. Both workspaces use strict TypeScript; root formatting and linting cover the new source. PDF ingestion and RAG are not implemented yet.

Previous application code has been removed after a verified external backup. It will not be reused or consulted as reference. Git history is preserved.

## Repository contents

```text
docs/
client/                 React source, Vite, and browser/Node TypeScript configs
server/                 Express source, tests, and TypeScript configs
.gitignore
.prettierrc.json
.prettierignore
eslint.config.mjs
package.json
package-lock.json
README.md
```

The hidden `.git/` directory retains repository history. Dependency folders, build output, and local environment files are ignored. `MASTER_PROMPT.md` and `MERN_to_AI_Roadmap.pdf` are local learning references excluded from tracking at the owner's request; they are not included in a fresh clone. Project scope and progress are documented under `docs/`.

## Documentation

- [Architecture](docs/ARCHITECTURE.md): scope, target structure, data flows, and initial data model.
- [Development plan](docs/DEVELOPMENT_PLAN.md): milestones, acceptance criteria, and cleanup record.
- [Decisions](docs/DECISIONS.md): established choices and open proposals.
- [Learning progress](docs/LEARNING_PROGRESS.md): demonstrated concepts and next steps.

## Planned stack

React, Vite, strict TypeScript, Tailwind CSS v4, Express, Zod, MongoDB Atlas Vector Search, and Gemini through the official `@google/genai` SDK.

## Backend foundation commands

Run from the repository root:

```powershell
npm install
npm run format:check
npm run lint
if (-not (Test-Path server/.env)) { Copy-Item server/.env.example server/.env }
npm run typecheck --workspace=@rag/server
npm run test --workspace=@rag/server
npm run build --workspace=@rag/server
npm run start --workspace=@rag/server
```

Copy the example only when creating your local configuration; do not overwrite an existing `.env`. Set its `PORT` as needed. The server start script optionally loads `server/.env` before validation; existing process environment values take precedence. The entry point defaults `PORT` to 3000 when missing and rejects values outside the integer range 1-65535. `GET /health` returns HTTP 200 with `{"status":"ok"}`; this checks HTTP liveness only, not database or AI availability. `start` runs the generated JavaScript, so rebuild after source changes. Vitest currently runs 11 configuration tests; `test:watch` reruns tests as files change. See the development dependency audit note in `docs/LEARNING_PROGRESS.md`.

The full backend suite totals 15 tests, including HTTP and error-handler tests. TypeScript is pinned to the 6.0 patch line for typescript-eslint compatibility. Backend production builds exclude test files while typechecking includes them.

## Frontend foundation commands

Run from the repository root, in a separate terminal when the backend is running:

```powershell
npm run dev --workspace=@rag/client
```

Open the URL printed by Vite. The minimal page displays the project name and a foundation message with Tailwind styling. The client does not call the backend yet and needs no environment variables. Database credentials and Gemini API keys must remain on the server; never place them in frontend source or browser-exposed environment variables.

```powershell
npm run typecheck --workspace=@rag/client
npm run build --workspace=@rag/client
npm run preview --workspace=@rag/client
```

Client typechecking checks browser source and Node-side `vite.config.ts` separately. The build runs both checks before Vite creates `client/dist/`. Preview serves the generated assets for local inspection; it is not a production deployment server. Browser rendering and Tailwind styling have been confirmed manually by the learner; no automated frontend tests are configured yet.

## Shared quality checks

```powershell
npm run format:check
npm run lint
```

Root linting covers backend source/tests, React source with Hooks and Fast Refresh rules, and Vite configuration with Node globals. Prettier handles formatting separately. Use `npm run format` to apply formatting changes. The root ESLint configuration itself is not in the current lint scope.
