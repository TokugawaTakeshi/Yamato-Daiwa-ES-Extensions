import removeArrayElementsByIndexes from "../Arrays/removeArrayElementsByIndexes";


export default function removeSpecificCharacterFromCertainPosition(
  sourceData:
      Readonly<
        {
          targetString: string;
          targetCharacter: string;
        } &
        (
          { fromFirstPosition: true; } |
          { fromLastPosition: true; } |
          { fromPosition__numerationFrom0: number; } |
          { fromPosition__numerationFrom1: number; }
        )
      >
): string {

  /* [ Theory ]　'split', 'slice', 'substr', 'substring' methods (of String.prototype) are not support
   *   the UTF16 surrogate pairs. */
  const charactersSequence: Array<string> = Array.from(sourceData.targetString);
  let indexOfTargetCharacterInSequence: number;

  if ("fromFirstPosition" in sourceData) {
    indexOfTargetCharacterInSequence = 0;
  } else if ("fromLastPosition" in sourceData) {
    indexOfTargetCharacterInSequence = charactersSequence.length - 1;
  } else if ("fromPosition__numerationFrom0" in sourceData) {
    indexOfTargetCharacterInSequence = sourceData.fromPosition__numerationFrom0;
  } else {
    indexOfTargetCharacterInSequence = sourceData.fromPosition__numerationFrom1 - 1;
  }


  if (charactersSequence[indexOfTargetCharacterInSequence] !== sourceData.targetCharacter) {
    return sourceData.targetString;
  }


  return removeArrayElementsByIndexes({
    targetArray: charactersSequence,
    indexes: indexOfTargetCharacterInSequence,
    mutably: true
  }).updatedArray.join("");

}
