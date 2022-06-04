import areStringifiedDigitsOnly from "../../Strings/areStringifiedDigitsOnly";
import { isString } from "../../index";


export default function convertUnknownToFloatIfPossible(rawValue: unknown): unknown {

  if (!isString(rawValue) || !areStringifiedDigitsOnly(rawValue)) {
    return rawValue;
  }


  const parsedFloat: number = parseFloat(rawValue);

  return isNaN(parsedFloat) ? rawValue : parsedFloat;
}
