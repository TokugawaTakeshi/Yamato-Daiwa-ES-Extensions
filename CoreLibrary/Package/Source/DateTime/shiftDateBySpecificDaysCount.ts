export default function shiftDateBySpecificDaysCount(
  sourceData: Readonly<
    {
      initialDate: Date;
      dayCount: number;
    } &
    (
      { toFuture: true; } |
      { toPast: true; }
    )
  >
): Date {

  const mutableInitialDate: Date = new Date(sourceData.initialDate);

  return new Date(
    mutableInitialDate.setDate(
      "toFuture" in sourceData ?
          mutableInitialDate.getDate() + sourceData.dayCount :
          mutableInitialDate.getDate() - sourceData.dayCount
    )
  );

}
