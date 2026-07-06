import {
  RawObjectDataProcessor,
  stringifyAndFormatArbitraryValue,
  isUndefined,
  isNotUndefined,
  isNull,
  isNotNull
} from "@yamato-daiwa/es-extensions";

import Localization = RawObjectDataProcessor.Localization;
import ValidationErrors = Localization.ValidationErrors;
import ThrowableErrors = Localization.ThrowableErrors;
import Warnings = Localization.Warnings;


export const rawObjectDataProcessorLocalization__japanese: Localization = {

  generateSeeMoreSentence: ({ documentationPageAnchor }: Localization.SeeDocumentationSentence.TemplateVariables): string =>
      "詳しくは " +
        "https://ee.yamato-daiwa.com/CoreLibrary/Functionality/RawObjectDataProcessor/Children/06-ValidationIssues/" +
        `RawObjectDataProcessor-ValidationIssues.japanese.html#${ documentationPageAnchor } 参照`,

  generateValidationErrorMessage(
    {
      title,
      targetPropertyDotSeparatedQualifiedInitialName,
      targetPropertyNewName,
      description,
      targetPropertyValueSpecification,
      targetPropertyValue,
      targetPropertyStringifiedValueBeforeFirstPreValidationModification,
      documentationPageAnchor
    }: Localization.DataForMessagesBuilding
  ): string {
    return [
      `${ title } [ ${ documentationPageAnchor } ]`,
      `\n\n● プロパティ・要素： ${ targetPropertyDotSeparatedQualifiedInitialName ?? "(ルート)" }`,
      ...isNotNull(targetPropertyNewName) ? [ ` (新名：${ targetPropertyNewName })` ] : [],
      `\n${ description }`,
      `\n${ this.generateSeeMoreSentence({ documentationPageAnchor }) }`,
      "\n\n●　プロパティ・要素仕様： ",
      `\n${
        stringifyAndFormatArbitraryValue({
          ...targetPropertyValueSpecification,
          type: this.getLocalizedValueType(RawObjectDataProcessor.normalizeDataType(targetPropertyValueSpecification))
        })
      }`,
      `\n● 実際値: ${ stringifyAndFormatArbitraryValue(targetPropertyValue) }`,
      ...isNotUndefined(targetPropertyStringifiedValueBeforeFirstPreValidationModification) ? [
        "\n●　妥当性確認前の処理以前の初期値: " +
          targetPropertyStringifiedValueBeforeFirstPreValidationModification
      ] : []
    ].join("");
  },

  generateLanguageDependentErrorNumberHeadingPart: ({ messageNumber }: Readonly<{ messageNumber: number; }>): string =>
    `第${ messageNumber }エラー`,


  /* ━━━ バリデーションエラー ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  /* 【 校閲者向け 】
   * 殆どの下記のメッセージは上記の「generateValidationErrorMessage」原形の一部になっているので、「このプロパティ」や「この文字列」の様に書かれても、
   * 　　上記の原形の一部としては曖昧になっていません。 */

  validationErrors: {

    rawDataIsNotObject: {
      generateMessage:
          ({ actualNativeType, documentationPageAnchor }: ValidationErrors.RawDataIsNotObject.TemplateVariables): string =>
              `「RawObjectDataProcessor.process()」の１引数目として渡されたデータがオブジェクトではなく「${ actualNativeType }」である。\n` +
              rawObjectDataProcessorLocalization__japanese.generateSeeMoreSentence({ documentationPageAnchor })
    },

    rawDataIsNull: {
      generateMessage:
          ({ documentationPageAnchor }: ValidationErrors.RawDataIsNull.TemplateVariables): string =>
              "「RawObjectDataProcessor.process()」の１引数目として渡されたデータがnullになっているか、非nullオブジェクトが期待。\n" +
              rawObjectDataProcessorLocalization__japanese.generateSeeMoreSentence({ documentationPageAnchor })
    },

    valueTypeDoesNotMatchWithExpected: {
      title: "期待型・実際型の不一致",
      generateDescription: (
        { expectedTypeID, actualNativeType }: ValidationErrors.ValueTypeDoesNotMatchWithExpected.TemplateVariables
      ): string =>
        `この値には「${ rawObjectDataProcessorLocalization__japanese.getLocalizedValueType(expectedTypeID) }」型が期待されたが、` +
          `実際には「${ actualNativeType }」型。`
    },

    preValidationModificationFailed: {
      title: "バリデーション前の変換中エラー発生",
      generateDescription: (
        { stringifiedCaughtError }: ValidationErrors.PreValidationModificationFailed.TemplateVariables
      ): string =>
        "このプロパティ・要素のバリデーション前の変換中に以下のエラーが発生。\n" +
          stringifiedCaughtError
    },


    /* ┅┅┅ 固定構成のオブジェクト ┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅ */
    /* ╍╍╍ undefined可否 ╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍ */
    forbiddenUndefinedValue: {
      title: "禁止したundefined値",
      description: "このプロパティ・要素は未定義か明示的に「undefined」で指定されたが、これは明示的に禁じられた。"
    },

    conditionallyForbiddenUndefinedValue: {
      title: "条件付きで禁止したundefined値",
      generateDescription: (
        {
          verbalConditionWhenUndefinedIsForbiddenWithoutEndOfSentenceMark
        }: ValidationErrors.ConditionallyForbiddenUndefinedValue.TemplateVariables
      ): string =>
        "このプロパティ・要素は未定義か明示的に「undefined」で指定されたが、" +
          `これが${ verbalConditionWhenUndefinedIsForbiddenWithoutEndOfSentenceMark }の場合には禁じられ、` +
          "この条件が満たされている。"
    },

    conditionallyForbiddenNonUndefinedValue: {
      title: "条件付きで禁止した非undefined値",
      generateDescription: (
        {
          verbalConditionWhenMustBeUndefinedWithoutEndOfSentenceMark
        }: ValidationErrors.ConditionallyForbiddenNonUndefinedValue.TemplateVariables
      ): string =>
        "このプロパティ・要素は「undefined」になっていないが、" +
          `${ verbalConditionWhenMustBeUndefinedWithoutEndOfSentenceMark }の時「undefined」でなければいけなく、この条件が満たされている。`
    },


    /* ╍╍╍ null可否 ╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍ */
    forbiddenNullValue: {
      title: "禁止したnull値",
      description: "このプロパティ・要素は「null」で指定されたが、これは明示的に禁じられた。"
    },

    conditionallyForbiddenNullValue: {
      title: "条件付きnull禁止",
      generateDescription: (
        {
          verbalConditionWhenNullIsForbiddenWithoutEndOfSentenceMark
        }: ValidationErrors.ConditionallyForbiddenNullValue.TemplateVariables
      ): string =>
        `このプロパティ・要素は「null」で指定されたが、これが${ verbalConditionWhenNullIsForbiddenWithoutEndOfSentenceMark }の場合には` +
          "禁じられ、この条件が満たされている。"
    },

    conditionallyForbiddenNonNullValue: {
      title: "条件付き非null禁止",
      generateDescription: (
        {
          verbalConditionWhenMustBeNullWithoutEndOfSentenceMark
        }: ValidationErrors.ConditionallyForbiddenNonNullValue.TemplateVariables
      ): string =>
        "このプロパティ・要素は「null」になっていないが、" +
          `${ verbalConditionWhenMustBeNullWithoutEndOfSentenceMark }の時「null」でなければいけなく、この条件が満たされている。`
    },


    /* ╍╍╍ その他 ╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍ */
    unableToDeletePropertyWithOutdatedKey: {
      title: "旧プロパティ削除不可能",
      generateDescription: (
        { propertyNewKey }: ValidationErrors.UnableToDeletePropertyWithOutdatedKey.TemplateVariables
      ): string =>
          `このプロパティのコピーの「${ propertyNewKey }」が作成されたが、当プロパティーが\`configurable: false\`になっているので、削除不可能だった。` +
          "削除の試しがあった理由は、戦略として既存のオブジェクトの変更が選択され、`mustLeaveEvenRenamed`オプションが`true`で指定されなかった事。"
      },

    unableToChangePropertyDescriptors: {
      title: "プロパティ記述子変更不可能",
      description:
        "このプロパティは`configurable: false`になり、戦略も既存のオブジェクトの変化なので、記述子の変更は不可能。"
    },

    unableToUpdatePropertyValue: {
      title: "プロパティー値変更不可能",
      description: "このプロパティーの変更が規定値の代入か、前バリデーションの変換により要求されたが、読み込み専用のプロパティーになっているので上書き不可能。"
    },

    unexpectedProperties: {
      title: "想定外のプロパティ",
      generateDescription: (
        { unexpectedProperties }: ValidationErrors.UnexpectedProperties.TemplateVariables
      ): string =>
        "以下のプロパティは想定されていない。\n" +
        unexpectedProperties.map((propertyKey: string): string => `● ${ propertyKey }`).join("\n")
    },

    customValidationFailed: {
      title: "カスタムなバリデーション不合格",
      generateDescription:
          ({ customValidationDescription }: ValidationErrors.CustomValidationFailed.TemplateVariables): string =>
              `この値は「${ customValidationDescription }」というカスタムなバリデーションに合格しなかった。`
    },

    /* ┅┅┅ 連想配列 ┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅ */
    associativeArrayEntriesCountIsLessThanRequiredMinimum: {
      title: "連想配列、組数不足",
      generateDescription: (
        {
          actualEntriesCount,
          minimalEntriesCount
        }: ValidationErrors.AssociativeArrayEntriesCountIsLessThanRequiredMinimum.TemplateVariables
      ): string =>
          `この連想配列型の値は${ actualEntriesCount }組みを持っているが、少なくとも${ minimalEntriesCount }期待。`
    },

    associativeArrayPairsCountIsMoreThanAllowedMaximum: {
      title: "連想配列、組数過度",
      generateDescription: (
        {
          maximalEntriesCount,
          actualEntriesCount
        }: ValidationErrors.AssociativeArrayPairsCountIsMoreThanAllowedMaximum.TemplateVariables
      ): string =>
          `この連想配列型の値は${ actualEntriesCount }組みを持っているが、最大${ maximalEntriesCount }期待。`
    },

    associativeArrayPairsCountDoesNotMatchWithSpecifiedExactNumber: {
      title: "連想配列、組の期待数・実際数の不一致",
      generateDescription: (
        {
          exactEntriesCount,
          actualEntriesCount
        }: ValidationErrors.AssociativeArrayPairsCountDoesNotMatchWithSpecifiedExactNumber.TemplateVariables
      ): string =>
          `この連想配列型の値は${ actualEntriesCount }組みを持っているが、丁度${ exactEntriesCount }期待。`
    },

    forbiddenForSpecificKeysUndefinedOrNullValuesFoundInAssociativeArrayTypeObject: {
      title: "連想配列の特定キーに対して禁じたundefined・null値",
      generateDescription: (
        { keysOfEitherUndefinedOrNullValues }:
            ValidationErrors.ForbiddenForSpecificKeysUndefinedOrNullValuesFoundInAssociativeArrayTypeObject.TemplateVariables
      ): string =>
        "連想配列の下記のキーはnullかundefinedになっているが、このような値は禁じられた。\n" +
        keysOfEitherUndefinedOrNullValues.
            map((keyOfEitherUndefinedOrNullValue: string): string => `  ● ${ keyOfEitherUndefinedOrNullValue }`).
            join("\n")
    },

    disallowedKeysFoundInAssociativeArray: {
      title: "連想配列の禁じたキー",
      generateDescription: (
        { foundDisallowedKeys }: ValidationErrors.DisallowedKeysFoundInAssociativeArray.TemplateVariables
      ): string =>
          "下記のキーは当連想配列に存在しているが、このキーは禁じられた。\n" +
          foundDisallowedKeys.
              map((foundDisallowedKey: string): string => `  ● ${ foundDisallowedKey }`).
              join("\n")
    },


    /* ┅┅┅ 指数配列・タプル ┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅ */
    indexedArrayElementsCountIsLessThanRequiredMinimum: {
      title: "指数配列、要素不足",
      generateDescription: (
        {
          minimalElementsCount,
          actualElementsCount
        }: ValidationErrors.IndexedArrayElementsCountIsLessThanRequiredMinimum.TemplateVariables
      ): string =>
         `この指数配列型の値は${ actualElementsCount }組みを持っているが、少なくとも${ minimalElementsCount }期待。`
    },

    indexedArrayElementsCountIsMoreThanAllowedMaximum: {
      title: "指数配列、要素過度",
      generateDescription: (
        {
          maximalElementsCount,
          actualElementsCount
        }: ValidationErrors.IndexedArrayElementsCountIsMoreThanAllowedMaximum.TemplateVariables
      ): string =>
          `この指数配列型の値は${ actualElementsCount }組みを持っているが、最大${ maximalElementsCount }期待。`
    },

    indexedArrayOrTupleElementsCountDoesNotMatchWithSpecifiedExactNumber: {
      title: "指数配列、要素の期待数・実際数不一致",
      generateDescription: (
        {
          exactElementsCount,
          actualElementsCount
        }: ValidationErrors.IndexedArrayOrTupleElementsCountDoesNotMatchWithSpecifiedExactNumber.TemplateVariables
      ): string =>
          `この指数配列型の値は${ actualElementsCount }組みを持っているが、丁度${ exactElementsCount }期待。`
    },


    /* ┅┅┅ 数 ┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅ */
    forbiddenNaN_Value: {
      title: "数型プロパティー・要素の禁止NaN値",
      description: "このプロパティー・要素の値がNaNになっているが、NaNは許可されなかった。。"
    },

    numericValueIsNotBelongToExpectedNumbersSet: {
      title: "期待数集合との不一致",
      generateDescription: (
        { expectedNumberSet }: ValidationErrors.NumericValueIsNotBelongToExpectedNumbersSet.TemplateVariables
      ): string =>
        "期待に反し当値は" +
          `${ rawObjectDataProcessorLocalization__japanese.getLocalizedNumbersSet(expectedNumberSet) }集合に所属していない。`
    },

    /* 【 方法論 】 文字列型プロパティーに再利用可能。 */
    valueIsNotAmongAllowedAlternatives: {
      title: "可能な選択肢に不所属",
      generateDescription: (
        { allowedAlternatives }: ValidationErrors.ValueIsNotAmongAllowedAlternatives.TemplateVariables
      ): string =>
        "この値は以下の許容される選択肢に含まれていない。\n" +
        allowedAlternatives.
              map(
                (allowedAlternative: string | number): string =>
                    `  ○ ${ allowedAlternative }`
              ).
              join("\n")
    },

    numericValueIsSmallerThanRequiredMinimum: {
      title: "最小値未満",
      generateDescription: (
        { requiredMinimum }: ValidationErrors.NumericValueIsSmallerThanRequiredMinimum.TemplateVariables
      ): string =>
          `この値は最小値${ requiredMinimum }より小さい。`
    },

    numericValueIsGreaterThanAllowedMaximum: {
      title: "最大値超過",
      generateDescription: (
        { allowedMaximum }: ValidationErrors.NumericValueIsGreaterThanAllowedMaximum.TemplateVariables
      ): string =>
          `この値は最大値${ allowedMaximum }を超えている。`
    },


    /* ┅┅┅ 文字列 ┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅ */
    charactersCountIsLessThanRequired: {
      title: "最小文字数未満",
      generateDescription: (
        { minimalCharactersCount, realCharactersCount }: ValidationErrors.CharactersCountIsLessThanRequired.TemplateVariables
      ): string =>
        `この文字列は${ realCharactersCount }文字を持っているが、少なくとも${ minimalCharactersCount }文字必要。`
    },

    charactersCountIsMoreThanAllowed: {
      title: "最大文字数超過",
      generateDescription: (
        { maximalCharactersCount, realCharactersCount }: { maximalCharactersCount: number; realCharactersCount: number; }
      ): string =>
        `この文字列は${ realCharactersCount }文字を持っている、最大で${ maximalCharactersCount }文字まで許容。`
    },

    charactersCountDoesNotMatchWithSpecified: {
      title: "固定文字数との不一致",
      generateDescription: (
        { fixedCharactersCount, realCharactersCount }: { fixedCharactersCount: number; realCharactersCount: number; }
      ): string =>
        `この値は${ realCharactersCount }を見っているが、丁度${ fixedCharactersCount }必要。`
    },

    forbiddenCharactersFound: {
      title: "禁止文字",
      generateDescription: (
        { foundForbiddenCharacters }: ValidationErrors.ForbiddenCharactersFound.TemplateVariables
      ): string =>
          "この文字列は下記の禁じられた文字を含めている。\n" +
            foundForbiddenCharacters.map((character: string): string => `● ${ character }`).join("\n")
    },


    regularExpressionMismatch: {
      title: "正規表現不該当",
      generateDescription: (
        { regularExpression }: ValidationErrors.RegularExpressionMismatch.TemplateVariables
      ): string =>
          `この文字列は指定された正規表現に満たしていない。\n ${ regularExpression.toString() }`
    },


    /* ╍╍╍ 其の他 ╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍ */
    disallowedBooleanValueVariant: {
      title: "禁止真偽値種類",
      generateDescription: (
        { disallowedVariant }: ValidationErrors.DisallowedBooleanValueVariant.TemplateVariables
      ): string =>
          `この真偽値は「${ disallowedVariant }」になっているが「${ !disallowedVariant }」のみ許可。`
    },

    unsupportedValueType: {
      title: "未対応データ型",
      generateDescription: (
        { targetPropertyType }: ValidationErrors.UnsupportedValueType.TemplateVariables
      ): string =>
          `この値の型は「${ targetPropertyType }」になっているが、JSONと非相互的型として未サポート。`
    }

  },

  /* ━━━ 投げエラー ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  /* 【 校閲者向け 】
   * バリデーションエラーの場合と違って、下記もメッセージが「generateValidationErrorMessage」原形の一部になっていないので、「このプロパティ」や「この文字列」
   * というような文脈依存表現が理解されてなくになってしまう。 */

  throwableErrors: {

    objectSchemaNotSpecified: {
      title: "オブジェクトスキーマが未指定",
      generateDescription: (
        {
          targetPropertyDotSeparatedQualifiedName,
          documentationPageAnchor
        }: ThrowableErrors.MutuallyExclusiveTransformationsBetweenUndefinedAndNull.TemplateVariables
      ): string =>
          `「${ targetPropertyDotSeparatedQualifiedName }」にとってオブジェクトスキーマが指定されていない。` +
          rawObjectDataProcessorLocalization__japanese.generateSeeMoreSentence({ documentationPageAnchor })
    },

    mutuallyExclusiveTransformationsBetweenUndefinedAndNull: {
      title: "「undefined」と「null」の間の変換指定矛盾",
      generateDescription: (
        {
          targetPropertyDotSeparatedQualifiedName,
          documentationPageAnchor
        }: ThrowableErrors.MutuallyExclusiveTransformationsBetweenUndefinedAndNull.TemplateVariables
      ): string =>
        `プロパティ「${ targetPropertyDotSeparatedQualifiedName }」にとって「mustTransformUndefinedToNull」オプションにも` +
          "「mustTransformNullToUndefined」にも「true」値が指定され、矛盾になっている。" +
        rawObjectDataProcessorLocalization__japanese.generateSeeMoreSentence({ documentationPageAnchor })
    },

    preValidationModificationFailed: {
      title: "バリデーション前変換失敗",
      generateDescription: (
        {
          targetPropertyDotSeparatedQualifiedName,
          documentationPageAnchor
        }: ThrowableErrors.PreValidationModificationFailed.TemplateVariables
      ): string =>
          `プロパティ・要素「${ targetPropertyDotSeparatedQualifiedName }」のバリデーション前の変換の際エラーが発生。` +
          rawObjectDataProcessorLocalization__japanese.generateSeeMoreSentence({ documentationPageAnchor })
    },

    propertyUndefinedabilityNotSpecified: {
      title: "undefined可否未指定",
      generateDescription: (
        {
          targetPropertyDotSeparatedQualifiedName,
          documentationPageAnchor
        }: ThrowableErrors.PropertyUndefinedabilityNotSpecified.TemplateVariables
      ): string =>
          `プロパティ「${ targetPropertyDotSeparatedQualifiedName }」にとってundefined値の可否が指定されていない。\n` +
          rawObjectDataProcessorLocalization__japanese.generateSeeMoreSentence({ documentationPageAnchor })
    },

    propertyNullabilityNotSpecified: {
      title: "null可否未指定",
      generateDescription: (
        {
          targetPropertyDotSeparatedQualifiedName,
          documentationPageAnchor
        }: ThrowableErrors.PropertyNullabilityNotSpecified.TemplateVariables
      ): string =>
          `プロパティ「${ targetPropertyDotSeparatedQualifiedName }」にとってnull値をの可否が指定されていない。\n` +
          rawObjectDataProcessorLocalization__japanese.generateSeeMoreSentence({ documentationPageAnchor })
    },

    dataTypeNotSpecified: {
      title: "非サポート・非指定データ型",
      generateDescription: (
        {
          targetPropertyDotSeparatedQualifiedName,
          specifiedStringifiedType,
          documentationPageAnchor
        }: ThrowableErrors.DataTypeNotSpecified.TemplateVariables
      ): string =>
          `プロパティ・要素「${ targetPropertyDotSeparatedQualifiedName }」にとって` +
          (
            isUndefined(specifiedStringifiedType) ?
              "データ型が指定されなかった。" :
              `対応トされていないデータ型「${ specifiedStringifiedType }」が指定された。`
          ) +
          rawObjectDataProcessorLocalization__japanese.generateSeeMoreSentence({ documentationPageAnchor })
    },

    unableToDeletePropertyWithOutdatedKey: {
      title: "旧名プロパティ削除不可能",
      generateDescription: (
        {
          targetPropertyDotSeparatedQualifiedName,
          propertyNewKey,
          documentationPageAnchor
        }: ThrowableErrors.UnableToDeletePropertyWithOutdatedKey.TemplateVariables
      ): string =>
          `プロパティ「${ targetPropertyDotSeparatedQualifiedName }」のコピーの「${ propertyNewKey }」を作成してから、` +
            "`configurable: false`の為削除不可能。" +
          "尚、処理アプローチは既存のオブジェクトの変更となり、「mustLeaveEvenRenamed」オプションに`true`が指定されていない。" +
          rawObjectDataProcessorLocalization__japanese.generateSeeMoreSentence({ documentationPageAnchor })
    },

    unableToChangePropertyDescriptors: {
      title: "プロパティ記述子変更不可能",
      generateDescription: (
        {
          targetPropertyDotSeparatedQualifiedName,
          documentationPageAnchor
        }: ThrowableErrors.UnableToChangePropertyDescriptors.TemplateVariables
      ): string =>
          `プロパティ「${ targetPropertyDotSeparatedQualifiedName }」は\`configurable: false\`になっていると他に、処理アプローチは` +
            "既存のオブジェクトの変更なので、記述子の変更は不可能。" +
          rawObjectDataProcessorLocalization__japanese.generateSeeMoreSentence({ documentationPageAnchor })
    },

    unableToUpdatePropertyValue: {
      title: "プロパティの値を更新不可能",
      generateDescription: (
        {
          targetPropertyDotSeparatedQualifiedName,
          documentationPageAnchor
        }: ThrowableErrors.UnableToUpdatePropertyValue.TemplateVariables
      ): string =>
          `プロパティー「${ targetPropertyDotSeparatedQualifiedName }」の変更が規定値の代入か、前バリデーションの変換に依り要求されたが、` +
            "読み込み専用のプロパティーとして上書き不可能。" +
          rawObjectDataProcessorLocalization__japanese.generateSeeMoreSentence({ documentationPageAnchor })
    },

    mutuallyExclusiveAssociativeArrayKeysLimitations: {
      title: "連想配列キー制限の相互矛盾",
      generateDescription: (
        {
          targetPropertyDotSeparatedQualifiedName,
          documentationPageAnchor
        }: ThrowableErrors.MutuallyExclusiveAssociativeArrayKeysLimitations.TemplateVariables
      ): string =>
          "許可されるキーと禁止されるキーの両方が" +
          (
            isNull(targetPropertyDotSeparatedQualifiedName) ?
              "ルート連想配列" :
              `連想配列「${ targetPropertyDotSeparatedQualifiedName }」`
          ) +
          "に対して同時に指定されたという矛盾である。" +
          rawObjectDataProcessorLocalization__japanese.generateSeeMoreSentence({ documentationPageAnchor })
    },

    incompatibleValuesTypesAlternatives: {
      title: "非相互的値の型",
      generateDescription: (
        {
          isIndexedArrayLikeType,
          documentationPageAnchor
        }: ThrowableErrors.IncompatibleValuesTypesAlternatives.TemplateVariables
      ): string =>
          (
            isIndexedArrayLikeType ?
                "「ValuesTypesIDs.indexedArray」（エイリアスは`Array`）と「`ValuesTypesIDs.tuple`」" :
                "「ValuesTypesIDs.fixedSchemaObject」（エイリアスは`Object`）と「`ValuesTypesIDs.associativeArray`」"
          ) +
            `はECMAScript上両方${ isIndexedArrayLikeType ? "`Array`" : "`Object`" }になっているので` +
            "「ValuesTypesIDs.polymorphic」にとって、非相互的項目。" +
            rawObjectDataProcessorLocalization__japanese.generateSeeMoreSentence({ documentationPageAnchor })
    },

    bothAllowedAndForbiddenCharactersSpecified: {
      title: "特定文字制限の相互矛盾",
      generateDescription: (
        {
          targetPropertyDotSeparatedQualifiedName,
          documentationPageAnchor
        }: ThrowableErrors.BothAllowedAndForbiddenCharactersSpecified.TemplateVariables
      ): string =>
          `許可される文字と禁止される文字の両方が「${ targetPropertyDotSeparatedQualifiedName }」という文字列型のプロパティ・要素に対して` +
            "同時に指定されたという矛盾。" +
          rawObjectDataProcessorLocalization__japanese.generateSeeMoreSentence({ documentationPageAnchor })
    }

  },

  /* ━━━ 警告 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  warnings: {

    preValidationModificationFailed: {

      title: "バリデーション前の変換中エラー発生",

      generateDescription: (
        {
          targetPropertyDotSeparatedQualifiedName,
          stringifiedCaughtError,
          documentationPageAnchor
        }: Warnings.PreValidationModificationFailed.TemplateVariables
      ): string =>
          `プロパティ・要素の「${ targetPropertyDotSeparatedQualifiedName }」バリデーション前の変換中に以下のエラーが発生。\n` +
          `${ stringifiedCaughtError }\n` +
          rawObjectDataProcessorLocalization__japanese.generateSeeMoreSentence({ documentationPageAnchor })

    },

    unableToDeletePropertyWithOutdatedKey: {

      title: "旧名プロパティ削除不可能",

      generateDescription: (
        {
          targetPropertyDotSeparatedQualifiedName,
          propertyNewKey,
          documentationPageAnchor
        }: Warnings.UnableToDeletePropertyWithOutdatedKey.TemplateVariables
      ): string =>
          `プロパティ「${ targetPropertyDotSeparatedQualifiedName }」のコピーの「${ propertyNewKey }」を作成してから、` +
            "`configurable: false`の為削除不可能。" +
          "尚、処理アプローチは既存のオブジェクトの変更となり、「mustLeaveEvenRenamed」オプションに`true`が指定されていない。" +
          rawObjectDataProcessorLocalization__japanese.generateSeeMoreSentence({ documentationPageAnchor })
    },

    unableToChangePropertyDescriptors: {

      title: "プロパティ記述子変更不可能",

      generateDescription: (
        {
          targetPropertyDotSeparatedQualifiedName,
          documentationPageAnchor
        }: ThrowableErrors.UnableToChangePropertyDescriptors.TemplateVariables
      ): string =>
          `プロパティー「${ targetPropertyDotSeparatedQualifiedName }」の変更が規定値の代入か、前バリデーションの変換に依り要求されたが、` +
            "読み込み専用のプロパティーとして上書き不可能。" +
          rawObjectDataProcessorLocalization__japanese.generateSeeMoreSentence({ documentationPageAnchor })

    },

    unableToUpdatePropertyValue: {

      title: "プロパティの値を更新できません",

      generateDescription: (
        {
          targetPropertyDotSeparatedQualifiedName,
          documentationPageAnchor
        }: ThrowableErrors.UnableToUpdatePropertyValue.TemplateVariables
      ): string =>
          `プロパティー「${ targetPropertyDotSeparatedQualifiedName }」の変更が規定値の代入か、前バリデーションの変換に依り要求されたが、` +
            "読み込み専用のプロパティーとして上書き不可能。" +
          rawObjectDataProcessorLocalization__japanese.generateSeeMoreSentence({ documentationPageAnchor })
    }

  },


  /* ━━━ 用語 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  getLocalizedValueType(valueTypeID: RawObjectDataProcessor.ValuesTypesIDs): string {
    switch (valueTypeID) {

      case RawObjectDataProcessor.ValuesTypesIDs.number: return "数";
      case RawObjectDataProcessor.ValuesTypesIDs.string: return "文字列";
      case RawObjectDataProcessor.ValuesTypesIDs.boolean: return "ブーリアン";

      case RawObjectDataProcessor.ValuesTypesIDs.fixedSchemaObject: return "固定スキーマのオブジェクト";
      case RawObjectDataProcessor.ValuesTypesIDs.associativeArray: return "連想配列型のオブジェクト";
      case RawObjectDataProcessor.ValuesTypesIDs.indexedArray: return "指数配列";
      case RawObjectDataProcessor.ValuesTypesIDs.tuple: return "タプル";

      case RawObjectDataProcessor.ValuesTypesIDs.ambiguousObject: return "曖昧オブジェクト";
      case RawObjectDataProcessor.ValuesTypesIDs.ambiguousArray: return "曖昧配列";

      case RawObjectDataProcessor.ValuesTypesIDs.polymorphic: return "多形性";

    }
  },

  getLocalizedNumbersSet(numberSet: RawObjectDataProcessor.NumbersSets): string {
    switch (numberSet) {
      case RawObjectDataProcessor.NumbersSets.naturalNumber: return "自然数";
      case RawObjectDataProcessor.NumbersSets.positiveIntegerOrZero: return "正の整数・0";
      case RawObjectDataProcessor.NumbersSets.naturalNumberOrZero: return "自然数・0";
      case RawObjectDataProcessor.NumbersSets.negativeInteger: return "負の整数";
      case RawObjectDataProcessor.NumbersSets.negativeIntegerOrZero: return "負の整数・0";
      case RawObjectDataProcessor.NumbersSets.anyInteger: return "正負不問の整数";
      case RawObjectDataProcessor.NumbersSets.positiveDecimalFraction: return "正の小数";
      case RawObjectDataProcessor.NumbersSets.positiveDecimalFractionOrZero: return "正の小数・0";
      case RawObjectDataProcessor.NumbersSets.negativeDecimalFraction: return "負の小数";
      case RawObjectDataProcessor.NumbersSets.negativeDecimalFractionOrZero: return "負の小数・0";
      case RawObjectDataProcessor.NumbersSets.anyDecimalFraction: return "正負不問の整数小数";
      case RawObjectDataProcessor.NumbersSets.anyDecimalFractionOrZero: return "正負不問の整数小数・0";
      case RawObjectDataProcessor.NumbersSets.anyRealNumber: return "実数";
      case RawObjectDataProcessor.NumbersSets.positiveRealNumber: return "正の実数";
      case RawObjectDataProcessor.NumbersSets.negativeRealNumber: return "負の実数";
      case RawObjectDataProcessor.NumbersSets.positiveRealNumberOrZero: return "正の実数・0";
      case RawObjectDataProcessor.NumbersSets.negativeRealNumberOrZero: return "負の実数・0";
    }
  }

};
