# getObjectPropertySafely

```
(
  targetObject: unknown,
  dotSeparatedOrArrayedPathToTargetProperty: Array<string> | string
): unknown 
```

Works as native [optional chaining](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining)
  but could be used for any fully-qualified name and returns value which being considered as `unknown`.
For example, you can not access `sample?.alpha1?.alpha1_1` from the viewpoint of TypeScript if `sample` has `unknown` type,
  but `getObjectPropertySafely(sample, "alpha1.alpha1_1")` is valid however you need to analyze the return value before use it
  because it has `unknown` type. 
The [type guards](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/README.md##type-guards)
  could be useful for this.


## Usage guidelines

Intended to be used when the schema of target object-type value is not known enough 
  (for example, because of lack of TypeScript type definitions).
If it is known and you are need to access to multiple properties, consider the usage of 
[RawObjectDataProcessor](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/RawObjectDataProcessor/RawObjectDataProcessor.md)
or similar utilities instead.


## Errors
### Logging only
#### InvalidParameterValueError

Will be logged if the second parameter neither non-empty string nor array of non-empty strings,
herewith `undefined` will be returned;


## Examples

For the following examples, below experimental sample will be used.

```typescript
const experimentalSample: unknown = {
  alpha1: {
    alpha1_1: "ALPHA",
    alpha1_2: null
  },
  bravo1: null
};
```

Now we know the value of `experimentalSample`, however in situations when **getObjectPropertySafely** 
  could be useful, the value of `experimentalSample` is unknown at advance. 
We even could not know the full schema of `experimentalSample` (for example, because of lack of TypeScript type definitions). 
The type annotation `unknown` simulates these limitations.


### Non-nullable result example

```typescript
console.log(getObjectPropertySafely(experimentalSample, "alpha1.alpha1_1")); // => "ALPHA"

// OR:
console.log(getObjectPropertySafely(experimentalSample, [ "alpha1", "alpha1_1" ])); // => "ALPHA"
```

In this case, the behaviour of **getObjectPropertySafely** is even with optional chaining, but TypeScript will not
allow to use optional chaining on **unknown** type:

```typescript
strictEqual(experimentalSample?.alpha1?.alpha1_1, "ALPHA");
// TS2571: Object is of type 'unknown'.
```

### Undefined-type example

In the experimental sample, the `bravo1` is null thus `bravo1.bravo1_1` does not exist.
Similarly to optional chaining, the **getObjectPropertySafely** will return `undefined`.

```typescript
console.log(getObjectPropertySafely(experimentalSample, "bravo1.bravo1_1"));

// OR:
console.log(getObjectPropertySafely(experimentalSample, [ "bravo1", "bravo1_1" ]));
```

In this case, the behaviour of **getObjectPropertySafely** is even with optional chaining, but TypeScript will not
allow to use optional chaining on **unknown** type:

```typescript
strictEqual(experimentalSample?.bravo1?.bravo1_1, "ALPHA");
// TS2571: Object is of type 'unknown'.
```


### Non-object first parameter

If the first parameter is not object, `undefined` will be returned.


```typescript
console.log(getObjectPropertySafely("TEST", "bravo1.bravo1_1")); // => undefined

// OR:
console.log(getObjectPropertySafely("TEST", [ "bravo1", "bravo1_1" ]));// => undefined 
```
