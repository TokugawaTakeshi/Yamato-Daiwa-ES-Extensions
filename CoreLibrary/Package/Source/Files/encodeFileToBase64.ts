import isEitherUndefinedOrNull from "../TypeGuards/Nullables/isEitherUndefinedOrNull";


export default async function encodeFileToBase64(targetFile: File): Promise<string> {

  const fileReader: FileReader = new FileReader();

  fileReader.readAsDataURL(targetFile);

  return new Promise<string>((resolve: (encodedFile: string) => void, reject: (error: Error) => void): void => {

    fileReader.onload = (filedHasBeenReadEvent: ProgressEvent<FileReader>): void => {

      const fileReadingResult: string | ArrayBuffer | null | undefined = filedHasBeenReadEvent.target?.result;

      if (isEitherUndefinedOrNull(fileReadingResult)) {
        reject(new Error("Failed to encode the file."));
        return;
      }


      resolve(
        fileReadingResult instanceof ArrayBuffer ?
            // @ts-ignore
            String.fromCharCode.apply(null, new Uint8Array(fileReadingResult)) :
            fileReadingResult
      );

    };

  });

}
