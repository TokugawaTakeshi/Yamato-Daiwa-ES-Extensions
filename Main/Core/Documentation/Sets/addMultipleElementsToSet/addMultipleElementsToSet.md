# `addMultipleElementsToSet`: Add multiple elements to set

```
addMultipleElementsToSet<SetElement>(targetSet: Set<SetElement>, newElements: Array<SetElement>): Set<SetElement>
```

```typescript
const exampleSet: Set<string> = new Set<string>([ "alpha" ]);
const updatedExampleSet: Set<string> = addMultipleElementsToSet(exampleSet, [ "bravo", "charlie" ]);

console.log(updatedExampleSet); // Result: Set(3) { 'alpha', 'bravo', 'charlie' }
```
