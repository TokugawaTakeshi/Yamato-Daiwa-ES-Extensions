import isNull from "../TypeGuards/Nullables/isNull";
import UnexpectedEventError from "../Errors/UnexpectedEvent/UnexpectedEventError";
import PoliteErrorsMessagesBuilder from "../Logging/PoliteErrorsMessagesBuilder/PoliteErrorsMessagesBuilder";
import YDEE_BUG_REPORTING_PAGE_URI from "../ConstantsAndEnumerations/YDEE_BUG_REPORTING_PAGE_URI";


export default async function encodeFileToBase64(targetFile: File): Promise<string> {

  const fileReader: FileReader = new FileReader();

  fileReader.readAsDataURL(targetFile);

  return new Promise<string>((resolve: (encodedFile: string) => void, reject: (error: Error) => void): void => {

    fileReader.onload = (): void => {

      const fileReadingResult: string | ArrayBuffer | null = fileReader.result;

      if (isNull(fileReadingResult)) {

        reject(
          new UnexpectedEventError(
            PoliteErrorsMessagesBuilder.buildMessage({
              politeExplanation:
                  "According the MDN Web documentation, " +
                    "(https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL, checked in August 2023), " +
                    "when calling the \"readAsDataURL\" method, the result inside the \"onload\" event handler could be only " +
                    "the string. " +
                  "However, according the TypeScript types definition, it could be also the instance of \"ArrayBuffer\" or " +
                    "and \"null\". " +
                  "Writing the safe code, we had to check this value and although the string only should be, \"null\" " +
                    "has been detected.",
              technicalDetails:
                  "The \"fileReadingResult\" is \"null\". " +
                  "According the documentation (https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL), " +
                    "the return value could be only the string.",
              bugTrackerURI: YDEE_BUG_REPORTING_PAGE_URI
            })
          )
        );

        return;

      }


      if (fileReadingResult instanceof ArrayBuffer) {

        reject(
          new UnexpectedEventError(
            PoliteErrorsMessagesBuilder.buildMessage({
              politeExplanation:
                  "According the MDN Web documentation, " +
                    "(https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL, checked in August 2023), " +
                    "when calling the \"readAsDataURL\" method, the result inside the \"onload\" event handler could be only " +
                    "the string. " +
                  "However, according the TypeScript types definition, it could be also the instance of \"ArrayBuffer\" or " +
                    "and \"null\". " +
                  "Writing the safe code, we had to check this value and although the string only should be, the " +
                    "instance of \"ArrayBuffer\" has been detected.",
              technicalDetails:
                  "The \"fileReadingResult\" is the instance of \"ArrayBuffer\". " +
                  "According the documentation (https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL), " +
                    "the return value could always be the string.",
              bugTrackerURI: YDEE_BUG_REPORTING_PAGE_URI
            })
          )
        );

        return;

      }


      resolve(fileReadingResult);

    };

  });

}
