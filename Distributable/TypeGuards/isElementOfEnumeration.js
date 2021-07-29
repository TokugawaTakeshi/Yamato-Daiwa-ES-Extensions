export default function isElementOfEnumeration(possibleEnumerationElement, targetEnumeration) {
    for (const element of Object.values(targetEnumeration)) {
        if (element === possibleEnumerationElement) {
            return true;
        }
    }
    return false;
}
