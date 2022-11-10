export default function shiftDateBySpecificDaysCount(
  namedParameters: Readonly<
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

  const mutableInitialDate: Date = new Date(namedParameters.initialDate);

  return new Date(
      mutableInitialDate.setDate(
          "toFuture" in namedParameters ?
              mutableInitialDate.getDate() + namedParameters.dayCount :
              mutableInitialDate.getDate() - namedParameters.dayCount
      )
  );

}
