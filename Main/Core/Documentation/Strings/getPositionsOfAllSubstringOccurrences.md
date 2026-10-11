# `getPositionsOfAllSubstringOccurrences`: Find positions of all substring occurrences

```
getPositionsOfAllSubstringOccurrences(targetString: string, targetSubstring: string): Array<number>
```

Returns the array of each position of `targetSubstring` in `targetString`.


```typescript
 const sample1: string = "The quick brown fox jumps over the lazy cat.";
getPositionsOfAllSubstringOccurrences(sample1, "dog"); // => []

const sample2: string = "The quick brown fox jumps over the lazy dog.";
getPositionsOfAllSubstringOccurrences(sample2, "dog"); // => [ 40 ]

const sample3: string = "The quick brown fox jumps over the lazy dog. If the dog barked, was it really lazy?";
getPositionsOfAllSubstringOccurrences(sample3, "dog"); // => [ 40, 52 ]
``` 
