/* eslint-disable no-console */

import ConsoleCommandsParser from "../../Source/ConsoleCommandsParser/ConsoleCommandsParser";
import { RawObjectDataProcessor } from "@yamato-daiwa/es-extensions";


/* [ Execution ]
 * ts-node Tests/Manual/ConsoleCommandsParser.test.ts build
 * ts-node Tests/Manual/ConsoleCommandsParser.test.ts
 * ts-node Tests/Manual/ConsoleCommandsParser.test.ts build --requiredStringOption test
 * ts-node Tests/Manual/ConsoleCommandsParser.test.ts --requiredStringOption test
 * ts-node Tests/Manual/ConsoleCommandsParser.test.ts --requiredStringOption test --optionalStringOption sample
 */
namespace ApplicationConsoleLineInterface {

  export enum CommandPhrases {
    buildProject = "build",
    packProject = "pack",
    deployProject = "deploy",
    help = "help"
  }

  export type SupportedCommandsAndParametersCombinations =
      BuildProjectConsoleCommand |
      PackProjectConsoleCommand |
      DeployProjectConsoleCommand |
      HelpConsoleCommand;

  export type BuildProjectConsoleCommand = {
    phrase: CommandPhrases.buildProject;
    requiredStringOption: string;
    optionalStringOption?: string;
  };

  export type PackProjectConsoleCommand = {
    phrase: CommandPhrases.packProject;
    enumerationLikeStringOption?: "FOO" | "BAR" | "BAZ";
    numericOption?: number;
    limitedNumericOption?: number;
  };

  export type DeployProjectConsoleCommand = {
    phrase: CommandPhrases.deployProject;
    booleanOption: boolean;
    JSON5_Option?: Readonly<{ foo: string; bar?: number; }>;
  };

  export type HelpConsoleCommand = {
    phrase: CommandPhrases.help;
  };


  export const specification: ConsoleCommandsParser.CommandLineInterfaceSpecification = {

    applicationName: "Example task manager",
    applicationDescription: "Executes various tasks.",

    commandPhrases: {

      [CommandPhrases.buildProject]: {
        isDefault: true,
        description: "Builds the project for specified mode.",
        options: {
          requiredStringOption: {
            description: "Example required string option",
            type: ConsoleCommandsParser.ParametersTypes.string,
            required: true,
            shortcut: "a"
          },
          optionalStringOption: {
            description: "Example optional string option",
            type: ConsoleCommandsParser.ParametersTypes.string,
            required: false
          }
        }
      },

      [CommandPhrases.packProject]: {
        description: "Create the deployable pack of the project",
        options: {
          enumerationLikeStringOption: {
            description: "Example enumeration like string option",
            type: ConsoleCommandsParser.ParametersTypes.string,
            required: false,
            allowedAlternatives: [
              "FOO",
              "BAR",
              "BAZ"
            ]
          },
          numericOption: {
            description: "Example numeric option",
            type: ConsoleCommandsParser.ParametersTypes.number,
            numbersSet: RawObjectDataProcessor.NumbersSets.naturalNumber,
            required: false
          },
          limitedNumericOption: {
            description: "Example numeric option with fixed minimal and maximal value",
            type: ConsoleCommandsParser.ParametersTypes.number,
            numbersSet: RawObjectDataProcessor.NumbersSets.anyInteger,
            required: false,
            minimalValue: -10,
            maximalValue: 10
          }
        }
      },

      [CommandPhrases.deployProject]: {
        description: "Deploys the project.",
        options: {
          booleanOption: {
            description: "Example boolean option",
            type: ConsoleCommandsParser.ParametersTypes.boolean,
            shortcut: "b"
          },
          JSON5_Option: {
            description: "Example JSON5 option",
            type: ConsoleCommandsParser.ParametersTypes.JSON5,
            shortcut: "j",
            required: false,
            validValueSpecification: {
              nameForLogging: "SampleJSON5_Option",
              subtype: RawObjectDataProcessor.ObjectSubtypes.fixedKeyAndValuePairsObject,
              properties: {
                foo: {
                  type: RawObjectDataProcessor.ValuesTypesIDs.string,
                  required: true,
                  minimalCharactersCount: 1
                },
                bar: {
                  type: RawObjectDataProcessor.ValuesTypesIDs.number,
                  numbersSet: RawObjectDataProcessor.NumbersSets.anyInteger,
                  required: false,
                  minimalValue: 1
                }
              }
            }
          }
        }
      },

      [CommandPhrases.help]: {}

    }
  };

}


const parsedConsoleCommand: ConsoleCommandsParser.
    ParsedCommand<ApplicationConsoleLineInterface.SupportedCommandsAndParametersCombinations> =
    ConsoleCommandsParser.parse(ApplicationConsoleLineInterface.specification);


switch (parsedConsoleCommand.phrase) {

  case ApplicationConsoleLineInterface.CommandPhrases.buildProject: {
    console.log("Build project", parsedConsoleCommand);
    console.log("requiredStringOption", parsedConsoleCommand.requiredStringOption);
    console.log("optionalStringOption", parsedConsoleCommand.optionalStringOption);
    break;
  }

  case ApplicationConsoleLineInterface.CommandPhrases.packProject: {
    console.log("Pack project", parsedConsoleCommand);
    console.log("enumerationLikeStringOption", parsedConsoleCommand.enumerationLikeStringOption);
    console.log("numericOption", parsedConsoleCommand.numericOption);
    console.log("limitedNumericOption", parsedConsoleCommand.limitedNumericOption);
    break;
  }

  case ApplicationConsoleLineInterface.CommandPhrases.deployProject: {
    console.log("Deploy project", parsedConsoleCommand);
    console.log("booleanOption", parsedConsoleCommand.booleanOption);
    console.log("JSON5_Option", parsedConsoleCommand.JSON5_Option);
    break;
  }

  case ApplicationConsoleLineInterface.CommandPhrases.help: {
    console.log(ConsoleCommandsParser.generateFullHelpReference(ApplicationConsoleLineInterface.specification));
  }

}
