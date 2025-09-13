export default function isNonEmptyString(potentialString: unknown): potentialString is string;

export default function isNonEmptyString(definiteString: string): boolean;


export default function isNonEmptyString(potentialString: unknown): potentialString is string {
  return typeof potentialString === "string" && potentialString.length > 0;
}
