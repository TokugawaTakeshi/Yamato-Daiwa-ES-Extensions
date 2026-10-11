import insertSubstring from "../../Strings/insertSubstring";
import politeErrorsMessagesBuilder__english from "./PoliteErrorsMessagesBuilderLocalization.english";
import surroundLabelByOrnament from "../../Strings/surroundLabelByOrnament";


abstract class PoliteErrorsMessagesBuilder {

  protected static readonly MAXIMAL_CHARACTERS_PER_ROW_COUNT: number = 120;

  protected static isTechnicalsDetailOnlyMode: boolean = false;

  protected static localization: PoliteErrorsMessagesBuilder.Localization = politeErrorsMessagesBuilder__english;

  protected static defaultBugTrackerURI: string | undefined;


  public static buildMessage(sourceData: PoliteErrorsMessagesBuilder.SourceData): string {

    const isTechnicalsDetailOnlyMode: boolean = sourceData.isTechnicalsDetailOnlyMode ??
        PoliteErrorsMessagesBuilder.isTechnicalsDetailOnlyMode;

    if (isTechnicalsDetailOnlyMode) {
      return sourceData.technicalDetails;
    }


    const localization: PoliteErrorsMessagesBuilder.Localization = sourceData.
        localization ?? PoliteErrorsMessagesBuilder.localization;

    const bugTackerURI: string | undefined = sourceData.bugTrackerURI ??
        PoliteErrorsMessagesBuilder.defaultBugTrackerURI;

    return `\n${ localization.introduction }` +

        insertSubstring(
          bugTackerURI,
          {
            modifier: (definedBugTrackerURI: string): string =>
                `\n\n${ localization.generateReportingRequest({ bugTrackerURI: definedBugTrackerURI }) }`
          }
        ) +

        `\n\n${ 
          surroundLabelByOrnament({
            label: ` ${ localization.whatHappened.heading } `,
            ornamentPatten: "━",
            prependedPartCharactersCount: 3,
            totalCharactersCount: PoliteErrorsMessagesBuilder.MAXIMAL_CHARACTERS_PER_ROW_COUNT
          }) 
        }` +
        `\n${ localization.whatHappened.introduction }` +
        `\n${ sourceData.politeExplanation }` +

        `\n\n${
          surroundLabelByOrnament({
            label: ` ${ localization.technicalDetails.heading } `,
            ornamentPatten: "━",
            prependedPartCharactersCount: 3,
            totalCharactersCount: PoliteErrorsMessagesBuilder.MAXIMAL_CHARACTERS_PER_ROW_COUNT
          })
        }` +
        `\n${ localization.technicalDetails.introduction }` +
        `\n${ "─".repeat(PoliteErrorsMessagesBuilder.MAXIMAL_CHARACTERS_PER_ROW_COUNT) }` +
        `\n${ sourceData.technicalDetails }`;

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

  export type SourceData = Readonly<{
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
