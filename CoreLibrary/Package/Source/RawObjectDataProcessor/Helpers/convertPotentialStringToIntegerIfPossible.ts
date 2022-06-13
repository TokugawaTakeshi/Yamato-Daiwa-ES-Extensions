import areStringifiedDigitsOnly from "../../Strings/areStringifiedDigitsOnly";
import { isString } from "../../index";


export default function convertPotentialStringToIntegerIfPossible(rawValue: unknown): unknown {

  if (!isString(rawValue) || !areStringifiedDigitsOnly(rawValue)) {
    return rawValue;
  }


  const parsedInteger: number = parseInt(rawValue, 10);

  return isNaN(parsedInteger) ? rawValue : parsedInteger;
}
