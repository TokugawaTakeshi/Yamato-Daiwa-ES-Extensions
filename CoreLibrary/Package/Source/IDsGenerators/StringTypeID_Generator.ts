/* eslint-disable-next-line max-classes-per-file -- 当規則は名スペース内のクラスに及ばないで欲しいが、適切なオプションが無い。 */
import Logger from "../Logging/Logger";
import InvalidExternalDataError from "../Errors/InvalidExternalData/InvalidExternalDataError";


abstract class StringTypeID_Generator {

  protected readonly ID_CHARACTERS_COUNT: number;
  protected readonly RELATED_ENTITY_NAME: string;
  protected readonly COLLISIONS_COUNT_LIMIT: number;


  protected constructor(
    {
      ID_CharactersCount,
      relatedEntityName,
      collisionsCountLimit
    }: Readonly<{
      ID_CharactersCount: number;
      relatedEntityName: string;
      collisionsCountLimit: number;
    }>
  ) {
    this.ID_CHARACTERS_COUNT = ID_CharactersCount;
    this.RELATED_ENTITY_NAME = relatedEntityName;
    this.COLLISIONS_COUNT_LIMIT = collisionsCountLimit;
  }


  protected abstract generateID_ButNotValidateYet(): string;
  protected abstract isGeneratedID_AvailableForUsage(generatedID: string): Promise<boolean>;

  protected onID_Decided?(ID: string): void;


  /** @throws StringTypeID_Generator.CollisionsLimitReachedError */
  public async generateID(): Promise<string> {

    let ID: string = this.generateID_ButNotValidateYet();
    this.validateID(ID);

    let collisionsCount: number = 0;

    do {

      /* eslint-disable-next-line no-await-in-loop --
       * It is completely useless to execute multiple check simultaneously in this case, each check must be executed
       * on demand. */
      if (await this.isGeneratedID_AvailableForUsage(ID)) {
        this.onID_Decided?.(ID);
        break;
      }


      collisionsCount++;

      if (collisionsCount >= this.COLLISIONS_COUNT_LIMIT) {

        Logger.throwErrorWithFormattedMessage({
          errorInstance: new StringTypeID_Generator.CollisionsLimitReachedError({
            targetEntityName: this.RELATED_ENTITY_NAME,
            collisionsCountLimit: this.COLLISIONS_COUNT_LIMIT
          }),
          title: StringTypeID_Generator.CollisionsLimitReachedError.localization.defaultTitle,
          occurrenceLocation: "StringTypeID_GeneratingService.generateID()"
        });

      }

      ID = this.generateID_ButNotValidateYet();
      this.validateID(ID);

    } while (collisionsCount < this.COLLISIONS_COUNT_LIMIT);

    return ID;

  }


  /** @throws InvalidExternalDataError */
  protected validateID(ID: string): void {

    if (ID.length !== this.ID_CHARACTERS_COUNT) {
      Logger.throwErrorWithFormattedMessage({
        errorInstance: new InvalidExternalDataError({
          customMessage:
            `Generated ID "${ ID }" for "${ this.RELATED_ENTITY_NAME }" consists from ${ ID.length } characters while ` +
                `${ this.ID_CHARACTERS_COUNT } expected.`
        }),
        title: InvalidExternalDataError.localization.defaultTitle,
        occurrenceLocation: "StringTypeID_GeneratingService.validateID()"
      });
    }

  }

}


namespace StringTypeID_Generator {

  export class CollisionsLimitReachedError extends Error {

    public static readonly NAME: string = "CollisionsLimitReachedError";


    public static localization: CollisionsLimitReachedError.Localization = {
      defaultTitle: "Collisions Limit Reached",
      generateDescription: (
        { targetEntityName, collisionsCountLimit }: CollisionsLimitReachedError.Localization.DescriptionTemplateVariables
      ): string =>
          `The collisions limit ${ collisionsCountLimit } has been reacting during generating of ID for ${ targetEntityName }. ` +
          "Change the ID generating algorithm, or increase the collisions limit."
    };


    public constructor(constructorParameter: CollisionsLimitReachedError.ConstructorParameter) {

    super();

    this.name = CollisionsLimitReachedError.NAME;

    this.message = "customMessage" in constructorParameter ?
        constructorParameter.customMessage :
        CollisionsLimitReachedError.localization.generateDescription(constructorParameter);

    }

  }

  export namespace CollisionsLimitReachedError {

    export type ConstructorParameter =
        Readonly<{ customMessage: string; }> |
        Localization.DescriptionTemplateVariables;

    export type Localization = Readonly<{
      defaultTitle: string;
      generateDescription: (templateVariables: Localization.DescriptionTemplateVariables) => string;
    }>;

    export namespace Localization {
      export type DescriptionTemplateVariables = Readonly<{
        targetEntityName: string;
        collisionsCountLimit: number;
      }>;
    }

  }

}


export default StringTypeID_Generator;
