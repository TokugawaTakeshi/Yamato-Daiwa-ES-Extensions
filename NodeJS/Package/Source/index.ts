/*!
 * @yamato-daiwa/es-extensions-nodejs v1.5
 * (c) 2021 Sole proprietorship "Yamato Daiwa" Takeshi Tokugawa
 * Released under the MIT License.
 */

export { default as NodeJS_Timer } from "./DateTime/NodeJS_Timer";
export { default as ConsoleApplicationLogger } from "./ConsoleApplicationLogger";
export { default as ConsoleCommandsParser } from "./ConsoleCommandsParser/ConsoleCommandsParser";

export { default as InvalidConsoleCommandError } from "./Errors/InvalidConsoleCommand/InvalidConsoleCommandError";
export { default as InterProcessInteractionFailedError } from
    "./Errors/InterProcessInteractionFailed/InterProcessInteractionFailedError";

export { default as isErrnoException } from "./isErrnoException";
