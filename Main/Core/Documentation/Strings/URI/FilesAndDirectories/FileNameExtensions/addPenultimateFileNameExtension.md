# `addPenultimateFileNameExtension` - Add Penultimate File Name Extension

```
(
  sourceDataAndOptions: 
      Readonly<{
        targetPath: string;
        targetFileNamePenultimateExtensionWithOrWithoutLeadingDot: string;
        mustAppendDuplicateEvenIfTargetPenultimateFileNameExtensionAlreadyExist: boolean;
        mustAppendLastFileNameExtensionInsteadIfThereIsNoOne: boolean;
      }>
) => string
```

Inserts an extension immediately before the last extension of the file name in the path, so `file.md` becomes
  `file.ja.md`. Typical use case is marking the file with the additional qualifier such as the language
  (`file.ja.md`), the environment (`config.production.json`) or the purpose (`component.test.ts`) while keeping the
  original (last) extension intact.

The URL-like fragment with the leading hash (`#section-1`) at the end of the path is preserved as is.


## Parameters

The function accepts the single object parameter with the following properties. All of them are required.

| Property                                                                  | Type      | Description                                                                                                                                                                                                                                       |
|---------------------------------------------------------------------------|-----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `targetPath`                                                              | `string`  | The path to the file (or the file name itself) to which the penultimate extension must be added. May include the fragment with the leading hash.                                                                                                |
| `targetFileNamePenultimateExtensionWithOrWithoutLeadingDot`               | `string`  | The extension to add. Both `"ja"` and `".ja"` are accepted and give the same result: the leading dot, if present, is removed.                                                                                                                     |
| `mustAppendDuplicateEvenIfTargetPenultimateFileNameExtensionAlreadyExist` | `boolean` | If `false`, the path will be returned unchanged when the current penultimate extension is already the same as the specified one. If `true`, the extension will be added anyway (`file.ja.md` → `file.ja.ja.md`).                                 |
| `mustAppendLastFileNameExtensionInsteadIfThereIsNoOne`                    | `boolean` | Defines what to do with the paths without any extension. If `false`, such path will be returned unchanged. If `true`, the specified extension will be appended as the last (and the only) one: `file` → `file.ja`.                              |


## Return Value

The `string` with the updated path. The path is returned unchanged in the following cases:

* The path has no extension and `mustAppendLastFileNameExtensionInsteadIfThereIsNoOne` is `false`;
* The specified extension is already the penultimate one and
    `mustAppendDuplicateEvenIfTargetPenultimateFileNameExtensionAlreadyExist` is `false`.

The function is pure: the `targetPath` is not mutated, and the file system is not accessed.


## Examples

### Basic Scenario

```typescript
addPenultimateFileNameExtension({
  targetPath: "directory1/directory2/file.md",
  targetFileNamePenultimateExtensionWithOrWithoutLeadingDot: "ja",
  mustAppendDuplicateEvenIfTargetPenultimateFileNameExtensionAlreadyExist: false,
  mustAppendLastFileNameExtensionInsteadIfThereIsNoOne: false
});
// "directory1/directory2/file.ja.md"
```

### Path with the Hash

The fragment is kept at the end of the path.

```typescript
addPenultimateFileNameExtension({
  targetPath: "directory1/directory2/file.md#section-1",
  targetFileNamePenultimateExtensionWithOrWithoutLeadingDot: "ja",
  mustAppendDuplicateEvenIfTargetPenultimateFileNameExtensionAlreadyExist: false,
  mustAppendLastFileNameExtensionInsteadIfThereIsNoOne: false
});
// "directory1/directory2/file.ja.md#section-1"
```

### Duplicates Handling

Skipping (by default behavior of the `false` option value):

```typescript
addPenultimateFileNameExtension({
  targetPath: "directory1/directory2/file.ja.md",
  targetFileNamePenultimateExtensionWithOrWithoutLeadingDot: "ja",
  mustAppendDuplicateEvenIfTargetPenultimateFileNameExtensionAlreadyExist: false,
  mustAppendLastFileNameExtensionInsteadIfThereIsNoOne: false
});
// "directory1/directory2/file.ja.md"
```

Appending:

```typescript
addPenultimateFileNameExtension({
  targetPath: "directory1/directory2/file.ja.md",
  targetFileNamePenultimateExtensionWithOrWithoutLeadingDot: "ja",
  mustAppendDuplicateEvenIfTargetPenultimateFileNameExtensionAlreadyExist: true,
  mustAppendLastFileNameExtensionInsteadIfThereIsNoOne: false
});
// "directory1/directory2/file.ja.ja.md"
```

### Path without Extension

Skipping:

```typescript
addPenultimateFileNameExtension({
  targetPath: "directory1/directory2/file",
  targetFileNamePenultimateExtensionWithOrWithoutLeadingDot: "ja",
  mustAppendDuplicateEvenIfTargetPenultimateFileNameExtensionAlreadyExist: false,
  mustAppendLastFileNameExtensionInsteadIfThereIsNoOne: false
});
// "directory1/directory2/file"
```

Appending the specified extension as the last one (the hash is respected as well):

```typescript
addPenultimateFileNameExtension({
  targetPath: "directory1/directory2/file#section-1",
  targetFileNamePenultimateExtensionWithOrWithoutLeadingDot: "ja",
  mustAppendDuplicateEvenIfTargetPenultimateFileNameExtensionAlreadyExist: false,
  mustAppendLastFileNameExtensionInsteadIfThereIsNoOne: true
});
// "directory1/directory2/file.ja#section-1"
```


## Notes

* The leading dot of the `targetFileNamePenultimateExtensionWithOrWithoutLeadingDot` is optional, but only the
    first dot is removed.
* The comparison with the existing penultimate extension is case-sensitive (`file.JA.md` is not considered as
    already having the `ja` extension).
* Only the penultimate extension is checked for the duplicate. For example, `file.ja.test.md` is not considered as
    already having the `ja` extension because `test` is penultimate there.
* The path is processed as the plain string split by dots; it is not parsed as the file system path or URL.
    The only exception is the trailing hash fragment in the case of the path without any dot.
