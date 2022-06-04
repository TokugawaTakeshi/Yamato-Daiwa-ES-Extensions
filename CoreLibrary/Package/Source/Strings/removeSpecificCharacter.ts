import removeArrayElementsByIndexes from "../Arrays/removeArrayElementsByIndexes";


export default function removeSpecificCharacter(
  namedParameters:
    {
      targetString: string;
      targetCharacter: string;
    } &
    (
      { atFirstPosition: true; } |
      { atLastPosition: true; } |
      { atPosition__numerationFrom0: number; } |
      { atPosition__numerationFrom1: number; }
    )
): string {

  /* [ Theory ]　'split', 'slice', 'substr', 'substring' methods (of String.prototype) are not support
   *   the UTF16 surrogate pairs. */
  const charactersSequence: Array<string> = Array.from(namedParameters.targetString);
  let indexOfTargetCharacterInSequence: number;

  if ("atFirstPosition" in namedParameters) {
    indexOfTargetCharacterInSequence = 0;
  } else if ("atLastPosition" in namedParameters) {
    indexOfTargetCharacterInSequence = charactersSequence.length - 1;
  } else if ("atPosition__numerationFrom0" in namedParameters) {
    indexOfTargetCharacterInSequence = namedParameters.atPosition__numerationFrom0;
  } else {
    indexOfTargetCharacterInSequence = namedParameters.atPosition__numerationFrom1 - 1;
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
