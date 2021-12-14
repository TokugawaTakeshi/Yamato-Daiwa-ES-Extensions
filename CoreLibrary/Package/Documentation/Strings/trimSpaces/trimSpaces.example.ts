/* [ ESLint muting rationale ] Comments are for documentation. */
/* eslint-disable no-inline-comments */

import { trimSpaces, SpaceCharacters } from "../../../Source";


console.log(trimSpaces(
  "　試験　",
  { excludeKinds: [ SpaceCharacters.ideographicSpace ] }
).length); // => 4

console.log(trimSpaces(" A ", { skipTrailingOnes: true }) === "A "); // => true
console.log(trimSpaces(" A ", { skipLeadingOnes: true }) === " A"); // => true
