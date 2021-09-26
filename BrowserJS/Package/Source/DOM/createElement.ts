import createElements from "./createElements";
import { Logger, ImproperUsageError } from "@yamato-daiwa/es-extensions";


export default function createElement(HTML_Code: string): Element {

  const elementsCollection: HTMLCollection = createElements(HTML_Code);

  if (elementsCollection.length > 1) {
    Logger.throwErrorAndLog({
      errorInstance: new ImproperUsageError(
        "Unable to create the single element because below HTML code has multiple root elements. Is you want to support " +
        `multiple root elements scenario, use 'createElements' function instead.\n${HTML_Code}`
      ),
      occurrenceLocation: "createElement(HTML_Code)",
      title: ImproperUsageError.DEFAULT_TITLE
    });
  }

  return elementsCollection[0];
}
