export type PartialBy<Base, ExcludingProperties extends keyof Base> =
    Omit<Base, ExcludingProperties> & Partial<Pick<Base, ExcludingProperties>>;
