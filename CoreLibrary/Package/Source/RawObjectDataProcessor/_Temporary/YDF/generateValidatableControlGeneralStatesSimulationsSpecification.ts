import RawObjectDataProcessor from "../../RawObjectDataProcessor";

namespace AsynchronousValidations__YDF {

  export enum Statuses {
    inProgress = "IN_PROGRESS",
    finishedAndValid = "FINISHED_AND_VALID",
    finishedButInvalid = "FINISHED_BUT_INVALID",
    malfunction = "MALFUNCTION"
  }

}

export function generateValidatableControlGeneralStatesSimulationsSpecification(
  {
    invalidInputHighlightingIfAnyValidationErrorsMessages = false,
    validValueHighlightingIfNoValidationErrorsMessages = false,
    validationErrorsMessages = false,
    asynchronousValidationsStatuses = false
  }
): RawObjectDataProcessor.PropertiesSpecification {
  return {

    ...invalidInputHighlightingIfAnyValidationErrorsMessages ? {
      invalidInputHighlightingIfAnyValidationErrorsMessages: {
        type: Boolean,
        undefinedValueSubstitution: false,
        isNullForbidden: true
      }
    } : null,

    ...validValueHighlightingIfNoValidationErrorsMessages ? {
      validValueHighlightingIfNoValidationErrorsMessages: {
        type: Boolean,
        undefinedValueSubstitution: false,
        isNullForbidden: true
      }
    } : null,

    ...validationErrorsMessages ? {
      validationErrorsMessages: {
        type: RawObjectDataProcessor.ValuesTypesIDs.polymorphic,
        undefinedValueSubstitution: false,
        isNullForbidden: true,
        alternatives: [
          {
            type: Array,
            element: {
              type: String,
              minimalCharactersCount: 1
            }
          },
          {
            type: Boolean
          }
        ]
      }
    } : null,

    ...asynchronousValidationsStatuses ? {

      asynchronousValidationsStatuses: {
        type: RawObjectDataProcessor.ValuesTypesIDs.polymorphic,
        undefinedValueSubstitution: false,
        isNullForbidden: true,
        alternatives: [
          {
            type: Array,
            element: {
              type: Object,
              properties: {
                ID: {
                  type: String,
                  isUndefinedForbidden: true,
                  isNullForbidden: true,
                  allowedAlternatives: Object.values(AsynchronousValidations__YDF.Statuses)
                },
                message: {
                  type: String,
                  isUndefinedForbidden: true,
                  isNullForbidden: true,
                  minimalCharactersCount: 1
                }
              }
            }
          },
          {
            type: Boolean
          }
        ]
      }

    } : null

  };
}
