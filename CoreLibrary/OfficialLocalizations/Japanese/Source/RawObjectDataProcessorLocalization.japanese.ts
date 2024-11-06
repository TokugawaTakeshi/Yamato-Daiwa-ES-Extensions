import {
  RawObjectDataProcessor,
  stringifyAndFormatArbitraryValue,
  insertSubstring
} from "@yamato-daiwa/es-extensions";
import Localization = RawObjectDataProcessor.Localization;


export const rawObjectDataProcessorLocalization__japanese: Localization = {

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

    return title +
        `\n\n●　プロパティ・要素： '${ targetPropertyDotSeparatedQualifiedName }'` +
        insertSubstring(
          targetPropertyNewName,
          { modifier: (targetSubstring: string): string => ` (新名： ${ targetSubstring })` }
        ) +
        `\n${ specificMessagePart }` +
        `\n\n●　プロパティ・要素仕様: \n${ propertyOrElementSpecification__stringified }` +
        `\n●　実際値: ${ stringifyAndFormatArbitraryValue(targetPropertyValue) }` +
        insertSubstring(targetPropertyStringifiedValueBeforeFirstPreValidationModification, {
          modifier: (targetSubstring: string): string =>
              `\n●　妥当性確認の前段階処理で変更される以前の初期値： ${ targetSubstring }`
        });

  },

  buildErrorMessagesListItemHeading(messageNumber: number): string { return `=== ${ messageNumber }エラー目 ==========`; },

  rawDataIsNullErrorMessage: "'RawObjectDataProcessor.process'の第一引数である生データがnullになっている。",

  buildRawDataIsNotObjectErrorMessage: (actualType: string): string =>
      `'RawObjectDataProcessor.process'の第一引数である生データが'object'ではなく、'${ actualType }'になっている。`,

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
      title: "期待される値の型と実際の値の型が合っていない",
      specificMessagePart: `この値は'${ this.valueType(targetPropertyValueSpecification.type) }型が期待されるが、' ` +
          `実際の値は'${ typeof targetPropertyValue }'となっている.`
    };
  },

  buildPreValidationModificationFailedErrorMessageTextData(thrownError: unknown): Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "妥当性確認の前段階処理のエラー",
      specificMessagePart: "この値の妥当性確認の前段階処理で、何らかのエラーが発生した。\n" +
          `${ stringifyAndFormatArbitraryValue(thrownError) }\n` +
          "この値の妥当性確認の前段階処理は正常に行われなかった。"
    };
  },


  /* === 必須・任意 ==================================================================================================== */
  requiredPropertyIsMissingErrorMessageTextData: {
    title: "必須プロパティ不在",
    specificMessagePart: "このプロパティの値は必須であるが、'undefined'になっている。"
  },

  buildConditionallyRequiredPropertyIsMissingErrorMessageTextData(
    verbalRequirementCondition: string
  ): Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "必須条件プロパティの未定義",
      specificMessagePart: `このプロパティは\n'${ verbalRequirementCondition }'\nの条件指定により定義が必須だが、'undefined'になっている。`
    };
  },


  /* === nullの可否 ================================================================================================== */
  nonNullableValueIsNullErrorMessageTextData: {
    title: "許可されていない'null'",
    specificMessagePart: "この値は、許可されていない'null'になっている。"
  },


  /* === 指数配列 ==================================================================================================== */
  buildIndexedArrayElementsCountIsLessThanRequiredMinimumErrorMessageTextData(
    { minimalElementsCount, actualElementsCount }: { minimalElementsCount: number; actualElementsCount: number; }
  ): RawObjectDataProcessor.Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "指数配列要素数の最低条件未満",
      specificMessagePart: `この指数配列は最低${ minimalElementsCount }以上の要素数が必要だが、${ actualElementsCount }しかない。`
    };
  },

  buildIndexedArrayElementsCountIsMoreThanAllowedMaximumErrorMessageTextData(
    { maximalElementsCount, actualElementsCount }: { maximalElementsCount: number; actualElementsCount: number; }
  ): RawObjectDataProcessor.Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "指数配列要素数の最大条件超過",
      specificMessagePart: `この指数配列は最大${ maximalElementsCount }以下の要素数に収めなくてはならないが、${ actualElementsCount }もある。`
    };
  },

  buildIndexedArrayElementsCountDoesNotMatchWithSpecifiedExactNumberErrorMessageTextData(
    { exactElementsCount, actualElementsCount }: { exactElementsCount: number; actualElementsCount: number; }
  ): RawObjectDataProcessor.Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "指数配列要素数の指定条件不整合",
      specificMessagePart: `この指数配列は要素数が${ exactElementsCount }でなくてはならないが、${ actualElementsCount }になっている。`
    };
  },

  indexedArrayDisallowedUndefinedElementErrorMessageTextData: {
    title: "許可されていない undefined の存在",
    specificMessagePart: "この指数配列には、許可されていない'undefined'要素が存在している。"
  },

  indexedArrayDisallowedNullElementErrorMessageTextData: {
    title: "許可されていない null の存在",
    specificMessagePart: "この指数配列には、許可されていない'null'要素が存在している。"
  },

  /* === 連想配列 ==================================================================================================== */
  buildAssociativeArrayEntriesCountIsLessThanRequiredMinimumErrorMessageTextData(
    { minimalEntriesCount, actualEntriesCount }: { minimalEntriesCount: number; actualEntriesCount: number; }
  ): RawObjectDataProcessor.Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "必要最小数に満たない組数",
      specificMessagePart: `この連想配列は${ actualEntriesCount }組のキー・値で構成されているが、最低${ minimalEntriesCount }組以上必要である。`
    };
  },

  buildAssociativeArrayEntriesCountIsMoreThanAllowedMaximumErrorMessageTextData(
    { maximalEntriesCount, actualEntriesCount }: { maximalEntriesCount: number; actualEntriesCount: number; }
  ): RawObjectDataProcessor.Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "最大数を超過している組数",
      specificMessagePart: `この連想配列は${ actualEntriesCount }組のキー・値で構成されているが、最大${ maximalEntriesCount }組以下でなくてはならない。`
    };
  },

  buildAssociativeArrayEntriesCountDoesNotMatchWithSpecifiedExactNumberErrorMessageTextData(
    { exactEntriesCount, actualEntriesCount }: { exactEntriesCount: number; actualEntriesCount: number; }
  ): RawObjectDataProcessor.Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "指定条件と一致しない組数",
      specificMessagePart: `この連想配列は正確に${ exactEntriesCount }組のキー・値でなくてはいけないが、実際は${ actualEntriesCount }組で構成されている。`
    };
  },

  buildRequiredKeysOfAssociativeArrayAreMissingErrorMessageTextData(
    missingRequiredKeys: Array<string>
  ): Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "必須キーの未定義",
      specificMessagePart: "下記の必須キーが定義されていない。\n" +
          stringifyAndFormatArbitraryValue(missingRequiredKeys)
    };
  },

  buildRequiredAlternativeKeysOfAssociativeArrayAreMissingErrorMessageTextData(
    requiredKeysAlternatives: ReadonlyArray<string>
  ): Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "選択式必須キーの未定義",
      specificMessagePart: "下記のいずれかの必須キーが定義されていない。\n" +
          stringifyAndFormatArbitraryValue(requiredKeysAlternatives)
    };
  },

  buildDisallowedKeysFoundInAssociativeArrayErrorMessageTextData(
      foundDisallowedKeys: Array<string>
  ): Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "禁止キーの使用",
      specificMessagePart: "この連想配列で、下記の使用禁止キーが発見された。\n" +
          stringifyAndFormatArbitraryValue(foundDisallowedKeys)
    };
  },

  associativeArrayDisallowedUndefinedValueErrorMessageTextData: {
    title: "禁止されている「undefined」型の存在",
    specificMessagePart: "この連想配列に、禁止されている「undefined」型の値が含まれている。"
  },

  associativeArrayDisallowedNullValueErrorMessageTextData: {
    title: "禁止されている「null」型の存在",
    specificMessagePart: "この連想配列に。禁止されている「null」型の値が含まれている。"
  },


  /* === 値の型 ====================================================================================================== */
  valueType(valueType: Localization.ValuesTypes): string {

    /* [ 理論 ] 基本的に「switch/case」文で「Number」や「String」のようなコンストラクタを正常処理しているが、処理不可能な例外もある。
     * https://stackoverflow.com/q/69848208/4818123
     * https://stackoverflow.com/q/69848689/4818123
     *  */
    const targetValueTypeID: RawObjectDataProcessor.ValuesTypesIDs = RawObjectDataProcessor.
        getNormalizedValueTypeID(valueType);

    switch (targetValueTypeID) {
      case RawObjectDataProcessor.ValuesTypesIDs.number: return "数";
      case RawObjectDataProcessor.ValuesTypesIDs.string: return "文字列";
      case RawObjectDataProcessor.ValuesTypesIDs.boolean: return "ブーリアン";
      case RawObjectDataProcessor.ValuesTypesIDs.indexedArrayOfUniformElements: return "同一要素の指数配列";
      case RawObjectDataProcessor.ValuesTypesIDs.fixedKeyAndValuePairsObject: return "固定キーと値のオブジェクト";
      case RawObjectDataProcessor.ValuesTypesIDs.associativeArrayOfUniformTypeValues: return "同一要素の連想配列";
      case RawObjectDataProcessor.ValuesTypesIDs.oneOf: return "複数型可";
    }
  },

  numbersSet(numberSet: RawObjectDataProcessor.NumbersSets): string {
    switch (numberSet) {
      case RawObjectDataProcessor.NumbersSets.naturalNumber: return "自然数";
      case RawObjectDataProcessor.NumbersSets.nonNegativeInteger: return "正の整数";
      case RawObjectDataProcessor.NumbersSets.negativeInteger: return "負の整数";
      case RawObjectDataProcessor.NumbersSets.negativeIntegerOrZero: return "負の整数・0";
      case RawObjectDataProcessor.NumbersSets.anyInteger: return "正負不問の整数";
      case RawObjectDataProcessor.NumbersSets.positiveDecimalFraction: return "正の小数";
      case RawObjectDataProcessor.NumbersSets.negativeDecimalFraction: return "負の小数";
      case RawObjectDataProcessor.NumbersSets.decimalFractionOfAnySign: return "正負不問の小数";
      case RawObjectDataProcessor.NumbersSets.anyRealNumber: return "実数";
    }
  },


  /* === 数値型の値 ====================================================================================================== */
  buildNumberValueIsNotBelongToExpectedNumbersSetErrorMessageTextData(
    expectedNumberSet: RawObjectDataProcessor.NumbersSets
  ): Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "期待される集合に属さない数値",
      specificMessagePart: `この数値型の値は「${ this.numbersSet(expectedNumberSet) }」集合に属していない。`
    };
  },

  buildValueIsNotAmongAllowedAlternativesErrorMessageTextData(
    allowedAlternatives: ReadonlyArray<string>
  ): Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "許可されていない選択肢",
      specificMessagePart:
          "この値は、下記の許可されている選択肢の中に含まれていない。\n" +
          allowedAlternatives.map((allowedAlternative: string): string => `  ○ ${ allowedAlternative }`).join("\n")
    };
  },

  buildNumericValueIsSmallerThanRequiredMinimumErrorMessageTextData(
    requiredMinimum: number
  ): Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "最小値未満",
      specificMessagePart: `この値は最小値${ requiredMinimum }を満たしていない。`
    };
  },

  buildNumericValueIsGreaterThanAllowedMaximumErrorMessageTextData(
    allowedMaximum: number
  ): Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "最大値超過",
      specificMessagePart: `この値は最大値${ allowedMaximum }を超過している。`
    };
  },


  /* === 文字列型の値 =================================================================================================== */
  buildCharactersCountIsLessThanRequiredErrorMessageTextData(
    { minimalCharactersCount, realCharactersCount }: { minimalCharactersCount: number; realCharactersCount: number; }
  ): Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "最低文字数未満",
      specificMessagePart: `この文字列型の値は${ realCharactersCount }文字であるが、最低${ minimalCharactersCount }文字が必要。`
    };
  },

  buildCharactersCountIsMoreThanAllowedErrorMessageTextData(
    { maximalCharactersCount, realCharactersCount }: { maximalCharactersCount: number; realCharactersCount: number; }
  ): Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "最大文字数超過",
      specificMessagePart: `この文字列型の値は${ realCharactersCount } 文字であるが、最大${ maximalCharactersCount }文字以下でなくてはならない。`
    };
  },

  buildCharactersCountDoesNotMatchWithSpecifiedErrorMessageTextData(
    { fixedCharactersCount, realCharactersCount }: { fixedCharactersCount: number; realCharactersCount: number; }
  ): Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "指定文字数との不一致",
      specificMessagePart: `この文字列型の値は${ realCharactersCount }文字であるが、正確に${ fixedCharactersCount }文字でなくてはならない。`
    };
  },

  buildRegularExpressionMismatchErrorMessageTextData(regularExpression: RegExp): Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "正規表現を満たしていない",
      specificMessagePart: `この値は、次の正規表現を満たしていない。\n ${ regularExpression.toString() }`
    };
  },

  /* === 其の他 ====================================================================================================== */
  buildDisallowedBooleanValueVariantErrorMessageTextData(
    disallowedVariant: boolean
  ): Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "許可されていないブリアン選択肢",
      specificMessagePart: `このブリアン型の値は「${ disallowedVariant }」であるが、「${ !disallowedVariant }」のみ許可されている。`
    };
  },

  buildIncompatibleValuesTypesAlternativesErrorDescription(
    targetValueSpecification: RawObjectDataProcessor.MultipleTypesAllowedValueSpecification
  ): string {
    return "値の型「ValuesTypesIDs.fixedKeyAndValuePairsObject」（エイリアスは「Object」）と" +
        "「ValuesTypesIDs.associativeArrayOfUniformTypeValues」（エイリアスは「Map」）は、「ValuesTypesIDs.oneOf」の非相互的選択肢。" +
        "ECMAScript上、両方は「object」であり不正値として指示。" +
        `当値の仕様を御確認下さい。\n ${ stringifyAndFormatArbitraryValue(targetValueSpecification) }`;
  },

  buildUnsupportedValueTypeErrorMessageTextData(
    propertyDataForMessagesBuilding: RawObjectDataProcessor.Localization.PropertyDataForMessagesBuilding
  ): Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "不明値の型",
      specificMessagePart: `この値の ${ typeof propertyDataForMessagesBuilding.targetPropertyValue } 型は妥当処理されたJSONになっていない。`
    };
  },

  buildCustomValidationFailedErrorMessageTextData(
    customValidationDescription: string
  ): Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "カスタム妥当性確認の不適合",
      specificMessagePart: `この値は、カスタム妥当性確認「${ customValidationDescription }」に適合しない。`
    };
  }
};
