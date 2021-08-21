import { RandomStringsGenerator } from "./getRandomString";


const GetRandomStringOperationLocalization__English: RandomStringsGenerator.Localization = {
  errors: {
    minimalSymbolsCountMustBeGreaterThan0: (realValue: number): string =>
      `The 'minimalSymbolsCount' property must be greater than 0 while really it's ${realValue}`,
    sumOfSymbolsCountOfAffixesAndMinimalRandomlyGeneratedSymbolsCountIsExceedsMaximalSymbolsCount: (
      parametersObject: RandomStringsGenerator.MaximalSymbolsCountComputing.ParametersObject
    ): string =>
        "The sum of symbols count of 'prefix', 'infix' and 'postfix' and also 'minimalRandomlyGeneratedSymbolsCount' are " +
        "exceeds the 'maximalSymbolsCount':\n" +
        `                       prefix.length: ${parametersObject.prefix.length}` +
        `                        infix.length: ${parametersObject.infix.length}` +
        `                      postfix.length: ${parametersObject.postfix.length}` +
        `minimalRandomlyGeneratedSymbolsCount: ${parametersObject.minimalRandomlyGeneratedSymbolsCount}` +
        `                            SUBTOTAL: ${
          parametersObject.prefix.length + 
          parametersObject.infix.length +
          parametersObject.postfix.length +
          parametersObject.minimalRandomlyGeneratedSymbolsCount    
        }` +
        `                 maximalSymbolsCount: ${parametersObject.maximalSymbolsCount}`,
    explicitlySpecifiedMinimalSymbolsCountExceedsMaximalSymbolsCount: (
      { minimalSymbolsCount, maximalSymbolsCount }: { minimalSymbolsCount: number; maximalSymbolsCount: number; }
    ): string => `The explicitly specified minimal symbols count (${minimalSymbolsCount}) exceeds the maximal symbols ` +
        `count ${maximalSymbolsCount}`,
    noAllowedSymbolsForRandomGeneration: "No symbols for the random string generation has been allowed allowed." +
      "Check the 'parametersObject.allowedSymbols' and satisfy at least on of below conditions:\n" +
      "  * Set 'latinUppercase' property to true\n" +
      "  * Set 'latinLowercase' property to true\n" +
      "  * Set 'digits' property to true\n" +
      "  * Set 'other' property to non-empty array\n"
  }
};


export default GetRandomStringOperationLocalization__English;
