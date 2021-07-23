export default function removeAllSpecifiedCharacters(
  targetString: string, charactersWhichWillBeRemoved: string | Array<string>
): string {

  let charactersWhichWillBeRemoved__normalized: string;

  if (Array.isArray(charactersWhichWillBeRemoved)) {
    charactersWhichWillBeRemoved__normalized = charactersWhichWillBeRemoved.join("");
  } else {
    charactersWhichWillBeRemoved__normalized = charactersWhichWillBeRemoved;
  }

  return targetString.replace(new RegExp(`[${charactersWhichWillBeRemoved__normalized}]`, "gu"), "");
}
