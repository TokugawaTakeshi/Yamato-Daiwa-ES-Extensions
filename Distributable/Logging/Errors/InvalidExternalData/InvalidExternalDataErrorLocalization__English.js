"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidExternalDataErrorLocalization__English = void 0;
const insertSubstring_1 = require("../../../Strings/insertSubstring");
exports.InvalidExternalDataErrorLocalization__English = {
    defaultTitle: "Invalid external data",
    genericDescriptionPartTemplate: (parametersObject) => `The data: ${parametersObject.mentionToExpectedData} does not match wil expected` +
        `${insertSubstring_1.default(parametersObject.messageSpecificPart, {
            modifier: (messageSpecificPart) => `\n${messageSpecificPart}`
        })}`
};
exports.default = exports.InvalidExternalDataErrorLocalization__English;
