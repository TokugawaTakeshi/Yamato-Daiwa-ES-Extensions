# Object Type Guards

<div style="border: 1px solid red; padding: 12px 14px"> 
  ⚠ Be careful that in ECMAScript <code>typeof null</code> is <code>object</code>. Because of this there is no confusing
    `isObject` type guard doing `typeof targetValue === "object"` in this library.
</div>

* `isEmptyObject(pointentialObject: unknown): pointentialObject is object`
* `isNonEmptyObject(pointentialObject: unknown): pointentialObject is object`
* `isNonNullObject(pointentialObject: unknown): pointentialObject is object`
