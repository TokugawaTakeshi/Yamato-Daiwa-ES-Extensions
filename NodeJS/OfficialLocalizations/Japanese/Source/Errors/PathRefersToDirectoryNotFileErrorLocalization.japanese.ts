import type { PathRefersToDirectoryNotFileError } from "@yamato-daiwa/es-extensions-nodejs";


const pathRefersToDirectoryNotFileErrorLocalization__russian: PathRefersToDirectoryNotFileError.Localization = {
  defaultTitle: "対象パスはファイルではなくディレクトリと関連",
  genericDescription:
      ({ targetPath }: PathRefersToDirectoryNotFileError.Localization.CommonDescription.TemplateVariables): string =>
          `期待に外れて、パス「${ targetPath }」はファイルではなく、ディレクトリに参照している。`
};


export default pathRefersToDirectoryNotFileErrorLocalization__russian;
