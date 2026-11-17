# RAG Knowledge Assistant

A PDF-based knowledge assistant being built from scratch through guided implementation. The planned application will upload PDFs, retrieve relevant passages, and generate grounded answers with document and page citations.

## Project status

The repository currently contains documentation and the learning roadmap only. Development milestone 1 (fundamentals and architecture) is complete. The user approved milestone 2 (repository and project foundation) on 2026-11-17; its first guided lesson is repository tooling. Application setup has not started.

Previous application code has been removed after a verified external backup. It will not be reused or consulted as reference. Git history is preserved.

## Repository contents

```text
docs/
MERN_to_AI_Roadmap.pdf
README.md
MASTER_PROMPT.md
```

The hidden `.git/` directory retains repository history. Future application directories will be created progressively.

## Documentation

- [Architecture](docs/ARCHITECTURE.md): scope, target structure, data flows, and initial data model.
- [Development plan](docs/DEVELOPMENT_PLAN.md): milestones, acceptance criteria, and cleanup record.
- [Decisions](docs/DECISIONS.md): established choices and open proposals.
- [Learning progress](docs/LEARNING_PROGRESS.md): demonstrated concepts and next steps.
- [Master prompt](MASTER_PROMPT.md): project requirements and guided learning instructions.
- [MERN to AI roadmap](MERN_to_AI_Roadmap.pdf): primary scope reference, Phase 2, pages 8-9.

## Planned stack

React, Vite, strict TypeScript, Tailwind CSS v4, Express, Zod, MongoDB Atlas Vector Search, and Gemini through the official `@google/genai` SDK.

There are no application install, run, or test commands yet. These will be introduced during the project foundation milestone.
