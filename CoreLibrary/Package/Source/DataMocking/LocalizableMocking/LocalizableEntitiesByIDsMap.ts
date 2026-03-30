class LocalizableEntitiesByIDsMap<
  Entity,
  EntityID extends string | number | bigint,
  Localization,
  LocalizationsKeys extends string
>
    /* eslint-disable-next-line id-length -- Should Not be actual for built-in types. */
    extends Map<EntityID, LocalizableEntitiesByIDsMap.EntityWithLocalizations<Entity, Localization, LocalizationsKeys>>
/* eslint-disable-next-line @stylistic/brace-style -- Will be allowed soon. */
{

  public constructor(
    entries?: ReadonlyArray<
      readonly [ EntityID, LocalizableEntitiesByIDsMap.EntityWithLocalizations<Entity, Localization, LocalizationsKeys> ]
    >
  ) {
    super(entries);
  }

  public addEntries(
    entries: ReadonlyArray<
      readonly [EntityID, LocalizableEntitiesByIDsMap.EntityWithLocalizations<Entity, Localization, LocalizationsKeys>]
    >
  ): void {
    for (const [ key, value ] of entries) {
      this.set(key, value);
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
