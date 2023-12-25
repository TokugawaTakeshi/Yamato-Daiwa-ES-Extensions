/* eslint-disable max-classes-per-file --
 * This limitation is unsolicited for the namespaced classes, however there is no ESLint option allowing this case. */
import Path from "path";

import {
  replaceDoubleBackslashesWithForwardSlashes,
  getLastElementOfArray,
  stringifyAndFormatArbitraryValue,
  splitString,
  isNull,
  isUndefined,
  Logger,
  InvalidParameterValueError,
  UnexpectedEventError
} from "@yamato-daiwa/es-extensions";


abstract class ImprovedPath {

  public static joinPathSegments(
    pathSegments: ReadonlyArray<string>,
    options?: Readonly<{ alwaysForwardSlashSeparators: boolean; }>
  ): string {

    try {

      return options?.alwaysForwardSlashSeparators === true ?
          replaceDoubleBackslashesWithForwardSlashes(Path.join(...pathSegments)) :
          Path.join(...pathSegments);

    } catch (error: unknown) {

      Logger.throwErrorAndLog({
        errorInstance: new InvalidParameterValueError({ parameterName: "pathSegments", parameterNumber: 1 }),
        title: InvalidParameterValueError.localization.defaultTitle,
        occurrenceLocation: "ImprovedPath.joinPathSegments(pathSegments, options)",
        innerError: error
      });

    }

  }

  public static buildAbsolutePathFromCurrentWorkingDirectory(
    pathSegments: ReadonlyArray<string>,
    options?: Readonly<{ alwaysForwardSlashSeparators: boolean; }>
  ): string {

    const segmentsIncludingAbsolutePaths: ReadonlyArray<string> = pathSegments.
        filter((pathSegment: string): boolean => Path.isAbsolute(pathSegment));

    if (segmentsIncludingAbsolutePaths.length > 0) {
      Logger.throwErrorAndLog({
        errorInstance: new InvalidParameterValueError({
          parameterName: "pathSegments",
          parameterNumber: 1,
          messageSpecificPart: `${ segmentsIncludingAbsolutePaths.length } path segment(s) including absolute path:\n` +
              `${ stringifyAndFormatArbitraryValue(segmentsIncludingAbsolutePaths) }\n` +
              "As it follows from the method name, it builds absolute path from current working directory thus " +
              "does not require the implicit absolute path. If you want join the arbitrary absolute path with other path " +
              "segments, use 'joinPathSegments' method instead."
        }),
        title: InvalidParameterValueError.localization.defaultTitle,
        occurrenceLocation: "ImprovedPath.buildAbsolutePathFromCurrentWorkingDirectory(pathSegments, options)"
      });
    }


    try {

      return options?.alwaysForwardSlashSeparators === true ?
          replaceDoubleBackslashesWithForwardSlashes(Path.resolve(...pathSegments)) :
          Path.resolve(...pathSegments);

    } catch (error: unknown) {

      Logger.throwErrorAndLog({
        errorInstance: new InvalidParameterValueError({ parameterName: "pathSegments", parameterNumber: 1 }),
        title: InvalidParameterValueError.localization.defaultTitle,
        occurrenceLocation: "ImprovedPath.buildAbsolutePathFromCurrentWorkingDirectory(pathSegments, options)",
        innerError: error
      });

    }

  }

  public static computeRelativePath(namedParameters: Readonly<{
    basePath: string;
    comparedPath: string;
    alwaysForwardSlashSeparators?: boolean;
  }>): string {

    let operationingSystemDependentRelativePath: string;

    try {

      operationingSystemDependentRelativePath = Path.relative(namedParameters.basePath, namedParameters.comparedPath);

    } catch (error: unknown) {

      Logger.throwErrorAndLog({
        errorInstance: new InvalidParameterValueError({ parameterName: "namedParameters", parameterNumber: 1 }),
        title: InvalidParameterValueError.localization.defaultTitle,
        occurrenceLocation: "ImprovedPath.computeRelativePath(namedParameters)",
        innerError: error
      });

    }

    return namedParameters.alwaysForwardSlashSeparators === true ?
        replaceDoubleBackslashesWithForwardSlashes(operationingSystemDependentRelativePath) :
        operationingSystemDependentRelativePath;

  }


  public static parsePath(targetPath: string): ImprovedPath.ParsingResult {

    const nativeParsedPath: Path.ParsedPath = Path.parse(targetPath);

    /* [ Draft ]
    const lastPathSegment__couldBeAnyOfFileOrDirectoryName: string = nativeParsedPath.base;

    const lastPathSegmentExplodedToSegmentsByDot: Array<string> = lastPathSegment__couldBeAnyOfFileOrDirectoryName.
        split(".");

    let fileNameWithoutExtension: string | undefined;
    let fileNameExtensionsList: Array<string>;

    if (lastPathSegmentExplodedToSegmentsByDot[0].length > 0) {
      fileNameWithoutExtension = lastPathSegmentExplodedToSegmentsByDot[0];
      fileNameExtensionsList = lastPathSegmentExplodedToSegmentsByDot.slice(1);
    } else {
      fileNameExtensionsList = lastPathSegmentExplodedToSegmentsByDot;
    }
    */

    return new ImprovedPath.ParsingResult({
      rawPath: targetPath,
      nativeParsedPath
    });

  }

  public static replacePathSeparatorsToForwardSlashes(targetPath: string): string {
    return replaceDoubleBackslashesWithForwardSlashes(targetPath);
  }


  public static explodePathToSegments(targetPath: string): Array<string> {

    /* [ Theory ] 'Path.normalize' not just replacing the path separator to OS dependent. */
    const normalizedPath: string = ImprovedPath.replacePathSeparatorsToForwardSlashes(Path.normalize(targetPath));

    return [
      ...normalizedPath.startsWith("/") ? [ "/" ] : [],
      ...splitString(normalizedPath, "/").filter((pathSegment: string): boolean => pathSegment.length > 0)
    ];

  }

  public static doesPathEndWithFileNameExtension(
    namedParameters: Readonly<{
      targetPath: string;
      mustConsiderLasPathSegmentBeginsFromDotAsTheFileNameWithoutExtension: boolean;
    }>
  ): boolean {

    const lastPathSegment: string | undefined = ImprovedPath.explodePathToSegments(namedParameters.targetPath).at(-1);

    if (isUndefined(lastPathSegment)) {
      return false;
    }


    if (!lastPathSegment.includes(".") || lastPathSegment.endsWith(".")) {
      return false;
    }

    if (lastPathSegment.startsWith(".")) {
      return namedParameters.mustConsiderLasPathSegmentBeginsFromDotAsTheFileNameWithoutExtension;
    }


    return true;

  }


  public static extractFileNameWithoutExtensionFromPath(
    namedParameters: Readonly<{ targetPath: string; mustThrowErrorIfLastPathSegmentHasNoDots: false; }>
  ): string | null;

  public static extractFileNameWithoutExtensionFromPath(
    namedParameters: Readonly<{ targetPath: string; mustThrowErrorIfLastPathSegmentHasNoDots: true; }>
  ): string;

  public static extractFileNameWithoutExtensionFromPath(
    namedParameters: Readonly<{ targetPath: string; mustThrowErrorIfLastPathSegmentHasNoDots: boolean; }>
  ): string | null {

    let targetPathExplodedToSegments: ReadonlyArray<string> = ImprovedPath.explodePathToSegments(namedParameters.targetPath);

    /* [ Theory ] Currently even empty string path will be exploded to [ "." ] */
    if (targetPathExplodedToSegments.length > 1 && targetPathExplodedToSegments[0] === ".") {
      targetPathExplodedToSegments = [ "" ];
    }

    const lastPathSegment: string = getLastElementOfArray(targetPathExplodedToSegments, { mustThrowErrorIfArrayIsEmpty: true });
    const dotSeparatedSubsegmentsOfLastSegment: ReadonlyArray<string> = splitString(lastPathSegment, ".");

    if (dotSeparatedSubsegmentsOfLastSegment[0].length > 0) {
      return dotSeparatedSubsegmentsOfLastSegment[0];
    }


    if (namedParameters.mustThrowErrorIfLastPathSegmentHasNoDots) {
      Logger.throwErrorAndLog({
        errorInstance: new UnexpectedEventError(
          `Contrary to expectations, the last segment of '${ namedParameters.targetPath }' does not look like the ` +
          "file name with extension."
        ),
        title: UnexpectedEventError.localization.defaultTitle,
        occurrenceLocation: "ImprovedPath.extractFileNameWithoutExtensionFromPath(namedParameters)"
      });
    }


    return null;

  }


  public static extractDirectoryFromFilePath(
    compoundParameter: Readonly<{
      targetPath: string;
      ambiguitiesResolution: Readonly<{
        mustConsiderLastSegmentStartingWithDotAsDirectory: boolean;
        mustConsiderLastSegmentWithNonLeadingDotAsDirectory: boolean;
        mustConsiderLastSegmentWihtoutDotsAsFileNameWithoutExtension: boolean;
      }>;

      alwaysForwardSlashSeparators?: boolean;
    }>
  ): string {

    const targetPath: string = ImprovedPath.replacePathSeparatorsToForwardSlashes(compoundParameter.targetPath);

    /* 〔 Theory 〕 With current implementation, the empty string will be exploded to [ "." ]  */
    const pathSegments: Array<string> = ImprovedPath.explodePathToSegments(targetPath);

    if (pathSegments.length === 1 && pathSegments[0] === ".") {
      return "/";
    }


    const lastPathSegment: string = getLastElementOfArray(pathSegments, { mustThrowErrorIfArrayIsEmpty: true });

    if (lastPathSegment.startsWith(".")) {

      if (compoundParameter.ambiguitiesResolution.mustConsiderLastSegmentStartingWithDotAsDirectory) {
        return compoundParameter.alwaysForwardSlashSeparators === true ?
            targetPath : Path.normalize(targetPath);
      }


      return ImprovedPath.joinPathSegments(
        pathSegments.slice(0, -1),
        { alwaysForwardSlashSeparators: compoundParameter.alwaysForwardSlashSeparators === true }
      );

    }


    if (lastPathSegment.includes(".")) {

      if (compoundParameter.ambiguitiesResolution.mustConsiderLastSegmentWithNonLeadingDotAsDirectory) {
        return compoundParameter.alwaysForwardSlashSeparators === true ? targetPath : Path.normalize(targetPath);
      }


      return ImprovedPath.joinPathSegments(
        pathSegments.slice(0, -1),
        { alwaysForwardSlashSeparators: compoundParameter.alwaysForwardSlashSeparators === true }
      );

    }


    if (compoundParameter.ambiguitiesResolution.mustConsiderLastSegmentWihtoutDotsAsFileNameWithoutExtension) {
      return ImprovedPath.joinPathSegments(
        pathSegments.slice(0, -1),
        { alwaysForwardSlashSeparators: compoundParameter.alwaysForwardSlashSeparators === true }
      );
    }


    return compoundParameter.alwaysForwardSlashSeparators === true ? targetPath : Path.normalize(targetPath);

  }

}


namespace ImprovedPath {

  /* [ Conception ] This class is the data structure; no computings has been intended inside this class;  */
  export class ParsingResult {

    readonly #rawPath: string;

    readonly #root: string | null;
    readonly #root__forwardSlashesSeparators: string | null;

    readonly #directory: string | null;
    readonly #directory__forwardSlashesSeparators: string | null;
    readonly #directoryExplodedToPathSegments: ReadonlyArray<string>;


    public constructor(namedParameters: Readonly<{
      rawPath: string;
      nativeParsedPath: Path.ParsedPath;
    }>) {

      this.#rawPath = namedParameters.rawPath;

      /* [ 'Path' module theory ] Root is empty for relative paths case. */
      if (namedParameters.nativeParsedPath.root.length > 0) {
        this.#root = namedParameters.nativeParsedPath.root;
        this.#root__forwardSlashesSeparators = replaceDoubleBackslashesWithForwardSlashes(this.#root);
      } else {
        this.#root = null;
        this.#root__forwardSlashesSeparators = null;
      }

      if (namedParameters.nativeParsedPath.dir.length > 0) {

        this.#directory = namedParameters.nativeParsedPath.dir;
        this.#directory__forwardSlashesSeparators = replaceDoubleBackslashesWithForwardSlashes(this.#directory);

        /* [ Theory ] For the UNIX-like absolute paths (e. g. "/home/user/dir/file.txt"), the "/" must the first path segment. */
        this.#directoryExplodedToPathSegments = [
          ...this.#directory__forwardSlashesSeparators.startsWith("/") ? [ "/" ] : [],
          ...splitString(this.#directory__forwardSlashesSeparators, "/").
              filter((pathSegment: string): boolean => pathSegment.length > 0)
        ];

      } else {
        this.#directory = null;
        this.#directory__forwardSlashesSeparators = null;
        this.#directoryExplodedToPathSegments = [];
      }
    }

    /* --- Root ----------------------------------------------------------------------------------------------------- */
    public get root(): string | null {
      return this.#root;
    }

    public get root__forwardSlashesSeparators(): string | null {
      return this.#root__forwardSlashesSeparators;
    }

    public getRootExpectedToExist(namedParameters?: Readonly<{ alwaysForwardSlashesSeparators: boolean; }>): string {

      const root: string | null = namedParameters?.alwaysForwardSlashesSeparators === true ?
          this.#root__forwardSlashesSeparators : this.#root;

      if (isNull(root)) {
        Logger.throwErrorAndLog({
          errorInstance: new UnexpectedEventError(
            `Contrary to expectations, the root is not exists on path '${ this.#rawPath }'.`
          ),
          title: UnexpectedEventError.localization.defaultTitle,
          occurrenceLocation: "ImprovedPath.ParsedPath.getRootExpectedToBeExists(namedParameters)"
        });
      }


      return root;

    }


    /* --- Directory ------------------------------------------------------------------------------------------------ */
    public get directory(): string | null {
      return this.#directory;
    }

    public get directory__forwardSlashesSeparators(): string | null {
      return this.#directory__forwardSlashesSeparators;
    }

    public getDirectoryExpectedToExist(namedParameters?: Readonly<{ alwaysForwardSlashesSeparators: boolean; }>): string {

      const directory: string | null = namedParameters?.alwaysForwardSlashesSeparators === true ?
          this.#directory__forwardSlashesSeparators : this.#directory;

      if (isNull(directory)) {
        Logger.throwErrorAndLog({
          errorInstance: new UnexpectedEventError(
              `Contrary to expectations, the directory is not exists on path '${ this.#rawPath }'.`
          ),
          title: UnexpectedEventError.localization.defaultTitle,
          occurrenceLocation: "ImprovedPath.ParsedPath.getDirectoryExpectedToExist(namedParameters)"
        });
      }


      return directory;

    }

    public get directoryExplodedToPathSegments(): ReadonlyArray<string> {
      return this.#directoryExplodedToPathSegments;
    }
  }
}


export default ImprovedPath;
