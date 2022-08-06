# `@yamato-daiwa/es-extensions`の日本語化

## 導入

**@yamato-daiwa/es-extensions-localization-japanese**は **@yamato-daiwa/es-extensions**に対するピア依存性（[peer dependency](https://nodejs.org/en/blog/npm/peer-dependencies/)）
であり、バージョンはマイナーバージョンまで一致しなければいけない。例えば、**@yamato-daiwa/es-extensions-localization-japanese**の1.5.0バージョンは
**@yamato-daiwa/es-extensions**のバージョン**1.5.0**から**1.6.0未満**まで相互的。

```
npm i @yamato-daiwa/es-extensions-localization-japanese @yamato-daiwa/es-extensions -E
```


## 方法論

日本語は重たい処理を含めてはいないが、出力JavaScriptコードを増やし、ブラウザー環境で実行されるスクリプトにとって感じられる程度の悪影響が発生する恐れがある。
それで使われていない機能を含めて全部日本がすく事は非推薦の方法論であり、特にブラウザー専用のコードの場合。

上記の考慮の上、現在 **@yamato-daiwa/es-extensions** の完全な日本語化機能が提供されなく、日本語化可能な機能及び日本語化の方法について下記参照。


## 日本語化可能な機能

### RawObjectDataProcessorクラスの日本語化

[RawObjectDataProcessor](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/RawObjectDataProcessor/RawObjectDataProcessor.md#quick-example)
クラスを[`process`メソッド](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/RawObjectDataProcessor/RawObjectDataProcessor.md#process)
の一回実行に限って日本語化出来るし、アプリケーションが実行されている限り日本語化の適応も可能。
どちらにせよ、**RawObjectDataProcessorLocalization__Japanese**という日本語化のオブジェクトが必要になる。

`process`メソッドがの一回実行の際だけ日本語化を適応する場合、第３の引数の **localization** プロパティをしているする事

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

アプリケーションが実行されている限り **RawObjectDataProcessor** を有効のままに肢体場合、`setDefaultLocalization`を呼び出す事。

```typescript
import { RawObjectDataProcessor } from "@yamato-daiwa/es-extensions";
import { RawObjectDataProcessorLocalization__Japanese } from "@yamato-daiwa/es-extensions-localization-japanese";


RawObjectDataProcessor.setDefaultLocalization(RawObjectDataProcessorLocalization__Japanese);
```


### Loggerファサードの日本語化

**LoggerLocalization__Japanese**オブジェクトは[**Logger**](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Logging/Logger/Logger.md)
クラス自体に所属している文字列のみ日本語化し、これらが[少ない](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Source/Logging/LoggerLocalization__English.ts)。
各エラーのメッセージは別当に日本語化する必要があり、**@yamato-daiwa/es-extensions**のエラークラスの日本語化方法は下記参照。


```typescript
import { Logger } from "@yamato-daiwa/es-extensions";
import LoggerLocalization__Japanese from "@yamato-daiwa/es-extensions-localization-japanese";


Logger.setLocalization(LoggerLocalization__Japanese);
```


### エラークラスの日本語化

特定エラーのクラスの日本語化オブジェクトの名前は下記の規則に従っている。

```
[ エラークラス名 ]Lozalization__Japanese
```

例えば**AlgorithmMismatchError**エラークラスにとって日本語化オブジェクトは**AlgorithmMismatchErrorLocalization__Japanese**という名前になる。
全てのエラークラスの名前は **@yamato-daiwa/es-extensions**の[正式的説明書](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/README.md#logging)
で確認できる。

インポートされた日本語化オブジェクトは適切なエラークラスの**localization**という公開静的フィールドに割り得てる事。
例えば、**AlgorithmMismatchError**の場合

```typescript
import { AlgorithmMismatchError } from "@yamato-daiwa/es-extensions";
import { AlgorithmMismatchErrorLocalization__Japanese } from "@yamato-daiwa/es-extensions-localization-japanese";

AlgorithmMismatchError.localization = AlgorithmMismatchErrorLocalization__Japanese;
```
