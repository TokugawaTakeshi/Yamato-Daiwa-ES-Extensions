import isNonEmptyString from "../../../TypeGuards/Strings/isNonEmptyString";
import isUndefined from "../../../TypeGuards/EmptyTypes/isUndefined";
import isNotNull from "../../../TypeGuards/EmptyTypes/isNotNull";
import getURI_Fragment from "./getURI_Fragment";


export default function appendFragmentToURI(
  sourceData: Readonly<{
    targetURI: string;
    targetFragmentWithOrWithoutLeadingHash?: string | null;
    mustReplaceFragmentIfThereIsOneAlready: boolean;
  }>
): string {

  let targetFragmentWithoutLeadingHash: string | undefined;

  if (isNonEmptyString(sourceData.targetFragmentWithOrWithoutLeadingHash)) {

    targetFragmentWithoutLeadingHash = sourceData.targetFragmentWithOrWithoutLeadingHash.startsWith("#") ?
        sourceData.targetFragmentWithOrWithoutLeadingHash.substring(1) :
        sourceData.targetFragmentWithOrWithoutLeadingHash;

  }


  if (isUndefined(targetFragmentWithoutLeadingHash)) {
    return sourceData.targetURI;
  }


  const currentURI_FragmentWithLeadingHash: string | null = getURI_Fragment({
    targetURI: sourceData.targetURI,
    withLeadingHash: true
  });

  if (isNotNull(currentURI_FragmentWithLeadingHash)) {

    if (sourceData.mustReplaceFragmentIfThereIsOneAlready) {
      return sourceData.targetURI.replace(currentURI_FragmentWithLeadingHash, `#${ targetFragmentWithoutLeadingHash }`);
    }


    return sourceData.targetURI;

  }


  return `${ sourceData.targetURI }#${ targetFragmentWithoutLeadingHash }`;

}
