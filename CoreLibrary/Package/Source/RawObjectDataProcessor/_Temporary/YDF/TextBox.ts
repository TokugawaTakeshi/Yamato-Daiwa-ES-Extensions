import RawObjectDataProcessor from "../../RawObjectDataProcessor";
import isNumber from "../../../TypeGuards/Numbers/isNumber";
import isUndefined from "../../../TypeGuards/Nullables/isUndefined";


class TextBox__YDF {

  public static HTML_Types: { [key: string]: string; } = {
    regular: "text",
    email: "email",
    number: "number",
    password: "password",
    phoneNumber: "tel",
    URI: "url"
  };

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

  HTML_Type: {
    type: String,
    undefinedValueSubstitution: TextBox__YDF.HTML_Types.text,
    isNullForbidden: true,
    allowedAlternatives: Object.values(TextBox__YDF.HTML_Types)
  },

  label: {
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

  placeholder: {
    type: String,
    isUndefinedForbidden: false,
    isNullForbidden: true,
    minimalCharactersCount: 1
  },

  /** @see https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill */
  autocomplete: {
    type: String,
    isUndefinedForbidden: false,
    isNullForbidden: true
  },

  value: {
    preValidationModifications: rawValue => isNumber(rawValue) ? String(rawValue) : rawValue,
    type: String,
    undefinedValueSubstitution: "",
    isNullForbidden: true
  },

  multiline: {
    type: Boolean,
    undefinedValueSubstitution: false,
    isNullForbidden: true
  },

  autoResizingForMultilineMode: {
    type: Boolean,
    undefinedValueSubstitution: true,
    isNullForbidden: true
  },

  disabled: {
    type: Boolean,
    isUndefinedForbidden: false,
    isNullForbidden: true
  },

  readonly: {
    type: Boolean,
    isUndefinedForbidden: false,
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

  minimalCharactersCount: {
    type: Number,
    numbersSet: RawObjectDataProcessor.NumbersSets.positiveIntegerOrZero,
    isUndefinedForbidden: false,
    isNullForbidden: true
  },

  maximalCharactersCount: {
    type: Number,
    numbersSet: RawObjectDataProcessor.NumbersSets.positiveIntegerOrZero,
    isUndefinedForbidden: false,
    isNullForbidden: true,
    customValidators: {
      validationFunction: ({ value: maximalCharactersCount, rawData__currentObjectDepth }) =>
          isUndefined(rawData__currentObjectDepth.minimalCharactersCount) ||
          (
            isNumber(rawData__currentObjectDepth.minimalCharactersCount) &&
                maximalCharactersCount >= rawData__currentObjectDepth.minimalCharactersCount
          ),
      descriptionForLogging: "\"maximalCharactersCount\" can not be less than \"minimalCharactersCount\"."
    }
  },

  minimalNumericValue: {
    type: Number,
    numbersSet: RawObjectDataProcessor.NumbersSets.positiveIntegerOrZero,
    isUndefinedForbidden: false,
    isNullForbidden: true
  },

  maximalNumericValue: {
    type: Number,
    numbersSet: RawObjectDataProcessor.NumbersSets.positiveIntegerOrZero,
    isUndefinedForbidden: false,
    isNullForbidden: true,
    customValidators: {
      validationFunction: ({ value: maximalNumericValue, rawData__currentObjectDepth }) =>
          isUndefined(rawData__currentObjectDepth.minimalNumericValue) ||
          (
            isNumber(rawData__currentObjectDepth.minimalNumericValue) &&
                maximalNumericValue >= rawData__currentObjectDepth.minimalNumericValue
          ),
      descriptionForLogging: "\"maximalNumericValue\" can not be less than \"minimalNumericValue\"."
    }
  },

  /** @description
   * 1 minimal character is definitely not enough for unique string, but in MVC mode it can be the variable. */
  instanceID_UniqueDynamicPart: {
    type: String,
    isUndefinedForbidden: false,
    isNullForbidden: true,
    minimalCharactersCount: 1
  },

  HTML_IDs: {

    type: Object,
    isUndefinedForbidden: false,
    isNullForbidden: true,

    properties: {

      inputOrTextArea: {
        type: String,
        isUndefinedForbidden: false,
        isNullForbidden: true,
        minimalCharactersCount: 1
      },

      label: {
        type: String,
        isUndefinedForbidden: false,
        isNullForbidden: true,
        minimalCharactersCount: 1
      }

    }

  },

  theme: {
    type: String,
    undefinedValueSubstitution: TextBox__YDF.Themes.regular,
    isNullForbidden: true,
    allowedAlternatives: Object.
        entries(TextBox__YDF.Themes).
        map(([ key, value ]) => ({ key: `TextBox__YDF.Themes.${ key }`, value }))
  },

  areThemesCSS_ClassesCommon: {
    type: Boolean,
    undefinedValueSubstitution: TextBox__YDF.areThemesCSS_ClassesCommon,
    isNullForbidden: true
  },

  geometricVariation: {
    type: String,
    undefinedValueSubstitution: TextBox__YDF.GeometricVariations.regular,
    isNullForbidden: true,
    allowedAlternatives: Object.
        entries(TextBox__YDF.GeometricVariations).
        map(([ key, value ]) => ({ key: `TextBox__YDF.GeometricVariations.${ key }`, value }))
  },

  geometricModifiers: {
    type: Array,
    undefinedValueSubstitution: [],
    isNullForbidden: true,
    element: {
      type: String,
      allowedAlternatives: Object.values(TextBox__YDF.GeometricModifiers)
    }
  },

  decorativeVariation: {
    type: String,
    undefinedValueSubstitution: TextBox__YDF.DecorativeVariations.regular,
    isNullForbidden: true,
    allowedAlternatives: Object.values(TextBox__YDF.DecorativeVariations)
  }

};
