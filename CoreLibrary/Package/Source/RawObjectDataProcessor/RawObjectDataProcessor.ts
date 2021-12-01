/* 〔 ESLint muting rationale 〕 This module has second namespaced helper class which is not a common case.  */
/* eslint-disable max-classes-per-file */
/* eslint max-depth: [ "error", 6 ] */

import { ArbitraryObject } from "../Types/ArbitraryObject";
import { ParsedJSON_Array, ParsedJSON_NestedProperty, ParsedJSON_Object } from "../Types/ParsedJSON";

import RawObjectDataProcessorLocalization__English from "./RawObjectDataProcessorLocalization__English";

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
import substituteWhenUndefined from "../DefaultValueSubstituters/substituteWhenUndefined";

import Logger from "../Logging/Logger";
import InvalidParameterValueError from "../Logging/Errors/InvalidParameterValue/InvalidParameterValueError";


class RawObjectDataProcessor {

  private static defaultLocalization: RawObjectDataProcessor.Localization = RawObjectDataProcessorLocalization__English;

  private readonly rawData: ArbitraryObject;
  private readonly fullDataSpecification: RawObjectDataProcessor.ObjectDataSpecification;
  private readonly processingApproach: RawObjectDataProcessor.ProcessingApproaches;

  private currentlyIteratedObjectPropertyQualifiedNameSegmentsForLogging: Array<string | number> = [];
  private currentlyIteratedPropertyNewNameForLogging: string | null = null;

  private readonly validationErrorsMessagesBuilder: RawObjectDataProcessor.ValidationErrorsMessagesBuilder;
  private readonly validationErrorsMessages: Array<string> = [];

  private rawDataIsInvalid: boolean = false;


  public static process<ProcessedData extends ArbitraryObject, InterimValidData extends ArbitraryObject = ProcessedData>(
    rawData: unknown,
    validDataSpecification: RawObjectDataProcessor.ObjectDataSpecification,
    options: RawObjectDataProcessor.Options = {}
  ): RawObjectDataProcessor.ProcessingResult<ProcessedData> {

    const localization: RawObjectDataProcessor.Localization =
        substituteWhenUndefined(options.localization, RawObjectDataProcessor.defaultLocalization);
    const validationErrorsMessagesBuilder: RawObjectDataProcessor.ValidationErrorsMessagesBuilder =
        new RawObjectDataProcessor.ValidationErrorsMessagesBuilder(localization);

    /* [ Theory ]
    * Because `typeof null === "object"`, besides `typeof` it's required to check for the null value for the accurate
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
      processingApproach: RawObjectDataProcessor.ProcessingApproaches.newObjectAssembling,
      validationErrorsMessagesBuilder
    });

    let rawDataProcessingResult: RawObjectDataProcessor.ValueProcessingResult;

    switch (validDataSpecification.subtype) {

      case RawObjectDataProcessor.ObjectSubtypes.fixedKeyAndValuePairsObject: {
        rawDataProcessingResult = dataHoldingSelfInstance.processFixedKeyAndValuePairsNonNullObjectTypeValue({
          targetValue__expectedToBeObject: rawData,
          targetObjectTypeValueSpecification: {
            ...validDataSpecification,
            ...{ type: RawObjectDataProcessor.ValuesTypesIDs.fixedKeyAndValuePairsObject }
          },
          parentObject: rawData,
          targetValueBeforeFirstPreValidationModification: rawData,
          mustLogTargetValueAsItWasBeforeFirstPreValidationModification: false
        });
        break;
      }

      case RawObjectDataProcessor.ObjectSubtypes.indexedArray: {
        rawDataProcessingResult = dataHoldingSelfInstance.processIndexedArrayTypeValue({
          targetValue__expectedToBeIndexedArray: dataHoldingSelfInstance.rawData,
          targetIndexedArrayTypeValueSpecification: {
            ...validDataSpecification,
            ...{ type: RawObjectDataProcessor.ValuesTypesIDs.indexedArrayOfUniformElements }
          },
          parentObject: rawData,
          targetValueBeforeFirstPreValidationModification: rawData,
          mustLogTargetValueAsItWasBeforeFirstPreValidationModification: false
        });
        break;
      }

      case RawObjectDataProcessor.ObjectSubtypes.associativeArray: {
        rawDataProcessingResult = dataHoldingSelfInstance.processAssociativeArrayTypeValue({
          targetValue__expectedToBeAssociativeArrayTypeObject: dataHoldingSelfInstance.rawData,
          targetAssociativeArrayTypeValueSpecification: {
            ...validDataSpecification,
            ...{ type: RawObjectDataProcessor.ValuesTypesIDs.associativeArrayOfUniformTypeValues }
          },
          parentObject: rawData,
          targetValueBeforeFirstPreValidationModification: rawData,
          mustLogTargetValueAsItWasBeforeFirstPreValidationModification: false
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

    /* [ Theory ] While type aliases and interfaces are not existing for he JavaScript it's impossible to guarantee
    *   programatically that some value has object-based type 'X'. Nothing left except believe the user that 'ProcessedData'
    * is corresponding to 'validDataSpecification'. */
    if (isNotUndefined(options.postProcessing)) {
      processedData = options.postProcessing<InterimValidData, ProcessedData>(
        rawDataProcessingResult.processedValue as InterimValidData
      );
    } else {
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
      (accumulatingValue: string, message: string, index: number): string => `${accumulatingValue}\n\n` +
          `${localization.errorMessagesListItemHeadingTemplate(index + 1)}\n` +
          `${message}`, ""
    );
  }

  public static setDefaultLocalization(newLocalization: RawObjectDataProcessor.Localization): void {
    RawObjectDataProcessor.defaultLocalization = newLocalization;
  }


  private constructor(
    parametersObject: {
      rawData: ArbitraryObject;
      fullDataSpecification: RawObjectDataProcessor.ObjectDataSpecification;
      processingApproach: RawObjectDataProcessor.ProcessingApproaches;
      validationErrorsMessagesBuilder: RawObjectDataProcessor.ValidationErrorsMessagesBuilder;
    }
  ) {
    this.rawData = parametersObject.rawData;
    this.fullDataSpecification = parametersObject.fullDataSpecification;
    this.currentlyIteratedObjectPropertyQualifiedNameSegmentsForLogging[0] = this.fullDataSpecification.nameForLogging;
    this.processingApproach = parametersObject.processingApproach;
    this.validationErrorsMessagesBuilder = parametersObject.validationErrorsMessagesBuilder;
  }


  private processFixedKeyAndValuePairsNonNullObjectTypeValue(
    {
      targetValue__expectedToBeObject,
      targetObjectTypeValueSpecification,
      parentObject,
      targetValueBeforeFirstPreValidationModification,
      mustLogTargetValueAsItWasBeforeFirstPreValidationModification
    }: {
      targetValue__expectedToBeObject: unknown;
      targetObjectTypeValueSpecification: RawObjectDataProcessor.FixedKeyAndValuePairsObjectValueSpecification;
      parentObject: ArbitraryObject;
      targetValueBeforeFirstPreValidationModification: unknown;
      mustLogTargetValueAsItWasBeforeFirstPreValidationModification: boolean;
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
          targetPropertyValueBeforeFirstPreValidationModification: targetValueBeforeFirstPreValidationModification,
          mustLogTargetPropertyValueBeforeFirstPreValidationModification:
              mustLogTargetValueAsItWasBeforeFirstPreValidationModification
        })
      );
      return { isInvalid: true };
    }


    let processedValueWorkpiece: ArbitraryObject =
        this.processingApproach === RawObjectDataProcessor.ProcessingApproaches.existingObjectManipulation ?
            targetValue__expectedToBeObject : {};

    const currentObjectDepthLevel__countFromZero: number =
        this.currentlyIteratedObjectPropertyQualifiedNameSegmentsForLogging.length;


    let oneOnMorePropertiesAreInvalid: boolean = false;

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
      const childPropertyValueBeforeFirstPreValidationModification: unknown = childPropertyValue;


      const preValidationModifications: Array<RawObjectDataProcessor.PreValidationModification> =
          RawObjectDataProcessor.getNormalizedPreValidationModifications(childPropertySpecification.preValidationModifications);
      const mustLogChildPropertyValueAsItWasBeforeFirstPreValidationModification: boolean = preValidationModifications.length > 0;

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
              targetPropertyValueBeforeFirstPreValidationModification: childPropertyValueBeforeFirstPreValidationModification,
              mustLogTargetPropertyValueBeforeFirstPreValidationModification:
                  mustLogChildPropertyValueAsItWasBeforeFirstPreValidationModification,
              thrownError: error
            })
          );
        }
      }


      if (isUndefined(childPropertyValue)) {

        if (childPropertySpecification.required === true) {

          oneOnMorePropertiesAreInvalid = true;

          this.registerValidationError(
            this.validationErrorsMessagesBuilder.buildRequiredPropertyIsMissingErrorMessage({
              targetPropertyDotSeparatedQualifiedName: this.currentObjectPropertyDotSeparatedQualifiedName,
              targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
              targetPropertyValue: childPropertyValue,
              targetPropertyValueSpecification: childPropertySpecification,
              targetPropertyValueBeforeFirstPreValidationModification: childPropertyValueBeforeFirstPreValidationModification,
              mustLogTargetPropertyValueBeforeFirstPreValidationModification:
                  mustLogChildPropertyValueAsItWasBeforeFirstPreValidationModification
            })
          );

          continue;
        }


        if (
          isNotUndefined(childPropertySpecification.requiredIf) &&
          childPropertySpecification.requiredIf.predicate(targetValue__expectedToBeObject, this.rawData)
        ) {

          oneOnMorePropertiesAreInvalid = true;

          this.registerValidationError(
            this.validationErrorsMessagesBuilder.
                buildConditionallyRequiredPropertyIsMissingWhileRequirementConditionSatisfiedErrorMessage({
                  targetPropertyDotSeparatedQualifiedName: this.currentObjectPropertyDotSeparatedQualifiedName,
                  targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
                  targetPropertyValue: childPropertyValue,
                  targetPropertyValueSpecification: childPropertySpecification,
                  targetPropertyValueBeforeFirstPreValidationModification: childPropertyValueBeforeFirstPreValidationModification,
                  mustLogTargetPropertyValueBeforeFirstPreValidationModification:
                      mustLogChildPropertyValueAsItWasBeforeFirstPreValidationModification,
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
              *  If 'configurable === false', the descriptions could not be changed
              *  1. If 'childPropertyName' and 'childPropertyFinalName' are different and
              *     'childPropertySpecification.leaveEvenIfRenamed !== true', and also property is not configurable,
              *     the 'childPropertyName' could not be deleted (warning will be enough).
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

          oneOnMorePropertiesAreInvalid = true;

          this.registerValidationError(this.validationErrorsMessagesBuilder.buildNonNullableValueIsNullErrorMessage({
            targetPropertyDotSeparatedQualifiedName: this.currentObjectPropertyDotSeparatedQualifiedName,
            targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
            targetPropertyValue: childPropertyValue,
            targetPropertyValueSpecification: childPropertySpecification,
            targetPropertyValueBeforeFirstPreValidationModification: childPropertyValueBeforeFirstPreValidationModification,
            mustLogTargetPropertyValueBeforeFirstPreValidationModification:
                mustLogChildPropertyValueAsItWasBeforeFirstPreValidationModification
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
              /* ※ Reserved for the future. */
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
            targetValueBeforeFirstPreValidationModification: childPropertyValueBeforeFirstPreValidationModification,
            mustLogTargetValueAsItWasBeforeFirstPreValidationModification:
                mustLogChildPropertyValueAsItWasBeforeFirstPreValidationModification
          });


      switch (this.processingApproach) {

        case RawObjectDataProcessor.ProcessingApproaches.newObjectAssembling: {

          if ("isInvalid" in childPropertyValueProcessingResult) {
            oneOnMorePropertiesAreInvalid = true;
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
          /* ※ Reserved for the future. */
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
        rawData__currentObjectDepth: parentObject
      })) {

        oneOnMorePropertiesAreInvalid = true;

        this.registerValidationError(
          this.validationErrorsMessagesBuilder.buildCustomValidationFailedErrorMessageTextData({
            targetPropertyDotSeparatedQualifiedName: this.currentObjectPropertyDotSeparatedQualifiedName,
            targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
            targetPropertyValue: targetValue__expectedToBeObject,
            targetPropertyValueSpecification: targetObjectTypeValueSpecification,
            customValidationDescription: customValidator.descriptionForLogging,
            targetPropertyValueBeforeFirstPreValidationModification: targetValueBeforeFirstPreValidationModification,
            mustLogTargetPropertyValueBeforeFirstPreValidationModification:
            mustLogTargetValueAsItWasBeforeFirstPreValidationModification
          })
        );
      }
    }


    if (oneOnMorePropertiesAreInvalid) {
      return { isInvalid: true };
    } else if (this.isValidationOnlyMode) {
      return { isValidButValidationOnlyModeActive: true };
    }


    for (
      const postValidationModification of RawObjectDataProcessor.
          getNormalizedPostValidationModifications(targetObjectTypeValueSpecification.postValidationModifications)
    ) {
      processedValueWorkpiece = postValidationModification(targetValue__expectedToBeObject);
    }


    return { processedValue: processedValueWorkpiece as ParsedJSON_NestedProperty };
  }


  private processIndexedArrayTypeValue(
    {
      targetValue__expectedToBeIndexedArray,
      targetIndexedArrayTypeValueSpecification,
      parentObject,
      targetValueBeforeFirstPreValidationModification,
      mustLogTargetValueAsItWasBeforeFirstPreValidationModification
    }: {
      targetValue__expectedToBeIndexedArray: unknown;
      targetIndexedArrayTypeValueSpecification: RawObjectDataProcessor.UniformElementsIndexedArrayValueSpecification;
      parentObject: ArbitraryObject;
      targetValueBeforeFirstPreValidationModification: unknown;
      mustLogTargetValueAsItWasBeforeFirstPreValidationModification: boolean;
    }
  ): RawObjectDataProcessor.ValueProcessingResult {

    if (!Array.isArray(targetValue__expectedToBeIndexedArray)) {
      this.registerValidationError(
        this.validationErrorsMessagesBuilder.buildValueTypeDoesNotMatchWithExpectedErrorMessage({
          targetPropertyDotSeparatedQualifiedName: this.currentObjectPropertyDotSeparatedQualifiedName,
          targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
          targetPropertyValue: targetValue__expectedToBeIndexedArray,
          targetPropertyValueSpecification: targetIndexedArrayTypeValueSpecification,
          targetPropertyValueBeforeFirstPreValidationModification: targetValueBeforeFirstPreValidationModification,
          mustLogTargetPropertyValueBeforeFirstPreValidationModification:
              mustLogTargetValueAsItWasBeforeFirstPreValidationModification
        })
      );
      return { isInvalid: true };
    }


    let targetIndexedArrayTypeValueIsInvalid: boolean = false;

    if (
      isNotUndefined(targetIndexedArrayTypeValueSpecification.minimalElementsCount) &&
      targetValue__expectedToBeIndexedArray.length < targetIndexedArrayTypeValueSpecification.minimalElementsCount
    ) {

      targetIndexedArrayTypeValueIsInvalid = true;

      this.registerValidationError(
        this.validationErrorsMessagesBuilder.buildIndexedArrayElementCountIsLessThanRequiredMinimumErrorMessage({
          targetPropertyDotSeparatedQualifiedName: this.currentObjectPropertyDotSeparatedQualifiedName,
          targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
          targetPropertyValue: targetValue__expectedToBeIndexedArray,
          targetPropertyValueSpecification: targetIndexedArrayTypeValueSpecification,
          targetPropertyValueBeforeFirstPreValidationModification: targetValueBeforeFirstPreValidationModification,
          mustLogTargetPropertyValueBeforeFirstPreValidationModification:
              mustLogTargetValueAsItWasBeforeFirstPreValidationModification,
          minimalElementsCount: targetIndexedArrayTypeValueSpecification.minimalElementsCount,
          actualElementsCount: targetValue__expectedToBeIndexedArray.length
        })
      );
    }


    if (
      isNotUndefined(targetIndexedArrayTypeValueSpecification.maximalElementsCount) &&
      targetValue__expectedToBeIndexedArray.length > targetIndexedArrayTypeValueSpecification.maximalElementsCount
    ) {

      targetIndexedArrayTypeValueIsInvalid = true;

      this.registerValidationError(
        this.validationErrorsMessagesBuilder.buildIndexedArrayElementCountIsMoreThanAllowedMaximumErrorMessage({
          targetPropertyDotSeparatedQualifiedName: this.currentObjectPropertyDotSeparatedQualifiedName,
          targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
          targetPropertyValue: targetValue__expectedToBeIndexedArray,
          targetPropertyValueSpecification: targetIndexedArrayTypeValueSpecification,
          targetPropertyValueBeforeFirstPreValidationModification: targetValueBeforeFirstPreValidationModification,
          mustLogTargetPropertyValueBeforeFirstPreValidationModification:
              mustLogTargetValueAsItWasBeforeFirstPreValidationModification,
          maximalElementsCount: targetIndexedArrayTypeValueSpecification.maximalElementsCount,
          actualElementsCount: targetValue__expectedToBeIndexedArray.length
        })
      );
    }


    if (
      isNotUndefined(targetIndexedArrayTypeValueSpecification.exactElementsCount) &&
      targetValue__expectedToBeIndexedArray.length !== targetIndexedArrayTypeValueSpecification.exactElementsCount
    ) {

      targetIndexedArrayTypeValueIsInvalid = true;

      this.registerValidationError(
        this.validationErrorsMessagesBuilder.buildIndexedArrayElementCountIsDoesNotMatchWithSpecifiedExactNumberErrorMessage({
          targetPropertyDotSeparatedQualifiedName: this.currentObjectPropertyDotSeparatedQualifiedName,
          targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
          targetPropertyValue: targetValue__expectedToBeIndexedArray,
          targetPropertyValueSpecification: targetIndexedArrayTypeValueSpecification,
          targetPropertyValueBeforeFirstPreValidationModification: targetValueBeforeFirstPreValidationModification,
          mustLogTargetPropertyValueBeforeFirstPreValidationModification:
              mustLogTargetValueAsItWasBeforeFirstPreValidationModification,
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

    let oneOnMoreElementsAreInvalid: boolean = false;

    for (const [ index, _element ] of targetValue__expectedToBeIndexedArray.entries()) {

      this.currentlyIteratedObjectPropertyQualifiedNameSegmentsForLogging[currentObjectDepthLevel__beginWithZero] = index;

      const preValidationModifications: Array<RawObjectDataProcessor.PreValidationModification> = RawObjectDataProcessor.
          getNormalizedPreValidationModifications(targetIndexedArrayTypeValueSpecification.element.preValidationModifications);
      const elementBeforeFirstPreValidationModification: unknown = _element;
      const mustLogElementAsItWasBeforeFirstPreValidationModification: boolean = preValidationModifications.length > 0;
      let element: unknown = _element;

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
              targetPropertyValueBeforeFirstPreValidationModification: elementBeforeFirstPreValidationModification,
              mustLogTargetPropertyValueBeforeFirstPreValidationModification:
                  mustLogElementAsItWasBeforeFirstPreValidationModification,
              thrownError: error
            })
          );
        }
      }


      if (isUndefined(element)) {

        if (targetIndexedArrayTypeValueSpecification.allowUndefinedTypeElements !== true) {

          oneOnMoreElementsAreInvalid = true;

          this.registerValidationError(
            this.validationErrorsMessagesBuilder.buildIndexedArrayDisallowedUndefinedElementErrorMessage({
              targetPropertyDotSeparatedQualifiedName: this.currentObjectPropertyDotSeparatedQualifiedName,
              targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
              targetPropertyValue: targetValue__expectedToBeIndexedArray,
              targetPropertyValueSpecification: targetIndexedArrayTypeValueSpecification,
              targetPropertyValueBeforeFirstPreValidationModification: elementBeforeFirstPreValidationModification,
              mustLogTargetPropertyValueBeforeFirstPreValidationModification:
                  mustLogElementAsItWasBeforeFirstPreValidationModification
            })
          );
        }

        continue;
      }


      if (isNull(element)) {

        if (targetIndexedArrayTypeValueSpecification.allowNullElements !== true) {

          oneOnMoreElementsAreInvalid = true;

          this.registerValidationError(
            this.validationErrorsMessagesBuilder.buildIndexedArrayDisallowedNullElementErrorMessage({
              targetPropertyDotSeparatedQualifiedName: this.currentObjectPropertyDotSeparatedQualifiedName,
              targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
              targetPropertyValue: targetValue__expectedToBeIndexedArray,
              targetPropertyValueSpecification: targetIndexedArrayTypeValueSpecification,
              targetPropertyValueBeforeFirstPreValidationModification: elementBeforeFirstPreValidationModification,
              mustLogTargetPropertyValueBeforeFirstPreValidationModification:
                  mustLogElementAsItWasBeforeFirstPreValidationModification
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
            targetValueBeforeFirstPreValidationModification: elementBeforeFirstPreValidationModification,
            mustLogTargetValueAsItWasBeforeFirstPreValidationModification:
                mustLogElementAsItWasBeforeFirstPreValidationModification
          });


      switch (this.processingApproach) {

        case RawObjectDataProcessor.ProcessingApproaches.newObjectAssembling: {

          if ("isInvalid" in elementProcessingResult) {
            oneOnMoreElementsAreInvalid = true;
            continue;
          } else if ("isValidButValidationOnlyModeActive" in elementProcessingResult) {
            continue;
          }

          processedValueWorkpiece[index] = elementProcessingResult.processedValue;

          break;
        }

        case RawObjectDataProcessor.ProcessingApproaches.existingObjectManipulation: {
          /* ※ Reserved for the future. */
        }
      }
    }

    this.currentlyIteratedObjectPropertyQualifiedNameSegmentsForLogging.splice(-1, 1);


    for (
      const customValidator of
      RawObjectDataProcessor.getNormalizedCustomValidators(targetIndexedArrayTypeValueSpecification.customValidators)
    ) {

      if (!customValidator.validationFunction({
        currentPropertyValue: targetValue__expectedToBeIndexedArray as ParsedJSON_Array,
        rawData__full: this.rawData,
        rawData__currentObjectDepth: parentObject
      })) {

        oneOnMoreElementsAreInvalid = true;

        this.registerValidationError(
          this.validationErrorsMessagesBuilder.buildCustomValidationFailedErrorMessageTextData({
            targetPropertyDotSeparatedQualifiedName: this.currentObjectPropertyDotSeparatedQualifiedName,
            targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
            targetPropertyValue: targetValue__expectedToBeIndexedArray,
            targetPropertyValueSpecification: targetIndexedArrayTypeValueSpecification,
            customValidationDescription: customValidator.descriptionForLogging,
            targetPropertyValueBeforeFirstPreValidationModification: targetValueBeforeFirstPreValidationModification,
            mustLogTargetPropertyValueBeforeFirstPreValidationModification:
            mustLogTargetValueAsItWasBeforeFirstPreValidationModification
          })
        );
      }
    }


    if (targetIndexedArrayTypeValueIsInvalid || oneOnMoreElementsAreInvalid) {
      return { isInvalid: true };
    } else if (this.isValidationOnlyMode) {
      return { isValidButValidationOnlyModeActive: true };
    }


    for (
      const postValidationModification of RawObjectDataProcessor.
          getNormalizedPostValidationModifications(targetIndexedArrayTypeValueSpecification.postValidationModifications)
    ) {
      processedValueWorkpiece = postValidationModification(targetValue__expectedToBeIndexedArray as ParsedJSON_Array);
    }


    return { processedValue: processedValueWorkpiece as ParsedJSON_Array };
  }


  private processAssociativeArrayTypeValue(
    {
      targetValue__expectedToBeAssociativeArrayTypeObject,
      targetAssociativeArrayTypeValueSpecification,
      parentObject,
      targetValueBeforeFirstPreValidationModification,
      mustLogTargetValueAsItWasBeforeFirstPreValidationModification
    }: {
      targetValue__expectedToBeAssociativeArrayTypeObject: unknown;
      targetAssociativeArrayTypeValueSpecification: RawObjectDataProcessor.UniformElementsAssociativeArrayValueSpecification;
      parentObject: ArbitraryObject;
      targetValueBeforeFirstPreValidationModification: unknown;
      mustLogTargetValueAsItWasBeforeFirstPreValidationModification: boolean;
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
            targetPropertyValueBeforeFirstPreValidationModification: targetValueBeforeFirstPreValidationModification,
            mustLogTargetPropertyValueBeforeFirstPreValidationModification:
            mustLogTargetValueAsItWasBeforeFirstPreValidationModification
          })
      );
      return { isInvalid: true };
    }


    let targetAssociativeArrayTypeValueIsInvalid: boolean = false;

    if (
      isNotUndefined(targetAssociativeArrayTypeValueSpecification.minimalEntriesCount) &&
      Object.entries(targetValue__expectedToBeAssociativeArrayTypeObject).length <
            targetAssociativeArrayTypeValueSpecification.minimalEntriesCount
    ) {
      targetAssociativeArrayTypeValueIsInvalid = true;
      this.registerValidationError(
        this.validationErrorsMessagesBuilder.buildAssociativeArrayEntriesCountIsLessThanRequiredMinimumErrorMessage({
          targetPropertyDotSeparatedQualifiedName: this.currentObjectPropertyDotSeparatedQualifiedName,
          targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
          targetPropertyValue: targetValue__expectedToBeAssociativeArrayTypeObject,
          targetPropertyValueSpecification: targetAssociativeArrayTypeValueSpecification,
          targetPropertyValueBeforeFirstPreValidationModification: targetValueBeforeFirstPreValidationModification,
          mustLogTargetPropertyValueBeforeFirstPreValidationModification:
              mustLogTargetValueAsItWasBeforeFirstPreValidationModification,
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
      targetAssociativeArrayTypeValueIsInvalid = true;
      this.registerValidationError(
        this.validationErrorsMessagesBuilder.buildAssociativeArrayPairsCountIsMoreThanAllowedMaximumErrorMessage({
          targetPropertyDotSeparatedQualifiedName: this.currentObjectPropertyDotSeparatedQualifiedName,
          targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
          targetPropertyValue: targetValue__expectedToBeAssociativeArrayTypeObject,
          targetPropertyValueSpecification: targetAssociativeArrayTypeValueSpecification,
          targetPropertyValueBeforeFirstPreValidationModification: targetValueBeforeFirstPreValidationModification,
          mustLogTargetPropertyValueBeforeFirstPreValidationModification:
              mustLogTargetValueAsItWasBeforeFirstPreValidationModification,
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
      targetAssociativeArrayTypeValueIsInvalid = true;
      this.registerValidationError(
        this.validationErrorsMessagesBuilder.buildAssociativeArrayPairsCountDoesNotMatchWithSpecifiedExactNumberErrorMessage({
          targetPropertyDotSeparatedQualifiedName: this.currentObjectPropertyDotSeparatedQualifiedName,
          targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
          targetPropertyValue: targetValue__expectedToBeAssociativeArrayTypeObject,
          targetPropertyValueSpecification: targetAssociativeArrayTypeValueSpecification,
          targetPropertyValueBeforeFirstPreValidationModification: targetValueBeforeFirstPreValidationModification,
          mustLogTargetPropertyValueBeforeFirstPreValidationModification:
              mustLogTargetValueAsItWasBeforeFirstPreValidationModification,
          exactEntriesCount: targetAssociativeArrayTypeValueSpecification.exactEntriesCount,
          actualEntriesCount: Object.entries(targetValue__expectedToBeAssociativeArrayTypeObject).length
        })
      );
    }


    if (isNonEmptyArray(targetAssociativeArrayTypeValueSpecification.requiredKeys)) {

      const missingRequiredKeys: Array<string> = [ ...targetAssociativeArrayTypeValueSpecification.requiredKeys ].
        filter((key: string): boolean => !Object.keys(targetValue__expectedToBeAssociativeArrayTypeObject).includes(key));

      if (missingRequiredKeys.length > 0) {
        targetAssociativeArrayTypeValueIsInvalid = true;
        this.registerValidationError(
          this.validationErrorsMessagesBuilder.buildRequiredKeysOfAssociativeArrayAreMissingErrorMessage({
            targetPropertyDotSeparatedQualifiedName: this.currentObjectPropertyDotSeparatedQualifiedName,
            targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
            targetPropertyValue: targetValue__expectedToBeAssociativeArrayTypeObject,
            targetPropertyValueSpecification: targetAssociativeArrayTypeValueSpecification,
            targetPropertyValueBeforeFirstPreValidationModification: targetValueBeforeFirstPreValidationModification,
            mustLogTargetPropertyValueBeforeFirstPreValidationModification:
                mustLogTargetValueAsItWasBeforeFirstPreValidationModification,
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
        targetAssociativeArrayTypeValueIsInvalid = true;
        this.registerValidationError(
          this.validationErrorsMessagesBuilder.buildRequiredAlternativeKeysOfAssociativeArrayAreMissingErrorMessage({
            targetPropertyDotSeparatedQualifiedName: this.currentObjectPropertyDotSeparatedQualifiedName,
            targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
            targetPropertyValue: targetValue__expectedToBeAssociativeArrayTypeObject,
            targetPropertyValueSpecification: targetAssociativeArrayTypeValueSpecification,
            targetPropertyValueBeforeFirstPreValidationModification: targetValueBeforeFirstPreValidationModification,
            mustLogTargetPropertyValueBeforeFirstPreValidationModification:
                mustLogTargetValueAsItWasBeforeFirstPreValidationModification,
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
        targetAssociativeArrayTypeValueIsInvalid = true;
        this.registerValidationError(
          this.validationErrorsMessagesBuilder.buildDisallowedKeysFoundInAssociativeArrayErrorMessage({
            targetPropertyDotSeparatedQualifiedName: this.currentObjectPropertyDotSeparatedQualifiedName,
            targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
            targetPropertyValue: targetValue__expectedToBeAssociativeArrayTypeObject,
            targetPropertyValueSpecification: targetAssociativeArrayTypeValueSpecification,
            targetPropertyValueBeforeFirstPreValidationModification: targetValueBeforeFirstPreValidationModification,
            mustLogTargetPropertyValueBeforeFirstPreValidationModification:
                mustLogTargetValueAsItWasBeforeFirstPreValidationModification,
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

    let oneOnMoreValuesAreInvalid: boolean = false;

    for (const [ key, _value ] of Object.entries(targetValue__expectedToBeAssociativeArrayTypeObject)) {

      this.currentlyIteratedObjectPropertyQualifiedNameSegmentsForLogging[currentObjectDepthLevel__beginWithZero] = key;

      if (foundDisallowedKeys.includes(key)) {
        continue;
      }


      const preValidationModifications: Array<RawObjectDataProcessor.PreValidationModification> = RawObjectDataProcessor.
          getNormalizedPreValidationModifications(targetAssociativeArrayTypeValueSpecification.value.preValidationModifications);
      const valueBeforeFirstPreValidationModification: unknown = _value;
      const mustLogCurrentAssociativeArrayEntireValueAsItWasBeforeFirstPreValidationModification: boolean =
          preValidationModifications.length > 0;
      let value: unknown = _value;

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
              targetPropertyValueBeforeFirstPreValidationModification: valueBeforeFirstPreValidationModification,
              mustLogTargetPropertyValueBeforeFirstPreValidationModification:
                  mustLogCurrentAssociativeArrayEntireValueAsItWasBeforeFirstPreValidationModification,
              thrownError: error
            })
          );
        }
      }


      const keyFinalName: string = substituteWhenUndefined(
        substituteWhenUndefined(targetAssociativeArrayTypeValueSpecification.keysRenamings, {})[key], key
      );

      if (isUndefined(value)) {

        if (targetAssociativeArrayTypeValueSpecification.allowUndefinedTypeValues !== true) {

          oneOnMoreValuesAreInvalid = true;

          this.registerValidationError(
            this.validationErrorsMessagesBuilder.associativeArrayDisallowedUndefinedValueErrorMessage({
              targetPropertyDotSeparatedQualifiedName: this.currentObjectPropertyDotSeparatedQualifiedName,
              targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
              targetPropertyValue: targetValue__expectedToBeAssociativeArrayTypeObject,
              targetPropertyValueSpecification: targetAssociativeArrayTypeValueSpecification,
              mustLogTargetPropertyValueBeforeFirstPreValidationModification:
                  mustLogCurrentAssociativeArrayEntireValueAsItWasBeforeFirstPreValidationModification,
              targetPropertyValueBeforeFirstPreValidationModification: valueBeforeFirstPreValidationModification
            })
          );
        }

        continue;
      }

      if (isNull(value)) {

        if (targetAssociativeArrayTypeValueSpecification.allowNullValues !== true) {

          oneOnMoreValuesAreInvalid = true;

          this.registerValidationError(
            this.validationErrorsMessagesBuilder.associativeArrayDisallowedNullValueErrorMessage({
              targetPropertyDotSeparatedQualifiedName: this.currentObjectPropertyDotSeparatedQualifiedName,
              targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
              targetPropertyValue: targetValue__expectedToBeAssociativeArrayTypeObject,
              targetPropertyValueSpecification: targetAssociativeArrayTypeValueSpecification,
              mustLogTargetPropertyValueBeforeFirstPreValidationModification:
                  mustLogCurrentAssociativeArrayEntireValueAsItWasBeforeFirstPreValidationModification,
              targetPropertyValueBeforeFirstPreValidationModification: valueBeforeFirstPreValidationModification
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
            targetValueBeforeFirstPreValidationModification: valueBeforeFirstPreValidationModification,
            mustLogTargetValueAsItWasBeforeFirstPreValidationModification:
                mustLogCurrentAssociativeArrayEntireValueAsItWasBeforeFirstPreValidationModification
          });


      switch (this.processingApproach) {

        case RawObjectDataProcessor.ProcessingApproaches.newObjectAssembling: {

          if ("isInvalid" in valueProcessingResult) {
            oneOnMoreValuesAreInvalid = true;
            continue;
          } else if ("isValidButValidationOnlyModeActive" in valueProcessingResult) {
            continue;
          }

          processedValueWorkpiece[keyFinalName] = valueProcessingResult.processedValue;

          break;
        }

        case RawObjectDataProcessor.ProcessingApproaches.existingObjectManipulation: {
          /* ※ Reserved for the future. */
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
        rawData__currentObjectDepth: parentObject
      })) {

        oneOnMoreValuesAreInvalid = true;

        this.registerValidationError(
          this.validationErrorsMessagesBuilder.buildCustomValidationFailedErrorMessageTextData({
            targetPropertyDotSeparatedQualifiedName: this.currentObjectPropertyDotSeparatedQualifiedName,
            targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
            targetPropertyValue: targetValue__expectedToBeAssociativeArrayTypeObject,
            targetPropertyValueSpecification: targetAssociativeArrayTypeValueSpecification,
            customValidationDescription: customValidator.descriptionForLogging,
            targetPropertyValueBeforeFirstPreValidationModification: targetValueBeforeFirstPreValidationModification,
            mustLogTargetPropertyValueBeforeFirstPreValidationModification:
            mustLogTargetValueAsItWasBeforeFirstPreValidationModification
          })
        );
      }
    }


    if (targetAssociativeArrayTypeValueIsInvalid || oneOnMoreValuesAreInvalid) {
      return { isInvalid: true };
    } else if (this.isValidationOnlyMode) {
      return { isValidButValidationOnlyModeActive: true };
    }


    for (
      const postValidationModification of RawObjectDataProcessor.
          getNormalizedPostValidationModifications(targetAssociativeArrayTypeValueSpecification.postValidationModifications)
    ) {
      processedValueWorkpiece = postValidationModification(targetValue__expectedToBeAssociativeArrayTypeObject);
    }


    return { processedValue: processedValueWorkpiece as ParsedJSON_Object };
  }


  private processSingleNeitherUndefinedNorNullValue(
    {
      targetValue,
      targetValueSpecification,
      parentObject,
      targetValueBeforeFirstPreValidationModification,
      mustLogTargetValueAsItWasBeforeFirstPreValidationModification
    }: {
      targetValue: NonNullable<unknown>;
      targetValueSpecification: RawObjectDataProcessor.CertainTypeValueSpecification;
      parentObject: ArbitraryObject;
      targetValueBeforeFirstPreValidationModification: unknown;
      mustLogTargetValueAsItWasBeforeFirstPreValidationModification: boolean;
    }
  ): RawObjectDataProcessor.ValueProcessingResult {

    /* [ Theory ] Basically, the switch/case is working, but there are some exceptions.
    * https://stackoverflow.com/q/69848208/4818123
    * https://stackoverflow.com/q/69848689/4818123
    *  */

    if (
      targetValueSpecification.type === RawObjectDataProcessor.ValuesTypesIDs.number ||
      (typeof targetValueSpecification.type === "function" && targetValueSpecification.type.name === "Number")
    ) {
      return this.processNumberValue({
        targetValue__expectedToBeNumber: targetValue,
        targetValueSpecification: targetValueSpecification as RawObjectDataProcessor.NumberPropertySpecification,
        parentObject,
        targetValueBeforeFirstPreValidationModification,
        mustLogTargetValueAsItWasBeforeFirstPreValidationModification
      });
    }


    if (
      targetValueSpecification.type === RawObjectDataProcessor.ValuesTypesIDs.string ||
      (typeof targetValueSpecification.type === "function" && targetValueSpecification.type.name === "String")
    ) {
      return this.processStringValue({
        targetValue__expectedToBeString: targetValue,
        targetValueSpecification: targetValueSpecification as RawObjectDataProcessor.StringValueSpecification,
        parentObject,
        targetValueBeforeFirstPreValidationModification,
        mustLogTargetValueAsItWasBeforeFirstPreValidationModification
      });
    }


    if (
      targetValueSpecification.type === RawObjectDataProcessor.ValuesTypesIDs.boolean ||
      (typeof targetValueSpecification.type === "function" && targetValueSpecification.type.name === "Boolean")
    ) {
      return this.processBooleanValue({
        targetValue__expectedToBeBoolean: targetValue,
        targetValueSpecification: targetValueSpecification as RawObjectDataProcessor.BooleanValueSpecification,
        parentObject,
        targetValueBeforeFirstPreValidationModification,
        mustLogTargetValueAsItWasBeforeFirstPreValidationModification
      });
    }


    if (
     targetValueSpecification.type === RawObjectDataProcessor.ValuesTypesIDs.fixedKeyAndValuePairsObject ||
      (typeof targetValueSpecification.type === "function" && targetValueSpecification.type.name === "Object")
    ) {
      return this.processFixedKeyAndValuePairsNonNullObjectTypeValue({
        targetValue__expectedToBeObject: targetValue,
        targetObjectTypeValueSpecification: targetValueSpecification as RawObjectDataProcessor.
            FixedKeyAndValuePairsObjectValueSpecification,
        parentObject,
        targetValueBeforeFirstPreValidationModification,
        mustLogTargetValueAsItWasBeforeFirstPreValidationModification
      });
    }


    if (
      targetValueSpecification.type === RawObjectDataProcessor.ValuesTypesIDs.indexedArrayOfUniformElements ||
      (typeof targetValueSpecification.type === "function" && targetValueSpecification.type.name === "Array")
    ) {
      return this.processIndexedArrayTypeValue({
        targetValue__expectedToBeIndexedArray: targetValue,
        targetIndexedArrayTypeValueSpecification: targetValueSpecification as RawObjectDataProcessor.
            NestedUniformElementsIndexedArrayPropertySpecification,
        parentObject,
        targetValueBeforeFirstPreValidationModification,
        mustLogTargetValueAsItWasBeforeFirstPreValidationModification
      });
    }


    if (
      targetValueSpecification.type === RawObjectDataProcessor.ValuesTypesIDs.associativeArrayOfUniformTypeValues ||
      (typeof targetValueSpecification.type === "function" && targetValueSpecification.type.name === "Map")
    ) {
      return this.processAssociativeArrayTypeValue({
        targetValue__expectedToBeAssociativeArrayTypeObject: targetValue,
        targetAssociativeArrayTypeValueSpecification: targetValueSpecification as RawObjectDataProcessor.
            NestedUniformElementsAssociativeArrayPropertySpecification,
        parentObject,
        targetValueBeforeFirstPreValidationModification,
        mustLogTargetValueAsItWasBeforeFirstPreValidationModification
      });
    }


    if (targetValueSpecification.type === RawObjectDataProcessor.ValuesTypesIDs.oneOf) {
      return this.processMultipleTypesAllowedValue({
        targetValue,
        targetValueSpecification,
        parentObject,
        targetValueBeforeFirstPreValidationModification,
        mustLogTargetValueAsItWasBeforeFirstPreValidationModification
      });
    }


    Logger.logError({
      errorType: InvalidParameterValueError.NAME,
      title: InvalidParameterValueError.DEFAULT_TITLE,
      description: `The specified value type '${targetValueSpecification.type.toString()}' is not supported.`,
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
      targetValueBeforeFirstPreValidationModification,
      mustLogTargetValueAsItWasBeforeFirstPreValidationModification
    }: {
      targetValue__expectedToBeNumber: unknown;
      targetValueSpecification: RawObjectDataProcessor.NumberValueSpecification;
      parentObject: ArbitraryObject;
      targetValueBeforeFirstPreValidationModification: unknown;
      mustLogTargetValueAsItWasBeforeFirstPreValidationModification: boolean;
    }
  ): RawObjectDataProcessor.ValueProcessingResult {

    if (!isNumber(targetValue__expectedToBeNumber)) {
      this.registerValidationError(
        this.validationErrorsMessagesBuilder.buildValueTypeDoesNotMatchWithExpectedErrorMessage({
          targetPropertyDotSeparatedQualifiedName: this.currentObjectPropertyDotSeparatedQualifiedName,
          targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
          targetPropertyValue: targetValue__expectedToBeNumber,
          targetPropertyValueSpecification: targetValueSpecification,
          targetPropertyValueBeforeFirstPreValidationModification: targetValueBeforeFirstPreValidationModification,
          mustLogTargetPropertyValueBeforeFirstPreValidationModification:
              mustLogTargetValueAsItWasBeforeFirstPreValidationModification
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
          targetPropertyValueBeforeFirstPreValidationModification: targetValueBeforeFirstPreValidationModification,
          mustLogTargetPropertyValueBeforeFirstPreValidationModification:
              mustLogTargetValueAsItWasBeforeFirstPreValidationModification,
          expectedNumbersSet: targetValueSpecification.numbersSet
        })
      );
      return { isInvalid: true };
    }


    if (
      isNotUndefined(targetValueSpecification.allowedAlternatives) &&
      !targetValueSpecification.allowedAlternatives.includes(targetValue__expectedToBeNumber)
    ) {
      this.registerValidationError(
        this.validationErrorsMessagesBuilder.buildValueIsNotAmongAllowedVariantsErrorMessage({
          targetPropertyDotSeparatedQualifiedName: this.currentObjectPropertyDotSeparatedQualifiedName,
          targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
          targetPropertyValue: targetValue__expectedToBeNumber,
          targetPropertyValueSpecification: targetValueSpecification,
          targetPropertyValueBeforeFirstPreValidationModification: targetValueBeforeFirstPreValidationModification,
          mustLogTargetPropertyValueBeforeFirstPreValidationModification:
              mustLogTargetValueAsItWasBeforeFirstPreValidationModification
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
          targetPropertyValueBeforeFirstPreValidationModification: targetValueBeforeFirstPreValidationModification,
          mustLogTargetPropertyValueBeforeFirstPreValidationModification:
              mustLogTargetValueAsItWasBeforeFirstPreValidationModification
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
          targetPropertyValueBeforeFirstPreValidationModification: targetValueBeforeFirstPreValidationModification,
          mustLogTargetPropertyValueBeforeFirstPreValidationModification:
          mustLogTargetValueAsItWasBeforeFirstPreValidationModification,
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
        rawData__currentObjectDepth: parentObject
      })) {

        atLeastOneCustomValidationFailed = true;

        this.registerValidationError(
          this.validationErrorsMessagesBuilder.buildCustomValidationFailedErrorMessageTextData({
            targetPropertyDotSeparatedQualifiedName: this.currentObjectPropertyDotSeparatedQualifiedName,
            targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
            targetPropertyValue: targetValue__expectedToBeNumber,
            targetPropertyValueSpecification: targetValueSpecification,
            targetPropertyValueBeforeFirstPreValidationModification: targetValueBeforeFirstPreValidationModification,
            mustLogTargetPropertyValueBeforeFirstPreValidationModification:
            mustLogTargetValueAsItWasBeforeFirstPreValidationModification,
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
      targetValueBeforeFirstPreValidationModification,
      mustLogTargetValueAsItWasBeforeFirstPreValidationModification
    }: {
      targetValue__expectedToBeString: unknown;
      targetValueSpecification: RawObjectDataProcessor.StringValueSpecification;
      parentObject: ArbitraryObject;
      targetValueBeforeFirstPreValidationModification: unknown;
      mustLogTargetValueAsItWasBeforeFirstPreValidationModification: boolean;
    }
  ): RawObjectDataProcessor.ValueProcessingResult {

    if (!isString(targetValue__expectedToBeString)) {
      this.registerValidationError(
        this.validationErrorsMessagesBuilder.buildValueTypeDoesNotMatchWithExpectedErrorMessage({
          targetPropertyDotSeparatedQualifiedName: this.currentObjectPropertyDotSeparatedQualifiedName,
          targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
          targetPropertyValue: targetValue__expectedToBeString,
          targetPropertyValueSpecification: targetValueSpecification,
          targetPropertyValueBeforeFirstPreValidationModification: targetValueBeforeFirstPreValidationModification,
          mustLogTargetPropertyValueBeforeFirstPreValidationModification:
              mustLogTargetValueAsItWasBeforeFirstPreValidationModification
        })
      );
      return { isInvalid: true };
    }


    if (
      isNotUndefined(targetValueSpecification.allowedAlternatives) &&
      !targetValueSpecification.allowedAlternatives.includes(targetValue__expectedToBeString)
    ) {
      this.registerValidationError(
        this.validationErrorsMessagesBuilder.buildValueIsNotAmongAllowedVariantsErrorMessage({
          targetPropertyDotSeparatedQualifiedName: this.currentObjectPropertyDotSeparatedQualifiedName,
          targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
          targetPropertyValue: targetValue__expectedToBeString,
          targetPropertyValueSpecification: targetValueSpecification,
          targetPropertyValueBeforeFirstPreValidationModification: targetValueBeforeFirstPreValidationModification,
          mustLogTargetPropertyValueBeforeFirstPreValidationModification:
              mustLogTargetValueAsItWasBeforeFirstPreValidationModification
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
          targetPropertyValueBeforeFirstPreValidationModification: targetValueBeforeFirstPreValidationModification,
          mustLogTargetPropertyValueBeforeFirstPreValidationModification:
          mustLogTargetValueAsItWasBeforeFirstPreValidationModification,
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
          targetPropertyValueBeforeFirstPreValidationModification: targetValueBeforeFirstPreValidationModification,
          mustLogTargetPropertyValueBeforeFirstPreValidationModification:
              mustLogTargetValueAsItWasBeforeFirstPreValidationModification,
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
          targetPropertyValueBeforeFirstPreValidationModification: targetValueBeforeFirstPreValidationModification,
          mustLogTargetPropertyValueBeforeFirstPreValidationModification:
              mustLogTargetValueAsItWasBeforeFirstPreValidationModification,
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
          targetPropertyValueBeforeFirstPreValidationModification: targetValueBeforeFirstPreValidationModification,
          mustLogTargetPropertyValueBeforeFirstPreValidationModification:
              mustLogTargetValueAsItWasBeforeFirstPreValidationModification,
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
        rawData__currentObjectDepth: parentObject
      })) {

        atLeastOneCustomValidationFailed = true;

        this.registerValidationError(
          this.validationErrorsMessagesBuilder.buildCustomValidationFailedErrorMessageTextData({
            targetPropertyDotSeparatedQualifiedName: this.currentObjectPropertyDotSeparatedQualifiedName,
            targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
            targetPropertyValue: targetValue__expectedToBeString,
            targetPropertyValueSpecification: targetValueSpecification,
            targetPropertyValueBeforeFirstPreValidationModification: targetValueBeforeFirstPreValidationModification,
            mustLogTargetPropertyValueBeforeFirstPreValidationModification:
            mustLogTargetValueAsItWasBeforeFirstPreValidationModification,
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
      targetValueBeforeFirstPreValidationModification,
      mustLogTargetValueAsItWasBeforeFirstPreValidationModification
    }: {
      targetValue__expectedToBeBoolean: unknown;
      targetValueSpecification: RawObjectDataProcessor.BooleanValueSpecification;
      parentObject: ArbitraryObject;
      targetValueBeforeFirstPreValidationModification: unknown;
      mustLogTargetValueAsItWasBeforeFirstPreValidationModification: boolean;
    }
  ): RawObjectDataProcessor.ValueProcessingResult {

    if (!isBoolean(targetValue__expectedToBeBoolean)) {
      this.registerValidationError(
        this.validationErrorsMessagesBuilder.buildValueTypeDoesNotMatchWithExpectedErrorMessage({
          targetPropertyDotSeparatedQualifiedName: this.currentObjectPropertyDotSeparatedQualifiedName,
          targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
          targetPropertyValue: targetValue__expectedToBeBoolean,
          targetPropertyValueSpecification: targetValueSpecification,
          targetPropertyValueBeforeFirstPreValidationModification: targetValueBeforeFirstPreValidationModification,
          mustLogTargetPropertyValueBeforeFirstPreValidationModification:
              mustLogTargetValueAsItWasBeforeFirstPreValidationModification
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
          targetPropertyValueBeforeFirstPreValidationModification: targetValueBeforeFirstPreValidationModification,
          mustLogTargetPropertyValueBeforeFirstPreValidationModification:
              mustLogTargetValueAsItWasBeforeFirstPreValidationModification,
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
        rawData__currentObjectDepth: parentObject
      })) {

        atLeastOneCustomValidationFailed = true;

        this.registerValidationError(
          this.validationErrorsMessagesBuilder.buildCustomValidationFailedErrorMessageTextData({
            targetPropertyDotSeparatedQualifiedName: this.currentObjectPropertyDotSeparatedQualifiedName,
            targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
            targetPropertyValue: targetValue__expectedToBeBoolean,
            targetPropertyValueSpecification: targetValueSpecification,
            customValidationDescription: customValidator.descriptionForLogging,
            targetPropertyValueBeforeFirstPreValidationModification: targetValueBeforeFirstPreValidationModification,
            mustLogTargetPropertyValueBeforeFirstPreValidationModification:
            mustLogTargetValueAsItWasBeforeFirstPreValidationModification
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
      targetValueBeforeFirstPreValidationModification,
      mustLogTargetValueAsItWasBeforeFirstPreValidationModification
    }: {
      targetValue: Exclude<unknown, undefined | null>;
      targetValueSpecification: RawObjectDataProcessor.MultipleTypesAllowedValueSpecification;
      parentObject: ArbitraryObject;
      targetValueBeforeFirstPreValidationModification: unknown;
      mustLogTargetValueAsItWasBeforeFirstPreValidationModification: boolean;
    }
  ): RawObjectDataProcessor.ValueProcessingResult {

    let specificationForCurrentValueType: RawObjectDataProcessor.CertainTypeValueSpecification | undefined;

    switch (typeof targetValue) {

      case "number": {
        specificationForCurrentValueType = targetValueSpecification.alternatives.find(
          (alternativeSpecification: RawObjectDataProcessor.CertainTypeValueSpecification): boolean =>
              alternativeSpecification.type === RawObjectDataProcessor.ValuesTypesIDs.number ||
              alternativeSpecification.type === Number
        );
        break;
      }

      case "string": {
        specificationForCurrentValueType = targetValueSpecification.alternatives.find(
          (alternativeSpecification: RawObjectDataProcessor.CertainTypeValueSpecification): boolean =>
              alternativeSpecification.type === RawObjectDataProcessor.ValuesTypesIDs.string ||
              alternativeSpecification.type === String
        );
        break;
      }

      case "boolean": {
        specificationForCurrentValueType = targetValueSpecification.alternatives.find(
          (alternativeSpecification: RawObjectDataProcessor.CertainTypeValueSpecification): boolean =>
              alternativeSpecification.type === RawObjectDataProcessor.ValuesTypesIDs.boolean ||
              alternativeSpecification.type === Boolean
        );
        break;
      }

      case "object": {

        if (Array.isArray(targetValue)) {
          specificationForCurrentValueType = targetValueSpecification.alternatives.find(
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
            title: InvalidParameterValueError.DEFAULT_TITLE,
            description: this.validationErrorsMessagesBuilder.buildUnsupportedValueTypeErrorDescription({
              targetPropertyDotSeparatedQualifiedName: this.currentObjectPropertyDotSeparatedQualifiedName,
              targetPropertyNewName: this.currentlyIteratedPropertyNewNameForLogging,
              targetPropertyValue: targetValue,
              targetPropertyValueSpecification: targetValueSpecification,
              targetPropertyValueBeforeFirstPreValidationModification: targetValueBeforeFirstPreValidationModification,
              mustLogTargetPropertyValueBeforeFirstPreValidationModification:
                  mustLogTargetValueAsItWasBeforeFirstPreValidationModification
            }),
            occurrenceLocation: "RawObjectDataProcessor.processMultipleTypesAllowedValue(parametersObject)"
          });
          return { isInvalid: true };
        }

        specificationForCurrentValueType = possibleSpecificationsForObjectValueTypes[0];
        break;
      }

      default: {
        break;
      }
    }

    if (isUndefined(specificationForCurrentValueType)) {
      Logger.logError({
        errorType: InvalidParameterValueError.NAME,
        title: InvalidParameterValueError.DEFAULT_TITLE,
        description: this.validationErrorsMessagesBuilder.buildIncompatibleValuesTypesAlternativesErrorDescription(
            targetValueSpecification
        ),
        occurrenceLocation: "RawObjectDataProcessor.processMultipleTypesAllowedValue(parametersObject)"
      });
      return { isInvalid: true };
    }

    return this.processSingleNeitherUndefinedNorNullValue({
      targetValue,
      targetValueSpecification: specificationForCurrentValueType,
      parentObject,
      targetValueBeforeFirstPreValidationModification,
      mustLogTargetValueAsItWasBeforeFirstPreValidationModification
    });
  }


  /* --- Helpers ---------------------------------------------------------------------------------------------------- */
  private registerValidationError(errorMessage: string): void {
    this.rawDataIsInvalid = true;
    this.validationErrorsMessages.push(errorMessage);
  }


  private get currentObjectPropertyDotSeparatedQualifiedName(): string {
    return this.currentlyIteratedObjectPropertyQualifiedNameSegmentsForLogging.join(".");
  }

  /* [ Approach ] The alias for the logic clarifying */
  private get isValidationOnlyMode(): boolean {
    return this.rawDataIsInvalid;
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
    // processingApproach: ProcessingApproaches;
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
    readonly extendValidatedData?: (validData: ParsedJSON_Object) => void;
    readonly propertiesWillBeDeletedAfterValidatedDataExtending?: Array<string>;
  };

  type IndexedArrayTypeValueSpecification = {
    // readonly nonObjectElementsMustDiffer?: boolean;
    // readonly uniquePropertiesOfObjectTypeElements?: Array<string>;
  } & (
    {
      readonly minimalElementsCount?: number;
      readonly maximalElementsCount?: number;
      readonly exactElementsCount?: undefined;
    } | {
      readonly exactElementsCount?: number;
      readonly minimalElementsCount?: undefined;
      readonly maximalElementsCount?: undefined;
    }
  );

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
    /* 〔 ESLint muting rationale 〕 This rule is not desired for object keys, but there no option allows to disable it for
     *   the object properties.  */
    /* eslint-disable-next-line id-denylist */
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
        readonly allowedAlternatives?: Array<number>;
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
          * See https://stackoverflow.com/a/59133061/4818123
          * Below this theory will be referred as 〔※〕. */
          readonly defaultValue?: undefined;
          readonly requiredIf?: undefined;
        } |
        {
          readonly requiredIf: PropertyRequirementCondition;
          /* 〔※〕 */
          readonly required?: undefined;
          readonly defaultValue?: undefined;
        } |
        {
          readonly defaultValue: number;
          /* 〔※〕 */
          readonly required?: undefined;
          readonly requiredIf?: undefined;
        } |
        {
          readonly required: false;
          /* 〔※〕 */
          readonly defaultValue?: undefined;
          readonly requiredIf?: undefined;
        }
      ) &
      {
        readonly nullSubstitution?: number;
        // readonly invalidValueSubstitution?: number;
      };


  /* --- String value/property -------------------------------------------------------------------------------------- */
  export type StringValueSpecification = ValueSpecification__CommonParameters & {
    /* 〔 ESLint muting rationale 〕 This rule is not desired for object keys, but there no option allows to disable it for
     *   the object properties.  */
    /* eslint-disable-next-line id-denylist */
    readonly type: ValuesTypesIDs.string | StringConstructor;
    readonly allowedAlternatives?: Array<string>;
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
          /* 〔※〕 */
          readonly defaultValue?: undefined;
          readonly requiredIf?: undefined;
        } |
        {
          readonly requiredIf: PropertyRequirementCondition;
          /* 〔※〕 */
          readonly required?: undefined;
          readonly defaultValue?: undefined;
        } |
        {
          readonly defaultValue: string;
          /* 〔※〕 */
          readonly required?: undefined;
          readonly requiredIf?: undefined;
        } |
        {
          readonly required: false;
          /* 〔※〕 */
          readonly defaultValue?: undefined;
          readonly requiredIf?: undefined;
        }
      ) &
      {
        readonly nullSubstitution?: string;
        // readonly invalidValueSubstitution?: string;
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
          /* 〔※〕 */
          readonly defaultValue?: undefined;
          readonly requiredIf?: undefined;
        } |
        {
          readonly requiredIf: PropertyRequirementCondition;
          /* 〔※〕 */
          readonly required?: undefined;
          readonly defaultValue?: undefined;
        } |
        {
          readonly defaultValue: boolean;
          /* 〔※〕 */
          readonly required?: undefined;
          readonly requiredIf?: undefined;
        } |
        {
          readonly required: false;
          /* 〔※〕 */
          readonly defaultValue?: undefined;
          readonly requiredIf?: undefined;
        }
      ) &
      {
        readonly nullSubstitution?: boolean;
        // readonly invalidValueSubstitution?: boolean;
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
          /* 〔※〕 */
          readonly defaultValue?: undefined;
          readonly requiredIf?: undefined;
        } |
        {
          readonly requiredIf: PropertyRequirementCondition;
          /* 〔※〕 */
          readonly required?: undefined;
          readonly defaultValue?: undefined;
        } |
        {
          readonly defaultValue: ParsedJSON_Object;
          /* 〔※〕 */
          readonly required?: undefined;
          readonly requiredIf?: undefined;
        } |
        {
          readonly required: false;
          /* 〔※〕 */
          readonly defaultValue?: undefined;
          readonly requiredIf?: undefined;
        }
      ) &
      {
        readonly nullSubstitution?: ParsedJSON_Object;
        // readonly invalidValueSubstitution?: ParsedJSON_Object;
      };


  /* --- Uniform element indexes array value/property --------------------------------------------------------------- */
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
          /* 〔※〕 */
          readonly defaultValue?: undefined;
          readonly requiredIf?: undefined;
        } |
        {
          readonly requiredIf: PropertyRequirementCondition;
          /* 〔※〕 */
          readonly required?: undefined;
          readonly defaultValue?: undefined;
        } |
        {
          readonly defaultValue: ParsedJSON_Array;
          /* 〔※〕 */
          readonly required?: undefined;
          readonly requiredIf?: undefined;
        } |
        {
          readonly required: false;
          /* 〔※〕 */
          readonly defaultValue?: undefined;
          readonly requiredIf?: undefined;
        }
      ) &
      {
        readonly nullSubstitution?: ParsedJSON_Array;
        // readonly invalidValueSubstitution?: ParsedJSON_Array;
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
          /* 〔※〕 */
          readonly defaultValue?: undefined;
          readonly requiredIf?: undefined;
        } |
        {
          readonly requiredIf: PropertyRequirementCondition;
          /* 〔※〕 */
          readonly required?: undefined;
          readonly defaultValue?: undefined;
        } |
        {
          readonly defaultValue: ParsedJSON_NestedProperty;
          /* 〔※〕 */
          readonly required?: undefined;
          readonly requiredIf?: undefined;
        } |
        {
          readonly required: false;
          /* 〔※〕 */
          readonly defaultValue?: undefined;
          readonly requiredIf?: undefined;
        }
      ) &
      {
        readonly nullSubstitution?: ParsedJSON_Object;
        // readonly invalidValueSubstitution?: ParsedJSON_Object;
        readonly postValidationModifications?:
            (validValue: ArbitraryObject) => ArbitraryObject | Array<(validValue: ArbitraryObject) => ArbitraryObject>;
      };


  /* --- Alternating value/property --------------------------------------------------------------------------------- */
  export type MultipleTypesAllowedValueSpecification =
      ValueSpecification__CommonParameters &
      {
        readonly type: ValuesTypesIDs.oneOf;
        readonly alternatives: Array<CertainTypeValueSpecification>;
        // readonly invalidValueSubstitution?: ParsedJSON_NestedProperty;
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
          /* 〔※〕 */
          readonly defaultValue?: undefined;
          readonly requiredIf?: undefined;
        } |
        {
          readonly requiredIf: PropertyRequirementCondition;
          /* 〔※〕 */
          readonly required?: undefined;
          readonly defaultValue?: undefined;
        } |
        {
          readonly defaultValue: ParsedJSON_NestedProperty;
          /* 〔※〕 */
          readonly required?: undefined;
          readonly requiredIf?: undefined;
        } |
        {
          readonly required: false;
          /* 〔※〕 */
          readonly defaultValue?: undefined;
          readonly requiredIf?: undefined;
        }
      );


  export type Localization = {

    readonly errorMessageBasicTemplate: (payload: Localization.DataForMessagesBuilding) => string;

    readonly errorMessagesListItemHeadingTemplate: (messageNumber: number) => string;

    readonly rawDataIsNullErrorMessage: string;

    readonly rawDataIsNotObjectErrorMessageTemplate: (realType: string) => string;

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
      requirementConditionDescription: string
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
        requiredKeysAlternatives: Array<string>
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

    readonly valueIsNotAmongAllowedAlternativesErrorMessageTextData: Localization.TextDataForErrorMessagesBuilding;

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
      targetPropertyValueBeforeFirstPreValidationModification: unknown;
      mustLogTargetPropertyValueBeforeFirstPreValidationModification: boolean;
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
      this.buildErrorMessage = localization.errorMessageBasicTemplate;
    }

    public get rawDataIsNullErrorMessage(): string {
      return this.localization.rawDataIsNullErrorMessage;
    }

    public buildRawDataIsNotObjectErrorMessage(realType: string): string {
      return this.localization.rawDataIsNotObjectErrorMessageTemplate(realType);
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
    public buildIndexedArrayElementCountIsLessThanRequiredMinimumErrorMessage(
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

    public buildIndexedArrayElementCountIsMoreThanAllowedMaximumErrorMessage(
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

    public buildIndexedArrayElementCountIsDoesNotMatchWithSpecifiedExactNumberErrorMessage(
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

    public buildValueIsNotAmongAllowedVariantsErrorMessage(
      payload: Localization.PropertyDataForMessagesBuilding
    ): string {
      return this.buildErrorMessage({
        ...payload,
        ...this.localization.valueIsNotAmongAllowedAlternativesErrorMessageTextData
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
