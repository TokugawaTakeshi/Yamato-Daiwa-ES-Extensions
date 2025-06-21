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
        "http://localhost:3000/CoreLibrary/Functionality/RawObjectDataProcessor/Children/06-ValidationIssues/" +
        `RawObjectDataProcessor-ValidationIssues.english.html#${ documentationPageAnchor }`,

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
        "\n●　妥当性確認の前段階処理で変更される以前の初期値: " +
          targetPropertyStringifiedValueBeforeFirstPreValidationModification
      ] : []
    ].join("");
  },

  generateLanguageDependentErrorNumberHeadingPart: ({ messageNumber }: Readonly<{ messageNumber: number; }>): string =>
    `第${ messageNumber }エラー`,


  /* ━━━ バリデーションエラー ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  /* 【 校閲者向け 】
   * 殆どの下記のメッセージは上記の「generateValidationErrorMessage」原形の一部になっているので、曖昧「このプロパティ」の様に書かれても、
   * 　　上記の原形に合わせて曖昧さが消える。 */

  validationErrors: {

    rawDataIsNotObject: {
      generateMessage:
        ({ actualNativeType, documentationPageAnchor }: ValidationErrors.RawDataIsNotObject.TemplateVariables): string =>
          "「RawObjectDataProcessor.process()」関数の第1引数である raw data がオブジェクトではなく、" +
          `実際には "${ actualNativeType }" 型でした。` +
          rawObjectDataProcessorLocalization__japanese.generateSeeMoreSentence({ documentationPageAnchor })
    },

    rawDataIsNull: {
      generateMessage: ({ documentationPageAnchor }: ValidationErrors.RawDataIsNull.TemplateVariables): string =>
        "「RawObjectDataProcessor.process()」関数の第1引数である raw data が `null` であり、非 `null` のオブジェクトが期待されていました。" +
        rawObjectDataProcessorLocalization__japanese.generateSeeMoreSentence({ documentationPageAnchor })
    },

    valueTypeDoesNotMatchWithExpected: {
      title: "期待される型と実際の型が一致しません",
      generateDescription: (
        { expectedTypeID, actualNativeType }: ValidationErrors.ValueTypeDoesNotMatchWithExpected.TemplateVariables
      ): string =>
        "この値には " +
        `"${ rawObjectDataProcessorLocalization__japanese.getLocalizedValueType(expectedTypeID) }" 型が期待されていましたが、` +
        `実際には "${ actualNativeType }" 型です。`
    },

    preValidationModificationFailed: {
      title: "事前バリデーション修正の失敗",
      generateDescription: (
        { stringifiedCaughtError }: ValidationErrors.PreValidationModificationFailed.TemplateVariables
      ): string =>
        "このプロパティ／要素に対して事前バリデーション修正中に以下のエラーが発生しました。\n" +
        `${ stringifiedCaughtError }\n` +
        "エラーハンドリング戦略 \"onPreValidationModificationFailed\" が " +
        "\"ErrorHandlingStrategies.markingOfDataAsInvalid\" に設定されていたため、データは無効としてマークされました。" +
        "ただし、問題は必ずしもデータ側ではなく、修正処理関数自体にある可能性もあります。"
    },


    /* ─── undefined値可否 ─────────────────────────────────────────────────────────────────────────────────────────── */
    forbiddenUndefinedValue: {
      title: "プロパティ／要素の undefined 値は許可されていません",
      description: "このプロパティ／要素は未定義、または明示的に `undefined` に設定されていますが、これは明示的に禁止されています。"
    },

    conditionallyForbiddenUndefinedValue: {
      title: "条件付きで undefined 値が禁止されています",
      generateDescription: (
        {
          verbalConditionWhenUndefinedIsForbiddenWithoutEndOfSentenceMark
        }: ValidationErrors.ConditionallyForbiddenUndefinedValue.TemplateVariables
      ): string =>
        "このプロパティ／要素は未定義、または明示的に `undefined` に設定されていますが、" +
        `${ verbalConditionWhenUndefinedIsForbiddenWithoutEndOfSentenceMark } 場合にはこれが禁止されており、` +
        "その条件が満たされています。"
    },

    conditionallyForbiddenNonUndefinedValue: {
      title: "条件付きで `undefined` 以外の値が禁止されています",
      generateDescription: (
        { conditionWhenMustBeUndefined }: ValidationErrors.ConditionallyForbiddenNonUndefinedValue.TemplateVariables
      ): string =>
        `このプロパティ／要素は \`undefined\` ではありませんが、${ conditionWhenMustBeUndefined } 場合には ` +
        "`undefined` である必要があり、その条件が満たされています。"
    },

    forbiddenNullValue: {
      title: "プロパティ／要素の null 値は許可されていません",
      description: "このプロパティ／要素は `null` に設定されていますが、これは明示的に禁止されています。"
    },

    conditionallyForbiddenNullValue: {
      title: "条件付きで null 値が禁止されています",
      generateDescription: (
        {
          verbalConditionWhenNullIsForbiddenWithoutEndOfSentenceMark
        }: ValidationErrors.ConditionallyForbiddenNullValue.TemplateVariables
      ): string =>
        "このプロパティ／要素は `null` に設定されていますが、" +
        `${ verbalConditionWhenNullIsForbiddenWithoutEndOfSentenceMark } 場合にはこれが禁止されており、` +
        "その条件が満たされています。"
    },

    conditionallyForbiddenNonNullValue: {
      title: "条件付きで `null` 以外の値が禁止されています",
      generateDescription: (
        { conditionWhenMustBeNull }: ValidationErrors.ConditionallyForbiddenNonNullValue.TemplateVariables
      ): string =>
        `このプロパティ／要素は \`null\` ではありませんが、${ conditionWhenMustBeNull } 場合には \`null\` ` +
        "である必要があり、その条件が満たされています。"
    },

    unableToDeletePropertyWithOutdatedKey: {
      title: "古いキーのプロパティを削除できません",
      generateDescription: (
        { propertyNewKey }: ValidationErrors.UnableToDeletePropertyWithOutdatedKey.TemplateVariables
      ): string =>
        `このプロパティの名前を「${ propertyNewKey }」に変更した後、削除を試みましたが、構成可能ではないため削除できません。` +
        "現在の処理アプローチはソースオブジェクトの直接操作であり、`mustLeaveEvenRenamed` が `true` に設定されていません。"
      },

    unableToChangePropertyDescriptors: {
      title: "プロパティ記述子を変更できません",
      description:
        "このプロパティは構成可能ではないため、記述子を変更できません。現在の処理アプローチはソースオブジェクトの直接操作であり、`mustLeaveEvenRenamed` が `true` に設定されていません。"
    },

    unableToUpdatePropertyValue: {
      title: "プロパティ値を更新できません",
      description:
        "既定値の代入または事前バリデーションによる修正によりこのプロパティの更新が要求されましたが、このプロパティは読み取り専用です。" +
        "ソースデータにおいてこのプロパティが書き込み可能であると想定される場合のみ、このエラーが無効データとしてマークされます。"
    },

    unexpectedProperties: {
      title: "想定外のプロパティ",
      generateDescription: (
        { unexpectedProperties }: ValidationErrors.UnexpectedProperties.TemplateVariables
      ): string =>
        "以下のプロパティは想定されていません：\n" +
        unexpectedProperties.map((propertyKey: string): string => `● ${ propertyKey }`).join("\n")
    },

    numericValueIsNotBelongToExpectedNumbersSet: {
      title: "期待される数値セットとの不一致",
      generateDescription: (
        { expectedNumberSet }: ValidationErrors.NumericValueIsNotBelongToExpectedNumbersSet.TemplateVariables
      ): string =>
        "この数値は、期待される「" +
        rawObjectDataProcessorLocalization__japanese.getLocalizedNumbersSet(expectedNumberSet) +
        "」セットのメンバーではありません。"
    },

    valueIsNotAmongAllowedAlternatives: {
      title: "値が許容された選択肢に含まれていません",
      generateDescription: (
        { allowedAlternatives }: ValidationErrors.ValueIsNotAmongAllowedAlternatives.TemplateVariables
      ): string =>
        "この値は以下の許容される選択肢に含まれていません：\n" +
        allowedAlternatives.map((allowedAlternative: string | number): string => `  ○ ${ allowedAlternative }`).join("\n")
    },

    numericValueIsSmallerThanRequiredMinimum: {
      title: "最小値未満",
      generateDescription: (
        { requiredMinimum }: ValidationErrors.NumericValueIsSmallerThanRequiredMinimum.TemplateVariables
      ): string =>
        `この値は最小値 ${ requiredMinimum } より小さいです。`
    },

    numericValueIsGreaterThanAllowedMaximum: {
      title: "最大値超過",
      generateDescription: (
        { allowedMaximum }: ValidationErrors.NumericValueIsGreaterThanAllowedMaximum.TemplateVariables
      ): string =>
        `この値は最大値 ${ allowedMaximum } を超えています。`
    },

    charactersCountIsLessThanRequired: {
      title: "最小文字数未満",
      generateDescription: (
        { minimalCharactersCount, realCharactersCount }: ValidationErrors.CharactersCountIsLessThanRequired.TemplateVariables
      ): string =>
        `この文字列は ${ realCharactersCount } 文字であり、少なくとも ${ minimalCharactersCount } 文字必要です。`
    },

    charactersCountIsMoreThanAllowed: {
      title: "最大文字数超過",
      generateDescription: (
        { maximalCharactersCount, realCharactersCount }: { maximalCharactersCount: number; realCharactersCount: number; }
      ): string =>
        `この文字列は ${ realCharactersCount } 文字であり、最大で ${ maximalCharactersCount } 文字まで許容されます。`
    },

    charactersCountDoesNotMatchWithSpecified: {
      title: "固定文字数との不一致",
      generateDescription: (
        { fixedCharactersCount, realCharactersCount }: { fixedCharactersCount: number; realCharactersCount: number; }
      ): string =>
        `この値は ${ realCharactersCount } 文字であり、ちょうど ${ fixedCharactersCount } 文字である必要があります。`
    },

    regularExpressionMismatch: {
      title: "正規表現との不一致",
      generateDescription: (
        { regularExpression }: ValidationErrors.RegularExpressionMismatch.TemplateVariables
      ): string =>
        `この文字列は指定された正規表現に一致しません：\n ${ regularExpression.toString() }`
    },

    indexedArrayElementsCountIsLessThanRequiredMinimum: {
      title: "インデックス配列の要素数が最小より少ない",
      generateDescription: (
        {
          minimalElementsCount,
          actualElementsCount
        }: ValidationErrors.IndexedArrayElementsCountIsLessThanRequiredMinimum.TemplateVariables
      ): string =>
        `この配列は ${ actualElementsCount } 要素ですが、少なくとも ${ minimalElementsCount } 要素が必要です。`
    },

    indexedArrayElementsCountIsMoreThanAllowedMaximum: {
      title: "インデックス配列の要素数が最大を超えている",
      generateDescription: (
        {
          maximalElementsCount,
          actualElementsCount
        }: ValidationErrors.IndexedArrayElementsCountIsMoreThanAllowedMaximum.TemplateVariables
      ): string =>
        `この配列は ${ actualElementsCount } 要素ですが、最大で ${ maximalElementsCount } 要素まで許容されます。`
    },

    indexedArrayElementsCountDoesNotMatchWithSpecifiedExactNumber: {
      title: "インデックス配列の要素数が固定値と一致しない",
      generateDescription: (
        {
          exactElementsCount,
          actualElementsCount
        }: ValidationErrors.IndexedArrayElementsCountDoesNotMatchWithSpecifiedExactNumber.TemplateVariables
      ): string =>
        `この配列は ${ actualElementsCount } 要素ですが、ちょうど ${ exactElementsCount } 要素である必要があります。`
    },

    associativeArrayEntriesCountIsLessThanRequiredMinimum: {
      title: "連想配列のエントリ数が最小より少ない",
      generateDescription: (
        {
          actualEntriesCount,
          minimalEntriesCount
        }: ValidationErrors.AssociativeArrayEntriesCountIsLessThanRequiredMinimum.TemplateVariables
      ): string =>
        `この連想配列は ${ actualEntriesCount } 件のエントリを持ちますが、少なくとも ${ minimalEntriesCount } 件が必要です。`
    },

    associativeArrayPairsCountIsMoreThanAllowedMaximum: {
      title: "連想配列のエントリ数が最大を超えている",
      generateDescription: (
        {
          maximalEntriesCount,
          actualEntriesCount
        }: ValidationErrors.AssociativeArrayPairsCountIsMoreThanAllowedMaximum.TemplateVariables
      ): string =>
        `この連想配列は ${ actualEntriesCount } 件のエントリを持ちますが、最大で ${ maximalEntriesCount } 件まで許容されます。`
    },

    associativeArrayPairsCountDoesNotMatchWithSpecifiedExactNumber: {
      title: "連想配列のエントリ数が固定数と一致しない",
      generateDescription: (
        {
          exactEntriesCount,
          actualEntriesCount
        }: ValidationErrors.AssociativeArrayPairsCountDoesNotMatchWithSpecifiedExactNumber.TemplateVariables
      ): string =>
        `この連想配列は ${ actualEntriesCount } 件のエントリを持ちますが、ちょうど ${ exactEntriesCount } 件である必要があります。`
    },

    forbiddenForSpecificKeysUndefinedOrNullValuesFoundInAssociativeArrayTypeObject: {
      title: "特定キーに対して null または undefined の値が禁止されています",
      generateDescription: (
        { keysOfEitherUndefinedOrNullValues }:
          ValidationErrors.ForbiddenForSpecificKeysUndefinedOrNullValuesFoundInAssociativeArrayTypeObject.TemplateVariables
      ): string =>
        "以下のキーには null または undefined の値が含まれており、これらのキーに対してそのような値は明示的に禁止されています：\n" +
        stringifyAndFormatArbitraryValue(keysOfEitherUndefinedOrNullValues)
    },

    disallowedKeysFoundInAssociativeArray: {
      title: "許可されていないキーが含まれています",
      generateDescription: (
        { foundDisallowedKeys }: ValidationErrors.DisallowedKeysFoundInAssociativeArray.TemplateVariables
      ): string =>
        "以下のキーはこの連想配列に存在していますが、禁止されています：\n" +
        stringifyAndFormatArbitraryValue(foundDisallowedKeys)
    },

    disallowedBooleanValueVariant: {
      title: "許可されていない真偽値",
      generateDescription: (
        { disallowedVariant }: ValidationErrors.DisallowedBooleanValueVariant.TemplateVariables
      ): string =>
        `この真偽値は '${ disallowedVariant }' ですが、許可されているのは '${ !disallowedVariant }' のみです。`
    },

    unsupportedValueType: {
      title: "サポートされていない値の型",
      generateDescription: (
        { targetPropertyValue }: ValidationErrors.UnsupportedValueType.TemplateVariables
      ): string =>
        `この値の型は ${ typeof targetPropertyValue } であり、パースされた JSON として無効です。`
    },

    customValidationFailed: {
      title: "カスタムバリデーションに失敗しました",
      generateDescription: (
        { customValidationDescription }: ValidationErrors.CustomValidationFailed.TemplateVariables
      ): string =>
        `この値はカスタムバリデーション "${ customValidationDescription }" に合格しませんでした。`
    }

  },

  throwableErrors: {

    objectSchemaNotSpecified: {
      title: "オブジェクトスキーマが指定されていません",
      generateDescription: (
        {
          targetPropertyDotSeparatedQualifiedName
        }: ThrowableErrors.MutuallyExclusiveTransformationsBetweenUndefinedAndNull.TemplateVariables
      ): string =>
          `プロパティ "${ targetPropertyDotSeparatedQualifiedName }" に対してオブジェクトスキーマが指定されていません。`
    },

    mutuallyExclusiveTransformationsBetweenUndefinedAndNull: {
      title: "undefined と null に対する変換指定が矛盾しています",
      generateDescription: (
        {
          targetPropertyDotSeparatedQualifiedName
        }: ThrowableErrors.MutuallyExclusiveTransformationsBetweenUndefinedAndNull.TemplateVariables
      ): string =>
        "\"mustTransformUndefinedToNull\" と \"mustTransformNullToUndefined\" の両方が " +
        `プロパティ "${ targetPropertyDotSeparatedQualifiedName }" に対して true に設定されていますが、これらは相互に矛盾する指定です。`
    },

    preValidationModificationFailed: {
      title: "事前バリデーション修正の失敗",
      generateDescription: (
        { targetPropertyDotSeparatedQualifiedName }: ThrowableErrors.PreValidationModificationFailed.TemplateVariables
      ): string =>
          `プロパティ／要素 "${ targetPropertyDotSeparatedQualifiedName }" の事前バリデーション修正中にエラーが発生しました。` +
          "エラーハンドリング戦略 \"onPreValidationModificationFailed\" が \"ErrorHandlingStrategies.throwingOfError\"" +
          " に設定されており、これはデフォルトの動作です。"
    },

    propertyUndefinedabilityNotSpecified: {
      title: "undefined 許容性が指定されていません",
      generateDescription: (
        { targetPropertyDotSeparatedQualifiedName }: ThrowableErrors.PropertyUndefinedabilityNotSpecified.TemplateVariables
      ): string =>
          `プロパティ／要素 \`${ targetPropertyDotSeparatedQualifiedName }\` に対して undefined 値をどのように扱うかが指定されていません。\n` +
          "ドキュメントを参照し、有効なオプションのいずれかを指定してください: https://ee.yamato-daiwa.com/"
    },

    propertyNullabilityNotSpecified: {
      title: "null 許容性が指定されていません",
      generateDescription: (
        { targetPropertyDotSeparatedQualifiedName }: ThrowableErrors.PropertyNullabilityNotSpecified.TemplateVariables
      ): string =>
          `プロパティ／要素 \`${ targetPropertyDotSeparatedQualifiedName }\` に対して null 値をどのように扱うかが指定されていません。\n` +
          "ドキュメントを参照し、有効なオプションのいずれかを指定してください: https://ee.yamato-daiwa.com/"
    },

    dataTypeNotSpecified: {
      title: "データ型が指定されていません",
      generateDescription: (
        {
          targetPropertyDotSeparatedQualifiedName,
          specifiedStringifiedType
        }: ThrowableErrors.DataTypeNotSpecified.TemplateVariables
      ): string =>
          (
            isUndefined(specifiedStringifiedType) ?
              "データ型が" :
              `サポートされていないデータ型 "${ specifiedStringifiedType }" が`
          ) +
          `プロパティ／要素 "${ targetPropertyDotSeparatedQualifiedName }" に対して指定されました。` +
          "これは TypeScript 側の型情報不足により発生する可能性があります。"
    },

    unableToDeletePropertyWithOutdatedKey: {
      title: "古いキーを持つプロパティを削除できません",
      generateDescription: (
        {
          targetPropertyDotSeparatedQualifiedName,
          propertyNewKey
        }: ThrowableErrors.UnableToDeletePropertyWithOutdatedKey.TemplateVariables
      ): string =>
          `プロパティ "${ targetPropertyDotSeparatedQualifiedName }" は "${ propertyNewKey }" にリネームされましたが、` +
          "処理方法が元オブジェクトの操作であり、かつ \"mustLeaveEvenRenamed\" が true に設定されていないため、" +
          "このプロパティを削除できません。"
    },

    unableToChangePropertyDescriptors: {
      title: "プロパティディスクリプターの変更ができません",
      generateDescription: (
        { targetPropertyDotSeparatedQualifiedName }: ThrowableErrors.UnableToChangePropertyDescriptors.TemplateVariables
      ): string =>
          `プロパティ "${ targetPropertyDotSeparatedQualifiedName }" のディスクリプターは変更できません。` +
          "このプロパティは configurable ではなく、処理方法が元オブジェクトの操作であり、かつ \"mustLeaveEvenRenamed\" が true に設定されていません。"
    },

    unableToUpdatePropertyValue: {
      title: "プロパティの値を更新できません",
      generateDescription: (
        { targetPropertyDotSeparatedQualifiedName }: ThrowableErrors.UnableToUpdatePropertyValue.TemplateVariables
      ): string =>
          `プロパティ "${ targetPropertyDotSeparatedQualifiedName }" に対して、デフォルト値の補完または事前修正を通じた更新が試みられましたが、` +
          "このプロパティは読み取り専用のため、更新できません。\n" +
          "このエラーは、エラーハンドリング戦略 \"onUnableToUnableToUpdatePropertyValue\" が " +
          "\"ErrorHandlingStrategies.throwingOfError\" に設定されているために発生しました（これはデフォルトの動作です）。"
    },

    mutuallyExclusiveAssociativeArrayKeysLimitations: {
      title: "連想配列キー制限の相互矛盾",
      generateDescription: (
        {
          targetPropertyDotSeparatedQualifiedName
        }: ThrowableErrors.MutuallyExclusiveAssociativeArrayKeysLimitations.TemplateVariables
      ): string =>
          "許可されるキーと禁止されるキーの両方が " +
          (
            isNull(targetPropertyDotSeparatedQualifiedName) ?
              "ルート連想配列" :
              `連想配列 "${ targetPropertyDotSeparatedQualifiedName }"`
          ) +
          " に対して同時に指定されていますが、これは矛盾しています。\n" +
          "許可されるキーまたは禁止されるキーのいずれか一方のみを指定してください。"
    },

    incompatibleValuesTypesAlternatives: {
      title: "互換性のない値型の代替指定",
      generateDescription: (
        { targetValueStringifiedSpecification }: ThrowableErrors.IncompatibleValuesTypesAlternatives.TemplateVariables
      ): string =>
          "'ValuesTypesIDs.fixedKeyAndValuePairsObject'（別名: Object）と " +
          "'ValuesTypesIDs.associativeArrayOfUniformTypeValues'（別名: Map）は、" +
          "どちらも ECMAScript の観点では `object` 型であり、`ValuesTypesIDs.oneOf` の代替として互換性がありません。\n" +
          `このプロパティの仕様を修正してください。\n${ targetValueStringifiedSpecification }`
    }

  },

  warnings: {

    preValidationModificationFailed: {

      title: "事前バリデーション修正の失敗",

      generateDescription: (
        {
          targetPropertyDotSeparatedQualifiedName,
          stringifiedCaughtError
        }: Warnings.PreValidationModificationFailed.TemplateVariables
      ): string =>
          `プロパティ／要素 "${ targetPropertyDotSeparatedQualifiedName }" の事前バリデーション修正中に次のエラーが発生しました。\n` +
          `${ stringifiedCaughtError }\n` +
          "このエラーは、エラーハンドリング戦略 \"onPreValidationModificationFailed\" が " +
          "\"ErrorHandlingStrategies.warningWithoutMarkingOfDataAsInvalid\" に設定されているため、警告として報告されました。" +
          "ただしこれは推奨されません。なぜなら、事前バリデーションの失敗は、修正関数がソースデータの全ての可能なパターンを " +
          "考慮していないことを意味し、後続の処理にエラーを引き起こす可能性があるためです。"
    },

    unableToDeletePropertyWithOutdatedKey: {

      title: "古いキーを持つプロパティを削除できません",

      generateDescription: (
        {
          targetPropertyDotSeparatedQualifiedName,
          propertyNewKey
        }: Warnings.UnableToDeletePropertyWithOutdatedKey.TemplateVariables
      ): string =>
          `プロパティ "${ targetPropertyDotSeparatedQualifiedName }" は "${ propertyNewKey }" にリネームされましたが、` +
          "このプロパティは configurable ではなく、かつ処理方法が元オブジェクトの操作であり、" +
          "\"mustLeaveEvenRenamed\" が true に設定されていないため、削除できません。"
    },

    unableToChangePropertyDescriptors: {

      title: "プロパティディスクリプターの変更ができません",

      generateDescription: (
        { targetPropertyDotSeparatedQualifiedName }: ThrowableErrors.UnableToChangePropertyDescriptors.TemplateVariables
      ): string =>
          `プロパティ "${ targetPropertyDotSeparatedQualifiedName }" のディスクリプターを変更できませんでした。` +
          "このエラーは、エラーハンドリング戦略 \"unableToChangePropertyDescriptors\" が " +
          "\"ErrorHandlingStrategies.warningWithoutMarkingOfDataAsInvalid\" に設定されているため、警告として報告されました。" +
          "ただしこれは推奨されません。なぜなら、出力データが期待と異なるにも関わらず、有効と判定されてしまう可能性があるためです。"
    },

    unableToUpdatePropertyValue: {

      title: "プロパティの値を更新できません",

      generateDescription: (
        {
          targetPropertyDotSeparatedQualifiedName
        }: ThrowableErrors.UnableToUpdatePropertyValue.TemplateVariables
      ): string =>
          `プロパティ "${ targetPropertyDotSeparatedQualifiedName }" に対して、` +
          "デフォルト値の補完または事前修正による更新が要求されましたが、" +
          "このプロパティは読み取り専用であるため、更新できませんでした。\n" +
          "このエラーは、エラーハンドリング戦略 \"onUnableToUnableToUpdatePropertyValue\" が " +
          "\"ErrorHandlingStrategies.warningWithoutMarkingOfDataAsInvalid\" に設定されているため、警告として報告されました。" +
          "ただしこれは推奨されません。なぜなら、出力データが期待と異なるにも関わらず、有効と判定されてしまう可能性があるためです。"
    }

  },

  getLocalizedValueType(valueTypeID: RawObjectDataProcessor.ValuesTypesIDs): string {
    switch (valueTypeID) {
      case RawObjectDataProcessor.ValuesTypesIDs.number: return "数";
      case RawObjectDataProcessor.ValuesTypesIDs.string: return "文字列";
      case RawObjectDataProcessor.ValuesTypesIDs.boolean: return "ブーリアン";

      case RawObjectDataProcessor.ValuesTypesIDs.indexedArray: return "指数配列";
      case RawObjectDataProcessor.ValuesTypesIDs.fixedSchemaObject: return "固定スキーマのオブジェクト";
      case RawObjectDataProcessor.ValuesTypesIDs.associativeArray: return "連想配列型のオブジェクト";
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
