import RawObjectDataProcessor from "./RawObjectDataProcessor";
import Localization = RawObjectDataProcessor.Localization;
import ValidationErrors = Localization.ValidationErrors;
import ThrowableErrors = Localization.ThrowableErrors;
import Warnings = Localization.Warnings;

import stringifyAndFormatArbitraryValue from "../Strings/stringifyAndFormatArbitraryValue";
import isNotUndefined from "../TypeGuards/Nullables/isNotUndefined";
import isNotNull from "../TypeGuards/Nullables/isNotNull";
import isNull from "../TypeGuards/Nullables/isNull";


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
      `\n\n● Property / Element: ${ targetPropertyDotSeparatedQualifiedInitialName ?? "(Root)" }`,
      ...isNotNull(targetPropertyNewName) ? [ ` (new name: "${ targetPropertyNewName }")` ] : [],
      `\n${ description }`,
      "\n\n●　Property / Element Specification: ",
      `\n${
        stringifyAndFormatArbitraryValue({
          ...targetPropertyValueSpecification,
          type: targetPropertyValueSpecification.type
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

    rawDataIsNotObject: {
      generateMessage: ({ actualNativeType }: ValidationErrors.RawDataIsNotObject.TemplateVariables): string =>
          "Raw data, the first argument of \"RawObjectDataProcessor.process()\" is not the object and actually has " +
            `type "${ actualNativeType }".`
    },

    rawDataIsNull:
        "Raw data, the first argument of \"RawObjectDataProcessor.process()\" is null while non-null object expected.",

    valueTypeDoesNotMatchWithExpected: {
      title: "Expected and Actual Value Types Mismatch",
      generateDescription: (
        { expectedTypeID, actualNativeType }: ValidationErrors.ValueTypeDoesNotMatchWithExpected.TemplateVariables
      ): string =>
          "This value expected to have type " +
            `"${ rawObjectDataProcessorLocalization__english.getLocalizedValueType(expectedTypeID) }" while actually ` +
            `its type is "${ actualNativeType }".`
    },

    preValidationModificationFailed: {

      title: "Pre-validation Modification Failed",

      // TODO Link Injection
      generateDescription: (
        { stringifiedCaughtError }: ValidationErrors.PreValidationModificationFailed.TemplateVariables
      ): string =>
          "The following error has occurred during the pre-validation modification of this property/element. \n" +
            `${ stringifiedCaughtError }\n` +
          "The data has been marked as invalid because the error handling strategy \"onPreValidationModificationFailed\" " +
            "is \"ErrorHandlingStrategies.markingOfDataAsInvalid\" what is not recommended because the problem could " +
            "be in pre-validation modification function, not always in the data. "
          // "Also, most likely this strategy will cause the subsequent errors. " +
          // "It is recommended to set the strategy to \"ErrorHandlingStrategies.throwingOfError\" which is default and " +
          //   "fix the pre-validation modification function."

    },


    /* ─── Undefinedability of Fixed Schema Objects ───────────────────────────────────────────────────────────────── */
    forbiddenUndefinedValue: {
      title: "Forbidden Undefined Value Of Property/Element",
      description:
          "This property/element is not defined or have explicit `undefined` value what has been explicitly forbidden."
    },

    conditionallyForbiddenUndefinedValue: {

      title: "Conditionally Forbidden Undefined Value",

      generateDescription: (
        { verbalConditionWhenUndefinedIsForbidden }: ValidationErrors.ConditionallyForbiddenUndefinedValue.TemplateVariables
      ): string =>
          "This property/element is not defined or has explicit `undefined` value what has been forbidden when " +
            `${ verbalConditionWhenUndefinedIsForbidden }, and this condition has been satisfied.`

    },

    conditionallyForbiddenNonUndefinedValue: {

      title: "Conditionally Forbidden non-undefined Value",

      generateDescription: (
        { conditionWhenMustBeUndefined }: ValidationErrors.ConditionallyForbiddenNonUndefinedValue.TemplateVariables
      ): string =>
          `This property/element is not undefined while must be undefined when ${ conditionWhenMustBeUndefined }, and ` +
            "this condition has been satisfied."

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

    unableToUpdatePropertyValue: {

      title: "Unable to Update Property Value",

      description:
          "The updating of this property has been requested via default value substitution or pre-validation " +
            "modification while this property is read-only. " +
          "The data has been marked as invalid because the error handling strategy " +
            "\"onUnableToUnableToUpdatePropertyValue\" is \"ErrorHandlingStrategies.markingOfDataAsInvalid\" what " +
            "is recommended only if this property on source data actually expected to be writable. " +
          "But, if you have not the control on source data and it could be guaranteed that the source data is writable, " +
            "the following measures left:" +
          "● If the creating of new object based on the source one is fine, specify \"processingApproach\" option " +
            "option with `ProcessingApproaches.assemblingOfNewObject` value, herewith everything that was " +
            "not specified via valid data specification will not be added to new object." +
          "● If none of above solutions are satisfying with your requirements, it means you can not write this property " +
            "neither by RawObjectDataProcessor nor manually by assignment. You can prepare the default value outside of " +
            "the processed object, or rename this property, or add the getter by post validation modifications."

    },


    /* ─── Nullability ────────────────────────────────────────────────────────────────────────────────────────────── */
    forbiddenNullValue: {
      title: "Forbidden Null Value Of Property/Element",
      description: "This property/element has `null` value what has been explicitly forbidden."
    },

    conditionallyForbiddenNullValue: {

      title: "Conditionally Forbidden Null Value",

      generateDescription: (
        { verbalConditionWhenNullIsForbidden }: ValidationErrors.ConditionallyForbiddenNullValue.TemplateVariables
      ): string =>
          "This property/element has `null` value what has been forbidden when " +
            `${ verbalConditionWhenNullIsForbidden }, and this condition has been satisfied.`

    },

    conditionallyForbiddenNonNullValue: {

      title: "Conditionally Forbidden non-null Value",

      generateDescription: (
        { conditionWhenMustBeNull }: ValidationErrors.ConditionallyForbiddenNonNullValue.TemplateVariables
      ): string =>
          `This property/element is not null while must be null when ${ conditionWhenMustBeNull }, and this condition ` +
            "has been satisfied."

    },


    /* ─── Changing of Property Descriptions ──────────────────────────────────────────────────────────────────────── */
    unableToChangePropertyDescriptors: {

      title: "Usable to Change Property Descriptors",

      description:
          "The changing of descriptors of this property has been requested but ths property is not configurable. " +
          "The data has been marked as invalid because the error handling strategy " +
            "\"onUnableToChangePropertyDescriptors\" is \"ErrorHandlingStrategies.markingOfDataAsInvalid\" what " +
            "is recommended only if this property on source data actually expected to be configurable. "

    },


    /* ─── Numeric Value ──────────────────────────────────────────────────────────────────────────────────────────── */
    numericValueIsNotBelongToExpectedNumbersSet: {
      title: "Expected and Actual Numbers Set Mismatch",
      generateDescription: (
        { expectedNumberSet }: ValidationErrors.NumericValueIsNotBelongToExpectedNumbersSet.TemplateVariables
      ): string =>
          "Contrary to expectations, this numeric value is in not member of " +
            `"${ rawObjectDataProcessorLocalization__english.getLocalizedNumbersSet(expectedNumberSet) }"`
    },

    /* [ Approach ] Applicable also to string properties. */
    valueIsNotAmongAllowedAlternatives: {
      title: "Disallowed Alternative of Value",
      generateDescription: (
        { allowedAlternatives }: ValidationErrors.ValueIsNotAmongAllowedAlternatives.TemplateVariables
      ): string =>
          "This value is not among following allowed alternatives.\n" +
          allowedAlternatives.map((allowedAlternative: string | number): string =>
              `  ○ ${ allowedAlternative }`).join("\n")
    },

    numericValueIsSmallerThanRequiredMinimum: {
      title: "Minimal Value Fall Short",
      generateDescription: (
        { requiredMinimum }: ValidationErrors.NumericValueIsSmallerThanRequiredMinimum.TemplateVariables
      ): string =>
          `This value is smaller than required minimal value ${ requiredMinimum }.`
    },

    numericValueIsGreaterThanAllowedMaximumReadonly: {
      title: "Maximal Numeric Value Exceeding",
      generateDescription: (
        { allowedMaximum }: ValidationErrors.NumericValueIsGreaterThanAllowedMaximum.TemplateVariables
      ): string =>
          `This value is greater than required maximal value ${ allowedMaximum }.`
    },


    /* ─── String Value ───────────────────────────────────────────────────────────────────────────────────────────── */
    charactersCountIsLessThanRequired: {
      title: "Minimal Characters Count Fall Short",
      generateDescription: (
        { minimalCharactersCount, realCharactersCount }: ValidationErrors.CharactersCountIsLessThanRequired.TemplateVariables
      ): string =>
          `This string value has ${ realCharactersCount } characters while at least ${ minimalCharactersCount } required.`

    },

    charactersCountIsMoreThanAllowed: {
      title: "Maximal Characters Count Exceeding",
      generateDescription: (
          { maximalCharactersCount, realCharactersCount }: { maximalCharactersCount: number; realCharactersCount: number; }
      ): string =>
          `This string value has ${ realCharactersCount } characters while ${ maximalCharactersCount } allowed ` +
            "as maximum."
    },

    charactersCountDoesNotMatchWithSpecified: {
      title: "Fixed Characters Count Mismatch",
      generateDescription: (
          { fixedCharactersCount, realCharactersCount }: { fixedCharactersCount: number; realCharactersCount: number; }
      ): string =>
          `The value has ${ realCharactersCount } characters exactly ${ fixedCharactersCount } required.`
    },

    regularExpressionMismatch: {
      title: "Regular Expression Mismatch",
      generateDescription: ({ regularExpression }: ValidationErrors.RegularExpressionMismatch.TemplateVariables): string =>
          `This string value does not match with specified regular expression:\n ${ regularExpression.toString() }`
    },


    /* ─── Indexed Arrays ─────────────────────────────────────────────────────────────────────────────────────────── */
    indexedArrayElementsCountIsLessThanRequiredMinimum: {
      title: "Indexed Array has Less Elements than Expected Minimum",
      generateDescription: (
        {
          minimalElementsCount,
          actualElementsCount
        }: ValidationErrors.IndexedArrayElementsCountIsLessThanRequiredMinimum.TemplateVariables
      ): string =>
          `This value of indexed array type has ${ actualElementsCount } elements while at least ` +
            `${ minimalElementsCount } expected.`
    },

    indexedArrayElementsCountIsMoreThanAllowedMaximum: {
      title: "Indexed Array has More Elements than Expected Maximum",
      generateDescription: (
        {
          maximalElementsCount,
          actualElementsCount
        }: ValidationErrors.IndexedArrayElementsCountIsMoreThanAllowedMaximum.TemplateVariables
      ): string =>
          `This value of indexed array type has ${ actualElementsCount } elements while ` +
            `maximally ${ maximalElementsCount } expected.`
    },

    indexedArrayElementsCountDoesNotMatchWithSpecifiedExactNumber: {
      title: "The Count of Elements of Indexed Array does not Match with Expected Fixed Value",
      generateDescription: (
        {
          exactElementsCount,
          actualElementsCount
        }: ValidationErrors.IndexedArrayElementsCountDoesNotMatchWithSpecifiedExactNumber.TemplateVariables
      ): string =>
          `This value of indexed array type has ${ actualElementsCount } elements while ` +
            `exactly ${ exactElementsCount } expected.`
    },

    /* ─── Associative Arrays ─────────────────────────────────────────────────────────────────────────────────────── */
    associativeArrayEntriesCountIsLessThanRequiredMinimum: {
      title: "Associative Array has Less Entries than Expected Minimum",
      generateDescription: (
        {
          actualEntriesCount,
          minimalEntriesCount
        }: ValidationErrors.AssociativeArrayEntriesCountIsLessThanRequiredMinimum.TemplateVariables
      ): string =>
          `This value of associative array type value has ${ actualEntriesCount } entries while at least ` +
            `${ minimalEntriesCount } expected.`
    },

    associativeArrayPairsCountIsMoreThanAllowedMaximum: {
      title: "Associative Array has More Entries than Expected Maximum",
      generateDescription: (
        {
          maximalEntriesCount,
          actualEntriesCount
        }: ValidationErrors.AssociativeArrayPairsCountIsMoreThanAllowedMaximum.TemplateVariables
      ): string =>
          `This value of associative array-type value has ${ actualEntriesCount } entries while maximally ` +
            `${ maximalEntriesCount } expected.`
    },

    associativeArrayPairsCountDoesNotMatchWithSpecifiedExactNumber: {
      title: "The Count of Entries of Associative Array does not Match with Expected Fixed Value",
      generateDescription: (
        {
          exactEntriesCount,
          actualEntriesCount
        }: ValidationErrors.AssociativeArrayPairsCountDoesNotMatchWithSpecifiedExactNumber.TemplateVariables
      ): string =>
          `This value of associative array-type value has ${ exactEntriesCount } entries while ` +
            `exactly ${ actualEntriesCount } expected.`
    },

    forbiddenForSpecificKeysUndefinedOrNullValuesFoundInAssociativeArrayTypeObject: {
      title: "Forbidden for Specific Keys Undefined or Null Values in Associative Array Type Object",
      generateDescription: (
        { keysOfEitherUndefinedOrNullValues }:
            ValidationErrors.ForbiddenForSpecificKeysUndefinedOrNullValuesFoundInAssociativeArrayTypeObject.TemplateVariables
      ): string =>
          "The values of the following keys are either null or explicit undefined while for these keys such values has " +
            "been explicitly forbidden:\n" +
          stringifyAndFormatArbitraryValue(keysOfEitherUndefinedOrNullValues)
    },

    requiredAlternativeKeysOfAssociativeArrayAreMissing: {
      title: "Required Keys Alternatives are Missing",
      generateDescription: (
        { requiredKeysAlternatives }: ValidationErrors.RequiredAlternativeKeysOfAssociativeArrayAreMissing.TemplateVariables
      ): string =>
          "At least one value for the following keys must be neither null nor explicit undefined while actually of them " +
            "are not satisfying this condition.\n" +
          stringifyAndFormatArbitraryValue(requiredKeysAlternatives)
    },

    disallowedKeysFoundInAssociativeArray: {
      title: "Disallowed key(s) Found in Associative Array",
      generateDescription: (
          { foundDisallowedKeys }: ValidationErrors.DisallowedKeysFoundInAssociativeArray.TemplateVariables
      ): string =>
          "Below keys presents in this associative array type value while these keys are disallowed.\n" +
            stringifyAndFormatArbitraryValue(foundDisallowedKeys)
    },

    /* ─── Other ──────────────────────────────────────────────────────────────────────────────────────────────────── */
    disallowedBooleanValueVariant: {
      title: "Disallowed Boolean Variant",
      generateDescription: (
        { disallowedVariant }: ValidationErrors.DisallowedBooleanValueVariant.TemplateVariables
      ): string =>
          `This boolean value is '${ disallowedVariant }' while only '${ !disallowedVariant }' allowed.`
    },

    unsupportedValueType: {
      title: "Unsupported Value Type",
      generateDescription:
          ({ targetPropertyValue }: ValidationErrors.UnsupportedValueType.TemplateVariables): string =>
              `This value has type ${ typeof targetPropertyValue } which is not a valid parsed JSON`
    },

    customValidationFailed: {
      title: "Custom Validation did not Passed",
      generateDescription: ({ customValidationDescription }: ValidationErrors.CustomValidationFailed.TemplateVariables): string =>
          `This value did not passed the custom validation "${ customValidationDescription }".`
    },

    unexpectedProperties: {

      title: "Unexpected Properties",

      generateDescription:
          ({ unexpectedProperties }: ValidationErrors.UnexpectedProperties.TemplateVariables): string =>
              "The following properties are unexpected ones:\n" +
              unexpectedProperties.map((propertyKey: string): string => `● ${ propertyKey }`).join("\n")
    }

  },


  /* ━━━ Throwable Errors ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  throwableErrors: {

    objectSchemaNotSpecified: {

      title: "Object Schema Not Specified",

      // TODO Link Injectcion
      generateDescription: (
        {
          targetPropertyDotSeparatedQualifiedName
        }: ThrowableErrors.MutuallyExclusiveTransformationsBetweenUndefinedAndNull.TemplateVariables
      ): string =>
          `Object schema is not specified for "${ targetPropertyDotSeparatedQualifiedName }".`
    },

    mutuallyExclusiveTransformationsBetweenUndefinedAndNull: {

      title: "Mutually Exclusive Transformations Between Undefined and Null",

      // TODO Link Injectcion
      generateDescription: (
        {
          targetPropertyDotSeparatedQualifiedName
        }: ThrowableErrors.MutuallyExclusiveTransformationsBetweenUndefinedAndNull.TemplateVariables
      ): string =>
        "Both \"mustTransformUndefinedToNull\" and \"mustTransformNullToUndefined\" options has been specified with " +
          `boolean true value for the property "${ targetPropertyDotSeparatedQualifiedName }" what is the contradiction. `
    },

    preValidationModificationFailed: {

      title: "Pre-validation Modification Failed",

      // TODO Link Injection
      generateDescription: (
        { targetPropertyDotSeparatedQualifiedName }: ThrowableErrors.PreValidationModificationFailed.TemplateVariables
      ): string =>
          "The error has occurred during the pre-validation modification of the property/element " +
            `"${ targetPropertyDotSeparatedQualifiedName }". ` +
          "This error has been thrown because the error handling strategy \"onPreValidationModificationFailed\" is " +
            "\"ErrorHandlingStrategies.throwingOfError\" which is the default one. "
          // "It is recommended to keep this strategy and fix the pre-validation modification function."

    },

    propertyUndefinedabilityNotSpecified: {

      title: "Property Undefinedability has not been Specified",
      generateDescription: (
        { targetPropertyDotSeparatedQualifiedName }: ThrowableErrors.PropertyUndefinedabilityNotSpecified.TemplateVariables
      ): string =>
          "It has not been specified how to process the undefined value of the property/element " +
            `"${ targetPropertyDotSeparatedQualifiedName }".\n` +
          "Check the documentation and specify one of the valid options: https://ee.yamato-daiwa.com/"

    },

    propertyNullabilityNotSpecified: {

      title: "Property Nullability has not been Specified",
      generateDescription: (
        { targetPropertyDotSeparatedQualifiedName }: ThrowableErrors.PropertyNullabilityNotSpecified.TemplateVariables
      ): string =>
          "It has not been specified how to process the null value of the property/element " +
            `"${ targetPropertyDotSeparatedQualifiedName }".\n` +
          "Check the documentation and specify one of the valid options: https://ee.yamato-daiwa.com/"

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
          "However, because the target property is not configurable (https://developer.mozilla.org/en-US/docs/Web/JavaScript/" +
            "Reference/Global_Objects/Object/defineProperty#configurable), it could not be deleted.\n" +
          "This error has been thrown because the error handling strategy \"onUnableToDeletePropertyWithOutdatedValue\" is " +
            "\"ErrorHandlingStrategies.throwingOfError\" which is default. " +
          "It is recommended to keep this strategy, but there is no single right solution for all cases, thus you need to " +
            "select the one matching with your case:\n" +
          "● If you are have access to the data source, consider the making of this property configurable.\n" +
          "● If it is fine to keep the old property alongside with the new one, set \"mustLeaveEvenRenamed\" option to " +
            "\"true\" for this property.\n" +
          "● If the creating of new object based on the source one is fine, specify \"processingApproach\" option " +
            "with `ProcessingApproaches.assemblingOfNewObject` value, herewith everything that was not specified via " +
            "valid data specification will not be added to new object."
    },

    unableToChangePropertyDescriptors: {

      title: "Unable to Change Property Descriptors",

      generateDescription: (
        { targetPropertyDotSeparatedQualifiedName }: ThrowableErrors.UnableToChangePropertyDescriptors.TemplateVariables
      ): string =>
          `Unable to change the descriptions of property "${ targetPropertyDotSeparatedQualifiedName }". ` +
          "This error has been thrown because the error handling strategy \"onUnableToChangePropertyDescriptors\" is " +
            "\"ErrorHandlingStrategies.throwingOfError\" which is the default one. " +
           "It is recommended to keep this strategy, but there is no single right solution for all cases, thus you need to " +
            "select the one matching with your case:\n" +
          "● If you are have access to the data source, consider the making of this property configurable.\n" +
          "● If the creating of new object based on the source one is fine, specify \"processingApproach\" option " +
            "with `ProcessingApproaches.assemblingOfNewObject` value, herewith everything that was not specified via " +
            "valid data specification will not be added to new object.\n" +
          "● If none of this solutions fits to your case, it means that you should no to interfere to the source data. " +
            "Consider the creating of derived from the source one object　instead."

    },

    unableToUpdatePropertyValue: {

      title: "Unable to Update Property Value",

      generateDescription: (
        { targetPropertyDotSeparatedQualifiedName }: ThrowableErrors.UnableToUpdatePropertyValue.TemplateVariables
      ): string =>
          `The updating of the property "${ targetPropertyDotSeparatedQualifiedName }" has been requested via default ` +
            "value substitution or pre-validation modification while this property is read-only. " +
          "This error has been thrown because the error handling strategy \"onUnableToUnableToUpdatePropertyValue\" " +
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

    },

    mutuallyExclusiveAssociativeArrayKeysLimitations: {

      title: "Mutually Exclusive Associative Array Keys Limitations",

      generateDescription: (
        { targetPropertyDotSeparatedQualifiedName }: ThrowableErrors.
            MutuallyExclusiveAssociativeArrayKeysLimitations.TemplateVariables
      ): string =>
          "Both allowed and forbidden keys has been specified for " +
              (
                isNull(targetPropertyDotSeparatedQualifiedName) ?
                  "root associative array " :
                  `associative array "${ targetPropertyDotSeparatedQualifiedName }" `
              ) +
              "what it the contradiction. " +
              "You can specify allowed keys of forbidden keys but not both."
    },

    incompatibleValuesTypesAlternatives: {
      title: "",
      generateDescription: (
        { targetValueStringifiedSpecification }: ThrowableErrors.IncompatibleValuesTypesAlternatives.TemplateVariables
      ): string =>
          "The 'ValuesTypesIDs.fixedKeyAndValuePairsObject' (aliased as Object) and " +
            "'ValuesTypesIDs.associativeArrayOfUniformTypeValues' (aliased as Map) are incompatible alternatives of " +
            "'ValuesTypesIDs.oneOf' because from the viewpoint of ECMAScript both are the 'object'. " +
          `Please fix the specification of this property.\n ${ targetValueStringifiedSpecification }`
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
          "The following error has occurred during the pre-validation modification of the property/element " +
            `"${ targetPropertyDotSeparatedQualifiedName }".\n` +
          `${ stringifiedCaughtError }\n` +
          "This error has been reported as warning because the error handling strategy " +
            "\"onPreValidationModificationFailed\" is \"ErrorHandlingStrategies.warningWithoutMarkingOfDataAsInvalid\" " +
            "what is not recommended because failed pre-validation means that the pre-validation modification function " +
            "does not respect all possible variations of the source data and could cause the subsequent errors."
          // "It is recommended to set the strategy to \"\"ErrorHandlingStrategies.throwingOfError\" which is default and " +
          //   "fix the pre-validation modification function."

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

    unableToChangePropertyDescriptors: {

      title: "Unable to Change Property Descriptors",

      generateDescription: (
        { targetPropertyDotSeparatedQualifiedName }: ThrowableErrors.UnableToChangePropertyDescriptors.TemplateVariables
      ): string =>
          `Unable to change the descriptions of property "${ targetPropertyDotSeparatedQualifiedName }". ` +
          "This error has been reported as warning because the error handling strategy " +
            "\"unableToChangePropertyDescriptors\" is \"ErrorHandlingStrategies.warningWithoutMarkingOfDataAsInvalid\" " +
            "what is not recommended because the output data will differ with expected one while could be marked as valid. " +
          "● If you are have access to the data source, consider the making of this property configurable.\n" +
          "● If the creating of new object based on the source one is fine, specify \"processingApproach\" option " +
            "with `ProcessingApproaches.assemblingOfNewObject` value, herewith everything that was not specified via " +
            "valid data specification will not be added to new object.\n" +
          "● If none of this solutions fits to your case, it means that you should no to interfere to the source data. " +
            "Consider the creating of derived from the source one object　instead."

    },

    unableToUpdatePropertyValue: {

      title: "Unable to Update property Value",

      generateDescription: (
        {
          targetPropertyDotSeparatedQualifiedName
        }: ThrowableErrors.UnableToUpdatePropertyValue.TemplateVariables
      ): string =>
          `The updating of the property "${ targetPropertyDotSeparatedQualifiedName }" has been requested via default ` +
            "value substitution or pre-validation modification while this property is read-only. " +
          "This error has been reported as warning because the error handling strategy " +
            "\"onUnableToUnableToUpdatePropertyValue\" is \"ErrorHandlingStrategies.warningWithoutMarkingOfDataAsInvalid\" " +
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


  /* === Value type ================================================================================================= */
  getLocalizedValueType(valueTypeID: RawObjectDataProcessor.ValuesTypesIDs): string {

    switch (valueTypeID) {

      case RawObjectDataProcessor.ValuesTypesIDs.number: return "number";
      case RawObjectDataProcessor.ValuesTypesIDs.string: return "string";
      case RawObjectDataProcessor.ValuesTypesIDs.boolean: return "boolean";

      case RawObjectDataProcessor.ValuesTypesIDs.indexedArray:
        return "indexed array of uniform elements";

      case RawObjectDataProcessor.ValuesTypesIDs.fixedSchemaObject:
        return "filed key and value pairs object";

      case RawObjectDataProcessor.ValuesTypesIDs.associativeArray:
        return "associative array of uniform type values";

      case RawObjectDataProcessor.ValuesTypesIDs.tuple: return "tuple";

      case RawObjectDataProcessor.ValuesTypesIDs.ambiguousObject: return "ambiguous object";

      case RawObjectDataProcessor.ValuesTypesIDs.ambiguousArray: return "ambiguous array";

      case RawObjectDataProcessor.ValuesTypesIDs.polymorphic: return "polymorphic";

    }

  },

  getLocalizedNumbersSet(numberSet: RawObjectDataProcessor.NumbersSets): string {
    switch (numberSet) {
      case RawObjectDataProcessor.NumbersSets.naturalNumber: return "natural number";
      case RawObjectDataProcessor.NumbersSets.positiveIntegerOrZero: return "positive integer or zero";
      case RawObjectDataProcessor.NumbersSets.negativeInteger: return "negative integer";
      case RawObjectDataProcessor.NumbersSets.negativeIntegerOrZero: return "negative integer of zero";
      case RawObjectDataProcessor.NumbersSets.anyInteger: return "any integer";
      case RawObjectDataProcessor.NumbersSets.positiveDecimalFraction: return "positive decimal fraction";
      case RawObjectDataProcessor.NumbersSets.positiveDecimalFractionOrZero: return "positive decimal fraction or zero";
      case RawObjectDataProcessor.NumbersSets.negativeDecimalFraction: return "negative decimal fraction";
      case RawObjectDataProcessor.NumbersSets.negativeDecimalFractionOrZero: return "negative decimal fraction or zero";
      case RawObjectDataProcessor.NumbersSets.anyDecimalFraction: return "any decimal fraction";
      case RawObjectDataProcessor.NumbersSets.anyDecimalFractionOrZero: return "any decimal fraction or zero";
      case RawObjectDataProcessor.NumbersSets.anyRealNumber: return "any real number";
      case RawObjectDataProcessor.NumbersSets.positiveRealNumber: return "positive real number";
      case RawObjectDataProcessor.NumbersSets.negativeRealNumber: return "negative real number";
      case RawObjectDataProcessor.NumbersSets.positiveRealNumberOrZero: return "positive real number or zero";
      case RawObjectDataProcessor.NumbersSets.negativeRealNumberOrZero: return "negative real number or zero";
    }
  }

};


export default rawObjectDataProcessorLocalization__english;
