import type { ExtractingOfMatchingsWithRegularExpression } from
    "../RegularExpressions/extractMatchingsWithRegularExpression";
import extractMatchingsWithRegularExpression from "../RegularExpressions/extractMatchingsWithRegularExpression";
import splitString from "../splitString";
import replaceDoubleBackslashesWithForwardSlashes from "../replaceDoubleBackslashesWithForwardSlashes";
import isNotNull from "../../TypeGuards/EmptyTypes/isNotNull";


export default function replaceLastURI_PathSegment(
  compoundParameter: Readonly<{ targetURI: string; newLastPathSegment: string; }>
): string {

  const {
    extractedMatching: targetPathFragmentWithLeadingHash
  }: ExtractingOfMatchingsWithRegularExpression.NullableResult = extractMatchingsWithRegularExpression(
    compoundParameter.targetURI, /#.+$/u, { mustExpectOneOrZeroMatchings: true }
  );

  const pathSegments: ReadonlyArray<string> = splitString(
    replaceDoubleBackslashesWithForwardSlashes(compoundParameter.targetURI), "/"
  );

  return [
    ...pathSegments.slice(0, pathSegments.length - 1),
    compoundParameter.newLastPathSegment,
    ...isNotNull(targetPathFragmentWithLeadingHash) ? [ targetPathFragmentWithLeadingHash ] : []
  ].join("/");

}
