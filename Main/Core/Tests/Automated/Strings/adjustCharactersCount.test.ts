import { adjustCharactersCount, Logger } from "../../../Source";
import Testing from "node:test";
import Assert from "assert";


Promise.all([

  Testing.suite(
    "Has been Adjusted as Expected",
    async (): Promise<void> => {
      await Promise.all([

        Testing.test(
          "Filling",
          (): void => {

            const MINIMAL_CHARACTERS_COUNT: number = 5;

            Assert.strictEqual(
              adjustCharactersCount({
                targetString: "abc",
                minimalCharactersCount: MINIMAL_CHARACTERS_COUNT,
                maximalCharactersCount: 7,
                filling: {
                  toStart: true
                },
                cropping: {
                  fromEnd: true
                }
              }).length,
              MINIMAL_CHARACTERS_COUNT
            );

          }
        ),

        Testing.suite(
          "Cropping",
          async (): Promise<void> => {

            await Promise.all([

              Testing.test(
                "From Start",
                (): void => {

                  const MAXIMAL_CHARACTERS_COUNT: number = 5;

                  Assert.strictEqual(
                    adjustCharactersCount({
                      targetString: "abcdefg",
                      minimalCharactersCount: 2,
                      maximalCharactersCount: MAXIMAL_CHARACTERS_COUNT,
                      filling: {
                        toStart: true
                      },
                      cropping: {
                        fromStart: true
                      }
                    }),
                    "cdefg"
                  );

                }
              ),

              Testing.test(
                "From End",
                (): void => {

                  const MAXIMAL_CHARACTERS_COUNT: number = 5;

                  Assert.strictEqual(
                    adjustCharactersCount({
                      targetString: "abcdefg",
                      minimalCharactersCount: 2,
                      maximalCharactersCount: MAXIMAL_CHARACTERS_COUNT,
                      filling: {
                        toStart: true
                      },
                      cropping: {
                        fromEnd: true
                      }
                    }),
                    "abcde"
                  );

                }
              )

            ]);

          }
        )

      ]);
    }
  )

]).catch(Logger.logPromiseError);
