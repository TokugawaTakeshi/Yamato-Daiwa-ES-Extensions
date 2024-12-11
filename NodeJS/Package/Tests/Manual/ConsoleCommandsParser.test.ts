/* eslint-disable no-console */

import ConsoleCommandsParser from "../../Source/ConsoleCommandsParser/ConsoleCommandsParser";
import { RawObjectDataProcessor } from "@yamato-daiwa/es-extensions";


/* [ Execution ]
 * ts-node Tests/Manual/ConsoleCommandsParser.test.ts build
 * ts-node Tests/Manual/ConsoleCommandsParser.test.ts
 * ts-node Tests/Manual/ConsoleCommandsParser.test.ts build --requiredStringOption test
 * ts-node Tests/Manual/ConsoleCommandsParser.test.ts --requiredStringOption test
 * ts-node Tests/Manual/ConsoleCommandsParser.test.ts --requiredStringOption test --optionalStringOption sample
 * ts-node Tests/Manual/ConsoleCommandsParser.test.ts help
 */
namespace ApplicationConsoleLineInterface {

  export enum CommandPhrases {
    projectBuilding = "build",
    packingOfBuild = "pack",
    projectDeploying = "deploy",
    referenceGenerating = "help"
  }

  export type SupportedCommandsAndParametersCombinations =
      ProjectBuildingConsoleCommand |
      PackingOfBuildConsoleCommand |
      ProjectDeployingConsoleCommand |
      ReferenceGeneratingConsoleCommand;

  export type ProjectBuildingConsoleCommand = Readonly<{
    phrase: CommandPhrases.projectBuilding;
    requiredStringOption: string;
    optionalStringOption?: string;
  }>;

  export type PackingOfBuildConsoleCommand = Readonly<{
    phrase: CommandPhrases.packingOfBuild;
    enumerationLikeStringOption: "FOO" | "BAR" | "BAZ";
    numericOption?: number;
    limitedNumericOption?: number;
  }>;

  export type ProjectDeployingConsoleCommand = Readonly<{
    phrase: CommandPhrases.projectDeploying;
    booleanOption: boolean;
    JSON5_Option?: Readonly<{ foo: string; bar?: number; }>;
  }>;

  export type ReferenceGeneratingConsoleCommand = Readonly<{
    phrase: CommandPhrases.referenceGenerating;
  }>;


  export const specification: ConsoleCommandsParser.CommandLineInterfaceSpecification = {

    applicationName: "Example task manager",
    applicationDescription: "Executes various tasks.",

    commandPhrases: {

      [CommandPhrases.projectBuilding]: {
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

      [CommandPhrases.packingOfBuild]: {
        description: "Create the deployable pack of the project",
        options: {
          enumerationLikeStringOption: {
            description: "Example enumeration like string option",
            type: ConsoleCommandsParser.ParametersTypes.string,
            defaultValue: "FOO",
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

      [CommandPhrases.projectDeploying]: {
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
              foo: {
                type: RawObjectDataProcessor.ValuesTypesIDs.string,
                isUndefinedForbidden: true,
                isNullForbidden: true,
                minimalCharactersCount: 1
              },
              bar: {
                type: RawObjectDataProcessor.ValuesTypesIDs.number,
                numbersSet: RawObjectDataProcessor.NumbersSets.anyInteger,
                isUndefinedForbidden: false,
                isNullForbidden: true,
                minimalValue: 1
              }
            }
          }
        }
      },

      [CommandPhrases.referenceGenerating]: {}

    }
  };

}


const parsedConsoleCommand: ConsoleCommandsParser.
    ParsedCommand<ApplicationConsoleLineInterface.SupportedCommandsAndParametersCombinations> =
    ConsoleCommandsParser.parse(ApplicationConsoleLineInterface.specification);


switch (parsedConsoleCommand.phrase) {

  case ApplicationConsoleLineInterface.CommandPhrases.projectBuilding: {
    console.log("Build project", parsedConsoleCommand);
    console.log("requiredStringOption", parsedConsoleCommand.requiredStringOption);
    console.log("optionalStringOption", parsedConsoleCommand.optionalStringOption);
    break;
  }

  case ApplicationConsoleLineInterface.CommandPhrases.packingOfBuild: {
    console.log("Pack project", parsedConsoleCommand);
    console.log("enumerationLikeStringOption", parsedConsoleCommand.enumerationLikeStringOption);
    console.log("numericOption", parsedConsoleCommand.numericOption);
    console.log("limitedNumericOption", parsedConsoleCommand.limitedNumericOption);
    break;
  }

  case ApplicationConsoleLineInterface.CommandPhrases.projectDeploying: {
    console.log("Deploy project", parsedConsoleCommand);
    console.log("booleanOption", parsedConsoleCommand.booleanOption);
    console.log("JSON5_Option", parsedConsoleCommand.JSON5_Option);
    break;
  }

  case ApplicationConsoleLineInterface.CommandPhrases.referenceGenerating: {
    console.log(ConsoleCommandsParser.generateFullHelpReference(ApplicationConsoleLineInterface.specification));
  }

}
