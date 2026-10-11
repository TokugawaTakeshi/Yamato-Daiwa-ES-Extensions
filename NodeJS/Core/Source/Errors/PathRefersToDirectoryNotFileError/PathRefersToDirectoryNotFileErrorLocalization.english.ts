import type PathRefersToDirectoryNotFileError from "./PathRefersToDirectoryNotFileError";


const pathRefersToDirectoryNotFileErrorLocalization__english: PathRefersToDirectoryNotFileError.Localization = {
  defaultTitle: "Desired File Actually is the Directory",
  genericDescription:
      ({ targetPath }: PathRefersToDirectoryNotFileError.Localization.CommonDescription.TemplateVariables): string =>
          `Contrary to expectations, path "${ targetPath }" refers to directory, not file.`
};


export default pathRefersToDirectoryNotFileErrorLocalization__english;
