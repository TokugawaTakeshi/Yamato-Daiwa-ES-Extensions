"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function removeAllSpecifiedCharacters(targetString, charactersWhichWillBeRemoved) {
    let charactersWhichWillBeRemoved__normalized;
    if (Array.isArray(charactersWhichWillBeRemoved)) {
        charactersWhichWillBeRemoved__normalized = charactersWhichWillBeRemoved.join("");
    }
    else {
        charactersWhichWillBeRemoved__normalized = charactersWhichWillBeRemoved;
    }
    return targetString.replace(new RegExp(`[${charactersWhichWillBeRemoved__normalized}]`, "gu"), "");
}
exports.default = removeAllSpecifiedCharacters;
