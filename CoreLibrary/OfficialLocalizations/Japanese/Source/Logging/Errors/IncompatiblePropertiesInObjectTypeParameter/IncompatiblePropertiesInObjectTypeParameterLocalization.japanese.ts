import type { IncompatiblePropertiesInObjectTypeParameterError } from "@yamato-daiwa/es-extensions";


const IncompatiblePropertiesInObjectTypeParameterErrorLocalization__Japanese:
    IncompatiblePropertiesInObjectTypeParameterError.Localization =
    {
      defaultTitle: "Incompatible properties in object-type parameter",
      generateDescription: (
        namedParameters: IncompatiblePropertiesInObjectTypeParameterError.Localization.DescriptionTemplateNamedParameters
      ): string => `オブジェクト型引数「${ namedParameters.parameterName }」においてプロパティ「${ namedParameters.conflictingPropertyName }」 ` +
          "は下記のプロパティとの日相互。" +
          `${ namedParameters.incompatiblePropertiesNames.reduce((accumulatingString: string, propertyName: string): string =>
              `${ accumulatingString }\n- ${ propertyName }`, "") }`
    };


export default IncompatiblePropertiesInObjectTypeParameterErrorLocalization__Japanese;
