import type { DesiredFileActuallyIsDirectoryError } from "@yamato-daiwa/es-extensions-nodejs";


const desiredFileActuallyIsDirectoryErrorLocalization__russian: DesiredFileActuallyIsDirectoryError.Localization = {
  defaultTitle: "対象パスはファイルではなくディレクトリと関連",
  genericDescription:
      ({ targetPath }: DesiredFileActuallyIsDirectoryError.Localization.CommonDescription.TemplateParameters): string =>
          `期待に外れて、パス「${ targetPath }」はファイルではなく、ディレクトリに参照している。`
};


export default desiredFileActuallyIsDirectoryErrorLocalization__russian;
