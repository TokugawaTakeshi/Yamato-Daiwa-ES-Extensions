import insertSubstring from "../../../Strings/insertSubstring";
export const InvalidExternalDataErrorLocalization__English = {
    defaultTitle: "Invalid external data",
    genericDescriptionPartTemplate: (parametersObject) => `The data: ${parametersObject.mentionToExpectedData} does not match with expected.` +
        `${insertSubstring(parametersObject.messageSpecificPart, {
            modifier: (messageSpecificPart) => `\n${messageSpecificPart}`
        })}`
};
export default InvalidExternalDataErrorLocalization__English;
