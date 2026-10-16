# `removeLastFileNameExtensionFromPath` - Remove Last File Name Extension From Path

```
(targetPath: string) => string
```

Removes the last file name extension from the path, so `file.razor.pug` becomes `file.razor`, and `file.pug` becomes
  `file`. Only the last segment of the path (the file name) is analyzed: the dots in the directory names are ignored.


## Parameters

| Parameter    | Type     | Description                                                                         |
|--------------|----------|-------------------------------------------------------------------------------------|
| `targetPath` | `string` | The path to the file from which the last file name extension must be removed.       |


## Return Value

The `string` with the path without the last file name extension.

The path is returned unchanged if its last segment does not include the dot (the file name has no extension),
  including the case when only the directory names include dots.

The function is pure: the `targetPath` is not mutated, and the file system is not accessed.


## Examples

### Removing of the Last Extension

```typescript
removeLastFileNameExtensionFromPath("directory1/directory2/file.razor.pug");
// "directory1/directory2/file.razor"

removeLastFileNameExtensionFromPath("directory1/directory2/file.pug");
// "directory1/directory2/file"
```

### Paths without File Name Extension

Such paths are returned as is, even if the directory names include dots.

```typescript
removeLastFileNameExtensionFromPath("directory1/directory2/file");
// "directory1/directory2/file"

removeLastFileNameExtensionFromPath("directory1/sub.directory2/file");
// "directory1/sub.directory2/file"
```


## Notes

* The path is processed as the plain string split by the forward slashes; the double backslashes are replaced with
    the forward slashes before the splitting. When the extension is removed, the returned path is assembled with the
    forward slashes. When there is nothing to remove, the original `targetPath` is returned as is.
* The path is not parsed as the URL: the query and the fragment (`#section-1`) are not treated specially, so they are
    considered as a part of the last extension.
* The path `"."` is returned unchanged.
