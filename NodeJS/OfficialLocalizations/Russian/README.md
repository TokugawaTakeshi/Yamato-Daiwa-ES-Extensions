# Русификация `@yamato-daiwa/es-extensions-nodejs`

## Установка

**@yamato-daiwa/es-extensions-nodejs-localization-russian** имеет следующие **одноранговые зависимости**
  ([peer dependencies](https://nodejs.org/en/blog/npm/peer-dependencies/)):

* [@yamato-daiwa/es-extensions](https://www.npmjs.com/package/@yamato-daiwa/es-extensions)
* [@yamato-daiwa/es-extensions-localization-russian](https://www.npmjs.com/package/@yamato-daiwa/es-extensions-localization-russian)
* [@yamato-daiwa/es-extensions-nodejs](https://www.npmjs.com/package/@yamato-daiwa/es-extensions-nodejs)

Для использования пакета **@yamato-daiwa/es-extensions-nodejs-localization-russian** все **3** упомянутые выше зависимости
  также необходимо установить, при этом их версии должны совпадать с точностью до **минорной** (число между двумя точками).
Например, версия 1.6.0 пакета локализации **@yamato-daiwa/es-extensions-nodejs-localization-russian** совместима с версиями
  упомянутых выше пакетов от **1.6.0** до любой, меньшей **1.7.0**.

```
npm i @yamato-daiwa/es-extensions @yamato-daiwa/es-extensions-localization-russian @yamato-daiwa/es-extensions-nodejs @yamato-daiwa/es-extensions-nodejs-localization-russian -E
```


## Локализованная функциональность

### Локализация класса "ConsoleCommandsParser"

Установите статическому полю `localization` класса `ConsoleCommandsParser` объект `consoleCommandsParserLocalization__russian`:

```typescript
import { ConsoleCommandsParser } from "@yamato-daiwa/es-extensions-nodejs";
import { consoleCommandsParserLocalization__russian } from "@yamato-daiwa/es-extensions-nodejs-localization-russian";

ConsoleCommandsParser.localization = consoleCommandsParserLocalization__russian;
```

Поскольку **@yamato-daiwa/es-extensions-nodejs** предоставляет аналогичный объект с локализацией по умолчанию, то
  аналогичным образом можно вернуться с английской локализации:

```typescript
import { ConsoleCommandsParser, consoleCommandsParserLocalization__english } from "@yamato-daiwa/es-extensions-nodejs";
import { consoleCommandsParserLocalization__russian } from "@yamato-daiwa/es-extensions-nodejs-localization-russian";


ConsoleCommandsParser.localization = consoleCommandsParserLocalization__russian;

// ...

ConsoleCommandsParser.localization = consoleCommandsParserLocalization__english;
```


### Локализация класса "ObjectDataFilesProcessor"

Установите статическому полю `localization` класса `ObjectDataFilesProcessor` объект `objectDataFilesProcessorLocalization__russian`:

```typescript
import { ObjectDataFilesProcessor } from "@yamato-daiwa/es-extensions-nodejs";
import { objectDataFilesProcessorLocalization__russian } from "@yamato-daiwa/es-extensions-nodejs-localization-russian";

ObjectDataFilesProcessor.localization = objectDataFilesProcessorLocalization__russian;
```

Поскольку **@yamato-daiwa/es-extensions-nodejs** предоставляет аналогичный объект с локализацией по умолчанию, то
  аналогичным образом можно вернуться с английской локализации:

```typescript
import { ObjectDataFilesProcessor, objectDataFilesProcessorLocalization__english } from "@yamato-daiwa/es-extensions-nodejs";
import { objectDataFilesProcessorLocalization__russian } from "@yamato-daiwa/es-extensions-nodejs-localization-russian";


ObjectDataFilesProcessor.localization = objectDataFilesProcessorLocalization__russian;

// ...

ObjectDataFilesProcessor.localization = objectDataFilesProcessorLocalization__english;
```


### Локализации классов ошибок

Все классы ошибок, предоставляемые пакетом **@yamato-daiwa/es-extensions-nodejs**, имеют статическое поле `localization`.
Имя объекта, содержащего локализацию, подчиняется шаблону

```
<Имя класса ошибки маленькой буквы>ErrorLocalization__russian
```

Например, для класса ошибки `FileNotFoundError` это будет `fileNotFoundErrorLocalization__russian`:

```typescript
import { FileNotFoundError } from "@yamato-daiwa/es-extensions-nodejs";
import { fileNotFoundErrorLocalization__russian } from "@yamato-daiwa/es-extensions-nodejs-localization-russian";

FileNotFoundError.localization = fileNotFoundErrorLocalization__russian;
```

Поскольку **@yamato-daiwa/es-extensions-nodejs** предоставляет аналогичный объект с локализацией по умолчанию, то
  аналогичным образом можно вернуться с английской локализации:

```typescript
import { FileNotFoundError, fileNotFoundErrorLocalization__english } from "@yamato-daiwa/es-extensions-nodejs";
import { fileNotFoundErrorLocalization__russian } from "@yamato-daiwa/es-extensions-nodejs-localization-russian";


FileNotFoundError.localization = fileNotFoundErrorLocalization__russian;

// ...

FileNotFoundError.localization = fileNotFoundErrorLocalization__english;
```

Список всех классов ошибок пакета **@yamato-daiwa/es-extensions-nodejs** а также соответствующих им объектов
  русификации представлены в таблице ниже.


| Класс ошибки                        | Объект русификации                                       |
|-------------------------------------|----------------------------------------------------------|
| DesiredFileActuallyIsDirectoryError | desiredFileActuallyIsDirectoryErrorLocalization__russian |
| FileNotFoundError                   | fileNotFoundErrorLocalization__russian                   |
| InvalidConsoleCommandError          | invalidConsoleCommandErrorLocalization__russian          |
