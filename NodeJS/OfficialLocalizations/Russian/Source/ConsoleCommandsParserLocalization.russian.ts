import { ConsoleCommandsParser } from "@yamato-daiwa/es-extensions-nodejs";
import { isNotUndefined } from "@yamato-daiwa/es-extensions";
import { RawObjectDataProcessorLocalization__Russian } from "@yamato-daiwa/es-extensions-localization-russian";

import Localization = ConsoleCommandsParser.Localization;
import ErrorsMessages = Localization.ErrorsMessages;


const consoleCommandsParserLocalization__russian: Localization = {

  helpReference: {

    defaultCommand: "Команда по умолчанию",

    options: "Опции",

    shortcut: "Сокращение",

    type: "Тип",

    isRequired: "Обязательное",

    yes: "Да",

    no: "Нет",

    allowedAlternatives: "Возможные варианты выбора",

    numbersSet: {
      key: "Множество чисел",
      generateValue: RawObjectDataProcessorLocalization__Russian.numbersSet
    },

    minimalValue: "Минимальное значение",

    maximalValue: "Максимальное значение",

    objectTypeValuePropertiesSpecification: "Спецификация свойств"

  },

  generateCheckTheCommandReferenceAsking: (commandReference: string): string =>
      "Пожалуйста, проверьте справку данной команды:\n" +
        `${ commandReference }`,

  errorsMessages: {

    argumentsVectorIsNotArray: {
      generate: (
        { stringifiedActualValueOfArgumentsVector }: ErrorsMessages.ArgumentsVectorIsNotArray.TemplateParameters
      ): string =>
          "Ожидалось, что вектор аргументов будет массивом, однако это не так и он имеет значение:\n" +
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
          `Валидный вектор аргументов должен быть массивом как минимум ${ minimalElementsCountInArgumentsVector } элементов ` +
            `в то время как у него ${ actualElementsCountInArgumentsVector } элементов и значение:\n` +
            `${ stringifiedArgumentsVector }`
    },

    argumentsVectorHasNonStringElements: {
      generate: (
        { stringifiedFormattedNonStringArguments }: ErrorsMessages.ArgumentsVectorHasNonStringElements.TemplateParameters
      ): string =>
          "Валидный вектор аргументов должен быть массивом строк в то время как следующие элементы не являются строками:\n" +
            `${ stringifiedFormattedNonStringArguments }`
    },

    noDefaultCommandPhraseAvailable: {
      generate: ({ helpReference }: ErrorsMessages.NoDefaultCommandPhraseAvailable.TemplateParameters): string =>
          "Данное приложение не имеет команды по умолчанию. " +
          "Пожалуйста, укажите одну из следующих командных фраз:\n" +
            `${ helpReference }`
    },

    firstParameterLooksLikeCommandPhraseWhileNoCommandPhrasesAvailable: {
      generate: (
        {
          commandPhraseLikeArgument,
          helpReference
        }: ErrorsMessages.FirstParameterLooksLikeCommandPhraseWhileNoCommandPhrasesAvailable.TemplateParameters
    ): string =>
        `"${ commandPhraseLikeArgument }" выглядит как командная фраза, однако данное приложение имеет ` +
          "только команду по умолчанию:\n" +
          `${ helpReference }`
    },

    unknownCommandPhrase: {
      generate: (
        { inputtedCommandPhrase, helpReference }: ErrorsMessages.UnknownCommandPhrase.TemplateParameters
      ): string =>
          `Неизвестная командная фраза "${ inputtedCommandPhrase }" . ` +
          "Пожалуйста, введите одну из следующих командных фраз:\n" +
            `${ helpReference }`
    },

    requiredOptionKeyIsMissing: {
      generate: (
        {
          missingOptionKey,
          commandPhrase,
          commandHelpReference
        }: ErrorsMessages.RequiredOptionKeyIsMissing.TemplateParameters
      ): string =>
          `Опция "${ missingOptionKey }" является обязательной для` +
            `${ isNotUndefined(commandPhrase) ? `командной фразы "${ commandPhrase }"` : "команды по умолчанию" }. ` +
          `${ consoleCommandsParserLocalization__russian.generateCheckTheCommandReferenceAsking(commandHelpReference) }`
    },

    noValueFollowingTheKeyOfNonBooleanOption: {
      generate: (
        {
          targetOptionKey,
          commandHelpReference
        }: ErrorsMessages.NoValueFollowingTheKeyOfNonBooleanOption.TemplateParameters
      ): string =>
          `Не указано значение для небулевской опции "${ targetOptionKey }". ` +
          `${ consoleCommandsParserLocalization__russian.generateCheckTheCommandReferenceAsking(commandHelpReference) }`
    },

    invalidCommandOptionTypeAtSpecification: {
      generate: ({ optionName, typeName }: ErrorsMessages.InvalidCommandOptionTypeAtSpecification.TemplateParameters): string =>
          "Скорее всего, это баг со стороны консольного приложения. " +
          `В спецификации консольной команды указан невалидный тип ${ typeName } для опции ${ optionName }. ` +
          "Такое возможно только если приложение было написано на JavaScript, либо проверка типов компилятором TypeScript " +
            "была отключена или проигнорирована. " +
          "С Вашей стороны ошибки нет, но рекомендуется уведомить разработчиков приложения об этом прошествии."
    },

    unknownOptionsFoundForSpecificCommand: {
      generate: (
        {
          commandPhrase,
          formattedUnknownOptions,
          commandHelpReference
        }: ErrorsMessages.UnknownOptionsFoundForSpecificCommand.TemplateParameters
      ): string =>
          "Нижеследующие опции не существуют для " +
            `${ isNotUndefined(commandPhrase) ? `команды "${ commandPhrase }"` : "команды по умолчанию" }":\n` +
          `${ formattedUnknownOptions }т\n` +
          `${ consoleCommandsParserLocalization__russian.generateCheckTheCommandReferenceAsking(commandHelpReference) }`
    },

    optionValueIsNotAmongAllowedAlternatives: {
      generate: (
        {
          targetOptionKey,
          actualOptionValue,
          commandHelpReference
        }: ErrorsMessages.OptionValueIsNotAmongAllowedAlternatives.TemplateParameters
      ): string =>
          `Значение "${ actualOptionValue }" опции "${ targetOptionKey }" не является одним из возможных вариантов. ` +
          `${ consoleCommandsParserLocalization__russian.generateCheckTheCommandReferenceAsking(commandHelpReference) }`
    },

    unparsableNumericOptionValue: {
      generate: (
        {
          actualOptionValue,
          targetOptionKey,
          commandHelpReference
        }: ErrorsMessages.UnparsableNumericOptionValue.TemplateParameters
      ): string =>
          `Значение "${ actualOptionValue }" числовой опции "${ targetOptionKey }" не является валидным числовым значением. ` +
          `${ consoleCommandsParserLocalization__russian.generateCheckTheCommandReferenceAsking(commandHelpReference) }`
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
          `Значение "${ actualOptionValue }" числовой опции "${ targetOptionKey }" не принадлежит множеству чисел ` +
            `"${ RawObjectDataProcessorLocalization__Russian.numbersSet(expectedNumbersSet) }". ` +
          `${ consoleCommandsParserLocalization__russian.generateCheckTheCommandReferenceAsking(commandHelpReference) }`
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
          `Значение "${ actualOptionValue }" числовой опции "${ targetOptionKey }" меньше требуемого минимального ` +
            `значения "${ requiredMinimum }". ` +
          `${ consoleCommandsParserLocalization__russian.generateCheckTheCommandReferenceAsking(commandHelpReference) }`
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
         `Значение "${ actualOptionValue }" числовой опции "${ targetOptionKey }" превышает максимально допустимое ` +
            `"${ allowedMaximum }". ` +
          `${ consoleCommandsParserLocalization__russian.generateCheckTheCommandReferenceAsking(commandHelpReference) }`
    },

    malformedJSON5_Option: {
      generate: (
        {
          targetOptionKey,
          commandHelpReference
        }: ErrorsMessages.MalformedJSON5_Option.TemplateParameters
      ): string =>
          `Значение опции "${ targetOptionKey }" не является валидной JSON5-строкой. ` +
          `${ consoleCommandsParserLocalization__russian.generateCheckTheCommandReferenceAsking(commandHelpReference) }`
    },

    JSON5_OptionDoesNotMatchWithValidDataSchema: {
      generate: (
        {
          targetOptionKey,
          formattedValidationErrorsMessages
        }: ErrorsMessages.JSON5_OptionDoesNotMatchWithValidDataSchema.TemplateParameters
      ): string =>
          `Значение типа "JSON5" опции "${ targetOptionKey }" не соответствует заданным правилам:\n` +
          `${ formattedValidationErrorsMessages }`
    }

  }

};


export default consoleCommandsParserLocalization__russian;
