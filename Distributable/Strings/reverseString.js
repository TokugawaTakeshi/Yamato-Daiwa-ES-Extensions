import splitString from "./splitString";
export default function reverseString(targetString) {
    return splitString(targetString, "").
        reverse().
        join("");
}
