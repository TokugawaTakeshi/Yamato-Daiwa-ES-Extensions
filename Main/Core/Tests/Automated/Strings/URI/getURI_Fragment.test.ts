import { getURI_Fragment, Logger, UnexpectedEventError } from "../../../../Source";
import Testing from "node:test";
import Assert from "assert";


Promise.all([

  Testing.suite(
    "Presenting fragment case",
    async (): Promise<void> => {

      const sampleURI: string = "path/to/file.html#intro";

      await Promise.all([

        Testing.test(
          "Fragment with leading hash has been retrieved correctly",
          (): void => {

            Assert.strictEqual(
              getURI_Fragment({
                targetURI: sampleURI,
                withLeadingHash: true
              }),
              "#intro"
            );

          }
        ),

        Testing.test(
          "Fragment without leading hash has been retrieved correctly",
          (): void => {

            Assert.strictEqual(
              getURI_Fragment({
                targetURI: sampleURI,
                withLeadingHash: false
              }),
              "intro"
            );

          }
        )

      ]);

    }
  ),

  Testing.suite(
    "Missing fragment case",
    async (): Promise<void> => {

      const sampleURI: string = "path/to/file.html";

      await Promise.all([

        Testing.test(
          "Null value",
          (): void => {

            Assert.strictEqual(
              getURI_Fragment({
                targetURI: sampleURI,
                withLeadingHash: true
              }),
              null
            );

          }
        ),

        Testing.test(
          "Error throwing",
          (): void => {

            Assert.throws(
              (): void => {
                getURI_Fragment({
                 targetURI: sampleURI,
                 withLeadingHash: true,
                  mustThrowErrorIfNoFragmentPresents: true
                });
              },
              UnexpectedEventError
            );

          }
        )

      ]);

    }
  )

]).catch(Logger.logPromiseError);
