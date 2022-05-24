# `replaceArrayElementsByIndexesImmutably`: Replace array elements by indexes immutably

[![Official IntelliJ IDEA plugin live template](https://img.shields.io/badge/IntelliJ_IDEA_Live_Template-raebii-blue.svg?style=flat)](https://plugins.jetbrains.com/plugin/17638-yamato-daiwa-es-extensions)

Creates the copy of target array and replaces the elements by specified indexes.
Such functionality is demanded in some JavaScript frameworks which could not observe the mutations of array.

```
replaceArrayElementsByIndexesImmutably<ArrayElement>(
  namedParameters:
      {
        targetArray: Array<ArrayElement>;
      } &
      (
        {
          index: number;
          newElement: ArrayElement;
        } |
        {
          replacements: Array<{
            index: number;
            newElement: ArrayElement;
          }>;
        }
      )
): Array<ArrayElement>
```

![IntelliJ IDEA Live template demo](replaceArrayElementsByIndexesImmutably-LiveTemplateDemo.gif)


## Usage

If you want to replace just one element, you can specify `index` and `newElement` at first level of named parameters object:

```typescript
type Product = { title: string; price: number; };

const sampleArray: Array<Product> = [
  { title: "ALPHA", price: 100 },
  { title: "BRAVO", price: 500 },
  { title: "CHARLIE", price: 1000 },
  { title: "DELTA", price: 1500 }
];

console.log(replaceArrayElementsByIndexesImmutably({
  targetArray: sampleArray,
  index: 2,
  newElement: { title: "GOLF", price: 2000 }
}));
```

Output:

```
[
  { title: "ALPHA", price: 100 },
  { title: "BRAVO", price: 500 },
  { title: "GOLF", price: 2000 },
  { title: "DELTA", price: 1500 }
]
```

If you want to replace the multiple element, specify `replacements` with array of replacements:

```typescript
console.log(replaceArrayElementsByIndexesImmutably({
  targetArray: sampleArray,
  replacements: [
    { index: 2, newElement: { title: "GOLF", price: 2000 } },
    { index: 3, newElement: { title: "HOTEL", price: 5000 } }
  ]
}))
```

Output:

```
[
  { title: "ALPHA", price: 100 },
  { title: "BRAVO", price: 500 },
  { title: "GOLF", price: 2000 },
  { title: "HOTEL", price: 5000 }
]
```


### Quick inputting

Use [Live templates](https://www.jetbrains.com/help/idea/using-live-templates.html#live_templates_types) functionality
of [IntelliJ IDEA family IDEs](https://www.jetbrains.com/idea/) (including WebStorm sharpened for web development)
to input the function calling expression quickly (available in [official YDEE plugin](https://plugins.jetbrains.com/plugin/17638-yamato-daiwa-es-extensions)):

![](replaceArrayElementsByIndexesImmutably-LiveTemplateDemo.gif)

If target array has been copied to clipboard preliminarily, it will be immediately substituted.
