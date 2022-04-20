import ClassRequiredInitializationHasNotBeenExecutedError from "./ClassRequiredInitializationHasNotBeenExecutedError";


const ClassRequiredInitializationHasNotBeenExecutedErrorLocalization__English:
    ClassRequiredInitializationHasNotBeenExecutedError.Localization = {

  defaultTitle: "Class required initialization has not been executed",
  generateDescription:
      (
        parametersObject: ClassRequiredInitializationHasNotBeenExecutedError.Localization.DescriptionTemplateNamedParameters
      ): string =>
          `Class '${parametersObject.className}' is required the initialization while initializing method ` +
          `'${parametersObject.initializingMethodName}' has not been called.`
};


export default ClassRequiredInitializationHasNotBeenExecutedErrorLocalization__English;
