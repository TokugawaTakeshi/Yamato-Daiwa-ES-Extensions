# `InheritEnumerationKeys`

```
InheritEnumerationKeys<typeof BaseEnumeration, ValueType>
```

Allows to create the object with same key as reference enumeration.
Note that first parameter is not enumeration (for example `ExampleEnumeration`) itself - it must be transformed
to type by `typeof`.

```typescript
import { InheritEnumerationKeys } from "./InheritEnumerationKeys";

enum ExampleEnumeration {
  alpha = "ALPHA",
  bravo = "BRAVO"
}

const derivedEntity: InheritEnumerationKeys<typeof ExampleEnumeration, string | number> = {
  alpha: 1,
  bravo: "bravo",
  charlie: "charlie" // Error: there is no `charlie` member on `ExampleEnumeration`
};
```
