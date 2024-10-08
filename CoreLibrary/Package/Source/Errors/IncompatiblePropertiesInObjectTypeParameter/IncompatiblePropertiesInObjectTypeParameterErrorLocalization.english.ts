import type IncompatiblePropertiesInObjectTypeParameterError from "./IncompatiblePropertiesInObjectTypeParameterError";


const incompatiblePropertiesInObjectTypeParameterErrorLocalization__english:
    IncompatiblePropertiesInObjectTypeParameterError.Localization =
{
  defaultTitle: "Incompatible properties in object-type parameter",
  generateDescription: (
    {
      parameterName,
      conflictingPropertyName,
      incompatiblePropertiesNames
    }: IncompatiblePropertiesInObjectTypeParameterError.Localization.DescriptionTemplateVariables
  ): string =>
      `In parameter "${ parameterName }", property "${ conflictingPropertyName }" is incompatible with properties:` +
      incompatiblePropertiesNames.reduce(
        (accumulatingString: string, propertyName: string): string => `${ accumulatingString }\n- ${ propertyName }`, ""
      )
};


export default incompatiblePropertiesInObjectTypeParameterErrorLocalization__english;
