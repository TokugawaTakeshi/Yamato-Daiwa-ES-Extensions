export default function isStringIncludingAtLeastOneOfSubstrings(
  targetString: string,
  substrings: ReadonlyArray<string> | ReadonlySet<string>
): boolean {

  for (const substring of substrings) {

    if (targetString.includes(substring)) {
      return true;
    }

  }


  return false;

}
