# toLowerCamelCase

```
(targetString: string): string
```

Converts the string containing grammatically normal or cased (camel case, snake case, etc.) expression to (lower) [camel case](https://en.wikipedia.org/wiki/Camel_case). 
Currently, 26 latin characters of English alphabet are supported.


## Examples
### Grammatically normal phrase

```typescript
console.log(toLowerCamelCase("Waltz bad nymph for quick jigs vex"));
// -> "waltzBadNymphForQuickJigsVex"
```

### Upper camel case (Pascal case)

```typescript
console.log(toLowerCamelCase("ExperimentalSample"));
// -> "experimentalSample"

console.log(toLowerCamelCase("HTMLContent"));
// -> "htmlContent"

console.log(toLowerCamelCase("IAmATeapot"));
// -> "iAmATeapot"
```


### (Lower) camel case

```typescript
console.log(toLowerCamelCase("experimentalSample"));
// -> "experimentalSample"
```


### Kebab case

```typescript
console.log(toLowerCamelCase("I-am-The-tasty-Kebab"));
// -> "iAmTheTastyKebab"
```


### Screaming snake case

```typescript
console.log(toLowerCamelCase("I_AM_A_SNAKE"));
// -> "iAmASnake"
```
