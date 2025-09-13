import type { RandomStringsGenerator } from "./getRandomString";


const gettingOfRandomStringLocalization__english: RandomStringsGenerator.Localization = {
  errors: {
    minimalCharactersCountMustBeGreaterThan0: (actualValue: number): string =>
      `The 'minimalCharactersCount' property must be greater than 0 while really it's ${ actualValue }`,
    sumOfCharactersCountOfAffixesAndMinimalRandomlyGeneratedCharactersCountIsExceedsMaximalCharactersCount: (
      namedParameters: RandomStringsGenerator.MaximalCharactersCountComputing.ParametersObject
    ): string =>
        "The sum of characters count of 'prefix', 'infix' and 'postfix' and also 'minimalRandomlyGeneratedCharactersCount' are " +
        "exceeds the 'maximalCharactersCount':\n" +
        `                          prefix.length: ${ namedParameters.prefix.length }\n` +
        `                           infix.length: ${ namedParameters.infix.length }\n` +
        `                         postfix.length: ${ namedParameters.postfix.length }\n` +
        `minimalRandomlyGeneratedCharactersCount: ${ namedParameters.minimalRandomlyGeneratedCharactersCount }\n` +
        `                               SUBTOTAL: ${
          namedParameters.prefix.length + 
          namedParameters.infix.length +
          namedParameters.postfix.length +
          namedParameters.minimalRandomlyGeneratedCharactersCount    
        }\n` +
        `                 maximalCharactersCount: ${ namedParameters.maximalCharactersCount }`,
    explicitlySpecifiedMinimalCharactersCountExceedsMaximalCharactersCount: (
      {
        minimalCharactersCount,
        maximalCharactersCount
      }: Readonly<{ minimalCharactersCount: number; maximalCharactersCount: number; }>
    ): string =>
        `The explicitly specified minimal characters count (${ minimalCharactersCount }) exceeds the maximal characters ` +
        `count ${ maximalCharactersCount }`,
    noAllowedCharactersForRandomGeneration: "No characters for the random string generation has been allowed allowed." +
      "Check the 'parametersObject.allowedCharacters' and satisfy at least on of below conditions:\n" +
      "  * Set 'latinUppercase' property to true\n" +
      "  * Set 'latinLowercase' property to true\n" +
      "  * Set 'digits' property to true\n" +
      "  * Set 'other' property to non-empty array\n"
  }
};


export default gettingOfRandomStringLocalization__english;
