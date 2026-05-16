import { glob as Glob } from "glob";
import { minimatch } from "minimatch";
import {
  replaceDoubleBackslashesWithForwardSlashes,
  removeSpecificCharacterFromCertainPosition,
  isUndefined,
  isNonEmptyArray,
  isString,
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
            ),
            nodir: true,
            dot: true
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

  public static isFilePathMatchingWithAtLeastOneGlobSelector(
    { filePath, globSelectors }: Readonly<{ filePath: string; globSelectors: ReadonlyArray<string> | ReadonlySet<string>; }>
  ): boolean {
    return (Array.isArray(globSelectors) ? globSelectors : [ ...globSelectors ]).
        some((globSelector: string): boolean => minimatch(filePath, globSelector));
  }

  public static isExcludingGlobSelector(globSelector: string): boolean {
    return globSelector.startsWith("!");
  }


  /* ━━━ Building of Glob Selectors ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

  /* [ Output examples ]
   * C:/Users/.../SomeSPA/00-Source/01-Open/01-Markup/*.+(pug)
   * C:/Users/.../SomeSPA/00-Source/01-Open/01-Markup/*.+(pug|haml) */
  public static buildAllFilesInCurrentDirectoryButNotBelowGlobSelector(
    compoundParameter: {
      basicDirectoryPath: string;
      fileNamesExtensions?: ReadonlyArray<string> | ReadonlySet<string>;
    }
  ): string {

    let fileNamesExtensions: ReadonlySet<string>;

    if (isUndefined(compoundParameter.fileNamesExtensions)) {
      fileNamesExtensions = new Set();
    } else if (compoundParameter.fileNamesExtensions instanceof Set) {
      fileNamesExtensions = compoundParameter.fileNamesExtensions;
    } else {
      fileNamesExtensions = new Set(compoundParameter.fileNamesExtensions);
    }

    return [
      appendCharacterIfItDoesNotPresentInLastPosition({
        targetString: replaceDoubleBackslashesWithForwardSlashes(compoundParameter.basicDirectoryPath),
        trailingCharacter: "/"
      }),
      "*",
      ...fileNamesExtensions.size > 0 ?
          [ ImprovedGlob.createMultipleFilenameExtensionsGlobPostfix(fileNamesExtensions) ] : []
    ].join("");

  }

  public static buildAllFilesInCurrentDirectoryAndBelowGlobSelector(
    polymorphicParameter:
        string |
        Readonly<{
          basicDirectoryPath: string;
          fileNamesPostfixes?: ReadonlyArray<string> | ReadonlySet<string>;
          fileNamesExtensions?: ReadonlyArray<string> | ReadonlySet<string>;
          penultimateFileNamesExtensions?: ReadonlyArray<string> | ReadonlySet<string>;
        }>
  ): string {


    let basicDirectoryPath: string;
    let fileNamesPostfixes: ReadonlySet<string> = new Set();
    let fileNamesExtensions: ReadonlySet<string> = new Set();
    let penultimateFileNamesExtensions: ReadonlySet<string> = new Set();

    if (isString(polymorphicParameter)) {

      basicDirectoryPath = polymorphicParameter;

    } else {

      basicDirectoryPath = polymorphicParameter.basicDirectoryPath;

      if (polymorphicParameter.fileNamesPostfixes instanceof Set) {
        fileNamesPostfixes = polymorphicParameter.fileNamesPostfixes;
      } else if (Array.isArray(polymorphicParameter.fileNamesPostfixes)) {
        fileNamesPostfixes = new Set(polymorphicParameter.fileNamesPostfixes);
      }

      if (polymorphicParameter.fileNamesExtensions instanceof Set) {
        fileNamesExtensions = polymorphicParameter.fileNamesExtensions;
      } else if (Array.isArray(polymorphicParameter.fileNamesExtensions)) {
        fileNamesExtensions = new Set(polymorphicParameter.fileNamesExtensions);
      }

      if (polymorphicParameter.penultimateFileNamesExtensions instanceof Set) {
        penultimateFileNamesExtensions = polymorphicParameter.penultimateFileNamesExtensions;
      } else if (Array.isArray(polymorphicParameter.penultimateFileNamesExtensions)) {
        penultimateFileNamesExtensions = new Set(polymorphicParameter.penultimateFileNamesExtensions);
      }

    }

    return [

      appendCharacterIfItDoesNotPresentInLastPosition({
        targetString: replaceDoubleBackslashesWithForwardSlashes(basicDirectoryPath),
        trailingCharacter: "/"
      }),

      "**/*",

      ...fileNamesPostfixes.size > 0 ?
          [
            `@(${ 
              Array.from(fileNamesPostfixes).
                  join("|").
                  replace(/\./gu, "") 
            })`
          ] :
          [],

      ...penultimateFileNamesExtensions.size > 0 ?
          [
            `.@(${
              Array.from(penultimateFileNamesExtensions).
                  map(
                    (penultimateFilenameExtension: string): string => 
                        removeSpecificCharacterFromCertainPosition({
                          targetString: penultimateFilenameExtension,
                          targetCharacter: ".",
                          fromFirstPosition: true
                        })
                  ).
                  join("|")
            })`
          ] :
          [],

      /* eslint-disable-next-line no-nested-ternary --
      * Yes, the nested ternary expressions are hard to read and YDEE development side avoiding them as possible,
      * while here to avoid the nested ternary expression, it is required to extract this part outside the outermost
      * array expression that will break the sequential expressions' uniformity. */
      ...fileNamesExtensions.size > 0 ?
          [ ImprovedGlob.createMultipleFilenameExtensionsGlobPostfix(fileNamesExtensions) ] :
              penultimateFileNamesExtensions.size > 0 ? [ "/*" ] : []

    ].join("");

  }


  /* ┅┅┅ Excluding of Directory with Subdirectories ┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅ */
  public static buildExcludingOfDirectoryWithSubdirectoriesGlobSelector(
    polymorphicParameter:
      string |
      Readonly<{
        targetDirectoryPath: string;
        fileNamesPostfixes?: ReadonlyArray<string> | ReadonlySet<string>;
        fileNamesExtensions?: ReadonlyArray<string> | ReadonlySet<string>;
        penultimateFileNamesExtensions?: ReadonlyArray<string> | ReadonlySet<string>;
      }>
  ): string {

    if (isString(polymorphicParameter)) {
      return ImprovedGlob.includingGlobSelectorToExcludingOne(
        ImprovedGlob.buildAllFilesInCurrentDirectoryAndBelowGlobSelector(polymorphicParameter)
      );
    }


    const {
      targetDirectoryPath,
      ...options
    }: Readonly<{
      targetDirectoryPath: string;
      fileNamesPostfixes?: ReadonlyArray<string> | ReadonlySet<string>;
      fileNamesExtensions?: ReadonlyArray<string> | ReadonlySet<string>;
      penultimateFileNamesExtensions?: ReadonlyArray<string> | ReadonlySet<string>;
    }> = polymorphicParameter;

    return ImprovedGlob.includingGlobSelectorToExcludingOne(
        ImprovedGlob.buildAllFilesInCurrentDirectoryAndBelowGlobSelector({
          basicDirectoryPath: targetDirectoryPath,
          ...options
        })
    );
  }

  /* [ Theory ] '_**.@(pug)' is the valid alternative of '@(_)**.@(pug)' but only when excluding prefix is single while
   *     we need to scale the solution to arbitrary number of prefixes. */
  // [ Output example ] !D:/Project/ExampleProject/Source/Open/Pages/**/@(_)*.@(pug)
  // [ Output example ] !D:/Project/ExampleProject/Source/Open/Pages/**/@(_|--)*.@(pug)
  // [ Output example ] !D:/Project/ExampleProject/Source/Open/Pages/**/@(_)*.@(pug|haml)
  public static buildExcludingOfFilesWithSpecificPrefixesGlobSelector(
    compoundParameter: Readonly<{
      basicDirectoryPath: string;
      filesNamesPrefixes: ReadonlyArray<string> | ReadonlySet<string>;
      filesNamesExtensions: ReadonlyArray<string> | ReadonlySet<string>;
    }>
  ): string {

    const filesNamesPrefixes: ReadonlySet<string> =
        compoundParameter.filesNamesPrefixes instanceof Set ?
            compoundParameter.filesNamesPrefixes : new Set(compoundParameter.filesNamesPrefixes);

    if (filesNamesPrefixes.size === 0) {
      Logger.throwErrorWithFormattedMessage({
        errorInstance: new InvalidParameterValueError({
          parameterName: "compoundParameter.filesNamesPrefixes",
          parameterNumber: 1,
          messageSpecificPart: "At least one file name prefix must be specified."
        }),
        title: InvalidParameterValueError.localization.defaultTitle,
        occurrenceLocation: "ImprovedGlob.buildExcludingOfFilesWithSpecificPrefixesGlobSelector(compoundParameter)"
      });
    }


    const filesNamesExtensions: ReadonlySet<string> =
        compoundParameter.filesNamesExtensions instanceof Set ?
            compoundParameter.filesNamesExtensions : new Set(compoundParameter.filesNamesExtensions);

    if (filesNamesExtensions.size === 0) {
      Logger.throwErrorWithFormattedMessage({
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
      `@(${ Array.from(filesNamesPrefixes).join("|") })*`,
      ImprovedGlob.createMultipleFilenameExtensionsGlobPostfix(compoundParameter.filesNamesExtensions)
    ].join("");

  }

  // [ Output Example ] Pages/**/@(_)*/**/*.@(styl|stylus)
  public static buildExcludingOfFilesInSubdirectoriesWithSpecificPrefixesGlobSelector(
    compoundParameter: Readonly<{
      basicDirectoryPath: string;
      subdirectoriesPrefixes: ReadonlyArray<string> | ReadonlySet<string>;
      filesNamesExtensions?: ReadonlyArray<string> | ReadonlySet<string>;
    }>
  ): string {

    const subdirectoriesPrefixes: ReadonlySet<string> =
        compoundParameter.subdirectoriesPrefixes instanceof Set ?
            compoundParameter.subdirectoriesPrefixes : new Set(compoundParameter.subdirectoriesPrefixes);

    let filesNamesExtensions: ReadonlySet<string>;

    if (isUndefined(compoundParameter.filesNamesExtensions)) {
      filesNamesExtensions = new Set();
    } else if (compoundParameter.filesNamesExtensions instanceof Set) {
      filesNamesExtensions = compoundParameter.filesNamesExtensions;
    } else {
      filesNamesExtensions = new Set(compoundParameter.filesNamesExtensions);
    }

    if (filesNamesExtensions.size === 0) {
      Logger.throwErrorWithFormattedMessage({
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
      `@(${ Array.from(subdirectoriesPrefixes).join("|") })*/**/*`,
      ...isNonEmptyArray(compoundParameter.filesNamesExtensions) ?
          [ ImprovedGlob.createMultipleFilenameExtensionsGlobPostfix(compoundParameter.filesNamesExtensions) ] : []
    ].join("");

  }

  // [ Output example ] !Pages/**/@(Content|Components)/**/*.@(styl|stylus)'
  public static buildExcludingOfFilesInSpecificSubdirectoriesGlobSelector(
    compoundParameter: Readonly<{
      basicDirectoryPath: string;
      subdirectoriesNames: ReadonlyArray<string> | ReadonlySet<string>;
      filesNamesExtensions?: ReadonlyArray<string> | ReadonlySet<string>;
    }>
  ): string {

    const subdirectoriesNames: ReadonlySet<string> =
        compoundParameter.subdirectoriesNames instanceof Set ?
            compoundParameter.subdirectoriesNames : new Set(compoundParameter.subdirectoriesNames);

    if (subdirectoriesNames.size === 0) {
      Logger.throwErrorWithFormattedMessage({
        errorInstance: new InvalidParameterValueError({
          parameterName: "compoundParameter.subdirectoriesNames",
          parameterNumber: 1,
          messageSpecificPart: "The property \"subdirectoriesNames\" must be defined with non-empty array."
        }),
        title: InvalidParameterValueError.localization.defaultTitle,
        occurrenceLocation: "ImprovedGlob.buildExcludingOfFilesInSpecificSubdirectoriesGlobSelector(compoundParameter)"
      });
    }


    let filesNamesExtensions: ReadonlySet<string>;

    if (isUndefined(compoundParameter.filesNamesExtensions)) {
      filesNamesExtensions = new Set();
    } else if (compoundParameter.filesNamesExtensions instanceof Set) {
      filesNamesExtensions = compoundParameter.filesNamesExtensions;
    } else {
      filesNamesExtensions = new Set(compoundParameter.filesNamesExtensions);
    }

    return [
      "!",
      appendCharacterIfItDoesNotPresentInLastPosition({
        targetString: replaceDoubleBackslashesWithForwardSlashes(compoundParameter.basicDirectoryPath),
        trailingCharacter: "/"
      }),
      `**/@(${ Array.from(subdirectoriesNames).join("|") })/**/*`,
      ...filesNamesExtensions.size > 0 ?
          [ ImprovedGlob.createMultipleFilenameExtensionsGlobPostfix(filesNamesExtensions) ] : []
    ].join("");

  }

  /* [ Output examples ]
   * `[ ".js" ]` case : `".+(js)"`
   * `[ ".js", ".ts" ]` case: `".+(js|ts)"`
   * `[ ".js", ".ts", ".dart" ]` case: `".+(js|ts|dart)"` */
  public static createMultipleFilenameExtensionsGlobPostfix(
    fileNamesExtensions: ReadonlyArray<string> | ReadonlySet<string>
  ): string {
    return `.@(${ 
      (Array.isArray(fileNamesExtensions) ? 
          fileNamesExtensions : 
          Array.from(fileNamesExtensions)).join("|").replace(/\./gu, "") 
    })`;
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


  /* ━━━ Including glob selectors to excluding ones ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  public static includingGlobSelectorToExcludingOne(targetIncludingGlobSelector: string): string {
    return targetIncludingGlobSelector.startsWith("!") ? targetIncludingGlobSelector : `!${ targetIncludingGlobSelector }`;
  }

  public static includingGlobSelectorsToExcludingOnes(
    targetIncludingGlobSelectors: ReadonlyArray<string>
  ): Array<string> {
    return targetIncludingGlobSelectors.map(
      (targetIncludingGlobSelector: string): string =>
          ImprovedGlob.includingGlobSelectorToExcludingOne(targetIncludingGlobSelector)
    );
  }

}
