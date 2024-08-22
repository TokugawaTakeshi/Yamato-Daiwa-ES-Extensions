/*  〔 ESLint muting rationale 〕 Although "Function" is not recommended to use, this check can eliminate, for example,
*   'undefined' when function parameter/property is optional. */
/* eslint-disable @typescript-eslint/no-unsafe-function-type */
export default function isFunctionLike(potentialFunction: unknown): potentialFunction is Function {
  return potentialFunction instanceof Function;
}
