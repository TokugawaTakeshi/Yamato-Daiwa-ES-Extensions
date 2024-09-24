/* 〔 ESLint muting rationale 〕 This module has second namespaced helper class which is not a common case.  */
/* eslint-disable max-classes-per-file */
/* eslint max-depth: [ "error", 6 ] */

import type { ArbitraryObject } from "../Types/ArbitraryObject";
import type { ReadonlyParsedJSON, ParsedJSON_Array, ParsedJSON_NestedProperty, ParsedJSON_Object } from "../Types/ParsedJSON";

import rawObjectDataProcessorLocalization__english from "./RawObjectDataProcessorLocalization.english";

import isUndefined from "../TypeGuards/Nullables/isUndefined";
import isNotUndefined from "../TypeGuards/Nullables/isNotUndefined";
import isNull from "../TypeGuards/Nullables/isNull";
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


class RawObjectDataProcessor {

  private static defaultLocalization: RawObjectDataProcessor.Localization = rawObjectDataProcessorLocalization__english;

  private readonly rawData: ArbitraryObject;
  private readonly fullDataSpecification: RawObjectDataProcessor.ObjectDataSpecification;
  private readonly processingApproach: RawObjectDataProcessor.ProcessingApproaches;

  private currentlyIteratedObjectPropertyQualifiedNameSegmentsForLogging: Array<string | number> = [];
  private currentlyIteratedPropertyNewNameForLogging: string | null = null;

  private readonly validationErrorsMessagesBuilder: RawObjectDataProcessor.ValidationErrorsMessagesBuilder;
  private readonly validationErrorsMessages: Array<string> = [];

  private isRawDataInvalid: boolean = false;


  /* ━━━ Public Static Methods ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  public static process<ProcessedData extends ReadonlyParsedJSON, InterimValidData extends ReadonlyParsedJSON = ProcessedData>(
    rawData: unknown,
    validDataSpecification: RawObjectDataProcessor.ObjectDataSpecification,
    options: RawObjectDataProcessor.Options = {}
  ): RawObjectDataProcessor.ProcessingResult<ProcessedData> {

    const validationErrorsMessagesBuilder: RawObjectDataProcessor.ValidationErrorsMessagesBuilder =
        new RawObjectDataProcessor.ValidationErrorsMessagesBuilder(
          options.localization ?? RawObjectDataProcessor.defaultLocalization
        );

    /* [ Theory ]
    * Because `typeof null` is `"object"`, besides `typeof` it's required to check for the null value for the accurate
    *   error message. */
    if (isNull(rawData)) {
      return {
        rawDataIsInvalid: true,
        validationErrorsMessages: [ validationErrorsMessagesBuilder.rawDataIsNullErrorMessage ]
      };
    }


    if (!isArbitraryObject(rawData)) {
      return {
        rawDataIsInvalid: true,
        validationErrorsMessages: [ validationErrorsMessagesBuilder.buildRawDataIsNotObjectErrorMessage(typeof rawData) ]
      };
    }

    const dataHoldingSelfInstance: RawObjectDataProcessor = new RawObjectDataProcessor({
      rawData,
      fullDataSpecification: validDataSpecification,
      processingApproach: options.processingApproach,
      validationErrorsMessagesBuilder
    });

    let rawDataProcessingResult: RawObjectDataProcessor.ValueProcessingResult;

    switch (validDataSpecification.subtype) {

      case RawObjectDataProcessor.ObjectSubtypes.fixedKeyAndValuePairsObject: {
        rawDataProcessingResult = dataHoldingSelfInstance.processFixedKeyAndValuePairsNonNullObjectTypeValue({
          targetValue__expectedToBeObject: dataHoldingSelfInstance.rawData,
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


    let processedData: ProcessedData;

    /* [ Theory ] While type aliases and interfaces are not existing for the JavaScript it's impossible to guarantee
    *   programmatically that some value has object-based type 'X'. Nothing left except believe the user that 'ProcessedData'
    * is corresponding to 'validDataSpecification'. */
    if (isNotUndefined(options.postProcessing)) {
      processedData = options.
          /* eslint-disable-next-line @typescript-eslint/consistent-type-assertions --
          * See the "Problem overview" section of the official documentation */
          postProcessing<InterimValidData, ProcessedData>(rawDataProcessingResult.processedValue as InterimValidData);
    } else {
      /* eslint-disable-next-line @typescript-eslint/consistent-type-assertions --
       * See the "Problem overview" section of the official documentation */
      processedData = rawDataProcessingResult.processedValue as ProcessedData;
    }

    return {
      rawDataIsInvalid: false,
      processedData
    };

  }

  public static formatValidationErrorsList(
    messages: Array<string>, localization: RawObjectDataProcessor.Localization = RawObjectDataProcessor.defaultLocalization
  ): string {
    return messages.reduce(
      (accumulatingValue: string, message: string, index: number): string =>
          `${ accumulatingValue }\n\n` +
          `${ localization.buildErrorMessagesListItemHeading(index + 1) }\n` +
          message,
      ""
    );
  }

  public static setDefaultLocalization(newLocalization: RawObjectDataProcessor.Localization): void {
    RawObjectDataProcessor.defaultLocalization = newLocalization;
  }

  /* [ Theory ] Basically, the switch/case is working, but there are some exceptions.
   * https://stackoverflow.com/q/69848208/4818123
   * https://stackoverflow.com/q/69848689/4818123
   * [ Approach ] This method is public because it is required for the "localization".
   *  */
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


    if (
      valueType === RawObjectDataProcessor.ValuesTypesIDs.associativeArrayOfUniformTypeValues ||
      (typeof valueType === "function" && valueType.name === "Map")
    ) {
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
    }
  ) {
    this.rawData = parametersObject.rawData;
    this.fullDataSpecification = parametersObject.fullDataSpecification;
    this.processingApproach =
        parametersObject.processingApproach ??
        RawObjectDataProcessor.ProcessingApproaches.existingObjectManipulation;
    this.currentlyIteratedObjectPropertyQualifiedNameSegmentsForLogging[0] = this.fullDataSpecification.nameForLogging;
    this.validationErrorsMessagesBuilder = parametersObject.validationErrorsMessagesBuilder;
  }


  /* ━━━ Private Methods ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  private processFixedKeyAndValuePairsNonNullObjectTypeValue(
    {
      targetValue__expectedToBeObject,
      targetObjectTypeValueSpecification,
      parentObject,
      targetPropertyStringifiedValueBeforeFirstPreValidationModification
    }: {
      targetValue__expectedToBeObject: unknown;
      targetObjectTypeValueSpecification: RawObjectDataProcessor.FixedKeyAndValuePairsObjectValueSpecification;
      parentObject?: ArbitraryObject;
      targetPropertyStringifiedValueBeforeFirstPreValidationModification?: string;
    }
  ): RawObjectDataProcessor.ValueProcessingResult {

    /* [ Approach ] If "targetValue__expectedToBeObject" is a root object (rawData) this condition will always be falsy
     *    because "isArbitraryObject" check already has been executed. */
    if (!isArbitraryObject(targetValue__expectedToBeObject)) {
      this.registerValidationError(
        this.validationErrorsMessagesBuilder.buildValueTypeDoesNotMatchWithExpectedErrorMessage({
          targetPropertyDotSeparatedQualifiedName: this.currentObjectPropertyDotSeparatedQualifiedName,
          targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
          targetPropertyValue: targetValue__expectedToBeObject,
          targetPropertyValueSpecification: targetObjectTypeValueSpecification,
          targetPropertyStringifiedValueBeforeFirstPreValidationModification
        })
      );
      return { isInvalid: true };
    }


    let processedValueWorkpiece: ArbitraryObject =
        this.processingApproach === RawObjectDataProcessor.ProcessingApproaches.existingObjectManipulation ?
            targetValue__expectedToBeObject : {};

    const currentObjectDepthLevel__countFromZero: number =
        this.currentlyIteratedObjectPropertyQualifiedNameSegmentsForLogging.length;

    let areOneOnMorePropertiesInvalid: boolean = false;

    for (
      const [ childPropertyName, childPropertySpecification ] of
      Object.entries(targetObjectTypeValueSpecification.properties)
    ) {

      this.currentlyIteratedObjectPropertyQualifiedNameSegmentsForLogging[
        currentObjectDepthLevel__countFromZero
      ] = childPropertyName;

      let childPropertyFinalName: string;

      if (isUndefined(childPropertySpecification.newName)) {
        childPropertyFinalName = childPropertyName;
        this.currentlyIteratedPropertyNewNameForLogging = null;
      } else {
        childPropertyFinalName = childPropertySpecification.newName;
        this.currentlyIteratedPropertyNewNameForLogging = childPropertyFinalName;
      }

      let childPropertyValue: unknown = targetValue__expectedToBeObject[childPropertyName];
      let childPropertyStringifiedValueBeforeFirstPreValidationModification: string | undefined;

      const preValidationModifications: Array<RawObjectDataProcessor.PreValidationModification> =
          RawObjectDataProcessor.getNormalizedPreValidationModifications(childPropertySpecification.preValidationModifications);

      if (preValidationModifications.length > 0) {
        childPropertyStringifiedValueBeforeFirstPreValidationModification = stringifyAndFormatArbitraryValue(childPropertyValue);
      }

      for (const preValidationModification of preValidationModifications) {
        try {
          childPropertyValue = preValidationModification(childPropertyValue);
        } catch (error: unknown) {
          this.registerValidationError(
            this.validationErrorsMessagesBuilder.buildPreValidationModificationFailedErrorMessage({
              targetPropertyDotSeparatedQualifiedName: this.currentObjectPropertyDotSeparatedQualifiedName,
              targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
              targetPropertyValue: childPropertyValue,
              targetPropertyValueSpecification: childPropertySpecification,
              targetPropertyStringifiedValueBeforeFirstPreValidationModification:
                  childPropertyStringifiedValueBeforeFirstPreValidationModification,
              thrownError: error
            })
          );
        }
      }


      if (isUndefined(childPropertyValue)) {

        if (childPropertySpecification.required === true) {

          areOneOnMorePropertiesInvalid = true;

          this.registerValidationError(
            this.validationErrorsMessagesBuilder.buildRequiredPropertyIsMissingErrorMessage({
              targetPropertyDotSeparatedQualifiedName: this.currentObjectPropertyDotSeparatedQualifiedName,
              targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
              targetPropertyValue: childPropertyValue,
              targetPropertyValueSpecification: childPropertySpecification,
              targetPropertyStringifiedValueBeforeFirstPreValidationModification:
                  childPropertyStringifiedValueBeforeFirstPreValidationModification
            })
          );

          continue;
        }


        if (
          isNotUndefined(childPropertySpecification.requiredIf) &&
          childPropertySpecification.requiredIf.predicate(targetValue__expectedToBeObject, this.rawData)
        ) {

          areOneOnMorePropertiesInvalid = true;

          this.registerValidationError(
            this.validationErrorsMessagesBuilder.
                buildConditionallyRequiredPropertyIsMissingWhileRequirementConditionSatisfiedErrorMessage({
                  targetPropertyDotSeparatedQualifiedName: this.currentObjectPropertyDotSeparatedQualifiedName,
                  targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
                  targetPropertyValue: childPropertyValue,
                  targetPropertyValueSpecification: childPropertySpecification,
                  targetPropertyStringifiedValueBeforeFirstPreValidationModification:
                      childPropertyStringifiedValueBeforeFirstPreValidationModification,
                  requirementConditionDescription: childPropertySpecification.requiredIf.descriptionForLogging
                })
          );

          continue;
        }


        if (isNotUndefined(childPropertySpecification.defaultValue)) {

          switch (this.processingApproach) {

            case RawObjectDataProcessor.ProcessingApproaches.newObjectAssembling: {
              if (!this.isValidationOnlyMode) {
                Object.defineProperty(processedValueWorkpiece, childPropertyFinalName, {
                  value: childPropertySpecification.defaultValue,
                  configurable: isBoolean(childPropertySpecification.makeNonConfigurable) ?
                      childPropertySpecification.makeNonConfigurable : true,
                  enumerable: isBoolean(childPropertySpecification.makeNonEnumerable) ?
                      childPropertySpecification.makeNonEnumerable : true,
                  writable: isBoolean(childPropertySpecification.makeReadonly) ?
                      childPropertySpecification.makeReadonly : true
                });
              }
              break;
            }

            case RawObjectDataProcessor.ProcessingApproaches.existingObjectManipulation: {

              /* ※ Reserved for the future.
              *  The desired 'configurable', 'enumerable', 'writable' could be different with actual ones.
              *  If 'configurable === false', the descriptors could not be changed
              *  1. If 'childPropertyName' and 'childPropertyFinalName' are different and
              *     'childPropertySpecification.leaveEvenIfRenamed !== true', and also property is not configurable,
              *     the 'childPropertyName' could not be deleted (warning should be enough, but data will become invalid).
              *  2. If property is not 'writable', default value could not be substituted.
              * */
            }
          }

          continue;
        }


        /* [ Approach ] Nothing required to do for omitted optional properties. */
        continue;
      }


      if (isNull(childPropertyValue)) {

        if (childPropertySpecification.nullable !== true && isUndefined(childPropertySpecification.nullSubstitution)) {

          areOneOnMorePropertiesInvalid = true;

          this.registerValidationError(this.validationErrorsMessagesBuilder.buildNonNullableValueIsNullErrorMessage({
            targetPropertyDotSeparatedQualifiedName: this.currentObjectPropertyDotSeparatedQualifiedName,
            targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
            targetPropertyValue: childPropertyValue,
            targetPropertyValueSpecification: childPropertySpecification,
            targetPropertyStringifiedValueBeforeFirstPreValidationModification:
                childPropertyStringifiedValueBeforeFirstPreValidationModification
          }));

          continue;
        }


        if (isNotUndefined(childPropertySpecification.nullSubstitution)) {

          switch (this.processingApproach) {

            case RawObjectDataProcessor.ProcessingApproaches.newObjectAssembling: {
              if (!this.isValidationOnlyMode) {
                Object.defineProperty(processedValueWorkpiece, childPropertyFinalName, {
                  value: childPropertySpecification.nullSubstitution,
                  configurable: isBoolean(childPropertySpecification.makeNonConfigurable) ?
                      childPropertySpecification.makeNonConfigurable : true,
                  enumerable: isBoolean(childPropertySpecification.makeNonEnumerable) ?
                      childPropertySpecification.makeNonEnumerable : true,
                  writable: isBoolean(childPropertySpecification.makeReadonly) ?
                      childPropertySpecification.makeReadonly : true
                });
              }
              break;
            }

            case RawObjectDataProcessor.ProcessingApproaches.existingObjectManipulation: {

              /* ※ Reserved for the future. */
            }
          }

          continue;
        }

        if (childPropertySpecification.nullable === true) {

          switch (this.processingApproach) {

            case RawObjectDataProcessor.ProcessingApproaches.newObjectAssembling: {
              if (!this.isValidationOnlyMode) {
                Object.defineProperty(processedValueWorkpiece, childPropertyFinalName, {
                  value: null,
                  configurable: isBoolean(childPropertySpecification.makeNonConfigurable) ?
                      childPropertySpecification.makeNonConfigurable : true,
                  enumerable: isBoolean(childPropertySpecification.makeNonEnumerable) ?
                      childPropertySpecification.makeNonEnumerable : true,
                  writable: isBoolean(childPropertySpecification.makeReadonly) ?
                      childPropertySpecification.makeReadonly : true
                });
              }
              break;
            }

            case RawObjectDataProcessor.ProcessingApproaches.existingObjectManipulation: {

              /* ※ Reserved for the future (no need to change the value itself, but the changing of descriptors could be
               * requested). */
            }
          }

          continue;
        }
      }


      const childPropertyValueProcessingResult: RawObjectDataProcessor.ValueProcessingResult =
          this.processSingleNeitherUndefinedNorNullValue({
            targetValue: childPropertyValue,
            targetValueSpecification: childPropertySpecification,
            parentObject,
            targetPropertyStringifiedValueBeforeFirstPreValidationModification:
                childPropertyStringifiedValueBeforeFirstPreValidationModification
          });


      switch (this.processingApproach) {

        case RawObjectDataProcessor.ProcessingApproaches.newObjectAssembling: {

          if ("isInvalid" in childPropertyValueProcessingResult) {
            areOneOnMorePropertiesInvalid = true;
            continue;
          } else if ("isValidButValidationOnlyModeActive" in childPropertyValueProcessingResult) {
            continue;
          }


          Object.defineProperty(processedValueWorkpiece, childPropertyFinalName, {
            value: childPropertyValueProcessingResult.processedValue,
            configurable: isBoolean(childPropertySpecification.makeNonConfigurable) ?
                childPropertySpecification.makeNonConfigurable : true,
            enumerable: isBoolean(childPropertySpecification.makeNonEnumerable) ?
                childPropertySpecification.makeNonEnumerable : true,
            writable: isBoolean(childPropertySpecification.makeReadonly) ?
                childPropertySpecification.makeReadonly : true
          });

          break;
        }

        case RawObjectDataProcessor.ProcessingApproaches.existingObjectManipulation: {

          /* ※ Reserved for the future.
          * Basically no need to change value, but postValidationModification and/or descriptions changes could be requested. */
        }
      }
    }

    this.currentlyIteratedObjectPropertyQualifiedNameSegmentsForLogging.splice(-1, 1);


    for (
      const customValidator of
      RawObjectDataProcessor.getNormalizedCustomValidators(targetObjectTypeValueSpecification.customValidators)
    ) {

      if (!customValidator.validationFunction({
        currentPropertyValue: targetValue__expectedToBeObject,
        rawData__full: this.rawData,
        rawData__currentObjectDepth: parentObject ?? this.rawData
      })) {

        areOneOnMorePropertiesInvalid = true;

        this.registerValidationError(
          this.validationErrorsMessagesBuilder.buildCustomValidationFailedErrorMessageTextData({
            targetPropertyDotSeparatedQualifiedName: this.currentObjectPropertyDotSeparatedQualifiedName,
            targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
            targetPropertyValue: targetValue__expectedToBeObject,
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
          targetPropertyDotSeparatedQualifiedName: this.currentObjectPropertyDotSeparatedQualifiedName,
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
          targetPropertyDotSeparatedQualifiedName: this.currentObjectPropertyDotSeparatedQualifiedName,
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
          targetPropertyDotSeparatedQualifiedName: this.currentObjectPropertyDotSeparatedQualifiedName,
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
          targetPropertyDotSeparatedQualifiedName: this.currentObjectPropertyDotSeparatedQualifiedName,
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
        this.processingApproach === RawObjectDataProcessor.ProcessingApproaches.existingObjectManipulation ?
            targetValue__expectedToBeIndexedArray : [];

    const currentObjectDepthLevel__beginWithZero: number =
        this.currentlyIteratedObjectPropertyQualifiedNameSegmentsForLogging.length;

    let areOneOnMoreElementsInvalid: boolean = false;

    for (const [ index, rawElement ] of targetValue__expectedToBeIndexedArray.entries()) {

      this.currentlyIteratedObjectPropertyQualifiedNameSegmentsForLogging[currentObjectDepthLevel__beginWithZero] = index;

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
          this.registerValidationError(
            this.validationErrorsMessagesBuilder.buildPreValidationModificationFailedErrorMessage({
              targetPropertyDotSeparatedQualifiedName: this.currentObjectPropertyDotSeparatedQualifiedName,
              targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
              targetPropertyValue: element,
              targetPropertyValueSpecification: targetIndexedArrayTypeValueSpecification.element,
              targetPropertyStringifiedValueBeforeFirstPreValidationModification:
                  stringifiedElementBeforeFirstPreValidationModification,
              thrownError: error
            })
          );
        }
      }


      if (isUndefined(element)) {

        if (targetIndexedArrayTypeValueSpecification.allowUndefinedTypeElements !== true) {

          areOneOnMoreElementsInvalid = true;

          this.registerValidationError(
            this.validationErrorsMessagesBuilder.buildIndexedArrayDisallowedUndefinedElementErrorMessage({
              targetPropertyDotSeparatedQualifiedName: this.currentObjectPropertyDotSeparatedQualifiedName,
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
              targetPropertyDotSeparatedQualifiedName: this.currentObjectPropertyDotSeparatedQualifiedName,
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

        case RawObjectDataProcessor.ProcessingApproaches.newObjectAssembling: {

          if ("isInvalid" in elementProcessingResult) {
            areOneOnMoreElementsInvalid = true;
            continue;
          } else if ("isValidButValidationOnlyModeActive" in elementProcessingResult) {
            continue;
          }

          processedValueWorkpiece[index] = elementProcessingResult.processedValue;

          break;
        }

        case RawObjectDataProcessor.ProcessingApproaches.existingObjectManipulation: {

          /* ※ Reserved for the future.
          * Basically no need to change value, but postValidationModification could be requested. */
        }
      }
    }

    this.currentlyIteratedObjectPropertyQualifiedNameSegmentsForLogging.splice(-1, 1);


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
        rawData__currentObjectDepth: parentObject ?? this.rawData
      })) {

        areOneOnMoreElementsInvalid = true;

        this.registerValidationError(
          this.validationErrorsMessagesBuilder.buildCustomValidationFailedErrorMessageTextData({
            targetPropertyDotSeparatedQualifiedName: this.currentObjectPropertyDotSeparatedQualifiedName,
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
            targetPropertyDotSeparatedQualifiedName: this.currentObjectPropertyDotSeparatedQualifiedName,
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
          targetPropertyDotSeparatedQualifiedName: this.currentObjectPropertyDotSeparatedQualifiedName,
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
          targetPropertyDotSeparatedQualifiedName: this.currentObjectPropertyDotSeparatedQualifiedName,
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
          targetPropertyDotSeparatedQualifiedName: this.currentObjectPropertyDotSeparatedQualifiedName,
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
            targetPropertyDotSeparatedQualifiedName: this.currentObjectPropertyDotSeparatedQualifiedName,
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
            targetPropertyDotSeparatedQualifiedName: this.currentObjectPropertyDotSeparatedQualifiedName,
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
            targetPropertyDotSeparatedQualifiedName: this.currentObjectPropertyDotSeparatedQualifiedName,
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
        this.processingApproach === RawObjectDataProcessor.ProcessingApproaches.existingObjectManipulation ?
            targetValue__expectedToBeAssociativeArrayTypeObject : {};

    const currentObjectDepthLevel__beginWithZero: number =
        this.currentlyIteratedObjectPropertyQualifiedNameSegmentsForLogging.length;

    let areOneOnMoreValuesInvalid: boolean = false;

    for (const [ key, rawValue ] of Object.entries(targetValue__expectedToBeAssociativeArrayTypeObject)) {

      this.currentlyIteratedObjectPropertyQualifiedNameSegmentsForLogging[currentObjectDepthLevel__beginWithZero] = key;

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
          this.registerValidationError(
            this.validationErrorsMessagesBuilder.buildPreValidationModificationFailedErrorMessage({
              targetPropertyDotSeparatedQualifiedName: this.currentObjectPropertyDotSeparatedQualifiedName,
              targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
              targetPropertyValue: value,
              targetPropertyValueSpecification: targetAssociativeArrayTypeValueSpecification.value,
              targetPropertyStringifiedValueBeforeFirstPreValidationModification:
                  stringifiedValueBeforeFirstPreValidationModification,
              thrownError: error
            })
          );
        }
      }


      const keyFinalName: string = targetAssociativeArrayTypeValueSpecification.keysRenamings?.[key] ?? key;

      if (isUndefined(value)) {

        if (targetAssociativeArrayTypeValueSpecification.allowUndefinedTypeValues !== true) {

          areOneOnMoreValuesInvalid = true;

          this.registerValidationError(
            this.validationErrorsMessagesBuilder.associativeArrayDisallowedUndefinedValueErrorMessage({
              targetPropertyDotSeparatedQualifiedName: this.currentObjectPropertyDotSeparatedQualifiedName,
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
              targetPropertyDotSeparatedQualifiedName: this.currentObjectPropertyDotSeparatedQualifiedName,
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

        case RawObjectDataProcessor.ProcessingApproaches.newObjectAssembling: {

          if ("isInvalid" in valueProcessingResult) {
            areOneOnMoreValuesInvalid = true;
            continue;
          } else if ("isValidButValidationOnlyModeActive" in valueProcessingResult) {
            continue;
          }

          processedValueWorkpiece[keyFinalName] = valueProcessingResult.processedValue;

          break;
        }

        case RawObjectDataProcessor.ProcessingApproaches.existingObjectManipulation: {

          /* ※ Reserved for the future.
          * Basically no need to change value, but postValidationModification could be requested. */
        }
      }
    }

    this.currentlyIteratedObjectPropertyQualifiedNameSegmentsForLogging.splice(-1, 1);


    for (
      const customValidator of
      RawObjectDataProcessor.getNormalizedCustomValidators(targetAssociativeArrayTypeValueSpecification.customValidators)
    ) {

      if (!customValidator.validationFunction({
        currentPropertyValue: targetValue__expectedToBeAssociativeArrayTypeObject,
        rawData__full: this.rawData,
        rawData__currentObjectDepth: parentObject ?? this.rawData
      })) {

        areOneOnMoreValuesInvalid = true;

        this.registerValidationError(
          this.validationErrorsMessagesBuilder.buildCustomValidationFailedErrorMessageTextData({
            targetPropertyDotSeparatedQualifiedName: this.currentObjectPropertyDotSeparatedQualifiedName,
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
      targetValueSpecification: RawObjectDataProcessor.CertainTypeValueSpecification;
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
          targetValueSpecification: targetValueSpecification as RawObjectDataProcessor.NumberPropertySpecification,
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
          targetValue__expectedToBeObject: targetValue,
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
      targetValueSpecification: RawObjectDataProcessor.NumberValueSpecification;
      parentObject?: ArbitraryObject;
      targetPropertyStringifiedValueBeforeFirstPreValidationModification?: string;
    }
  ): RawObjectDataProcessor.ValueProcessingResult {

    if (!isNumber(targetValue__expectedToBeNumber)) {

      this.registerValidationError(
        this.validationErrorsMessagesBuilder.buildValueTypeDoesNotMatchWithExpectedErrorMessage({
          targetPropertyDotSeparatedQualifiedName: this.currentObjectPropertyDotSeparatedQualifiedName,
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
          targetPropertyDotSeparatedQualifiedName: this.currentObjectPropertyDotSeparatedQualifiedName,
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
          targetPropertyDotSeparatedQualifiedName: this.currentObjectPropertyDotSeparatedQualifiedName,
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
          targetPropertyDotSeparatedQualifiedName: this.currentObjectPropertyDotSeparatedQualifiedName,
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
          targetPropertyDotSeparatedQualifiedName: this.currentObjectPropertyDotSeparatedQualifiedName,
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
        rawData__currentObjectDepth: parentObject ?? this.rawData
      })) {

        atLeastOneCustomValidationFailed = true;

        this.registerValidationError(
          this.validationErrorsMessagesBuilder.buildCustomValidationFailedErrorMessageTextData({
            targetPropertyDotSeparatedQualifiedName: this.currentObjectPropertyDotSeparatedQualifiedName,
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
          targetPropertyDotSeparatedQualifiedName: this.currentObjectPropertyDotSeparatedQualifiedName,
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
          targetPropertyDotSeparatedQualifiedName: this.currentObjectPropertyDotSeparatedQualifiedName,
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
          targetPropertyDotSeparatedQualifiedName: this.currentObjectPropertyDotSeparatedQualifiedName,
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
          targetPropertyDotSeparatedQualifiedName: this.currentObjectPropertyDotSeparatedQualifiedName,
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
          targetPropertyDotSeparatedQualifiedName: this.currentObjectPropertyDotSeparatedQualifiedName,
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
          targetPropertyDotSeparatedQualifiedName: this.currentObjectPropertyDotSeparatedQualifiedName,
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
        rawData__currentObjectDepth: parentObject ?? this.rawData
      })) {

        atLeastOneCustomValidationFailed = true;

        this.registerValidationError(
          this.validationErrorsMessagesBuilder.buildCustomValidationFailedErrorMessageTextData({
            targetPropertyDotSeparatedQualifiedName: this.currentObjectPropertyDotSeparatedQualifiedName,
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
          targetPropertyDotSeparatedQualifiedName: this.currentObjectPropertyDotSeparatedQualifiedName,
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
          targetPropertyDotSeparatedQualifiedName: this.currentObjectPropertyDotSeparatedQualifiedName,
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
        rawData__currentObjectDepth: parentObject ?? this.rawData
      })) {

        atLeastOneCustomValidationFailed = true;

        this.registerValidationError(
          this.validationErrorsMessagesBuilder.buildCustomValidationFailedErrorMessageTextData({
            targetPropertyDotSeparatedQualifiedName: this.currentObjectPropertyDotSeparatedQualifiedName,
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

    let specificationForValueOfCurrentType: RawObjectDataProcessor.CertainTypeValueSpecification | undefined;

    switch (typeof targetValue) {

      case "number": {
        specificationForValueOfCurrentType = targetValueSpecification.alternatives.find(
          (alternativeSpecification: RawObjectDataProcessor.CertainTypeValueSpecification): boolean =>
              alternativeSpecification.type === RawObjectDataProcessor.ValuesTypesIDs.number ||
              alternativeSpecification.type === Number
        );
        break;
      }

      case "string": {
        specificationForValueOfCurrentType = targetValueSpecification.alternatives.find(
          (alternativeSpecification: RawObjectDataProcessor.CertainTypeValueSpecification): boolean =>
              alternativeSpecification.type === RawObjectDataProcessor.ValuesTypesIDs.string ||
              alternativeSpecification.type === String
        );
        break;
      }

      case "boolean": {
        specificationForValueOfCurrentType = targetValueSpecification.alternatives.find(
          (alternativeSpecification: RawObjectDataProcessor.CertainTypeValueSpecification): boolean =>
              alternativeSpecification.type === RawObjectDataProcessor.ValuesTypesIDs.boolean ||
              alternativeSpecification.type === Boolean
        );
        break;
      }

      case "object": {

        if (Array.isArray(targetValue)) {
          specificationForValueOfCurrentType = targetValueSpecification.alternatives.find(
            (alternativeSpecification: RawObjectDataProcessor.CertainTypeValueSpecification): boolean =>
                alternativeSpecification.type === RawObjectDataProcessor.ValuesTypesIDs.indexedArrayOfUniformElements ||
                alternativeSpecification.type === Array
          );
          break;
        }

        const possibleSpecificationsForObjectValueTypes: Array<RawObjectDataProcessor.CertainTypeValueSpecification> =
          targetValueSpecification.alternatives.filter(
              (alternativeSpecification: RawObjectDataProcessor.CertainTypeValueSpecification): boolean =>
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
          targetPropertyDotSeparatedQualifiedName: this.currentObjectPropertyDotSeparatedQualifiedName,
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
  private registerValidationError(errorMessage: string): void {
    this.isRawDataInvalid = true;
    this.validationErrorsMessages.push(errorMessage);
  }


  private get currentObjectPropertyDotSeparatedQualifiedName(): string {
    return this.currentlyIteratedObjectPropertyQualifiedNameSegmentsForLogging.join(".");
  }

  /* [ Approach ] The alias for the logic clarifying */
  private get isValidationOnlyMode(): boolean {
    return this.isRawDataInvalid;
  }

  private static getNormalizedPreValidationModifications(
    preValidationModificationOrMultipleOfThem:
        RawObjectDataProcessor.PreValidationModification | Array<RawObjectDataProcessor.PreValidationModification> = []
  ): Array<RawObjectDataProcessor.PreValidationModification> {
    return Array.isArray(preValidationModificationOrMultipleOfThem) ?
        preValidationModificationOrMultipleOfThem : [ preValidationModificationOrMultipleOfThem ];
  }

  private static getNormalizedPostValidationModifications<ValidValue>(
    postValidationModificationOrMultipleOfThem:
        ((validValue: ValidValue) => ValidValue) | Array<(validValue: ValidValue) => ValidValue> = []
  ): Array<(validValue: ValidValue) => ValidValue> {
    return Array.isArray(postValidationModificationOrMultipleOfThem) ?
        postValidationModificationOrMultipleOfThem : [ postValidationModificationOrMultipleOfThem ];
  }

  private static getNormalizedCustomValidators<ValidValue>(
    customValidatorOrMultipleOfThem: RawObjectDataProcessor.CustomValidator<ValidValue> |
        Array<RawObjectDataProcessor.CustomValidator<ValidValue>> = []
  ): Array<RawObjectDataProcessor.CustomValidator<ValidValue>> {
    return Array.isArray(customValidatorOrMultipleOfThem) ? customValidatorOrMultipleOfThem : [ customValidatorOrMultipleOfThem ];
  }
}


namespace RawObjectDataProcessor {

  export type Options = {
    processingApproach?: ProcessingApproaches;
    postProcessing?: <InterimValidData, ProcessedData>(interimData: InterimValidData) => ProcessedData;
    localization?: Localization;
  };

  export enum ProcessingApproaches {
    newObjectAssembling = "ASSEMBLING_OF_NEW_OBJECT",
    existingObjectManipulation = "MANIPULATING_OF_EXISTING_OBJECT"
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


  export type ObjectDataSpecification__SubtypeIndependentProperties = {
    readonly nameForLogging: string;
  };

  export type FixedKeyAndValuesTypeObjectDataSpecification =
      ObjectDataSpecification__SubtypeIndependentProperties &
      FixedKeyAndValuePairsObjectTypeValueSpecification &
      {
        readonly subtype: ObjectSubtypes.fixedKeyAndValuePairsObject;
        readonly properties: PropertiesSpecification;
      };

  export type IndexedArrayOfUniformElementsTypeDataSpecification =
      ObjectDataSpecification__SubtypeIndependentProperties &
      IndexedArrayTypeValueSpecification &
      {
        readonly subtype: ObjectSubtypes.indexedArray;
        readonly element: CertainTypeValueSpecification;
      };

  export type AssociativeArrayOfUniformValuesTypeDataSpecification =
      ObjectDataSpecification__SubtypeIndependentProperties &
      AssociativeArrayTypeValueSpecification &
      {
        readonly subtype: ObjectSubtypes.associativeArray;
        readonly value: CertainTypeValueSpecification;
      };

  export type PropertiesSpecification = { readonly [propertyName: string]: CertainPropertySpecification; };

  export type CertainTypeValueSpecification =
      NumberValueSpecification |
      StringValueSpecification |
      BooleanValueSpecification |
      FixedKeyAndValuePairsObjectValueSpecification |
      UniformElementsIndexedArrayValueSpecification |
      UniformElementsAssociativeArrayValueSpecification |
      MultipleTypesAllowedValueSpecification;

  export type CertainPropertySpecification =
      NumberPropertySpecification |
      StringPropertySpecification |
      BooleanPropertySpecification |
      NestedObjectPropertySpecification |
      NestedUniformElementsIndexedArrayPropertySpecification |
      NestedUniformElementsAssociativeArrayPropertySpecification |
      MultipleTypesAllowedPropertySpecification;

  export type ProcessingResult<ProcessedData> =
      {
        rawDataIsInvalid: false;
        processedData: ProcessedData;
      } |
      {
        rawDataIsInvalid: true;
        validationErrorsMessages: Array<string>;
      };


  /* --- Processed data workpiece ----------------------------------------------------------------------------------- */
  /* [ Approach ] Even is "isInvalid === true", it's still possible to substitute the valid value and keep whole data valid.
  * But if "isValidButValidationOnlyModeActive === true", non substitutions required anymore. */
  export type ValueProcessingResult =
      { isInvalid: true; } |
      { isValidButValidationOnlyModeActive: true; } |
      { processedValue: ParsedJSON_NestedProperty; };

  type ObjectKeySpecification = {
    readonly newName?: string;
  };

  type ObjectPropertySpecification =
      ObjectKeySpecification &
      {
        readonly nullable?: boolean;
        readonly makeNonConfigurable?: boolean;
        readonly makeNonEnumerable?: boolean;
        readonly makeReadonly?: boolean;
        readonly leaveEvenIfRenamed?: boolean;
      };


  /* --- Value specification ---------------------------------------------------------------------------------------- */
  type ValueSpecification__CommonParameters = {
    readonly preValidationModifications?: PreValidationModification | Array<PreValidationModification>;
  };

  export type PreValidationModification = (rawValue: unknown) => unknown;

  type FixedKeyAndValuePairsObjectTypeValueSpecification = {
    readonly propertiesWillBeDeletedAfterPostValidationModifications?: Array<string>;
  };

  type IndexedArrayTypeValueSpecification =
      {
        readonly minimalElementsCount?: number;
        readonly maximalElementsCount?: number;
        readonly exactElementsCount?: undefined;
      } | {
        readonly exactElementsCount?: number;
        readonly minimalElementsCount?: undefined;
        readonly maximalElementsCount?: undefined;
      };

  type AssociativeArrayTypeValueSpecification = {
    readonly requiredKeys?: Array<string>;
    readonly allowedKeys?: Array<string>;
    readonly oneOfKeysIsRequired?: Array<string>;
  } & (
    {
      readonly minimalEntriesCount?: number;
      readonly maximalEntriesCount?: number;
      readonly exactEntriesCount?: undefined;
    } | {
      readonly exactEntriesCount?: number;
      readonly minimalEntriesCount?: undefined;
      readonly maximalEntriesCount?: undefined;
    }
  );

  export enum ValuesTypesIDs {
    number = "NUMBER",
    string = "STRING",
    boolean = "BOOLEAN",
    fixedKeyAndValuePairsObject = "FIXED_KEY_AND_VALUE_PAIRS_OBJECT",
    indexedArrayOfUniformElements = "INDEXED_ARRAY_OF_UNIFORM_ELEMENTS",
    associativeArrayOfUniformTypeValues = "ASSOCIATIVE_ARRAY_OF_UNIFORM_TYPE_VALUES",
    oneOf = "ONE_OF"
  }

  type PropertyRequirementCondition = {
    readonly predicate: (rawData__currentObjectDepth: ArbitraryObject, rawData__full: ArbitraryObject) => boolean;
    readonly descriptionForLogging: string;
  };

  export type CustomValidator<TargetValue> = {
    readonly validationFunction: (parametersObject: CustomValidator.ParametersObject<TargetValue>) => boolean;
    readonly descriptionForLogging: string;
  };

  export namespace CustomValidator {
    export type ParametersObject<TargetValue> = {
      currentPropertyValue: TargetValue;
      rawData__currentObjectDepth: ArbitraryObject;
      rawData__full: ArbitraryObject;
    };
  }


  /* --- Number value/property -------------------------------------------------------------------------------------- */
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

  export type NumberValueSpecification =
      ValueSpecification__CommonParameters &
      {
        readonly type: ValuesTypesIDs.number | NumberConstructor;
        readonly numbersSet: NumbersSets;
        readonly allowedAlternatives?: ReadonlyArray<number> | ReadonlyArray<Readonly<{ key: string; value: number; }>>;
        readonly minimalValue?: number;
        readonly maximalValue?: number;
        readonly customValidators?: CustomValidator<number> | Array<CustomValidator<number>>;
        readonly postValidationModifications?: ((validValue: number) => number) | Array<(validValue: number) => number>;
      };

  export type NumberPropertySpecification =
      ObjectPropertySpecification &
      NumberValueSpecification &
      (
        {

          readonly required: true;

          /* [ Theory ] Required to forbid ... and prevent
          * TS2339: Property '〇〇' does not exist on type '□□'
          * See https://stackoverflow.com/a/59133061/4818123  */
          readonly defaultValue?: undefined;
          readonly requiredIf?: undefined;
        } |
        {
          readonly requiredIf: PropertyRequirementCondition;
          readonly required?: undefined;
          readonly defaultValue?: undefined;
        } |
        {
          readonly defaultValue: number;
          readonly required?: undefined;
          readonly requiredIf?: undefined;
        } |
        {
          readonly required: false;
          readonly defaultValue?: undefined;
          readonly requiredIf?: undefined;
        }
      ) &
      {
        readonly nullSubstitution?: number;
      };


  /* --- String value/property -------------------------------------------------------------------------------------- */
  export type StringValueSpecification = ValueSpecification__CommonParameters & {
    readonly type: ValuesTypesIDs.string | StringConstructor;
    readonly allowedAlternatives?: ReadonlyArray<string> | ReadonlyArray<Readonly<{ key: string; value: string; }>>;
    readonly minimalCharactersCount?: number;
    readonly maximalCharactersCount?: number;
    readonly fixedCharactersCount?: number;
    readonly validValueRegularExpression?: RegExp;
    readonly customValidators?: CustomValidator<string> | Array<CustomValidator<string>>;
    readonly postValidationModifications?: ((validValue: string) => string) | Array<(validValue: string) => string>;
  };

  export type StringPropertySpecification =
      ObjectPropertySpecification &
      StringValueSpecification &
      (
        {
          readonly required: true;
          readonly defaultValue?: undefined;
          readonly requiredIf?: undefined;
        } |
        {
          readonly requiredIf: PropertyRequirementCondition;
          readonly required?: undefined;
          readonly defaultValue?: undefined;
        } |
        {
          readonly defaultValue: string;
          readonly required?: undefined;
          readonly requiredIf?: undefined;
        } |
        {
          readonly required: false;
          readonly defaultValue?: undefined;
          readonly requiredIf?: undefined;
        }
      ) &
      {
        readonly nullSubstitution?: string;
      };


  /* --- Boolean value/property ------------------------------------------------------------------------------------- */
  export type BooleanValueSpecification = ValueSpecification__CommonParameters & {
    readonly type: ValuesTypesIDs.boolean | BooleanConstructor;
    readonly trueOnly?: boolean;
    readonly falseOnly?: boolean;
    readonly customValidators?: CustomValidator<boolean> | Array<CustomValidator<boolean>>;
    readonly postValidationModifications?: ((validValue: boolean) => boolean) | Array<(validValue: boolean) => boolean>;
  };

  export type BooleanPropertySpecification =
      ObjectPropertySpecification &
      BooleanValueSpecification &
      (
        {
          readonly required: true;
          readonly defaultValue?: undefined;
          readonly requiredIf?: undefined;
        } |
        {
          readonly requiredIf: PropertyRequirementCondition;
          readonly required?: undefined;
          readonly defaultValue?: undefined;
        } |
        {
          readonly defaultValue: boolean;
          readonly required?: undefined;
          readonly requiredIf?: undefined;
        } |
        {
          readonly required: false;
          readonly defaultValue?: undefined;
          readonly requiredIf?: undefined;
        }
      ) &
      {
        readonly nullSubstitution?: boolean;
      };


  /* --- Nested object value/property ------------------------------------------------------------------------------- */
  export type FixedKeyAndValuePairsObjectValueSpecification =
      ValueSpecification__CommonParameters &
      FixedKeyAndValuePairsObjectTypeValueSpecification &
      {
        readonly type: ValuesTypesIDs.fixedKeyAndValuePairsObject | ObjectConstructor;
        readonly properties: PropertiesSpecification;
        readonly customValidators?: CustomValidator<ArbitraryObject> | Array<CustomValidator<ArbitraryObject>>;
        readonly postValidationModifications?:
            ((validValue: ArbitraryObject) => ArbitraryObject) | Array<(validValue: ArbitraryObject) => ArbitraryObject>;
      };

  export type NestedObjectPropertySpecification =
      ObjectPropertySpecification &
      FixedKeyAndValuePairsObjectValueSpecification &
      (
        {
          readonly required: true;
          readonly defaultValue?: undefined;
          readonly requiredIf?: undefined;
        } |
        {
          readonly requiredIf: PropertyRequirementCondition;
          readonly required?: undefined;
          readonly defaultValue?: undefined;
        } |
        {
          readonly defaultValue: ParsedJSON_Object;
          readonly required?: undefined;
          readonly requiredIf?: undefined;
        } |
        {
          readonly required: false;
          readonly defaultValue?: undefined;
          readonly requiredIf?: undefined;
        }
      ) &
      {
        readonly nullSubstitution?: ParsedJSON_Object;
      };


  /* --- Uniform element indexed array value/property --------------------------------------------------------------- */
  export type UniformElementsIndexedArrayValueSpecification =
      ValueSpecification__CommonParameters &
      IndexedArrayTypeValueSpecification &
      {
        readonly type: ValuesTypesIDs.indexedArrayOfUniformElements | ArrayConstructor;
        readonly element: CertainTypeValueSpecification;
        readonly allowUndefinedTypeElements?: boolean;
        readonly allowNullElements?: boolean;
        readonly customValidators?: CustomValidator<Array<ParsedJSON_NestedProperty>> |
            Array<CustomValidator<Array<ParsedJSON_NestedProperty>>>;
        readonly postValidationModifications?:
            ((validValue: Array<ParsedJSON_NestedProperty>) => Array<ParsedJSON_NestedProperty>) |
            Array<(validValue: Array<ParsedJSON_NestedProperty>) => Array<ParsedJSON_NestedProperty>>;
      };

  export type NestedUniformElementsIndexedArrayPropertySpecification =
      ObjectPropertySpecification &
      UniformElementsIndexedArrayValueSpecification &
      (
        {
          readonly required: true;
          readonly defaultValue?: undefined;
          readonly requiredIf?: undefined;
        } |
        {
          readonly requiredIf: PropertyRequirementCondition;
          readonly required?: undefined;
          readonly defaultValue?: undefined;
        } |
        {
          readonly defaultValue: ParsedJSON_Array;
          readonly required?: undefined;
          readonly requiredIf?: undefined;
        } |
        {
          readonly required: false;
          readonly defaultValue?: undefined;
          readonly requiredIf?: undefined;
        }
      ) &
      {
        readonly nullSubstitution?: ParsedJSON_Array;
      };


  /* --- Uniform element indexes associative value/property --------------------------------------------------------- */
  export type UniformElementsAssociativeArrayValueSpecification =
      ValueSpecification__CommonParameters &
      AssociativeArrayTypeValueSpecification &
      {
        readonly type: ValuesTypesIDs.associativeArrayOfUniformTypeValues | MapConstructor;
        readonly value: CertainTypeValueSpecification;
        readonly requiredKeys?: Array<string>;
        readonly allowedKeys?: Array<string>;
        readonly keysRenamings?: { [rawKey: string]: string; };
        readonly allowUndefinedTypeValues?: boolean;
        readonly allowNullValues?: boolean;
        readonly customValidators?: CustomValidator<ArbitraryObject> | Array<CustomValidator<ArbitraryObject>>;
        readonly postValidationModifications?:
            ((validValue: ArbitraryObject) => ArbitraryObject) | Array<(validValue: ArbitraryObject) => ArbitraryObject>;
      };

  export type NestedUniformElementsAssociativeArrayPropertySpecification =
      ObjectPropertySpecification &
      UniformElementsAssociativeArrayValueSpecification &
      (
        {
          readonly required: true;
          readonly defaultValue?: undefined;
          readonly requiredIf?: undefined;
        } |
        {
          readonly requiredIf: PropertyRequirementCondition;
          readonly required?: undefined;
          readonly defaultValue?: undefined;
        } |
        {
          readonly defaultValue: ParsedJSON_NestedProperty;
          readonly required?: undefined;
          readonly requiredIf?: undefined;
        } |
        {
          readonly required: false;
          readonly defaultValue?: undefined;
          readonly requiredIf?: undefined;
        }
      ) &
      {
        readonly nullSubstitution?: ParsedJSON_Object;
        readonly postValidationModifications?:
            (validValue: ArbitraryObject) => ArbitraryObject | Array<(validValue: ArbitraryObject) => ArbitraryObject>;
      };


  /* --- Alternating value/property --------------------------------------------------------------------------------- */
  export type MultipleTypesAllowedValueSpecification =
      ValueSpecification__CommonParameters &
      {
        readonly type: ValuesTypesIDs.oneOf;
        readonly alternatives: Array<CertainTypeValueSpecification>;
        readonly nullSubstitution?: ParsedJSON_NestedProperty;
        readonly customValidators?: CustomValidator<ParsedJSON_NestedProperty>
            | Array<CustomValidator<ParsedJSON_NestedProperty>>;
        readonly postValidationModifications?:
            (validValue: ParsedJSON_NestedProperty) => ParsedJSON_NestedProperty |
            Array<(validValue: ParsedJSON_NestedProperty) => ParsedJSON_NestedProperty>;
      };


  type MultipleTypesAllowedPropertySpecification =
      ObjectPropertySpecification &
      MultipleTypesAllowedValueSpecification &
      (
        {
          readonly required: true;
          readonly defaultValue?: undefined;
          readonly requiredIf?: undefined;
        } |
        {
          readonly requiredIf: PropertyRequirementCondition;
          readonly required?: undefined;
          readonly defaultValue?: undefined;
        } |
        {
          readonly defaultValue: ParsedJSON_NestedProperty;
          readonly required?: undefined;
          readonly requiredIf?: undefined;
        } |
        {
          readonly required: false;
          readonly defaultValue?: undefined;
          readonly requiredIf?: undefined;
        }
      );


  export type Localization = {

    readonly errorMessageBasicTemplate: (payload: Localization.DataForMessagesBuilding) => string;

    readonly buildErrorMessagesListItemHeading: (messageNumber: number) => string;

    readonly rawDataIsNullErrorMessage: string;

    readonly buildRawDataIsNotObjectErrorMessage: (realType: string) => string;

    readonly buildValueTypeDoesNotMatchWithExpectedErrorMessageTextData: (
      payload: Pick<Localization.PropertyDataForMessagesBuilding, "targetPropertyValue"> & {
        targetPropertyValueSpecification: Exclude<CertainTypeValueSpecification, MultipleTypesAllowedValueSpecification>;
      }
    ) => Localization.TextDataForErrorMessagesBuilding;

    readonly buildPreValidationModificationFailedErrorMessageTextData: (
      thrownError: unknown
    ) => Localization.TextDataForErrorMessagesBuilding;


    /* === Requirement ============================================================================================== */
    readonly requiredPropertyIsMissingErrorMessageTextData: Localization.TextDataForErrorMessagesBuilding;

    readonly buildConditionallyRequiredPropertyIsMissingErrorMessageTextData: (
      verbalRequirementCondition: string
    ) => Localization.TextDataForErrorMessagesBuilding;


    /* === Nullability ============================================================================================== */
    readonly nonNullableValueIsNullErrorMessageTextData: Localization.TextDataForErrorMessagesBuilding;


    /* === Indexed arrays =========================================================================================== */
    readonly buildIndexedArrayElementsCountIsLessThanRequiredMinimumErrorMessageTextData:
        (minimalElementsCount: { minimalElementsCount: number; actualElementsCount: number; }) =>
            Localization.TextDataForErrorMessagesBuilding;

    readonly buildIndexedArrayElementsCountIsMoreThanAllowedMaximumErrorMessageTextData:
        (maximalElementsCount: { maximalElementsCount: number; actualElementsCount: number; }) =>
            Localization.TextDataForErrorMessagesBuilding;

    readonly buildIndexedArrayElementsCountDoesNotMatchWithSpecifiedExactNumberErrorMessageTextData:
        (parametersObject: { exactElementsCount: number; actualElementsCount: number; }) =>
            Localization.TextDataForErrorMessagesBuilding;

    readonly indexedArrayDisallowedUndefinedElementErrorMessageTextData: Localization.TextDataForErrorMessagesBuilding;

    readonly indexedArrayDisallowedNullElementErrorMessageTextData: Localization.TextDataForErrorMessagesBuilding;


    /* === Associative arrays ======================================================================================= */
    readonly buildAssociativeArrayEntriesCountIsLessThanRequiredMinimumErrorMessageTextData:
        (minimalElementsCount: { minimalEntriesCount: number; actualEntriesCount: number; })
            => Localization.TextDataForErrorMessagesBuilding;

    readonly buildAssociativeArrayEntriesCountIsMoreThanAllowedMaximumErrorMessageTextData:
        (maximalElementsCount: { maximalEntriesCount: number; actualEntriesCount: number; })
            => Localization.TextDataForErrorMessagesBuilding;

    readonly buildAssociativeArrayEntriesCountDoesNotMatchWithSpecifiedExactNumberErrorMessageTextData:
        (parametersObject: { exactEntriesCount: number; actualEntriesCount: number; })
            => Localization.TextDataForErrorMessagesBuilding;

    readonly buildRequiredKeysOfAssociativeArrayAreMissingErrorMessageTextData: (
      missingRequiredKeys: Array<string>
    ) => Localization.TextDataForErrorMessagesBuilding;

    readonly buildRequiredAlternativeKeysOfAssociativeArrayAreMissingErrorMessageTextData: (
      allowedAlternatives: ReadonlyArray<string>
    ) => Localization.TextDataForErrorMessagesBuilding;

    readonly buildDisallowedKeysFoundInAssociativeArrayErrorMessageTextData: (
        requiredKeysAlternatives: Array<string>
    ) => Localization.TextDataForErrorMessagesBuilding;

    readonly associativeArrayDisallowedUndefinedValueErrorMessageTextData: Localization.TextDataForErrorMessagesBuilding;

    readonly associativeArrayDisallowedNullValueErrorMessageTextData: Localization.TextDataForErrorMessagesBuilding;


    /* === Value type =============================================================================================== */
    readonly valueType: (valueType: Localization.ValuesTypes) => string;

    readonly numbersSet: (numberSet: NumbersSets) => string;


    /* === Numeric value ============================================================================================ */
    readonly buildNumberValueIsNotBelongToExpectedNumbersSetErrorMessageTextData: (expectedNumbersSet: NumbersSets) =>
        Localization.TextDataForErrorMessagesBuilding;

    readonly buildValueIsNotAmongAllowedAlternativesErrorMessageTextData: (allowedAlternatives: ReadonlyArray<string>) =>
        Localization.TextDataForErrorMessagesBuilding;

    readonly buildNumericValueIsSmallerThanRequiredMinimumErrorMessageTextData: (requiredMinimum: number) =>
        Localization.TextDataForErrorMessagesBuilding;

    readonly buildNumericValueIsGreaterThanAllowedMaximumErrorMessageTextData: (allowedMaximum: number) =>
        Localization.TextDataForErrorMessagesBuilding;


    /* === String value ============================================================================================= */
    readonly buildCharactersCountIsLessThanRequiredErrorMessageTextData: (
      payload: { minimalCharactersCount: number; realCharactersCount: number; }
    ) => Localization.TextDataForErrorMessagesBuilding;

    readonly buildCharactersCountIsMoreThanAllowedErrorMessageTextData: (
      payload: { maximalCharactersCount: number; realCharactersCount: number; }
    ) => Localization.TextDataForErrorMessagesBuilding;

    readonly buildCharactersCountDoesNotMatchWithSpecifiedErrorMessageTextData: (
      payload: { fixedCharactersCount: number; realCharactersCount: number; }
    ) => Localization.TextDataForErrorMessagesBuilding;

    readonly buildRegularExpressionMismatchErrorMessageTextData: (regularExpression: RegExp) =>
        Localization.TextDataForErrorMessagesBuilding;


    /* === Boolean value ============================================================================================ */
    readonly buildDisallowedBooleanValueVariantErrorMessageTextData: (disallowedVariant: boolean) =>
        Localization.TextDataForErrorMessagesBuilding;

    readonly buildIncompatibleValuesTypesAlternativesErrorDescription: (
      targetValueSpecification: MultipleTypesAllowedValueSpecification
    ) => string;

    readonly buildUnsupportedValueTypeErrorMessageTextData: (
      propertyDataForMessagesBuilding: Localization.PropertyDataForMessagesBuilding
    ) => Localization.TextDataForErrorMessagesBuilding;

    readonly buildCustomValidationFailedErrorMessageTextData: (customValidationDescription: string) =>
        Localization.TextDataForErrorMessagesBuilding;
  };


  export namespace Localization {

    export type PropertyDataForMessagesBuilding = {
      targetPropertyDotSeparatedQualifiedName: string;
      targetPropertyNewName: string | null;
      targetPropertyValue: unknown;
      targetPropertyValueSpecification: CertainTypeValueSpecification;
      targetPropertyStringifiedValueBeforeFirstPreValidationModification?: string;
    };

    export type TextDataForErrorMessagesBuilding = {
      title: string;
      specificMessagePart: string;
    };

    export type DataForMessagesBuilding = PropertyDataForMessagesBuilding & TextDataForErrorMessagesBuilding;

    export type ValuesTypes =
        NumberConstructor |
        StringConstructor |
        BooleanConstructor |
        ObjectConstructor |
        ArrayConstructor |
        MapConstructor |
        ValuesTypesIDs;
  }

  export class ValidationErrorsMessagesBuilder {

    private readonly localization: Localization;
    private readonly buildErrorMessage: (payload: Localization.DataForMessagesBuilding) => string;

    public constructor(localization: Localization) {
      this.localization = localization;
      this.buildErrorMessage = localization.errorMessageBasicTemplate.bind(this.localization);
    }

    public get rawDataIsNullErrorMessage(): string {
      return this.localization.rawDataIsNullErrorMessage;
    }

    public buildRawDataIsNotObjectErrorMessage(realType: string): string {
      return this.localization.buildRawDataIsNotObjectErrorMessage(realType);
    }

    public buildValueTypeDoesNotMatchWithExpectedErrorMessage(
      payload: Omit<Localization.PropertyDataForMessagesBuilding, "targetPropertyValueSpecification"> &
          { targetPropertyValueSpecification: Exclude<CertainTypeValueSpecification, MultipleTypesAllowedValueSpecification>; }
    ): string {
      return this.buildErrorMessage({
        ...payload,
        ...this.localization.buildValueTypeDoesNotMatchWithExpectedErrorMessageTextData({
          targetPropertyValue: payload.targetPropertyValue,
          targetPropertyValueSpecification: payload.targetPropertyValueSpecification
        })
      });
    }

    public buildPreValidationModificationFailedErrorMessage(
      payload: Localization.PropertyDataForMessagesBuilding & { thrownError: unknown; }
    ): string {
      return this.buildErrorMessage({
        ...payload,
        ...this.localization.buildPreValidationModificationFailedErrorMessageTextData(payload.thrownError)
      });
    }


    /* === Requirement ============================================================================================== */
    public buildRequiredPropertyIsMissingErrorMessage(payload: Localization.PropertyDataForMessagesBuilding): string {
      return this.buildErrorMessage({
        ...payload,
        ...this.localization.requiredPropertyIsMissingErrorMessageTextData
      });
    }

    public buildConditionallyRequiredPropertyIsMissingWhileRequirementConditionSatisfiedErrorMessage(
      payload: Localization.PropertyDataForMessagesBuilding & { requirementConditionDescription: string; }
    ): string {
      return this.buildErrorMessage({
        ...payload,
        ...this.localization.buildConditionallyRequiredPropertyIsMissingErrorMessageTextData(
          payload.requirementConditionDescription
        )
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
      payload: Localization.PropertyDataForMessagesBuilding & { requiredKeysAlternatives: Array<string>; }
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
