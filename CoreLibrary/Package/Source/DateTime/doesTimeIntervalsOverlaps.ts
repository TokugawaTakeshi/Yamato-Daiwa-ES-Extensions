export default function doesTimeIntervalsOverlaps(
  namedParameters: Readonly<{
    firstIntervalStartingDateTime: Date | string;
    firstIntervalEndingDateTime: Date | string;
    secondIntervalStartingDateTime: Date | string;
    secondIntervalEndingDateTime: Date | string;
    mustConsiderExactJoiningAsOverlapping: boolean;
  }>
): boolean {

  const firstIntervalStartingPoint__UNIX_Milliseconds: number =
      new Date(namedParameters.firstIntervalStartingDateTime).getTime();

  const firstIntervalEndingPoint__UNIX_Milliseconds: number =
      new Date(namedParameters.firstIntervalEndingDateTime).getTime();

  const secondIntervalStartingPoint__UNIX_Milliseconds: number =
      new Date(namedParameters.secondIntervalStartingDateTime).getTime();

  const secondIntervalEndingPoint__UNIX_Milliseconds: number =
      new Date(namedParameters.secondIntervalEndingDateTime).getTime();

  let earliestIntervalEndingPoint__UNIX_Milliseconds: number;
  let latestIntervalStartingPoint__UNIX_Milliseconds: number;

  if (firstIntervalStartingPoint__UNIX_Milliseconds <= secondIntervalStartingPoint__UNIX_Milliseconds) {
    earliestIntervalEndingPoint__UNIX_Milliseconds = firstIntervalEndingPoint__UNIX_Milliseconds;
    latestIntervalStartingPoint__UNIX_Milliseconds = secondIntervalStartingPoint__UNIX_Milliseconds;
  } else {
    earliestIntervalEndingPoint__UNIX_Milliseconds = secondIntervalEndingPoint__UNIX_Milliseconds;
    latestIntervalStartingPoint__UNIX_Milliseconds = firstIntervalStartingPoint__UNIX_Milliseconds;
  }

  if (earliestIntervalEndingPoint__UNIX_Milliseconds === latestIntervalStartingPoint__UNIX_Milliseconds) {
    return namedParameters.mustConsiderExactJoiningAsOverlapping;
  } else if (earliestIntervalEndingPoint__UNIX_Milliseconds < latestIntervalStartingPoint__UNIX_Milliseconds) {
    return false;
  }


  return true;

}
