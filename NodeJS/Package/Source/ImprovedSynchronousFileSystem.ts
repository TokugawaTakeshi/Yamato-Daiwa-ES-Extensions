import FileSystem from "fs";
import Path from "path";
import { Logger } from "@yamato-daiwa/es-extensions";


export default class ImprovedSynchronousFileSystem {

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
        ImprovedSynchronousFileSystem.removeDirectoryWithFiles({
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
