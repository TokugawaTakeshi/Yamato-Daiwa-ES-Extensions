import RawObjectDataProcessor from "./RawObjectDataProcessor";
import Localization = RawObjectDataProcessor.Localization;

import stringifyAndFormatArbitraryValue from "../Strings/stringifyAndFormatArbitraryValue";
import insertSubstring from "../Strings/insertSubstring";
import insertSubstringIf from "../Strings/insertSubstringIf";


const RawObjectDataProcessorLocalization__English: Localization = {

  errorMessageBasicTemplate(
    {
      targetPropertyDotSeparatedQualifiedName,
      targetPropertyNewName,
      targetPropertyValue,
      targetPropertyValueSpecification,
      targetPropertyValueBeforeFirstPreValidationModification,
      mustLogTargetPropertyValueBeforeFirstPreValidationModification,
      title,
      specificMessagePart
    }: Localization.DataForMessagesBuilding
  ): string {

    const propertyOrElementSpecification__stringified: string = stringifyAndFormatArbitraryValue({
      ...targetPropertyValueSpecification,
      type: this.valueType(targetPropertyValueSpecification.type)
    });

    return `${title}` +
        `\n\n●　Property / element: '${targetPropertyDotSeparatedQualifiedName}'` +
        `${insertSubstring(
          targetPropertyNewName, 
          { modifier: (targetSubstring: string): string => ` (new name: ${targetSubstring})` }
        )}` +
        `\n${specificMessagePart}` +
        `\n\n●　Property / element specification: \n${propertyOrElementSpecification__stringified}` +
        `\n●　Actual value: ${stringifyAndFormatArbitraryValue(targetPropertyValue)}` +
        `${insertSubstringIf(
          "\n●　Value before first pre-validation modification: " + 
              `${stringifyAndFormatArbitraryValue(targetPropertyValueBeforeFirstPreValidationModification)}`,
          mustLogTargetPropertyValueBeforeFirstPreValidationModification
        )}`;
  },

  errorMessagesListItemHeadingTemplate(messageNumber: number): string { return `=== Error No. ${messageNumber} ==========`; },

  rawDataIsNullErrorMessage: "The 'rawData' is 'null'.",

  rawDataIsNotObjectErrorMessageTemplate: (actualType: string): string =>
      `The 'rawData' is not an 'object' and actually has type '${actualType}'.`,

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
      title: "Expected and actual value types mismatch",
      specificMessagePart: `This value must have type '${this.valueType(targetPropertyValueSpecification.type)}' ` +
          `while actually it's type is: '${typeof targetPropertyValue}'.`
    };
  },

  buildPreValidationModificationFailedErrorMessageTextData(thrownError: unknown): Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "Pre-validation modification failed",
      specificMessagePart: "Pre-validation modification of this value caused below error:\n" +
          `${stringifyAndFormatArbitraryValue(thrownError)}\n` +
          "This pre-validation modification skipped."
    };
  },


  /* === Requirement =============================================================================================== */
  requiredPropertyIsMissingErrorMessageTextData: {
    title: "Required property is missing",
    specificMessagePart: "This property has been marked as 'required' while actual value is 'undefined'."
  },

  buildConditionallyRequiredPropertyIsMissingErrorMessageTextData(
    requirementConditionDescription: string
  ): Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "Conditionally required property is missing",
      specificMessagePart: "This value is 'undefined' while requirement condition:\n" +
          `"${requirementConditionDescription}"\nsatisfied.`
    };
  },


  /* === Nullability ================================================================================================ */
  nonNullableValueIsNullErrorMessageTextData: {
    title: "Non-nullable value is 'null'",
    specificMessagePart: "This value is 'null' while nullability has not been permitted by valid data specification."
  },


  /* === Indexed arrays ============================================================================================= */
  buildIndexedArrayElementsCountIsLessThanRequiredMinimumErrorMessageTextData(
    { minimalElementsCount, actualElementsCount }: { minimalElementsCount: number; actualElementsCount: number; }
  ): RawObjectDataProcessor.Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "Indexed array elements count is less than required minimum",
      specificMessagePart: `This array-type value has ${actualElementsCount} elements while at least ${minimalElementsCount} ` +
          "elements required."
    };
  },

  buildIndexedArrayElementsCountIsMoreThanAllowedMaximumErrorMessageTextData(
    { maximalElementsCount, actualElementsCount }: { maximalElementsCount: number; actualElementsCount: number; }
  ): RawObjectDataProcessor.Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "Indexed array elements count is exceeding the allowed maximum",
      specificMessagePart: `This array-type value has ${actualElementsCount} elements while maximum ${maximalElementsCount} ` +
          "is allowed"
    };
  },

  buildIndexedArrayElementsCountDoesNotMatchWithSpecifiedExactNumberErrorMessageTextData(
    { exactElementsCount, actualElementsCount }: { exactElementsCount: number; actualElementsCount: number; }
  ): RawObjectDataProcessor.Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "Indexed array elements count does not match with specified exact number",
      specificMessagePart: `This array-type must have exactly ${exactElementsCount} elements while actually has ` +
          `${actualElementsCount} elements.`
    };
  },

  indexedArrayDisallowedUndefinedElementErrorMessageTextData: {
    title: "Indexed array disallowed undefined-type element",
    specificMessagePart: "This indexed array element is 'undefined' while undefined-type elements has not been allowed " +
        "by valid element specification."
  },

  indexedArrayDisallowedNullElementErrorMessageTextData: {
    title: "Indexed array disallowed null element",
    specificMessagePart: "This indexed array element is 'null' while null elements has not been allowed by valid element " +
        "specification."
  },


  /* === Associative arrays ========================================================================================= */
  buildAssociativeArrayEntriesCountIsLessThanRequiredMinimumErrorMessageTextData(
    { minimalEntriesCount, actualEntriesCount }: { minimalEntriesCount: number; actualEntriesCount: number; }
  ): RawObjectDataProcessor.Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "Associative array entries count is less than required minimum",
      specificMessagePart: `This associative array-type value has ${actualEntriesCount} entries while at least ` +
          `${minimalEntriesCount} entries required.`
    };
  },

  buildAssociativeArrayEntriesCountIsMoreThanAllowedMaximumErrorMessageTextData(
    { maximalEntriesCount, actualEntriesCount }: { maximalEntriesCount: number; actualEntriesCount: number; }
  ): RawObjectDataProcessor.Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "Associative array entries count is exceeding the allowed maximum",
      specificMessagePart: `This associative array-type value has ${actualEntriesCount} entries while maximum ` +
          `${maximalEntriesCount} entries is allowed`
    };
  },

  buildAssociativeArrayEntriesCountDoesNotMatchWithSpecifiedExactNumberErrorMessageTextData(
    { exactEntriesCount, actualEntriesCount }: { exactEntriesCount: number; actualEntriesCount: number; }
  ): RawObjectDataProcessor.Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "Associative array entries count does not match with specified exact number",
      specificMessagePart: `This associative array-type value must have exactly ${exactEntriesCount} entries while ` +
          `actually has ${actualEntriesCount} entries.`
    };
  },

  buildRequiredKeysOfAssociativeArrayAreMissingErrorMessageTextData(
    missingRequiredKeys: Array<string>
  ): Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "Required key(s) of associative array are missing",
      specificMessagePart: "Below keys are missing but required for this associative array type value:\n" +
          `${JSON.stringify(missingRequiredKeys, null, 2)}`
    };
  },

  buildRequiredAlternativeKeysOfAssociativeArrayAreMissingErrorMessageTextData(
    requiredKeysAlternatives: Array<string>
  ): Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "Required keys alternatives are missing",
      specificMessagePart: "One of below keys must be in this associative array-type value, but actually none of those " +
          `presents.\n${JSON.stringify(requiredKeysAlternatives, null, 2)}`
    };
  },

  buildDisallowedKeysFoundInAssociativeArrayErrorMessageTextData(
      foundDisallowedKeys: Array<string>
  ): Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "Disallowed key(s) presents in associative array",
      specificMessagePart: "Below keys presents in this associative array-type value while these keys are disallowed\n" +
          `${JSON.stringify(foundDisallowedKeys, null, 2)}`
    };
  },

  associativeArrayDisallowedUndefinedValueErrorMessageTextData: {
    title: "Associative array disallowed undefined-type value",
    specificMessagePart: "This associative array element is 'undefined' while undefined-type values has not been allowed " +
        "by valid value specification."
  },

  associativeArrayDisallowedNullValueErrorMessageTextData: {
    title: "Associative array disallowed null value",
    specificMessagePart: "This associative array element is 'null' while null values has not been allowed by valid value " +
        "specification."
  },


  /* === Value type ================================================================================================= */
  valueType(valueType: Localization.ValuesTypes): string {

    /* [ Theory ] Basically, the switch/case including Number/String/etc constructor is working, but there are some exceptions.
    * https://stackoverflow.com/q/69848208/4818123
    * https://stackoverflow.com/q/69848689/4818123
    *  */
    const targetValueTypeID: RawObjectDataProcessor.ValuesTypesIDs = RawObjectDataProcessor.
        getNormalizedValueTypeID(valueType);

    switch (targetValueTypeID) {

      case RawObjectDataProcessor.ValuesTypesIDs.number: return "number";
      case RawObjectDataProcessor.ValuesTypesIDs.string: return "string";
      case RawObjectDataProcessor.ValuesTypesIDs.boolean: return "boolean";

      case RawObjectDataProcessor.ValuesTypesIDs.indexedArrayOfUniformElements:
        return "indexed array of uniform elements";

      case RawObjectDataProcessor.ValuesTypesIDs.fixedKeyAndValuePairsObject:
        return "filed key and value pairs object";

      case RawObjectDataProcessor.ValuesTypesIDs.associativeArrayOfUniformTypeValues:

        return "associative array of uniform type values";

      case RawObjectDataProcessor.ValuesTypesIDs.oneOf: return "multiple alternatives allowed";

      default: return "UNKNOWN";
    }
  },

  numbersSet(numberSet: RawObjectDataProcessor.NumbersSets): string {
    switch (numberSet) {
      case RawObjectDataProcessor.NumbersSets.naturalNumber: return "natural number";
      case RawObjectDataProcessor.NumbersSets.nonNegativeInteger: return "non-negative integer";
      case RawObjectDataProcessor.NumbersSets.negativeInteger: return "negative integer";
      case RawObjectDataProcessor.NumbersSets.negativeIntegerOrZero: return "negative integer of zero";
      case RawObjectDataProcessor.NumbersSets.anyInteger: return "any integer";
      case RawObjectDataProcessor.NumbersSets.positiveDecimalFraction: return "positive decimal fraction";
      case RawObjectDataProcessor.NumbersSets.negativeDecimalFraction: return "negative decimal fraction";
      case RawObjectDataProcessor.NumbersSets.decimalFractionOfAnySign: return "decimal fraction on any sign";
      case RawObjectDataProcessor.NumbersSets.anyRealNumber: return "any real number";
    }
  },


  /* === Numeric value =============================================================================================== */
  buildNumberValueIsNotBelongToExpectedNumbersSetErrorMessageTextData(
    expectedNumberSet: RawObjectDataProcessor.NumbersSets
  ): Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "Expected and actual numbers set mismatch",
      specificMessagePart: `This numeric value is in not member of '${this.numbersSet(expectedNumberSet)}' set as required.`
    };
  },

  valueIsNotAmongAllowedAlternativesErrorMessageTextData: {
    title: "Disallowed value alternative",
    specificMessagePart: "This value is not among allowed alternatives."
  },

  buildNumericValueIsSmallerThanRequiredMinimumErrorMessageTextData(
    requiredMinimum: number
  ): Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "Minimal value fall short",
      specificMessagePart: `This value is smaller than required minimal value ${requiredMinimum}.`
    };
  },

  buildNumericValueIsGreaterThanAllowedMaximumErrorMessageTextData(
    allowedMaximum: number
  ): Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "Maximal numeric value exceeding",
      specificMessagePart: `This value is greater than required maximal value ${allowedMaximum}.`
    };
  },


  /* === String value =============================================================================================== */
  buildCharactersCountIsLessThanRequiredErrorMessageTextData(
    { minimalCharactersCount, realCharactersCount }: { minimalCharactersCount: number; realCharactersCount: number; }
  ): Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "Minimal characters count fall short",
      specificMessagePart: `This string value has ${realCharactersCount} characters while required minimal characters ` +
          `count is ${minimalCharactersCount}.`
    };
  },

  buildCharactersCountIsMoreThanAllowedErrorMessageTextData(
    { maximalCharactersCount, realCharactersCount }: { maximalCharactersCount: number; realCharactersCount: number; }
  ): Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "Maximal characters count exceeding",
      specificMessagePart: `This string value has ${realCharactersCount} characters while allowed maximal characters ` +
          ` count is ${maximalCharactersCount}.`
    };
  },

  buildCharactersCountDoesNotMatchWithSpecifiedErrorMessageTextData(
    { fixedCharactersCount, realCharactersCount }: { fixedCharactersCount: number; realCharactersCount: number; }
  ): Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "Fixed characters count mismatch",
      specificMessagePart: `The value has ${realCharactersCount} character while must be exactly ${fixedCharactersCount} ` +
          "characters."
    };
  },

  buildRegularExpressionMismatchErrorMessageTextData(regularExpression: RegExp): Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "Regular expression mismatch",
      specificMessagePart: `This value does not match with specified regular expression:\n ${regularExpression.toString()}`
    };
  },

  /* === Other ====================================================================================================== */
  buildDisallowedBooleanValueVariantErrorMessageTextData(
    disallowedVariant: boolean
  ): Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "Disallowed boolean variant",
      specificMessagePart: `This value is '${!disallowedVariant}' while only '${disallowedVariant}' allowed`
    };
  },

  buildIncompatibleValuesTypesAlternativesErrorDescription(
    targetValueSpecification: RawObjectDataProcessor.MultipleTypesAllowedValueSpecification
  ): string {
    return "The 'ValuesTypesIDs.fixedKeyAndValuePairsObject' (aliased as Object) and " +
        "'ValuesTypesIDs.associativeArrayOfUniformTypeValues' (aliased as Map) are incompatible alternatives of " +
        "'ValuesTypesIDs.oneOf' because from the viewpoint of ECMAScript both are the 'object'. Target value marked " +
        "as invalid." +
        `\n●　Value specification: \n${stringifyAndFormatArbitraryValue(targetValueSpecification)}`;
  },

  buildUnsupportedValueTypeErrorMessageTextData(
    propertyDataForMessagesBuilding: RawObjectDataProcessor.Localization.PropertyDataForMessagesBuilding
  ): Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "Unsupported value type",
      specificMessagePart: `This value has type ${typeof propertyDataForMessagesBuilding.targetPropertyValue} which is ` +
          "not a valid parsed JSON"
    };
  },

  buildCustomValidationFailedErrorMessageTextData(
    customValidationDescription: string
  ): Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "Custom validation did not passed",
      specificMessagePart: `The custom validation:\n ${customValidationDescription}\n did not passed for current value`
    };
  }
};


export default RawObjectDataProcessorLocalization__English;
