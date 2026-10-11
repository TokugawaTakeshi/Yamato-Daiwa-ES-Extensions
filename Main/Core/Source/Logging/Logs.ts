export type Log = Readonly<{
  badge?: Readonly<{ customText: string; }> | false;
  title: string;
  description: string;
  additionalData?: unknown;
  compactLayout?: boolean;
  mustOutputIf?: boolean;
}>;


export type ErrorLog =
  Log &
  Readonly<{
    errorType: string;
    occurrenceLocation: string;
    caughtError?: unknown;
  }>;

export type ThrownErrorLog<CustomError extends Error = Error> =
    Omit<Log, "description" | "customBadgeText"> &
    (
      Readonly<{ errorInstance: CustomError; }> |
      Readonly<{
        errorType: string;
        description: string;
      }>
    ) &
    Readonly<{
      occurrenceLocation: string;
      innerError?: unknown;
    }>;


export type WarningLog = Log & Readonly<{ occurrenceLocation?: string; }>;

export type SuccessLog = Log;

export type InfoLog = Log;
