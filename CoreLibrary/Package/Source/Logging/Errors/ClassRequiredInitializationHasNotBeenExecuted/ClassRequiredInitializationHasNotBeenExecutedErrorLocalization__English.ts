import ClassRequiredInitializationHasNotBeenExecutedError from "./ClassRequiredInitializationHasNotBeenExecutedError";


const ClassRequiredInitializationHasNotBeenExecutedErrorLocalization__English:
    ClassRequiredInitializationHasNotBeenExecutedError.Localization = {

  defaultTitle: "Class required initialization has not been executed",
  genericDescriptionPartTemplate:
      (
        parametersObject: ClassRequiredInitializationHasNotBeenExecutedError.Localization.
            GenericDescriptionPartTemplateParameters
      ): string =>
          `Class: ${parametersObject.className} required the initialization but initializing method ` +
          `${parametersObject.initializingMethodName} has not been called.`
};


export default ClassRequiredInitializationHasNotBeenExecutedErrorLocalization__English;
