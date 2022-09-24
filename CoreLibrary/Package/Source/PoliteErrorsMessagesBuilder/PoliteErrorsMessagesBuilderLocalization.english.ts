import type PoliteErrorsMessagesBuilder from "./PoliteErrorsMessagesBuilder";


const PoliteErrorsMessagesBuilder__English: PoliteErrorsMessagesBuilder.Localization = {

  introduction: "We are sorry, but it is a bug. " +
      "Please accept out deepest apologies about the malfunction during your work.",

  generateReportingRequest: ({ bugTrackerURI }: Readonly<{ bugTrackerURI: string; }>): string =>
      "We are understanding about you are busy and have a deadline, but would you please to report us about the issue " +
      `by below link?\n ${ bugTrackerURI }`,

  whatHappened: {
    heading: "=== What happened? =====================================================================================",
    introduction: "If you are what to know what happened, please allow us to explain with minimal details."
  },

  technicalDetails: {
    heading: "=== Technical details ==================================================================================",
    introduction: "If you would be so kind to report as, please append the below details for developers. " +
        "If these details contains some sensitive data, please replace it with something neutral."
  }
};


export default PoliteErrorsMessagesBuilder__English;
