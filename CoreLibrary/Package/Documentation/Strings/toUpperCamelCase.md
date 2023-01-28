# toUpperCamelCase

```
toLowerCamelCase(targetString: string): string
```

Converts the string containing grammatically normal or cased (camel case, snake case, etc.) expression to upper [camel case](https://en.wikipedia.org/wiki/Camel_case) AKA Pascal case. 
Currently, 26 latin characters of English alphabet are supported.

## Examples
### Grammatically normal phrase

```typescript
console.log(toLowerCamelCase("Waltz bad nymph for quick jigs vex"));
// -> "WaltzBadNymphForQuickJigsVex"
```

### Upper camel case (Pascal case)

```typescript
console.log(toLowerCamelCase("ExperimentalSample"));
// -> "ExperimentalSample"

console.log(toLowerCamelCase("HTMLContent"));
// -> "HtmlContent"

console.log(toLowerCamelCase("IAmATeapot"));
// -> "IAmATeapot"
```


### (Lower) camel case

```typescript
console.log(toLowerCamelCase("experimentalSample"));
// -> "ExperimentalSample"
```


### Kebab case

```typescript
console.log(toLowerCamelCase("I-am-The-tasty-Kebab"));
// -> "IAmTheTastyKebab"
```


### Screaming snake case

```typescript
console.log(toLowerCamelCase("I_AM_A_SNAKE"));
// -> "IAmASnake"
```
