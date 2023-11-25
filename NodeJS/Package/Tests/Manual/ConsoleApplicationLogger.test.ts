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
    innerError: error,
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

    badge: { customText: "Exception" },
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
  badge: { customText: "Exception" },
  additionalData: {
    foo: null,
    bar: "bravo"
  }
});


Logger.logWarning({
  badge: { customText: "customBadgeText" },
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
  badge: { customText: "Normal operation" },
  additionalData: {
    ID: "123456",
    userName: "Takeshi Tokugawa"
  }
});


Logger.logInfo({
  badge: { customText: "Output" },
  title: "Data logging",
  description: "'foo' is 'null'.",
  additionalData: {
    foo: null,
    bar: "bravo"
  }
});


Logger.logError({
  errorType: UnexpectedEventError.NAME,
  title: UnexpectedEventError.localization.defaultTitle,
  description: "'foo' is 'null'. With correctly working validation it could" +
      `${ ConsoleApplicationLogger.highlightText(" not ") }be.`,
  occurrenceLocation: "className.methodName(parametersObject)",
  badge: { customText: "Exception" }
});
