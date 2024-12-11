import RawObjectDataProcessor from "../../RawObjectDataProcessor";
import isNumber from "../../../TypeGuards/Numbers/isNumber";
import isUndefined from "../../../TypeGuards/Nullables/isUndefined";


class NumberBox__YDF {

  static Orientations: Readonly<{ [key: string]: string; }> = {
    horizontal: "HORIZONTAL",
    vertical: "VERTICAL"
  }


  public static Themes: { [key: string]: string; } = { regular: "REGULAR" };

  public static areThemesCSS_ClassesCommon: boolean = true;

  public static GeometricVariations: { [key: string]: string; } = {
    regular: "REGULAR",
    small: "SMALL"
  };

  public static GeometricModifiers: { [key: string]: string; } = {
    noRoundings: "NO_ROUNDINGS"
  };

  public static DecorativeVariations: { [key: string]: string; } = {
    regular: "REGULAR"
  };

}


export const textBoxPropertiesSpecification: RawObjectDataProcessor.PropertiesSpecification = {

  label: {
    type: String,
    isUndefinedForbidden: false,
    isNullForbidden: true,
    minimalCharactersCount: 1
  },

  accessibilityGuidance: {
    type: String,
    isUndefinedForbidden: false,
    isNullForbidden: true,
    minimalCharactersCount: 1
  },

  externalLabelHTML_ID: {
    type: String,
    isUndefinedForbidden: false,
    isNullForbidden: true,

    minimalCharactersCount: 1
  },

  guidance: {
    type: String,
    isUndefinedForbidden: false,
    isNullForbidden: true,

    minimalCharactersCount: 1
  },

  placeholder: {
    type: String,
    isUndefinedForbidden: false,
    isNullForbidden: true,
    minimalCharactersCount: 1
  },

  /** @description Could be something like "{{ foo }}" in the MVC case. */
  initialValue: {
    type: RawObjectDataProcessor.ValuesTypesIDs.polymorphic,
    undefinedValueSubstitution: 0,
    isNullForbidden: true,
    alternatives: [
      {
        type: Number,
        numbersSet: RawObjectDataProcessor.NumbersSets.anyRealNumber,
      },
      {
        type: String,
        minimalCharactersCount: 1
      }
    ]
  },

  disabled: {
    type: Boolean,
    undefinedValueSubstitution: false,
    isNullForbidden: true
  },

  readonly: {
    type: Boolean,
    undefinedValueSubstitution: false,
    isNullForbidden: true
  },

  required: {
    type: Boolean,
    undefinedValueSubstitution: false,
    isNullForbidden: true
  },

  mustDisplayAppropriateBadgeIfInputIsRequired: {
    type: Boolean,
    undefinedValueSubstitution: false,
    isNullForbidden: true
  },

  mustDisplayAppropriateBadgeIfInputIsOptional: {
    type: Boolean,
    undefinedValueSubstitution: false,
    isNullForbidden: true
  },

  mustAddInvisibleBadgeForHeightEqualizingWhenNoBadge: {
    type: Boolean,
    undefinedValueSubstitution: false,
    isNullForbidden: true
  },

  step: {
    type: Number,
    numbersSet: RawObjectDataProcessor.NumbersSets.anyRealNumber,
    undefinedValueSubstitution: 1,
    isNullForbidden: true
  },

  minimalValue: {
    type: Number,
    numbersSet: RawObjectDataProcessor.NumbersSets.positiveIntegerOrZero,
    undefinedValueSubstitution: Number.MIN_SAFE_INTEGER,
    isNullForbidden: true
  },

  maximalValue: {
    type: Number,
    numbersSet: RawObjectDataProcessor.NumbersSets.positiveIntegerOrZero,
    undefinedValueSubstitution: Number.MAX_SAFE_INTEGER,
    isNullForbidden: true,
    customValidators: {
      validationFunction: ({ value: maximalValue, rawData__currentObjectDepth }) =>
          isUndefined(rawData__currentObjectDepth.minimalValue) ||
          (
            isNumber(rawData__currentObjectDepth.minimalValue) &&
                maximalValue > rawData__currentObjectDepth.minimalValue
          ),
      descriptionForLogging: "\"maximalValue\" could not be less than \"minimalValue\"."
    }
  },

  instanceID_UniqueDynamicPart: {
    type: String,
    isUndefinedForbidden: false,
    isNullForbidden: true,
    minimalCharactersCount: 10
  },

  nativeInputElementHTML_ID: {
    type: String,
    isUndefinedForbidden: false,
    isNullForbidden: true,
    minimalCharactersCount: 1
  },

  labelElementHTML_ID: {
    type: String,
    isUndefinedForbidden: false,
    isNullForbidden: true,
    minimalCharactersCount: 1
  },

  theme: {
    type: String,
    undefinedValueSubstitution: NumberBox__YDF.Themes.regular,
    isNullForbidden: true,
    allowedAlternatives: Object.
        entries(NumberBox__YDF.Themes).
        map(([ key, value ]) => ({ key: `NumberBox__YDF.Themes.${ key }`, value }))
  },

  areThemesCSS_ClassesCommon: {
    type: Boolean,
    undefinedValueSubstitution: NumberBox__YDF.areThemesCSS_ClassesCommon,
    isNullForbidden: true
  },

  geometricVariation: {
    type: String,
    undefinedValueSubstitution: NumberBox__YDF.GeometricVariations.regular,
    isNullForbidden: true,
    allowedAlternatives: Object.
        entries(NumberBox__YDF.GeometricVariations).
        map(([ key, value ]) => ({ key: `NumberBox__YDF.GeometricVariations.${ key }`, value }))
  },

  orientation: {
    type: String,
    undefinedValueSubstitution: NumberBox__YDF.Orientations.horizontal,
    isNullForbidden: true,
    allowedAlternatives: Object.values(NumberBox__YDF.Orientations)
  },

  decorativeVariation: {
    type: String,
    undefinedValueSubstitution: NumberBox__YDF.DecorativeVariations.regular,
    isNullForbidden: true,
    allowedAlternatives: Object.
        entries(NumberBox__YDF.DecorativeVariations).
        map(([ key, value ]) => ({ key: `NumberBox__YDF.DecorativeVariations.${ key }`, value }))
  }

};
