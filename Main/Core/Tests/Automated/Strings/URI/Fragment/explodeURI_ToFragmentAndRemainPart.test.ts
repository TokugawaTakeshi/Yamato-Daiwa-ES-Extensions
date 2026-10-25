import {
  explodeURI_ToFragmentAndRemainPart,
  type ExplodingOfURI_ToFragmentAndRemainPart,
  isUndefined,
  Logger,
  InvalidParameterValueError,
  UnexpectedEventError
} from "../../../../../Source";
import Testing from "node:test";
import Assert from "node:assert";


Testing.

    suite(
      explodeURI_ToFragmentAndRemainPart.name,
      async (): Promise<void> => {

        await Promise.all([

          Testing.suite(
            "Basic Scenario",
            async (): Promise<void> => {

              await Promise.all([

                Testing.suite(
                  "Web-like URI",
                  (): void => {

                    const {
                      fragmentWithoutLeadingHash,
                      remainPart
                    }: ExplodingOfURI_ToFragmentAndRemainPart.Result.RequiredFragment =
                        explodeURI_ToFragmentAndRemainPart(
                          "https://yamato-daiwa.com#commercial_activities",
                          { mustThrowErrorIfNoFragment: true }
                        );

                    Assert.strictEqual(fragmentWithoutLeadingHash, "commercial_activities");
                    Assert.strictEqual(remainPart, "https://yamato-daiwa.com");

                  }
                ),

                Testing.suite(
                  "File-like URI",
                  (): void => {

                    const {
                      fragmentWithoutLeadingHash,
                      remainPart
                    }: ExplodingOfURI_ToFragmentAndRemainPart.Result.RequiredFragment =
                        explodeURI_ToFragmentAndRemainPart(
                          "path/to/file#motivation",
                          { mustThrowErrorIfNoFragment: true }
                        );

                    Assert.strictEqual(fragmentWithoutLeadingHash, "motivation");
                    Assert.strictEqual(remainPart, "path/to/file");

                  }
                )

              ]);

            }
          ),

          Testing.suite(
            "Handling of Omitted Fragments",
            async (): Promise<void> => {

              await Promise.all([

                Testing.suite(
                  "Returning of Partial Data",
                  async (): Promise<void> => {

                    await Promise.all([

                      Testing.suite(
                        "Web-like URI",
                        (): void => {

                          const {
                            fragmentWithoutLeadingHash,
                            remainPart
                          }: ExplodingOfURI_ToFragmentAndRemainPart.Result.OptionalFragment =
                              explodeURI_ToFragmentAndRemainPart(
                                "https://yamato-daiwa.com",
                                { mustThrowErrorIfNoFragment: false }
                              );

                          Assert.strictEqual(isUndefined(fragmentWithoutLeadingHash), true);
                          Assert.strictEqual(remainPart, "https://yamato-daiwa.com");

                        }
                      ),

                      Testing.suite(
                        "File-like URI",
                        (): void => {

                          const {
                            fragmentWithoutLeadingHash,
                            remainPart
                          }: ExplodingOfURI_ToFragmentAndRemainPart.Result.OptionalFragment =
                              explodeURI_ToFragmentAndRemainPart(
                                "path/to/file",
                                { mustThrowErrorIfNoFragment: false }
                              );

                          Assert.strictEqual(isUndefined(fragmentWithoutLeadingHash), true);
                          Assert.strictEqual(remainPart, "path/to/file");

                        }
                      )

                    ]);

                  }
                ),

                Testing.suite(
                  "Throwing of Error",
                  async (): Promise<void> => {

                    await Promise.all([

                      Testing.suite(
                        "Web-like URI",
                        (): void => {

                          Assert.throws(
                            (): void => {
                              explodeURI_ToFragmentAndRemainPart(
                                "https://yamato-daiwa.com",
                                { mustThrowErrorIfNoFragment: true }
                              );
                            },
                            UnexpectedEventError
                          );

                        }
                      ),

                      Testing.suite(
                        "File-like URI",
                        (): void => {

                          Assert.throws(
                            (): void => {
                              explodeURI_ToFragmentAndRemainPart(
                                "path/to/file",
                                { mustThrowErrorIfNoFragment: true }
                              );
                            },
                            UnexpectedEventError
                          );

                        }
                      )

                    ]);

                  }
                )

              ]);

            }
          ),

          Testing.test(
            "Throwing of Error when 1st Parameters has 2 hashes",
            (): void => {

              Assert.throws(
                (): void => {
                  explodeURI_ToFragmentAndRemainPart(
                    "https://yamato-daiwa.com#commercial_activities#research_activities",
                    { mustThrowErrorIfNoFragment: true }
                  );
                },
                InvalidParameterValueError
              );

            }
          )

        ]);

      }
    ).

    catch(Logger.logPromiseError);
