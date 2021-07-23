"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IncompatiblePropertiesInObjectTypeParameterErrorLocalization__English = {
    defaultTitle: "Incompatible properties in object-type parameter",
    genericDescriptionPartTemplate: (parametersObject) => `In parameter '${parametersObject.parameterName}, property '${parametersObject.conflictingPropertyName}' ` +
        "is incompatible with properties:" +
        `${parametersObject.incompatiblePropertiesNames.reduce((accumulatingString, propertyName) => `${accumulatingString}\n- ${propertyName}`, "")}`
};
exports.default = IncompatiblePropertiesInObjectTypeParameterErrorLocalization__English;
