export default function createMapBasedOnOtherMap<InputMapKey, InputMapValue, OutputMapKey, OutputMapValue>(
  initialMap: ReadonlyMap<InputMapKey, InputMapValue>,
  transformer: (inputMapKey: InputMapKey, inputMapValue: InputMapValue) => [ OutputMapKey, OutputMapValue ]
): Map<OutputMapKey, OutputMapValue> {

  const outputMap: Map<OutputMapKey, OutputMapValue> = new Map<OutputMapKey, OutputMapValue>();

  initialMap.forEach(
    (value: InputMapValue, key: InputMapKey): void => {
      outputMap.set(...transformer(key, value));
    }
  );

  return outputMap;

}
