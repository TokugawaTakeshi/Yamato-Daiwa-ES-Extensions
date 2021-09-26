export default function isElementOfEnumeration<EnumerationElement extends string | number>(
    possibleEnumerationElement: string | number, targetEnumeration: { [key: string]: EnumerationElement; }
): possibleEnumerationElement is EnumerationElement {

  for (const element of Object.values(targetEnumeration)) {
    if (element === possibleEnumerationElement) {
      return true;
    }
  }

  return false;
}
