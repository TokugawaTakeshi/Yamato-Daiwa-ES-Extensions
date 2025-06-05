import type { ArbitraryObject } from "../Types/ArbitraryObject";
import type {
  PossiblyReadonlyParsedJSON,
  ParsedJSON_Array,
  ParsedJSON_NestedProperty,
  ParsedJSON_Object,
  ReadonlyParsedJSON_Array
} from "../Types/ParsedJSON";

import rawObjectDataProcessorLocalization__english from "./RawObjectDataProcessorLocalization.english";

import surroundLabelByOrnament from "../Strings/surroundLabelByOrnament";
import stringifyAndFormatArbitraryValue from "../Strings/stringifyAndFormatArbitraryValue";
import removeArrayElementsByPredicates from "../Arrays/07-RemovingOfElements/removeArrayElementsByPredicates";
import SpaceCharacters from "../Strings/CharactersAssets/SpaceCharacters";

import Logger from "../Logging/Logger";
import InvalidParameterValueError from "../Errors/InvalidParameterValue/InvalidParameterValueError";

import isUndefined from "../TypeGuards/Nullables/isUndefined";
import isNotUndefined from "../TypeGuards/Nullables/isNotUndefined";
import isNull from "../TypeGuards/Nullables/isNull";
import isNotNull from "../TypeGuards/Nullables/isNotNull";
import isNumber from "../TypeGuards/Numbers/isNumber";
import isNaturalNumber from "../TypeGuards/Numbers/isNaturalNumber";
import isNegativeInteger from "../TypeGuards/Numbers/isNegativeInteger";
import isNegativeIntegerOrZero from "../TypeGuards/Numbers/isNegativeIntegerOrZero";
import isPositiveIntegerOrZero from "../TypeGuards/Numbers/isPositiveIntegerOrZero";
import isPositiveDecimalFraction from "../TypeGuards/Numbers/isPositiveDecimalFraction";
import isNegativeDecimalFraction from "../TypeGuards/Numbers/isNegativeDecimalFraction";
import isDecimalFractionOfAnySign from "../TypeGuards/Numbers/isDecimalFractionOfAnySign";
import isString from "../TypeGuards/Strings/isString";
import isBoolean from "../TypeGuards/isBoolean";

import isNonEmptyArray from "../TypeGuards/Arrays/isNonEmptyArray";
import undefinedToNull from "../ValueTransformers/undefinedToNull";
import nullToUndefined from "../ValueTransformers/nullToUndefined";
import isEitherUndefinedOrNull from "../TypeGuards/Nullables/isEitherUndefinedOrNull";
import isNeitherUndefinedNorNull from "../TypeGuards/Nullables/isNeitherUndefinedNorNull";
import emptyStringToNull from "../ValueTransformers/emptyStringToNull";


class RawObjectDataProcessor {

  public static defaultLocalization: RawObjectDataProcessor.Localization = rawObjectDataProcessorLocalization__english;

  private readonly rawData: ArbitraryObject;
  private readonly processingApproach: RawObjectDataProcessor.ProcessingApproaches;
  private readonly localization: RawObjectDataProcessor.Localization;
  private readonly errorHandlingStrategies: RawObjectDataProcessor.ErrorsHandlingStrategies;

  private readonly validationErrorsMessages: Array<string> = [];

  private readonly currentlyIteratedObjectPropertyQualifiedInitialNameSegmentsForLogging: Array<string | number> = [];
  private currentlyIteratedPropertyNewNameForLogging: string | null = null;


  /* ━━━ Public Static Methods ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  public static process<
    ProcessedData extends PossiblyReadonlyParsedJSON,
    InterimValidData = ProcessedData
  >(
    rawData: unknown,
    validDataSpecification: RawObjectDataProcessor.ObjectDataSpecification,
    options: RawObjectDataProcessor.Options = {}
  ): RawObjectDataProcessor.ProcessingResult<ProcessedData> {

    const localization: RawObjectDataProcessor.Localization =
        options.localization ?? RawObjectDataProcessor.defaultLocalization;

    if (typeof rawData !== "object") {
      return {
        isRawDataInvalid: true,
        validationErrorsMessages: [
          localization.validationErrors.rawDataIsNotObject.generateMessage({ actualNativeType: typeof rawData })
        ]
      };
    }


    /* [ Theory ]
     * Because `typeof null` is `"object"`, besides `typeof` check it is required to check is value the null for the
     *   accurate error message. */
    if (isNull(rawData)) {
      return {
        isRawDataInvalid: true,
        validationErrorsMessages: [ localization.validationErrors.rawDataIsNull ]
      };
    }


    const dataHoldingSelfInstance: RawObjectDataProcessor = new RawObjectDataProcessor({
      /* eslint-disable-next-line @typescript-eslint/consistent-type-assertions --
       * The conditions of `ArbitraryObject` has been satisfied, but here instead on `ArbitraryObject` type guard
       *   separate check for object and separate check for null has been executed for accurate error messages. */
      rawData: rawData as ArbitraryObject,
      processingApproach: options.processingApproach,
      errorHandlingStrategies: options.errorsHandlingStrategies,
      localization
    });


    let rawDataProcessingResult: RawObjectDataProcessor.ValueProcessingResult;

    switch (validDataSpecification.subtype) {

      case RawObjectDataProcessor.ObjectSubtypes.fixedSchema: {

        rawDataProcessingResult = dataHoldingSelfInstance.processFixedSchemaObjectTypeValue({
          topLevelObject: dataHoldingSelfInstance.rawData,
          targetObjectTypeValueSpecification: {
            ...{ type: RawObjectDataProcessor.ValuesTypesIDs.fixedSchemaObject },
            ...validDataSpecification
          }
        });

        break;

      }

      // ━━━ TODO ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      case RawObjectDataProcessor.ObjectSubtypes.associativeArray: {

        rawDataProcessingResult = dataHoldingSelfInstance.processAssociativeArrayTypeValue({
          topLevelObject: dataHoldingSelfInstance.rawData,
          targetAssociativeArrayTypeValueSpecification: {
            ...{ type: RawObjectDataProcessor.ValuesTypesIDs.associativeArray },
            ...validDataSpecification
          }
        });

        break;

      }

      case RawObjectDataProcessor.ObjectSubtypes.indexedArray: {

        rawDataProcessingResult = dataHoldingSelfInstance.processIndexedArrayTypeValue({
          topLevelObject: dataHoldingSelfInstance.rawData,
          targetIndexedArrayTypeValueSpecification: {
            ...{ type: RawObjectDataProcessor.ValuesTypesIDs.indexedArray },
            ...validDataSpecification
          }
        });

        break;

      }

      case RawObjectDataProcessor.ObjectSubtypes.tuple: {

        rawDataProcessingResult = dataHoldingSelfInstance.processTupleTypeValue({
          topLevelObject: dataHoldingSelfInstance.rawData,
          targetTupleTypeValueSpecification: {
            ...{ type: RawObjectDataProcessor.ValuesTypesIDs.tuple },
            ...validDataSpecification
          }
        });

      }

    }

    /* [ Theory ]
     * Although for the top-level object the
     *   "thisOneIsValidButPostProcessingDisabledForPerformanceBecauseDataIsInvalidInLarge" scenario is impossible
     *   unless the bug, this condition must be checked to calm the TypeScript. */
    if (
      "isInvalid" in rawDataProcessingResult ||
      "thisOneIsValidButPostProcessingDisabledForPerformanceBecauseDataIsInvalidInLarge" in rawDataProcessingResult
    ) {
      return {
        isRawDataInvalid: true,
        validationErrorsMessages: dataHoldingSelfInstance.validationErrorsMessages
      };
    }

    return {

      isRawDataInvalid: false,

      /* eslint-disable @typescript-eslint/consistent-type-assertions --
       * Since the type aliases and interfaces are not existing at transpiled JavaScript it is impossible to
       *   programmatically provide the correspondence between `validDataSpecification` object and
       *   `ProcessedData` type. So, the type assertion reinforced by preliminary validation is the best that possible
       *    ever there is no guarantee about validation rules are completely corresponding to desired type. */
      processedData: isUndefined(options.postProcessing) ?
          rawDataProcessingResult.processedValue as ProcessedData :
          options.postProcessing<InterimValidData, ProcessedData>(rawDataProcessingResult.processedValue as InterimValidData)
      /* eslint-enable @typescript-eslint/consistent-type-assertions */

    };

  }

  public static formatValidationErrorsList(
    messages: ReadonlyArray<string>,
    localization: RawObjectDataProcessor.Localization = RawObjectDataProcessor.defaultLocalization
  ): string {
    return messages.
        map(
          (message: string, index: number): string => [
            surroundLabelByOrnament({
              label: localization.generateLanguageDependentErrorNumberHeadingPart({ messageNumber: index + 1 }),
              characterForIndentationAroundLabel: SpaceCharacters.regularSpace,
              ornamentPatten: "─",
              prependedPartCharactersCount: 3,
              totalCharactersCount: 80
            }),
            message
          ].join("\n")
        ).
        join("\n\n");
  }

  /* [ Usage ] For testing purposes */
  public static generateValidationErrorMessage(
    payload: RawObjectDataProcessor.Localization.DataForMessagesBuilding,
    localization: RawObjectDataProcessor.Localization = RawObjectDataProcessor.defaultLocalization
  ): string {
    return localization.generateValidationErrorMessage(payload);
  }


  /* ━━━ Constructor ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  private constructor(
    {
      rawData,
      processingApproach = RawObjectDataProcessor.ProcessingApproaches.assemblingOfNewObject,
      localization,
      errorHandlingStrategies = {}
    }: Readonly<{
      rawData: ArbitraryObject;
      processingApproach?: RawObjectDataProcessor.ProcessingApproaches;
      localization: RawObjectDataProcessor.Localization;
      errorHandlingStrategies?: Partial<RawObjectDataProcessor.ErrorsHandlingStrategies>;
    }>
  ) {

    this.rawData = rawData;
    this.processingApproach = processingApproach;
    this.localization = localization;

    this.errorHandlingStrategies = {
      onPreValidationModificationFailed:
          errorHandlingStrategies.onPreValidationModificationFailed ??
          RawObjectDataProcessor.ErrorHandlingStrategies.throwingOfError,
      onUnableToDeletePropertyWithOutdatedValue:
          errorHandlingStrategies.onUnableToDeletePropertyWithOutdatedValue ??
          RawObjectDataProcessor.ErrorHandlingStrategies.throwingOfError,
      onUnableToChangePropertyDescriptors:
          errorHandlingStrategies.onUnableToChangePropertyDescriptors ??
          RawObjectDataProcessor.ErrorHandlingStrategies.throwingOfError,
      onUnableToUpdatePropertyValue:
          errorHandlingStrategies.onUnableToUpdatePropertyValue ??
          RawObjectDataProcessor.ErrorHandlingStrategies.throwingOfError
    };

  }


  /* ━━━ Private Methods ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  /* ─── Processing of Object Subtypes (Including Top-level Ones) ─────────────────────────────────────────────────── */
  private processFixedSchemaObjectTypeValue(
    {
      targetObjectTypeValueSpecification,
      parentObject,
      targetPropertyStringifiedValueBeforeFirstPreValidationModification,
      ...compoundParameter
    }: Readonly<
      (
        { topLevelObject: ArbitraryObject; } |
        { notCheckedForObjectYetNonNullValueOfSubsequentLevel__expectedToBeObject: Exclude<unknown, undefined | null>; } |
        { preCheckedForNonNullObjectValueOfSubsequentLevel__expectedToBeObject: ArbitraryObject; }
      ) &
      {
        targetObjectTypeValueSpecification: RawObjectDataProcessor.FixedSchemaObjectValueSpecification;
        parentObject?: ArbitraryObject;
        targetPropertyStringifiedValueBeforeFirstPreValidationModification?: string;
      }
    >
  ): RawObjectDataProcessor.ValueProcessingResult {

    let targetObjectTypeSourceValue: ArbitraryObject;

    if ("topLevelObject" in compoundParameter) {

      targetObjectTypeSourceValue = compoundParameter.topLevelObject;

    } else if ("notCheckedForObjectYetNonNullValueOfSubsequentLevel__expectedToBeObject" in compoundParameter) {

      if (typeof compoundParameter.notCheckedForObjectYetNonNullValueOfSubsequentLevel__expectedToBeObject !== "object") {

        this.registerValidationError({
          title: this.localization.validationErrors.valueTypeDoesNotMatchWithExpected.title,
          description: this.localization.validationErrors.valueTypeDoesNotMatchWithExpected.
              generateDescription({
                actualNativeType:
                    typeof compoundParameter.notCheckedForObjectYetNonNullValueOfSubsequentLevel__expectedToBeObject,
                expectedTypeID: RawObjectDataProcessor.ValuesTypesIDs.fixedSchemaObject
              }),
          targetPropertyDotSeparatedQualifiedInitialName: this.currentObjectPropertyDotSeparatedQualifiedName,
          targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
          targetPropertyValue: compoundParameter.notCheckedForObjectYetNonNullValueOfSubsequentLevel__expectedToBeObject,
          targetPropertyValueSpecification: targetObjectTypeValueSpecification,
          targetPropertyStringifiedValueBeforeFirstPreValidationModification
        });

        return { isInvalid: true };

      }


      targetObjectTypeSourceValue = (
        /* eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- [ Performance Optimization ]
         * The non-null check has been done already for `targetValue`, no need to do it again by `isArbitraryObject` type
         *  guard.  */
        compoundParameter.notCheckedForObjectYetNonNullValueOfSubsequentLevel__expectedToBeObject as ArbitraryObject
      );

    } else {

      targetObjectTypeSourceValue = compoundParameter.preCheckedForNonNullObjectValueOfSubsequentLevel__expectedToBeObject;

    }

    let processedValueWorkpiece: ArbitraryObject =
        this.processingApproach === RawObjectDataProcessor.ProcessingApproaches.manipulationsWithSourceObject ?
            targetObjectTypeSourceValue : {};

    const currentObjectDepthLevel__countFromZero: number =
        this.currentlyIteratedObjectPropertyQualifiedInitialNameSegmentsForLogging.length;

    const initialNamesOfNotCheckedYetProperties: Array<string> = Object.keys(targetObjectTypeSourceValue);

    let hasAtLeastOneInvalidPropertyBeenDetected: boolean = false;
    let hasAllChildrenPropertiesValuesDefinitelyNotChanged: boolean = true;

    let propertiesSpecification: RawObjectDataProcessor.PropertiesSpecification | undefined;

    if (isNotUndefined(targetObjectTypeValueSpecification.properties)) {

      propertiesSpecification = targetObjectTypeValueSpecification.properties;

    } else if (isNotUndefined(targetObjectTypeValueSpecification.possibleSchemas)) {

      for (const possibleSchema of Object.values(targetObjectTypeValueSpecification.possibleSchemas.conditionals)) {

        if (
          possibleSchema.actualIf({
            rawData__currentObjectDepth: targetObjectTypeSourceValue,
            rawData__full: this.rawData,
            targetPropertyDotSeparatedPath: this.currentObjectPropertyDotSeparatedQualifiedName
          })
        ) {
          propertiesSpecification = possibleSchema.properties;
          break;
        }


        propertiesSpecification = targetObjectTypeValueSpecification.possibleSchemas.default;

      }

    }

    if (isUndefined(propertiesSpecification)) {

      Logger.throwErrorAndLog({
        errorType: RawObjectDataProcessor.ThrowableErrorsNames.objectSchemaNotSpecified,
        title: this.localization.throwableErrors.objectSchemaNotSpecified.title,
        description: this.localization.throwableErrors.objectSchemaNotSpecified.generateDescription({
          targetPropertyDotSeparatedQualifiedName: this.currentObjectPropertyDotSeparatedQualifiedName
        }),
        occurrenceLocation: "RawObjectDataProcessor.processFixedSchemaObjectTypeValue(compoundParameter)"
      });

    }


    for (const [ childPropertyInitialName, childPropertySpecification ] of Object.entries(propertiesSpecification)) {

      removeArrayElementsByPredicates({
        targetArray: initialNamesOfNotCheckedYetProperties,
        predicate: (propertyName: string): boolean => propertyName === childPropertyInitialName,
        mutably: true
      });

      this.currentlyIteratedObjectPropertyQualifiedInitialNameSegmentsForLogging[
        currentObjectDepthLevel__countFromZero
      ] = childPropertyInitialName;

      let childPropertyFinalName: string;

      if (isUndefined(childPropertySpecification.newName)) {
        childPropertyFinalName = childPropertyInitialName;
        this.currentlyIteratedPropertyNewNameForLogging = null;
      } else {
        childPropertyFinalName = childPropertySpecification.newName;
        this.currentlyIteratedPropertyNewNameForLogging = childPropertyFinalName;
      }

      if (
        childPropertySpecification.mustTransformUndefinedToNull === true &&
            childPropertySpecification.mustTransformNullToUndefined === true
      ) {
        Logger.throwErrorAndLog({
          errorType: RawObjectDataProcessor.ThrowableErrorsNames.mutuallyExclusiveTransformationsBetweenUndefinedAndNull,
          title: this.localization.throwableErrors.mutuallyExclusiveTransformationsBetweenUndefinedAndNull.title,
          description: this.localization.throwableErrors.mutuallyExclusiveTransformationsBetweenUndefinedAndNull.
              generateDescription({
                targetPropertyDotSeparatedQualifiedName: this.currentObjectPropertyDotSeparatedQualifiedName
              }),
          occurrenceLocation: "RawObjectDataProcessor.processFixedSchemaObjectTypeValue(compoundParameter)"
        });
      }


      let hasChildPropertyValueDefinitelyNotChanged: boolean = true;

      const preValidationModifications: ReadonlyArray<RawObjectDataProcessor.PreValidationModification> =
          RawObjectDataProcessor.getNormalizedPreValidationModifications({
            mustTransformUndefinedToNull: childPropertySpecification.mustTransformUndefinedToNull,
            mustTransformNullToUndefined: childPropertySpecification.mustTransformNullToUndefined,
            customPreValidationModificationOrMultipleOfThem: childPropertySpecification.preValidationModifications
          });

      let childPropertyMutableValue: unknown = targetObjectTypeSourceValue[childPropertyInitialName];
      let childPropertyStringifiedValueBeforeFirstPreValidationModification: string | undefined;

      if (preValidationModifications.length > 0) {

        childPropertyStringifiedValueBeforeFirstPreValidationModification =
            stringifyAndFormatArbitraryValue(childPropertyMutableValue);

        hasChildPropertyValueDefinitelyNotChanged = false;
        hasAllChildrenPropertiesValuesDefinitelyNotChanged = false;

      }

      for (const preValidationModification of preValidationModifications) {

        try {

          childPropertyMutableValue = preValidationModification(childPropertyMutableValue);

        } catch (error: unknown) {

          this.handleFailedPreValidationModification({
            error,
            propertyOrElementMutableValue: childPropertyMutableValue,
            propertyOrElementValueSpecification: childPropertySpecification,
            propertyOrElementStringifiedValueBeforeFirstPreValidationModification:
                childPropertyStringifiedValueBeforeFirstPreValidationModification,
            occurrenceMethodName: "processFixedSchemaObjectTypeValue"
          });

        }

      }


      /* ─── Undefinedability ─────────────────────────────────────────────────────────────────────────────────────── */
      if (
        !isBoolean(childPropertySpecification.isUndefinedForbidden) &&
        isUndefined(childPropertySpecification.undefinedForbiddenIf) &&
        isUndefined(childPropertySpecification.undefinedValueSubstitution) &&
        childPropertySpecification.mustTransformUndefinedToNull !== true
      ) {
        Logger.throwErrorAndLog({
          errorType: RawObjectDataProcessor.ThrowableErrorsNames.propertyUndefinedabilityNotSpecified,
          title: this.localization.throwableErrors.propertyUndefinedabilityNotSpecified.title,
          description: this.localization.throwableErrors.propertyUndefinedabilityNotSpecified.generateDescription({
            targetPropertyDotSeparatedQualifiedName: this.currentObjectPropertyDotSeparatedQualifiedName
          }),
          occurrenceLocation: "RawObjectDataProcessor.processFixedSchemaObjectTypeValue(compoundParameter)"
        });
      }


      if (isUndefined(childPropertyMutableValue)) {

        if (childPropertySpecification.isUndefinedForbidden === true) {

          hasAtLeastOneInvalidPropertyBeenDetected = true;

          this.registerValidationError({
            ...this.localization.validationErrors.forbiddenUndefinedValue,
            targetPropertyDotSeparatedQualifiedInitialName: this.currentObjectPropertyDotSeparatedQualifiedName,
            targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
            targetPropertyValue: childPropertyMutableValue,
            targetPropertyValueSpecification: childPropertySpecification,
            targetPropertyStringifiedValueBeforeFirstPreValidationModification:
                childPropertyStringifiedValueBeforeFirstPreValidationModification
          });

          continue;

        }


        if (isNotUndefined(childPropertySpecification.undefinedForbiddenIf)) {

          if (
            childPropertySpecification.undefinedForbiddenIf.predicate({
              rawData__currentObjectDepth: targetObjectTypeSourceValue,
              rawData__full: this.rawData,
              targetPropertyDotSeparatedPath: this.currentObjectPropertyDotSeparatedQualifiedName
            })
          ) {

            hasAtLeastOneInvalidPropertyBeenDetected = true;

            this.registerValidationError({
              title: this.localization.validationErrors.conditionallyForbiddenUndefinedValue.title,
              description: this.localization.validationErrors.conditionallyForbiddenUndefinedValue.generateDescription({
                verbalConditionWhenUndefinedIsForbiddenWithoutEndOfSentenceMark: childPropertySpecification.
                    undefinedForbiddenIf.descriptionForLogging
              }),
              targetPropertyDotSeparatedQualifiedInitialName: this.currentObjectPropertyDotSeparatedQualifiedName,
              targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
              targetPropertyValue: childPropertyMutableValue,
              targetPropertyValueSpecification: childPropertySpecification,
              targetPropertyStringifiedValueBeforeFirstPreValidationModification:
              childPropertyStringifiedValueBeforeFirstPreValidationModification
            });

            continue;

          }

        } else if (isNotUndefined(childPropertySpecification.undefinedValueSubstitution)) {

          childPropertyMutableValue = childPropertySpecification.undefinedValueSubstitution;

          hasChildPropertyValueDefinitelyNotChanged = false;
          hasAllChildrenPropertiesValuesDefinitelyNotChanged = false;

        }

        /* [ Approach ] Nothing required to do for allowed undefined values. */

      } else if (
        "mustBeUndefinedIf" in childPropertySpecification &&
            childPropertySpecification.mustBeUndefinedIf?.predicate({
              rawData__currentObjectDepth: targetObjectTypeSourceValue,
              rawData__full: this.rawData,
              targetPropertyDotSeparatedPath: this.currentObjectPropertyDotSeparatedQualifiedName
            }) === true
      ) {

        this.registerValidationError({
          title: this.localization.validationErrors.conditionallyForbiddenNonUndefinedValue.title,
          description: this.localization.validationErrors.conditionallyForbiddenNonUndefinedValue.generateDescription({
            conditionWhenMustBeUndefined: childPropertySpecification.mustBeUndefinedIf.descriptionForLogging
          }),
          targetPropertyDotSeparatedQualifiedInitialName: this.currentObjectPropertyDotSeparatedQualifiedName,
          targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
          targetPropertyValue: childPropertyMutableValue,
          targetPropertyValueSpecification: childPropertySpecification,
          targetPropertyStringifiedValueBeforeFirstPreValidationModification:
          childPropertyStringifiedValueBeforeFirstPreValidationModification
        });

        continue;

      }


      /* ─── Nullability ──────────────────────────────────────────────────────────────────────────────────────────── */
      if (
        !isBoolean(childPropertySpecification.isNullForbidden) &&
        isUndefined(childPropertySpecification.nullForbiddenIf) &&
        isUndefined(childPropertySpecification.nullValueSubstitution) &&
        childPropertySpecification.mustTransformNullToUndefined !== true
      ) {
        Logger.throwErrorAndLog({
          errorType: RawObjectDataProcessor.ThrowableErrorsNames.propertyNullabilityNotSpecified,
          title: this.localization.throwableErrors.propertyNullabilityNotSpecified.title,
          description: this.localization.throwableErrors.propertyNullabilityNotSpecified.generateDescription({
            targetPropertyDotSeparatedQualifiedName: this.currentObjectPropertyDotSeparatedQualifiedName
          }),
          occurrenceLocation: "RawObjectDataProcessor." +
              "processFixedSchemaObjectTypeValue(compoundParameter)"
        });
      }


      if (isNull(childPropertyMutableValue)) {

        if (childPropertySpecification.isNullForbidden === true) {

          hasAtLeastOneInvalidPropertyBeenDetected = true;

          this.registerValidationError({
            ...this.localization.validationErrors.forbiddenNullValue,
            targetPropertyDotSeparatedQualifiedInitialName: this.currentObjectPropertyDotSeparatedQualifiedName,
            targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
            targetPropertyValue: childPropertyMutableValue,
            targetPropertyValueSpecification: childPropertySpecification,
            targetPropertyStringifiedValueBeforeFirstPreValidationModification:
                childPropertyStringifiedValueBeforeFirstPreValidationModification
          });

          continue;

        }


        if (isNotUndefined(childPropertySpecification.nullForbiddenIf)) {

          if (
            childPropertySpecification.nullForbiddenIf.predicate({
              rawData__currentObjectDepth: targetObjectTypeSourceValue,
              rawData__full: this.rawData,
              targetPropertyDotSeparatedPath: this.currentObjectPropertyDotSeparatedQualifiedName
            })
          ) {

            hasAtLeastOneInvalidPropertyBeenDetected = true;

            this.registerValidationError({
              title: this.localization.validationErrors.conditionallyForbiddenNullValue.title,
              description: this.localization.validationErrors.conditionallyForbiddenNullValue.generateDescription({
                verbalConditionWhenNullIsForbiddenWithoutEndOfSentenceMark: childPropertySpecification.
                    nullForbiddenIf.descriptionForLogging
              }),
              targetPropertyDotSeparatedQualifiedInitialName: this.currentObjectPropertyDotSeparatedQualifiedName,
              targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
              targetPropertyValue: childPropertyMutableValue,
              targetPropertyValueSpecification: childPropertySpecification,
              targetPropertyStringifiedValueBeforeFirstPreValidationModification:
                  childPropertyStringifiedValueBeforeFirstPreValidationModification
            });

            continue;

          }

        } else if (isNotUndefined(childPropertySpecification.nullValueSubstitution)) {

          childPropertyMutableValue = childPropertySpecification.nullValueSubstitution;

          hasChildPropertyValueDefinitelyNotChanged = false;
          hasAllChildrenPropertiesValuesDefinitelyNotChanged = false;

        }

        /* [ Approach ] Nothing required to do for allowed null values. */

      } else if (
        "mustBeNullIf" in childPropertySpecification &&
            childPropertySpecification.mustBeNullIf?.predicate({
              rawData__currentObjectDepth: targetObjectTypeSourceValue,
              rawData__full: this.rawData,
              targetPropertyDotSeparatedPath: this.currentObjectPropertyDotSeparatedQualifiedName
            }) === true
      ) {

        this.registerValidationError({
          title: this.localization.validationErrors.conditionallyForbiddenNonNullValue.title,
          description: this.localization.validationErrors.conditionallyForbiddenNonNullValue.generateDescription({
            conditionWhenMustBeNull: childPropertySpecification.mustBeNullIf.descriptionForLogging
          }),
          targetPropertyDotSeparatedQualifiedInitialName: this.currentObjectPropertyDotSeparatedQualifiedName,
          targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
          targetPropertyValue: childPropertyMutableValue,
          targetPropertyValueSpecification: childPropertySpecification,
          targetPropertyStringifiedValueBeforeFirstPreValidationModification:
          childPropertyStringifiedValueBeforeFirstPreValidationModification
        });

        continue;

      }


      if (isNeitherUndefinedNorNull(childPropertyMutableValue)) {

        const childPropertyValueProcessingResult: RawObjectDataProcessor.ValueProcessingResult =
            this.processSingleNeitherUndefinedNorNullValue({
              targetValue: childPropertyMutableValue,
              targetValueSpecification: childPropertySpecification,
              parentObject,
              targetPropertyStringifiedValueBeforeFirstPreValidationModification:
                  childPropertyStringifiedValueBeforeFirstPreValidationModification
            });

        if ("isInvalid" in childPropertyValueProcessingResult) {

          hasAtLeastOneInvalidPropertyBeenDetected = true;
          continue;

        } else if (
          "thisOneIsValidButPostProcessingDisabledForPerformanceBecauseDataIsInvalidInLarge" in
              childPropertyValueProcessingResult
        ) {

          continue;

        } else if (!childPropertyValueProcessingResult.hasDefinitelyNotChanged) {

          hasChildPropertyValueDefinitelyNotChanged = false;
          hasAllChildrenPropertiesValuesDefinitelyNotChanged = false;

        }

        childPropertyMutableValue = childPropertyValueProcessingResult.processedValue;

      }

      switch (this.processingApproach) {

        case RawObjectDataProcessor.ProcessingApproaches.assemblingOfNewObject: {

          /* [ Approach ]
           * Commonly, the omitted value is not equivalent to explicit `undefined`, thus explicit `undefined` must
           *    be set to make the new object as equivalent to source one as possible.
           * */
          if (!(!(childPropertyInitialName in targetObjectTypeSourceValue) && isUndefined(childPropertyMutableValue))) {

            Object.defineProperty(
              processedValueWorkpiece,
              childPropertyFinalName,
              {
                value: childPropertyMutableValue,
                configurable: isBoolean(childPropertySpecification.mustMakeNonConfigurable) ?
                    !childPropertySpecification.mustMakeNonConfigurable : true,
                enumerable: isBoolean(childPropertySpecification.mustMakeNonEnumerable) ?
                    !childPropertySpecification.mustMakeNonEnumerable : true,
                writable: isBoolean(childPropertySpecification.mustMakeReadonly) ?
                    !childPropertySpecification.mustMakeReadonly : true
              }
            );

          }

          break;

        }

        case RawObjectDataProcessor.ProcessingApproaches.manipulationsWithSourceObject: {

          const targetPropertyDescriptor: PropertyDescriptor | undefined = Object.
              getOwnPropertyDescriptor(processedValueWorkpiece, childPropertyInitialName);

          if (isNotNull(this.currentlyIteratedPropertyNewNameForLogging)) {

            /* [ Approach ]
             * Commonly, the omitted value is not equivalent to explicit `undefined`, thus explicit `undefined` must
             *    be set to make the new property as equivalent to initial one as possible.
             * */
            if (!(!(childPropertyInitialName in targetObjectTypeSourceValue) && isUndefined(childPropertyMutableValue))) {

              Object.defineProperty(
                processedValueWorkpiece,
                this.currentlyIteratedPropertyNewNameForLogging,
                {
                  value: childPropertyMutableValue,
                  configurable: childPropertySpecification.mustMakeNonConfigurable === true ?
                      false :
                      targetPropertyDescriptor?.configurable ?? true,
                  enumerable: childPropertySpecification.mustMakeNonEnumerable === true ?
                      false :
                      targetPropertyDescriptor?.enumerable ?? true,
                  writable: childPropertySpecification.mustMakeReadonly === true ?
                      false :
                      targetPropertyDescriptor?.writable ?? true
                }
              );
            }

            if (childPropertySpecification.mustLeaveEvenRenamed !== true) {

              if (targetPropertyDescriptor?.configurable === false) {

                switch (this.errorHandlingStrategies.onUnableToDeletePropertyWithOutdatedValue) {

                  case RawObjectDataProcessor.ErrorHandlingStrategies.throwingOfError:

                    Logger.throwErrorAndLog({
                      errorType: RawObjectDataProcessor.ThrowableErrorsNames.unableToDeleteOutdatedProperty,
                      title: this.localization.throwableErrors.unableToDeletePropertyWithOutdatedKey.title,
                      description: this.localization.throwableErrors.unableToDeletePropertyWithOutdatedKey.generateDescription({
                        targetPropertyDotSeparatedQualifiedName: this.currentObjectPropertyDotSeparatedQualifiedName,
                        propertyNewKey: this.currentlyIteratedPropertyNewNameForLogging
                      }),
                      occurrenceLocation: "RawObjectDataProcessor.processFixedSchemaObjectTypeValue(compoundParameter)"
                    });

                  /* eslint-disable-next-line no-fallthrough --
                   * The ESLint does not see that `Logger.throwErrorAndLog()` returns `never` type in previous `case` block.
                   * If to add the `break` to previous `case` block, it will be `TS7027: Unreachable code detected.` error. */
                  case RawObjectDataProcessor.ErrorHandlingStrategies.markingOfDataAsInvalid: {

                    this.registerValidationError({
                      title: this.localization.validationErrors.unableToDeletePropertyWithOutdatedKey.title,
                      description: this.localization.validationErrors.unableToDeletePropertyWithOutdatedKey.generateDescription({
                        propertyNewKey: this.currentlyIteratedPropertyNewNameForLogging
                      }),
                      targetPropertyDotSeparatedQualifiedInitialName: this.currentObjectPropertyDotSeparatedQualifiedName,
                      targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
                      targetPropertyValue: processedValueWorkpiece,
                      targetPropertyValueSpecification: childPropertySpecification,
                      targetPropertyStringifiedValueBeforeFirstPreValidationModification
                    });

                    break;

                  }

                  case RawObjectDataProcessor.ErrorHandlingStrategies.warningWithoutMarkingOfDataAsInvalid:

                    Logger.logWarning({
                      title: this.localization.warnings.unableToDeletePropertyWithOutdatedKey.title,
                      description: this.localization.warnings.unableToDeletePropertyWithOutdatedKey.generateDescription({
                        targetPropertyDotSeparatedQualifiedName: this.currentObjectPropertyDotSeparatedQualifiedName,
                        propertyNewKey: this.currentlyIteratedPropertyNewNameForLogging
                      }),
                      occurrenceLocation: "RawObjectDataProcessor.processFixedSchemaObjectTypeValue(compoundParameter)"
                    });

                }

              }


              /* eslint-disable-next-line @typescript-eslint/no-dynamic-delete --
               * If library user managed to rename the property, and it is deletable, it could be deleted.
               * If library user do not comprehend that deleted property could cause the side effect to getters and/or
               *   setters and/or methods, there is nothing that the library can do. */
              delete processedValueWorkpiece[childPropertyInitialName];

            }

          } else {

            if (
              (
                isBoolean(childPropertySpecification.mustMakeNonConfigurable) ||
                isBoolean(childPropertySpecification.mustMakeNonEnumerable) ||
                isBoolean(childPropertySpecification.mustMakeReadonly)
              ) &&
              targetPropertyDescriptor?.configurable === false
            ) {

              switch (this.errorHandlingStrategies.onUnableToChangePropertyDescriptors) {

                case RawObjectDataProcessor.ErrorHandlingStrategies.throwingOfError:

                  Logger.throwErrorAndLog({
                    errorType: RawObjectDataProcessor.ThrowableErrorsNames.unableToChangePropertyDescriptors,

                    title: this.localization.throwableErrors.unableToChangePropertyDescriptors.title,
                    description: this.localization.throwableErrors.unableToChangePropertyDescriptors.generateDescription({
                      targetPropertyDotSeparatedQualifiedName: this.currentObjectPropertyDotSeparatedQualifiedName
                    }),
                    occurrenceLocation: "RawObjectDataProcessor.processFixedSchemaObjectTypeValue(compoundParameter)"
                  });


                /* eslint-disable-next-line no-fallthrough --
                 * The ESLint does not see that `Logger.throwErrorAndLog()` returns `never` type in previous `case` block.
                 * If to add the `break` to previous `case` block, it will be `TS7027: Unreachable code detected.` error. */
                case RawObjectDataProcessor.ErrorHandlingStrategies.markingOfDataAsInvalid: {

                  this.registerValidationError({
                    title: this.localization.validationErrors.unableToChangePropertyDescriptors.title,
                    description: this.localization.validationErrors.unableToChangePropertyDescriptors.description,
                    targetPropertyDotSeparatedQualifiedInitialName: this.currentObjectPropertyDotSeparatedQualifiedName,
                    targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
                    targetPropertyValue: childPropertyMutableValue,
                    targetPropertyValueSpecification: childPropertySpecification,
                    targetPropertyStringifiedValueBeforeFirstPreValidationModification
                  });

                  break;

                }

                case RawObjectDataProcessor.ErrorHandlingStrategies.warningWithoutMarkingOfDataAsInvalid:

                  Logger.logWarning({
                    title: this.localization.warnings.unableToChangePropertyDescriptors.title,
                    description: this.localization.warnings.unableToChangePropertyDescriptors.generateDescription({
                      targetPropertyDotSeparatedQualifiedName: this.currentObjectPropertyDotSeparatedQualifiedName
                    }),
                    occurrenceLocation: "RawObjectDataProcessor.processFixedSchemaObjectTypeValue(compoundParameter)"
                  });

              }

            }


            if (!hasChildPropertyValueDefinitelyNotChanged) {

              if (targetPropertyDescriptor?.writable === false) {

                switch (this.errorHandlingStrategies.onUnableToUpdatePropertyValue) {

                  case RawObjectDataProcessor.ErrorHandlingStrategies.throwingOfError:

                    Logger.throwErrorAndLog({
                      errorType: RawObjectDataProcessor.ThrowableErrorsNames.unableToUpdatePropertyValue,
                      title: this.localization.throwableErrors.unableToUpdatePropertyValue.title,
                      description: this.localization.throwableErrors.unableToUpdatePropertyValue.
                        generateDescription({
                          targetPropertyDotSeparatedQualifiedName: this.currentObjectPropertyDotSeparatedQualifiedName
                        }),
                      occurrenceLocation: "RawObjectDataProcessor.processFixedSchemaObjectTypeValue(compoundParameter)"
                    });
                  // ━━━ TODO ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

                  /* eslint-disable-next-line no-fallthrough --
                   * The ESLint does not see that `Logger.throwErrorAndLog()` returns `never` type in previous `case` block.
                   * If to add the `break` to previous `case` block, it will be `TS7027: Unreachable code detected.` error. */
                  case RawObjectDataProcessor.ErrorHandlingStrategies.markingOfDataAsInvalid: {

                    this.registerValidationError({
                      title: this.localization.validationErrors.unableToUpdatePropertyValue.title,
                      description: this.localization.validationErrors.unableToUpdatePropertyValue.description,
                      targetPropertyDotSeparatedQualifiedInitialName: this.currentObjectPropertyDotSeparatedQualifiedName,
                      targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
                      targetPropertyValue: childPropertyMutableValue,
                      targetPropertyValueSpecification: childPropertySpecification,
                      targetPropertyStringifiedValueBeforeFirstPreValidationModification
                    });

                    break;

                  }

                  case RawObjectDataProcessor.ErrorHandlingStrategies.warningWithoutMarkingOfDataAsInvalid:

                    Logger.logWarning({
                      title: this.localization.warnings.unableToUpdatePropertyValue.title,
                      description: this.localization.warnings.unableToUpdatePropertyValue.generateDescription({
                        targetPropertyDotSeparatedQualifiedName: this.currentObjectPropertyDotSeparatedQualifiedName
                      }),
                      occurrenceLocation: "RawObjectDataProcessor.processFixedSchemaObjectTypeValue(compoundParameter)"
                    });

                }

              }

              processedValueWorkpiece[childPropertyInitialName] = childPropertyMutableValue;

            }

          }

        }

      }

    }


    this.currentlyIteratedObjectPropertyQualifiedInitialNameSegmentsForLogging.splice(-1, 1);

    if (
      targetObjectTypeValueSpecification.mustExpectOnlySpecifiedProperties === true &&
          initialNamesOfNotCheckedYetProperties.length > 0
    ) {

      hasAtLeastOneInvalidPropertyBeenDetected = true;

      this.registerValidationError({
        title: this.localization.validationErrors.unexpectedProperties.title,
        description: this.localization.validationErrors.unexpectedProperties.generateDescription({
          unexpectedProperties: initialNamesOfNotCheckedYetProperties
        }),
        targetPropertyDotSeparatedQualifiedInitialName:
            emptyStringToNull(this.currentObjectPropertyDotSeparatedQualifiedName),
        targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
        targetPropertyValue: targetObjectTypeSourceValue,
        targetPropertyValueSpecification: targetObjectTypeValueSpecification,
        targetPropertyStringifiedValueBeforeFirstPreValidationModification
      });

    }


    for (
      const customValidator of
          RawObjectDataProcessor.getNormalizedCustomValidators(targetObjectTypeValueSpecification.customValidators)
    ) {

      if (
        !customValidator.validationFunction({
          value: targetObjectTypeSourceValue,
          rawData__full: this.rawData,
          rawData__currentObjectDepth: parentObject ?? this.rawData,
          targetPropertyDotSeparatedPath: this.currentObjectPropertyDotSeparatedQualifiedName
        })
      ) {

        hasAtLeastOneInvalidPropertyBeenDetected = true;

        this.registerValidationError({
          title: this.localization.validationErrors.customValidationFailed.title,
          description: this.localization.validationErrors.customValidationFailed.generateDescription({
            customValidationDescription: customValidator.descriptionForLogging
          }),
          targetPropertyDotSeparatedQualifiedInitialName: this.currentObjectPropertyDotSeparatedQualifiedName,
          targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
          targetPropertyValue: targetObjectTypeSourceValue,
          targetPropertyValueSpecification: targetObjectTypeValueSpecification,
          targetPropertyStringifiedValueBeforeFirstPreValidationModification
        });

      }

    }


    if (hasAtLeastOneInvalidPropertyBeenDetected) {
      return { isInvalid: true };
    } else if (this.isValidationOnlyMode) {
      return { thisOneIsValidButPostProcessingDisabledForPerformanceBecauseDataIsInvalidInLarge: true };
    }


    for (
      const postValidationModification of RawObjectDataProcessor.
          getNormalizedPostValidationModifications(targetObjectTypeValueSpecification.postValidationModifications)
    ) {
      processedValueWorkpiece = postValidationModification(processedValueWorkpiece);
    }
    // ━━━ TODO ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    for (
      const keyOfPropertyWhichWillBeDeleted of
          targetObjectTypeValueSpecification.propertiesWillBeDeletedAfterPostValidationModifications ?? []
    ) {
      /* eslint-disable-next-line @typescript-eslint/no-dynamic-delete --
       * Each element of this array has been specified by user, so user must be aware of potential side effects of
       *  properties deleting. */
      delete processedValueWorkpiece[keyOfPropertyWhichWillBeDeleted];
    }


    return {

      /* eslint-disable-next-line @typescript-eslint/consistent-type-assertions --
       * Above validations are like type guard for the 'ParsedJSON_NestedProperty'.
       * Same as any type guard in TypeScript, it does not guarantee that all checks matching with target types, but it
       * is the best that possible with current limitations. */
      processedValue: processedValueWorkpiece as ParsedJSON_NestedProperty,
      hasDefinitelyNotChanged: hasAllChildrenPropertiesValuesDefinitelyNotChanged

    };

  }

  private processAssociativeArrayTypeValue(
    {
      targetAssociativeArrayTypeValueSpecification,
      parentObject,
      targetPropertyStringifiedValueBeforeFirstPreValidationModification,
      ...compoundParameter
    }: Readonly<
      (
        { topLevelObject: ArbitraryObject; } |
        { notCheckedForObjectYetNonNullValueOfSubsequentLevel__expectedToBeObject: Exclude<unknown, undefined | null> } |
        { preCheckedForNonNullObjectValueOfSubsequentLevel__expectedToBeObject: ArbitraryObject; }
      ) &
      {
        targetAssociativeArrayTypeValueSpecification: RawObjectDataProcessor.AssociativeArrayValueSpecification;
        parentObject?: ArbitraryObject;
        targetPropertyStringifiedValueBeforeFirstPreValidationModification?: string;
      }
    >
  ): RawObjectDataProcessor.ValueProcessingResult {

    let targetObjectTypeSourceValue: ArbitraryObject;

    if ("topLevelObject" in compoundParameter) {

      targetObjectTypeSourceValue = compoundParameter.topLevelObject;

    } else if ("notCheckedForObjectYetNonNullValueOfSubsequentLevel__expectedToBeObject" in compoundParameter) {

      if (typeof compoundParameter.notCheckedForObjectYetNonNullValueOfSubsequentLevel__expectedToBeObject !== "object") {

        this.registerValidationError({
          title: this.localization.validationErrors.valueTypeDoesNotMatchWithExpected.title,
          description: this.localization.validationErrors.valueTypeDoesNotMatchWithExpected.
              generateDescription({
                actualNativeType:
                    typeof compoundParameter.notCheckedForObjectYetNonNullValueOfSubsequentLevel__expectedToBeObject,
                expectedTypeID: RawObjectDataProcessor.ValuesTypesIDs.associativeArray
              }),
          targetPropertyDotSeparatedQualifiedInitialName: this.currentObjectPropertyDotSeparatedQualifiedName,
          targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
          targetPropertyValue: compoundParameter.notCheckedForObjectYetNonNullValueOfSubsequentLevel__expectedToBeObject,
          targetPropertyValueSpecification: targetAssociativeArrayTypeValueSpecification,
          targetPropertyStringifiedValueBeforeFirstPreValidationModification
        });

        return { isInvalid: true };

      }


      targetObjectTypeSourceValue = (
        /* eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- [ Performance Optimization ]
         * The non-null check has been done already for `targetValue`, no need to do it again by `isArbitraryObject` type
         *  guard.  */
        compoundParameter.notCheckedForObjectYetNonNullValueOfSubsequentLevel__expectedToBeObject as ArbitraryObject
      );

    } else {

      targetObjectTypeSourceValue = compoundParameter.preCheckedForNonNullObjectValueOfSubsequentLevel__expectedToBeObject;

    }


    let hasTargetAssociativeArraySpecificEntryIndependentViolations: boolean = false;

    if (
      isNotUndefined(targetAssociativeArrayTypeValueSpecification.minimalEntriesCount) &&
          Object.entries(targetObjectTypeSourceValue).length <
              targetAssociativeArrayTypeValueSpecification.minimalEntriesCount
    ) {

      hasTargetAssociativeArraySpecificEntryIndependentViolations = true;

      this.registerValidationError({
        title: this.localization.validationErrors.associativeArrayEntriesCountIsLessThanRequiredMinimum.title,
        description: this.localization.validationErrors.associativeArrayEntriesCountIsLessThanRequiredMinimum.
            generateDescription({
              minimalEntriesCount: targetAssociativeArrayTypeValueSpecification.minimalEntriesCount,
              actualEntriesCount: Object.entries(targetObjectTypeSourceValue).length
            }),
        targetPropertyDotSeparatedQualifiedInitialName:
            emptyStringToNull(this.currentObjectPropertyDotSeparatedQualifiedName),
        targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
        targetPropertyValue: targetObjectTypeSourceValue,
        targetPropertyValueSpecification: targetAssociativeArrayTypeValueSpecification,
        targetPropertyStringifiedValueBeforeFirstPreValidationModification
      });

    }

    if (
      isNotUndefined(targetAssociativeArrayTypeValueSpecification.maximalEntriesCount) &&
          Object.entries(targetObjectTypeSourceValue).length >
              targetAssociativeArrayTypeValueSpecification.maximalEntriesCount
    ) {

      hasTargetAssociativeArraySpecificEntryIndependentViolations = true;

      this.registerValidationError({
        title: this.localization.validationErrors.associativeArrayPairsCountIsMoreThanAllowedMaximum.title,
        description: this.localization.validationErrors.associativeArrayPairsCountIsMoreThanAllowedMaximum.
            generateDescription({
              maximalEntriesCount: targetAssociativeArrayTypeValueSpecification.maximalEntriesCount,
              actualEntriesCount: Object.entries(targetObjectTypeSourceValue).length
            }),
        targetPropertyDotSeparatedQualifiedInitialName:
            emptyStringToNull(this.currentObjectPropertyDotSeparatedQualifiedName),
        targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
        targetPropertyValue: targetObjectTypeSourceValue,
        targetPropertyValueSpecification: targetAssociativeArrayTypeValueSpecification,
        targetPropertyStringifiedValueBeforeFirstPreValidationModification
      });

    }


    if (
      isNotUndefined(targetAssociativeArrayTypeValueSpecification.exactEntriesCount) &&
          Object.entries(targetObjectTypeSourceValue).length !==
              targetAssociativeArrayTypeValueSpecification.exactEntriesCount
    ) {

      hasTargetAssociativeArraySpecificEntryIndependentViolations = true;

      this.registerValidationError({
        title: this.localization.validationErrors.associativeArrayPairsCountDoesNotMatchWithSpecifiedExactNumber.title,
        description: this.localization.validationErrors.associativeArrayPairsCountDoesNotMatchWithSpecifiedExactNumber.
            generateDescription({
              exactEntriesCount: targetAssociativeArrayTypeValueSpecification.exactEntriesCount,
              actualEntriesCount: Object.entries(targetObjectTypeSourceValue).length
            }),
        targetPropertyDotSeparatedQualifiedInitialName:
            emptyStringToNull(this.currentObjectPropertyDotSeparatedQualifiedName),
        targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
        targetPropertyValue: targetObjectTypeSourceValue,
        targetPropertyValueSpecification: targetAssociativeArrayTypeValueSpecification,
        targetPropertyStringifiedValueBeforeFirstPreValidationModification
      });

    }

    if (isNonEmptyArray(targetAssociativeArrayTypeValueSpecification.keysOfNeitherUndefinedNorNullValues)) {

      const keysOfEitherUndefinedOrNullValues: Array<string> =
          targetAssociativeArrayTypeValueSpecification.keysOfNeitherUndefinedNorNullValues.
          filter(
            (keyOfNeitherUndefinedNorNullValue: string): boolean =>
                isEitherUndefinedOrNull(targetObjectTypeSourceValue[keyOfNeitherUndefinedNorNullValue])
          );

      if (keysOfEitherUndefinedOrNullValues.length > 0) {

        hasTargetAssociativeArraySpecificEntryIndependentViolations = true;

        this.registerValidationError({
          title: this.localization.validationErrors.
              forbiddenForSpecificKeysUndefinedOrNullValuesFoundInAssociativeArrayTypeObject.title,
          description: this.localization.validationErrors.
              forbiddenForSpecificKeysUndefinedOrNullValuesFoundInAssociativeArrayTypeObject.
              generateDescription({ keysOfEitherUndefinedOrNullValues }),
          targetPropertyDotSeparatedQualifiedInitialName:
              emptyStringToNull(this.currentObjectPropertyDotSeparatedQualifiedName),
          targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
          targetPropertyValue: targetObjectTypeSourceValue,
          targetPropertyValueSpecification: targetAssociativeArrayTypeValueSpecification,
          targetPropertyStringifiedValueBeforeFirstPreValidationModification
        });

      }

    }

    if (isNonEmptyArray(targetAssociativeArrayTypeValueSpecification.keysAtLeastOneWhichValuesMustBeNeitherUndefinedNorNull)) {

      let atLeastOneNeitherUndefinedNorNullValueFoundForTargetKeys: boolean = false;

      for (const key of Object.keys(targetObjectTypeSourceValue)) {
        if (isEitherUndefinedOrNull(targetObjectTypeSourceValue[key])) {
          atLeastOneNeitherUndefinedNorNullValueFoundForTargetKeys = true;
          break;
        }
      }

      if (!atLeastOneNeitherUndefinedNorNullValueFoundForTargetKeys) {

        hasTargetAssociativeArraySpecificEntryIndependentViolations = true;

        this.registerValidationError({
          title: this.localization.validationErrors.requiredAlternativeKeysOfAssociativeArrayAreMissing.title,
          description: this.localization.validationErrors.requiredAlternativeKeysOfAssociativeArrayAreMissing.
              generateDescription({
                requiredKeysAlternatives: targetAssociativeArrayTypeValueSpecification.
                    keysAtLeastOneWhichValuesMustBeNeitherUndefinedNorNull
              }),
          targetPropertyDotSeparatedQualifiedInitialName: this.currentObjectPropertyDotSeparatedQualifiedName,
          targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
          targetPropertyValue: targetObjectTypeSourceValue,
          targetPropertyValueSpecification: targetAssociativeArrayTypeValueSpecification,
          targetPropertyStringifiedValueBeforeFirstPreValidationModification
        });

      }

    }


    let processedValueWorkpiece: ArbitraryObject =
        this.processingApproach === RawObjectDataProcessor.ProcessingApproaches.manipulationsWithSourceObject ?
            targetObjectTypeSourceValue : {};

    const currentObjectDepthLevel__countFromZero: number =
        this.currentlyIteratedObjectPropertyQualifiedInitialNameSegmentsForLogging.length;

    let hasAtLeastOneInvalidValueBeenDetected: boolean = false;

    const forbiddenKeys: ReadonlyArray<string> = targetAssociativeArrayTypeValueSpecification.forbiddenKeys ?? [];
    let allowedKeys: ReadonlyArray<string>;

    if (isNonEmptyArray(targetAssociativeArrayTypeValueSpecification.allowedKeys)) {

      if (forbiddenKeys.length > 0) {
        Logger.throwErrorAndLog({
          errorType: RawObjectDataProcessor.ThrowableErrorsNames.mutuallyExclusiveAssociativeArrayKeysLimitations,
          title: this.localization.throwableErrors.mutuallyExclusiveAssociativeArrayKeysLimitations.title,
          description: this.localization.throwableErrors.mutuallyExclusiveAssociativeArrayKeysLimitations.
              generateDescription({
                targetPropertyDotSeparatedQualifiedName: emptyStringToNull(this.currentObjectPropertyDotSeparatedQualifiedName)
              }),
          occurrenceLocation: "rawObjectDataProcessor.processAssociativeArrayTypeValue(compoundParameter)"
        });
      }


      allowedKeys = targetAssociativeArrayTypeValueSpecification.allowedKeys;

    } else {

      allowedKeys = Object.keys(targetObjectTypeSourceValue).filter((key: string): boolean => !forbiddenKeys.includes(key));

    }

    let hasAllEntriesDefinitelyNotChanged: boolean = true;
    const foundDisallowedKeys: Array<string> = [];

    for (const [ initialKey, rawValue ] of Object.entries(targetObjectTypeSourceValue)) {

      this.currentlyIteratedObjectPropertyQualifiedInitialNameSegmentsForLogging[currentObjectDepthLevel__countFromZero] =
          initialKey;

      if (!allowedKeys.includes(initialKey)) {
        foundDisallowedKeys.push(initialKey);
      }

      const keyFinalName: string = targetAssociativeArrayTypeValueSpecification.keysRenamings?.[initialKey] ?? initialKey;

      if (hasAllEntriesDefinitelyNotChanged && keyFinalName !== initialKey) {
        hasAllEntriesDefinitelyNotChanged = false;
      }

      let hasChildPropertyValueDefinitelyNotChanged: boolean = true;

      const preValidationModifications: Array<RawObjectDataProcessor.PreValidationModification> = RawObjectDataProcessor.
          getNormalizedPreValidationModifications({
            customPreValidationModificationOrMultipleOfThem: targetAssociativeArrayTypeValueSpecification.
                value.preValidationModifications,
            mustTransformNullToUndefined: false,
            mustTransformUndefinedToNull: false
          });

      let mutableValue: unknown = rawValue;
      let stringifiedValueBeforeFirstPreValidationModification: string | undefined;

      if (preValidationModifications.length > 0) {

        stringifiedValueBeforeFirstPreValidationModification = stringifyAndFormatArbitraryValue(mutableValue);

        hasChildPropertyValueDefinitelyNotChanged = false;
        hasAllEntriesDefinitelyNotChanged = false;

      }

      for (const preValidationModification of preValidationModifications) {

        try {

          mutableValue = preValidationModification(mutableValue);

        } catch (error: unknown) {

          this.handleFailedPreValidationModification({
            error,
            propertyOrElementMutableValue: mutableValue,
            propertyOrElementValueSpecification: targetAssociativeArrayTypeValueSpecification,
            propertyOrElementStringifiedValueBeforeFirstPreValidationModification:
                stringifiedValueBeforeFirstPreValidationModification,
            occurrenceMethodName: "processAssociativeArrayTypeValue"
          });

        }

      }


      if (isUndefined(mutableValue)) {

        if (targetAssociativeArrayTypeValueSpecification.areUndefinedTypeValuesForbidden) {

          hasAtLeastOneInvalidValueBeenDetected = true;

          this.registerValidationError({
            ...this.localization.validationErrors.forbiddenUndefinedValue,
            description: this.localization.validationErrors.forbiddenUndefinedValue.description,
            targetPropertyDotSeparatedQualifiedInitialName: this.currentObjectPropertyDotSeparatedQualifiedName,
            targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
            targetPropertyValue: targetObjectTypeSourceValue,
            targetPropertyValueSpecification: targetAssociativeArrayTypeValueSpecification,
            targetPropertyStringifiedValueBeforeFirstPreValidationModification:
                stringifiedValueBeforeFirstPreValidationModification
          });

        }

        continue;

      }

      if (isNull(mutableValue)) {

        if (targetAssociativeArrayTypeValueSpecification.areNullTypeValuesForbidden) {

          hasAtLeastOneInvalidValueBeenDetected = true;

          this.registerValidationError({
            ...this.localization.validationErrors.forbiddenNullValue,
            targetPropertyDotSeparatedQualifiedInitialName: this.currentObjectPropertyDotSeparatedQualifiedName,
            targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
            targetPropertyValue: targetObjectTypeSourceValue,
            targetPropertyValueSpecification: targetAssociativeArrayTypeValueSpecification,
            targetPropertyStringifiedValueBeforeFirstPreValidationModification:
                stringifiedValueBeforeFirstPreValidationModification
          });

        }

        continue;

      }


      if (isNeitherUndefinedNorNull(mutableValue)) {

        const valueProcessingResult: RawObjectDataProcessor.ValueProcessingResult =
            this.processSingleNeitherUndefinedNorNullValue({
              targetValue: mutableValue,
              targetValueSpecification: targetAssociativeArrayTypeValueSpecification.value,
              parentObject,
              targetPropertyStringifiedValueBeforeFirstPreValidationModification:
                  stringifiedValueBeforeFirstPreValidationModification
            });

        if ("isInvalid" in valueProcessingResult) {

          hasAtLeastOneInvalidValueBeenDetected = true;
          continue;

        } else if (
          "thisOneIsValidButPostProcessingDisabledForPerformanceBecauseDataIsInvalidInLarge" in
              valueProcessingResult
        ) {
          continue;
        } else if (!valueProcessingResult.hasDefinitelyNotChanged) {

          hasChildPropertyValueDefinitelyNotChanged = false;
          hasAllEntriesDefinitelyNotChanged = false;

        }

        mutableValue = valueProcessingResult.processedValue;

      }

      switch (this.processingApproach) {

        case RawObjectDataProcessor.ProcessingApproaches.assemblingOfNewObject: {

          if (isNotUndefined(mutableValue)) {

            Object.defineProperty(
              processedValueWorkpiece,
              keyFinalName,
              {
                value: mutableValue,
                configurable: true,
                enumerable: true,
                writable: true
              }
            );

          }

          break;

        }

        case RawObjectDataProcessor.ProcessingApproaches.manipulationsWithSourceObject: {

          const targetPropertyDescriptor: PropertyDescriptor | undefined = Object.
              getOwnPropertyDescriptor(processedValueWorkpiece, initialKey);

          if (isNotNull(this.currentlyIteratedPropertyNewNameForLogging)) {

            if (isNotUndefined(mutableValue)) {
              Object.defineProperty(
                processedValueWorkpiece,
                this.currentlyIteratedPropertyNewNameForLogging,
                {
                  value: mutableValue,
                  configurable: true,
                  enumerable: true,
                  writable: true
                }
              );
            }

          } else if (!hasChildPropertyValueDefinitelyNotChanged) {

            if (targetPropertyDescriptor?.writable === false) {

              switch (this.errorHandlingStrategies.onUnableToUpdatePropertyValue) {

                case RawObjectDataProcessor.ErrorHandlingStrategies.throwingOfError: {
                  Logger.throwErrorAndLog({
                    errorType: RawObjectDataProcessor.ThrowableErrorsNames.unableToUpdatePropertyValue,

                    title: this.localization.throwableErrors.unableToUpdatePropertyValue.title,
                    description: this.localization.throwableErrors.unableToUpdatePropertyValue.
                      generateDescription({
                        targetPropertyDotSeparatedQualifiedName: this.currentObjectPropertyDotSeparatedQualifiedName
                      }),
                    occurrenceLocation: "RawObjectDataProcessor.processAssociativeArrayTypeValue(compoundParameter)"
                  });
                }

                /* eslint-disable-next-line no-fallthrough --
                 * The ESLint does not see that `Logger.throwErrorAndLog()` returns `never` type in previous `case` block.
                 * If to add the `break` to previous `case` block, it will be `TS7027: Unreachable code detected.` error. */
                case RawObjectDataProcessor.ErrorHandlingStrategies.markingOfDataAsInvalid: {

                  this.registerValidationError({

                    title: this.localization.validationErrors.unableToUpdatePropertyValue.title,
                    description: this.localization.validationErrors.unableToUpdatePropertyValue.description,
                    targetPropertyDotSeparatedQualifiedInitialName: this.currentObjectPropertyDotSeparatedQualifiedName,
                    targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,

                    /* eslint-disable-next-line no-void --
                     * `targetPropertyValue` has `unknown` type, so although target property has `undefined` value,
                     * from the viewpoint of typescript something must be explicitly specified. Because the explicit
                     * `undefined` could be shadowed the `void 0` is better option. */
                    targetPropertyValue: void 0,
                    targetPropertyValueSpecification: targetAssociativeArrayTypeValueSpecification,
                    targetPropertyStringifiedValueBeforeFirstPreValidationModification

                  });

                  break;

                }

                case RawObjectDataProcessor.ErrorHandlingStrategies.warningWithoutMarkingOfDataAsInvalid:

                  Logger.logWarning({
                    title: this.localization.warnings.unableToUpdatePropertyValue.title,
                    description: this.localization.warnings.unableToUpdatePropertyValue.generateDescription({
                      targetPropertyDotSeparatedQualifiedName: this.currentObjectPropertyDotSeparatedQualifiedName
                    }),
                    occurrenceLocation: "RawObjectDataProcessor.processAssociativeArrayTypeValue(compoundParameter)"
                  });

              }

              processedValueWorkpiece[keyFinalName] = mutableValue;

            }

          }

        }

      }

    }

    this.currentlyIteratedObjectPropertyQualifiedInitialNameSegmentsForLogging.splice(-1, 1);

    if (foundDisallowedKeys.length > 0) {

      hasTargetAssociativeArraySpecificEntryIndependentViolations = true;

      this.registerValidationError({
        title: this.localization.validationErrors.disallowedKeysFoundInAssociativeArray.title,
        description: this.localization.validationErrors.disallowedKeysFoundInAssociativeArray.
        generateDescription({ foundDisallowedKeys }),
        targetPropertyDotSeparatedQualifiedInitialName: this.currentObjectPropertyDotSeparatedQualifiedName,
        targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
        targetPropertyValue: targetObjectTypeSourceValue,
        targetPropertyValueSpecification: targetAssociativeArrayTypeValueSpecification,
        targetPropertyStringifiedValueBeforeFirstPreValidationModification
      });

    }


    for (
      const customValidator of
          RawObjectDataProcessor.getNormalizedCustomValidators(targetAssociativeArrayTypeValueSpecification.customValidators)
    ) {

      if (
        !customValidator.validationFunction({
          value: targetObjectTypeSourceValue,
          rawData__full: this.rawData,
          rawData__currentObjectDepth: parentObject ?? this.rawData,
          targetPropertyDotSeparatedPath: this.currentObjectPropertyDotSeparatedQualifiedName
        })
      ) {

        hasAtLeastOneInvalidValueBeenDetected = true;

        this.registerValidationError({
          title: this.localization.validationErrors.customValidationFailed.title,
          description: this.localization.validationErrors.customValidationFailed.generateDescription({
            customValidationDescription: customValidator.descriptionForLogging
          }),
          targetPropertyDotSeparatedQualifiedInitialName: this.currentObjectPropertyDotSeparatedQualifiedName,
          targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
          targetPropertyValue: targetObjectTypeSourceValue,
          targetPropertyValueSpecification: targetAssociativeArrayTypeValueSpecification,
          targetPropertyStringifiedValueBeforeFirstPreValidationModification
        });

      }

    }


    if (hasTargetAssociativeArraySpecificEntryIndependentViolations || hasAtLeastOneInvalidValueBeenDetected) {
      return { isInvalid: true };
    } else if (this.isValidationOnlyMode) {
      return { thisOneIsValidButPostProcessingDisabledForPerformanceBecauseDataIsInvalidInLarge: true };
    }


    for (
      const postValidationModification of RawObjectDataProcessor.
          getNormalizedPostValidationModifications(targetAssociativeArrayTypeValueSpecification.postValidationModifications)
    ) {
      processedValueWorkpiece = postValidationModification(processedValueWorkpiece);
    }

    return {

      /* eslint-disable-next-line @typescript-eslint/consistent-type-assertions --
       * Above validations are like type guard for the 'ParsedJSON_NestedProperty'.
       * Same as any type guard in TypeScript, it does not guarantee that all checks matching with target types, but it is
       * the best that possible with current limitations. */
      processedValue: processedValueWorkpiece as ParsedJSON_NestedProperty,
      hasDefinitelyNotChanged: hasAllEntriesDefinitelyNotChanged

    };

  }

  private processIndexedArrayTypeValue(
    {
      targetIndexedArrayTypeValueSpecification,
      parentObject,
      targetPropertyStringifiedValueBeforeFirstPreValidationModification,
      ...compoundParameter
    }: Readonly<
      (
        { topLevelObject: ArbitraryObject; } |
        { targetValueOfSubsequentLevel__expectedToBeArray: unknown; }
      ) &
      {
        targetIndexedArrayTypeValueSpecification: RawObjectDataProcessor.IndexedArrayValueSpecification;
        parentObject?: ArbitraryObject;
        targetPropertyStringifiedValueBeforeFirstPreValidationModification?: string;
      }
    >
  ): RawObjectDataProcessor.ValueProcessingResult {

    const targetSourceRawValue: unknown = "topLevelObject" in compoundParameter ?
        compoundParameter.topLevelObject : compoundParameter.targetValueOfSubsequentLevel__expectedToBeArray;

    if (!Array.isArray(targetSourceRawValue)) {

      this.registerValidationError({
        title: this.localization.validationErrors.valueTypeDoesNotMatchWithExpected.title,
        description: this.localization.validationErrors.valueTypeDoesNotMatchWithExpected.
            generateDescription({
              actualNativeType: typeof targetSourceRawValue,
              expectedTypeID: RawObjectDataProcessor.ValuesTypesIDs.number
            }),
        targetPropertyDotSeparatedQualifiedInitialName: this.currentObjectPropertyDotSeparatedQualifiedName,
        targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
        targetPropertyValue: targetSourceRawValue,
        targetPropertyValueSpecification: targetIndexedArrayTypeValueSpecification,
        targetPropertyStringifiedValueBeforeFirstPreValidationModification
      });

      return { isInvalid: true };

    }


    let hasTargetIndexedArraySpecificElementIndependentViolations: boolean = false;

    if (
      isNotUndefined(targetIndexedArrayTypeValueSpecification.minimalElementsCount) &&
          targetSourceRawValue.length < targetIndexedArrayTypeValueSpecification.minimalElementsCount
    ) {

      hasTargetIndexedArraySpecificElementIndependentViolations = true;

      this.registerValidationError({
        title: this.localization.validationErrors.indexedArrayElementsCountIsLessThanRequiredMinimum.title,
        description: this.localization.validationErrors.indexedArrayElementsCountIsLessThanRequiredMinimum.
            generateDescription({
              minimalElementsCount: targetIndexedArrayTypeValueSpecification.minimalElementsCount,
              actualElementsCount: targetSourceRawValue.length
            }),
        targetPropertyDotSeparatedQualifiedInitialName: this.currentObjectPropertyDotSeparatedQualifiedName,
        targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
        targetPropertyValue: targetSourceRawValue,
        targetPropertyValueSpecification: targetIndexedArrayTypeValueSpecification,
        targetPropertyStringifiedValueBeforeFirstPreValidationModification
      });

    }


    if (
      isNotUndefined(targetIndexedArrayTypeValueSpecification.maximalElementsCount) &&
          targetSourceRawValue.length > targetIndexedArrayTypeValueSpecification.maximalElementsCount
    ) {

      hasTargetIndexedArraySpecificElementIndependentViolations = true;

      this.registerValidationError({
        title: this.localization.validationErrors.indexedArrayElementsCountIsMoreThanAllowedMaximum.title,
        description: this.localization.validationErrors.indexedArrayElementsCountIsMoreThanAllowedMaximum.
            generateDescription({
              maximalElementsCount: targetIndexedArrayTypeValueSpecification.maximalElementsCount,
              actualElementsCount: targetSourceRawValue.length
            }),
        targetPropertyDotSeparatedQualifiedInitialName: this.currentObjectPropertyDotSeparatedQualifiedName,
        targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
        targetPropertyValue: targetSourceRawValue,
        targetPropertyValueSpecification: targetIndexedArrayTypeValueSpecification,
        targetPropertyStringifiedValueBeforeFirstPreValidationModification
      });

    }


    if (
      isNotUndefined(targetIndexedArrayTypeValueSpecification.exactElementsCount) &&
         targetSourceRawValue.length !== targetIndexedArrayTypeValueSpecification.exactElementsCount
    ) {

      hasTargetIndexedArraySpecificElementIndependentViolations = true;

      this.registerValidationError({
        title: this.localization.validationErrors.indexedArrayElementsCountDoesNotMatchWithSpecifiedExactNumber.title,
        description: this.localization.validationErrors.indexedArrayElementsCountDoesNotMatchWithSpecifiedExactNumber.
            generateDescription({
              exactElementsCount: targetIndexedArrayTypeValueSpecification.exactElementsCount,
              actualElementsCount: targetSourceRawValue.length
            }),
        targetPropertyDotSeparatedQualifiedInitialName: this.currentObjectPropertyDotSeparatedQualifiedName,
        targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
        targetPropertyValue: targetSourceRawValue,
        targetPropertyValueSpecification: targetIndexedArrayTypeValueSpecification,
        targetPropertyStringifiedValueBeforeFirstPreValidationModification
      });

    }


    let processedValueWorkpiece: Array<unknown> =
        this.processingApproach === RawObjectDataProcessor.ProcessingApproaches.manipulationsWithSourceObject ?
            targetSourceRawValue : [];

    const currentObjectDepthLevel__beginWithZero: number =
        this.currentlyIteratedObjectPropertyQualifiedInitialNameSegmentsForLogging.length;

    let hasAtLeastOneInvalidElementBeenDetected: boolean = false;
    let hasAllElementsDefinitelyNotChanged: boolean = true;

    for (const [ index, rawElement ] of targetSourceRawValue.entries()) {

      this.currentlyIteratedObjectPropertyQualifiedInitialNameSegmentsForLogging[currentObjectDepthLevel__beginWithZero] =
          index;

      const preValidationModifications: Array<RawObjectDataProcessor.PreValidationModification> = RawObjectDataProcessor.
          getNormalizedPreValidationModifications({
            customPreValidationModificationOrMultipleOfThem: targetIndexedArrayTypeValueSpecification.element.
                preValidationModifications,
            mustTransformNullToUndefined: false,
            mustTransformUndefinedToNull: false
          });

      let mutableElement: unknown = rawElement;
      let stringifiedElementBeforeFirstPreValidationModification: string | undefined;

      if (preValidationModifications.length > 0) {

        stringifiedElementBeforeFirstPreValidationModification = stringifyAndFormatArbitraryValue(rawElement);

        hasAllElementsDefinitelyNotChanged = false;

      }

      for (const preValidationModification of preValidationModifications) {

        try {

          mutableElement = preValidationModification(mutableElement);

        } catch (error: unknown) {

          this.registerValidationError({
            title: this.localization.validationErrors.preValidationModificationFailed.title,
            description: this.localization.validationErrors.preValidationModificationFailed.generateDescription({
              stringifiedCaughtError: stringifyAndFormatArbitraryValue(error)
            }),
            targetPropertyDotSeparatedQualifiedInitialName: this.currentObjectPropertyDotSeparatedQualifiedName,
            targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
            targetPropertyValue: mutableElement,
            targetPropertyValueSpecification: targetIndexedArrayTypeValueSpecification.element,
            targetPropertyStringifiedValueBeforeFirstPreValidationModification:
                stringifiedElementBeforeFirstPreValidationModification
          });

        }

      }


      if (isUndefined(mutableElement)) {

        if (targetIndexedArrayTypeValueSpecification.areUndefinedElementsForbidden) {

          hasAtLeastOneInvalidElementBeenDetected = true;

          this.registerValidationError({
            ...this.localization.validationErrors.forbiddenUndefinedValue,
            targetPropertyDotSeparatedQualifiedInitialName: this.currentObjectPropertyDotSeparatedQualifiedName,
            targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
            targetPropertyValue: targetSourceRawValue,
            targetPropertyValueSpecification: targetIndexedArrayTypeValueSpecification,
            targetPropertyStringifiedValueBeforeFirstPreValidationModification:
            stringifiedElementBeforeFirstPreValidationModification
          });

        }

        continue;

      }


      if (isNull(mutableElement)) {

        if (targetIndexedArrayTypeValueSpecification.areNullElementsForbidden) {

          hasAtLeastOneInvalidElementBeenDetected = true;

          this.registerValidationError({
            ...this.localization.validationErrors.forbiddenNullValue,
            targetPropertyDotSeparatedQualifiedInitialName: this.currentObjectPropertyDotSeparatedQualifiedName,
            targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
            targetPropertyValue: targetSourceRawValue,
            targetPropertyValueSpecification: targetIndexedArrayTypeValueSpecification,
            targetPropertyStringifiedValueBeforeFirstPreValidationModification:
                stringifiedElementBeforeFirstPreValidationModification
          });

        }

        continue;

      }


      if (isNeitherUndefinedNorNull(mutableElement)) {

        const elementProcessingResult: RawObjectDataProcessor.ValueProcessingResult =
            this.processSingleNeitherUndefinedNorNullValue({
              targetValue: mutableElement,
              targetValueSpecification: targetIndexedArrayTypeValueSpecification.element,
              parentObject,
              targetPropertyStringifiedValueBeforeFirstPreValidationModification:
                  stringifiedElementBeforeFirstPreValidationModification
            });

        if ("isInvalid" in elementProcessingResult) {

          hasAtLeastOneInvalidElementBeenDetected = true;
          continue;

        } else if (
          "thisOneIsValidButPostProcessingDisabledForPerformanceBecauseDataIsInvalidInLarge" in elementProcessingResult
        ) {
          continue;
        } else if (!elementProcessingResult.hasDefinitelyNotChanged) {

          hasAllElementsDefinitelyNotChanged = false;

        } else {

          hasAllElementsDefinitelyNotChanged = elementProcessingResult.hasDefinitelyNotChanged;
          mutableElement = elementProcessingResult.processedValue;

        }

      }

      if (isNotUndefined(mutableElement)) {
        processedValueWorkpiece[index] = mutableElement;
      }

    }

    this.currentlyIteratedObjectPropertyQualifiedInitialNameSegmentsForLogging.splice(-1, 1);

    for (
      const customValidator of
          RawObjectDataProcessor.getNormalizedCustomValidators(targetIndexedArrayTypeValueSpecification.customValidators)
    ) {

      if (
        !customValidator.validationFunction({
          /* eslint-disable-next-line @typescript-eslint/consistent-type-assertions --
           * Above validations are like type guard for the 'ParsedJSON_Array'.
           * Same as any type guard in TypeScript, it does not guarantee that all checks matching with target types, but it is
           * the best that possible with current limitations. */
          value: targetSourceRawValue as ParsedJSON_Array,
          rawData__full: this.rawData,
          rawData__currentObjectDepth: parentObject ?? this.rawData,
          targetPropertyDotSeparatedPath: this.currentObjectPropertyDotSeparatedQualifiedName
        })
      ) {

        hasAtLeastOneInvalidElementBeenDetected = true;

        this.registerValidationError({
          title: this.localization.validationErrors.customValidationFailed.title,
          description: this.localization.validationErrors.customValidationFailed.generateDescription({
            customValidationDescription: customValidator.descriptionForLogging
          }),
          targetPropertyDotSeparatedQualifiedInitialName: this.currentObjectPropertyDotSeparatedQualifiedName,
          targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
          targetPropertyValue: targetSourceRawValue,
          targetPropertyValueSpecification: targetIndexedArrayTypeValueSpecification,
          targetPropertyStringifiedValueBeforeFirstPreValidationModification
        });

      }

    }

    if (hasTargetIndexedArraySpecificElementIndependentViolations || hasAtLeastOneInvalidElementBeenDetected) {
      return { isInvalid: true };
    } else if (this.isValidationOnlyMode) {
      return { thisOneIsValidButPostProcessingDisabledForPerformanceBecauseDataIsInvalidInLarge: true };
    }


    for (
      const postValidationModification of RawObjectDataProcessor.
          getNormalizedPostValidationModifications(targetIndexedArrayTypeValueSpecification.postValidationModifications)
    ) {

      /* eslint-disable-next-line @typescript-eslint/consistent-type-assertions --
       * Above validations are like type guard for the 'ParsedJSON_Array'.
       * Same as any type guard in TypeScript, it does not guarantee that all checks matching with target types, but it is
       * the best that possible with current limitations. */
      processedValueWorkpiece = postValidationModification(processedValueWorkpiece as ParsedJSON_Array);

    }

    return {

      /* eslint-disable-next-line @typescript-eslint/consistent-type-assertions --
       * Above validations are like type guard for the 'ParsedJSON_Array'.
       * Same as any type guard in TypeScript, it does not guarantee that all checks matching with target types, but it is
       * the best that possible with current limitations. */
      processedValue: processedValueWorkpiece as ParsedJSON_Array,
      hasDefinitelyNotChanged: hasAllElementsDefinitelyNotChanged

    };

  }

  private processTupleTypeValue(
    {
      targetTupleTypeValueSpecification,
      parentObject,
      targetPropertyStringifiedValueBeforeFirstPreValidationModification,
      ...compoundParameter
    }: Readonly<
      (
        { topLevelObject: ArbitraryObject; } |
        { targetValueOfSubsequentLevel__expectedToBeArray: unknown; }
      ) &
      {
        targetTupleTypeValueSpecification: RawObjectDataProcessor.TupleValueSpecification;
        parentObject?: ArbitraryObject;
        targetPropertyStringifiedValueBeforeFirstPreValidationModification?: string;
      }
    >
  ): RawObjectDataProcessor.ValueProcessingResult {

    const targetSourceRawValue: unknown = "topLevelObject" in compoundParameter ?
        compoundParameter.topLevelObject : compoundParameter.targetValueOfSubsequentLevel__expectedToBeArray;

    if (!Array.isArray(targetSourceRawValue)) {

      this.registerValidationError({
        title: this.localization.validationErrors.valueTypeDoesNotMatchWithExpected.title,
        description: this.localization.validationErrors.valueTypeDoesNotMatchWithExpected.
            generateDescription({
              actualNativeType: typeof targetSourceRawValue,
              expectedTypeID: RawObjectDataProcessor.ValuesTypesIDs.number
            }),
        targetPropertyDotSeparatedQualifiedInitialName: this.currentObjectPropertyDotSeparatedQualifiedName,
        targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
        targetPropertyValue: targetSourceRawValue,
        targetPropertyValueSpecification: targetTupleTypeValueSpecification,
        targetPropertyStringifiedValueBeforeFirstPreValidationModification
      });

      return { isInvalid: true };

    }


    let hasTargetTupleSpecificElementIndependentViolations: boolean = false;

    if (
      isNotUndefined(targetTupleTypeValueSpecification.minimalElementsCount) &&
          targetSourceRawValue.length < targetTupleTypeValueSpecification.minimalElementsCount
    ) {

      hasTargetTupleSpecificElementIndependentViolations = true;

      this.registerValidationError({
        title: this.localization.validationErrors.indexedArrayElementsCountIsLessThanRequiredMinimum.title,
        description: this.localization.validationErrors.indexedArrayElementsCountIsLessThanRequiredMinimum.
            generateDescription({
              minimalElementsCount: targetTupleTypeValueSpecification.minimalElementsCount,
              actualElementsCount: targetSourceRawValue.length
            }),
        targetPropertyDotSeparatedQualifiedInitialName: this.currentObjectPropertyDotSeparatedQualifiedName,
        targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
        targetPropertyValue: targetSourceRawValue,
        targetPropertyValueSpecification: targetTupleTypeValueSpecification,
        targetPropertyStringifiedValueBeforeFirstPreValidationModification
      });

    }


    if (
      isNotUndefined(targetTupleTypeValueSpecification.maximalElementsCount) &&
          targetSourceRawValue.length > targetTupleTypeValueSpecification.maximalElementsCount
    ) {

      hasTargetTupleSpecificElementIndependentViolations = true;

      this.registerValidationError({
        title: this.localization.validationErrors.indexedArrayElementsCountIsMoreThanAllowedMaximum.title,
        description: this.localization.validationErrors.indexedArrayElementsCountIsMoreThanAllowedMaximum.
            generateDescription({
              maximalElementsCount: targetTupleTypeValueSpecification.maximalElementsCount,
              actualElementsCount: targetSourceRawValue.length
            }),
        targetPropertyDotSeparatedQualifiedInitialName: this.currentObjectPropertyDotSeparatedQualifiedName,
        targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
        targetPropertyValue: targetSourceRawValue,
        targetPropertyValueSpecification: targetTupleTypeValueSpecification,
        targetPropertyStringifiedValueBeforeFirstPreValidationModification
      });

    }


    if (
      isNotUndefined(targetTupleTypeValueSpecification.exactElementsCount) &&
         targetSourceRawValue.length !== targetTupleTypeValueSpecification.exactElementsCount
    ) {

      hasTargetTupleSpecificElementIndependentViolations = true;

      this.registerValidationError({
        title: this.localization.validationErrors.indexedArrayElementsCountDoesNotMatchWithSpecifiedExactNumber.title,
        description: this.localization.validationErrors.indexedArrayElementsCountDoesNotMatchWithSpecifiedExactNumber.
            generateDescription({
              exactElementsCount: targetTupleTypeValueSpecification.exactElementsCount,
              actualElementsCount: targetSourceRawValue.length
            }),
        targetPropertyDotSeparatedQualifiedInitialName: this.currentObjectPropertyDotSeparatedQualifiedName,
        targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
        targetPropertyValue: targetSourceRawValue,
        targetPropertyValueSpecification: targetTupleTypeValueSpecification,
        targetPropertyStringifiedValueBeforeFirstPreValidationModification
      });

    }

    let processedValueWorkpiece: Array<unknown> =
        this.processingApproach === RawObjectDataProcessor.ProcessingApproaches.manipulationsWithSourceObject ?
            targetSourceRawValue : [];

    const currentObjectDepthLevel__beginWithZero: number =
        this.currentlyIteratedObjectPropertyQualifiedInitialNameSegmentsForLogging.length;

    let hasAtLeastOneInvalidElementBeenDetected: boolean = false;
    let hasAllElementsDefinitelyNotChanged: boolean = true;

    for (const [ index, rawElement ] of targetSourceRawValue.entries()) {

      this.currentlyIteratedObjectPropertyQualifiedInitialNameSegmentsForLogging[currentObjectDepthLevel__beginWithZero] =
          index;

      const targetElementSpecification: RawObjectDataProcessor.ValueSpecification | undefined =
        targetTupleTypeValueSpecification.elements[index];

      // TODO Unexpected tuple element

      const preValidationModifications: Array<RawObjectDataProcessor.PreValidationModification> = RawObjectDataProcessor.
          getNormalizedPreValidationModifications({
            customPreValidationModificationOrMultipleOfThem: targetElementSpecification.preValidationModifications,
            mustTransformNullToUndefined: false,
            mustTransformUndefinedToNull: false
          });

      let mutableElement: unknown = rawElement;
      let stringifiedElementBeforeFirstPreValidationModification: string | undefined;

      if (preValidationModifications.length > 0) {

        stringifiedElementBeforeFirstPreValidationModification = stringifyAndFormatArbitraryValue(rawElement);

        hasAllElementsDefinitelyNotChanged = false;

      }

      for (const preValidationModification of preValidationModifications) {

        try {

          mutableElement = preValidationModification(mutableElement);

        } catch (error: unknown) {

          this.registerValidationError({
            title: this.localization.validationErrors.preValidationModificationFailed.title,
            description: this.localization.validationErrors.preValidationModificationFailed.generateDescription({
              stringifiedCaughtError: stringifyAndFormatArbitraryValue(error)
            }),
            targetPropertyDotSeparatedQualifiedInitialName: this.currentObjectPropertyDotSeparatedQualifiedName,
            targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
            targetPropertyValue: mutableElement,
            targetPropertyValueSpecification: targetElementSpecification,
            targetPropertyStringifiedValueBeforeFirstPreValidationModification:
                stringifiedElementBeforeFirstPreValidationModification
          });

        }

      }

      // TODO Non-undefined & non-null check is individual for each element.

      if (isNeitherUndefinedNorNull(mutableElement)) {

        const elementProcessingResult: RawObjectDataProcessor.ValueProcessingResult =
            this.processSingleNeitherUndefinedNorNullValue({
              targetValue: mutableElement,
              targetValueSpecification: targetElementSpecification,
              parentObject,
              targetPropertyStringifiedValueBeforeFirstPreValidationModification:
                  stringifiedElementBeforeFirstPreValidationModification
            });

        if ("isInvalid" in elementProcessingResult) {

          hasAtLeastOneInvalidElementBeenDetected = true;
          continue;

        } else if (
          "thisOneIsValidButPostProcessingDisabledForPerformanceBecauseDataIsInvalidInLarge" in elementProcessingResult
        ) {
          continue;
        } else if (!elementProcessingResult.hasDefinitelyNotChanged) {

          hasAllElementsDefinitelyNotChanged = false;

        }

      }

      if (isNotUndefined(mutableElement)) {
        processedValueWorkpiece[index] = mutableElement;
      }

    }

    this.currentlyIteratedObjectPropertyQualifiedInitialNameSegmentsForLogging.splice(-1, 1);

    for (
      const customValidator of
          RawObjectDataProcessor.getNormalizedCustomValidators(targetTupleTypeValueSpecification.customValidators)
    ) {

      if (
        !customValidator.validationFunction({
          /* eslint-disable-next-line @typescript-eslint/consistent-type-assertions --
           * Above validations are like type guard for the 'ParsedJSON_Array'.
           * Same as any type guard in TypeScript, it does not guarantee that all checks matching with target types, but it is
           * the best that possible with current limitations. */
          value: targetSourceRawValue as ParsedJSON_Array,
          rawData__full: this.rawData,
          rawData__currentObjectDepth: parentObject ?? this.rawData,
          targetPropertyDotSeparatedPath: this.currentObjectPropertyDotSeparatedQualifiedName
        })
      ) {

        hasAtLeastOneInvalidElementBeenDetected = true;

        this.registerValidationError({
          title: this.localization.validationErrors.customValidationFailed.title,
          description: this.localization.validationErrors.customValidationFailed.generateDescription({
            customValidationDescription: customValidator.descriptionForLogging
          }),
          targetPropertyDotSeparatedQualifiedInitialName: this.currentObjectPropertyDotSeparatedQualifiedName,
          targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
          targetPropertyValue: targetSourceRawValue,
          targetPropertyValueSpecification: targetTupleTypeValueSpecification,
          targetPropertyStringifiedValueBeforeFirstPreValidationModification
        });

      }

    }

    if (hasTargetTupleSpecificElementIndependentViolations || hasAtLeastOneInvalidElementBeenDetected) {
      return { isInvalid: true };
    } else if (this.isValidationOnlyMode) {
      return { thisOneIsValidButPostProcessingDisabledForPerformanceBecauseDataIsInvalidInLarge: true };
    }

    for (
      const postValidationModification of RawObjectDataProcessor.
          getNormalizedPostValidationModifications(targetTupleTypeValueSpecification.postValidationModifications)
    ) {

      /* eslint-disable-next-line @typescript-eslint/consistent-type-assertions --
       * Above validations are like type guard for the 'ParsedJSON_Array'.
       * Same as any type guard in TypeScript, it does not guarantee that all checks matching with target types, but it is
       * the best that possible with current limitations. */
      processedValueWorkpiece = postValidationModification(processedValueWorkpiece as ParsedJSON_Array);

    }

    return {
      /* eslint-disable-next-line @typescript-eslint/consistent-type-assertions --
       * Above validations are like type guard for the 'ParsedJSON_Array'.
       * Same as any type guard in TypeScript, it does not guarantee that all checks matching with target types, but it is
       * the best that possible with current limitations. */
      processedValue: processedValueWorkpiece as ParsedJSON_Array,
      hasDefinitelyNotChanged: hasAllElementsDefinitelyNotChanged
    };

  }


  /* ─── Processing of Internal Level Properties ──────────────────────────────────────────────────────────────────── */
  private processSingleNeitherUndefinedNorNullValue(
    {
      targetValue,
      targetValueSpecification,
      parentObject,
      targetPropertyStringifiedValueBeforeFirstPreValidationModification
    }: {
      targetValue: Exclude<unknown, undefined | null>;
      targetValueSpecification: RawObjectDataProcessor.ValueSpecification;
      parentObject?: ArbitraryObject;
      targetPropertyStringifiedValueBeforeFirstPreValidationModification?: string;
    }
  ): RawObjectDataProcessor.ValueProcessingResult {

    /* [ Theory ]
     * Basically, the switch/case including Number/String/etc. constructor is working, but there are some exceptions.
     * https://stackoverflow.com/q/69848208/4818123
     * https://stackoverflow.com/q/69848689/4818123 */

    if (RawObjectDataProcessor.isNumericValueSpecification(targetValueSpecification)) {
      return this.processNumericValue({
        targetValue__expectedToBeNumber: targetValue,
        targetValueSpecification,
        parentObject,
        targetPropertyStringifiedValueBeforeFirstPreValidationModification
      });
    }


    if (RawObjectDataProcessor.isStringValueSpecification(targetValueSpecification)) {
      return this.processStringValue({
        targetValue__expectedToBeString: targetValue,
        targetValueSpecification,
        parentObject,
        targetPropertyStringifiedValueBeforeFirstPreValidationModification
      });
    }


    if (RawObjectDataProcessor.isBooleanValueSpecification(targetValueSpecification)) {
      return this.processBooleanValue({
        targetValue__expectedToBeBoolean: targetValue,
        targetValueSpecification,
        parentObject,
        targetPropertyStringifiedValueBeforeFirstPreValidationModification
      });
    }


    if (RawObjectDataProcessor.isFixedSchemaObjectValueSpecification(targetValueSpecification)) {
      return this.processFixedSchemaObjectTypeValue({
        notCheckedForObjectYetNonNullValueOfSubsequentLevel__expectedToBeObject: targetValue,
        targetObjectTypeValueSpecification: targetValueSpecification,
        parentObject,
        targetPropertyStringifiedValueBeforeFirstPreValidationModification
      });
    }


    if (targetValueSpecification.type === RawObjectDataProcessor.ValuesTypesIDs.associativeArray) {
      return this.processAssociativeArrayTypeValue({
        notCheckedForObjectYetNonNullValueOfSubsequentLevel__expectedToBeObject: targetValue,
        targetAssociativeArrayTypeValueSpecification: targetValueSpecification,
        parentObject,
        targetPropertyStringifiedValueBeforeFirstPreValidationModification
      });
    }


    if (RawObjectDataProcessor.isIndexedArrayValueSpecification(targetValueSpecification)) {
      return this.processIndexedArrayTypeValue({
        targetValueOfSubsequentLevel__expectedToBeArray: targetValue,
        targetIndexedArrayTypeValueSpecification: targetValueSpecification,
        parentObject,
        targetPropertyStringifiedValueBeforeFirstPreValidationModification
      });
    }


    if (targetValueSpecification.type === RawObjectDataProcessor.ValuesTypesIDs.tuple) {
      return this.processTupleTypeValue({
        targetValueOfSubsequentLevel__expectedToBeArray: targetValue,
        targetTupleTypeValueSpecification: targetValueSpecification,
        parentObject,
        targetPropertyStringifiedValueBeforeFirstPreValidationModification
      });
    }


    if (targetValueSpecification.type === RawObjectDataProcessor.ValuesTypesIDs.polymorphic) {
      return this.processMultipleTypesAllowedValue({
        targetValue,
        targetValueSpecification,
        parentObject,
        targetPropertyStringifiedValueBeforeFirstPreValidationModification
      });
    }


    if (targetValueSpecification.type === RawObjectDataProcessor.ValuesTypesIDs.ambiguousObject) {

      if (!(typeof targetValue !== "object")) {

        this.registerValidationError({
          title: this.localization.validationErrors.valueTypeDoesNotMatchWithExpected.title,
          description: this.localization.validationErrors.valueTypeDoesNotMatchWithExpected.
              generateDescription({
                actualNativeType: typeof targetValue,
                expectedTypeID: RawObjectDataProcessor.ValuesTypesIDs.ambiguousObject
              }),
          targetPropertyDotSeparatedQualifiedInitialName: this.currentObjectPropertyDotSeparatedQualifiedName,
          targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
          targetPropertyValue: targetValue,
          targetPropertyValueSpecification: targetValueSpecification,
          targetPropertyStringifiedValueBeforeFirstPreValidationModification
        });

        return { isInvalid: true };

      }


      /* eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- [ Performance Optimization ]
       * The non-null check has been done already for `targetValue`, no need to do it again by `isArbitraryObject` type
       *  guard.  */
      const targetObjectTypeValue: ArbitraryObject = targetValue as ArbitraryObject;

      if (targetValueSpecification.isFixedSchemaCase(targetObjectTypeValue)) {
        return this.processFixedSchemaObjectTypeValue({
          preCheckedForNonNullObjectValueOfSubsequentLevel__expectedToBeObject: targetObjectTypeValue,
          targetObjectTypeValueSpecification: {
            type: RawObjectDataProcessor.ValuesTypesIDs.fixedSchemaObject,
            ...targetValueSpecification.whenFixedSchema
          },
          parentObject,
          targetPropertyStringifiedValueBeforeFirstPreValidationModification
        });
      }


      this.processAssociativeArrayTypeValue({
        preCheckedForNonNullObjectValueOfSubsequentLevel__expectedToBeObject: targetObjectTypeValue,
        targetAssociativeArrayTypeValueSpecification: {
          type: RawObjectDataProcessor.ValuesTypesIDs.associativeArray,
          ...targetValueSpecification.whenAssociativeArray
        },
        parentObject,
        targetPropertyStringifiedValueBeforeFirstPreValidationModification
      });

    }

    if (targetValueSpecification.type === RawObjectDataProcessor.ValuesTypesIDs.ambiguousArray) {

      if (!Array.isArray(targetValue)) {

        this.registerValidationError({
          title: this.localization.validationErrors.valueTypeDoesNotMatchWithExpected.title,
          description: this.localization.validationErrors.valueTypeDoesNotMatchWithExpected.
            generateDescription({
              actualNativeType: typeof targetValue,
              expectedTypeID: RawObjectDataProcessor.ValuesTypesIDs.ambiguousArray
            }),
          targetPropertyDotSeparatedQualifiedInitialName: this.currentObjectPropertyDotSeparatedQualifiedName,
          targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
          targetPropertyValue: targetValue,
          targetPropertyValueSpecification: targetValueSpecification,
          targetPropertyStringifiedValueBeforeFirstPreValidationModification
        });

        return { isInvalid: true };

      }


      if (targetValueSpecification.isTupleCase(targetValue)) {
        return this.processTupleTypeValue({
          targetValueOfSubsequentLevel__expectedToBeArray: targetValue,
          targetTupleTypeValueSpecification: {
            type: RawObjectDataProcessor.ValuesTypesIDs.tuple,
            ...targetValueSpecification.whenTuple
          },
          parentObject,
          targetPropertyStringifiedValueBeforeFirstPreValidationModification
        });
      }


      return this.processIndexedArrayTypeValue({
        targetValueOfSubsequentLevel__expectedToBeArray: targetValue,
        targetIndexedArrayTypeValueSpecification: {
          type: RawObjectDataProcessor.ValuesTypesIDs.indexedArray,
          ...targetValueSpecification.whenIndexedArray
        },
        parentObject,
        targetPropertyStringifiedValueBeforeFirstPreValidationModification
      });

    }


    /* [ Approach ]
     * Except the bug case, the reaching of this point possible only with invalid TypeScript.
     * The throwing of error is required to prevent "TS2366: Function lacks ending return statement and return type
     *   does not include undefined".
     * */
    Logger.throwErrorAndLog({
      errorType: RawObjectDataProcessor.ThrowableErrorsNames.dataTypeNotSpecified,
      title: this.localization.throwableErrors.dataTypeNotSpecified.title,
      description: this.localization.throwableErrors.dataTypeNotSpecified.generateDescription({
        targetPropertyDotSeparatedQualifiedName: this.currentObjectPropertyDotSeparatedQualifiedName,
        ...isNotUndefined(targetValueSpecification.type) ?
            { specifiedStringifiedType: String(targetValueSpecification.type) } : null
      }),
      occurrenceLocation: "RawObjectDataProcessor.processSingleNeitherUndefinedNorNullValue(valueType)"
    });

  }


  private processNumericValue(
    {
      targetValue__expectedToBeNumber,
      targetValueSpecification,
      parentObject,
      targetPropertyStringifiedValueBeforeFirstPreValidationModification
    }: {
      targetValue__expectedToBeNumber: unknown;
      targetValueSpecification: RawObjectDataProcessor.NumericValueSpecification;
      parentObject?: ArbitraryObject;
      targetPropertyStringifiedValueBeforeFirstPreValidationModification?: string;
    }
  ): RawObjectDataProcessor.ValueProcessingResult {

    if (!isNumber(targetValue__expectedToBeNumber)) {

      this.registerValidationError({
        title: this.localization.validationErrors.valueTypeDoesNotMatchWithExpected.title,
        description: this.localization.validationErrors.valueTypeDoesNotMatchWithExpected.
        generateDescription({
          actualNativeType: typeof targetValue__expectedToBeNumber,
          expectedTypeID: RawObjectDataProcessor.ValuesTypesIDs.number
        }),
        targetPropertyDotSeparatedQualifiedInitialName: this.currentObjectPropertyDotSeparatedQualifiedName,
        targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
        targetPropertyValue: targetValue__expectedToBeNumber,
        targetPropertyValueSpecification: targetValueSpecification,
        targetPropertyStringifiedValueBeforeFirstPreValidationModification
      });

      return { isInvalid: true };

    }

    // TODO NaN の処理
    let propertyValueMatchingWithExpectedNumberSet: boolean;

    switch (targetValueSpecification.numbersSet) {

      case RawObjectDataProcessor.NumbersSets.naturalNumber: {
        propertyValueMatchingWithExpectedNumberSet = isNaturalNumber(targetValue__expectedToBeNumber);
        break;
      }

      case RawObjectDataProcessor.NumbersSets.positiveIntegerOrZero:
      case RawObjectDataProcessor.NumbersSets.naturalNumberOrZero:
          {
            propertyValueMatchingWithExpectedNumberSet = isPositiveIntegerOrZero(targetValue__expectedToBeNumber);
            break;
          }

      case RawObjectDataProcessor.NumbersSets.negativeInteger: {
        propertyValueMatchingWithExpectedNumberSet = isNegativeInteger(targetValue__expectedToBeNumber);
        break;
      }

      case RawObjectDataProcessor.NumbersSets.negativeIntegerOrZero: {
        propertyValueMatchingWithExpectedNumberSet = isNegativeIntegerOrZero(targetValue__expectedToBeNumber);
        break;
      }

      case RawObjectDataProcessor.NumbersSets.anyInteger: {
        propertyValueMatchingWithExpectedNumberSet = Number.isInteger(targetValue__expectedToBeNumber);
        break;
      }

      case RawObjectDataProcessor.NumbersSets.positiveDecimalFraction: {
        propertyValueMatchingWithExpectedNumberSet = isPositiveDecimalFraction(targetValue__expectedToBeNumber);
        break;
      }

      case RawObjectDataProcessor.NumbersSets.positiveDecimalFractionOrZero: {
        propertyValueMatchingWithExpectedNumberSet =
            isPositiveDecimalFraction(targetValue__expectedToBeNumber) || targetValue__expectedToBeNumber === 0;
        break;
      }

      case RawObjectDataProcessor.NumbersSets.negativeDecimalFraction: {
        propertyValueMatchingWithExpectedNumberSet = isNegativeDecimalFraction(targetValue__expectedToBeNumber);
        break;
      }

      case RawObjectDataProcessor.NumbersSets.negativeDecimalFractionOrZero: {
        propertyValueMatchingWithExpectedNumberSet =
            isNegativeDecimalFraction(targetValue__expectedToBeNumber) || targetValue__expectedToBeNumber === 0;
        break;
      }

      case RawObjectDataProcessor.NumbersSets.anyDecimalFraction: {
        propertyValueMatchingWithExpectedNumberSet = isDecimalFractionOfAnySign(targetValue__expectedToBeNumber);
        break;
      }

      case RawObjectDataProcessor.NumbersSets.anyDecimalFractionOrZero: {
        propertyValueMatchingWithExpectedNumberSet =
            isDecimalFractionOfAnySign(targetValue__expectedToBeNumber) || targetValue__expectedToBeNumber === 0;
        break;
      }

      case RawObjectDataProcessor.NumbersSets.anyRealNumber: {
        propertyValueMatchingWithExpectedNumberSet = true;
        break;
      }

      case RawObjectDataProcessor.NumbersSets.positiveRealNumber: {
        propertyValueMatchingWithExpectedNumberSet = targetValue__expectedToBeNumber > 0;
        break;
      }

      case RawObjectDataProcessor.NumbersSets.negativeRealNumber: {
        propertyValueMatchingWithExpectedNumberSet = targetValue__expectedToBeNumber < 0;
        break;
      }

      case RawObjectDataProcessor.NumbersSets.positiveRealNumberOrZero: {
        propertyValueMatchingWithExpectedNumberSet = targetValue__expectedToBeNumber >= 0;
        break;
      }

      case RawObjectDataProcessor.NumbersSets.negativeRealNumberOrZero: {
        propertyValueMatchingWithExpectedNumberSet = targetValue__expectedToBeNumber <= 0;
      }

    }

    if (!propertyValueMatchingWithExpectedNumberSet) {

      this.registerValidationError({
        title: this.localization.validationErrors.numericValueIsNotBelongToExpectedNumbersSet.title,
        description: this.localization.validationErrors.numericValueIsNotBelongToExpectedNumbersSet.generateDescription({
          expectedNumberSet: targetValueSpecification.numbersSet
        }),
        targetPropertyDotSeparatedQualifiedInitialName: this.currentObjectPropertyDotSeparatedQualifiedName,
        targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
        targetPropertyValue: targetValue__expectedToBeNumber,
        targetPropertyValueSpecification: targetValueSpecification,
        targetPropertyStringifiedValueBeforeFirstPreValidationModification
      });

      return { isInvalid: true };

    }


    if (
      isNotUndefined(targetValueSpecification.allowedAlternatives) &&
      !targetValueSpecification.allowedAlternatives.
          map(
            (polymorphicElement: number | { key: string; value: number; }): number =>
                (isNumber(polymorphicElement) ? polymorphicElement : polymorphicElement.value)
          ).
          includes(targetValue__expectedToBeNumber)
    ) {

      this.registerValidationError({
        title: this.localization.validationErrors.valueIsNotAmongAllowedAlternatives.title,
        description: this.localization.validationErrors.valueIsNotAmongAllowedAlternatives.generateDescription({
          allowedAlternatives: targetValueSpecification.allowedAlternatives.map(
            (polymorphicElement: number | { key: string; value: number; }): string =>
                (isNumber(polymorphicElement) ? polymorphicElement.toString() : polymorphicElement.key)
          )
        }),
        targetPropertyDotSeparatedQualifiedInitialName: this.currentObjectPropertyDotSeparatedQualifiedName,
        targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
        targetPropertyValue: targetValue__expectedToBeNumber,
        targetPropertyValueSpecification: targetValueSpecification,
        targetPropertyStringifiedValueBeforeFirstPreValidationModification
      });

      return { isInvalid: true };

    }


    if (
      isNotUndefined(targetValueSpecification.minimalValue) &&
      targetValue__expectedToBeNumber < targetValueSpecification.minimalValue
    ) {

      this.registerValidationError({
        title: this.localization.validationErrors.numericValueIsSmallerThanRequiredMinimum.title,
        description: this.localization.validationErrors.numericValueIsSmallerThanRequiredMinimum.generateDescription({
          requiredMinimum: targetValueSpecification.minimalValue
        }),
        targetPropertyDotSeparatedQualifiedInitialName: this.currentObjectPropertyDotSeparatedQualifiedName,
        targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
        targetPropertyValue: targetValue__expectedToBeNumber,
        targetPropertyValueSpecification: targetValueSpecification,
        targetPropertyStringifiedValueBeforeFirstPreValidationModification
      });

      return { isInvalid: true };

    }


    if (
      isNotUndefined(targetValueSpecification.maximalValue) &&
      targetValue__expectedToBeNumber > targetValueSpecification.maximalValue
    ) {

      this.registerValidationError({
        title: this.localization.validationErrors.numericValueIsGreaterThanAllowedMaximumReadonly.title,
        description: this.localization.validationErrors.numericValueIsGreaterThanAllowedMaximumReadonly.generateDescription({
          allowedMaximum: targetValueSpecification.maximalValue
        }),
        targetPropertyDotSeparatedQualifiedInitialName: this.currentObjectPropertyDotSeparatedQualifiedName,
        targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
        targetPropertyValue: targetValue__expectedToBeNumber,
        targetPropertyValueSpecification: targetValueSpecification,
        targetPropertyStringifiedValueBeforeFirstPreValidationModification
      });

      return { isInvalid: true };

    }


    let atLeastOneCustomValidationFailed: boolean = false;

    for (
      const customValidator of
      RawObjectDataProcessor.getNormalizedCustomValidators(targetValueSpecification.customValidators)
    ) {

      // TODO try / catch + 三つの戦略
      if (
        !customValidator.validationFunction({
          value: targetValue__expectedToBeNumber,
          rawData__full: this.rawData,
          rawData__currentObjectDepth: parentObject ?? this.rawData,
          targetPropertyDotSeparatedPath: this.currentObjectPropertyDotSeparatedQualifiedName
        })
      ) {

        atLeastOneCustomValidationFailed = true;

        this.registerValidationError({
          title: this.localization.validationErrors.customValidationFailed.title,
          description: this.localization.validationErrors.customValidationFailed.generateDescription({
            customValidationDescription: customValidator.descriptionForLogging
          }),
          targetPropertyDotSeparatedQualifiedInitialName: this.currentObjectPropertyDotSeparatedQualifiedName,
          targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
          targetPropertyValue: targetValue__expectedToBeNumber,
          targetPropertyValueSpecification: targetValueSpecification,
          targetPropertyStringifiedValueBeforeFirstPreValidationModification
        });

      }

    }

    if (atLeastOneCustomValidationFailed) {
      return { isInvalid: true };
    }


    if (this.isValidationOnlyMode) {
      return { thisOneIsValidButPostProcessingDisabledForPerformanceBecauseDataIsInvalidInLarge: true };
    }


    let processedValue: number = targetValue__expectedToBeNumber;

    for (
      const postValidationModification of RawObjectDataProcessor.
          getNormalizedPostValidationModifications(targetValueSpecification.postValidationModifications)
    ) {
      processedValue = postValidationModification(processedValue);
    }

    return {
      processedValue,
      hasDefinitelyNotChanged: true
    };

  }

  private processStringValue(
    {
      targetValue__expectedToBeString,
      targetValueSpecification,
      parentObject,
      targetPropertyStringifiedValueBeforeFirstPreValidationModification
    }: {
      targetValue__expectedToBeString: unknown;
      targetValueSpecification: RawObjectDataProcessor.StringValueSpecification;
      parentObject?: ArbitraryObject;
      targetPropertyStringifiedValueBeforeFirstPreValidationModification?: string;
    }
  ): RawObjectDataProcessor.ValueProcessingResult {

    if (!isString(targetValue__expectedToBeString)) {

      this.registerValidationError({
        title: this.localization.validationErrors.valueTypeDoesNotMatchWithExpected.title,
        description: this.localization.validationErrors.valueTypeDoesNotMatchWithExpected.
        generateDescription({
          actualNativeType: typeof targetValue__expectedToBeString,
          expectedTypeID: RawObjectDataProcessor.ValuesTypesIDs.number
        }),
        targetPropertyDotSeparatedQualifiedInitialName: this.currentObjectPropertyDotSeparatedQualifiedName,
        targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
        targetPropertyValue: targetValue__expectedToBeString,
        targetPropertyValueSpecification: targetValueSpecification,
        targetPropertyStringifiedValueBeforeFirstPreValidationModification
      });

      return { isInvalid: true };

    }


    if (
      isNotUndefined(targetValueSpecification.allowedAlternatives) &&
      !targetValueSpecification.allowedAlternatives.
          map(
            (polymorphicElement: string | { key: string; value: string; }): string =>
                (isString(polymorphicElement) ? polymorphicElement : polymorphicElement.value)
          ).
          includes(targetValue__expectedToBeString)
    ) {

      this.registerValidationError({
        title: this.localization.validationErrors.valueIsNotAmongAllowedAlternatives.title,
        description: this.localization.validationErrors.valueIsNotAmongAllowedAlternatives.generateDescription({
          allowedAlternatives: targetValueSpecification.allowedAlternatives.map(
            (polymorphicElement: string | { key: string; value: string; }): string =>
                (isString(polymorphicElement) ? polymorphicElement : polymorphicElement.key)
          )
        }),
        targetPropertyDotSeparatedQualifiedInitialName: this.currentObjectPropertyDotSeparatedQualifiedName,
        targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
        targetPropertyValue: targetValue__expectedToBeString,
        targetPropertyValueSpecification: targetValueSpecification,
        targetPropertyStringifiedValueBeforeFirstPreValidationModification
      });

      return { isInvalid: true };

    }


    if (
      isNaturalNumber(targetValueSpecification.minimalCharactersCount) &&
      targetValue__expectedToBeString.length < targetValueSpecification.minimalCharactersCount
    ) {

      this.registerValidationError({
        title: this.localization.validationErrors.charactersCountIsLessThanRequired.title,
        description: this.localization.validationErrors.charactersCountIsLessThanRequired.generateDescription({
          minimalCharactersCount: targetValueSpecification.minimalCharactersCount,
          realCharactersCount: targetValue__expectedToBeString.length
        }),
        targetPropertyDotSeparatedQualifiedInitialName: this.currentObjectPropertyDotSeparatedQualifiedName,
        targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
        targetPropertyValue: targetValue__expectedToBeString,
        targetPropertyValueSpecification: targetValueSpecification,
        targetPropertyStringifiedValueBeforeFirstPreValidationModification
      });

      return { isInvalid: true };

    }


    if (
      isNaturalNumber(targetValueSpecification.maximalCharactersCount) &&
      targetValue__expectedToBeString.length > targetValueSpecification.maximalCharactersCount
    ) {

      this.registerValidationError({
        title: this.localization.validationErrors.charactersCountIsMoreThanAllowed.title,
        description: this.localization.validationErrors.charactersCountIsMoreThanAllowed.generateDescription({
          maximalCharactersCount: targetValueSpecification.maximalCharactersCount,
          realCharactersCount: targetValue__expectedToBeString.length
        }),
        targetPropertyDotSeparatedQualifiedInitialName: this.currentObjectPropertyDotSeparatedQualifiedName,
        targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
        targetPropertyValue: targetValue__expectedToBeString,
        targetPropertyValueSpecification: targetValueSpecification,
        targetPropertyStringifiedValueBeforeFirstPreValidationModification
      });

      return { isInvalid: true };

    }


    if (
      isNaturalNumber(targetValueSpecification.fixedCharactersCount) &&
      targetValue__expectedToBeString.length !== targetValueSpecification.fixedCharactersCount
    ) {

      this.registerValidationError({
        title: this.localization.validationErrors.charactersCountDoesNotMatchWithSpecified.title,
        description: this.localization.validationErrors.charactersCountDoesNotMatchWithSpecified.generateDescription({
          fixedCharactersCount: targetValueSpecification.fixedCharactersCount,
          realCharactersCount: targetValue__expectedToBeString.length
        }),
        targetPropertyDotSeparatedQualifiedInitialName: this.currentObjectPropertyDotSeparatedQualifiedName,
        targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
        targetPropertyValue: targetValue__expectedToBeString,
        targetPropertyValueSpecification: targetValueSpecification,
        targetPropertyStringifiedValueBeforeFirstPreValidationModification
      });

      return { isInvalid: true };

    }


    if (
      isNotUndefined(targetValueSpecification.validValueRegularExpression) &&
      !targetValueSpecification.validValueRegularExpression.test(targetValue__expectedToBeString)
    ) {

      this.registerValidationError({
        title: this.localization.validationErrors.regularExpressionMismatch.title,
        description: this.localization.validationErrors.regularExpressionMismatch.generateDescription({
          regularExpression: targetValueSpecification.validValueRegularExpression
        }),
        targetPropertyDotSeparatedQualifiedInitialName: this.currentObjectPropertyDotSeparatedQualifiedName,
        targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
        targetPropertyValue: targetValue__expectedToBeString,
        targetPropertyValueSpecification: targetValueSpecification,
        targetPropertyStringifiedValueBeforeFirstPreValidationModification
      });

      return { isInvalid: true };

    }


    let atLeastOneCustomValidationFailed: boolean = false;

    for (
      const customValidator of
      RawObjectDataProcessor.getNormalizedCustomValidators(targetValueSpecification.customValidators)
    ) {

      // TODO try / catch + 三つの戦略
      if (
        !customValidator.validationFunction({
          value: targetValue__expectedToBeString,
          rawData__full: this.rawData,
          rawData__currentObjectDepth: parentObject ?? this.rawData,
          targetPropertyDotSeparatedPath: this.currentObjectPropertyDotSeparatedQualifiedName
        })
      ) {

        atLeastOneCustomValidationFailed = true;

        this.registerValidationError({
          title: this.localization.validationErrors.customValidationFailed.title,
          description: this.localization.validationErrors.customValidationFailed.generateDescription({
            customValidationDescription: customValidator.descriptionForLogging
          }),
          targetPropertyDotSeparatedQualifiedInitialName: this.currentObjectPropertyDotSeparatedQualifiedName,
          targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
          targetPropertyValue: targetValue__expectedToBeString,
          targetPropertyValueSpecification: targetValueSpecification,
          targetPropertyStringifiedValueBeforeFirstPreValidationModification
        });

      }

    }

    if (atLeastOneCustomValidationFailed) {
      return { isInvalid: true };
    }


    if (this.isValidationOnlyMode) {
      return { thisOneIsValidButPostProcessingDisabledForPerformanceBecauseDataIsInvalidInLarge: true };
    }


    let processedValue: string = targetValue__expectedToBeString;

    for (
      const postValidationModification of RawObjectDataProcessor.
          getNormalizedPostValidationModifications(targetValueSpecification.postValidationModifications)
    ) {
      processedValue = postValidationModification(processedValue);
    }

    return {
      processedValue,
      hasDefinitelyNotChanged: true
    };
  }

  private processBooleanValue(
    {
      targetValue__expectedToBeBoolean,
      targetValueSpecification,
      parentObject,
      targetPropertyStringifiedValueBeforeFirstPreValidationModification
    }: {
      targetValue__expectedToBeBoolean: unknown;
      targetValueSpecification: RawObjectDataProcessor.BooleanValueSpecification;
      parentObject?: ArbitraryObject;
      targetPropertyStringifiedValueBeforeFirstPreValidationModification?: string;
    }
  ): RawObjectDataProcessor.ValueProcessingResult {

    if (!isBoolean(targetValue__expectedToBeBoolean)) {

      this.registerValidationError({
        title: this.localization.validationErrors.valueTypeDoesNotMatchWithExpected.title,
        description: this.localization.validationErrors.valueTypeDoesNotMatchWithExpected.
        generateDescription({
          actualNativeType: typeof targetValue__expectedToBeBoolean,
          expectedTypeID: RawObjectDataProcessor.ValuesTypesIDs.number
        }),
        targetPropertyDotSeparatedQualifiedInitialName: this.currentObjectPropertyDotSeparatedQualifiedName,
        targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
        targetPropertyValue: targetValue__expectedToBeBoolean,
        targetPropertyValueSpecification: targetValueSpecification,
        targetPropertyStringifiedValueBeforeFirstPreValidationModification
      });

      return { isInvalid: true };

    }


    if (
      (targetValueSpecification.trueOnly === true && !targetValue__expectedToBeBoolean) ||
      (targetValueSpecification.falseOnly === true && targetValue__expectedToBeBoolean)
    ) {

      this.registerValidationError({
        title: this.localization.validationErrors.disallowedBooleanValueVariant.title,
        description: this.localization.validationErrors.disallowedBooleanValueVariant.generateDescription({
          disallowedVariant: !(targetValueSpecification.trueOnly === true)
        }),
        targetPropertyDotSeparatedQualifiedInitialName: this.currentObjectPropertyDotSeparatedQualifiedName,
        targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
        targetPropertyValue: targetValue__expectedToBeBoolean,
        targetPropertyValueSpecification: targetValueSpecification,
        targetPropertyStringifiedValueBeforeFirstPreValidationModification
      });

      return { isInvalid: true };

    }


    let atLeastOneCustomValidationFailed: boolean = false;

    for (
      const customValidator of
      RawObjectDataProcessor.getNormalizedCustomValidators(targetValueSpecification.customValidators)
    ) {

      // TODO try / catch + 三つの戦略
      if (!customValidator.validationFunction({
        value: targetValue__expectedToBeBoolean,
        rawData__full: this.rawData,
        rawData__currentObjectDepth: parentObject ?? this.rawData,
          targetPropertyDotSeparatedPath: this.currentObjectPropertyDotSeparatedQualifiedName
      })) {

        atLeastOneCustomValidationFailed = true;

        this.registerValidationError({
          title: this.localization.validationErrors.customValidationFailed.title,
          description: this.localization.validationErrors.customValidationFailed.generateDescription({
            customValidationDescription: customValidator.descriptionForLogging
          }),
          targetPropertyDotSeparatedQualifiedInitialName: this.currentObjectPropertyDotSeparatedQualifiedName,
          targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
          targetPropertyValue: targetValue__expectedToBeBoolean,
          targetPropertyValueSpecification: targetValueSpecification,
          targetPropertyStringifiedValueBeforeFirstPreValidationModification
        });

      }

    }

    if (atLeastOneCustomValidationFailed) {
      return { isInvalid: true };
    }


    if (this.isValidationOnlyMode) {
      return { thisOneIsValidButPostProcessingDisabledForPerformanceBecauseDataIsInvalidInLarge: true };
    }


    let processedValue: boolean = targetValue__expectedToBeBoolean;

    for (
      const postValidationModification of RawObjectDataProcessor.
          getNormalizedPostValidationModifications(targetValueSpecification.postValidationModifications)
    ) {
      processedValue = postValidationModification(processedValue);
    }

    return {
      processedValue,
      hasDefinitelyNotChanged: true
    };

  }


  private processMultipleTypesAllowedValue(
    {
      targetValue,
      targetValueSpecification,
      parentObject,
      targetPropertyStringifiedValueBeforeFirstPreValidationModification
    }: {
      targetValue: Exclude<unknown, undefined | null>;
      targetValueSpecification: RawObjectDataProcessor.PolymorphicValueSpecification;
      parentObject?: ArbitraryObject;
      targetPropertyStringifiedValueBeforeFirstPreValidationModification?: string;
    }
  ): RawObjectDataProcessor.ValueProcessingResult {

    let specificationForValueOfCurrentType: RawObjectDataProcessor.ValueSpecification | undefined;

    switch (typeof targetValue) {

      case "number":
      case "bigint": {
        specificationForValueOfCurrentType = targetValueSpecification.alternatives.find(
          (alternativeSpecification: RawObjectDataProcessor.ValueSpecification): boolean =>
              alternativeSpecification.type === RawObjectDataProcessor.ValuesTypesIDs.number ||
              alternativeSpecification.type === Number
        );
        break;
      }

      case "string": {
        specificationForValueOfCurrentType = targetValueSpecification.alternatives.find(
          (alternativeSpecification: RawObjectDataProcessor.ValueSpecification): boolean =>
              alternativeSpecification.type === RawObjectDataProcessor.ValuesTypesIDs.string ||
              alternativeSpecification.type === String
        );
        break;
      }

      case "boolean": {
        specificationForValueOfCurrentType = targetValueSpecification.alternatives.find(
          (alternativeSpecification: RawObjectDataProcessor.ValueSpecification): boolean =>
              alternativeSpecification.type === RawObjectDataProcessor.ValuesTypesIDs.boolean ||
              alternativeSpecification.type === Boolean
        );
        break;
      }

      case "object": {

        if (Array.isArray(targetValue)) {
          specificationForValueOfCurrentType = targetValueSpecification.alternatives.find(
            (alternativeSpecification: RawObjectDataProcessor.ValueSpecification): boolean =>
                alternativeSpecification.type === RawObjectDataProcessor.ValuesTypesIDs.indexedArray ||
                alternativeSpecification.type === Array
          );
          break;
        }

        const possibleSpecificationsForObjectValueTypes: Array<RawObjectDataProcessor.ValueSpecification> =
          targetValueSpecification.alternatives.filter(
              (alternativeSpecification: RawObjectDataProcessor.ValueSpecification): boolean =>
                  alternativeSpecification.type === RawObjectDataProcessor.ValuesTypesIDs.fixedSchemaObject ||
                  alternativeSpecification.type === RawObjectDataProcessor.ValuesTypesIDs.associativeArray ||
                  alternativeSpecification.type === Object
          );

        if (possibleSpecificationsForObjectValueTypes.length > 1) {

          Logger.throwErrorAndLog({
            errorInstance: new InvalidParameterValueError({
              customMessage: this.localization.throwableErrors.incompatibleValuesTypesAlternatives.generateDescription({
                targetValueStringifiedSpecification: stringifyAndFormatArbitraryValue(targetValueSpecification)
              })
            }),
            title: this.localization.throwableErrors.incompatibleValuesTypesAlternatives.title,
            occurrenceLocation: "RawObjectDataProcessor.processMultipleTypesAllowedValue(compoundParameter)"
          });

        }

        specificationForValueOfCurrentType = possibleSpecificationsForObjectValueTypes[0];
        break;
      }

      default: {
        break;
      }

    }

    if (isUndefined(specificationForValueOfCurrentType)) {

      Logger.logError({
        errorType: InvalidParameterValueError.NAME,
        title: this.localization.validationErrors.unsupportedValueType.title,
        description: this.localization.validationErrors.unsupportedValueType.
            generateDescription({ targetPropertyValue: targetValue }),
        occurrenceLocation: "RawObjectDataProcessor.processMultipleTypesAllowedValue(parametersObject)"
      });

      return { isInvalid: true };

    }


    return this.processSingleNeitherUndefinedNorNullValue({
      targetValue,
      targetValueSpecification: specificationForValueOfCurrentType,
      parentObject,
      targetPropertyStringifiedValueBeforeFirstPreValidationModification
    });

  }


  /* --- Helpers ---------------------------------------------------------------------------------------------------- */
  private registerValidationError(payload: RawObjectDataProcessor.Localization.DataForMessagesBuilding): void {
    this.validationErrorsMessages.push(
      isString(payload) ? payload : RawObjectDataProcessor.generateValidationErrorMessage(payload, this.localization)
    );
  }

  private handleFailedPreValidationModification(
    {
      error,
      propertyOrElementMutableValue,
      propertyOrElementValueSpecification,
      propertyOrElementStringifiedValueBeforeFirstPreValidationModification,
      occurrenceMethodName
    }: Readonly<{
      error: unknown;
      propertyOrElementMutableValue: unknown;
      propertyOrElementValueSpecification: RawObjectDataProcessor.ValueSpecification;
      propertyOrElementStringifiedValueBeforeFirstPreValidationModification: string | undefined;
      occurrenceMethodName: string;
    }>
  ): void {

    switch (this.errorHandlingStrategies.onPreValidationModificationFailed) {

      case RawObjectDataProcessor.ErrorHandlingStrategies.throwingOfError: {
        Logger.throwErrorAndLog({
          errorType: RawObjectDataProcessor.ThrowableErrorsNames.preValidationModificationFailed,
          title: this.localization.throwableErrors.preValidationModificationFailed.title,
          description: this.localization.throwableErrors.preValidationModificationFailed.generateDescription({
            targetPropertyDotSeparatedQualifiedName: this.currentObjectPropertyDotSeparatedQualifiedName
          }),
          occurrenceLocation: `RawObjectDataProcessor.${ occurrenceMethodName }(compoundParameter)`,
          innerError: error
        });
      }

      /* eslint-disable-next-line no-fallthrough --
       * The ESLint does not see that `Logger.throwErrorAndLog()` returns `never` type in previous `case` block.
       * If to add the `break` to previous `case` block, it will be `TS7027: Unreachable code detected.` error. */
      case RawObjectDataProcessor.ErrorHandlingStrategies.markingOfDataAsInvalid: {

        this.registerValidationError({
          title: this.localization.validationErrors.preValidationModificationFailed.title,
          description: this.localization.validationErrors.preValidationModificationFailed.generateDescription({
            stringifiedCaughtError: stringifyAndFormatArbitraryValue(error)
          }),
          targetPropertyDotSeparatedQualifiedInitialName: this.currentObjectPropertyDotSeparatedQualifiedName,
          targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
          targetPropertyValue: propertyOrElementMutableValue,
          targetPropertyValueSpecification: propertyOrElementValueSpecification,
          targetPropertyStringifiedValueBeforeFirstPreValidationModification:
              propertyOrElementStringifiedValueBeforeFirstPreValidationModification
        });

        break;

      }

      case RawObjectDataProcessor.ErrorHandlingStrategies.warningWithoutMarkingOfDataAsInvalid: {
        Logger.logWarning({
          title: this.localization.warnings.preValidationModificationFailed.title,
          description: this.localization.warnings.preValidationModificationFailed.generateDescription({
            targetPropertyDotSeparatedQualifiedName: this.currentObjectPropertyDotSeparatedQualifiedName,
            stringifiedCaughtError: stringifyAndFormatArbitraryValue(error)
          }),
          occurrenceLocation: `RawObjectDataProcessor.${ occurrenceMethodName }(compoundParameter)`
        });
      }

    }

  }

  private get currentObjectPropertyDotSeparatedQualifiedName(): string {
    return this.currentlyIteratedObjectPropertyQualifiedInitialNameSegmentsForLogging.join(".");
  }

  /* [ Approach ] The alias for the logic clarifying */
  private get isValidationOnlyMode(): boolean {
    return this.validationErrorsMessages.length > 0;
  }

  private static getNormalizedPreValidationModifications(
    {
      mustTransformUndefinedToNull = false,
      mustTransformNullToUndefined = false,
      customPreValidationModificationOrMultipleOfThem = []
    }: Readonly<{
      mustTransformUndefinedToNull?: boolean;
      mustTransformNullToUndefined?: boolean;
      customPreValidationModificationOrMultipleOfThem?:
          RawObjectDataProcessor.PreValidationModification |
          ReadonlyArray<RawObjectDataProcessor.PreValidationModification>;
    }>

  ): Array<RawObjectDataProcessor.PreValidationModification> {
    return [
      ...mustTransformUndefinedToNull ? [ undefinedToNull ] : [],
      ...mustTransformNullToUndefined ? [ nullToUndefined ] : [],
      ...Array.isArray(customPreValidationModificationOrMultipleOfThem) ?
          customPreValidationModificationOrMultipleOfThem :
          [ customPreValidationModificationOrMultipleOfThem ]
    ];
  }

  private static getNormalizedPostValidationModifications<ValidValue>(
    postValidationModificationOrMultipleOfThem:
        ((validValue: ValidValue) => ValidValue) | ReadonlyArray<(validValue: ValidValue) => ValidValue> = []
  ): ReadonlyArray<(validValue: ValidValue) => ValidValue> {
    return typeof postValidationModificationOrMultipleOfThem === "function" ?
        [ postValidationModificationOrMultipleOfThem ] : postValidationModificationOrMultipleOfThem;
  }

  private static getNormalizedCustomValidators<ValidValue>(
    customValidatorOrMultipleOfThem:
        RawObjectDataProcessor.PropertyOrElementCustomValidator<ValidValue> |
            ReadonlyArray<RawObjectDataProcessor.PropertyOrElementCustomValidator<ValidValue>> = []
  ): ReadonlyArray<RawObjectDataProcessor.PropertyOrElementCustomValidator<ValidValue>> {
    return "length" in customValidatorOrMultipleOfThem ?
        customValidatorOrMultipleOfThem : [ customValidatorOrMultipleOfThem ];
  }


  /* ┄┄┄ Aliases ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄ */
  private static isNumericValueSpecification(
    valueSpecification: RawObjectDataProcessor.ValueSpecification
  ): valueSpecification is RawObjectDataProcessor.NumericValueSpecification {
    return valueSpecification.type === RawObjectDataProcessor.ValuesTypesIDs.number ||
        (typeof valueSpecification.type === "function" && valueSpecification.type.name === "Number");
  }

  private static isStringValueSpecification(
    valueSpecification: RawObjectDataProcessor.ValueSpecification
  ): valueSpecification is RawObjectDataProcessor.StringValueSpecification {
    return valueSpecification.type === RawObjectDataProcessor.ValuesTypesIDs.string ||
        (typeof valueSpecification.type === "function" && valueSpecification.type.name === "String");
  }

  private static isBooleanValueSpecification(
    valueSpecification: RawObjectDataProcessor.ValueSpecification
  ): valueSpecification is RawObjectDataProcessor.BooleanValueSpecification {
    return valueSpecification.type === RawObjectDataProcessor.ValuesTypesIDs.boolean ||
        (typeof valueSpecification.type === "function" && valueSpecification.type.name === "Boolean");
  }

  private static isFixedSchemaObjectValueSpecification(
    valueSpecification: RawObjectDataProcessor.ValueSpecification
  ): valueSpecification is RawObjectDataProcessor.FixedSchemaObjectValueSpecification {
    return valueSpecification.type === RawObjectDataProcessor.ValuesTypesIDs.fixedSchemaObject ||
        (typeof valueSpecification.type === "function" && valueSpecification.type.name === "Object");
  }

  private static isIndexedArrayValueSpecification(
    valueSpecification: RawObjectDataProcessor.ValueSpecification
  ): valueSpecification is RawObjectDataProcessor.IndexedArrayValueSpecification {
    return valueSpecification.type === RawObjectDataProcessor.ValuesTypesIDs.indexedArray ||
        (typeof valueSpecification.type === "function" && valueSpecification.type.name === "Array");
  }

}


namespace RawObjectDataProcessor {

  export type Options = Readonly<{
    processingApproach?: ProcessingApproaches;
    postProcessing?: <InterimValidData, ProcessedData>(interimData: InterimValidData) => ProcessedData;
    localization?: Localization;
    errorsHandlingStrategies?: Partial<ErrorsHandlingStrategies>;
  }>;

  export enum ProcessingApproaches {
    assemblingOfNewObject = "ASSEMBLING_OF_NEW_OBJECT",
    manipulationsWithSourceObject = "MANIPULATIONS_WITH_SOURCE_OBJECT"
  }

  export enum ThrowableErrorsNames {
    objectSchemaNotSpecified = "ObjectSchemaNotSpecifiedError",
    mutuallyExclusiveTransformationsBetweenUndefinedAndNull = "MutuallyExclusiveTransformationsBetweenUndefinedAndNullError",
    preValidationModificationFailed = "PreValidationModificationFailedError",
    propertyUndefinedabilityNotSpecified = "PropertyUndefinedabilityNotSpecifiedError",
    propertyNullabilityNotSpecified = "PropertyNullabilityNotSpecifiedError",
    dataTypeNotSpecified = "DataTypeNotSpecifiedError",
    unableToDeleteOutdatedProperty = "UnableToDeleteOutdatedPropertyError",
    unableToChangePropertyDescriptors = "UnableToChangePropertyDescriptorsError",
    unableToUpdatePropertyValue = "UnableToUpdatePropertyValue",
    mutuallyExclusiveAssociativeArrayKeysLimitations = "mutuallyExclusiveAssociativeArrayKeysLimitationsError"
  }

  export type ErrorsHandlingStrategies = Readonly<{
    onPreValidationModificationFailed: ErrorHandlingStrategies;
    onUnableToDeletePropertyWithOutdatedValue: ErrorHandlingStrategies;
    onUnableToChangePropertyDescriptors: ErrorHandlingStrategies;
    onUnableToUpdatePropertyValue: ErrorHandlingStrategies;
  }>;

  export enum ErrorHandlingStrategies {
    throwingOfError = "THROWING_OF_ERROR",
    markingOfDataAsInvalid = "MARKING_OF_DATA_AS_INVALID",
    warningWithoutMarkingOfDataAsInvalid = "WARNING_WITHOUT_MARKING_OF_DATA_AS_INVALID"
  }

  export enum ObjectSubtypes {
    fixedSchema = "FIXED_SCHEMA",
    associativeArray = "ASSOCIATIVE_ARRAY",
    indexedArray = "INDEXED_ARRAY",
    tuple = "TUPLE"
  }


  /* ━━━ Object Data Specification ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  export type ObjectDataSpecification =
      FixedSchemaObjectTypeDataSpecification |
      AssociativeArrayTypeDataSpecification |
      IndexedArrayTypeDataSpecification |
      TupleTypeDataSpecification;

  export namespace ObjectDataSpecification {
    export type SubtypeIndependentProperties = Readonly<{
      nameForLogging: string;
    }>;
  }

  export type FixedSchemaObjectTypeDataSpecification =
      Readonly<{ subtype: ObjectSubtypes.fixedSchema; }> &
      ObjectDataSpecification.SubtypeIndependentProperties &
      Omit<FixedSchemaObjectValueSpecification, "type">;

  export type AssociativeArrayTypeDataSpecification =
      Readonly<{ subtype: ObjectSubtypes.associativeArray; }> &
      ObjectDataSpecification.SubtypeIndependentProperties &
      Omit<AssociativeArrayValueSpecification, "type">;

  export type IndexedArrayTypeDataSpecification =
      Readonly<{ subtype: ObjectSubtypes.indexedArray; }> &
      ObjectDataSpecification.SubtypeIndependentProperties &
      Omit<IndexedArrayValueSpecification, "type">;

  export type TupleTypeDataSpecification =
      Readonly<{ subtype: ObjectSubtypes.tuple; }> &
      ObjectDataSpecification.SubtypeIndependentProperties &
      Omit<TupleValueSpecification, "type">;


  /* ━━━ Processing Result ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  export type ProcessingResult<ProcessedData> =
      Readonly<
        {
          isRawDataInvalid: false;
          processedData: ProcessedData;
        } |
        {
          isRawDataInvalid: true;
          validationErrorsMessages: ReadonlyArray<string>;
        }
      >;


  /* ─── Processed Data Workpiece ─────────────────────────────────────────────────────────────────────────────────── */
  export type ValueProcessingResult = Readonly<
    { isInvalid: true; } |
    { thisOneIsValidButPostProcessingDisabledForPerformanceBecauseDataIsInvalidInLarge: true; } |
    {
      processedValue: ParsedJSON_NestedProperty;
      hasDefinitelyNotChanged: boolean;
    }
  >;


  /* ─── Values / Properties / Properties ─────────────────────────────────────────────────────────────────────────── */

  export type ValueSpecification =
      NumericValueSpecification |
      StringValueSpecification |
      BooleanValueSpecification |
      FixedSchemaObjectValueSpecification |
      IndexedArrayValueSpecification |
      AssociativeArrayValueSpecification |
      TupleValueSpecification |
      AmbiguousObjectValueSpecification |
      AmbiguousArrayValueSpecification |
      PolymorphicValueSpecification;

  export namespace ValueSpecification {
    export type SubtypeIndependentProperties = Readonly<{
      preValidationModifications?: PreValidationModification | ReadonlyArray<PreValidationModification>;
    }>;
  }


  export type PreValidationModification = (rawValue: unknown) => unknown;

  export enum ValuesTypesIDs {
    number = "NUMBER",
    string = "STRING",
    boolean = "BOOLEAN",
    fixedSchemaObject = "FIXED_SCHEMA_OBJECT",
    indexedArray = "INDEXED_ARRAY",
    associativeArray = "ASSOCIATIVE_ARRAY",
    tuple = "TUPLE",
    ambiguousObject = "AMBIGUOUS_OBJECT",
    ambiguousArray = "AMBIGUOUS_ARRAY",
    polymorphic = "POLYMORPHIC"
  }

  export type PropertyOrElementCustomValidator<TargetValue> = Readonly<{
    validationFunction: (parametersObject: PropertyOrElementCustomValidator.CompoundParameter<TargetValue>) => boolean;
    descriptionForLogging: string;
  }>;

  export namespace PropertyOrElementCustomValidator {
    export type CompoundParameter<TargetValue> = Readonly<{
      value: TargetValue;
      rawData__currentObjectDepth: ArbitraryObject;
      rawData__full: ArbitraryObject;
      targetPropertyDotSeparatedPath: string;
    }>;
  }


  type ObjectPropertySpecification = Readonly<{
    newName?: string;
    nullable?: boolean;
    mustMakeNonConfigurable?: boolean;
    mustMakeNonEnumerable?: boolean;
    mustMakeReadonly?: boolean;
    mustLeaveEvenRenamed?: boolean;
  }>;


  type ConditionAssociatedWithProperty = Readonly<{
    predicate: ConditionAssociatedWithProperty.Predicate;
    descriptionForLogging: string;
  }>;

  export namespace ConditionAssociatedWithProperty {

    export type Predicate = (parameter: Predicate.Parameter) => boolean;

    export namespace Predicate {

      export type Parameter = Readonly<{
        rawData__currentObjectDepth: ArbitraryObject;
        rawData__full: ArbitraryObject;
        targetPropertyDotSeparatedPath: string;
      }>;

    }

  }


  export type UndefinedabilitySpecification<MainType extends Exclude<ParsedJSON_NestedProperty, null | undefined>> = Readonly<
    {
      isUndefinedForbidden: true;
      undefinedForbiddenIf?: never;
      undefinedValueSubstitution?: never;
      mustTransformUndefinedToNull?: never;
    } |
    {
      isUndefinedForbidden: false;
      mustBeUndefinedIf?: ConditionAssociatedWithProperty;
      undefinedForbiddenIf?: never;
      undefinedValueSubstitution?: never;
      mustTransformUndefinedToNull?: never;
    } |
    {
      isUndefinedForbidden?: never;
      undefinedForbiddenIf: ConditionAssociatedWithProperty;
      mustBeUndefinedIf?: ConditionAssociatedWithProperty;
      undefinedValueSubstitution?: never;
      mustTransformUndefinedToNull?: never;
    } |
    {
      isUndefinedForbidden?: never;
      undefinedForbiddenIf?: never;
      undefinedValueSubstitution: MainType;
      mustTransformUndefinedToNull?: never;
    } |
    {
      isUndefinedForbidden?: never;
      undefinedForbiddenIf?: never;
      undefinedValueSubstitution?: never;
      mustTransformUndefinedToNull: true;
    }
  >;

  export type NullabilitySpecification<MainType extends Exclude<ParsedJSON_NestedProperty, null | undefined>> = Readonly<
    {
      isNullForbidden: true;
      nullForbiddenIf?: never;
      nullValueSubstitution?: never;
      mustTransformNullToUndefined?: never;
    } |
    {
      isNullForbidden: false;
      mustBeNullIf?: ConditionAssociatedWithProperty;
      nullForbiddenIf?: never;
      nullValueSubstitution?: never;
      mustTransformNullToUndefined?: never;
    } |
    {
      isNullForbidden?: never;
      nullForbiddenIf: ConditionAssociatedWithProperty;
      mustBeNullIf?: ConditionAssociatedWithProperty;
      nullValueSubstitution?: never;
      mustTransformNullToUndefined?: never;
    } |
    {
      isNullForbidden?: never;
      nullForbiddenIf?: never;
      nullValueSubstitution: MainType;
      mustTransformNullToUndefined?: never;
    } |
    {
      isNullForbidden?: never;
      nullForbiddenIf?: never;
      nullValueSubstitution?: never;
      mustTransformNullToUndefined: true;
    }
  >;


  /* ─── Numbers ──────────────────────────────────────────────────────────────────────────────────────────────────── */
  export enum NumbersSets {

    naturalNumber = "NATURAL_NUMBER",
    positiveIntegerOrZero = "POSITIVE_INTEGER_OR_ZERO",

    /* Alias of `positiveIntegerOrZero` */
    naturalNumberOrZero = "NATURAL_NUMBER_OR_ZERO",
    negativeInteger = "NEGATIVE_INTEGER",
    negativeIntegerOrZero = "NEGATIVE_INTEGER_OR_ZERO",
    anyInteger = "ANY_INTEGER",
    positiveDecimalFraction = "POSITIVE_DECIMAL_FRACTION",
    positiveDecimalFractionOrZero = "POSITIVE_DECIMAL_FRACTION_OR_ZERO",
    negativeDecimalFraction = "NEGATIVE_DECIMAL_FRACTION",
    negativeDecimalFractionOrZero = "NEGATIVE_DECIMAL_FRACTION_OR_ZERO",
    anyDecimalFraction = "ANY_DECIMAL_FRACTION",
    anyDecimalFractionOrZero = "ANY_DECIMAL_FRACTION_OR_ZERO",
    anyRealNumber = "ANY_REAL_NUMBER",
    positiveRealNumber = "POSITIVE_REAL_NUMBER",
    negativeRealNumber = "NEGATIVE_REAL_NUMBER",
    positiveRealNumberOrZero = "POSITIVE_REAL_NUMBER_OR_ZERO",
    negativeRealNumberOrZero = "NEGATIVE_REAL_NUMBER_OR_ZERO"

  }

  export type NumericValueSpecification =
      ValueSpecification.SubtypeIndependentProperties &
      Readonly<{
        type: ValuesTypesIDs.number | NumberConstructor;
        numbersSet: NumbersSets;
        allowedAlternatives?: ReadonlyArray<number> | ReadonlyArray<Readonly<{ key: string; value: number; }>>;
        minimalValue?: number;
        maximalValue?: number;
        customValidators?: PropertyOrElementCustomValidator<number> | ReadonlyArray<PropertyOrElementCustomValidator<number>>;
        postValidationModifications?: ((validValue: number) => number) | ReadonlyArray<(validValue: number) => number>;
      }>;

  export type NumericPropertySpecification =
      ObjectPropertySpecification &
      NumericValueSpecification &
      UndefinedabilitySpecification<number> &
      NullabilitySpecification<number>;


  /* ─── Strings ──────────────────────────────────────────────────────────────────────────────────────────────────── */
  export type StringValueSpecification =
      ValueSpecification.SubtypeIndependentProperties &
      Readonly<{
        type: ValuesTypesIDs.string | StringConstructor;
        allowedAlternatives?: ReadonlyArray<string> | ReadonlyArray<Readonly<{ key: string; value: string; }>>;
        minimalCharactersCount?: number;
        maximalCharactersCount?: number;
        fixedCharactersCount?: number;
        validValueRegularExpression?: RegExp;
        customValidators?: PropertyOrElementCustomValidator<string> | ReadonlyArray<PropertyOrElementCustomValidator<string>>;
        postValidationModifications?: ((validValue: string) => string) | ReadonlyArray<(validValue: string) => string>;
      }>;

  export type StringPropertySpecification =
      ObjectPropertySpecification &
      StringValueSpecification &
      UndefinedabilitySpecification<string> &
      NullabilitySpecification<string>;


  /* ─── Boolean ──────────────────────────────────────────────────────────────────────────────────────────────────── */
  export type BooleanValueSpecification =
      ValueSpecification.SubtypeIndependentProperties &
      Readonly<{
        type: ValuesTypesIDs.boolean | BooleanConstructor;
        trueOnly?: boolean;
        falseOnly?: boolean;
        customValidators?: PropertyOrElementCustomValidator<boolean> | ReadonlyArray<PropertyOrElementCustomValidator<boolean>>;
        postValidationModifications?: ((validValue: boolean) => boolean) | ReadonlyArray<(validValue: boolean) => boolean>;
      }>;

  export type BooleanPropertySpecification =
      ObjectPropertySpecification &
      BooleanValueSpecification &
      UndefinedabilitySpecification<boolean> &
      NullabilitySpecification<boolean>;


  /* ─── Fixed Schema Object ──────────────────────────────────────────────────────────────────────────────────────── */
  export type FixedSchemaObjectValueSpecification =
      ValueSpecification.SubtypeIndependentProperties &
      Readonly<
        {
          type: ValuesTypesIDs.fixedSchemaObject | ObjectConstructor;
          mustExpectOnlySpecifiedProperties?: boolean;
          propertiesWillBeDeletedAfterPostValidationModifications?: ReadonlyArray<string>;
          properties?: PropertiesSpecification;
          possibleSchemas?: Readonly<{
            conditionals: Readonly<{
              [schemaName: Exclude<string, "default">]: Readonly<{
                actualIf: ConditionAssociatedWithProperty.Predicate;
                properties: PropertiesSpecification;
              }>;
            }>;
            default: PropertiesSpecification;
          }>;
          customValidators?:
              PropertyOrElementCustomValidator<ArbitraryObject> |
              ReadonlyArray<PropertyOrElementCustomValidator<ArbitraryObject>>;
          postValidationModifications?:
              ((validValue: ArbitraryObject) => ArbitraryObject) |
              ReadonlyArray<(validValue: ArbitraryObject) => ArbitraryObject>;
        }
      >;

  export type PropertiesSpecification = Readonly<{ [propertyName: string]: PropertySpecification; }>;

  export type PropertySpecification =
      NumericPropertySpecification |
      StringPropertySpecification |
      BooleanPropertySpecification |
      NestedObjectPropertySpecification |
      NestedUniformElementsIndexedArrayPropertySpecification |
      NestedUniformElementsAssociativeArrayPropertySpecification |
      NestedTuplePropertySpecification |
      MultipleTypesAllowedPropertySpecification |
      AmbiguousObjectPropertySpecification |
      AmbiguousArrayPropertySpecification;

  export type NestedObjectPropertySpecification =
      ObjectPropertySpecification &
      FixedSchemaObjectValueSpecification &
      UndefinedabilitySpecification<ParsedJSON_Object> &
      NullabilitySpecification<ParsedJSON_Object>;


  /* ─── Uniform Element Associative Value / Property ─────────────────────────────────────────────────────────────── */
  export type AssociativeArrayValueSpecification =
      ValueSpecification.SubtypeIndependentProperties &
      Readonly<
        {
          type: ValuesTypesIDs.associativeArray;
          value: ValueSpecification;
          minimalEntriesCount?: number;
          maximalEntriesCount?: number;
          exactEntriesCount?: number;
          keysOfNeitherUndefinedNorNullValues?: ReadonlyArray<string>;
          allowedKeys?: ReadonlyArray<string>;
          forbiddenKeys?: ReadonlyArray<string>;
          areUndefinedTypeValuesForbidden: boolean;
          areNullTypeValuesForbidden: boolean;
          keysAtLeastOneWhichValuesMustBeNeitherUndefinedNorNull?: ReadonlyArray<string>;
          keysRenamings?: { [rawKey: string]: string; };
          customValidators?:
              PropertyOrElementCustomValidator<ArbitraryObject> |
              ReadonlyArray<PropertyOrElementCustomValidator<ArbitraryObject>>;
          postValidationModifications?:
              ((validValue: ArbitraryObject) => ArbitraryObject) |
              ReadonlyArray<(validValue: ArbitraryObject) => ArbitraryObject>;
        }
      >;

  export type NestedUniformElementsAssociativeArrayPropertySpecification =
      ObjectPropertySpecification &
      AssociativeArrayValueSpecification &
      UndefinedabilitySpecification<ParsedJSON_Object> &
      NullabilitySpecification<ParsedJSON_Object>;


  /* ─── Uniform Element Indexed Array Value / Property ───────────────────────────────────────────────────────────── */
  export type IndexedArrayValueSpecification =
      ValueSpecification.SubtypeIndependentProperties &
      Readonly<
        {
        type: ValuesTypesIDs.indexedArray | ArrayConstructor;
        element: ValueSpecification;
        minimalElementsCount?: number;
        maximalElementsCount?: number;
        exactElementsCount?: number;
        areUndefinedElementsForbidden: boolean;
        areNullElementsForbidden: boolean;
        customValidators?: PropertyOrElementCustomValidator<ReadonlyParsedJSON_Array> |
            ReadonlyArray<PropertyOrElementCustomValidator<ReadonlyParsedJSON_Array>>;
        postValidationModifications?:
            ((validValue: ParsedJSON_Array) => ParsedJSON_Array) |
            ReadonlyArray<(validValue: ParsedJSON_Array) => ParsedJSON_Array>;
        }
      >;

  export type NestedUniformElementsIndexedArrayPropertySpecification =
      ObjectPropertySpecification &
      IndexedArrayValueSpecification &
      UndefinedabilitySpecification<ParsedJSON_Array> &
      NullabilitySpecification<ParsedJSON_Array>;


  /* ─── Tuple ────────────────────────────────────────────────────────────────────────────────────────────────────── */
  export type TupleValueSpecification =
      ValueSpecification.SubtypeIndependentProperties &
      Readonly<
        {
          type: ValuesTypesIDs.tuple;
          elements: TupleElementsSpecification;
          exactElementsCount?: number;
          minimalElementsCount?: number;
          maximalElementsCount?: number;
          customValidators?: PropertyOrElementCustomValidator<ParsedJSON_Array> | ReadonlyArray<PropertyOrElementCustomValidator<ParsedJSON_Array>>;
          postValidationModifications?:
              ((validValue: ParsedJSON_Array) => ParsedJSON_Array) |
              ReadonlyArray<(validValue: ParsedJSON_Array) => ParsedJSON_Array>;
        }
      >;

  export type TupleElementsSpecification = Readonly<{ [tupleElementIndex: number]: ValueSpecification; }>;

  export type NestedTuplePropertySpecification =
      ObjectPropertySpecification &
      TupleValueSpecification &
      UndefinedabilitySpecification<ParsedJSON_Array> &
      NullabilitySpecification<ParsedJSON_Array>;


  /* ─── Alternating Value / Property ─────────────────────────────────────────────────────────────────────────────── */
  export type PolymorphicValueSpecification =
      ValueSpecification.SubtypeIndependentProperties &
      Readonly<{
        type: ValuesTypesIDs.polymorphic;
        alternatives: Array<ValueSpecification>;
        nullSubstitution?: ParsedJSON_NestedProperty;
        customValidators?: PropertyOrElementCustomValidator<ParsedJSON_NestedProperty> |
            ReadonlyArray<PropertyOrElementCustomValidator<ParsedJSON_NestedProperty>>;
        postValidationModifications?:
            (validValue: ParsedJSON_NestedProperty) => ParsedJSON_NestedProperty |
                ReadonlyArray<(validValue: ParsedJSON_NestedProperty) => ParsedJSON_NestedProperty>;
      }>;


  type MultipleTypesAllowedPropertySpecification =
      ObjectPropertySpecification &
      PolymorphicValueSpecification &
      UndefinedabilitySpecification<Exclude<ParsedJSON_NestedProperty, undefined | null>> &
      NullabilitySpecification<Exclude<ParsedJSON_NestedProperty, undefined | null>>;


  /* ─── Ambiguous Object ─────────────────────────────────────────────────────────────────────────────────────────── */
  export type AmbiguousObjectValueSpecification =
      ValueSpecification.SubtypeIndependentProperties &
      Readonly<{
        type: ValuesTypesIDs.ambiguousObject;
        isFixedSchemaCase: (validValue: ArbitraryObject) => boolean;
        whenFixedSchema: Omit<FixedSchemaObjectValueSpecification, "type">;
        whenAssociativeArray: Omit<AssociativeArrayValueSpecification, "type">;
      }>;

  export type AmbiguousObjectPropertySpecification =
      ObjectPropertySpecification &
      AmbiguousObjectValueSpecification &
      UndefinedabilitySpecification<ParsedJSON_Object> &
      NullabilitySpecification<ParsedJSON_Object>;


  /* ─── Ambiguous Array ─────────────────────────────────────────────────────────────────────────────────────────── */
  export type AmbiguousArrayValueSpecification =
      ValueSpecification.SubtypeIndependentProperties &
      Readonly<{
        type: ValuesTypesIDs.ambiguousArray;
        isTupleCase: (valueValue: Array<unknown>) => boolean;
        whenTuple: Omit<TupleValueSpecification, "type">;
        whenIndexedArray: Omit<IndexedArrayValueSpecification, "type">;
        customValidators?: PropertyOrElementCustomValidator<ReadonlyArray<ParsedJSON_NestedProperty>> |
            ReadonlyArray<PropertyOrElementCustomValidator<ReadonlyArray<ParsedJSON_NestedProperty>>>;
        postValidationModifications?:
            ((validValue: ReadonlyArray<ParsedJSON_NestedProperty>) => Array<ParsedJSON_NestedProperty>) |
            ReadonlyArray<(validValue: ReadonlyArray<ParsedJSON_NestedProperty>) => Array<ParsedJSON_NestedProperty>>;
      }>;

  export type AmbiguousArrayPropertySpecification =
      ObjectPropertySpecification &
      AmbiguousArrayValueSpecification &
      UndefinedabilitySpecification<ParsedJSON_Array> &
      NullabilitySpecification<ParsedJSON_Array>;


  /* ━━━ Localization ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  export type Localization = Readonly<{

    generateValidationErrorMessage: (templateVariables: Localization.DataForMessagesBuilding) => string;

    generateLanguageDependentErrorNumberHeadingPart: (templateVariables: Readonly<{ messageNumber: number; }>) => string;

    validationErrors: Localization.ValidationErrors;

    throwableErrors: Localization.ThrowableErrors;

    warnings: Localization.Warnings;

    getLocalizedValueType: (valueTypeID: ValuesTypesIDs) => string;

    getLocalizedNumbersSet: (numberSet: NumbersSets) => string;

  }>;


  export namespace Localization {

    /* ─── Validation Errors ──────────────────────────────────────────────────────────────────────────────────────── */
    export type ValidationErrors = Readonly<{

      rawDataIsNotObject: Readonly<{
        generateMessage: (templateVariables: ValidationErrors.RawDataIsNotObject.TemplateVariables) => string;
      }>;

      rawDataIsNull: string;

      valueTypeDoesNotMatchWithExpected: Readonly<{
        title: string;
        generateDescription: (
          templateVariables: ValidationErrors.ValueTypeDoesNotMatchWithExpected.TemplateVariables
        ) => string;
      }>;

      preValidationModificationFailed: Readonly<{
        title: string;
        generateDescription: (
          templateVariables: ValidationErrors.PreValidationModificationFailed.TemplateVariables
        ) => string;
      }>;


      /* ┄┄┄ Undefinedability ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄ */
      forbiddenUndefinedValue: Readonly<{
        title: string;
        description: string;
      }>;

      conditionallyForbiddenUndefinedValue: Readonly<{
        title: string;
        generateDescription: (
          templateVariables: ValidationErrors.ConditionallyForbiddenUndefinedValue.TemplateVariables
        ) => string;
      }>;

      conditionallyForbiddenNonUndefinedValue: Readonly<{
        title: string;
        generateDescription: (
          templateVariables: ValidationErrors.ConditionallyForbiddenNonUndefinedValue.TemplateVariables
        ) => string;
      }>;


      /* ┄┄┄ Nullability ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄ */
      forbiddenNullValue: Readonly<{
        title: string;
        description: string;
      }>;

      conditionallyForbiddenNullValue: Readonly<{
        title: string;
        generateDescription: (
          templateVariables: ValidationErrors.ConditionallyForbiddenNullValue.TemplateVariables
        ) => string;
      }>;

      conditionallyForbiddenNonNullValue: Readonly<{
        title: string;
        generateDescription: (
          templateVariables: ValidationErrors.ConditionallyForbiddenNonNullValue.TemplateVariables
        ) => string;
      }>;


      /* ┄┄┄ Fixed Schema Objects ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄ */
      unableToDeletePropertyWithOutdatedKey: Readonly<{
        title: string;
        generateDescription: (
          templateVariables: ValidationErrors.UnableToDeletePropertyWithOutdatedKey.TemplateVariables
        ) => string;
      }>;

      unableToChangePropertyDescriptors: Readonly<{
        title: string;
        description: string;
      }>;

      // ━━━ TODO ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

      unableToUpdatePropertyValue: Readonly<{
        title: string;
        description: string;
      }>;

      numericValueIsNotBelongToExpectedNumbersSet: Readonly<{
        title: string;
        generateDescription: (
          templateVariables: ValidationErrors.NumericValueIsNotBelongToExpectedNumbersSet.TemplateVariables
        ) => string;
      }>;

      valueIsNotAmongAllowedAlternatives: Readonly<{
        title: string;
        generateDescription: (
          templateVariables: ValidationErrors.ValueIsNotAmongAllowedAlternatives.TemplateVariables
        ) => string;
      }>;

      numericValueIsSmallerThanRequiredMinimum: Readonly<{
        title: string;
        generateDescription: (
          templateVariables: ValidationErrors.NumericValueIsSmallerThanRequiredMinimum.TemplateVariables
        ) => string;
      }>;

      numericValueIsGreaterThanAllowedMaximumReadonly: Readonly<{
        title: string;
        generateDescription: (
          templateVariables: ValidationErrors.NumericValueIsGreaterThanAllowedMaximum.TemplateVariables
        ) => string;
      }>;

      charactersCountIsLessThanRequired: Readonly<{
        title: string;
        generateDescription: (
          templateVariables: ValidationErrors.CharactersCountIsLessThanRequired.TemplateVariables
        ) => string;
      }>;

      charactersCountIsMoreThanAllowed: Readonly<{
        title: string;
        generateDescription: (
          templateVariables: ValidationErrors.CharactersCountIsMoreThanAllowed.TemplateVariables
        ) => string;
      }>;

      charactersCountDoesNotMatchWithSpecified: Readonly<{
        title: string;
        generateDescription: (
          templateVariables: ValidationErrors.CharactersCountDoesNotMatchWithSpecified.TemplateVariables
        ) => string;
      }>;

      regularExpressionMismatch: Readonly<{
        title: string;
        generateDescription: (
          templateVariables: ValidationErrors.RegularExpressionMismatch.TemplateVariables
        ) => string;
      }>;

      disallowedBooleanValueVariant: Readonly<{
        title: string;
        generateDescription: (
          templateVariables: ValidationErrors.DisallowedBooleanValueVariant.TemplateVariables
        ) => string;
      }>;

      indexedArrayElementsCountIsLessThanRequiredMinimum: Readonly<{
        title: string;
        generateDescription: (
          templateVariables: ValidationErrors.IndexedArrayElementsCountIsLessThanRequiredMinimum.TemplateVariables
        ) => string;
      }>;

      indexedArrayElementsCountIsMoreThanAllowedMaximum: Readonly<{
        title: string;
        generateDescription: (
          templateVariables: ValidationErrors.IndexedArrayElementsCountIsMoreThanAllowedMaximum.TemplateVariables
        ) => string;
      }>;

      indexedArrayElementsCountDoesNotMatchWithSpecifiedExactNumber: Readonly<{
        title: string;
        generateDescription: (
          templateVariables: ValidationErrors.IndexedArrayElementsCountDoesNotMatchWithSpecifiedExactNumber.TemplateVariables
        ) => string;
      }>;

      /* ┄┄┄ Associative Array Type Value ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄ */
      associativeArrayEntriesCountIsLessThanRequiredMinimum: Readonly<{
        title: string;
        generateDescription: (
          templateVariables: ValidationErrors.AssociativeArrayEntriesCountIsLessThanRequiredMinimum.TemplateVariables
        ) => string;
      }>;

      associativeArrayPairsCountIsMoreThanAllowedMaximum: Readonly<{
        title: string;
        generateDescription: (
          templateVariables: ValidationErrors.AssociativeArrayPairsCountIsMoreThanAllowedMaximum.TemplateVariables
        ) => string;
      }>;

      associativeArrayPairsCountDoesNotMatchWithSpecifiedExactNumber: Readonly<{
        title: string;
        generateDescription: (
          templateVariables: ValidationErrors.AssociativeArrayPairsCountDoesNotMatchWithSpecifiedExactNumber.TemplateVariables
        ) => string;
      }>;

      forbiddenForSpecificKeysUndefinedOrNullValuesFoundInAssociativeArrayTypeObject: Readonly<{
        title: string;
        generateDescription: (
          templateVariables: ValidationErrors.
              ForbiddenForSpecificKeysUndefinedOrNullValuesFoundInAssociativeArrayTypeObject.TemplateVariables
        ) => string;
      }>;

      requiredAlternativeKeysOfAssociativeArrayAreMissing: Readonly<{
        title: string;
        generateDescription: (
          templateVariables: ValidationErrors.RequiredAlternativeKeysOfAssociativeArrayAreMissing.TemplateVariables
        ) => string;
      }>;

      disallowedKeysFoundInAssociativeArray: Readonly<{
        title: string;
        generateDescription: (
          templateVariables: ValidationErrors.DisallowedKeysFoundInAssociativeArray.TemplateVariables
        ) => string;
      }>;

      unsupportedValueType: Readonly<{
        title: string;
        generateDescription: (
          templateVariables: ValidationErrors.UnsupportedValueType.TemplateVariables
        ) => string;
      }>;

      customValidationFailed: Readonly<{
        title: string;
        generateDescription: (
          templateVariables: ValidationErrors.CustomValidationFailed.TemplateVariables
        ) => string;
      }>;

      unexpectedProperties: Readonly<{
        title: string;
        generateDescription: (
          templateVariables: ValidationErrors.UnexpectedProperties.TemplateVariables
        ) => string;
      }>;

    }>;

    export namespace ValidationErrors {

      export namespace RawDataIsNotObject {
        export type TemplateVariables = Readonly<{ actualNativeType: string; }>;
      }

      export namespace ValueTypeDoesNotMatchWithExpected {
        export type TemplateVariables = Readonly<{
          expectedTypeID: ValuesTypesIDs;
          actualNativeType: string;
        }>;
      }

      export namespace PreValidationModificationFailed {
        export type TemplateVariables = Readonly<{
          stringifiedCaughtError: string;
        }>;
      }

      /* ┄┄┄ Undefinedability ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄ */
      export namespace ConditionallyForbiddenUndefinedValue {
        export type TemplateVariables = Readonly<{
          verbalConditionWhenUndefinedIsForbiddenWithoutEndOfSentenceMark: string;
        }>;
      }

      export namespace ConditionallyForbiddenNonUndefinedValue {
        export type TemplateVariables = Readonly<{
          conditionWhenMustBeUndefined: string;
        }>;
      }


      /* ┄┄┄ Null ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄ */
      export namespace ConditionallyForbiddenNullValue {
        export type TemplateVariables = Readonly<{
          verbalConditionWhenNullIsForbiddenWithoutEndOfSentenceMark: string;
        }>;
      }

      export namespace ConditionallyForbiddenNonNullValue {
        export type TemplateVariables = Readonly<{
          conditionWhenMustBeNull: string;
        }>;
      }


      /* ┄┄┄ Fixed Schema Objects ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄ */
      export namespace UnableToDeletePropertyWithOutdatedKey {
        export type TemplateVariables = Readonly<{
          propertyNewKey: string;
        }>;
      }

      // ━━━ TODO ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      export namespace NumericValueIsNotBelongToExpectedNumbersSet {
        export type TemplateVariables = Readonly<{
          expectedNumberSet: NumbersSets;
        }>;
      }

      export namespace ValueIsNotAmongAllowedAlternatives {
        export type TemplateVariables = Readonly<{
          allowedAlternatives: ReadonlyArray<string | number>;
        }>;
      }

      export namespace NumericValueIsSmallerThanRequiredMinimum {
        export type TemplateVariables = Readonly<{
          requiredMinimum: number;
        }>;
      }

      export namespace NumericValueIsGreaterThanAllowedMaximum {
        export type TemplateVariables = Readonly<{
          allowedMaximum: number;
        }>;
      }

      export namespace CharactersCountIsLessThanRequired {
        export type TemplateVariables = Readonly<{
          minimalCharactersCount: number;
          realCharactersCount: number;
        }>;
      }

      export namespace CharactersCountIsMoreThanAllowed {
        export type TemplateVariables = Readonly<{
          maximalCharactersCount: number;
          realCharactersCount: number;
        }>;
      }

      export namespace CharactersCountDoesNotMatchWithSpecified {
        export type TemplateVariables = Readonly<{
          fixedCharactersCount: number;
          realCharactersCount: number;
        }>;
      }

      export namespace RegularExpressionMismatch {
        export type TemplateVariables = Readonly<{
          regularExpression: RegExp;
        }>;
      }

      export namespace DisallowedBooleanValueVariant {
        export type TemplateVariables = Readonly<{
          disallowedVariant: boolean;
        }>;
      }

      export namespace IndexedArrayElementsCountIsLessThanRequiredMinimum {
        export type TemplateVariables = Readonly<{
          minimalElementsCount: number;
          actualElementsCount: number;
        }>;
      }

      export namespace IndexedArrayElementsCountIsMoreThanAllowedMaximum {
        export type TemplateVariables = Readonly<{
          maximalElementsCount: number;
          actualElementsCount: number;
        }>;
      }

      export namespace IndexedArrayElementsCountDoesNotMatchWithSpecifiedExactNumber {
        export type TemplateVariables = Readonly<{
          exactElementsCount: number;
          actualElementsCount: number;
        }>;
      }

      export namespace AssociativeArrayEntriesCountIsLessThanRequiredMinimum {
        export type TemplateVariables = Readonly<{
          minimalEntriesCount: number;
          actualEntriesCount: number;
        }>;
      }

      export namespace AssociativeArrayPairsCountIsMoreThanAllowedMaximum {
        export type TemplateVariables = Readonly<{
          maximalEntriesCount: number;
          actualEntriesCount: number;
        }>;
      }

      export namespace AssociativeArrayPairsCountDoesNotMatchWithSpecifiedExactNumber {
        export type TemplateVariables = Readonly<{
          exactEntriesCount: number;
          actualEntriesCount: number;
        }>;
      }

      export namespace ForbiddenForSpecificKeysUndefinedOrNullValuesFoundInAssociativeArrayTypeObject {
        export type TemplateVariables = Readonly<{ keysOfEitherUndefinedOrNullValues: ReadonlyArray<string>; }>;
      }

      export namespace RequiredAlternativeKeysOfAssociativeArrayAreMissing {
        export type TemplateVariables = Readonly<{ requiredKeysAlternatives: ReadonlyArray<string>; }>;
      }

      export namespace DisallowedKeysFoundInAssociativeArray {
        export type TemplateVariables = Readonly<{ foundDisallowedKeys: ReadonlyArray<string>; }>;
      }

      export namespace UnsupportedValueType {
        export type TemplateVariables = Readonly<{ targetPropertyValue: unknown; }>;
      }

      export namespace CustomValidationFailed {
        export type TemplateVariables = Readonly<{
          customValidationDescription: string;
        }>;
      }

      export namespace UnexpectedProperties {
        export type TemplateVariables = Readonly<{
          unexpectedProperties: ReadonlyArray<string>;
        }>;
      }

    }


    /* ─── Throwable Errors ───────────────────────────────────────────────────────────────────────────────────────── */
    export type ThrowableErrors = Readonly<{

      objectSchemaNotSpecified: Readonly<{
        title: string;
        generateDescription: (
          templateVariables: ThrowableErrors.ObjectSchemaNotSpecified.TemplateVariables
        ) => string;
      }>;

      mutuallyExclusiveTransformationsBetweenUndefinedAndNull: Readonly<{
        title: string;
        generateDescription: (
          templateVariables: ThrowableErrors.MutuallyExclusiveTransformationsBetweenUndefinedAndNull.TemplateVariables
        ) => string;
      }>;

      preValidationModificationFailed: Readonly<{
        title: string;
        generateDescription: (
          templateVariables: ThrowableErrors.PreValidationModificationFailed.TemplateVariables
        ) => string;
      }>;

      propertyUndefinedabilityNotSpecified: Readonly<{
        title: string;
        generateDescription: (
          templateVariables: ThrowableErrors.PropertyUndefinedabilityNotSpecified.TemplateVariables
        ) => string;
      }>;

      propertyNullabilityNotSpecified: Readonly<{
        title: string;
        generateDescription: (
          templateVariables: ThrowableErrors.PropertyNullabilityNotSpecified.TemplateVariables
        ) => string;
      }>;

      dataTypeNotSpecified: Readonly<{
        title: string;
        generateDescription: (
          templateVariables: ThrowableErrors.DataTypeNotSpecified.TemplateVariables
        ) => string;
      }>;

      unableToDeletePropertyWithOutdatedKey: Readonly<{
        title: string;
        generateDescription: (
          templateVariables: ThrowableErrors.UnableToDeletePropertyWithOutdatedKey.TemplateVariables
        ) => string;
      }>;
      // ━━━ TODO ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      unableToChangePropertyDescriptors: Readonly<{
        title: string;
        generateDescription: (
          templateVariables: ThrowableErrors.UnableToChangePropertyDescriptors.TemplateVariables
        ) => string;
      }>;

      unableToUpdatePropertyValue: Readonly<{
        title: string;
        generateDescription: (
          templateVariables: ThrowableErrors.UnableToUpdatePropertyValue.TemplateVariables
        ) => string;
      }>;

      mutuallyExclusiveAssociativeArrayKeysLimitations: Readonly<{
        title: string;
        generateDescription: (
            templateVariables: ThrowableErrors.MutuallyExclusiveAssociativeArrayKeysLimitations.TemplateVariables
        ) => string;
      }>;

      incompatibleValuesTypesAlternatives: Readonly<{
        title: string;
        generateDescription: (
          templateVariables: ThrowableErrors.IncompatibleValuesTypesAlternatives.TemplateVariables
        ) => string;
      }>;

    }>;

    export namespace ThrowableErrors {

      export namespace ObjectSchemaNotSpecified {
        export type TemplateVariables = Readonly<{
          targetPropertyDotSeparatedQualifiedName: string;
        }>;
      }

      export namespace MutuallyExclusiveTransformationsBetweenUndefinedAndNull {
        export type TemplateVariables = Readonly<{
          targetPropertyDotSeparatedQualifiedName: string;
        }>;
      }

      export namespace PreValidationModificationFailed {
        export type TemplateVariables = Readonly<{
          targetPropertyDotSeparatedQualifiedName: string;
        }>;
      }

      export namespace PropertyUndefinedabilityNotSpecified {
        export type TemplateVariables = Readonly<{
          targetPropertyDotSeparatedQualifiedName: string;
        }>;
      }

      export namespace PropertyNullabilityNotSpecified {
        export type TemplateVariables = Readonly<{
          targetPropertyDotSeparatedQualifiedName: string;
        }>;
      }

      export namespace DataTypeNotSpecified {
        export type TemplateVariables = Readonly<{
          targetPropertyDotSeparatedQualifiedName: string;
          specifiedStringifiedType?: string;
        }>;
      }

      export namespace UnableToDeletePropertyWithOutdatedKey {
        export type TemplateVariables = Readonly<{
          targetPropertyDotSeparatedQualifiedName: string;
          propertyNewKey: string;
        }>;
      }

      export namespace UnableToChangePropertyDescriptors {
        export type TemplateVariables = Readonly<{
          targetPropertyDotSeparatedQualifiedName: string;
        }>;
      }
      // ━━━ TODO ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

      export namespace UnableToUpdatePropertyValue {
        export type TemplateVariables = Readonly<{
          targetPropertyDotSeparatedQualifiedName: string;
        }>;
      }

      export namespace MutuallyExclusiveAssociativeArrayKeysLimitations {
        export type TemplateVariables = Readonly<{
          targetPropertyDotSeparatedQualifiedName: string | null;
        }>;
      }

      export namespace IncompatibleValuesTypesAlternatives {
        export type TemplateVariables = Readonly<{
          targetValueStringifiedSpecification: string;
        }>;
      }

    }


    /* ─── Warnings ───────────────────────────────────────────────────────────────────────────────────────────────── */
    export type Warnings = Readonly<{

      preValidationModificationFailed: Readonly<{
        title: string;
        generateDescription: (
          templateVariables: Warnings.PreValidationModificationFailed.TemplateVariables
        ) => string;
      }>;

      unableToDeletePropertyWithOutdatedKey: Readonly<{
        title: string;
        generateDescription: (
          templateVariables: Warnings.UnableToDeletePropertyWithOutdatedKey.TemplateVariables
        ) => string;
      }>;

      unableToChangePropertyDescriptors: Readonly<{
        title: string;
        generateDescription: (
          templateVariables: Warnings.UnableToChangePropertyDescriptors.TemplateVariables
        ) => string;
      }>;

      unableToUpdatePropertyValue: Readonly<{
        title: string;
        generateDescription: (
          templateVariables: Warnings.UnableToUpdatePropertyValue.TemplateVariables
        ) => string;
      }>;

    }>;

    export namespace Warnings {

      export namespace PreValidationModificationFailed {
        export type TemplateVariables = Readonly<{
          targetPropertyDotSeparatedQualifiedName: string;
          stringifiedCaughtError: string;
        }>;
      }

      export namespace UnableToDeletePropertyWithOutdatedKey {
        export type TemplateVariables = Readonly<{
          targetPropertyDotSeparatedQualifiedName: string;
          propertyNewKey: string;
        }>;
      }

      export namespace UnableToChangePropertyDescriptors {
        export type TemplateVariables = Readonly<{
          targetPropertyDotSeparatedQualifiedName: string;
        }>;
      }

      export namespace UnableToUpdatePropertyValue {
        export type TemplateVariables = Readonly<{
          targetPropertyDotSeparatedQualifiedName: string;
        }>;
      }

    }


    // TODO from targetPropertyValueSpecification, omit "type" and defined again only with type id.
    export type PropertyDataForMessagesBuilding = Readonly<{
      targetPropertyDotSeparatedQualifiedInitialName: string | null;
      targetPropertyNewName: string | null;
      targetPropertyValue: unknown;
      targetPropertyValueSpecification: ValueSpecification;
      targetPropertyStringifiedValueBeforeFirstPreValidationModification?: string;
    }>;

    export type InvalidPropertyValidationErrorMessageTemplateData = Readonly<{
      title: string;
      description: string;
    }>;

    export type DataForMessagesBuilding = PropertyDataForMessagesBuilding & InvalidPropertyValidationErrorMessageTemplateData;

    export type ValuesTypes =
        NumberConstructor |
        StringConstructor |
        BooleanConstructor |
        ObjectConstructor |
        ArrayConstructor |
        MapConstructor |
        ValuesTypesIDs;

  }

}


export default RawObjectDataProcessor;
