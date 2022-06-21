import removeArrayElementsByIndexes from "../Arrays/removeArrayElementsByIndexes";


export default function removeSpecificCharacterFromCertainPosition(
  namedParameters:
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
  const charactersSequence: Array<string> = Array.from(namedParameters.targetString);
  let indexOfTargetCharacterInSequence: number;

  if ("fromFirstPosition" in namedParameters) {
    indexOfTargetCharacterInSequence = 0;
  } else if ("fromLastPosition" in namedParameters) {
    indexOfTargetCharacterInSequence = charactersSequence.length - 1;
  } else if ("fromPosition__numerationFrom0" in namedParameters) {
    indexOfTargetCharacterInSequence = namedParameters.fromPosition__numerationFrom0;
  } else {
    indexOfTargetCharacterInSequence = namedParameters.fromPosition__numerationFrom1 - 1;
  }


  if (charactersSequence[indexOfTargetCharacterInSequence] !== namedParameters.targetCharacter) {
    return namedParameters.targetString;
  }


  return removeArrayElementsByIndexes({
    targetArray: charactersSequence,
    indexes: indexOfTargetCharacterInSequence,
    mutably: true
  }).updatedArray.join("");
}
