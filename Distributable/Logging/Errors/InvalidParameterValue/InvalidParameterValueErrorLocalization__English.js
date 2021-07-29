import insertSubstring from "../../../Strings/insertSubstring";
const InvalidParameterValueErrorLocalization__English = {
    defaultTitle: "Invalid parameter value",
    genericDescriptionPartTemplate: (parametersObject) => `The value of parameter ${parametersObject.parameterName} is invalid.` +
        `${insertSubstring(parametersObject.messageSpecificPart, {
            modifier: (messageSpecificPart) => `\n${messageSpecificPart}`
        })}`
};
export default InvalidParameterValueErrorLocalization__English;
