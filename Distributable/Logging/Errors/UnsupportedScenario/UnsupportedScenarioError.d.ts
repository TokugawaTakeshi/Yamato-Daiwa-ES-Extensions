declare class UnsupportedScenarioError extends Error {
    static readonly NAME: string;
    static get DEFAULT_TITLE(): string;
    private static localization;
    static setLocalization(localization: UnsupportedScenarioError.Localization): void;
    constructor(message: string);
}
declare namespace UnsupportedScenarioError {
    type Localization = {
        readonly defaultTitle: string;
    };
}
export default UnsupportedScenarioError;
