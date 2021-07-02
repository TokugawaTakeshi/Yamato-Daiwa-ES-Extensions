export type Log = {
  customBadgeText?: string;
  title: string;
  description: string;
  additionalData?: { [key: string]: unknown; };
};


export type ErrorLog =
  Log &
  {
    errorType: string;
    occurrenceLocation: string;
    caughtError?: unknown;
  };

export type ThrownErrorLog<CustomError extends Error = Error> =
    Omit<Log, "description" | "customBadgeText"> &
    ({
      errorInstance: CustomError;
    } | {
      errorType: string;
      description: string;
    }) &
    {
      occurrenceLocation: string;
      wrappableError?: unknown;
    };


export type WarningLog = Log & { occurrenceLocation?: string; };

export type SuccessLog = Log;

export type InfoLog = Log;
