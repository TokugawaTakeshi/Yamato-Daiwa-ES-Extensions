class LocalizableEntitiesByIDsMap<
  Entity,
  EntityID extends string | number | bigint,
  Localization,
  LocalizationsKeys extends string
>
    /* eslint-disable-next-line id-length -- Should Not be actual for built-in types. */
    extends Map<EntityID, LocalizableEntitiesByIDsMap.EntityWithLocalizations<Entity, Localization, LocalizationsKeys>>
{

  private readonly getEntityID: (entity: Entity) => EntityID;


  public constructor(
    {
      initialEntitiesWithLocalizations,
      getEntityID
    }: Readonly<{
      initialEntitiesWithLocalizations?:
          ReadonlyArray<LocalizableEntitiesByIDsMap.EntityWithLocalizations<Entity, Localization, LocalizationsKeys>>;
      getEntityID: (entity: Entity) => EntityID;
    }>

  ) {

    super(
      (initialEntitiesWithLocalizations ?? []).
          map(
            (
              { entity, localizations }:
                  LocalizableEntitiesByIDsMap.EntityWithLocalizations<Entity, Localization, LocalizationsKeys>
            ):
                Readonly<[
                  EntityID,
                  LocalizableEntitiesByIDsMap.EntityWithLocalizations<Entity, Localization, LocalizationsKeys>
                ]> =>
                    [
                      getEntityID(entity),
                      {
                        entity,
                        localizations
                      }
                    ]
          )
    );

    this.getEntityID = getEntityID;

  }


  public addEntityWithLocalization(
    { entity, localizations }: LocalizableEntitiesByIDsMap.EntityWithLocalizations<Entity, Localization, LocalizationsKeys>
  ): void {
    super.set(
      this.getEntityID(entity),
      {
        entity,
        localizations
      }
    );
  }

  public addEntitiesWithLocalizations(
    entitiesWithLocalization:
        ReadonlyArray<LocalizableEntitiesByIDsMap.EntityWithLocalizations<Entity, Localization, LocalizationsKeys>>
  ): void {
    for (const { entity, localizations } of entitiesWithLocalization) {
      this.set(this.getEntityID(entity), { entity, localizations });
    }
  }

}


namespace LocalizableEntitiesByIDsMap {

  export type EntityWithLocalizations<Entity, Localization, LocalizationsKeys extends string> = {
    entity: Entity;
    localizations: Readonly<{ [key in LocalizationsKeys]: Localization; }>;
  };

  export namespace EntityWithLocalizations {

    export function createLocalizations<Localization, LocalizationsKeys extends string>(
      localizationsKeysEnumeration: Readonly<{ [key: string]: LocalizationsKeys; }>,
      createLocalization: (localizationKey: LocalizationsKeys) => Localization
    ): { [key in LocalizationsKeys]: Localization; } {
      return Object.values(localizationsKeysEnumeration).reduce(
        (
          interimLocalizations: { [key in LocalizationsKeys]: Localization; },
          localizationKey: LocalizationsKeys
        ): { [key in LocalizationsKeys]: Localization; } => {
         interimLocalizations[localizationKey] = createLocalization(localizationKey);
         return interimLocalizations;
        },
        /* eslint-disable-next-line @typescript-eslint/consistent-type-assertions --
        * Object with fixed keys is being assembled dynamically, thus initially the object is empty, but
        *   `LocalizationsKeys` guarantee that all keys will be set. */
        {} as { [key in LocalizationsKeys]: Localization; }
      );
    }

  }

}


export default LocalizableEntitiesByIDsMap;
