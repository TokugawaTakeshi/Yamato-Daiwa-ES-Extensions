import insertSubstring from "../Strings/insertSubstring";
import PoliteErrorsMessagesBuilder__English from "./PoliteErrorsMessagesBuilderLocalization.english";


class PoliteErrorsMessagesBuilder {

  private static isTechnicalsDetailOnlyMode: boolean = false;

  private static localization: PoliteErrorsMessagesBuilder.Localization = PoliteErrorsMessagesBuilder__English;

  private static defaultBugTrackerURI: string | undefined;


  public static buildMessage(namedParameters: PoliteErrorsMessagesBuilder.NamedParameters): string {

    const isTechnicalsDetailOnlyMode: boolean = namedParameters.isTechnicalsDetailOnlyMode ??
        PoliteErrorsMessagesBuilder.isTechnicalsDetailOnlyMode;

    if (isTechnicalsDetailOnlyMode) {
      return namedParameters.technicalDetails;
    }


    const localization: PoliteErrorsMessagesBuilder.Localization = namedParameters.
        localization ?? PoliteErrorsMessagesBuilder.localization;
    const bugTackerURI: string | undefined = namedParameters.bugTrackerURI ??
        PoliteErrorsMessagesBuilder.defaultBugTrackerURI;

    return `${ localization.introduction }` +

        `${
          insertSubstring(
            bugTackerURI,
            {
              modifier: (definedBugTrackerURI: string): string =>
                  `\n\n${ localization.generateReportingRequest({ bugTrackerURI: definedBugTrackerURI }) }`
            }
          )
        }` +

        `\n\n${ localization.whatHappened.heading }` +
        `\n${ localization.whatHappened.introduction }` +
        `\n${ namedParameters.politeExplanation }` +

        `\n\n${ localization.technicalDetails.heading }` +
        `\n${ localization.technicalDetails.introduction }` +
        `\n${ namedParameters.technicalDetails }`;
  }

  public static setDefaultLocalization(
    newLocalization: PoliteErrorsMessagesBuilder.Localization
  ): typeof PoliteErrorsMessagesBuilder {
    this.localization = newLocalization;
    return PoliteErrorsMessagesBuilder;
  }

  public static setDefaultBugTrackerURI(bugTrackerURI: string): typeof PoliteErrorsMessagesBuilder {
    this.defaultBugTrackerURI = bugTrackerURI;
    return PoliteErrorsMessagesBuilder;
  }

  public static setTechnicalDetailsOnlyModeIf(condition: boolean): typeof PoliteErrorsMessagesBuilder {

    if (condition) {
      PoliteErrorsMessagesBuilder.isTechnicalsDetailOnlyMode = true;
    }

    return PoliteErrorsMessagesBuilder;
  }
}


namespace PoliteErrorsMessagesBuilder {

  export type NamedParameters = Readonly<{
    technicalDetails: string;
    politeExplanation: string;
    bugTrackerURI?: string;
    isTechnicalsDetailOnlyMode?: boolean;
    localization?: Localization;
  }>;

  export type Localization = Readonly<{
    introduction: string;
    generateReportingRequest: (namedParameters: Readonly<{ bugTrackerURI: string; }>) => string;
    whatHappened: Readonly<{
      heading: string;
      introduction: string;
    }>;
    technicalDetails: Readonly<{
      heading: string;
      introduction: string;
    }>;
  }>;
}


export default PoliteErrorsMessagesBuilder;
