declare class ImproperUsageError extends Error {
    static readonly NAME: string;
    static get DEFAULT_TITLE(): string;
    private static localization;
    static setLocalization(localization: ImproperUsageError.Localization): void;
    constructor(message: string);
}
declare namespace ImproperUsageError {
    type Localization = {
        readonly defaultTitle: string;
    };
}
export default ImproperUsageError;
