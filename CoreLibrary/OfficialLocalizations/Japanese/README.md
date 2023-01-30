# `@yamato-daiwa/es-extensions`の日本語化

## 導入

**@yamato-daiwa/es-extensions-localization-japanese** は、**@yamato-daiwa/es-extensions（以下YDEE）** 
にピア依存関係（[peer dependency](https://nodejs.org/en/blog/npm/peer-dependencies/)）を持つ日本語化ライブラリであり、
マイナーバージョンまで一致している **YDEE** で利用可能だ。

例えばバージョン**1.5.0**は、**YDEE** のバージョン**1.5.0～1.5.?** で使えるが、バージョン**1.6.0以上**では使用不可。

```
npm i @yamato-daiwa/es-extensions-localization-japanese @yamato-daiwa/es-extensions -E
```


## 方法論

此のパッケージでは日本語の処理負荷の低減に重々配慮しているが、出力用の JavaScript コードを増やした為、ブラウザー環境で実行されるスクリプトでは多少の悪影響を及ぼす恐れがある。

此のため使用頻度が低いか全く無い機能を含め、全てを日本語化してしまう事は非効率なので推奨されず、特にブラウザー専用のコードの場合は尚更だ。

上記を考慮した結果、現在 **YDEE** の完全な日本語化機能は提供されていない。

現時点で日本語化可能な機能、及び日本語化の方法については、以下をご参照いただきたい。


## 日本語化可能な機能

### RawObjectDataProcessorクラス

[RawObjectDataProcessor](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/RawObjectDataProcessor/RawObjectDataProcessor.md#quick-example)
クラスは [`process` メソッド](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/RawObjectDataProcessor/RawObjectDataProcessor.md#process)
を呼び出すことで日本語化出来、アプリケーションが実行されている限り、間接的ではあるが日本語化への対応が可能だ。

但し此の方法には、 **RawObjectDataProcessorLocalization__Japanese** という日本語化用オブジェクトが必要だ。

`process` メソッドの実行で日本語化する場合、次の様に第３引数の **localization** プロパティで **RawObjectDataProcessorLocalization__Japanese** を指定すればよい。

```typescript
import { RawObjectDataProcessor } from "@yamato-daiwa/es-extensions";
import { RawObjectDataProcessorLocalization__Japanese } from "@yamato-daiwa/es-extensions-localization-japanese";

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
  { localization: RawObjectDataProcessorLocalization__Japanese }
);
```

アプリケーションの実行中 **RawObjectDataProcessor** を有効にしておきたい場合は、次のように`setDefaultLocalization` を呼び出す。

```typescript
import { RawObjectDataProcessor } from "@yamato-daiwa/es-extensions";
import { RawObjectDataProcessorLocalization__Japanese } from "@yamato-daiwa/es-extensions-localization-japanese";


RawObjectDataProcessor.setDefaultLocalization(RawObjectDataProcessorLocalization__Japanese);
```


### Loggerファサードの日本語化

**LoggerLocalization__Japanese** オブジェクトは [**Logger**](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Logging/Logger/Logger.md)
 クラスに属する文字列を日本語化するが、これらの総数は[少ない](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Source/Logging/LoggerLocalization__English.ts)。
各エラーメッセージは別途日本語化する必要があり、**YDEE** のエラークラスの日本語化方法については以下の通りだ。


```typescript
import { Logger } from "@yamato-daiwa/es-extensions";
import LoggerLocalization__Japanese from "@yamato-daiwa/es-extensions-localization-japanese";


Logger.setLocalization(LoggerLocalization__Japanese);
```


### エラークラスの日本語化

特定のエラーのクラスの日本語化オブジェクト名は、下記の命名規則に従っている。

```
[ エラークラス名 ]＋Lozalization__Japanese
```

例えば **AlgorithmMismatchError** エラーの日本語化オブジェクトは、**AlgorithmMismatchErrorLocalization__Japanese** という名前になる。

全てのエラークラス名は、**@ydee** の[公式説明書](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/README.md#logging)
で確認可能だ。

インポートされた日本語化オブジェクトは、適切なエラークラスの公開静的フィールド **localization** に割り当てる必要が有る。

例えば **AlgorithmMismatchError** の場合は、

```typescript
import { AlgorithmMismatchError } from "@yamato-daiwa/es-extensions";
import { AlgorithmMismatchErrorLocalization__Japanese } from "@yamato-daiwa/es-extensions-localization-japanese";

AlgorithmMismatchError.localization = AlgorithmMismatchErrorLocalization__Japanese;
```

の様に記述して割り当てる。


## 追加機能
### 定数・列挙
#### 日時（曜日、月）
##### `JapaneseDaysOfWeek`列挙

曜日の名前を含む列挙。
キーは[DaysOfWeek](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/ConstantsAndEnumerations/DaysOfWeek.md)
  列挙のキーと一致。

```typescript
console.log(JapaneseDaysOfWeek.sunday); // -> "日曜日"
console.log(JapaneseDaysOfWeek.monday); // -> "月曜日"
console.log(JapaneseDaysOfWeek.tuesday); // -> "火曜日"
console.log(JapaneseDaysOfWeek.wednesday); // -> "水曜日"
console.log(JapaneseDaysOfWeek.thursday); // -> "木曜日"
console.log(JapaneseDaysOfWeek.friday); // -> "金曜日"
console.log(JapaneseDaysOfWeek.saturday); // -> "土曜日"
```


##### `AbbreviatedJapaneseDaysOfWeek`列挙

各曜日の頭文字を含む列挙。
キーは[DaysOfWeek](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/ConstantsAndEnumerations/DaysOfWeek.md)
  列挙のキーと一致。

```typescript
console.log(AbbreviatedJapaneseDaysOfWeek.sunday); // -> "日"
console.log(AbbreviatedJapaneseDaysOfWeek.monday); // -> "月"
console.log(AbbreviatedJapaneseDaysOfWeek.tuesday); // -> "火"
console.log(AbbreviatedJapaneseDaysOfWeek.wednesday); // -> "水"
console.log(AbbreviatedJapaneseDaysOfWeek.thursday); // -> "木"
console.log(AbbreviatedJapaneseDaysOfWeek.friday); // -> "金"
console.log(AbbreviatedJapaneseDaysOfWeek.saturday); // -> "土"
```


##### `JapaneseMonthsNames`列挙

日本語でアラビア数字を用いる一般月名。
キーは[MonthsNames](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/ConstantsAndEnumerations/MonthsNames.md)
  列挙のキーと一致。

```typescript
console.log(JapaneseMonthsNames.january); // -> "１月"
console.log(JapaneseMonthsNames.february); // -> "２月"
console.log(JapaneseMonthsNames.march); // -> "３月"
console.log(JapaneseMonthsNames.april); // -> "４月"
console.log(JapaneseMonthsNames.may); // -> "５月"
console.log(JapaneseMonthsNames.june); // -> "６月"
console.log(JapaneseMonthsNames.july); // -> "７月"
console.log(JapaneseMonthsNames.august); // -> "８月"
console.log(JapaneseMonthsNames.september); // -> "９月"
console.log(JapaneseMonthsNames.october); // -> "１０月"
console.log(JapaneseMonthsNames.november); // -> "１１月"
console.log(JapaneseMonthsNames.december); // -> "１２月"
```

##### `JapaneseTraditionalMonthsNames`列挙

日本語の伝統的な月名である旧暦の月名。
キーは[MonthsNames](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/ConstantsAndEnumerations/MonthsNames.md)
列挙のキーと一致。

```typescript
console.log(JapaneseTraditionalMonthsNames.january); // -> "睦月"
console.log(JapaneseTraditionalMonthsNames.february); // -> "如月"
console.log(JapaneseTraditionalMonthsNames.march); // -> "弥生"
console.log(JapaneseTraditionalMonthsNames.april); // -> "卯月"
console.log(JapaneseTraditionalMonthsNames.may); // -> "皐月"
console.log(JapaneseTraditionalMonthsNames.june); // -> "水無月"
console.log(JapaneseTraditionalMonthsNames.july); // -> "文月"
console.log(JapaneseTraditionalMonthsNames.august); // -> "葉月"
console.log(JapaneseTraditionalMonthsNames.september); // -> "長月"
console.log(JapaneseTraditionalMonthsNames.october); // -> "神無月"
console.log(JapaneseTraditionalMonthsNames.november); // -> "霜月"
console.log(JapaneseTraditionalMonthsNames.december); // -> "師走"
```
