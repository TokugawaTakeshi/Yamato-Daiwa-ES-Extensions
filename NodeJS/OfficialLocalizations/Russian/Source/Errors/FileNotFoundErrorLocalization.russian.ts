import type { FileNotFoundError } from "@yamato-daiwa/es-extensions-nodejs";


const fileNotFoundErrorLocalization__russian: FileNotFoundError.Localization = {
  defaultTitle: "Файл не найден",
  generateDescriptionCommonPart:
      ({ filePath }: FileNotFoundError.Localization.CommonDescription.TemplateVariables): string =>
          `Файл соответствующий пути "${ filePath }" не найден.`
};


export default fileNotFoundErrorLocalization__russian;
