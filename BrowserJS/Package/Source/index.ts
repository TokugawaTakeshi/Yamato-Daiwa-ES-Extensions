/*!
 * @yamato-daiwa/es-extensions-browserjs v1.6
 * (c) 2021 Sole proprietorship "Yamato Daiwa" Takeshi Tokugawa
 * Released under the MIT License.
 */

/* === DateTime =============================================================================================================== */
export { default as BrowserJS_Timer } from "./DateTime/BrowserJS_Timer";

/* === DOM ==================================================================================================================== */
export { default as cloneDOM_Element } from "./DOM/cloneDOM_Element";
export { default as createDOM_ElementFromHTML_Code } from "./DOM/createDOM_ElementFromHTML_Code";
export { default as createHTML_CollectionFromHTML_Code } from "./DOM/createHTML_CollectionFromHTML_Code";
export { default as getExpectedToBeSingleDOM_Element } from "./DOM/getExpectedToBeSingleDOM_Element";
export { default as getExpectedToBeSingleChildOfTemplateElement } from "./DOM/getExpectedToBeSingleChildOfTemplateElement";

/* === Events handling ======================================================================================================== */
export { default as addInputEventHandler } from "./EventsHandling/addInputEventHandler";
export { default as addLeftClickEventHandler } from "./EventsHandling/addLeftClickEventHandler";
export { default as delegateClickEventHandling } from "./EventsHandling/delegateClickEventHandling";

/* === Logging ================================================================================================================ */
export { default as BasicFrontEndLogger } from "./Logging/BasicFrontEndLogger";
