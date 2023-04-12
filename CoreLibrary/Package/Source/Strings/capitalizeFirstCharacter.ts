export default function capitalizeFirstCharacter(targetString: string): string {

  /* [ Theory ] In this case using of `targetString.slice' will not cause the problem even if first character is a surrogate
  * pair (checked in capitalizeFirstCharacter.test.ts) */
  return targetString.charAt(0).toUpperCase() + targetString.slice(1);

}
