import type { ArbitraryObject } from "../Types/ArbitraryObject";
import type {
  PossiblyReadonlyParsedJSON,
  ParsedJSON_Array,
  ParsedJSON_NestedProperty,
  ParsedJSON_Object
} from "../Types/ParsedJSON";

import rawObjectDataProcessorLocalization__english from "./RawObjectDataProcessorLocalization.english";

import isUndefined from "../TypeGuards/Nullables/isUndefined";
import isNotUndefined from "../TypeGuards/Nullables/isNotUndefined";
import isNull from "../TypeGuards/Nullables/isNull";
import isNotNull from "../TypeGuards/Nullables/isNotNull";
import isArbitraryObject from "../TypeGuards/Objects/isArbitraryObject";
import isNumber from "../TypeGuards/Numbers/isNumber";
import isNaturalNumber from "../TypeGuards/Numbers/isNaturalNumber";
import isNaturalNumberOrZero from "../TypeGuards/Numbers/isNaturalNumberOrZero";
import isNegativeInteger from "../TypeGuards/Numbers/isNegativeInteger";
import isNegativeIntegerOrZero from "../TypeGuards/Numbers/isNegativeIntegerOrZero";
import isPositiveDecimalFraction from "../TypeGuards/Numbers/isPositiveDecimalFraction";
import isNegativeDecimalFraction from "../TypeGuards/Numbers/isNegativeDecimalFraction";
import isDecimalFractionOfAnySign from "../TypeGuards/Numbers/isDecimalFractionOfAnySign";
import isString from "../TypeGuards/Strings/isString";
import isBoolean from "../TypeGuards/isBoolean";
import isNonEmptyArray from "../TypeGuards/Arrays/isNonEmptyArray";

import Logger from "../Logging/Logger";
import InvalidParameterValueError from "../Errors/InvalidParameterValue/InvalidParameterValueError";
import InvalidExternalDataError from "../Errors/InvalidExternalData/InvalidExternalDataError";
import UnexpectedEventError from "../Errors/UnexpectedEvent/UnexpectedEventError";
import surroundLabelByOrnament from "../Strings/surroundLabelByOrnament";
import stringifyAndFormatArbitraryValue from "../Strings/stringifyAndFormatArbitraryValue";
import removeArrayElementsByPredicates from "../Arrays/removeArrayElementsByPredicates";
import undefinedToNull from "../ValueTransformers/undefinedToNull";
import nullToUndefined from "../ValueTransformers/nullToUndefined";


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
    InterimValidData extends PossiblyReadonlyParsedJSON = ProcessedData
  >(
    rawData: unknown,
    validDataSpecification: RawObjectDataProcessor.ObjectDataSpecification,
    options: RawObjectDataProcessor.Options = {}
  ): RawObjectDataProcessor.ProcessingResult<ProcessedData> {

    const localization: RawObjectDataProcessor.Localization =
        options.localization ?? RawObjectDataProcessor.defaultLocalization;

    /* [ Theory ]
    * Because `typeof null` is `"object"`, besides `typeof` check it is required to check is value the null for the
    *   accurate error message. */
    if (isNull(rawData)) {
      return {
        rawDataIsInvalid: true,
        validationErrorsMessages: [ localization.validationErrors.rawDataIsNull ]
      };
    }


    if (!isArbitraryObject(rawData)) {
      return {
        rawDataIsInvalid: true,
        validationErrorsMessages: [
          localization.validationErrors.rawDataIsNotObject.generateMessage({ actualType: typeof rawData })
        ]
      };
    }


    const dataHoldingSelfInstance: RawObjectDataProcessor = new RawObjectDataProcessor({
      rawData,
      processingApproach: options.processingApproach,
      localization,
      errorHandlingStrategies: options.errorsHandlingStrategies
    });

    let rawDataProcessingResult: RawObjectDataProcessor.ValueProcessingResult;

    switch (validDataSpecification.subtype) {

      case RawObjectDataProcessor.ObjectSubtypes.fixedKeyAndValuePairsObject: {

        rawDataProcessingResult = dataHoldingSelfInstance.processFixedKeyAndValuePairsNonNullObjectTypeValue({
          topLevelObject: dataHoldingSelfInstance.rawData,
          targetObjectTypeValueSpecification: {
            ...{ type: RawObjectDataProcessor.ValuesTypesIDs.fixedKeyAndValuePairsObject },
            ...validDataSpecification
          }
        });

        break;

      }

      case RawObjectDataProcessor.ObjectSubtypes.indexedArray: {

        rawDataProcessingResult = dataHoldingSelfInstance.processIndexedArrayTypeValue({
          targetValue__expectedToBeIndexedArray: dataHoldingSelfInstance.rawData,
          targetIndexedArrayTypeValueSpecification: {
            ...validDataSpecification,
            ...{ type: RawObjectDataProcessor.ValuesTypesIDs.indexedArrayOfUniformElements }
          }
        });

        break;

      }

      case RawObjectDataProcessor.ObjectSubtypes.associativeArray: {

        rawDataProcessingResult = dataHoldingSelfInstance.processAssociativeArrayTypeValue({
          targetValue__expectedToBeAssociativeArrayTypeObject: dataHoldingSelfInstance.rawData,
          targetAssociativeArrayTypeValueSpecification: {
            ...validDataSpecification,
            ...{ type: RawObjectDataProcessor.ValuesTypesIDs.associativeArrayOfUniformTypeValues }
          }
        });

      }

    }

    // TODO isValidButValidationOnlyModeIsActive: それは一体どうやって起きるだろうか？
    if ("isInvalid" in rawDataProcessingResult || "isValidButValidationOnlyModeIsActive" in rawDataProcessingResult) {
      return {
        rawDataIsInvalid: true,
        validationErrorsMessages: dataHoldingSelfInstance.validationErrorsMessages
      };
    }


    return {

      rawDataIsInvalid: false,

      /* eslint-disable @typescript-eslint/consistent-type-assertions --
       * Since the type aliases and interfaces are not existing at transpiled JavaScript it's impossible to
       *   programmatically provide the correspondence between `validDataSpecification` object and
       *   `ProcessedData` type. So, the type assertion reinforced by preliminary validation is the best that possible
       *    ever validation rules could be unrelated with desired type. */
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

  /* [ Theory ] Basically, the `switch/case` is working, but there are some exceptions.
   * https://stackoverflow.com/q/69848208/4818123
   * https://stackoverflow.com/q/69848689/4818123
   * [ Approach ] This method is public because it is required for the `localization` object. */
  public static getNormalizedValueTypeID(
    valueType:
        NumberConstructor |
        StringConstructor |
        BooleanConstructor |
        ObjectConstructor |
        ArrayConstructor |
        MapConstructor |
        RawObjectDataProcessor.ValuesTypesIDs
  ): RawObjectDataProcessor.ValuesTypesIDs {

    if (
      valueType === RawObjectDataProcessor.ValuesTypesIDs.number ||
      (typeof valueType === "function" && valueType.name === "Number")
    ) {
      return RawObjectDataProcessor.ValuesTypesIDs.number;
    }


    if (
      valueType === RawObjectDataProcessor.ValuesTypesIDs.string ||
      (typeof valueType === "function" && valueType.name === "String")
    ) {
      return RawObjectDataProcessor.ValuesTypesIDs.string;
    }


    if (
      valueType === RawObjectDataProcessor.ValuesTypesIDs.boolean ||
      (typeof valueType === "function" && valueType.name === "Boolean")
    ) {
      return RawObjectDataProcessor.ValuesTypesIDs.boolean;
    }


    if (
      valueType === RawObjectDataProcessor.ValuesTypesIDs.fixedKeyAndValuePairsObject ||
      (typeof valueType === "function" && valueType.name === "Object")
    ) {
      return RawObjectDataProcessor.ValuesTypesIDs.fixedKeyAndValuePairsObject;
    }


    if (
      valueType === RawObjectDataProcessor.ValuesTypesIDs.indexedArrayOfUniformElements ||
      (typeof valueType === "function" && valueType.name === "Array")
    ) {
      return RawObjectDataProcessor.ValuesTypesIDs.indexedArrayOfUniformElements;
    }


    if (valueType === RawObjectDataProcessor.ValuesTypesIDs.associativeArrayOfUniformTypeValues) {
      return RawObjectDataProcessor.ValuesTypesIDs.associativeArrayOfUniformTypeValues;
    }


    if (valueType === RawObjectDataProcessor.ValuesTypesIDs.oneOf) {
      return RawObjectDataProcessor.ValuesTypesIDs.oneOf;
    }


    /* [ Approach ] Except the bug case, the reaching of this point possible only with invalid TypeScript. */
    Logger.throwErrorAndLog({
      errorInstance: new InvalidParameterValueError({ parameterNumber: 1, parameterName: "valueType" }),
      title: InvalidParameterValueError.localization.defaultTitle,
      occurrenceLocation: "RawObjectDataProcessor.processSingleNeitherUndefinedNorNullValue(valueType)"
    });

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
      onUnableToSubstituteUndefinePropertyValue:
          errorHandlingStrategies.onUnableToSubstituteUndefinePropertyValue ??
          RawObjectDataProcessor.ErrorHandlingStrategies.throwingOfError,
      onUnableToSubstituteNullPropertyValue:
          errorHandlingStrategies.onUnableToSubstituteNullPropertyValue ??
          RawObjectDataProcessor.ErrorHandlingStrategies.throwingOfError
    };

  }


  /* ━━━ Private Methods ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  private processFixedKeyAndValuePairsNonNullObjectTypeValue(
    {
      targetObjectTypeValueSpecification,
      parentObject,
      targetPropertyStringifiedValueBeforeFirstPreValidationModification,
      ...compoundParameter
    }: Readonly<
      (
        { topLevelObject: ArbitraryObject; } |
        { targetValueOfSubsequentLevel__expectedToBeObject: unknown; }
      ) &
      {
        targetObjectTypeValueSpecification: RawObjectDataProcessor.FixedKeyAndValuePairsObjectValueSpecification;
        parentObject?: ArbitraryObject;
        targetPropertyStringifiedValueBeforeFirstPreValidationModification?: string;
      }
    >
  ): RawObjectDataProcessor.ValueProcessingResult {

    let targetObjectTypeSourceValue: ArbitraryObject;
    let processedValueWorkpiece: ArbitraryObject;

    if ("topLevelObject" in compoundParameter) {

      targetObjectTypeSourceValue = compoundParameter.topLevelObject;

      processedValueWorkpiece =
          this.processingApproach === RawObjectDataProcessor.ProcessingApproaches.manipulationsWithSourceObject ?
              compoundParameter.topLevelObject : {};

    } else {

      if (!isArbitraryObject(compoundParameter.targetValueOfSubsequentLevel__expectedToBeObject)) {

        this.registerValidationError({
          title: this.localization.validationErrors.valueTypeDoesNotMatchWithExpected.title,
          description: this.localization.validationErrors.valueTypeDoesNotMatchWithExpected.
              generateDescription({
                actualType: typeof compoundParameter.targetValueOfSubsequentLevel__expectedToBeObject,
                expectedType: targetObjectTypeValueSpecification.type
              }),
          targetPropertyDotSeparatedQualifiedInitialName: this.currentObjectPropertyDotSeparatedQualifiedName,
          targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
          targetPropertyValue: compoundParameter.targetValueOfSubsequentLevel__expectedToBeObject,
          targetPropertyValueSpecification: targetObjectTypeValueSpecification,
          targetPropertyStringifiedValueBeforeFirstPreValidationModification
        });

        return { isInvalid: true };

      }


      targetObjectTypeSourceValue = compoundParameter.targetValueOfSubsequentLevel__expectedToBeObject;

      processedValueWorkpiece =
          this.processingApproach === RawObjectDataProcessor.ProcessingApproaches.manipulationsWithSourceObject ?
              compoundParameter.targetValueOfSubsequentLevel__expectedToBeObject : {};

    }

    const currentObjectDepthLevel__countFromZero: number =
        this.currentlyIteratedObjectPropertyQualifiedInitialNameSegmentsForLogging.length;

    const initialNamesOfNotProcessedYetProperties: Array<string> = Object.keys(targetObjectTypeSourceValue);

    let areOneOnMorePropertiesInvalid: boolean = false;

    for (
      const [ childPropertyInitialName, childPropertySpecification ] of
          Object.entries(targetObjectTypeValueSpecification.properties)
    ) {

      removeArrayElementsByPredicates({
        targetArray: initialNamesOfNotProcessedYetProperties,
        predicate: (propertyName: string): boolean => propertyName === childPropertyInitialName,
        mutably: true
      });

      initialNamesOfNotProcessedYetProperties.push(childPropertyInitialName);

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

      let childPropertyValue: unknown = targetObjectTypeSourceValue[childPropertyInitialName];
      let childPropertyStringifiedValueBeforeFirstPreValidationModification: string | undefined;

      if (
        childPropertySpecification.mustTransformUndefinedToNull === true &&
            childPropertySpecification.mustTransformNullToUndefined === true
      ) {
        Logger.throwErrorAndLog({
          errorType: RawObjectDataProcessor.ThrowableErrorsNames.mutuallyExclusiveUndefinedAndNullValueTransformations,
          title: this.localization.throwableErrors.mutuallyExclusiveUndefinedAndNullValueTransformations.title,
          description: this.localization.throwableErrors.mutuallyExclusiveUndefinedAndNullValueTransformations.
              generateDescription({
                targetPropertyDotSeparatedQualifiedName: this.currentObjectPropertyDotSeparatedQualifiedName
              }),
          occurrenceLocation: "RawObjectDataProcessor." +
              "processFixedKeyAndValuePairsNonNullObjectTypeValue(compoundParameter)"
        });
      }


      const preValidationModifications: ReadonlyArray<RawObjectDataProcessor.PreValidationModification> =
          RawObjectDataProcessor.getNormalizedPreValidationModifications({
            mustTransformUndefinedToNull: childPropertySpecification.mustTransformUndefinedToNull,
            mustTransformNullToUndefined: childPropertySpecification.mustTransformNullToUndefined,
            customPreValidationModificationOrMultipleOfThem: childPropertySpecification.preValidationModifications
          });

      if (preValidationModifications.length > 0) {
        childPropertyStringifiedValueBeforeFirstPreValidationModification =
            stringifyAndFormatArbitraryValue(childPropertyValue);
      }

      for (const preValidationModification of preValidationModifications) {

        try {

          childPropertyValue = preValidationModification(childPropertyValue);

        } catch (error: unknown) {

          switch (this.errorHandlingStrategies.onPreValidationModificationFailed) {

            case RawObjectDataProcessor.ErrorHandlingStrategies.throwingOfError: {
              Logger.throwErrorAndLog({
                errorType: RawObjectDataProcessor.ThrowableErrorsNames.preValidationModificationFailed,
                title: this.localization.throwableErrors.preValidationModificationFailed.title,
                description: this.localization.throwableErrors.preValidationModificationFailed.generateDescription({
                  targetPropertyDotSeparatedQualifiedName: this.currentObjectPropertyDotSeparatedQualifiedName
                }),
                occurrenceLocation: "RawObjectDataProcessor." +
                    "processFixedKeyAndValuePairsNonNullObjectTypeValue(compoundParameter)",
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
                targetPropertyValue: childPropertyValue,
                targetPropertyValueSpecification: childPropertySpecification,
                targetPropertyStringifiedValueBeforeFirstPreValidationModification:
                childPropertyStringifiedValueBeforeFirstPreValidationModification
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
                occurrenceLocation: "RawObjectDataProcessor." +
                    "processFixedKeyAndValuePairsNonNullObjectTypeValue(compoundParameter)"
              });
            }

          }

        }

      }


      /* ─── Undefinedability ─────────────────────────────────────────────────────────────────────────────────────── */
      if (isUndefined(childPropertyValue)) {

        if (childPropertySpecification.isUndefinedForbidden === true) {

          areOneOnMorePropertiesInvalid = true;

          this.registerValidationError({
            title: this.localization.validationErrors.forbiddenUndefinedValueOfProperty.title,
            description: this.localization.validationErrors.forbiddenUndefinedValueOfProperty.description,
            targetPropertyDotSeparatedQualifiedInitialName: this.currentObjectPropertyDotSeparatedQualifiedName,
            targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
            targetPropertyValue: childPropertyValue,
            targetPropertyValueSpecification: childPropertySpecification,
            targetPropertyStringifiedValueBeforeFirstPreValidationModification:
                childPropertyStringifiedValueBeforeFirstPreValidationModification
          });

          continue;

        }


        if (
          isNotUndefined(childPropertySpecification.undefinedForbiddenIf) &&
              childPropertySpecification.undefinedForbiddenIf.predicate(
                targetObjectTypeSourceValue, this.rawData, this.currentObjectPropertyDotSeparatedQualifiedName
              )
        ) {

          areOneOnMorePropertiesInvalid = true;

          this.registerValidationError({
            title: this.localization.validationErrors.conditionallyForbiddenUndefinedValue.title,
            description: this.localization.validationErrors.conditionallyForbiddenUndefinedValue.generateDescription({
              conditionWhenUndefinedIsForbidden: childPropertySpecification.undefinedForbiddenIf.descriptionForLogging
            }),
            targetPropertyDotSeparatedQualifiedInitialName: this.currentObjectPropertyDotSeparatedQualifiedName,
            targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
            targetPropertyValue: childPropertyValue,
            targetPropertyValueSpecification: childPropertySpecification,
            targetPropertyStringifiedValueBeforeFirstPreValidationModification:
                childPropertyStringifiedValueBeforeFirstPreValidationModification
          });

          continue;

        }


        if (isNotUndefined(childPropertySpecification.undefinedValueSubstitution) && !this.isValidationOnlyMode) {

          switch (this.processingApproach) {

            case RawObjectDataProcessor.ProcessingApproaches.manipulationsWithSourceObject: {

              this.substituteUndefinedPropertyValueAtSourceObject({
                sourceObject: processedValueWorkpiece,
                targetPropertyInitialName: childPropertyInitialName,
                targetPropertySpecification: childPropertySpecification,
                targetPropertyStringifiedValueBeforeFirstPreValidationModification:
                    childPropertyStringifiedValueBeforeFirstPreValidationModification
              });

              break;

            }

            case RawObjectDataProcessor.ProcessingApproaches.assemblingOfNewObject: {

              Object.defineProperty(
                processedValueWorkpiece,
                childPropertyFinalName,
                {
                  value: childPropertySpecification.undefinedValueSubstitution,
                  configurable: childPropertySpecification.mustMakeNonConfigurable !== true,
                  enumerable: childPropertySpecification.mustMakeNonEnumerable !== true,
                  writable: childPropertySpecification.mustMakeReadonly !== true
                }
              );

            }

          }

          continue;

        }


        if (childPropertySpecification.isUndefinedForbidden !== false) {
          Logger.throwErrorAndLog({
            errorType: RawObjectDataProcessor.ThrowableErrorsNames.propertyUndefinedabilityNotSpecified,
            title: this.localization.throwableErrors.propertyUndefinedabilityNotSpecified.title,
            description: this.localization.throwableErrors.propertyUndefinedabilityNotSpecified.generateDescription({
              targetPropertyDotSeparatedQualifiedName: this.currentObjectPropertyDotSeparatedQualifiedName
            }),
            occurrenceLocation: "RawObjectDataProcessor." +
                "processFixedKeyAndValuePairsNonNullObjectTypeValue(compoundParameter)"
          });
        }

        /* [ Approach ] Nothing required to do for the allowed undefined values. */
        continue;

      }


      if (
        "mustBeUndefinedIf" in childPropertySpecification &&
            childPropertySpecification.mustBeUndefinedIf?.predicate(
              targetObjectTypeSourceValue, this.rawData, this.currentObjectPropertyDotSeparatedQualifiedName
            ) === true
      ) {

        this.registerValidationError({
          title: this.localization.validationErrors.conditionallyForbiddenNonUndefinedValue.title,
          description: this.localization.validationErrors.conditionallyForbiddenNonUndefinedValue.generateDescription({
            conditionWhenMustBeUndefined: childPropertySpecification.mustBeUndefinedIf.descriptionForLogging
          }),
          targetPropertyDotSeparatedQualifiedInitialName: this.currentObjectPropertyDotSeparatedQualifiedName,
          targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
          targetPropertyValue: childPropertyValue,
          targetPropertyValueSpecification: childPropertySpecification,
          targetPropertyStringifiedValueBeforeFirstPreValidationModification:
          childPropertyStringifiedValueBeforeFirstPreValidationModification
        });

        continue;

      }


      /* ─── Nullability ──────────────────────────────────────────────────────────────────────────────────────────── */
      if (isNull(childPropertyValue)) {

        if (childPropertySpecification.isNullForbidden === true) {

          areOneOnMorePropertiesInvalid = true;

          this.registerValidationError({
            ...this.localization.validationErrors.nonNullableValueIsNullError,
            targetPropertyDotSeparatedQualifiedInitialName: this.currentObjectPropertyDotSeparatedQualifiedName,
            targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
            targetPropertyValue: childPropertyValue,
            targetPropertyValueSpecification: childPropertySpecification,
            targetPropertyStringifiedValueBeforeFirstPreValidationModification:
                childPropertyStringifiedValueBeforeFirstPreValidationModification
          });

          continue;

        }


        if (
          isNotUndefined(childPropertySpecification.nullForbiddenIf) &&
              childPropertySpecification.nullForbiddenIf.predicate(
                targetObjectTypeSourceValue, this.rawData, this.currentObjectPropertyDotSeparatedQualifiedName
              )
        ) {

          areOneOnMorePropertiesInvalid = true;

          this.registerValidationError({
            title: this.localization.validationErrors.conditionallyForbiddenNullValue.title,
            description: this.localization.validationErrors.conditionallyForbiddenNullValue.generateDescription({
              conditionWhenNullIsForbidden: childPropertySpecification.nullForbiddenIf.descriptionForLogging
            }),
            targetPropertyDotSeparatedQualifiedInitialName: this.currentObjectPropertyDotSeparatedQualifiedName,
            targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
            targetPropertyValue: childPropertyValue,
            targetPropertyValueSpecification: childPropertySpecification,
            targetPropertyStringifiedValueBeforeFirstPreValidationModification:
                childPropertyStringifiedValueBeforeFirstPreValidationModification
          });

          continue;

        }


        if (isNotUndefined(childPropertySpecification.nullValueSubstitution) && !this.isValidationOnlyMode) {

          switch (this.processingApproach) {

            case RawObjectDataProcessor.ProcessingApproaches.manipulationsWithSourceObject: {

              this.substituteNullPropertyValueAtSourceObject({
                sourceObject: processedValueWorkpiece,
                targetPropertyInitialName: childPropertyInitialName,
                targetPropertySpecification: childPropertySpecification,
                targetPropertyStringifiedValueBeforeFirstPreValidationModification:
                    childPropertyStringifiedValueBeforeFirstPreValidationModification
              });

              break;

            }

            case RawObjectDataProcessor.ProcessingApproaches.assemblingOfNewObject: {

              Object.defineProperty(
                processedValueWorkpiece,
                childPropertyFinalName,
                {
                  value: childPropertySpecification.nullValueSubstitution,
                  configurable: childPropertySpecification.mustMakeNonConfigurable !== true,
                  enumerable: childPropertySpecification.mustMakeNonEnumerable !== true,
                  writable: childPropertySpecification.mustMakeReadonly !== true
                }
              );

            }

          }

          continue;

        }


        if (childPropertySpecification.isNullForbidden !== false) {
          Logger.throwErrorAndLog({
            errorType: RawObjectDataProcessor.ThrowableErrorsNames.propertyNullabilityNotSpecified,
            title: this.localization.throwableErrors.propertyNullabilityNotSpecified.title,
            description: this.localization.throwableErrors.propertyNullabilityNotSpecified.generateDescription({
              targetPropertyDotSeparatedQualifiedName: this.currentObjectPropertyDotSeparatedQualifiedName
            }),
            occurrenceLocation: "RawObjectDataProcessor." +
                "processFixedKeyAndValuePairsNonNullObjectTypeValue(compoundParameter)"
          });
        }

        /* [ Approach ] Nothing required to do for the allowed null values. */
        continue;

      }


      if (
        "mustBeNullIf" in childPropertySpecification &&
            childPropertySpecification.mustBeNullIf?.predicate(
              targetObjectTypeSourceValue, this.rawData, this.currentObjectPropertyDotSeparatedQualifiedName
            ) === true
      ) {

        this.registerValidationError({
          title: this.localization.validationErrors.conditionallyForbiddenNonNullValue.title,
          description: this.localization.validationErrors.conditionallyForbiddenNonNullValue.generateDescription({
            conditionWhenMustBeNull: childPropertySpecification.mustBeNullIf.descriptionForLogging
          }),
          targetPropertyDotSeparatedQualifiedInitialName: this.currentObjectPropertyDotSeparatedQualifiedName,
          targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
          targetPropertyValue: childPropertyValue,
          targetPropertyValueSpecification: childPropertySpecification,
          targetPropertyStringifiedValueBeforeFirstPreValidationModification:
          childPropertyStringifiedValueBeforeFirstPreValidationModification
        });

        continue;

      }


      // ━━━ TODO ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      const childPropertyValueProcessingResult: RawObjectDataProcessor.ValueProcessingResult =
          this.processSingleNeitherUndefinedNorNullValue({
            targetValue: childPropertyValue,
            targetValueSpecification: childPropertySpecification,
            parentObject,
            targetPropertyStringifiedValueBeforeFirstPreValidationModification:
                childPropertyStringifiedValueBeforeFirstPreValidationModification
          });

      switch (this.processingApproach) {

        case RawObjectDataProcessor.ProcessingApproaches.assemblingOfNewObject: {

          if ("isInvalid" in childPropertyValueProcessingResult) {
            areOneOnMorePropertiesInvalid = true;
            continue;
          } else if ("isValidButValidationOnlyModeIsActive" in childPropertyValueProcessingResult) {
            continue;
          }


          Object.defineProperty(processedValueWorkpiece, childPropertyFinalName, {
            value: childPropertyValueProcessingResult.processedValue,
            configurable: isBoolean(childPropertySpecification.mustMakeNonConfigurable) ?
                childPropertySpecification.mustMakeNonConfigurable : true,
            enumerable: isBoolean(childPropertySpecification.mustMakeNonEnumerable) ?
                childPropertySpecification.mustMakeNonEnumerable : true,
            writable: isBoolean(childPropertySpecification.mustMakeReadonly) ?
                childPropertySpecification.mustMakeReadonly : true
          });

          break;
        }

        case RawObjectDataProcessor.ProcessingApproaches.manipulationsWithSourceObject: {

          /* ※ Reserved for the future.
          * Basically no need to change value, but postValidationModification and/or descriptions changes could be requested. */
        }
      }
    }

    this.currentlyIteratedObjectPropertyQualifiedInitialNameSegmentsForLogging.splice(-1, 1);


    for (
      const customValidator of
      RawObjectDataProcessor.getNormalizedCustomValidators(targetObjectTypeValueSpecification.customValidators)
    ) {

      if (!customValidator.validationFunction({
        currentPropertyValue: targetObjectTypeSourceValue,
        rawData__full: this.rawData,
        rawData__currentObjectDepth: parentObject ?? this.rawData,
        targetPropertyDotSeparatedPath: this.currentObjectPropertyDotSeparatedQualifiedName
      })) {

        areOneOnMorePropertiesInvalid = true;

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


    if (areOneOnMorePropertiesInvalid) {
      return { isInvalid: true };
    } else if (this.isValidationOnlyMode) {
      return { isValidButValidationOnlyModeIsActive: true };
    }


    for (
      const postValidationModification of RawObjectDataProcessor.
          getNormalizedPostValidationModifications(targetObjectTypeValueSpecification.postValidationModifications)
    ) {
      processedValueWorkpiece = postValidationModification(processedValueWorkpiece);
    }

    if (isNonEmptyArray(targetObjectTypeValueSpecification.propertiesWillBeDeletedAfterPostValidationModifications)) {
      for (
        const keyOfPropertyWhichWillBeDeleted of
        targetObjectTypeValueSpecification.propertiesWillBeDeletedAfterPostValidationModifications
      ) {
        /* eslint-disable-next-line @typescript-eslint/no-dynamic-delete --
         * Each element of this array has been specified by user, so user must be aware of potential side effects of
         * properties deleting.
        *  */
        delete processedValueWorkpiece[keyOfPropertyWhichWillBeDeleted];
      }
    }


    /* eslint-disable-next-line @typescript-eslint/consistent-type-assertions --
    * Above validations are like type guard for the 'ParsedJSON_NestedProperty'.
    * Same as any type guard in TypeScript, it does not guarantee that all checks matching with target types, but it is
    * the best that possible with current limitations. */
    return { processedValue: processedValueWorkpiece as ParsedJSON_NestedProperty };
  }


  private processIndexedArrayTypeValue(
    {
      targetValue__expectedToBeIndexedArray,
      targetIndexedArrayTypeValueSpecification,
      parentObject,
      targetPropertyStringifiedValueBeforeFirstPreValidationModification
    }: {
      targetValue__expectedToBeIndexedArray: unknown;
      targetIndexedArrayTypeValueSpecification: RawObjectDataProcessor.UniformElementsIndexedArrayValueSpecification;
      parentObject?: ArbitraryObject;
      targetPropertyStringifiedValueBeforeFirstPreValidationModification?: string;
    }
  ): RawObjectDataProcessor.ValueProcessingResult {

    if (!Array.isArray(targetValue__expectedToBeIndexedArray)) {

      this.registerValidationError({
        title: this.localization.validationErrors.valueTypeDoesNotMatchWithExpected.title,
        description: this.localization.validationErrors.valueTypeDoesNotMatchWithExpected.
        generateDescription({
          actualType: typeof targetValue__expectedToBeIndexedArray,
          expectedType: RawObjectDataProcessor.ValuesTypesIDs.number
        }),
        targetPropertyDotSeparatedQualifiedInitialName: this.currentObjectPropertyDotSeparatedQualifiedName,
        targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
        targetPropertyValue: targetValue__expectedToBeIndexedArray,
        targetPropertyValueSpecification: targetIndexedArrayTypeValueSpecification,
        targetPropertyStringifiedValueBeforeFirstPreValidationModification
      });

      return { isInvalid: true };

    }


    let isTargetIndexedArrayTypeValueInvalid: boolean = false;

    if (
      isNotUndefined(targetIndexedArrayTypeValueSpecification.minimalElementsCount) &&
      targetValue__expectedToBeIndexedArray.length < targetIndexedArrayTypeValueSpecification.minimalElementsCount
    ) {

      isTargetIndexedArrayTypeValueInvalid = true;

      this.registerValidationError({
        title: this.localization.validationErrors.indexedArrayElementsCountIsLessThanRequiredMinimum.title,
        description: this.localization.validationErrors.indexedArrayElementsCountIsLessThanRequiredMinimum.
            generateDescription({
              minimalElementsCount: targetIndexedArrayTypeValueSpecification.minimalElementsCount,
              actualElementsCount: targetValue__expectedToBeIndexedArray.length
            }),
        targetPropertyDotSeparatedQualifiedInitialName: this.currentObjectPropertyDotSeparatedQualifiedName,
        targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
        targetPropertyValue: targetValue__expectedToBeIndexedArray,
        targetPropertyValueSpecification: targetIndexedArrayTypeValueSpecification,
        targetPropertyStringifiedValueBeforeFirstPreValidationModification
      });

    }


    if (
      isNotUndefined(targetIndexedArrayTypeValueSpecification.maximalElementsCount) &&
      targetValue__expectedToBeIndexedArray.length > targetIndexedArrayTypeValueSpecification.maximalElementsCount
    ) {

      isTargetIndexedArrayTypeValueInvalid = true;

      this.registerValidationError({
        title: this.localization.validationErrors.indexedArrayElementsCountIsMoreThanAllowedMaximum.title,
        description: this.localization.validationErrors.indexedArrayElementsCountIsMoreThanAllowedMaximum.
            generateDescription({
              maximalElementsCount: targetIndexedArrayTypeValueSpecification.maximalElementsCount,
              actualElementsCount: targetValue__expectedToBeIndexedArray.length
            }),
        targetPropertyDotSeparatedQualifiedInitialName: this.currentObjectPropertyDotSeparatedQualifiedName,
        targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
        targetPropertyValue: targetValue__expectedToBeIndexedArray,
        targetPropertyValueSpecification: targetIndexedArrayTypeValueSpecification,
        targetPropertyStringifiedValueBeforeFirstPreValidationModification
      });

    }


    if (
      isNotUndefined(targetIndexedArrayTypeValueSpecification.exactElementsCount) &&
      targetValue__expectedToBeIndexedArray.length !== targetIndexedArrayTypeValueSpecification.exactElementsCount
    ) {

      isTargetIndexedArrayTypeValueInvalid = true;

      this.registerValidationError({
        title: this.localization.validationErrors.indexedArrayElementsCountDoesNotMatchWithSpecifiedExactNumber.title,
        description: this.localization.validationErrors.indexedArrayElementsCountDoesNotMatchWithSpecifiedExactNumber.
            generateDescription({
              exactElementsCount: targetIndexedArrayTypeValueSpecification.exactElementsCount,
              actualElementsCount: targetValue__expectedToBeIndexedArray.length
            }),
        targetPropertyDotSeparatedQualifiedInitialName: this.currentObjectPropertyDotSeparatedQualifiedName,
        targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
        targetPropertyValue: targetValue__expectedToBeIndexedArray,
        targetPropertyValueSpecification: targetIndexedArrayTypeValueSpecification,
        targetPropertyStringifiedValueBeforeFirstPreValidationModification
      });

    }


    let processedValueWorkpiece: Array<unknown> =
        this.processingApproach === RawObjectDataProcessor.ProcessingApproaches.manipulationsWithSourceObject ?
            targetValue__expectedToBeIndexedArray : [];

    const currentObjectDepthLevel__beginWithZero: number =
        this.currentlyIteratedObjectPropertyQualifiedInitialNameSegmentsForLogging.length;

    let areOneOnMoreElementsInvalid: boolean = false;

    for (const [ index, rawElement ] of targetValue__expectedToBeIndexedArray.entries()) {

      this.currentlyIteratedObjectPropertyQualifiedInitialNameSegmentsForLogging[currentObjectDepthLevel__beginWithZero] = index;

      let element: unknown = rawElement;
      let stringifiedElementBeforeFirstPreValidationModification: string | undefined;

      const preValidationModifications: Array<RawObjectDataProcessor.PreValidationModification> = RawObjectDataProcessor.
          getNormalizedPreValidationModifications(targetIndexedArrayTypeValueSpecification.element.preValidationModifications);

      if (preValidationModifications.length > 0) {
        stringifiedElementBeforeFirstPreValidationModification = stringifyAndFormatArbitraryValue(rawElement);
      }

      for (const preValidationModification of preValidationModifications) {
        try {
          element = preValidationModification(element);
        } catch (error: unknown) {
          this.registerValidationError({
            title: this.localization.validationErrors.preValidationModificationFailed.title,
            description: this.localization.validationErrors.preValidationModificationFailed.generateDescription({
              stringifiedCaughtError: stringifyAndFormatArbitraryValue(error)
            }),
            targetPropertyDotSeparatedQualifiedInitialName: this.currentObjectPropertyDotSeparatedQualifiedName,
            targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
            targetPropertyValue: element,
            targetPropertyValueSpecification: targetIndexedArrayTypeValueSpecification.element,
            targetPropertyStringifiedValueBeforeFirstPreValidationModification:
                stringifiedElementBeforeFirstPreValidationModification
          });
        }
      }


      if (isUndefined(element)) {

        if (targetIndexedArrayTypeValueSpecification.allowUndefinedTypeElements !== true) {

          areOneOnMoreElementsInvalid = true;

          this.registerValidationError({
            title: this.localization.validationErrors.indexedArrayDisallowedUndefinedElement.title,
            description: this.localization.validationErrors.indexedArrayDisallowedUndefinedElement.description,
            targetPropertyDotSeparatedQualifiedInitialName: this.currentObjectPropertyDotSeparatedQualifiedName,
            targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
            targetPropertyValue: targetValue__expectedToBeIndexedArray,
            targetPropertyValueSpecification: targetIndexedArrayTypeValueSpecification,
            targetPropertyStringifiedValueBeforeFirstPreValidationModification:
            stringifiedElementBeforeFirstPreValidationModification
          });

        }

        continue;

      }


      if (isNull(element)) {

        if (targetIndexedArrayTypeValueSpecification.allowNullElements !== true) {

          areOneOnMoreElementsInvalid = true;

          this.registerValidationError({
            title: this.localization.validationErrors.indexedArrayDisallowedNullElement.title,
            description: this.localization.validationErrors.indexedArrayDisallowedNullElement.description,
            targetPropertyDotSeparatedQualifiedInitialName: this.currentObjectPropertyDotSeparatedQualifiedName,
            targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
            targetPropertyValue: targetValue__expectedToBeIndexedArray,
            targetPropertyValueSpecification: targetIndexedArrayTypeValueSpecification,
            targetPropertyStringifiedValueBeforeFirstPreValidationModification:
                stringifiedElementBeforeFirstPreValidationModification
          });

        }

        continue;

      }


      const elementProcessingResult: RawObjectDataProcessor.ValueProcessingResult =
          this.processSingleNeitherUndefinedNorNullValue({
            targetValue: element,
            targetValueSpecification: targetIndexedArrayTypeValueSpecification.element,
            parentObject,
            targetPropertyStringifiedValueBeforeFirstPreValidationModification:
                stringifiedElementBeforeFirstPreValidationModification
          });

      switch (this.processingApproach) {

        case RawObjectDataProcessor.ProcessingApproaches.assemblingOfNewObject: {

          if ("isInvalid" in elementProcessingResult) {
            areOneOnMoreElementsInvalid = true;
            continue;
          } else if ("isValidButValidationOnlyModeIsActive" in elementProcessingResult) {
            continue;
          }

          processedValueWorkpiece[index] = elementProcessingResult.processedValue;

          break;
        }

        case RawObjectDataProcessor.ProcessingApproaches.manipulationsWithSourceObject: {

          /* ※ Reserved for the future.
          * Basically no need to change value, but postValidationModification could be requested. */
        }
      }
    }

    this.currentlyIteratedObjectPropertyQualifiedInitialNameSegmentsForLogging.splice(-1, 1);


    for (
      const customValidator of
      RawObjectDataProcessor.getNormalizedCustomValidators(targetIndexedArrayTypeValueSpecification.customValidators)
    ) {

      if (!customValidator.validationFunction({
        /* eslint-disable-next-line @typescript-eslint/consistent-type-assertions --
         * Above validations are like type guard for the 'ParsedJSON_Array'.
         * Same as any type guard in TypeScript, it does not guarantee that all checks matching with target types, but it is
         * the best that possible with current limitations. */
        currentPropertyValue: targetValue__expectedToBeIndexedArray as ParsedJSON_Array,
        rawData__full: this.rawData,
        rawData__currentObjectDepth: parentObject ?? this.rawData,
        targetPropertyDotSeparatedPath: this.currentObjectPropertyDotSeparatedQualifiedName
      })) {

        areOneOnMoreElementsInvalid = true;

        this.registerValidationError({
          title: this.localization.validationErrors.customValidationFailed.title,
          description: this.localization.validationErrors.customValidationFailed.generateDescription({
            customValidationDescription: customValidator.descriptionForLogging
          }),
          targetPropertyDotSeparatedQualifiedInitialName: this.currentObjectPropertyDotSeparatedQualifiedName,
          targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
          targetPropertyValue: targetValue__expectedToBeIndexedArray,
          targetPropertyValueSpecification: targetIndexedArrayTypeValueSpecification,
          targetPropertyStringifiedValueBeforeFirstPreValidationModification
        });

      }

    }


    if (isTargetIndexedArrayTypeValueInvalid || areOneOnMoreElementsInvalid) {
      return { isInvalid: true };
    } else if (this.isValidationOnlyMode) {
      return { isValidButValidationOnlyModeIsActive: true };
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


    /* eslint-disable-next-line @typescript-eslint/consistent-type-assertions --
     * Above validations are like type guard for the 'ParsedJSON_Array'.
     * Same as any type guard in TypeScript, it does not guarantee that all checks matching with target types, but it is
     * the best that possible with current limitations. */
    return { processedValue: processedValueWorkpiece as ParsedJSON_Array };

  }


  private processAssociativeArrayTypeValue(
    {
      targetValue__expectedToBeAssociativeArrayTypeObject,
      targetAssociativeArrayTypeValueSpecification,
      parentObject,
      targetPropertyStringifiedValueBeforeFirstPreValidationModification
    }: {
      targetValue__expectedToBeAssociativeArrayTypeObject: unknown;
      targetAssociativeArrayTypeValueSpecification: RawObjectDataProcessor.UniformElementsAssociativeArrayValueSpecification;
      parentObject?: ArbitraryObject;
      targetPropertyStringifiedValueBeforeFirstPreValidationModification?: string;
    }
  ): RawObjectDataProcessor.ValueProcessingResult {

    /* [ Approach ] If "targetValue__expectedToBeObject" is a root object (rawData) this condition will always be falsy
     *    because "isArbitraryObject" check already has been executed. */
    if (!isArbitraryObject(targetValue__expectedToBeAssociativeArrayTypeObject)) {

      this.registerValidationError({
        title: this.localization.validationErrors.valueTypeDoesNotMatchWithExpected.title,
        description: this.localization.validationErrors.valueTypeDoesNotMatchWithExpected.
        generateDescription({
          actualType: typeof targetValue__expectedToBeAssociativeArrayTypeObject,
          expectedType: RawObjectDataProcessor.ValuesTypesIDs.number
        }),
        targetPropertyDotSeparatedQualifiedInitialName: this.currentObjectPropertyDotSeparatedQualifiedName,
        targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
        targetPropertyValue: targetValue__expectedToBeAssociativeArrayTypeObject,
        targetPropertyValueSpecification: targetAssociativeArrayTypeValueSpecification,
        targetPropertyStringifiedValueBeforeFirstPreValidationModification
      });

      return { isInvalid: true };

    }


    let isTargetAssociativeArrayTypeValueInvalid: boolean = false;

    if (
      isNotUndefined(targetAssociativeArrayTypeValueSpecification.minimalEntriesCount) &&
      Object.entries(targetValue__expectedToBeAssociativeArrayTypeObject).length <
            targetAssociativeArrayTypeValueSpecification.minimalEntriesCount
    ) {

      isTargetAssociativeArrayTypeValueInvalid = true;

      this.registerValidationError({
        title: this.localization.validationErrors.associativeArrayEntriesCountIsLessThanRequiredMinimum.title,
        description: this.localization.validationErrors.associativeArrayEntriesCountIsLessThanRequiredMinimum.
            generateDescription({
              minimalEntriesCount: targetAssociativeArrayTypeValueSpecification.minimalEntriesCount,
              actualEntriesCount: Object.entries(targetValue__expectedToBeAssociativeArrayTypeObject).length
            }),
        targetPropertyDotSeparatedQualifiedInitialName: this.currentObjectPropertyDotSeparatedQualifiedName,
        targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
        targetPropertyValue: targetValue__expectedToBeAssociativeArrayTypeObject,
        targetPropertyValueSpecification: targetAssociativeArrayTypeValueSpecification,
        targetPropertyStringifiedValueBeforeFirstPreValidationModification
      });

    }


    if (
      isNotUndefined(targetAssociativeArrayTypeValueSpecification.maximalEntriesCount) &&
      Object.entries(targetValue__expectedToBeAssociativeArrayTypeObject).length >
          targetAssociativeArrayTypeValueSpecification.maximalEntriesCount
    ) {

      isTargetAssociativeArrayTypeValueInvalid = true;

      this.registerValidationError({
        title: this.localization.validationErrors.associativeArrayPairsCountIsMoreThanAllowedMaximum.title,
        description: this.localization.validationErrors.associativeArrayPairsCountIsMoreThanAllowedMaximum.
            generateDescription({
              maximalEntriesCount: targetAssociativeArrayTypeValueSpecification.maximalEntriesCount,
              actualEntriesCount: Object.entries(targetValue__expectedToBeAssociativeArrayTypeObject).length
            }),
        targetPropertyDotSeparatedQualifiedInitialName: this.currentObjectPropertyDotSeparatedQualifiedName,
        targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
        targetPropertyValue: targetValue__expectedToBeAssociativeArrayTypeObject,
        targetPropertyValueSpecification: targetAssociativeArrayTypeValueSpecification,
        targetPropertyStringifiedValueBeforeFirstPreValidationModification
      });

    }


    if (
      isNotUndefined(targetAssociativeArrayTypeValueSpecification.exactEntriesCount) &&
      Object.entries(targetValue__expectedToBeAssociativeArrayTypeObject).length !==
          targetAssociativeArrayTypeValueSpecification.exactEntriesCount
    ) {

      isTargetAssociativeArrayTypeValueInvalid = true;

      this.registerValidationError({
        title: this.localization.validationErrors.associativeArrayPairsCountDoesNotMatchWithSpecifiedExactNumber.title,
        description: this.localization.validationErrors.associativeArrayPairsCountDoesNotMatchWithSpecifiedExactNumber.
            generateDescription({
              exactEntriesCount: targetAssociativeArrayTypeValueSpecification.exactEntriesCount,
              actualEntriesCount: Object.entries(targetValue__expectedToBeAssociativeArrayTypeObject).length
            }),
        targetPropertyDotSeparatedQualifiedInitialName: this.currentObjectPropertyDotSeparatedQualifiedName,
        targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
        targetPropertyValue: targetValue__expectedToBeAssociativeArrayTypeObject,
        targetPropertyValueSpecification: targetAssociativeArrayTypeValueSpecification,
        targetPropertyStringifiedValueBeforeFirstPreValidationModification
      });

    }


    if (isNonEmptyArray(targetAssociativeArrayTypeValueSpecification.requiredKeys)) {

      const missingRequiredKeys: Array<string> = [ ...targetAssociativeArrayTypeValueSpecification.requiredKeys ].
        filter((key: string): boolean => !Object.keys(targetValue__expectedToBeAssociativeArrayTypeObject).includes(key));

      if (missingRequiredKeys.length > 0) {

        isTargetAssociativeArrayTypeValueInvalid = true;

        // buildRequiredKeysOfAssociativeArrayAreMissingErrorMessage
        this.registerValidationError({
          title: this.localization.validationErrors.requiredKeysOfAssociativeArrayAreMissing.title,
          description: this.localization.validationErrors.requiredKeysOfAssociativeArrayAreMissing.
            generateDescription({ missingRequiredKeys }),
          targetPropertyDotSeparatedQualifiedInitialName: this.currentObjectPropertyDotSeparatedQualifiedName,
          targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
          targetPropertyValue: targetValue__expectedToBeAssociativeArrayTypeObject,
          targetPropertyValueSpecification: targetAssociativeArrayTypeValueSpecification,
          targetPropertyStringifiedValueBeforeFirstPreValidationModification
        });

      }

    }


    if (isNonEmptyArray(targetAssociativeArrayTypeValueSpecification.oneOfKeysIsRequired)) {

      let noOneOfRequiredKeyAlternativeFound: boolean = true;

      for (const key of Object.keys(targetValue__expectedToBeAssociativeArrayTypeObject)) {
        if (targetAssociativeArrayTypeValueSpecification.oneOfKeysIsRequired.includes(key)) {
          noOneOfRequiredKeyAlternativeFound = false;
          break;
        }
      }

      if (noOneOfRequiredKeyAlternativeFound) {

        isTargetAssociativeArrayTypeValueInvalid = true;

        this.registerValidationError({
          title: this.localization.validationErrors.requiredAlternativeKeysOfAssociativeArrayAreMissing.title,
          description: this.localization.validationErrors.requiredAlternativeKeysOfAssociativeArrayAreMissing.
              generateDescription({
                requiredKeysAlternatives: targetAssociativeArrayTypeValueSpecification.oneOfKeysIsRequired
              }),
          targetPropertyDotSeparatedQualifiedInitialName: this.currentObjectPropertyDotSeparatedQualifiedName,
          targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
          targetPropertyValue: targetValue__expectedToBeAssociativeArrayTypeObject,
          targetPropertyValueSpecification: targetAssociativeArrayTypeValueSpecification,
          targetPropertyStringifiedValueBeforeFirstPreValidationModification
        });

      }

    }


    const foundDisallowedKeys: Array<string> = [];

    if (isNonEmptyArray(targetAssociativeArrayTypeValueSpecification.allowedKeys)) {

      for (const key of Object.keys(targetValue__expectedToBeAssociativeArrayTypeObject)) {
        if (!targetAssociativeArrayTypeValueSpecification.allowedKeys.includes(key)) {
          foundDisallowedKeys.push(key);
        }
      }

      if (foundDisallowedKeys.length > 0) {

        isTargetAssociativeArrayTypeValueInvalid = true;

        this.registerValidationError({
          title: this.localization.validationErrors.disallowedKeysFoundInAssociativeArray.title,
          description: this.localization.validationErrors.disallowedKeysFoundInAssociativeArray.
              generateDescription({ foundDisallowedKeys }),
          targetPropertyDotSeparatedQualifiedInitialName: this.currentObjectPropertyDotSeparatedQualifiedName,
          targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
          targetPropertyValue: targetValue__expectedToBeAssociativeArrayTypeObject,
          targetPropertyValueSpecification: targetAssociativeArrayTypeValueSpecification,
          targetPropertyStringifiedValueBeforeFirstPreValidationModification
        });

      }

    }


    let processedValueWorkpiece: ArbitraryObject =
        this.processingApproach === RawObjectDataProcessor.ProcessingApproaches.manipulationsWithSourceObject ?
            targetValue__expectedToBeAssociativeArrayTypeObject : {};

    const currentObjectDepthLevel__beginWithZero: number =
        this.currentlyIteratedObjectPropertyQualifiedInitialNameSegmentsForLogging.length;

    let areOneOnMoreValuesInvalid: boolean = false;

    for (const [ key, rawValue ] of Object.entries(targetValue__expectedToBeAssociativeArrayTypeObject)) {

      this.currentlyIteratedObjectPropertyQualifiedInitialNameSegmentsForLogging[currentObjectDepthLevel__beginWithZero] = key;

      if (foundDisallowedKeys.includes(key)) {
        continue;
      }


      let value: unknown = rawValue;
      let stringifiedValueBeforeFirstPreValidationModification: string | undefined;

      const preValidationModifications: Array<RawObjectDataProcessor.PreValidationModification> = RawObjectDataProcessor.
          getNormalizedPreValidationModifications(targetAssociativeArrayTypeValueSpecification.value.preValidationModifications);

      if (preValidationModifications.length > 0) {
        stringifiedValueBeforeFirstPreValidationModification = stringifyAndFormatArbitraryValue(value);
      }

      for (const preValidationModification of preValidationModifications) {
        try {
          value = preValidationModification(value);
        } catch (error: unknown) {
          this.registerValidationError({
            title: this.localization.validationErrors.preValidationModificationFailed.title,
            description: this.localization.validationErrors.preValidationModificationFailed.generateDescription({
              stringifiedCaughtError: stringifyAndFormatArbitraryValue(error)
            }),
            targetPropertyDotSeparatedQualifiedInitialName: this.currentObjectPropertyDotSeparatedQualifiedName,
            targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
            targetPropertyValue: value,
            targetPropertyValueSpecification: targetAssociativeArrayTypeValueSpecification.value,
            targetPropertyStringifiedValueBeforeFirstPreValidationModification:
              stringifiedValueBeforeFirstPreValidationModification
          });
        }
      }


      const keyFinalName: string = targetAssociativeArrayTypeValueSpecification.keysRenamings?.[key] ?? key;

      if (isUndefined(value)) {

        if (targetAssociativeArrayTypeValueSpecification.allowUndefinedTypeValues !== true) {

          areOneOnMoreValuesInvalid = true;

          this.registerValidationError({
            title: this.localization.validationErrors.associativeArrayDisallowedUndefinedValue.title,
            description: this.localization.validationErrors.associativeArrayDisallowedUndefinedValue.description,
            targetPropertyDotSeparatedQualifiedInitialName: this.currentObjectPropertyDotSeparatedQualifiedName,
            targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
            targetPropertyValue: targetValue__expectedToBeAssociativeArrayTypeObject,
            targetPropertyValueSpecification: targetAssociativeArrayTypeValueSpecification,
            targetPropertyStringifiedValueBeforeFirstPreValidationModification:
                stringifiedValueBeforeFirstPreValidationModification
          });

        }

        continue;

      }

      if (isNull(value)) {

        if (targetAssociativeArrayTypeValueSpecification.allowNullValues !== true) {

          areOneOnMoreValuesInvalid = true;

          this.registerValidationError({
            title: this.localization.validationErrors.associativeArrayDisallowedNullValue.title,
            description: this.localization.validationErrors.associativeArrayDisallowedNullValue.description,
            targetPropertyDotSeparatedQualifiedInitialName: this.currentObjectPropertyDotSeparatedQualifiedName,
            targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
            targetPropertyValue: targetValue__expectedToBeAssociativeArrayTypeObject,
            targetPropertyValueSpecification: targetAssociativeArrayTypeValueSpecification,
            targetPropertyStringifiedValueBeforeFirstPreValidationModification:
                stringifiedValueBeforeFirstPreValidationModification
          });
        }

        continue;

      }


      const valueProcessingResult: RawObjectDataProcessor.ValueProcessingResult =
          this.processSingleNeitherUndefinedNorNullValue({
            targetValue: value,
            targetValueSpecification: targetAssociativeArrayTypeValueSpecification.value,
            parentObject,
            targetPropertyStringifiedValueBeforeFirstPreValidationModification:
                stringifiedValueBeforeFirstPreValidationModification
          });

      switch (this.processingApproach) {

        case RawObjectDataProcessor.ProcessingApproaches.assemblingOfNewObject: {

          if ("isInvalid" in valueProcessingResult) {
            areOneOnMoreValuesInvalid = true;
            continue;
          } else if ("isValidButValidationOnlyModeIsActive" in valueProcessingResult) {
            continue;
          }

          processedValueWorkpiece[keyFinalName] = valueProcessingResult.processedValue;

          break;

        }

        case RawObjectDataProcessor.ProcessingApproaches.manipulationsWithSourceObject: {

          /* ※ Reserved for the future.
          * Basically no need to change value, but postValidationModification could be requested. */
        }

      }

    }

    this.currentlyIteratedObjectPropertyQualifiedInitialNameSegmentsForLogging.splice(-1, 1);

    for (
      const customValidator of
      RawObjectDataProcessor.getNormalizedCustomValidators(targetAssociativeArrayTypeValueSpecification.customValidators)
    ) {

      if (!customValidator.validationFunction({
        currentPropertyValue: targetValue__expectedToBeAssociativeArrayTypeObject,
        rawData__full: this.rawData,
        rawData__currentObjectDepth: parentObject ?? this.rawData,
        targetPropertyDotSeparatedPath: this.currentObjectPropertyDotSeparatedQualifiedName
      })) {

        areOneOnMoreValuesInvalid = true;

        this.registerValidationError({
          title: this.localization.validationErrors.customValidationFailed.title,
          description: this.localization.validationErrors.customValidationFailed.generateDescription({
            customValidationDescription: customValidator.descriptionForLogging
          }),
          targetPropertyDotSeparatedQualifiedInitialName: this.currentObjectPropertyDotSeparatedQualifiedName,
          targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
          targetPropertyValue: targetValue__expectedToBeAssociativeArrayTypeObject,
          targetPropertyValueSpecification: targetAssociativeArrayTypeValueSpecification,
          targetPropertyStringifiedValueBeforeFirstPreValidationModification
        });

      }

    }


    if (isTargetAssociativeArrayTypeValueInvalid || areOneOnMoreValuesInvalid) {
      return { isInvalid: true };
    } else if (this.isValidationOnlyMode) {
      return { isValidButValidationOnlyModeIsActive: true };
    }


    for (
      const postValidationModification of RawObjectDataProcessor.
          getNormalizedPostValidationModifications(targetAssociativeArrayTypeValueSpecification.postValidationModifications)
    ) {
      processedValueWorkpiece = postValidationModification(processedValueWorkpiece);
    }


    /* eslint-disable-next-line @typescript-eslint/consistent-type-assertions --
     * Above validations are like type guard for the 'ParsedJSON_Object'.
     * Same as any type guard in TypeScript, it does not guarantee that all checks matching with target types, but it is
     * the best that possible with current limitations. */
    return { processedValue: processedValueWorkpiece as ParsedJSON_Object };

  }


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

    /* [ Theory ] Basically, the switch/case including Number/String/etc. constructor is working, but there are some exceptions.
    * https://stackoverflow.com/q/69848208/4818123
    * https://stackoverflow.com/q/69848689/4818123 */
    const targetValueTypeID: RawObjectDataProcessor.ValuesTypesIDs = RawObjectDataProcessor.
        getNormalizedValueTypeID(targetValueSpecification.type);

    switch (targetValueTypeID) {

      case RawObjectDataProcessor.ValuesTypesIDs.number: {
        return this.processNumericValue({
          targetValue__expectedToBeNumber: targetValue,
          /* eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- ※※
          * TypeScript can not see the relation between 'targetValueTypeID' and specific type of 'targetValueSpecification'.
          * It is not certain that nothing possible to do, but there is no short and clean solution. */
          targetValueSpecification: targetValueSpecification as RawObjectDataProcessor.NumericPropertySpecification,
          parentObject,
          targetPropertyStringifiedValueBeforeFirstPreValidationModification
        });
      }

      case RawObjectDataProcessor.ValuesTypesIDs.string: {
        return this.processStringValue({
          targetValue__expectedToBeString: targetValue,
          /* eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- See ※※ */
          targetValueSpecification: targetValueSpecification as RawObjectDataProcessor.StringValueSpecification,
          parentObject,
          targetPropertyStringifiedValueBeforeFirstPreValidationModification
        });
      }

      case RawObjectDataProcessor.ValuesTypesIDs.boolean: {
        return this.processBooleanValue({
          targetValue__expectedToBeBoolean: targetValue,
          /* eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- See ※※ */
          targetValueSpecification: targetValueSpecification as RawObjectDataProcessor.BooleanValueSpecification,
          parentObject,
          targetPropertyStringifiedValueBeforeFirstPreValidationModification
        });
      }

      case RawObjectDataProcessor.ValuesTypesIDs.fixedKeyAndValuePairsObject: {
        return this.processFixedKeyAndValuePairsNonNullObjectTypeValue({
          targetValueOfSubsequentLevel__expectedToBeObject: targetValue,
          /* eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- See ※※ */
          targetObjectTypeValueSpecification: targetValueSpecification as RawObjectDataProcessor.
              FixedKeyAndValuePairsObjectValueSpecification,
          parentObject,
          targetPropertyStringifiedValueBeforeFirstPreValidationModification
        });
      }

      case RawObjectDataProcessor.ValuesTypesIDs.indexedArrayOfUniformElements: {
        return this.processIndexedArrayTypeValue({
          targetValue__expectedToBeIndexedArray: targetValue,
          /* eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- See ※※ */
          targetIndexedArrayTypeValueSpecification: targetValueSpecification as RawObjectDataProcessor.
              NestedUniformElementsIndexedArrayPropertySpecification,
          parentObject,
          targetPropertyStringifiedValueBeforeFirstPreValidationModification
        });
      }

      case RawObjectDataProcessor.ValuesTypesIDs.associativeArrayOfUniformTypeValues: {
        return this.processAssociativeArrayTypeValue({
          targetValue__expectedToBeAssociativeArrayTypeObject: targetValue,
          /* eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- See ※※ */
          targetAssociativeArrayTypeValueSpecification: targetValueSpecification as RawObjectDataProcessor.
              NestedUniformElementsAssociativeArrayPropertySpecification,
          parentObject,
          targetPropertyStringifiedValueBeforeFirstPreValidationModification
        });
      }

      default: break;
    }


    /* [ Theory ] TypeScript will not understand the correct discriminated union if to check with condition vis switch/case. */
    if (targetValueSpecification.type === RawObjectDataProcessor.ValuesTypesIDs.oneOf) {
      return this.processMultipleTypesAllowedValue({
        targetValue,
        targetValueSpecification,
        parentObject,
        targetPropertyStringifiedValueBeforeFirstPreValidationModification
      });
    }


    Logger.logError({
      errorType: InvalidParameterValueError.NAME,
      title: InvalidParameterValueError.localization.defaultTitle,
      description: `The specified value type '${ targetValueSpecification.type.toString() }' is not supported.`,
      occurrenceLocation: "RawObjectDataProcessor.process(rawData, validDataSpecification, options)" +
          "-> processSingleNeitherUndefinedNorNullValue(parametersObject)"
    });


    return this.isValidationOnlyMode ? { isValidButValidationOnlyModeIsActive: true } : { isInvalid: true };
  }


  /* ━━━ Non-object Types Validation ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
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
          actualType: typeof targetValue__expectedToBeNumber,
          expectedType: RawObjectDataProcessor.ValuesTypesIDs.number
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

      case RawObjectDataProcessor.NumbersSets.positiveIntegerOrZero: {
        // TODO Rename function
        propertyValueMatchingWithExpectedNumberSet = isNaturalNumberOrZero(targetValue__expectedToBeNumber);
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
          currentPropertyValue: targetValue__expectedToBeNumber,
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
      return { isValidButValidationOnlyModeIsActive: true };
    }


    let processedValue: number = targetValue__expectedToBeNumber;

    for (
      const postValidationModification of RawObjectDataProcessor.
          getNormalizedPostValidationModifications(targetValueSpecification.postValidationModifications)
    ) {
      processedValue = postValidationModification(processedValue);
    }

    return { processedValue };
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
          actualType: typeof targetValue__expectedToBeString,
          expectedType: RawObjectDataProcessor.ValuesTypesIDs.number
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
          currentPropertyValue: targetValue__expectedToBeString,
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
      return { isValidButValidationOnlyModeIsActive: true };
    }


    let processedValue: string = targetValue__expectedToBeString;

    for (
      const postValidationModification of RawObjectDataProcessor.
          getNormalizedPostValidationModifications(targetValueSpecification.postValidationModifications)
    ) {
      processedValue = postValidationModification(processedValue);
    }

    return { processedValue };
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
          actualType: typeof targetValue__expectedToBeBoolean,
          expectedType: RawObjectDataProcessor.ValuesTypesIDs.number
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
        currentPropertyValue: targetValue__expectedToBeBoolean,
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
      return { isValidButValidationOnlyModeIsActive: true };
    }


    let processedValue: boolean = targetValue__expectedToBeBoolean;

    for (
      const postValidationModification of RawObjectDataProcessor.
          getNormalizedPostValidationModifications(targetValueSpecification.postValidationModifications)
    ) {
      processedValue = postValidationModification(processedValue);
    }

    return { processedValue };
  }


  private processMultipleTypesAllowedValue(
    {
      targetValue,
      targetValueSpecification,
      parentObject,
      targetPropertyStringifiedValueBeforeFirstPreValidationModification
    }: {
      targetValue: Exclude<unknown, undefined | null>;
      targetValueSpecification: RawObjectDataProcessor.MultipleTypesAllowedValueSpecification;
      parentObject?: ArbitraryObject;
      targetPropertyStringifiedValueBeforeFirstPreValidationModification?: string;
    }
  ): RawObjectDataProcessor.ValueProcessingResult {

    let specificationForValueOfCurrentType: RawObjectDataProcessor.ValueSpecification | undefined;

    switch (typeof targetValue) {

      case "number": {
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
                alternativeSpecification.type === RawObjectDataProcessor.ValuesTypesIDs.indexedArrayOfUniformElements ||
                alternativeSpecification.type === Array
          );
          break;
        }

        const possibleSpecificationsForObjectValueTypes: Array<RawObjectDataProcessor.ValueSpecification> =
          targetValueSpecification.alternatives.filter(
              (alternativeSpecification: RawObjectDataProcessor.ValueSpecification): boolean =>
                  alternativeSpecification.type === RawObjectDataProcessor.ValuesTypesIDs.fixedKeyAndValuePairsObject ||
                  alternativeSpecification.type === RawObjectDataProcessor.ValuesTypesIDs.associativeArrayOfUniformTypeValues ||
                  alternativeSpecification.type === Object ||
                  alternativeSpecification.type === Map
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

  private get currentObjectPropertyDotSeparatedQualifiedName(): string {
    return this.currentlyIteratedObjectPropertyQualifiedInitialNameSegmentsForLogging.join(".");
  }

  /* [ Approach ] The alias for the logic clarifying */
  private get isValidationOnlyMode(): boolean {
    return this.validationErrorsMessages.length > 0;
  }

  private substituteUndefinedPropertyValueAtSourceObject(
    {
      sourceObject,
      targetPropertyInitialName,
      targetPropertySpecification,
      targetPropertyStringifiedValueBeforeFirstPreValidationModification
    }: Readonly<{
      sourceObject: ArbitraryObject;
      targetPropertyInitialName: string;
      targetPropertySpecification: RawObjectDataProcessor.PropertySpecification;
      targetPropertyStringifiedValueBeforeFirstPreValidationModification?: string;
    }>
  ): void {

    /* [ Theory ] The descriptor will be non-undefined only if target property has explicit `undefined` value. */
    const targetPropertyDescriptor: PropertyDescriptor | undefined = Object.
        getOwnPropertyDescriptor(sourceObject, targetPropertyInitialName);

    if (isNotNull(this.currentlyIteratedPropertyNewNameForLogging)) {

      Object.defineProperty(
        sourceObject,
        this.currentlyIteratedPropertyNewNameForLogging,
        {
          value: targetPropertySpecification.undefinedValueSubstitution,
          configurable: targetPropertySpecification.mustMakeNonConfigurable === true ?
              false :
              targetPropertyDescriptor?.configurable ?? true,
          enumerable: targetPropertySpecification.mustMakeNonEnumerable === true ?
              false :
              targetPropertyDescriptor?.enumerable ?? true,
          writable: targetPropertySpecification.mustMakeReadonly === true ?
              false :
              targetPropertyDescriptor?.writable ?? true
        }
      );

      if (targetPropertySpecification.mustLeaveEvenRenamed !== true) {

        if (targetPropertyDescriptor?.configurable === false) {

          switch (this.errorHandlingStrategies.onUnableToDeletePropertyWithOutdatedValue) {

            case RawObjectDataProcessor.ErrorHandlingStrategies.throwingOfError: {
              Logger.throwErrorAndLog({
                errorType: RawObjectDataProcessor.ThrowableErrorsNames.unableToDeleteOutdatedProperty,
                title: this.localization.throwableErrors.unableToDeletePropertyWithOutdatedKey.title,
                description: this.localization.throwableErrors.unableToDeletePropertyWithOutdatedKey.generateDescription({
                  targetPropertyDotSeparatedQualifiedName: this.currentObjectPropertyDotSeparatedQualifiedName,
                  propertyNewKey: this.currentlyIteratedPropertyNewNameForLogging
                }),
                occurrenceLocation: "RawObjectDataProcessor." +
                    "substituteUndefinedPropertyValueAtSourceObject(compoundParameter)"
              });
            }

            /* eslint-disable-next-line no-fallthrough --
             * The ESLint does not see that `Logger.throwErrorAndLog()` returns `never` type in previous `case` block.
             * If to add the `break` to previous `case` block, it will be `TS7027: Unreachable code detected.` error. */
            case RawObjectDataProcessor.ErrorHandlingStrategies.markingOfDataAsInvalid: {

              this.registerValidationError({

                title: this.localization.validationErrors.unableToDeletePropertyWithOutdatedKey.title,
                description: this.localization.validationErrors.unableToDeletePropertyWithOutdatedKey.description,
                targetPropertyDotSeparatedQualifiedInitialName: this.currentObjectPropertyDotSeparatedQualifiedName,
                targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,

                /* eslint-disable-next-line no-void --
                 * `targetPropertyValue` has `unknown` type, so although target property has `undefined` value,
                 * from the viewpoint of typescript something must be explicitly specified. Because the explicit
                 * `undefined` could be shadowed the `void 0` is better option. */
                targetPropertyValue: void 0,
                targetPropertyValueSpecification: targetPropertySpecification,
                targetPropertyStringifiedValueBeforeFirstPreValidationModification

              });

              break;

            }

            case RawObjectDataProcessor.ErrorHandlingStrategies.warningWithoutMarkingOfDataAsInvalid: {
              Logger.logWarning({
                title: this.localization.warnings.unableToDeletePropertyWithOutdatedKey.title,
                description: this.localization.warnings.unableToDeletePropertyWithOutdatedKey.generateDescription({
                  targetPropertyDotSeparatedQualifiedName: this.currentObjectPropertyDotSeparatedQualifiedName,
                  propertyNewKey: this.currentlyIteratedPropertyNewNameForLogging
                }),
                occurrenceLocation: "RawObjectDataProcessor." +
                    "substituteUndefinedPropertyValueAtSourceObject(compoundParameter)"
              });
            }

          }

          return;

        }


        /* eslint-disable-next-line @typescript-eslint/no-dynamic-delete --
         * If library user managed to rename the property, and it is deletable, it could be deleted.
         * If library user do not comprehend that deleted property could cause the side effect to getters and/or setters
         *   and/or methods, there is nothing that the library can do. */
        delete sourceObject[targetPropertyInitialName];

      }

      return;

    }


    if (targetPropertyDescriptor?.writable === false) {

      switch (this.errorHandlingStrategies.onUnableToSubstituteUndefinePropertyValue) {

        case RawObjectDataProcessor.ErrorHandlingStrategies.throwingOfError: {
          Logger.throwErrorAndLog({
            errorType: RawObjectDataProcessor.ThrowableErrorsNames.unableToSubstituteUndefinedValueWithDefault,
            title: this.localization.throwableErrors.unableToSubstituteUndefinedPropertyValue.title,
            description: this.localization.throwableErrors.unableToSubstituteUndefinedPropertyValue.generateDescription({
              targetPropertyDotSeparatedQualifiedName: this.currentObjectPropertyDotSeparatedQualifiedName
            }),
            occurrenceLocation: "RawObjectDataProcessor." +
                "substituteUndefinedPropertyValueAtSourceObject(compoundParameter)"
          });
        }

        /* eslint-disable-next-line no-fallthrough --
         * The ESLint does not see that `Logger.throwErrorAndLog()` returns `never` type in previous `case` block.
         * If to add the `break` to previous `case` block, it will be `TS7027: Unreachable code detected.` error. */
        case RawObjectDataProcessor.ErrorHandlingStrategies.markingOfDataAsInvalid: {

          this.registerValidationError({

            title: this.localization.validationErrors.unableToSubstituteUndefinedPropertyValue.title,
            description: this.localization.validationErrors.unableToSubstituteUndefinedPropertyValue.description,
            targetPropertyDotSeparatedQualifiedInitialName: this.currentObjectPropertyDotSeparatedQualifiedName,
            targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,

            /* eslint-disable-next-line no-void --
             * `targetPropertyValue` has `unknown` type, so although target property has `undefined` value,
             * from the viewpoint of typescript something must be explicitly specified. Because the explicit
             * `undefined` could be shadowed the `void 0` is better option. */
            targetPropertyValue: void 0,
            targetPropertyValueSpecification: targetPropertySpecification,
            targetPropertyStringifiedValueBeforeFirstPreValidationModification

          });

          break;

        }

        case RawObjectDataProcessor.ErrorHandlingStrategies.warningWithoutMarkingOfDataAsInvalid:

          Logger.logWarning({
            title: this.localization.warnings.unableToSubstituteUndefinedPropertyValue.title,
            description: this.localization.warnings.unableToSubstituteUndefinedPropertyValue.generateDescription({
              targetPropertyDotSeparatedQualifiedName: this.currentObjectPropertyDotSeparatedQualifiedName
            }),
            occurrenceLocation:
                "RawObjectDataProcessor.substituteUndefinedPropertyValueAtSourceObject(compoundParameter)"
          });

      }

    }

    sourceObject[targetPropertyInitialName] = targetPropertySpecification.defaultValue;

  }

  private substituteNullPropertyValueAtSourceObject(
    {
      sourceObject,
      targetPropertyInitialName,
      targetPropertySpecification,
      targetPropertyStringifiedValueBeforeFirstPreValidationModification
    }: Readonly<{
      sourceObject: ArbitraryObject;
      targetPropertyInitialName: string;
      targetPropertySpecification: RawObjectDataProcessor.PropertySpecification;
      targetPropertyStringifiedValueBeforeFirstPreValidationModification?: string;
    }>
  ): void {

    /* [ Theory ] Unlike `substituteUndefinedPropertyValueAtSourceObject` method, here the property descriptor must be. */
    const targetPropertyDescriptor: PropertyDescriptor | undefined = Object.
        getOwnPropertyDescriptor(sourceObject, targetPropertyInitialName);

    if (isUndefined(targetPropertyDescriptor)) {
      Logger.throwErrorAndLog({
        errorInstance: new UnexpectedEventError(
          `No property descriptor has been retrieved for "${ this.currentObjectPropertyDotSeparatedQualifiedName }" ` +
          "property. If this property has `null` value, it must have the descriptor."
        ),
        title: UnexpectedEventError.localization.defaultTitle,
        occurrenceLocation: "RawObjectDataProcessor." +
            "substituteNullPropertyValueAtSourceObject(compoundParameter)"
      });
    }


    if (isNotNull(this.currentlyIteratedPropertyNewNameForLogging)) {

      Object.defineProperty(
        sourceObject,
        this.currentlyIteratedPropertyNewNameForLogging,
        {
          value: targetPropertySpecification.nullSubstitution,
          configurable: targetPropertySpecification.mustMakeNonConfigurable !== true,
          enumerable: targetPropertySpecification.mustMakeNonEnumerable !== true,
          writable: targetPropertySpecification.mustMakeReadonly !== true
        }
      );

      if (targetPropertySpecification.mustLeaveEvenRenamed !== true) {

        if (targetPropertyDescriptor.configurable === false) {

          switch (this.errorHandlingStrategies.onUnableToDeletePropertyWithOutdatedValue) {

            case RawObjectDataProcessor.ErrorHandlingStrategies.throwingOfError: {
              Logger.throwErrorAndLog({
                errorType: InvalidExternalDataError.localization.defaultTitle,
                title: this.localization.throwableErrors.unableToDeletePropertyWithOutdatedKey.title,
                description: this.localization.throwableErrors.unableToDeletePropertyWithOutdatedKey.generateDescription({
                  targetPropertyDotSeparatedQualifiedName: this.currentObjectPropertyDotSeparatedQualifiedName,
                  propertyNewKey: this.currentlyIteratedPropertyNewNameForLogging
                }),
                occurrenceLocation: "RawObjectDataProcessor.substituteNullPropertyValueAtSourceObject(compoundParameter)"
              });
            }

            /* eslint-disable-next-line no-fallthrough --
             * The ESLint does not see that `Logger.throwErrorAndLog()` returns `never` type in previous `case` block.
             * If to add the `break` to previous `case` block, it will be `TS7027: Unreachable code detected.` error. */
            case RawObjectDataProcessor.ErrorHandlingStrategies.markingOfDataAsInvalid: {

              this.registerValidationError({
                title: this.localization.validationErrors.unableToDeletePropertyWithOutdatedKey.title,
                description: this.localization.validationErrors.unableToDeletePropertyWithOutdatedKey.description,
                targetPropertyDotSeparatedQualifiedInitialName: this.currentObjectPropertyDotSeparatedQualifiedName,
                targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
                targetPropertyValue: null,
                targetPropertyValueSpecification: targetPropertySpecification,
                targetPropertyStringifiedValueBeforeFirstPreValidationModification
              });

              break;

            }

            case RawObjectDataProcessor.ErrorHandlingStrategies.warningWithoutMarkingOfDataAsInvalid: {
              Logger.logWarning({
                title: this.localization.warnings.unableToDeletePropertyWithOutdatedKey.title,
                description: this.localization.warnings.unableToDeletePropertyWithOutdatedKey.generateDescription({
                  targetPropertyDotSeparatedQualifiedName: this.currentObjectPropertyDotSeparatedQualifiedName,
                  propertyNewKey: this.currentlyIteratedPropertyNewNameForLogging
                }),
                occurrenceLocation: "RawObjectDataProcessor.substituteNullPropertyValueAtSourceObject(compoundParameter)"
              });
            }

          }

          return;

        }


        /* eslint-disable-next-line @typescript-eslint/no-dynamic-delete --
         * If library user managed to rename the property, and it is deletable, it could be deleted.
         * If library user do not comprehend that deleted property could cause the side effect to getters and/or setters
         *   and/or methods, there is nothing that the library can do. */
        delete sourceObject[targetPropertyInitialName];

      }

      return;

    }


    if (targetPropertyDescriptor.writable === false) {

      switch (this.errorHandlingStrategies.onUnableToSubstituteNullPropertyValue) {

        case RawObjectDataProcessor.ErrorHandlingStrategies.throwingOfError: {
          Logger.throwErrorAndLog({
            errorType: RawObjectDataProcessor.ThrowableErrorsNames.unableToSubstituteNullValueWithDefault,
            title: this.localization.throwableErrors.unableToSubstituteNullPropertyValue.title,
            description: this.localization.throwableErrors.unableToSubstituteNullPropertyValue.generateDescription({
              targetPropertyDotSeparatedQualifiedName: this.currentObjectPropertyDotSeparatedQualifiedName
            }),
            occurrenceLocation: "RawObjectDataProcessor.substituteUndefinedPropertyValueAtSourceObject(compoundParameter)"
          });
        }

        /* eslint-disable-next-line no-fallthrough --
         * The ESLint does not see that `Logger.throwErrorAndLog()` returns `never` type in previous `case` block.
         * If to add the `break` to previous `case` block, it will be `TS7027: Unreachable code detected.` error. */
        case RawObjectDataProcessor.ErrorHandlingStrategies.markingOfDataAsInvalid: {

          this.registerValidationError({
            title: this.localization.validationErrors.unableToSubstituteUndefinedPropertyValue.title,
            description: this.localization.validationErrors.unableToSubstituteUndefinedPropertyValue.description,
            targetPropertyDotSeparatedQualifiedInitialName: this.currentObjectPropertyDotSeparatedQualifiedName,
            targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
            targetPropertyValue: null,
            targetPropertyValueSpecification: targetPropertySpecification,
            targetPropertyStringifiedValueBeforeFirstPreValidationModification
          });

          break;

        }

        case RawObjectDataProcessor.ErrorHandlingStrategies.warningWithoutMarkingOfDataAsInvalid:

          Logger.logWarning({
            title: this.localization.warnings.unableToSubstituteUndefinedPropertyValue.title,
            description: this.localization.warnings.unableToSubstituteUndefinedPropertyValue.generateDescription({
              targetPropertyDotSeparatedQualifiedName: this.currentObjectPropertyDotSeparatedQualifiedName
            }),
            occurrenceLocation:
                "RawObjectDataProcessor.substituteUndefinedPropertyValueAtSourceObject(compoundParameter)"
          });

      }

    }

    sourceObject[targetPropertyInitialName] = targetPropertySpecification.nullSubstitution;

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
  ): Array<(validValue: ValidValue) => ValidValue> {
    return Array.isArray(postValidationModificationOrMultipleOfThem) ?
        postValidationModificationOrMultipleOfThem : [ postValidationModificationOrMultipleOfThem ];
  }

  private static getNormalizedCustomValidators<ValidValue>(
    customValidatorOrMultipleOfThem:
        RawObjectDataProcessor.CustomValidator<ValidValue> |
            ReadonlyArray<RawObjectDataProcessor.CustomValidator<ValidValue>> = []
  ): Array<RawObjectDataProcessor.CustomValidator<ValidValue>> {
    return Array.isArray(customValidatorOrMultipleOfThem) ?
        customValidatorOrMultipleOfThem : [ customValidatorOrMultipleOfThem ];
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
    mutuallyExclusiveUndefinedAndNullValueTransformations = "MutuallyExclusiveUndefinedAndNullValueTransformationsError",
    preValidationModificationFailed = "PreValidationModificationFailedError",
    unableToDeleteOutdatedProperty = "UnableToDeleteOutdatedPropertyError",
    unableToSubstituteUndefinedValueWithDefault = "UnableToSubstituteUndefinedValueWithDefaultError",
    propertyUndefinedabilityNotSpecified = "PropertyUndefinedabilityNotSpecifiedError",
    propertyNullabilityNotSpecified = "PropertyNullabilityNotSpecifiedError",
    unableToSubstituteNullValueWithDefault = "UnableToSubstituteNullValueWithDefaultError"
  }

  export type ErrorsHandlingStrategies = Readonly<{
    onPreValidationModificationFailed: ErrorHandlingStrategies;
    onUnableToDeletePropertyWithOutdatedValue: ErrorHandlingStrategies;
    onUnableToSubstituteUndefinePropertyValue: ErrorHandlingStrategies;
    onUnableToSubstituteNullPropertyValue: ErrorHandlingStrategies;
  }>;

  export enum ErrorHandlingStrategies {
    throwingOfError = "THROWING_OF_ERROR",
    markingOfDataAsInvalid = "MARKING_OF_DATA_AS_INVALID",
    warningWithoutMarkingOfDataAsInvalid = "WARNING_WITHOUT_MARKING_OF_DATA_AS_INVALID"
  }

  export enum ObjectSubtypes {
    fixedKeyAndValuePairsObject = "FIXED_KEY_AND_VALUE_PAIRS_OBJECT",
    indexedArray = "INDEXED_ARRAY",
    associativeArray = "ASSOCIATIVE_ARRAY"
  }

  export type ObjectDataSpecification =
      FixedKeyAndValuesTypeObjectDataSpecification |
      IndexedArrayOfUniformElementsTypeDataSpecification |
      AssociativeArrayOfUniformValuesTypeDataSpecification;

  export namespace ObjectDataSpecification {

    export type SubtypeIndependentProperties = Readonly<{
      nameForLogging: string;
    }>;

  }

  export type FixedKeyAndValuesTypeObjectDataSpecification =
      ObjectDataSpecification.SubtypeIndependentProperties &
      FixedKeyAndValuePairsObjectTypeValueSpecification &
      Readonly<{
        subtype: ObjectSubtypes.fixedKeyAndValuePairsObject;
        properties: PropertiesSpecification;
      }>;

  export type IndexedArrayOfUniformElementsTypeDataSpecification =
      ObjectDataSpecification.SubtypeIndependentProperties &
      IndexedArrayTypeValueSpecification &
      Readonly<{
        subtype: ObjectSubtypes.indexedArray;
        element: ValueSpecification;
      }>;

  export type AssociativeArrayOfUniformValuesTypeDataSpecification =
      ObjectDataSpecification.SubtypeIndependentProperties &
      AssociativeArrayTypeValueSpecification &
      Readonly<{
        subtype: ObjectSubtypes.associativeArray;
        value: ValueSpecification;
      }>;

  export type PropertiesSpecification = Readonly<{ [propertyName: string]: PropertySpecification; }>;

  export type PropertySpecification =
      NumericPropertySpecification |
      StringPropertySpecification |
      BooleanPropertySpecification |
      NestedObjectPropertySpecification |
      NestedUniformElementsIndexedArrayPropertySpecification |
      NestedUniformElementsAssociativeArrayPropertySpecification |
      MultipleTypesAllowedPropertySpecification;

  export type ProcessingResult<ProcessedData> =
      Readonly<
        {
          rawDataIsInvalid: false;
          processedData: ProcessedData;
        } |
        {
          rawDataIsInvalid: true;
          validationErrorsMessages: ReadonlyArray<string>;
        }
      >;


  /* ─── Processed Data Workpiece ─────────────────────────────────────────────────────────────────────────────────── */
  // TODO 未だ`isValidButValidationOnlyModeIsActive`を完全に理解していない。必要に応じて名前変更。
  export type ValueProcessingResult =
      { isInvalid: true; } |
      { isValidButValidationOnlyModeIsActive: true; } |
      { processedValue: ParsedJSON_NestedProperty; };

  type ObjectKeySpecification = Readonly<{
    newName?: string;
  }>;

  type ObjectPropertySpecification =
      ObjectKeySpecification &
      Readonly<{
        nullable?: boolean;
        mustMakeNonConfigurable?: boolean;
        mustMakeNonEnumerable?: boolean;
        mustMakeReadonly?: boolean;
        mustLeaveEvenRenamed?: boolean;
      }>;


  /* ─── Value Specification ──────────────────────────────────────────────────────────────────────────────────────── */
  export type ValueSpecification =
      NumericValueSpecification |
      StringValueSpecification |
      BooleanValueSpecification |
      FixedKeyAndValuePairsObjectValueSpecification |
      UniformElementsIndexedArrayValueSpecification |
      UniformElementsAssociativeArrayValueSpecification |
      MultipleTypesAllowedValueSpecification;

  export namespace ValueSpecification {
    export type CommonParameters = Readonly<{
      preValidationModifications?: PreValidationModification | ReadonlyArray<PreValidationModification>;
    }>;
  }

  export type PreValidationModification = (rawValue: unknown) => unknown;

  type FixedKeyAndValuePairsObjectTypeValueSpecification = Readonly<{
    propertiesWillBeDeletedAfterPostValidationModifications?: ReadonlyArray<string>;
  }>;

  type IndexedArrayTypeValueSpecification = Readonly<
    {
      minimalElementsCount?: number;
      maximalElementsCount?: number;
      exactElementsCount?: never;
    } |
    {
      exactElementsCount?: number;
      minimalElementsCount?: never;
      maximalElementsCount?: never;
    }
  >;

  type AssociativeArrayTypeValueSpecification = Readonly<
    {
      requiredKeys?: ReadonlyArray<string>;
      allowedKeys?: ReadonlyArray<string>;
      oneOfKeysIsRequired?: ReadonlyArray<string>;
    } &
    (
      {
        minimalEntriesCount?: number;
        maximalEntriesCount?: number;
        exactEntriesCount?: never;
      } |
      {
        exactEntriesCount?: number;
        minimalEntriesCount?: undefined;
        maximalEntriesCount?: never;
      }
    )
  >;

  export enum ValuesTypesIDs {
    number = "NUMBER",
    string = "STRING",
    boolean = "BOOLEAN",
    fixedKeyAndValuePairsObject = "FIXED_KEY_AND_VALUE_PAIRS_OBJECT",
    indexedArrayOfUniformElements = "INDEXED_ARRAY_OF_UNIFORM_ELEMENTS",
    associativeArrayOfUniformTypeValues = "ASSOCIATIVE_ARRAY_OF_UNIFORM_TYPE_VALUES",
    oneOf = "ONE_OF"
  }

  export type CustomValidator<TargetValue> = Readonly<{
    validationFunction: (parametersObject: CustomValidator.CompoundParameter<TargetValue>) => boolean;
    descriptionForLogging: string;
  }>;

  export namespace CustomValidator {
    export type CompoundParameter<TargetValue> = Readonly<{
      currentPropertyValue: TargetValue;
      rawData__currentObjectDepth: ArbitraryObject;
      rawData__full: ArbitraryObject;
      targetPropertyDotSeparatedPath: string;
    }>;
  }

  type PropertyCondition = Readonly<{
    predicate: (
      rawData__currentObjectDepth: ArbitraryObject,
      rawData__full: ArbitraryObject,
      targetPropertyDotSeparatedPath: string
    ) => boolean;
    descriptionForLogging: string;
  }>;

  export type UndefinedabilitySpecification<MainType extends Exclude<ParsedJSON_NestedProperty, null | undefined>> = Readonly<
    {
      isUndefinedForbidden: true;
      undefinedForbiddenIf?: never;
      undefinedValueSubstitution?: never;
      mustTransformUndefinedToNull?: never;
    } |
    {
      isUndefinedForbidden: false;
      mustBeUndefinedIf?: PropertyCondition;
      undefinedForbiddenIf?: never;
      undefinedValueSubstitution?: never;
      mustTransformUndefinedToNull?: never;
    } |
    {
      isUndefinedForbidden?: never;
      undefinedForbiddenIf: PropertyCondition;
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
      mustBeNullIf?: PropertyCondition;
      nullForbiddenIf?: never;
      nullValueSubstitution?: never;
      mustTransformNullToUndefined?: never;
    } |
    {
      isNullForbidden?: never;
      nullForbiddenIf: PropertyCondition;
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


  /* ─── Numeric Value / Property ─────────────────────────────────────────────────────────────────────────────────── */
  export enum NumbersSets {
    naturalNumber = "NATURAL_NUMBER",
    positiveIntegerOrZero = "POSITIVE_INTEGER_OR_ZERO",
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
      ValueSpecification.CommonParameters &
      Readonly<{
        type: ValuesTypesIDs.number | NumberConstructor;
        numbersSet: NumbersSets;
        allowedAlternatives?: ReadonlyArray<number> | ReadonlyArray<Readonly<{ key: string; value: number; }>>;
        minimalValue?: number;
        maximalValue?: number;
        customValidators?: CustomValidator<number> | ReadonlyArray<CustomValidator<number>>;
        postValidationModifications?: ((validValue: number) => number) | ReadonlyArray<(validValue: number) => number>;
      }>;

  export type NumericPropertySpecification =
      ObjectPropertySpecification &
      NumericValueSpecification &
      UndefinedabilitySpecification<number> &
      NullabilitySpecification<number>;


  /* ─── String Value / Property ──────────────────────────────────────────────────────────────────────────────────── */
  export type StringValueSpecification =
      ValueSpecification.CommonParameters &
      Readonly<{
        type: ValuesTypesIDs.string | StringConstructor;
        allowedAlternatives?: ReadonlyArray<string> | ReadonlyArray<Readonly<{ key: string; value: string; }>>;
        minimalCharactersCount?: number;
        maximalCharactersCount?: number;
        fixedCharactersCount?: number;
        validValueRegularExpression?: RegExp;
        customValidators?: CustomValidator<string> | ReadonlyArray<CustomValidator<string>>;
        postValidationModifications?: ((validValue: string) => string) | ReadonlyArray<(validValue: string) => string>;
      }>;

  export type StringPropertySpecification =
      ObjectPropertySpecification &
      StringValueSpecification &
      UndefinedabilitySpecification<string> &
      NullabilitySpecification<string>;


  /* ─── Boolean Value / Property ─────────────────────────────────────────────────────────────────────────────────── */
  export type BooleanValueSpecification =
      ValueSpecification.CommonParameters &
      Readonly<{
        type: ValuesTypesIDs.boolean | BooleanConstructor;
        trueOnly?: boolean;
        falseOnly?: boolean;
        customValidators?: CustomValidator<boolean> | ReadonlyArray<CustomValidator<boolean>>;
        postValidationModifications?: ((validValue: boolean) => boolean) | ReadonlyArray<(validValue: boolean) => boolean>;
      }>;

  export type BooleanPropertySpecification =
      ObjectPropertySpecification &
      BooleanValueSpecification &
      UndefinedabilitySpecification<boolean> &
      NullabilitySpecification<boolean>;


  /* ─── Nested Object Value / Property ───────────────────────────────────────────────────────────────────────────── */
  export type FixedKeyAndValuePairsObjectValueSpecification =
      ValueSpecification.CommonParameters &
      FixedKeyAndValuePairsObjectTypeValueSpecification &
      Readonly<{
        type: ValuesTypesIDs.fixedKeyAndValuePairsObject | ObjectConstructor;
        properties: PropertiesSpecification;
        customValidators?: CustomValidator<ArbitraryObject> | ReadonlyArray<CustomValidator<ArbitraryObject>>;
        postValidationModifications?:
            ((validValue: ArbitraryObject) => ArbitraryObject) | ReadonlyArray<(validValue: ArbitraryObject) => ArbitraryObject>;
      }>;

  export type NestedObjectPropertySpecification =
      ObjectPropertySpecification &
      FixedKeyAndValuePairsObjectValueSpecification &
      UndefinedabilitySpecification<ParsedJSON_Object> &
      NullabilitySpecification<ParsedJSON_Object>;


  /* ─── Uniform Element Indexed Array Value / Property ───────────────────────────────────────────────────────────── */
  export type UniformElementsIndexedArrayValueSpecification =
      ValueSpecification.CommonParameters &
      IndexedArrayTypeValueSpecification &
      Readonly<{
        type: ValuesTypesIDs.indexedArrayOfUniformElements | ArrayConstructor;
        element: ValueSpecification;
        allowUndefinedTypeElements?: boolean;
        allowNullElements?: boolean;
        customValidators?: CustomValidator<ReadonlyArray<ParsedJSON_NestedProperty>> |
            ReadonlyArray<CustomValidator<ReadonlyArray<ParsedJSON_NestedProperty>>>;
        postValidationModifications?:
            ((validValue: ReadonlyArray<ParsedJSON_NestedProperty>) => Array<ParsedJSON_NestedProperty>) |
            ReadonlyArray<(validValue: ReadonlyArray<ParsedJSON_NestedProperty>) => Array<ParsedJSON_NestedProperty>>;
      }>;

  export type NestedUniformElementsIndexedArrayPropertySpecification =
      ObjectPropertySpecification &
      UniformElementsIndexedArrayValueSpecification &
      UndefinedabilitySpecification<ParsedJSON_Array> &
      NullabilitySpecification<ParsedJSON_Array>;


  /* ─── Uniform Element Indexes Associative Value / Property ─────────────────────────────────────────────────────── */
  export type UniformElementsAssociativeArrayValueSpecification =
      ValueSpecification.CommonParameters &
      AssociativeArrayTypeValueSpecification &
      Readonly<{
        type: ValuesTypesIDs.associativeArrayOfUniformTypeValues | MapConstructor;
        value: ValueSpecification;
        requiredKeys?: ReadonlyArray<string>;
        allowedKeys?: ReadonlyArray<string>;
        keysRenamings?: { [rawKey: string]: string; };
        allowUndefinedTypeValues?: boolean;
        allowNullValues?: boolean;
        customValidators?: CustomValidator<ArbitraryObject> | ReadonlyArray<CustomValidator<ArbitraryObject>>;
        postValidationModifications?:
            ((validValue: ArbitraryObject) => ArbitraryObject) | ReadonlyArray<(validValue: ArbitraryObject) => ArbitraryObject>;
      }>;

  export type NestedUniformElementsAssociativeArrayPropertySpecification =
      ObjectPropertySpecification &
      UniformElementsAssociativeArrayValueSpecification &
      UndefinedabilitySpecification<ParsedJSON_Object> &
      NullabilitySpecification<ParsedJSON_Object>;


  /* ─── Alternating Value / Property ─────────────────────────────────────────────────────────────────────────────── */
  export type MultipleTypesAllowedValueSpecification =
      ValueSpecification.CommonParameters &
      Readonly<{
        type: ValuesTypesIDs.oneOf;
        alternatives: Array<ValueSpecification>;
        nullSubstitution?: ParsedJSON_NestedProperty;
        customValidators?: CustomValidator<ParsedJSON_NestedProperty> |
            ReadonlyArray<CustomValidator<ParsedJSON_NestedProperty>>;
        postValidationModifications?:
            (validValue: ParsedJSON_NestedProperty) => ParsedJSON_NestedProperty |
                ReadonlyArray<(validValue: ParsedJSON_NestedProperty) => ParsedJSON_NestedProperty>;
      }>;


  type MultipleTypesAllowedPropertySpecification =
      ObjectPropertySpecification &
      MultipleTypesAllowedValueSpecification &
      UndefinedabilitySpecification<Exclude<ParsedJSON_Object, undefined | null>> &
      NullabilitySpecification<Exclude<ParsedJSON_Object, undefined | null>>;


  /* ━━━ Localization ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  export type Localization = Readonly<{

    generateValidationErrorMessage: (templateVariables: Localization.DataForMessagesBuilding) => string;

    generateLanguageDependentErrorNumberHeadingPart: (templateVariables: Readonly<{ messageNumber: number; }>) => string;

    validationErrors: Localization.ValidationErrors;

    throwableErrors: Localization.ThrowableErrors;

    warnings: Localization.Warnings;

    getLocalizedValueType: (valueType: Localization.ValuesTypes) => string;

    getLocalizedNumbersSet: (numberSet: NumbersSets) => string;

  }>;


  export namespace Localization {

    /* ─── Validation Errors ──────────────────────────────────────────────────────────────────────────────────────── */
    export type ValidationErrors = Readonly<{

      rawDataIsNull: string;

      rawDataIsNotObject: Readonly<{
        generateMessage: (
          templateVariables: ValidationErrors.RawDataIsNotObject.TemplateVariables
        ) => string;
      }>;

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

      forbiddenUndefinedValueOfProperty: Readonly<{
        title: string;
        description: string;
      }>;

      conditionallyForbiddenUndefinedValue: Readonly<{
        title: string;
        generateDescription: (
          templateVariables: ValidationErrors.ConditionallyForbiddenUndefinedValue.TemplateVariables
        ) => string;
      }>;

      unableToDeletePropertyWithOutdatedKey: Readonly<{
        title: string;
        description: string;
      }>;

      conditionallyForbiddenNullValue: Readonly<{
        title: string;
        generateDescription: (
          templateVariables: ValidationErrors.ConditionallyForbiddenNullValue.TemplateVariables
        ) => string;
      }>;

      unableToSubstituteUndefinedPropertyValue: Readonly<{
        title: string;
        description: string;
      }>;

      conditionallyForbiddenNonUndefinedValue: Readonly<{
        title: string;
        generateDescription: (
          templateVariables: ValidationErrors.ConditionallyForbiddenNonUndefinedValue.TemplateVariables
        ) => string;
      }>;

      unableToSubstituteNullPropertyValue: Readonly<{
        title: string;
        description: string;
      }>;

      conditionallyForbiddenNonNullValue: Readonly<{
        title: string;
        generateDescription: (
          templateVariables: ValidationErrors.ConditionallyForbiddenNonNullValue.TemplateVariables
        ) => string;
      }>;

      nonNullableValueIsNullError: Readonly<{
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

      indexedArrayDisallowedUndefinedElement: Readonly<{
        title: string;
        description: string;
      }>;

      indexedArrayDisallowedNullElement: Readonly<{
        title: string;
        description: string;
      }>;

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

      requiredKeysOfAssociativeArrayAreMissing: Readonly<{
        title: string;
        generateDescription: (
          templateVariables: ValidationErrors.RequiredKeysOfAssociativeArrayAreMissing.TemplateVariables
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

      associativeArrayDisallowedUndefinedValue: Readonly<{
        title: string;
        description: string;
      }>;

      associativeArrayDisallowedNullValue: Readonly<{
        title: string;
        description: string;
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

    }>;

    export namespace ThrowableErrors {

      export namespace MutuallyExclusiveUndefinedAndNullValueTransformations {
        export type TemplateVariables = Readonly<{
          targetPropertyDotSeparatedQualifiedName: string;
        }>;
      }

      export namespace PreValidationModificationFailed {
        export type TemplateVariables = Readonly<{
          targetPropertyDotSeparatedQualifiedName: string;
        }>;
      }

      export namespace UnableToDeletePropertyWithOutdatedKey {
        export type TemplateVariables = Readonly<{
          targetPropertyDotSeparatedQualifiedName: string;
          propertyNewKey: string;
        }>;
      }

      export namespace UnableToSubstituteUndefinedPropertyValue {
        export type TemplateVariables = Readonly<{
          targetPropertyDotSeparatedQualifiedName: string;
        }>;
      }

      export namespace PropertyUndefinedabilityNotSpecified {
        export type TemplateVariables = Readonly<{
          targetPropertyDotSeparatedQualifiedName: string;
        }>;
      }

      export namespace UnableToSubstituteNullPropertyValue {
        export type TemplateVariables = Readonly<{
          targetPropertyDotSeparatedQualifiedName: string;
        }>;
      }

      export namespace PropertyNullabilityNotSpecified {
        export type TemplateVariables = Readonly<{
          targetPropertyDotSeparatedQualifiedName: string;
        }>;
      }

      export namespace IncompatibleValuesTypesAlternatives {
        export type TemplateVariables = Readonly<{
          targetValueStringifiedSpecification: string;
        }>;
      }

    }

    export namespace ValidationErrors {

      export namespace RawDataIsNotObject {
        export type TemplateVariables = Readonly<{ actualType: string; }>;
      }

      export namespace ValueTypeDoesNotMatchWithExpected {
        export type TemplateVariables = Readonly<{
          expectedType: ValuesTypes;
          actualType: string;
        }>;
      }

      export namespace PreValidationModificationFailed {
        export type TemplateVariables = Readonly<{
          stringifiedCaughtError: string;
        }>;
      }

      export namespace ConditionallyForbiddenUndefinedValue {
        export type TemplateVariables = Readonly<{
          conditionWhenUndefinedIsForbidden: string;
        }>;
      }

      export namespace ConditionallyForbiddenNullValue {
        export type TemplateVariables = Readonly<{
          conditionWhenNullIsForbidden: string;
        }>;
      }

      export namespace ConditionallyForbiddenNonUndefinedValue {
        export type TemplateVariables = Readonly<{
          conditionWhenMustBeUndefined: string;
        }>;
      }

      export namespace ConditionallyForbiddenNonNullValue {
        export type TemplateVariables = Readonly<{
          conditionWhenMustBeNull: string;
        }>;
      }

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

      export namespace RequiredKeysOfAssociativeArrayAreMissing {
        export type TemplateVariables = Readonly<{ missingRequiredKeys: ReadonlyArray<string>; }>;
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

    }


    /* ─── Throwable Errors ───────────────────────────────────────────────────────────────────────────────────────── */
    export type ThrowableErrors = Readonly<{

      mutuallyExclusiveUndefinedAndNullValueTransformations: Readonly<{
        title: string;
        generateDescription: (
          templateVariables: ThrowableErrors.MutuallyExclusiveUndefinedAndNullValueTransformations.TemplateVariables
        ) => string;
      }>;

      preValidationModificationFailed: Readonly<{
        title: string;
        generateDescription: (
          templateVariables: ThrowableErrors.PreValidationModificationFailed.TemplateVariables
        ) => string;
      }>;

      unableToDeletePropertyWithOutdatedKey: Readonly<{
        title: string;
        generateDescription: (
          templateVariables: ThrowableErrors.UnableToDeletePropertyWithOutdatedKey.TemplateVariables
        ) => string;
      }>;

      unableToSubstituteUndefinedPropertyValue: Readonly<{
        title: string;
        generateDescription: (
          templateVariables: ThrowableErrors.UnableToSubstituteUndefinedPropertyValue.TemplateVariables
        ) => string;
      }>;

      propertyUndefinedabilityNotSpecified: Readonly<{
        title: string;
        generateDescription: (
          templateVariables: ThrowableErrors.PropertyUndefinedabilityNotSpecified.TemplateVariables
        ) => string;
      }>;

      unableToSubstituteNullPropertyValue: Readonly<{
        title: string;
        generateDescription: (
          templateVariables: ThrowableErrors.UnableToSubstituteNullPropertyValue.TemplateVariables
        ) => string;
      }>;

      propertyNullabilityNotSpecified: Readonly<{
        title: string;
        generateDescription: (
            templateVariables: ThrowableErrors.PropertyUndefinedabilityNotSpecified.TemplateVariables
        ) => string;
      }>;

      incompatibleValuesTypesAlternatives: Readonly<{
        title: string;
        generateDescription: (
          templateVariables: ThrowableErrors.IncompatibleValuesTypesAlternatives.TemplateVariables
        ) => string;
      }>;

    }>;


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

      unableToSubstituteUndefinedPropertyValue: Readonly<{
        title: string;
        generateDescription: (
          templateVariables: Warnings.UnableToSubstituteUndefinedPropertyValue.TemplateVariables
        ) => string;
      }>;

      unableToSubstituteNullPropertyValue: Readonly<{
        title: string;
        generateDescription: (
          templateVariables: Warnings.UnableToSubstituteNullPropertyValue.TemplateVariables
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

      export namespace UnableToSubstituteUndefinedPropertyValue {
        export type TemplateVariables = Readonly<{
          targetPropertyDotSeparatedQualifiedName: string;
        }>;
      }

      export namespace UnableToSubstituteNullPropertyValue {
        export type TemplateVariables = Readonly<{
          targetPropertyDotSeparatedQualifiedName: string;
        }>;
      }

    }

    export type PropertyDataForMessagesBuilding = Readonly<{
      targetPropertyDotSeparatedQualifiedInitialName: string;
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
