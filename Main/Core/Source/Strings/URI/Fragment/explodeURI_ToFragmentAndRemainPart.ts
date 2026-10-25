import splitString from "../../splitString";
import isUndefined from "../../../TypeGuards/EmptyTypes/isUndefined";
import isNotUndefined from "../../../TypeGuards/EmptyTypes/isNotUndefined";
import Logger from "../../../Logging/Logger";
import UnexpectedEventError from "../../../Errors/UnexpectedEvent/UnexpectedEventError";
import InvalidParameterValueError from "../../../Errors/InvalidParameterValue/InvalidParameterValueError";


export namespace ExplodingOfURI_ToFragmentAndRemainPart {

  export type Result = Result.RequiredFragment | Result.OptionalFragment;

  export namespace Result {

    export type RequiredFragment = Readonly<{
      fragmentWithoutLeadingHash: string;
      remainPart: string;
    }>;

    export type OptionalFragment = Readonly<{
      fragmentWithoutLeadingHash?: string;
      remainPart: string;
    }>;

  }

}


export function explodeURI_ToFragmentAndRemainPart(
  targetURI: string,
  options: Readonly<{ mustThrowErrorIfNoFragment: true; }>
):
    ExplodingOfURI_ToFragmentAndRemainPart.Result.RequiredFragment;

export function explodeURI_ToFragmentAndRemainPart(
  targetURI: string, options: Readonly<{ mustThrowErrorIfNoFragment: false; }>
):
    ExplodingOfURI_ToFragmentAndRemainPart.Result.OptionalFragment;

export function explodeURI_ToFragmentAndRemainPart(
  targetURI: string, { mustThrowErrorIfNoFragment }: Readonly<{ mustThrowErrorIfNoFragment: boolean; }>
): ExplodingOfURI_ToFragmentAndRemainPart.Result {

  const [ URI_PotentialMainPart, potentialFragment, thirdSubstring__mustNotBe ]: ReadonlyArray<string> =
      splitString(targetURI, "#");

  if (isNotUndefined(thirdSubstring__mustNotBe)) {
    Logger.throwErrorWithFormattedMessage({
        errorInstance:
            new InvalidParameterValueError({
              parameterNumber: 1,
              parameterName: "targetURI",
              messageSpecificPart: "Specified URI is invalid because has more than one \"#\" character."
            }),
        title: UnexpectedEventError.localization.defaultTitle,
        occurrenceLocation: "explodeURI_ToFragmentAndRemainPart(targetURI, options)"
      });
  }


  /* [ Theory ] Will be truthy if target URI has been specified with `"#"` or empty string. */
  if (isUndefined(potentialFragment) || URI_PotentialMainPart.length === 0) {

    if (mustThrowErrorIfNoFragment) {
      Logger.throwErrorWithFormattedMessage({
        errorInstance: new UnexpectedEventError(`Contrary to expectations, the URI "${ targetURI }" has no fragment.`),
        title: UnexpectedEventError.localization.defaultTitle,
        occurrenceLocation: "explodeURI_ToFragmentAndRemainPart(targetURI, options)"
      });
    }


    /* [ Theory ] Will the empty string when target URI has been specified with `"#"`. */
    return { remainPart: URI_PotentialMainPart.length > 0 ? URI_PotentialMainPart : targetURI };

  }


  return {
    fragmentWithoutLeadingHash: potentialFragment,
    remainPart: URI_PotentialMainPart
  };

}
