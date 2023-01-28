# toScreamingSnakeCase

```
toScreamingSnakeCase(targetString: string): string
```

Converts the string containing grammatically normal or cased (camel case, snake case, etc.) expression to [screaming snake case](https://en.wikipedia.org/wiki/Snake_case). 
Currently, 26 latin characters of English alphabet are supported.


## Examples
### Grammatically normal phrase

```typescript
console.log(toLowerCamelCase("Waltz bad nymph for quick jigs vex"));
// -> "WALTZ_BAD_NYMPH_FOR_QUICK_JIGS_VEX"
```

### Upper camel case (Pascal case)

```typescript
console.log(toLowerCamelCase("ExperimentalSample"));
// -> "EXPERIMENTAL_SAMPLE"

console.log(toLowerCamelCase("HTMLContent"));
// -> "HTML_CONTENT"

console.log(toLowerCamelCase("IAmATeapot"));
// -> "I_AM_A_TEAPOT"
```


### (Lower) camel case

```typescript
console.log(toLowerCamelCase("experimentalSample"));
// -> "EXPERIMENTAL_SAMPLE"
```


### Kebab case

```typescript
console.log(toLowerCamelCase("I-am-The-tasty-Kebab"));
// -> "I_AM_THE_TASTY_KEBAB"
```


### Screaming snake case

```typescript
console.log(toLowerCamelCase("I_AM_A_SNAKE"));
// -> "I_AM_A_SNAKE"
```
