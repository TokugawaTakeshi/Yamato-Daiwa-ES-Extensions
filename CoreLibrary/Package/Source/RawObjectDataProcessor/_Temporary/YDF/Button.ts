import RawObjectDataProcessor from "../../RawObjectDataProcessor";


class Button__YDF {

  static HTML_Types: { [key: string]: string; } = {
    regular: "BUTTON",
    submit: "SUBMIT",
    inputButton: "INPUT_BUTTON",
    inputSubmit: "INPUT_SUBMIT",
    inputReset: "INPUT_RESET"
  };


  public static Themes: { [key: string]: string; } = { regular: "REGULAR" };

  public static areThemesCSS_ClassesCommon: boolean = true;

  public static GeometricVariations: { [key: string]: string; } = {
    regular: "REGULAR",
    small: "SMALL",
    linkLike: "LINK_LIKE"
  };

  static GeometricModifiers: { [key: string]: string; } = {
    pillShape: "PILL_SHAPE",
    squareShape: "SQUARE_SHAPE",
    squareShapeUnlessOverflowed: "SQUARE_SHAPE_UNLESS_OVERFLOWED",
    singleLine: "SINGLE_LINE",
    noLeftBorderAndRoundings: "NO_LEFT_BORDER_AND_ROUNDINGS",
    noRightBorderAndRoundings: "NO_RIGHT_BORDER_AND_ROUNDINGS",
    noTopBorderAndRoundings: "NO_TOP_BORDER_AND_ROUNDINGS",
    noBottomBorderAndRoundings: "NO_BOTTOM_BORDER_AND_ROUNDINGS",
    noRoundings: "NO_ROUNDINGS",
    horizontallyShrinkable: "HORIZONTALLY_SHRINKABLE"
  };

  static DecorativeVariations: { [key: string]: string; } = {
    regular: "REGULAR",
    accented: "ACCENTED",
    danger: "DANGER",
    linkLike: "LINK_LIKE"
  };

  static DecorativeModifiers: { [key: string]: string; } = {
    bordersDisguising: "BORDERS_DISGUISING",
    noBackground: "NO_BACKGROUND",
    noBackgroundInDefaultState: "NO_BACKGROUND_IN_DEFAULT_STATE"
  };

}


export const buttonPropertiesSpecification: RawObjectDataProcessor.PropertiesSpecification = {

  HTML_Type: {
    type: String,
    undefinedValueSubstitution: Button__YDF.HTML_Types.regular,
    isNullForbidden: true,
    allowedAlternatives: Object.entries(Button__YDF.HTML_Types).
        map(([key, value]) => ({ key: `Button__YDF.HTML_Types.${ key }`, value }))
  },

  label: {
    type: RawObjectDataProcessor.ValuesTypesIDs.polymorphic,
    undefinedForbiddenIf: {
      predicate: ({ rawData__full: properties }: RawObjectDataProcessor.ConditionAssociatedWithProperty.Predicate.Parameter) =>
          properties.HTML_Type === Button__YDF.HTML_Types.inputButton ||
          properties.HTML_Type === Button__YDF.HTML_Types.inputSubmit ||
          properties.HTML_Type === Button__YDF.HTML_Types.inputReset,
      descriptionForLogging:
          "`HTML_Type` property specified with `Button__YDF.HTML_Types.inputButton`, " +
            "`Button__YDF.HTML_Types.inputSubmit` or `Button__YDF.HTML_Types.inputReset`"
    },
    isNullForbidden: true,
    alternatives: [
      {
        type: String,
        minimalCharactersCount: 1
      },
      {
        type: Number,
        numbersSet: RawObjectDataProcessor.NumbersSets.anyRealNumber
      }
    ]
  },

  accessibilityGuidance: {
    type: String,
    isUndefinedForbidden: false,
    isNullForbidden: true,
    minimalCharactersCount: 1
  },

  URI: {
    type: String,
    isUndefinedForbidden: false,
    isNullForbidden: true,
    /* [ Theory ] It could be the "#" */
    minimalCharactersCount: 1
  },

  mustOpenLinkInNewTab: {
    type: Boolean,
    undefinedValueSubstitution: false,
    isNullForbidden: true
  },

  mustRequestNotFollowLinkForCrawlingToSearchEngine: {
    type: Boolean,
    undefinedValueSubstitution: false,
    isNullForbidden: true
  },

  disabled: {
    type: Boolean,
    undefinedValueSubstitution: false,
    isNullForbidden: true
  },

  toggled: {
    type: Boolean,
    undefinedValueSubstitution: false,
    isNullForbidden: true
  },

  theme: {
    type: String,
    undefinedValueSubstitution: Button__YDF.Themes.regular,
    isNullForbidden: true,
    allowedAlternatives: Object.
        entries(Button__YDF.Themes).
        map(([ key, value ]) => ({ key: `Button__YDF.Themes.${ key }`, value }))
  },

  areThemesCSS_ClassesCommon: {
    type: Boolean,
    undefinedValueSubstitution: Button__YDF.areThemesCSS_ClassesCommon,
    isNullForbidden: true
  },

  geometricVariation: {
    type: String,
    undefinedValueSubstitution: Button__YDF.GeometricVariations.regular,
    isNullForbidden: true,
    allowedAlternatives: Object.
        entries(Button__YDF.GeometricVariations).
        map(([ key, value ]) => ({ key: `Button__YDF.GeometricVariations.${ key }`, value }))
  },

  geometricModifiers: {
    type: Array,
    undefinedValueSubstitution: [],
    isNullForbidden: true,
    element: {
      type: String,
      allowedAlternatives: Object.values(Button__YDF.GeometricModifiers)
    }
  },

  decorativeVariation: {
    type: String,
    undefinedValueSubstitution: Button__YDF.DecorativeVariations.regular,
    isNullForbidden: true,
    allowedAlternatives: Object.
        entries(Button__YDF.DecorativeVariations).
        map(([ key, value ]) => ({ key: `Button__YDF.DecorativeVariations.${ key }`, value }))
  },

  decorativeModifiers: {
    type: Array,
    undefinedValueSubstitution: [],
    isNullForbidden: true,
    element: {
      type: String,
      allowedAlternatives: Object.values(Button__YDF.DecorativeModifiers)
    }
  }

};
