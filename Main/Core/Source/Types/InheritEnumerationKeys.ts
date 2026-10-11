export type InheritEnumerationKeys<BaseEnumeration, ValueType> = {
  [key in keyof BaseEnumeration]: ValueType;
};
