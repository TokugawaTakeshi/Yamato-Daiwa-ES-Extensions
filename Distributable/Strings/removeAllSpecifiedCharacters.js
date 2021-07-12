"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function removeAllSpecifiedCharacters(targetString, charactersWhichWillBeRemoved) {
    let charactersWhichWillBeRemoved__normalized;
    if (Array.isArray(charactersWhichWillBeRemoved)) {
        charactersWhichWillBeRemoved__normalized = charactersWhichWillBeRemoved;
    }
    else if (charactersWhichWillBeRemoved.length > 0) {
        charactersWhichWillBeRemoved__normalized = charactersWhichWillBeRemoved.split("");
    }
    else {
        charactersWhichWillBeRemoved__normalized = [charactersWhichWillBeRemoved];
    }
    return targetString.replace(new RegExp(`[${charactersWhichWillBeRemoved__normalized.join("")}]`, "gu"), "");
}
exports.default = removeAllSpecifiedCharacters;
