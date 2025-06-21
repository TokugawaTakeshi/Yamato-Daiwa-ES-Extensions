import isNull from "../../TypeGuards/EmptyTypes/isNull";
import isNotNull from "../../TypeGuards/EmptyTypes/isNotNull";
import splitString from "../splitString";


export namespace ReplacingOfMatchesWithRegularExpressionToDynamicValue {

  export type CompoundParameter<
    NamedCapturingGroups extends Readonly<{ [groupName: string]: string | undefined; }>,
    NumeratedCapturingGroups extends Readonly<{ [groupNumber: Exclude<number, 0>]: string | undefined; }>
  > = Readonly<{
    targetString: string;
    regularExpressionWithCapturingGroups: RegExp;
    replacer: Replacer<NamedCapturingGroups, NumeratedCapturingGroups>;
  }>;

  export type Replacer<
    NamedCapturingGroups extends Readonly<{ [groupName: string]: string | undefined; }>,
    NumeratedCapturingGroups extends Readonly<{ [groupNumber: Exclude<number, 0>]: string | undefined; }>
  > = (matching: Matching<NamedCapturingGroups, NumeratedCapturingGroups>) => string | null;

  /* eslint-disable @stylistic/type-generic-spacing --
   *  This rule should allow the line braking while currently is does not.  */
  export type Matching<
      NamedCapturingGroups extends Readonly<{ [groupName: string]: string | undefined; }> =
          Readonly<{ [groupName: string]: string | undefined; }>,
      NumeratedCapturingGroups extends Readonly<{ [groupNumber: Exclude<number, 0>]: string | undefined; }> =
          Readonly<{ [groupNumber: Exclude<number, 0>]: string | undefined; }>
  > = Readonly<{
    fullMatching: string;
    positionIndex: number;
    namedCapturingGroups: NamedCapturingGroups;
    numeratedCapturingGroups: NumeratedCapturingGroups;
  }>;

}

export default function replaceMatchesWithRegularExpressionToDynamicValue<
    NamedCapturingGroups extends Readonly<{ [groupName: string]: string | undefined; }> =
        Readonly<{ [groupName: string]: string | undefined; }>,
    NumeratedCapturingGroups extends Readonly<{ [groupNumber: Exclude<number, 0>]: string | undefined; }> =
        Readonly<{ [groupNumber: Exclude<number, 0>]: string | undefined; }>
    /* eslint-enable @stylistic/type-generic-spacing */
>(
  compoundParameter: ReplacingOfMatchesWithRegularExpressionToDynamicValue.
      CompoundParameter<NamedCapturingGroups, NumeratedCapturingGroups>
): string {

  const targetString: string = compoundParameter.targetString;
  const regularExpression: RegExp = new RegExp(compoundParameter.regularExpressionWithCapturingGroups, "gmu");

  const matches: Array<
    ReplacingOfMatchesWithRegularExpressionToDynamicValue.Matching<NamedCapturingGroups, NumeratedCapturingGroups>
  > = [];

  let currentMatchingWithRegularExpression: RegExpMatchArray | null = regularExpression.exec(targetString);

  while (isNotNull(currentMatchingWithRegularExpression)) {

    matches.push({

      fullMatching: currentMatchingWithRegularExpression[0],
      positionIndex: currentMatchingWithRegularExpression.index ?? -1,

      /* eslint-disable @typescript-eslint/consistent-type-assertions --
      *  There is no way establishing conformity between capturing groups specified in the regular expression and
      *    the object of the expected matchings with capturing groups. But, the specifying `NamedCapturingGroups` and
      *    `NumeratedCapturingGroups` reduces the mistake probability. */
      namedCapturingGroups: { ...currentMatchingWithRegularExpression.groups ?? null } as NamedCapturingGroups,
      numeratedCapturingGroups: currentMatchingWithRegularExpression.slice(1).reduce(
        (
          numeratedCapturingGroups: { [groupNumber: Exclude<number, 0>]: string; },
          matchingWithCapturingGroup: string,
          index: number
        ): { [groupNumber: Exclude<number, 0>]: string; } => {
          numeratedCapturingGroups[index + 1] = matchingWithCapturingGroup;
          return numeratedCapturingGroups;
        },
        {}
      ) as NumeratedCapturingGroups
      /* eslint-enable @typescript-eslint/consistent-type-assertions -- */

    });

    currentMatchingWithRegularExpression = regularExpression.exec(targetString);

  }


  const targetStringSplitToCharacters: Array<string> = splitString(targetString, "");

  for (const matching of matches.reverse()) {

    const replacement: string | null = compoundParameter.replacer(matching);

    if (isNull(replacement)) {
      continue;
    }


    targetStringSplitToCharacters.splice(
      matching.positionIndex,
      matching.fullMatching.length,
      ...splitString(replacement, "")
    );

  }

  return targetStringSplitToCharacters.join("");

}
