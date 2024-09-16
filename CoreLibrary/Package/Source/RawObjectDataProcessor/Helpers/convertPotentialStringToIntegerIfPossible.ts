import areStringifiedDigitsOnly from "../../TypeGuards/Strings/areStringifiedDigitsOnly";


export default function convertPotentialStringToIntegerIfPossible(rawValue: unknown): unknown {

  if (!areStringifiedDigitsOnly(rawValue)) {
    return rawValue;
  }


  const parsedInteger: number = parseInt(rawValue, 10);

  return isNaN(parsedInteger) ? rawValue : parsedInteger;

}
