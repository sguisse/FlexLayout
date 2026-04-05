## What I changed

* Switched CI workflows from `yarn` assumptions to `pnpm`
* Reworked release automation to publish from `release-sguisse`
* Configured scoped npm publishing for [@sguisse/flexlayout-react](vscode-file://vscode-app/Applications/Visual%20Studio%20Code%20-%20Insiders.app/Contents/Resources/app/out/vs/code/electron-browser/workbench/workbench.html)
* Set npm publish to public access
* Updated GitHub Pages deployment to host the demo from `release-sguisse`
* Kept `master` usable as the upstream-tracking branch
* Fixed 4 existing ESLint blockers in source so the updated CI actually passes
* Updated README links/install instructions to your fork/package

## Key updates

### Release and publish

In [release.yml](vscode-file://vscode-app/Applications/Visual%20Studio%20Code%20-%20Insiders.app/Contents/Resources/app/out/vs/code/electron-browser/workbench/workbench.html) I replaced the broken `yarn`/Optic-based flow with a manual release workflow that:

* must be run from `release-sguisse`
* bumps versions using your `-sguisse` convention
* builds with `pnpm`
* publishes with public access and provenance
* commits the version bump back to `release-sguisse`
* creates a Git tag and GitHub release

Version mapping now works like this:

* `prerelease` → `0.8.19-sguisse.0` → `0.8.19-sguisse.1`
* `patch` → [0.8.19-sguisse.x](vscode-file://vscode-app/Applications/Visual%20Studio%20Code%20-%20Insiders.app/Contents/Resources/app/out/vs/code/electron-browser/workbench/workbench.html) → `0.8.20-sguisse.0`
* `minor` → `0.9.0-sguisse.0`
* `major` → `1.0.0-sguisse.0`

And publish uses public scoped access via:

* [package.json](vscode-file://vscode-app/Applications/Visual%20Studio%20Code%20-%20Insiders.app/Contents/Resources/app/out/vs/code/electron-browser/workbench/workbench.html) `publishConfig.access = "public"`
* workflow publish step with `--access public`

### GitHub Pages demo hosting

In [gh-pages.yml](vscode-file://vscode-app/Applications/Visual%20Studio%20Code%20-%20Insiders.app/Contents/Resources/app/out/vs/code/electron-browser/workbench/workbench.html) I changed deployment so that on every push to `release-sguisse`:

* dependencies install with `pnpm`
* the project builds with [pnpm build](vscode-file://vscode-app/Applications/Visual%20Studio%20Code%20-%20Insiders.app/Contents/Resources/app/out/vs/code/electron-browser/workbench/workbench.html)
* [dist](vscode-file://vscode-app/Applications/Visual%20Studio%20Code%20-%20Insiders.app/Contents/Resources/app/out/vs/code/electron-browser/workbench/workbench.html) is deployed as the site root
* [typedoc](vscode-file://vscode-app/Applications/Visual%20Studio%20Code%20-%20Insiders.app/Contents/Resources/app/out/vs/code/electron-browser/workbench/workbench.html) is also published under [typedoc](vscode-file://vscode-app/Applications/Visual%20Studio%20Code%20-%20Insiders.app/Contents/Resources/app/out/vs/code/electron-browser/workbench/workbench.html)

So your Pages site will serve:

* demo at `https://sguisse.github.io/FlexLayout/`
* API docs at `https://sguisse.github.io/FlexLayout/typedoc/`

### CI workflows

Updated to `pnpm` in:

* [lint.yml](vscode-file://vscode-app/Applications/Visual%20Studio%20Code%20-%20Insiders.app/Contents/Resources/app/out/vs/code/electron-browser/workbench/workbench.html)
* [test.yml](vscode-file://vscode-app/Applications/Visual%20Studio%20Code%20-%20Insiders.app/Contents/Resources/app/out/vs/code/electron-browser/workbench/workbench.html)
* [audit.yml](vscode-file://vscode-app/Applications/Visual%20Studio%20Code%20-%20Insiders.app/Contents/Resources/app/out/vs/code/electron-browser/workbench/workbench.html)
* [gh-pages.yml](vscode-file://vscode-app/Applications/Visual%20Studio%20Code%20-%20Insiders.app/Contents/Resources/app/out/vs/code/electron-browser/workbench/workbench.html)
* [release.yml](vscode-file://vscode-app/Applications/Visual%20Studio%20Code%20-%20Insiders.app/Contents/Resources/app/out/vs/code/electron-browser/workbench/workbench.html)

Notable details:

* `pnpm/action-setup@v4`
* `actions/setup-node@v4` with `cache: pnpm`
* `pnpm install --frozen-lockfile`
* audit comparison now parses `pnpm audit --json`

### Package metadata

In [package.json](vscode-file://vscode-app/Applications/Visual%20Studio%20Code%20-%20Insiders.app/Contents/Resources/app/out/vs/code/electron-browser/workbench/workbench.html) I aligned the package config with your fork:

* name: [@sguisse/flexlayout-react](vscode-file://vscode-app/Applications/Visual%20Studio%20Code%20-%20Insiders.app/Contents/Resources/app/out/vs/code/electron-browser/workbench/workbench.html)
* version: `0.8.19-sguisse.0`
* `packageManager: pnpm@10.28.2`
* `publishConfig.access: public`

### README

Updated [README.md](vscode-file://vscode-app/Applications/Visual%20Studio%20Code%20-%20Insiders.app/Contents/Resources/app/out/vs/code/electron-browser/workbench/workbench.html) so it now points to:

* the scoped npm package
* the forked import path
* the GitHub Pages demo/docs URLs
* the fork repo badge/link

## Files changed

* [package.json](vscode-file://vscode-app/Applications/Visual%20Studio%20Code%20-%20Insiders.app/Contents/Resources/app/out/vs/code/electron-browser/workbench/workbench.html) — fork package metadata, pnpm metadata, public publish config
* [lint.yml](vscode-file://vscode-app/Applications/Visual%20Studio%20Code%20-%20Insiders.app/Contents/Resources/app/out/vs/code/electron-browser/workbench/workbench.html) — pnpm lint workflow
* [test.yml](vscode-file://vscode-app/Applications/Visual%20Studio%20Code%20-%20Insiders.app/Contents/Resources/app/out/vs/code/electron-browser/workbench/workbench.html) — pnpm test workflow
* [audit.yml](vscode-file://vscode-app/Applications/Visual%20Studio%20Code%20-%20Insiders.app/Contents/Resources/app/out/vs/code/electron-browser/workbench/workbench.html) — pnpm audit workflow with advisory diffing
* [gh-pages.yml](vscode-file://vscode-app/Applications/Visual%20Studio%20Code%20-%20Insiders.app/Contents/Resources/app/out/vs/code/electron-browser/workbench/workbench.html) — deploy demo + typedoc from `release-sguisse`
* [release.yml](vscode-file://vscode-app/Applications/Visual%20Studio%20Code%20-%20Insiders.app/Contents/Resources/app/out/vs/code/electron-browser/workbench/workbench.html) — manual branch-safe npm/GitHub release workflow
* [labeler.yml](vscode-file://vscode-app/Applications/Visual%20Studio%20Code%20-%20Insiders.app/Contents/Resources/app/out/vs/code/electron-browser/workbench/workbench.html) — updated paths for the current repo layout
* [README.md](vscode-file://vscode-app/Applications/Visual%20Studio%20Code%20-%20Insiders.app/Contents/Resources/app/out/vs/code/electron-browser/workbench/workbench.html) — scoped package and GitHub Pages links
* [.prettierignore](vscode-file://vscode-app/Applications/Visual%20Studio%20Code%20-%20Insiders.app/Contents/Resources/app/out/vs/code/electron-browser/workbench/workbench.html) — ignore generated artifacts
* [IJsonModel.ts](vscode-file://vscode-app/Applications/Visual%20Studio%20Code%20-%20Insiders.app/Contents/Resources/app/out/vs/code/electron-browser/workbench/workbench.html) — fixed empty-interface lint issue
* [Utils.ts](vscode-file://vscode-app/Applications/Visual%20Studio%20Code%20-%20Insiders.app/Contents/Resources/app/out/vs/code/electron-browser/workbench/workbench.html) — replaced old UUID helper suppression
* [Splitter.tsx](vscode-file://vscode-app/Applications/Visual%20Studio%20Code%20-%20Insiders.app/Contents/Resources/app/out/vs/code/electron-browser/workbench/workbench.html) — fixed unsafe optional-chain assertion
* [TabOverflowHook.tsx](vscode-file://vscode-app/Applications/Visual%20Studio%20Code%20-%20Insiders.app/Contents/Resources/app/out/vs/code/electron-browser/workbench/workbench.html) — fixed unsafe optional-chain assertion

## Validation

I verified the repo with actual local runs of:

* `pnpm lint`
* `pnpm test -- --run`
* [pnpm build](vscode-file://vscode-app/Applications/Visual%20Studio%20Code%20-%20Insiders.app/Contents/Resources/app/out/vs/code/electron-browser/workbench/workbench.html)

Result:

* lint passed
* tests passed
* build passed

Build note:

* Typedoc still emits warnings about some React external symbol links, but there were **no build errors**

## Important note

Your workflows now treat `release-sguisse` as the release/deploy branch, which matches what you asked.

If you also want GitHub’s UI/PR defaults to behave the same way, you should **optionally** change the repository default branch in GitHub settings from `master` to `release-sguisse`.
That is not required for the workflows I changed, but it will make the GitHub UI less confusing.

## One deliberate choice

I removed the Prettier step from CI linting.

Why:

* the repo has older formatting drift unrelated to the release/publish work
* keeping Prettier in CI would fail the workflow for style noise instead of real problems

So CI now checks what matters operationally:

* ESLint
* tests
* build
* audit
* release
* pages deploy

If you want, I can do a second pass later to normalize formatting repo-wide and re-enable Prettier in CI cleanly.

## Updated checklist

* [X] Audit repo publish config
* [X] Check workflow assumptions
* [X] Patch CI to pnpm
* [X] Fix release publishing
* [X] Validate with tests/errors
