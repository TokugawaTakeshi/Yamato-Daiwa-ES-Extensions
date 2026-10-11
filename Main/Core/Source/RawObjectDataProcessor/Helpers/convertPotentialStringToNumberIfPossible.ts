import { isString } from "../../index";
import hasStringOnlySpecificCharacters from "../../Strings/hasStringOnlySpecificCharacters";


export default function convertPotentialStringToNumberIfPossible(rawValue: unknown): unknown {

  if (!isString(rawValue) || !hasStringOnlySpecificCharacters(rawValue, { digits: true, other: [ "-", "." ] })) {
    return rawValue;
  }


  const parsedNumber: number = rawValue.includes(".") ? parseFloat(rawValue) : parseInt(rawValue, 10);

  return isNaN(parsedNumber) ? rawValue : parsedNumber;
}
