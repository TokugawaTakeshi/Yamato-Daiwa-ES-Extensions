# ConsoleCommandParser

## Minimal theory

* There is no official terminology concerning the console command anatomy - just more or less established convention.
* At last `process.argv` (shorthand for the "arguments vector", the [convention inherited from C++](https://stackoverflow.com/questions/3024197/what-does-int-argc-char-argv-mean))
  is the array of strings. What to do with them - the author of application is deciding.

### Conventional terminology

```
command [argument1] [argument2] ... [argumentN]
```

For example,

```
webpack build --mode development
```

* The *argument* cold be the:
  * **option**, **option key** - starts with `--`. 
  * **parameter** -  the value of the "option" (**option value**).
* If the **option** has not the **parameter**, it being considered as boolean with `true` value.
* The **option** could have the **shortcut**, starting from `-`.
* The arguments are being split by whitespace(s). If the **option value** including the whitespaces, it must be wrapped
  to single or double quotes.


#### Command phrase

The **command phrase** is the first non-option **argument**, e. g. `build` in `yda build --mode DEVELOPMENT`.

* It is the **phrase** because could consist from multiple words, e. g. `buildProject`.
* The **commandPhrase** could be explicit (as `build` in `yda build --mode DEVELOPMENT`) or implicit
  (like `webpack --mode development` - actually it builds the project too).


## Building of the CLI with ConsoleCommandParser - Stepwise guide

### Step 1: Define the Console Line Interface

1. If it's planned the multiple command phrases, create the corresponding enumeration (**CommandPhrases** in below example)
2. Define the specification of `ConsoleCommandsParser.CommandLineInterfaceSpecification` type:
   1. Specify the **applicationName** for the accurate logging if some error will occur
   2. If it's planned the multiple command phrases, define the **commandPhrases** property, otherwise define the 
     **defaultCommand** property with specification of each option.
   3. Specify the type of each option, and also required it or no. You cal also rename it (**newName** property) or
      specify the **shortcut**.
3. Define the `SupportedCommandsAndParametersCombinations` with schema of each parsed command. It includes the **phrase**
   property and also the options. Make sure that the schema is matching with defined **specification**.


```typescript
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
      [CommandPhrases.deployProject]: {} // No arguments
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
```

The **SupportedCommandsAndParametersCombinations** is [Discriminating Union](https://www.typescriptlang.org/docs/handbook/unions-and-intersections.html#discriminating-unions)
where the **phrase** is the discriminant.


### Step 2: Get the arguments vector

The arguments vector could be retrieved from `process.argv`.

```typescript
const rawConsoleCommand: Array<string> = process.argv;
```


### Step 3: Parse the command

`ConsoleCommandsParser.parse` accepts the arguments vector and the console command specification of 
`ConsoleCommandsParser.CommandLineInterfaceSpecification` type defined at step 1.

```typescript
const parsedCommand: ConsoleCommandsParser.ParsedCommand<
  ApplicationConsoleLineInterface.SupportedCommandsAndParametersCombinations
> = ConsoleCommandsParser.parse(rawConsoleCommand, ApplicationConsoleLineInterface.specification);
```

The returned object has shape

```typescript
export type ParsedCommand<TargetCommandsAndOptionsCombinations extends GeneralizedCommandsAndOptionsCombinations> =
    {
      NodeJS_InterpreterAbsolutePath: string;
      executableFileAbsolutePath: string;
      phrase?: string;
    } & TargetCommandsAndOptionsCombinations;
```

where **TargetCommandsAndOptionsCombinations** is **SupportedCommandsAndParametersCombinations** which has been defined
at step 1.


### Step 4: Provide the handling of each command

Now, you can check the **parsedCommand.phrase** via switch-case and access to corresponding options.


```typescript
switch (parsedCommand.phrase) {

  case ApplicationConsoleLineInterface.CommandPhrases.buildProject: {

    // Build project

    break;
  }

  case ApplicationConsoleLineInterface.CommandPhrases.deployProject: {

    // Deploy project
  }
}
```
