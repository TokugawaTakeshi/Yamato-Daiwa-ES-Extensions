import splitString from "../../splitString";
import replaceDoubleBackslashesWithForwardSlashes from "../../replaceDoubleBackslashesWithForwardSlashes";


export default function explodeURI_PathToSegments(targetPath: string): Array<string> {
  return splitString(replaceDoubleBackslashesWithForwardSlashes(targetPath), "/");
}
