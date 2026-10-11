export default function destringifyBooleanValueIfPossible(targetValue: unknown): unknown {

  if (targetValue === "true") {
    return true;
  }


  if (targetValue === "false") {
    return false;
  }


  return targetValue;

}
