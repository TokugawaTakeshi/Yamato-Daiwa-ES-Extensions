export default function getURI_PartWithoutFragment(targetURI: string): string {
  return targetURI.replace(/#.+$/u, "");
}
