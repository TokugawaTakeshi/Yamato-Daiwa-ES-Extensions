# `removeThenGetSpecificNumberOfSetElements` - Remove then Get Specific Number of Set Elements

```
(
  sourceDataAndOptoins: 
      Readonly<
        {
          elementsCount: number;
          mustThrowErrorIfSetHasLessElementsThanSpecified: boolean;
        } &
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
      >
) => RemovingAndGettingOfSpecificNumberElementsFromSet.Result<ElementOfSet> 
```

```typescript
namespace RemovingAndGettingOfSpecificNumberElementsFromSet {

  export type Result<ElementOfSet> = Readonly<{
    removedElements: Array<ElementOfSet>;
    updatedSet: Set<ElementOfSet>;
  }>;

}
```

Removes the specified number of elements from the beginning of the set and returns them together with the updated set.
  The set elements are taken in the order of insertion, so the elements which have been added first are removed first.
  It is useful when the set is used as the queue or as the pool of values from which the portions must be taken.


## Parameters

The function accepts the single object parameter with the following properties.

| Property                                          | Type                                               | Required | Description                                                                                                                                                                                                                                              |
|---------------------------------------------------|----------------------------------------------------|----------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `targetSet`                                       | `Set<ElementOfSet>` or `ReadonlySet<ElementOfSet>` | Yes      | The set from which the elements must be removed. Must be the mutable `Set` unless `mutably` is `false`.                                                                                                                                                  |
| `elementsCount`                                   | `number`                                           | Yes      | The number of elements to remove.                                                                                                                                                                                                                        |
| `mustThrowErrorIfSetHasLessElementsThanSpecified` | `boolean`                                          | Yes      | Defines what to do when the `targetSet` has fewer elements than `elementsCount`. If `true`, the `UnexpectedEventError` will be thrown. If `false`, all the elements of the set will be removed and returned.                                           |
| `mutably`                                         | `boolean`                                          | No       | Defaults to `true`. If `true` (or omitted), the `targetSet` itself is modified. If `false`, the `targetSet` stays untouched, and the new set without the removed elements is returned.                                                                  |

The type of the `targetSet` depends on the `mutably` option: the read-only set is allowed only with `mutably: false`.


## Return Value

The object of the `RemovingAndGettingOfSpecificNumberElementsFromSet.Result<ElementOfSet>` type with the following
  properties:

| Property          | Type                   | Description                                                                                                                                                              |
|-------------------|------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `removedElements` | `Array<ElementOfSet>`  | The removed elements in the order of their appearing in the set.                                                                                                         |
| `updatedSet`      | `Set<ElementOfSet>`    | The set without the removed elements. With `mutably: true` (default), it is the same `targetSet` instance which has been modified; with `mutably: false`, it is the new set. |


## Errors

If `mustThrowErrorIfSetHasLessElementsThanSpecified` is `true` and `elementsCount` is greater than the size of the
  `targetSet`, the `UnexpectedEventError` is thrown. The check is performed before the removing, so the `targetSet` is
  not modified in this case.


## Examples

The examples below use this set:

```typescript
const sample: Set<string> = new Set([ "Alpha", "Bravo", "Charlie", "Delta", "Echo", "Golf" ]);
```

### Mutable Removing

```typescript
const { removedElements, updatedSet } = removeThenGetSpecificNumberOfSetElements({
  targetSet: sample,
  elementsCount: 2,
  mustThrowErrorIfSetHasLessElementsThanSpecified: false,
  mutably: true
});

// removedElements: [ "Alpha", "Bravo" ]
// `sample` (which is the `updatedSet` as well) is now Set { "Charlie", "Delta", "Echo", "Golf" }
```

Because `true` is the default value, the `mutably` property may be omitted.

### Immutable Removing

```typescript
const { removedElements, updatedSet } = removeThenGetSpecificNumberOfSetElements({
  targetSet: sample,
  elementsCount: 2,
  mustThrowErrorIfSetHasLessElementsThanSpecified: false,
  mutably: false
});

// removedElements: [ "Alpha", "Bravo" ]
// updatedSet: Set { "Charlie", "Delta", "Echo", "Golf" }
// `sample` has not been changed
```

### Requested Number of Elements is Larger than the Set Size

Removing of all elements:

```typescript
const { removedElements } = removeThenGetSpecificNumberOfSetElements({
  targetSet: sample,
  elementsCount: 7,
  mustThrowErrorIfSetHasLessElementsThanSpecified: false,
  mutably: true
});

// removedElements: [ "Alpha", "Bravo", "Charlie", "Delta", "Echo", "Golf" ]
// `sample` is now empty
```

Throwing of the error:

```typescript
removeThenGetSpecificNumberOfSetElements({
  targetSet: sample,
  elementsCount: 7,
  mustThrowErrorIfSetHasLessElementsThanSpecified: true,
  mutably: true
});

// UnexpectedEventError: Target set has 6 elements while at least 7 expected.
```


## Notes

* The `elementsCount` equal to `0` is allowed: nothing is removed, `removedElements` is the empty array.
* The elements are removed from the beginning of the set in the insertion order; there is no way to specify
    which exactly elements to remove. To remove the particular elements, use `removeElementsFromSet`.
* With `mutably: false`, the new set is created, while the elements themselves are not cloned.
