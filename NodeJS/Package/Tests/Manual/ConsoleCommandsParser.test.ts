/* eslint-disable no-console */

import ConsoleCommandsParser from "../../Source/ConsoleCommandsParser/ConsoleCommandsParser";


namespace ApplicationConsoleLineInterface {

  export enum CommandPhrases {
    buildProject = "build",
    deployProject = "deploy"
  }

  export const specification: ConsoleCommandsParser.CommandLineInterfaceSpecification = {
    applicationName: "Yamato Daiwa Automation",
    commandPhrases: {
      [CommandPhrases.buildProject]: {
        mode: {
          newName: "projectBuildingMode",
          type: ConsoleCommandsParser.ParametersTypes.string,
          required: true,
          shortcut: "m"
        },
        configurationFile: {
          newName: "customConfigurationFileName__possiblyWithoutExtension",
          type: ConsoleCommandsParser.ParametersTypes.string,
          required: false
        },
        selectiveExecution: {
          newName: "selectiveExecutionID",
          type: ConsoleCommandsParser.ParametersTypes.string,
          required: false
        }
      },
      [CommandPhrases.deployProject]: {}
    }
  };

  export type SupportedCommandsAndParametersCombinations = BuildProjectConsoleCommand | DeployProjectConsoleCommand;

  export type BuildProjectConsoleCommand = {
    phrase: CommandPhrases.buildProject;
    projectBuildingMode: string;
    customConfigurationFileName__possiblyWithoutExtension?: string;
    selectiveExecutionID?: string;
  };

  export type DeployProjectConsoleCommand = {
    phrase: CommandPhrases.deployProject;
  };
}

console.log(ConsoleCommandsParser.generateFullHelpReference({
  applicationName: "Test",
  commandPhrases: ApplicationConsoleLineInterface.specification.commandPhrases
}));
