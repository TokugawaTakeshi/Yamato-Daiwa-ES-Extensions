import { Logger, UnexpectedEventError } from "@yamato-daiwa/es-extensions";
import { ConsoleApplicationLogger } from "../../Source";


Logger.setImplementation(ConsoleApplicationLogger);

try {
  throw new Error("Example error");
} catch (error: unknown) {
  Logger.throwErrorAndLog({
    errorInstance: new UnexpectedEventError("'foo' is 'null'. With correctly working validation it could not be."),
    title: UnexpectedEventError.localization.defaultTitle,
    occurrenceLocation: "className.methodName(parametersObject)",
    wrappableError: error,
    additionalData: {
      foo: null,
      bar: "bravo"
    }
  });
}


try {
  throw new Error("Example error");
} catch (error: unknown) {

  Logger.logError({
    errorType: UnexpectedEventError.NAME,
    title: UnexpectedEventError.localization.defaultTitle,
    description: "'foo' is 'null'. With correctly working validation it could not be.",
    occurrenceLocation: "className.methodName(parametersObject)",

    customBadgeText: "Exception",
    caughtError: error,
    additionalData: {
      foo: null,
      bar: "bravo"
    }
  });
}


Logger.logErrorLikeMessage({
  title: UnexpectedEventError.localization.defaultTitle,
  description: "'foo' is 'null'. With correctly working validation it could not be.",
  customBadgeText: "Exception",
  additionalData: {
    foo: null,
    bar: "bravo"
  }
});


Logger.logWarning({
  customBadgeText: "Caution",
  title: UnexpectedEventError.localization.defaultTitle,
  occurrenceLocation: "className.methodName(parametersObject)",
  description: "'foo' is 'null'. With correctly working validation it could not be.",
  additionalData: {
    foo: null,
    bar: "bravo"
  }
});


Logger.logSuccess({
  title: "Sign in success",
  description: "Successfully signed in.",
  customBadgeText: "Normal operation",
  additionalData: {
    ID: "123456",
    userName: "Takeshi Tokugawa"
  }
});


Logger.logInfo({
  customBadgeText: "Output",
  title: "Data logging",
  description: "'foo' is 'null'.",
  additionalData: {
    foo: null,
    bar: "bravo"
  }
});
