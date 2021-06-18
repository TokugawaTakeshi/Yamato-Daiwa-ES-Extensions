import isNonNegativeInteger from "../Numbers/isNonNegativeInteger";


export namespace IsStringOfLengthCheckingOperation {

  export type Options__ExactSymbolsCountCase = {
    exactSymbolsCount: number;
    minimalSymbolsCount?: undefined;
    maximalSymbolsCount?: undefined;
  };

  export type Options__MinimalSymbolsCountCase = {
    minimalSymbolsCount: number;
    maximalSymbolsCount?: undefined;
    exactSymbolsCount?: undefined;
  };

  export type Options__MaximalSymbolsCountCase = {
    maximalSymbolsCount: number;
    minimalSymbolsCount?: undefined;
    exactSymbolsCount?: undefined;
  };

  export type Options__MinimalAndMaximalSymbolsCountCase = {
    minimalSymbolsCount: number;
    maximalSymbolsCount: number;
    exactSymbolsCount?: undefined;
  };

  export type Options =
      Options__ExactSymbolsCountCase |
      Options__MinimalSymbolsCountCase |
      Options__MaximalSymbolsCountCase |
      Options__MinimalAndMaximalSymbolsCountCase;


  export function isStringOfLength(potentialString: unknown, options: Options): potentialString is string {

    if (typeof potentialString !== "string") {
      return false;
    }

    if (isNonNegativeInteger(options.exactSymbolsCount)) {
      return potentialString.length === options.exactSymbolsCount;
    }

    if (isNonNegativeInteger(options.minimalSymbolsCount) && isNonNegativeInteger(options.maximalSymbolsCount)) {
      return potentialString.length >= options.minimalSymbolsCount && potentialString.length <= options.maximalSymbolsCount;
    }

    if (isNonNegativeInteger(options.minimalSymbolsCount)) {
      return potentialString.length >= options.minimalSymbolsCount;
    }

    if (isNonNegativeInteger(options.maximalSymbolsCount)) {
      return potentialString.length <= options.maximalSymbolsCount;
    }

    return false;
  }
}


export default IsStringOfLengthCheckingOperation.isStringOfLength;
