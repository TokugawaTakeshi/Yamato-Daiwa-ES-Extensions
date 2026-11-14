Both failures come from the workflow file. You don't need to restructure the repository or replace the `../../Main/Core` links.

## 1. `Cannot find module '@yamato-daiwa/es-extensions'`

**Cause:** `needs: corePackageQualityInspection` only sets the order of the jobs. Each job runs on a fresh virtual machine with a fresh checkout. So when the BrowserJS and Node.js jobs start:

- `Main/Core/Distributable/` doesn't exist. It's in `Main/Core/.gitignore`, and it was only built on the Core job's machine, which is gone by then. `"types": "./Distributable/esm/index.d.ts"` therefore points at nothing.
- `Main/Core/node_modules/` doesn't exist either, so `fundamental-constants` can't be found when Node.js follows the link into `Main/Core`.

The link itself works. It just points to a directory that hasn't been built yet. (The step "Building of Distributable for Dependents" was added on 2026-11-05 and couldn't help, for the same reason.) The other errors in the log, like `dataset` and `possibly 'undefined'`, follow from this one: the library's types can't be loaded.

**Fix:** pass the built `Distributable` from the Core job to the dependent jobs as an artifact, then install the Core package's runtime dependencies there.

## 2. `Filename too long`

**Cause:** commit `884f314` (2026-10-31) added the `os: [ubuntu-latest, windows-latest, macos-latest]` matrix. Before that, every job ran only on Ubuntu, which has no path length limit. That's why it used to work. On Windows, Git for Windows keeps the 260-character `MAX_PATH` limit unless `core.longpaths` is turned on, and the runner path `D:\a\Yamato-Daiwa-ES-Extensions\Yamato-Daiwa-ES-Extensions\` uses about 60 characters of that.

**Fix:** turn on long paths before the checkout step, only on Windows. Optionally, the Node.js job can also use a sparse checkout that skips `Documentation/` and `docs/`, which it doesn't need.

## Proposed `.github/workflows/QualityInspection.yaml`

```yaml
name: Quality Inspection

on:
  push:
    branches-ignore:
      - master

jobs:

  corePackageQualityInspection:
    name: Core Package Quality Inspection
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22.15.0
      - run: node --version
      - name: Dependencies Installation
        run: cd Main/Core && npm ci
      - name: Types Checking
        run: cd Main/Core && npm run "Check Types"
      - name: Linting
        run: cd Main/Core && npm run "Lint"
      - name: Tests
        run: cd Main/Core && npm run "Run Tests"
      - name: Building of Distributable for Dependents
        run: cd Main/Core && npm run "Rebuild Distributable"
      - name: Passing of Distributable to Dependent Jobs
        uses: actions/upload-artifact@v4
        with:
          name: core-distributable
          path: Main/Core/Distributable
          retention-days: 1

  browserJS_PackageQualityInspection:
    name: BrowserJS Package Quality Inspection
    needs: corePackageQualityInspection
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22.15.0
      - name: Retrieving of Core Distributable
        uses: actions/download-artifact@v4
        with:
          name: core-distributable
          path: Main/Core/Distributable
      - name: Core Runtime Dependencies Installation
        run: cd Main/Core && npm ci --omit=dev
      - name: Dependencies Installation
        run: cd BrowserJS/Core && npm install
      - name: Types Checking
        run: cd BrowserJS/Core && npm run "Check Types"
      - name: Linting
        run: cd BrowserJS/Core && npm run "Lint"
      - name: Tests
        run: cd BrowserJS/Core && npm run "Run Tests"

  nodeJS_PackageQualityInspection:
    name: NodeJS Package Quality Inspection
    needs: corePackageQualityInspection
    runs-on: ${{ matrix.os }}
    strategy:
      fail-fast: false
      matrix:
        os: [ ubuntu-latest, windows-latest, macos-latest ]
        node-version: [ 22, 24, 26 ]
    steps:
      - name: Enabling of Long Paths (Windows)
        if: runner.os == 'Windows'
        run: git config --system core.longpaths true
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
      - run: node --version
      - name: Retrieving of Core Distributable
        uses: actions/download-artifact@v4
        with:
          name: core-distributable
          path: Main/Core/Distributable
      - name: Core Runtime Dependencies Installation
        run: cd Main/Core && npm ci --omit=dev
      - name: Dependencies Installation
        run: cd NodeJS/Core && npm install
      - name: Types Checking
        run: cd NodeJS/Core && npm run "Check Types"
      - name: Linting
        run: cd NodeJS/Core && npm run "Lint"
      - name: Tests
        run: cd NodeJS/Core && npm run "Run Tests"
```

- **Sparse checkout (optional):** on the Node.js job, replace the plain checkout with `actions/checkout@v4` plus `sparse-checkout: |` listing `Main/Core` and `NodeJS/Core`. This makes the checkout faster and avoids the long paths entirely, but `core.longpaths` alone is enough.
- **Simpler alternative to the artifact:** in each dependent job, run `cd Main/Core && npm ci && npm run "Rebuild Distributable"` before installing the dependent package. This rebuilds Core about 10 times, but it needs no artifact steps.

## Your uncommitted local changes

Your working tree has `BrowserJS/Core/package.json` switched to `"@yamato-daiwa/es-extensions": "1.10.0-alpha.3"`, and `BrowserJS/Core/package-lock.json` deleted and staged. That looks like the attempt you said you don't want. If so, undo both before committing: `git restore --staged --worktree BrowserJS/Core/package.json BrowserJS/Core/package-lock.json`. That restores the `../../Main/Core` link and the lock file.

I haven't edited the workflow file or tested this in CI. Tell me if you want me to write it into `QualityInspection.yaml`.
