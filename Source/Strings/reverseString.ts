export default function reverseString(targetString: string): string {
  return targetString.
      split("").
      reverse().
      join("");
}
