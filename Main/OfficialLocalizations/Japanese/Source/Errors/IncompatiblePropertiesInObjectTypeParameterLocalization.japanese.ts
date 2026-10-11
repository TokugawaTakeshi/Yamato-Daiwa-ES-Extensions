import type { IncompatiblePropertiesInObjectTypeParameterError } from "@yamato-daiwa/es-extensions";


export const incompatiblePropertiesInObjectTypeParameterErrorLocalization__japanese:
    IncompatiblePropertiesInObjectTypeParameterError.Localization =
    {
      defaultTitle: "オブジェクト型引数の非互換プロパティ",
      generateDescription: (
        {
          parameterName,
          conflictingPropertyName,
          incompatiblePropertiesNames
        }: IncompatiblePropertiesInObjectTypeParameterError.Localization.DescriptionTemplateVariables
      ): string =>
          `オブジェクト型引数「${ parameterName }」のプロパティ「${ conflictingPropertyName }」 は、下記のプロパティと互換性が無い。\n` +
          incompatiblePropertiesNames.map((propertyName: string): string => `●  ${ propertyName }`).join("\n")
    };
