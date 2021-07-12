"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const insertSubstring_1 = require("../../../Strings/insertSubstring");
const InvalidParameterValueErrorLocalization__English = {
    defaultTitle: "Invalid parameter value",
    genericDescriptionPartTemplate: (parametersObject) => `The value of parameter ${parametersObject.parameterName} is invalid.` +
        `${insertSubstring_1.default(parametersObject.messageSpecificPart, {
            modifier: (messageSpecificPart) => `\n${messageSpecificPart}`
        })}`
};
exports.default = InvalidParameterValueErrorLocalization__English;
