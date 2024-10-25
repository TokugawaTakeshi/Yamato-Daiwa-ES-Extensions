import RawObjectDataProcessor from "./RawObjectDataProcessor";
import Localization = RawObjectDataProcessor.Localization;
import ValidationErrors = Localization.ValidationErrors;
import ThrowableErrors = Localization.ThrowableErrors;
import Warnings = Localization.Warnings;

import stringifyAndFormatArbitraryValue from "../Strings/stringifyAndFormatArbitraryValue";
import isNotUndefined from "../TypeGuards/Nullables/isNotUndefined";


const rawObjectDataProcessorLocalization__english: Localization = {

  generateValidationErrorMessage(
    {
      title,
      targetPropertyDotSeparatedQualifiedInitialName,
      targetPropertyNewName,
      description,
      targetPropertyValueSpecification,
      targetPropertyValue,
      targetPropertyStringifiedValueBeforeFirstPreValidationModification
    }: Localization.DataForMessagesBuilding
  ): string {
    return [
      title,
      `\n\n● Property / Element: "${ targetPropertyDotSeparatedQualifiedInitialName }"`,
      ...isNotUndefined(targetPropertyNewName) ? [ ` (new name: "${ targetPropertyNewName }")` ] : [],
      `\n${ description }`,
      "\n\n●　Property / Element Specification: ",
      `\n${
        stringifyAndFormatArbitraryValue({
          ...targetPropertyValueSpecification,
          type: this.getLocalizedValueType(targetPropertyValueSpecification.type)
        }) 
      }`,
      `\n● Actual Value: ${ stringifyAndFormatArbitraryValue(targetPropertyValue) }`,
      ...isNotUndefined(targetPropertyStringifiedValueBeforeFirstPreValidationModification) ? [
        "\n●　Value Before First Pre-validation Modification: " +
            targetPropertyStringifiedValueBeforeFirstPreValidationModification
      ] : []
    ].join("");
  },

  generateLanguageDependentErrorNumberHeadingPart({ messageNumber }: Readonly<{ messageNumber: number; }>): string {
    return `Error No. ${ messageNumber }`;
  },


  /* ━━━ Validation Errors ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  /* [ To Editor ]
   * Most of the following messages will be the part of above `generateValidationErrorMessage` template.
   * So, even the ambiguous expressions like "this property" will be clear as the part of above template. */
  validationErrors: {

    rawDataIsNull: "Raw data, the first parameter of \"RawObjectDataProcessor.process()\" is null.",

    rawDataIsNotObject: {
      generateMessage: ({ actualType }: ValidationErrors.RawDataIsNotObject.TemplateVariables): string =>
          `Raw data, the first parameter of "RawObjectDataProcessor.process" is not the object and actually has type 
            "${ actualType }".`
    },

    valueTypeDoesNotMatchWithExpected: {
      title: "Expected and Actual Value Types Mismatch",
      generateDescription(
        { expectedType, actualType }: ValidationErrors.ValueTypeDoesNotMatchWithExpected.TemplateVariables
      ): string {
        return "This value expected to have type " +
            `"${ rawObjectDataProcessorLocalization__english.getLocalizedValueType(expectedType) }" while actually ` +
            `it's type is "${ actualType }".`;
      }
    },

    preValidationModificationFailed: {

      title: "Pre-validation Modification Failed",

      generateDescription: (
        { stringifiedCaughtError }: ValidationErrors.PreValidationModificationFailed.TemplateVariables
      ): string =>
          "The following error has occurred during the pre-validation modification of this property. \n" +
          `${ stringifiedCaughtError }\n` +
          "The data has been marked as invalid because the error handling strategy \"onPreValidationModificationFailed\" " +
            "is \"ErrorHandlingStrategies.markingOfDataAsInvalid\" what is not recommended because the problem could " +
            "be in pre-validation modification function, not always in data. " +
          "Also, most likely this strategy will cause the subsequent errors. " +
          "It is recommended to set the strategy to \"ErrorHandlingStrategies.throwingOfError\" which is default and " +
            "fix the pre-validation modification function."

    },

    /* ─── Requirement ────────────────────────────────────────────────────────────────────────────────────────────── */
    requiredPropertyIsMissing: {
      title: "Required Property is Missing",
      description: "This property is \"undefined\" while has been marked as required."
    },

    conditionallyRequiredPropertyIsMissing: {

      title: "Conditionally Required Property is Missing",

      generateDescription: (
        { requirementCondition }: ValidationErrors.ConditionallyRequiredPropertyIsMissing.TemplateVariables
      ): string =>
          `This value is "undefined" while requirement condition "${ requirementCondition }" satisfied.`

    },

    unableToDeletePropertyWithOutdatedKey: {

      title: "Unable to Delete Property With Outdated Key",

      description:
          "The renaming of this property has been requested. " +
          "If \"processingApproach\" option has been set to \"ProcessingApproaches.manipulationsWithSourceObject\", it " +
            "means the defining of new property and, while \"mustLeaveEvenRenamed\" option has not been specified with " +
            "\"true\" boolean value for target property, the deleting of the outdated one. " +
          "However, the target property is not configurable (https://developer.mozilla.org/en-US/docs/Web/JavaScript/" +
            "Reference/Global_Objects/Object/defineProperty#configurable) thus could not be deleted.\n" +
          "The data has been marked as invalid because the error handling strategy " +
            "\"onUnableToDeletePropertyWithOutdatedValue\" is \"ErrorHandlingStrategies.markingOfDataAsInvalid\" what " +
            "is recommended only if this property on source data actually expected to be configurable " +
            "(thus deletable). " +
          "But, if you have not the control on source data and it could be guaranteed that the source data is " +
            "configurable, basically one of two following measures left:" +
          "● If it is fine to keep the old property alongside with the new one, set \"mustLeaveEvenRenamed\" option to " +
            "\"true\" for this property.\n" +
          "● If the creating of new object based on the source one is fine, specify \"processingApproach\" option " +
          "  option with `ProcessingApproaches.assemblingOfNewObject` value, herewith everything that was " +
          "  not specified via valid data specification will not be added to new object."

    },

    unableToSubstituteUndefinedPropertyValue: {

      title: "Unable to Substitute Undefined Property Value",

      description:
          "This property has been requested to be substitute with default value when it is not defined or has explicit " +
            "`undefined` value. " +
          "The second case has occurred, but because this property is not writable, the default value could not be " +
            "substituted. " +
          "The data has been marked as invalid because the error handling strategy " +
            "\"onUnableToSubstituteUndefinePropertyValue\" is \"ErrorHandlingStrategies.markingOfDataAsInvalid\" what " +
            "is recommended only if this property on source data actually expected to be writable. " +
          "But, if you have not the control on source data and it could be guaranteed that the source data is writable, " +
            "the following measures left:" +
          "● If the creating of new object based on the source one is fine, specify \"processingApproach\" option " +
            "option with `ProcessingApproaches.assemblingOfNewObject` value, herewith everything that was " +
            "not specified via valid data specification will not be added to new object." +
          "● If none of above solutions are satisfying with your requirements, it means you can not write this property " +
            "neither by RawObjectDataProcessor nor manually by assignment. You can prepare the default value outside of " +
            "the processed object, or rename this property, or add the getter by post validation modifications."

    }

  },


  /* ━━━ Throwable Errors ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  throwableErrors: {

    preValidationModificationFailed: {

      title: "Pre-validation Modification Failed",

      generateDescription: (
        { targetPropertyDotSeparatedQualifiedName }: ThrowableErrors.PreValidationModificationFailed.TemplateVariables
      ): string =>
          "The error has occurred during the pre-validation modification of property " +
            `"${ targetPropertyDotSeparatedQualifiedName }". ` +
          "This error has been thrown because the error handling strategy \"onPreValidationModificationFailed\" is " +
            "\"ErrorHandlingStrategies.throwingOfError\" which is default. " +
          "It is recommended to keep this strategy and fix the pre-validation modification function."

    },

    unableToDeletePropertyWithOutdatedKey: {

      title: "Unable to Delete Property With Outdated Key",

      generateDescription: (
        {
          targetPropertyDotSeparatedQualifiedName,
          propertyNewKey
        }: ThrowableErrors.UnableToDeletePropertyWithOutdatedKey.TemplateVariables
      ): string =>
          `The renaming of the property "${ targetPropertyDotSeparatedQualifiedName }" to "${ propertyNewKey }" has ` +
            "been requested. " +
          "If \"processingApproach\" option has been set to \"ProcessingApproaches.manipulationsWithSourceObject\", it " +
            "means the defining of new property and, while \"mustLeaveEvenRenamed\" option has not been specified with " +
            "\"true\" boolean value for target property, the deleting of the outdated one. " +
          "However, the target property is not configurable (https://developer.mozilla.org/en-US/docs/Web/JavaScript/" +
            "Reference/Global_Objects/Object/defineProperty#configurable) thus could not be deleted.\n" +
          "This error has been thrown because the error handling strategy \"onUnableToDeletePropertyWithOutdatedValue\" is " +
            "\"ErrorHandlingStrategies.throwingOfError\" which is default. " +
          "It is recommended to keep this strategy, but there is no single right solution for all cases, so you need to " +
            "select the one matching with your case:\n" +
          "● If you are have access to data source, consider the making of this property configurable.\n" +
          "● If it is fine to keep the old property alongside with the new one, set \"mustLeaveEvenRenamed\" option to " +
            "\"true\" for this property.\n" +
          "● If the creating of new object based on the source one is fine, specify \"processingApproach\" option " +
          "  option with `ProcessingApproaches.assemblingOfNewObject` value, herewith everything that was " +
          "  not specified via valid data specification will not be added to new object."
    },

    unableToSubstituteUndefinedPropertyValue: {

      title: "Unable to Substitute Undefined Property Value",

      generateDescription: (
        {
          targetPropertyDotSeparatedQualifiedName
        }: ThrowableErrors.UnableToSubstituteUndefinedPropertyValue.TemplateVariables
      ): string =>
          `The property "${ targetPropertyDotSeparatedQualifiedName }" has been requested to be substitute with default ` +
            "value when it is not defined or has explicit `undefined` value. " +
          "The second case has occurred, but because this property is not writable, the default value could not be " +
            "substituted. " +
          "This error has been thrown because the error handling strategy \"onUnableToSubstituteUndefinePropertyValue\" " +
            "is \"ErrorHandlingStrategies.throwingOfError\" which is default. " +
          "It is recommended to keep this strategy, but there is no single right solution for all cases, so you need to " +
            "select the one matching with your case:\n" +
          "● If you are have access to data source, first of all try to avoid the explicit `undefined` values. " +
            "Alternatively, consider the making of this property writable. " +
            "You can make it readonly again after substitution of the default value by `mustMakeReadonly` if this " +
            "property is configurable. \n" +
          "● If the creating of new object based on the source one is fine, specify \"processingApproach\" option " +
            "option with `ProcessingApproaches.assemblingOfNewObject` value, herewith everything that was " +
            "not specified via valid data specification will not be added to new object. \n" +
          "● If none of above solutions are satisfying with your requirements, it means you can not write this property " +
            "neither by RawObjectDataProcessor nor manually by assignment. You can prepare the default value outside of " +
            "the processed object, or rename this property, or add the getter by post validation modifications."

    }

  },


  /* ━━━ Warnings ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  warnings: {

    preValidationModificationFailed: {

      title: "Pre-validation Modification Failed",

      generateDescription: (
        {
          targetPropertyDotSeparatedQualifiedName,
          stringifiedCaughtError
        }: Warnings.PreValidationModificationFailed.TemplateVariables
      ): string =>
          "The following error has occurred during the pre-validation modification of property " +
            `${ targetPropertyDotSeparatedQualifiedName }.` +
          `${ stringifiedCaughtError }\n` +
          "This error has been reported as warning because the error handling strategy " +
            "\"onPreValidationModificationFailed\" is \"ErrorHandlingStrategies.warningWithoutMarkingOfDataAsInvalid\" " +
            "what is not recommended because because failed pre-validation modification could cause the subsequent " +
            "errors." +
          "It is recommended to set the strategy to \"\"ErrorHandlingStrategies.throwingOfError\" which is default and " +
            "fix the pre-validation modification function."

    },

    unableToDeletePropertyWithOutdatedKey: {

      title: "Unable to Delete Property With Outdated Key",

      generateDescription: (
        {
          targetPropertyDotSeparatedQualifiedName,
          propertyNewKey
        }: Warnings.UnableToDeletePropertyWithOutdatedKey.TemplateVariables
      ): string =>
          `The renaming of the property "${ targetPropertyDotSeparatedQualifiedName }" to "${ propertyNewKey }" has ` +
            "been requested. " +
          "If \"processingApproach\" option has been set to \"ProcessingApproaches.manipulationsWithSourceObject\", it " +
            "means the defining of new property and, while \"mustLeaveEvenRenamed\" option has not been specified with " +
            "\"true\" boolean value for target property, the deleting of the outdated one. " +
          "However, the target property is not configurable (https://developer.mozilla.org/en-US/docs/Web/JavaScript/" +
            "Reference/Global_Objects/Object/defineProperty#configurable) thus could not be deleted.\n" +
          "This error has been reported as warning because the error handling strategy " +
            "\"onUnableToDeletePropertyWithOutdatedValue\" is \"ErrorHandlingStrategies.warningWithoutMarkingOfDataAsInvalid\" " +
            "what is not recommended because the output data will differ with expected one while could be marked as valid. " +
          "● If you are have access to data source, consider the making of this property configurable.\n" +
          "● If it is fine to keep the old property alongside with the new one, set \"mustLeaveEvenRenamed\" option to " +
            "\"true\" for this property.\n" +
          "● If the creating of new object based on the source one is fine, specify \"processingApproach\" option " +
          "  option with `ProcessingApproaches.assemblingOfNewObject` value, herewith everything that was " +
          "  not specified via valid data specification will not be added to new object."
    },

    unableToSubstituteUndefinedPropertyValue: {

      title: "Unable to Substitute Undefined Property Value",

      generateDescription: (
        {
          targetPropertyDotSeparatedQualifiedName
        }: ThrowableErrors.UnableToSubstituteUndefinedPropertyValue.TemplateVariables
      ): string =>
          `The property "${ targetPropertyDotSeparatedQualifiedName }" has been requested to be substitute with default ` +
            "value when it is not defined or has explicit `undefined` value. " +
          "The second case has occurred, but because this property is not writable, the default value could not be " +
            "substituted. " +
          "This error has been reported as warning because the error handling strategy " +
            "\"onUnableToSubstituteUndefinePropertyValue\" is \"ErrorHandlingStrategies.warningWithoutMarkingOfDataAsInvalid\" " +
            "what is not recommended because the output data will differ with expected one while could be marked as valid. " +
          "● If you are have access to data source, first of all try to avoid the explicit `undefined` values. " +
            "Alternatively, consider the making of this property writable. " +
            "You can make it readonly again after substitution of the default value by `mustMakeReadonly` if this " +
            "property is configurable. \n" +
          "● If the creating of new object based on the source one is fine, specify \"processingApproach\" option " +
            "option with `ProcessingApproaches.assemblingOfNewObject` value, herewith everything that was " +
            "not specified via valid data specification will not be added to new object.\n" +
          "● If none of above solutions are satisfying with your requirements, it means you can not write this property " +
            "neither by RawObjectDataProcessor nor manually by assignment. You can prepare the default value outside of " +
            "the processed object, or rename this property, or add the getter by post validation modifications."

    }

  },
  // ━━━ TODO ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  /** @deprecated */
  buildValueTypeDoesNotMatchWithExpectedErrorMessageTextData(
    {
      targetPropertyValue,
      targetPropertyValueSpecification
    }: Pick<Localization.PropertyDataForMessagesBuilding, "targetPropertyValue"> & {
      targetPropertyValueSpecification: Exclude<
        RawObjectDataProcessor.ValueSpecification,
        RawObjectDataProcessor.MultipleTypesAllowedValueSpecification
      >;
    }
  ): Localization.InvalidPropertyValidationErrorMessageTemplateData {
    return {
      title: "Expected and actual value types mismatch",
      description: `This value expected to have type '${ this.getLocalizedValueType(targetPropertyValueSpecification.type) }' ` +
          `while actually it's type is '${ typeof targetPropertyValue }'.`
    };
  },

  /* === Nullability ================================================================================================ */
  nonNullableValueIsNullErrorMessageTextData: {
    title: "Non-nullable value is 'null'",
    description: "This value is 'null' while nullability has not been permitted by valid data specification."
  },


  /* === Indexed arrays ============================================================================================= */
  buildIndexedArrayElementsCountIsLessThanRequiredMinimumErrorMessageTextData(
    { minimalElementsCount, actualElementsCount }: { minimalElementsCount: number; actualElementsCount: number; }
  ): RawObjectDataProcessor.Localization.InvalidPropertyValidationErrorMessageTemplateData {
    return {
      title: "Indexed array has less elements than expected minimum",
      description: `This value of indexed array type has ${ actualElementsCount } elements while at least ` +
          `${ minimalElementsCount } expected.`
    };
  },

  buildIndexedArrayElementsCountIsMoreThanAllowedMaximumErrorMessageTextData(
    { maximalElementsCount, actualElementsCount }: { maximalElementsCount: number; actualElementsCount: number; }
  ): RawObjectDataProcessor.Localization.InvalidPropertyValidationErrorMessageTemplateData {
    return {
      title: "Indexed array has more elements than expected maximum",
      description: `This value of indexed array type has ${ actualElementsCount } elements while ` +
          `maximally ${ maximalElementsCount } expected.`
    };
  },

  buildIndexedArrayElementsCountDoesNotMatchWithSpecifiedExactNumberErrorMessageTextData(
    { exactElementsCount, actualElementsCount }: { exactElementsCount: number; actualElementsCount: number; }
  ): RawObjectDataProcessor.Localization.InvalidPropertyValidationErrorMessageTemplateData {
    return {
      title: "The count of elements of indexed array does not match with expected fixed value",
      description: `This value of indexed array type has ${ actualElementsCount } elements while ` +
          `exactly ${ exactElementsCount } expected.`
    };
  },

  indexedArrayDisallowedUndefinedElementErrorMessageTextData: {
    title: "Disallowed undefined-type element of indexed array",
    description: "This element of indexed array is 'undefined' while undefined-type elements has not been allowed " +
        "by valid element specification."
  },

  indexedArrayDisallowedNullElementErrorMessageTextData: {
    title: "Disallowed null element of indexed array",
    description: "This element of indexed array is 'null' while null elements has not been allowed by valid element " +
        "specification."
  },


  /* === Associative arrays ========================================================================================= */
  buildAssociativeArrayEntriesCountIsLessThanRequiredMinimumErrorMessageTextData(
    { minimalEntriesCount, actualEntriesCount }: { minimalEntriesCount: number; actualEntriesCount: number; }
  ): RawObjectDataProcessor.Localization.InvalidPropertyValidationErrorMessageTemplateData {
    return {
      title: "Associative array has less entries than expected minimum",
      description: `This value of associative array type value has ${ actualEntriesCount } entries while at least ` +
          `${ minimalEntriesCount } expected.`
    };
  },

  buildAssociativeArrayEntriesCountIsMoreThanAllowedMaximumErrorMessageTextData(
    { maximalEntriesCount, actualEntriesCount }: { maximalEntriesCount: number; actualEntriesCount: number; }
  ): RawObjectDataProcessor.Localization.InvalidPropertyValidationErrorMessageTemplateData {
    return {
      title: "Associative array has more entries than expected maximum",
      description: `This value of associative array-type value has ${ actualEntriesCount } entries while maximally ` +
          `${ maximalEntriesCount } expected.`
    };
  },

  buildAssociativeArrayEntriesCountDoesNotMatchWithSpecifiedExactNumberErrorMessageTextData(
    { exactEntriesCount, actualEntriesCount }: { exactEntriesCount: number; actualEntriesCount: number; }
  ): RawObjectDataProcessor.Localization.InvalidPropertyValidationErrorMessageTemplateData {
    return {
      title: "The count of entries of associative array does not match with expected fixed value",
      description: `This value of associative array-type value has ${ exactEntriesCount } entries while ` +
          `exactly ${ actualEntriesCount } expected.`
    };
  },

  buildRequiredKeysOfAssociativeArrayAreMissingErrorMessageTextData(
    missingRequiredKeys: Array<string>
  ): Localization.InvalidPropertyValidationErrorMessageTemplateData {
    return {
      title: "Required key(s) of associative array are missing",
      description: "Below keys are missing but required for this associative array type value:\n" +
          stringifyAndFormatArbitraryValue(missingRequiredKeys)
    };
  },

  buildRequiredAlternativeKeysOfAssociativeArrayAreMissingErrorMessageTextData(
    requiredKeysAlternatives: ReadonlyArray<string>
  ): Localization.InvalidPropertyValidationErrorMessageTemplateData {
    return {
      title: "Required keys alternatives are missing",
      description: "One of below keys must present in this associative array-type value, but actually none of them " +
          `presents.\n${ stringifyAndFormatArbitraryValue(requiredKeysAlternatives) }`
    };
  },

  buildDisallowedKeysFoundInAssociativeArrayErrorMessageTextData(
    foundDisallowedKeys: Array<string>
  ): Localization.InvalidPropertyValidationErrorMessageTemplateData {
    return {
      title: "Disallowed key(s) found in associative array",
      description: "Below keys presents in this associative array type value while these keys are disallowed.\n" +
          stringifyAndFormatArbitraryValue(foundDisallowedKeys)
    };
  },

  associativeArrayDisallowedUndefinedValueErrorMessageTextData: {
    title: "Disallowed undefined-type value of associative array",
    description: "This value of associative array is 'undefined' while undefined-type values has not been allowed " +
        "by valid value specification."
  },

  associativeArrayDisallowedNullValueErrorMessageTextData: {
    title: "Disallowed null value of associative array",
    description: "This value of associative array is 'null' while null values has not been allowed by valid value " +
        "specification."
  },


  /* === Value type ================================================================================================= */
  getLocalizedValueType(valueType: Localization.ValuesTypes): string {

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
  ): Localization.InvalidPropertyValidationErrorMessageTemplateData {
    return {
      title: "Expected and actual numbers set mismatch",
      description: "Contrary to expectations, this numeric value is in not member of " +
          `'${ this.numbersSet(expectedNumberSet) }'`
    };
  },

  buildValueIsNotAmongAllowedAlternativesErrorMessageTextData(
    allowedAlternatives: ReadonlyArray<string>
  ): Localization.InvalidPropertyValidationErrorMessageTemplateData {
    return {
      title: "Disallowed alternative of value",
      description:
          "This value is not among following allowed alternatives.\n" +
            allowedAlternatives.map((allowedAlternative: string): string => `  ○ ${ allowedAlternative }`).join("\n")
    };
  },

  buildNumericValueIsSmallerThanRequiredMinimumErrorMessageTextData(
    requiredMinimum: number
  ): Localization.InvalidPropertyValidationErrorMessageTemplateData {
    return {
      title: "Minimal value fall short",
      description: `This value is smaller than required minimal value ${ requiredMinimum }.`
    };
  },

  buildNumericValueIsGreaterThanAllowedMaximumErrorMessageTextData(
    allowedMaximum: number
  ): Localization.InvalidPropertyValidationErrorMessageTemplateData {
    return {
      title: "Maximal numeric value exceeding",
      description: `This value is greater than required maximal value ${ allowedMaximum }.`
    };
  },


  /* === String value =============================================================================================== */
  buildCharactersCountIsLessThanRequiredErrorMessageTextData(
    { minimalCharactersCount, realCharactersCount }: { minimalCharactersCount: number; realCharactersCount: number; }
  ): Localization.InvalidPropertyValidationErrorMessageTemplateData {
    return {
      title: "Minimal characters count fall short",
      description: `This string value has ${ realCharactersCount } characters while at least ` +
          `${ minimalCharactersCount } required.`
    };
  },

  buildCharactersCountIsMoreThanAllowedErrorMessageTextData(
    { maximalCharactersCount, realCharactersCount }: { maximalCharactersCount: number; realCharactersCount: number; }
  ): Localization.InvalidPropertyValidationErrorMessageTemplateData {
    return {
      title: "Maximal characters count exceeding",
      description: `This string value has ${ realCharactersCount } characters ${ maximalCharactersCount } allowed ` +
          "as maximum."
    };
  },

  buildCharactersCountDoesNotMatchWithSpecifiedErrorMessageTextData(
    { fixedCharactersCount, realCharactersCount }: { fixedCharactersCount: number; realCharactersCount: number; }
  ): Localization.InvalidPropertyValidationErrorMessageTemplateData {
    return {
      title: "Fixed characters count mismatch",
      description: `The value has ${ realCharactersCount } characters exactly ${ fixedCharactersCount } required.`
    };
  },

  buildRegularExpressionMismatchErrorMessageTextData(regularExpression: RegExp): Localization.InvalidPropertyValidationErrorMessageTemplateData {
    return {
      title: "Regular expression mismatch",
      description: "This string value does not match with specified regular expression:\n " +
          regularExpression.toString()
    };
  },

  /* === Other ====================================================================================================== */
  buildDisallowedBooleanValueVariantErrorMessageTextData(
    disallowedVariant: boolean
  ): Localization.InvalidPropertyValidationErrorMessageTemplateData {
    return {
      title: "Disallowed boolean variant",
      description: `This boolean value is '${ disallowedVariant }' while only '${ !disallowedVariant }' allowed.`
    };
  },

  buildIncompatibleValuesTypesAlternativesErrorDescription(
    targetValueSpecification: RawObjectDataProcessor.MultipleTypesAllowedValueSpecification
  ): string {
    return "The 'ValuesTypesIDs.fixedKeyAndValuePairsObject' (aliased as Object) and " +
        "'ValuesTypesIDs.associativeArrayOfUniformTypeValues' (aliased as Map) are incompatible alternatives of " +
        "'ValuesTypesIDs.oneOf' because from the viewpoint of ECMAScript both are the 'object'. Target value marked " +
        `as invalid. Please correct below specification:\n ${ stringifyAndFormatArbitraryValue(targetValueSpecification) }`;
  },

  buildUnsupportedValueTypeErrorMessageTextData(
    propertyDataForMessagesBuilding: RawObjectDataProcessor.Localization.PropertyDataForMessagesBuilding
  ): Localization.InvalidPropertyValidationErrorMessageTemplateData {
    return {
      title: "Unsupported value type",
      description: `This value has type ${ typeof propertyDataForMessagesBuilding.targetPropertyValue } which is ` +
          "not a valid parsed JSON"
    };
  },

  buildCustomValidationFailedErrorMessageTextData(
    customValidationDescription: string
  ): Localization.InvalidPropertyValidationErrorMessageTemplateData {
    return {
      title: "Custom validation did not passed",
      description: `This value did not passed the custom validation "${ customValidationDescription }".`
    };
  }
};


export default rawObjectDataProcessorLocalization__english;
