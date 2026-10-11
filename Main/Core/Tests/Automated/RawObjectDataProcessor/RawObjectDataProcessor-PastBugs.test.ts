import {
  type ArbitraryObject,
  convertPotentialStringToIntegerIfPossible,
  isNotUndefined,
  Logger,
  RawObjectDataProcessor
} from "../../../Source";
import Testing from "node:test";
import Assert from "assert";


Testing.suite(
  "RawObjectDataProcessor - Past Pugs",
  async (): Promise<void> => {

    await Promise.all([

      Testing.test(
        "No InvalidParameterValueError because of \"undefinedForbiddenIf\" predicate at top level of the object",
        (): void => {

          Assert.doesNotThrow(
            (): void => {

              RawObjectDataProcessor.process(
                {
                  filename:
                    "D:\\ECMAScriptPackagesDevelopment\\YamatoDaiwaES_Extensions\\v1.9\\Documentation\\01-Source\\" +
                      "Pages\\CoreLibrary\\Functionality\\Arrays\\06-PermutationsOfElements\\" +
                      "moveArrayElementToOnePosition\\moveArrayElementToOnePosition.russian.pug"
                },
                {
                  subtype: RawObjectDataProcessor.ObjectSubtypes.fixedSchema,
                  nameForLogging: "CodeListingPugFilerOptions",
                  properties: {
                    mustAppendEmptyLine: {
                      type: Boolean,
                      undefinedValueSubstitution: false,
                      isNullForbidden: true
                    },
                    indentationMultiplier: {
                      preValidationModifications: convertPotentialStringToIntegerIfPossible,
                      type: Number,
                      isUndefinedForbidden: false,
                      isNullForbidden: true,
                      numbersSet: RawObjectDataProcessor.NumbersSets.naturalNumber,
                      isNaN_Forbidden: true
                    },
                    indentationString: {
                      type: String,
                      undefinedForbiddenIf: {
                        predicate: (rawOptions: ArbitraryObject): boolean => isNotUndefined(rawOptions.indentationMultiplier),
                        descriptionForLogging: "\"indentationMultiplier\" has been specified"
                      },
                      isNullForbidden: true,
                      minimalCharactersCount: 1
                    }
                  }
                }
              );

            }
          );

        }
      )

    ]);

  }

).catch(Logger.logPromiseError);
