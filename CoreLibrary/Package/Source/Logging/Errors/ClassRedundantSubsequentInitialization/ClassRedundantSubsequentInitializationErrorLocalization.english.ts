import ClassRedundantSubsequentInitializationError from "./ClassRedundantSubsequentInitializationError";


const ClassRedundantSubsequentInitializationErrorLocalizationEnglish:
    ClassRedundantSubsequentInitializationError.Localization =
{
  defaultTitle: "Class redundant subsequent initialization",
  generateDescription:
      (namedParameters: ClassRedundantSubsequentInitializationError.Localization.DescriptionTemplateNamedParameters): string =>
          `Class: '${namedParameters.className}' must be initialized only one time.`
};


export default ClassRedundantSubsequentInitializationErrorLocalizationEnglish;
