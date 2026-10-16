# `removeElementsFromSet` - Remove Elements from set 

```
<ElementOfSet>(
  sourceDataAndOptoins: 
      { elementsToDelete: ReadonlyArray<ElementOfSet> | ReadonlySet<ElementOfSet>; } &
      (
        {
          mutably?: true;
          targetSet: Set<ElementOfSet>;
        } |
        {
          mutably: false;
          targetSet: ReadonlySet<ElementOfSet>;
        }
      )
) => Set<ElementOfSet>
```

Removes the specified elements from the set. Depending on the `mutably` option, the function either modifies the
  passed set or leaves it intact and returns the new set without the specified elements.


## Parameters

The function accepts the single object parameter with the following properties.

| Property           | Type                                                       | Required | Description                                                                                                                                                                                  |
|--------------------|------------------------------------------------------------|----------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `targetSet`        | `Set<ElementOfSet>` or `ReadonlySet<ElementOfSet>`         | Yes      | The set from which the elements must be removed. Must be the mutable `Set` unless `mutably` is `false`.                                                                                      |
| `elementsToDelete` | `ReadonlyArray<ElementOfSet>` or `ReadonlySet<ElementOfSet>` | Yes      | The elements to remove. The elements absent in the `targetSet` are ignored.                                                                                                                  |
| `mutably`          | `boolean`                                                  | No       | Defaults to `true`. If `true` (or omitted), the `targetSet` itself is modified. If `false`, the `targetSet` stays untouched, and the elements are removed from its copy.                      |

The type of the `targetSet` depends on the `mutably` option: the read-only set is allowed only with `mutably: false`,
  because otherwise the function would be unable to modify it.


## Return Value

The `Set<ElementOfSet>` without the specified elements:

* With `mutably: true` (default), it is the same `targetSet` instance which has been modified;
* With `mutably: false`, it is the new `Set`, while the `targetSet` is not changed.


## Examples

The examples below use this set:

```typescript
const sample: Set<string> = new Set([
  "Alpha", "Axel", "Bravo", "Bingo", "Charlie", "Checkpoint", "Delta", "Dynamo"
]);
```

### Mutable Removing

```typescript
removeElementsFromSet({
  targetSet: sample,
  elementsToDelete: [ "Axel", "Bingo", "Checkpoint", "Dynamo" ],
  mutably: true
});

// `sample` is now Set { "Alpha", "Bravo", "Charlie", "Delta" }
```

Because `true` is the default value, the `mutably` property may be omitted.

### Immutable Removing

```typescript
const newSet: Set<string> = removeElementsFromSet({
  targetSet: sample,
  elementsToDelete: [ "Axel", "Bingo", "Checkpoint", "Dynamo" ],
  mutably: false
});

// `newSet` is Set { "Alpha", "Bravo", "Charlie", "Delta" }
// `sample` has not been changed
```


## Notes

* The elements are compared as in the standard `Set.prototype.delete()` (the "SameValueZero" algorithm): the objects are
    matched by reference, not by content.
* The copy created with `mutably: false` is shallow: the elements themselves are not cloned.
