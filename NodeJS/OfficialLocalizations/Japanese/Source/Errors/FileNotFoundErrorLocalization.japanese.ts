import type { FileNotFoundError } from "@yamato-daiwa/es-extensions-nodejs";


const fileNotFoundErrorLocalization__russian: FileNotFoundError.Localization = {
  defaultTitle: "ファイルが見つからなかった",
  generateDescriptionCommonPart:
      ({ filePath }: FileNotFoundError.Localization.CommonDescription.TemplateParameters): string =>
          `パス「${ filePath }」のファイルが発見されず。`
};


export default fileNotFoundErrorLocalization__russian;
