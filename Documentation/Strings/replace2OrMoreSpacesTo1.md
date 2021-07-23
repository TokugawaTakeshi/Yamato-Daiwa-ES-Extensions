# `replace2OrMoreSpacesTo1`: Replacing 2 or more spaces to 1 in the strings 

```
replace2OrMoreSpacesTo1(targetString: string): string
```

## Problem

The weak point of [template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)
is the line breaking of multiline strings. 

```typescript
      /* Assume that in real project this command beins from the 7th column */
      console.log(
        `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
          eiusmod tempor incididunt ut labore et dolore magna aliqua.`
      );

/* => output
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
      eiusmod tempor incididunt ut labore et dolore magna aliqua. */
// ⇧ This indentation is not desired. 
```

One solution is string concatenation:

```typescript
      console.log(
        `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do` + 
        `eiusmod tempor incididunt ut labore et dolore magna aliqua.`
      );
```

Additionally, `@yamato-daiwa/es-extensions` suggests the `replace2OrMoreSpacesTo1` function:  

```typescript
      /* Assume that in real project this command beins from the 7th column */
      console.log(replace2OrMoreSpacesTo1(
        `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
          eiusmod tempor incididunt ut labore et dolore magna aliqua.`
      ));

/* => output
"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
*/      
```
