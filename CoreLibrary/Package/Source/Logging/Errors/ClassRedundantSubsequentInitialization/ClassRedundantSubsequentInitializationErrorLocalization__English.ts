import ClassRedundantSubsequentInitializationError from "./ClassRedundantSubsequentInitializationError";


const ClassRedundantSubsequentInitializationErrorLocalization__English:
    ClassRedundantSubsequentInitializationError.Localization =
{
  defaultTitle: "Class redundant subsequent initialization",
  genericDescriptionPartTemplate:
      (
        parametersObject: ClassRedundantSubsequentInitializationError.Localization.GenericDescriptionPartTemplateParameters
      ): string => `Class: '${parametersObject.className}' must be initialized only one time.`
};

export default ClassRedundantSubsequentInitializationErrorLocalization__English;
