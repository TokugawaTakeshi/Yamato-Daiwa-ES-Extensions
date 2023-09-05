import type ClassRequiredInitializationHasNotBeenExecutedError from "./ClassRequiredInitializationHasNotBeenExecutedError";


const classRequiredInitializationHasNotBeenExecutedErrorLocalization__english:
    ClassRequiredInitializationHasNotBeenExecutedError.Localization = {

  defaultTitle: "Class required initialization has not been executed",
  generateDescription:
      (
        {
          className,
          initializingMethodName
        }: ClassRequiredInitializationHasNotBeenExecutedError.Localization.DescriptionTemplateVariables
      ): string =>
          `Class "${ className }" is required the initialization while initializing method "${ initializingMethodName }" ` +
            "has not been called."

};


export default classRequiredInitializationHasNotBeenExecutedErrorLocalization__english;
