# Русификация `@yamato-daiwa/es-extensions`

## Установка

**@yamato-daiwa/es-extensions-localization-russian** имеет основной пакет (**@yamato-daiwa/es-extensions**) в
  качестве **одноранговой зависимости** ([peer dependency](https://nodejs.org/en/blog/npm/peer-dependencies/)),
  что означает необходимость его отдельной установки.
Версии должны совпадать с точностью до минорной (число между двумя точками). 
Например, версия 1.5.0 пакета локализации **@yamato-daiwa/es-extensions-localization-russian** совместима с версиями
**@yamato-daiwa/es-extensions** от **1.5.0** до любой, меньшей **1.6.0**.

```
npm i @yamato-daiwa/es-extensions-localization-russian @yamato-daiwa/es-extensions -E
```

## Подход

Локализация хотя и не содержит "тяжёлых" вычислений, но даёт дополнительный код, что критично для скриптов, 
которые будут выполняться в браузерной среде. Поэтому локализовать всё (даже то, что не использовано) - не рекомендуемый
подход, когда речь идёт о подготовке скриптов к продакшену.

В связи в этим, на данный момент функциональности, полностью локализующей библиотеку не предлагается.
См. "доступная функциональность" ниже о том, как и что из библиотеки **@yamato-daiwa/es-extensions** можно локализовать.


## Локализованная функциональность основного пакета

### Локализация класса RawObjectDataProcessor

Класс [RawObjectDataProcessor](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/RawObjectDataProcessor/RawObjectDataProcessor.md#quick-example)
можно локализовать как на время одного выполнения [метода `process`](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/RawObjectDataProcessor/RawObjectDataProcessor.md#process),
так и на всё время выполнения приложения. В любом случае понадобится объект локализации **rawObjectDataProcessorLocalization__russian**.

Для локализации на время одного выполнения метода `process` необходимо передать **rawObjectDataProcessorLocalization__russian**
через свойство **localization** третьего параметра:

```typescript
import { RawObjectDataProcessor } from "@yamato-daiwa/es-extensions";
import { rawObjectDataProcessorLocalization__russian } from "@yamato-daiwa/es-extensions-localization-russian";

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
  { localization: rawObjectDataProcessorLocalization__russian }
);
```

Для локализации на всё время выполнения приложения необходимо вызывать метод `setDefaultLocalization`:

```typescript
import { RawObjectDataProcessor } from "@yamato-daiwa/es-extensions";
import { rawObjectDataProcessorLocalization__russian } from "@yamato-daiwa/es-extensions-localization-russian";


RawObjectDataProcessor.setDefaultLocalization(rawObjectDataProcessorLocalization__russian);
```


### Локализация фасада Logger

Объект **loggerLocalization__russian** локализует только те строки, которые принадлежат непосредственно классу 
[**Logger**](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Logging/Logger/Logger.md)
(а таких [немного](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Source/Logging/LoggerLocalization__English.ts)),
однако сообщения об ошибках должны быть локализованы отдельно (см. **локализация классов ошибок** для примера с готовыми
классами ошибок этой той же библиотеки).

```typescript
import { Logger } from "@yamato-daiwa/es-extensions";
import loggerLocalization__russian from "@yamato-daiwa/es-extensions-localization-russian";


Logger.setLocalization(loggerLocalization__russian);
```


### Локализация классов ошибок

Объект, содержащий данные локализации конкретного класса ошибки, имеет имя согласно схеме

```
[ имя класса ошибки ]Localization__russian
```

Например, для **AlgorithmMismatchError** это будет **algorithmMismatchErrorLocalization__russian**.
Имена всех доступных классов ошибок можно посмотреть в 
[официальной документации](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/README.md#logging).

Импортированный объект локализации следует присвоить открытому статическому полю **localization** соответствующего класса ошибки.
Например, для **AlgorithmMismatchError** это будет: 

```typescript
import { AlgorithmMismatchError } from "@yamato-daiwa/es-extensions";
import { algorithmMismatchErrorLocalization__russian } from "@yamato-daiwa/es-extensions-localization-russian";

AlgorithmMismatchError.localization = algorithmMismatchErrorLocalization__russian;
```


## Дополнительная функциональность
### Константы и перечисления
#### Дата и время
##### Перечисление `RussianDaysOfWeek`

Перечисление, содержащее русские названия дней недели.
Ключи перечисления совпадают с ключами [DaysOfWeek](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/ConstantsAndEnumerations/DaysOfWeek.md).

```typescript
console.log(RussianDaysOfWeek.sunday); // -> "ВОСКРЕСЕНЬЕ"
console.log(RussianDaysOfWeek.monday); // -> "ПОНЕДЕЛЬНИК"
console.log(RussianDaysOfWeek.tuesday); // -> "ВТОРНИК"
console.log(RussianDaysOfWeek.wednesday); // -> "СРЕДА"
console.log(RussianDaysOfWeek.thursday); // -> "ЧЕТВЕРГ"
console.log(RussianDaysOfWeek.friday); // -> "ПЯТНИЦА"
console.log(RussianDaysOfWeek.saturday); // -> "СУББОТА"
```


##### Перечисление `RussianMonthsNames`

Перечисление, содержащее русские названия месяцев.
Ключи перечисления совпадают с ключами [MonthsNames](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/ConstantsAndEnumerations/MonthsNames.md).

```typescript
console.log(RussianMonthsNames.january); // -> "ЯНВАРЬ"
console.log(RussianMonthsNames.february); // -> "ФЕВРАЛЬ"
console.log(RussianMonthsNames.march); // -> "МАРТ"
console.log(RussianMonthsNames.april); // -> "АПРЕЛЬ"
console.log(RussianMonthsNames.may); // -> "МАЙ"
console.log(RussianMonthsNames.june); // -> "ИЮНЬ"
console.log(RussianMonthsNames.july); // -> "ИЮЛЬ"
console.log(RussianMonthsNames.august); // -> "АВГУСТ"
console.log(RussianMonthsNames.september); // -> "СЕНТЯБРЬ"
console.log(RussianMonthsNames.october); // -> "ОКТЯБРЬ"
console.log(RussianMonthsNames.november); // -> "НОЯБРЬ"
console.log(RussianMonthsNames.december); // -> "ДЕКАБРЬ"
```
