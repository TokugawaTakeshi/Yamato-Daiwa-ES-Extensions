export default function readonlyArrayToMutableOne<ArrayElement>(targetArray: ReadonlyArray<ArrayElement>): Array<ArrayElement> {

  /* eslint-disable-next-line @typescript-eslint/consistent-type-assertions --
  * From the viewpoint of JavaScript, nothing requires to change.
  * The copying of the array if the wasting of the resources. */
  return targetArray as Array<ArrayElement>;

}
