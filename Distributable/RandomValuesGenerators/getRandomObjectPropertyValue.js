"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getRandomArrayElement_1 = require("./getRandomArrayElement");
function getRandomObjectPropertyValue(targetObject) {
    return getRandomArrayElement_1.default(Object.values(targetObject));
}
exports.default = getRandomObjectPropertyValue;
