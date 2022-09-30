import type IncompatiblePropertiesInObjectTypeParameterError from "./IncompatiblePropertiesInObjectTypeParameterError";


const IncompatiblePropertiesInObjectTypeParameterErrorLocalization__English:
    IncompatiblePropertiesInObjectTypeParameterError.Localization =
{
  defaultTitle: "Incompatible properties in object-type parameter",
  generateDescription: (
    namedParameters: IncompatiblePropertiesInObjectTypeParameterError.Localization.DescriptionTemplateNamedParameters
  ): string => `In parameter '${ namedParameters.parameterName }, property '${ namedParameters.conflictingPropertyName }' ` +
      "is incompatible with properties:" +
      `${ namedParameters.incompatiblePropertiesNames.reduce((accumulatingString: string, propertyName: string): string => 
        `${ accumulatingString }\n- ${ propertyName }`, "") }`
};


export default IncompatiblePropertiesInObjectTypeParameterErrorLocalization__English;
