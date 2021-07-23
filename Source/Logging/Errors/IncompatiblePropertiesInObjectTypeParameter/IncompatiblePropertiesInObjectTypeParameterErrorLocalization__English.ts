import IncompatiblePropertiesInObjectTypeParameterError from "./IncompatiblePropertiesInObjectTypeParameterError";


const IncompatiblePropertiesInObjectTypeParameterErrorLocalization__English:
    IncompatiblePropertiesInObjectTypeParameterError.Localization =
{
  defaultTitle: "Incompatible properties in object-type parameter",
  genericDescriptionPartTemplate: (
    parametersObject: IncompatiblePropertiesInObjectTypeParameterError.Localization.GenericDescriptionPartTemplateParameters
  ): string => `In parameter '${parametersObject.parameterName}, property '${parametersObject.conflictingPropertyName}' ` +
      "is incompatible with properties:" +
      `${parametersObject.incompatiblePropertiesNames.reduce((accumulatingString: string, propertyName: string): string => 
        `${accumulatingString}\n- ${propertyName}`, "")}`
};


export default IncompatiblePropertiesInObjectTypeParameterErrorLocalization__English;
