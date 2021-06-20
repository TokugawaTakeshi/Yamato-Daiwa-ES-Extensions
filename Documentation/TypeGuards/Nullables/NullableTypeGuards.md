# Nullable Type Guards

Strict config of [@typescript-eslint](https://github.com/typescript-eslint/typescript-eslint) does not allow the short
checks like `if (value)` for non-booleans. Below checkers allows to simplify the type checking for `null` or `undefined`.

* `isNeitherUndefinedNorNull<TargetType>(targetValue: TargetType | null | undefined): targetValue is TargetType`
* `isNotNull<TargetValue>(targetValue: TargetValue | null): targetValue is TargetValue`
* `isNotUndefined<TargetValue>(targetValue: TargetValue | undefined): targetValue is TargetValue`
* `isNull<TargetValue>(targetValue: TargetValue | null): targetValue is null`
* `isUndefined(targetValue: unknown): targetValue is undefined`
