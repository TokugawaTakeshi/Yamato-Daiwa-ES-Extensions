import ImprovedFileSystem from "./ImprovedFileSystem";
import Path from "path";

abstract class DotEnvFilesGenerator {

  public static generate(order: DotEnvFilesGenerator.Order): typeof DotEnvFilesGenerator {

    const fileContent: string = Object.entries(order.variables).
        reduce(
          (previousValue: string, [ key, value ]: [ string, string | number ]): string =>
              `${ previousValue }${ key }="${ value }"\n`,
          "# [ Attention ] DON'T EDIT THIS FILE MANUALLY!!! \n" +
          "# This file intended to be generated repeatedly thus the manual changes WILL BE LOST.\n\n"
        );

    ImprovedFileSystem.writeFileToPossiblyNotExistingDirectory({
      content: fileContent,
      filePath: Path.join(order.directory, order.fileName),
      synchronously: true
    });

    return DotEnvFilesGenerator;

  }

}


namespace DotEnvFilesGenerator {

  export type Order = Readonly<{

    fileName: string;
    directory: string;

    variables: Readonly<{ [name: string]: string | number; }>;

  }>;

}


export default DotEnvFilesGenerator;
