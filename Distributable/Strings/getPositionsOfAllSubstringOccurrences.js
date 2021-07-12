"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getPositionsOfAllSubstringOccurrences(targetString, targetSubstring) {
    let indexOfCurrentSubstringOccurrence = targetString.indexOf(targetSubstring);
    if (indexOfCurrentSubstringOccurrence === -1) {
        return [];
    }
    const indexesOfAllSubstringOccurrences = [];
    do {
        indexesOfAllSubstringOccurrences.push(indexOfCurrentSubstringOccurrence);
        indexOfCurrentSubstringOccurrence = targetString.indexOf(targetSubstring, indexOfCurrentSubstringOccurrence + 1);
    } while (indexOfCurrentSubstringOccurrence !== -1);
    return indexesOfAllSubstringOccurrences;
}
exports.default = getPositionsOfAllSubstringOccurrences;
