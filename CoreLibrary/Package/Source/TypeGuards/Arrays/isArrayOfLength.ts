import isNaturalNumberOrZero from "../Numbers/isNaturalNumberOrZero";


export namespace IsArrayOfLengthCheck {

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


    if (isNaturalNumberOrZero(options.exactElementsCount)) {
      return potentialArray.length === options.exactElementsCount;
    }


    if (isNaturalNumberOrZero(options.minimalElementsCount) && isNaturalNumberOrZero(options.maximalElementsCount)) {
      return potentialArray.length >= options.minimalElementsCount && potentialArray.length <= options.maximalElementsCount;
    }


    if (isNaturalNumberOrZero(options.minimalElementsCount)) {
      return potentialArray.length >= options.minimalElementsCount;
    }


    if (isNaturalNumberOrZero(options.maximalElementsCount)) {
      return potentialArray.length <= options.maximalElementsCount;
    }


    return false;
  }
}


export default IsArrayOfLengthCheck.isArrayOfLength;
