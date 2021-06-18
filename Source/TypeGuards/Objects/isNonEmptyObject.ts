/*  〔 ESLint muting rationale 〕 Although object is not recommended to use, this check could be interim in narrowing from
*     'unknown' to object with fixed keys and values types. */
/* eslint-disable @typescript-eslint/ban-types */
export default function isNonEmptyObject(potentialObject: unknown): potentialObject is object {

  if (typeof potentialObject !== "object" || potentialObject === null) {
    return false;
  }

  return Object.entries(potentialObject as { [key: string]: unknown; }).length > 0;
}
