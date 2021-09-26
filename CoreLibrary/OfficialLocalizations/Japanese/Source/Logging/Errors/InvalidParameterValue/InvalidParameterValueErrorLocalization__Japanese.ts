import { InvalidParameterValueError, insertSubstring } from "@yamato-daiwa/es-extensions";


const InvalidParameterValueErrorLocalization__Japanese: InvalidParameterValueError.Localization = {
  defaultTitle: "引数不正値",
  genericDescriptionPartTemplate:
      (parametersObject: InvalidParameterValueError.Localization.GenericDescriptionPartTemplateParameters): string =>
          `パラメーター：'${parametersObject.parameterName}'の値は不備が有る。` +
          `${insertSubstring(parametersObject.messageSpecificPart, {
            modifier: (messageSpecificPart: string): string => `\n${messageSpecificPart}`
          })}`
};


export default InvalidParameterValueErrorLocalization__Japanese;
