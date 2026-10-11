export default function emptyStringToTrue(targetValue: string): string | true;

export default function emptyStringToTrue<BasicType>(targetValue: BasicType): BasicType | true;


export default function emptyStringToTrue<BasicType>(targetValue: BasicType): BasicType | true {
  return typeof targetValue === "string" && targetValue.length === 0 ? true : targetValue;
}
