## Purpose

This file gives concise, actionable instructions for AI coding agents working in this repository. It focuses on what to look for, commands to run (PowerShell), and repository-specific patterns to preserve. The workspace is currently empty; follow the "Discovery checklist" below before making behavior-changing edits.

## Quick discovery checklist (run first)

1. Confirm repository contents and top-level manifests:

```powershell
Get-ChildItem -Force -File -Recurse -Depth 2 | Select-Object FullName
```

2. Look for common entry points and build files (stop when found):

- `package.json` (Node)  -> run `npm ci` and `npm test`
- `pom.xml` / `build.gradle` (Java) -> run `mvn -DskipTests=false test` or `./gradlew test`
- `pyproject.toml` / `requirements.txt` (Python) -> create venv and run pytest
- `Dockerfile`, `docker-compose.yml` -> container dev workflows
- `README.md`, `docs/`, `.env`, `migrations/`, `src/`, `tests/`

## Build & test detection shortcuts (PowerShell)

Examples to run after you identify the project type:

Node.js:
```powershell
npm ci; npm test
```

Python (venv + pytest):
```powershell
python -m venv .venv; .\.venv\Scripts\Activate.ps1; pip install -r requirements.txt; pytest -q
```

Java (Maven):
```powershell
mvn -v; mvn test -Dstyle.color=always
```

If you can't detect a build manifest, list the top-level files and open the README.

## What an agent should do first (concrete steps)

1. Run the discovery checklist and open the primary manifest (one of the files above).
2. Identify the runtime and test runner. Add a one-line summary at the top of any PR description like: "Detected Node.js (package.json) — run `npm ci && npm test`".
3. Search for configuration that affects behavior: `.env`, `config/*.yml`, `appsettings.json`, `src/config` and database migration folders (e.g., `migrations/`, `db/migrate`).
4. Find CI workflow files: `.github/workflows/*.yml`, `azure-pipelines.yml`, `.gitlab-ci.yml` — mirror their commands when running locally.

## Patterns & conventions to preserve

- Keep configuration lookup order intact (env > config file > defaults). If you change how config is loaded, update CI and README.
- Preserve existing error/exception types used across modules (avoid broad refactors that change exported types).
- If tests seed the database or rely on fixtures in `tests/fixtures` or `seed/`, run them locally before changing DB schema.

## Integration points to inspect before edits

- External services: look for `*.connection`, `DATABASE_URL`, `REDIS_URL`, `AZURE_*`, `AWS_*` in repo files.
- Auth: search for JWT secret/key usage, OAuth client IDs, or `auth` middleware files.
- Messaging: look for `kafka`, `rabbitmq`, `servicebus` keywords or client libs in manifests.

## Example TODO items when code exists

- If you find `package.json` with `scripts.start` and `scripts.test`, add a small unit test to cover any bugfix and update `package.json` scripts only when necessary.
- If you find `pom.xml` with multiple modules, prefer changing a single module and run `mvn -pl module-name test`.

## Merging guidance

If `.github/copilot-instructions.md` already exists, merge by:

1. Preserving any project-specific examples or commands.
2. Replacing only stale commands (verify they run locally) and adding new detection steps.
3. Keeping the file concise (20–50 lines); prefer links to detailed docs in the repo.

## When you are blocked

- If the repo is empty or missing manifests, ask the maintainer for the intended language/runtime and CI commands.
- If secrets or external resources are required to run tests, do not attempt to infer values; request a reproducible test plan or sanitized fixtures.

## Final note

This repo currently appears to have no source files. Update this file with concrete examples once code is added — keep commands PowerShell-friendly for the maintainer's environment. Ask the maintainer for the primary language/runtime and any non-obvious dev commands you should include.

---
Please review: which language/runtime should I prioritize for automatic detection and example commands in this file?
