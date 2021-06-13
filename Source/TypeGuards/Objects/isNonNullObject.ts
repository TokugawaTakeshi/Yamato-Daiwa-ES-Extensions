/*  〔 ESLint muting rationale 〕 Although object is not recommended to use, this check could be interim in narrowing from
*     'unknown' to object with fixed keys and values types. */
/* eslint-disable @typescript-eslint/ban-types */
export default function isNonNullObject(potentialObject: unknown): potentialObject is object {
  return typeof potentialObject === "object" && potentialObject !== null;
}
