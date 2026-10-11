import {
  Logger,
  replaceMatchesWithRegularExpressionToDynamicValue,
  type ReplacingOfMatchesWithRegularExpressionToDynamicValue
} from "../../../../Source";
import Testing from "node:test";
import Assert from "assert";


const sample: string = "Meta description is [very important](https://www.orange-sha.co.jp/blog/web01_description/) for SEO.";

Testing.test(
  "Works as intended",
  (): void => {
    Assert.strictEqual(
      replaceMatchesWithRegularExpressionToDynamicValue<
        Readonly<{ URI: string; anchorText: string; }>,
        Readonly<{ 1: string; 2: string; }>
      >({
        targetString: sample,
        regularExpressionWithCapturingGroups: /\[(?<anchorText>.+?)\]\((?<URI>.+?)\)/gu,
        replacer: (
          {
            namedCapturingGroups
          }: ReplacingOfMatchesWithRegularExpressionToDynamicValue.Matching<
            Readonly<{ URI: string; anchorText: string; }>,
            Readonly<{ 1: string; 2: string; }>
          >
        ): string => `<a href="${ namedCapturingGroups.URI }">${ namedCapturingGroups.anchorText }</a>`
      }),
      "Meta description is <a href=\"https://www.orange-sha.co.jp/blog/web01_description/\">very important</a> for SEO."
    );
  }
).catch(Logger.logPromiseError);
