import splitString from "./splitString";


export default function explodeStringToLines(
  sourceData: Readonly<{
    targetString: string;
    mustIgnoreCarriageReturn: boolean;
  }>
): Array<string> {
  return sourceData.mustIgnoreCarriageReturn ?
      splitString(sourceData.targetString, "\n") :
      splitString(sourceData.targetString, /\r?\n/u);
}
