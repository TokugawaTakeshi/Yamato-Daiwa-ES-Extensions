/* ─── Third-party Utils ──────────────────────────────────────────────────────────────────────────────────────────── */
import JSON5 from "json5";

/* ─── YDEE Core ──────────────────────────────────────────────────────────────────────────────────────────────────── */
import {
  RawObjectDataProcessor,
  InvalidExternalDataError,
  Logger,
  stringifyAndFormatArbitraryValue,
  insertSubstring,
  isNaturalNumber,
  isNegativeInteger,
  isNaturalNumberOrZero,
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

/* ─── YDEE Node.js ───────────────────────────────────────────────────────────────────────────────────────────────── */
import InvalidConsoleCommandError from "../Errors/InvalidConsoleCommand/InvalidConsoleCommandError";
import IndentationCoordinator from "../Temporary/IndentationCoordinator";

/* ─── Localization ───────────────────────────────────────────────────────────────────────────────────────────────── */
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
  private readonly isTargetCommandPhraseDefault: boolean;

  private readonly targetCommandOptions?: ReadonlyArray<string | undefined>;
  private readonly targetCommandOptionsWhichHasNotBeenProcessedYet: Array<string | undefined> = [];
  private readonly targetCommandOptionsSpecification?: ConsoleCommandsParser.CommandOptionsSpecification;


  /* ━━━ Public Methods ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
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
      ...dataHoldingSelfInstance.parseOptionsAndParameters()
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


    const commandPhrasesReferences: Array<string> = [];

    for (
      const [ commandPhrase, commandPhraseSpecification ] of
          Object.entries(commandLineInterfaceSpecification.commandPhrases)
    ) {
      commandPhrasesReferences.push(
        this.generateSingleCommandPhraseHelpReference({
          commandPhrase,
          commandPhraseSpecification: { ...commandPhraseSpecification, isDefault: commandPhraseSpecification.isDefault === true }
        })
      );
    }

    textSegments.push("\n\n", commandPhrasesReferences.join("\n\n"));

    return textSegments.join("");

  }


  /* ━━━ Constructor ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
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

    let defaultCommandPhrase: Readonly<{
      name: string;
      specification: ConsoleCommandsParser.CommandPhraseSpecification;
    }> | undefined;

    for (
      const [ commandPhrase, commandPhraseSpecification ] of
          Object.entries(commandLineInterfaceSpecification.commandPhrases)
    ) {

      if (commandPhraseSpecification.isDefault === true) {
        defaultCommandPhrase = { name: commandPhrase, specification: commandPhraseSpecification };
        break;
      }

    }

    let targetCommandPhrase: string;
    let targetCommandPhraseDescription: string | undefined;
    let targetCommandOptions: Array<string | undefined> | undefined;
    let optionsSpecificationForRecognizedCommandPhrase: ConsoleCommandsParser.CommandOptionsSpecification | undefined;

    /* [ Command example ] > webpack
    * This command will be converted to 3 arguments - "NodeJS_InterpreterAbsolutePath", "executableFileAbsolutePath"
    *   and "webpack". This truthy conditions also means that there no subsequent arguments. */
    if (isUndefined(firstConsciouslyInputtedArgument)) {

      if (isUndefined(defaultCommandPhrase)) {
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

      targetCommandPhrase = defaultCommandPhrase.name;
      targetCommandPhraseDescription = defaultCommandPhrase.specification.description;
      optionsSpecificationForRecognizedCommandPhrase = defaultCommandPhrase.specification.options ?? {};

    } else if (ConsoleCommandsParser.isCommandArgumentTheOption(firstConsciouslyInputtedArgument)) {

      if (isUndefined(defaultCommandPhrase)) {
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


      targetCommandPhrase = defaultCommandPhrase.name;
      targetCommandPhraseDescription = defaultCommandPhrase.specification.description;
      optionsSpecificationForRecognizedCommandPhrase = defaultCommandPhrase.specification.options ?? {};
      targetCommandOptions = [ ...consciouslyInputtedArguments ];

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
    this.isTargetCommandPhraseDefault = this.targetCommandPhrase === defaultCommandPhrase?.name;
    this.targetCommandOptions = targetCommandOptions;
    this.targetCommandOptionsSpecification = optionsSpecificationForRecognizedCommandPhrase;

  }


  /* ━━━ Private Methods ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  /* ─── Parsing ──────────────────────────────────────────────────────────────────────────────────────────────────── */
  private parseOptionsAndParameters(): TargetCommandsAndOptionsCombinations {

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

        if ("defaultValue" in optionSpecification) {
          parsedOptions[optionName] = optionSpecification.defaultValue;
          continue;
        }


        if ("required" in optionSpecification && optionSpecification.required) {
          Logger.throwErrorAndLog({
            errorInstance: new InvalidConsoleCommandError({
              applicationName: this.applicationName,
              messageSpecificPart: ConsoleCommandsParser.localization.errorsMessages.requiredOptionKeyIsMissing.generate({
                commandPhrase: this.targetCommandPhrase,
                isDefaultCommandPhrase: this.isTargetCommandPhraseDefault,
                missingOptionKey: optionKeyWithLeading2NDashes,
                commandHelpReference: ConsoleCommandsParser.generateSingleCommandPhraseHelpReference({
                  commandPhrase: this.targetCommandPhrase,
                  commandPhraseSpecification: {
                    isDefault: this.isTargetCommandPhraseDefault,
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
                    commandPhrase: this.targetCommandPhrase,
                    commandPhraseSpecification: {
                      isDefault: this.isTargetCommandPhraseDefault,
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
              commandPhrase: this.targetCommandPhrase,
              commandPhraseSpecification: {
                isDefault: this.isTargetCommandPhraseDefault,
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
                  commandPhraseSpecification: {
                    isDefault: this.isTargetCommandPhraseDefault,
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
              commandPhrase: this.targetCommandPhrase,
              commandPhraseSpecification: {
                isDefault: this.isTargetCommandPhraseDefault,
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


    let isOptionValueMatchingWithExpectedNumberSet: boolean;

    switch (numbersSet) {

      case RawObjectDataProcessor.NumbersSets.naturalNumber: {
        isOptionValueMatchingWithExpectedNumberSet = isNaturalNumber(targetOptionParsedValue);
        break;
      }

      case RawObjectDataProcessor.NumbersSets.naturalNumberOrZero:
      case RawObjectDataProcessor.NumbersSets.positiveIntegerOrZero: {
        isOptionValueMatchingWithExpectedNumberSet = isNaturalNumberOrZero(targetOptionParsedValue);
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

      case RawObjectDataProcessor.NumbersSets.positiveDecimalFractionOrZero: {
        isOptionValueMatchingWithExpectedNumberSet =
            isPositiveDecimalFraction(targetOptionParsedValue) || targetOptionParsedValue === 0;
        break;
      }

      case RawObjectDataProcessor.NumbersSets.negativeDecimalFraction: {
        isOptionValueMatchingWithExpectedNumberSet = isNegativeDecimalFraction(targetOptionParsedValue);
        break;
      }

      case RawObjectDataProcessor.NumbersSets.negativeDecimalFractionOrZero: {
        isOptionValueMatchingWithExpectedNumberSet =
            isNegativeDecimalFraction(targetOptionParsedValue) || targetOptionParsedValue === 0;
        break;
      }

      case RawObjectDataProcessor.NumbersSets.anyDecimalFraction: {
        isOptionValueMatchingWithExpectedNumberSet = isDecimalFractionOfAnySign(targetOptionParsedValue);
        break;
      }

      case RawObjectDataProcessor.NumbersSets.anyDecimalFractionOrZero: {
        isOptionValueMatchingWithExpectedNumberSet =
            isDecimalFractionOfAnySign(targetOptionParsedValue) || targetOptionParsedValue === 0;
        break;
      }

      case RawObjectDataProcessor.NumbersSets.anyRealNumber: {
        isOptionValueMatchingWithExpectedNumberSet = true;
        break;
      }

      case RawObjectDataProcessor.NumbersSets.positiveRealNumber: {
        isOptionValueMatchingWithExpectedNumberSet = targetOptionParsedValue > 0;
        break;
      }

      case RawObjectDataProcessor.NumbersSets.negativeRealNumber: {
        isOptionValueMatchingWithExpectedNumberSet = targetOptionParsedValue < 0;
        break;
      }

      case RawObjectDataProcessor.NumbersSets.positiveRealNumberOrZero: {
        isOptionValueMatchingWithExpectedNumberSet = targetOptionParsedValue >= 0;
        break;
      }

      case RawObjectDataProcessor.NumbersSets.negativeRealNumberOrZero: {
        isOptionValueMatchingWithExpectedNumberSet = targetOptionParsedValue <= 0;
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
                  commandPhraseSpecification: {
                    isDefault: this.isTargetCommandPhraseDefault,
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
                  commandPhraseSpecification: {
                    isDefault: this.isTargetCommandPhraseDefault,
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
                  commandPhraseSpecification: {
                    isDefault: this.isTargetCommandPhraseDefault,
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
              commandPhrase: this.targetCommandPhrase,
              commandPhraseSpecification: {
                isDefault: this.isTargetCommandPhraseDefault,
                description: this.targetCommandPhraseDescription,
                options: this.targetCommandOptionsSpecification
              }
            })
          })
        }),
        title: InvalidConsoleCommandError.localization.defaultTitle,
        occurrenceLocation: ConsoleCommandsParser.PARSING_METHOD_INVOCATION_EXPRESSION,
        innerError: error
      });
    }


    const validationResult: RawObjectDataProcessor.ProcessingResult<ParsedJSON> = RawObjectDataProcessor.
        process<ParsedJSON>(
          targetParameterParsedValue,
          {
            nameForLogging: optionKeyWithLeading2NDashes,
            subtype: RawObjectDataProcessor.ObjectSubtypes.fixedSchema,
            properties: optionSpecification.validValueSpecification
          }
        );

    if (validationResult.isRawDataInvalid) {
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


  /* ─── Help Reference ───────────────────────────────────────────────────────────────────────────────────────────── */
  private static generateSingleCommandPhraseHelpReference(
    {
      commandPhrase,
      commandPhraseSpecification
    }: Readonly<{
      commandPhrase: string;
      commandPhraseSpecification:
          ConsoleCommandsParser.CommandPhraseSpecification &
          Required<Pick<ConsoleCommandsParser.CommandPhraseSpecification, "isDefault">>;
    }>
  ): string {

    const indentationCoordinator: IndentationCoordinator = new IndentationCoordinator();

    const textSegments: Array<string> = [
      `● ${ commandPhrase }${
        insertSubstring(
          ConsoleCommandsParser.localization.helpReference.defaultCommandPhrase__parenthetical,
          {
            condition: commandPhraseSpecification.isDefault,
            modifier: (defaultCommandPhrase__parenthetical: string): string => ` ${ defaultCommandPhrase__parenthetical }`
          }
        ) 
      }\n`
    ];

    if (isNonEmptyString(commandPhraseSpecification.description)) {
      textSegments.push(
        indentationCoordinator.insertIncrementedIndentWithoutUpdatingOfIndentationMultiplier() +
            commandPhraseSpecification.description
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
          (commandOptionSpecification.required ? helpReferenceLocalization.yes : helpReferenceLocalization.no)
      );
    } else if ("defaultValue" in commandOptionSpecification) {
      textSegments.push(
        `\n${ indentationCoordinator.insertIndent() }◯ ${ helpReferenceLocalization.defaultValue }: ` +
          stringifyAndFormatArbitraryValue(commandOptionSpecification.defaultValue)
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
            commandOptionSpecification.allowedAlternatives.
                map(
                  (allowedAlternative: string): string =>
                      `\n${ indentationCoordinator.insertIndent() }◆ ${ allowedAlternative }`
                ).
                join("")
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
          indentationCoordinator.addCurrentIndentationToEachLineOf(
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

    const specificationsOfCommandsMarkedAsDefault: {
      [commandPhrase: string]: ConsoleCommandsParser.CommandPhraseSpecification;
    } = Object.entries(commandLineInterfaceSpecification.commandPhrases).
        reduce(
          (
            _specificationsOfCommandsMarkedAsDefault: {
              [commandPhrase: string]: ConsoleCommandsParser.CommandPhraseSpecification;
            },
            [ commandPhrase, commandPhraseSpecification ]: [ string, ConsoleCommandsParser.CommandPhraseSpecification ]
           ): { [commandPhrase: string]: ConsoleCommandsParser.CommandPhraseSpecification; } => {

            if (commandPhraseSpecification.isDefault === true) {
              _specificationsOfCommandsMarkedAsDefault[commandPhrase] = commandPhraseSpecification;
            }

            return _specificationsOfCommandsMarkedAsDefault;

          },
          {}
        );

    if (
      Object.entries(specificationsOfCommandsMarkedAsDefault).length > 1
    ) {
      Logger.throwErrorAndLog({
        errorType: "InvalidConsoleCommandSpecification",
        title: "Invalid console command specification",
        description: ConsoleCommandsParser.localization.errorsMessages.moreThanOneCommandPhrasesMarkedAsDefault.generate({
          formattedListOfCommandsPhrasesMarkedAsDefault: Object.
              keys(specificationsOfCommandsMarkedAsDefault).
              map((commandPhrase: string): string => `● ${ commandPhrase }`).
              join("\n")
        }),
        occurrenceLocation: "ConsoleCommandsParser.validateCommandLineInterfaceSpecification(commandLineInterfaceSpecification)"
      });
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
      Readonly<{
        description?: string;
        shortcut?: string;
        newName?: string;
      }> &
      (
        StringOptionSpecification |
        NumberOptionSpecification |
        BooleanParameterSpecification |
        JSON5_ParameterSpecification
      );


  export type StringOptionSpecification =
      Readonly<{
        /* eslint-disable-next-line id-denylist --
         * The "id-denylist" is not unsolicited for object properties, but the applying to add respective option
         * has been denied. https://github.com/eslint/eslint/issues/15504 */
        type: ParametersTypes.string;
        allowedAlternatives?: ReadonlyArray<string>;
      }> &
      (
        Readonly<{ required: boolean; }> |
        Readonly<{ defaultValue: string; }>
      );

  export type NumberOptionSpecification =
      Readonly<{
        type: ParametersTypes.number;
        numbersSet: RawObjectDataProcessor.NumbersSets;
        minimalValue?: number;
        maximalValue?: number;
      }> &
      (
        Readonly<{ required: boolean; }> |
        Readonly<{ defaultValue: number; }>
      );

  export type BooleanParameterSpecification = Readonly<{
    type: ParametersTypes.boolean;
  }>;

  export type JSON5_ParameterSpecification =
      Readonly<{
        type: ParametersTypes.JSON5;
        validValueSpecification: RawObjectDataProcessor.PropertiesSpecification;
      }> &
      (
        Readonly<{ required: boolean; }> |
        Readonly<{ defaultValue: ParsedJSON; }>
      );

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
          templateVariables: Localization.ErrorsMessages.ArgumentsVectorIsNotArray.TemplateVariables
        ) => string;
      }>;

      argumentsVectorHasNotEnoughElements: Readonly<{
        generate: (
          templateVariables: Localization.ErrorsMessages.RawArgumentsVectorHasNotEnoughElements.TemplateVariables
        ) => string;
      }>;

      argumentsVectorHasNonStringElements: Readonly<{
        generate: (
          templateVariables: Localization.ErrorsMessages.ArgumentsVectorHasNonStringElements.TemplateVariables
        ) => string;
      }>;

      moreThanOneCommandPhrasesMarkedAsDefault: Readonly<{
        generate: (
          templateVariables: Localization.ErrorsMessages.MoreThanOneCommandPhrasesMarkedAsDefault.TemplateVariables
        ) => string;
      }>;

      noDefaultCommandPhraseAvailable: Readonly<{
        generate: (
          templateVariables: Localization.ErrorsMessages.NoDefaultCommandPhraseAvailable.TemplateVariables
        ) => string;
      }>;

      firstParameterLooksLikeCommandPhraseWhileNoCommandPhrasesAvailable: Readonly<{
        generate: (
          templateVariables: Localization.ErrorsMessages.FirstParameterLooksLikeCommandPhraseWhileNoCommandPhrasesAvailable.
              TemplateVariables
        ) => string;
      }>;

      unknownCommandPhrase: Readonly<{
        generate: (templateVariables: Localization.ErrorsMessages.UnknownCommandPhrase.TemplateVariables) => string;
      }>;

      requiredOptionKeyIsMissing: Readonly<{
        generate: (
          templateVariables: Localization.ErrorsMessages.RequiredOptionKeyIsMissing.TemplateVariables
        ) => string;
      }>;

      noValueFollowingTheKeyOfNonBooleanOption: Readonly<{
        generate: (
          templateVariables: Localization.ErrorsMessages.NoValueFollowingTheKeyOfNonBooleanOption.TemplateVariables
        ) => string;
      }>;

      invalidCommandOptionTypeAtSpecification: Readonly<{
        generate: (
          templateVariables: Localization.ErrorsMessages.InvalidCommandOptionTypeAtSpecification.TemplateVariables
        ) => string;
      }>;

      unknownOptionsFoundForSpecificCommand: Readonly<{
        generate: (
          templateVariables: Localization.ErrorsMessages.UnknownOptionsFoundForSpecificCommand.TemplateVariables
        ) => string;
      }>;

      optionValueIsNotAmongAllowedAlternatives: Readonly<{
        generate: (
          templateVariables: Localization.ErrorsMessages.OptionValueIsNotAmongAllowedAlternatives.TemplateVariables
        ) => string;
      }>;

      unparsableNumericOptionValue: Readonly<{
        generate: (
          templateVariables: Localization.ErrorsMessages.UnparsableNumericOptionValue.TemplateVariables
        ) => string;
      }>;

      numericOptionValueIsNotBelongToExpectedNumbersSet: Readonly<{
        generate: (
          templateVariables: Localization.ErrorsMessages.NumericOptionValueIsNotBelongToExpectedNumbersSet.TemplateVariables
        ) => string;
      }>;

      numericValueIsSmallerThanRequiredMinimum: Readonly<{
        generate: (
          templateVariables: Localization.ErrorsMessages.NumericValueIsSmallerThanRequiredMinimum.TemplateVariables
        ) => string;
      }>;

      numericValueIsGreaterThanAllowedMaximum: Readonly<{
        generate: (
          templateVariables: Localization.ErrorsMessages.NumericValueIsGreaterThanAllowedMaximum.TemplateVariables
        ) => string;
      }>;

      malformedJSON5_Option: Readonly<{
        generate: (
          templateVariables: Localization.ErrorsMessages.MalformedJSON5_Option.TemplateVariables
        ) => string;
      }>;

      JSON5_OptionDoesNotMatchWithValidDataSchema: Readonly<{
        generate: (
          templateVariables: Localization.ErrorsMessages.JSON5_OptionDoesNotMatchWithValidDataSchema.TemplateVariables
        ) => string;
      }>;

    };
  }>;


  export namespace Localization {

    export type HelpReference = Readonly<{

      defaultCommandPhrase__parenthetical: string;

      options: string;

      shortcut: string;

      type: string;

      isRequired: string;

      defaultValue: string;

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
        export type TemplateVariables = Readonly<{ stringifiedActualValueOfArgumentsVector: string; }>;
      }

      export namespace RawArgumentsVectorHasNotEnoughElements {
        export type TemplateVariables = Readonly<{
          minimalElementsCountInArgumentsVector: number;
          actualElementsCountInArgumentsVector: number;
          stringifiedArgumentsVector: string;
        }>;
      }

      export namespace ArgumentsVectorHasNonStringElements {
        export type TemplateVariables = Readonly<{
          stringifiedFormattedNonStringArguments: string;
        }>;
      }

      export namespace MoreThanOneCommandPhrasesMarkedAsDefault {
        export type TemplateVariables = Readonly<{
          formattedListOfCommandsPhrasesMarkedAsDefault: string;
        }>;
      }

      export namespace NoDefaultCommandPhraseAvailable {
        export type TemplateVariables = Readonly<{ helpReference: string; }>;
      }

      export namespace FirstParameterLooksLikeCommandPhraseWhileNoCommandPhrasesAvailable {
        export type TemplateVariables = Readonly<{
          commandPhraseLikeArgument: string;
          helpReference: string;
        }>;
      }

      export namespace UnknownCommandPhrase {
        export type TemplateVariables = Readonly<{
          inputtedCommandPhrase: string;
          helpReference: string;
        }>;
      }

      export namespace UnknownOptionsFoundForSpecificCommand {
        export type TemplateVariables = Readonly<{
          commandPhrase?: string;
          formattedUnknownOptions: string;
          commandHelpReference: string;
        }>;
      }

      export namespace InvalidCommandOptionTypeAtSpecification {
        export type TemplateVariables = Readonly<{
          optionName: string;
          typeName: string;
        }>;
      }

      export namespace RequiredOptionKeyIsMissing {
        export type TemplateVariables = Readonly<{
          commandPhrase: string;
          isDefaultCommandPhrase: boolean;
          missingOptionKey: string;
          commandHelpReference: string;
        }>;
      }

      export namespace NoValueFollowingTheKeyOfNonBooleanOption {
        export type TemplateVariables = Readonly<{
          targetOptionKey: string;
          commandHelpReference: string;
        }>;
      }

      export namespace OptionValueIsNotAmongAllowedAlternatives {
        export type TemplateVariables = Readonly<{
          targetOptionKey: string;
          actualOptionValue: string;
          commandHelpReference: string;
        }>;
      }

      export namespace UnparsableNumericOptionValue {
        export type TemplateVariables = Readonly<{
          targetOptionKey: string;
          actualOptionValue: string;
          commandHelpReference: string;
        }>;
      }

      export namespace NumericOptionValueIsNotBelongToExpectedNumbersSet {
        export type TemplateVariables = Readonly<{
          targetOptionKey: string;
          expectedNumbersSet: RawObjectDataProcessor.NumbersSets;
          actualOptionValue: string;
          commandHelpReference: string;
        }>;
      }

      export namespace NumericValueIsSmallerThanRequiredMinimum {
        export type TemplateVariables = Readonly<{
          targetOptionKey: string;
          requiredMinimum: number;
          actualOptionValue: string;
          commandHelpReference: string;
        }>;
      }

      export namespace NumericValueIsGreaterThanAllowedMaximum {
        export type TemplateVariables = Readonly<{
          targetOptionKey: string;
          allowedMaximum: number;
          actualOptionValue: string;
          commandHelpReference: string;
        }>;
      }

      export namespace MalformedJSON5_Option {
        export type TemplateVariables = Readonly<{
          targetOptionKey: string;
          commandHelpReference: string;
        }>;
      }

      export namespace JSON5_OptionDoesNotMatchWithValidDataSchema {
        export type TemplateVariables = Readonly<{
          targetOptionKey: string;
          formattedValidationErrorsMessages: string;
        }>;
      }

    }

  }

}


export default ConsoleCommandsParser;
