import RawObjectDataProcessor from "./RawObjectDataProcessor";
import Localization = RawObjectDataProcessor.Localization;

import stringifyAndFormatArbitraryValue from "../Strings/stringifyAndFormatArbitraryValue";
import insertSubstring from "../Strings/insertSubstring";


const RawObjectDataProcessorLocalization__English: Localization = {

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

    return `${title}` +
        `\n\n●　Property / element: '${targetPropertyDotSeparatedQualifiedName}'` +
        `${insertSubstring(
          targetPropertyNewName, 
          { modifier: (targetSubstring: string): string => ` (new name: ${targetSubstring})` }
        )}` +
        `\n${specificMessagePart}` +
        `\n\n●　Property / element specification: \n${propertyOrElementSpecification__stringified}` +
        `\n●　Actual value: ${stringifyAndFormatArbitraryValue(targetPropertyValue)}` +
        `${insertSubstring(targetPropertyStringifiedValueBeforeFirstPreValidationModification, {
          modifier: (targetSubstring: string): string => `\n●　Value before first pre-validation modification: ${targetSubstring}`
        })}`;
  },

  buildErrorMessagesListItemHeading(messageNumber: number): string { return `=== Error No. ${messageNumber} ==========`; },

  rawDataIsNullErrorMessage: "Raw data, the first parameter of 'RawObjectDataProcessor.process' is null.",

  buildRawDataIsNotObjectErrorMessage: (actualType: string): string =>
      `Raw data, the first parameter of 'RawObjectDataProcessor.process' an 'object' and actually has type '${actualType}'.`,

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
      specificMessagePart: `This value expected to have type '${this.valueType(targetPropertyValueSpecification.type)}' ` +
          `while actually it's type is '${typeof targetPropertyValue}'.`
    };
  },

  buildPreValidationModificationFailedErrorMessageTextData(thrownError: unknown): Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "Pre-validation caused the error",
      specificMessagePart: "Pre-validation modification of this value caused below error:\n" +
          `${stringifyAndFormatArbitraryValue(thrownError)}\n` +
          "This pre-validation modification has been skipped."
    };
  },


  /* === Requirement =============================================================================================== */
  requiredPropertyIsMissingErrorMessageTextData: {
    title: "Required property is missing",
    specificMessagePart: "This property is 'undefined' while has been marked as required."
  },

  buildConditionallyRequiredPropertyIsMissingErrorMessageTextData(
    verbalRequirementCondition: string
  ): Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "Conditionally required property is missing",
      specificMessagePart: "This value is 'undefined' while requirement condition:\n" +
          `"${verbalRequirementCondition}"\nsatisfied.`
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
      title: "Indexed array has less elements than expected minimum",
      specificMessagePart: `This value of indexed array type has ${actualElementsCount} elements while at least ` +
          `${minimalElementsCount} expected.`
    };
  },

  buildIndexedArrayElementsCountIsMoreThanAllowedMaximumErrorMessageTextData(
    { maximalElementsCount, actualElementsCount }: { maximalElementsCount: number; actualElementsCount: number; }
  ): RawObjectDataProcessor.Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "Indexed array has more elements than expected maximum",
      specificMessagePart: `This value of indexed array type has ${actualElementsCount} elements while ` +
          `maximally ${maximalElementsCount} expected.`
    };
  },

  buildIndexedArrayElementsCountDoesNotMatchWithSpecifiedExactNumberErrorMessageTextData(
    { exactElementsCount, actualElementsCount }: { exactElementsCount: number; actualElementsCount: number; }
  ): RawObjectDataProcessor.Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "The count of elements of indexed array does not match with expected fixed value",
      specificMessagePart: `This value of indexed array type has ${actualElementsCount} elements while ` +
          `exactly ${exactElementsCount} expected.`
    };
  },

  indexedArrayDisallowedUndefinedElementErrorMessageTextData: {
    title: "Disallowed undefined-type element of indexed array",
    specificMessagePart: "This element of indexed array is 'undefined' while undefined-type elements has not been allowed " +
        "by valid element specification."
  },

  indexedArrayDisallowedNullElementErrorMessageTextData: {
    title: "Disallowed null element of indexed array",
    specificMessagePart: "This element of indexed array is 'null' while null elements has not been allowed by valid element " +
        "specification."
  },


  /* === Associative arrays ========================================================================================= */
  buildAssociativeArrayEntriesCountIsLessThanRequiredMinimumErrorMessageTextData(
    { minimalEntriesCount, actualEntriesCount }: { minimalEntriesCount: number; actualEntriesCount: number; }
  ): RawObjectDataProcessor.Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "Associative array has less entries than expected minimum",
      specificMessagePart: `This value of associative array type value has ${actualEntriesCount} entries while at least ` +
          `${minimalEntriesCount} expected.`
    };
  },

  buildAssociativeArrayEntriesCountIsMoreThanAllowedMaximumErrorMessageTextData(
    { maximalEntriesCount, actualEntriesCount }: { maximalEntriesCount: number; actualEntriesCount: number; }
  ): RawObjectDataProcessor.Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "Associative array has more entries than expected maximum",
      specificMessagePart: `This value of associative array-type value has ${actualEntriesCount} entries while maximally ` +
          `${maximalEntriesCount} expected.`
    };
  },

  buildAssociativeArrayEntriesCountDoesNotMatchWithSpecifiedExactNumberErrorMessageTextData(
    { exactEntriesCount, actualEntriesCount }: { exactEntriesCount: number; actualEntriesCount: number; }
  ): RawObjectDataProcessor.Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "The count of entries of associative array does not match with expected fixed value",
      specificMessagePart: `This value of associative array-type value has ${exactEntriesCount} entries while ` +
          `exactly ${actualEntriesCount} expected.`
    };
  },

  buildRequiredKeysOfAssociativeArrayAreMissingErrorMessageTextData(
    missingRequiredKeys: Array<string>
  ): Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "Required key(s) of associative array are missing",
      specificMessagePart: "Below keys are missing but required for this associative array type value:\n" +
          `${stringifyAndFormatArbitraryValue(missingRequiredKeys)}`
    };
  },

  buildRequiredAlternativeKeysOfAssociativeArrayAreMissingErrorMessageTextData(
    requiredKeysAlternatives: Array<string>
  ): Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "Required keys alternatives are missing",
      specificMessagePart: "One of below keys must present in this associative array-type value, but actually none of them " +
          `presents.\n${stringifyAndFormatArbitraryValue(requiredKeysAlternatives)}`
    };
  },

  buildDisallowedKeysFoundInAssociativeArrayErrorMessageTextData(
      foundDisallowedKeys: Array<string>
  ): Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "Disallowed key(s) found in associative array",
      specificMessagePart: "Below keys presents in this associative array type value while these keys are disallowed.\n" +
          `${stringifyAndFormatArbitraryValue(foundDisallowedKeys)}`
    };
  },

  associativeArrayDisallowedUndefinedValueErrorMessageTextData: {
    title: "Disallowed undefined-type value of associative array",
    specificMessagePart: "This value of associative array is 'undefined' while undefined-type values has not been allowed " +
        "by valid value specification."
  },

  associativeArrayDisallowedNullValueErrorMessageTextData: {
    title: "Disallowed null value of associative array",
    specificMessagePart: "This value of associative array is 'null' while null values has not been allowed by valid value " +
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
      specificMessagePart: "Contrary to expectations, this numeric value is in not member of " +
          `'${this.numbersSet(expectedNumberSet)}'`
    };
  },

  valueIsNotAmongAllowedAlternativesErrorMessageTextData: {
    title: "Disallowed alternative of value",
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
      specificMessagePart: `This string value has ${realCharactersCount} characters while at least ` +
          `${minimalCharactersCount} required.`
    };
  },

  buildCharactersCountIsMoreThanAllowedErrorMessageTextData(
    { maximalCharactersCount, realCharactersCount }: { maximalCharactersCount: number; realCharactersCount: number; }
  ): Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "Maximal characters count exceeding",
      specificMessagePart: `This string value has ${realCharactersCount} characters ${maximalCharactersCount} allowed ` +
          "as maximum."
    };
  },

  buildCharactersCountDoesNotMatchWithSpecifiedErrorMessageTextData(
    { fixedCharactersCount, realCharactersCount }: { fixedCharactersCount: number; realCharactersCount: number; }
  ): Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "Fixed characters count mismatch",
      specificMessagePart: `The value has ${realCharactersCount} characters exactly ${fixedCharactersCount} required.`
    };
  },

  buildRegularExpressionMismatchErrorMessageTextData(regularExpression: RegExp): Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "Regular expression mismatch",
      specificMessagePart: `This string value does not match with specified regular expression:\n ${regularExpression.toString()}`
    };
  },

  /* === Other ====================================================================================================== */
  buildDisallowedBooleanValueVariantErrorMessageTextData(
    disallowedVariant: boolean
  ): Localization.TextDataForErrorMessagesBuilding {
    return {
      title: "Disallowed boolean variant",
      specificMessagePart: `This boolean value is '${disallowedVariant}' while only '${!disallowedVariant}' allowed.`
    };
  },

  buildIncompatibleValuesTypesAlternativesErrorDescription(
    targetValueSpecification: RawObjectDataProcessor.MultipleTypesAllowedValueSpecification
  ): string {
    return "The 'ValuesTypesIDs.fixedKeyAndValuePairsObject' (aliased as Object) and " +
        "'ValuesTypesIDs.associativeArrayOfUniformTypeValues' (aliased as Map) are incompatible alternatives of " +
        "'ValuesTypesIDs.oneOf' because from the viewpoint of ECMAScript both are the 'object'. Target value marked " +
        `as invalid. Please correct below specification:\n ${stringifyAndFormatArbitraryValue(targetValueSpecification)}`;
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
      specificMessagePart: `This value did not passed the custom validation "${customValidationDescription}".`
    };
  }
};


export default RawObjectDataProcessorLocalization__English;
