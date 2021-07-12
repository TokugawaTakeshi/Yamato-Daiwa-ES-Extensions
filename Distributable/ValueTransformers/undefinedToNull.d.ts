export default function undefinedToNull<BasicType>(targetValue: BasicType): Exclude<BasicType, undefined> | null;
