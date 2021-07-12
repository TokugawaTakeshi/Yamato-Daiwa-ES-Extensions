"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function removeNonDigitsCharacters(targetString) {
    return targetString.
        split("").
        filter((character) => /[0-9]/u.test(character)).
        join("");
}
exports.default = removeNonDigitsCharacters;
