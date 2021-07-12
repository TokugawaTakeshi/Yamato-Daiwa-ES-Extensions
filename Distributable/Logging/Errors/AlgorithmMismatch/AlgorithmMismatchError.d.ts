declare class AlgorithmMismatchError extends Error {
    static readonly NAME: string;
    static get DEFAULT_TITLE(): string;
    private static localization;
    static setLocalization(localization: AlgorithmMismatchError.Localization): void;
    constructor(message: string);
}
declare namespace AlgorithmMismatchError {
    type Localization = {
        readonly defaultTitle: string;
    };
}
export default AlgorithmMismatchError;
