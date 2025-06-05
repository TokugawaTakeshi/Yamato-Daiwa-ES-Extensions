import removeArrayElementsByPredicates from "../../Arrays/07-RemovingOfElements/removeArrayElementsByPredicates";
import explodeURI_PathToSegments from "./explodeURI_PathToSegments";


export default function removeSpecificSegmentsFromURI_Path(
  compoundParameter: Readonly<{
    targetPath: string;
    targetSegments: ReadonlyArray<string>;
    mustOutputAlwaysWithForwardSlashesPathSeparators: boolean;
  }>
): string {
  return removeArrayElementsByPredicates({
    targetArray: explodeURI_PathToSegments(compoundParameter.targetPath),
    predicate: (pathSegment: string): boolean => compoundParameter.targetSegments.includes(pathSegment),
    mutably: false
  }).
      updatedArray.
      join(
        compoundParameter.mustOutputAlwaysWithForwardSlashesPathSeparators && compoundParameter.targetPath.includes("\\") ?
            "\\" :
            "/"
  );
}
