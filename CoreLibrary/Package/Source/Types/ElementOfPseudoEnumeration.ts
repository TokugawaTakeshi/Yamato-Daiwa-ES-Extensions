export type ElementOfPseudoEnumeration<SingleLevelObject extends { [ key: string ]: string | number; }> =
    SingleLevelObject[keyof SingleLevelObject];
