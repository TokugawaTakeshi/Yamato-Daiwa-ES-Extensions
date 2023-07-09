import { ConsoleCommandsParser } from "@yamato-daiwa/es-extensions-nodejs";
import { isNotUndefined } from "@yamato-daiwa/es-extensions";
import { RawObjectDataProcessorLocalization__Japanese } from "@yamato-daiwa/es-extensions-localization-japanese";

import Localization = ConsoleCommandsParser.Localization;
import ErrorsMessages = Localization.ErrorsMessages;


const consoleCommandsParserLocalization__japanese: Localization = {

  helpReference: {

    defaultCommandPhrase__parenthetical: "（規定コマンド）",

    options: "オプションら",

    shortcut: "ショートカット",

    type: "型",

    isRequired: "必須",

    yes: "はい",

    no: "いいえ",

    allowedAlternatives: "可能な選択肢",

    numbersSet: {
      key: "数集合",
      generateValue: RawObjectDataProcessorLocalization__Japanese.numbersSet
    },

    minimalValue: "最小限",

    maximalValue: "最大限",

    objectTypeValuePropertiesSpecification: "プロパティら仕様"

  },

  generateCheckTheCommandReferenceAsking: (commandReference: string): string =>
      `このコマンドの参考を確認してください。\n${ commandReference }`,

  errorsMessages: {

    argumentsVectorIsNotArray: {
      generate: (
        { stringifiedActualValueOfArgumentsVector }: ErrorsMessages.ArgumentsVectorIsNotArray.TemplateVariables
      ): string =>
          "アーギュメント・ベクトルは配列型になると期待されたが、事実上配列にはなっていなく、値は次の通り。\n" +
            `${ stringifiedActualValueOfArgumentsVector }`
    },

    argumentsVectorHasNotEnoughElements: {
      generate: (
        {
          minimalElementsCountInArgumentsVector,
          actualElementsCountInArgumentsVector,
          stringifiedArgumentsVector
        }: ErrorsMessages.RawArgumentsVectorHasNotEnoughElements.TemplateVariables
      ): string =>
          `妥当なアーギュメント・ベクトルは最低${ minimalElementsCountInArgumentsVector }要素の配列でなければいけないが、` +
            `事実上${ actualElementsCountInArgumentsVector }要素を持ち、値は下記の通り。\n${ stringifiedArgumentsVector }`
    },

    argumentsVectorHasNonStringElements: {
      generate: (
        { stringifiedFormattedNonStringArguments }: ErrorsMessages.ArgumentsVectorHasNonStringElements.TemplateVariables
      ): string =>
          "アーギュメントのベクトルは文字列の配列ではなければいけないが、下記の要素は文字列になっていない。\n" +
            `${ stringifiedFormattedNonStringArguments }`
    },

    moreThanOneCommandPhrasesMarkedAsDefault: {
      generate: (
        { formattedListOfCommandsPhrasesMarkedAsDefault }: ErrorsMessages.MoreThanOneCommandPhrasesMarkedAsDefault.
            TemplateVariables
      ): string =>
          "２以上のコマンドフレーズは規定として指示された。" +
          "貴方は当コンソールアプリケーションの開発者の場合、フラグ「default」下記のコマンドのどちらか一つに残しておいて下さい。\n" +
            `${ formattedListOfCommandsPhrasesMarkedAsDefault }\n` +
          "貴方は当コンソールアプリケーションの利用者の場合、開発側にこの問題について通報をご検討下さい。"
    },

    noDefaultCommandPhraseAvailable: {
      generate: (templateVariables: ErrorsMessages.NoDefaultCommandPhraseAvailable.TemplateVariables): string =>
          "このアプリケーションは規定のコマンドはない。" +
          "下記のコマンドフレーズをの中からいずれかのコマンドを明示的にしてして下さい。\n" +
          `${ templateVariables.helpReference }`
    },

    firstParameterLooksLikeCommandPhraseWhileNoCommandPhrasesAvailable: {
      generate: (
        {
          commandPhraseLikeArgument,
          helpReference
        }: ErrorsMessages.FirstParameterLooksLikeCommandPhraseWhileNoCommandPhrasesAvailable.TemplateVariables
    ): string =>
        `「${ commandPhraseLikeArgument }」はコマンドをフレーズそうに見えるが、当アプリケーションは規定コマンドのみ提供。\n` +
        `${ helpReference }`
    },

    unknownCommandPhrase: {
      generate: (
        { inputtedCommandPhrase, helpReference }: ErrorsMessages.UnknownCommandPhrase.TemplateVariables
      ): string =>
          `コマンドフレーズ「${ inputtedCommandPhrase }」は不明です。` +
          "下記のコマンドフレーズの中からいずれかのを入力してください。\n" +
          `${ helpReference }`
    },

    requiredOptionKeyIsMissing: {
      generate: (
        {
          missingOptionKey,
          commandPhrase,
          commandHelpReference
        }: ErrorsMessages.RequiredOptionKeyIsMissing.TemplateVariables
      ): string =>
          `${ isNotUndefined(commandPhrase) ? `コマンドフレーズ「${ commandPhrase }」` : "規定コマンド" }` +
            `にとってオプション「${ missingOptionKey }」は必須のなっています。` +
          `${ consoleCommandsParserLocalization__japanese.generateCheckTheCommandReferenceAsking(commandHelpReference) }`
    },

    noValueFollowingTheKeyOfNonBooleanOption: {
      generate: (
        {
          targetOptionKey,
          commandHelpReference
        }: ErrorsMessages.NoValueFollowingTheKeyOfNonBooleanOption.TemplateVariables
      ): string =>
          `非ブールのオプション「${ targetOptionKey }」に該当している値が指定されませんでした。` +
          `${ consoleCommandsParserLocalization__japanese.generateCheckTheCommandReferenceAsking(commandHelpReference) }`
    },

    invalidCommandOptionTypeAtSpecification: {
      generate: ({ optionName, typeName }: ErrorsMessages.InvalidCommandOptionTypeAtSpecification.TemplateVariables): string =>
          "コンソールアプリケーション側のバグの可能性が高いです。" +
          `コンソールコマンドの仕様において、オプション「${ optionName }」に「${ typeName }」という不正型が指定してあります。` +
          "コンソールアプリケーションがJavaScriptで書かれた為この間違いに気付かなかったか、TypeScriptの型確認が無効に設定された。" +
          "貴方の方は何れかの修正が不要だが、このバグについて開発側に通報の推薦です。"
    },

    unknownOptionsFoundForSpecificCommand: {
      generate: (
        {
          commandPhrase,
          formattedUnknownOptions,
          commandHelpReference
        }: ErrorsMessages.UnknownOptionsFoundForSpecificCommand.TemplateVariables
      ): string => "下記のオプションは" +
          `${ isNotUndefined(commandPhrase) ? `コマンド「${ commandPhrase }」` : "規定コマンド" }にとって不明なのだ。\n` +
          `${ formattedUnknownOptions }\n` +
          `${ consoleCommandsParserLocalization__japanese.generateCheckTheCommandReferenceAsking(commandHelpReference) }`
    },

    optionValueIsNotAmongAllowedAlternatives: {
      generate: (
        {
          targetOptionKey,
          actualOptionValue,
          commandHelpReference
        }: ErrorsMessages.OptionValueIsNotAmongAllowedAlternatives.TemplateVariables
      ): string =>
          `オプション「${ targetOptionKey }」の値は「${ actualOptionValue }」は可能な選択肢に所属していない。\n` +
          `${ consoleCommandsParserLocalization__japanese.generateCheckTheCommandReferenceAsking(commandHelpReference) }`
    },

    unparsableNumericOptionValue: {
      generate: (
        {
          actualOptionValue,
          targetOptionKey,
          commandHelpReference
        }: ErrorsMessages.UnparsableNumericOptionValue.TemplateVariables
      ): string =>
          `数型の「${ targetOptionKey }」オプションの「${ actualOptionValue }」値は妥当な数にはなっていない。\n` +
          `${ consoleCommandsParserLocalization__japanese.generateCheckTheCommandReferenceAsking(commandHelpReference) }`
    },

    numericOptionValueIsNotBelongToExpectedNumbersSet: {
      generate: (
        {
          targetOptionKey,
          expectedNumbersSet,
          actualOptionValue,
          commandHelpReference
        }: ErrorsMessages.NumericOptionValueIsNotBelongToExpectedNumbersSet.TemplateVariables
      ): string =>
          `数型の「${ targetOptionKey }」オプションの「${ actualOptionValue }」値は数集合` +
            `「${ RawObjectDataProcessorLocalization__Japanese.numbersSet(expectedNumbersSet) }」に所属していない。\n` +
          `${ consoleCommandsParserLocalization__japanese.generateCheckTheCommandReferenceAsking(commandHelpReference) }`
    },

    numericValueIsSmallerThanRequiredMinimum: {
      generate: (
        {
          targetOptionKey,
          requiredMinimum,
          actualOptionValue,
          commandHelpReference
        }: ErrorsMessages.NumericValueIsSmallerThanRequiredMinimum.TemplateVariables
      ): string =>
          `数字型の「${ targetOptionKey }」オプションの値「${ actualOptionValue }」は必要な最小限「${ requiredMinimum }」より小さくなっている。\n` +
          `${ consoleCommandsParserLocalization__japanese.generateCheckTheCommandReferenceAsking(commandHelpReference) }`
    },

    numericValueIsGreaterThanAllowedMaximum: {
      generate: (
        {
          targetOptionKey,
          allowedMaximum,
          actualOptionValue,
          commandHelpReference
        }: ErrorsMessages.NumericValueIsGreaterThanAllowedMaximum.TemplateVariables
      ): string =>
          `数字型の「${ targetOptionKey }」オプションの値「${ actualOptionValue }」は許可されている最大限「${ allowedMaximum }」を超えている。\n` +
          `${ consoleCommandsParserLocalization__japanese.generateCheckTheCommandReferenceAsking(commandHelpReference) }`
    },

    malformedJSON5_Option: {
      generate: (
        {
          targetOptionKey,
          commandHelpReference
        }: ErrorsMessages.MalformedJSON5_Option.TemplateVariables
      ): string =>
          `オプションの「${ targetOptionKey }"」の値は妥当なJSON5形式の文字列になっていない。` +
          `${ consoleCommandsParserLocalization__japanese.generateCheckTheCommandReferenceAsking(commandHelpReference) }`
    },

    JSON5_OptionDoesNotMatchWithValidDataSchema: {
      generate: (
        {
          targetOptionKey,
          formattedValidationErrorsMessages
        }: ErrorsMessages.JSON5_OptionDoesNotMatchWithValidDataSchema.TemplateVariables
      ): string =>
          `JSON5形式のオプション「${ targetOptionKey }」は不備があります。\n` +
          `${ formattedValidationErrorsMessages }`
    }

  }

};


export default consoleCommandsParserLocalization__japanese;
