export default function insertSubstring(targetSubstring, options = {}) {
    if (typeof targetSubstring === "undefined" || targetSubstring === null) {
        return "";
    }
    if (options.condition === false) {
        return "";
    }
    return typeof options.modifier === "undefined" ? targetSubstring : options.modifier(targetSubstring);
}
