# `ImprovedPath` Improved native `Path` module

## Theory

The separators of path (of file or directory) are operation system dependent (&#92; for the Windows as default and `/` for
most of all operating systems). The native module [Path](https://nodejs.org/api/path.html) can dynamically build paths
with appropriate separators.

However, some utilities (for example [Chokidar](https://www.npmjs.com/package/chokidar)) handles correctly forward slashes
paths only. It's why some method of **ImprovedPath** has `forwardSlashOnlySeparators` option.

Basically Windows understands forward slashes separators too, but some utilities (for example, some options of 
[Webpack](https://webpack.js.org) configuration) requires system-dependent path separators. 
So neither forward not backslashes could be safely used on Windows in all cases.


## Methods
### `buildAbsolutePath`: Build absolute path

```
buildAbsolutePath(pathSegments: Array<string>, options?: { forwardSlashOnlySeparators?: boolean; }): string
```

The behaviour is similar to native [`Path.resolve()`](https://nodejs.org/api/path.html#path_path_resolve_paths) 
with below differences:

* Has **forwardSlashOnlySeparators** option.
* Because second parameter exists, the first parameter must be an array (of path segments).

```typescript
const pathSegments: Array<string> = [ "/foo/bar", "./baz" ];

/* Below two lines are equivalent */
console.log(Path.resolve(...pathSegments));
console.log(ImprovedPath.buildAbsolutePath(pathSegments));
/* Example output for Windows: "D:\foo\bar\baz" */

console.log(ImprovedPath.buildAbsolutePath(pathSegments, { forwardSlashOnlySeparators: true }));
/* Example output for Windows: "D:/foo/bar/baz" */
```


### `parse` Path parsing

```
parsePath(targetPath: string, options?: { forwardSlashOnlySeparators?: boolean; }): ImprovedPath.ParsedPath
```

```typescript
type ParsedPath = {

  readonly root?: string;
  readonly getRootWhichExpectedBeDefined: () => string;

  readonly directory?: string;
  readonly getDirectoryWhichExpectedBeDefined: () => string;

  readonly filenameWithoutExtension?: string;
  readonly getFilenameWithoutExtensionWhichExpectedToBeDefined: () => string;

  readonly filenameExtensionsList?: Array<string>;
  readonly filenameExtensionsPart?: string;
  readonly getFilenameExtensionWithoutLeadingDotWhichExpectedToBeDefinedAndSingle: () => string;
  readonly getFilenameExtensionWithLeadingDotWhichExpectedBeDefinedAndSingle: () => string;

  readonly filenameWithExtension?: string;
  readonly getFilenameWithExtensionWhichExpectedToBeDefined: () => string;
};
```

Improved native [`Path.parse(path)`](https://nodejs.org/api/path.html#path_path_parse_path).
Returns `ImprovedPath.ParsedPath` object (don't be confused with native `Path.ParsedPath`) with detailed data of path 
decomposition. Option `forwardSlashOnlySeparators` will also transform backslashes to forward one even for Windows.


#### `parsedPath.root`, `parsedPath.getRootWhichExpectedBeDefined` Path root retrieving

If target path is absolute, returns hard drive name with colon and backslash for Windows (e. g. `C:\\`) and single forward
slash for UNIX-like systems.

```typescript
const unixLikeAbsoluteSamplePath: string = "/home/user/dir/file.txt";
const windowsLikeAbsoluteSamplePath: string = "C:\\path\\dir\\file.txt";

/* For the current value of `unixLikeAbsoluteSamplePath`, `Path.parse(unixLikeAbsoluteSamplePath).root` and 
   `ImprovedPath.parsePath(unixLikeAbsoluteSamplePath).root` are  equivalent. */
console.log(Path.parse(unixLikeAbsoluteSamplePath).root); /* Expected output: "/" */ 
console.log(ImprovedPath.parsePath(unixLikeAbsoluteSamplePath).root); /* Expected output: "/" */

/* For the current value of `windowsLikeAbsoluteSamplePath`, `Path.parse(windowsLikeAbsoluteSamplePath).root` and 
   `ImprovedPath.parsePath(windowsLikeAbsoluteSamplePath).root` are  equivalent. */
console.log(Path.parse(windowsLikeAbsoluteSamplePath).root);  /* Expected output: "C:\"; */
console.log(ImprovedPath.parsePath(windowsLikeAbsoluteSamplePath).root); /* Expected output: "C:\"; */

console.log(ImprovedPath.parsePath(windowsLikeAbsoluteSamplePath, { forwardSlashOnlySeparators: true }).root); /* Expected output: "C:/"; */
```

For `home/user/dir/file.txt`, `Path.parse()` will return `Path.ParsedPath` object with empty string value of `root` property.
In `ImprovedPath.ParsedPath`, `root` will be `undefined`.

If you are expecting that `root` must be defined, use `getRootWhichExpectedBeDefined` function instead, but if actually `root` will be
`undefined`, `UnexpectedEventError` will be thrown.

```typescript
const unixLikeRelativeSamplePath: string = "home/user/dir/file.txt";
const windowsLikeRelativeSamplePath: string = "path\\dir\\file.txt";

console.log(Path.parse(unixLikeRelativeSamplePath).root); /* Expected output: "" */
console.log(ImprovedPath.parsePath(unixLikeRelativeSamplePath).root); /* Expected output: undefined */

/* 'UnexpectedEventError' will be thrown */
ImprovedPath.parsePath(unixLikeRelativeSamplePath).getRootWhichExpectedBeDefined(); 

console.log(Path.parse(windowsLikeRelativeSamplePath).root); /* Expected output: "" */
console.log(ImprovedPath.parsePath(windowsLikeRelativeSamplePath).root); /* Expected output: undefined */

/* 'UnexpectedEventError' will be thrown */
ImprovedPath.parsePath(windowsLikeRelativeSamplePath).getRootWhichExpectedBeDefined();
```


##### Retrieving of directory `ImprovedPath.directory`

```typescript
const unixLikeAbsoluteSamplePath: string = "/home/user/dir/file.txt";
const windowsLikeAbsoluteSamplePath: string = "C:\\path\\dir\\file.txt";

/* For the current value of `unixLikeAbsoluteSamplePath`, `Path.parse(unixLikeAbsoluteSamplePath).dir` and 
   `ImprovedPath.parsePath(unixLikeAbsoluteSamplePath).directory` are  equivalent. */
console.log(ImprovedPath.parsePath(unixLikeAbsoluteSamplePath).directory); /* Expected output: "/home/user/dir" */
console.log(Path.parse(unixLikeAbsoluteSamplePath).dir); /* Expected output: "/home/user/dir" */

/* For the current value of `windowsLikeAbsoluteSamplePath`, `Path.parse(windowsLikeAbsoluteSamplePath).root` and 
   `ImprovedPath.parsePath(windowsLikeAbsoluteSamplePath).root` are  equivalent. */
Assert.strictEqual(ImprovedPath.parsePath(windowsLikeAbsoluteSamplePath).directory, "C:\\path\\dir");
Assert.strictEqual(
    ImprovedPath.parsePath(windowsLikeAbsoluteSamplePath).directory,
    Path.parse(windowsLikeAbsoluteSamplePath).dir
);
```


Both `Path.ParsedPath.dir` and `ImprovedPath.ParsedPath.directory` includes the `root`, so for absolute paths like
`"/file.txt"` or `"C:\\file.txt"` the directory will be even with `root`.

```typescript
const unixLikeSampleAbsolutePathWithoutDirectory: string = "/file.txt";
const windowsLikeSampleAbsolutePathWithoutSubdirectory: string = "C:\\file.txt";
```

For relative paths like `file.txt`, `Path.parse()` will return `Path.ParsedPath` object with empty string value of `dir` property.
In `ImprovedPath.ParsedPath`, `directory` will be `undefined`.
If you are expecting that `directory` must be defined, use `getDirectoryWhichExpectedBeDefined` getter instead, but if actually
directory` will be `undefined`, `UnexpectedEventError` will be thrown.
