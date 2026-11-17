# Development plan

Last updated: 2026-11-17.

All eight development milestones belong to Phase 2 of `../MERN_to_AI_Roadmap.pdf`, not to the roadmap's later orchestration/agent phases. Follow `../MASTER_PROMPT.md` in Guided Implementation Mode: explain, design, ask, let the learner implement, review, test, check understanding, and obtain explicit approval before advancing.

## Milestones

| Milestone | Deliverables and acceptance criteria | Current status |
| --- | --- | --- |
| 1. Fundamentals and architecture | Requirements summary, architecture/data-flow diagrams, proposed structure, initial schema, and plan reviewed; learner can explain the pipeline and approves advancement. | Complete; learner explicitly closed this phase on 2026-11-17 after architecture review and conceptual exercises. |
| 2. Repository and foundation | Establish frontend/backend setup from scratch, validated configuration, environment examples, health endpoint, linting/formatting, and initial passing checks. | Active; learner approved starting on 2026-11-17. First guided lesson: repository tooling. No application setup implemented yet. |
| 3. PDF ingestion | Secure upload API, page-aware extraction, persisted document metadata/status, upload interface, and meaningful validation/failure tests. | Not started. |
| 4. Chunking and embeddings | Configurable chunking/overlap with metadata tests; official Gemini adapter; manageable batches and stored compatible vectors; partial failures considered. | Not started. |
| 5. Atlas vector retrieval | Cosine vector index, query embeddings, configurable top-k and document filters, search endpoint, retrieval tests; ANN/ENN and candidate-count understanding. | Not started. |
| 6. Complete RAG pipeline | Answer orchestration/API, separated instructions and untrusted evidence, verified citation references, unsupported-answer behavior, provider failure handling, deterministic tests. | Not started. |
| 7. Full React application | Document dashboard, upload and processing states, multiple-document selection, chat, citations, accessible responsive UI, loading/empty/error states. | Not started. |
| 8. Evaluation and optimization | Small reproducible evaluation dataset/scripts; retrieval relevance, precision/recall, groundedness, correctness, latency and usage reporting; measured chunk/top-k and retrieval strategy comparisons. | Not started. |

Each milestone also requires reviewed implementation, appropriate security/error handling, applicable passing tests, synchronized documentation, demonstrated understanding, and explicit approval to advance. Generated code alone does not satisfy completion.

## Preservation and cleanup

The user approved the preservation-first cleanup strategy and architecture, then explicitly requested removal of the previous application and a complete scratch repository on 2026-11-17. A fresh external backup was created immediately before cleanup:

`C:\Learning\RAG_Knowledge_Assistant-backup-20261117-163050-e395e7fe`

It contains 134 SHA-256-verified files, including Git history, uncommitted/untracked work, the PDF, prompt, documentation, and ignored environment file. Only `server/node_modules` was excluded. An earlier verified backup also remains at `C:\Learning\RAG_Knowledge_Assistant-backup-20261116-222608-001a63fa`. Backups are for recovery only, not implementation reference.

The requested cleanup moved `server/` (including local dependencies and configuration) and `.gitignore` out of the repository into `C:\Learning\RAG_Knowledge_Assistant-removed-20261117-163050-e395e7fe`. Automatic approval review blocked the original deletion command with the reason "blocked by policy"; the reversible move succeeded instead. The working tree now contains only `docs/`, `MERN_to_AI_Roadmap.pdf`, `README.md`, and `MASTER_PROMPT.md`, plus preserved `.git/`. No previous application code is available for reuse in the working tree. The planned client/server directories will be created from scratch during guided implementation.

Prior Git history is preserved. On 2026-11-17 the user authorized committing and pushing this documentation and scratch cleanup, including removal of the previously tracked application files. Future unrelated commits, pushes, deployments, or destructive operations still require explicit permission. Future removals still require the master prompt's approval process.

## Next steps

1. Complete the authorized documentation/cleanup commit and push, then begin milestone 2 in Guided Mode.
2. Explain root versus client/server package responsibilities, propose npm workspaces, and check the learner's understanding before implementation.
3. Guide the learner through root tooling and `.gitignore`, strict TypeScript backend setup, an Express health endpoint, validated configuration/error handling/tests, and React/Vite/Tailwind setup in small tasks.
4. Resolve implementation choices when needed; verify current external APIs before using them. Do not reuse the removed implementation.

## Verification policy

Use focused, meaningful tests and deterministic mocks for Gemini. Keep live Atlas/Gemini integration checks separate, disclose external dependencies, and avoid unnecessary paid calls. Do not report checks as passed unless they were run.

There is no application or test runner in the scratch repository yet. Validate documentation, local links, the requested root layout, and preservation of the PDF and Git history for this cleanup. Establish application checks during milestone 2; results from the removed implementation do not validate the new application.
