import {
  RawObjectDataProcessor,
  stringifyAndFormatArbitraryValue,
  insertSubstring
} from "@yamato-daiwa/es-extensions";
import Localization = RawObjectDataProcessor.Localization;


const RawObjectDataProcessorLocalization__Japanese: Localization = {

  errorMessageBasicTemplate(
    {
      targetPropertyDotSeparatedQualifiedName,
      targetPropertyNewName,
      targetPropertyValue,
      targetPropertyValueSpecification,
      targetPropertyStringifiedValueBeforeFirstPreValidationModification,
      title,
      specificMessagePart
    }: Localization.DataForMessagesBuilding
  ): string {

    const propertyOrElementSpecification__stringified: string = stringifyAndFormatArbitraryValue({
      ...targetPropertyValueSpecification,
      type: this.valueType(targetPropertyValueSpecification.type)
    });

    return `${ title }` +
        `\n\n●　プロパティ・要素： '${ targetPropertyDotSeparatedQualifiedName }'` +
        `${ insertSubstring(
            targetPropertyNewName,
            { modifier: (targetSubstring: string): string => ` (新名： ${ targetSubstring })` }
        ) }` +
        `\n${ specificMessagePart }` +
        `\n\n●　プロパティ・要素仕様: \n${ propertyOrElementSpecification__stringified }` +
        `\n●　実際値: ${ stringifyAndFormatArbitraryValue(targetPropertyValue) }` +
        `${ insertSubstring(targetPropertyStringifiedValueBeforeFirstPreValidationModification, {
          modifier: (targetSubstring: string): string =>
              `\n●　前妥当性確認の最初の変更の前の値： ${ targetSubstring }`
        }) }`;
  },

  buildErrorMessagesListItemHeading(messageNumber: number): string { return `=== ${ messageNumber }エラー目 ==========`; },

  rawDataIsNullErrorMessage: "'RawObjectDataProcessor.process'の第一引数である生データはnullとなっている。",

  buildRawDataIsNotObjectErrorMessage: (actualType: string): string =>
      `'RawObjectDataProcessor.process'の第一引数である生データ'object'ではなく、'${ actualType }'である。`,

  buildValueTypeDoesNotMatchWithExpectedErrorMessageTextData(
    {
      targetPropertyValue,
      targetPropertyValueSpecification
    }: Pick<Localization.PropertyDataForMessagesBuilding, "targetPropertyValue"> & {
      targetPropertyValueSpecification: Exclude<
          RawObjectDataProcessor.CertainTypeValueSpecification,
          RawObjectDataProcessor.MultipleTypesAllowedValueSpecification
          >;
    }
  ): Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "期待値の型と実際値の型が合わず",
      specificMessagePart: `この値は'${ this.valueType(targetPropertyValueSpecification.type) }型だと期待された、' ` +
          `事実上'${ typeof targetPropertyValue }'となっている.`
    };
  },

  buildPreValidationModificationFailedErrorMessageTextData(thrownError: unknown): Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "前妥当性確認の変形はエラーを起こした",
      specificMessagePart: "この値の前妥当性確認の変形は下記のエラーを起こした。\n" +
          `${ stringifyAndFormatArbitraryValue(thrownError) }\n` +
          "この値の前妥当性確認の変形は飛ばされた。"
    };
  },


  /* === 必須・任意 ==================================================================================================== */
  requiredPropertyIsMissingErrorMessageTextData: {
    title: "必須プロパティ不在",
    specificMessagePart: "このプロパティの値は'undefined'になっているが、必須として指定された。"
  },

  buildConditionallyRequiredPropertyIsMissingErrorMessageTextData(
    verbalRequirementCondition: string
  ): Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "条件的に必須プロパティ不在",
      specificMessagePart: `このプロパティの値は'undefined'になっているが、\n'${ verbalRequirementCondition }'\nという必須性の条件が満たされている。`
    };
  },


  /* === ヌール可 ===================================================================================================== */
  nonNullableValueIsNullErrorMessageTextData: {
    title: "'null'禁止の値は'null'である",
    specificMessagePart: "この値は仕様に'null'が許可されていないが、事実上'null'になっている。"
  },


  /* === 指数配列 ==================================================================================================== */
  buildIndexedArrayElementsCountIsLessThanRequiredMinimumErrorMessageTextData(
    { minimalElementsCount, actualElementsCount }: { minimalElementsCount: number; actualElementsCount: number; }
  ): RawObjectDataProcessor.Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "指数配列の要素数は期待最小要素数と合わず",
      specificMessagePart: `この指数配列型の値は${ actualElementsCount }要素があるが少なくとも${ minimalElementsCount }が期待された。`
    };
  },

  buildIndexedArrayElementsCountIsMoreThanAllowedMaximumErrorMessageTextData(
    { maximalElementsCount, actualElementsCount }: { maximalElementsCount: number; actualElementsCount: number; }
  ): RawObjectDataProcessor.Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "指数配列の要素数は期待最大要素数と合わず",
      specificMessagePart: `この指数配列型の値は${ actualElementsCount }要素があるが最大${ maximalElementsCount }が期待された。`
    };
  },

  buildIndexedArrayElementsCountDoesNotMatchWithSpecifiedExactNumberErrorMessageTextData(
    { exactElementsCount, actualElementsCount }: { exactElementsCount: number; actualElementsCount: number; }
  ): RawObjectDataProcessor.Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "指数配列の要素数は期待固定要素数と合わず",
      specificMessagePart: `この指数配列型の値は${ actualElementsCount }要素があるがちょうど${ exactElementsCount }が期待された。`
    };
  },

  indexedArrayDisallowedUndefinedElementErrorMessageTextData: {
    title: "指数配列の許可されていないundefined型要素",
    specificMessagePart: "此の指数配列型は'undefined'要素が発見されたが、'undefined'型の要素は許可されていない。"
  },

  indexedArrayDisallowedNullElementErrorMessageTextData: {
    title: "指数配列の許可されていないnull要素",
    specificMessagePart: "此の指数配列型は'null'要素が発見されたが、'null'の要素は許可されていない。"
  },

  /* === Associative arrays ========================================================================================= */
  buildAssociativeArrayEntriesCountIsLessThanRequiredMinimumErrorMessageTextData(
    { minimalEntriesCount, actualEntriesCount }: { minimalEntriesCount: number; actualEntriesCount: number; }
  ): RawObjectDataProcessor.Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "連想配列の両数は最小減に達さず",
      specificMessagePart: `此の連想配列型の値は${ actualEntriesCount }両を持っているが、少なくとも${ minimalEntriesCount }が期待。`
    };
  },

  buildAssociativeArrayEntriesCountIsMoreThanAllowedMaximumErrorMessageTextData(
    { maximalEntriesCount, actualEntriesCount }: { maximalEntriesCount: number; actualEntriesCount: number; }
  ): RawObjectDataProcessor.Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "連想配列の両数は最大数を超えている",
      specificMessagePart: `此の連想配列型の値は${ actualEntriesCount }両を持っているが、最大${ maximalEntriesCount }が期待。`
    };
  },

  buildAssociativeArrayEntriesCountDoesNotMatchWithSpecifiedExactNumberErrorMessageTextData(
    { exactEntriesCount, actualEntriesCount }: { exactEntriesCount: number; actualEntriesCount: number; }
  ): RawObjectDataProcessor.Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "連想配列の両数は期待固定数と合わず",
      specificMessagePart: `此の連想配列型の値は${ exactEntriesCount } 両を持っているが、丁度${ actualEntriesCount } が期待。`
    };
  },

  buildRequiredKeysOfAssociativeArrayAreMissingErrorMessageTextData(
      missingRequiredKeys: Array<string>
  ): Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "連想配列の必須キーが欠けている",
      specificMessagePart: "下記のキーが必須にも関わらす、欠けている\n" +
          `${ stringifyAndFormatArbitraryValue(missingRequiredKeys) }`
    };
  },

  buildRequiredAlternativeKeysOfAssociativeArrayAreMissingErrorMessageTextData(
      requiredKeysAlternatives: Array<string>
  ): Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "選択的に必要なキーが欠けている",
      specificMessagePart: "下記のキーの中からいずれかの奴が存在しなければいけないが、どちらも無い。" +
          `presents.\n${ stringifyAndFormatArbitraryValue(requiredKeysAlternatives) }`
    };
  },

  buildDisallowedKeysFoundInAssociativeArrayErrorMessageTextData(
      foundDisallowedKeys: Array<string>
  ): Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "連想配列の禁止キーが発見",
      specificMessagePart: "下記のキーが禁じられているにもかかわらず発見された\n" +
          `${ stringifyAndFormatArbitraryValue(foundDisallowedKeys) }`
    };
  },

  associativeArrayDisallowedUndefinedValueErrorMessageTextData: {
    title: "連想配列の禁じられている「undefined」型の値発見",
    specificMessagePart: "この連想配列の値は明示的「undefined」（無値のキー）になっているが、この様な値は許可されていない。"
  },

  associativeArrayDisallowedNullValueErrorMessageTextData: {
    title: "連想配列の禁じられている「null」型の値発見",
    specificMessagePart: "この連想配列の値は「null」になっているが、この様な値は許可されていない。"
  },


  /* === 値の型 ====================================================================================================== */
  valueType(valueType: Localization.ValuesTypes): string {

    /* [ 理論 ] 基本的に「switch/case」ブロットで「Number」や「String」のようなコンストラクタを正常に処理しているが、出来ない例外もある。
     * https://stackoverflow.com/q/69848208/4818123
     * https://stackoverflow.com/q/69848689/4818123
     *  */
    const targetValueTypeID: RawObjectDataProcessor.ValuesTypesIDs = RawObjectDataProcessor.
        getNormalizedValueTypeID(valueType);

    switch (targetValueTypeID) {
      case RawObjectDataProcessor.ValuesTypesIDs.number: return "数";
      case RawObjectDataProcessor.ValuesTypesIDs.string: return "文字列";
      case RawObjectDataProcessor.ValuesTypesIDs.boolean: return "ブーリアン";
      case RawObjectDataProcessor.ValuesTypesIDs.indexedArrayOfUniformElements: return "一様要素の指数配列";
      case RawObjectDataProcessor.ValuesTypesIDs.fixedKeyAndValuePairsObject: return "固定キー・値両のオブジェクト";
      case RawObjectDataProcessor.ValuesTypesIDs.associativeArrayOfUniformTypeValues: return "一様要素の連想配列";
      case RawObjectDataProcessor.ValuesTypesIDs.oneOf: return "複数型可";
    }
  },

  numbersSet(numberSet: RawObjectDataProcessor.NumbersSets): string {
    switch (numberSet) {
      case RawObjectDataProcessor.NumbersSets.naturalNumber: return "自然数";
      case RawObjectDataProcessor.NumbersSets.nonNegativeInteger: return "非負整数";
      case RawObjectDataProcessor.NumbersSets.negativeInteger: return "負号整数";
      case RawObjectDataProcessor.NumbersSets.negativeIntegerOrZero: return "負号整数・零";
      case RawObjectDataProcessor.NumbersSets.anyInteger: return "陽負不問整数";
      case RawObjectDataProcessor.NumbersSets.positiveDecimalFraction: return "陽号小数";
      case RawObjectDataProcessor.NumbersSets.negativeDecimalFraction: return "負号小数";
      case RawObjectDataProcessor.NumbersSets.decimalFractionOfAnySign: return "陽負不問小数";
      case RawObjectDataProcessor.NumbersSets.anyRealNumber: return "実数";
    }
  },


  /* === 数型値 ====================================================================================================== */
  buildNumberValueIsNotBelongToExpectedNumbersSetErrorMessageTextData(
    expectedNumberSet: RawObjectDataProcessor.NumbersSets
  ): Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "予実数集合不一致",
      specificMessagePart: `期待に反してこの数型の値は「${ this.numbersSet(expectedNumberSet) }」集合に所属していない。`
    };
  },

  valueIsNotAmongAllowedAlternativesErrorMessageTextData: {
    title: "許可されていない選択的値",
    specificMessagePart: "この値は許可されている選択肢の中には無い。"
  },

  buildNumericValueIsSmallerThanRequiredMinimumErrorMessageTextData(
    requiredMinimum: number
  ): Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "最小値未満",
      specificMessagePart: `この値は最小値${ requiredMinimum }に達さず。`
    };
  },

  buildNumericValueIsGreaterThanAllowedMaximumErrorMessageTextData(
    allowedMaximum: number
  ): Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "最大値超え",
      specificMessagePart: `この値は許可されている最大値 ${ allowedMaximum } を超えている。`
    };
  },


  /* === 文字列型値 =================================================================================================== */
  buildCharactersCountIsLessThanRequiredErrorMessageTextData(
    { minimalCharactersCount, realCharactersCount }: { minimalCharactersCount: number; realCharactersCount: number; }
  ): Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "最小文字数未満",
      specificMessagePart: `この文字列型値は ${ realCharactersCount } 文字を持っているが、最少${ minimalCharactersCount } が必要。`
    };
  },

  buildCharactersCountIsMoreThanAllowedErrorMessageTextData(
    { maximalCharactersCount, realCharactersCount }: { maximalCharactersCount: number; realCharactersCount: number; }
  ): Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "最大文字数超え",
      specificMessagePart: `この文字列型値は ${ realCharactersCount } 文字を持っているが、最大 ${ maximalCharactersCount } が許可されている。`
    };
  },

  buildCharactersCountDoesNotMatchWithSpecifiedErrorMessageTextData(
    { fixedCharactersCount, realCharactersCount }: { fixedCharactersCount: number; realCharactersCount: number; }
  ): Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "定められた固定文字数との不一致",
      specificMessagePart: `この文字列型値は ${ realCharactersCount } 文字を持っているが、丁度 ${ fixedCharactersCount } が必要。`
    };
  },

  buildRegularExpressionMismatchErrorMessageTextData(regularExpression: RegExp): Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "正規表現に満たされてない",
      specificMessagePart: `この値は次の正規表現に満たされていない\n ${ regularExpression.toString() }`
    };
  },

  /* === 其の他 ====================================================================================================== */
  buildDisallowedBooleanValueVariantErrorMessageTextData(
    disallowedVariant: boolean
  ): Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "許可されていないブリアン選択肢",
      specificMessagePart: `このブリアン型の値は「${ disallowedVariant }」になっているが、「${ !disallowedVariant }」のみ許可.`
    };
  },

  buildIncompatibleValuesTypesAlternativesErrorDescription(
    targetValueSpecification: RawObjectDataProcessor.MultipleTypesAllowedValueSpecification
  ): string {
    return "値の型「ValuesTypesIDs.fixedKeyAndValuePairsObject」（アリアスは「Object」）と" +
        "「ValuesTypesIDs.associativeArrayOfUniformTypeValues」（アリアスは「Map」）は「ValuesTypesIDs.oneOf」の非相互的選択肢。" +
        "ECMAScript上、両方は「object」である。当値は不正値として指示。" +
        `当値の仕様を御確認下さい。\n ${ stringifyAndFormatArbitraryValue(targetValueSpecification) }`;
  },

  buildUnsupportedValueTypeErrorMessageTextData(
    propertyDataForMessagesBuilding: RawObjectDataProcessor.Localization.PropertyDataForMessagesBuilding
  ): Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "不明値の方",
      specificMessagePart: `当値の${ typeof propertyDataForMessagesBuilding.targetPropertyValue } 型は妥当処理されたJSONになっていない。`
    };
  },

  buildCustomValidationFailedErrorMessageTextData(
    customValidationDescription: string
  ): Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "カスタム妥当性確認は陰性",
      specificMessagePart: `この値はカスタム妥当性確認「${ customValidationDescription }」に落ちた。`
    };
  }
};


export default RawObjectDataProcessorLocalization__Japanese;
