export default function emptyStringToUndefined(targetValue: string): string | undefined;

export default function emptyStringToUndefined<BasicType>(targetValue: BasicType): BasicType | undefined;


export default function emptyStringToUndefined<BasicType>(targetValue: BasicType): BasicType | undefined {

  /* eslint-disable-next-line no-void -- "no-void" vs "no-undefined" conflict. "void 0" is better than `undefined` literal. */
  return typeof targetValue === "string" && targetValue.length === 0 ? void 0 : targetValue;

}
