import limitMinimalValue from "../Numbers/limitMinimalValue";


export default function surroundLabelByOrnament(
  compoundParameter: Readonly<{
    label: string;
    ornamentPatten: string;
    prependedPartCharactersCount: number;
    totalCharactersCount: number;
  }>
): string {

  const remainPartCharactersCount: number = limitMinimalValue({
    targetNumber: compoundParameter.totalCharactersCount -
        compoundParameter.label.length -
        compoundParameter.prependedPartCharactersCount,
    minimalValue: 0
  });

  return compoundParameter.ornamentPatten.repeat(compoundParameter.prependedPartCharactersCount) +
      compoundParameter.label +
      compoundParameter.ornamentPatten.repeat(remainPartCharactersCount);

}
