import type { IncompatiblePropertiesInObjectTypeParameterError } from "@yamato-daiwa/es-extensions";


export const incompatiblePropertiesInObjectTypeParameterErrorLocalization__russian:
    IncompatiblePropertiesInObjectTypeParameterError.Localization =
    {
      defaultTitle: "Несовместимые свойства в объектном параметре",
      generateDescription: (
        {
          parameterName,
          conflictingPropertyName,
          incompatiblePropertiesNames
        }: IncompatiblePropertiesInObjectTypeParameterError.Localization.DescriptionTemplateVariables
      ): string =>
          `В параметре "${ parameterName }" типа "объект" свойство "${ conflictingPropertyName }" несовместимо со ` +
            "следующими свойствами:\n" +
            incompatiblePropertiesNames.map((propertyName: string): string => `● ${ propertyName }`).join("\n")
    };
