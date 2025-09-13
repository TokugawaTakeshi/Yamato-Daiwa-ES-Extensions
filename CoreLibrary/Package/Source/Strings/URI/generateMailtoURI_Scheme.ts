import isNonEmptyString from "../../TypeGuards/Strings/isNonEmptyString";
import isString from "../../TypeGuards/Strings/isString";


export default function generateMailtoURI_Scheme(
  polymorphicParameter:
      string |
      Readonly<{
        to: string | ReadonlyArray<string>;
        cc?: string | ReadonlyArray<string>;
        bcc?: string | ReadonlyArray<string>;
        subject?: string;
        body?: string;
        mustUseSemiColonsInsteadOfCommasForMultipleEmailsSeparators: boolean;
      }>
): string {

  if (typeof polymorphicParameter === "string") {
    return `mailto:${ polymorphicParameter }`;
  }


  const queryParts: Array<string> = [];
  const multipleEmailsSeparator: string =
      polymorphicParameter.mustUseSemiColonsInsteadOfCommasForMultipleEmailsSeparators ? ";" : ",";

  if (isNonEmptyString(polymorphicParameter.cc)) {
    queryParts.push(`cc=${ polymorphicParameter.cc }`);
  } else if (Array.isArray(polymorphicParameter.cc)) {
    queryParts.push(`cc=${ polymorphicParameter.cc.join(multipleEmailsSeparator) }`);
  }

  if (isNonEmptyString(polymorphicParameter.bcc)) {
    queryParts.push(`bcc=${ polymorphicParameter.bcc }`);
  } else if (Array.isArray(polymorphicParameter.bcc)) {
    queryParts.push(`bcc=${ polymorphicParameter.bcc.join(multipleEmailsSeparator) }`);
  }

  if (isNonEmptyString(polymorphicParameter.subject)) {
    queryParts.push(`subject=${ polymorphicParameter.subject }`);
  }

  if (isNonEmptyString(polymorphicParameter.body)) {
    queryParts.push(`body=${ polymorphicParameter.subject }`);
  }

  return encodeURI(
      (
        isString(polymorphicParameter.to) ?
            `mailto:${ polymorphicParameter.to }` :
            `mailto:${ polymorphicParameter.to.join(multipleEmailsSeparator) }`
      ) +
          (queryParts.length > 0 ? `?${ queryParts.join("&") }` : "")
  );

}
