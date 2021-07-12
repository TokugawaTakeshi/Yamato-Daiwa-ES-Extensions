export default function insertSubstring(targetSubstring: string | null | undefined, options?: {
    condition?: boolean;
    modifier?: (targetSubstring: string) => string;
}): string;
