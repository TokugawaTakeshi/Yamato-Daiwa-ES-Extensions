import type { PoliteErrorsMessagesBuilder } from "@yamato-daiwa/es-extensions";


const PoliteErrorsMessagesBuilder__Japanese: PoliteErrorsMessagesBuilder.Localization = {

  introduction: "バグが発生しました。" +
      "お忙しい中ご迷惑を掛けてしまい、大変申し訳ありません。",

  generateReportingRequest: ({ bugTrackerURI }: Readonly<{ bugTrackerURI: string; }>): string =>
      `恐れ入りますが下記のリンクから、エラー情報をご提供いただけますようお願いいたします。\n ${ bugTrackerURI }`,

  whatHappened: {
    heading: "=== 何が起こったのか？ =======================================================================================",
    introduction: "発生エラーに関する説明をご希望の方は、簡潔にではありますが折り返し説明させていただきます。"
  },

  technicalDetails: {
    heading: "=== エラー発生時の開発者用技術情報のご提供のお願い ================================================================",
    introduction: "やまとダイワでは、「ユーザー様のご意見を品質向上に活かしたい」と考えております。" +
        "エラー情報をご報告下さる際、お手数ですが下記の「開発者用技術情報」を添付していただけますと助かります（任意）。" +
        "部外者に公開出来ない内容が含まれる場合は、当該箇所を伏せ字や黒塗りにする、または差し障りの無い一般語句や表現に置き換えていただいても構いません。"
  }
};


export default PoliteErrorsMessagesBuilder__Japanese;
