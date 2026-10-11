import isUndefined from "../TypeGuards/EmptyTypes/isUndefined";
import isNotUndefined from "../TypeGuards/EmptyTypes/isNotUndefined";
import twoDimensionalizeArray from "../Arrays/08-Restructuring/twoDimensionalizeArray";
import splitString from "../Strings/splitString";
import undefinedToEmptyString from "../ValueTransformers/undefinedToEmptyString";


export default function formatNumberWith4_KetaKanji(targetNumber: number | bigint | string): string {

  const NUMBER_DIGITS_SEPARATION__CHARACTERS_COUNT: number = 4;

  const stringifiedTargetNumber: string = targetNumber.toString();

  if (stringifiedTargetNumber.length < NUMBER_DIGITS_SEPARATION__CHARACTERS_COUNT + 1) {
    return stringifiedTargetNumber;
  }


  const [ stringifiedIntegerPart, stringifiedDecimalPart ]: Array<string> =
      stringifiedTargetNumber.split(".");

  const digitsOfIntegerPartInReversedOrder: Array<string> = splitString(stringifiedIntegerPart, "").
      filter((character: string): boolean => (/\d/u).test(character)).
      reverse();

  const placeValuesMatrix: Array<Array<string>> = twoDimensionalizeArray({
    targetFlatArray: digitsOfIntegerPartInReversedOrder,
    elementsCountPerNestedArray: NUMBER_DIGITS_SEPARATION__CHARACTERS_COUNT
  });

  const placeValuesKanjis: ReadonlyArray<string | undefined> = [ "万", "億", "兆", "京" ];

  return [
    ...stringifiedTargetNumber.startsWith("-") ? [ "-" ] : [],
    placeValuesMatrix.reduce(
      (
        accumulatingValue: string,
        digitsAndPlaceValueKanji: Array<string>,
        rowIndex: number
      ): string =>
          (isNotUndefined(placeValuesMatrix[rowIndex + 1]) ? undefinedToEmptyString(placeValuesKanjis[rowIndex]) : "") +
          digitsAndPlaceValueKanji.
              reverse().
              join("") +
          accumulatingValue,
      ""
    ),
    ...isUndefined(stringifiedDecimalPart) ? [] : [ `.${ stringifiedDecimalPart }` ]
  ].join("");

}
