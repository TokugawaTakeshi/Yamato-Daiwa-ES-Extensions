import { isString } from "../../index";
import hasStringOnlySpecificCharacters from "../../Strings/hasStringOnlySpecificCharacters";


export default function convertPotentialStringToFloatIfPossible(rawValue: unknown): unknown {

  if (!isString(rawValue) || !hasStringOnlySpecificCharacters(rawValue, { digits: true, other: "." })) {
    return rawValue;
  }


  const parsedFloat: number = parseFloat(rawValue);

  return isNaN(parsedFloat) ? rawValue : parsedFloat;
}
