import reverseString from "../Strings/reverseString";
import isUndefined from "../TypeGuards/EmptyTypes/isUndefined";


export default function formatNumberWith4KetaKanji(targetNumber: number | bigint | string): string {

  const NUMBER_DIGITS_SEPARATION__CHARACTERS_COUNT: number = 4;

  let targetNumber__stringified: string = targetNumber.toString();
  const isNegative: boolean = targetNumber__stringified.startsWith("-");
  const decimalPart__stringified: string | undefined = targetNumber__stringified.split(".")[1];

  if (targetNumber__stringified.length < NUMBER_DIGITS_SEPARATION__CHARACTERS_COUNT + 1) {
    return targetNumber__stringified;
  }


  if (isNegative) {
    targetNumber__stringified = targetNumber__stringified.substring(1);
  }

  if (!isUndefined(decimalPart__stringified)) {
    targetNumber__stringified = targetNumber__stringified.replace(`.${ decimalPart__stringified }`, "");
  }

  const targetNumber__reversed: string = reverseString(targetNumber__stringified);

  const MANS_FIRST_DIGITS_NUMBER__BEGINNING_FROM_0: number = NUMBER_DIGITS_SEPARATION__CHARACTERS_COUNT;
  const OKUS_FIRST_DIGITS_NUMBER__BEGINNING_FROM_0: number =
      MANS_FIRST_DIGITS_NUMBER__BEGINNING_FROM_0 + NUMBER_DIGITS_SEPARATION__CHARACTERS_COUNT;
  const TYOUS_FIRST_DIGITS_NUMBER__BEGINNING_FROM_0: number =
      OKUS_FIRST_DIGITS_NUMBER__BEGINNING_FROM_0 + NUMBER_DIGITS_SEPARATION__CHARACTERS_COUNT;
  const KEIS_FIRST_DIGITS_NUMBER__BEGINNING_FROM_0: number =
      TYOUS_FIRST_DIGITS_NUMBER__BEGINNING_FROM_0 + NUMBER_DIGITS_SEPARATION__CHARACTERS_COUNT;
  const REMAIN_DIGITS_START_POSITION__BEGINNING_FROM_0: number =
      KEIS_FIRST_DIGITS_NUMBER__BEGINNING_FROM_0 + NUMBER_DIGITS_SEPARATION__CHARACTERS_COUNT;

  const lastFourDigits: string = reverseString(targetNumber__reversed.substr(0, NUMBER_DIGITS_SEPARATION__CHARACTERS_COUNT));
  const mans__japaneseCalculus: string = reverseString(targetNumber__reversed.
      substr(MANS_FIRST_DIGITS_NUMBER__BEGINNING_FROM_0, NUMBER_DIGITS_SEPARATION__CHARACTERS_COUNT));
  const okus__japaneseCalculus: string = reverseString(targetNumber__reversed.
      substr(OKUS_FIRST_DIGITS_NUMBER__BEGINNING_FROM_0, NUMBER_DIGITS_SEPARATION__CHARACTERS_COUNT));
  const tyous__japaneseCalculus: string = reverseString(targetNumber__reversed.
      substr(TYOUS_FIRST_DIGITS_NUMBER__BEGINNING_FROM_0, NUMBER_DIGITS_SEPARATION__CHARACTERS_COUNT));
  const keis__japaneseCalculus: string = reverseString(targetNumber__reversed.
      substr(KEIS_FIRST_DIGITS_NUMBER__BEGINNING_FROM_0, NUMBER_DIGITS_SEPARATION__CHARACTERS_COUNT));
  const remainDigits: string = reverseString(targetNumber__reversed.
      substr(REMAIN_DIGITS_START_POSITION__BEGINNING_FROM_0));


  return (isNegative ? "-" : "") +
      (remainDigits.length > 0 ? remainDigits : "") +
      (keis__japaneseCalculus.length > 0 ? `${ keis__japaneseCalculus }京` : "") +
      (tyous__japaneseCalculus.length > 0 ? `${ tyous__japaneseCalculus }兆` : "") +
      (okus__japaneseCalculus.length > 0 ? `${ okus__japaneseCalculus }億` : "") +
      (mans__japaneseCalculus.length > 0 ? `${ mans__japaneseCalculus }万` : "") +
      lastFourDigits +
      (isUndefined(decimalPart__stringified) ? "" : `.${ decimalPart__stringified }`);
}
