import isArbitraryObject from "../TypeGuards/Objects/isArbitraryObject";
import InvalidParameterValueError from "../Errors/InvalidParameterValue/InvalidParameterValueError";
import Logger from "../Logging/Logger";
import isString from "../TypeGuards/Strings/isString";


export default function isIPv4AddressLiesInRange(
  compoundParameter: Readonly<{
    comparedIP_Address: string;
    minimalIP_Address: string;
    maximalIP_Address: string;
  }>
): boolean {

  if (!isArbitraryObject(compoundParameter)) {
    Logger.throwErrorAndLog({
      errorInstance: new InvalidParameterValueError({
        parameterNumber: 1,
        parameterName: "compoundParameter",
        messageSpecificPart: "The first and only parameter must be an object type."
      }),
      title: InvalidParameterValueError.localization.defaultTitle,
      occurrenceLocation: "isIPv4AddressLiesInRange(compoundParameter)"
    });
  }


  if (!isString(compoundParameter.comparedIP_Address)) {
    Logger.throwErrorAndLog({
      errorInstance: new InvalidParameterValueError({
        parameterNumber: 1,
        parameterName: "compoundParameter.comparedIP_Address",
        messageSpecificPart: "The \"comparedIP_Address\" must be a string while actually has type " +
            `${ typeof compoundParameter.comparedIP_Address }`
      }),
      title: InvalidParameterValueError.localization.defaultTitle,
      occurrenceLocation: "isIPv4AddressLiesInRange(compoundParameter)"
    });
  }


  if (!isString(compoundParameter.minimalIP_Address)) {
    Logger.throwErrorAndLog({
      errorInstance: new InvalidParameterValueError({
        parameterNumber: 1,
        parameterName: "compoundParameter.minimalIP_Address",
        messageSpecificPart: "The \"minimalIP_Address\" must be a string while actually has type " +
            `${ typeof compoundParameter.minimalIP_Address }`
      }),
      title: InvalidParameterValueError.localization.defaultTitle,
      occurrenceLocation: "isIPv4AddressLiesInRange(compoundParameter)"
    });
  }


  if (!isString(compoundParameter.maximalIP_Address)) {
    Logger.throwErrorAndLog({
      errorInstance: new InvalidParameterValueError({
        parameterNumber: 1,
        parameterName: "maximalIP_Address.minimalIP_Address",
        messageSpecificPart: "The \"maximalIP_Address\" must be a string while actually has type " +
            `${ typeof compoundParameter.maximalIP_Address }`
      }),
      title: InvalidParameterValueError.localization.defaultTitle,
      occurrenceLocation: "isIPv4AddressLiesInRange(compoundParameter)"
    });
  }


  const VALID_IP_ADDRESS_PATTERN: RegExp = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/u;

  if (!VALID_IP_ADDRESS_PATTERN.test(compoundParameter.comparedIP_Address)) {
    Logger.throwErrorAndLog({
      errorInstance: new InvalidParameterValueError({
        parameterNumber: 1,
        parameterName: "compoundParameter.comparedIP_Address",
        messageSpecificPart: `The value "${ compoundParameter.comparedIP_Address }" of 'comparedIP_Address' is not a` +
            "valid IPv4 address."
      }),
      title: InvalidParameterValueError.localization.defaultTitle,
      occurrenceLocation: "isIPv4AddressLiesInRange(compoundParameter)"
    });
  }


  if (!VALID_IP_ADDRESS_PATTERN.test(compoundParameter.minimalIP_Address)) {
    Logger.throwErrorAndLog({
      errorInstance: new InvalidParameterValueError({
        parameterNumber: 1,
        parameterName: "compoundParameter.minimalIP_Address",
        messageSpecificPart: `The value "${ compoundParameter.minimalIP_Address }" of 'minimalIP_Address' is not a ` +
            "valid IPv4 address."
      }),
      title: InvalidParameterValueError.localization.defaultTitle,
      occurrenceLocation: "isIPv4AddressLiesInRange(compoundParameter)"
    });
  }


  if (!VALID_IP_ADDRESS_PATTERN.test(compoundParameter.maximalIP_Address)) {
    Logger.throwErrorAndLog({
      errorInstance: new InvalidParameterValueError({
        parameterNumber: 1,
        parameterName: "compoundParameter.maximalIP_Address",
        messageSpecificPart: `The value "${ compoundParameter.maximalIP_Address }" of "maximalIP_Address" is not a ` +
            "valid IPv4 address."
      }),
      title: InvalidParameterValueError.localization.defaultTitle,
      occurrenceLocation: "isIPv4AddressLiesInRange(compoundParameter)"
    });
  }


  function IPv4AddressToNumber(IPv4Address: string): number {

    const CHARACTERS_COUNT_WHICH_WILL_BE_REMOVED_FROM_THE_START_OF_IP_ADDRESS_OCTET: number = 3;

    return Number(
      IPv4Address.split(".").
          map(
            (stringifiedDigits: string): string => `000${ stringifiedDigits }`.
                substring(CHARACTERS_COUNT_WHICH_WILL_BE_REMOVED_FROM_THE_START_OF_IP_ADDRESS_OCTET)
          ).
          join("")
    );
  }

  return IPv4AddressToNumber(compoundParameter.comparedIP_Address) >= IPv4AddressToNumber(compoundParameter.minimalIP_Address) &&
      IPv4AddressToNumber(compoundParameter.comparedIP_Address) <= IPv4AddressToNumber(compoundParameter.maximalIP_Address);

}
