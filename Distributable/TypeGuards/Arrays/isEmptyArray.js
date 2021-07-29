export default function isEmptyArray(potentialArray) {
    return Array.isArray(potentialArray) && potentialArray.length === 0;
}
