# `explodeCasedPhraseToWords`

```
(targetString: string): Array<string>
```

Explodes the string containing grammatically normal or cased (camel case, snake case, etc.) expression to words and 
returns the array of them. Currently, 26 latin characters of English alphabet are supported.


## Examples
### Grammatically normal phrase

```typescript
console.log(explodeCasedPhraseToWords("Waltz bad nymph for quick jigs vex"));
// -> [ "Waltz", "bad", "nymph", "for", "quick", "jigs", "vex" ]
```


### Upper camel case (Pascal case)

```typescript
console.log(explodeCasedPhraseToWords("ExperimentalSample"));
// -> [ "Experimental", "Sample" ]

console.log(explodeCasedPhraseToWords("HTMLContent"));
// -> [ "HTML", "Content" ]

console.log(explodeCasedPhraseToWords("IAmATeapot"));
// -> [ "I", "Am", "A", "Teapot" ]
```


### (Lower) camel case

```typescript
console.log(explodeCasedPhraseToWords("experimentalSample"));
// -> [ "experimental", "Sample" ]

console.log(explodeCasedPhraseToWords("iAmATeapot"));
// -> [ "i", "Am", "A", "Teapot" ]
```


### Kebab case

```typescript
console.log(explodeCasedPhraseToWords("I-am-The-tasty-Kebab"));
// -> [ "I", "am", "The", "tasty", "Kebab" ]
```


### Screaming snake case

```typescript
console.log(explodeCasedPhraseToWords("I_AM_A_SNAKE"));
// -> [ "I", "AM", "A", "SNAKE" ]
```


## Use cases

This function is being used by:

* [toLowerCamelCase](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Strings/toLowerCamelCase.md)
* [toScreamingSnakeCase](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Strings/toScreamingSnakeCase.md)
