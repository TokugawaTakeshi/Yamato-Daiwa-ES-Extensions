/* eslint max-depth: [ "error", 6 ] */

import type { ArbitraryObject } from "../Types/ArbitraryObject";
import type { ReadonlyParsedJSON, ParsedJSON_Array, ParsedJSON_NestedProperty, ParsedJSON_Object } from "../Types/ParsedJSON";

import rawObjectDataProcessorLocalization__english from "./RawObjectDataProcessorLocalization.english";

import isUndefined from "../TypeGuards/Nullables/isUndefined";
import isNotUndefined from "../TypeGuards/Nullables/isNotUndefined";
import isNull from "../TypeGuards/Nullables/isNull";
import isNotNull from "../TypeGuards/Nullables/isNotNull";
import isArbitraryObject from "../TypeGuards/Objects/isArbitraryObject";
import isNumber from "../TypeGuards/Numbers/isNumber";
import isNaturalNumber from "../TypeGuards/Numbers/isNaturalNumber";
import isNonNegativeInteger from "../TypeGuards/Numbers/isNonNegativeInteger";
import isNegativeInteger from "../TypeGuards/Numbers/isNegativeInteger";
import isNegativeIntegerOrZero from "../TypeGuards/Numbers/isNegativeIntegerOrZero";
import isPositiveDecimalFraction from "../TypeGuards/Numbers/isPositiveDecimalFraction";
import isNegativeDecimalFraction from "../TypeGuards/Numbers/isNegativeDecimalFraction";
import isDecimalFractionOfAnySign from "../TypeGuards/Numbers/isDecimalFractionOfAnySign";
import isString from "../TypeGuards/Strings/isString";
import isBoolean from "../TypeGuards/isBoolean";
import isNonEmptyArray from "../TypeGuards/Arrays/isNonEmptyArray";
import stringifyAndFormatArbitraryValue from "../Strings/stringifyAndFormatArbitraryValue";

import Logger from "../Logging/Logger";
import InvalidParameterValueError from "../Errors/InvalidParameterValue/InvalidParameterValueError";
import InvalidExternalDataError from "../Errors/InvalidExternalData/InvalidExternalDataError";
import UnexpectedEventError from "../Errors/UnexpectedEvent/UnexpectedEventError";
import surroundLabelByOrnament from "../Strings/surroundLabelByOrnament";
import removeArrayElementsByPredicates from "../Arrays/removeArrayElementsByPredicates";


class RawObjectDataProcessor {

  public static defaultLocalization: RawObjectDataProcessor.Localization = rawObjectDataProcessorLocalization__english;

  private readonly rawData: ArbitraryObject;
  private readonly fullDataSpecification: RawObjectDataProcessor.ObjectDataSpecification;
  private readonly processingApproach: RawObjectDataProcessor.ProcessingApproaches;

  private currentlyIteratedObjectPropertyQualifiedInitialNameSegmentsForLogging: Array<string | number> = [];
  private currentlyIteratedPropertyNewNameForLogging: string | null = null;

  private readonly localization: RawObjectDataProcessor.Localization;

  /** @deprecated */
  private readonly validationErrorsMessagesBuilder: RawObjectDataProcessor.ValidationErrorsMessagesBuilder; // TODO 削除
  private readonly validationErrorsMessages: Array<string> = [];

  private readonly errorHandlingStrategies: RawObjectDataProcessor.ErrorsHandlingStrategies;

  private isRawDataInvalid: boolean = false;


  /* ━━━ Public Static Methods ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  public static process<ProcessedData extends ReadonlyParsedJSON, InterimValidData extends ReadonlyParsedJSON = ProcessedData>(
    rawData: unknown,
    validDataSpecification: RawObjectDataProcessor.ObjectDataSpecification,
    options: RawObjectDataProcessor.Options = {}
  ): RawObjectDataProcessor.ProcessingResult<ProcessedData> {

    const localization: RawObjectDataProcessor.Localization =
        options.localization ?? RawObjectDataProcessor.defaultLocalization;

    const validationErrorsMessagesBuilder: RawObjectDataProcessor.ValidationErrorsMessagesBuilder =
        new RawObjectDataProcessor.ValidationErrorsMessagesBuilder(localization);

    /* [ Theory ]
    * Because `typeof null` is `"object"`, besides `typeof` it's required to check for the null the value for the
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
      fullDataSpecification: validDataSpecification,
      processingApproach: options.processingApproach,
      validationErrorsMessagesBuilder,
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

    if ("isInvalid" in rawDataProcessingResult || "isValidButValidationOnlyModeActive" in rawDataProcessingResult) {
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
              totalCharactersCount: 120
            }),
            message
          ].join("\n")
        ).
        join("\n\n");
  }

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
    valueType: NumberConstructor |
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
    parametersObject: {
      rawData: ArbitraryObject;
      fullDataSpecification: RawObjectDataProcessor.ObjectDataSpecification;
      processingApproach?: RawObjectDataProcessor.ProcessingApproaches;
      validationErrorsMessagesBuilder: RawObjectDataProcessor.ValidationErrorsMessagesBuilder;
      localization: RawObjectDataProcessor.Localization;
      errorHandlingStrategies?: Partial<RawObjectDataProcessor.ErrorsHandlingStrategies>;
    }
  ) {

    this.rawData = parametersObject.rawData;
    this.fullDataSpecification = parametersObject.fullDataSpecification;

    this.processingApproach =
        parametersObject.processingApproach ??
        RawObjectDataProcessor.ProcessingApproaches.assemblingOfNewObject;

    this.currentlyIteratedObjectPropertyQualifiedInitialNameSegmentsForLogging[0] = this.fullDataSpecification.nameForLogging;
    this.validationErrorsMessagesBuilder = parametersObject.validationErrorsMessagesBuilder;
    this.localization = parametersObject.localization;

    this.errorHandlingStrategies = {
      onPreValidationModificationFailed:
          parametersObject.errorHandlingStrategies?.onPreValidationModificationFailed ??
          RawObjectDataProcessor.ErrorHandlingStrategies.throwingOfError,
      onUnableToDeletePropertyWithOutdatedValue:
          parametersObject.errorHandlingStrategies?.onUnableToDeletePropertyWithOutdatedValue ??
          RawObjectDataProcessor.ErrorHandlingStrategies.throwingOfError,
      onUnableToSubstituteUndefinePropertyValue:
          parametersObject.errorHandlingStrategies?.onUnableToSubstituteUndefinePropertyValue ??
          RawObjectDataProcessor.ErrorHandlingStrategies.throwingOfError,
      onUnableToSubstituteNullPropertyValue:
          parametersObject.errorHandlingStrategies?.onUnableToSubstituteNullPropertyValue ??
          RawObjectDataProcessor.ErrorHandlingStrategies.throwingOfError
    };

  }


  /* ━━━ Private Methods ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  private processFixedKeyAndValuePairsNonNullObjectTypeValue(
    compoundParameter: Readonly<
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

    const {
      targetObjectTypeValueSpecification,
      parentObject,
      targetPropertyStringifiedValueBeforeFirstPreValidationModification
    }: Parameters<typeof this.processFixedKeyAndValuePairsNonNullObjectTypeValue>[0] = compoundParameter;

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

      const preValidationModifications: ReadonlyArray<RawObjectDataProcessor.PreValidationModification> =
          RawObjectDataProcessor.getNormalizedPreValidationModifications(
            childPropertySpecification.preValidationModifications
          );

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

      if (isUndefined(childPropertyValue)) {

        if (childPropertySpecification.required === true) {

          areOneOnMorePropertiesInvalid = true;

          this.registerValidationError({
            title: this.localization.validationErrors.requiredPropertyIsMissing.title,
            description: this.localization.validationErrors.requiredPropertyIsMissing.description,
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
          isNotUndefined(childPropertySpecification.requiredIf) &&
          childPropertySpecification.requiredIf.predicate(
            targetObjectTypeSourceValue, this.rawData, this.currentObjectPropertyDotSeparatedQualifiedName
          )
        ) {

          areOneOnMorePropertiesInvalid = true;

          this.registerValidationError({
            title: this.localization.validationErrors.conditionallyRequiredPropertyIsMissing.title,
            description: this.localization.validationErrors.conditionallyRequiredPropertyIsMissing.generateDescription({
              requirementCondition: childPropertySpecification.requiredIf.descriptionForLogging
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


        if (isNotUndefined(childPropertySpecification.defaultValue) && !this.isValidationOnlyMode) {

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
                  value: childPropertySpecification.defaultValue,
                  configurable: childPropertySpecification.mustMakeNonConfigurable !== true,
                  enumerable: childPropertySpecification.mustMakeNonEnumerable !== true,
                  writable: childPropertySpecification.mustMakeReadonly !== true
                }
              );

            }

          }

          continue;

        }


        /* [ Approach ] Nothing required to do for omitted optional properties. */
        continue;

      }

      // ━━━ TODO ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      if (isNull(childPropertyValue)) {

        if (childPropertySpecification.nullable !== true && isUndefined(childPropertySpecification.nullSubstitution)) {

          areOneOnMorePropertiesInvalid = true;

          this.registerValidationError(this.validationErrorsMessagesBuilder.buildNonNullableValueIsNullErrorMessage({
            targetPropertyDotSeparatedQualifiedInitialName: this.currentObjectPropertyDotSeparatedQualifiedName,
            targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
            targetPropertyValue: childPropertyValue,
            targetPropertyValueSpecification: childPropertySpecification,
            targetPropertyStringifiedValueBeforeFirstPreValidationModification:
                childPropertyStringifiedValueBeforeFirstPreValidationModification
          }));

          continue;

        }

        if (isNotUndefined(childPropertySpecification.nullSubstitution) && !this.isValidationOnlyMode) {

          switch (this.processingApproach) {

            case RawObjectDataProcessor.ProcessingApproaches.assemblingOfNewObject: {

              Object.defineProperty(processedValueWorkpiece, childPropertyFinalName, {
                value: childPropertySpecification.nullSubstitution,
                configurable: childPropertySpecification.mustMakeNonConfigurable !== true,
                enumerable: childPropertySpecification.mustMakeNonEnumerable !== true,
                writable: childPropertySpecification.mustMakeReadonly !== true
              });

              break;

            }

            case RawObjectDataProcessor.ProcessingApproaches.manipulationsWithSourceObject: {

              this.substituteNullPropertyValueAtSourceObject({
                sourceObject: processedValueWorkpiece,
                targetPropertyInitialName: childPropertyInitialName,
                targetPropertySpecification: childPropertySpecification
              });

            }

          }

          continue;

        }


        if (childPropertySpecification.nullable === true) {

          if (
            this.processingApproach === RawObjectDataProcessor.ProcessingApproaches.assemblingOfNewObject &&
            !this.isValidationOnlyMode
          ) {
            Object.defineProperty(processedValueWorkpiece, childPropertyFinalName, {
              value: null,
              configurable: childPropertySpecification.mustMakeNonConfigurable !== true,
              enumerable: childPropertySpecification.mustMakeNonEnumerable !== true,
              writable: childPropertySpecification.mustMakeReadonly !== true
            });
          }

          continue;

        }

      }

      // TODO プロパティが変わらない場合も、mustMakeNonConfigurable/mustMakeNonEnumerabl/mustMakeReadonlyを指定しないといけない

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
          } else if ("isValidButValidationOnlyModeActive" in childPropertyValueProcessingResult) {
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

        this.registerValidationError(
          this.validationErrorsMessagesBuilder.buildCustomValidationFailedErrorMessageTextData({
            targetPropertyDotSeparatedQualifiedInitialName: this.currentObjectPropertyDotSeparatedQualifiedName,
            targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
            targetPropertyValue: targetObjectTypeSourceValue,
            targetPropertyValueSpecification: targetObjectTypeValueSpecification,
            customValidationDescription: customValidator.descriptionForLogging,
            targetPropertyStringifiedValueBeforeFirstPreValidationModification
          })
        );
      }
    }


    if (areOneOnMorePropertiesInvalid) {
      return { isInvalid: true };
    } else if (this.isValidationOnlyMode) {
      return { isValidButValidationOnlyModeActive: true };
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
      this.registerValidationError(
        this.validationErrorsMessagesBuilder.buildValueTypeDoesNotMatchWithExpectedErrorMessage({
          targetPropertyDotSeparatedQualifiedInitialName: this.currentObjectPropertyDotSeparatedQualifiedName,
          targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
          targetPropertyValue: targetValue__expectedToBeIndexedArray,
          targetPropertyValueSpecification: targetIndexedArrayTypeValueSpecification,
          targetPropertyStringifiedValueBeforeFirstPreValidationModification
        })
      );
      return { isInvalid: true };
    }


    let isTargetIndexedArrayTypeValueInvalid: boolean = false;

    if (
      isNotUndefined(targetIndexedArrayTypeValueSpecification.minimalElementsCount) &&
      targetValue__expectedToBeIndexedArray.length < targetIndexedArrayTypeValueSpecification.minimalElementsCount
    ) {

      isTargetIndexedArrayTypeValueInvalid = true;

      this.registerValidationError(
        this.validationErrorsMessagesBuilder.buildIndexedArrayElementsCountIsLessThanRequiredMinimumErrorMessage({
          targetPropertyDotSeparatedQualifiedInitialName: this.currentObjectPropertyDotSeparatedQualifiedName,
          targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
          targetPropertyValue: targetValue__expectedToBeIndexedArray,
          targetPropertyValueSpecification: targetIndexedArrayTypeValueSpecification,
          targetPropertyStringifiedValueBeforeFirstPreValidationModification,
          minimalElementsCount: targetIndexedArrayTypeValueSpecification.minimalElementsCount,
          actualElementsCount: targetValue__expectedToBeIndexedArray.length
        })
      );
    }


    if (
      isNotUndefined(targetIndexedArrayTypeValueSpecification.maximalElementsCount) &&
      targetValue__expectedToBeIndexedArray.length > targetIndexedArrayTypeValueSpecification.maximalElementsCount
    ) {

      isTargetIndexedArrayTypeValueInvalid = true;

      this.registerValidationError(
        this.validationErrorsMessagesBuilder.buildIndexedArrayElementsCountIsMoreThanAllowedMaximumErrorMessage({
          targetPropertyDotSeparatedQualifiedInitialName: this.currentObjectPropertyDotSeparatedQualifiedName,
          targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
          targetPropertyValue: targetValue__expectedToBeIndexedArray,
          targetPropertyValueSpecification: targetIndexedArrayTypeValueSpecification,
          targetPropertyStringifiedValueBeforeFirstPreValidationModification,
          maximalElementsCount: targetIndexedArrayTypeValueSpecification.maximalElementsCount,
          actualElementsCount: targetValue__expectedToBeIndexedArray.length
        })
      );
    }


    if (
      isNotUndefined(targetIndexedArrayTypeValueSpecification.exactElementsCount) &&
      targetValue__expectedToBeIndexedArray.length !== targetIndexedArrayTypeValueSpecification.exactElementsCount
    ) {

      isTargetIndexedArrayTypeValueInvalid = true;

      this.registerValidationError(
        this.validationErrorsMessagesBuilder.buildIndexedArrayElementsCountDoesNotMatchWithSpecifiedExactNumberErrorMessage({
          targetPropertyDotSeparatedQualifiedInitialName: this.currentObjectPropertyDotSeparatedQualifiedName,
          targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
          targetPropertyValue: targetValue__expectedToBeIndexedArray,
          targetPropertyValueSpecification: targetIndexedArrayTypeValueSpecification,
          targetPropertyStringifiedValueBeforeFirstPreValidationModification,
          exactElementsCount: targetIndexedArrayTypeValueSpecification.exactElementsCount,
          actualElementsCount: targetValue__expectedToBeIndexedArray.length
        })
      );
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

          this.registerValidationError(
            this.validationErrorsMessagesBuilder.buildIndexedArrayDisallowedUndefinedElementErrorMessage({
              targetPropertyDotSeparatedQualifiedInitialName: this.currentObjectPropertyDotSeparatedQualifiedName,
              targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
              targetPropertyValue: targetValue__expectedToBeIndexedArray,
              targetPropertyValueSpecification: targetIndexedArrayTypeValueSpecification,
              targetPropertyStringifiedValueBeforeFirstPreValidationModification:
                  stringifiedElementBeforeFirstPreValidationModification
            })
          );
        }

        continue;
      }


      if (isNull(element)) {

        if (targetIndexedArrayTypeValueSpecification.allowNullElements !== true) {

          areOneOnMoreElementsInvalid = true;

          this.registerValidationError(
            this.validationErrorsMessagesBuilder.buildIndexedArrayDisallowedNullElementErrorMessage({
              targetPropertyDotSeparatedQualifiedInitialName: this.currentObjectPropertyDotSeparatedQualifiedName,
              targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
              targetPropertyValue: targetValue__expectedToBeIndexedArray,
              targetPropertyValueSpecification: targetIndexedArrayTypeValueSpecification,
              targetPropertyStringifiedValueBeforeFirstPreValidationModification:
                  stringifiedElementBeforeFirstPreValidationModification
            })
          );
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
          } else if ("isValidButValidationOnlyModeActive" in elementProcessingResult) {
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

        this.registerValidationError(
          this.validationErrorsMessagesBuilder.buildCustomValidationFailedErrorMessageTextData({
            targetPropertyDotSeparatedQualifiedInitialName: this.currentObjectPropertyDotSeparatedQualifiedName,
            targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
            targetPropertyValue: targetValue__expectedToBeIndexedArray,
            targetPropertyValueSpecification: targetIndexedArrayTypeValueSpecification,
            customValidationDescription: customValidator.descriptionForLogging,
            targetPropertyStringifiedValueBeforeFirstPreValidationModification
          })
        );
      }
    }


    if (isTargetIndexedArrayTypeValueInvalid || areOneOnMoreElementsInvalid) {
      return { isInvalid: true };
    } else if (this.isValidationOnlyMode) {
      return { isValidButValidationOnlyModeActive: true };
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
      this.registerValidationError(
          this.validationErrorsMessagesBuilder.buildValueTypeDoesNotMatchWithExpectedErrorMessage({
            targetPropertyDotSeparatedQualifiedInitialName: this.currentObjectPropertyDotSeparatedQualifiedName,
            targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
            targetPropertyValue: targetValue__expectedToBeAssociativeArrayTypeObject,
            targetPropertyValueSpecification: targetAssociativeArrayTypeValueSpecification,
            targetPropertyStringifiedValueBeforeFirstPreValidationModification
          })
      );
      return { isInvalid: true };
    }


    let isTargetAssociativeArrayTypeValueInvalid: boolean = false;

    if (
      isNotUndefined(targetAssociativeArrayTypeValueSpecification.minimalEntriesCount) &&
      Object.entries(targetValue__expectedToBeAssociativeArrayTypeObject).length <
            targetAssociativeArrayTypeValueSpecification.minimalEntriesCount
    ) {

      isTargetAssociativeArrayTypeValueInvalid = true;

      this.registerValidationError(
        this.validationErrorsMessagesBuilder.buildAssociativeArrayEntriesCountIsLessThanRequiredMinimumErrorMessage({
          targetPropertyDotSeparatedQualifiedInitialName: this.currentObjectPropertyDotSeparatedQualifiedName,
          targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
          targetPropertyValue: targetValue__expectedToBeAssociativeArrayTypeObject,
          targetPropertyValueSpecification: targetAssociativeArrayTypeValueSpecification,
          targetPropertyStringifiedValueBeforeFirstPreValidationModification,
          minimalEntriesCount: targetAssociativeArrayTypeValueSpecification.minimalEntriesCount,
          actualEntriesCount: Object.entries(targetValue__expectedToBeAssociativeArrayTypeObject).length
        })
      );
    }


    if (
      isNotUndefined(targetAssociativeArrayTypeValueSpecification.maximalEntriesCount) &&
      Object.entries(targetValue__expectedToBeAssociativeArrayTypeObject).length >
          targetAssociativeArrayTypeValueSpecification.maximalEntriesCount
    ) {

      isTargetAssociativeArrayTypeValueInvalid = true;

      this.registerValidationError(
        this.validationErrorsMessagesBuilder.buildAssociativeArrayPairsCountIsMoreThanAllowedMaximumErrorMessage({
          targetPropertyDotSeparatedQualifiedInitialName: this.currentObjectPropertyDotSeparatedQualifiedName,
          targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
          targetPropertyValue: targetValue__expectedToBeAssociativeArrayTypeObject,
          targetPropertyValueSpecification: targetAssociativeArrayTypeValueSpecification,
          targetPropertyStringifiedValueBeforeFirstPreValidationModification,
          maximalEntriesCount: targetAssociativeArrayTypeValueSpecification.maximalEntriesCount,
          actualEntriesCount: Object.entries(targetValue__expectedToBeAssociativeArrayTypeObject).length
        })
      );
    }


    if (
      isNotUndefined(targetAssociativeArrayTypeValueSpecification.exactEntriesCount) &&
      Object.entries(targetValue__expectedToBeAssociativeArrayTypeObject).length !==
          targetAssociativeArrayTypeValueSpecification.exactEntriesCount
    ) {

      isTargetAssociativeArrayTypeValueInvalid = true;

      this.registerValidationError(
        this.validationErrorsMessagesBuilder.buildAssociativeArrayPairsCountDoesNotMatchWithSpecifiedExactNumberErrorMessage({
          targetPropertyDotSeparatedQualifiedInitialName: this.currentObjectPropertyDotSeparatedQualifiedName,
          targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
          targetPropertyValue: targetValue__expectedToBeAssociativeArrayTypeObject,
          targetPropertyValueSpecification: targetAssociativeArrayTypeValueSpecification,
          targetPropertyStringifiedValueBeforeFirstPreValidationModification,
          exactEntriesCount: targetAssociativeArrayTypeValueSpecification.exactEntriesCount,
          actualEntriesCount: Object.entries(targetValue__expectedToBeAssociativeArrayTypeObject).length
        })
      );
    }


    if (isNonEmptyArray(targetAssociativeArrayTypeValueSpecification.requiredKeys)) {

      const missingRequiredKeys: Array<string> = [ ...targetAssociativeArrayTypeValueSpecification.requiredKeys ].
        filter((key: string): boolean => !Object.keys(targetValue__expectedToBeAssociativeArrayTypeObject).includes(key));

      if (missingRequiredKeys.length > 0) {

        isTargetAssociativeArrayTypeValueInvalid = true;

        this.registerValidationError(
          this.validationErrorsMessagesBuilder.buildRequiredKeysOfAssociativeArrayAreMissingErrorMessage({
            targetPropertyDotSeparatedQualifiedInitialName: this.currentObjectPropertyDotSeparatedQualifiedName,
            targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
            targetPropertyValue: targetValue__expectedToBeAssociativeArrayTypeObject,
            targetPropertyValueSpecification: targetAssociativeArrayTypeValueSpecification,
            targetPropertyStringifiedValueBeforeFirstPreValidationModification,
            missingRequiredKeys
          })
        );
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

        this.registerValidationError(
          this.validationErrorsMessagesBuilder.buildRequiredAlternativeKeysOfAssociativeArrayAreMissingErrorMessage({
            targetPropertyDotSeparatedQualifiedInitialName: this.currentObjectPropertyDotSeparatedQualifiedName,
            targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
            targetPropertyValue: targetValue__expectedToBeAssociativeArrayTypeObject,
            targetPropertyValueSpecification: targetAssociativeArrayTypeValueSpecification,
            targetPropertyStringifiedValueBeforeFirstPreValidationModification,
            requiredKeysAlternatives: targetAssociativeArrayTypeValueSpecification.oneOfKeysIsRequired
          })
        );
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

        this.registerValidationError(
          this.validationErrorsMessagesBuilder.buildDisallowedKeysFoundInAssociativeArrayErrorMessage({
            targetPropertyDotSeparatedQualifiedInitialName: this.currentObjectPropertyDotSeparatedQualifiedName,
            targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
            targetPropertyValue: targetValue__expectedToBeAssociativeArrayTypeObject,
            targetPropertyValueSpecification: targetAssociativeArrayTypeValueSpecification,
            targetPropertyStringifiedValueBeforeFirstPreValidationModification,
            foundDisallowedKeys
          })
        );
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

          this.registerValidationError(
            this.validationErrorsMessagesBuilder.associativeArrayDisallowedUndefinedValueErrorMessage({
              targetPropertyDotSeparatedQualifiedInitialName: this.currentObjectPropertyDotSeparatedQualifiedName,
              targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
              targetPropertyValue: targetValue__expectedToBeAssociativeArrayTypeObject,
              targetPropertyValueSpecification: targetAssociativeArrayTypeValueSpecification,
              targetPropertyStringifiedValueBeforeFirstPreValidationModification:
                  stringifiedValueBeforeFirstPreValidationModification
            })
          );
        }

        continue;
      }

      if (isNull(value)) {

        if (targetAssociativeArrayTypeValueSpecification.allowNullValues !== true) {

          areOneOnMoreValuesInvalid = true;

          this.registerValidationError(
            this.validationErrorsMessagesBuilder.associativeArrayDisallowedNullValueErrorMessage({
              targetPropertyDotSeparatedQualifiedInitialName: this.currentObjectPropertyDotSeparatedQualifiedName,
              targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
              targetPropertyValue: targetValue__expectedToBeAssociativeArrayTypeObject,
              targetPropertyValueSpecification: targetAssociativeArrayTypeValueSpecification,
              targetPropertyStringifiedValueBeforeFirstPreValidationModification:
                  stringifiedValueBeforeFirstPreValidationModification
            })
          );
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
          } else if ("isValidButValidationOnlyModeActive" in valueProcessingResult) {
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

        this.registerValidationError(
          this.validationErrorsMessagesBuilder.buildCustomValidationFailedErrorMessageTextData({
            targetPropertyDotSeparatedQualifiedInitialName: this.currentObjectPropertyDotSeparatedQualifiedName,
            targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
            targetPropertyValue: targetValue__expectedToBeAssociativeArrayTypeObject,
            targetPropertyValueSpecification: targetAssociativeArrayTypeValueSpecification,
            customValidationDescription: customValidator.descriptionForLogging,
            targetPropertyStringifiedValueBeforeFirstPreValidationModification
          })
        );
      }
    }


    if (isTargetAssociativeArrayTypeValueInvalid || areOneOnMoreValuesInvalid) {
      return { isInvalid: true };
    } else if (this.isValidationOnlyMode) {
      return { isValidButValidationOnlyModeActive: true };
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
        return this.processNumberValue({
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


    return this.isValidationOnlyMode ? { isValidButValidationOnlyModeActive: true } : { isInvalid: true };
  }


  /* === Non-object types validation ================================================================================ */
  private processNumberValue(
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

      this.registerValidationError(
        this.validationErrorsMessagesBuilder.buildValueTypeDoesNotMatchWithExpectedErrorMessage({
          targetPropertyDotSeparatedQualifiedInitialName: this.currentObjectPropertyDotSeparatedQualifiedName,
          targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
          targetPropertyValue: targetValue__expectedToBeNumber,
          targetPropertyValueSpecification: targetValueSpecification,
          targetPropertyStringifiedValueBeforeFirstPreValidationModification
        })
      );

      return { isInvalid: true };
    }


    let propertyValueMatchingWithExpectedNumberSet: boolean;

    switch (targetValueSpecification.numbersSet) {
      case RawObjectDataProcessor.NumbersSets.naturalNumber: {
        propertyValueMatchingWithExpectedNumberSet = isNaturalNumber(targetValue__expectedToBeNumber);
        break;
      }
      case RawObjectDataProcessor.NumbersSets.nonNegativeInteger: {
        propertyValueMatchingWithExpectedNumberSet = isNonNegativeInteger(targetValue__expectedToBeNumber);
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
      case RawObjectDataProcessor.NumbersSets.negativeDecimalFraction: {
        propertyValueMatchingWithExpectedNumberSet = isNegativeDecimalFraction(targetValue__expectedToBeNumber);
        break;
      }
      case RawObjectDataProcessor.NumbersSets.decimalFractionOfAnySign: {
        propertyValueMatchingWithExpectedNumberSet = isDecimalFractionOfAnySign(targetValue__expectedToBeNumber);
        break;
      }
      case RawObjectDataProcessor.NumbersSets.anyRealNumber: {
        propertyValueMatchingWithExpectedNumberSet = true;
        break;
      }
    }

    if (!propertyValueMatchingWithExpectedNumberSet) {

      this.registerValidationError(
        this.validationErrorsMessagesBuilder.buildNumberValueIsNotBelongToExpectedNumbersSetErrorMessage({
          targetPropertyDotSeparatedQualifiedInitialName: this.currentObjectPropertyDotSeparatedQualifiedName,
          targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
          targetPropertyValue: targetValue__expectedToBeNumber,
          targetPropertyValueSpecification: targetValueSpecification,
          targetPropertyStringifiedValueBeforeFirstPreValidationModification,
          expectedNumbersSet: targetValueSpecification.numbersSet
        })
      );

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

      this.registerValidationError(
        this.validationErrorsMessagesBuilder.buildValueIsNotAmongAllowedAlternativesErrorMessage({
          allowedAlternatives: targetValueSpecification.
              allowedAlternatives.
              map(
                (polymorphicElement: number | { key: string; value: number; }): string =>
                    (isNumber(polymorphicElement) ? polymorphicElement.toString() : polymorphicElement.key)
              ),
          targetPropertyDotSeparatedQualifiedInitialName: this.currentObjectPropertyDotSeparatedQualifiedName,
          targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
          targetPropertyValue: targetValue__expectedToBeNumber,
          targetPropertyValueSpecification: targetValueSpecification,
          targetPropertyStringifiedValueBeforeFirstPreValidationModification
        })
      );

      return { isInvalid: true };
    }


    if (
      isNotUndefined(targetValueSpecification.minimalValue) &&
      targetValue__expectedToBeNumber < targetValueSpecification.minimalValue
    ) {

      this.registerValidationError(
        this.validationErrorsMessagesBuilder.buildNumericValueIsSmallerThanRequiredMinimumErrorMessage({
          targetPropertyDotSeparatedQualifiedInitialName: this.currentObjectPropertyDotSeparatedQualifiedName,
          targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
          targetPropertyValue: targetValue__expectedToBeNumber,
          targetPropertyValueSpecification: targetValueSpecification,
          requiredMinimum: targetValueSpecification.minimalValue,
          targetPropertyStringifiedValueBeforeFirstPreValidationModification
        })
      );

      return { isInvalid: true };
    }


    if (
      isNotUndefined(targetValueSpecification.maximalValue) &&
      targetValue__expectedToBeNumber > targetValueSpecification.maximalValue
    ) {

      this.registerValidationError(
        this.validationErrorsMessagesBuilder.buildNumericValueIsGreaterThanAllowedMaximumErrorMessage({
          targetPropertyDotSeparatedQualifiedInitialName: this.currentObjectPropertyDotSeparatedQualifiedName,
          targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
          targetPropertyValue: targetValue__expectedToBeNumber,
          targetPropertyValueSpecification: targetValueSpecification,
          targetPropertyStringifiedValueBeforeFirstPreValidationModification,
          allowedMaximum: targetValueSpecification.maximalValue
        })
      );

      return { isInvalid: true };
    }


    let atLeastOneCustomValidationFailed: boolean = false;

    for (
      const customValidator of
      RawObjectDataProcessor.getNormalizedCustomValidators(targetValueSpecification.customValidators)
    ) {

      if (!customValidator.validationFunction({
        currentPropertyValue: targetValue__expectedToBeNumber,
        rawData__full: this.rawData,
        rawData__currentObjectDepth: parentObject ?? this.rawData,
        targetPropertyDotSeparatedPath: this.currentObjectPropertyDotSeparatedQualifiedName
      })) {

        atLeastOneCustomValidationFailed = true;

        this.registerValidationError(
          this.validationErrorsMessagesBuilder.buildCustomValidationFailedErrorMessageTextData({
            targetPropertyDotSeparatedQualifiedInitialName: this.currentObjectPropertyDotSeparatedQualifiedName,
            targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
            targetPropertyValue: targetValue__expectedToBeNumber,
            targetPropertyValueSpecification: targetValueSpecification,
            targetPropertyStringifiedValueBeforeFirstPreValidationModification,
            customValidationDescription: customValidator.descriptionForLogging
          })
        );
      }
    }

    if (atLeastOneCustomValidationFailed) {
      return { isInvalid: true };
    }


    if (this.isValidationOnlyMode) {
      return { isValidButValidationOnlyModeActive: true };
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

      this.registerValidationError(
        this.validationErrorsMessagesBuilder.buildValueTypeDoesNotMatchWithExpectedErrorMessage({
          targetPropertyDotSeparatedQualifiedInitialName: this.currentObjectPropertyDotSeparatedQualifiedName,
          targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
          targetPropertyValue: targetValue__expectedToBeString,
          targetPropertyValueSpecification: targetValueSpecification,
          targetPropertyStringifiedValueBeforeFirstPreValidationModification
        })
      );

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

      this.registerValidationError(
        this.validationErrorsMessagesBuilder.buildValueIsNotAmongAllowedAlternativesErrorMessage({
          allowedAlternatives: targetValueSpecification.
              allowedAlternatives.
              map(
                (polymorphicElement: string | { key: string; value: string; }): string =>
                    (isString(polymorphicElement) ? polymorphicElement : polymorphicElement.key)
              ),
          targetPropertyDotSeparatedQualifiedInitialName: this.currentObjectPropertyDotSeparatedQualifiedName,
          targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
          targetPropertyValue: targetValue__expectedToBeString,
          targetPropertyValueSpecification: targetValueSpecification,
          targetPropertyStringifiedValueBeforeFirstPreValidationModification
        })
      );

      return { isInvalid: true };
    }


    if (
      isNaturalNumber(targetValueSpecification.minimalCharactersCount) &&
      targetValue__expectedToBeString.length < targetValueSpecification.minimalCharactersCount
    ) {

      this.registerValidationError(
        this.validationErrorsMessagesBuilder.buildCharactersCountIsLessThanRequiredErrorMessage({
          targetPropertyDotSeparatedQualifiedInitialName: this.currentObjectPropertyDotSeparatedQualifiedName,
          targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
          targetPropertyValue: targetValue__expectedToBeString,
          targetPropertyValueSpecification: targetValueSpecification,
          targetPropertyStringifiedValueBeforeFirstPreValidationModification,
          minimalCharactersCount: targetValueSpecification.minimalCharactersCount,
          realCharactersCount: targetValue__expectedToBeString.length
        })
      );

      return { isInvalid: true };
    }


    if (
      isNaturalNumber(targetValueSpecification.maximalCharactersCount) &&
      targetValue__expectedToBeString.length > targetValueSpecification.maximalCharactersCount
    ) {

      this.registerValidationError(
        this.validationErrorsMessagesBuilder.buildCharactersCountIsMoreThanAllowedErrorMessage({
          targetPropertyDotSeparatedQualifiedInitialName: this.currentObjectPropertyDotSeparatedQualifiedName,
          targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
          targetPropertyValue: targetValue__expectedToBeString,
          targetPropertyValueSpecification: targetValueSpecification,
          targetPropertyStringifiedValueBeforeFirstPreValidationModification,
          maximalCharactersCount: targetValueSpecification.maximalCharactersCount,
          realCharactersCount: targetValue__expectedToBeString.length
        })
      );

      return { isInvalid: true };
    }


    if (
      isNaturalNumber(targetValueSpecification.fixedCharactersCount) &&
      targetValue__expectedToBeString.length !== targetValueSpecification.fixedCharactersCount
    ) {
      this.registerValidationError(
        this.validationErrorsMessagesBuilder.buildCharactersCountDoesNotMatchWithSpecifiedErrorMessage({
          targetPropertyDotSeparatedQualifiedInitialName: this.currentObjectPropertyDotSeparatedQualifiedName,
          targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
          targetPropertyValue: targetValue__expectedToBeString,
          targetPropertyValueSpecification: targetValueSpecification,
          targetPropertyStringifiedValueBeforeFirstPreValidationModification,
          fixedCharactersCount: targetValueSpecification.fixedCharactersCount,
          realCharactersCount: targetValue__expectedToBeString.length
        })
      );
      return { isInvalid: true };
    }


    if (
      isNotUndefined(targetValueSpecification.validValueRegularExpression) &&
      !targetValueSpecification.validValueRegularExpression.test(targetValue__expectedToBeString)
    ) {
      this.registerValidationError(
        this.validationErrorsMessagesBuilder.buildRegularExpressionMismatchErrorMessage({
          targetPropertyDotSeparatedQualifiedInitialName: this.currentObjectPropertyDotSeparatedQualifiedName,
          targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
          targetPropertyValue: targetValue__expectedToBeString,
          targetPropertyValueSpecification: targetValueSpecification,
          targetPropertyStringifiedValueBeforeFirstPreValidationModification,
          regularExpression: targetValueSpecification.validValueRegularExpression
        })
      );
      return { isInvalid: true };
    }


    let atLeastOneCustomValidationFailed: boolean = false;

    for (
      const customValidator of
      RawObjectDataProcessor.getNormalizedCustomValidators(targetValueSpecification.customValidators)
    ) {

      if (!customValidator.validationFunction({
        currentPropertyValue: targetValue__expectedToBeString,
        rawData__full: this.rawData,
        rawData__currentObjectDepth: parentObject ?? this.rawData,
        targetPropertyDotSeparatedPath: this.currentObjectPropertyDotSeparatedQualifiedName
      })) {

        atLeastOneCustomValidationFailed = true;

        this.registerValidationError(
          this.validationErrorsMessagesBuilder.buildCustomValidationFailedErrorMessageTextData({
            targetPropertyDotSeparatedQualifiedInitialName: this.currentObjectPropertyDotSeparatedQualifiedName,
            targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
            targetPropertyValue: targetValue__expectedToBeString,
            targetPropertyValueSpecification: targetValueSpecification,
            targetPropertyStringifiedValueBeforeFirstPreValidationModification,
            customValidationDescription: customValidator.descriptionForLogging
          })
        );
      }
    }

    if (atLeastOneCustomValidationFailed) {
      return { isInvalid: true };
    }


    if (this.isValidationOnlyMode) {
      return { isValidButValidationOnlyModeActive: true };
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

      this.registerValidationError(
        this.validationErrorsMessagesBuilder.buildValueTypeDoesNotMatchWithExpectedErrorMessage({
          targetPropertyDotSeparatedQualifiedInitialName: this.currentObjectPropertyDotSeparatedQualifiedName,
          targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
          targetPropertyValue: targetValue__expectedToBeBoolean,
          targetPropertyValueSpecification: targetValueSpecification,
          targetPropertyStringifiedValueBeforeFirstPreValidationModification
        })
      );

      return { isInvalid: true };
    }


    if (
      (targetValueSpecification.trueOnly === true && !targetValue__expectedToBeBoolean) ||
      (targetValueSpecification.falseOnly === true && targetValue__expectedToBeBoolean)
    ) {

      this.registerValidationError(
        this.validationErrorsMessagesBuilder.buildDisallowedBooleanValueVariantErrorMessage({
          targetPropertyDotSeparatedQualifiedInitialName: this.currentObjectPropertyDotSeparatedQualifiedName,
          targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
          targetPropertyValue: targetValue__expectedToBeBoolean,
          targetPropertyValueSpecification: targetValueSpecification,
          targetPropertyStringifiedValueBeforeFirstPreValidationModification,
          disallowedVariant: !(targetValueSpecification.trueOnly === true)
        })
      );

      return { isInvalid: true };
    }


    let atLeastOneCustomValidationFailed: boolean = false;

    for (
      const customValidator of
      RawObjectDataProcessor.getNormalizedCustomValidators(targetValueSpecification.customValidators)
    ) {

      if (!customValidator.validationFunction({
        currentPropertyValue: targetValue__expectedToBeBoolean,
        rawData__full: this.rawData,
        rawData__currentObjectDepth: parentObject ?? this.rawData,
        targetPropertyDotSeparatedPath: this.currentObjectPropertyDotSeparatedQualifiedName
      })) {

        atLeastOneCustomValidationFailed = true;

        this.registerValidationError(
          this.validationErrorsMessagesBuilder.buildCustomValidationFailedErrorMessageTextData({
            targetPropertyDotSeparatedQualifiedInitialName: this.currentObjectPropertyDotSeparatedQualifiedName,
            targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
            targetPropertyValue: targetValue__expectedToBeBoolean,
            targetPropertyValueSpecification: targetValueSpecification,
            customValidationDescription: customValidator.descriptionForLogging,
            targetPropertyStringifiedValueBeforeFirstPreValidationModification
          })
        );
      }
    }

    if (atLeastOneCustomValidationFailed) {
      return { isInvalid: true };
    }


    if (this.isValidationOnlyMode) {
      return { isValidButValidationOnlyModeActive: true };
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

          Logger.logError({
            errorType: InvalidParameterValueError.NAME,
            title: InvalidParameterValueError.localization.defaultTitle,
            description: this.validationErrorsMessagesBuilder.buildIncompatibleValuesTypesAlternativesErrorDescription(
                targetValueSpecification
            ),
            occurrenceLocation: "RawObjectDataProcessor.processMultipleTypesAllowedValue(parametersObject)"
          });

          return { isInvalid: true };
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
        title: InvalidParameterValueError.localization.defaultTitle,
        description: this.validationErrorsMessagesBuilder.buildUnsupportedValueTypeErrorDescription({
          targetPropertyDotSeparatedQualifiedInitialName: this.currentObjectPropertyDotSeparatedQualifiedName,
          targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
          targetPropertyValue: targetValue,
          targetPropertyValueSpecification: targetValueSpecification,
          targetPropertyStringifiedValueBeforeFirstPreValidationModification
        }),
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
  // TODO 文字列という選択しを無くす
  private registerValidationError(
    payload: RawObjectDataProcessor.Localization.DataForMessagesBuilding | string
  ): void {
    this.isRawDataInvalid = true;
    this.validationErrorsMessages.push(
      isString(payload) ? payload : RawObjectDataProcessor.generateValidationErrorMessage(payload, this.localization)
    );
  }

  private get currentObjectPropertyDotSeparatedQualifiedName(): string {
    return this.currentlyIteratedObjectPropertyQualifiedInitialNameSegmentsForLogging.join(".");
  }

  /* [ Approach ] The alias for the logic clarifying */
  private get isValidationOnlyMode(): boolean {
    return this.isRawDataInvalid;
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
          value: targetPropertySpecification.defaultValue,
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
                errorType: RawObjectDataProcessor.ThrowableErrorsNames.unableToSubstituteUndefinedValueWithDefault,
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
      targetPropertySpecification
    }: Readonly<{
      sourceObject: ArbitraryObject;
      targetPropertyInitialName: string;
      targetPropertySpecification: RawObjectDataProcessor.PropertySpecification;
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

              // ━━━ TODO ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              this.registerValidationError(
                `The renaming of the property ${ this.currentObjectPropertyDotSeparatedQualifiedName } to ` +
                `${ this.currentlyIteratedPropertyNewNameForLogging } has been requested what means the ` +
                "creating of new the property and deleting of the outdated one while the outdated one is " +
                "not configurable (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/" +
                "Global_Objects/Object/defineProperty#configurable) thus could not be deleted. " +
                "Such data is being considered as invalid because `errorsHandlingStrategies.onUnableToDeleteProperty` " +
                "option has been specified with `RawObjectDataProcessor.ErrorHandlingStrategies.markingOfDataAsInvalid` " +
                "value."
              );

              break;

            }

            case RawObjectDataProcessor.ErrorHandlingStrategies.warningWithoutMarkingOfDataAsInvalid: {

              // TODO 抽出 (`occurrenceLocation` 以外　substituteUndefinedPropertyValueAtSourceObject)と完全一致
              Logger.logWarning({
                title: "Unable to Delete non-configurable Property",
                description:
                    `The renaming of the property ${ this.currentObjectPropertyDotSeparatedQualifiedName } to ` +
                    `${ this.currentlyIteratedPropertyNewNameForLogging } has been requested what means the ` +
                    "creating of new the property and deleting of the outdated one while the outdated one is " +
                    "not configurable (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/" +
                    "Global_Objects/Object/defineProperty#configurable) thus could not be deleted. " +
                    "This warning has been emitted because `errorsHandlingStrategies.onUnableToDeleteProperty` " +
                    "option has been specified with `RawObjectDataProcessor.ErrorHandlingStrategies." +
                    "warningWithoutMarkingOfDataAsInvalid`.",
                occurrenceLocation:
                    "RawObjectDataProcessor.substituteNullPropertyValueAtSourceObject(compoundParameter)"
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

      switch (this.errorHandlingStrategies.onUnableToSubstituteUndefinePropertyValue) {

        case RawObjectDataProcessor.ErrorHandlingStrategies.throwingOfError: {

          // TODO 抽出　Unable to substicute null/defaultにすれば完全一致
          Logger.throwErrorAndLog({
            errorInstance: new InvalidExternalDataError({
              customMessage:
                  `Unable to substitute the default value for ${ this.currentObjectPropertyDotSeparatedQualifiedName } ` +
                  `property because it is readonly.\n"` +
                  "● Specify `errorsHandlingStrategies.onUnableToSetProperty` option with " +
                  "  `RawObjectDataProcessor.ErrorHandlingStrategies.markingOfDataAsInvalid` if you want to " +
                  "   mark the processed data as invalid instead of the throwing of the error.\n" +
                  "● Specify `errorsHandlingStrategies.onUnableToSetProperty` option with " +
                  "  `RawObjectDataProcessor.ErrorHandlingStrategies.warningWithoutMarkingOfDataAsInvalid` if " +
                  "  you want to be only warned without the throwing of errors or marking of the processed data as " +
                  "  invalid (not recommended because the data does not matching with valid data specification" +
                  "  will be marked as valid is no other errors).\n" +
                  "● If the creating of new object based on the source one is fine, specify `processingApproach` " +
                  "  option with `ProcessingApproaches.assemblingOfNewObject` value, herewith everything that was " +
                  "  not specified via valid data specification will not be added to new object."
            }),
            title: InvalidExternalDataError.localization.defaultTitle,
            occurrenceLocation: "RawObjectDataProcessor." +
                "substituteNullPropertyValueAtSourceObject(compoundParameter)"
          });

        }

        /* eslint-disable-next-line no-fallthrough --
         * The ESLint does not see that `Logger.throwErrorAndLog()` returns `never` type in previous `case` block.
         * If to add the `break` to previous `case` block, it will be `TS7027: Unreachable code detected.` error. */
        case RawObjectDataProcessor.ErrorHandlingStrategies.markingOfDataAsInvalid: {

          this.registerValidationError(
            `Unable to substitute the default value for ${ this.currentObjectPropertyDotSeparatedQualifiedName } ` +
            `property because it is readonly.\n"`
          );

          break;

        }

        case RawObjectDataProcessor.ErrorHandlingStrategies.warningWithoutMarkingOfDataAsInvalid:

          // TODO 抽出　Unable to substicute null/defaultにすれば完全一致
          Logger.logWarning({
            title: "Unable to Set the Readonly Property",
            description:
                `Unable to substitute the default value for ${ this.currentObjectPropertyDotSeparatedQualifiedName } ` +
                `property because it is readonly.\n"` +
                "This warning has been emitted because `errorsHandlingStrategies.onUnableToSetProperty` " +
                "option has been specified with `RawObjectDataProcessor.ErrorHandlingStrategies." +
                "warningWithoutMarkingOfDataAsInvalid`.",
            occurrenceLocation:
                "RawObjectDataProcessor.substituteNullPropertyValueAtSourceObject(compoundParameter)"
          });

      }

    }

    sourceObject[targetPropertyInitialName] = targetPropertySpecification.nullSubstitution;

  }

  private static getNormalizedPreValidationModifications(
    preValidationModificationOrMultipleOfThem:
        RawObjectDataProcessor.PreValidationModification |
            ReadonlyArray<RawObjectDataProcessor.PreValidationModification> = []
  ): Array<RawObjectDataProcessor.PreValidationModification> {
    return Array.isArray(preValidationModificationOrMultipleOfThem) ?
        preValidationModificationOrMultipleOfThem : [ preValidationModificationOrMultipleOfThem ];
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
    preValidationModificationFailed = "PreValidationModificationFailedError",
    unableToSubstituteUndefinedValueWithDefault = "UnableToSubstituteUndefinedValueWithDefaultError",
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
  // TODO 未だ`isValidButValidationOnlyModeActive`を完全に理解していない。必要に応じて名前変更。
  export type ValueProcessingResult =
      { isInvalid: true; } |
      { isValidButValidationOnlyModeActive: true; } |
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

  type PropertyRequirementCondition = Readonly<{
    predicate: (
      rawData__currentObjectDepth: ArbitraryObject,
      rawData__full: ArbitraryObject,
      targetPropertyDotSeparatedPath: string
    ) => boolean;
    descriptionForLogging: string;
  }>;

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


  /* ─── Numeric Value / Property ─────────────────────────────────────────────────────────────────────────────────── */
  export enum NumbersSets {
    naturalNumber = "NATURAL_NUMBER",
    nonNegativeInteger = "NON_NEGATIVE_INTEGER",
    negativeInteger = "NEGATIVE_INTEGER",
    negativeIntegerOrZero = "NEGATIVE_INTEGER_OR_ZERO",
    anyInteger = "ANY_INTEGER",
    positiveDecimalFraction = "POSITIVE_DECIMAL_FRACTION",
    negativeDecimalFraction = "NEGATIVE_DECIMAL_FRACTION",
    decimalFractionOfAnySign = "DECIMAL_FRACTION_OF_ANY_SIGN",
    anyRealNumber = "ANY_REAL_NUMBER"
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
      Readonly<
        (
          {
            required: true;

            /* [ Theory ] Required to forbid ... and prevent
            * TS2339: Property '〇〇' does not exist on type '□□'
            * See https://stackoverflow.com/a/59133061/4818123  */
            defaultValue?: never;
            requiredIf?: never;
          } |
          {
            requiredIf: PropertyRequirementCondition;
            required?: never;
            defaultValue?: never;
          } |
          {
            defaultValue: number;
            required?: never;
            requiredIf?: never;
          } |
          {
            required: false;
            defaultValue?: never;
            requiredIf?: never;
          }
        ) &
        { nullSubstitution?: number; }
      >;

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
      Readonly<
        (
          {
            required: true;
            defaultValue?: never;
            requiredIf?: never;
          } |
          {
            requiredIf: PropertyRequirementCondition;
            required?: never;
            defaultValue?: never;
          } |
          {
            defaultValue: string;
            required?: never;
            requiredIf?: never;
          } |
          {
            required: false;
            defaultValue?: never;
            requiredIf?: never;
          }
        ) &
        { nullSubstitution?: string; }
      >;

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
      Readonly<
        (
          {
            required: true;
            defaultValue?: never;
            requiredIf?: never;
          } |
          {
            requiredIf: PropertyRequirementCondition;
            required?: never;
            defaultValue?: never;
          } |
          {
            defaultValue: boolean;
            required?: never;
            requiredIf?: never;
          } |
          {
            required: false;
            defaultValue?: never;
            requiredIf?: never;
          }
        ) &
        { nullSubstitution?: boolean; }
      >;

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
      Readonly<
        (
          {
            required: true;
            defaultValue?: never;
            requiredIf?: never;
          } |
          {
            requiredIf: PropertyRequirementCondition;
            required?: never;
            defaultValue?: never;
          } |
          {
            defaultValue: ParsedJSON_Object;
            required?: never;
            requiredIf?: never;
          } |
          {
            required: false;
            defaultValue?: never;
            requiredIf?: never;
          }
        ) &
        { nullSubstitution?: ParsedJSON_Object; }
      >;

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
            ((validValue: ReadonlyArray<ParsedJSON_NestedProperty>) => ReadonlyArray<ParsedJSON_NestedProperty>) |
            ReadonlyArray<(validValue: ReadonlyArray<ParsedJSON_NestedProperty>) => ReadonlyArray<ParsedJSON_NestedProperty>>;
      }>;

  export type NestedUniformElementsIndexedArrayPropertySpecification =
      ObjectPropertySpecification &
      UniformElementsIndexedArrayValueSpecification &
      Readonly<
        (
          {
            required: true;
            defaultValue?: undefined;
            requiredIf?: undefined;
          } |
          {
            requiredIf: PropertyRequirementCondition;
            required?: undefined;
            defaultValue?: undefined;
          } |
          {
            defaultValue: ParsedJSON_Array;
            required?: undefined;
            requiredIf?: undefined;
          } |
          {
            required: false;
            defaultValue?: undefined;
            requiredIf?: undefined;
          }
        ) &
        { nullSubstitution?: ParsedJSON_Array; }
      >;

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
      Readonly<
        (
          {
            required: true;
            defaultValue?: never;
            requiredIf?: never;
          } |
          {
            requiredIf: PropertyRequirementCondition;
            required?: never;
            defaultValue?: never;
          } |
          {
            defaultValue: ParsedJSON_NestedProperty;
            required?: never;
            requiredIf?: never;
          } |
          {
            required: false;
            defaultValue?: never;
            requiredIf?: never;
          }
        ) &
        { nullSubstitution?: ParsedJSON_Object; }
      >;

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
      Readonly<
        (
          {
            required: true;
            defaultValue?: never;
            requiredIf?: never;
          } |
          {
            requiredIf: PropertyRequirementCondition;
            required?: never;
            defaultValue?: never;
          } |
          {
            defaultValue: ParsedJSON_NestedProperty;
            required?: never;
            requiredIf?: never;
          } |
          {
            required: false;
            defaultValue?: never;
            requiredIf?: never;
          }
        )
      >;


  export type Localization = Readonly<{

    generateValidationErrorMessage: (templateVariables: Localization.DataForMessagesBuilding) => string;

    generateLanguageDependentErrorNumberHeadingPart: (templateVariables: Readonly<{ messageNumber: number; }>) => string;

    validationErrors: Localization.ValidationErrors;

    throwableErrors: Localization.ThrowableErrors;

    warnings: Localization.Warnings;

    // ━━━ TODO ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    /* === Nullability ============================================================================================== */
    readonly nonNullableValueIsNullErrorMessageTextData: Localization.InvalidPropertyValidationErrorMessageTemplateData;


    /* === Indexed arrays =========================================================================================== */
    readonly buildIndexedArrayElementsCountIsLessThanRequiredMinimumErrorMessageTextData:
        (minimalElementsCount: { minimalElementsCount: number; actualElementsCount: number; }) =>
            Localization.InvalidPropertyValidationErrorMessageTemplateData;

    readonly buildIndexedArrayElementsCountIsMoreThanAllowedMaximumErrorMessageTextData:
        (maximalElementsCount: { maximalElementsCount: number; actualElementsCount: number; }) =>
            Localization.InvalidPropertyValidationErrorMessageTemplateData;

    readonly buildIndexedArrayElementsCountDoesNotMatchWithSpecifiedExactNumberErrorMessageTextData:
        (parametersObject: { exactElementsCount: number; actualElementsCount: number; }) =>
            Localization.InvalidPropertyValidationErrorMessageTemplateData;

    readonly indexedArrayDisallowedUndefinedElementErrorMessageTextData: Localization.InvalidPropertyValidationErrorMessageTemplateData;

    readonly indexedArrayDisallowedNullElementErrorMessageTextData: Localization.InvalidPropertyValidationErrorMessageTemplateData;


    /* === Associative arrays ======================================================================================= */
    readonly buildAssociativeArrayEntriesCountIsLessThanRequiredMinimumErrorMessageTextData:
        (minimalElementsCount: { minimalEntriesCount: number; actualEntriesCount: number; })
            => Localization.InvalidPropertyValidationErrorMessageTemplateData;

    readonly buildAssociativeArrayEntriesCountIsMoreThanAllowedMaximumErrorMessageTextData:
        (maximalElementsCount: { maximalEntriesCount: number; actualEntriesCount: number; })
            => Localization.InvalidPropertyValidationErrorMessageTemplateData;

    readonly buildAssociativeArrayEntriesCountDoesNotMatchWithSpecifiedExactNumberErrorMessageTextData:
        (parametersObject: { exactEntriesCount: number; actualEntriesCount: number; })
            => Localization.InvalidPropertyValidationErrorMessageTemplateData;

    readonly buildRequiredKeysOfAssociativeArrayAreMissingErrorMessageTextData: (
      missingRequiredKeys: Array<string>
    ) => Localization.InvalidPropertyValidationErrorMessageTemplateData;

    readonly buildRequiredAlternativeKeysOfAssociativeArrayAreMissingErrorMessageTextData: (
      allowedAlternatives: ReadonlyArray<string>
    ) => Localization.InvalidPropertyValidationErrorMessageTemplateData;

    readonly buildDisallowedKeysFoundInAssociativeArrayErrorMessageTextData: (
        requiredKeysAlternatives: Array<string>
    ) => Localization.InvalidPropertyValidationErrorMessageTemplateData;

    readonly associativeArrayDisallowedUndefinedValueErrorMessageTextData: Localization.InvalidPropertyValidationErrorMessageTemplateData;

    readonly associativeArrayDisallowedNullValueErrorMessageTextData: Localization.InvalidPropertyValidationErrorMessageTemplateData;


    /* === Value type =============================================================================================== */
    readonly getLocalizedValueType: (valueType: Localization.ValuesTypes) => string;

    readonly numbersSet: (numberSet: NumbersSets) => string;


    /* === Numeric value ============================================================================================ */
    readonly buildNumberValueIsNotBelongToExpectedNumbersSetErrorMessageTextData: (expectedNumbersSet: NumbersSets) =>
        Localization.InvalidPropertyValidationErrorMessageTemplateData;

    readonly buildValueIsNotAmongAllowedAlternativesErrorMessageTextData: (allowedAlternatives: ReadonlyArray<string>) =>
        Localization.InvalidPropertyValidationErrorMessageTemplateData;

    readonly buildNumericValueIsSmallerThanRequiredMinimumErrorMessageTextData: (requiredMinimum: number) =>
        Localization.InvalidPropertyValidationErrorMessageTemplateData;

    readonly buildNumericValueIsGreaterThanAllowedMaximumErrorMessageTextData: (allowedMaximum: number) =>
        Localization.InvalidPropertyValidationErrorMessageTemplateData;


    /* === String value ============================================================================================= */
    readonly buildCharactersCountIsLessThanRequiredErrorMessageTextData: (
      payload: { minimalCharactersCount: number; realCharactersCount: number; }
    ) => Localization.InvalidPropertyValidationErrorMessageTemplateData;

    readonly buildCharactersCountIsMoreThanAllowedErrorMessageTextData: (
      payload: { maximalCharactersCount: number; realCharactersCount: number; }
    ) => Localization.InvalidPropertyValidationErrorMessageTemplateData;

    readonly buildCharactersCountDoesNotMatchWithSpecifiedErrorMessageTextData: (
      payload: { fixedCharactersCount: number; realCharactersCount: number; }
    ) => Localization.InvalidPropertyValidationErrorMessageTemplateData;

    readonly buildRegularExpressionMismatchErrorMessageTextData: (regularExpression: RegExp) =>
        Localization.InvalidPropertyValidationErrorMessageTemplateData;


    /* === Boolean value ============================================================================================ */
    readonly buildDisallowedBooleanValueVariantErrorMessageTextData: (disallowedVariant: boolean) =>
        Localization.InvalidPropertyValidationErrorMessageTemplateData;

    readonly buildIncompatibleValuesTypesAlternativesErrorDescription: (
      targetValueSpecification: MultipleTypesAllowedValueSpecification
    ) => string;

    readonly buildUnsupportedValueTypeErrorMessageTextData: (
      propertyDataForMessagesBuilding: Localization.PropertyDataForMessagesBuilding
    ) => Localization.InvalidPropertyValidationErrorMessageTemplateData;

    readonly buildCustomValidationFailedErrorMessageTextData: (customValidationDescription: string) =>
        Localization.InvalidPropertyValidationErrorMessageTemplateData;

    /* === Deprecated ============================================================================================ */
    /** @deprecated */
    readonly buildValueTypeDoesNotMatchWithExpectedErrorMessageTextData: (
        payload: Pick<Localization.PropertyDataForMessagesBuilding, "targetPropertyValue"> & {
          targetPropertyValueSpecification: Exclude<ValueSpecification, MultipleTypesAllowedValueSpecification>;
        }
    ) => Localization.InvalidPropertyValidationErrorMessageTemplateData;

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

      requiredPropertyIsMissing: Readonly<{
        title: string;
        description: string;
      }>;

      conditionallyRequiredPropertyIsMissing: Readonly<{
        title: string;
        generateDescription: (
          templateVariables: ValidationErrors.ConditionallyRequiredPropertyIsMissing.TemplateVariables
        ) => string;
      }>;

      unableToDeletePropertyWithOutdatedKey: Readonly<{
        title: string;
        description: string;
      }>;

      unableToSubstituteUndefinedPropertyValue: Readonly<{
        title: string;
        description: string;
      }>;

    }>;

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

      export namespace ConditionallyRequiredPropertyIsMissing {
        export type TemplateVariables = Readonly<{
          requirementCondition: string;
        }>;
      }

    }


    /* ─── Throwable Errors ───────────────────────────────────────────────────────────────────────────────────────── */
    export type ThrowableErrors = Readonly<{

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

    }>;

    export namespace ThrowableErrors {

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

      unableToSubstituteUndefinedPropertyValue: Readonly<{
        title: string;
        generateDescription: (
          templateVariables: Warnings.UnableToSubstituteUndefinedPropertyValue.TemplateVariables
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

    }

    export type PropertyDataForMessagesBuilding = {
      targetPropertyDotSeparatedQualifiedInitialName: string;
      targetPropertyNewName: string | null;
      targetPropertyValue: unknown;
      targetPropertyValueSpecification: ValueSpecification;
      targetPropertyStringifiedValueBeforeFirstPreValidationModification?: string;
    };

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

  /** @deprecated */
  export class ValidationErrorsMessagesBuilder {

    private readonly localization: Localization;
    private readonly buildErrorMessage: (payload: Localization.DataForMessagesBuilding) => string;

    public constructor(localization: Localization) {
      this.localization = localization;
      this.buildErrorMessage = localization.generateValidationErrorMessage.bind(this.localization);
    }

    /** @deprecated */
    public buildValueTypeDoesNotMatchWithExpectedErrorMessage(
      payload: Omit<Localization.PropertyDataForMessagesBuilding, "targetPropertyValueSpecification"> &
        { targetPropertyValueSpecification: Exclude<ValueSpecification, MultipleTypesAllowedValueSpecification>; }
    ): string {
      return this.buildErrorMessage({
        ...payload,
        ...this.localization.buildValueTypeDoesNotMatchWithExpectedErrorMessageTextData({
          targetPropertyValue: payload.targetPropertyValue,
          targetPropertyValueSpecification: payload.targetPropertyValueSpecification
        })
      });
    }

    /* === Nullability ============================================================================================== */
    public buildNonNullableValueIsNullErrorMessage(payload: Localization.PropertyDataForMessagesBuilding): string {
     return this.buildErrorMessage({
       ...payload,
       ...this.localization.nonNullableValueIsNullErrorMessageTextData
     });
    }


    /* === Indexed arrays =========================================================================================== */
    public buildIndexedArrayElementsCountIsLessThanRequiredMinimumErrorMessage(
      payload: Localization.PropertyDataForMessagesBuilding & { minimalElementsCount: number; actualElementsCount: number; }
    ): string {
      return this.buildErrorMessage({
        ...payload,
        ...this.localization.buildIndexedArrayElementsCountIsLessThanRequiredMinimumErrorMessageTextData({
          minimalElementsCount: payload.minimalElementsCount,
          actualElementsCount: payload.actualElementsCount
        })
      });
    }

    public buildIndexedArrayElementsCountIsMoreThanAllowedMaximumErrorMessage(
      payload: Localization.PropertyDataForMessagesBuilding & { maximalElementsCount: number; actualElementsCount: number; }
    ): string {
      return this.buildErrorMessage({
        ...payload,
        ...this.localization.buildIndexedArrayElementsCountIsMoreThanAllowedMaximumErrorMessageTextData({
          maximalElementsCount: payload.maximalElementsCount,
          actualElementsCount: payload.actualElementsCount
        })
      });
    }

    public buildIndexedArrayElementsCountDoesNotMatchWithSpecifiedExactNumberErrorMessage(
      payload: Localization.PropertyDataForMessagesBuilding & { exactElementsCount: number; actualElementsCount: number; }
    ): string {
      return this.buildErrorMessage({
        ...payload,
        ...this.localization.buildIndexedArrayElementsCountDoesNotMatchWithSpecifiedExactNumberErrorMessageTextData({
          exactElementsCount: payload.exactElementsCount,
          actualElementsCount: payload.actualElementsCount
        })
      });
    }

    public buildIndexedArrayDisallowedUndefinedElementErrorMessage(
      payload: Localization.PropertyDataForMessagesBuilding
    ): string {
      return this.buildErrorMessage({
        ...payload,
        ...this.localization.indexedArrayDisallowedUndefinedElementErrorMessageTextData
      });
    }

    public buildIndexedArrayDisallowedNullElementErrorMessage(
      payload: Localization.PropertyDataForMessagesBuilding
    ): string {
      return this.buildErrorMessage({
        ...payload,
        ...this.localization.indexedArrayDisallowedNullElementErrorMessageTextData
      });
    }


    /* === Associative arrays ======================================================================================= */
    public buildAssociativeArrayEntriesCountIsLessThanRequiredMinimumErrorMessage(
      payload: Localization.PropertyDataForMessagesBuilding & { minimalEntriesCount: number; actualEntriesCount: number; }
    ): string {
      return this.buildErrorMessage({
        ...payload,
        ...this.localization.buildAssociativeArrayEntriesCountIsLessThanRequiredMinimumErrorMessageTextData({
          minimalEntriesCount: payload.minimalEntriesCount,
          actualEntriesCount: payload.actualEntriesCount
        })
      });
    }

    public buildAssociativeArrayPairsCountIsMoreThanAllowedMaximumErrorMessage(
      payload: Localization.PropertyDataForMessagesBuilding & { maximalEntriesCount: number; actualEntriesCount: number; }
    ): string {
      return this.buildErrorMessage({
        ...payload,
        ...this.localization.buildAssociativeArrayEntriesCountIsMoreThanAllowedMaximumErrorMessageTextData({
          maximalEntriesCount: payload.maximalEntriesCount,
          actualEntriesCount: payload.actualEntriesCount
        })
      });
    }

    public buildAssociativeArrayPairsCountDoesNotMatchWithSpecifiedExactNumberErrorMessage(
      payload: Localization.PropertyDataForMessagesBuilding & { exactEntriesCount: number; actualEntriesCount: number; }
    ): string {
      return this.buildErrorMessage({
        ...payload,
        ...this.localization.buildAssociativeArrayEntriesCountDoesNotMatchWithSpecifiedExactNumberErrorMessageTextData({
          exactEntriesCount: payload.exactEntriesCount,
          actualEntriesCount: payload.actualEntriesCount
        })
      });
    }

    public buildRequiredKeysOfAssociativeArrayAreMissingErrorMessage(
      payload: Localization.PropertyDataForMessagesBuilding & { missingRequiredKeys: Array<string>; }
    ): string {
      return this.buildErrorMessage({
        ...payload,
        ...this.localization.buildRequiredKeysOfAssociativeArrayAreMissingErrorMessageTextData(payload.missingRequiredKeys)
      });
    }

    public buildRequiredAlternativeKeysOfAssociativeArrayAreMissingErrorMessage(
      payload: Localization.PropertyDataForMessagesBuilding & { requiredKeysAlternatives: ReadonlyArray<string>; }
    ): string {
      return this.buildErrorMessage({
        ...payload,
        ...this.localization.buildRequiredAlternativeKeysOfAssociativeArrayAreMissingErrorMessageTextData(
          payload.requiredKeysAlternatives
        )
      });
    }

    public buildDisallowedKeysFoundInAssociativeArrayErrorMessage(
      payload: Localization.PropertyDataForMessagesBuilding & { foundDisallowedKeys: Array<string>; }
    ): string {
      return this.buildErrorMessage({
        ...payload,
        ...this.localization.buildDisallowedKeysFoundInAssociativeArrayErrorMessageTextData(payload.foundDisallowedKeys)
      });
    }

    public associativeArrayDisallowedUndefinedValueErrorMessage(
        payload: Localization.PropertyDataForMessagesBuilding
    ): string {
      return this.buildErrorMessage({
        ...payload,
        ...this.localization.associativeArrayDisallowedUndefinedValueErrorMessageTextData
      });
    }

    public associativeArrayDisallowedNullValueErrorMessage(
        payload: Localization.PropertyDataForMessagesBuilding
    ): string {
      return this.buildErrorMessage({
        ...payload,
        ...this.localization.associativeArrayDisallowedNullValueErrorMessageTextData
      });
    }

    /* === Numeric value ============================================================================================ */
    public buildNumberValueIsNotBelongToExpectedNumbersSetErrorMessage(
      payload: Localization.PropertyDataForMessagesBuilding & { expectedNumbersSet: NumbersSets; }
    ): string {
      return this.buildErrorMessage({
        ...payload,
        ...this.localization.buildNumberValueIsNotBelongToExpectedNumbersSetErrorMessageTextData(
          payload.expectedNumbersSet
        ),
        ...{ expectedNumbersSet: payload.expectedNumbersSet }
      });
    }

    public buildValueIsNotAmongAllowedAlternativesErrorMessage(
      payload: Localization.PropertyDataForMessagesBuilding & Readonly<{ allowedAlternatives: ReadonlyArray<string>; }>
    ): string {
      return this.buildErrorMessage({
        ...payload,
        ...this.localization.buildValueIsNotAmongAllowedAlternativesErrorMessageTextData(payload.allowedAlternatives)
      });
    }

    public buildNumericValueIsSmallerThanRequiredMinimumErrorMessage(
      payload: Localization.PropertyDataForMessagesBuilding & { requiredMinimum: number; }
    ): string {
      return this.buildErrorMessage({
        ...payload,
        ...this.localization.buildNumericValueIsSmallerThanRequiredMinimumErrorMessageTextData(payload.requiredMinimum)
      });
    }

    public buildNumericValueIsGreaterThanAllowedMaximumErrorMessage(
      payload: Localization.PropertyDataForMessagesBuilding & { allowedMaximum: number; }
    ): string {
      return this.buildErrorMessage({
        ...payload,
        ...this.localization.buildNumericValueIsGreaterThanAllowedMaximumErrorMessageTextData(payload.allowedMaximum)
      });
    }


    /* === String value ============================================================================================= */
    public buildCharactersCountIsLessThanRequiredErrorMessage(
      payload: Localization.PropertyDataForMessagesBuilding & { minimalCharactersCount: number; realCharactersCount: number; }
    ): string {
      return this.buildErrorMessage({
        ...payload,
        ...this.localization.buildCharactersCountIsLessThanRequiredErrorMessageTextData({
          minimalCharactersCount: payload.minimalCharactersCount,
          realCharactersCount: payload.realCharactersCount
        })
      });
    }

    public buildCharactersCountIsMoreThanAllowedErrorMessage(
      payload: Localization.PropertyDataForMessagesBuilding & { maximalCharactersCount: number; realCharactersCount: number; }
    ): string {
      return this.buildErrorMessage({
        ...payload,
        ...this.localization.buildCharactersCountIsMoreThanAllowedErrorMessageTextData({
          maximalCharactersCount: payload.maximalCharactersCount,
          realCharactersCount: payload.realCharactersCount
        })
      });
    }

    public buildCharactersCountDoesNotMatchWithSpecifiedErrorMessage(
      payload: Localization.PropertyDataForMessagesBuilding & { fixedCharactersCount: number; realCharactersCount: number; }
    ): string {
      return this.buildErrorMessage({
        ...payload,
        ...this.localization.buildCharactersCountDoesNotMatchWithSpecifiedErrorMessageTextData({
          fixedCharactersCount: payload.fixedCharactersCount,
          realCharactersCount: payload.realCharactersCount
        })
      });
    }

    public buildRegularExpressionMismatchErrorMessage(
      payload: Localization.PropertyDataForMessagesBuilding & { regularExpression: RegExp; }
    ): string {
      return this.buildErrorMessage({
        ...payload,
        ...this.localization.buildRegularExpressionMismatchErrorMessageTextData(payload.regularExpression)
      });
    }

    /* === Other ====================================================================================================== */
    public buildDisallowedBooleanValueVariantErrorMessage(
      payload: Localization.PropertyDataForMessagesBuilding & { disallowedVariant: boolean; }
    ): string {
      return this.buildErrorMessage({
        ...payload, ...this.localization.buildDisallowedBooleanValueVariantErrorMessageTextData(payload.disallowedVariant)
      });
    }

    public buildIncompatibleValuesTypesAlternativesErrorDescription(
      targetValueSpecification: MultipleTypesAllowedValueSpecification
    ): string {
      return this.localization.buildIncompatibleValuesTypesAlternativesErrorDescription(targetValueSpecification);
    }

    public buildUnsupportedValueTypeErrorDescription(payload: Localization.PropertyDataForMessagesBuilding): string {
      return this.buildErrorMessage({
        ...payload,
        ...this.localization.buildUnsupportedValueTypeErrorMessageTextData(payload)
      });
    }

    public buildCustomValidationFailedErrorMessageTextData(
      payload: Localization.PropertyDataForMessagesBuilding & { customValidationDescription: string; }
    ): string {
      return this.buildErrorMessage({
        ...payload,
        ...this.localization.buildCustomValidationFailedErrorMessageTextData(payload.customValidationDescription)
      });
    }
  }
}


export default RawObjectDataProcessor;
