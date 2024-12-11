import RawObjectDataProcessor from "../../RawObjectDataProcessor";


class AdmonitionBlock__YDF {

  public static Themes: { [key: string]: string; } = { regular: "REGULAR" };

  public static areThemesCSS_ClassesCommon: boolean = true;

  public static GeometricVariations: { [key: string]: string; } = {
    regular: "REGULAR",
    stickyNoteLike: "STICKY_NOTE_LIKE"
  };

  public static DecorativeVariations: { [key: string]: string; } = {
    notice: "NOTICE",
    error: "ERROR",
    warning: "WARNING",
    success: "SUCCESS",
    guidance: "GUIDANCE",
    question: "QUESTION"
  };

}


export const admonitionBlockPropertiesSpecification: RawObjectDataProcessor.PropertiesSpecification = {

  title: {
    type: String,
    isUndefinedForbidden: false,
    isNullForbidden: true,
    minimalCharactersCount: 1
  },

  SVG_Icon: {

    type: RawObjectDataProcessor.ValuesTypesIDs.polymorphic,
    isUndefinedForbidden: false,
    isNullForbidden: true,

    alternatives: [
      { type: Boolean },
      {

        type: Object,

        properties: {

          innerElementID: {
            type: String,
            isUndefinedForbidden: true,
            isNullForbidden: true,
            minimalCharactersCount: 1
          },

          SVG_ElementAttributes: {
            type: RawObjectDataProcessor.ValuesTypesIDs.associativeArray,
            undefinedValueSubstitution: {},
            isNullForbidden: true,
            areUndefinedTypeValuesForbidden: true,
            areNullTypeValuesForbidden: true,
            value: {
              type: String,
              minimalCharactersCount: 1
            }
          }

        }

      }
    ]

  },

  dismissible: {
    type: Boolean,
    undefinedValueSubstitution: false,
    isNullForbidden: true
  },

  theme: {
    type: String,
    undefinedValueSubstitution: AdmonitionBlock__YDF.Themes.regular,
    isNullForbidden: true,
    allowedAlternatives: Object.
        entries(AdmonitionBlock__YDF.Themes).
        map(([ key, value ]) => ({ key: `AdmonitionBlock__YDF.Themes.${ key }`, value }))
  },

  areThemesCSS_ClassesCommon: {
    type: Boolean,
    undefinedValueSubstitution: AdmonitionBlock__YDF.areThemesCSS_ClassesCommon,
    isNullForbidden: true
  },

  geometricVariation: {
    type: String,
    undefinedValueSubstitution: AdmonitionBlock__YDF.GeometricVariations.regular,
    isNullForbidden: true,
    allowedAlternatives: Object.
        entries(AdmonitionBlock__YDF.GeometricVariations).
        map(([ key, value ]) => ({ key: `AdmonitionBlock__YDF.GeometricVariations.${ key }`, value }))
  },

  decorativeVariation: {
    type: String,
    isUndefinedForbidden: true,
    isNullForbidden: true,
    allowedAlternatives: Object.
        entries(AdmonitionBlock__YDF.DecorativeVariations).
        map(([ key, value ]) => ({ key: `AdmonitionBlock__YDF.DecorativeVariations.${ key }`, value }))
  }

};
