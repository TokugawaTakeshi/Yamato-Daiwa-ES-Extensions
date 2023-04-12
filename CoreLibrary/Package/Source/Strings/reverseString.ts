export default function reverseString(targetString: string): string {
  return Array.from(targetString).
      reverse().
      join("");
}
