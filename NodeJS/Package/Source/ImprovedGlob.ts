import { glob as Glob } from "glob";
import { minimatch } from "minimatch";
import {
  replaceDoubleBackslashesWithForwardSlashes,
  removeSpecificCharacterFromCertainPosition,
  isNonEmptyArray,
  Logger,
  InvalidParameterValueError
} from "@yamato-daiwa/es-extensions";
import appendCharacterIfItDoesNotPresentInLastPosition from "./Temporary/appendCharacterIfItDoesNotPresentInLastPosition";


export default class ImprovedGlob {

  /** @description Unlike 'glob.sync' supports multiple Glob selectors. */
  public static getFilesAbsolutePathsSynchronously(
    globSelectors: ReadonlyArray<string>,
    options: Readonly<{
      alwaysForwardSlashSeparators?: boolean;
    }> = {}
  ): Array<string> {

    const inclusiveGlobSelectors: Array<string> = [];
    const exclusiveGlobSelectors: Array<string> = [];

    for (const globSelector of globSelectors) {
      (ImprovedGlob.isExcludingGlobSelector(globSelector) ? exclusiveGlobSelectors : inclusiveGlobSelectors).
          push(replaceDoubleBackslashesWithForwardSlashes(globSelector));
    }


    const matchingFilesAbsolutePaths: Array<string> = [];

    for (const inclusiveGlobSelector of inclusiveGlobSelectors) {
      matchingFilesAbsolutePaths.push(
        ...Glob.sync(
          inclusiveGlobSelector,
          {
            ignore: exclusiveGlobSelectors.map(
              (globSelector: string): string => removeSpecificCharacterFromCertainPosition({
                targetString: globSelector,
                fromFirstPosition: true,
                targetCharacter: "!"
              })
            )
          }
        )
      );
    }

    if (options.alwaysForwardSlashSeparators !== true) {
      return matchingFilesAbsolutePaths;
    }


    return matchingFilesAbsolutePaths.map(
      (fileAbsolutePath: string): string => replaceDoubleBackslashesWithForwardSlashes(fileAbsolutePath)
    );

  }

  /** @description The facading of "minimatch".　*/
  public static isFilePathMatchingWithGlobSelector(
    compoundParameter: Readonly<{ filePath: string; globSelector: string; }>
  ): boolean {
    return minimatch(compoundParameter.filePath, compoundParameter.globSelector);
  }

  /** @description Unlike "minimatch" supports multiple Glob selectors.　*/
  public static isFilePathMatchingWithAllGlobSelectors(
    compoundParameter: Readonly<{ filePath: string; globSelectors: ReadonlyArray<string> | string; }>
  ): boolean {
    return (
      Array.isArray(compoundParameter.globSelectors) ?
          compoundParameter.globSelectors : [ compoundParameter.globSelectors ]
    ).
        every((globSelector: string): boolean => minimatch(compoundParameter.filePath, globSelector));
  }

  public static isExcludingGlobSelector(globSelector: string): boolean {
    return globSelector.startsWith("!");
  }

  /* [ Output examples ]
   * C:/Users/.../SomeSPA/00-Source/01-Open/01-Markup/*.+(pug)
   * C:/Users/.../SomeSPA/00-Source/01-Open/01-Markup/*.+(pug|haml) */
  public static buildAllFilesInCurrentDirectoryButNotBelowGlobSelector(
    compoundParameter: {
      basicDirectoryPath: string;
      fileNamesExtensions?: ReadonlyArray<string>;
    }
  ): string {
    return [
      appendCharacterIfItDoesNotPresentInLastPosition({
        targetString: replaceDoubleBackslashesWithForwardSlashes(compoundParameter.basicDirectoryPath),
        trailingCharacter: "/"
      }),
      "*",
      ...isNonEmptyArray(compoundParameter.fileNamesExtensions) ?
          [ ImprovedGlob.createMultipleFilenameExtensionsGlobPostfix(compoundParameter.fileNamesExtensions) ] : []
    ].join("");
  }

  public static buildAllFilesInCurrentDirectoryAndBelowGlobSelector(
      compoundParameter: Readonly<{
        basicDirectoryPath: string;
        fileNamesExtensions?: ReadonlyArray<string>;
      }>
  ): string {
    return [
      appendCharacterIfItDoesNotPresentInLastPosition({
        targetString: replaceDoubleBackslashesWithForwardSlashes(compoundParameter.basicDirectoryPath),
        trailingCharacter: "/"
      }),
      "**/**",
      ...isNonEmptyArray(compoundParameter.fileNamesExtensions) ?
          [ ImprovedGlob.createMultipleFilenameExtensionsGlobPostfix(compoundParameter.fileNamesExtensions) ] : []
    ].join("");
  }

  public static buildExcludingOfDirectoryWithSubdirectoriesGlobSelector(targetDirectoryPath: string): string {
    return [
      "!",
      appendCharacterIfItDoesNotPresentInLastPosition({
        targetString: replaceDoubleBackslashesWithForwardSlashes(targetDirectoryPath),
        trailingCharacter: "/"
      }),
      "**/**"
    ].join("");
  }

  /* [ Theory ] '_**.@(pug)' is the valid alternative of '@(_)**.@(pug)' but only when excluding prefix is single while
   *     we need to scale the solution to arbitrary number of prefixes. */
  // [ Output example ] !D:/Project/ExampleProject/Source/Open/Pages/**/@(_)**.@(pug)
  // [ Output example ] !D:/Project/ExampleProject/Source/Open/Pages/**/@(_|--)**.@(pug)
  // [ Output example ] !D:/Project/ExampleProject/Source/Open/Pages/**/@(_)**.@(pug|haml)
  public static buildExcludingOfFilesWithSpecificPrefixesGlobSelector(
    compoundParameter: Readonly<{
      basicDirectoryPath: string;
      filesNamesPrefixes: ReadonlyArray<string>;
      filesNamesExtensions: ReadonlyArray<string>;
    }>
  ): string {

    if (compoundParameter.filesNamesPrefixes.length === 0) {
      Logger.throwErrorAndLog({
        errorInstance: new InvalidParameterValueError({
          parameterName: "compoundParameter.filesNamesPrefixes",
          parameterNumber: 1,
          messageSpecificPart: "At least one file name prefix must be specified."
        }),
        title: InvalidParameterValueError.localization.defaultTitle,
        occurrenceLocation: "ImprovedGlob.buildExcludingOfFilesWithSpecificPrefixesGlobSelector(compoundParameter)"
      });
    }


    if (compoundParameter.filesNamesExtensions.length === 0) {
      Logger.throwErrorAndLog({
        errorInstance: new InvalidParameterValueError({
          parameterName: "compoundParameter.filesNamesExtensions",
          parameterNumber: 1,
          messageSpecificPart: "At least on file name extension must be specified."
        }),
        title: InvalidParameterValueError.localization.defaultTitle,
        occurrenceLocation: "ImprovedGlob.buildExcludingOfFilesWithSpecificPrefixesGlobSelector(compoundParameter)"
      });
    }

    return [
      "!",
      appendCharacterIfItDoesNotPresentInLastPosition({
        targetString: replaceDoubleBackslashesWithForwardSlashes(compoundParameter.basicDirectoryPath),
        trailingCharacter: "/"
      }),
      "**/",
      `@(${ compoundParameter.filesNamesPrefixes.join("|") })**`,
      `${ ImprovedGlob.createMultipleFilenameExtensionsGlobPostfix(compoundParameter.filesNamesExtensions) }`
    ].join("");

  }

  // [ Output Example ] !Open/Pages/@(_|--|test)**/**/**.@(pug|haml)
  // [ Output Example ] !Open/Pages/@(_)**/**/**.@(pug|haml)
  public static buildExcludingOfFilesInSubdirectoriesWithSpecificPrefixesGlobSelector(
    compoundParameter: Readonly<{
      basicDirectoryPath: string;
      subdirectoriesPrefixes: ReadonlyArray<string>;
      filesNamesExtensions?: ReadonlyArray<string>;
    }>
  ): string {

    if (compoundParameter.subdirectoriesPrefixes.length === 0) {
      Logger.throwErrorAndLog({
        errorInstance: new InvalidParameterValueError({
          parameterName: "compoundParameter.subdirectoriesPrefixes",
          parameterNumber: 1,
          messageSpecificPart: "The property \"subdirectoriesPrefixes\" must be defined with non-empty array."
        }),
        title: InvalidParameterValueError.localization.defaultTitle,
        occurrenceLocation: "ImprovedGlob." +
            "buildExcludingOfFilesInSubdirectoriesWithSpecificPrefixesGlobSelector(compoundParameter)"
      });
    }

    return [
      "!",
      appendCharacterIfItDoesNotPresentInLastPosition({
        targetString: replaceDoubleBackslashesWithForwardSlashes(compoundParameter.basicDirectoryPath),
        trailingCharacter: "/"
      }),
      "**/",
      `@(${ compoundParameter.subdirectoriesPrefixes.join("|") })**/**/**`,
      ...isNonEmptyArray(compoundParameter.filesNamesExtensions) ?
          `${ ImprovedGlob.createMultipleFilenameExtensionsGlobPostfix(compoundParameter.filesNamesExtensions) }` : []
    ].join("");

  }

  // [ Output example ] !Open/Pages/@(subdir1|subdir2)**/**.@(pug|haml)
  public static buildExcludingOfFilesInSpecificSubdirectoriesGlobSelector(
    compoundParameter: Readonly<{
      basicDirectoryPath: string;
      subdirectoriesNames: ReadonlyArray<string>;
      filesNamesExtensions?: ReadonlyArray<string>;
    }>
  ): string {

    if (compoundParameter.subdirectoriesNames.length === 0) {
      Logger.throwErrorAndLog({
        errorInstance: new InvalidParameterValueError({
          parameterName: "compoundParameter.subdirectoriesNames",
          parameterNumber: 1,
          messageSpecificPart: "The property \"subdirectoriesNames\" must be defined with non-empty array."
        }),
        title: InvalidParameterValueError.localization.defaultTitle,
        occurrenceLocation: "ImprovedGlob.buildExcludingOfFilesInSpecificSubdirectoriesGlobSelector(compoundParameter)"
      });
    }

    return [
      "!",
      appendCharacterIfItDoesNotPresentInLastPosition({
        targetString: replaceDoubleBackslashesWithForwardSlashes(compoundParameter.basicDirectoryPath),
        trailingCharacter: "/"
      }),
      `@(${ compoundParameter.subdirectoriesNames.join("|") })/**/**`,
      ...isNonEmptyArray(compoundParameter.filesNamesExtensions) ?
          `${ ImprovedGlob.createMultipleFilenameExtensionsGlobPostfix(compoundParameter.filesNamesExtensions) }` : []
    ].join("");

  }

  /* [ Output examples ]
   * `[ ".js" ]` case : `".+(js)"`
   * `[ ".js", ".ts" ]` case: `".+(js|ts)"`
   * `[ ".js", ".ts", ".dart" ]` case: `".+(js|ts|dart)"` */
  public static createMultipleFilenameExtensionsGlobPostfix(
    fileNamesExtensions: ReadonlyArray<string>
  ): string {
    return `.@(${ fileNamesExtensions.join("|").replace(/\./gu, "") })`;
  }

  public static buildAbsolutePathBasedGlob(
    compoundParameter: Readonly<{
      basicDirectoryPath: string;
      relativePathBasedGlob: string;
      isExclusive?: boolean;
    }>
  ): string {
    return [
      compoundParameter.isExclusive === true ? [ "!" ] : [],
      appendCharacterIfItDoesNotPresentInLastPosition({
        targetString: replaceDoubleBackslashesWithForwardSlashes(compoundParameter.basicDirectoryPath),
        trailingCharacter: "/"
      }),
      removeSpecificCharacterFromCertainPosition({
        targetString: replaceDoubleBackslashesWithForwardSlashes(compoundParameter.relativePathBasedGlob),
        targetCharacter: "/",
        fromLastPosition: true
      })
    ].join("");
  }

}
