import isNotNull from "../../TypeGuards/Nullables/isNotNull";
export default function delegateClickEventHandling({ clickTargetSelector, container = document }, handler) {
    container.addEventListener("click", (event) => {
        if (!(event instanceof MouseEvent)) {
            return;
        }
        for (let targetParentNode = event.target; isNotNull(targetParentNode) && targetParentNode !== event.currentTarget; targetParentNode = targetParentNode.parentNode) {
            if (targetParentNode.matches(clickTargetSelector)) {
                handler(event);
            }
        }
    }, false);
}
