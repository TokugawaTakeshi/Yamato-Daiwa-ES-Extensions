import type { IncompatiblePropertiesInObjectTypeParameterError } from "@yamato-daiwa/es-extensions";


const IncompatiblePropertiesInObjectTypeParameterErrorLocalization__Japanese:
    IncompatiblePropertiesInObjectTypeParameterError.Localization =
    {
      defaultTitle: "オブジェクト型引数の非互換プロパティ",
      generateDescription: (
        namedParameters: IncompatiblePropertiesInObjectTypeParameterError.Localization.DescriptionTemplateNamedParameters
      ): string => `オブジェクト型引数「${ namedParameters.parameterName }」のプロパティ「${ namedParameters.conflictingPropertyName }」 ` +
          "は、下記のプロパティと互換性が無い。" +
          `${ namedParameters.incompatiblePropertiesNames.reduce((accumulatingString: string, propertyName: string): string =>
              `${ accumulatingString }\n- ${ propertyName }`, "") }`
    };


export default IncompatiblePropertiesInObjectTypeParameterErrorLocalization__Japanese;
