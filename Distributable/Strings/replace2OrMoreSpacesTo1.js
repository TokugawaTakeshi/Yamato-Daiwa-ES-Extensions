export default function replace2OrMoreSpacesTo1(targetString) {
    return targetString.replace(/\s{2,}/gmu, " ");
}
