import { RandomStringsGenerator } from "./getRandomString";


const GetRandomStringOperationLocalization__English: RandomStringsGenerator.Localization = {
  errors: {
    minimalCharactersCountMustBeGreaterThan0: (realValue: number): string =>
      `The 'minimalCharactersCount' property must be greater than 0 while really it's ${realValue}`,
    sumOfCharactersCountOfAffixesAndMinimalRandomlyGeneratedCharactersCountIsExceedsMaximalCharactersCount: (
      parametersObject: RandomStringsGenerator.MaximalCharactersCountComputing.ParametersObject
    ): string =>
        "The sum of characters count of 'prefix', 'infix' and 'postfix' and also 'minimalRandomlyGeneratedCharactersCount' are " +
        "exceeds the 'maximalCharactersCount':\n" +
        `                          prefix.length: ${parametersObject.prefix.length}` +
        `                           infix.length: ${parametersObject.infix.length}` +
        `                         postfix.length: ${parametersObject.postfix.length}` +
        `minimalRandomlyGeneratedCharactersCount: ${parametersObject.minimalRandomlyGeneratedCharactersCount}` +
        `                               SUBTOTAL: ${
          parametersObject.prefix.length + 
          parametersObject.infix.length +
          parametersObject.postfix.length +
          parametersObject.minimalRandomlyGeneratedCharactersCount    
        }` +
        `                 maximalCharactersCount: ${parametersObject.maximalCharactersCount}`,
    explicitlySpecifiedMinimalCharactersCountExceedsMaximalCharactersCount: (
      { minimalCharactersCount, maximalCharactersCount }: { minimalCharactersCount: number; maximalCharactersCount: number; }
    ): string => `The explicitly specified minimal characters count (${minimalCharactersCount}) exceeds the maximal characters ` +
        `count ${maximalCharactersCount}`,
    noAllowedCharactersForRandomGeneration: "No characters for the random string generation has been allowed allowed." +
      "Check the 'parametersObject.allowedCharacters' and satisfy at least on of below conditions:\n" +
      "  * Set 'latinUppercase' property to true\n" +
      "  * Set 'latinLowercase' property to true\n" +
      "  * Set 'digits' property to true\n" +
      "  * Set 'other' property to non-empty array\n"
  }
};


export default GetRandomStringOperationLocalization__English;
