import type ClassRequiredInitializationHasNotBeenExecutedError from "./ClassRequiredInitializationHasNotBeenExecutedError";


const classRequiredInitializationHasNotBeenExecutedErrorLocalization__english:
    ClassRequiredInitializationHasNotBeenExecutedError.Localization = {

  defaultTitle: "Class Required Initialization has not been Executed",
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
