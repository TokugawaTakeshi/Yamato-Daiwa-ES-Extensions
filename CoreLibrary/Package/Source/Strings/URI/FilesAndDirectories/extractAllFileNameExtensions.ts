import replaceDoubleBackslashesWithForwardSlashes from "../../replaceDoubleBackslashesWithForwardSlashes";
import splitString from "../../splitString";
import isUndefined from "../../../TypeGuards/Nullables/isUndefined";


export default function extractAllFileNameExtensions(
  compoundParameter: Readonly<{ targetPath: string; withLeadingDots: boolean; }>
): Array<string> {

  const lastPathSegment: string | undefined = splitString(
    replaceDoubleBackslashesWithForwardSlashes(compoundParameter.targetPath), "/"
  )[0];

  if (isUndefined(lastPathSegment) || !lastPathSegment.includes(".") || lastPathSegment === ".") {
    return [];
  }


  const fileNameExtensions: Array<string> = splitString(lastPathSegment, ".").slice(1);

  if (compoundParameter.withLeadingDots) {
    return fileNameExtensions.map((fileNameExtension: string): string => `.${ fileNameExtension }`);
  }


  return fileNameExtensions;

}
