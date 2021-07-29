export default function removeNonDigitsCharacters(targetString) {
    return targetString.
        split("").
        filter((character) => /[0-9]/u.test(character)).
        join("");
}
