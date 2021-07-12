"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ConfigFileNotFoundErrorLocalization__English = {
    defaultTitle: "Configuration file not found",
    genericDescriptionPartTemplate(parametersObject) {
        if (Array.isArray(parametersObject.configFilePathOrMultipleOfThem)) {
            return `None of below ${parametersObject.targetTechnologyName} configuration files found.\n` +
                `${parametersObject.configFilePathOrMultipleOfThem.join(", ")}`;
        }
        return `The ${parametersObject.targetTechnologyName} configuration file ` +
            `${parametersObject.configFilePathOrMultipleOfThem} not found.`;
    }
};
exports.default = ConfigFileNotFoundErrorLocalization__English;
