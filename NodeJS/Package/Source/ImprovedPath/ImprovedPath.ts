import Path from "path";

import {
  isUndefined,
  isString,
  isNonEmptyArray,
  undefinedToEmptyString,
  replaceDoubleBackslashesWithForwardSlashes,
  removeArrayElementsByPredicates,
  Logger,
  UnexpectedEventError
} from "@yamato-daiwa/es-extensions";


abstract class ImprovedPath {

  public static buildAbsolutePath(
    pathSegments: Array<string>,
    options?: { forwardSlashOnlySeparators?: boolean; }
  ): string {
    return options?.forwardSlashOnlySeparators === true ?
        replaceDoubleBackslashesWithForwardSlashes(Path.resolve(...pathSegments)) :
        Path.resolve(...pathSegments);
  }

  public static parsePath(targetPath: string, options?: { forwardSlashOnlySeparators?: boolean; }): ImprovedPath.ParsedPath {

    const parsedPath: Path.ParsedPath = Path.parse(targetPath);

    const root: string = options?.forwardSlashOnlySeparators === true ?
        replaceDoubleBackslashesWithForwardSlashes(parsedPath.root) : parsedPath.root;
    const directory: string = options?.forwardSlashOnlySeparators === true ?
        replaceDoubleBackslashesWithForwardSlashes(parsedPath.dir) : parsedPath.dir;

    const lastPathSegment__couldBeAnyOfFileOrDirectoryName: string = parsedPath.base;
    const lastPathSegmentHasBeenExplodedToSegmentsByDot: Array<string> =
        lastPathSegment__couldBeAnyOfFileOrDirectoryName.split(".");
    let filenameWithoutExtension: string | undefined;
    let filenameExtensionsList: Array<string>;

    if (lastPathSegmentHasBeenExplodedToSegmentsByDot[0].length > 0) {
      filenameWithoutExtension = lastPathSegmentHasBeenExplodedToSegmentsByDot[0];
      filenameExtensionsList = lastPathSegmentHasBeenExplodedToSegmentsByDot.slice(1);
    } else {
      filenameExtensionsList = lastPathSegmentHasBeenExplodedToSegmentsByDot;
    }


    return {

      ...root.length > 0 ? { root } : null,

      getRootWhichExpectedBeDefined(): string {

        if (isString(this.root)) {
          return this.root;
        }


        Logger.throwErrorAndLog({
          errorInstance: new UnexpectedEventError(
            `Expected that root in the path '${ targetPath }' to be defined, but actually it is undefined.`
          ),
          occurrenceLocation: "ImprovedPath.parsePath(targetPath, options).getRootWhichExpectedBeDefined()",
          title: UnexpectedEventError.localization.defaultTitle
        });
      },


      ...directory.length > 0 ? { directory } : null,

      getDirectoryWhichExpectedBeDefined(): string {

        if (isString(this.directory)) {
          return this.directory;
        }


        Logger.throwErrorAndLog({
          errorInstance: new UnexpectedEventError(
            `Expected that directory in the path '${ targetPath }' to be defined, but actually it is undefined.`
          ),
          occurrenceLocation: "ImprovedPath.parsePath(targetPath, options).getDirectoryWhichExpectedBeDefined()",
          title: UnexpectedEventError.localization.defaultTitle
        });
      },


      ...isString(filenameWithoutExtension) ? { filenameWithoutExtension } : null,

      getFilenameWithoutExtensionWhichExpectedToBeDefined(): string {

        if (isString(this.filenameWithoutExtension)) {
          return this.filenameWithoutExtension;
        }


        Logger.throwErrorAndLog({
          errorInstance: new UnexpectedEventError(
            `Expected that file name without extension in '${ targetPath }' to be defined, but actually there is extension ` +
            "without file name."
          ),
          occurrenceLocation: "ImprovedPath.parsePath(targetPath, options)" +
              ".getFilenameWithoutExtensionWhichExpectedToBeDefined()",
          title: UnexpectedEventError.localization.defaultTitle
        });
      },

      ...Array.isArray(filenameExtensionsList) ? {
        filenameExtensionsList,
        filenameExtensions: `.${ filenameExtensionsList.join(".") }`
      } : null,

      getFilenameExtensionWithoutLeadingDotWhichExpectedToBeDefinedAndSingle(): string {

        if (isUndefined(this.filenameExtensionsList)) {
          Logger.throwErrorAndLog({
            errorInstance: new UnexpectedEventError(
              `Expected that path '${ targetPath }' end with filename with extension, however it has not filename extension.`
            ),
            occurrenceLocation: "ImprovedPath.parsePath(targetPath, options)." +
                "getFilenameExtensionWithoutLeadingDotWhichExpectedToBeDefinedAndSingle()",
            title: UnexpectedEventError.localization.defaultTitle
          });
        }

        if (this.filenameExtensionsList.length > 1) {
          Logger.throwErrorAndLog({
            errorInstance: new UnexpectedEventError(
                `Expected that filename in path '${ targetPath }' has single filename extension, but is has multiple of them.`
            ),
            occurrenceLocation: "ImprovedPath.parsePath(targetPath, options)." +
                "filenameExtensionWithoutLeadingDot__mustBeDefinedAndSingle",
            title: UnexpectedEventError.localization.defaultTitle
          });
        }

        return this.filenameExtensionsList[0];
      },

      getFilenameExtensionWithLeadingDotWhichExpectedBeDefinedAndSingle(): string {

        if (isUndefined(this.filenameExtensionsList)) {
          Logger.throwErrorAndLog({
            errorInstance: new UnexpectedEventError(
                `Expected that path '${ targetPath }' end with filename with extension, however it has not filename extension.`
            ),
            occurrenceLocation: "ImprovedPath.parsePath(targetPath, options)." +
                "getFilenameExtensionWithLeadingDotWhichExpectedBeDefinedAndSingle()",
            title: UnexpectedEventError.localization.defaultTitle
          });
        }

        if (this.filenameExtensionsList.length > 1) {
          Logger.throwErrorAndLog({
            errorInstance: new UnexpectedEventError(
                `Expected that filename in path '${ targetPath }' has single filename extension, but is has multiple of them.`
            ),
            occurrenceLocation: "ImprovedPath.parsePath(targetPath, options)." +
                "filenameExtensionWithLeadingDot__mustBeDefinedAndSingle",
            title: UnexpectedEventError.localization.defaultTitle
          });
        }

        return `.${ this.filenameExtensionsList[0] }`;
      },

      get filenameWithExtension(): string | undefined {

        let accumulatingString: string = undefinedToEmptyString(this.filenameWithoutExtension);
        const filenameExtensionsList__cached: Array<string> | undefined = this.filenameExtensionsList;

        if (isNonEmptyArray(filenameExtensionsList__cached)) {
          accumulatingString = `${ accumulatingString }.${ filenameExtensionsList__cached.join(".") }`;
        }

        /* 〔 ESLint muting rationale 〕 "undefined" could be replaces by "void 0", but it will be "no-void" violation。 */
        /* eslint-disable-next-line no-undefined */
        return accumulatingString.length > 0 ? accumulatingString : undefined;
      },

      getFilenameWithExtensionWhichExpectedToBeDefined(): string {

        const filenameWithExtension__cached: string | undefined = this.filenameWithExtension;

        if (isUndefined(filenameWithExtension__cached)) {
          Logger.throwErrorAndLog({
            errorInstance: new UnexpectedEventError(
              `Expected that filename and/or extension is being defined in '${ targetPath }' however both is not being.`
            ),
            occurrenceLocation: "ImprovedPath.parsePath(targetPath, options)." +
              "getFilenameWithExtensionWhichExpectedToBeDefined()",
            title: UnexpectedEventError.localization.defaultTitle
          });
        }

        return filenameWithExtension__cached;
      }
    };
  }

  public static replacePathSeparatorsToForwardSlashes(targetPath: string): string {
    return replaceDoubleBackslashesWithForwardSlashes(targetPath);
  }

  public static hasFilenameExtension(targetPath: string): boolean {
    return Path.extname(targetPath).length > 0;
  }

  public static computeRelativePath(parametersObject: { basePath: string; comparedPath: string; }): string {
    return replaceDoubleBackslashesWithForwardSlashes(Path.relative(parametersObject.basePath, parametersObject.comparedPath));
  }

  public static joinPathSegments(...pathSegments: Array<string>): string {
    return replaceDoubleBackslashesWithForwardSlashes(Path.join(...pathSegments));
  }

  public static splitPathToSegments(targetPath: string): Array<string> {
    return Path.normalize(targetPath).split(Path.sep);
  }

  public static extractFileNameWithExtensionFromPath(targetPath: string): string {
    return Path.basename(targetPath);
  }

  public static extractFileNameWithoutExtensionFromPath(targetPath: string): string {
    return Path.parse(targetPath).name;
  }

  public static extractDirectoryFromFilePath(targetPath: string): string {

    const targetPathIncludedFileName: boolean = ImprovedPath.
        extractLastFilenameExtensionBeginsFromDot(targetPath) !== null;

    return targetPathIncludedFileName ?
        replaceDoubleBackslashesWithForwardSlashes(Path.parse(targetPath).dir) :
        targetPath;
  }

  public static extractLastFilenameExtensionBeginsFromDot(targetPath: string): string | null {

    const lastFilenameExtensionBeginsFromDot__couldBeEmpty: string = Path.extname(targetPath);

    if (lastFilenameExtensionBeginsFromDot__couldBeEmpty.length === 0) {
      return null;
    }

    return Path.extname(targetPath);
  }

  public static extractLastFilenameExtensionWithoutFirstDot(targetPath: string): string | null {

    const lastFilenameExtensionBeginsFromDot__couldBeEmpty: string = Path.extname(targetPath);

    if (lastFilenameExtensionBeginsFromDot__couldBeEmpty.length === 0) {
      return null;
    }

    return lastFilenameExtensionBeginsFromDot__couldBeEmpty.substring(1);
  }

  public static removeFilenameExtensionFromPath(targetPath: string): string {

    const filenameExtensionBeginsFromDot__couldBeEmpty: string = Path.extname(targetPath);

    if (filenameExtensionBeginsFromDot__couldBeEmpty.length === 0) {
      return targetPath;
    }

    return targetPath.replace(new RegExp(`${ filenameExtensionBeginsFromDot__couldBeEmpty }$`, "u"), "");
  }


  public static removeSegmentsFromPath(targetPath: string, targetPathSegments: Array<string>): string {

    const targetPath__splitToSegments: Array<string> = ImprovedPath.splitPathToSegments(targetPath);

    removeArrayElementsByPredicates({
      targetArray: targetPath__splitToSegments,
      predicate: (pathSegment: string): boolean => targetPathSegments.includes(pathSegment),
      mutably: true
    });

    return ImprovedPath.joinPathSegments(...targetPath__splitToSegments);
  }

  public static isFilenameExtensionIs(targetFilePath: string, _filenameExtensions: string | Array<string>): boolean {

    let filenameExtensions: Array<string>;

    if (isString(_filenameExtensions)) {
      filenameExtensions = [ _filenameExtensions ];
    } else {
      filenameExtensions = _filenameExtensions;
    }

    const targetFilenameExtension: string | null = ImprovedPath.
        extractLastFilenameExtensionWithoutFirstDot(targetFilePath);

    if (targetFilenameExtension === null) {
      return false;
    }

    filenameExtensions.forEach((filenameExtension: string, index: number): void => {
      if (/^./u.test(filenameExtension)) {
        filenameExtensions[index] = filenameExtension.substring(1);
      }
    });

    return filenameExtensions.includes(targetFilenameExtension);
  }

  public static getCurrentWorkDirectory(): string {
    return replaceDoubleBackslashesWithForwardSlashes(process.cwd());
  }
}


namespace ImprovedPath {

  export type ParsedPath = {

    readonly root?: string;
    readonly getRootWhichExpectedBeDefined: () => string;

    readonly directory?: string;
    readonly getDirectoryWhichExpectedBeDefined: () => string;

    readonly filenameWithoutExtension?: string;
    readonly getFilenameWithoutExtensionWhichExpectedToBeDefined: () => string;

    readonly filenameExtensionsList?: Array<string>;
    readonly filenameExtensionsPart?: string;
    readonly getFilenameExtensionWithoutLeadingDotWhichExpectedToBeDefinedAndSingle: () => string;
    readonly getFilenameExtensionWithLeadingDotWhichExpectedBeDefinedAndSingle: () => string;

    readonly filenameWithExtension?: string;
    readonly getFilenameWithExtensionWhichExpectedToBeDefined: () => string;
  };
}


export default ImprovedPath;
