import RawObjectDataProcessor from "../../RawObjectDataProcessor";


class Badge__YDF {

  public static Themes: { [key: string]: string; } = { regular: "REGULAR" };

  public static areThemesCSS_ClassesCommon: boolean = true;

  public static GeometricVariations: { [key: string]: string; } = {
    regular: "REGULAR",
    small: "SMALL"
  };

  public static GeometricModifiers: { [key: string]: string; } = {
    pillShape: "PILL_SHAPE",
    singleLine: "SINGLE_LINE"
  };

  public static DecorativeVariations: { [key: string]: string; } = {
    veryCatchyBright: "VERY_CATCHY_BRIGHT",
    catchyBright: "CATCHY_BRIGHT",
    modestlyCatchyBright: "MODESTLY_CATCHY_BRIGHT",
    neutralBright: "NEUTRAL_BRIGHT",
    modestlyCalmingBright: "MODESTLY_CALMING_BRIGHT",
    calmingBright: "CALMING_BRIGHT",
    achromaticBright: "ACHROMATIC_BRIGHT",
    veryCatchyPastel: "VERY_CATCHY_PASTEL",
    catchyPastel: "CATCHY_PASTEL",
    modestlyCatchyPastel: "MODESTLY_CATCHY_PASTEL",
    neutralPastel: "NEUTRAL_PASTEL",
    modestlyCalmingPastel: "MODESTLY_CALMING_PASTEL",
    calmingPastel: "CALMING_PASTEL",
    achromaticPastel: "ACHROMATIC_PASTEL"
  };

  public static DecorativeModifiers = {
    bordersDisguising: "BORDERS_DISGUISING",
    noBackground: "NO_BACKGROUND"
  };

}


export const badgePropertiesSpecification: RawObjectDataProcessor.PropertiesSpecification = {

  keyLabel: {
    type: String,
    isUndefinedForbidden: false,
    isNullForbidden: true
  },

  valueLabel: {
    type: String,
    isUndefinedForbidden: true,
    isNullForbidden: true,
  },

  theme: {
    type: String,
    undefinedValueSubstitution: Badge__YDF.Themes.regular,
    isNullForbidden: true,
    allowedAlternatives: Object.
        entries(Badge__YDF.Themes).
        map(([ key, value ]) => ({ key: `Badge__YDF.Themes.${ key }`, value }))
  },

  areThemesCSS_ClassesCommon: {
    type: Boolean,
    undefinedValueSubstitution: Badge__YDF.areThemesCSS_ClassesCommon,
    isNullForbidden: true
  },

  geometricVariation: {
    type: String,
    undefinedValueSubstitution: Badge__YDF.GeometricVariations.regular,
    isNullForbidden: true,
    allowedAlternatives: Object.
        entries(Badge__YDF.GeometricVariations).
        map(([ key, value ]) => ({ key: `Badge__YDF.GeometricVariations.${ key }`, value }))
  },

  geometricModifiers: {
    type: Array,
    undefinedValueSubstitution: [],
    isNullForbidden: true,
    element: {
      type: String,
      allowedAlternatives: Object.values(Badge__YDF.GeometricModifiers)
    }
  },

  decorativeVariation: {
    type: String,
    isUndefinedForbidden: true,
    isNullForbidden: true,
    allowedAlternatives: Object.
        entries(Badge__YDF.DecorativeVariations).
        map(([ key, value ]) => ({ key: `Badge__YDF.DecorativeVariations.${ key }`, value }))
  },

  decorativeModifiers: {
    type: Array,
    undefinedValueSubstitution: [],
    isNullForbidden: true,
    element: {
      type: String,
      allowedAlternatives: Object.values(Badge__YDF.DecorativeModifiers)
    }
  },

  rootElementTag: {
    type: String,
    undefinedValueSubstitution: "span",
    isNullForbidden: true,
    minimalCharactersCount: 1
  }

};
