export default function isEmptyString(potentialString: unknown): potentialString is string;

export default function isEmptyString(definiteString: string): boolean;


export default function isEmptyString(potentialString: unknown): potentialString is string {
  return typeof potentialString === "string" && potentialString.length === 0;
}
