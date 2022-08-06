import type { IncompatiblePropertiesInObjectTypeParameterError } from "@yamato-daiwa/es-extensions";


const IncompatiblePropertiesInObjectTypeParameterErrorLocalization__Japanese:
    IncompatiblePropertiesInObjectTypeParameterError.Localization =
    {
      defaultTitle: "オブジェクト型引数に於ける非相互的プロパティ",
      generateDescription: (
        namedParameters: IncompatiblePropertiesInObjectTypeParameterError.Localization.DescriptionTemplateNamedParameters
      ): string => `オブジェクト型引数「${ namedParameters.parameterName }」に於いてプロパティ「${ namedParameters.conflictingPropertyName }」 ` +
          "は下記のプロパティとの日相互。" +
          `${ namedParameters.incompatiblePropertiesNames.reduce((accumulatingString: string, propertyName: string): string =>
              `${ accumulatingString }\n- ${ propertyName }`, "") }`
    };


export default IncompatiblePropertiesInObjectTypeParameterErrorLocalization__Japanese;
