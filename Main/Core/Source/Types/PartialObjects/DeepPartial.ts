export type DeepPartial<BasicType> =
    BasicType extends object ?
        { [P in keyof BasicType]?: DeepPartial<BasicType[P]>; } :
        BasicType;
