import FileSystem, { constants as FileSystemConstants } from "fs";
import PromisfiedFileSystem from "fs/promises";
import Path from "path";
import ImprovedPath from "./ImprovedPath/ImprovedPath";
import isErrnoException from "./isErrnoException";
import { isNull, Logger } from "@yamato-daiwa/es-extensions";


export default class ImprovedFileSystem {

  /* ━━━ Existence Check ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  public static isFileOrDirectoryExists(
    compoundParameter: Readonly<{ targetPath: string; synchronously: false; }>
  ): Promise<boolean>;

  public static isFileOrDirectoryExists(
    compoundParameter: Readonly<{ targetPath: string; synchronously: true; }>
  ): boolean;

  public static isFileOrDirectoryExists(
    { targetPath, synchronously }: Readonly<{ targetPath: string; synchronously: boolean; }>
  ): Promise<boolean> | boolean {

    if (synchronously) {
      return FileSystem.existsSync(targetPath);
    }


    return new Promise<boolean>((resolve: (isExists: boolean) => void): void => {
      FileSystem.access(
        targetPath,
        FileSystemConstants.F_OK,
        (error: NodeJS.ErrnoException | null): void => { resolve(isNull(error)); }
      );
    });

  }


  /* ━━━ Directories ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  /* ─── Creating ─────────────────────────────────────────────────────────────────────────────────────────────────── */
  public static createDirectory(
    compoundParameter: Readonly<{
      targetPath: string;
      mustThrowErrorIfTargetDirectoryExists: boolean;
      synchronously: false;
    }>
  ): Promise<void>;

  public static createDirectory(
    compoundParameter: Readonly<{
      targetPath: string;
      mustThrowErrorIfTargetDirectoryExists: boolean;
      synchronously: true;
    }>
  ): void;

  public static createDirectory(
    {
      targetPath,
      mustThrowErrorIfTargetDirectoryExists,
      synchronously
    }: Readonly<{
      targetPath: string;
      mustThrowErrorIfTargetDirectoryExists: boolean;
      synchronously: boolean;
    }>
  ): Promise<void> | void {

    if (synchronously) {

      if (ImprovedFileSystem.isFileOrDirectoryExists({ targetPath, synchronously: true })) {

        if (mustThrowErrorIfTargetDirectoryExists) {

          Logger.throwErrorWithFormattedMessage({
            errorType: "DirectoryAlreadyExistsError",
            title: "Directory already exists",
            description: `The directory "${ targetPath }" is already exists.`,
            occurrenceLocation: "ImprovedFileSystem.createDirectory(compoundParameter)"
          });

        }

        return;

      }


      FileSystem.mkdirSync(targetPath, { recursive: true });

      return;

    }


    return ImprovedFileSystem.isFileOrDirectoryExists({ targetPath, synchronously: false }).

      then(

        async (isTargetDirectoryAlreadyExists: boolean): Promise<void> => {

          if (isTargetDirectoryAlreadyExists) {

            if (mustThrowErrorIfTargetDirectoryExists) {

              Logger.throwErrorWithFormattedMessage({
                errorType: "DirectoryAlreadyExistsError",
                title: "Directory already exists",
                description: `The directory "${ targetPath }" is already exists.`,
                occurrenceLocation: "ImprovedFileSystem.createDirectory(compoundParameter)"
              });

            }

            return;

          }


          await PromisfiedFileSystem.mkdir(targetPath, { recursive: true });

        }
      );

  }


  /* ─── Ensuring ─────────────────────────────────────────────────────────────────────────────────────────────────── */
  public static ensureDirectoriesCreated(targetDirectoryPathOrMultipleOfThem: string | ReadonlyArray<string>): void {
    for (
      const targetDirectory of Array.isArray(targetDirectoryPathOrMultipleOfThem) ?
          targetDirectoryPathOrMultipleOfThem : [ targetDirectoryPathOrMultipleOfThem ]
    ) {
      ImprovedFileSystem.createDirectory({
        targetPath: targetDirectory,
        synchronously: true,
        mustThrowErrorIfTargetDirectoryExists: false
      });
    }
  }


  /* ─── Removing ─────────────────────────────────────────────────────────────────────────────────────────────────── */
  /* ╍╍╍ Removing of Directory ╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍ */
  public static removeDirectoryWithFiles(
    compoundParameter: Readonly<{ targetPath: string; mustThrowErrorIfOneOrMoreFilesCouldNotBeDeleted: boolean; }>
  ): void {

    const targetDirectoryPath: string = compoundParameter.targetPath;

    if (!FileSystem.existsSync(targetDirectoryPath)) {
      return;
    }


    for (const fileOrDirectoryPathRelativeToTargetDirectory of FileSystem.readdirSync(targetDirectoryPath)) {

      const fileOrChildDirectoryAbsolutePath: string = Path.join(
        targetDirectoryPath, fileOrDirectoryPathRelativeToTargetDirectory
      );

      if (FileSystem.lstatSync(fileOrChildDirectoryAbsolutePath).isDirectory()) {
        ImprovedFileSystem.removeDirectoryWithFiles({
          targetPath: fileOrChildDirectoryAbsolutePath,
          mustThrowErrorIfOneOrMoreFilesCouldNotBeDeleted: compoundParameter.mustThrowErrorIfOneOrMoreFilesCouldNotBeDeleted
        });
      } else {
        FileSystem.unlinkSync(fileOrChildDirectoryAbsolutePath);
      }

    }

    FileSystem.rmdirSync(targetDirectoryPath);

  }


  /* ╍╍╍ Removing of Files from Directory ╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍ */
  public static removeFilesFromDirectory(
    compoundParameter: Readonly<{
      directoryPath__absoluteOrRelative: string;
      synchronously: true;
    }>
  ): void;

  public static removeFilesFromDirectory(
    compoundParameter: Readonly<{
      directoryPath__absoluteOrRelative: string;
      synchronously: false;
    }>
  ): Promise<void>;

  public static removeFilesFromDirectory(
    {
      directoryPath__absoluteOrRelative,
      synchronously
    }: Readonly<{
      directoryPath__absoluteOrRelative: string;
      synchronously: boolean;
    }>
  ): void | Promise<void> {

    if (synchronously) {
      FileSystem.rmSync(directoryPath__absoluteOrRelative, { recursive: true, force: true });
      return;
    }


    return PromisfiedFileSystem.rm(directoryPath__absoluteOrRelative, { recursive: true, force: true });

  }


  /* ━━━ Files ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  /* ─── Creating / Updating ──────────────────────────────────────────────────────────────────────────────────────── */
  public static writeFileToPossiblyNotExistingDirectory(
    compoundParameter: Readonly<{
      filePath: string;
      content: string;
      synchronously: true;
    }>
  ): void;

  public static writeFileToPossiblyNotExistingDirectory(
    compoundParameter: Readonly<{
      filePath: string;
      content: string;
      synchronously: false;
    }>
  ): Promise<void>;

  public static writeFileToPossiblyNotExistingDirectory(
    {
      filePath,
      content,
      synchronously
    }: Readonly<{
      filePath: string;
      content: string;
      synchronously: boolean;
    }>
  ): Promise<void> | void {

    if (synchronously) {

      try {

        FileSystem.writeFileSync(filePath, content);

      } catch (error: unknown) {

        if (isErrnoException(error) && error.code === "ENOENT") {

          ImprovedFileSystem.createDirectory({
            targetPath: ImprovedPath.extractDirectoryFromFilePath({
              targetPath: filePath,
              ambiguitiesResolution: {
                mustConsiderLastSegmentWithoutDotsAsFileNameWithoutExtension: true,
                mustConsiderLastSegmentWithNonLeadingDotAsDirectory: false,
                mustConsiderLastSegmentStartingWithDotAsDirectory: false
              }
            }),
            synchronously: true,
            mustThrowErrorIfTargetDirectoryExists: true
          });

          FileSystem.writeFileSync(filePath, content);

        }

      }

      return;

    }


    return PromisfiedFileSystem.
        writeFile(filePath, content).
        catch(async (error: unknown): Promise<void> => {

          if (isErrnoException(error) && error.code === "ENOENT") {

            ImprovedFileSystem.createDirectory({
              targetPath: ImprovedPath.extractDirectoryFromFilePath({
                targetPath: filePath,
                ambiguitiesResolution: {
                  mustConsiderLastSegmentWithoutDotsAsFileNameWithoutExtension: true,
                  mustConsiderLastSegmentWithNonLeadingDotAsDirectory: false,
                  mustConsiderLastSegmentStartingWithDotAsDirectory: false
                }
              }),
              synchronously: true,
              mustThrowErrorIfTargetDirectoryExists: true
            });

            return PromisfiedFileSystem.writeFile(filePath, content);

          }


          throw error;

        });

  }

}
