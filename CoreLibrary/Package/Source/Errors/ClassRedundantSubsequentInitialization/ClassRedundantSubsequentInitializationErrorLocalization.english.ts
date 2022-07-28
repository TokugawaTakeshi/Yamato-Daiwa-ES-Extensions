import type ClassRedundantSubsequentInitializationError from "./ClassRedundantSubsequentInitializationError";


const ClassRedundantSubsequentInitializationErrorLocalizationEnglish:
    ClassRedundantSubsequentInitializationError.Localization =
{
  defaultTitle: "Class redundant subsequent initialization",
  generateDescription:
      (namedParameters: ClassRedundantSubsequentInitializationError.Localization.DescriptionTemplateNamedParameters): string =>
          `Class '${ namedParameters.className }' intended to be initialized only one time.`
};


export default ClassRedundantSubsequentInitializationErrorLocalizationEnglish;
