# Русификация `@yamato-daiwa/es-extensions`

## Установка

**@yamato-daiwa/es-extensions-localization-russian** является одноранговой зависимостью ([peer dependency](https://nodejs.org/en/blog/npm/peer-dependencies/)) 
по отношению к **@yamato-daiwa/es-extensions**. Версии должны совпадать с точностью до минорной (число между двумя точками). 
Например, версия 1.5.0 пакета локализации **@yamato-daiwa/es-extensions-localization-russian** совместима с версиями
**@yamato-daiwa/es-extensions** от **1.5.0** до любой, меньшей **1.6.0**.

```
npm i @yamato-daiwa/es-extensions-localization-russian @yamato-daiwa/es-extensions -E
```

## Подход

Локализация хотя и не содержит "тяжёлых" вычислений, но даёт дополнительный код, что критично для скриптов, 
который будет выполняться в браузерной среде. Поэтому локализовать всё (даже то, что не использовано) - не рекомендуемый
подход, когда речь идёт о подготовке скриптов к продакшену.

В связи в этим, на данный момент функциональности, полностью локализующей библиотеку не предлагается.
См. "доступная функциональность" ниже о том, как и что из библиотеки **@yamato-daiwa/es-extensions** можно локализовать.


## Доступная функциональность

### Локализация класса RawObjectDataProcessor

Класс [RawObjectDataProcessor](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/RawObjectDataProcessor/RawObjectDataProcessor.md#quick-example)
можно локализовать как на время одного выполнения [метода `process`](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/RawObjectDataProcessor/RawObjectDataProcessor.md#process),
так и на всё время выполнения приложения. В любом случае понадобится объект локализации **RawObjectDataProcessorLocalization__Russian**.

Для локализации на время одного выполнения метода `process` необходимо передать **RawObjectDataProcessorLocalization__Russian**
через свойство **localization** третьего параметра:

```typescript
import { RawObjectDataProcessor } from "@yamato-daiwa/es-extensions";
import { RawObjectDataProcessorLocalization__Russian } from "@yamato-daiwa/es-extensions-localization-russian";

type User = {
  ID: string;
  familyName: string;
  givenName: string;
};


const processingResult: RawObjectDataProcessor.ProcessingResult<User> = RawObjectDataProcessor.process(
  rawData, 
  {
    nameForLogging: "User",
    subtype: RawObjectDataProcessor.ObjectSubtypes.fixedKeyAndValuePairsObject,
    properties: { /* */ }
  },
  { localization: RawObjectDataProcessorLocalization__Russian }
);
```

Для локализации на всё время выполнения приложения необходимо вызывать метод `setDefaultLocalization`:

```typescript
import { RawObjectDataProcessor } from "@yamato-daiwa/es-extensions";
import { RawObjectDataProcessorLocalization__Russian } from "@yamato-daiwa/es-extensions-localization-russian";


RawObjectDataProcessor.setDefaultLocalization(RawObjectDataProcessorLocalization__Russian);
```


### Локализация фасада Logger

Объект **LoggerLocalization__Russian** локализует только те строки, которые принадлежат непосредственно классу 
[**Logger**](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Logging/Logger/Logger.md)
(а таких [немного](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Source/Logging/LoggerLocalization__English.ts)),
однако сообщения об ошибках должны быть локализованы отдельно (см. **локализация классов ошибок** для примера с готовыми
классами ошибок этой той же библиотеки).

```typescript
import { Logger } from "@yamato-daiwa/es-extensions";
import LoggerLocalization__Russian from "@yamato-daiwa/es-extensions-localization-russian";


Logger.setLocalization(LoggerLocalization__Russian);
```


### Локализация классов ошибок

Объект, содержащий данные локализации конкретного класса ошибки, имеет имя согласно схеме

```
[ имя класса ошибки ]Lozalization__Russian
```

Например, для **AlgorithmMismatchError** это будет **AlgorithmMismatchErrorLocalization__Russian**.
Имена всех доступных классов ошибок можно посмотреть в 
[официальной документации](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/README.md#logging).

Импортированный объект локализации следует присвоить открытому статическому полю **localization** соответствующего класса ошибки.
Например, для **AlgorithmMismatchError** это будет: 

```typescript
import { AlgorithmMismatchError } from "@yamato-daiwa/es-extensions";
import { AlgorithmMismatchErrorLocalization__Russian } from "@yamato-daiwa/es-extensions-localization-russian";

AlgorithmMismatchError.localization = AlgorithmMismatchErrorLocalization__Russian;
```
