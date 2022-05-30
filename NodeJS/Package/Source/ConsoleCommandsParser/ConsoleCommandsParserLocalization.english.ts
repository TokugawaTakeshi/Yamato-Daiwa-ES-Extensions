import ConsoleCommandsParser from "./ConsoleCommandsParser";
import type { RawObjectDataProcessor } from "@yamato-daiwa/es-extensions";
import {
  RawObjectDataProcessorLocalization__English,
  isNotUndefined,
  stringifyAndFormatArbitraryValue
} from "@yamato-daiwa/es-extensions";

import Localization = ConsoleCommandsParser.Localization;


const ConsoleCommandsParserLocalization__English: ConsoleCommandsParser.Localization = {

  generateArgumentsVectorIsNotArrayErrorMessage: (argumentsVector: unknown): string =>
      "Expected that the arguments vector will be an array while actually it did not pass 'Array.isArray()' check and" +
      `has the value:\n${ stringifyAndFormatArbitraryValue(argumentsVector) }`,

  generateArgumentsVectorHasNotEnoughElementsErrorMessage: ({
   minimalElementsCount, arrayedConsoleCommand
  }: Localization.RawArgumentsVectorHasNotEnoughElementsErrorMessageParameters): string =>
      `The valid arguments vector must be an array of at least ${ minimalElementsCount } elements while actually is has ` +
      `${ arrayedConsoleCommand.length } elements and value:\n${ stringifyAndFormatArbitraryValue(arrayedConsoleCommand) }`,

  generateArgumentsVectorHasNonStringElementsErrorMessage: (nonStringElements: Array<unknown>): string =>
      "The valid arguments vector must be an array of the strings while below arguments are not strings:\n" +
      `${ stringifyAndFormatArbitraryValue(nonStringElements) }`,

  generateNoDefaultCommandPhraseAvailableErrorMessage: (helpReference: string): string =>
      "This application has not the default command. Please specify explicitly one of mentioned below command phrases:\n" +
      `${ helpReference }`,

  generateFirstParameterLooksLikeCommandPhraseWhileNoCommandPhrasesAvailableErrorMessage: ({
    commandPhraseLikeArgument, helpReference
  }: Localization.FirstParameterLooksLikeCommandPhraseWhileNoCommandPhrasesAvailableErrorMessageParameters): string =>
      `'${ commandPhraseLikeArgument }' seems like the command phrase while no command phrases available for this ` +
      `application:\n${ helpReference }`,

  generateUnknownCommandPhraseErrorMessage: (
    { inputtedCommandPhrase, helpReference }: Localization.UnknownCommandPhraseErrorMessageParameters
  ): string => `The command phrase '${ inputtedCommandPhrase }' is unknown. ` +
      `Please input one of below available command phrases:\n${ helpReference }`,

  generateUnknownOptionsFoundForSpecificCommandErrorMessage: (
    { commandPhrase, commandReference }: Localization.UnknownOptionsFoundForSpecificCommandErrorMessageParameters
  ): string => "Below options are unknown for the " +
      `"${ isNotUndefined(commandPhrase) ? `command "${ commandPhrase }"` : "default command" }".` +
      `Please check the  reference for this command:\n${ commandReference }`,

  generateInvalidOptionTypeErrorMessage: ({ optionName }: { optionName: string; }): string =>
      `Invalid type has been specified for the option '${ optionName }'.`,

  generateRequiredOptionKeyIsMissingErrorMessage: (
    {
      missingOptionKey,
      commandPhrase,
      commandHelpReference
    }: Localization.RequiredOptionKeyIsMissingErrorMessageParameters
  ): string =>
      `The option '${ missingOptionKey }' is required for the ` +
      `${ isNotUndefined(commandPhrase) ? `command '${ commandPhrase }'` : "default command" }.` +
      `Please check the reference for this command:\n${ commandHelpReference }`,

  generateNoValueFollowingTheKeyOfNonBooleanOptionErrorMessage: (
    {
      targetOptionKey,
      commandHelpReference
    }: Localization.NoValueFollowingTheKeyOfNonBooleanOptionErrorMessageParameters
  ): string =>
      `No value following the key '${ targetOptionKey }' of non-boolean option has been specified.` +
      `Please check the reference for this command:\n${ commandHelpReference }`,

  generateOptionValueIsNotAmongAllowedAlternativesErrorMessage: (
    {
      targetOptionKey,
      actualOptionValue,
      commandReference
    }: Localization.OptionValueIsNotAmongAllowedAlternativesErrorMessageParameters
  ): string =>
      `The value '${ actualOptionValue }' of the option '${ targetOptionKey }' is not among allowed alternatives. ` +
      `Please check the reference for this command:\n${ commandReference }`,

  generateUnparsableNumericOptionValueErrorMessage: (
    {
      actualOptionValue,
      targetOptionKey,
      commandReference
    }: Localization.UnparsableNumericOptionValueErrorMessageErrorMessageParameters
  ): string =>
      `The value '${ actualOptionValue }' of the option '${ targetOptionKey }' is not valid numeric value.` +
      `Please check the reference for this command:\n${ commandReference }`,

  generateReadableNumbersSet(numberSet: RawObjectDataProcessor.NumbersSets): string {
    return RawObjectDataProcessorLocalization__English.numbersSet(numberSet);
  },

  generatedNumericOptionValueIsNotBelongToExpectedNumbersSetErrorMessage(
    {
      targetOptionKey,
      expectedNumbersSet,
      actualOptionValue,
      commandReference
    }: Localization.NumericOptionValueIsNotBelongToExpectedNumbersSetErrorMessageParameters
  ): string {
    return `The value '${ actualOptionValue }' of the option '${ targetOptionKey }' is not is in not member of ` +
        `'${ this.generateReadableNumbersSet(expectedNumbersSet) }' set as required. ` +
        `Please check the reference for target command:\n${ commandReference }`;
  },

  generateNumericValueIsSmallerThanRequiredMinimumErrorMessage(
    {
      targetOptionKey,
      requiredMinimum,
      actualOptionValue,
      commandReference
    }: Localization.NumericValueIsSmallerThanRequiredMinimumErrorMessageParameters
  ): string {
    return `The value '${ actualOptionValue }' of the option '${ targetOptionKey }' is less than required minimal value ` +
        `${ requiredMinimum } set as required.\n Please check the reference for this target command:\n${ commandReference }`;
  },

  generateNumericValueIsGreaterThanAllowedMaximumErrorMessage(
    {
      targetOptionKey,
      allowedMaximum,
      actualOptionValue,
      commandReference
    }: Localization.NumericValueIsGreaterThanAllowedMaximumErrorMessageParameters
  ): string {
    return `The value '${ actualOptionValue }' of the option '${ targetOptionKey }' is greater that allowed maximal value ` +
        `${ allowedMaximum }. \n Please check the reference for target command:\n${ commandReference }`;
  },

  generateMalformedJSON5_OptionErrorMessage: (
    {
      targetOptionKey,
      commandReference
    }: Localization.MalformedJSON5_OptionErrorMessageParameters
  ): string =>
      `The value of the option '${ targetOptionKey }' is not valid JSON5.` +
      `Please check the reference for this command:\n${ commandReference }`,

  generateJSON5_OptionDoesNotMatchWithValidDataSchemaErrorMessage: (
    {
      targetOptionKey,
      formattedValidationErrorsMessages
    }: Localization.JSON5_OptionDoesNotMatchWithValidDataSchemaErrorMessageParameters
  ): string =>
      `The JSON5-type value of the option '${ targetOptionKey }' does not match with valid data schema:\n` +
      `${ formattedValidationErrorsMessages }`
};


export default ConsoleCommandsParserLocalization__English;
