import type ClassRequiredInitializationHasNotBeenExecutedError from "./ClassRequiredInitializationHasNotBeenExecutedError";


const ClassRequiredInitializationHasNotBeenExecutedErrorLocalization__English:
    ClassRequiredInitializationHasNotBeenExecutedError.Localization = {

  defaultTitle: "Class required initialization has not been executed",
  generateDescription:
      (
        namedParameters: ClassRequiredInitializationHasNotBeenExecutedError.Localization.DescriptionTemplateNamedParameters
      ): string =>
          `Class '${ namedParameters.className }' is required the initialization while initializing method ` +
          `'${ namedParameters.initializingMethodName }' has not been called.`
};


export default ClassRequiredInitializationHasNotBeenExecutedErrorLocalization__English;
