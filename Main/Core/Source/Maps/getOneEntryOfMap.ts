import Logger from "../Logging/Logger";
import UnexpectedEventError from "../Errors/UnexpectedEvent/UnexpectedEventError";


export default function getOneEntryOfMap<Key, Value>(targetMap: ReadonlyMap<Key, Value>): [ Key, Value ] | undefined;

export default function getOneEntryOfMap<Key, Value>(
  targetMap: ReadonlyMap<Key, Value>,
  options: Readonly<{ mustThrowErrorIfMapIsEmpty: true; }>
): [ Key, Value ];


export default function getOneEntryOfMap<Key, Value>(
  targetMap: ReadonlyMap<Key, Value>,
  options?: Readonly<{ mustThrowErrorIfMapIsEmpty: true; }>
): [ Key, Value ] {

  const entry: [ Key, Value ] | undefined = Array.from(targetMap.entries())[0];

  if (typeof entry === "undefined") {

    if (options?.mustThrowErrorIfMapIsEmpty === true) {
      Logger.throwErrorWithFormattedMessage({
        errorInstance: new UnexpectedEventError(
          "Contrary to expectations, target map is empty thus there is no the entry can be got."
        ),
        title: UnexpectedEventError.localization.defaultTitle,
        occurrenceLocation: "getOneEntryOfMap(targetMap, options)"
      });
    }

  }


  return entry;

}
