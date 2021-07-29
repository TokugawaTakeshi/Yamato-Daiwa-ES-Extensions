export default function splitString(targetString, separator) {
    if (separator === "") {
        return Array.from(targetString);
    }
    return targetString.split(separator);
}
