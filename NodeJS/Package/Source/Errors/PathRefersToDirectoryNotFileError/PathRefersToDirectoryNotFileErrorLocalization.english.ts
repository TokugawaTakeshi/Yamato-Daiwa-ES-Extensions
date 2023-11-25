import type PathRefersToDirectoryNotFileError from "./PathRefersToDirectoryNotFileError";


const pathRefersToDirectoryNotFileErrorLocalization__english: PathRefersToDirectoryNotFileError.Localization = {
  defaultTitle: "Desired file actually is the directory",
  genericDescription:
      ({ targetPath }: PathRefersToDirectoryNotFileError.Localization.CommonDescription.TemplateVariables): string =>
          `Contrary to expectations, path "${ targetPath }" refers to directory, not file.`
};


export default pathRefersToDirectoryNotFileErrorLocalization__english;
