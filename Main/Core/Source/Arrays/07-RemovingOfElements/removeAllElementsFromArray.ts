export default function removeAllElementsFromArray<ArrayElement>(targetArray: Array<ArrayElement>): Array<ArrayElement> {
  return targetArray.splice(0, targetArray.length);
}
