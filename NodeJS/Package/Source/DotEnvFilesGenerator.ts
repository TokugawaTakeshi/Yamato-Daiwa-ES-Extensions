import FileSystem from "fs";
import Path from "path";


abstract class DotEnvFilesGenerator {

  public static generate(order: DotEnvFilesGenerator.Order): typeof DotEnvFilesGenerator {

    const fileContents: string = Object.entries(order.variables).
        reduce(
          (previousValue: string, [ key, value ]: [ string, string | number ]): string =>
              `${ previousValue }${ key }="${ value }"\n`,
          "# [ Attention ] DON'T EDIT THIS FILE MANUALLY. \n" +
          "# This file intended to be generated repeatedly thus the manual changes WILL BE LOST.\n\n"
        );

    FileSystem.writeFileSync(
      Path.join(order.directory, order.fileName),
      fileContents
    );

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
