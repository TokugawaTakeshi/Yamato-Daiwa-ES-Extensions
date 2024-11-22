import isNaturalNumberOrZero from "../Numbers/isNaturalNumberOrZero";


export namespace IsStringOfLengthCheckingOperation {

  export type Options__ExactCharactersCountCase = Readonly<{
    exactCharactersCount: number;
    minimalCharactersCount?: undefined;
    maximalCharactersCount?: undefined;
  }>;

  export type Options__MinimalCharactersCountCase = Readonly<{
    minimalCharactersCount: number;
    maximalCharactersCount?: undefined;
    exactCharactersCount?: undefined;
  }>;

  export type Options__MaximalCharactersCountCase = Readonly<{
    maximalCharactersCount: number;
    minimalCharactersCount?: undefined;
    exactCharactersCount?: undefined;
  }>;

  export type Options__MinimalAndMaximalCharactersCountCase = Readonly<{
    minimalCharactersCount: number;
    maximalCharactersCount: number;
    exactCharactersCount?: undefined;
  }>;

  export type Options =
      Options__ExactCharactersCountCase |
      Options__MinimalCharactersCountCase |
      Options__MaximalCharactersCountCase |
      Options__MinimalAndMaximalCharactersCountCase;


  export function isStringOfLength(potentialString: unknown, options: Options): potentialString is string;

  export function isStringOfLength(definiteString: string, options: Options): boolean;


  export function isStringOfLength(potentialString: unknown, options: Options): potentialString is string {

    if (typeof potentialString !== "string") {
      return false;
    }

    if (isNaturalNumberOrZero(options.exactCharactersCount)) {
      return potentialString.length === options.exactCharactersCount;
    }

    if (isNaturalNumberOrZero(options.minimalCharactersCount) && isNaturalNumberOrZero(options.maximalCharactersCount)) {
      return potentialString.length >= options.minimalCharactersCount && potentialString.length <= options.maximalCharactersCount;
    }

    if (isNaturalNumberOrZero(options.minimalCharactersCount)) {
      return potentialString.length >= options.minimalCharactersCount;
    }

    if (isNaturalNumberOrZero(options.maximalCharactersCount)) {
      return potentialString.length <= options.maximalCharactersCount;
    }

    return false;
  }
}


export default IsStringOfLengthCheckingOperation.isStringOfLength;
