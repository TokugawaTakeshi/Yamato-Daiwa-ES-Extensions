import { removeAllSpecifiedCharacters } from "@yamato-daiwa/es-extensions";


export function formatJapanesePhoneNumber(phoneNumber: string | number): string {

  const phoneNumber__digitsOnly: string = removeAllSpecifiedCharacters(String(phoneNumber), "-");
  const DIGITS_COUNT_IN_TWO_LAST_PORTIONS_DIVIDED_BY_N_DASH: number = 4;
  const FIRST_N_DASH_POSITION: number = phoneNumber__digitsOnly.length % DIGITS_COUNT_IN_TWO_LAST_PORTIONS_DIVIDED_BY_N_DASH;
  const SECOND_N_DASH_POSITION: number = FIRST_N_DASH_POSITION + DIGITS_COUNT_IN_TWO_LAST_PORTIONS_DIVIDED_BY_N_DASH;

  return `${ phoneNumber__digitsOnly.slice(0, FIRST_N_DASH_POSITION) }-` +
    `${ phoneNumber__digitsOnly.slice(FIRST_N_DASH_POSITION, SECOND_N_DASH_POSITION) }-` +
    phoneNumber__digitsOnly.slice(SECOND_N_DASH_POSITION);

}
