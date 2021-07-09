export default function removeAllSpecifiedCharacters(
    targetString: string, charactersWhichWillBeRemoved: string | Array<string>
): string {

  let charactersWhichWillBeRemoved__normalized: Array<string>;

  if (Array.isArray(charactersWhichWillBeRemoved)) {
    charactersWhichWillBeRemoved__normalized = charactersWhichWillBeRemoved;
  } else if (charactersWhichWillBeRemoved.length > 0) {
    charactersWhichWillBeRemoved__normalized = charactersWhichWillBeRemoved.split("");
  } else {
    charactersWhichWillBeRemoved__normalized = [ charactersWhichWillBeRemoved ];
  }

  return targetString.replace(new RegExp(`[${charactersWhichWillBeRemoved__normalized.join("")}]`, "gu"), "");
}
