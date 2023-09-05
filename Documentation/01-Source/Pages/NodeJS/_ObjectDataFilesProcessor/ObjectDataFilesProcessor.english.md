# `ObjectDataFilesProcessor` class
## Meta description

The class "ObjectDataFilesProcessor" of "Yamato Daiwa ECMAScript extensions" (abbreviation: "YDEE") library 
  class is indented to be used for parsing of the data files (supported formats: YAML, JSON5, DotEnv), validation
  of this data and the casting of it to the specific TypeScript type.

## Description

The class for the parsing of the files containing the object-type data of the one of following schemas and the 
  validation of this data with casting to the specific TypeScript-types satisfying to the
  [ParsedJSON](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Types/ParsedJSON/ParsedJSON.md)
  constraint.

* YAML
* DotEnv
* JSON5


## Problematics

Initially the plain Node.js does not support the parsing of the files with data of the mentioned above formats.
All that possible is the read the files as the string, however it will not be transformed to valid object.
Of course, due to the popularity of these formats there are the third-party libraries for the parsing of this
  data, however most of the just check the raw data for the compliance with the serialization standard and 
  than returns the object with `any` type.
For example, here is the TypeScript type definitions of the version **0.2.31** of the **yaml.js**
  library:

```typescript
declare namespace YAML {

  function load(path: string): any;

  function load(path: string, callback: (res: any) => void): void

  function stringify(nativeObject: any, inline?: number, spaces?: number): string;

  function parse(yamlString: string): any;

}
```

Well, we can to cast the returned object of "any" type to more narrow type via "as" keyword
  (in fact, it is the only choose because the interfaces and type aliases are ceases to exist at the time
  of transpiling of TypeScript to JavaScript thus could not be referred at the time of the execution of
  the JavaScript), but each usage of "as" keyword must be reinforced by something and in this case it the validation of
  the already transformed to the object data.
Even if you are developing the utility for the personal usage, the making of mistakes in the data file is common
  thus the validation it requires in such cases too.
