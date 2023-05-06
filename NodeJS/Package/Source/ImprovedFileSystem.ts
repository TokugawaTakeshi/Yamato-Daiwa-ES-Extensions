import FileSystem, { constants as FileSystemConstants } from "fs";
import Path from "path";
import { isNotNull, Logger } from "@yamato-daiwa/es-extensions";


export default class ImprovedFileSystem {

  /* ━━━ Existence check ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  public static isFileOrDirectoryExists(
    compoundParameter: Readonly<{ targetPath: string; synchronously: false; }>
  ): Promise<boolean>;

  public static isFileOrDirectoryExists(
    compoundParameter: Readonly<{ targetPath: string; synchronously: true; }>
  ): boolean;

  /* eslint-disable-next-line @typescript-eslint/promise-function-async --
  * Adding of the `async` keyword to this method will cause TS1064 error. */
  public static isFileOrDirectoryExists(
    { targetPath, synchronously }: Readonly<{ targetPath: string; synchronously: boolean; }>
  ): Promise<boolean> | boolean {

    if (synchronously) {
      return FileSystem.existsSync(targetPath);
    }


    return new Promise<boolean>((resolve: (isExists: boolean) => void): void => {

      /* eslint-disable-next-line node/prefer-promises/fs --
      *  `PromisfiedFileSystem.access()` returns the promise with empty payload. */
      FileSystem.access(
        targetPath,
        FileSystemConstants.F_OK,
        (error: NodeJS.ErrnoException | null): void => { resolve(isNotNull(error)); }
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

  /* eslint-disable-next-line @typescript-eslint/promise-function-async --
   * Adding of the `async` keyword to this method will cause TS1064 error. */
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

          // TODO

        }

        return;

      }


      FileSystem.mkdirSync(targetPath, { recursive: true });

    }

    // TODO

  }


  /* ━━━ Removing ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  public static removeDirectoryWithFiles(
    compoundParameter: Readonly<{ targetPath: string; mustThrowErrorIfOneOrMoreFilesCouldNotBeDeleted: boolean; }>
  ): void {

    const targetDirectoryPath: string = compoundParameter.targetPath;

    if (!FileSystem.existsSync(targetDirectoryPath)) {

      Logger.logInfo({
        title: "The directory to delete does not exist",
        description: `The directory "${ targetDirectoryPath }" does not exist; nothing to delete.`
      });

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

}
