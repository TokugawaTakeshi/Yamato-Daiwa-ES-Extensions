# Object Type Guards

> :warning: **Warning:** Be careful that in ECMAScript <code>typeof null</code> is <code>object</code>. 
> Because of this there is no confusing `isObject` type guard doing `typeof targetValue === "object"` in this library.


## Checking for the `object`

* `isEmptyObject(pointentialObject: unknown): pointentialObject is object`
* `isNonEmptyObject(pointentialObject: unknown): pointentialObject is object`
* `isNonNullObject(pointentialObject: unknown): pointentialObject is object`


## Checking for the `ArbitraryObject`

* `isArbitraryObject(potentialObject: unknown): potentialObject is ArbitraryObject`
* `isNonEmptyArbitraryObject(potentialObject: unknown): potentialObject is ArbitraryObject`

