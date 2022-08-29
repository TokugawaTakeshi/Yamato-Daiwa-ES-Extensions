import isArbitraryObject from "../TypeGuards/Objects/isArbitraryObject";
import InvalidParameterValueError from "../Errors/InvalidParameterValue/InvalidParameterValueError";
import Logger from "../Logging/Logger";
import isString from "../TypeGuards/Strings/isString";


export default function isIPv4AddressLiesInRange(
  namedParameters: Readonly<{
    comparedIP_Address: string;
    minimalIP_Address: string;
    maximalIP_Address: string;
  }>
): boolean {

  if (!isArbitraryObject(namedParameters)) {
    Logger.throwErrorAndLog({
      errorInstance: new InvalidParameterValueError({
        parameterNumber: 1,
        parameterName: "namedParameters",
        messageSpecificPart: "The first and only parameter must be an object type."
      }),
      title: InvalidParameterValueError.localization.defaultTitle,
      occurrenceLocation: "isIPv4AddressLiesInRange(namedParameters)"
    });
  }


  if (!isString(namedParameters.comparedIP_Address)) {
    Logger.throwErrorAndLog({
      errorInstance: new InvalidParameterValueError({
        parameterNumber: 1,
        parameterName: "namedParameters.comparedIP_Address",
        messageSpecificPart: "The 'comparedIP_Address' must be a string while actually has type " +
            `${ typeof namedParameters.comparedIP_Address }`
      }),
      title: InvalidParameterValueError.localization.defaultTitle,
      occurrenceLocation: "isIPv4AddressLiesInRange(namedParameters)"
    });
  }


  if (!isString(namedParameters.minimalIP_Address)) {
    Logger.throwErrorAndLog({
      errorInstance: new InvalidParameterValueError({
        parameterNumber: 1,
        parameterName: "namedParameters.minimalIP_Address",
        messageSpecificPart: "The 'minimalIP_Address' must be a string while actually has type " +
            `${ typeof namedParameters.minimalIP_Address }`
      }),
      title: InvalidParameterValueError.localization.defaultTitle,
      occurrenceLocation: "isIPv4AddressLiesInRange(namedParameters)"
    });
  }


  if (!isString(namedParameters.maximalIP_Address)) {
    Logger.throwErrorAndLog({
      errorInstance: new InvalidParameterValueError({
        parameterNumber: 1,
        parameterName: "maximalIP_Address.minimalIP_Address",
        messageSpecificPart: "The 'maximalIP_Address' must be a string while actually has type " +
            `${ typeof namedParameters.maximalIP_Address }`
      }),
      title: InvalidParameterValueError.localization.defaultTitle,
      occurrenceLocation: "isIPv4AddressLiesInRange(namedParameters)"
    });
  }


  const VALID_IP_ADDRESS_PATTERN: RegExp = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/u;

  if (!VALID_IP_ADDRESS_PATTERN.test(namedParameters.comparedIP_Address)) {
    Logger.throwErrorAndLog({
      errorInstance: new InvalidParameterValueError({
        parameterNumber: 1,
        parameterName: "namedParameters.comparedIP_Address",
        messageSpecificPart: `The value '${ namedParameters.comparedIP_Address }' of 'comparedIP_Address' is not a` +
            "valid IPv4 address."
      }),
      title: InvalidParameterValueError.localization.defaultTitle,
      occurrenceLocation: "isIPv4AddressLiesInRange(namedParameters)"
    });
  }


  if (!VALID_IP_ADDRESS_PATTERN.test(namedParameters.minimalIP_Address)) {
    Logger.throwErrorAndLog({
      errorInstance: new InvalidParameterValueError({
        parameterNumber: 1,
        parameterName: "namedParameters.minimalIP_Address",
        messageSpecificPart: `The value '${ namedParameters.minimalIP_Address }' of 'minimalIP_Address' is not a ` +
            "valid IPv4 address."
      }),
      title: InvalidParameterValueError.localization.defaultTitle,
      occurrenceLocation: "isIPv4AddressLiesInRange(namedParameters)"
    });
  }


  if (!VALID_IP_ADDRESS_PATTERN.test(namedParameters.maximalIP_Address)) {
    Logger.throwErrorAndLog({
      errorInstance: new InvalidParameterValueError({
        parameterNumber: 1,
        parameterName: "namedParameters.maximalIP_Address",
        messageSpecificPart: `The value '${ namedParameters.maximalIP_Address }' of 'maximalIP_Address' is not a ` +
            "valid IPv4 address."
      }),
      title: InvalidParameterValueError.localization.defaultTitle,
      occurrenceLocation: "isIPv4AddressLiesInRange(namedParameters)"
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

  return IPv4AddressToNumber(namedParameters.comparedIP_Address) >= IPv4AddressToNumber(namedParameters.minimalIP_Address) &&
      IPv4AddressToNumber(namedParameters.comparedIP_Address) <= IPv4AddressToNumber(namedParameters.maximalIP_Address);
}
