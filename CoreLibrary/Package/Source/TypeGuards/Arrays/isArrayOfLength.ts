import isNonNegativeInteger from "../Numbers/isNonNegativeInteger";


export namespace IsArrayOfLengthCheckingOperation {

  export type Options__ExactElementsCountCase = Readonly<{
    exactElementsCount: number;
    minimalElementsCount?: undefined;
    maximalElementsCount?: undefined;
  }>;

  export type Options__MinimalElementsCountCase = Readonly<{
    minimalElementsCount: number;
    maximalElementsCount?: undefined;
    exactElementsCount?: undefined;
  }>;

  export type Options__MaximalElementsCountCase = Readonly<{
    maximalElementsCount: number;
    minimalElementsCount?: undefined;
    exactElementsCount?: undefined;
  }>;

  export type Options__MinimalAndMaximalElementsCountCase = Readonly<{
    minimalElementsCount: number;
    maximalElementsCount: number;
    exactElementsCount?: undefined;
  }>;

  export type Options =
      Options__ExactElementsCountCase |
      Options__MinimalElementsCountCase |
      Options__MaximalElementsCountCase |
      Options__MinimalAndMaximalElementsCountCase;


  export function isArrayOfLength<ArrayElement>(
    potentialArray: unknown, options: Options
  ): potentialArray is Array<ArrayElement> {

    if (!Array.isArray(potentialArray)) {
      return false;
    }


    if (isNonNegativeInteger(options.exactElementsCount)) {
      return potentialArray.length === options.exactElementsCount;
    }


    if (isNonNegativeInteger(options.minimalElementsCount) && isNonNegativeInteger(options.maximalElementsCount)) {
      return potentialArray.length >= options.minimalElementsCount && potentialArray.length <= options.maximalElementsCount;
    }


    if (isNonNegativeInteger(options.minimalElementsCount)) {
      return potentialArray.length >= options.minimalElementsCount;
    }


    if (isNonNegativeInteger(options.maximalElementsCount)) {
      return potentialArray.length <= options.maximalElementsCount;
    }


    return false;
  }
}


export default IsArrayOfLengthCheckingOperation.isArrayOfLength;
