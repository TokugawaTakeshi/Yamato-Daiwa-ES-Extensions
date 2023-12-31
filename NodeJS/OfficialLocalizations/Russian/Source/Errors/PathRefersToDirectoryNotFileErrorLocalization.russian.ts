import type { PathRefersToDirectoryNotFileError } from "@yamato-daiwa/es-extensions-nodejs";


const PathRefersToDirectoryNotFileErrorLocalization__russian: PathRefersToDirectoryNotFileError.Localization = {
  defaultTitle: "Целевой файл является директорией",
  genericDescription:
      ({ targetPath }: PathRefersToDirectoryNotFileError.Localization.CommonDescription.TemplateVariables): string =>
          `Вопреки ожиданиям, путь "${ targetPath }" ссылается на директорию, а не на файл.`
};


export default PathRefersToDirectoryNotFileErrorLocalization__russian;
