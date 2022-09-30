import type { PoliteErrorsMessagesBuilder } from "@yamato-daiwa/es-extensions";


const PoliteErrorsMessagesBuilder__Japanese: PoliteErrorsMessagesBuilder.Localization = {

  introduction: "大変申し訳御座いません。バグが発生しました。" +
      "御忙しいのに、御作業中御迷惑をおかけして、深く御詫び申し上げます。",

  generateReportingRequest: ({ bugTrackerURI }: Readonly<{ bugTrackerURI: string; }>): string =>
      `御多忙で、納期が御座る中に大変恐縮ですが、下記のリンクで起きたエラーに関しまして通報していただけませんでしょうか。\n ${ bugTrackerURI }`,

  whatHappened: {
    heading: "=== 何が起きた？ ==========================================================================================",
    introduction: "起きたエラーに就きまして説明を御希望でしたら、最小限の技術的詳細で御説明させていただきます。"
  },

  technicalDetails: {
    heading: "=== 技術的詳細 ===========================================================================================",
    introduction: "もし、起きたエラーに就きまして報告していただけたら、御手数ですが、開発者向けの下記の技術的詳細を添付していただいても宜しいでしょうか？" +
        "公開出来ない情報が入っている場合、マスキングが、中立的なものに置き換えて下さい。"
  }
};


export default PoliteErrorsMessagesBuilder__Japanese;
