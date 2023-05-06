import type { DesiredFileActuallyIsDirectoryError } from "@yamato-daiwa/es-extensions-nodejs";


const desiredFileActuallyIsDirectoryErrorLocalization__russian: DesiredFileActuallyIsDirectoryError.Localization = {
  defaultTitle: "Целевой файл является директорией",
  genericDescription:
      ({ targetPath }: DesiredFileActuallyIsDirectoryError.Localization.CommonDescription.TemplateParameters): string =>
          `Вопреки ожиданиям, путь "${ targetPath }" ссылается на директорию, а не на файл.`
};


export default desiredFileActuallyIsDirectoryErrorLocalization__russian;
