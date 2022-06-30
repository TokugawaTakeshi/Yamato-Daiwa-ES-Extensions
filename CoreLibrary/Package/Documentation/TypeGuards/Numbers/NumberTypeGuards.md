# Number Type Guards

If you need to check just is value a number or not and nothing more, use `isNumber(targetValue)`.
Below functions besides make TypeScript believe that the value is a number (when value is actually a number) executes
some additional checks and returns `false` when some check has not been passed:

* `isDecimalFractionOfAnySign(potentialDecimalFraction: unknown): potentialDecimalFraction is number`
* `isNaturalNumber(potentialNaturalNumber: unknown): potentialNaturalNumber is number`
* `isNegativeDecimalFraction(potentialDecimalFraction: unknown): potentialDecimalFraction is number`
* `isNegativeInteger(potentialInteger: unknown): potentialInteger is number`
* `isNegativeIntegerOrZero(potentialInteger: unknown): potentialInteger is number`
* `isPositiveDecimalFraction(potentialDecimalFraction: unknown): potentialDecimalFraction is number`

> :warning: **Warning:** In the Math, the `0` is a positive number so both "positive" and "non-negative" includes `0`.
