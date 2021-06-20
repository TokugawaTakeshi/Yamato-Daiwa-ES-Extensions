# `createMapBasedOnOtherMap`: Create map based on other map

```
createMapBasedOnOtherMap<InputMapKey, InputMapValue, OutputMapKey, OutputMapValue>(
  inputMap: Map<InputMapKey, InputMapValue>,
  transformer: (inputMapKey: InputMapKey, inputMapValue: InputMapValue) => [ OutputMapKey, OutputMapValue ]
): Map<OutputMapKey, OutputMapValue>
```

This function is similar to method with short but confusing name `map` of native `Array`, but for `Map` type.
Like in `map` method of `Array`, it's required to specify now each key and value of initial map will be transformed.
