export default function replace2OrMoreSpacesTo1(targetString: string): string {
  return targetString.replace(/\s{2,}/gmu, " ");
}
