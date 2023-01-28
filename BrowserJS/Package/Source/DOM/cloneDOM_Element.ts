export default function cloneDOM_Element<DOM_ElementSubtype extends Element = Element>(
  namedParameters: Readonly<{
    targetElement: DOM_ElementSubtype;
    mustCopyAllChildren: boolean;
  }>
): DOM_ElementSubtype {

  /* eslint-disable-next-line @typescript-eslint/consistent-type-assertions --
  * "cloneNode" method returns the appropriate inheritor of "Node" but TypeScript does not provide the generic parameters.
  * In this case, the YDEE takes the responsibility for type assertion.
  * Relates issue: https://github.com/microsoft/TypeScript/issues/283 */
  return namedParameters.targetElement.cloneNode(namedParameters.mustCopyAllChildren) as DOM_ElementSubtype;

}
