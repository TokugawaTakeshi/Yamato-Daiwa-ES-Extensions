export default function getPositionsOfAllSubstringOccurrences(targetString: string, targetSubstring: string): Array<number> {

  let indexOfCurrentSubstringOccurrence: number = targetString.indexOf(targetSubstring);

  if (indexOfCurrentSubstringOccurrence === -1) {
    return [];
  }

  const indexesOfAllSubstringOccurrences: Array<number> = [];

  do {

    indexesOfAllSubstringOccurrences.push(indexOfCurrentSubstringOccurrence);

    indexOfCurrentSubstringOccurrence = targetString.indexOf(targetSubstring, indexOfCurrentSubstringOccurrence + 1);

  } while (indexOfCurrentSubstringOccurrence !== -1);

  return indexesOfAllSubstringOccurrences;
}
