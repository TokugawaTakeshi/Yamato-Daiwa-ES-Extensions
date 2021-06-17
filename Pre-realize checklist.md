# Pre-realize checklist

1. Make sure that all new functionality has been added to `Source/index.ts`, `Source/BrowserJS.ts` or `Source/NodeJS`.
2. Input new version in `package.json` and also copyright comments in `Source/index.ts`, `Source/BrowserJS.ts` and `Source/NodeJS`.
3. Compile all files below `Source`.
4. Run `npm run Lint` and resolve all issues.
5. Reexport all new functionality in `index.d.ts`, `BrowserJS.d.ts` of `NodeJS.d.ts`.
6. Make sure that all new functionality has been documented
7. Create realize notes in GitHub.
