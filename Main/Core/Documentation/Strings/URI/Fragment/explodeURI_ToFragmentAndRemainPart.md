# explodeURI_ToFragmentAndRemainPart

```
━━━ [ 1nd Overload ] Require Fragment ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export function explodeURI_ToFragmentAndRemainPart(
  targetURI: string, 
  options: { mustThrowErrorIfNoFragment: true; }
):
    {
      fragmentWithoutLeadingHash: string;
      remainPart: string;
    }

━━━ [ 2nd Overload ] Allow Fragment Absence ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
(
  targetURI: string,
  options: { mustThrowErrorIfNoFragment: false; }
):
    {
      fragmentWithoutLeadingHash?: string;
      remainPart: string;
    }
```

Splits the URI to the fragment (the part after the hash character, without this character) and the remain part
  (everything before the hash). It works with both the web-like URIs (`https://yamato-daiwa.com#section`) and the
  file-like ones (`path/to/file#section`).

The function has two overloads, selected by the `mustThrowErrorIfNoFragment` option:

* With `true`, the fragment is required: the error will be thrown if the URI has no fragment, and the result type
    guarantees the presence of the `fragmentWithoutLeadingHash` property.
* With `false`, the fragment is optional: the URI without fragment is accepted, and the
    `fragmentWithoutLeadingHash` property of the result is optional.


## Parameters

| Parameter                              | Type      | Description                                                                                                                  |
|----------------------------------------|-----------|------------------------------------------------------------------------------------------------------------------------------|
| `targetURI`                            | `string`  | The URI to explode.                                                                                                          |
| `options.mustThrowErrorIfNoFragment`   | `boolean` | Defines whether the absence of the fragment is the error (`true`) or the acceptable case (`false`). The options object is required. |

The overloads accept the literal `true` or `false` only. The value of the type `boolean` (for example, the variable
  which is not constant) is not accepted by the TypeScript compiler.


## Return Value

The object with the following properties:

| Property                     | Type     | Description                                                                                                                  |
|------------------------------|----------|------------------------------------------------------------------------------------------------------------------------------|
| `fragmentWithoutLeadingHash` | `string` | The fragment without the leading hash. Always present with `mustThrowErrorIfNoFragment: true`; may be absent with `false`. |
| `remainPart`                 | `string` | The URI without the fragment and without the hash character.                                                                |

The types of the result are available in the `ExplodingOfURI_ToFragmentAndRemainPart` namespace:

```typescript
namespace ExplodingOfURI_ToFragmentAndRemainPart {

  export type Result = Result.RequiredFragment | Result.OptionalFragment;

  export namespace Result {

    export type RequiredFragment = Readonly<{
      fragmentWithoutLeadingHash: string;
      remainPart: string;
    }>;

    export type OptionalFragment = Readonly<{
      fragmentWithoutLeadingHash?: string;
      remainPart: string;
    }>;

  }

}
```

The overload with `mustThrowErrorIfNoFragment: true` returns the `Result.RequiredFragment`, the overload with `false`
  returns the `Result.OptionalFragment`.


## Errors

| Error                          | When                                                                                                                         |
|--------------------------------|------------------------------------------------------------------------------------------------------------------------------|
| `InvalidParameterValueError`   | The `targetURI` has more than one hash character. It is thrown regardless of the `mustThrowErrorIfNoFragment` value.       |
| `UnexpectedEventError`         | The `targetURI` has no fragment while `mustThrowErrorIfNoFragment` is `true`.                                                |


## Examples

### Web-like URI

```typescript
explodeURI_ToFragmentAndRemainPart(
  "https://yamato-daiwa.com#commercial_activities",
  { mustThrowErrorIfNoFragment: true }
);

// {
//   fragmentWithoutLeadingHash: "commercial_activities",
//   remainPart: "https://yamato-daiwa.com"
// }
```

### File-like URI

```typescript
explodeURI_ToFragmentAndRemainPart(
  "path/to/file#motivation",
  { mustThrowErrorIfNoFragment: true }
);

// {
//   fragmentWithoutLeadingHash: "motivation",
//   remainPart: "path/to/file"
// }
```

### URI without Fragment

Accepting (the `fragmentWithoutLeadingHash` property is absent in the result):

```typescript
explodeURI_ToFragmentAndRemainPart(
  "https://yamato-daiwa.com",
  { mustThrowErrorIfNoFragment: false }
);

// { remainPart: "https://yamato-daiwa.com" }
```

Throwing of the error:

```typescript
explodeURI_ToFragmentAndRemainPart(
  "path/to/file",
  { mustThrowErrorIfNoFragment: true }
);

// UnexpectedEventError: Contrary to expectations, the URI "path/to/file" has no fragment.
```

### URI with More than One Hash

```typescript
explodeURI_ToFragmentAndRemainPart(
  "https://yamato-daiwa.com#commercial_activities#research_activities",
  { mustThrowErrorIfNoFragment: true }
);

// InvalidParameterValueError: Specified URI is invalid because has more than one "#" character.
```


## Notes

* The function does not validate the URI in general: the only checked condition is the number of the hash characters.
* The fragment is returned as is, without the decoding of the percent-encoded characters.
* The hash character is not included to neither the `fragmentWithoutLeadingHash` nor the `remainPart`.
