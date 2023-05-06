# `@yamato-daiwa/es-extensions-nodejs`の日本語化

## 導入

**@yamato-daiwa/es-extensions-nodejs-localization-japanese**は下記のピア依存性
（[peer dependencies](https://nodejs.org/en/blog/npm/peer-dependencies/)）を持つ。

* [@yamato-daiwa/es-extensions](https://www.npmjs.com/package/@yamato-daiwa/es-extensions)
* [@yamato-daiwa/es-extensions-localization-japanese](https://www.npmjs.com/package/@yamato-daiwa/es-extensions-localization-japanese)
* [@yamato-daiwa/es-extensions-nodejs](https://www.npmjs.com/package/@yamato-daiwa/es-extensions-nodejs)

**@yamato-daiwa/es-extensions-nodejs-localization-japanese**を利用するには上記**３件**の依存性を合わせて導入する必要が有り、但し
  マイナーバージョン（バージョンの記号に於いて２点の間の数）まで一致しなければいけない。
例えばバージョン**1.6.0**は、上記のパッケージのバージョン**1.6.0～1.6.?** で使えるが、バージョン**1.7.0以上**では使用不可。


```
npm i @yamato-daiwa/es-extensions @yamato-daiwa/es-extensions-localization-japanese @yamato-daiwa/es-extensions-nodejs @yamato-daiwa/es-extensions-nodejs-localization-japanese -E
```


## 日本語化可能な機能

### ConsoleCommandsParserクラス

`ConsoleCommandsParser`クラスの`localization`静的フィルドに`consoleCommandsParserLocalization__japanese`を割り当てて下さい。

```typescript
import { ConsoleCommandsParser } from "@yamato-daiwa/es-extensions-nodejs";
import { consoleCommandsParserLocalization__japanese } from "@yamato-daiwa/es-extensions-nodejs-localization-japanese";

ConsoleCommandsParser.localization = consoleCommandsParserLocalization__japanese;
```

**@yamato-daiwa/es-extensions-nodejs**は規定の言語の似たようなオブジェクトを共有しているので、同じ様に英語に戻す事が出来る。

```typescript
import { ConsoleCommandsParser, consoleCommandsParserLocalization__english } from "@yamato-daiwa/es-extensions-nodejs";
import { consoleCommandsParserLocalization__japanese } from "@yamato-daiwa/es-extensions-nodejs-localization-japanese";


ConsoleCommandsParser.localization = consoleCommandsParserLocalization__japanese;

// ...

ConsoleCommandsParser.localization = consoleCommandsParserLocalization__english;
```

### ObjectDataFilesProcessorクラス

`ObjectDataFilesProcessor`クラスの`localization`静的フィルドに`objectDataFilesProcessorLocalization__japanese`を割り当てて下さい。

```typescript
import { ObjectDataFilesProcessor } from "@yamato-daiwa/es-extensions-nodejs";
import { objectDataFilesProcessorLocalization__japanese } from "@yamato-daiwa/es-extensions-nodejs-localization-japanese";

ObjectDataFilesProcessor.localization = objectDataFilesProcessorLocalization__japanese;
```

**@yamato-daiwa/es-extensions-nodejs**は規定の言語の似たようなオブジェクトを共有しているので、同じ様に英語に戻す事が出来る。

```typescript
import { ObjectDataFilesProcessor, objectDataFilesProcessorLocalization__english } from "@yamato-daiwa/es-extensions-nodejs";
import { objectDataFilesProcessorLocalization__japanese } from "@yamato-daiwa/es-extensions-nodejs-localization-japanese";


ObjectDataFilesProcessor.localization = objectDataFilesProcessorLocalization__japanese;

// ...

ObjectDataFilesProcessor.localization = objectDataFilesProcessorLocalization__english;
```


### エラークラス

**@yamato-daiwa/es-extensions-nodejs**に提供される全エラークラスは`localization`パブリック静的フィルドを持っている。
日本語化のオブジェクトの名前は下記の原型に従っている。

```
<キャメルケースのクス名>ErrorLocalization__japanese
```

例えば`FileNotFoundError`エラークラスの場合`fileNotFoundErrorLocalization__japanese`に成る。

```typescript
import { FileNotFoundError } from "@yamato-daiwa/es-extensions-nodejs";
import { fileNotFoundErrorLocalization__japanese } from "@yamato-daiwa/es-extensions-nodejs-localization-japanese";

FileNotFoundError.localization = fileNotFoundErrorLocalization__japanese;
```

**@yamato-daiwa/es-extensions-nodejs**は規定の言語の似たようなオブジェクトを共有しているので、同じ様に英語に戻す事が出来る。

```typescript
import { FileNotFoundError, fileNotFoundErrorLocalization__english } from "@yamato-daiwa/es-extensions-nodejs";
import { fileNotFoundErrorLocalization__japanese } from "@yamato-daiwa/es-extensions-nodejs-localization-japanese";


FileNotFoundError.localization = fileNotFoundErrorLocalization__japanese;

// ...

FileNotFoundError.localization = fileNotFoundErrorLocalization__english;
```

**@yamato-daiwa/es-extensions-nodejs**に提供される全クラスと該当してりる日本語化のオブジェクトは下記の表示に一覧化。

| エラークラス                              | 日本語化のオブジェクト                                               |
|-------------------------------------|-----------------------------------------------------------|
| DesiredFileActuallyIsDirectoryError | desiredFileActuallyIsDirectoryErrorLocalization__japanese |
| FileNotFoundError                   | fileNotFoundErrorLocalization__japanese                   |
| InvalidConsoleCommandError          | invalidConsoleCommandErrorLocalization__japanese          |
