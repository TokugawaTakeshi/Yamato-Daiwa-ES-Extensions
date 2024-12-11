import RawObjectDataProcessor from "../../RawObjectDataProcessor";


class ValidatableControlShell__YDF {

  public static Themes: { [key: string]: string; } = { regular: "REGULAR" };

  public static areThemesCSS_ClassesCommon: boolean = true;

  public static GeometricVariations: { [key: string]: string; } = {
    regular: "REGULAR",
    small: "SMALL"
  };

  static DecorativeVariations: { [key: string]: string; } = {
    regular: "REGULAR"
  };

}


export const validatableControlShellPropertiesSpecification: RawObjectDataProcessor.PropertiesSpecification = {

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

  required: {
    type: Boolean,
    undefinedValueSubstitution: false,
    isNullForbidden: true,
  },

  mustDisplayAppropriateBadgeIfInputIsRequired: {
    type: Boolean,
    undefinedValueSubstitution: false,
    isNullForbidden: true,
  },

  mustDisplayAppropriateBadgeIfInputIsOptional: {
    type: Boolean,
    undefinedValueSubstitution: false,
    isNullForbidden: true,
  },

  mustAddInvisibleBadgeForHeightEqualizingWhenNoBadge: {
    type: Boolean,
    undefinedValueSubstitution: false,
    isNullForbidden: true,
  },

  coreElementHTML_ID: {
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

  mainSlotWrapperAdditionalCSS_Classes: {
    type: Array,
    undefinedValueSubstitution: [],
    isNullForbidden: true,
    element: {
      type: String,
      minimalCharactersCount: 1
    }
  },

  theme: {
    type: String,
    undefinedValueSubstitution: ValidatableControlShell__YDF.Themes.regular,
    isNullForbidden: true,
    allowedAlternatives: Object.
        entries(ValidatableControlShell__YDF.Themes).
        map(([ key, value ]) => ({ key: `ValidatableControlShell__YDF.Themes.${ key }`, value }))
  },

  areThemesCSS_ClassesCommon: {
    type: Boolean,
    undefinedValueSubstitution: ValidatableControlShell__YDF.areThemesCSS_ClassesCommon,
    isNullForbidden: true
  },

  geometricVariation: {
    type: String,
    undefinedValueSubstitution: ValidatableControlShell__YDF.GeometricVariations.regular,
    isNullForbidden: true,
    allowedAlternatives: Object.
        entries(ValidatableControlShell__YDF.GeometricVariations).
        map(([ key, value ]) => ({ key: `ValidatableControlShell__YDF.GeometricVariations.${ key }`, value }))
  },

  decorativeVariation: {
    type: String,
    undefinedValueSubstitution: ValidatableControlShell__YDF.DecorativeVariations.regular,
    isNullForbidden: true,
    allowedAlternatives: Object.
        entries(ValidatableControlShell__YDF.DecorativeVariations).
        map(([ key, value ]) => ({ key: `ValidatableControlShell__YDF.DecorativeVariations.${ key }`, value }))
  }

};
