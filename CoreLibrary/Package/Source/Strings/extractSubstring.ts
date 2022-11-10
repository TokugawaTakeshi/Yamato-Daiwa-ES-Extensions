import Logger from "../Logging/Logger";
import InvalidParameterValueError from "../Errors/InvalidParameterValue/InvalidParameterValueError";


type Options =
    (
      { startingSymbolNumber__numerationFrom0: number; } |
      { startingSymbolNumber__numerationFrom1: number; }
    ) &
    (
      { lastSymbolNumber__numerationFrom0: number; } |
      { lastSymbolNumber__numerationFrom1: number; } |
      { substringLength: number; }
    ) &
    { fromEnd?: boolean; };


export default function extractSubstring(targetString: string, options: Options): string {

  let startingSymbolNumber__numerationFrom0: number;

  if ("startingSymbolNumber__numerationFrom0" in options) {
    if (options.fromEnd === true) {

      if (!Number.isInteger(options.startingSymbolNumber__numerationFrom0)) {
        Logger.throwErrorAndLog({
          errorInstance: new InvalidParameterValueError({
            customMessage: "'options.startingSymbolNumber__numerationFrom0'は整数であるべきが、実際の値は" +
                `${ options.startingSymbolNumber__numerationFrom0 }と成っている。`
          }),
          occurrenceLocation: "extractSubstring(targetString, options)",
          title: InvalidParameterValueError.localization.defaultTitle
        });
      }

      // TODO (1) должно быть целым числом (проверено), большим -1 и не больше чем length-1

      startingSymbolNumber__numerationFrom0 = targetString.length - options.startingSymbolNumber__numerationFrom0;
    } else {
      // TODO (1)
      startingSymbolNumber__numerationFrom0 = options.startingSymbolNumber__numerationFrom0;
    }
  } else if (options.fromEnd === true) {
    // TODO (2) должно быть целым числом больше 0 и не больше чем length
    startingSymbolNumber__numerationFrom0 = targetString.length - options.startingSymbolNumber__numerationFrom1 - 1;
  } else {
    // TODO (2)
    startingSymbolNumber__numerationFrom0 = options.startingSymbolNumber__numerationFrom1 - 1;
  }


  let lastSymbolNumber__numerationFrom1: number;

  if ("lastSymbolNumber__numerationFrom1" in options) {
    if (options.fromEnd === true) {
      // TODO (3) должно быть целым числом, большим -1 и не больше чем length-1, при этом бОльшим
      //  startingSymbolNumber__numerationFrom0 хотя бы на 1, причем когда больше на 1 подстрока будет пустой
      lastSymbolNumber__numerationFrom1 = targetString.length - options.lastSymbolNumber__numerationFrom1;
    } else {
      // TODO (3)
      lastSymbolNumber__numerationFrom1 = options.lastSymbolNumber__numerationFrom1;
    }
  } else if ("lastSymbolNumber__numerationFrom0" in options) {
    if (options.fromEnd === true) {
      // TODO (4) должно быть целым числом, большим -1 и не больше чем length-1, при этом бОльшим либо равным
      //  startingSymbolNumber__numerationFrom0, причем когда они равны подстрока будет пустой
      lastSymbolNumber__numerationFrom1 = targetString.length - options.lastSymbolNumber__numerationFrom0 - 1;
    } else {
      // TODO (4)
      lastSymbolNumber__numerationFrom1 = options.lastSymbolNumber__numerationFrom0 + 1;
    }
  } else if (options.fromEnd === true) {
    lastSymbolNumber__numerationFrom1 = startingSymbolNumber__numerationFrom0 - options.substringLength;
  } else {
    lastSymbolNumber__numerationFrom1 = startingSymbolNumber__numerationFrom0 + options.substringLength;
  }


  return Array.from(targetString).
      slice(startingSymbolNumber__numerationFrom0, lastSymbolNumber__numerationFrom1).
      join("");

}
