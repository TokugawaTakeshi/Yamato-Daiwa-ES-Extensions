export default function delegateClickEventHandling({ clickTargetSelector, container }: {
    clickTargetSelector: string;
    container: HTMLElement | Document;
}, handler: (event: MouseEvent) => void): void;
