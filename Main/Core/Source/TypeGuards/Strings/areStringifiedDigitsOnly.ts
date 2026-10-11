export default function areStringifiedDigitsOnly(potentialString: unknown): potentialString is string;

export default function areStringifiedDigitsOnly(definiteString: string): boolean;


export default function areStringifiedDigitsOnly(potentialString: unknown): potentialString is string {
  return typeof potentialString === "string" && (/^\d+$/u).test(potentialString);
}
