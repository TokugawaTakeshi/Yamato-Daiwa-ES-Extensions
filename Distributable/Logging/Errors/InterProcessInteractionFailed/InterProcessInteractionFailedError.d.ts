declare class InterProcessInteractionFailedError extends Error {
    static readonly NAME: string;
    static get DEFAULT_TITLE(): string;
    private static localization;
    static setLocalization(localization: InterProcessInteractionFailedError.Localization): void;
    constructor(message: string);
}
declare namespace InterProcessInteractionFailedError {
    type Localization = {
        readonly defaultTitle: string;
    };
}
export default InterProcessInteractionFailedError;
