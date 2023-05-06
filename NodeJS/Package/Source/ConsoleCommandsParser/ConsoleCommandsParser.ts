/* ─── Third-party utils ─────────────────────────────────────────────────────────────────────────────────────────── */
import JSON5 from "json5";

/* ─── YDEE core ─────────────────────────────────────────────────────────────────────────────────────────────────── */
import {
  RawObjectDataProcessor,
  InvalidExternalDataError,
  Logger,
  stringifyAndFormatArbitraryValue,
  isNaturalNumber,
  isNegativeInteger,
  isNonNegativeInteger,
  isNegativeIntegerOrZero,
  isPositiveDecimalFraction,
  isNegativeDecimalFraction,
  isDecimalFractionOfAnySign,
  isString,
  isNonEmptyString,
  isUndefined,
  isNotUndefined,
  isNonEmptyArray
} from "@yamato-daiwa/es-extensions";
import type { ParsedJSON } from "@yamato-daiwa/es-extensions";

/* ─── YDEE Node.js ──────────────────────────────────────────────────────────────────────────────────────────────── */
import InvalidConsoleCommandError from "../Errors/InvalidConsoleCommand/InvalidConsoleCommandError";
import IndentationCoordinator from "../Temporary/IndentationCoordinator";

/* ─── Localization ──────────────────────────────────────────────────────────────────────────────────────────────── */
import consoleCommandsParserLocalization__english from "./ConsoleCommandsParserLocalization.english";


class ConsoleCommandsParser<
  TargetCommandsAndOptionsCombinations extends ConsoleCommandsParser.GeneralizedCommandsAndOptionsCombinations
> {

  public static localization: ConsoleCommandsParser.Localization = consoleCommandsParserLocalization__english;


  private static readonly MINIMAL_ARGUMENTS_COUNT_IN_VALID_CONSOLE_COMMAND: number = 2;
  private static readonly PARSING_METHOD_INVOCATION_EXPRESSION: string =
      "ConsoleCommandsParser.parse(commandLineInterfaceSpecification, argumentsVector)";


  private readonly applicationName: string;
  private readonly targetCommandPhrase: string;
  private readonly targetCommandPhraseDescription?: string;

  private readonly targetCommandOptions?: ReadonlyArray<string | undefined>;
  private readonly targetCommandOptionsWhichHasNotBeenProcessedYet: Array<string | undefined> = [];
  private readonly targetCommandOptionsSpecification?: ConsoleCommandsParser.CommandOptionsSpecification;


  /* ━━━ Public methods ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  /*
   * The example of valid argument vector
   * [ 'C:\\Program Files\\nodejs\\node.exe',
   *   'C:\\Users\\tokugawa\\AppData\\Roaming\\npm\\node_modules\\hikari-automation\\bin\\hikari-automation',
   *   'build_project',
   *   '--mode',
   *   'production' ]
   * */
  public static parse<
    TargetCommandsAndOptionsCombinations extends ConsoleCommandsParser.GeneralizedCommandsAndOptionsCombinations
  >(
    commandLineInterfaceSpecification: ConsoleCommandsParser.CommandLineInterfaceSpecification,
    argumentsVector: ReadonlyArray<string> = process.argv
  ): ConsoleCommandsParser.ParsedCommand<TargetCommandsAndOptionsCombinations> {

    ConsoleCommandsParser.validateCommandLineInterfaceSpecification(commandLineInterfaceSpecification);

    /* [ Additional dynamic validation for compiled JavaScript ] */
    if (!Array.isArray(argumentsVector)) {
      Logger.throwErrorAndLog({
        errorInstance: new InvalidConsoleCommandError({
          applicationName: commandLineInterfaceSpecification.applicationName,
          messageSpecificPart: ConsoleCommandsParser.localization.errorsMessages.argumentsVectorIsNotArray.
              generate({ stringifiedActualValueOfArgumentsVector: stringifyAndFormatArbitraryValue(argumentsVector) })
        }),
        title: InvalidConsoleCommandError.localization.defaultTitle,
        occurrenceLocation: ConsoleCommandsParser.PARSING_METHOD_INVOCATION_EXPRESSION
      });
    }


    if (argumentsVector.length < ConsoleCommandsParser.MINIMAL_ARGUMENTS_COUNT_IN_VALID_CONSOLE_COMMAND) {
      Logger.throwErrorAndLog({
        errorInstance: new InvalidConsoleCommandError({
          applicationName: commandLineInterfaceSpecification.applicationName,
          messageSpecificPart: ConsoleCommandsParser.localization.errorsMessages.
            argumentsVectorHasNotEnoughElements.generate({
              minimalElementsCountInArgumentsVector: ConsoleCommandsParser.MINIMAL_ARGUMENTS_COUNT_IN_VALID_CONSOLE_COMMAND,
              actualElementsCountInArgumentsVector: argumentsVector.length,
              stringifiedArgumentsVector: stringifyAndFormatArbitraryValue(argumentsVector)
            })
        }),
        title: InvalidConsoleCommandError.localization.defaultTitle,
        occurrenceLocation: ConsoleCommandsParser.PARSING_METHOD_INVOCATION_EXPRESSION
      });
    }


    const consciouslyInputtedArguments: Array<string> = [];
    const nonStringArguments: Array<unknown> = [];

    /* [ Approach ] Now, when the arguments count is definitely 2 as minimum, below two variables will be initialized
    *     on 0th and 1st iterations of the following loop respectively, however TypeScript analyzer will not detect
    *     this that is why initial value with any string (empty one is fine) is required. */
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
          messageSpecificPart: ConsoleCommandsParser.localization.errorsMessages.
              argumentsVectorHasNonStringElements.generate({
                stringifiedFormattedNonStringArguments: stringifyAndFormatArbitraryValue(nonStringArguments)
              })
        }),
        title: InvalidConsoleCommandError.localization.defaultTitle,
        occurrenceLocation: ConsoleCommandsParser.PARSING_METHOD_INVOCATION_EXPRESSION
      });
    }


    const dataHoldingSelfInstance: ConsoleCommandsParser<TargetCommandsAndOptionsCombinations> = new ConsoleCommandsParser({
      commandLineInterfaceSpecification, consciouslyInputtedArguments
    });

    return {
      NodeJS_InterpreterAbsolutePath,
      executableFileAbsolutePath,
      phrase: dataHoldingSelfInstance.targetCommandPhrase,
      ...dataHoldingSelfInstance.getParsedOptionsAndParameters()
    };

  }

  public static generateFullHelpReference(
    commandLineInterfaceSpecification: ConsoleCommandsParser.CommandLineInterfaceSpecification
  ): string {

    ConsoleCommandsParser.validateCommandLineInterfaceSpecification(commandLineInterfaceSpecification);

    const textSegments: Array<string> = [];

    if (isNonEmptyString(commandLineInterfaceSpecification.applicationDescription)) {
      textSegments.push(commandLineInterfaceSpecification.applicationDescription);
    }

    if (isNotUndefined(commandLineInterfaceSpecification.commandPhrases)) {

      const commandPhrasesReferences: Array<string> = [];

      for (
        const [ commandPhrase, commandPhraseSpecification ] of
            Object.entries(commandLineInterfaceSpecification.commandPhrases)
      ) {
        commandPhrasesReferences.push(
          this.generateSingleCommandPhraseHelpReference({ commandPhrase, commandPhraseSpecification })
        );
      }

      textSegments.push("\n\n", commandPhrasesReferences.join("\n\n"));

    }

    return textSegments.join("");

  }


  /* ━━━ Constructor ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  private constructor(
    {
      commandLineInterfaceSpecification,
      consciouslyInputtedArguments
    }: Readonly<{
      commandLineInterfaceSpecification: ConsoleCommandsParser.CommandLineInterfaceSpecification;
      consciouslyInputtedArguments: ReadonlyArray<string | undefined>;
    }>
  ) {

    const helpReference: string = ConsoleCommandsParser.generateFullHelpReference(commandLineInterfaceSpecification);
    const firstConsciouslyInputtedArgument: string | undefined = consciouslyInputtedArguments[0];
    const defaultCommandSpecification: ConsoleCommandsParser.CommandPhraseSpecification | undefined =
      Object.values(commandLineInterfaceSpecification.commandPhrases).find(
        (commandPhraseSpecification: ConsoleCommandsParser.CommandPhraseSpecification): boolean =>
            commandPhraseSpecification.isDefault === true
    );

    let targetCommandPhrase: string | undefined;
    let targetCommandPhraseDescription: string | undefined;
    let targetCommandOptions: Array<string | undefined> | undefined;
    let optionsSpecificationForRecognizedCommandPhrase: ConsoleCommandsParser.CommandOptionsSpecification | undefined;

    /* [ Command example ] > webpack
    * This command will be converted to 3 arguments - "NodeJS_InterpreterAbsolutePath", "executableFileAbsolutePath"
    *   and "webpack". This truthy conditions also means that there no subsequent arguments. */
    if (isUndefined(firstConsciouslyInputtedArgument)) {

      if (isUndefined(defaultCommandSpecification)) {
        Logger.throwErrorAndLog({
          errorInstance: new InvalidConsoleCommandError({
            applicationName: commandLineInterfaceSpecification.applicationName,
            messageSpecificPart: ConsoleCommandsParser.localization.errorsMessages.
                noDefaultCommandPhraseAvailable.generate({ helpReference })
          }),
          title: InvalidConsoleCommandError.localization.defaultTitle,
          occurrenceLocation: ConsoleCommandsParser.PARSING_METHOD_INVOCATION_EXPRESSION
        });
      }


      targetCommandPhraseDescription = defaultCommandSpecification.description;
      optionsSpecificationForRecognizedCommandPhrase = defaultCommandSpecification.options ?? {};

    } else if (ConsoleCommandsParser.isCommandArgumentTheOption(firstConsciouslyInputtedArgument)) {

      if (isUndefined(defaultCommandSpecification)) {
        Logger.throwErrorAndLog({
          errorInstance: new InvalidConsoleCommandError({
            applicationName: commandLineInterfaceSpecification.applicationName,
            messageSpecificPart: ConsoleCommandsParser.localization.errorsMessages.
                noDefaultCommandPhraseAvailable.generate({ helpReference })
          }),
          title: InvalidConsoleCommandError.localization.defaultTitle,
          occurrenceLocation: ConsoleCommandsParser.PARSING_METHOD_INVOCATION_EXPRESSION
        });
      }


      targetCommandOptions = [ ...consciouslyInputtedArguments ];
      targetCommandPhraseDescription = defaultCommandSpecification.description;
      optionsSpecificationForRecognizedCommandPhrase = defaultCommandSpecification.options ?? {};

    } else {

      if (isUndefined(commandLineInterfaceSpecification.commandPhrases)) {
        Logger.throwErrorAndLog({
          errorInstance: new InvalidConsoleCommandError({
            applicationName: commandLineInterfaceSpecification.applicationName,
            messageSpecificPart: ConsoleCommandsParser.localization.errorsMessages.
                firstParameterLooksLikeCommandPhraseWhileNoCommandPhrasesAvailable.generate({
                  commandPhraseLikeArgument: firstConsciouslyInputtedArgument, helpReference
                })
          }),
          title: InvalidConsoleCommandError.localization.defaultTitle,
          occurrenceLocation: ConsoleCommandsParser.PARSING_METHOD_INVOCATION_EXPRESSION
        });
      }


      targetCommandPhrase = firstConsciouslyInputtedArgument;
      targetCommandOptions = consciouslyInputtedArguments.slice(1);

      for (
        const [ commandPhrase, commandPhraseSpecification ] of
            Object.entries(commandLineInterfaceSpecification.commandPhrases)
      ) {
        if (commandPhrase === targetCommandPhrase) {
          targetCommandPhraseDescription = commandPhraseSpecification.description;
          optionsSpecificationForRecognizedCommandPhrase = commandPhraseSpecification.options ?? {};
          break;
        }
      }


      /* [ Approach ] If no options for the current command phrase available, it will be the empty object but not "undefined". */
      if (isUndefined(optionsSpecificationForRecognizedCommandPhrase)) {
        Logger.throwErrorAndLog({
          errorInstance: new InvalidConsoleCommandError({
            applicationName: commandLineInterfaceSpecification.applicationName,
            messageSpecificPart: ConsoleCommandsParser.localization.errorsMessages.unknownCommandPhrase.generate({
              inputtedCommandPhrase: targetCommandPhrase, helpReference
            })
          }),
          title: InvalidConsoleCommandError.localization.defaultTitle,
          occurrenceLocation: ConsoleCommandsParser.PARSING_METHOD_INVOCATION_EXPRESSION
        });
      }

    }


    this.applicationName = commandLineInterfaceSpecification.applicationName;
    this.targetCommandPhrase = targetCommandPhrase;
    this.targetCommandPhraseDescription = targetCommandPhraseDescription;
    this.targetCommandOptions = targetCommandOptions;
    this.targetCommandOptionsSpecification = optionsSpecificationForRecognizedCommandPhrase;

  }


  /* ━━━ Private methods ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  /* ─── Parsing ─────────────────────────────────────────────────────────────────────────────────────────────────── */
  private getParsedOptionsAndParameters(): TargetCommandsAndOptionsCombinations {

    if (isUndefined(this.targetCommandOptionsSpecification)) {
      /* eslint-disable-next-line @typescript-eslint/consistent-type-assertions --
       * In this case, `as const` is not the equivalent of `as TargetCommandsAndOptionsCombinations` and will cause TS2322
       * error. */
      return {} as TargetCommandsAndOptionsCombinations;
    }


    const parsedOptions: ConsoleCommandsParser.GeneralizedCommandsAndOptionsCombinations = {};
    this.targetCommandOptionsWhichHasNotBeenProcessedYet.push(...this.targetCommandOptions ?? []);

    for (const [ optionKey, optionSpecification ] of Object.entries(this.targetCommandOptionsSpecification)) {

      const optionKeyWithoutLeading2NDashes: string = optionKey.startsWith("--") ? optionKey.slice(2) : optionKey;
      const optionKeyWithLeading2NDashes: string = `--${ optionKeyWithoutLeading2NDashes }`;
      const optionName: string = optionSpecification.newName ?? optionKeyWithoutLeading2NDashes;

      let shortcutWithLeadingNDash: string | undefined;
      if (isNotUndefined(optionSpecification.shortcut)) {
        shortcutWithLeadingNDash = optionSpecification.shortcut.startsWith("-") ?
            optionSpecification.shortcut : `-${ optionSpecification.shortcut }`;
      }

      const arrayIndexOfCurrentOptionKey: number = this.targetCommandOptionsWhichHasNotBeenProcessedYet.findIndex(
        (commandOption: string | undefined): boolean =>
            commandOption === optionKeyWithLeading2NDashes || commandOption === shortcutWithLeadingNDash
      );
      const hasCurrentOptionBeenSpecified: boolean = arrayIndexOfCurrentOptionKey !== -1;

      if (optionSpecification.type === ConsoleCommandsParser.ParametersTypes.boolean) {

        if (hasCurrentOptionBeenSpecified) {
          this.targetCommandOptionsWhichHasNotBeenProcessedYet.splice(arrayIndexOfCurrentOptionKey, 1);
        }

        parsedOptions[optionName] = hasCurrentOptionBeenSpecified;

        continue;

      }


      if (!hasCurrentOptionBeenSpecified) {

        if (optionSpecification.required) {
          Logger.throwErrorAndLog({
            errorInstance: new InvalidConsoleCommandError({
              applicationName: this.applicationName,
              messageSpecificPart: ConsoleCommandsParser.localization.errorsMessages.requiredOptionKeyIsMissing.generate({
                commandPhrase: this.targetCommandPhrase,
                missingOptionKey: optionKeyWithLeading2NDashes,
                commandHelpReference: ConsoleCommandsParser.generateSingleCommandPhraseHelpReference({
                  commandPhrase: this.targetCommandPhrase,
                  commandPhraseSpecification: {
                    description: this.targetCommandPhraseDescription,
                    options: this.targetCommandOptionsSpecification
                  }
                })
              })
            }),
            title: InvalidConsoleCommandError.localization.defaultTitle,
            occurrenceLocation: ConsoleCommandsParser.PARSING_METHOD_INVOCATION_EXPRESSION
          });
        }


        continue;

      }


      const potentialValueOfCurrentOption: string | undefined =
          this.targetCommandOptionsWhichHasNotBeenProcessedYet[arrayIndexOfCurrentOptionKey + 1];

      if (isUndefined(potentialValueOfCurrentOption)) {

        /* [ Theory ] Although the option could be optional, the value is expected to be specified because flag has been
        *     specified. */
        Logger.throwErrorAndLog({
          errorInstance: new InvalidConsoleCommandError({
            applicationName: this.applicationName,
            messageSpecificPart: ConsoleCommandsParser.localization.errorsMessages.
                noValueFollowingTheKeyOfNonBooleanOption.generate({
                  targetOptionKey: optionKeyWithLeading2NDashes,
                  commandHelpReference: ConsoleCommandsParser.generateSingleCommandPhraseHelpReference({
                    commandPhrase: this.targetCommandPhrase, commandPhraseSpecification: this.targetCommandOptionsSpecification
                  })
                })
          }),
          title: InvalidConsoleCommandError.localization.defaultTitle,
          occurrenceLocation: ConsoleCommandsParser.PARSING_METHOD_INVOCATION_EXPRESSION
        });

      }


      switch (optionSpecification.type) {

        case ConsoleCommandsParser.ParametersTypes.string: {

          parsedOptions[optionName] = this.processStringTypeOptionValue({
            targetOptionRawValue: potentialValueOfCurrentOption,
            optionKeyWithLeading2NDashes,
            optionSpecification
          });

          break;
        }

        case ConsoleCommandsParser.ParametersTypes.number: {

          parsedOptions[optionName] = this.processNumberTypeOptionValue({
            targetOptionRawValue: potentialValueOfCurrentOption,
            optionKeyWithLeading2NDashes,
            optionSpecification
          });

          break;
        }

        case ConsoleCommandsParser.ParametersTypes.JSON5: {

          const targetParsedJSON5_ParameterValue: ParsedJSON | undefined = this.
              extractAndValidateParsedJSON5_ParameterValue({
              targetOptionRawValue: potentialValueOfCurrentOption,
              optionKeyWithLeading2NDashes,
              optionSpecification
            });

          if (isNotUndefined(targetParsedJSON5_ParameterValue)) {
            parsedOptions[optionName] = targetParsedJSON5_ParameterValue;
          }

          break;
        }

        default: {
          Logger.throwErrorAndLog({
            errorType: "InvalidConsoleCommandOptionSpecification",
            title: "Invalid console command option specification",
            description: ConsoleCommandsParser.localization.errorsMessages.invalidCommandOptionTypeAtSpecification.generate({
              /* eslint-disable-next-line @typescript-eslint/consistent-type-assertions --
              * No way to access to `optionSpecification` from the viewpoint of typescript, while TypeScript can not
              *   guarantee the valid `optionSpecification`.  */
              optionName, typeName: String((optionSpecification as { type: unknown; }).type)
            }),
            occurrenceLocation: ConsoleCommandsParser.PARSING_METHOD_INVOCATION_EXPRESSION
          });
        }

      }

      this.targetCommandOptionsWhichHasNotBeenProcessedYet.splice(arrayIndexOfCurrentOptionKey, 2);

    }

    if (this.targetCommandOptionsWhichHasNotBeenProcessedYet.length > 0) {
      Logger.throwErrorAndLog({
        errorInstance: new InvalidConsoleCommandError({
          applicationName: this.applicationName,
          messageSpecificPart: ConsoleCommandsParser.localization.errorsMessages.unknownOptionsFoundForSpecificCommand.generate({
            commandPhrase: this.targetCommandPhrase,
            formattedUnknownOptions: stringifyAndFormatArbitraryValue(this.targetCommandOptionsWhichHasNotBeenProcessedYet),
            commandHelpReference: ConsoleCommandsParser.generateSingleCommandPhraseHelpReference({
              commandPhrase: this.targetCommandPhrase, commandPhraseSpecification: this.targetCommandOptionsSpecification
            })
          })
        }),
        title: InvalidConsoleCommandError.localization.defaultTitle,
        occurrenceLocation: ConsoleCommandsParser.PARSING_METHOD_INVOCATION_EXPRESSION
      });
    }


    /* eslint-disable-next-line @typescript-eslint/consistent-type-assertions --
    * Because of TypeScript concept limitations, there is no method to guarantee that "commandLineInterfaceSpecification"
    * is corresponding to "TargetCommandsAndOptionsCombinations". */
    return parsedOptions as TargetCommandsAndOptionsCombinations;

  }

  private processStringTypeOptionValue(
    {
      targetOptionRawValue,
      optionKeyWithLeading2NDashes,
      optionSpecification
    }: Readonly<{
      targetOptionRawValue: string;
      optionKeyWithLeading2NDashes: string;
      optionSpecification: ConsoleCommandsParser.StringOptionSpecification;
    }>
  ): string {

    const { allowedAlternatives }: ConsoleCommandsParser.StringOptionSpecification = optionSpecification;

    if (isNonEmptyArray(allowedAlternatives) && !allowedAlternatives.includes(targetOptionRawValue)) {
      Logger.throwErrorAndLog({
        errorInstance: new InvalidConsoleCommandError({
          applicationName: this.applicationName,
          messageSpecificPart: ConsoleCommandsParser.localization.errorsMessages.
              optionValueIsNotAmongAllowedAlternatives.generate({
                targetOptionKey: optionKeyWithLeading2NDashes,
                actualOptionValue: targetOptionRawValue,
                commandHelpReference: ConsoleCommandsParser.generateSingleCommandPhraseHelpReference({
                  commandPhrase: this.targetCommandPhrase,
                  commandPhraseSpecification: this.targetCommandOptionsSpecification ?? {}
                })
              })
        }),
        title: InvalidConsoleCommandError.localization.defaultTitle,
        occurrenceLocation: ConsoleCommandsParser.PARSING_METHOD_INVOCATION_EXPRESSION
      });
    }

    return targetOptionRawValue;

  }

  private processNumberTypeOptionValue(
    {
      targetOptionRawValue,
      optionKeyWithLeading2NDashes,
      optionSpecification
    }: Readonly<{
      targetOptionRawValue: string;
      optionKeyWithLeading2NDashes: string;
      optionSpecification: ConsoleCommandsParser.NumberOptionSpecification;
    }>
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
          messageSpecificPart: ConsoleCommandsParser.localization.errorsMessages.unparsableNumericOptionValue.generate({
            targetOptionKey: optionKeyWithLeading2NDashes,
            actualOptionValue: targetOptionRawValue,
            commandHelpReference: ConsoleCommandsParser.generateSingleCommandPhraseHelpReference({
              commandPhrase: this.targetCommandPhrase, commandPhraseSpecification: this.targetCommandOptionsSpecification ?? {}
            })
          })
        }),
        title: InvalidConsoleCommandError.localization.defaultTitle,
        occurrenceLocation: ConsoleCommandsParser.PARSING_METHOD_INVOCATION_EXPRESSION
      });
    }


    let isOptionValueMatchingWithExpectedNumberSet: boolean;

    switch (numbersSet) {
      case RawObjectDataProcessor.NumbersSets.naturalNumber: {
        isOptionValueMatchingWithExpectedNumberSet = isNaturalNumber(targetOptionParsedValue);
        break;
      }
      case RawObjectDataProcessor.NumbersSets.nonNegativeInteger: {
        isOptionValueMatchingWithExpectedNumberSet = isNonNegativeInteger(targetOptionParsedValue);
        break;
      }
      case RawObjectDataProcessor.NumbersSets.negativeInteger: {
        isOptionValueMatchingWithExpectedNumberSet = isNegativeInteger(targetOptionParsedValue);
        break;
      }
      case RawObjectDataProcessor.NumbersSets.negativeIntegerOrZero: {
        isOptionValueMatchingWithExpectedNumberSet = isNegativeIntegerOrZero(targetOptionParsedValue);
        break;
      }
      case RawObjectDataProcessor.NumbersSets.anyInteger: {
        isOptionValueMatchingWithExpectedNumberSet = Number.isInteger(targetOptionParsedValue);
        break;
      }
      case RawObjectDataProcessor.NumbersSets.positiveDecimalFraction: {
        isOptionValueMatchingWithExpectedNumberSet = isPositiveDecimalFraction(targetOptionParsedValue);
        break;
      }
      case RawObjectDataProcessor.NumbersSets.negativeDecimalFraction: {
        isOptionValueMatchingWithExpectedNumberSet = isNegativeDecimalFraction(targetOptionParsedValue);
        break;
      }
      case RawObjectDataProcessor.NumbersSets.decimalFractionOfAnySign: {
        isOptionValueMatchingWithExpectedNumberSet = isDecimalFractionOfAnySign(targetOptionParsedValue);
        break;
      }
      case RawObjectDataProcessor.NumbersSets.anyRealNumber: {
        isOptionValueMatchingWithExpectedNumberSet = true;
        break;
      }
    }

    if (!isOptionValueMatchingWithExpectedNumberSet) {
      Logger.throwErrorAndLog({
        errorInstance: new InvalidConsoleCommandError({
          applicationName: this.applicationName,
          messageSpecificPart: ConsoleCommandsParser.localization.errorsMessages.
              numericOptionValueIsNotBelongToExpectedNumbersSet.generate({
                targetOptionKey: optionKeyWithLeading2NDashes,
                expectedNumbersSet: numbersSet,
                actualOptionValue: targetOptionRawValue,
                commandHelpReference: ConsoleCommandsParser.generateSingleCommandPhraseHelpReference({
                  commandPhrase: this.targetCommandPhrase,
                  commandPhraseSpecification: this.targetCommandOptionsSpecification ?? {}
                })
            })
        }),
        title: InvalidConsoleCommandError.localization.defaultTitle,
        occurrenceLocation: ConsoleCommandsParser.PARSING_METHOD_INVOCATION_EXPRESSION
      });
    }


    if (isNotUndefined(minimalValue) && targetOptionParsedValue <= minimalValue) {
      Logger.throwErrorAndLog({
        errorInstance: new InvalidConsoleCommandError({
          applicationName: this.applicationName,
          messageSpecificPart: ConsoleCommandsParser.localization.errorsMessages.
              numericValueIsSmallerThanRequiredMinimum.generate({
                targetOptionKey: optionKeyWithLeading2NDashes,
                requiredMinimum: minimalValue,
                actualOptionValue: targetOptionRawValue,
                commandHelpReference: ConsoleCommandsParser.generateSingleCommandPhraseHelpReference({
                  commandPhrase: this.targetCommandPhrase,
                  commandPhraseSpecification: this.targetCommandOptionsSpecification ?? {}
                })
              })
        }),
        title: InvalidConsoleCommandError.localization.defaultTitle,
        occurrenceLocation: ConsoleCommandsParser.PARSING_METHOD_INVOCATION_EXPRESSION
      });
    }


    if (isNotUndefined(maximalValue) && targetOptionParsedValue >= maximalValue) {
      Logger.throwErrorAndLog({
        errorInstance: new InvalidConsoleCommandError({
          applicationName: this.applicationName,
          messageSpecificPart: ConsoleCommandsParser.localization.errorsMessages.
              numericValueIsGreaterThanAllowedMaximum.generate({
                targetOptionKey: optionKeyWithLeading2NDashes,
                allowedMaximum: maximalValue,
                actualOptionValue: targetOptionRawValue,
                commandHelpReference: ConsoleCommandsParser.generateSingleCommandPhraseHelpReference({
                  commandPhrase: this.targetCommandPhrase,
                  commandPhraseSpecification: this.targetCommandOptionsSpecification ?? {}
                })
              })
        }),
        title: InvalidConsoleCommandError.localization.defaultTitle,
        occurrenceLocation: ConsoleCommandsParser.PARSING_METHOD_INVOCATION_EXPRESSION
      });
    }


    return targetOptionParsedValue;

  }


  private extractAndValidateParsedJSON5_ParameterValue(
    {
      targetOptionRawValue,
      optionKeyWithLeading2NDashes,
      optionSpecification
    }: Readonly<{
      targetOptionRawValue: string;
      optionKeyWithLeading2NDashes: string;
      optionSpecification: ConsoleCommandsParser.JSON5_ParameterSpecification;
    }>
  ): ParsedJSON | undefined {

    let targetParameterParsedValue: unknown;

    try {
      targetParameterParsedValue = JSON5.parse(targetOptionRawValue);
    } catch (error: unknown) {
      Logger.throwErrorAndLog({
        errorInstance: new InvalidConsoleCommandError({
          applicationName: this.applicationName,
          messageSpecificPart: ConsoleCommandsParser.localization.errorsMessages.malformedJSON5_Option.generate({
            targetOptionKey: optionKeyWithLeading2NDashes,
            commandHelpReference: ConsoleCommandsParser.generateSingleCommandPhraseHelpReference({
              commandPhrase: this.targetCommandPhrase, commandPhraseSpecification: this.targetCommandOptionsSpecification ?? {}
            })
          })
        }),
        title: InvalidConsoleCommandError.localization.defaultTitle,
        occurrenceLocation: ConsoleCommandsParser.PARSING_METHOD_INVOCATION_EXPRESSION
      });
    }


    const validationResult: RawObjectDataProcessor.ProcessingResult<ParsedJSON> = RawObjectDataProcessor.
        process<ParsedJSON>(targetParameterParsedValue, optionSpecification.validValueSpecification);

    if (validationResult.rawDataIsInvalid) {
      Logger.throwErrorAndLog({
        errorInstance: new InvalidExternalDataError({
          customMessage: ConsoleCommandsParser.localization.errorsMessages.JSON5_OptionDoesNotMatchWithValidDataSchema.generate({
            targetOptionKey: optionKeyWithLeading2NDashes,
            formattedValidationErrorsMessages: RawObjectDataProcessor.
                formatValidationErrorsList(validationResult.validationErrorsMessages)
          })
        }),
        title: InvalidExternalDataError.localization.defaultTitle,
        occurrenceLocation: ConsoleCommandsParser.PARSING_METHOD_INVOCATION_EXPRESSION
      });
    }


    return validationResult.processedData;

  }


  private static isCommandArgumentTheOption(consoleCommandArgument: string): boolean {
    return consoleCommandArgument.startsWith("-");
  }


  /* ─── Help reference ──────────────────────────────────────────────────────────────────────────────────────────── */
  private static generateSingleCommandPhraseHelpReference(
    {
      commandPhrase,
      commandPhraseSpecification
    }: Readonly<{
      commandPhrase: string;
      commandPhraseSpecification: ConsoleCommandsParser.CommandPhraseSpecification;
    }>
  ): string {

    const indentationCoordinator: IndentationCoordinator = new IndentationCoordinator();

    const textSegments: Array<string> = [
      `● ${ commandPhrase ?? ConsoleCommandsParser.localization.helpReference.defaultCommand }\n`
    ];

    if (isNonEmptyString(commandPhraseSpecification.description)) {
      textSegments.push(
        `${ indentationCoordinator.insertIncrementedIndentWihtoutUpdatingOfIndentationMultiplier() }` +
            `${ commandPhraseSpecification.description }`
      );
    }

    const commandOptions: ConsoleCommandsParser.CommandOptionsSpecification = commandPhraseSpecification.options ?? {};

    if (Object.entries(commandOptions).length > 0) {

      indentationCoordinator.incrementIndent();

      textSegments.push(
        `\n\n${ indentationCoordinator.insertIndent() }` +
        `■ ${ ConsoleCommandsParser.localization.helpReference.options }`
      );

      indentationCoordinator.incrementIndent();

      for (const [ commandOptionKey, commandOptionSpecification ] of Object.entries(commandOptions)) {

        textSegments.push(
          ConsoleCommandsParser.generateSingleCommandOptionHelpReference({
            commandOptionKey,
            commandOptionSpecification,
            indentationCoordinator
          })
        );

      }

      indentationCoordinator.decrementIndent();

    }

    return textSegments.join("");

  }

  private static generateSingleCommandOptionHelpReference(
    {
      commandOptionKey,
      commandOptionSpecification,
      indentationCoordinator
    }: Readonly<{
      commandOptionKey: string;
      commandOptionSpecification: ConsoleCommandsParser.OptionSpecification;
      indentationCoordinator: IndentationCoordinator;
    }>
  ): string {

    const textSegments: Array<string> = [
      `\n\n${ indentationCoordinator.insertIndent() }--${ commandOptionKey }` +
      `\n${ indentationCoordinator.incrementIndentAndInsert() }`
    ];

    const helpReferenceLocalization: ConsoleCommandsParser.Localization.HelpReference =
        ConsoleCommandsParser.localization.helpReference;

    if (isNonEmptyString(commandOptionSpecification.description)) {
      textSegments.push(`${ commandOptionSpecification.description }\n`);
    }

    if (isNotUndefined(commandOptionSpecification.shortcut)) {
      textSegments.push(
        `\n${ indentationCoordinator.insertIndent() }` +
        `◯ ${ helpReferenceLocalization.shortcut }: -${ commandOptionSpecification.shortcut }`
      );
    }

    textSegments.push(
      `\n${ indentationCoordinator.insertIndent() }◯ ${ helpReferenceLocalization.type }: ${ commandOptionSpecification.type }`
    );

    if ("required" in commandOptionSpecification) {
      textSegments.push(
        `\n${ indentationCoordinator.insertIndent() }◯ ${ helpReferenceLocalization.isRequired }: ` +
        `${ commandOptionSpecification.required ? helpReferenceLocalization.yes : helpReferenceLocalization.no }`
      );
    }


    /* eslint-disable-next-line @typescript-eslint/switch-exhaustiveness-check --
     * The exhaustiveness check is not required in this case. */
    switch (commandOptionSpecification.type) {

      case ConsoleCommandsParser.ParametersTypes.string: {

        if (isNonEmptyArray(commandOptionSpecification.allowedAlternatives)) {

          textSegments.push(`\n${ indentationCoordinator.insertIndent() }◯ ${ helpReferenceLocalization.allowedAlternatives }:`);

          indentationCoordinator.incrementIndent();

          textSegments.push(
            `${ 
              commandOptionSpecification.allowedAlternatives.map(
                (allowedAlternative: string): string => `\n${ indentationCoordinator.insertIndent() }◆ ${ allowedAlternative }`
              ).join("") 
            }`
          );

          indentationCoordinator.decrementIndent();

        }

        break;

      }

      case ConsoleCommandsParser.ParametersTypes.number: {

        textSegments.push(
          `\n${ indentationCoordinator.insertIndent() }◯ ` +
          `${ helpReferenceLocalization.numbersSet.key }: ` +
          `${ helpReferenceLocalization.numbersSet.generateValue(commandOptionSpecification.numbersSet) } `
        );

        if (isNotUndefined(commandOptionSpecification.minimalValue)) {
          textSegments.push(
            `\n${ indentationCoordinator.insertIndent() }◯ ` +
            `${ helpReferenceLocalization.minimalValue }: ${ commandOptionSpecification.minimalValue }`
          );
        }

        if (isNotUndefined(commandOptionSpecification.maximalValue)) {
          textSegments.push(
            `\n${ indentationCoordinator.insertIndent() }◯ ` +
            `${ helpReferenceLocalization.maximalValue }: ${ commandOptionSpecification.maximalValue }`
          );
        }

        break;

      }

      case ConsoleCommandsParser.ParametersTypes.JSON5: {

        textSegments.push(
          `\n${ indentationCoordinator.insertIndent() }◯ ` +
          `${ helpReferenceLocalization.objectTypeValuePropertiesSpecification }:\n`
        );

        indentationCoordinator.incrementIndent();

        textSegments.push(
          indentationCoordinator.addCurrentIntendationToEachLineOf(
            stringifyAndFormatArbitraryValue(commandOptionSpecification.validValueSpecification.properties)
          )
        );

        indentationCoordinator.decrementIndent();

      }

    }

    indentationCoordinator.decrementIndent();

    return textSegments.join("");

  }

  /* ─── Other ────────────────────────────────────────────────────────────────────────────────────────────────────── */
  private static validateCommandLineInterfaceSpecification(
    commandLineInterfaceSpecification: ConsoleCommandsParser.CommandLineInterfaceSpecification
  ): void {

    if (
      Object.values(commandLineInterfaceSpecification.commandPhrases).
          filter(
            (commandPhraseSpecification: ConsoleCommandsParser.CommandPhraseSpecification): boolean =>
                commandPhraseSpecification.isDefault === true
          ).
          length > 1
    ) {
      // TODO
    }

  }

}


namespace ConsoleCommandsParser {

  export type ParsedCommand<TargetCommandsAndOptionsCombinations extends GeneralizedCommandsAndOptionsCombinations> =
    Readonly<{
      NodeJS_InterpreterAbsolutePath: string;
      executableFileAbsolutePath: string;
      phrase?: string;
    }> &
    TargetCommandsAndOptionsCombinations;

  export type GeneralizedCommandsAndOptionsCombinations = {
    [name: string]: string | number | boolean | ParsedJSON;
  };

  export type CommandLineInterfaceSpecification = Readonly<{
    applicationName: string;
    applicationDescription?: string;
    commandPhrases: Readonly<{ [commandPhrase: string]: CommandPhraseSpecification; }>;
  }>;

  export type CommandPhraseSpecification = Readonly<{
    isDefault?: boolean;
    description?: string;
    options?: CommandOptionsSpecification;
  }>;

  export type CommandOptionsSpecification = Readonly<{ [optionKey: string]: OptionSpecification; }>;

  export type OptionSpecification =
      Readonly<{ description?: string; }> &
      (
        StringOptionSpecification |
        NumberOptionSpecification |
        BooleanParameterSpecification |
        JSON5_ParameterSpecification
      );


  export type ParameterSpecification__CommonProperties = Readonly<{
    shortcut?: string;
  }>;

  export type StringOptionSpecification =
      ParameterSpecification__CommonProperties &
      Readonly<{
        /* eslint-disable-next-line id-denylist --
         * The "id-denylist" is not unsolicited for object properties, but the applying to add respective option
         * has been denied. https://github.com/eslint/eslint/issues/15504 */
        type: ParametersTypes.string;
        required: boolean;
        allowedAlternatives?: ReadonlyArray<string>;
        newName?: string;
      }>;

  export type NumberOptionSpecification =
      ParameterSpecification__CommonProperties &
      Readonly<{
        type: ParametersTypes.number;
        required: boolean;
        numbersSet: RawObjectDataProcessor.NumbersSets;
        minimalValue?: number;
        maximalValue?: number;
        newName?: string;
      }>;

  export type BooleanParameterSpecification =
      ParameterSpecification__CommonProperties &
      Readonly<{
        type: ParametersTypes.boolean;
        newName?: string;
      }>;

  export type JSON5_ParameterSpecification =
      ParameterSpecification__CommonProperties &
      Readonly<{
        type: ParametersTypes.JSON5;
        required: boolean;
        newName?: string;
        validValueSpecification: RawObjectDataProcessor.FixedKeyAndValuesTypeObjectDataSpecification;
    }>;

  export enum ParametersTypes {
    /* eslint-disable-next-line id-denylist --
     * The "id-denylist" is not unsolicited for object properties, but the applying to add respective option
     * has been denied. https://github.com/eslint/eslint/issues/15504 */
    string = "string",
    number = "number",
    boolean = "boolean",
    /* eslint-disable-next-line @typescript-eslint/no-shadow --
    * The property name does not conflict with imported names; it is the @typescript-eslint bug. */
    JSON5 = "JSON5"
  }

  export type Localization = Readonly<{

    helpReference: Localization.HelpReference;

    generateCheckTheCommandReferenceAsking: (commandReference: string) => string;

    errorsMessages: {

      argumentsVectorIsNotArray: Readonly<{
        generate: (
          templateParameters: Localization.ErrorsMessages.ArgumentsVectorIsNotArray.TemplateParameters
        ) => string;
      }>;

      argumentsVectorHasNotEnoughElements: Readonly<{
        generate: (
          templateParameters: Localization.ErrorsMessages.RawArgumentsVectorHasNotEnoughElements.TemplateParameters
        ) => string;
      }>;

      argumentsVectorHasNonStringElements: Readonly<{
        generate: (
          templateParameters: Localization.ErrorsMessages.ArgumentsVectorHasNonStringElements.TemplateParameters
        ) => string;
      }>;

      noDefaultCommandPhraseAvailable: Readonly<{
        generate: (
          templateParameters: Localization.ErrorsMessages.NoDefaultCommandPhraseAvailable.TemplateParameters
        ) => string;
      }>;

      firstParameterLooksLikeCommandPhraseWhileNoCommandPhrasesAvailable: Readonly<{
        generate: (
          templateParameters: Localization.ErrorsMessages.FirstParameterLooksLikeCommandPhraseWhileNoCommandPhrasesAvailable.
              TemplateParameters
        ) => string;
      }>;

      unknownCommandPhrase: Readonly<{
        generate: (templateParameters: Localization.ErrorsMessages.UnknownCommandPhrase.TemplateParameters) => string;
      }>;

      requiredOptionKeyIsMissing: Readonly<{
        generate: (
          templateParameters: Localization.ErrorsMessages.RequiredOptionKeyIsMissing.TemplateParameters
        ) => string;
      }>;

      noValueFollowingTheKeyOfNonBooleanOption: Readonly<{
        generate: (
          templateParameters: Localization.ErrorsMessages.NoValueFollowingTheKeyOfNonBooleanOption.TemplateParameters
        ) => string;
      }>;

      invalidCommandOptionTypeAtSpecification: Readonly<{
        generate: (
          templateParameters: Localization.ErrorsMessages.InvalidCommandOptionTypeAtSpecification.TemplateParameters
        ) => string;
      }>;

      unknownOptionsFoundForSpecificCommand: Readonly<{
        generate: (
          templateParameters: Localization.ErrorsMessages.UnknownOptionsFoundForSpecificCommand.TemplateParameters
        ) => string;
      }>;

      optionValueIsNotAmongAllowedAlternatives: Readonly<{
        generate: (
          templateParameters: Localization.ErrorsMessages.OptionValueIsNotAmongAllowedAlternatives.TemplateParameters
        ) => string;
      }>;

      unparsableNumericOptionValue: Readonly<{
        generate: (
          templateParameters: Localization.ErrorsMessages.UnparsableNumericOptionValue.TemplateParameters
        ) => string;
      }>;

      numericOptionValueIsNotBelongToExpectedNumbersSet: Readonly<{
        generate: (
          templateParameters: Localization.ErrorsMessages.NumericOptionValueIsNotBelongToExpectedNumbersSet.TemplateParameters
        ) => string;
      }>;

      numericValueIsSmallerThanRequiredMinimum: Readonly<{
        generate: (
          templateParameters: Localization.ErrorsMessages.NumericValueIsSmallerThanRequiredMinimum.TemplateParameters
        ) => string;
      }>;

      numericValueIsGreaterThanAllowedMaximum: Readonly<{
        generate: (
          templateParameters: Localization.ErrorsMessages.NumericValueIsGreaterThanAllowedMaximum.TemplateParameters
        ) => string;
      }>;

      malformedJSON5_Option: Readonly<{
        generate: (
          templateParameters: Localization.ErrorsMessages.MalformedJSON5_Option.TemplateParameters
        ) => string;
      }>;

      JSON5_OptionDoesNotMatchWithValidDataSchema: Readonly<{
        generate: (
          templateParameters: Localization.ErrorsMessages.JSON5_OptionDoesNotMatchWithValidDataSchema.TemplateParameters
        ) => string;
      }>;

    };
  }>;


  export namespace Localization {

    export type HelpReference = Readonly<{

      defaultCommand: string;

      options: string;

      shortcut: string;

      type: string;

      isRequired: string;

      yes: string;

      no: string;

      allowedAlternatives: string;

      numbersSet: Readonly<{
        key: string;
        generateValue: (numbersSet: RawObjectDataProcessor.NumbersSets) => string;
      }>;

      minimalValue: string;

      maximalValue: string;

      objectTypeValuePropertiesSpecification: string;

    }>;


    export namespace ErrorsMessages {

      export namespace ArgumentsVectorIsNotArray {
        export type TemplateParameters = Readonly<{ stringifiedActualValueOfArgumentsVector: string; }>;
      }

      export namespace RawArgumentsVectorHasNotEnoughElements {
        export type TemplateParameters = Readonly<{
          minimalElementsCountInArgumentsVector: number;
          actualElementsCountInArgumentsVector: number;
          stringifiedArgumentsVector: string;
        }>;
      }

      export namespace ArgumentsVectorHasNonStringElements {
        export type TemplateParameters = Readonly<{
          stringifiedFormattedNonStringArguments: string;
        }>;
      }

      export namespace NoDefaultCommandPhraseAvailable {
        export type TemplateParameters = Readonly<{ helpReference: string; }>;
      }

      export namespace FirstParameterLooksLikeCommandPhraseWhileNoCommandPhrasesAvailable {
        export type TemplateParameters = Readonly<{
          commandPhraseLikeArgument: string;
          helpReference: string;
        }>;
      }

      export namespace UnknownCommandPhrase {
        export type TemplateParameters = Readonly<{
          inputtedCommandPhrase: string;
          helpReference: string;
        }>;
      }

      export namespace UnknownOptionsFoundForSpecificCommand {
        export type TemplateParameters = Readonly<{
          commandPhrase?: string;
          formattedUnknownOptions: string;
          commandHelpReference: string;
        }>;
      }

      export namespace InvalidCommandOptionTypeAtSpecification {
        export type TemplateParameters = Readonly<{
          optionName: string;
          typeName: string;
        }>;
      }

      export namespace RequiredOptionKeyIsMissing {
        export type TemplateParameters = Readonly<{
          commandPhrase?: string;
          missingOptionKey: string;
          commandHelpReference: string;
        }>;
      }

      export namespace NoValueFollowingTheKeyOfNonBooleanOption {
        export type TemplateParameters = Readonly<{
          targetOptionKey: string;
          commandHelpReference: string;
        }>;
      }

      export namespace OptionValueIsNotAmongAllowedAlternatives {
        export type TemplateParameters = Readonly<{
          targetOptionKey: string;
          actualOptionValue: string;
          commandHelpReference: string;
        }>;
      }

      export namespace UnparsableNumericOptionValue {
        export type TemplateParameters = Readonly<{
          targetOptionKey: string;
          actualOptionValue: string;
          commandHelpReference: string;
        }>;
      }

      export namespace NumericOptionValueIsNotBelongToExpectedNumbersSet {
        export type TemplateParameters = Readonly<{
          targetOptionKey: string;
          expectedNumbersSet: RawObjectDataProcessor.NumbersSets;
          actualOptionValue: string;
          commandHelpReference: string;
        }>;
      }

      export namespace NumericValueIsSmallerThanRequiredMinimum {
        export type TemplateParameters = Readonly<{
          targetOptionKey: string;
          requiredMinimum: number;
          actualOptionValue: string;
          commandHelpReference: string;
        }>;
      }

      export namespace NumericValueIsGreaterThanAllowedMaximum {
        export type TemplateParameters = Readonly<{
          targetOptionKey: string;
          allowedMaximum: number;
          actualOptionValue: string;
          commandHelpReference: string;
        }>;
      }

      export namespace MalformedJSON5_Option {
        export type TemplateParameters = Readonly<{
          targetOptionKey: string;
          commandHelpReference: string;
        }>;
      }

      export namespace JSON5_OptionDoesNotMatchWithValidDataSchema {
        export type TemplateParameters = Readonly<{
          targetOptionKey: string;
          formattedValidationErrorsMessages: string;
        }>;
      }

    }

  }

}


export default ConsoleCommandsParser;
