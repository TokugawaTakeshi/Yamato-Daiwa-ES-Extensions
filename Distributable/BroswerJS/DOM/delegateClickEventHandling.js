"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isNotNull_1 = require("../../TypeGuards/Nullables/isNotNull");
function delegateClickEventHandling({ clickTargetSelector, container = document }, handler) {
    container.addEventListener("click", (event) => {
        if (!(event instanceof MouseEvent)) {
            return;
        }
        for (let targetParentNode = event.target; isNotNull_1.default(targetParentNode) && targetParentNode !== event.currentTarget; targetParentNode = targetParentNode.parentNode) {
            if (targetParentNode.matches(clickTargetSelector)) {
                handler(event);
            }
        }
    }, false);
}
exports.default = delegateClickEventHandling;
