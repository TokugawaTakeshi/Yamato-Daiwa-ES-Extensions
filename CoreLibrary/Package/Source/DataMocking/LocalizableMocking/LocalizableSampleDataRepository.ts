import LocalizableEntitiesByIDsMap from "./LocalizableEntitiesByIDsMap";
import Logger from "../../Logging/Logger";
import UnexpectedEventError from "../../Errors/UnexpectedEvent/UnexpectedEventError";
import isUndefined from "../../TypeGuards/EmptyTypes/isUndefined";
import getEntriesOfObjectWithFixedKeysSetAndUniformValues from "../../Objects/getEntriesOfObjectWithFixedKeysSetAndUniformValues";


abstract class LocalizableSampleDataRepository<
  Entity,
  EntityID extends string | number | bigint,
  HumanFriendlyIDs extends string,
  Localization,
  LocalizationsKeys extends string,
  Workpiece extends Readonly<{ [keys in string]: unknown; }>
> {

  /* ━━━ Fields ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  /* ┅┅┅ Abstract ┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅ */
  protected abstract readonly workpieces: Readonly<{ [humanReadableIDs in HumanFriendlyIDs]: Workpiece }>;


  /* ┅┅┅ Instance ┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅ */
  protected cachedSamplesWithLocalizationsByHumanFriendlyIDs?:
      LocalizableSampleDataRepository.
          SamplesWithLocalizationsByHumanFriendlyIDs<HumanFriendlyIDs, Entity, Localization, LocalizationsKeys>;


  /* ━━━ Getters ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  public get entitiesCount(): number {
    return Object.entries(this.workpieces).length;
  }


  /* ━━━ Methods ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  /* ┅┅┅ Abstract ┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅ */

  protected abstract completeWorkpiece(regularID: EntityID, workpieces: Workpiece):
      LocalizableEntitiesByIDsMap.EntityWithLocalizations<Entity, Localization, LocalizationsKeys>;

  protected abstract getEntityID(entity: Entity): EntityID;


  /* ┅┅┅ Public ┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅ */
  public assignIDsAndGetLocalizableEntitiesMap(
    {
      preGeneratedIDs,
      mustCacheGeneratedSamples
    }: Readonly<{
      preGeneratedIDs: ReadonlyArray<EntityID>;
      mustCacheGeneratedSamples: boolean;
    }>
  ): LocalizableEntitiesByIDsMap<Entity, EntityID, Localization, LocalizationsKeys> {

    let samplesWithLocalizationsByHumanFriendlyIDs: LocalizableSampleDataRepository.
        SamplesWithLocalizationsByHumanFriendlyIDs<HumanFriendlyIDs, Entity, Localization, LocalizationsKeys>;

    if (isUndefined(this.cachedSamplesWithLocalizationsByHumanFriendlyIDs)) {

      const iterativelyGeneratedSamplesWithLocalizationByHumanFriendlyIDs: Partial<
        LocalizableSampleDataRepository.
            SamplesWithLocalizationsByHumanFriendlyIDs<HumanFriendlyIDs, Entity, Localization, LocalizationsKeys>
      > =
          getEntriesOfObjectWithFixedKeysSetAndUniformValues(this.workpieces).
              reduce(
                (
                  interimSamplesWithLocalizationByHumanFriendlyIDs:
                      Partial<
                        LocalizableSampleDataRepository.
                            SamplesWithLocalizationsByHumanFriendlyIDs<HumanFriendlyIDs, Entity, Localization, LocalizationsKeys>
                      >,
                  [ humanReadableIDs, workpiece ]: Readonly<[ HumanFriendlyIDs, Workpiece ]>,
                  index: number
                ): Partial<
                  LocalizableSampleDataRepository.
                      SamplesWithLocalizationsByHumanFriendlyIDs<HumanFriendlyIDs, Entity, Localization, LocalizationsKeys>
                > => {

                  interimSamplesWithLocalizationByHumanFriendlyIDs[humanReadableIDs] =
                      this.completeWorkpiece(preGeneratedIDs[index], workpiece);

                  return interimSamplesWithLocalizationByHumanFriendlyIDs;

                },
                {}
            );

      samplesWithLocalizationsByHumanFriendlyIDs =

            /* eslint-disable-next-line @typescript-eslint/consistent-type-assertions --
            * Being the object with fixed keys, if without using of type casting, the variable of
            *   `SamplesWithLocalizationByHumanFriendlyIDs` type can be initialized only via manual writing of all keys
            *   and values, while in this case the object initializing is iterative. */
            iterativelyGeneratedSamplesWithLocalizationByHumanFriendlyIDs as LocalizableSampleDataRepository.
                SamplesWithLocalizationsByHumanFriendlyIDs<HumanFriendlyIDs, Entity, Localization, LocalizationsKeys>;

    } else {

      samplesWithLocalizationsByHumanFriendlyIDs = this.cachedSamplesWithLocalizationsByHumanFriendlyIDs;
    }

    if (mustCacheGeneratedSamples) {
      this.cachedSamplesWithLocalizationsByHumanFriendlyIDs = samplesWithLocalizationsByHumanFriendlyIDs;
    }

    return new LocalizableEntitiesByIDsMap({
      getEntityID: this.getEntityID.bind(this),
      initialEntitiesWithLocalizations: Object.values(samplesWithLocalizationsByHumanFriendlyIDs)
    });

  }

  public getExpectedBeInitializedSamplesWithLocalizationsByHumanFriendlyIDs():
      LocalizableSampleDataRepository.
          SamplesWithLocalizationsByHumanFriendlyIDs<HumanFriendlyIDs, Entity, Localization, LocalizationsKeys>
  {
    return this.cachedSamplesWithLocalizationsByHumanFriendlyIDs ??
        Logger.throwErrorWithFormattedMessage({
          errorInstance:
              new UnexpectedEventError(
                "Contrary to expectations, the samples with localizations by human friendly IDs map has not been initialized."
              ),
          title: UnexpectedEventError.localization.defaultTitle,
          occurrenceLocation:
              "InheritorOf<LocalizableSamplesRepository>." +
                  "getExpectedBeInitializedSamplesWithLocalizationsByHumanFriendlyIDs(compoundParameter)"
        });

  }


  /* ┅┅┅ Protected Static Methods ┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅ */
  protected static createLocalizations<
    LocaleDependentFields,
    Localization,
    LocalizationsKeys extends string,
    Workpiece extends Readonly<{ [keys in string]: unknown; }>
  >(
    workpiece: Workpiece,
    getLocaleDependentFields: (workpiece: Workpiece) => Readonly<{ [keys in LocalizationsKeys]: LocaleDependentFields }>,
    composeLocalization: (localizationKey: LocalizationsKeys, localeDependentFields: LocaleDependentFields) => Localization
  ): { [key in LocalizationsKeys]: Localization; } {
    return getEntriesOfObjectWithFixedKeysSetAndUniformValues(getLocaleDependentFields(workpiece)).reduce(
      (
        interimLocalizations: { [key in LocalizationsKeys]: Localization },
        [ languageBCP_47_Subtag, localeDependentFields ]:
            Readonly<[ LocalizationsKeys, LocaleDependentFields ]>
      ): { [key in LocalizationsKeys]: Localization } => {

       interimLocalizations[languageBCP_47_Subtag] = composeLocalization(languageBCP_47_Subtag, localeDependentFields);
       return interimLocalizations;

      },
      /* eslint-disable-next-line @typescript-eslint/consistent-type-assertions --
      * Object with fixed keys is being assembled dynamically, thus initially the object is empty, but
      *   `LocalizationsKeys` guarantee that all keys will be set. */
      {} as { [key in LocalizationsKeys]: Localization; }
    );
  }

}


namespace LocalizableSampleDataRepository {

  export type SamplesWithLocalizationsByHumanFriendlyIDs<
    HumanReadableIDs extends string,
    Entity,
    Localization,
    LocalizationsKeys extends string
  > = {
      [humanReadableID in HumanReadableIDs]:
          LocalizableEntitiesByIDsMap.EntityWithLocalizations<Entity, Localization, LocalizationsKeys>
    };

}


export default LocalizableSampleDataRepository;
