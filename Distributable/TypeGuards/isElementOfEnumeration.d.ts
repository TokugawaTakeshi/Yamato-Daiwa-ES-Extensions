export default function isElementOfEnumeration<EnumerationElement extends string | number>(possibleEnumerationElement: string | number, targetEnumeration: {
    [key: string]: EnumerationElement;
}): possibleEnumerationElement is EnumerationElement;
