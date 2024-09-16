import type { ConfigFileNotFoundError } from "@yamato-daiwa/es-extensions";
import { isString, isNonEmptyString } from "@yamato-daiwa/es-extensions";


export const configFileNotFoundErrorLocalization__japanese: ConfigFileNotFoundError.Localization = {
  defaultTitle: "設定ファイル未発見",
  generateDescription: (
    {
      configFilePathOrMultipleOfThem,
      targetTechnologyName,
      messageSpecificPart
    }: ConfigFileNotFoundError.Localization.DescriptionTemplateVariables
  ): string => [

      isString(configFilePathOrMultipleOfThem) ?
          [ `「${ targetTechnologyName }」の設定ファイル「${ configFilePathOrMultipleOfThem }」が発見出来なかった。` ] :
          [
            `「${ targetTechnologyName }」、\n` +
              `${ configFilePathOrMultipleOfThem.join(", \n") }\nの、どちらの設定ファイルも発見出来なかった。`
          ],

      isNonEmptyString(messageSpecificPart) ? [ `\n${ messageSpecificPart }` ] : []

    ].join("")

};
