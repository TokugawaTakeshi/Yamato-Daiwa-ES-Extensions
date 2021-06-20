# Value transformers

The names of below functions has been developed such as everything must be obvious without explanations.
If it not such as, please open the issue with title "[FunctionName]: Unclear name".

* `emptyStringToNull(targetValue: string): string | null`
* `nullToUndefined<BasicType>(targetValue: BasicType | null): BasicType | undefined`
* `nullToZero(targetValue: number | null): number`
* `undefinedToEmptyArray<ArrayElement>(targetValue: Array<ArrayElement> | undefined): Array<ArrayElement>`
* `undefinedToEmptyString(targetValue: string | undefined): string`
* `undefinedToNull<BasicType>(targetValue: BasicType): Exclude<BasicType, undefined> | null`
