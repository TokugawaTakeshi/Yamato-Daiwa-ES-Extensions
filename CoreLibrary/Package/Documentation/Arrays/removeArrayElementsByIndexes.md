# `removeArrayElementsByIndexes` - Remove array elements by indexes

```
removeArrayElementsByIndexes<ArrayElement>(
  compoundParameter: CompoundParameter<ArrayElement>
): Result<ArrayElement>
```

```typescript
export type CompoundParameter<ArrayElement> = {
  targetArray: Array<ArrayElement>;
  indexes: number | Array<number>;
  mutably: boolean;
};

export type Result<ArrayElement> = {
  updatedArray: Array<ArrayElement>;
  removedElements: Array<ArrayElement>;
};
```

Removes array elements by indexes, herewith the removing could be mutable or not depending on dedicated property of 
compound parameter.


## Usage
### Mutable removing

```typescript
const sample: Array<string> = [ "alpha", "bravo", "charlie", "delta", "echo" ];

removeArrayElementsByIndexes({
  targetArray: sample,
  indexes: 2,
  mutably: true
})
```


### Non-mutable removing

Non-mutable removing is demanded is some JavaScript frameworks like Svelte which could not observe the mutations of array.


```typescript
const sample: Array<string> = [ "alpha", "bravo", "charlie", "delta", "echo" ];
console.log(
  removeArrayElementsByIndexes({
    targetArray: sample,
    indexes: 2,
    mutably: false
  }).updatedArray
); // => [ "alpha", "bravo", "delta", "echo" ]
```
