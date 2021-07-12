declare class UnexpectedEventError extends Error {
    static readonly NAME: string;
    static get DEFAULT_TITLE(): string;
    private static localization;
    static setLocalization(localization: UnexpectedEventError.Localization): void;
    constructor(message: string);
}
declare namespace UnexpectedEventError {
    type Localization = {
        readonly defaultTitle: string;
    };
}
export default UnexpectedEventError;
