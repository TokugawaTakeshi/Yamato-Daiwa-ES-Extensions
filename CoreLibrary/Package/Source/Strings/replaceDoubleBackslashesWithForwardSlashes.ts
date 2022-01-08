export default function replaceDoubleBackslashesWithForwardSlashes(targetString: string): string {
  return targetString.replace(/\\/gu, "/");
}
