import splitString from "./splitString";


export default function reverseString(targetString: string): string {
  return splitString(targetString, "").
      reverse().
      join("");
}
