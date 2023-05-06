/* --- Native utils ------------------------------------------------------------------------------------------------- */
import FileSystem from "fs";
import PromisfiedFileSystem from "fs/promises";

/* --- Third-party utils -------------------------------------------------------------------------------------------- */
import YAML from "yamljs";
import DotEnv from "dotenv";

/* --- YDEE core ---------------------------------------------------------------------------------------------------- */
import {
  RawObjectDataProcessor,
  Logger,
  InvalidParameterValueError,
  FileReadingFailedError,
  InvalidExternalDataError,
  isUndefined,
  isNotUndefined,
  isNull
} from "@yamato-daiwa/es-extensions";
import type { ParsedJSON } from "@yamato-daiwa/es-extensions";
import extractLastExtensionOfFileName from "../Temporary/extractLastExtensionOfFileName";

/* --- YDEE Node.js ------------------------------------------------------------------------------------------------- */
import isErrnoException from "../isErrnoException";
import FileNotFoundError from "../Errors/FileNotFoundError/FileNotFoundError";
import PathRefersToDirectoryNotFileError from
    "../Errors/PathRefersToDirectoryNotFileError/PathRefersToDirectoryNotFileError";

/* --- Localization ------------------------------------------------------------------------------------------------- */
import objectDataFilesProcessorLocalization__english from "./ObjectDataFilesProcessorLocalization.english";


abstract class ObjectDataFilesProcessor {

  public static localization: ObjectDataFilesProcessor.Localization = objectDataFilesProcessorLocalization__english;


  public static async processFile<ValidData extends ParsedJSON>(
    compoundParameter: Readonly<{
      filePath: string;
      validDataSpecification: RawObjectDataProcessor.ObjectDataSpecification;
      schema?: ObjectDataFilesProcessor.SupportedSchemas;
      synchronously: false;
    }>
  ): Promise<ValidData>;

  public static processFile<ValidData extends ParsedJSON>(
    compoundParameter: Readonly<{
      filePath: string;
      validDataSpecification: RawObjectDataProcessor.ObjectDataSpecification;
      schema?: ObjectDataFilesProcessor.SupportedSchemas;
      synchronously: true;
    }>
  ): ValidData;

  public static async processFile(
    compoundParameter: Readonly<{
      filePath: string;
      schema?: ObjectDataFilesProcessor.SupportedSchemas;
      synchronously: false;
    }>
  ): Promise<unknown>;

  public static processFile(
    compoundParameter: Readonly<{
      filePath: string;
      schema?: ObjectDataFilesProcessor.SupportedSchemas;
      synchronously: true;
    }>
  ): unknown;

  /* eslint-disable-next-line @typescript-eslint/promise-function-async --
  * This function returns or not returns the promise dependent of overloading. */
  public static processFile<ValidData extends ParsedJSON>(
    compoundParameter: Readonly<{
      filePath: string;
      validDataSpecification?: RawObjectDataProcessor.ObjectDataSpecification;
      schema?: ObjectDataFilesProcessor.SupportedSchemas;
      synchronously: boolean;
    }>
  /* eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents --
   * In this case (the implementation of the overloading) each alternative matters. */
  ): ValidData | unknown | Promise<ValidData> | Promise<unknown> {

    const filePath: string = compoundParameter.filePath;
    let dataSchema: ObjectDataFilesProcessor.SupportedSchemas;

    if (isNotUndefined(compoundParameter.schema)) {
      dataSchema = compoundParameter.schema;
    } else {

      const fileNameLastExtensionWithoutLeadingDot: string | null = extractLastExtensionOfFileName({
        targetPath: filePath, withLeadingDot: false
      });

      if (isNull(fileNameLastExtensionWithoutLeadingDot)) {
        Logger.throwErrorAndLog({
          errorInstance: new InvalidParameterValueError({
            parameterName: "compoundParameter",
            parameterNumber: 1,
            messageSpecificPart: ObjectDataFilesProcessor.localization.
                generateUnableToDecideDataParsingAlgorithmErrorMessage({ filePath })
          }),
          title: InvalidParameterValueError.localization.defaultTitle,
          occurrenceLocation: "ObjectDataFilesProcessor.processFile(compoundParameter)"
        });
      }


      switch (fileNameLastExtensionWithoutLeadingDot) {

        case "json": {
          dataSchema = ObjectDataFilesProcessor.SupportedSchemas.JSON;
          break;
        }

        case "yaml":
        case "yml": {
          dataSchema = ObjectDataFilesProcessor.SupportedSchemas.YAML;
          break;
        }

        case "env": {
          dataSchema = ObjectDataFilesProcessor.SupportedSchemas.DOTENV;
          break;
        }

        default: {

          Logger.throwErrorAndLog({
            errorInstance: new InvalidParameterValueError({
              parameterName: "compoundParameter.filePath",
              parameterNumber: 1,
              messageSpecificPart: ObjectDataFilesProcessor.localization.generateUnsupportedFileNameExtension({
                filePath, fileNameLastExtensionWithoutLeadingDot
              })
            }),
            title: InvalidParameterValueError.localization.defaultTitle,
            occurrenceLocation: "ObjectDataFilesProcessor.processFile(compoundParameter)"
          });

        }

      }

    }


    if (compoundParameter.synchronously) {
      return isNotUndefined(compoundParameter.validDataSpecification) ?
          ObjectDataFilesProcessor.parseRawData<ValidData>({
            rawData: ObjectDataFilesProcessor.extractRawRawDataSynchronously(filePath),
            validDataSpecification: compoundParameter.validDataSpecification,
            dataSchema,
            filePathForLogging: filePath
          }) :
          ObjectDataFilesProcessor.parseRawData({
            rawData: ObjectDataFilesProcessor.extractRawRawDataSynchronously(filePath),
            dataSchema,
            filePathForLogging: filePath
          });

    }


    return ObjectDataFilesProcessor.
        extractRawRawDataAsynchronously(filePath).
        then(
          /* eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents, @typescript-eslint/require-await --
           * In this case (the implementation of the overloading) each alternative matters.
           * There is no need in `await` keyword, but if to remove it, it will be the violation of
           * "@typescript-eslint/promise-function-async" rule. */
          async (rawData: string): Promise<ValidData | unknown> =>
              (isNotUndefined(compoundParameter.validDataSpecification) ?
                  ObjectDataFilesProcessor.parseRawData({
                    rawData,
                    validDataSpecification: compoundParameter.validDataSpecification,
                    dataSchema,
                    filePathForLogging: filePath
                  }) :
                  ObjectDataFilesProcessor.parseRawData({
                    rawData,
                    dataSchema,
                    filePathForLogging: filePath
                  }))

    );

  }


  private static extractRawRawDataSynchronously(filePath: string): string {

    const POTENTIAL_ERROR_OCCURRENCE_LOCATION: string = "ObjectDataFilesProcessor.processFile(compoundParameter)->" +
        "ObjectDataFilesProcessor.extractRawRawDataSynchronously(filePath)";

    let targetFileStatistics: FileSystem.Stats;

    try {

      targetFileStatistics = FileSystem.statSync(filePath);

    } catch (error: unknown) {

      if (isErrnoException(error) && error.code === "ENOENT") {
        Logger.throwErrorAndLog({
          errorInstance: new FileNotFoundError({ filePath }),
          title: FileNotFoundError.localization.defaultTitle,
          occurrenceLocation: POTENTIAL_ERROR_OCCURRENCE_LOCATION,
          wrappableError: error
        });
      }

      throw error;

    }


    if (!targetFileStatistics.isFile()) {
      Logger.throwErrorAndLog({
        errorInstance: new PathRefersToDirectoryNotFileError({ targetPath: filePath }),
        title: PathRefersToDirectoryNotFileError.localization.defaultTitle,
        occurrenceLocation: POTENTIAL_ERROR_OCCURRENCE_LOCATION
      });
    }


    let rawData: string;

    try {

      rawData = FileSystem.readFileSync(filePath, "utf-8");

    } catch (error: unknown) {
      Logger.throwErrorAndLog({
        errorInstance: new FileReadingFailedError({ filePath }),
        title: FileReadingFailedError.localization.defaultTitle,
        occurrenceLocation: POTENTIAL_ERROR_OCCURRENCE_LOCATION
      });
    }

    return rawData;

  }

  private static async extractRawRawDataAsynchronously(filePath: string): Promise<string> {

    const POTENTIAL_ERROR_OCCURRENCE_LOCATION: string = "ObjectDataFilesProcessor.processFile(compoundParameter)->" +
        "ObjectDataFilesProcessor.extractRawRawDataAsynchronously(filePath)";

    let targetFileStatistics: FileSystem.Stats;

    try {

      targetFileStatistics = await PromisfiedFileSystem.stat(filePath);

    } catch (error: unknown) {

      if (isErrnoException(error) && error.code === "ENOENT") {
        Logger.throwErrorAndLog({
          errorInstance: new FileNotFoundError({ filePath }),
          title: FileNotFoundError.localization.defaultTitle,
          occurrenceLocation: POTENTIAL_ERROR_OCCURRENCE_LOCATION,
          wrappableError: error
        });
      }

      throw error;

    }


    if (!targetFileStatistics.isFile()) {
      Logger.throwErrorAndLog({
        errorInstance: new PathRefersToDirectoryNotFileError({ targetPath: filePath }),
        title: PathRefersToDirectoryNotFileError.localization.defaultTitle,
        occurrenceLocation: POTENTIAL_ERROR_OCCURRENCE_LOCATION
      });
    }


    let rawData: string;

    try {

      rawData = await PromisfiedFileSystem.readFile(filePath, "utf-8");

    } catch (error: unknown) {
      Logger.throwErrorAndLog({
        errorInstance: new FileReadingFailedError({ filePath }),
        title: FileReadingFailedError.localization.defaultTitle,
        occurrenceLocation: POTENTIAL_ERROR_OCCURRENCE_LOCATION
      });
    }

    return rawData;

  }


  private static parseRawData<ValidData extends ParsedJSON>(
    {
      rawData,
      validDataSpecification,
      dataSchema,
      filePathForLogging
    }: Readonly<{
      rawData: string;
      validDataSpecification: RawObjectDataProcessor.ObjectDataSpecification;
      dataSchema: ObjectDataFilesProcessor.SupportedSchemas;
      filePathForLogging: string;
    }>
  ): ValidData;

  private static parseRawData(
    {
      rawData,
      dataSchema,
      filePathForLogging
    }: Readonly<{
      rawData: string;
      dataSchema: ObjectDataFilesProcessor.SupportedSchemas;
      filePathForLogging: string;
    }>
  ): unknown;

  private static parseRawData<ValidData extends ParsedJSON>(
    {
      rawData,
      validDataSpecification,
      dataSchema,
      filePathForLogging
    }: Readonly<{
      rawData: string;
      validDataSpecification?: RawObjectDataProcessor.ObjectDataSpecification;
      dataSchema: ObjectDataFilesProcessor.SupportedSchemas;
      filePathForLogging: string;
    }>
  /* eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents --
   * In this case (the implementation of the overloading) each alternative matters. */
  ): ValidData | unknown {

    const POTENTIAL_ERROR_OCCURRENCE_LOCATION: string = "ObjectDataFilesProcessor.processFile(compoundParameter)->" +
        "ObjectDataFilesProcessor.parseRawData(compoundParameter)";

    let parsedData: unknown;

    try {

      switch (dataSchema) {

        case ObjectDataFilesProcessor.SupportedSchemas.JSON: {
          parsedData = JSON.parse(rawData);
          break;
        }

        case ObjectDataFilesProcessor.SupportedSchemas.YAML: {
          parsedData = YAML.parse(rawData);
          break;
        }

        case ObjectDataFilesProcessor.SupportedSchemas.DOTENV: {
          parsedData = DotEnv.parse(rawData);
        }

      }

    } catch (error: unknown) {
      Logger.throwErrorAndLog({
        errorInstance: new InvalidExternalDataError({ mentionToExpectedData: filePathForLogging }),
        title: InvalidExternalDataError.localization.defaultTitle,
        occurrenceLocation: POTENTIAL_ERROR_OCCURRENCE_LOCATION,
        wrappableError: error
      });
    }


    if (isUndefined(validDataSpecification)) {
      return parsedData;
    }


    const processingResult: RawObjectDataProcessor.ProcessingResult<ValidData> =
        RawObjectDataProcessor.process(parsedData, validDataSpecification);

    if (processingResult.rawDataIsInvalid) {
      Logger.throwErrorAndLog({
        errorInstance: new InvalidExternalDataError({
          customMessage: `The contents of file '${ filePathForLogging }' does not matching with valid data specification:\n` +
              `${ RawObjectDataProcessor.formatValidationErrorsList(processingResult.validationErrorsMessages) }`
        }),
        title: InvalidExternalDataError.localization.defaultTitle,
        occurrenceLocation: POTENTIAL_ERROR_OCCURRENCE_LOCATION
      });
    }


    return processingResult.processedData;

  }

}


namespace ObjectDataFilesProcessor {

  export enum SupportedSchemas {
    JSON = "JSON",
    /* eslint-disable-next-line @typescript-eslint/no-shadow --
     * The declaring of type/interface inside namespace with same name as defined in upper scope
     * is completely valid TypeScript and not desired to be warned by @typescript-eslint. */
    YAML = "YAML",
    DOTENV = "DOTENV"
  }

  export type Localization = Readonly<{

    generateUnableToDecideDataParsingAlgorithmErrorMessage: (
      templateVariables: Localization.UnableToDecideDataParsingAlgorithmErrorMessage.TemplateVariables
    ) => string;

    generateUnsupportedFileNameExtension: (
      templateVariables: Localization.UnsupportedFileNameExtensionErrorMessage.TemplateVariables
    ) => string;

  }>;

  export namespace Localization {

    export namespace UnableToDecideDataParsingAlgorithmErrorMessage {
      export type TemplateVariables = Readonly<{
        filePath: string;
      }>;
    }

    export namespace UnsupportedFileNameExtensionErrorMessage {
      export type TemplateVariables = Readonly<{
        filePath: string;
        fileNameLastExtensionWithoutLeadingDot: string;
      }>;
    }

  }

}


export default ObjectDataFilesProcessor;
