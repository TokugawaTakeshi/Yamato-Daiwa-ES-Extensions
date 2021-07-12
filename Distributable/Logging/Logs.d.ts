export declare type Log = {
    customBadgeText?: string;
    title: string;
    description: string;
    additionalData?: {
        [key: string]: unknown;
    };
};
export declare type ErrorLog = Log & {
    errorType: string;
    occurrenceLocation: string;
    caughtError?: unknown;
};
export declare type ThrownErrorLog<CustomError extends Error = Error> = Omit<Log, "description" | "customBadgeText"> & ({
    errorInstance: CustomError;
} | {
    errorType: string;
    description: string;
}) & {
    occurrenceLocation: string;
    wrappableError?: unknown;
};
export declare type WarningLog = Log & {
    occurrenceLocation?: string;
};
export declare type SuccessLog = Log;
export declare type InfoLog = Log;
