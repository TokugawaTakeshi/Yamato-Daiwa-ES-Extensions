import type { IncompatiblePropertiesInObjectTypeParameterError } from "@yamato-daiwa/es-extensions";


const IncompatiblePropertiesInObjectTypeParameterErrorLocalization__Russian:
    IncompatiblePropertiesInObjectTypeParameterError.Localization =
    {
      defaultTitle: "Несовместимые свойства в объектном параметре",
      generateDescription: (
        namedParameters: IncompatiblePropertiesInObjectTypeParameterError.Localization.DescriptionTemplateNamedParameters
      ): string => `В параметре '${ namedParameters.parameterName }' типа 'объект' свойство ` +
          `'${ namedParameters.conflictingPropertyName }' несовместимо со следующими свойствами:` +
          `${ namedParameters.incompatiblePropertiesNames.reduce((accumulatingString: string, propertyName: string): string =>
              `${ accumulatingString }\n- ${ propertyName }`, "") }`
    };


export default IncompatiblePropertiesInObjectTypeParameterErrorLocalization__Russian;
