import ConsoleCommandsParser from "./ConsoleCommandsParser";
import { RawObjectDataProcessorLocalization__English, isNotUndefined } from "@yamato-daiwa/es-extensions";


import Localization = ConsoleCommandsParser.Localization;
import ErrorsMessages = Localization.ErrorsMessages;


const consoleCommandsParserLocalization__english: Localization = {

  helpReference: {

    defaultCommand: "Default command",

    options: "Options",

    shortcut: "Shortcut",

    type: "Type",

    isRequired: "Is required",

    yes: "Yes",

    no: "No",

    allowedAlternatives: "Allowed alternatives",

    numbersSet: {
      key: "Numbers set",
      generateValue: RawObjectDataProcessorLocalization__English.numbersSet
    },

    minimalValue: "Minimal value",

    maximalValue: "Maximal value",

    objectTypeValuePropertiesSpecification: "Properties specification"

  },

  generateCheckTheCommandReferenceAsking: (commandReference: string): string =>
      `Please check the reference for this command:\n${ commandReference }`,

  errorsMessages: {

    argumentsVectorIsNotArray: {
      generate: (
        { stringifiedActualValueOfArgumentsVector }: ErrorsMessages.ArgumentsVectorIsNotArray.TemplateParameters
      ): string =>
          "Expected that the arguments vector be an array while actually it is not and actually has the value:\n" +
            `${ stringifiedActualValueOfArgumentsVector }`
    },

    argumentsVectorHasNotEnoughElements: {
      generate: (
        {
          minimalElementsCountInArgumentsVector,
          actualElementsCountInArgumentsVector,
          stringifiedArgumentsVector
        }: ErrorsMessages.RawArgumentsVectorHasNotEnoughElements.TemplateParameters
      ): string =>
          `The valid arguments vector must be an array of at least ${ minimalElementsCountInArgumentsVector } elements ` +
            `while actually is has ${ actualElementsCountInArgumentsVector } elements and value:\n` +
            `${ stringifiedArgumentsVector }`
    },

    argumentsVectorHasNonStringElements: {
      generate: (
        { stringifiedFormattedNonStringArguments }: ErrorsMessages.ArgumentsVectorHasNonStringElements.TemplateParameters
      ): string =>
          "The valid arguments vector must be an array of the strings while below arguments are not strings:\n" +
            `${ stringifiedFormattedNonStringArguments }`
    },

    noDefaultCommandPhraseAvailable: {
      generate: (templateParameters: ErrorsMessages.NoDefaultCommandPhraseAvailable.TemplateParameters): string =>
          "This application has no the default command. " +
          "Please specify explicitly one of mentioned below command phrases.\n" +
          `${ templateParameters.helpReference }`
    },

    firstParameterLooksLikeCommandPhraseWhileNoCommandPhrasesAvailable: {
      generate: (
        {
          commandPhraseLikeArgument,
          helpReference
        }: ErrorsMessages.FirstParameterLooksLikeCommandPhraseWhileNoCommandPhrasesAvailable.TemplateParameters
    ): string =>
        `"${ commandPhraseLikeArgument }" seems like the command phrase while there is only the default command available ` +
          "for this application:\n" +
          `${ helpReference }`
    },

    unknownCommandPhrase: {
      generate: (
        { inputtedCommandPhrase, helpReference }: ErrorsMessages.UnknownCommandPhrase.TemplateParameters
      ): string =>
          `The command phrase "${ inputtedCommandPhrase }" is unknown. ` +
          "Please input one of below available command phrases:" +
            `\n${ helpReference }`
    },

    requiredOptionKeyIsMissing: {
      generate: (
        {
          missingOptionKey,
          commandPhrase,
          commandHelpReference
        }: ErrorsMessages.RequiredOptionKeyIsMissing.TemplateParameters
      ): string =>
          `The option "${ missingOptionKey }" is required for the ` +
            `${ isNotUndefined(commandPhrase) ? `command "${ commandPhrase }"` : "default command" }. ` +
            `${ consoleCommandsParserLocalization__english.generateCheckTheCommandReferenceAsking(commandHelpReference) }`
    },

    noValueFollowingTheKeyOfNonBooleanOption: {
      generate: (
        {
          targetOptionKey,
          commandHelpReference
        }: ErrorsMessages.NoValueFollowingTheKeyOfNonBooleanOption.TemplateParameters
      ): string =>
          `No value following the key "${ targetOptionKey }" of non-boolean option has been specified. ` +
          `${ consoleCommandsParserLocalization__english.generateCheckTheCommandReferenceAsking(commandHelpReference) }`
    },

    invalidCommandOptionTypeAtSpecification: {
      generate: ({ optionName, typeName }: ErrorsMessages.InvalidCommandOptionTypeAtSpecification.TemplateParameters): string =>
          "Most likely, it is the bug from the side of the console application. " +
          `The type "${ typeName }" specified for the option "${ optionName }" in the console command specification ` +
            " is invalid. " +
          "It is possible only when the console application has been written by JavaScript or the TypeScript type checking " +
            "has been disabled. " +
          "There is nothing you must to correct; however it is recommended to report about this issue to the developers " +
            "of this application."
    },

    unknownOptionsFoundForSpecificCommand: {
      generate: (
        {
          commandPhrase,
          formattedUnknownOptions,
          commandHelpReference
        }: ErrorsMessages.UnknownOptionsFoundForSpecificCommand.TemplateParameters
      ): string =>
          "Below options are unknown for the " +
            `${ isNotUndefined(commandPhrase) ? `command "${ commandPhrase }"` : "default command" }:\n` +
          `${ formattedUnknownOptions }\n` +
          `${ consoleCommandsParserLocalization__english.generateCheckTheCommandReferenceAsking(commandHelpReference) }`
    },

    optionValueIsNotAmongAllowedAlternatives: {
      generate: (
        {
          targetOptionKey,
          actualOptionValue,
          commandHelpReference
        }: ErrorsMessages.OptionValueIsNotAmongAllowedAlternatives.TemplateParameters
      ): string =>
          `The value "${ actualOptionValue }" of the option "${ targetOptionKey }" is not among allowed alternatives. ` +
          `${ consoleCommandsParserLocalization__english.generateCheckTheCommandReferenceAsking(commandHelpReference) }`
    },

    unparsableNumericOptionValue: {
      generate: (
        {
          actualOptionValue,
          targetOptionKey,
          commandHelpReference
        }: ErrorsMessages.UnparsableNumericOptionValue.TemplateParameters
      ): string =>
          `The value "${ actualOptionValue }" of the numeric option "${ targetOptionKey }" is not the valid numeric value.\n` +
          `${ consoleCommandsParserLocalization__english.generateCheckTheCommandReferenceAsking(commandHelpReference) }`
    },

    numericOptionValueIsNotBelongToExpectedNumbersSet: {
      generate: (
        {
          targetOptionKey,
          expectedNumbersSet,
          actualOptionValue,
          commandHelpReference
        }: ErrorsMessages.NumericOptionValueIsNotBelongToExpectedNumbersSet.TemplateParameters
      ): string =>
          `The value "${ actualOptionValue }" of the numeric option "${ targetOptionKey }" is not belong to ` +
            `"${ RawObjectDataProcessorLocalization__English.numbersSet(expectedNumbersSet) }" numbers set.\n` +
          `${ consoleCommandsParserLocalization__english.generateCheckTheCommandReferenceAsking(commandHelpReference) }`
    },

    numericValueIsSmallerThanRequiredMinimum: {
      generate: (
        {
          targetOptionKey,
          requiredMinimum,
          actualOptionValue,
          commandHelpReference
        }: ErrorsMessages.NumericValueIsSmallerThanRequiredMinimum.TemplateParameters
      ): string =>
          `The value "${ actualOptionValue }" of the numeric option "${ targetOptionKey }" is smaller than required ` +
            `minimal value ${ requiredMinimum }.\n` +
          `${ consoleCommandsParserLocalization__english.generateCheckTheCommandReferenceAsking(commandHelpReference) }`
    },

    numericValueIsGreaterThanAllowedMaximum: {
      generate: (
        {
          targetOptionKey,
          allowedMaximum,
          actualOptionValue,
          commandHelpReference
        }: ErrorsMessages.NumericValueIsGreaterThanAllowedMaximum.TemplateParameters
      ): string =>
         `The value "${ actualOptionValue }" of the numeric option "${ targetOptionKey }" is greater that allowed ` +
            `maximal value ${ allowedMaximum }.\n` +
          `${ consoleCommandsParserLocalization__english.generateCheckTheCommandReferenceAsking(commandHelpReference) }`
    },

    malformedJSON5_Option: {
      generate: (
        {
          targetOptionKey,
          commandHelpReference
        }: ErrorsMessages.MalformedJSON5_Option.TemplateParameters
      ): string =>
          `The value of the option "${ targetOptionKey }" is not valid JSON5 string. ` +
          `${ consoleCommandsParserLocalization__english.generateCheckTheCommandReferenceAsking(commandHelpReference) }`
    },

    JSON5_OptionDoesNotMatchWithValidDataSchema: {
      generate: (
        {
          targetOptionKey,
          formattedValidationErrorsMessages
        }: ErrorsMessages.JSON5_OptionDoesNotMatchWithValidDataSchema.TemplateParameters
      ): string =>
          `The JSON5-type value of the option "${ targetOptionKey }" does not match with valid data schema:\n` +
          `${ formattedValidationErrorsMessages }`
    }

  }

};


export default consoleCommandsParserLocalization__english;
