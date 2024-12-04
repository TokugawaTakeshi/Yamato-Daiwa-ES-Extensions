import isUndefined from "../TypeGuards/Nullables/isUndefined";
import Logger from "../Logging/Logger";
import UnexpectedEventError from "../Errors/UnexpectedEvent/UnexpectedEventError";


export default function getExpectedToBeNonUndefinedMapValue<Key, Value extends Exclude<unknown, undefined>>(
  targetMap: ReadonlyMap<Key, Value>, targetKey: Key
): Value {

  const targetValue: Value | undefined = targetMap.get(targetKey);

  if (isUndefined(targetValue)) {
    Logger.throwErrorAndLog({
      errorInstance: new UnexpectedEventError(
        `Contrary to expectations, there is no pair with key "${ String(targetKey) }" in target map.`
      ),
      title: UnexpectedEventError.localization.defaultTitle,
      occurrenceLocation: "getExpectedToBeExistingMapValue(targetMap, targetKey)"
    });
  }


  return targetValue;

}
