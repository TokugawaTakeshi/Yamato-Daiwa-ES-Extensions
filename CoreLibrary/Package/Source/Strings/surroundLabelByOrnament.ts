import limitMinimalValue from "../Numbers/limitMinimalValue";


export default function surroundLabelByOrnament(
  {
    label,
    characterForIndentationAroundLabel = "",
    ornamentPatten,
    prependedPartCharactersCount,
    totalCharactersCount
  }: Readonly<{
    label: string;
    characterForIndentationAroundLabel?: string;
    ornamentPatten: string;
    prependedPartCharactersCount: number;
    totalCharactersCount: number;
  }>
): string {

  const remainPartCharactersCount: number = limitMinimalValue({
    targetNumber:
        totalCharactersCount -
        (2 * characterForIndentationAroundLabel.length) -
        label.length -
        prependedPartCharactersCount,
    minimalValue: 0
  });

  return ornamentPatten.repeat(prependedPartCharactersCount) +
      `${ characterForIndentationAroundLabel }${ label }${ characterForIndentationAroundLabel }` +
      ornamentPatten.repeat(remainPartCharactersCount);

}
