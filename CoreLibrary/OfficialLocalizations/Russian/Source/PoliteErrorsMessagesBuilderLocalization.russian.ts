import type { PoliteErrorsMessagesBuilder } from "@yamato-daiwa/es-extensions";


const PoliteErrorsMessagesBuilder__Russian: PoliteErrorsMessagesBuilder.Localization = {

  introduction: "Мы сожалеем, но это баг. " +
      "Пожалуйста, примите наши глубочайшие изменения за доставленные этой ошибкой проблемы во время Вашей работы.",

  generateReportingRequest: ({ bugTrackerURI }: Readonly<{ bugTrackerURI: string; }>): string =>
      "Мы понимаем, что вы сильно заняты и Вашей работы есть сроки, но будете ли вы столь любезны сообщить нам об " +
      `этой ошибке по ссылке ниже?\n ${ bugTrackerURI }`,

  whatHappened: {
    heading: "=== Что произошло? =====================================================================================",
    introduction: "Если Вы хотите получить объяснения по поводу этой ошибки, то мы постараемся объяснить это с минимум " +
        "технических деталей."
  },

  technicalDetails: {
    heading: "=== Технические детали ==================================================================================",
    introduction: "Если вы будете так добры сообщить нам ошибке, пожалуйста, включите это технические детали для разработчиков." +
        "Если эти данные содержат какие-либо секретные данные, пожалуйста, замените их на что-нибудь нейтральное."
  }
};


export default PoliteErrorsMessagesBuilder__Russian;
