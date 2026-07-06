import RawObjectDataProcessor from "./RawObjectDataProcessor";
import Localization = RawObjectDataProcessor.Localization;
import ValidationErrors = Localization.ValidationErrors;
import ThrowableErrors = Localization.ThrowableErrors;
import Warnings = Localization.Warnings;

import { stringifyAndFormatArbitraryValue } from "../Strings/ArbitraryValueFormatter";
import isUndefined from "../TypeGuards/EmptyTypes/isUndefined";
import isNotUndefined from "../TypeGuards/EmptyTypes/isNotUndefined";
import isNull from "../TypeGuards/EmptyTypes/isNull";
import isNotNull from "../TypeGuards/EmptyTypes/isNotNull";


const rawObjectDataProcessorLocalization__english: Localization = {

  generateSeeMoreSentence: ({ documentationPageAnchor }: Localization.SeeDocumentationSentence.TemplateVariables): string =>
      "See documentation for details: " +
        "https://ee.yamato-daiwa.com/CoreLibrary/Functionality/RawObjectDataProcessor/Children/06-ValidationIssues/" +
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
      `\n\n● Property / Element: ${ targetPropertyDotSeparatedQualifiedInitialName ?? "(Root)" }`,
      ...isNotNull(targetPropertyNewName) ? [ ` (renamed to: "${ targetPropertyNewName }")` ] : [],
      `\n${ description }`,
      `\n${ this.generateSeeMoreSentence({ documentationPageAnchor }) }`,
      "\n\n● Property / Element Specification: ",
      `\n${
        stringifyAndFormatArbitraryValue({
          ...targetPropertyValueSpecification,
          type: this.getLocalizedValueType(RawObjectDataProcessor.normalizeDataType(targetPropertyValueSpecification))
        })
      }`,
      `\n● Actual Value: ${ stringifyAndFormatArbitraryValue(targetPropertyValue) }`,
      ...isNotUndefined(targetPropertyStringifiedValueBeforeFirstPreValidationModification) ? [
        "\n● Value Before First Pre-validation Modification: " +
          targetPropertyStringifiedValueBeforeFirstPreValidationModification
      ] : []
    ].join("");
  },

  generateLanguageDependentErrorNumberHeadingPart: ({ messageNumber }: Readonly<{ messageNumber: number; }>): string =>
      `Error No. ${ messageNumber }`,


  /* ━━━ Validation Errors ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  /* [ To English Native Speakers Editors ]
   * Most of the following messages will be part of the above "generateValidationErrorMessage" template.
   * In the context of this template, the expressions like "this property" or "this string" are completely unambiguous. */
  validationErrors: {

    rawDataIsNotObject: {
      generateMessage:
          ({ actualNativeType, documentationPageAnchor }: ValidationErrors.RawDataIsNotObject.TemplateVariables): string =>
              "The data passed via first parameter of \"RawObjectDataProcessor.process()\" is not the object and " +
                `actually has type "${ actualNativeType }".\n` +
              rawObjectDataProcessorLocalization__english.generateSeeMoreSentence({ documentationPageAnchor })
    },

    rawDataIsNull: {
      generateMessage:
          ({ documentationPageAnchor }: ValidationErrors.RawDataIsNull.TemplateVariables): string =>
              "The data passed via first parameter of \"RawObjectDataProcessor.process()\" is null while non-null " +
                "object expected.\n" +
              rawObjectDataProcessorLocalization__english.generateSeeMoreSentence({ documentationPageAnchor })
    },

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

      generateDescription: (
        { stringifiedCaughtError }: ValidationErrors.PreValidationModificationFailed.TemplateVariables
      ): string =>
          "The following error has occurred during the pre-validation modification of this property/element. \n" +
            stringifiedCaughtError

    },


    /* ┅┅┅ Fixed Schema Objects ┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅ */
    /* ╍╍╍ Undefinedability ╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍ */
    forbiddenUndefinedValue: {
      title: "Forbidden Undefined Value",
      description:
          "This property/element is not defined or has explicit `undefined` value what has been explicitly forbidden."
    },

    conditionallyForbiddenUndefinedValue: {

      title: "Conditionally Forbidden Undefined Value",

      generateDescription: (
        {
          verbalConditionWhenUndefinedIsForbiddenWithoutEndOfSentenceMark
        }: ValidationErrors.ConditionallyForbiddenUndefinedValue.TemplateVariables
      ): string =>
          "This property/element is not defined or has explicit `undefined` value what has been forbidden when " +
            `${ verbalConditionWhenUndefinedIsForbiddenWithoutEndOfSentenceMark }, and this condition satisfied.`

    },

    conditionallyForbiddenNonUndefinedValue: {

      title: "Conditionally Forbidden non-undefined Value",

      generateDescription: (
        {
          verbalConditionWhenMustBeUndefinedWithoutEndOfSentenceMark
        }: ValidationErrors.ConditionallyForbiddenNonUndefinedValue.TemplateVariables
      ): string =>
          "This property/element is not `undefined` while must be `undefined` when " +
            `${ verbalConditionWhenMustBeUndefinedWithoutEndOfSentenceMark }, and this condition satisfied.`

    },


    /* ╍╍╍ Nullability ╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍ */
    forbiddenNullValue: {
      title: "Forbidden Null Value",
      description: "This property/element has `null` value what has been explicitly forbidden."
    },

    conditionallyForbiddenNullValue: {

      title: "Conditionally Forbidden Null Value",

      generateDescription: (
        {
          verbalConditionWhenNullIsForbiddenWithoutEndOfSentenceMark
        }: ValidationErrors.ConditionallyForbiddenNullValue.TemplateVariables
      ): string =>
          "This property/element has `null` value what has been forbidden when " +
            `${ verbalConditionWhenNullIsForbiddenWithoutEndOfSentenceMark }, and this condition satisfied.`

    },

    conditionallyForbiddenNonNullValue: {

      title: "Conditionally Forbidden non-null Value",

      generateDescription: (
        {
          verbalConditionWhenMustBeNullWithoutEndOfSentenceMark
        }: ValidationErrors.ConditionallyForbiddenNonNullValue.TemplateVariables
      ): string =>
          "This property/element is not `null` while must be `null` when " +
            `${ verbalConditionWhenMustBeNullWithoutEndOfSentenceMark }, and this condition has satisfied.`

    },


    /* ╍╍╍ Other ╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍ */
    unableToDeletePropertyWithOutdatedKey: {

      title: "Unable to Delete Property With Outdated Key",

      generateDescription: (
        { propertyNewKey }: ValidationErrors.UnableToDeletePropertyWithOutdatedKey.TemplateVariables
      ): string =>
          `Unable to delete this property after creating of its copy with name "${ propertyNewKey }" because it ` +
            "is not configurable while the selected processing approach is the manipulations with source object and " +
            "`mustLeaveEvenRenamed` option has not been set to `true`."

    },

    unableToChangePropertyDescriptors: {

      title: "Unable to Change Property Descriptors",

      description:
        "Unable to change the descriptions of this property because it is not configurable while the selected " +
          "processing approach is the manipulations with source object."

    },

    unableToUpdatePropertyValue: {

      title: "Unable to Update Property Value",

      description:
          "The updating of this property has been requested via default value substitution or pre-validation " +
            "modification while this property is read-only. "

    },

    unexpectedProperties: {

      title: "Unexpected Properties",

      generateDescription:
          ({ unexpectedProperties }: ValidationErrors.UnexpectedProperties.TemplateVariables): string =>
              "The following properties are the unexpected ones:\n" +
              unexpectedProperties.map((propertyKey: string): string => `● ${ propertyKey }`).join("\n")
    },

    customValidationFailed: {
      title: "Custom Validation has not Passed",
      generateDescription:
          ({ customValidationDescription }: ValidationErrors.CustomValidationFailed.TemplateVariables): string =>
              `This value has not passed the custom validation "${ customValidationDescription }".`
    },


    /* ┅┅┅ Associative Arrays ┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅ */
    associativeArrayEntriesCountIsLessThanRequiredMinimum: {
      title: "Too Few Entries in Associative Array",
      generateDescription: (
        {
          actualEntriesCount,
          minimalEntriesCount
        }: ValidationErrors.AssociativeArrayEntriesCountIsLessThanRequiredMinimum.TemplateVariables
      ): string =>
          `This value of associative array type has ${ actualEntriesCount } entries while at least ` +
            `${ minimalEntriesCount } expected.`
    },

    associativeArrayPairsCountIsMoreThanAllowedMaximum: {
      title: "Too Many Entries in Associative Array",
      generateDescription: (
        {
          maximalEntriesCount,
          actualEntriesCount
        }: ValidationErrors.AssociativeArrayPairsCountIsMoreThanAllowedMaximum.TemplateVariables
      ): string =>
          `This value of associative array type has ${ actualEntriesCount } entries while maximally ` +
            `${ maximalEntriesCount } expected.`
    },

    associativeArrayPairsCountDoesNotMatchWithSpecifiedExactNumber: {
      title: "Wrong Exact Number of Entries in Associative Array",
      generateDescription: (
        {
          exactEntriesCount,
          actualEntriesCount
        }: ValidationErrors.AssociativeArrayPairsCountDoesNotMatchWithSpecifiedExactNumber.TemplateVariables
      ): string =>
          `This value of associative array type has ${ exactEntriesCount } entries while exactly ${ actualEntriesCount } ` +
            "expected."
    },

    forbiddenForSpecificKeysUndefinedOrNullValuesFoundInAssociativeArrayTypeObject: {
      title: "Forbidden for Specific Keys of the Associative Array Undefined or Null Values",
      generateDescription: (
        { keysOfEitherUndefinedOrNullValues }:
            ValidationErrors.ForbiddenForSpecificKeysUndefinedOrNullValuesFoundInAssociativeArrayTypeObject.TemplateVariables
      ): string =>
          "The values of the following keys are either null or undefined while for these keys such values has " +
            "been forbidden.\n" +
          keysOfEitherUndefinedOrNullValues.
              map((keyOfEitherUndefinedOrNullValue: string): string => `  ● ${ keyOfEitherUndefinedOrNullValue }`).
              join("\n")
    },

    disallowedKeysFoundInAssociativeArray: {
      title: "Disallowed Keys of Associative Array",
      generateDescription: (
          { foundDisallowedKeys }: ValidationErrors.DisallowedKeysFoundInAssociativeArray.TemplateVariables
      ): string =>
          "The following keys presents in this associative array while these keys are disallowed.\n" +
          foundDisallowedKeys.
              map((foundDisallowedKey: string): string => `  ● ${ foundDisallowedKey }`).
              join("\n")
    },

    /* ┅┅┅ Indexed Arrays and Tuples ┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅ */
    indexedArrayElementsCountIsLessThanRequiredMinimum: {
      title: "Too Few Elements in Indexed Array",
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
      title: "Too Many Elements in Indexed Array",
      generateDescription: (
        {
          maximalElementsCount,
          actualElementsCount
        }: ValidationErrors.IndexedArrayElementsCountIsMoreThanAllowedMaximum.TemplateVariables
      ): string =>
          `This value of indexed array type has ${ actualElementsCount } elements while maximally ` +
            `${ maximalElementsCount } expected.`
    },

    indexedArrayOrTupleElementsCountDoesNotMatchWithSpecifiedExactNumber: {
      title: "Wrong Exact Number of Element in Indexed Array or Tuple",
      generateDescription: (
        {
          exactElementsCount,
          actualElementsCount
        }: ValidationErrors.IndexedArrayOrTupleElementsCountDoesNotMatchWithSpecifiedExactNumber.TemplateVariables
      ): string =>
          `This value of indexed array or tuple type has ${ actualElementsCount } elements while exactly ` +
            `${ exactElementsCount } expected.`
    },


    /* ┅┅┅ Numbers ┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅ */
    forbiddenNaN_Value: {
      title: "Forbidden NaN Value Of Numeric Property/Element",
      description:
          "The value of this numeric property or element is NaN while it has not been allowed. "
    },

    numericValueIsNotBelongToExpectedNumbersSet: {
      title: "Expected and Actual Numbers Set Mismatch",
      generateDescription: (
        { expectedNumberSet }: ValidationErrors.NumericValueIsNotBelongToExpectedNumbersSet.TemplateVariables
      ): string =>
          "Contrary to expectations, this numeric value is not member of " +
            `"${ rawObjectDataProcessorLocalization__english.getLocalizedNumbersSet(expectedNumberSet) }" number set.`
    },

    /* [ Approach ] Applicable also to string properties. */
    valueIsNotAmongAllowedAlternatives: {
      title: "Disallowed Alternative of Value",
      generateDescription: (
        { allowedAlternatives }: ValidationErrors.ValueIsNotAmongAllowedAlternatives.TemplateVariables
      ): string =>
          "This value is not among following allowed alternatives:\n" +
          allowedAlternatives.
              map(
                (allowedAlternative: string | number): string =>
                    `  ○ ${ allowedAlternative }`
              ).
              join("\n")
    },

    numericValueIsSmallerThanRequiredMinimum: {
      title: "Minimal Value Fall Short",
      generateDescription: (
        { requiredMinimum }: ValidationErrors.NumericValueIsSmallerThanRequiredMinimum.TemplateVariables
      ): string =>
          `This value is smaller than required minimal value ${ requiredMinimum }.`
    },

    numericValueIsGreaterThanAllowedMaximum: {
      title: "Maximal Value Exceeding",
      generateDescription: (
        { allowedMaximum }: ValidationErrors.NumericValueIsGreaterThanAllowedMaximum.TemplateVariables
      ): string =>
          `This value is greater than allowed maximal value ${ allowedMaximum }.`
    },


    /* ╍╍╍ Strings ╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍ */
    charactersCountIsLessThanRequired: {
      title: "Minimal Characters Count Fall Short",
      generateDescription: (
        {
          minimalCharactersCount,
          realCharactersCount
        }: ValidationErrors.CharactersCountIsLessThanRequired.TemplateVariables
      ): string =>
          `This string has ${ realCharactersCount } characters while at least ${ minimalCharactersCount } required.`
    },

    charactersCountIsMoreThanAllowed: {
      title: "Maximal Characters Count Exceeding",
      generateDescription: (
        {
          maximalCharactersCount,
          realCharactersCount
        }: ValidationErrors.CharactersCountIsMoreThanAllowed.TemplateVariables
      ): string =>
          `This string has ${ realCharactersCount } characters while maximally ${ maximalCharactersCount } allowed.`
    },

    charactersCountDoesNotMatchWithSpecified: {
      title: "Fixed Characters Count Mismatch",
      generateDescription: (
        {
          fixedCharactersCount,
          realCharactersCount
        }: ValidationErrors.CharactersCountDoesNotMatchWithSpecified.TemplateVariables
      ): string =>
          `The value has ${ realCharactersCount } characters while exactly ${ fixedCharactersCount } required.`
    },

    forbiddenCharactersFound: {
      title: "Forbidden Characters",
      generateDescription: (
        { foundForbiddenCharacters }: ValidationErrors.ForbiddenCharactersFound.TemplateVariables
      ): string =>
          "This string including the following characters which has been forbidden:\n" +
            foundForbiddenCharacters.map((character: string): string => `● ${ character }`).join("\n")
    },

    regularExpressionMismatch: {
      title: "Regular Expression Mismatch",
      generateDescription:
          ({ regularExpression }: ValidationErrors.RegularExpressionMismatch.TemplateVariables): string =>
              `This string does not match with specified regular expression:\n ${ regularExpression.toString() }`
    },


    /* ╍╍╍ Other ╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍ */
    disallowedBooleanValueVariant: {
      title: "Disallowed Boolean Variant",
      generateDescription: (
        { disallowedVariant }: ValidationErrors.DisallowedBooleanValueVariant.TemplateVariables
      ): string =>
          `This boolean value is ${ disallowedVariant } while only ${ !disallowedVariant } allowed.`
    },

    unsupportedValueType: {
      title: "Unsupported Value Type",
      generateDescription:
          ({ targetPropertyType }: ValidationErrors.UnsupportedValueType.TemplateVariables): string =>
              `This value has type ${ targetPropertyType } which currently not supported as any other type incompatible ` +
                "with JSON."
    }

  },


  /* ━━━ Throwable Errors ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  /* [ To English Native Speakers Editors ]
   * Unlike the validation errors case, the following messages are not part of the template, including to above
   * `generateValidationErrorMessage`, thus the context-dependent expressions like "this property" or "this string"
   * will be unclear. */
  throwableErrors: {

    objectSchemaNotSpecified: {

      title: "Object Schema Not Specified",

      generateDescription: (
        {
          targetPropertyDotSeparatedQualifiedName,
          documentationPageAnchor
        }: ThrowableErrors.MutuallyExclusiveTransformationsBetweenUndefinedAndNull.TemplateVariables
      ): string =>
          `Object schema is not specified for "${ targetPropertyDotSeparatedQualifiedName }". ` +
          rawObjectDataProcessorLocalization__english.generateSeeMoreSentence({ documentationPageAnchor })
    },

    mutuallyExclusiveTransformationsBetweenUndefinedAndNull: {

      title: "Mutually Exclusive Transformations Between Undefined and Null",

      generateDescription: (
        {
          targetPropertyDotSeparatedQualifiedName,
          documentationPageAnchor
        }: ThrowableErrors.MutuallyExclusiveTransformationsBetweenUndefinedAndNull.TemplateVariables
      ): string =>
        "Both \"mustTransformUndefinedToNull\" and \"mustTransformNullToUndefined\" options has been specified with " +
          `\`true\` value for the property "${ targetPropertyDotSeparatedQualifiedName }" what is the contradiction. ` +
        rawObjectDataProcessorLocalization__english.generateSeeMoreSentence({ documentationPageAnchor })
    },

    preValidationModificationFailed: {

      title: "Pre-validation Modification Failed",

      generateDescription: (
        {
          targetPropertyDotSeparatedQualifiedName,
          documentationPageAnchor
        }: ThrowableErrors.PreValidationModificationFailed.TemplateVariables
      ): string =>
        "The error has occurred during the pre-validation modification of the property/element " +
          `"${ targetPropertyDotSeparatedQualifiedName }". ` +
        rawObjectDataProcessorLocalization__english.generateSeeMoreSentence({ documentationPageAnchor })

    },

    propertyUndefinedabilityNotSpecified: {

      title: "Property Undefinedability has not been Specified",
      generateDescription: (
        {
          targetPropertyDotSeparatedQualifiedName,
          documentationPageAnchor
        }: ThrowableErrors.PropertyUndefinedabilityNotSpecified.TemplateVariables
      ): string =>
        "It has not been specified how to process the undefined value of the property " +
          `"${ targetPropertyDotSeparatedQualifiedName }". ` +
        rawObjectDataProcessorLocalization__english.generateSeeMoreSentence({ documentationPageAnchor })

    },

    propertyNullabilityNotSpecified: {

      title: "Property Nullability has not been Specified",
      generateDescription: (
        {
          targetPropertyDotSeparatedQualifiedName,
          documentationPageAnchor
        }: ThrowableErrors.PropertyNullabilityNotSpecified.TemplateVariables
      ): string =>
          "It has not been specified how to process the null value of the property " +
            `"${ targetPropertyDotSeparatedQualifiedName }". ` +
        rawObjectDataProcessorLocalization__english.generateSeeMoreSentence({ documentationPageAnchor })

    },

    dataTypeNotSpecified: {

      title: "Unsupported or Not Specified Data Type",
      generateDescription: (
        {
          targetPropertyDotSeparatedQualifiedName,
          specifiedStringifiedType,
          documentationPageAnchor
        }: ThrowableErrors.DataTypeNotSpecified.TemplateVariables
      ): string =>
          (
            isUndefined(specifiedStringifiedType) ?
                "Data type has not " :
                `Unsupported data type "${ specifiedStringifiedType } has "`
          ) +
          `been specified for property/element "${ targetPropertyDotSeparatedQualifiedName }". ` +
          rawObjectDataProcessorLocalization__english.generateSeeMoreSentence({ documentationPageAnchor })

    },

    unableToDeletePropertyWithOutdatedKey: {

      title: "Unable to Delete Property With Outdated Key",

      generateDescription: (
        {
          targetPropertyDotSeparatedQualifiedName,
          propertyNewKey,
          documentationPageAnchor
        }: ThrowableErrors.UnableToDeletePropertyWithOutdatedKey.TemplateVariables
      ): string =>
          `Unable to delete the property "${ targetPropertyDotSeparatedQualifiedName }" after creating of its copy ` +
            `with name "${ propertyNewKey }" because it is not configurable while the processing approach is the ` +
            "manipulations with source object and \"mustLeaveEvenRenamed\" has not been set to `true`. " +
          rawObjectDataProcessorLocalization__english.generateSeeMoreSentence({ documentationPageAnchor })

    },

    unableToChangePropertyDescriptors: {

      title: "Unable to Change Property Descriptors",

      generateDescription: (
        {
          targetPropertyDotSeparatedQualifiedName,
          documentationPageAnchor
        }: ThrowableErrors.UnableToChangePropertyDescriptors.TemplateVariables
      ): string =>
          `Unable to change the description of property "${ targetPropertyDotSeparatedQualifiedName }" because this ` +
            "property is not configurable while the processing approach is the manipulations with source object. " +
          rawObjectDataProcessorLocalization__english.generateSeeMoreSentence({ documentationPageAnchor })

    },

    unableToUpdatePropertyValue: {

      title: "Unable to Update Property Value",

      generateDescription: (
        {
          targetPropertyDotSeparatedQualifiedName,
          documentationPageAnchor
        }: ThrowableErrors.UnableToUpdatePropertyValue.TemplateVariables
      ): string =>
          `The updating of the property "${ targetPropertyDotSeparatedQualifiedName }" has been requested via default ` +
            "value substitution or pre-validation modification while this property is read-only. " +
          rawObjectDataProcessorLocalization__english.generateSeeMoreSentence({ documentationPageAnchor })

    },

    mutuallyExclusiveAssociativeArrayKeysLimitations: {

      title: "Mutually Exclusive Associative Array Keys Limitations",

      generateDescription: (
        {
          targetPropertyDotSeparatedQualifiedName,
          documentationPageAnchor
        }: ThrowableErrors.
            MutuallyExclusiveAssociativeArrayKeysLimitations.TemplateVariables
      ): string =>
          "Both allowed and forbidden keys has been specified for " +
              (
                isNull(targetPropertyDotSeparatedQualifiedName) ?
                  "root associative array " :
                  `associative array "${ targetPropertyDotSeparatedQualifiedName }" `
              ) +
              " what it the contradiction. " +
              rawObjectDataProcessorLocalization__english.generateSeeMoreSentence({ documentationPageAnchor })
    },

    incompatibleValuesTypesAlternatives: {
      title: "Incompatible Values Types Alternatives",
      generateDescription: (
        {
          isIndexedArrayLikeType,
          documentationPageAnchor
        }: ThrowableErrors.IncompatibleValuesTypesAlternatives.TemplateVariables
      ): string =>
          "The" +
            (
              isIndexedArrayLikeType ?
                  "`ValuesTypesIDs.indexedArray` (aliased as `Array`) and `ValuesTypesIDs.tuple`" :
                  "`ValuesTypesIDs.fixedSchemaObject` (aliased as `Object`) and `ValuesTypesIDs.associativeArray`"
            ) +
            " are incompatible alternatives of `ValuesTypesIDs.polymorphic` because from the viewpoint of ECMAScript " +
            `both are the ${ isIndexedArrayLikeType ? "`Array`" : "`Object`" }. ` +
          rawObjectDataProcessorLocalization__english.generateSeeMoreSentence({ documentationPageAnchor })
    },

    bothAllowedAndForbiddenCharactersSpecified: {
      title: "Both Allowed And Forbidden Characters Specified",
      generateDescription: (
        {
          targetPropertyDotSeparatedQualifiedName,
          documentationPageAnchor
        }: ThrowableErrors.BothAllowedAndForbiddenCharactersSpecified.TemplateVariables
      ): string =>
          "Both allowed and forbidden characters has been specified for the string-type property/element " +
            `${ targetPropertyDotSeparatedQualifiedName } what it the contradiction. ` +
          rawObjectDataProcessorLocalization__english.generateSeeMoreSentence({ documentationPageAnchor })
    }

  },

  /* ━━━ Warnings ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  warnings: {

    preValidationModificationFailed: {

      title: "Pre-validation Modification Failed",

      generateDescription: (
        {
          targetPropertyDotSeparatedQualifiedName,
          stringifiedCaughtError,
          documentationPageAnchor
        }: Warnings.PreValidationModificationFailed.TemplateVariables
      ): string =>
          "The error has occurred during the pre-validation modification of the property/element " +
            `"${ targetPropertyDotSeparatedQualifiedName }".\n` +
          `${ stringifiedCaughtError }\n` +
          rawObjectDataProcessorLocalization__english.generateSeeMoreSentence({ documentationPageAnchor })

    },

    unableToDeletePropertyWithOutdatedKey: {

      title: "Unable to Delete Property With Outdated Key",

      generateDescription: (
        {
          targetPropertyDotSeparatedQualifiedName,
          propertyNewKey,
          documentationPageAnchor
        }: Warnings.UnableToDeletePropertyWithOutdatedKey.TemplateVariables
      ): string =>
          `Unable to delete the property "${ targetPropertyDotSeparatedQualifiedName }" after creating of its copy ` +
            `with name "${ propertyNewKey }" because it is not configurable while the processing approach is the ` +
            "manipulations with source object and \"mustLeaveEvenRenamed\" has not been set to `true`. " +
          rawObjectDataProcessorLocalization__english.generateSeeMoreSentence({ documentationPageAnchor })

    },

    unableToChangePropertyDescriptors: {

      title: "Unable to Change Property Descriptors",

      generateDescription: (
        {
          targetPropertyDotSeparatedQualifiedName,
          documentationPageAnchor
        }: Warnings.UnableToChangePropertyDescriptors.TemplateVariables
      ): string =>
          `Unable to change the description of property "${ targetPropertyDotSeparatedQualifiedName }" because this ` +
            "property is not configurable while the processing approach is the manipulations with source object. " +
          rawObjectDataProcessorLocalization__english.generateSeeMoreSentence({ documentationPageAnchor })

    },

    unableToUpdatePropertyValue: {

      title: "Unable to Update property Value",

      generateDescription: (
        {
          targetPropertyDotSeparatedQualifiedName,
          documentationPageAnchor
        }: Warnings.UnableToUpdatePropertyValue.TemplateVariables
      ): string =>
          `The updating of the property "${ targetPropertyDotSeparatedQualifiedName }" has been requested via default ` +
            "value substitution or pre-validation modification while this property is read-only. " +
          rawObjectDataProcessorLocalization__english.generateSeeMoreSentence({ documentationPageAnchor })

    }

  },


  /* ━━━ Terms ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  getLocalizedValueType(valueTypeID: RawObjectDataProcessor.ValuesTypesIDs): string {

    switch (valueTypeID) {

      case RawObjectDataProcessor.ValuesTypesIDs.number: return "number";
      case RawObjectDataProcessor.ValuesTypesIDs.string: return "string";
      case RawObjectDataProcessor.ValuesTypesIDs.boolean: return "boolean";

      case RawObjectDataProcessor.ValuesTypesIDs.fixedSchemaObject: return "object of fixed schema";
      case RawObjectDataProcessor.ValuesTypesIDs.associativeArray: return "associative array type object";
      case RawObjectDataProcessor.ValuesTypesIDs.indexedArray: return "indexed array";
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
      case RawObjectDataProcessor.NumbersSets.naturalNumberOrZero: return "natural number or zero";
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
