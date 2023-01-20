# `filterMap` - Filter map

```
<Key, Value>(
  targetMap: ReadonlyMap<Key, Value>, filteringPredicate: (key: Key, Value: Value) => boolean
): Map<Key, Value> 
```

This method is similar to `filter` method of native `Array`, but for maps.
