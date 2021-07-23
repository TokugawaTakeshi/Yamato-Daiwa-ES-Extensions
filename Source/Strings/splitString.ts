export default function splitString(targetString: string, separator: string | RegExp): Array<string> {

  if (separator === "") {
    return Array.from(targetString);
  }

  return targetString.split(separator);
}
