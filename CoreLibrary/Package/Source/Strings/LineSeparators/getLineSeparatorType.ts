import LineSeparators from "./LineSeparators";


export default function getLineSeparatorType(
  targetString: string,
  defaultLineSeparator: LineSeparators = LineSeparators.lineFeed
): LineSeparators {

  if (/\r\n$/mu.test(targetString)) {
    return LineSeparators.carriageReturnAndLineFeed;
  }


  if (/\n$/mu.test(targetString)) {
    return LineSeparators.lineFeed;
  }

  /* [ Performance ] Keep this order of if-blocks for the micro optimization. */
  if (!targetString.includes("\r") && !targetString.includes("\n")) {
    return defaultLineSeparator;
  }


  /* [ Theory ] Not applicable for today unless dealing with old files. */
  return LineSeparators.carriageReturn;

}
