import { appendFragmentToURI, Logger } from "../../../../Source";
import Testing from "node:test";
import Assert from "assert";


Promise.all([

  Testing.suite(
    "Appending of previously non existed fragment",
    async (): Promise<void> => {

      const sampleURI: string = "sample/path";

      await Promise.all([

        Testing.test(
          "Parameter with leading hash",
          (): void => {
            Assert.strictEqual(
              appendFragmentToURI({
                targetURI: sampleURI,
                targetFragmentWithOrWithoutLeadingHash: "#test",
                mustReplaceFragmentIfThereIsOneAlready: true
              }),
              "sample/path#test"
            );
          }
        ),

        Testing.test(
          "Parameter without leading hash",
          (): void => {
            Assert.strictEqual(
              appendFragmentToURI({
                targetURI: sampleURI,
                targetFragmentWithOrWithoutLeadingHash: "test",
                mustReplaceFragmentIfThereIsOneAlready: true
              }),
              "sample/path#test"
            );
          }
        )

      ]);

    }
  ),

  Testing.suite(
    "Replacing of previously existed fragment",
    async (): Promise<void> => {

      const sampleURI: string = "sample/path#previous";

      await Promise.all([

        Testing.test("Parameter with leading hash", (): void => {
          Assert.strictEqual(
            appendFragmentToURI({
              targetURI: sampleURI,
              targetFragmentWithOrWithoutLeadingHash: "#test",
              mustReplaceFragmentIfThereIsOneAlready: true
            }),
            "sample/path#test"
          );
        }),

        Testing.test("Parameter without leading hash", (): void => {
          Assert.strictEqual(
            appendFragmentToURI({
              targetURI: sampleURI,
              targetFragmentWithOrWithoutLeadingHash: "test",
              mustReplaceFragmentIfThereIsOneAlready: true
            }),
            "sample/path#test"
          );
        })

      ]);

    }
  ),

  Testing.suite(
    "Ignoring of previously existed fragment",
    async (): Promise<void> => {

      const sampleURI: string = "sample/path#previous";

      await Promise.all([

        Testing.test("Parameter with leading hash", (): void => {
          Assert.strictEqual(
            appendFragmentToURI({
              targetURI: sampleURI,
              targetFragmentWithOrWithoutLeadingHash: "#test",
              mustReplaceFragmentIfThereIsOneAlready: false
            }),
            sampleURI
          );
        }),

        Testing.test("Parameter without leading hash", (): void => {
          Assert.strictEqual(
            appendFragmentToURI({
              targetURI: sampleURI,
              targetFragmentWithOrWithoutLeadingHash: "test",
              mustReplaceFragmentIfThereIsOneAlready: false
            }),
            sampleURI
          );
        })

      ]);

    }
  ),

  Testing.suite(
    "Surrogate pairs support",
    async (): Promise<void> => {

      const sampleURI: string = "sample/path#😀previous";

      await Promise.all([

        Testing.test(
          "Parameter with leading hash",
          (): void => {
            Assert.strictEqual(
              appendFragmentToURI({
                targetURI: sampleURI,
                targetFragmentWithOrWithoutLeadingHash: "#😆test",
                mustReplaceFragmentIfThereIsOneAlready: true
              }),
              "sample/path#😆test"
            );
          }
        ),

        Testing.test(
          "Parameter without leading hash",
          (): void => {
            Assert.strictEqual(
              appendFragmentToURI({
                targetURI: sampleURI,
                targetFragmentWithOrWithoutLeadingHash: "😆test",
                mustReplaceFragmentIfThereIsOneAlready: true
              }),
              "sample/path#😆test"
            );
          }
        )

      ]);

    }
  )

]).catch(Logger.logPromiseError);
