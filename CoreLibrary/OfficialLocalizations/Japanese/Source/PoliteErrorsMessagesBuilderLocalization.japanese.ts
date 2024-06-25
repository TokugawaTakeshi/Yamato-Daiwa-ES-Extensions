import type { PoliteErrorsMessagesBuilder } from "@yamato-daiwa/es-extensions";


export const politeErrorsMessagesBuilder__japanese: PoliteErrorsMessagesBuilder.Localization = {

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
    introduction: "ユーザーの皆様からの報告を、未知のエラーの発見・修正に活かしたいと考えております。" +
        "尚エラー情報をご報告下さる際は、お手数ですが下記の「開発者用技術情報」を必ず添付して下さい。" +
        "原因の発見と修正に必要な為ですが、部外秘の内容が含まれる場合は、当該箇所を伏せ字や黒塗り、表現の置き換え等で伏せて下さい。"
  }
};
