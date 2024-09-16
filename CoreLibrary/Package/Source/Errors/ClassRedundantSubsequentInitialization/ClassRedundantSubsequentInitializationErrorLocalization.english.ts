import type ClassRedundantSubsequentInitializationError from "./ClassRedundantSubsequentInitializationError";


const classRedundantSubsequentInitializationErrorLocalization__english:
    ClassRedundantSubsequentInitializationError.Localization =
{
  defaultTitle: "Class redundant subsequent initialization",
  generateDescription:
      ({ className }: ClassRedundantSubsequentInitializationError.Localization.DescriptionTemplateVariables): string =>
          `Class "${ className }" intended to be initialized only one time.`
};


export default classRedundantSubsequentInitializationErrorLocalization__english;
