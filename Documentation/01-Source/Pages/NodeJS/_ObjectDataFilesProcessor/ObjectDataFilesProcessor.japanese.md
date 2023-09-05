# `ObjectDataFilesProcessor`クラス
## メタデスクリプション

「Yamato Daiwa ECMAScript extensions（YDEE）」ライブラリの「ObjectDataFilesProcessor」クラスはYAML、JSON5、DotEnv形式のファイル
  の読み込み、バリデーション及び特定のTypeScript型へ型変換のに使われる。


## 記述

下記の形式の何れかのオブジェクト型を含むデータファイルの読み込み、、妥当性確認、そして
  [ParsedJSON](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Types/ParsedJSON/ParsedJSON.md)
  と言うジェネリック制約に満たされているTypeScript型へ型変換のに使われるクラス。

* YAML
* DotEnv
* JSON5


## 問題学

元々、Node.jsは上記の形式のファイルの処理に対応されていない（文字列として読み込みは出来るが、オブジェクトに変換する機能は無い）。
無論、上記の形式の人気度の為第三者のライブラリが存在手はいるが、当形式の規則に該当性を行った上で**any**型のオブジェクトを返しているだけ。
例えば、下記はバージョン**0.2.31**の**yaml.js**ライブラリの型定義。

```typescript
declare namespace YAML {

  function load(path: string): any;

  function load(path: string, callback: (res: any) => void): void

  function stringify(nativeObject: any, inline?: number, spaces?: number): string;

  function parse(yamlString: string): any;

}
```
