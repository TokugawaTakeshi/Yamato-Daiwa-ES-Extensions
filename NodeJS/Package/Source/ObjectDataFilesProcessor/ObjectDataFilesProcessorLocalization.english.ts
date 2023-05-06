import ObjectDataFilesProcessor from "./ObjectDataFilesProcessor";

import Localization = ObjectDataFilesProcessor.Localization;


const objectDataFilesProcessorLocalization__english: Localization = {

  generateUnableToDecideDataParsingAlgorithmErrorMessage: (
    { filePath }: Localization.UnableToDecideDataParsingAlgorithmErrorMessage.TemplateVariables
  ): string =>
      `Unable to decide the data parsing algorithm because target file path "${ filePath }" has no the file name extension. ` +
      "If it is intentional, specify \"dataSchema\" property with desired element of " +
        "\"ObjectDataFilesProcessor.SupportedSchemas\" enumeration.",

  generateUnsupportedFileNameExtension: (
    { filePath, fileNameLastExtensionWithoutLeadingDot }: Localization.UnsupportedFileNameExtensionErrorMessage.TemplateVariables
  ): string =>
      `Target file "${ filePath }" has unsupported file name extension "${ fileNameLastExtensionWithoutLeadingDot }". ` +
      "If it is intentional and this file including the data of known for \"ObjectDataFilesProcessor\" schema, please specify " +
        "\"compoundParameter.dataSchema\" with desired element of \"ObjectDataFilesProcessor.SupportedSchemas\" enumeration."

};


export default objectDataFilesProcessorLocalization__english;
