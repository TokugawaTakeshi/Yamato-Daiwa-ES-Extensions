export default function replaceBrHTML_TagToNewLineEscapeSequence(targetString: string): string {
  return targetString.replace(/<br\s*\/*>/gu, "\n");
}
