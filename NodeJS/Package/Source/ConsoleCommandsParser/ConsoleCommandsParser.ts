import type {
  ArbitraryObject,
  ParsedJSON
} from "@yamato-daiwa/es-extensions";
import {
  isUndefined,
  isNotUndefined,
  isNaturalNumber,
  isNonNegativeInteger,
  isNegativeInteger,
  isNegativeIntegerOrZero,
  isPositiveDecimalFraction,
  isNegativeDecimalFraction,
  isDecimalFractionOfAnySign,
  isString,
  Logger,
  RawObjectDataProcessor,
  InvalidExternalDataError
} from "@yamato-daiwa/es-extensions";
import InvalidConsoleCommandError from "../Errors/InvalidConsoleCommand/InvalidConsoleCommandError";
import JSON5 from "json5";

import ConsoleCommandsParserLocalization__English from "./ConsoleCommandsParserLocalization.english";


class ConsoleCommandsParser<
  TargetCommandsAndOptionsCombinations extends ConsoleCommandsParser.GeneralizedCommandsAndOptionsCombinations
> {

  private static readonly MINIMAL_ARGUMENTS_IN_VALID_CONSOLE_COMMAND: number = 2;

  private static localization: ConsoleCommandsParser.Localization = ConsoleCommandsParserLocalization__English;

  private readonly applicationName: string;
  private readonly targetCommandPhrase?: string;

  private readonly targetCommandOptions?: Array<string | undefined>;
  private readonly targetCommandOptions__eachOneWillBeRemovedOnceProcessed: Array<string | undefined> = [];
  private readonly targetCommandOptionsSpecification?: ConsoleCommandsParser.CommandOptionsSpecification;


  /* [ Expected type ] Array<string>
   * [ Valid example ]
   * [ 'C:\\Program Files\\nodejs\\node.exe',
   *   'C:\\Users\\tokugawa\\AppData\\Roaming\\npm\\node_modules\\hikari-automation-upgrade\\bin\\hikari-automation',
   *   'build_project',
   *   '--mode',
   *   'production' ]
   * */
  public static parse<
    TargetCommandsAndOptionsCombinations extends ConsoleCommandsParser.GeneralizedCommandsAndOptionsCombinations
  >(
    argumentsVector: unknown,
    commandLineInterfaceSpecification: ConsoleCommandsParser.CommandLineInterfaceSpecification
  ): ConsoleCommandsParser.ParsedCommand<TargetCommandsAndOptionsCombinations> {

    if (!Array.isArray(argumentsVector)) {
      Logger.throwErrorAndLog({
        errorInstance: new InvalidConsoleCommandError({
          applicationName: commandLineInterfaceSpecification.applicationName,
          messageSpecificPart: ConsoleCommandsParser.localization.
              generateArgumentsVectorIsNotArrayErrorMessage(argumentsVector)
        }),
        title: InvalidConsoleCommandError.localization.defaultTitle,
        occurrenceLocation: "ConsoleCommandsParser.parse(argumentsVector, commandLineInterfaceSpecification)"
      });
    }


    if (argumentsVector.length < ConsoleCommandsParser.MINIMAL_ARGUMENTS_IN_VALID_CONSOLE_COMMAND) {
      Logger.throwErrorAndLog({
        errorInstance: new InvalidConsoleCommandError({
          applicationName: commandLineInterfaceSpecification.applicationName,
          messageSpecificPart: ConsoleCommandsParser.localization.
            generateArgumentsVectorHasNotEnoughElementsErrorMessage({
              arrayedConsoleCommand: argumentsVector,
              minimalElementsCount: ConsoleCommandsParser.MINIMAL_ARGUMENTS_IN_VALID_CONSOLE_COMMAND
            })
        }),
        title: InvalidConsoleCommandError.localization.defaultTitle,
        occurrenceLocation: "ConsoleCommandsParser.parse(argumentsVector, commandLineInterfaceSpecification)"
      });
    }


    const consciouslyInputtedArguments: Array<string> = [];
    const nonStringArguments: Array<unknown> = [];

    let NodeJS_InterpreterAbsolutePath: string = "";
    let executableFileAbsolutePath: string = "";

    for (const [ index, argument ] of argumentsVector.entries()) {

      if (!isString(argument)) {
        nonStringArguments.push(argument);
        continue;
      }


      switch (index) {

        case 0: {
          NodeJS_InterpreterAbsolutePath = argument;
          break;
        }

        case 1: {
          executableFileAbsolutePath = argument;
          break;
        }

        default: {
          consciouslyInputtedArguments.push(argument);
        }
      }
    }

    if (nonStringArguments.length > 0) {
      Logger.throwErrorAndLog({
        errorInstance: new InvalidConsoleCommandError({
          applicationName: commandLineInterfaceSpecification.applicationName,
          messageSpecificPart: ConsoleCommandsParser.localization.
              generateArgumentsVectorHasNonStringElementsErrorMessage(nonStringArguments)
        }),
        title: InvalidConsoleCommandError.localization.defaultTitle,
        occurrenceLocation: "ConsoleCommandsParser.parse(argumentsVector, commandLineInterfaceSpecification)"
      });
    }


    const dataHoldingSelfInstance: ConsoleCommandsParser<TargetCommandsAndOptionsCombinations> = new ConsoleCommandsParser({
      consciouslyInputtedArguments, commandLineInterfaceSpecification
    });

    return {
      NodeJS_InterpreterAbsolutePath,
      executableFileAbsolutePath,
      phrase: dataHoldingSelfInstance.targetCommandPhrase,
      ...dataHoldingSelfInstance.getParsedOptionsAndParameters()
    };
  }

  public static setLocalization(newLocalization: ConsoleCommandsParser.Localization): void {
    ConsoleCommandsParser.localization = newLocalization;
  }


  private constructor(
    {
      commandLineInterfaceSpecification,
      consciouslyInputtedArguments
    }: {
      commandLineInterfaceSpecification: ConsoleCommandsParser.CommandLineInterfaceSpecification;
      consciouslyInputtedArguments: Array<string | undefined>;
    }
  ) {

    const helpReference: string = ConsoleCommandsParser.generateFullHelpReference(commandLineInterfaceSpecification);
    const firstConsciouslyInputtedArgument: string | undefined = consciouslyInputtedArguments[0];

    let targetCommandPhrase: string | undefined;
    let targetCommandOptions: Array<string | undefined> | undefined;
    let targetCommandOptionsSpecification: ConsoleCommandsParser.CommandOptionsSpecification | undefined;

    /* [ Command example ] > webpack
    * (This command will be converted to two arguments - 'NodeJS_InterpreterAbsolutePath' and 'executableFileAbsolutePath')
    * This truthy conditions also means that there no subsequent arguments. */
    if (isUndefined(firstConsciouslyInputtedArgument)) {

      if (isUndefined(commandLineInterfaceSpecification.defaultCommand)) {
        Logger.throwErrorAndLog({
          errorInstance: new InvalidConsoleCommandError({
            applicationName: commandLineInterfaceSpecification.applicationName,
            messageSpecificPart: ConsoleCommandsParser.localization.
                generateNoDefaultCommandPhraseAvailableErrorMessage(helpReference)
          }),
          title: InvalidConsoleCommandError.localization.defaultTitle,
          occurrenceLocation: "ConsoleCommandsParser.parse(argumentsVector, commandLineInterfaceSpecification)"
        });
      }


      targetCommandOptionsSpecification = commandLineInterfaceSpecification.defaultCommand;

    } else if (ConsoleCommandsParser.isCommandArgumentTheOption(firstConsciouslyInputtedArgument)) {

      if (isUndefined(commandLineInterfaceSpecification.defaultCommand)) {
        Logger.throwErrorAndLog({
          errorInstance: new InvalidConsoleCommandError({
            applicationName: commandLineInterfaceSpecification.applicationName,
            messageSpecificPart: ConsoleCommandsParser.localization.
                generateNoDefaultCommandPhraseAvailableErrorMessage(helpReference)
          }),
          title: InvalidConsoleCommandError.localization.defaultTitle,
          occurrenceLocation: "ConsoleCommandsParser.parse(argumentsVector, commandLineInterfaceSpecification)"
        });
      }


      targetCommandOptions = [ ...consciouslyInputtedArguments ];
      targetCommandOptionsSpecification = commandLineInterfaceSpecification.defaultCommand;

    } else {

      if (isUndefined(commandLineInterfaceSpecification.commandPhrases)) {
        Logger.throwErrorAndLog({
          errorInstance: new InvalidConsoleCommandError({
            applicationName: commandLineInterfaceSpecification.applicationName,
            messageSpecificPart: ConsoleCommandsParser.localization.
              generateFirstParameterLooksLikeCommandPhraseWhileNoCommandPhrasesAvailableErrorMessage({
              commandPhraseLikeArgument: firstConsciouslyInputtedArgument, helpReference
            })
          }),
          title: InvalidConsoleCommandError.localization.defaultTitle,
          occurrenceLocation: "ConsoleCommandsParser.parse(argumentsVector, commandLineInterfaceSpecification)"
        });
      }


      targetCommandPhrase = firstConsciouslyInputtedArgument;
      targetCommandOptions = consciouslyInputtedArguments.slice(1);

      for (
        const [ commandPhrase, commandOptionSpecification ]
        of Object.entries(commandLineInterfaceSpecification.commandPhrases)
      ) {
        if (commandPhrase === targetCommandPhrase) {
          targetCommandOptionsSpecification = commandOptionSpecification;
          break;
        }
      }


      /* [ Theory ] If no options for the current command phrase available, it will be the empty object but not 'undefined'. */
      if (isUndefined(targetCommandOptionsSpecification)) {
        Logger.throwErrorAndLog({
          errorInstance: new InvalidConsoleCommandError({
            applicationName: commandLineInterfaceSpecification.applicationName,
            messageSpecificPart: ConsoleCommandsParser.localization.generateUnknownCommandPhraseErrorMessage({
              inputtedCommandPhrase: targetCommandPhrase, helpReference
            })
          }),
          title: InvalidConsoleCommandError.localization.defaultTitle,
          occurrenceLocation: "ConsoleCommandsParser.parse(argumentsVector, commandLineInterfaceSpecification)"
        });
      }
    }


    this.applicationName = commandLineInterfaceSpecification.applicationName;
    this.targetCommandPhrase = targetCommandPhrase;
    this.targetCommandOptions = targetCommandOptions;
    this.targetCommandOptionsSpecification = targetCommandOptionsSpecification;
  }


  private getParsedOptionsAndParameters(): TargetCommandsAndOptionsCombinations {

    if (isUndefined(this.targetCommandOptionsSpecification)) {
      /* eslint-disable-next-line @typescript-eslint/consistent-type-assertions --
       * In this case, "as const" is not the equivalent of "as TargetCommandsAndOptionsCombinations" and will cause TS2322. */
      return {} as TargetCommandsAndOptionsCombinations;
    }


    const parsedOptions: ConsoleCommandsParser.GeneralizedCommandsAndOptionsCombinations = {};
    this.targetCommandOptions__eachOneWillBeRemovedOnceProcessed.push(...this.targetCommandOptions ?? []);

    for (const [ optionKey, optionSpecification ] of Object.entries(this.targetCommandOptionsSpecification)) {

      const optionKey__withoutPrepended2NDashes: string = optionKey.startsWith("--") ? optionKey.slice(2) : optionKey;
      const optionKey__withPrepended2NDashes: string = `--${ optionKey__withoutPrepended2NDashes }`;
      const optionFinalName: string = optionSpecification.newName ?? optionKey__withoutPrepended2NDashes;

      let shortcut__withPrependedNDash: string | undefined;
      if (isNotUndefined(optionSpecification.shortcut)) {
        shortcut__withPrependedNDash = optionSpecification.shortcut.startsWith("-") ?
            optionSpecification.shortcut : `-${ optionSpecification.shortcut }`;
      }

      const arrayIndexOfTargetOptionKey: number = this.targetCommandOptions__eachOneWillBeRemovedOnceProcessed.findIndex(
          (commandOption: string | undefined): boolean =>
              commandOption === optionKey__withPrepended2NDashes || commandOption === shortcut__withPrependedNDash
      );

      if (optionSpecification.type === ConsoleCommandsParser.ParametersTypes.boolean) {

        if (arrayIndexOfTargetOptionKey !== -1) {
          this.targetCommandOptions__eachOneWillBeRemovedOnceProcessed.splice(arrayIndexOfTargetOptionKey, 1);
        }

        parsedOptions[optionFinalName] = arrayIndexOfTargetOptionKey !== -1;

        continue;
      }


      if (arrayIndexOfTargetOptionKey === -1) {

        if (optionSpecification.required) {
          Logger.throwErrorAndLog({
            errorInstance: new InvalidConsoleCommandError({
              applicationName: this.applicationName,
              messageSpecificPart: ConsoleCommandsParser.localization.generateRequiredOptionKeyIsMissingErrorMessage({
                commandPhrase: this.targetCommandPhrase,
                missingOptionKey: optionKey__withPrepended2NDashes,
                commandHelpReference: ConsoleCommandsParser.generateSingleCommandHelpReference({
                  commandPhrase: this.targetCommandPhrase,
                  commandOptionsSpecification: this.targetCommandOptionsSpecification
                })
              })
            }),
            title: InvalidConsoleCommandError.localization.defaultTitle,
            occurrenceLocation: "ConsoleCommandsParser.parse(parametersObject) -> ..."
          });
        }


        continue;
      }


      const targetOptionPotentialValue: string | undefined =
          this.targetCommandOptions__eachOneWillBeRemovedOnceProcessed[arrayIndexOfTargetOptionKey + 1];

      if (isUndefined(targetOptionPotentialValue)) {

        /* [ Theory ] Although the option could be optional, the value is expected to be specified because flag has been
        *     specified. */
        Logger.throwErrorAndLog({
          errorInstance: new InvalidConsoleCommandError({
            applicationName: this.applicationName,
            messageSpecificPart: ConsoleCommandsParser.localization.generateNoValueFollowingTheKeyOfNonBooleanOptionErrorMessage({
              targetOptionKey: optionKey__withPrepended2NDashes,
              commandHelpReference: ConsoleCommandsParser.generateSingleCommandHelpReference({
                commandPhrase: this.targetCommandPhrase, commandOptionsSpecification: this.targetCommandOptionsSpecification
              })
            })
          }),
          title: InvalidConsoleCommandError.localization.defaultTitle,
          occurrenceLocation: "ConsoleCommandsParser.parse(parametersObject) -> ..."
        });
      }


      switch (optionSpecification.type) {

        case ConsoleCommandsParser.ParametersTypes.string: {

          parsedOptions[optionFinalName] = this.processStringTypeOptionValue({
            targetOptionRawValue: targetOptionPotentialValue,
            optionKey__withPrepended2NDashes,
            optionSpecification
          });

          break;
        }

        case ConsoleCommandsParser.ParametersTypes.number: {

          parsedOptions[optionFinalName] = this.processNumberTypeOptionValue({
            targetOptionRawValue: targetOptionPotentialValue,
            optionKey__withPrepended2NDashes,
            optionSpecification
          });

          break;
        }

        case ConsoleCommandsParser.ParametersTypes.JSON5: {

          const targetParsedJSON5_ParameterValue: ParsedJSON | undefined = this.
              extractAndValidateParsedJSON5_ParameterValue({
              targetOptionRawValue: targetOptionPotentialValue,
              optionKey__withPrepended2NDashes,
              optionSpecification
            });

          if (isNotUndefined(targetParsedJSON5_ParameterValue)) {
            parsedOptions[optionFinalName] = targetParsedJSON5_ParameterValue;
          }

          break;
        }

        default: {
          Logger.throwErrorAndLog({
            errorType: "InvalidConsoleCommandOptionSpecification",
            title: "Invalid console command option specification",
            description: ConsoleCommandsParser.localization.generateInvalidOptionTypeErrorMessage({
              optionName: optionFinalName
            }),
            occurrenceLocation: "ConsoleCommandsParser.parse(arrayedConsoleCommand, commandLineInterfaceSpecification)"
          });
        }
      }

      this.targetCommandOptions__eachOneWillBeRemovedOnceProcessed.splice(arrayIndexOfTargetOptionKey, 2);
    }

    if (this.targetCommandOptions__eachOneWillBeRemovedOnceProcessed.length > 0) {
      Logger.throwErrorAndLog({
        errorInstance: new InvalidConsoleCommandError({
          applicationName: this.applicationName,
          messageSpecificPart: ConsoleCommandsParser.localization.generateUnknownOptionsFoundForSpecificCommandErrorMessage({
            commandPhrase: this.targetCommandPhrase,
            commandReference: ConsoleCommandsParser.generateSingleCommandHelpReference({
              commandPhrase: this.targetCommandPhrase, commandOptionsSpecification: this.targetCommandOptionsSpecification
            })
          })
        }),
        title: InvalidConsoleCommandError.localization.defaultTitle,
        occurrenceLocation: "ConsoleCommandsParser.parse(arrayedConsoleCommand, commandLineInterfaceSpecification)"
      });
    }


    /* eslint-disable-next-line @typescript-eslint/consistent-type-assertions --
    * Because of TypeScript concept limitations, we can not guarantee that 'commandLineInterfaceSpecification' is
    * corresponding to 'TargetCommandsAndOptionsCombinations'. */
    return parsedOptions as TargetCommandsAndOptionsCombinations;
  }

  private processStringTypeOptionValue(
    {
      targetOptionRawValue,
      optionKey__withPrepended2NDashes,
      optionSpecification
    }: {
      targetOptionRawValue: string;
      optionKey__withPrepended2NDashes: string;
      optionSpecification: ConsoleCommandsParser.StringOptionSpecification;
    }
  ): string {

    const {
      allowedAlternatives
    }: ConsoleCommandsParser.StringOptionSpecification = optionSpecification;

    if (isNotUndefined(allowedAlternatives) && !allowedAlternatives.includes(targetOptionRawValue)) {
      Logger.throwErrorAndLog({
        errorInstance: new InvalidConsoleCommandError({
          applicationName: this.applicationName,
          messageSpecificPart: ConsoleCommandsParser.localization.generateOptionValueIsNotAmongAllowedAlternativesErrorMessage({
            targetOptionKey: optionKey__withPrepended2NDashes,
            actualOptionValue: targetOptionRawValue,
            commandReference: ConsoleCommandsParser.generateSingleCommandHelpReference({
              commandPhrase: this.targetCommandPhrase, commandOptionsSpecification: this.targetCommandOptionsSpecification ?? {}
            })
          })
        }),
        title: InvalidConsoleCommandError.localization.defaultTitle,
        occurrenceLocation: "ConsoleCommandsParser.parse(argumentsVector, commandLineInterfaceSpecification)"
      });
    }

    return targetOptionRawValue;
  }

  private processNumberTypeOptionValue(
    {
      targetOptionRawValue,
      optionKey__withPrepended2NDashes,
      optionSpecification
    }: {
      targetOptionRawValue: string;
      optionKey__withPrepended2NDashes: string;
      optionSpecification: ConsoleCommandsParser.NumberOptionSpecification;
    }
  ): number {

    const {
      numbersSet,
      minimalValue,
      maximalValue
    }: ConsoleCommandsParser.NumberOptionSpecification = optionSpecification;

    const targetOptionParsedValue: number = Number(targetOptionRawValue);

    if (Number.isNaN(targetOptionParsedValue)) {
      Logger.throwErrorAndLog({
        errorInstance: new InvalidConsoleCommandError({
          applicationName: this.applicationName,
          messageSpecificPart: ConsoleCommandsParser.localization.generateUnparsableNumericOptionValueErrorMessage({
            targetOptionKey: optionKey__withPrepended2NDashes,
            actualOptionValue: targetOptionRawValue,
            commandReference: ConsoleCommandsParser.generateSingleCommandHelpReference({
              commandPhrase: this.targetCommandPhrase, commandOptionsSpecification: this.targetCommandOptionsSpecification ?? {}
            })
          })
        }),
        title: InvalidConsoleCommandError.localization.defaultTitle,
        occurrenceLocation: "ConsoleCommandsParser.parse(argumentsVector, commandLineInterfaceSpecification)"
      });
    }


    let optionValueMatchingWithExpectedNumberSet: boolean;

    switch (numbersSet) {
      case RawObjectDataProcessor.NumbersSets.naturalNumber: {
        optionValueMatchingWithExpectedNumberSet = isNaturalNumber(targetOptionParsedValue);
        break;
      }
      case RawObjectDataProcessor.NumbersSets.nonNegativeInteger: {
        optionValueMatchingWithExpectedNumberSet = isNonNegativeInteger(targetOptionParsedValue);
        break;
      }
      case RawObjectDataProcessor.NumbersSets.negativeInteger: {
        optionValueMatchingWithExpectedNumberSet = isNegativeInteger(targetOptionParsedValue);
        break;
      }
      case RawObjectDataProcessor.NumbersSets.negativeIntegerOrZero: {
        optionValueMatchingWithExpectedNumberSet = isNegativeIntegerOrZero(targetOptionParsedValue);
        break;
      }
      case RawObjectDataProcessor.NumbersSets.anyInteger: {
        optionValueMatchingWithExpectedNumberSet = Number.isInteger(targetOptionParsedValue);
        break;
      }
      case RawObjectDataProcessor.NumbersSets.positiveDecimalFraction: {
        optionValueMatchingWithExpectedNumberSet = isPositiveDecimalFraction(targetOptionParsedValue);
        break;
      }
      case RawObjectDataProcessor.NumbersSets.negativeDecimalFraction: {
        optionValueMatchingWithExpectedNumberSet = isNegativeDecimalFraction(targetOptionParsedValue);
        break;
      }
      case RawObjectDataProcessor.NumbersSets.decimalFractionOfAnySign: {
        optionValueMatchingWithExpectedNumberSet = isDecimalFractionOfAnySign(targetOptionParsedValue);
        break;
      }
      case RawObjectDataProcessor.NumbersSets.anyRealNumber: {
        optionValueMatchingWithExpectedNumberSet = true;
        break;
      }
    }

    if (!optionValueMatchingWithExpectedNumberSet) {
      Logger.throwErrorAndLog({
        errorInstance: new InvalidConsoleCommandError({
          applicationName: this.applicationName,
          messageSpecificPart: ConsoleCommandsParser.localization.
              generatedNumericOptionValueIsNotBelongToExpectedNumbersSetErrorMessage({
                targetOptionKey: optionKey__withPrepended2NDashes,
                expectedNumbersSet: numbersSet,
                actualOptionValue: targetOptionRawValue,
                commandReference: ConsoleCommandsParser.generateSingleCommandHelpReference({
                  commandPhrase: this.targetCommandPhrase,
                  commandOptionsSpecification: this.targetCommandOptionsSpecification ?? {}
                })
            })
        }),
        title: InvalidConsoleCommandError.localization.defaultTitle,
        occurrenceLocation: "ConsoleCommandsParser.parse(argumentsVector, commandLineInterfaceSpecification)"
      });
    }


    if (isNotUndefined(minimalValue) && targetOptionParsedValue <= minimalValue) {
      Logger.throwErrorAndLog({
        errorInstance: new InvalidConsoleCommandError({
          applicationName: this.applicationName,
          messageSpecificPart: ConsoleCommandsParser.localization.
              generateNumericValueIsSmallerThanRequiredMinimumErrorMessage({
                targetOptionKey: optionKey__withPrepended2NDashes,
                requiredMinimum: minimalValue,
                actualOptionValue: targetOptionRawValue,
                commandReference: ConsoleCommandsParser.generateSingleCommandHelpReference({
                  commandPhrase: this.targetCommandPhrase,
                  commandOptionsSpecification: this.targetCommandOptionsSpecification ?? {}
                })
              })
        }),
        title: InvalidConsoleCommandError.localization.defaultTitle,
        occurrenceLocation: "ConsoleCommandsParser.parse(argumentsVector, commandLineInterfaceSpecification)"
      });
    }


    if (isNotUndefined(maximalValue) && targetOptionParsedValue >= maximalValue) {
      Logger.throwErrorAndLog({
        errorInstance: new InvalidConsoleCommandError({
          applicationName: this.applicationName,
          messageSpecificPart: ConsoleCommandsParser.localization.
              generateNumericValueIsGreaterThanAllowedMaximumErrorMessage({
                targetOptionKey: optionKey__withPrepended2NDashes,
                allowedMaximum: maximalValue,
                actualOptionValue: targetOptionRawValue,
                commandReference: ConsoleCommandsParser.generateSingleCommandHelpReference({
                  commandPhrase: this.targetCommandPhrase,
                  commandOptionsSpecification: this.targetCommandOptionsSpecification ?? {}
                })
              })
        }),
        title: InvalidConsoleCommandError.localization.defaultTitle,
        occurrenceLocation: "ConsoleCommandsParser.parse(argumentsVector, commandLineInterfaceSpecification)"
      });
    }


    return targetOptionParsedValue;
  }


  private extractAndValidateParsedJSON5_ParameterValue(
    {
      targetOptionRawValue,
      optionKey__withPrepended2NDashes,
      optionSpecification
    }: {
      targetOptionRawValue: string;
      optionKey__withPrepended2NDashes: string;
      optionSpecification: ConsoleCommandsParser.JSON5_ParameterSpecification;
    }
  ): ParsedJSON | undefined {

    let targetParameterParsedValue: unknown;

    try {
      targetParameterParsedValue = JSON5.parse(targetOptionRawValue);
    } catch (error: unknown) {
      Logger.throwErrorAndLog({
        errorInstance: new InvalidConsoleCommandError({
          applicationName: this.applicationName,
          messageSpecificPart: ConsoleCommandsParser.localization.generateMalformedJSON5_OptionErrorMessage({
            targetOptionKey: optionKey__withPrepended2NDashes,
            commandReference: ConsoleCommandsParser.generateSingleCommandHelpReference({
              commandPhrase: this.targetCommandPhrase, commandOptionsSpecification: this.targetCommandOptionsSpecification ?? {}
            })
          })
        }),
        title: InvalidConsoleCommandError.localization.defaultTitle,
        occurrenceLocation: "ConsoleCommandsParser.parse(arrayedConsoleCommand, commandLineInterfaceSpecification)"
      });
    }


    const validationResult: RawObjectDataProcessor.ProcessingResult<ArbitraryObject> = RawObjectDataProcessor.
        process<ArbitraryObject>(targetParameterParsedValue, optionSpecification.validValueSpecification);

    if (validationResult.rawDataIsInvalid) {
      Logger.throwErrorAndLog({
        errorInstance: new InvalidExternalDataError({
          customMessage: ConsoleCommandsParser.localization.generateJSON5_OptionDoesNotMatchWithValidDataSchemaErrorMessage({
            targetOptionKey: optionKey__withPrepended2NDashes,
            formattedValidationErrorsMessages: RawObjectDataProcessor.
                formatValidationErrorsList(validationResult.validationErrorsMessages)
          })
        }),
        title: InvalidExternalDataError.localization.defaultTitle,
        occurrenceLocation: "ConsoleCommandsParser.parse(arrayedConsoleCommand, commandLineInterfaceSpecification)"
      });
    }


    /* eslint-disable-next-line @typescript-eslint/consistent-type-assertions --
    * Currently, 'RawObjectDataProcessor' does not accept the ParsedJSON; until it will not be fixed, the asserting is
    * required here. */
    return validationResult.processedData as ParsedJSON;
  }


  private static isCommandArgumentTheOption(consoleCommandArgument: string): boolean {
    return consoleCommandArgument.startsWith("-");
  }

  private static generateFullHelpReference(
    commandLineInterfaceSpecification: ConsoleCommandsParser.CommandLineInterfaceSpecification
  ): string {

    let accumulatingValue: string = "";

    if (isNotUndefined(commandLineInterfaceSpecification.defaultCommand)) {

      accumulatingValue = "Has default command\n";

      for (const [ argumentName, argumentSpecification ] of Object.entries(commandLineInterfaceSpecification.defaultCommand)) {
        accumulatingValue = `${ argumentName }: ${ argumentSpecification.type }\n`;
      }
    }


    if (isNotUndefined(commandLineInterfaceSpecification.commandPhrases)) {

      for (const [ commandPhrase, argumentsSpecification ] of Object.entries(commandLineInterfaceSpecification.commandPhrases)) {

        accumulatingValue = `${ accumulatingValue }${ commandPhrase }:\n`;

        if (isUndefined(argumentsSpecification)) {
          continue;
        }


        for (const [ argumentName, argumentSpecification ] of Object.entries(argumentsSpecification)) {
          accumulatingValue = `${ accumulatingValue }\n  ${ argumentName }: ${ argumentSpecification.type }`;
        }
      }
    }


    return accumulatingValue;
  }

  private static generateSingleCommandHelpReference(
    {
      commandPhrase,
      commandOptionsSpecification
    }: {
      commandPhrase?: string;
      commandOptionsSpecification: ConsoleCommandsParser.CommandOptionsSpecification;
    }
  ): string {

    let accumulatingValue: string = isNotUndefined(commandPhrase) ? commandPhrase : "(Default command)";

    for (const [ argumentName, argumentSpecification ] of Object.entries(commandOptionsSpecification)) {
      accumulatingValue = `${ accumulatingValue }:\n ${ argumentName }: ${ argumentSpecification.type }`;
    }

    return accumulatingValue;
  }
}


namespace ConsoleCommandsParser {

  export type ParsedCommand<TargetCommandsAndOptionsCombinations extends GeneralizedCommandsAndOptionsCombinations> =
    {
      NodeJS_InterpreterAbsolutePath: string;
      executableFileAbsolutePath: string;
      phrase?: string;
    } & TargetCommandsAndOptionsCombinations;

  export type GeneralizedCommandsAndOptionsCombinations = {
    [name: string]: string | number | boolean | ParsedJSON;
  };

  export type CommandLineInterfaceSpecification = {
    applicationName: string;
    defaultCommand?: CommandOptionsSpecification;
    commandPhrases?: {
      [commandPhrase: string]: CommandOptionsSpecification | undefined;
    };
  };

  export type CommandOptionsSpecification = { [optionKey: string]: OptionSpecification; };

  export type OptionSpecification =
      StringOptionSpecification |
      NumberOptionSpecification |
      BooleanParameterSpecification |
      JSON5_ParameterSpecification;

  export type ParameterSpecification__CommonProperties = {
    shortcut?: string;
  };

  export type StringOptionSpecification = ParameterSpecification__CommonProperties & {
    /* eslint-disable-next-line id-denylist --
     * The "id-denylist" is not desired to affect to object properties, but the applying to add respective option
     * has been denied. https://github.com/eslint/eslint/issues/15504 */
    type: ParametersTypes.string;
    required: boolean;
    allowedAlternatives?: Array<string>;
    newName?: string;
  };

  export type NumberOptionSpecification = ParameterSpecification__CommonProperties & {
    type: ParametersTypes.number;
    required: boolean;
    numbersSet: RawObjectDataProcessor.NumbersSets;
    minimalValue?: number;
    maximalValue?: number;
    newName?: string;
  };

  export type BooleanParameterSpecification = ParameterSpecification__CommonProperties & {
    type: ParametersTypes.boolean;
    newName?: string;
  };

  export type JSON5_ParameterSpecification = ParameterSpecification__CommonProperties & {
    type: ParametersTypes.JSON5;
    required: boolean;
    newName?: string;
    validValueSpecification: RawObjectDataProcessor.ObjectDataSpecification;
  };

  export enum ParametersTypes {
  /* eslint-disable-next-line id-denylist --
   * The "id-denylist" is not desired to affect to object properties, but the applying to add respective option
   * has been denied. https://github.com/eslint/eslint/issues/15504 */
    string = "string",
    number = "number",
    boolean = "boolean",
    /* eslint-disable-next-line @typescript-eslint/no-shadow --
    * The property name does not conflict with imported names; it is the @typescript-eslint bug. */
    JSON5 = "JSON5"
  }

  export type Localization = {

    generateArgumentsVectorIsNotArrayErrorMessage: (argumentsVector: unknown) => string;

    generateArgumentsVectorHasNotEnoughElementsErrorMessage: (
      parameter: Localization.RawArgumentsVectorHasNotEnoughElementsErrorMessageParameters
    ) => string;

    generateArgumentsVectorHasNonStringElementsErrorMessage: (nonStringArguments: Array<unknown>) => string;

    generateNoDefaultCommandPhraseAvailableErrorMessage: (helpReference: string) => string;

    generateFirstParameterLooksLikeCommandPhraseWhileNoCommandPhrasesAvailableErrorMessage: (
      parametersObject: Localization.FirstParameterLooksLikeCommandPhraseWhileNoCommandPhrasesAvailableErrorMessageParameters
    ) => string;

    generateUnknownCommandPhraseErrorMessage: (
      parametersObject: Localization.UnknownCommandPhraseErrorMessageParameters
    ) => string;

    generateUnknownOptionsFoundForSpecificCommandErrorMessage: (
      parametersObject: Localization.UnknownOptionsFoundForSpecificCommandErrorMessageParameters
    ) => string;

    generateInvalidOptionTypeErrorMessage: (parametersObject: { optionName: string; }) => string;

    generateRequiredOptionKeyIsMissingErrorMessage: (
      parametersObject: Localization.RequiredOptionKeyIsMissingErrorMessageParameters
    ) => string;

    generateNoValueFollowingTheKeyOfNonBooleanOptionErrorMessage: (
      parametersObject: Localization.NoValueFollowingTheKeyOfNonBooleanOptionErrorMessageParameters
    ) => string;

    generateOptionValueIsNotAmongAllowedAlternativesErrorMessage: (
      parametersObject: Localization.OptionValueIsNotAmongAllowedAlternativesErrorMessageParameters
    ) => string;

    generateUnparsableNumericOptionValueErrorMessage: (
      parametersObject: Localization.UnparsableNumericOptionValueErrorMessageErrorMessageParameters
    ) => string;

    generatedNumericOptionValueIsNotBelongToExpectedNumbersSetErrorMessage: (
      parametersObject: Localization.NumericOptionValueIsNotBelongToExpectedNumbersSetErrorMessageParameters
    ) => string;

    generateReadableNumbersSet: (numberSet: RawObjectDataProcessor.NumbersSets) => string;

    generateNumericValueIsSmallerThanRequiredMinimumErrorMessage: (
      parametersObject: Localization.NumericValueIsSmallerThanRequiredMinimumErrorMessageParameters
    ) => string;

    generateNumericValueIsGreaterThanAllowedMaximumErrorMessage: (
      parametersObject: Localization.NumericValueIsGreaterThanAllowedMaximumErrorMessageParameters
    ) => string;

    generateMalformedJSON5_OptionErrorMessage: (
      parametersObject: Localization.MalformedJSON5_OptionErrorMessageParameters
    ) => string;

    generateJSON5_OptionDoesNotMatchWithValidDataSchemaErrorMessage: (
      parametersObject: Localization.JSON5_OptionDoesNotMatchWithValidDataSchemaErrorMessageParameters
    ) => string;
};


  export namespace Localization {

    export type RawArgumentsVectorHasNotEnoughElementsErrorMessageParameters = {
      arrayedConsoleCommand: Array<unknown>;
      minimalElementsCount: number;
    };

    export type FirstParameterLooksLikeCommandPhraseWhileNoCommandPhrasesAvailableErrorMessageParameters = {
      commandPhraseLikeArgument: string;
      helpReference: string;
    };

    export type UnknownCommandPhraseErrorMessageParameters = {
      inputtedCommandPhrase: string;
      helpReference: string;
    };

    export type UnknownOptionsFoundForSpecificCommandErrorMessageParameters = {
      commandPhrase?: string;
      commandReference: string;
    };

    export type RequiredOptionKeyIsMissingErrorMessageParameters = {
      commandPhrase?: string;
      missingOptionKey: string;
      commandHelpReference: string;
    };

    export type NoValueFollowingTheKeyOfNonBooleanOptionErrorMessageParameters = {
      targetOptionKey: string;
      commandHelpReference: string;
    };

    export type OptionValueIsNotAmongAllowedAlternativesErrorMessageParameters = {
      targetOptionKey: string;
      actualOptionValue: string;
      commandReference: string;
    };

    export type UnparsableNumericOptionValueErrorMessageErrorMessageParameters = {
      targetOptionKey: string;
      actualOptionValue: string;
      commandReference: string;
    };

    export type NumericOptionValueIsNotBelongToExpectedNumbersSetErrorMessageParameters = {
      targetOptionKey: string;
      expectedNumbersSet: RawObjectDataProcessor.NumbersSets;
      actualOptionValue: string;
      commandReference: string;
    };

    export type NumericValueIsSmallerThanRequiredMinimumErrorMessageParameters = {
      targetOptionKey: string;
      requiredMinimum: number;
      actualOptionValue: string;
      commandReference: string;
    };

    export type NumericValueIsGreaterThanAllowedMaximumErrorMessageParameters = {
      targetOptionKey: string;
      allowedMaximum: number;
      actualOptionValue: string;
      commandReference: string;
    };

    export type MalformedJSON5_OptionErrorMessageParameters = {
      targetOptionKey: string;
      commandReference: string;
    };

    export type JSON5_OptionDoesNotMatchWithValidDataSchemaErrorMessageParameters = {
      targetOptionKey: string;
      formattedValidationErrorsMessages: string;
    };
  }
}


export default ConsoleCommandsParser;
