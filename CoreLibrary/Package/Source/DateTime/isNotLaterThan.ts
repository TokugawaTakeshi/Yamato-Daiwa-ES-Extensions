export default function isNotLaterThan(
  sourceData: Readonly<{
    referenceDate: Date | string;
    thanWhichDate: Date | string;
    mustIgnoreTime: boolean;
  }>
): boolean {

  const referenceDate: Date = new Date(sourceData.referenceDate);
  const thanWhichDate: Date = new Date(sourceData.thanWhichDate);

  if (sourceData.mustIgnoreTime) {

    referenceDate.setHours(0);
    referenceDate.setMinutes(0);
    referenceDate.setSeconds(0);
    referenceDate.setMilliseconds(0);

    thanWhichDate.setHours(0);
    thanWhichDate.setMinutes(0);
    thanWhichDate.setSeconds(0);
    thanWhichDate.setMilliseconds(0);

  }


  return referenceDate.getTime() <= thanWhichDate.getTime();

}
